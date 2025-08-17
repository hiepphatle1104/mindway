import json

# Load edges
with open("./data/features.json", "r", encoding="utf-8") as f:
    edges = json.load(f)

# Load nodes
with open("./data/nodes.json", "r", encoding="utf-8") as f:
    nodes = json.load(f)

# Lấy danh sách u, v từ edges
uv_ids = set()
for feature in edges["features"]:
    u = feature["properties"].get("u")
    v = feature["properties"].get("v")
    if u is not None:
        uv_ids.add(u)
    if v is not None:
        uv_ids.add(v)

# Lọc nodes có osmid nằm trong uv_ids
filtered_nodes = [
    node for node in nodes["features"]
    if node["properties"].get("osmid") in uv_ids
]

# Xuất ra GeoJSON
filtered_nodes_geojson = {
    "type": "FeatureCollection",
    "name": "nodes_filtered",
    "crs": nodes["crs"],
    "features": filtered_nodes
}

with open("./data/nodes_filtered.json", "w", encoding="utf-8") as f:
    json.dump(filtered_nodes_geojson, f, ensure_ascii=False, indent=2)

print(f"Found {len(filtered_nodes)} nodes linked to features")
