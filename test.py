import osmnx as ox
import networkx as nx
import matplotlib.pyplot as plt
import geojson


# Save graph
place = "Ho Chi Minh City, Vietnam"
file_path = "./data/ho_chi_minh_city.graphml"

place1 = "Sai Gon, Ho Chi Minh City, Vietnam"
file_path1 = "./data/sai_gon.graphml"

# Save graph to local
# G = ox.graph_from_place(place1, network_type="drive")

# ox.io.save_graphml(G, filepath=file_path1)

# Load graph
G = ox.load_graphml(file_path1)

# Get Nodes and Egdes
nodes, edges = ox.graph_to_gdfs(G)

# Export
# nodes.to_file("./data/geojson/nodes.json", driver="GeoJSON")
# edges.to_file("./data/geojson/edges.json", driver="GeoJSON")

# Origin and destination points
orig_point = (10.780146665063548, 106.6993442321206)  # HighLand Bưu Điện Thành Phố
dest_point = (10.780723162863866, 106.70317599927128)  # Bệnh Viện Nhi Đồng 2

# Find the nearest nodes to the points
orig_node = ox.distance.nearest_nodes(G, X=orig_point[1], Y=orig_point[0])
dest_node = ox.distance.nearest_nodes(G, X=dest_point[1], Y=dest_point[0])

# Find the shortest path
route = nx.shortest_path(G, orig_node, dest_node, weight="length", method="dijkstra")


# Lấy list tọa độ từ các node trong route
route_coords = [(G.nodes[node]["x"], G.nodes[node]["y"]) for node in route]

# Tạo GeoJSON Feature
route_geojson = geojson.Feature(
    geometry=geojson.LineString(route_coords),
    properties={"name": "shortest_path"}
)

# Đóng gói thành FeatureCollection
route_geojson_fc = geojson.FeatureCollection([route_geojson])

# Save ra file
with open("./data/geojson/route.json", "w") as f:
    geojson.dump(route_geojson_fc, f, indent=2)

print("✅ Route GeoJSON saved to ./data/geojson/route.json")


# Plot the graph
# fig, ax = ox.plot_graph_route(G, route)