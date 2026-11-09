import { SchemaType } from '@google/generative-ai';
import { getGeminiModel, isGeminiConfigured } from '../config/gemini.js';
import { getDbProducts, getDbProductByIdOrSlug } from './db.js';

/**
 * CartPilot AI - Gemini Tool Calling Declarations
 * Declares the 4 shopping capabilities for the AI Agent
 */
export const aiTools = [
  {
    functionDeclarations: [
      {
        name: 'search_products',
        description: 'Search for products in the CartPilot catalogue from the Supabase PostgreSQL database based on search keywords, category, and price/budget constraints in INR (₹). Always use this when user asks for product recommendations, searches, or ideas.',
        parameters: {
          type: SchemaType.OBJECT,
          properties: {
            query: {
              type: SchemaType.STRING,
              description: 'Keywords, item names, or specifications to search for (e.g. "wireless headphones", "MacBook", "mechanical keyboard", "drone", "OLED monitor").',
            },
            category: {
              type: SchemaType.STRING,
              description: 'Optional category filter: Audio, Laptops, Keyboards, Monitors, Drones, Cameras, Gaming, Wearables, Smartphones, Accessories.',
            },
            minPrice: {
              type: SchemaType.NUMBER,
              description: 'Minimum price filter in INR (₹).',
            },
            maxPrice: {
              type: SchemaType.NUMBER,
              description: 'Maximum budget or price cap in INR (₹).',
            },
          },
        },
      },
      {
        name: 'get_product_details',
        description: 'Retrieve full verified specifications, benchmark evidence, warranty coverage, and return policy details for a specific product from the database by its UUID or slug identifier.',
        parameters: {
          type: SchemaType.OBJECT,
          properties: {
            productIdOrSlug: {
              type: SchemaType.STRING,
              description: 'The product UUID or slug (e.g. "sony-wh-1000xm5", "macbook-pro-14-m3-pro", "keychron-q1-pro").',
            },
          },
          required: ['productIdOrSlug'],
        },
      },
      {
        name: 'compare_products',
        description: 'Perform a detailed side-by-side technical, financial, and policy comparison of 2 or 3 products from the database.',
        parameters: {
          type: SchemaType.OBJECT,
          properties: {
            productIdsOrSlugs: {
              type: SchemaType.ARRAY,
              items: { type: SchemaType.STRING },
              description: 'Array of 2 to 3 product IDs or slugs to compare side-by-side.',
            },
          },
          required: ['productIdsOrSlugs'],
        },
      },
      {
        name: 'add_to_cart',
        description: 'Stage an available product into the user shopping cart. ONLY call this when the user explicitly instructs to add the item to their cart or buy it. Never call this if the user is merely browsing, comparing, or asking for information.',
        parameters: {
          type: SchemaType.OBJECT,
          properties: {
            productIdOrSlug: {
              type: SchemaType.STRING,
              description: 'The product UUID or slug to add to the cart.',
            },
            quantity: {
              type: SchemaType.INTEGER,
              description: 'Number of units to stage into the cart (default 1, max 10).',
            },
          },
          required: ['productIdOrSlug'],
        },
      },
    ],
  },
];

const SYSTEM_INSTRUCTION = `You are CartPilot AI, an elite, professional, and trustworthy autonomous commerce agent for the PayPal AI Hackathon 2026.
Your role is to understand user shopping requirements, discover products, compare specifications, evaluate purchase information, and provide evidence-based recommendations.

CORE OPERATIONAL RULES:
1. CURRENCY: Always use Indian Rupees (INR, ₹). Never quote prices in USD, EUR, or other currencies.
2. HONESTY & FACTS:
   - NEVER invent or hallucinate products, prices, stock levels, or seller ratings.
   - Base all recommendations strictly on real data returned by your database tools.
   - Clearly distinguish verified database facts from unverified or unavailable information.
   - If a specification or evidence log is not in the database, explicitly state that it is not provided or unverified.
3. TOOL CALLING PROTOCOL:
   - When the user asks for suggestions, recommendations, or searches for hardware/gear, invoke \`search_products\`.
   - When the user asks for detailed technical specifications, warranty terms, or return conditions for a specific product, invoke \`get_product_details\`.
   - When the user asks to compare 2 or 3 items, invoke \`compare_products\`.
   - When the user explicitly states they want to add an item to their cart (e.g., "Add the Sony XM5 to my cart", "I want to buy this one"), invoke \`add_to_cart\`.
   - NEVER invoke \`add_to_cart\` unless the user explicitly requested adding or purchasing it.
4. RECOMMENDATION CLARITY:
   - For every recommended product, state its exact title, price in INR, and in-stock status.
   - Explain WHY it fits the user's specific constraints (budget, battery life, performance, ergonomics).
   - Highlight any trade-offs or key return policies (e.g., 14-day or 30-day window, restocking conditions).
5. CLARIFICATION & INTERACTION:
   - If the user request is ambiguous (e.g. "I need a computer"), ask 1-2 concise clarifying questions about their primary use case (development, creative, gaming), budget, or portability needs before searching.`;

