import osmnx as ox

# Places
places = [
  "Phuong Gia Dinh, Ho Chi Minh City, Viet Nam",
  "Phuong Binh Loi Trung, Ho Chi Minh City, Viet Nam",
  "Phuong Binh Thanh, Ho Chi Minh City, Viet Nam",
  "Phuong Thanh My Tay, Ho Chi Minh City, Viet Nam"
]
path = "./data/map3.xml"

# Download network
G = ox.graph_from_place(places, network_type="drive")

ox.io.save_graphml(G, filepath=path)

# Generate nodes and edeges
G = ox.load_graphml(path)

# Get Nodes and Egdes
nodes, edges = ox.graph_to_gdfs(G)

# Export
nodes.to_file("./data/nodes.json", driver="GeoJSON")
edges.to_file("./data/edges.json", driver="GeoJSON")