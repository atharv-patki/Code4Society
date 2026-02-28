#!/bin/bash
echo "============================================"
echo "  Carbon Track - Setup Script (Mac/Linux)"
echo "============================================"
echo ""

# Delete old database
if [ -f db.sqlite3 ]; then
    echo "[1/4] Deleting old database..."
    rm db.sqlite3
    echo "      Done."
else
    echo "[1/4] No old database found. OK."
fi

# Install Django
echo ""
echo "[2/4] Installing Django..."
pip install django
echo "      Done."

# Run migrations
echo ""
echo "[3/4] Creating database tables..."
python manage.py migrate
echo "      Done."

# Start server
echo ""
echo "[4/4] Starting server..."
echo ""
echo "============================================"
echo "  Open your browser: http://127.0.0.1:8000"
echo "============================================"
echo ""
python manage.py runserver 8000