/**
 * Execute tool against live Supabase database
 */
async function executeTool(fnName, args) {
  switch (fnName) {
    case 'search_products': {
      const { query, category, minPrice, maxPrice } = args || {};
      const products = await getDbProducts({
        search: query,
        category,
        minPrice,
        maxPrice,
        limit: 10,
      });

      if (!products || products.length === 0) {
        return {
          found: false,
          count: 0,
          products: [],
          message: 'No matching products found in the database for the given criteria.',
        };
      }

      return {
        found: true,
        count: products.length,
        products: products.map(p => ({
          id: p.id,
          slug: p.slug,
          title: p.title,
          brand: p.brand,
          category: p.category,
          price: Number(p.price),
          original_price: p.original_price ? Number(p.original_price) : null,
          currency: p.currency || 'INR',
          rating: Number(p.rating),
          reviews_count: p.reviews_count,
          stock: p.stock,
          in_stock: p.in_stock,
          image_url: p.image_url,
          tag: p.tag,
          specs: p.specs,
          pros: p.pros,
          warranty: p.warranty,
          return_policy: p.return_policy,
        })),
      };
    }

    case 'get_product_details': {
      const { productIdOrSlug } = args || {};
      if (!productIdOrSlug) {
        return { error: 'productIdOrSlug is required.' };
      }
      const product = await getDbProductByIdOrSlug(productIdOrSlug);
      if (!product) {
        return { error: `Product with identifier "${productIdOrSlug}" not found in database.` };
      }
      return {
        found: true,
        product: {
          id: product.id,
          slug: product.slug,
          title: product.title,
          brand: product.brand,
          category: product.category,
          description: product.description,
          price: Number(product.price),
          original_price: product.original_price ? Number(product.original_price) : null,
          currency: product.currency || 'INR',
          rating: Number(product.rating),
          reviews_count: product.reviews_count,
          stock: product.stock,
          in_stock: product.in_stock,
          image_url: product.image_url,
          tag: product.tag,
          specs: product.specs,
          pros: product.pros,
          cons: product.cons,
          seller: product.seller,
          evidence: product.evidence,
          warranty: product.warranty,
          return_policy: product.return_policy,
          risk_assessment: product.risk_assessment,
        },
      };
    }

    case 'compare_products': {
      const { productIdsOrSlugs } = args || {};
      if (!Array.isArray(productIdsOrSlugs) || productIdsOrSlugs.length < 2) {
        return { error: 'Please provide at least 2 product IDs or slugs to compare.' };
      }

      const products = [];
      for (const id of productIdsOrSlugs.slice(0, 3)) {
        const p = await getDbProductByIdOrSlug(id);
        if (p) products.push(p);
      }

      if (products.length < 2) {
        return { error: 'Could not find at least 2 valid products in the database to compare.' };
      }

      const comparisonItems = products.map(p => ({
        id: p.id,
        slug: p.slug,
        title: p.title,
        brand: p.brand,
        price: Number(p.price),
        currency: p.currency || 'INR',
        stock: p.stock,
        rating: Number(p.rating),
        image_url: p.image_url,
        keyStrengths: (p.pros || []).slice(0, 3).join('. ') || 'Verified build quality',
        warranty: p.warranty?.duration || '1 Year Standard',
        returnWindow: `${p.return_policy?.days || 30} Days`,
        keySpecs: p.specs,
      }));

      return {
        comparisonTitle: `${products.map(p => p.brand + ' ' + (p.tag || p.title.split(' ')[1] || '')).join(' vs. ')} Comparison`,
        productsCount: products.length,
        items: comparisonItems,
      };
    }

    case 'add_to_cart': {
      const { productIdOrSlug, quantity = 1 } = args || {};
      const validQty = Math.max(1, Math.min(parseInt(quantity, 10) || 1, 10));

      if (!productIdOrSlug) {
        return { success: false, error: 'Product identifier is required.' };
      }

      const product = await getDbProductByIdOrSlug(productIdOrSlug);
      if (!product) {
        return { success: false, error: `Product "${productIdOrSlug}" not found in database.` };
      }

      if (!product.in_stock || (product.stock !== undefined && product.stock < validQty)) {
        return {
          success: false,
          error: `Product "${product.title}" is currently out of stock or insufficient inventory (Available: ${product.stock || 0}).`,
        };
      }

      return {
        success: true,
        action: 'cart_add',
        product: {
          id: product.id,
          slug: product.slug,
          title: product.title,
          brand: product.brand,
          category: product.category,
          price: Number(product.price),
          currency: product.currency || 'INR',
          image: product.image_url,
          image_url: product.image_url,
          stock: product.stock,
          specs: product.specs,
        },
        quantity: validQty,
        message: `Staged ${validQty}x "${product.title}" into your shopping cart at ₹${Number(product.price).toLocaleString('en-IN')}.`,
      };
    }

    default:
      return { error: `Unknown tool function "${fnName}".` };
  }
}

