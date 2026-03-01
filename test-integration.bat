@echo off
REM Integration Test Script - Verifies frontend and backend are connected

echo.
echo ========================================
echo Testing Frontend-Backend Integration
echo ========================================
echo.

REM Check if backend is running
echo [1/3] Checking if Backend is running on port 8000...
timeout /t 1 /nobreak >nul
curl -s http://localhost:8000/api/health >nul 2>&1

if %errorlevel% equ 0 (
    echo ✓ Backend is running
    curl -s http://localhost:8000/api/health | findstr /r "healthy"
) else (
    echo ✗ Backend is NOT running on http://localhost:8000
    echo   Start it with: cd backend ^&^& python main.py
    echo.
)

REM Check if frontend is running
echo.
echo [2/3] Checking if Frontend is running on port 5173...
timeout /t 1 /nobreak >nul
curl -s http://localhost:5173 >nul 2>&1

if %errorlevel% equ 0 (
    echo ✓ Frontend is running at http://localhost:5173
) else (
    echo ✗ Frontend is NOT running on http://localhost:5173
    echo   Start it with: cd frontend ^&^& npm run dev
    echo.
)

REM Test API connection
echo.
echo [3/3] Testing API connectivity...
echo Sending test request to POST /api/calculate...
echo.

if exist "test_payload.json" (
    curl -s -X POST http://localhost:8000/api/calculate ^
         -H "Content-Type: application/json" ^
         -d @test_payload.json | findstr /r "total_co2"
) else (
    REM Create a test payload on the fly
    (
        echo {
        echo   "transport": {
        echo     "mode": "car",
        echo     "distance_per_day": 10
        echo   },
        echo   "diet": {
        echo     "type": "veg"
        echo   },
        echo   "energy": {
        echo     "monthly_units": 100
        echo   }
        echo }
    ) | curl -s -X POST http://localhost:8000/api/calculate ^
         -H "Content-Type: application/json" ^
         -d @- 2>nul | findstr /r "total_co2"
    
    if %errorlevel% equ 0 (
        echo ✓ API Response successful
    ) else (
        echo ✗ API is not responding
    )
)

echo.
echo ========================================
echo Test Complete
echo ========================================
echo.
echo API Documentation: http://localhost:8000/docs
echo Frontend: http://localhost:5173
echo.
pause
