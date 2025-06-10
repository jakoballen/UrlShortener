# 🔗 Serverless URL Shortener

A lightweight URL shortener built with **AWS Lambda**, **DynamoDB**, and **Netlify**. Paste a long URL, get a short one — just like that.

**Live Demo**: [t-9.cc](https://t-9.cc) *(or your Netlify site)*  
**Repo**: [jakoballen/UrlShortener](https://github.com/jakoballen/UrlShortener)

---

## 🚀 Tech Stack

- **Hosting & Edge Functions**: Netlify
- **Backend Logic**: AWS Lambda (via Netlify Edge Functions)
- **Database**: AWS DynamoDB (NoSQL)
- **Languages**: JavaScript (Node.js)

---

## 📦 Features

- Generate short links for long URLs
- Serverless architecture — no backend server required
- Persistent link storage using DynamoDB (14 day expiry)
- Deployed with GitHub + Netlify CI/CD

---

## 📂 Project Structure

```bash
.
├── index.html               # Main frontend UI
├── script.js                # Frontend logic for submitting URLs
├── netlify.toml             # Netlify config (routes, functions, etc.)
├── package.json             # Project metadata and dependencies
├── package-lock.json
├── netlify/
│   ├── edge-functions/
│   │   ├── redirect.js      # Edge function handling redirects from short URLs
│   │   └── manifest.json    # Netlify edge function manifest
│   └── functions/
│       └── shorten.js       # Serverless function to create new short URLs (AWS Lambda)
└── README.md               # You are here!
