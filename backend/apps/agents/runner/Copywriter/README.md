# 📱 WhatsApp Agent — Django Web App

A full Django web application to manage and send personalized
WhatsApp messages using Meta's Official API + Claude AI.

---

## 📁 Project Structure

```
whatsapp_django/
│
├── manage.py                          ← Django entry point
├── requirements.txt
├── .env                               ← 🔐 Your API keys
│
├── whatsapp_project/                  ← Django project config
│   ├── settings.py
│   ├── urls.py
│   └── wsgi.py
│
├── whatsapp_agent/                    ← Django app
│   ├── models.py                      ← Lead + CampaignRun DB models
│   ├── views.py                       ← All page views
│   ├── urls.py                        ← URL routes
│   ├── admin.py                       ← Django admin
│   └── services/
│       ├── whatsapp_api.py            ← Meta API send functions
│       ├── message_generator.py       ← Claude AI personalization
│       └── campaign_runner.py         ← Core agent loop
│
└── templates/whatsapp_agent/          ← HTML templates
    ├── base.html
    ├── dashboard.html
    ├── upload_leads.html
    ├── leads_list.html
    ├── run_campaign.html
    ├── campaign_history.html
    ├── campaign_detail.html
    └── settings.html
```

---

## ⚙️ Setup & Run

### 1. Install dependencies
```bash
pip install -r requirements.txt
```

### 2. Fill in `.env`
```
META_ACCESS_TOKEN=your_token
PHONE_NUMBER_ID=your_id
ANTHROPIC_API_KEY=sk-ant-xxxxx
TEMPLATE_NAME=your_approved_template
```

### 3. Run migrations (creates database)
```bash
python manage.py migrate
```

### 4. Create admin user
```bash
python manage.py createsuperuser
```

### 5. Start server
```bash
python manage.py runserver
```

### 6. Open browser
```
http://127.0.0.1:8000
```

---

## 🌐 Pages

| URL | Page |
|-----|------|
| `/` | Dashboard |
| `/leads/` | All leads with filter & search |
| `/leads/upload/` | Import JSON leads |
| `/campaign/run/` | Start a campaign |
| `/campaign/history/` | All campaign runs |
| `/settings/` | API key status |
| `/admin/` | Django admin panel |

---

## 📋 JSON Lead Format

```json
[
  {
    "name":     "Rahul Sharma",
    "phone":    "919876543210",
    "business": "Restaurant",
    "interest": "food delivery app",
    "city":     "Mumbai"
  }
]
```

Paste this directly in the **Import JSON** page or upload a `.json` file.

---

## 🚀 How to Send Messages

1. Go to **Import JSON** → paste your leads
2. Go to **Run Campaign** → set daily limit
3. Click **Start Campaign**
4. Watch results in **Campaign History**
