@echo off
echo ============================================
echo   Carbon Track - Setup Script (Windows)
echo ============================================
echo.

REM Delete old database if exists
if exist db.sqlite3 (
    echo [1/4] Deleting old database...
    del db.sqlite3
    echo       Done.
) else (
    echo [1/4] No old database found. OK.
)

REM Install Django
echo.
echo [2/4] Installing Django...
pip install django
echo       Done.

REM Run migrations
echo.
echo [3/4] Creating database tables...
python manage.py migrate
echo       Done.

REM Start server
echo.
echo [4/4] Starting server...
echo.
echo ============================================
echo   Open your browser: http://127.0.0.1:8000
echo ============================================
echo.
python manage.py runserver 8000
pause
