# MindWay - Route Planning Application

A route planning application with a FastAPI backend server and React-based map client.

## 🚀 Server (Python/FastAPI)

### Description

FastAPI server that provides route planning functionality using OpenStreetMap data and OSMnx for graph analysis.

### Features

- Route calculation between two points
- Health check endpoint
- CORS enabled for frontend integration

### Setup

1. Install dependencies:

```bash
pip install -r requirements.txt
```

2. Run the server:

```bash
python server.py
```

The server will start on `http://localhost:8000`

Run by venv:

```bash
venv\Scripts\activate

uvicorn server:app --reload

```

The server will start on `http://127.0.0.1:8000`

### API Endpoints

- `GET /health` - Health check
- `GET /route` - Calculate route between origin and destination coordinates

## 🗺️ Map Client (React/TypeScript)

### Description

Interactive map interface built with React, TypeScript, and Leaflet for visualizing routes and locations.

### Features

- Interactive map with Leaflet
- Search functionality for places
- Route visualization
- Origin and destination markers

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

## 🏗️ Project Structure

```
mindway/
├── server.py          # FastAPI server
├── requirements.txt   # Python dependencies
├── map/              # React map client
│   ├── src/
│   ├── package.json
│   └── ...
└── data/             # Graph data files
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

2. Edit `graph_gen.py` to specify your target areas:

```python
places = [
    "Your City, Your Country",
    "Another Area, Your Country"
]
```

3. Run the script:

```bash
python graph_gen.py
```

The generated graph will be saved to `./data/map.graphml`

### Data Format

- **Input**: Geographic place names or coordinates
- **Output**: GraphML file containing road network topology
- **Network Type**: Driveable roads (configurable)

## 🔧 Technologies Used

- **Backend**: FastAPI, OSMnx, NetworkX, GeoJSON
- **Frontend**: React, TypeScript, Leaflet, TailwindCSS
- **State Management**: Zustand
- **Data Processing**: OSMnx, NetworkX
