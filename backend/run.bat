@echo off
REM Run script for Carbon Footprint Backend

echo.
echo ========================================
echo Carbon Footprint Backend
echo ========================================
echo.

REM Check if virtual environment exists
if not exist "venv" (
    echo Virtual environment not found!
    echo Please run setup.bat first
    pause
    exit /b 1
)

REM Activate virtual environment
call venv\Scripts\activate.bat

echo Backend starting...
echo.
echo API Documentation: http://localhost:8000/docs
echo Health Check: http://localhost:8000/api/health
echo.

REM Run the FastAPI server
python main.py
