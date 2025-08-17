# MindWay - Route Planning Application

A route planning application with a FastAPI backend server and React-based map client.

## 🚀 Server (Python/FastAPI)

### Description

FastAPI server that provides route planning functionality using OpenStreetMap data and OSMnx for graph analysis.

### Features

- Route calculation between two points using Dijkstra's algorithm
- Health check endpoint
- CORS enabled for frontend integration
- Automatic graph loading from GraphML files

### Setup

1. Create and activate a virtual environment (recommended):

```bash
python -m venv .venv
source .venv/bin/activate  # On Windows: .venv\Scripts\activate
```

2. Install dependencies:

```bash
pip install -r requirements.txt
```

3. Run the server:

```bash
python server.py
```

The server will start on `http://localhost:8000`

### API Endpoints

- `GET /health` - Health check endpoint
- `GET /route` - Calculate route between origin and destination coordinates
  - Query parameters: `origin_lat`, `origin_lng`, `dest_lat`, `dest_lng`

## 🗺️ Map Client (React/TypeScript)

### Description

Interactive map interface built with React, TypeScript, and Leaflet for visualizing routes and locations.

### Features

- Interactive map with Leaflet
- Search functionality for places
- Route visualization with origin and destination markers
- Modern UI with TailwindCSS and Radix UI components
- State management with Zustand

### Setup

1. Navigate to the map directory:

```bash
cd map
```

2. Install dependencies:

```bash
npm install
```

3. Start development server:

```bash
npm run dev
```

The client will start on `http://localhost:5173`

### Build

```bash
npm run build
```

### Preview Production Build

```bash
npm run preview
```

## 🏗️ Project Structure

```
mindway/
├── server.py          # FastAPI server with route planning API
├── gen.py            # Graph data generation script
├── requirements.txt   # Python dependencies
├── data/             # Graph data files (GraphML format)
├── cache/            # OSM data cache directory
├── map/              # React map client
│   ├── src/
│   │   ├── components/    # React components
│   │   ├── store/         # Zustand state management
│   │   ├── lib/           # Utility functions
│   │   └── App.tsx        # Main application component
│   ├── package.json
│   └── ...
└── .venv/            # Python virtual environment
```

## 📊 Graph Data Generation

### Description

Python script for generating and preprocessing OpenStreetMap graph data for route planning.

### Features

- Download OSM data for specific geographic areas
- Generate road network graphs
- Export data in GraphML format for the server

### Setup

1. Install dependencies (same as server):

```bash
pip install -r requirements.txt
```

2. Edit `gen.py` to specify your target areas:

```python
import osmnx as ox

places = [
    "Your City, Your Country",
    "Another Area, Your Country"
]
G = ox.graph_from_place(places, network_type="drive")
ox.io.save_graphml(G, filepath="./data/map.graphml")
```

3. Run the script:

```bash
python gen.py
```

The generated graph will be saved to `./data/map.graphml`

**Note**: Make sure the `data/` directory exists before running the script.

### Data Format

- **Input**: Geographic place names or coordinates
- **Output**: GraphML file containing road network topology
- **Network Type**: Driveable roads (configurable)
- **Storage**: Automatically loaded by the server on startup

## 🔧 Technologies Used

- **Backend**: FastAPI, OSMnx, NetworkX, GeoJSON
- **Frontend**: React 19, TypeScript, Leaflet, TailwindCSS, Radix UI
- **State Management**: Zustand
- **Data Processing**: OSMnx, NetworkX
- **Build Tools**: Vite, ESLint

## 🚦 Getting Started

1. **Clone and setup**:

   ```bash
   git clone <repository-url>
   cd mindway
   ```

2. **Setup backend**:

   ```bash
   python -m venv .venv
   source .venv/bin/activate
   pip install -r requirements.txt
   python gen.py  # Generate graph data
   python server.py  # Start server
   ```

3. **Setup frontend** (in new terminal):

   ```bash
   cd map
   npm install
   npm run dev
   ```

4. **Open your browser** to `http://localhost:5173`

## 📝 Notes

- The server automatically loads the graph data on startup
- Make sure to generate graph data before starting the server
- The application supports CORS for development on both localhost:5173 and localhost:3000
- Graph data is cached in the `cache/` directory for faster subsequent runs
