import geojson
import networkx as nx
import osmnx as ox
from fastapi import FastAPI, Query
from fastapi.middleware.cors import CORSMiddleware

file_path = "./data/map3.xml"

app = FastAPI()
graph = ox.load_graphml(file_path)


app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173", "http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/health")
async def root():
    return {"message": "Good Health"}


@app.get("/route")
async def get_route(
    origin_lat: float = Query(..., description="Latitude of origin"),
    origin_lng: float = Query(..., description="Longitude of origin"),
    dest_lat: float = Query(..., description="Latitude of destination"),
    dest_lng: float = Query(..., description="Longitude of destination"),
    speed_kmh: float = Query(30, description="Average speed km/h for estimated time"),
):
    # Find nearest nodes
    origin_node = ox.distance.nearest_nodes(graph, X=origin_lng, Y=origin_lat)
    dest_node = ox.distance.nearest_nodes(graph, X=dest_lng, Y=dest_lat)

    # Shortest path
    route = nx.shortest_path(
        graph, origin_node, dest_node, weight="length", method="dijkstra"
    )

    # Get coordinates
    route_coords = [(graph.nodes[node]["x"], graph.nodes[node]["y"]) for node in route]

    # Calculate total length
    total_length_m = nx.path_weight(graph, route, weight="length")

    # Time
    speed_m_per_s = speed_kmh * 1000 / 3600  # m/s
    estimated_time_s = total_length_m / speed_m_per_s

    # Build GeoJSON
    route_geojson = geojson.Feature(
        geometry=geojson.LineString(route_coords),
        properties={
            "name": "shortest_path",
            "length_m": total_length_m,
            "time_s": estimated_time_s,
        },
    )

    route_geojson_fc = geojson.FeatureCollection([route_geojson])

    return route_geojson_fc
