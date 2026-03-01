@echo off
REM Integration Setup Script - Sets up both frontend and backend
REM Run this once to initialize the entire stack

echo.
echo ========================================
echo Carbon Footprint - Integration Setup
echo ========================================
echo.

setlocal enabledelayedexpansion

REM Check if we're in the right directory
if not exist "frontend" (
    echo Error: frontend directory not found!
    echo Please run this script from the project root.
    pause
    exit /b 1
)

if not exist "backend" (
    echo Error: backend directory not found!
    echo Please run this script from the project root.
    pause
    exit /b 1
)

REM Setup Backend
echo [1/4] Setting up backend...
cd backend
if not exist "venv" (
    echo Creating virtual environment...
    python -m venv venv
)
call venv\Scripts\activate.bat
echo Installing backend dependencies...
pip install -q -r requirements.txt
cd ..
echo ✓ Backend setup complete
echo.

REM Setup Frontend
echo [2/4] Setting up frontend...
cd frontend
echo Installing frontend dependencies...
call npm install --silent
cd ..
echo ✓ Frontend setup complete
echo.

REM Create configuration files if they don't exist
echo [3/4] Configuring environment...
if not exist "frontend\.env.local" (
    echo Creating frontend/.env.local
    (
        echo # Frontend Environment - Development
        echo VITE_API_URL=http://localhost:8000
    ) > frontend\.env.local
)

if not exist "backend\.env" (
    echo Creating backend/.env
    (
        echo # Backend Configuration - Development
        echo ENV=development
        echo PORT=8000
        echo CORS_ORIGINS=http://localhost:5173,http://localhost:3000,http://localhost:4173
    ) > backend\.env
)
echo ✓ Configuration complete
echo.

REM Test configuration
echo [4/4] Testing configuration...
echo Testing backend Python...
cd backend
call venv\Scripts\activate.bat
python -c "import fastapi; print('✓ FastAPI installed')" 2>nul || (
    echo ✗ FastAPI not found, reinstalling...
    pip install -q fastapi uvicorn pydantic
)
cd ..

echo Testing frontend Node...
cd frontend
node -v >nul 2>&1 && (
    echo ✓ Node.js found: !errorlevel!
) || (
    echo ✗ Node.js not found. Please install from https://nodejs.org/
)
cd ..

echo.
echo ========================================
echo Integration Setup Complete!
echo ========================================
echo.
echo Next steps:
echo.
echo  Terminal 1 - Start Backend:
echo    cd backend
echo    venv\Scripts\activate.bat
echo    python main.py
echo.
echo  Terminal 2 - Start Frontend:
echo    cd frontend
echo    npm run dev
echo.
echo Or run both together:
echo    .\start-dev.bat
echo.
echo Frontend will be at:   http://localhost:5173
echo Backend will be at:    http://localhost:8000
echo API Docs will be at:   http://localhost:8000/docs
echo.
pause
