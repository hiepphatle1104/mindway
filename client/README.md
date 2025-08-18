# MindWay Client

A React-based client application for the MindWay project with real-time WebSocket support for route updates.

## Features

- Real-time route calculation via WebSocket
- Automatic route updates when server broadcasts changes
- Fallback to REST API when WebSocket is unavailable
- Modern UI with Radix UI components

## WebSocket Integration

The application now supports real-time route updates through WebSocket connections:

### Route Request Flow

1. **User clicks "Get Directions"** - Establishes WebSocket connection
2. **Route request sent** - Client sends route coordinates via WebSocket
3. **Server processes request** - Calculates route and sends response
4. **Route displayed** - Client receives route data and updates UI
5. **Broadcast sent** - Server broadcasts update to all connected clients

### WebSocket Message Types

- `route_request`: Client requests a new route
- `route_response`: Server responds with calculated route data
- `route_update`: Server broadcasts route updates to all clients

### Fallback Behavior

If WebSocket connection fails, the application automatically falls back to REST API calls for route calculation.

## Development

```bash
npm install
npm run dev
```

## Testing WebSocket Broadcast

Use the test endpoint to simulate route updates:

```bash
curl -X POST http://localhost:8000/test-route-update
```

This will broadcast a test message to all connected WebSocket clients.
