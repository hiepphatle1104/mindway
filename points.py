import osmnx as ox
import matplotlib.pyplot as plt
import json

# Định nghĩa địa điểm bạn muốn lấy dữ liệu
place_name = "Sai Gon, Ho Chi Minh City, Vietnam"

# Định nghĩa các loại đối tượng bạn muốn lấy (trong trường hợp này là tất cả các tòa nhà)
tags = {"building": True}

# Lấy dữ liệu các tòa nhà từ địa điểm
gdf = ox.features_from_place(place_name, tags)

# Hiển thị bản đồ với các tòa nhà
fig, ax = ox.plot_footprints(gdf, bgcolor="#FFFFFF", edge_color="#2c5c96", edge_linewidth=0.5, figsize=(10, 10))

# # Tùy chỉnh hiển thị
# ax.set_title(f"Buildings in {place_name}")
# plt.show()

# # In ra số lượng tòa nhà đã tìm thấy
# print(f"Tìm thấy {len(gdf)} tòa nhà ở {place_name}.")

data = json.loads(gdf.to_json())
output_filename = "buildings.geojson"
with open(output_filename, "w") as f:
    json.dump(data, f, indent=2)

print(f"Dữ liệu đã được lưu vào tệp '{output_filename}'.")