/**
 * Main AI Agent Chat Handler
 * Processes multi-turn conversation, invokes tools, and returns structured payload
 */
export async function handleAgentChat({ message, history = [], context = {} }) {
  if (!message || typeof message !== 'string' || !message.trim()) {
    throw new Error('Message is required and cannot be empty.');
  }

  if (!isGeminiConfigured()) {
    return {
      success: false,
      reply: 'The Gemini AI agent is pending configuration. Please add GEMINI_API_KEY in server/.env.',
      activityLog: ['Gemini API key missing in environment'],
      recommendations: [],
      comparison: null,
      cartAction: null,
    };
  }

  const model = getGeminiModel({
    systemInstruction: SYSTEM_INSTRUCTION,
    tools: aiTools,
    generationConfig: {
      temperature: 0.2, // Low temperature for high factual accuracy
      topP: 0.8,
      maxOutputTokens: 1500,
    },
  });

  // Prepare Gemini contents from history
  const contents = [];

  // Add relevant previous turns (up to 8 turns for context window efficiency)
  if (Array.isArray(history)) {
    for (const item of history.slice(-8)) {
      if (item.sender === 'user' && item.text) {
        contents.push({ role: 'user', parts: [{ text: item.text }] });
      } else if (item.sender === 'assistant' && item.text) {
        contents.push({ role: 'model', parts: [{ text: item.text }] });
      }
    }
  }

  // Append latest user message
  contents.push({
    role: 'user',
    parts: [{ text: message.trim() }],
  });

  const activityLog = [];
  const recommendationsMap = new Map();
  let comparisonData = null;
  let cartActionData = null;
  const toolsExecuted = [];

  // Multi-step tool execution loop (max 3 tool cycles)
  let loopCount = 0;
  const MAX_TOOL_STEPS = 3;

  while (loopCount < MAX_TOOL_STEPS) {
    loopCount++;
    const res = await model.generateContent({ contents });
    const candidate = res.response.candidates?.[0];

    if (!candidate || !candidate.content) {
      break;
    }

    const fnCalls = candidate.content.parts
      ?.filter(p => p.functionCall)
      .map(p => p.functionCall) || [];

    if (fnCalls.length === 0) {
      // Model returned final text response
      const finalText = res.response.text();
      return {
        success: true,
        reply: finalText,
        activityLog,
        recommendations: Array.from(recommendationsMap.values()),
        comparison: comparisonData,
        cartAction: cartActionData,
        toolsExecuted,
      };
    }

    // Append model candidate with function calls (retaining thoughtSignature)
    contents.push(candidate.content);

    // Execute all function calls returned in this turn
    for (const fn of fnCalls) {
      toolsExecuted.push(fn.name);

      if (fn.name === 'search_products') {
        const queryTerm = fn.args?.query || fn.args?.category || 'catalogue';
        activityLog.push(`Searched database catalogue for "${queryTerm}" (budget: ₹${fn.args?.maxPrice || 'any'})`);
      } else if (fn.name === 'get_product_details') {
        activityLog.push(`Retrieved verified specifications & warranty dossier for "${fn.args?.productIdOrSlug}"`);
      } else if (fn.name === 'compare_products') {
        activityLog.push(`Loaded comparison matrix for items: ${(fn.args?.productIdsOrSlugs || []).join(', ')}`);
      } else if (fn.name === 'add_to_cart') {
        activityLog.push(`Staging "${fn.args?.productIdOrSlug}" into shopping cart...`);
      }

      // Execute against Supabase
      const toolResult = await executeTool(fn.name, fn.args);

      // Collect recommendations if search or details returned products
      if (fn.name === 'search_products' && toolResult.products) {
        toolResult.products.forEach(p => recommendationsMap.set(p.id, p));
      } else if (fn.name === 'get_product_details' && toolResult.product) {
        recommendationsMap.set(toolResult.product.id, toolResult.product);
      } else if (fn.name === 'compare_products' && toolResult.items) {
        comparisonData = {
          title: toolResult.comparisonTitle,
          items: toolResult.items,
        };
        toolResult.items.forEach(item => {
          if (!recommendationsMap.has(item.id)) {
            recommendationsMap.set(item.id, item);
          }
        });
      } else if (fn.name === 'add_to_cart' && toolResult.success) {
        cartActionData = toolResult;
        if (toolResult.product) {
          recommendationsMap.set(toolResult.product.id, toolResult.product);
        }
      }

      // Feed function response back to the model turn
      contents.push({
        role: 'user',
        parts: [
          {
            functionResponse: {
              name: fn.name,
              response: toolResult,
            },
          },
        ],
      });
    }
  }

  // Fallback after tool loops
  return {
    success: true,
    reply: 'I processed your request using the verified database records.',
    activityLog,
    recommendations: Array.from(recommendationsMap.values()),
    comparison: comparisonData,
    cartAction: cartActionData,
    toolsExecuted,
  };
}

export default {
  handleAgentChat,
  aiTools,
};
