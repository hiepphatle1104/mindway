from fastapi import FastAPI, Query
from fastapi.middleware.cors import CORSMiddleware
import osmnx as ox
import networkx as nx
import geojson

file_path = "./data/sai_gon.graphml"

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
):
    # Find nearest nodes
    origin_node = ox.distance.nearest_nodes(graph, X=origin_lng, Y=origin_lat)
    dest_node = ox.distance.nearest_nodes(graph, X=dest_lng, Y=dest_lat)

    # Shortest path
    route = nx.shortest_path(graph, origin_node, dest_node, weight="length", method="dijkstra")

    # Get coordinates
    route_coords = [(graph.nodes[node]["x"], graph.nodes[node]["y"]) for node in route]

    # Build GeoJSON
    route_geojson = geojson.Feature(
        geometry=geojson.LineString(route_coords),
        properties={"name": "shortest_path"}
    )
    route_geojson_fc = geojson.FeatureCollection([route_geojson])

    return route_geojson_fc
