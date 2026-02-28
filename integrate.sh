#!/bin/bash
# Integration Setup Script - Sets up both frontend and backend
# Run this once to initialize the entire stack

echo ""
echo "========================================"
echo "Carbon Footprint - Integration Setup"
echo "========================================"
echo ""

# Check if we're in the right directory
if [ ! -d "frontend" ]; then
    echo "Error: frontend directory not found!"
    echo "Please run this script from the project root."
    exit 1
fi

if [ ! -d "backend" ]; then
    echo "Error: backend directory not found!"
    echo "Please run this script from the project root."
    exit 1
fi

# Setup Backend
echo "[1/4] Setting up backend..."
cd backend
if [ ! -d "venv" ]; then
    echo "Creating virtual environment..."
    python3 -m venv venv
fi
source venv/bin/activate
echo "Installing backend dependencies..."
pip install -q -r requirements.txt >/dev/null 2>&1
cd ..
echo "✓ Backend setup complete"
echo ""

# Setup Frontend
echo "[2/4] Setting up frontend..."
cd frontend
echo "Installing frontend dependencies..."
npm install --silent >/dev/null 2>&1
cd ..
echo "✓ Frontend setup complete"
echo ""

# Create configuration files if they don't exist
echo "[3/4] Configuring environment..."
if [ ! -f "frontend/.env.local" ]; then
    echo "Creating frontend/.env.local"
    cat > frontend/.env.local << EOF
# Frontend Environment - Development
VITE_API_URL=http://localhost:8000
EOF
fi

if [ ! -f "backend/.env" ]; then
    echo "Creating backend/.env"
    cat > backend/.env << EOF
# Backend Configuration - Development
ENV=development
PORT=8000
CORS_ORIGINS=http://localhost:5173,http://localhost:3000,http://localhost:4173
EOF
fi
echo "✓ Configuration complete"
echo ""

# Test configuration
echo "[4/4] Testing configuration..."
echo "Testing backend Python..."
cd backend
source venv/bin/activate
python3 -c "import fastapi; print('✓ FastAPI installed')" 2>/dev/null || {
    echo "✗ FastAPI not found, reinstalling..."
    pip install -q fastapi uvicorn pydantic >/dev/null 2>&1
}
cd ..

echo "Testing frontend Node..."
which node >/dev/null 2>&1 && {
    echo "✓ Node.js found: $(node -v)"
} || {
    echo "✗ Node.js not found. Please install from https://nodejs.org/"
}

echo ""
echo "========================================"
echo "Integration Setup Complete!"
echo "========================================"
echo ""
echo "Next steps:"
echo ""
echo "  Terminal 1 - Start Backend:"
echo "    cd backend"
echo "    source venv/bin/activate"
echo "    python main.py"
echo ""
echo "  Terminal 2 - Start Frontend:"
echo "    cd frontend"
echo "    npm run dev"
echo ""
echo "Or run both together:"
echo "    ./start-dev.sh"
echo ""
echo "Frontend will be at:   http://localhost:5173"
echo "Backend will be at:    http://localhost:8000"
echo "API Docs will be at:   http://localhost:8000/docs"
echo ""
