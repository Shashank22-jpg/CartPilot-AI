# CartPilot AI 🛒🤖

> **Intelligent Agentic Commerce Platform**  
> Built for the **PayPal AI Hackathon 2026**

CartPilot AI is an intelligent agentic commerce platform that helps consumers discover, evaluate, compare, purchase, and manage physical goods through an autonomous AI shopping agent. Going far beyond conventional chatbots, CartPilot AI combines **Google Gemini 2.5 Pro autonomous tool-calling**, **Supabase PostgreSQL** data attestation, **PayPal Orders v2 Sandbox** checkout with strict server-side cryptographic capture verification, and post-purchase lifecycle management via tokenized **Digital Purchase Passports**.

---

## 🌟 Key Features

### 1. Hybrid Design Architecture
- **Consumer Retail Experience (Light Theme)**: Clean, warm off-white background (`#fcfbf9`), emerald brand accents (`#0f766e`), forest green typography, and generous whitespace inspired by modern luxury retail. Applied to Storefront, Product Discovery, PDP Modal, Shopping Cart, Checkout, Order History, and Settings.
- **AI & Intelligence Workspaces (Dark Navy Theme)**: Immersive command center (`#060A13` / `#0A101D`) with subtle cyan & electric blue accents. Applied to the **AI Shopping Assistant** and **Purchase Intelligence Dossier**.

### 2. Autonomous AI Shopping Assistant
- Powered by **Google Gemini 2.5 Pro** with multi-turn conversation and function/tool-calling.
- Autonomous capabilities:
  - `search_products`: Real-time semantic and multi-attribute catalogue filtering.
  - `get_product_details`: Retrieves deep technical specifications, warranty terms, and return rights.
  - `compare_products`: Side-by-side trade-off analysis across 2 to 4 products.
  - `add_to_cart`: Stages items directly into the user's shopping cart.
- Embeds natural product recommendation cards within message streams with one-click Add to Cart and Compare actions.

### 3. Unified Product Catalogue & Discovery
- Built on the authoritative open-source **Aptdot CC0 Benchmark Catalogue** (48 active products, 135 SKU variant configurations).
- Category filtering, price ceiling range slider, real-time availability badges, and pure USD (`$`) accounting.
- Interactive **Product Details Modal (PDP)** with image zoom, variant matrix (size/color/case), stock counters, and tabbed specifications.

### 4. Smart Comparison & Purchase Intelligence
- **Product Comparison (`/compare`)**: Side-by-side technical specification matrix highlighting verified differences in price, stock, ratings, dimensions, materials, and warranty.
- **Purchase Intelligence (`/intelligence`)**: Analytical decision dashboard featuring:
  - Executive summary: *"What to know before buying"*.
  - Category-based product selector.
  - Audited specifications vs. explicit gap analysis of unrecorded benchmarks.
  - Seller provenance, warranty safeguards, and value index.

### 5. Secure Shopping Cart & PayPal Sandbox Checkout
- Multi-item cart management with quantity controls, subtotal calculations, and monthly budget ceiling guardrails.
- Client-side integration of official `@paypal/react-paypal-js` SDK.
- **Strict Server-Side Capture Verification**: Frontend authorizations are cryptographically routed to `/api/paypal/capture-order` for upstream REST verification against `api-m.sandbox.paypal.com`.

### 6. Order History & Digital Purchase Passports
- Complete user order history backed by Supabase with live status filters (`COMPLETED`, `PENDING`, `CANCELLED`).
- Interactive **Digital Purchase Passports (`/passport`)**: Cryptographic proof-of-purchase token with serial numbers, dynamic warranty countdowns, return window trackers, and one-click printable certificate exports.

---

## 🏗️ Technology Stack

| Layer | Technologies |
| :--- | :--- |
| **Frontend** | React 18, Vite, Tailwind CSS, Lucide React, Motion (`motion/react`), `@paypal/react-paypal-js`, Canvas Confetti |
| **Backend** | Node.js (v24 LTS / v18+), Express.js, CORS, Morgan, Dotenv |
| **Deployment** | Vercel Serverless Functions, Vercel Edge CDN (Single Project & Domain) |
| **Database & Auth** | Supabase PostgreSQL (`@supabase/supabase-js`), Row Level Security (RLS) |
| **AI Intelligence** | Google Gemini 2.5 Pro (`@google/generative-ai`) with autonomous tool calling |
| **Payments** | PayPal Orders v2 REST API (Sandbox Environment) |
| **Testing & Quality** | Custom AST Hook Analyzers, PayPal Sandbox Integration Tests, Quality Audits |

