#!/bin/bash
# Combined startup script - runs both backend and frontend on macOS/Linux

echo ""
echo "========================================"
echo "Carbon Footprint - Full Stack Startup"
echo "========================================"
echo ""
echo "This script will:"
echo "1. Start the FastAPI backend on port 8000"
echo "2. Start the Vite frontend on port 5173"
echo ""

# Check if backend directory exists
if [ ! -d "backend" ]; then
    echo "Error: backend directory not found!"
    echo "Make sure you're running this from the project root"
    exit 1
fi

# Check if backend venv exists
if [ ! -d "backend/venv" ]; then
    echo "Error: Backend virtual environment not found!"
    echo "Run: cd backend && ./setup.sh"
    exit 1
fi

# Check if node_modules exists
if [ ! -d "node_modules" ]; then
    echo "Installing frontend dependencies..."
    npm install
fi

echo ""
echo "Starting services..."
echo ""

# Function to clean up child processes on exit
cleanup() {
    echo ""
    echo "Stopping services..."
    kill $BACKEND_PID $FRONTEND_PID 2>/dev/null
    exit 0
}

# Trap CTRL+C to run cleanup
trap cleanup INT TERM

# Start backend
echo "Starting backend..."
(cd backend && source venv/bin/activate && python main.py) &
BACKEND_PID=$!

# Give backend time to start
sleep 2

# Start frontend
echo "Starting frontend..."
npm run dev &
FRONTEND_PID=$!

echo ""
echo "========================================"
echo "Services Starting"
echo "========================================"
echo ""
echo "Backend: http://localhost:8000"
echo "Backend Docs: http://localhost:8000/docs"
echo "Frontend: http://localhost:5173"
echo ""
echo "Press Ctrl+C to stop both services"
echo ""

# Wait for both processes
wait
