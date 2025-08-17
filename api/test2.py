import osmnx as ox

G = ox.load_graphml("./data/map3.graphml")

# Get Nodes and Egdes
nodes, edges = ox.graph_to_gdfs(G)

# Export
nodes.to_file("./data/nodes.json", driver="GeoJSON")
edges.to_file("./data/edges.json", driver="GeoJSON")