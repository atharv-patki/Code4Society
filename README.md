# 🌍 Carbon Track - AI-Based Carbon Footprint Estimator
### Django Project with Indian Diet Categories & Claude AI Analysis

---

## 🔧 Fixing "no such table" Error

If you see **`Error: no such table: tracker_footprintrecord`** or any table error, run these steps:

```bash
# Step 1: Delete the old database
del db.sqlite3        # Windows
rm db.sqlite3         # Mac/Linux

# Step 2: Re-run migrations (creates fresh tables)
python manage.py migrate

# Step 3: Start the server again
python manage.py runserver 8000
```

This happens when an old `db.sqlite3` from a previous project exists. Deleting it and re-migrating fixes it completely.

---

## 🚀 Quick Setup

### 1. Install Dependencies
```bash
pip install django
```

### 2. Set Your Anthropic API Key
**Option A – Environment variable (recommended):**
```bash
export ANTHROPIC_API_KEY="your-api-key-here"
```

**Option B – Edit settings.py directly:**
Open `carbontrack/settings.py` and replace:
```python
ANTHROPIC_API_KEY = os.environ.get('ANTHROPIC_API_KEY', '')
```
with:
```python
ANTHROPIC_API_KEY = 'your-api-key-here'
```

### 3. Run Database Migrations
```bash
python manage.py migrate
```

### 4. Start the Server
```bash
python manage.py runserver 8000
```

### 5. Open in Browser
Visit: **http://127.0.0.1:8000**

---

## 📁 Project Structure

```
carbontrack/
├── manage.py
├── requirements.txt
├── README.md
├── db.sqlite3              ← auto-created on first migrate
├── carbontrack/            ← Django project config
│   ├── settings.py
│   ├── urls.py
│   └── wsgi.py
└── calculator/             ← Main app
    ├── constants.py        ← Emission coefficients & Indian diets
    ├── models.py           ← FootprintCalculation DB model
    ├── views.py            ← Calculator, History, AI advice
    ├── forms.py            ← Django form with all options
    ├── urls.py             ← URL routing
    └── templates/
        └── calculator/
            └── index.html  ← Full UI (dark theme)
```

---

## 🥘 Indian Diet Categories

| Diet | Monthly CO₂ | Description |
|------|-------------|-------------|
| Pure Vegetarian (Sattvic) | 48 kg | No onion/garlic, dairy-based, temple food |
| South Indian Vegetarian | 49.5 kg | Rice, sambar, idli, dosa |
| North Indian Vegetarian | 52.5 kg | Roti, dal makhani, paneer, heavy dairy |
| Jain Vegetarian | 45 kg | No root vegetables, strictly plant-based |
| Eggetarian (Indian) | 60 kg | Indian vegetarian + eggs |
| Indian Non-Veg (Chicken/Fish) | 78 kg | Chicken curry, fish, occasional red meat |
| Bengali (Fish Heavy) | 72 kg | Rice, fish, mustard-based cooking |
| Mughlai (Red Meat) | 93 kg | Biryani, kebabs, mutton, rich gravies |
| Street Food Heavy | 84 kg | Pav bhaji, chaat, fried snacks |

---

## 🚗 Transport Options (India-specific)

- 🛺 **Auto Rickshaw** — 0.10 kg CO₂/km
- 🚆 **Metro/Train** — 0.041 kg CO₂/km
- ⚡ **Electric Vehicle** — 0.053 kg CO₂/km (India grid)
- 🚌 **Bus** — 0.089 kg CO₂/km

---

## 🌐 API Endpoints

| URL | Method | Description |
|-----|--------|-------------|
| `/` | GET | Main calculator page |
| `/calculate/` | POST | Calculate footprint + AI advice |
| `/history/` | GET | Get past calculations (JSON) |
| `/diet-info/` | GET | Diet metadata (JSON) |

---

## ⚙️ Notes

- **India electricity grid factor**: 0.82 kg CO₂/kWh (higher than global average of 0.233)
- **AI advice** requires a valid `ANTHROPIC_API_KEY`; falls back to static tips if not set
- All calculations saved to SQLite database (`db.sqlite3`)
- History shows last 20 calculations
