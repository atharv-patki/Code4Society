#!/bin/bash
# Setup script for Carbon Footprint Backend on macOS/Linux

echo ""
echo "========================================"
echo "Carbon Footprint Backend Setup"
echo "========================================"
echo ""

# Check if Python is installed
if ! command -v python3 &> /dev/null; then
    echo "Error: Python 3 is not installed"
    echo "Please install Python 3.9+ from https://www.python.org/"
    exit 1
fi

echo "[1/3] Python found:"
python3 --version
echo ""

# Create virtual environment
echo "[2/3] Creating virtual environment..."
if [ ! -d "venv" ]; then
    python3 -m venv venv
    echo "Virtual environment created"
else
    echo "Virtual environment already exists"
fi
echo ""

# Activate virtual environment
echo "[3/3] Activating virtual environment and installing dependencies..."
source venv/bin/activate

# Install requirements
pip install -q -r requirements.txt

# Copy .env file if it doesn't exist
if [ ! -f ".env" ]; then
    cp .env.example .env
    echo ".env file created. You can customize settings there."
fi

echo ""
echo "========================================"
echo "Setup Complete!"
echo "========================================"
echo ""
echo "To start the backend server, run:"
echo "  ./run.sh"
echo ""
echo "Or manually:"
echo "  source venv/bin/activate"
echo "  python main.py"
echo ""