---

## 📁 Repository Structure

```text
CartpilotAI/
├── vercel.json                   # Single-project Vercel deployment & routing configuration
├── .gitignore                    # Excludes node_modules, secrets, .env files, build artifacts
├── .env.example                  # Unified environment reference guide for Vercel & local
├── package.json                  # Root dependencies, install, build, and start scripts
├── README.md                     # Complete project documentation & deployment guides
├── seed.sql                      # Supabase database schema & seed scripts
│
├── api/                          # Vercel Serverless Function Entrypoints
│   ├── index.js                  # Canonical serverless handler wrapping Express app
│   └── health.js                 # Standalone health check serverless entrypoint
│
├── client/                       # React 18 + Vite + Tailwind CSS Frontend
│   ├── .env.example              # Frontend environment variables template
│   ├── index.html                # Vite HTML entry
│   ├── package.json              # Client dependencies & scripts
│   ├── tailwind.config.js        # Hybrid design tokens (Emporium Light + Dark Navy)
│   ├── vite.config.js            # Vite configuration with API reverse proxy
│   └── src/
│       ├── App.jsx               # Routes setup & AppProvider wrapper
│       ├── components/
│       │   ├── checkout/         # PayPal Smart Buttons & Checkout Modal
│       │   ├── layout/           # AppLayout, Header, and Sidebar
│       │   └── product/          # ProductDetailModal & specification matrix
│       ├── context/
│       │   ├── AppContext.jsx    # Global cart, compare, intelligence, orders, and auth state
│       │   └── ThemeContext.jsx  # Hybrid route-aware theme controller
│       ├── pages/
│       │   ├── DashboardPage.jsx # Storefront homepage with hero & featured grid
│       │   ├── DiscoverPage.jsx  # Catalogue discovery, filters, and PDP
│       │   ├── AssistantPage.jsx # Conversational AI shopping companion
│       │   ├── ComparePage.jsx   # Side-by-side product difference comparison
│       │   ├── IntelligencePage.jsx # Analytical product decision dashboard
│       │   ├── CartPage.jsx      # Shopping cart & budget ceiling guardrail
│       │   ├── OrdersPage.jsx    # Order history & transaction ledger
│       │   ├── PassportPage.jsx  # Digital Purchase Passports & warranty management
│       │   ├── LoginPage.jsx     # Supabase authentication login
│       │   ├── RegisterPage.jsx  # Supabase registration & preferences setup
│       │   └── SettingsPage.jsx  # Budget limits, criteria, & notifications
│       └── utils/
│           └── currency.js       # Pure USD ($) currency formatting
│
└── server/                       # Reusable Backend Business Logic & Services
    ├── .env.example              # Backend environment variables template
    ├── package.json              # Server dependencies & scripts
    └── src/
        ├── index.js              # Server entry point for local dev & standalone containers
        ├── app.js                # Express app, CORS, routes aggregation, SPA fallback
        ├── config/
        │   ├── env.js            # Central environment parser & validation
        │   ├── gemini.js         # Google Gemini AI client configuration
        │   ├── paypal.js         # PayPal OAuth2 client credentials & sandbox manager
        │   └── supabase.js       # Supabase PostgreSQL client initializer
        ├── controllers/
        │   ├── aiController.js   # Gemini agent multi-turn conversation handler
        │   ├── healthController.js # Database & service health reporter
        │   └── paypalController.js # Server-side PayPal order creation & capture
        ├── middlewares/
        │   ├── authMiddleware.js # Supabase JWT verification
        │   ├── errorHandler.js   # Production-safe error masks
        │   └── rateLimiter.js    # Serverless-safe unref in-memory rate limiter
        ├── routes/               # API route aggregators (health, auth, ai, products, orders, cart, paypal)
        ├── scripts/              # Automated test suites & PayPal verification scripts
        └── services/
            ├── aiAgent.js        # Gemini autonomous tool declarations & execution
            ├── db.js             # Supabase database access layer
            └── paypalService.js  # Upstream PayPal REST API v2 client
```

---

## 🔒 Security & Safe Commerce Guardrails

