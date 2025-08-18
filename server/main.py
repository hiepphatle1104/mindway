import geojson
import networkx as nx
import osmnx as ox
from fastapi import FastAPI, Query, WebSocket, WebSocketDisconnect
from fastapi.middleware.cors import CORSMiddleware


class ClientManager:
    def __init__(self):
        self.clients: list[WebSocket] = []

    async def connect(self, ws: WebSocket):
        await ws.accept()
        self.clients.append(ws)

    def disconnect(self, ws: WebSocket):
        self.clients.remove(ws)

    async def broadcast(self, message: str):
        disconnected = []
        for ws in self.clients:
            try:
                await ws.send_text(message)
            except WebSocketDisconnect:
                disconnected.append(ws)
        # cleanup client bị rớt
        for ws in disconnected:
            self.disconnect(ws)


class Location:
    def __init__(self, lat: float, lng: float):
        self.lat = lat
        self.lng = lng


class StreetNetwork:
    def __init__(self, file: str):
        self.network: nx.MultiDiGraph = ox.load_graphml(file)

    def get_direction(self, origin: Location, dest: Location, avg_speed: float):
        # Find nearest nodes
        origin_node = ox.distance.nearest_nodes(
            self.network, X=origin.lng, Y=origin.lat
        )
        dest_node = ox.distance.nearest_nodes(self.network, X=dest.lng, Y=dest.lat)

        # Shortest path
        route = nx.shortest_path(
            self.network, origin_node, dest_node, weight="length", method="dijkstra"
        )

        # Get coordinates
        route_coords = [
            (self.network.nodes[node]["x"], self.network.nodes[node]["y"])
            for node in route
        ]

        # Calculate total length
        total_length_m = nx.path_weight(self.network, route, weight="length")

        # Time
        speed_m_per_s = avg_speed * 1000 / 3600  # m/s
        estimated_time_s = total_length_m / speed_m_per_s

        # Build GeoJSON
        jsonData = geojson.Feature(
            geometry=geojson.LineString(route_coords),
            properties={
                "name": "shortest_path",
                "length_m": total_length_m,
                "time_s": estimated_time_s,
            },
        )

        data = geojson.FeatureCollection([jsonData])

        return data


app = FastAPI()
manager = ClientManager()
street_network = StreetNetwork("./data/map.xml")


app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173", "http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/route")
async def routing(
    origin_lat: float = Query(..., description="Latitude of origin"),
    origin_lng: float = Query(..., description="Longitude of origin"),
    dest_lat: float = Query(..., description="Latitude of destination"),
    dest_lng: float = Query(..., description="Longitude of destination"),
    avg_speed: float = Query(30, description="Average speed km/h for estimated time"),
):
    origin = Location(lat=origin_lat, lng=origin_lng)
    dest = Location(lat=dest_lat, lng=dest_lng)
    data = street_network.get_direction(origin, dest, avg_speed)
    return data


@app.websocket("/ws")
async def websocket_endpoint(ws: WebSocket):
    await manager.connect(ws)
    try:
        while True:
            await ws.receive_text()
    except WebSocketDisconnect:
        manager.disconnect(ws)
        manager.disconnect(ws)
