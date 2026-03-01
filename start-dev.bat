@echo off
REM Combined startup script - runs both backend and frontend

echo.
echo ========================================
echo Carbon Footprint - Full Stack Startup
echo ========================================
echo.
echo This script will:
echo 1. Start the FastAPI backend on port 8000
echo 2. Start the Vite frontend on port 5173
echo.

REM Check if backend directory exists
if not exist "backend" (
    echo Error: backend directory not found!
    echo Make sure you're running this from the project root
    pause
    exit /b 1
)

REM Check if backend venv exists
if not exist "backend\venv" (
    echo Error: Backend virtual environment not found!
    echo Run: cd backend ^&^& setup.bat
    pause
    exit /b 1
)

REM Check if node_modules exists
if not exist "node_modules" (
    echo Installing frontend dependencies...
    call npm install
)

echo.
echo Starting services...
echo.

REM Start backend in new window
echo Starting backend...
start "Carbon Footprint - Backend" cmd /k "cd backend && venv\Scripts\activate.bat && python main.py"

REM Give backend time to start
timeout /t 2 /nobreak

REM Start frontend in new window
echo Starting frontend...
start "Carbon Footprint - Frontend" cmd /k "npm run dev"

echo.
echo ========================================
echo Services Starting
echo ========================================
echo.
echo Backend: http://localhost:8000
echo Backend Docs: http://localhost:8000/docs
echo Frontend: http://localhost:5173
echo.
echo Both windows will open in new terminal tabs.
echo Close the tabs to stop the services.
echo.
pause
