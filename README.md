# CartPilot AI 🛒🤖

> **Intelligent Agentic Commerce Platform**  
> Built for the **PayPal AI Hackathon 2026**

CartPilot AI is an intelligent agentic commerce platform that helps users research, evaluate, purchase, and manage products through an AI-powered shopping agent. Going far beyond conventional chatbots, CartPilot AI analyzes user intent, compares specifications, conducts evidence-based risk assessment, curates shopping carts, facilitates customer-authorized PayPal sandbox checkout with strict server-side verification, and provides post-purchase assistance with Digital Purchase Passports.

---

## 🏗️ Technology Stack

| Layer | Technologies |
| :--- | :--- |
| **Frontend** | React 18, Vite, JavaScript, Tailwind CSS, Lucide React, `@paypal/react-paypal-js` |
| **Backend** | Node.js, Express.js, CORS, Morgan, Dotenv |
| **Database** | Supabase PostgreSQL (`@supabase/supabase-js`) |
| **AI Engine** | Google Gemini API (`@google/generative-ai`) with tool/function calling |
| **Payments** | PayPal Orders v2 REST API (Sandbox Environment) |
| **Deployment** | Vercel (Frontend), Render (Backend) |

---

## 📁 Project Architecture & Structure

```text
CartpilotAI/
├── .gitignore                    # Excludes node_modules, secrets, .env files, build artifacts
├── .env.example                  # Root environment reference guide
├── package.json                  # Root scripts for concurrently running client & server
├── README.md                     # Project documentation & setup instructions
│
├── client/                       # React 18 + Vite + Tailwind CSS Frontend
│   ├── .env.example              # Frontend environment variables template
│   ├── index.html                # Vite HTML entry
│   ├── package.json              # Client dependencies & scripts
│   ├── postcss.config.js         # PostCSS configuration
│   ├── tailwind.config.js        # Tailwind CSS configuration with brand palettes
│   ├── vite.config.js            # Vite configuration with API reverse proxy
│   ├── public/
│   │   └── favicon.svg           # CartPilot SVG icon
│   └── src/
│       ├── main.jsx              # Application bootstrap
│       ├── App.jsx               # Root React component with live health polling
│       ├── index.css             # Tailwind directives & global styling
│       ├── components/
│       │   ├── common/
│       │   │   ├── Navbar.jsx    # Navigation bar with live backend status indicator
│       │   │   ├── Footer.jsx    # Footer with architecture tags
│       │   │   └── StatusBadge.jsx # Evidence verification badges (Verified, Seller Claim, Unavailable)
│       │   ├── chat/             # AI agent conversation & recommendation interface
│       │   ├── products/         # Catalogue, filters, and specification matrix
│       │   ├── cart/             # Cart staging and budget optimization
│       │   ├── checkout/         # PayPal Sandbox checkout integration
│       │   └── passport/         # Digital Purchase Passport & warranty countdown
│       ├── context/              # React context providers
│       ├── hooks/                # Custom React hooks
│       ├── pages/
│       │   └── HomePage.jsx      # Dashboard with live diagnostics & capability matrix
│       ├── services/
│       │   └── api.js            # Central API client with error handling
│       └── utils/                # Utility helpers
│
└── server/                       # Node.js + Express.js API Backend
    ├── .env.example              # Backend environment variables template
    ├── package.json              # Server dependencies & scripts
    └── src/
        ├── index.js              # Server entry point & graceful shutdown
        ├── app.js                # Express app setup, CORS, JSON parser, route aggregation
        ├── config/
        │   ├── env.js            # Environment loader & configuration validator
        │   ├── gemini.js         # Google Gemini AI client configuration
        │   ├── paypal.js         # PayPal OAuth2 client credentials & sandbox manager
        │   └── supabase.js       # Supabase PostgreSQL client initializer
        ├── controllers/
        │   └── healthController.js # Health-check diagnostic controller
        ├── middlewares/
        │   ├── errorHandler.js   # Centralized error handler & 404 router
        │   └── requestLogger.js  # HTTP request logger (Morgan)
        ├── routes/
        │   ├── index.js          # Main API aggregator router (`/api`)
        │   ├── healthRoutes.js   # Health check route (`/api/health`)
        │   ├── aiRoutes.js       # Gemini agent route placeholders (`/api/ai`)
        │   ├── productRoutes.js  # Product catalogue placeholders (`/api/products`)
        │   ├── orderRoutes.js    # Order & passport placeholders (`/api/orders`)
        │   └── paypalRoutes.js   # Server-side PayPal order & verification (`/api/paypal`)
        ├── services/             # Core business logic services
        └── utils/
            └── response.js       # Standardized JSON response formatters
```

