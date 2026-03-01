#!/bin/bash
# Run script for Carbon Footprint Backend on macOS/Linux

echo ""
echo "========================================"
echo "Carbon Footprint Backend"
echo "========================================"
echo ""

# Check if virtual environment exists
if [ ! -d "venv" ]; then
    echo "Virtual environment not found!"
    echo "Please run ./setup.sh first"
    exit 1
fi

# Activate virtual environment
source venv/bin/activate

echo "Backend starting..."
echo ""
echo "API Documentation: http://localhost:8000/docs"
echo "Health Check: http://localhost:8000/api/health"
echo ""

# Run the FastAPI server
python main.py