1. **Strict Server-Side Payment Verification**:
   - The frontend never confirms payments autonomously.
   - All captures are posted to `/api/payments/capture-order` where the backend verifies the transaction with PayPal's sandbox servers before recording order state or minting digital passports.
2. **Zero Secret Exposure**:
   - Private API keys, PayPal client secrets, and Supabase service-role keys reside strictly on the serverless backend.
   - All `.env*` files are strictly excluded via `.gitignore`.
3. **Demonstration & Synthetic Data Disclosures**:
   - **Catalogue Data**: All products, SKU identifiers, specifications, and merchant records belong to the open-source **Aptdot CC0-1.0 Universal** benchmark dataset.
   - **Sandbox Payments**: All checkout flows operate strictly in **PayPal Sandbox mode** using simulated test balances. Real financial capture and physical delivery are intentionally prohibited.
   - **Honest Absence**: Unverified product attributes are explicitly labeled *"Not available in the catalogue"* rather than fabricated.

---

## 🚀 Unified Vercel Deployment (One Project, One Domain)

Deploying CartPilot AI to Vercel requires **ONE project** and produces **ONE public URL**:

### 1. Import Project to Vercel
1. Open the **[Vercel Dashboard](https://vercel.com/dashboard)**.
2. Click **Add New → Project**.
3. Select your repository.
4. Keep the **Root Directory** as `./` *(repository root)*.
5. Vercel automatically detects [`vercel.json`](file:///d:/CartpilotAI/vercel.json), uses `npm run build` to build the frontend into `client/dist`, and deploys the backend serverless functions in `api/`.

### 2. Configure Environment Variables in Vercel
In **Project Settings → Environment Variables**, add:

| Variable | Recommended Value | Sensitive |
| :--- | :--- | :--- |
| `NODE_ENV` | `production` | No |
| `PAYPAL_MODE` | `sandbox` *(STRICT: Live mode blocked)* | No |
| `PAYPAL_CLIENT_ID` | Your PayPal Sandbox App Client ID | No |
| `PAYPAL_CLIENT_SECRET` | Your PayPal Sandbox App Secret Key | **YES** |
| `SUPABASE_URL` | `https://<your-project-ref>.supabase.co` | No |
| `SUPABASE_ANON_KEY` | Your Supabase Anonymous Public Key | No |
| `SUPABASE_SERVICE_ROLE_KEY` | Your Supabase Service Role Secret Key | **YES** |
| `GEMINI_API_KEY` | Your Google Gemini API Key | **YES** |
| `GEMINI_MODEL` | `gemini-1.5-pro` | No |
| `VITE_SUPABASE_URL` | `https://<your-project-ref>.supabase.co` | No |
| `VITE_SUPABASE_ANON_KEY` | Your Supabase Anonymous Public Key | No |
| `VITE_PAYPAL_CLIENT_ID` | Your PayPal Sandbox App Client ID | No |
| `VITE_APP_ENV` | `production` | No |

*Leave `VITE_API_BASE_URL` empty so all requests naturally use relative same-domain `/api` paths.*

---

## 💻 Local Development Setup

### 1. Installation
```bash
npm run install:all
```

### 2. Environment Configuration
Create local `.env` files in `client/` and `server/` following `.env.example`.

### 3. Database Migration & Seeding
1. Open your **[Supabase Dashboard](https://supabase.com/dashboard)**.
2. In the **SQL Editor**, run the contents of [`seed.sql`](file:///d:/CartpilotAI/seed.sql).
3. This creates all tables, RLS policies, and populates the 48 active Aptdot benchmark products.

### 4. Running Locally
```bash
npm run dev
```
- **Frontend**: [http://localhost:5173](http://localhost:5173)
- **Backend API**: [http://localhost:5000](http://localhost:5000)
- **Health Check**: [http://localhost:5000/health](http://localhost:5000/health)

---

## 🧪 Automated Testing & Verification

```bash
# Run comprehensive quality & functionality audit (41 automated tests)
node scratch/final_quality_audit.js

# Run Single Server & Vercel API routing verification suite (18 automated tests)
node scratch/test_single_server.js

# Run PayPal Sandbox integration & error handling suite (7 automated tests)
node server/src/scripts/test_paypal_repair.js

# Run React AST hook analyzer (validates Rules of Hooks across all components)
node scratch/ast_check_hooks.js

# Run frontend production build
npm run build
```

---

## 📄 License
MIT License. Built for the PayPal AI Hackathon 2026.