---

## 🔒 Security & Development Rules

1. **Strict Server-Side Payment Verification**:
   - The frontend never confirms payments autonomously.
   - All captures are posted to `/api/paypal/capture-order` where the Express backend verifies the transaction against the PayPal REST API before updating database state.
2. **Zero Secret Exposure**:
   - Private API keys, PayPal client secrets, and service-role keys reside strictly on the server.
   - All `.env*` files are strictly excluded via `.gitignore`.
3. **Evidence-Based Information**:
   - The platform strictly differentiates between verified manufacturer specifications, seller claims, and unverified data.

---

## 🚀 Getting Started

### Prerequisites

- **Node.js**: v18.0.0+ (Tested on Node v24.21.0)
- **npm**: v9.0.0+ (Tested on npm 11.19.0)

### 1. Installation

Install all dependencies across root, backend, and frontend:

```bash
# Using root helper
npm run install:all

# Or manually:
npm install
cd server && npm install
cd ../client && npm install
cd ..
```

### 2. Environment Configuration

Create `.env` files in both `client` and `server` folders using the provided `.env.example` templates:

#### Backend (`server/.env`):
```bash
PORT=5000
NODE_ENV=development
CLIENT_URL=http://localhost:5173

# PayPal Sandbox Credentials
PAYPAL_MODE=sandbox
PAYPAL_CLIENT_ID=your_paypal_sandbox_client_id_here
PAYPAL_CLIENT_SECRET=your_paypal_sandbox_client_secret_here

# Supabase Credentials
SUPABASE_URL=https://your-project.supabase.co
SUPABASE_ANON_KEY=your_supabase_anon_key_here

# Google Gemini API
GEMINI_API_KEY=your_gemini_api_key_here
```

#### Frontend (`client/.env`):
```bash
# Empty in development to use Vite proxy
VITE_API_BASE_URL=
VITE_PAYPAL_CLIENT_ID=your_paypal_sandbox_client_id_here
```

### 3. Running in Development Mode

Run both client and server concurrently from the root directory:

```bash
npm run dev
```

Or run them individually in separate terminal sessions:

```bash
# Backend (runs on http://localhost:5000)
npm run dev:server

# Frontend (runs on http://localhost:5173)
npm run dev:client
```

---

## 🩺 Health Check & Diagnostics

Once running, verify connectivity:

- **Backend Health Check**: [http://localhost:5000/api/health](http://localhost:5000/api/health)
  ```json
  {
    "status": "ok",
    "service": "CartPilot AI API",
    "version": "1.0.0",
    "environment": "development",
    "uptimeSeconds": 12.4,
    "timestamp": "2026-11-01T07:25:00.000Z",
    "integrations": {
      "paypal": false,
      "supabase": false,
      "gemini": false
    }
  }
  ```
- **Frontend Dashboard**: [http://localhost:5173](http://localhost:5173) displays real-time connection status, roundtrip latency, and diagnostic information.

---

## 📋 Hackathon Roadmap (14 Core Requirements)

- [x] **Project Initialization**: Modular monorepo setup, Vite + React, Tailwind CSS, Express backend, health check API.
- [ ] **Auth & User Profiles**: Supabase Authentication with profile preferences and budgets.
- [ ] **Product Catalogue**: Realistic seed dataset with structured evidence and specifications.
- [ ] **Natural-Language Discovery**: Gemini-powered conversational query analysis.
- [ ] **Specification Comparison**: Side-by-side evidence matrix and tradeoff analysis.
- [ ] **Budget-Aware Recommendations**: Smart bundle optimization within designated spending caps.
- [ ] **Risk Assessment**: Differentiating verified facts vs seller claims vs unavailable data.
- [ ] **Shopping Cart & Checkout**: Cart staging with line items and currency conversions.
- [ ] **PayPal Sandbox Integration**: Client-side PayPal Smart Buttons.
- [ ] **Server-Side Payment Verification**: Strict capture verification against PayPal Orders v2 API.
- [ ] **Order History & Ledger**: Supabase database recording with verification receipts.
- [ ] **Digital Purchase Passport**: Interactive digital passport proving authentic purchase.
- [ ] **Warranty & Return Management**: Automated return windows and warranty tracking.
- [ ] **Post-Purchase AI Assistant**: Post-sale troubleshooting and claim facilitation.
