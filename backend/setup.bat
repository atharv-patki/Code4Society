@echo off
REM Setup script for Carbon Footprint Backend on Windows

echo.
echo ========================================
echo Carbon Footprint Backend Setup
echo ========================================
echo.

REM Check if Python is installed
python --version >nul 2>&1
if %errorlevel% neq 0 (
    echo Error: Python is not installed or not in PATH
    echo Please install Python 3.9+ from https://www.python.org/
    pause
    exit /b 1
)

echo [1/3] Python found: 
python --version
echo.

REM Create virtual environment
echo [2/3] Creating virtual environment...
if not exist "venv" (
    python -m venv venv
    echo Virtual environment created
) else (
    echo Virtual environment already exists
)
echo.

REM Activate virtual environment
echo [3/3] Activating virtual environment and installing dependencies...
call venv\Scripts\activate.bat

REM Install requirements
pip install -q -r requirements.txt

REM Copy .env file if it doesn't exist
if not exist ".env" (
    copy .env.example .env
    echo .env file created. You can customize settings there.
)

echo.
echo ========================================
echo Setup Complete!
echo ========================================
echo.
echo To start the backend server, run:
echo   run.bat
echo.
echo Or manually activate the environment and run:
echo   venv\Scripts\activate.bat
echo   python main.py
echo.
pause
