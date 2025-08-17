from datetime import datetime, timedelta

import numpy as np
import pandas as pd

# giả sử chỉ có 1 edge
edges = [{"u": 366367285, "v": 366416151, "osmid": 32580099}]

# thời gian start – end
start = datetime(year=2025, month=1, day=1, hour=0, minute=0, second=0)
end = datetime(year=2025, month=1, day=2, hour=0, minute=0, second=0)  # 1 ngày
interval = 15  # phút

rows = []

for edge in edges:
    t = start
    while t < end:
        hour = t.hour

        # Simulate Traffic Flow
        if 7 <= hour < 9 or 17 <= hour < 19:  # giờ cao điểm
            flow = np.random.poisson(20)
            speed = np.random.normal(25, 5)  # kẹt xe
        elif 22 <= hour or hour < 5:  # đêm
            flow = np.random.poisson(5)
            speed = np.random.normal(45, 5)
        else:  # giờ bình thường
            flow = np.random.poisson(10)
            speed = np.random.normal(35, 5)

        rows.append(
            {
                "u": edge["u"],
                "v": edge["v"],
                "id": edge["osmid"],
                "timestamp": t,
                "flow": max(flow, 0),
                "speed": max(speed, 0),
            }
        )

        t += timedelta(minutes=interval)

df = pd.DataFrame(rows)
df.to_csv("./dataset/traffic_data.csv", index=False)
print(df.head())
