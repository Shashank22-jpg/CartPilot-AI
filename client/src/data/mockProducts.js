/**
 * Aptdot CC0 Synthetic Demo Catalogue
 * Contains 50 products and 135 variants for local/demo product catalogue visibility.
 */

export const mockProducts = [
  {
    "id": "01943cb8-5160-7d26-9624-3f8944d2c8d1",
    "slug": "aptdot-active-noise-cancelling-wireless-headphones",
    "title": "Active Noise Cancelling Wireless Headphones",
    "name": "Active Noise Cancelling Wireless Headphones",
    "brand": "Aptdot Sample Goods",
    "category": "Electronics & Accessories",
    "description": "Over-ear wireless headphones with active noise cancelling, 30-hour battery life and a fold-flat travel case.",
    "price": 199.99,
    "original_price": 249.99,
    "currency": "USD",
    "rating": 4.4,
    "reviews_count": 241,
    "stock": 75,
    "in_stock": true,
    "image_url": "data:image/svg+xml;utf8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%20600%20450%22%20width%3D%22600%22%20height%3D%22450%22%3E%0A%20%20%3Cdefs%3E%0A%20%20%20%20%3ClinearGradient%20id%3D%22bgGrad%22%20x1%3D%220%25%22%20y1%3D%220%25%22%20x2%3D%22100%25%22%20y2%3D%22100%25%22%3E%0A%20%20%20%20%20%20%3Cstop%20offset%3D%220%25%22%20stop-color%3D%22%230B0F19%22%2F%3E%0A%20%20%20%20%20%20%3Cstop%20offset%3D%22100%25%22%20stop-color%3D%22%23111827%22%2F%3E%0A%20%20%20%20%3C%2FlinearGradient%3E%0A%20%20%20%20%3ClinearGradient%20id%3D%22accentGrad%22%20x1%3D%220%25%22%20y1%3D%220%25%22%20x2%3D%22100%25%22%20y2%3D%220%25%22%3E%0A%20%20%20%20%20%20%3Cstop%20offset%3D%220%25%22%20stop-color%3D%22%233B82F6%22%20stop-opacity%3D%220.9%22%2F%3E%0A%20%20%20%20%20%20%3Cstop%20offset%3D%22100%25%22%20stop-color%3D%22%236366F1%22%20stop-opacity%3D%220.9%22%2F%3E%0A%20%20%20%20%3C%2FlinearGradient%3E%0A%20%20%3C%2Fdefs%3E%0A%20%20%3Crect%20width%3D%22600%22%20height%3D%22450%22%20fill%3D%22url(%23bgGrad)%22%2F%3E%0A%20%20%3Crect%20x%3D%2220%22%20y%3D%2220%22%20width%3D%22560%22%20height%3D%22410%22%20rx%3D%2216%22%20fill%3D%22none%22%20stroke%3D%22url(%23accentGrad)%22%20stroke-width%3D%222%22%20stroke-dasharray%3D%226%2C6%22%20opacity%3D%220.6%22%2F%3E%0A%20%20%3Crect%20x%3D%22175%22%20y%3D%2250%22%20width%3D%22250%22%20height%3D%2234%22%20rx%3D%2217%22%20fill%3D%22%231E3A8A%22%20stroke%3D%22%233B82F6%22%20stroke-width%3D%221.5%22%2F%3E%0A%20%20%3Ctext%20x%3D%22300%22%20y%3D%2272%22%20font-family%3D%22system-ui%2C%20-apple-system%2C%20sans-serif%22%20font-size%3D%2212%22%20font-weight%3D%22700%22%20fill%3D%22%2393C5FD%22%20text-anchor%3D%22middle%22%20letter-spacing%3D%221.5%22%3EAPTDOT%20SYNTHETIC%20DEMO%3C%2Ftext%3E%0A%20%20%3Crect%20x%3D%22235%22%20y%3D%22125%22%20width%3D%22130%22%20height%3D%22110%22%20rx%3D%2214%22%20fill%3D%22%231F2937%22%20stroke%3D%22%233B82F6%22%20stroke-width%3D%222%22%2F%3E%0A%20%20%3Cpath%20d%3D%22M275%20180%20L300%20155%20L325%20180%20L300%20205%20Z%22%20fill%3D%22none%22%20stroke%3D%22%233B82F6%22%20stroke-width%3D%223%22%20stroke-linejoin%3D%22round%22%2F%3E%0A%20%20%3Ccircle%20cx%3D%22300%22%20cy%3D%22180%22%20r%3D%227%22%20fill%3D%22%233B82F6%22%2F%3E%0A%20%20%3Ctext%20x%3D%22300%22%20y%3D%22280%22%20font-family%3D%22system-ui%2C%20-apple-system%2C%20sans-serif%22%20font-size%3D%2218%22%20font-weight%3D%22600%22%20fill%3D%22%23F9FAFB%22%20text-anchor%3D%22middle%22%3EActive%20Noise%20Cancelling%20Wireless...%3C%2Ftext%3E%0A%20%20%3Ctext%20x%3D%22300%22%20y%3D%22310%22%20font-family%3D%22system-ui%2C%20-apple-system%2C%20sans-serif%22%20font-size%3D%2213%22%20font-weight%3D%22500%22%20fill%3D%22%239CA3AF%22%20text-anchor%3D%22middle%22%3EElectronics%20%26amp%3B%20Accessories%20%E2%80%A2%20SKU%3A%20ELEC-HEAD-001%3C%2Ftext%3E%0A%20%20%3Crect%20x%3D%22140%22%20y%3D%22360%22%20width%3D%22320%22%20height%3D%2230%22%20rx%3D%228%22%20fill%3D%22%23111827%22%20stroke%3D%22%23374151%22%20stroke-width%3D%221%22%2F%3E%0A%20%20%3Ctext%20x%3D%22300%22%20y%3D%22380%22%20font-family%3D%22system-ui%2C%20-apple-system%2C%20sans-serif%22%20font-size%3D%2211%22%20font-weight%3D%22500%22%20fill%3D%22%236B7280%22%20text-anchor%3D%22middle%22%3ESynthetic%20Specification%20%E2%80%A2%20CC0%201.0%20Universal%3C%2Ftext%3E%0A%3C%2Fsvg%3E",
    "tag": "On Sale",
    "badge_type": "demo",
    "is_demo": true,
    "catalogue_source": "aptdot_synthetic",
    "lifecycle_status": "active",
    "verification_tier": "demo",
    "seller": {
      "name": "Aptdot Sample Goods",
      "verifiedStatus": "Synthetic Demo Catalogue",
      "authorizedPartner": false,
      "rating": 4.4,
      "location": "Synthetic Sandbox",
      "fulfillment": "Simulated Delivery (Non-Commercial)",
      "synthetic_notice": "This item belongs to the Aptdot CC0 Synthetic Benchmark Catalogue. It cannot be purchased for real fulfillment."
    },
    "evidence": {
      "source": "Aptdot Synthetic E-Commerce Product Catalog v1.0.0",
      "license": "CC0-1.0 Universal",
      "sku": "ELEC-HEAD-001",
      "dataset_source": "https://www.aptdot.com/datasets/ecommerce-product-catalog/",
      "is_synthetic": true
    },
    "specs": {
      "aptdot_id": "prod_001",
      "sku": "ELEC-HEAD-001",
      "product_type": "Electronics & Accessories > Headphones",
      "cost_price": 78.5,
      "low_stock_threshold": 12,
      "availability": "in_stock",
      "availability_date": null,
      "dimensions": {
        "weight_g": 250,
        "length_cm": 18.5,
        "width_cm": 15,
        "height_cm": 8
      },
      "options": [
        {
          "name": "Color",
          "values": [
            "Midnight Black",
            "Brushed Silver"
          ]
        }
      ],
      "variants": [
        {
          "variant_id": "var_001_mb",
          "uuid": "01943cb8-5160-7abd-9f0d-bfe651dde275",
          "sku": "ELEC-HEAD-001-MB",
          "title": "Midnight Black",
          "options": {
            "Color": "Midnight Black"
          },
          "price": 199.99,
          "compare_at_price": 249.99,
          "stock": 40
        },
        {
          "variant_id": "var_001_bs",
          "uuid": "01943cb8-5160-75bc-8961-1c73cf5bc583",
          "sku": "ELEC-HEAD-001-BS",
          "title": "Brushed Silver",
          "options": {
            "Color": "Brushed Silver"
          },
          "price": 199.99,
          "compare_at_price": 249.99,
          "stock": 35
        }
      ],
      "total_variants": 2
    },
    "variants": [
      {
        "variant_id": "var_001_mb",
        "id": "01943cb8-5160-7abd-9f0d-bfe651dde275",
        "uuid": "01943cb8-5160-7abd-9f0d-bfe651dde275",
        "sku": "ELEC-HEAD-001-MB",
        "title": "Midnight Black",
        "options": {
          "Color": "Midnight Black"
        },
        "price": 199.99,
        "compare_at_price": 249.99,
        "stock": 40,
        "in_stock": true
      },
      {
        "variant_id": "var_001_bs",
        "id": "01943cb8-5160-75bc-8961-1c73cf5bc583",
        "uuid": "01943cb8-5160-75bc-8961-1c73cf5bc583",
        "sku": "ELEC-HEAD-001-BS",
        "title": "Brushed Silver",
        "options": {
          "Color": "Brushed Silver"
        },
        "price": 199.99,
        "compare_at_price": 249.99,
        "stock": 35,
        "in_stock": true
      }
    ],
    "options": [
      {
        "name": "Color",
        "values": [
          "Midnight Black",
          "Brushed Silver"
        ]
      }
    ],
    "warranty": "Simulated 1-Year Synthetic Warranty (Demo Only)",
    "return_policy": "Simulated 30-Day Sandbox Returns (Demo Only)",
    "risk_assessment": "Synthetic Demo Item: Fictional specifications for testing and benchmarking only."
  },
  {
    "id": "01947a4d-b2e0-70ea-a296-810b4e055973",
    "slug": "aptdot-8-in-1-usb-c-multiport-docking-adapter",
    "title": "8-in-1 USB-C Multiport Docking Adapter",
    "name": "8-in-1 USB-C Multiport Docking Adapter",
    "brand": "Aptdot Sample Goods",
    "category": "Electronics & Accessories",
    "description": "Aluminium USB-C hub with HDMI, Ethernet, SD and microSD readers, two USB-A ports and 100 W pass-through charging.",
    "price": 59.95,
    "original_price": 79.99,
    "currency": "USD",
    "rating": 4.5,
    "reviews_count": 603,
    "stock": 34,
    "in_stock": true,
    "image_url": "data:image/svg+xml;utf8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%20600%20450%22%20width%3D%22600%22%20height%3D%22450%22%3E%0A%20%20%3Cdefs%3E%0A%20%20%20%20%3ClinearGradient%20id%3D%22bgGrad%22%20x1%3D%220%25%22%20y1%3D%220%25%22%20x2%3D%22100%25%22%20y2%3D%22100%25%22%3E%0A%20%20%20%20%20%20%3Cstop%20offset%3D%220%25%22%20stop-color%3D%22%230B0F19%22%2F%3E%0A%20%20%20%20%20%20%3Cstop%20offset%3D%22100%25%22%20stop-color%3D%22%23111827%22%2F%3E%0A%20%20%20%20%3C%2FlinearGradient%3E%0A%20%20%20%20%3ClinearGradient%20id%3D%22accentGrad%22%20x1%3D%220%25%22%20y1%3D%220%25%22%20x2%3D%22100%25%22%20y2%3D%220%25%22%3E%0A%20%20%20%20%20%20%3Cstop%20offset%3D%220%25%22%20stop-color%3D%22%233B82F6%22%20stop-opacity%3D%220.9%22%2F%3E%0A%20%20%20%20%20%20%3Cstop%20offset%3D%22100%25%22%20stop-color%3D%22%236366F1%22%20stop-opacity%3D%220.9%22%2F%3E%0A%20%20%20%20%3C%2FlinearGradient%3E%0A%20%20%3C%2Fdefs%3E%0A%20%20%3Crect%20width%3D%22600%22%20height%3D%22450%22%20fill%3D%22url(%23bgGrad)%22%2F%3E%0A%20%20%3Crect%20x%3D%2220%22%20y%3D%2220%22%20width%3D%22560%22%20height%3D%22410%22%20rx%3D%2216%22%20fill%3D%22none%22%20stroke%3D%22url(%23accentGrad)%22%20stroke-width%3D%222%22%20stroke-dasharray%3D%226%2C6%22%20opacity%3D%220.6%22%2F%3E%0A%20%20%3Crect%20x%3D%22175%22%20y%3D%2250%22%20width%3D%22250%22%20height%3D%2234%22%20rx%3D%2217%22%20fill%3D%22%231E3A8A%22%20stroke%3D%22%233B82F6%22%20stroke-width%3D%221.5%22%2F%3E%0A%20%20%3Ctext%20x%3D%22300%22%20y%3D%2272%22%20font-family%3D%22system-ui%2C%20-apple-system%2C%20sans-serif%22%20font-size%3D%2212%22%20font-weight%3D%22700%22%20fill%3D%22%2393C5FD%22%20text-anchor%3D%22middle%22%20letter-spacing%3D%221.5%22%3EAPTDOT%20SYNTHETIC%20DEMO%3C%2Ftext%3E%0A%20%20%3Crect%20x%3D%22235%22%20y%3D%22125%22%20width%3D%22130%22%20height%3D%22110%22%20rx%3D%2214%22%20fill%3D%22%231F2937%22%20stroke%3D%22%233B82F6%22%20stroke-width%3D%222%22%2F%3E%0A%20%20%3Cpath%20d%3D%22M275%20180%20L300%20155%20L325%20180%20L300%20205%20Z%22%20fill%3D%22none%22%20stroke%3D%22%233B82F6%22%20stroke-width%3D%223%22%20stroke-linejoin%3D%22round%22%2F%3E%0A%20%20%3Ccircle%20cx%3D%22300%22%20cy%3D%22180%22%20r%3D%227%22%20fill%3D%22%233B82F6%22%2F%3E%0A%20%20%3Ctext%20x%3D%22300%22%20y%3D%22280%22%20font-family%3D%22system-ui%2C%20-apple-system%2C%20sans-serif%22%20font-size%3D%2218%22%20font-weight%3D%22600%22%20fill%3D%22%23F9FAFB%22%20text-anchor%3D%22middle%22%3E8-in-1%20USB-C%20Multiport%20Docking%20A...%3C%2Ftext%3E%0A%20%20%3Ctext%20x%3D%22300%22%20y%3D%22310%22%20font-family%3D%22system-ui%2C%20-apple-system%2C%20sans-serif%22%20font-size%3D%2213%22%20font-weight%3D%22500%22%20fill%3D%22%239CA3AF%22%20text-anchor%3D%22middle%22%3EElectronics%20%26amp%3B%20Accessories%20%E2%80%A2%20SKU%3A%20ELEC-HUB-002%3C%2Ftext%3E%0A%20%20%3Crect%20x%3D%22140%22%20y%3D%22360%22%20width%3D%22320%22%20height%3D%2230%22%20rx%3D%228%22%20fill%3D%22%23111827%22%20stroke%3D%22%23374151%22%20stroke-width%3D%221%22%2F%3E%0A%20%20%3Ctext%20x%3D%22300%22%20y%3D%22380%22%20font-family%3D%22system-ui%2C%20-apple-system%2C%20sans-serif%22%20font-size%3D%2211%22%20font-weight%3D%22500%22%20fill%3D%22%236B7280%22%20text-anchor%3D%22middle%22%3ESynthetic%20Specification%20%E2%80%A2%20CC0%201.0%20Universal%3C%2Ftext%3E%0A%3C%2Fsvg%3E",
    "tag": "On Sale",
    "badge_type": "demo",
    "is_demo": true,
    "catalogue_source": "aptdot_synthetic",
    "lifecycle_status": "active",
    "verification_tier": "demo",
    "seller": {
      "name": "Aptdot Sample Goods",
      "verifiedStatus": "Synthetic Demo Catalogue",
      "authorizedPartner": false,
      "rating": 4.5,
      "location": "Synthetic Sandbox",
      "fulfillment": "Simulated Delivery (Non-Commercial)",
      "synthetic_notice": "This item belongs to the Aptdot CC0 Synthetic Benchmark Catalogue. It cannot be purchased for real fulfillment."
    },
    "evidence": {
      "source": "Aptdot Synthetic E-Commerce Product Catalog v1.0.0",
      "license": "CC0-1.0 Universal",
      "sku": "ELEC-HUB-002",
      "dataset_source": "https://www.aptdot.com/datasets/ecommerce-product-catalog/",
      "is_synthetic": true
    },
    "specs": {
      "aptdot_id": "prod_002",
      "sku": "ELEC-HUB-002",
      "product_type": "Electronics & Accessories > Docks & Hubs",
      "cost_price": 21,
      "low_stock_threshold": 8,
      "availability": "in_stock",
      "availability_date": null,
      "dimensions": {
        "weight_g": 95,
        "length_cm": 12,
        "width_cm": 4.5,
        "height_cm": 1.5
      },
      "options": [
        {
          "name": "Color",
          "values": [
            "Space Gray",
            "Matte Black"
          ]
        }
      ],
      "variants": [
        {
          "variant_id": "var_002_sg",
          "uuid": "01947a4d-b2e0-77cb-9532-dc19771943c8",
          "sku": "ELEC-HUB-002-SG",
          "title": "Space Gray",
          "options": {
            "Color": "Space Gray"
          },
          "price": 59.95,
          "compare_at_price": 79.99,
          "stock": 16
        },
        {
          "variant_id": "var_002_mb",
          "uuid": "01947a4d-b2e0-77aa-bbda-9889f048139f",
          "sku": "ELEC-HUB-002-MB",
          "title": "Matte Black",
          "options": {
            "Color": "Matte Black"
          },
          "price": 59.95,
          "compare_at_price": 79.99,
          "stock": 18
        }
      ],
      "total_variants": 2
    },
    "variants": [
      {
        "variant_id": "var_002_sg",
        "id": "01947a4d-b2e0-77cb-9532-dc19771943c8",
        "uuid": "01947a4d-b2e0-77cb-9532-dc19771943c8",
        "sku": "ELEC-HUB-002-SG",
        "title": "Space Gray",
        "options": {
          "Color": "Space Gray"
        },
        "price": 59.95,
        "compare_at_price": 79.99,
        "stock": 16,
        "in_stock": true
      },
      {
        "variant_id": "var_002_mb",
        "id": "01947a4d-b2e0-77aa-bbda-9889f048139f",
        "uuid": "01947a4d-b2e0-77aa-bbda-9889f048139f",
        "sku": "ELEC-HUB-002-MB",
        "title": "Matte Black",
        "options": {
          "Color": "Matte Black"
        },
        "price": 59.95,
        "compare_at_price": 79.99,
        "stock": 18,
        "in_stock": true
      }
    ],
    "options": [
      {
        "name": "Color",
        "values": [
          "Space Gray",
          "Matte Black"
        ]
      }
    ],
    "warranty": "Simulated 1-Year Synthetic Warranty (Demo Only)",
    "return_policy": "Simulated 30-Day Sandbox Returns (Demo Only)",
    "risk_assessment": "Synthetic Demo Item: Fictional specifications for testing and benchmarking only."
  },
  {
    "id": "0194b670-4a80-714c-ac9d-21a6601f26f2",
    "slug": "aptdot-low-profile-mechanical-keyboard",
    "title": "Low-Profile Mechanical Keyboard",
    "name": "Low-Profile Mechanical Keyboard",
    "brand": "Aptdot Sample Goods",
    "category": "Electronics & Accessories",
    "description": "Compact 75% mechanical keyboard with hot-swap sockets, low-profile switches and USB-C plus wireless connection.",
    "price": 129,
    "original_price": null,
    "currency": "USD",
    "rating": 3.8,
    "reviews_count": 124,
    "stock": 69,
    "in_stock": true,
    "image_url": "data:image/svg+xml;utf8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%20600%20450%22%20width%3D%22600%22%20height%3D%22450%22%3E%0A%20%20%3Cdefs%3E%0A%20%20%20%20%3ClinearGradient%20id%3D%22bgGrad%22%20x1%3D%220%25%22%20y1%3D%220%25%22%20x2%3D%22100%25%22%20y2%3D%22100%25%22%3E%0A%20%20%20%20%20%20%3Cstop%20offset%3D%220%25%22%20stop-color%3D%22%230B0F19%22%2F%3E%0A%20%20%20%20%20%20%3Cstop%20offset%3D%22100%25%22%20stop-color%3D%22%23111827%22%2F%3E%0A%20%20%20%20%3C%2FlinearGradient%3E%0A%20%20%20%20%3ClinearGradient%20id%3D%22accentGrad%22%20x1%3D%220%25%22%20y1%3D%220%25%22%20x2%3D%22100%25%22%20y2%3D%220%25%22%3E%0A%20%20%20%20%20%20%3Cstop%20offset%3D%220%25%22%20stop-color%3D%22%233B82F6%22%20stop-opacity%3D%220.9%22%2F%3E%0A%20%20%20%20%20%20%3Cstop%20offset%3D%22100%25%22%20stop-color%3D%22%236366F1%22%20stop-opacity%3D%220.9%22%2F%3E%0A%20%20%20%20%3C%2FlinearGradient%3E%0A%20%20%3C%2Fdefs%3E%0A%20%20%3Crect%20width%3D%22600%22%20height%3D%22450%22%20fill%3D%22url(%23bgGrad)%22%2F%3E%0A%20%20%3Crect%20x%3D%2220%22%20y%3D%2220%22%20width%3D%22560%22%20height%3D%22410%22%20rx%3D%2216%22%20fill%3D%22none%22%20stroke%3D%22url(%23accentGrad)%22%20stroke-width%3D%222%22%20stroke-dasharray%3D%226%2C6%22%20opacity%3D%220.6%22%2F%3E%0A%20%20%3Crect%20x%3D%22175%22%20y%3D%2250%22%20width%3D%22250%22%20height%3D%2234%22%20rx%3D%2217%22%20fill%3D%22%231E3A8A%22%20stroke%3D%22%233B82F6%22%20stroke-width%3D%221.5%22%2F%3E%0A%20%20%3Ctext%20x%3D%22300%22%20y%3D%2272%22%20font-family%3D%22system-ui%2C%20-apple-system%2C%20sans-serif%22%20font-size%3D%2212%22%20font-weight%3D%22700%22%20fill%3D%22%2393C5FD%22%20text-anchor%3D%22middle%22%20letter-spacing%3D%221.5%22%3EAPTDOT%20SYNTHETIC%20DEMO%3C%2Ftext%3E%0A%20%20%3Crect%20x%3D%22235%22%20y%3D%22125%22%20width%3D%22130%22%20height%3D%22110%22%20rx%3D%2214%22%20fill%3D%22%231F2937%22%20stroke%3D%22%233B82F6%22%20stroke-width%3D%222%22%2F%3E%0A%20%20%3Cpath%20d%3D%22M275%20180%20L300%20155%20L325%20180%20L300%20205%20Z%22%20fill%3D%22none%22%20stroke%3D%22%233B82F6%22%20stroke-width%3D%223%22%20stroke-linejoin%3D%22round%22%2F%3E%0A%20%20%3Ccircle%20cx%3D%22300%22%20cy%3D%22180%22%20r%3D%227%22%20fill%3D%22%233B82F6%22%2F%3E%0A%20%20%3Ctext%20x%3D%22300%22%20y%3D%22280%22%20font-family%3D%22system-ui%2C%20-apple-system%2C%20sans-serif%22%20font-size%3D%2218%22%20font-weight%3D%22600%22%20fill%3D%22%23F9FAFB%22%20text-anchor%3D%22middle%22%3ELow-Profile%20Mechanical%20Keyboard%3C%2Ftext%3E%0A%20%20%3Ctext%20x%3D%22300%22%20y%3D%22310%22%20font-family%3D%22system-ui%2C%20-apple-system%2C%20sans-serif%22%20font-size%3D%2213%22%20font-weight%3D%22500%22%20fill%3D%22%239CA3AF%22%20text-anchor%3D%22middle%22%3EElectronics%20%26amp%3B%20Accessories%20%E2%80%A2%20SKU%3A%20ELEC-KEYB-003%3C%2Ftext%3E%0A%20%20%3Crect%20x%3D%22140%22%20y%3D%22360%22%20width%3D%22320%22%20height%3D%2230%22%20rx%3D%228%22%20fill%3D%22%23111827%22%20stroke%3D%22%23374151%22%20stroke-width%3D%221%22%2F%3E%0A%20%20%3Ctext%20x%3D%22300%22%20y%3D%22380%22%20font-family%3D%22system-ui%2C%20-apple-system%2C%20sans-serif%22%20font-size%3D%2211%22%20font-weight%3D%22500%22%20fill%3D%22%236B7280%22%20text-anchor%3D%22middle%22%3ESynthetic%20Specification%20%E2%80%A2%20CC0%201.0%20Universal%3C%2Ftext%3E%0A%3C%2Fsvg%3E",
    "tag": "Synthetic Demo",
    "badge_type": "demo",
    "is_demo": true,
    "catalogue_source": "aptdot_synthetic",
    "lifecycle_status": "active",
    "verification_tier": "demo",
    "seller": {
      "name": "Aptdot Sample Goods",
      "verifiedStatus": "Synthetic Demo Catalogue",
      "authorizedPartner": false,
      "rating": 3.8,
      "location": "Synthetic Sandbox",
      "fulfillment": "Simulated Delivery (Non-Commercial)",
      "synthetic_notice": "This item belongs to the Aptdot CC0 Synthetic Benchmark Catalogue. It cannot be purchased for real fulfillment."
    },
    "evidence": {
      "source": "Aptdot Synthetic E-Commerce Product Catalog v1.0.0",
      "license": "CC0-1.0 Universal",
      "sku": "ELEC-KEYB-003",
      "dataset_source": "https://www.aptdot.com/datasets/ecommerce-product-catalog/",
      "is_synthetic": true
    },
    "specs": {
      "aptdot_id": "prod_003",
      "sku": "ELEC-KEYB-003",
      "product_type": "Electronics & Accessories > Keyboards",
      "cost_price": 52,
      "low_stock_threshold": 5,
      "availability": "in_stock",
      "availability_date": null,
      "dimensions": {
        "weight_g": 720,
        "length_cm": 36,
        "width_cm": 13,
        "height_cm": 4
      },
      "options": [
        {
          "name": "Layout",
          "values": [
            "ANSI",
            "ISO"
          ]
        },
        {
          "name": "Switch",
          "values": [
            "Linear",
            "Tactile"
          ]
        }
      ],
      "variants": [
        {
          "variant_id": "var_003_ans_lin",
          "uuid": "0194b670-4a80-7840-afb0-2637cf13603c",
          "sku": "ELEC-KEYB-003-ANS-LIN",
          "title": "ANSI / Linear",
          "options": {
            "Layout": "ANSI",
            "Switch": "Linear"
          },
          "price": 129,
          "compare_at_price": null,
          "stock": 10
        },
        {
          "variant_id": "var_003_ans_tac",
          "uuid": "0194b670-4a80-7f86-8ae9-c47602da2ff3",
          "sku": "ELEC-KEYB-003-ANS-TAC",
          "title": "ANSI / Tactile",
          "options": {
            "Layout": "ANSI",
            "Switch": "Tactile"
          },
          "price": 129,
          "compare_at_price": null,
          "stock": 16
        },
        {
          "variant_id": "var_003_iso_lin",
          "uuid": "0194b670-4a80-75ba-9f7c-33f39ec9aecb",
          "sku": "ELEC-KEYB-003-ISO-LIN",
          "title": "ISO / Linear",
          "options": {
            "Layout": "ISO",
            "Switch": "Linear"
          },
          "price": 129,
          "compare_at_price": null,
          "stock": 28
        },
        {
          "variant_id": "var_003_iso_tac",
          "uuid": "0194b670-4a80-7830-a639-9ef53e623575",
          "sku": "ELEC-KEYB-003-ISO-TAC",
          "title": "ISO / Tactile",
          "options": {
            "Layout": "ISO",
            "Switch": "Tactile"
          },
          "price": 129,
          "compare_at_price": null,
          "stock": 15
        }
      ],
      "total_variants": 4
    },
    "variants": [
      {
        "variant_id": "var_003_ans_lin",
        "id": "0194b670-4a80-7840-afb0-2637cf13603c",
        "uuid": "0194b670-4a80-7840-afb0-2637cf13603c",
        "sku": "ELEC-KEYB-003-ANS-LIN",
        "title": "ANSI / Linear",
        "options": {
          "Layout": "ANSI",
          "Switch": "Linear"
        },
        "price": 129,
        "compare_at_price": null,
        "stock": 10,
        "in_stock": true
      },
      {
        "variant_id": "var_003_ans_tac",
        "id": "0194b670-4a80-7f86-8ae9-c47602da2ff3",
        "uuid": "0194b670-4a80-7f86-8ae9-c47602da2ff3",
        "sku": "ELEC-KEYB-003-ANS-TAC",
        "title": "ANSI / Tactile",
        "options": {
          "Layout": "ANSI",
          "Switch": "Tactile"
        },
        "price": 129,
        "compare_at_price": null,
        "stock": 16,
        "in_stock": true
      },
      {
        "variant_id": "var_003_iso_lin",
        "id": "0194b670-4a80-75ba-9f7c-33f39ec9aecb",
        "uuid": "0194b670-4a80-75ba-9f7c-33f39ec9aecb",
        "sku": "ELEC-KEYB-003-ISO-LIN",
        "title": "ISO / Linear",
        "options": {
          "Layout": "ISO",
          "Switch": "Linear"
        },
        "price": 129,
        "compare_at_price": null,
        "stock": 28,
        "in_stock": true
      },
      {
        "variant_id": "var_003_iso_tac",
        "id": "0194b670-4a80-7830-a639-9ef53e623575",
        "uuid": "0194b670-4a80-7830-a639-9ef53e623575",
        "sku": "ELEC-KEYB-003-ISO-TAC",
        "title": "ISO / Tactile",
        "options": {
          "Layout": "ISO",
          "Switch": "Tactile"
        },
        "price": 129,
        "compare_at_price": null,
        "stock": 15,
        "in_stock": true
      }
    ],
    "options": [
      {
        "name": "Layout",
        "values": [
          "ANSI",
          "ISO"
        ]
      },
      {
        "name": "Switch",
        "values": [
          "Linear",
          "Tactile"
        ]
      }
    ],
    "warranty": "Simulated 1-Year Synthetic Warranty (Demo Only)",
    "return_policy": "Simulated 30-Day Sandbox Returns (Demo Only)",
    "risk_assessment": "Synthetic Demo Item: Fictional specifications for testing and benchmarking only."
  },
  {
    "id": "0194f43c-9a80-7bc4-82b4-e8a8b2bf32df",
    "slug": "aptdot-65w-gan-usb-c-wall-charger",
    "title": "65W GaN USB-C Wall Charger",
    "name": "65W GaN USB-C Wall Charger",
    "brand": "Aptdot Sample Goods",
    "category": "Electronics & Accessories",
    "description": "Two-port 65 W gallium nitride charger that powers a laptop and a phone at the same time.",
    "price": 39.99,
    "original_price": 49.99,
    "currency": "USD",
    "rating": 3.8,
    "reviews_count": 766,
    "stock": 62,
    "in_stock": true,
    "image_url": "data:image/svg+xml;utf8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%20600%20450%22%20width%3D%22600%22%20height%3D%22450%22%3E%0A%20%20%3Cdefs%3E%0A%20%20%20%20%3ClinearGradient%20id%3D%22bgGrad%22%20x1%3D%220%25%22%20y1%3D%220%25%22%20x2%3D%22100%25%22%20y2%3D%22100%25%22%3E%0A%20%20%20%20%20%20%3Cstop%20offset%3D%220%25%22%20stop-color%3D%22%230B0F19%22%2F%3E%0A%20%20%20%20%20%20%3Cstop%20offset%3D%22100%25%22%20stop-color%3D%22%23111827%22%2F%3E%0A%20%20%20%20%3C%2FlinearGradient%3E%0A%20%20%20%20%3ClinearGradient%20id%3D%22accentGrad%22%20x1%3D%220%25%22%20y1%3D%220%25%22%20x2%3D%22100%25%22%20y2%3D%220%25%22%3E%0A%20%20%20%20%20%20%3Cstop%20offset%3D%220%25%22%20stop-color%3D%22%233B82F6%22%20stop-opacity%3D%220.9%22%2F%3E%0A%20%20%20%20%20%20%3Cstop%20offset%3D%22100%25%22%20stop-color%3D%22%236366F1%22%20stop-opacity%3D%220.9%22%2F%3E%0A%20%20%20%20%3C%2FlinearGradient%3E%0A%20%20%3C%2Fdefs%3E%0A%20%20%3Crect%20width%3D%22600%22%20height%3D%22450%22%20fill%3D%22url(%23bgGrad)%22%2F%3E%0A%20%20%3Crect%20x%3D%2220%22%20y%3D%2220%22%20width%3D%22560%22%20height%3D%22410%22%20rx%3D%2216%22%20fill%3D%22none%22%20stroke%3D%22url(%23accentGrad)%22%20stroke-width%3D%222%22%20stroke-dasharray%3D%226%2C6%22%20opacity%3D%220.6%22%2F%3E%0A%20%20%3Crect%20x%3D%22175%22%20y%3D%2250%22%20width%3D%22250%22%20height%3D%2234%22%20rx%3D%2217%22%20fill%3D%22%231E3A8A%22%20stroke%3D%22%233B82F6%22%20stroke-width%3D%221.5%22%2F%3E%0A%20%20%3Ctext%20x%3D%22300%22%20y%3D%2272%22%20font-family%3D%22system-ui%2C%20-apple-system%2C%20sans-serif%22%20font-size%3D%2212%22%20font-weight%3D%22700%22%20fill%3D%22%2393C5FD%22%20text-anchor%3D%22middle%22%20letter-spacing%3D%221.5%22%3EAPTDOT%20SYNTHETIC%20DEMO%3C%2Ftext%3E%0A%20%20%3Crect%20x%3D%22235%22%20y%3D%22125%22%20width%3D%22130%22%20height%3D%22110%22%20rx%3D%2214%22%20fill%3D%22%231F2937%22%20stroke%3D%22%233B82F6%22%20stroke-width%3D%222%22%2F%3E%0A%20%20%3Cpath%20d%3D%22M275%20180%20L300%20155%20L325%20180%20L300%20205%20Z%22%20fill%3D%22none%22%20stroke%3D%22%233B82F6%22%20stroke-width%3D%223%22%20stroke-linejoin%3D%22round%22%2F%3E%0A%20%20%3Ccircle%20cx%3D%22300%22%20cy%3D%22180%22%20r%3D%227%22%20fill%3D%22%233B82F6%22%2F%3E%0A%20%20%3Ctext%20x%3D%22300%22%20y%3D%22280%22%20font-family%3D%22system-ui%2C%20-apple-system%2C%20sans-serif%22%20font-size%3D%2218%22%20font-weight%3D%22600%22%20fill%3D%22%23F9FAFB%22%20text-anchor%3D%22middle%22%3E65W%20GaN%20USB-C%20Wall%20Charger%3C%2Ftext%3E%0A%20%20%3Ctext%20x%3D%22300%22%20y%3D%22310%22%20font-family%3D%22system-ui%2C%20-apple-system%2C%20sans-serif%22%20font-size%3D%2213%22%20font-weight%3D%22500%22%20fill%3D%22%239CA3AF%22%20text-anchor%3D%22middle%22%3EElectronics%20%26amp%3B%20Accessories%20%E2%80%A2%20SKU%3A%20ELEC-CHRG-004%3C%2Ftext%3E%0A%20%20%3Crect%20x%3D%22140%22%20y%3D%22360%22%20width%3D%22320%22%20height%3D%2230%22%20rx%3D%228%22%20fill%3D%22%23111827%22%20stroke%3D%22%23374151%22%20stroke-width%3D%221%22%2F%3E%0A%20%20%3Ctext%20x%3D%22300%22%20y%3D%22380%22%20font-family%3D%22system-ui%2C%20-apple-system%2C%20sans-serif%22%20font-size%3D%2211%22%20font-weight%3D%22500%22%20fill%3D%22%236B7280%22%20text-anchor%3D%22middle%22%3ESynthetic%20Specification%20%E2%80%A2%20CC0%201.0%20Universal%3C%2Ftext%3E%0A%3C%2Fsvg%3E",
    "tag": "On Sale",
    "badge_type": "demo",
    "is_demo": true,
    "catalogue_source": "aptdot_synthetic",
    "lifecycle_status": "active",
    "verification_tier": "demo",
    "seller": {
      "name": "Aptdot Sample Goods",
      "verifiedStatus": "Synthetic Demo Catalogue",
      "authorizedPartner": false,
      "rating": 3.8,
      "location": "Synthetic Sandbox",
      "fulfillment": "Simulated Delivery (Non-Commercial)",
      "synthetic_notice": "This item belongs to the Aptdot CC0 Synthetic Benchmark Catalogue. It cannot be purchased for real fulfillment."
    },
    "evidence": {
      "source": "Aptdot Synthetic E-Commerce Product Catalog v1.0.0",
      "license": "CC0-1.0 Universal",
      "sku": "ELEC-CHRG-004",
      "dataset_source": "https://www.aptdot.com/datasets/ecommerce-product-catalog/",
      "is_synthetic": true
    },
    "specs": {
      "aptdot_id": "prod_004",
      "sku": "ELEC-CHRG-004",
      "product_type": "Electronics & Accessories > Chargers",
      "cost_price": 14,
      "low_stock_threshold": 20,
      "availability": "in_stock",
      "availability_date": null,
      "dimensions": {
        "weight_g": 120,
        "length_cm": 6,
        "width_cm": 6,
        "height_cm": 3.5
      },
      "options": [],
      "variants": [
        {
          "variant_id": "var_004_default",
          "uuid": "0194f43c-9a80-7bb1-a5cf-284075a74fe2",
          "sku": "ELEC-CHRG-004",
          "title": "Default",
          "options": {},
          "price": 39.99,
          "compare_at_price": 49.99,
          "stock": 62
        }
      ],
      "total_variants": 1
    },
    "variants": [
      {
        "variant_id": "var_004_default",
        "id": "0194f43c-9a80-7bb1-a5cf-284075a74fe2",
        "uuid": "0194f43c-9a80-7bb1-a5cf-284075a74fe2",
        "sku": "ELEC-CHRG-004",
        "title": "Default",
        "options": {},
        "price": 39.99,
        "compare_at_price": 49.99,
        "stock": 62,
        "in_stock": true
      }
    ],
    "options": [],
    "warranty": "Simulated 1-Year Synthetic Warranty (Demo Only)",
    "return_policy": "Simulated 30-Day Sandbox Returns (Demo Only)",
    "risk_assessment": "Synthetic Demo Item: Fictional specifications for testing and benchmarking only."
  },
  {
    "id": "01953224-61c0-7322-8052-c72e526f5a95",
    "slug": "aptdot-portable-waterproof-bluetooth-speaker",
    "title": "Portable Waterproof Bluetooth Speaker",
    "name": "Portable Waterproof Bluetooth Speaker",
    "brand": "Aptdot Sample Goods",
    "category": "Electronics & Accessories",
    "description": "IP67 waterproof speaker with 360-degree sound, 20-hour battery and a built-in carry strap.",
    "price": 79,
    "original_price": null,
    "currency": "USD",
    "rating": 4.6,
    "reviews_count": 90,
    "stock": 46,
    "in_stock": true,
    "image_url": "data:image/svg+xml;utf8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%20600%20450%22%20width%3D%22600%22%20height%3D%22450%22%3E%0A%20%20%3Cdefs%3E%0A%20%20%20%20%3ClinearGradient%20id%3D%22bgGrad%22%20x1%3D%220%25%22%20y1%3D%220%25%22%20x2%3D%22100%25%22%20y2%3D%22100%25%22%3E%0A%20%20%20%20%20%20%3Cstop%20offset%3D%220%25%22%20stop-color%3D%22%230B0F19%22%2F%3E%0A%20%20%20%20%20%20%3Cstop%20offset%3D%22100%25%22%20stop-color%3D%22%23111827%22%2F%3E%0A%20%20%20%20%3C%2FlinearGradient%3E%0A%20%20%20%20%3ClinearGradient%20id%3D%22accentGrad%22%20x1%3D%220%25%22%20y1%3D%220%25%22%20x2%3D%22100%25%22%20y2%3D%220%25%22%3E%0A%20%20%20%20%20%20%3Cstop%20offset%3D%220%25%22%20stop-color%3D%22%233B82F6%22%20stop-opacity%3D%220.9%22%2F%3E%0A%20%20%20%20%20%20%3Cstop%20offset%3D%22100%25%22%20stop-color%3D%22%236366F1%22%20stop-opacity%3D%220.9%22%2F%3E%0A%20%20%20%20%3C%2FlinearGradient%3E%0A%20%20%3C%2Fdefs%3E%0A%20%20%3Crect%20width%3D%22600%22%20height%3D%22450%22%20fill%3D%22url(%23bgGrad)%22%2F%3E%0A%20%20%3Crect%20x%3D%2220%22%20y%3D%2220%22%20width%3D%22560%22%20height%3D%22410%22%20rx%3D%2216%22%20fill%3D%22none%22%20stroke%3D%22url(%23accentGrad)%22%20stroke-width%3D%222%22%20stroke-dasharray%3D%226%2C6%22%20opacity%3D%220.6%22%2F%3E%0A%20%20%3Crect%20x%3D%22175%22%20y%3D%2250%22%20width%3D%22250%22%20height%3D%2234%22%20rx%3D%2217%22%20fill%3D%22%231E3A8A%22%20stroke%3D%22%233B82F6%22%20stroke-width%3D%221.5%22%2F%3E%0A%20%20%3Ctext%20x%3D%22300%22%20y%3D%2272%22%20font-family%3D%22system-ui%2C%20-apple-system%2C%20sans-serif%22%20font-size%3D%2212%22%20font-weight%3D%22700%22%20fill%3D%22%2393C5FD%22%20text-anchor%3D%22middle%22%20letter-spacing%3D%221.5%22%3EAPTDOT%20SYNTHETIC%20DEMO%3C%2Ftext%3E%0A%20%20%3Crect%20x%3D%22235%22%20y%3D%22125%22%20width%3D%22130%22%20height%3D%22110%22%20rx%3D%2214%22%20fill%3D%22%231F2937%22%20stroke%3D%22%233B82F6%22%20stroke-width%3D%222%22%2F%3E%0A%20%20%3Cpath%20d%3D%22M275%20180%20L300%20155%20L325%20180%20L300%20205%20Z%22%20fill%3D%22none%22%20stroke%3D%22%233B82F6%22%20stroke-width%3D%223%22%20stroke-linejoin%3D%22round%22%2F%3E%0A%20%20%3Ccircle%20cx%3D%22300%22%20cy%3D%22180%22%20r%3D%227%22%20fill%3D%22%233B82F6%22%2F%3E%0A%20%20%3Ctext%20x%3D%22300%22%20y%3D%22280%22%20font-family%3D%22system-ui%2C%20-apple-system%2C%20sans-serif%22%20font-size%3D%2218%22%20font-weight%3D%22600%22%20fill%3D%22%23F9FAFB%22%20text-anchor%3D%22middle%22%3EPortable%20Waterproof%20Bluetooth%20Sp...%3C%2Ftext%3E%0A%20%20%3Ctext%20x%3D%22300%22%20y%3D%22310%22%20font-family%3D%22system-ui%2C%20-apple-system%2C%20sans-serif%22%20font-size%3D%2213%22%20font-weight%3D%22500%22%20fill%3D%22%239CA3AF%22%20text-anchor%3D%22middle%22%3EElectronics%20%26amp%3B%20Accessories%20%E2%80%A2%20SKU%3A%20ELEC-SPKR-005%3C%2Ftext%3E%0A%20%20%3Crect%20x%3D%22140%22%20y%3D%22360%22%20width%3D%22320%22%20height%3D%2230%22%20rx%3D%228%22%20fill%3D%22%23111827%22%20stroke%3D%22%23374151%22%20stroke-width%3D%221%22%2F%3E%0A%20%20%3Ctext%20x%3D%22300%22%20y%3D%22380%22%20font-family%3D%22system-ui%2C%20-apple-system%2C%20sans-serif%22%20font-size%3D%2211%22%20font-weight%3D%22500%22%20fill%3D%22%236B7280%22%20text-anchor%3D%22middle%22%3ESynthetic%20Specification%20%E2%80%A2%20CC0%201.0%20Universal%3C%2Ftext%3E%0A%3C%2Fsvg%3E",
    "tag": "Synthetic Demo",
    "badge_type": "demo",
    "is_demo": true,
    "catalogue_source": "aptdot_synthetic",
    "lifecycle_status": "active",
    "verification_tier": "demo",
    "seller": {
      "name": "Aptdot Sample Goods",
      "verifiedStatus": "Synthetic Demo Catalogue",
      "authorizedPartner": false,
      "rating": 4.6,
      "location": "Synthetic Sandbox",
      "fulfillment": "Simulated Delivery (Non-Commercial)",
      "synthetic_notice": "This item belongs to the Aptdot CC0 Synthetic Benchmark Catalogue. It cannot be purchased for real fulfillment."
    },
    "evidence": {
      "source": "Aptdot Synthetic E-Commerce Product Catalog v1.0.0",
      "license": "CC0-1.0 Universal",
      "sku": "ELEC-SPKR-005",
      "dataset_source": "https://www.aptdot.com/datasets/ecommerce-product-catalog/",
      "is_synthetic": true
    },
    "specs": {
      "aptdot_id": "prod_005",
      "sku": "ELEC-SPKR-005",
      "product_type": "Electronics & Accessories > Speakers",
      "cost_price": 30.5,
      "low_stock_threshold": 5,
      "availability": "in_stock",
      "availability_date": null,
      "dimensions": {
        "weight_g": 540,
        "length_cm": 18,
        "width_cm": 8,
        "height_cm": 8
      },
      "options": [
        {
          "name": "Color",
          "values": [
            "Ocean Blue",
            "Graphite",
            "Sand"
          ]
        }
      ],
      "variants": [
        {
          "variant_id": "var_005_ob",
          "uuid": "01953224-61c0-7b42-8ae1-de2957fc9e33",
          "sku": "ELEC-SPKR-005-OB",
          "title": "Ocean Blue",
          "options": {
            "Color": "Ocean Blue"
          },
          "price": 79,
          "compare_at_price": null,
          "stock": 14
        },
        {
          "variant_id": "var_005_gra",
          "uuid": "01953224-61c0-7ce2-a7c6-eae8d5405eaa",
          "sku": "ELEC-SPKR-005-GRA",
          "title": "Graphite",
          "options": {
            "Color": "Graphite"
          },
          "price": 79,
          "compare_at_price": null,
          "stock": 13
        },
        {
          "variant_id": "var_005_san",
          "uuid": "01953224-61c0-7aa5-9d82-14de33807a20",
          "sku": "ELEC-SPKR-005-SAN",
          "title": "Sand",
          "options": {
            "Color": "Sand"
          },
          "price": 79,
          "compare_at_price": null,
          "stock": 19
        }
      ],
      "total_variants": 3
    },
    "variants": [
      {
        "variant_id": "var_005_ob",
        "id": "01953224-61c0-7b42-8ae1-de2957fc9e33",
        "uuid": "01953224-61c0-7b42-8ae1-de2957fc9e33",
        "sku": "ELEC-SPKR-005-OB",
        "title": "Ocean Blue",
        "options": {
          "Color": "Ocean Blue"
        },
        "price": 79,
        "compare_at_price": null,
        "stock": 14,
        "in_stock": true
      },
      {
        "variant_id": "var_005_gra",
        "id": "01953224-61c0-7ce2-a7c6-eae8d5405eaa",
        "uuid": "01953224-61c0-7ce2-a7c6-eae8d5405eaa",
        "sku": "ELEC-SPKR-005-GRA",
        "title": "Graphite",
        "options": {
          "Color": "Graphite"
        },
        "price": 79,
        "compare_at_price": null,
        "stock": 13,
        "in_stock": true
      },
      {
        "variant_id": "var_005_san",
        "id": "01953224-61c0-7aa5-9d82-14de33807a20",
        "uuid": "01953224-61c0-7aa5-9d82-14de33807a20",
        "sku": "ELEC-SPKR-005-SAN",
        "title": "Sand",
        "options": {
          "Color": "Sand"
        },
        "price": 79,
        "compare_at_price": null,
        "stock": 19,
        "in_stock": true
      }
    ],
    "options": [
      {
        "name": "Color",
        "values": [
          "Ocean Blue",
          "Graphite",
          "Sand"
        ]
      }
    ],
    "warranty": "Simulated 1-Year Synthetic Warranty (Demo Only)",
    "return_policy": "Simulated 30-Day Sandbox Returns (Demo Only)",
    "risk_assessment": "Synthetic Demo Item: Fictional specifications for testing and benchmarking only."
  },
  {
    "id": "01a125af-2e00-7464-80b4-145d5fe7e55e",
    "slug": "aptdot-4k-streaming-webcam-with-privacy-shutter",
    "title": "4K Streaming Webcam with Privacy Shutter",
    "name": "4K Streaming Webcam with Privacy Shutter",
    "brand": "Aptdot Sample Goods",
    "category": "Electronics & Accessories",
    "description": "4K webcam with autofocus, dual noise-reducing microphones and a sliding privacy shutter. Ships from the release date.",
    "price": 119,
    "original_price": null,
    "currency": "USD",
    "rating": 4.9,
    "reviews_count": 437,
    "stock": 0,
    "in_stock": false,
    "image_url": "data:image/svg+xml;utf8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%20600%20450%22%20width%3D%22600%22%20height%3D%22450%22%3E%0A%20%20%3Cdefs%3E%0A%20%20%20%20%3ClinearGradient%20id%3D%22bgGrad%22%20x1%3D%220%25%22%20y1%3D%220%25%22%20x2%3D%22100%25%22%20y2%3D%22100%25%22%3E%0A%20%20%20%20%20%20%3Cstop%20offset%3D%220%25%22%20stop-color%3D%22%230B0F19%22%2F%3E%0A%20%20%20%20%20%20%3Cstop%20offset%3D%22100%25%22%20stop-color%3D%22%23111827%22%2F%3E%0A%20%20%20%20%3C%2FlinearGradient%3E%0A%20%20%20%20%3ClinearGradient%20id%3D%22accentGrad%22%20x1%3D%220%25%22%20y1%3D%220%25%22%20x2%3D%22100%25%22%20y2%3D%220%25%22%3E%0A%20%20%20%20%20%20%3Cstop%20offset%3D%220%25%22%20stop-color%3D%22%233B82F6%22%20stop-opacity%3D%220.9%22%2F%3E%0A%20%20%20%20%20%20%3Cstop%20offset%3D%22100%25%22%20stop-color%3D%22%236366F1%22%20stop-opacity%3D%220.9%22%2F%3E%0A%20%20%20%20%3C%2FlinearGradient%3E%0A%20%20%3C%2Fdefs%3E%0A%20%20%3Crect%20width%3D%22600%22%20height%3D%22450%22%20fill%3D%22url(%23bgGrad)%22%2F%3E%0A%20%20%3Crect%20x%3D%2220%22%20y%3D%2220%22%20width%3D%22560%22%20height%3D%22410%22%20rx%3D%2216%22%20fill%3D%22none%22%20stroke%3D%22url(%23accentGrad)%22%20stroke-width%3D%222%22%20stroke-dasharray%3D%226%2C6%22%20opacity%3D%220.6%22%2F%3E%0A%20%20%3Crect%20x%3D%22175%22%20y%3D%2250%22%20width%3D%22250%22%20height%3D%2234%22%20rx%3D%2217%22%20fill%3D%22%231E3A8A%22%20stroke%3D%22%233B82F6%22%20stroke-width%3D%221.5%22%2F%3E%0A%20%20%3Ctext%20x%3D%22300%22%20y%3D%2272%22%20font-family%3D%22system-ui%2C%20-apple-system%2C%20sans-serif%22%20font-size%3D%2212%22%20font-weight%3D%22700%22%20fill%3D%22%2393C5FD%22%20text-anchor%3D%22middle%22%20letter-spacing%3D%221.5%22%3EAPTDOT%20SYNTHETIC%20DEMO%3C%2Ftext%3E%0A%20%20%3Crect%20x%3D%22235%22%20y%3D%22125%22%20width%3D%22130%22%20height%3D%22110%22%20rx%3D%2214%22%20fill%3D%22%231F2937%22%20stroke%3D%22%233B82F6%22%20stroke-width%3D%222%22%2F%3E%0A%20%20%3Cpath%20d%3D%22M275%20180%20L300%20155%20L325%20180%20L300%20205%20Z%22%20fill%3D%22none%22%20stroke%3D%22%233B82F6%22%20stroke-width%3D%223%22%20stroke-linejoin%3D%22round%22%2F%3E%0A%20%20%3Ccircle%20cx%3D%22300%22%20cy%3D%22180%22%20r%3D%227%22%20fill%3D%22%233B82F6%22%2F%3E%0A%20%20%3Ctext%20x%3D%22300%22%20y%3D%22280%22%20font-family%3D%22system-ui%2C%20-apple-system%2C%20sans-serif%22%20font-size%3D%2218%22%20font-weight%3D%22600%22%20fill%3D%22%23F9FAFB%22%20text-anchor%3D%22middle%22%3E4K%20Streaming%20Webcam%20with%20Privacy...%3C%2Ftext%3E%0A%20%20%3Ctext%20x%3D%22300%22%20y%3D%22310%22%20font-family%3D%22system-ui%2C%20-apple-system%2C%20sans-serif%22%20font-size%3D%2213%22%20font-weight%3D%22500%22%20fill%3D%22%239CA3AF%22%20text-anchor%3D%22middle%22%3EElectronics%20%26amp%3B%20Accessories%20%E2%80%A2%20SKU%3A%20ELEC-CAM-006%3C%2Ftext%3E%0A%20%20%3Crect%20x%3D%22140%22%20y%3D%22360%22%20width%3D%22320%22%20height%3D%2230%22%20rx%3D%228%22%20fill%3D%22%23111827%22%20stroke%3D%22%23374151%22%20stroke-width%3D%221%22%2F%3E%0A%20%20%3Ctext%20x%3D%22300%22%20y%3D%22380%22%20font-family%3D%22system-ui%2C%20-apple-system%2C%20sans-serif%22%20font-size%3D%2211%22%20font-weight%3D%22500%22%20fill%3D%22%236B7280%22%20text-anchor%3D%22middle%22%3ESynthetic%20Specification%20%E2%80%A2%20CC0%201.0%20Universal%3C%2Ftext%3E%0A%3C%2Fsvg%3E",
    "tag": "Preorder",
    "badge_type": "demo",
    "is_demo": true,
    "catalogue_source": "aptdot_synthetic",
    "lifecycle_status": "active",
    "verification_tier": "demo",
    "seller": {
      "name": "Aptdot Sample Goods",
      "verifiedStatus": "Synthetic Demo Catalogue",
      "authorizedPartner": false,
      "rating": 4.9,
      "location": "Synthetic Sandbox",
      "fulfillment": "Simulated Delivery (Non-Commercial)",
      "synthetic_notice": "This item belongs to the Aptdot CC0 Synthetic Benchmark Catalogue. It cannot be purchased for real fulfillment."
    },
    "evidence": {
      "source": "Aptdot Synthetic E-Commerce Product Catalog v1.0.0",
      "license": "CC0-1.0 Universal",
      "sku": "ELEC-CAM-006",
      "dataset_source": "https://www.aptdot.com/datasets/ecommerce-product-catalog/",
      "is_synthetic": true
    },
    "specs": {
      "aptdot_id": "prod_006",
      "sku": "ELEC-CAM-006",
      "product_type": "Electronics & Accessories > Webcams",
      "cost_price": 44,
      "low_stock_threshold": 25,
      "availability": "preorder",
      "availability_date": "2026-11-20T09:00:00Z",
      "dimensions": {
        "weight_g": 160,
        "length_cm": 10,
        "width_cm": 6,
        "height_cm": 6
      },
      "options": [],
      "variants": [
        {
          "variant_id": "var_006_default",
          "uuid": "01a125af-2e00-7e18-93ae-0f4f24262080",
          "sku": "ELEC-CAM-006",
          "title": "Default",
          "options": {},
          "price": 119,
          "compare_at_price": null,
          "stock": 0
        }
      ],
      "total_variants": 1
    },
    "variants": [
      {
        "variant_id": "var_006_default",
        "id": "01a125af-2e00-7e18-93ae-0f4f24262080",
        "uuid": "01a125af-2e00-7e18-93ae-0f4f24262080",
        "sku": "ELEC-CAM-006",
        "title": "Default",
        "options": {},
        "price": 119,
        "compare_at_price": null,
        "stock": 0,
        "in_stock": false
      }
    ],
    "options": [],
    "warranty": "Simulated 1-Year Synthetic Warranty (Demo Only)",
    "return_policy": "Simulated 30-Day Sandbox Returns (Demo Only)",
    "risk_assessment": "Synthetic Demo Item: Fictional specifications for testing and benchmarking only."
  },
  {
    "id": "0195ae46-5600-7150-aa49-a043eeab7394",
    "slug": "aptdot-braided-usb-c-to-usb-c-cable-2-pack",
    "title": "Braided USB-C to USB-C Cable, 2-Pack",
    "name": "Braided USB-C to USB-C Cable, 2-Pack",
    "brand": "Aptdot Sample Goods",
    "category": "Electronics & Accessories",
    "description": "Nylon-braided USB-C cables rated for 100 W charging and 10 Gbps data, sold in packs of two.",
    "price": 19.99,
    "original_price": null,
    "currency": "USD",
    "rating": 3.9,
    "reviews_count": 749,
    "stock": 115,
    "in_stock": true,
    "image_url": "data:image/svg+xml;utf8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%20600%20450%22%20width%3D%22600%22%20height%3D%22450%22%3E%0A%20%20%3Cdefs%3E%0A%20%20%20%20%3ClinearGradient%20id%3D%22bgGrad%22%20x1%3D%220%25%22%20y1%3D%220%25%22%20x2%3D%22100%25%22%20y2%3D%22100%25%22%3E%0A%20%20%20%20%20%20%3Cstop%20offset%3D%220%25%22%20stop-color%3D%22%230B0F19%22%2F%3E%0A%20%20%20%20%20%20%3Cstop%20offset%3D%22100%25%22%20stop-color%3D%22%23111827%22%2F%3E%0A%20%20%20%20%3C%2FlinearGradient%3E%0A%20%20%20%20%3ClinearGradient%20id%3D%22accentGrad%22%20x1%3D%220%25%22%20y1%3D%220%25%22%20x2%3D%22100%25%22%20y2%3D%220%25%22%3E%0A%20%20%20%20%20%20%3Cstop%20offset%3D%220%25%22%20stop-color%3D%22%233B82F6%22%20stop-opacity%3D%220.9%22%2F%3E%0A%20%20%20%20%20%20%3Cstop%20offset%3D%22100%25%22%20stop-color%3D%22%236366F1%22%20stop-opacity%3D%220.9%22%2F%3E%0A%20%20%20%20%3C%2FlinearGradient%3E%0A%20%20%3C%2Fdefs%3E%0A%20%20%3Crect%20width%3D%22600%22%20height%3D%22450%22%20fill%3D%22url(%23bgGrad)%22%2F%3E%0A%20%20%3Crect%20x%3D%2220%22%20y%3D%2220%22%20width%3D%22560%22%20height%3D%22410%22%20rx%3D%2216%22%20fill%3D%22none%22%20stroke%3D%22url(%23accentGrad)%22%20stroke-width%3D%222%22%20stroke-dasharray%3D%226%2C6%22%20opacity%3D%220.6%22%2F%3E%0A%20%20%3Crect%20x%3D%22175%22%20y%3D%2250%22%20width%3D%22250%22%20height%3D%2234%22%20rx%3D%2217%22%20fill%3D%22%231E3A8A%22%20stroke%3D%22%233B82F6%22%20stroke-width%3D%221.5%22%2F%3E%0A%20%20%3Ctext%20x%3D%22300%22%20y%3D%2272%22%20font-family%3D%22system-ui%2C%20-apple-system%2C%20sans-serif%22%20font-size%3D%2212%22%20font-weight%3D%22700%22%20fill%3D%22%2393C5FD%22%20text-anchor%3D%22middle%22%20letter-spacing%3D%221.5%22%3EAPTDOT%20SYNTHETIC%20DEMO%3C%2Ftext%3E%0A%20%20%3Crect%20x%3D%22235%22%20y%3D%22125%22%20width%3D%22130%22%20height%3D%22110%22%20rx%3D%2214%22%20fill%3D%22%231F2937%22%20stroke%3D%22%233B82F6%22%20stroke-width%3D%222%22%2F%3E%0A%20%20%3Cpath%20d%3D%22M275%20180%20L300%20155%20L325%20180%20L300%20205%20Z%22%20fill%3D%22none%22%20stroke%3D%22%233B82F6%22%20stroke-width%3D%223%22%20stroke-linejoin%3D%22round%22%2F%3E%0A%20%20%3Ccircle%20cx%3D%22300%22%20cy%3D%22180%22%20r%3D%227%22%20fill%3D%22%233B82F6%22%2F%3E%0A%20%20%3Ctext%20x%3D%22300%22%20y%3D%22280%22%20font-family%3D%22system-ui%2C%20-apple-system%2C%20sans-serif%22%20font-size%3D%2218%22%20font-weight%3D%22600%22%20fill%3D%22%23F9FAFB%22%20text-anchor%3D%22middle%22%3EBraided%20USB-C%20to%20USB-C%20Cable%2C%202-...%3C%2Ftext%3E%0A%20%20%3Ctext%20x%3D%22300%22%20y%3D%22310%22%20font-family%3D%22system-ui%2C%20-apple-system%2C%20sans-serif%22%20font-size%3D%2213%22%20font-weight%3D%22500%22%20fill%3D%22%239CA3AF%22%20text-anchor%3D%22middle%22%3EElectronics%20%26amp%3B%20Accessories%20%E2%80%A2%20SKU%3A%20ELEC-CBL-007%3C%2Ftext%3E%0A%20%20%3Crect%20x%3D%22140%22%20y%3D%22360%22%20width%3D%22320%22%20height%3D%2230%22%20rx%3D%228%22%20fill%3D%22%23111827%22%20stroke%3D%22%23374151%22%20stroke-width%3D%221%22%2F%3E%0A%20%20%3Ctext%20x%3D%22300%22%20y%3D%22380%22%20font-family%3D%22system-ui%2C%20-apple-system%2C%20sans-serif%22%20font-size%3D%2211%22%20font-weight%3D%22500%22%20fill%3D%22%236B7280%22%20text-anchor%3D%22middle%22%3ESynthetic%20Specification%20%E2%80%A2%20CC0%201.0%20Universal%3C%2Ftext%3E%0A%3C%2Fsvg%3E",
    "tag": "Synthetic Demo",
    "badge_type": "demo",
    "is_demo": true,
    "catalogue_source": "aptdot_synthetic",
    "lifecycle_status": "active",
    "verification_tier": "demo",
    "seller": {
      "name": "Aptdot Sample Goods",
      "verifiedStatus": "Synthetic Demo Catalogue",
      "authorizedPartner": false,
      "rating": 3.9,
      "location": "Synthetic Sandbox",
      "fulfillment": "Simulated Delivery (Non-Commercial)",
      "synthetic_notice": "This item belongs to the Aptdot CC0 Synthetic Benchmark Catalogue. It cannot be purchased for real fulfillment."
    },
    "evidence": {
      "source": "Aptdot Synthetic E-Commerce Product Catalog v1.0.0",
      "license": "CC0-1.0 Universal",
      "sku": "ELEC-CBL-007",
      "dataset_source": "https://www.aptdot.com/datasets/ecommerce-product-catalog/",
      "is_synthetic": true
    },
    "specs": {
      "aptdot_id": "prod_007",
      "sku": "ELEC-CBL-007",
      "product_type": "Electronics & Accessories > Cables",
      "cost_price": 4.2,
      "low_stock_threshold": 15,
      "availability": "in_stock",
      "availability_date": null,
      "dimensions": {
        "weight_g": 80,
        "length_cm": 15,
        "width_cm": 10,
        "height_cm": 2
      },
      "options": [
        {
          "name": "Length",
          "values": [
            "1 m",
            "2 m"
          ]
        }
      ],
      "variants": [
        {
          "variant_id": "var_007_1m",
          "uuid": "0195ae46-5600-76b8-be19-34562fef6785",
          "sku": "ELEC-CBL-007-1M",
          "title": "1 m",
          "options": {
            "Length": "1 m"
          },
          "price": 19.99,
          "compare_at_price": null,
          "stock": 57
        },
        {
          "variant_id": "var_007_2m",
          "uuid": "0195ae46-5600-70d6-b604-b2ed4d7988c3",
          "sku": "ELEC-CBL-007-2M",
          "title": "2 m",
          "options": {
            "Length": "2 m"
          },
          "price": 23.99,
          "compare_at_price": null,
          "stock": 58
        }
      ],
      "total_variants": 2
    },
    "variants": [
      {
        "variant_id": "var_007_1m",
        "id": "0195ae46-5600-76b8-be19-34562fef6785",
        "uuid": "0195ae46-5600-76b8-be19-34562fef6785",
        "sku": "ELEC-CBL-007-1M",
        "title": "1 m",
        "options": {
          "Length": "1 m"
        },
        "price": 19.99,
        "compare_at_price": null,
        "stock": 57,
        "in_stock": true
      },
      {
        "variant_id": "var_007_2m",
        "id": "0195ae46-5600-70d6-b604-b2ed4d7988c3",
        "uuid": "0195ae46-5600-70d6-b604-b2ed4d7988c3",
        "sku": "ELEC-CBL-007-2M",
        "title": "2 m",
        "options": {
          "Length": "2 m"
        },
        "price": 23.99,
        "compare_at_price": null,
        "stock": 58,
        "in_stock": true
      }
    ],
    "options": [
      {
        "name": "Length",
        "values": [
          "1 m",
          "2 m"
        ]
      }
    ],
    "warranty": "Simulated 1-Year Synthetic Warranty (Demo Only)",
    "return_policy": "Simulated 30-Day Sandbox Returns (Demo Only)",
    "risk_assessment": "Synthetic Demo Item: Fictional specifications for testing and benchmarking only."
  },
  {
    "id": "0195ed5c-3d00-75c7-8d12-b9531ee14d10",
    "slug": "aptdot-ergonomic-vertical-wireless-mouse",
    "title": "Ergonomic Vertical Wireless Mouse",
    "name": "Ergonomic Vertical Wireless Mouse",
    "brand": "Aptdot Sample Goods",
    "category": "Electronics & Accessories",
    "description": "57-degree vertical mouse that keeps the wrist in a handshake position, with silent clicks and USB-C charging.",
    "price": 44.95,
    "original_price": 54.95,
    "currency": "USD",
    "rating": 4.3,
    "reviews_count": 260,
    "stock": 5,
    "in_stock": true,
    "image_url": "data:image/svg+xml;utf8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%20600%20450%22%20width%3D%22600%22%20height%3D%22450%22%3E%0A%20%20%3Cdefs%3E%0A%20%20%20%20%3ClinearGradient%20id%3D%22bgGrad%22%20x1%3D%220%25%22%20y1%3D%220%25%22%20x2%3D%22100%25%22%20y2%3D%22100%25%22%3E%0A%20%20%20%20%20%20%3Cstop%20offset%3D%220%25%22%20stop-color%3D%22%230B0F19%22%2F%3E%0A%20%20%20%20%20%20%3Cstop%20offset%3D%22100%25%22%20stop-color%3D%22%23111827%22%2F%3E%0A%20%20%20%20%3C%2FlinearGradient%3E%0A%20%20%20%20%3ClinearGradient%20id%3D%22accentGrad%22%20x1%3D%220%25%22%20y1%3D%220%25%22%20x2%3D%22100%25%22%20y2%3D%220%25%22%3E%0A%20%20%20%20%20%20%3Cstop%20offset%3D%220%25%22%20stop-color%3D%22%233B82F6%22%20stop-opacity%3D%220.9%22%2F%3E%0A%20%20%20%20%20%20%3Cstop%20offset%3D%22100%25%22%20stop-color%3D%22%236366F1%22%20stop-opacity%3D%220.9%22%2F%3E%0A%20%20%20%20%3C%2FlinearGradient%3E%0A%20%20%3C%2Fdefs%3E%0A%20%20%3Crect%20width%3D%22600%22%20height%3D%22450%22%20fill%3D%22url(%23bgGrad)%22%2F%3E%0A%20%20%3Crect%20x%3D%2220%22%20y%3D%2220%22%20width%3D%22560%22%20height%3D%22410%22%20rx%3D%2216%22%20fill%3D%22none%22%20stroke%3D%22url(%23accentGrad)%22%20stroke-width%3D%222%22%20stroke-dasharray%3D%226%2C6%22%20opacity%3D%220.6%22%2F%3E%0A%20%20%3Crect%20x%3D%22175%22%20y%3D%2250%22%20width%3D%22250%22%20height%3D%2234%22%20rx%3D%2217%22%20fill%3D%22%231E3A8A%22%20stroke%3D%22%233B82F6%22%20stroke-width%3D%221.5%22%2F%3E%0A%20%20%3Ctext%20x%3D%22300%22%20y%3D%2272%22%20font-family%3D%22system-ui%2C%20-apple-system%2C%20sans-serif%22%20font-size%3D%2212%22%20font-weight%3D%22700%22%20fill%3D%22%2393C5FD%22%20text-anchor%3D%22middle%22%20letter-spacing%3D%221.5%22%3EAPTDOT%20SYNTHETIC%20DEMO%3C%2Ftext%3E%0A%20%20%3Crect%20x%3D%22235%22%20y%3D%22125%22%20width%3D%22130%22%20height%3D%22110%22%20rx%3D%2214%22%20fill%3D%22%231F2937%22%20stroke%3D%22%233B82F6%22%20stroke-width%3D%222%22%2F%3E%0A%20%20%3Cpath%20d%3D%22M275%20180%20L300%20155%20L325%20180%20L300%20205%20Z%22%20fill%3D%22none%22%20stroke%3D%22%233B82F6%22%20stroke-width%3D%223%22%20stroke-linejoin%3D%22round%22%2F%3E%0A%20%20%3Ccircle%20cx%3D%22300%22%20cy%3D%22180%22%20r%3D%227%22%20fill%3D%22%233B82F6%22%2F%3E%0A%20%20%3Ctext%20x%3D%22300%22%20y%3D%22280%22%20font-family%3D%22system-ui%2C%20-apple-system%2C%20sans-serif%22%20font-size%3D%2218%22%20font-weight%3D%22600%22%20fill%3D%22%23F9FAFB%22%20text-anchor%3D%22middle%22%3EErgonomic%20Vertical%20Wireless%20Mouse%3C%2Ftext%3E%0A%20%20%3Ctext%20x%3D%22300%22%20y%3D%22310%22%20font-family%3D%22system-ui%2C%20-apple-system%2C%20sans-serif%22%20font-size%3D%2213%22%20font-weight%3D%22500%22%20fill%3D%22%239CA3AF%22%20text-anchor%3D%22middle%22%3EElectronics%20%26amp%3B%20Accessories%20%E2%80%A2%20SKU%3A%20ELEC-MOUSE-008%3C%2Ftext%3E%0A%20%20%3Crect%20x%3D%22140%22%20y%3D%22360%22%20width%3D%22320%22%20height%3D%2230%22%20rx%3D%228%22%20fill%3D%22%23111827%22%20stroke%3D%22%23374151%22%20stroke-width%3D%221%22%2F%3E%0A%20%20%3Ctext%20x%3D%22300%22%20y%3D%22380%22%20font-family%3D%22system-ui%2C%20-apple-system%2C%20sans-serif%22%20font-size%3D%2211%22%20font-weight%3D%22500%22%20fill%3D%22%236B7280%22%20text-anchor%3D%22middle%22%3ESynthetic%20Specification%20%E2%80%A2%20CC0%201.0%20Universal%3C%2Ftext%3E%0A%3C%2Fsvg%3E",
    "tag": "Only 5 Left",
    "badge_type": "demo",
    "is_demo": true,
    "catalogue_source": "aptdot_synthetic",
    "lifecycle_status": "active",
    "verification_tier": "demo",
    "seller": {
      "name": "Aptdot Sample Goods",
      "verifiedStatus": "Synthetic Demo Catalogue",
      "authorizedPartner": false,
      "rating": 4.3,
      "location": "Synthetic Sandbox",
      "fulfillment": "Simulated Delivery (Non-Commercial)",
      "synthetic_notice": "This item belongs to the Aptdot CC0 Synthetic Benchmark Catalogue. It cannot be purchased for real fulfillment."
    },
    "evidence": {
      "source": "Aptdot Synthetic E-Commerce Product Catalog v1.0.0",
      "license": "CC0-1.0 Universal",
      "sku": "ELEC-MOUSE-008",
      "dataset_source": "https://www.aptdot.com/datasets/ecommerce-product-catalog/",
      "is_synthetic": true
    },
    "specs": {
      "aptdot_id": "prod_008",
      "sku": "ELEC-MOUSE-008",
      "product_type": "Electronics & Accessories > Mice",
      "cost_price": 16,
      "low_stock_threshold": 15,
      "availability": "in_stock",
      "availability_date": null,
      "dimensions": {
        "weight_g": 130,
        "length_cm": 12,
        "width_cm": 8,
        "height_cm": 8
      },
      "options": [
        {
          "name": "Hand",
          "values": [
            "Right",
            "Left"
          ]
        }
      ],
      "variants": [
        {
          "variant_id": "var_008_rh",
          "uuid": "0195ed5c-3d00-75ce-8447-e819a7dda895",
          "sku": "ELEC-MOUSE-008-RH",
          "title": "Right",
          "options": {
            "Hand": "Right"
          },
          "price": 44.95,
          "compare_at_price": 54.95,
          "stock": 2
        },
        {
          "variant_id": "var_008_lh",
          "uuid": "0195ed5c-3d00-7d44-9507-879c89fe1d59",
          "sku": "ELEC-MOUSE-008-LH",
          "title": "Left",
          "options": {
            "Hand": "Left"
          },
          "price": 44.95,
          "compare_at_price": 54.95,
          "stock": 3
        }
      ],
      "total_variants": 2
    },
    "variants": [
      {
        "variant_id": "var_008_rh",
        "id": "0195ed5c-3d00-75ce-8447-e819a7dda895",
        "uuid": "0195ed5c-3d00-75ce-8447-e819a7dda895",
        "sku": "ELEC-MOUSE-008-RH",
        "title": "Right",
        "options": {
          "Hand": "Right"
        },
        "price": 44.95,
        "compare_at_price": 54.95,
        "stock": 2,
        "in_stock": true
      },
      {
        "variant_id": "var_008_lh",
        "id": "0195ed5c-3d00-7d44-9507-879c89fe1d59",
        "uuid": "0195ed5c-3d00-7d44-9507-879c89fe1d59",
        "sku": "ELEC-MOUSE-008-LH",
        "title": "Left",
        "options": {
          "Hand": "Left"
        },
        "price": 44.95,
        "compare_at_price": 54.95,
        "stock": 3,
        "in_stock": true
      }
    ],
    "options": [
      {
        "name": "Hand",
        "values": [
          "Right",
          "Left"
        ]
      }
    ],
    "warranty": "Simulated 1-Year Synthetic Warranty (Demo Only)",
    "return_policy": "Simulated 30-Day Sandbox Returns (Demo Only)",
    "risk_assessment": "Synthetic Demo Item: Fictional specifications for testing and benchmarking only."
  },
  {
    "id": "0196298c-9040-768d-9787-6ed805c8fa07",
    "slug": "aptdot-portable-nvme-ssd",
    "title": "Portable NVMe SSD",
    "name": "Portable NVMe SSD",
    "brand": "Aptdot Sample Goods",
    "category": "Electronics & Accessories",
    "description": "Pocket-size NVMe solid state drive with read speeds up to 1,050 MB/s over USB-C.",
    "price": 89.99,
    "original_price": null,
    "currency": "USD",
    "rating": 3.9,
    "reviews_count": 60,
    "stock": 90,
    "in_stock": true,
    "image_url": "data:image/svg+xml;utf8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%20600%20450%22%20width%3D%22600%22%20height%3D%22450%22%3E%0A%20%20%3Cdefs%3E%0A%20%20%20%20%3ClinearGradient%20id%3D%22bgGrad%22%20x1%3D%220%25%22%20y1%3D%220%25%22%20x2%3D%22100%25%22%20y2%3D%22100%25%22%3E%0A%20%20%20%20%20%20%3Cstop%20offset%3D%220%25%22%20stop-color%3D%22%230B0F19%22%2F%3E%0A%20%20%20%20%20%20%3Cstop%20offset%3D%22100%25%22%20stop-color%3D%22%23111827%22%2F%3E%0A%20%20%20%20%3C%2FlinearGradient%3E%0A%20%20%20%20%3ClinearGradient%20id%3D%22accentGrad%22%20x1%3D%220%25%22%20y1%3D%220%25%22%20x2%3D%22100%25%22%20y2%3D%220%25%22%3E%0A%20%20%20%20%20%20%3Cstop%20offset%3D%220%25%22%20stop-color%3D%22%233B82F6%22%20stop-opacity%3D%220.9%22%2F%3E%0A%20%20%20%20%20%20%3Cstop%20offset%3D%22100%25%22%20stop-color%3D%22%236366F1%22%20stop-opacity%3D%220.9%22%2F%3E%0A%20%20%20%20%3C%2FlinearGradient%3E%0A%20%20%3C%2Fdefs%3E%0A%20%20%3Crect%20width%3D%22600%22%20height%3D%22450%22%20fill%3D%22url(%23bgGrad)%22%2F%3E%0A%20%20%3Crect%20x%3D%2220%22%20y%3D%2220%22%20width%3D%22560%22%20height%3D%22410%22%20rx%3D%2216%22%20fill%3D%22none%22%20stroke%3D%22url(%23accentGrad)%22%20stroke-width%3D%222%22%20stroke-dasharray%3D%226%2C6%22%20opacity%3D%220.6%22%2F%3E%0A%20%20%3Crect%20x%3D%22175%22%20y%3D%2250%22%20width%3D%22250%22%20height%3D%2234%22%20rx%3D%2217%22%20fill%3D%22%231E3A8A%22%20stroke%3D%22%233B82F6%22%20stroke-width%3D%221.5%22%2F%3E%0A%20%20%3Ctext%20x%3D%22300%22%20y%3D%2272%22%20font-family%3D%22system-ui%2C%20-apple-system%2C%20sans-serif%22%20font-size%3D%2212%22%20font-weight%3D%22700%22%20fill%3D%22%2393C5FD%22%20text-anchor%3D%22middle%22%20letter-spacing%3D%221.5%22%3EAPTDOT%20SYNTHETIC%20DEMO%3C%2Ftext%3E%0A%20%20%3Crect%20x%3D%22235%22%20y%3D%22125%22%20width%3D%22130%22%20height%3D%22110%22%20rx%3D%2214%22%20fill%3D%22%231F2937%22%20stroke%3D%22%233B82F6%22%20stroke-width%3D%222%22%2F%3E%0A%20%20%3Cpath%20d%3D%22M275%20180%20L300%20155%20L325%20180%20L300%20205%20Z%22%20fill%3D%22none%22%20stroke%3D%22%233B82F6%22%20stroke-width%3D%223%22%20stroke-linejoin%3D%22round%22%2F%3E%0A%20%20%3Ccircle%20cx%3D%22300%22%20cy%3D%22180%22%20r%3D%227%22%20fill%3D%22%233B82F6%22%2F%3E%0A%20%20%3Ctext%20x%3D%22300%22%20y%3D%22280%22%20font-family%3D%22system-ui%2C%20-apple-system%2C%20sans-serif%22%20font-size%3D%2218%22%20font-weight%3D%22600%22%20fill%3D%22%23F9FAFB%22%20text-anchor%3D%22middle%22%3EPortable%20NVMe%20SSD%3C%2Ftext%3E%0A%20%20%3Ctext%20x%3D%22300%22%20y%3D%22310%22%20font-family%3D%22system-ui%2C%20-apple-system%2C%20sans-serif%22%20font-size%3D%2213%22%20font-weight%3D%22500%22%20fill%3D%22%239CA3AF%22%20text-anchor%3D%22middle%22%3EElectronics%20%26amp%3B%20Accessories%20%E2%80%A2%20SKU%3A%20ELEC-SSD-009%3C%2Ftext%3E%0A%20%20%3Crect%20x%3D%22140%22%20y%3D%22360%22%20width%3D%22320%22%20height%3D%2230%22%20rx%3D%228%22%20fill%3D%22%23111827%22%20stroke%3D%22%23374151%22%20stroke-width%3D%221%22%2F%3E%0A%20%20%3Ctext%20x%3D%22300%22%20y%3D%22380%22%20font-family%3D%22system-ui%2C%20-apple-system%2C%20sans-serif%22%20font-size%3D%2211%22%20font-weight%3D%22500%22%20fill%3D%22%236B7280%22%20text-anchor%3D%22middle%22%3ESynthetic%20Specification%20%E2%80%A2%20CC0%201.0%20Universal%3C%2Ftext%3E%0A%3C%2Fsvg%3E",
    "tag": "Synthetic Demo",
    "badge_type": "demo",
    "is_demo": true,
    "catalogue_source": "aptdot_synthetic",
    "lifecycle_status": "active",
    "verification_tier": "demo",
    "seller": {
      "name": "Aptdot Sample Goods",
      "verifiedStatus": "Synthetic Demo Catalogue",
      "authorizedPartner": false,
      "rating": 3.9,
      "location": "Synthetic Sandbox",
      "fulfillment": "Simulated Delivery (Non-Commercial)",
      "synthetic_notice": "This item belongs to the Aptdot CC0 Synthetic Benchmark Catalogue. It cannot be purchased for real fulfillment."
    },
    "evidence": {
      "source": "Aptdot Synthetic E-Commerce Product Catalog v1.0.0",
      "license": "CC0-1.0 Universal",
      "sku": "ELEC-SSD-009",
      "dataset_source": "https://www.aptdot.com/datasets/ecommerce-product-catalog/",
      "is_synthetic": true
    },
    "specs": {
      "aptdot_id": "prod_009",
      "sku": "ELEC-SSD-009",
      "product_type": "Electronics & Accessories > Storage",
      "cost_price": 41,
      "low_stock_threshold": 8,
      "availability": "in_stock",
      "availability_date": null,
      "dimensions": {
        "weight_g": 58,
        "length_cm": 10,
        "width_cm": 5.5,
        "height_cm": 1
      },
      "options": [
        {
          "name": "Capacity",
          "values": [
            "1 TB",
            "2 TB"
          ]
        }
      ],
      "variants": [
        {
          "variant_id": "var_009_1tb",
          "uuid": "0196298c-9040-7564-8e10-8276b76f8257",
          "sku": "ELEC-SSD-009-1TB",
          "title": "1 TB",
          "options": {
            "Capacity": "1 TB"
          },
          "price": 89.99,
          "compare_at_price": null,
          "stock": 33
        },
        {
          "variant_id": "var_009_2tb",
          "uuid": "0196298c-9040-7011-8eb5-5737fd483f50",
          "sku": "ELEC-SSD-009-2TB",
          "title": "2 TB",
          "options": {
            "Capacity": "2 TB"
          },
          "price": 149.99,
          "compare_at_price": null,
          "stock": 57
        }
      ],
      "total_variants": 2
    },
    "variants": [
      {
        "variant_id": "var_009_1tb",
        "id": "0196298c-9040-7564-8e10-8276b76f8257",
        "uuid": "0196298c-9040-7564-8e10-8276b76f8257",
        "sku": "ELEC-SSD-009-1TB",
        "title": "1 TB",
        "options": {
          "Capacity": "1 TB"
        },
        "price": 89.99,
        "compare_at_price": null,
        "stock": 33,
        "in_stock": true
      },
      {
        "variant_id": "var_009_2tb",
        "id": "0196298c-9040-7011-8eb5-5737fd483f50",
        "uuid": "0196298c-9040-7011-8eb5-5737fd483f50",
        "sku": "ELEC-SSD-009-2TB",
        "title": "2 TB",
        "options": {
          "Capacity": "2 TB"
        },
        "price": 149.99,
        "compare_at_price": null,
        "stock": 57,
        "in_stock": true
      }
    ],
    "options": [
      {
        "name": "Capacity",
        "values": [
          "1 TB",
          "2 TB"
        ]
      }
    ],
    "warranty": "Simulated 1-Year Synthetic Warranty (Demo Only)",
    "return_policy": "Simulated 30-Day Sandbox Returns (Demo Only)",
    "risk_assessment": "Synthetic Demo Item: Fictional specifications for testing and benchmarking only."
  },
  {
    "id": "0196672f-ad60-762d-a793-067a44867951",
    "slug": "aptdot-led-desk-lamp-with-wireless-charging-pad",
    "title": "LED Desk Lamp with Wireless Charging Pad",
    "name": "LED Desk Lamp with Wireless Charging Pad",
    "brand": "Aptdot Sample Goods",
    "category": "Electronics & Accessories",
    "description": "Dimmable LED desk lamp with five colour temperatures and a 15 W wireless charging pad in the base.",
    "price": 69,
    "original_price": null,
    "currency": "USD",
    "rating": 4.7,
    "reviews_count": 802,
    "stock": 70,
    "in_stock": true,
    "image_url": "data:image/svg+xml;utf8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%20600%20450%22%20width%3D%22600%22%20height%3D%22450%22%3E%0A%20%20%3Cdefs%3E%0A%20%20%20%20%3ClinearGradient%20id%3D%22bgGrad%22%20x1%3D%220%25%22%20y1%3D%220%25%22%20x2%3D%22100%25%22%20y2%3D%22100%25%22%3E%0A%20%20%20%20%20%20%3Cstop%20offset%3D%220%25%22%20stop-color%3D%22%230B0F19%22%2F%3E%0A%20%20%20%20%20%20%3Cstop%20offset%3D%22100%25%22%20stop-color%3D%22%23111827%22%2F%3E%0A%20%20%20%20%3C%2FlinearGradient%3E%0A%20%20%20%20%3ClinearGradient%20id%3D%22accentGrad%22%20x1%3D%220%25%22%20y1%3D%220%25%22%20x2%3D%22100%25%22%20y2%3D%220%25%22%3E%0A%20%20%20%20%20%20%3Cstop%20offset%3D%220%25%22%20stop-color%3D%22%233B82F6%22%20stop-opacity%3D%220.9%22%2F%3E%0A%20%20%20%20%20%20%3Cstop%20offset%3D%22100%25%22%20stop-color%3D%22%236366F1%22%20stop-opacity%3D%220.9%22%2F%3E%0A%20%20%20%20%3C%2FlinearGradient%3E%0A%20%20%3C%2Fdefs%3E%0A%20%20%3Crect%20width%3D%22600%22%20height%3D%22450%22%20fill%3D%22url(%23bgGrad)%22%2F%3E%0A%20%20%3Crect%20x%3D%2220%22%20y%3D%2220%22%20width%3D%22560%22%20height%3D%22410%22%20rx%3D%2216%22%20fill%3D%22none%22%20stroke%3D%22url(%23accentGrad)%22%20stroke-width%3D%222%22%20stroke-dasharray%3D%226%2C6%22%20opacity%3D%220.6%22%2F%3E%0A%20%20%3Crect%20x%3D%22175%22%20y%3D%2250%22%20width%3D%22250%22%20height%3D%2234%22%20rx%3D%2217%22%20fill%3D%22%231E3A8A%22%20stroke%3D%22%233B82F6%22%20stroke-width%3D%221.5%22%2F%3E%0A%20%20%3Ctext%20x%3D%22300%22%20y%3D%2272%22%20font-family%3D%22system-ui%2C%20-apple-system%2C%20sans-serif%22%20font-size%3D%2212%22%20font-weight%3D%22700%22%20fill%3D%22%2393C5FD%22%20text-anchor%3D%22middle%22%20letter-spacing%3D%221.5%22%3EAPTDOT%20SYNTHETIC%20DEMO%3C%2Ftext%3E%0A%20%20%3Crect%20x%3D%22235%22%20y%3D%22125%22%20width%3D%22130%22%20height%3D%22110%22%20rx%3D%2214%22%20fill%3D%22%231F2937%22%20stroke%3D%22%233B82F6%22%20stroke-width%3D%222%22%2F%3E%0A%20%20%3Cpath%20d%3D%22M275%20180%20L300%20155%20L325%20180%20L300%20205%20Z%22%20fill%3D%22none%22%20stroke%3D%22%233B82F6%22%20stroke-width%3D%223%22%20stroke-linejoin%3D%22round%22%2F%3E%0A%20%20%3Ccircle%20cx%3D%22300%22%20cy%3D%22180%22%20r%3D%227%22%20fill%3D%22%233B82F6%22%2F%3E%0A%20%20%3Ctext%20x%3D%22300%22%20y%3D%22280%22%20font-family%3D%22system-ui%2C%20-apple-system%2C%20sans-serif%22%20font-size%3D%2218%22%20font-weight%3D%22600%22%20fill%3D%22%23F9FAFB%22%20text-anchor%3D%22middle%22%3ELED%20Desk%20Lamp%20with%20Wireless%20Char...%3C%2Ftext%3E%0A%20%20%3Ctext%20x%3D%22300%22%20y%3D%22310%22%20font-family%3D%22system-ui%2C%20-apple-system%2C%20sans-serif%22%20font-size%3D%2213%22%20font-weight%3D%22500%22%20fill%3D%22%239CA3AF%22%20text-anchor%3D%22middle%22%3EElectronics%20%26amp%3B%20Accessories%20%E2%80%A2%20SKU%3A%20ELEC-LAMP-010%3C%2Ftext%3E%0A%20%20%3Crect%20x%3D%22140%22%20y%3D%22360%22%20width%3D%22320%22%20height%3D%2230%22%20rx%3D%228%22%20fill%3D%22%23111827%22%20stroke%3D%22%23374151%22%20stroke-width%3D%221%22%2F%3E%0A%20%20%3Ctext%20x%3D%22300%22%20y%3D%22380%22%20font-family%3D%22system-ui%2C%20-apple-system%2C%20sans-serif%22%20font-size%3D%2211%22%20font-weight%3D%22500%22%20fill%3D%22%236B7280%22%20text-anchor%3D%22middle%22%3ESynthetic%20Specification%20%E2%80%A2%20CC0%201.0%20Universal%3C%2Ftext%3E%0A%3C%2Fsvg%3E",
    "tag": "Synthetic Demo",
    "badge_type": "demo",
    "is_demo": true,
    "catalogue_source": "aptdot_synthetic",
    "lifecycle_status": "active",
    "verification_tier": "demo",
    "seller": {
      "name": "Aptdot Sample Goods",
      "verifiedStatus": "Synthetic Demo Catalogue",
      "authorizedPartner": false,
      "rating": 4.7,
      "location": "Synthetic Sandbox",
      "fulfillment": "Simulated Delivery (Non-Commercial)",
      "synthetic_notice": "This item belongs to the Aptdot CC0 Synthetic Benchmark Catalogue. It cannot be purchased for real fulfillment."
    },
    "evidence": {
      "source": "Aptdot Synthetic E-Commerce Product Catalog v1.0.0",
      "license": "CC0-1.0 Universal",
      "sku": "ELEC-LAMP-010",
      "dataset_source": "https://www.aptdot.com/datasets/ecommerce-product-catalog/",
      "is_synthetic": true
    },
    "specs": {
      "aptdot_id": "prod_010",
      "sku": "ELEC-LAMP-010",
      "product_type": "Electronics & Accessories > Lighting",
      "cost_price": 25,
      "low_stock_threshold": 8,
      "availability": "in_stock",
      "availability_date": null,
      "dimensions": {
        "weight_g": 1300,
        "length_cm": 45,
        "width_cm": 18,
        "height_cm": 10
      },
      "options": [
        {
          "name": "Color",
          "values": [
            "White",
            "Black"
          ]
        }
      ],
      "variants": [
        {
          "variant_id": "var_010_whi",
          "uuid": "0196672f-ad60-7b4c-a88d-c0bdb6a04724",
          "sku": "ELEC-LAMP-010-WHI",
          "title": "White",
          "options": {
            "Color": "White"
          },
          "price": 69,
          "compare_at_price": null,
          "stock": 23
        },
        {
          "variant_id": "var_010_bla",
          "uuid": "0196672f-ad60-793b-bd30-c380e9e6ed29",
          "sku": "ELEC-LAMP-010-BLA",
          "title": "Black",
          "options": {
            "Color": "Black"
          },
          "price": 69,
          "compare_at_price": null,
          "stock": 47
        }
      ],
      "total_variants": 2
    },
    "variants": [
      {
        "variant_id": "var_010_whi",
        "id": "0196672f-ad60-7b4c-a88d-c0bdb6a04724",
        "uuid": "0196672f-ad60-7b4c-a88d-c0bdb6a04724",
        "sku": "ELEC-LAMP-010-WHI",
        "title": "White",
        "options": {
          "Color": "White"
        },
        "price": 69,
        "compare_at_price": null,
        "stock": 23,
        "in_stock": true
      },
      {
        "variant_id": "var_010_bla",
        "id": "0196672f-ad60-793b-bd30-c380e9e6ed29",
        "uuid": "0196672f-ad60-793b-bd30-c380e9e6ed29",
        "sku": "ELEC-LAMP-010-BLA",
        "title": "Black",
        "options": {
          "Color": "Black"
        },
        "price": 69,
        "compare_at_price": null,
        "stock": 47,
        "in_stock": true
      }
    ],
    "options": [
      {
        "name": "Color",
        "values": [
          "White",
          "Black"
        ]
      }
    ],
    "warranty": "Simulated 1-Year Synthetic Warranty (Demo Only)",
    "return_policy": "Simulated 30-Day Sandbox Returns (Demo Only)",
    "risk_assessment": "Synthetic Demo Item: Fictional specifications for testing and benchmarking only."
  },
  {
    "id": "0196a66e-c740-73d0-b97e-6817224affe0",
    "slug": "aptdot-heavyweight-french-terry-organic-cotton-hoodie",
    "title": "Heavyweight French Terry Organic Cotton Hoodie",
    "name": "Heavyweight French Terry Organic Cotton Hoodie",
    "brand": "Aptdot Sample Goods",
    "category": "Apparel & Wearables",
    "description": "450 gsm organic cotton hoodie with a relaxed fit, double-lined hood and ribbed cuffs.",
    "price": 88,
    "original_price": null,
    "currency": "USD",
    "rating": 3.8,
    "reviews_count": 258,
    "stock": 80,
    "in_stock": true,
    "image_url": "data:image/svg+xml;utf8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%20600%20450%22%20width%3D%22600%22%20height%3D%22450%22%3E%0A%20%20%3Cdefs%3E%0A%20%20%20%20%3ClinearGradient%20id%3D%22bgGrad%22%20x1%3D%220%25%22%20y1%3D%220%25%22%20x2%3D%22100%25%22%20y2%3D%22100%25%22%3E%0A%20%20%20%20%20%20%3Cstop%20offset%3D%220%25%22%20stop-color%3D%22%230B0F19%22%2F%3E%0A%20%20%20%20%20%20%3Cstop%20offset%3D%22100%25%22%20stop-color%3D%22%23111827%22%2F%3E%0A%20%20%20%20%3C%2FlinearGradient%3E%0A%20%20%20%20%3ClinearGradient%20id%3D%22accentGrad%22%20x1%3D%220%25%22%20y1%3D%220%25%22%20x2%3D%22100%25%22%20y2%3D%220%25%22%3E%0A%20%20%20%20%20%20%3Cstop%20offset%3D%220%25%22%20stop-color%3D%22%238B5CF6%22%20stop-opacity%3D%220.9%22%2F%3E%0A%20%20%20%20%20%20%3Cstop%20offset%3D%22100%25%22%20stop-color%3D%22%236366F1%22%20stop-opacity%3D%220.9%22%2F%3E%0A%20%20%20%20%3C%2FlinearGradient%3E%0A%20%20%3C%2Fdefs%3E%0A%20%20%3Crect%20width%3D%22600%22%20height%3D%22450%22%20fill%3D%22url(%23bgGrad)%22%2F%3E%0A%20%20%3Crect%20x%3D%2220%22%20y%3D%2220%22%20width%3D%22560%22%20height%3D%22410%22%20rx%3D%2216%22%20fill%3D%22none%22%20stroke%3D%22url(%23accentGrad)%22%20stroke-width%3D%222%22%20stroke-dasharray%3D%226%2C6%22%20opacity%3D%220.6%22%2F%3E%0A%20%20%3Crect%20x%3D%22175%22%20y%3D%2250%22%20width%3D%22250%22%20height%3D%2234%22%20rx%3D%2217%22%20fill%3D%22%234C1D95%22%20stroke%3D%22%238B5CF6%22%20stroke-width%3D%221.5%22%2F%3E%0A%20%20%3Ctext%20x%3D%22300%22%20y%3D%2272%22%20font-family%3D%22system-ui%2C%20-apple-system%2C%20sans-serif%22%20font-size%3D%2212%22%20font-weight%3D%22700%22%20fill%3D%22%23C4B5FD%22%20text-anchor%3D%22middle%22%20letter-spacing%3D%221.5%22%3EAPTDOT%20SYNTHETIC%20DEMO%3C%2Ftext%3E%0A%20%20%3Crect%20x%3D%22235%22%20y%3D%22125%22%20width%3D%22130%22%20height%3D%22110%22%20rx%3D%2214%22%20fill%3D%22%231F2937%22%20stroke%3D%22%238B5CF6%22%20stroke-width%3D%222%22%2F%3E%0A%20%20%3Cpath%20d%3D%22M275%20180%20L300%20155%20L325%20180%20L300%20205%20Z%22%20fill%3D%22none%22%20stroke%3D%22%238B5CF6%22%20stroke-width%3D%223%22%20stroke-linejoin%3D%22round%22%2F%3E%0A%20%20%3Ccircle%20cx%3D%22300%22%20cy%3D%22180%22%20r%3D%227%22%20fill%3D%22%238B5CF6%22%2F%3E%0A%20%20%3Ctext%20x%3D%22300%22%20y%3D%22280%22%20font-family%3D%22system-ui%2C%20-apple-system%2C%20sans-serif%22%20font-size%3D%2218%22%20font-weight%3D%22600%22%20fill%3D%22%23F9FAFB%22%20text-anchor%3D%22middle%22%3EHeavyweight%20French%20Terry%20Organic...%3C%2Ftext%3E%0A%20%20%3Ctext%20x%3D%22300%22%20y%3D%22310%22%20font-family%3D%22system-ui%2C%20-apple-system%2C%20sans-serif%22%20font-size%3D%2213%22%20font-weight%3D%22500%22%20fill%3D%22%239CA3AF%22%20text-anchor%3D%22middle%22%3EApparel%20%26amp%3B%20Wearables%20%E2%80%A2%20SKU%3A%20APP-HOOD-011%3C%2Ftext%3E%0A%20%20%3Crect%20x%3D%22140%22%20y%3D%22360%22%20width%3D%22320%22%20height%3D%2230%22%20rx%3D%228%22%20fill%3D%22%23111827%22%20stroke%3D%22%23374151%22%20stroke-width%3D%221%22%2F%3E%0A%20%20%3Ctext%20x%3D%22300%22%20y%3D%22380%22%20font-family%3D%22system-ui%2C%20-apple-system%2C%20sans-serif%22%20font-size%3D%2211%22%20font-weight%3D%22500%22%20fill%3D%22%236B7280%22%20text-anchor%3D%22middle%22%3ESynthetic%20Specification%20%E2%80%A2%20CC0%201.0%20Universal%3C%2Ftext%3E%0A%3C%2Fsvg%3E",
    "tag": "Synthetic Demo",
    "badge_type": "demo",
    "is_demo": true,
    "catalogue_source": "aptdot_synthetic",
    "lifecycle_status": "active",
    "verification_tier": "demo",
    "seller": {
      "name": "Aptdot Sample Goods",
      "verifiedStatus": "Synthetic Demo Catalogue",
      "authorizedPartner": false,
      "rating": 3.8,
      "location": "Synthetic Sandbox",
      "fulfillment": "Simulated Delivery (Non-Commercial)",
      "synthetic_notice": "This item belongs to the Aptdot CC0 Synthetic Benchmark Catalogue. It cannot be purchased for real fulfillment."
    },
    "evidence": {
      "source": "Aptdot Synthetic E-Commerce Product Catalog v1.0.0",
      "license": "CC0-1.0 Universal",
      "sku": "APP-HOOD-011",
      "dataset_source": "https://www.aptdot.com/datasets/ecommerce-product-catalog/",
      "is_synthetic": true
    },
    "specs": {
      "aptdot_id": "prod_011",
      "sku": "APP-HOOD-011",
      "product_type": "Apparel & Wearables > Hoodies",
      "cost_price": 29.5,
      "low_stock_threshold": 10,
      "availability": "in_stock",
      "availability_date": null,
      "dimensions": {
        "weight_g": 620,
        "length_cm": 35,
        "width_cm": 28,
        "height_cm": 4
      },
      "options": [
        {
          "name": "Size",
          "values": [
            "S",
            "M",
            "L",
            "XL"
          ]
        },
        {
          "name": "Color",
          "values": [
            "Black",
            "Oatmeal"
          ]
        }
      ],
      "variants": [
        {
          "variant_id": "var_011_s_bla",
          "uuid": "0196a66e-c740-7de1-93d2-7ff0da3276c4",
          "sku": "APP-HOOD-011-S-BLA",
          "title": "S / Black",
          "options": {
            "Size": "S",
            "Color": "Black"
          },
          "price": 88,
          "compare_at_price": null,
          "stock": 9
        },
        {
          "variant_id": "var_011_s_oat",
          "uuid": "0196a66e-c740-7137-87f6-22182597e46b",
          "sku": "APP-HOOD-011-S-OAT",
          "title": "S / Oatmeal",
          "options": {
            "Size": "S",
            "Color": "Oatmeal"
          },
          "price": 88,
          "compare_at_price": null,
          "stock": 6
        },
        {
          "variant_id": "var_011_m_bla",
          "uuid": "0196a66e-c740-7f6a-a0d8-83282c455312",
          "sku": "APP-HOOD-011-M-BLA",
          "title": "M / Black",
          "options": {
            "Size": "M",
            "Color": "Black"
          },
          "price": 88,
          "compare_at_price": null,
          "stock": 10
        },
        {
          "variant_id": "var_011_m_oat",
          "uuid": "0196a66e-c740-72ee-ac89-2fba7cb62b2a",
          "sku": "APP-HOOD-011-M-OAT",
          "title": "M / Oatmeal",
          "options": {
            "Size": "M",
            "Color": "Oatmeal"
          },
          "price": 88,
          "compare_at_price": null,
          "stock": 12
        },
        {
          "variant_id": "var_011_l_bla",
          "uuid": "0196a66e-c740-78bf-8c5a-c337e2810fef",
          "sku": "APP-HOOD-011-L-BLA",
          "title": "L / Black",
          "options": {
            "Size": "L",
            "Color": "Black"
          },
          "price": 88,
          "compare_at_price": null,
          "stock": 11
        },
        {
          "variant_id": "var_011_l_oat",
          "uuid": "0196a66e-c740-70bd-94a3-3be13ffd46fb",
          "sku": "APP-HOOD-011-L-OAT",
          "title": "L / Oatmeal",
          "options": {
            "Size": "L",
            "Color": "Oatmeal"
          },
          "price": 88,
          "compare_at_price": null,
          "stock": 8
        },
        {
          "variant_id": "var_011_xl_bla",
          "uuid": "0196a66e-c740-730b-a9b9-e84d4a357151",
          "sku": "APP-HOOD-011-XL-BLA",
          "title": "XL / Black",
          "options": {
            "Size": "XL",
            "Color": "Black"
          },
          "price": 88,
          "compare_at_price": null,
          "stock": 14
        },
        {
          "variant_id": "var_011_xl_oat",
          "uuid": "0196a66e-c740-7795-be08-c2a1f093b276",
          "sku": "APP-HOOD-011-XL-OAT",
          "title": "XL / Oatmeal",
          "options": {
            "Size": "XL",
            "Color": "Oatmeal"
          },
          "price": 88,
          "compare_at_price": null,
          "stock": 10
        }
      ],
      "total_variants": 8
    },
    "variants": [
      {
        "variant_id": "var_011_s_bla",
        "id": "0196a66e-c740-7de1-93d2-7ff0da3276c4",
        "uuid": "0196a66e-c740-7de1-93d2-7ff0da3276c4",
        "sku": "APP-HOOD-011-S-BLA",
        "title": "S / Black",
        "options": {
          "Size": "S",
          "Color": "Black"
        },
        "price": 88,
        "compare_at_price": null,
        "stock": 9,
        "in_stock": true
      },
      {
        "variant_id": "var_011_s_oat",
        "id": "0196a66e-c740-7137-87f6-22182597e46b",
        "uuid": "0196a66e-c740-7137-87f6-22182597e46b",
        "sku": "APP-HOOD-011-S-OAT",
        "title": "S / Oatmeal",
        "options": {
          "Size": "S",
          "Color": "Oatmeal"
        },
        "price": 88,
        "compare_at_price": null,
        "stock": 6,
        "in_stock": true
      },
      {
        "variant_id": "var_011_m_bla",
        "id": "0196a66e-c740-7f6a-a0d8-83282c455312",
        "uuid": "0196a66e-c740-7f6a-a0d8-83282c455312",
        "sku": "APP-HOOD-011-M-BLA",
        "title": "M / Black",
        "options": {
          "Size": "M",
          "Color": "Black"
        },
        "price": 88,
        "compare_at_price": null,
        "stock": 10,
        "in_stock": true
      },
      {
        "variant_id": "var_011_m_oat",
        "id": "0196a66e-c740-72ee-ac89-2fba7cb62b2a",
        "uuid": "0196a66e-c740-72ee-ac89-2fba7cb62b2a",
        "sku": "APP-HOOD-011-M-OAT",
        "title": "M / Oatmeal",
        "options": {
          "Size": "M",
          "Color": "Oatmeal"
        },
        "price": 88,
        "compare_at_price": null,
        "stock": 12,
        "in_stock": true
      },
      {
        "variant_id": "var_011_l_bla",
        "id": "0196a66e-c740-78bf-8c5a-c337e2810fef",
        "uuid": "0196a66e-c740-78bf-8c5a-c337e2810fef",
        "sku": "APP-HOOD-011-L-BLA",
        "title": "L / Black",
        "options": {
          "Size": "L",
          "Color": "Black"
        },
        "price": 88,
        "compare_at_price": null,
        "stock": 11,
        "in_stock": true
      },
      {
        "variant_id": "var_011_l_oat",
        "id": "0196a66e-c740-70bd-94a3-3be13ffd46fb",
        "uuid": "0196a66e-c740-70bd-94a3-3be13ffd46fb",
        "sku": "APP-HOOD-011-L-OAT",
        "title": "L / Oatmeal",
        "options": {
          "Size": "L",
          "Color": "Oatmeal"
        },
        "price": 88,
        "compare_at_price": null,
        "stock": 8,
        "in_stock": true
      },
      {
        "variant_id": "var_011_xl_bla",
        "id": "0196a66e-c740-730b-a9b9-e84d4a357151",
        "uuid": "0196a66e-c740-730b-a9b9-e84d4a357151",
        "sku": "APP-HOOD-011-XL-BLA",
        "title": "XL / Black",
        "options": {
          "Size": "XL",
          "Color": "Black"
        },
        "price": 88,
        "compare_at_price": null,
        "stock": 14,
        "in_stock": true
      },
      {
        "variant_id": "var_011_xl_oat",
        "id": "0196a66e-c740-7795-be08-c2a1f093b276",
        "uuid": "0196a66e-c740-7795-be08-c2a1f093b276",
        "sku": "APP-HOOD-011-XL-OAT",
        "title": "XL / Oatmeal",
        "options": {
          "Size": "XL",
          "Color": "Oatmeal"
        },
        "price": 88,
        "compare_at_price": null,
        "stock": 10,
        "in_stock": true
      }
    ],
    "options": [
      {
        "name": "Size",
        "values": [
          "S",
          "M",
          "L",
          "XL"
        ]
      },
      {
        "name": "Color",
        "values": [
          "Black",
          "Oatmeal"
        ]
      }
    ],
    "warranty": "Simulated 1-Year Synthetic Warranty (Demo Only)",
    "return_policy": "Simulated 30-Day Sandbox Returns (Demo Only)",
    "risk_assessment": "Synthetic Demo Item: Fictional specifications for testing and benchmarking only."
  },
  {
    "id": "0196e396-4bc0-739f-9dff-0c0511ce90b2",
    "slug": "aptdot-merino-wool-hiking-socks-3-pack",
    "title": "Merino Wool Hiking Socks, 3-Pack",
    "name": "Merino Wool Hiking Socks, 3-Pack",
    "brand": "Aptdot Sample Goods",
    "category": "Apparel & Wearables",
    "description": "Cushioned merino wool blend hiking socks that regulate temperature and resist odour.",
    "price": 24,
    "original_price": null,
    "currency": "USD",
    "rating": 4,
    "reviews_count": 670,
    "stock": 74,
    "in_stock": true,
    "image_url": "data:image/svg+xml;utf8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%20600%20450%22%20width%3D%22600%22%20height%3D%22450%22%3E%0A%20%20%3Cdefs%3E%0A%20%20%20%20%3ClinearGradient%20id%3D%22bgGrad%22%20x1%3D%220%25%22%20y1%3D%220%25%22%20x2%3D%22100%25%22%20y2%3D%22100%25%22%3E%0A%20%20%20%20%20%20%3Cstop%20offset%3D%220%25%22%20stop-color%3D%22%230B0F19%22%2F%3E%0A%20%20%20%20%20%20%3Cstop%20offset%3D%22100%25%22%20stop-color%3D%22%23111827%22%2F%3E%0A%20%20%20%20%3C%2FlinearGradient%3E%0A%20%20%20%20%3ClinearGradient%20id%3D%22accentGrad%22%20x1%3D%220%25%22%20y1%3D%220%25%22%20x2%3D%22100%25%22%20y2%3D%220%25%22%3E%0A%20%20%20%20%20%20%3Cstop%20offset%3D%220%25%22%20stop-color%3D%22%238B5CF6%22%20stop-opacity%3D%220.9%22%2F%3E%0A%20%20%20%20%20%20%3Cstop%20offset%3D%22100%25%22%20stop-color%3D%22%236366F1%22%20stop-opacity%3D%220.9%22%2F%3E%0A%20%20%20%20%3C%2FlinearGradient%3E%0A%20%20%3C%2Fdefs%3E%0A%20%20%3Crect%20width%3D%22600%22%20height%3D%22450%22%20fill%3D%22url(%23bgGrad)%22%2F%3E%0A%20%20%3Crect%20x%3D%2220%22%20y%3D%2220%22%20width%3D%22560%22%20height%3D%22410%22%20rx%3D%2216%22%20fill%3D%22none%22%20stroke%3D%22url(%23accentGrad)%22%20stroke-width%3D%222%22%20stroke-dasharray%3D%226%2C6%22%20opacity%3D%220.6%22%2F%3E%0A%20%20%3Crect%20x%3D%22175%22%20y%3D%2250%22%20width%3D%22250%22%20height%3D%2234%22%20rx%3D%2217%22%20fill%3D%22%234C1D95%22%20stroke%3D%22%238B5CF6%22%20stroke-width%3D%221.5%22%2F%3E%0A%20%20%3Ctext%20x%3D%22300%22%20y%3D%2272%22%20font-family%3D%22system-ui%2C%20-apple-system%2C%20sans-serif%22%20font-size%3D%2212%22%20font-weight%3D%22700%22%20fill%3D%22%23C4B5FD%22%20text-anchor%3D%22middle%22%20letter-spacing%3D%221.5%22%3EAPTDOT%20SYNTHETIC%20DEMO%3C%2Ftext%3E%0A%20%20%3Crect%20x%3D%22235%22%20y%3D%22125%22%20width%3D%22130%22%20height%3D%22110%22%20rx%3D%2214%22%20fill%3D%22%231F2937%22%20stroke%3D%22%238B5CF6%22%20stroke-width%3D%222%22%2F%3E%0A%20%20%3Cpath%20d%3D%22M275%20180%20L300%20155%20L325%20180%20L300%20205%20Z%22%20fill%3D%22none%22%20stroke%3D%22%238B5CF6%22%20stroke-width%3D%223%22%20stroke-linejoin%3D%22round%22%2F%3E%0A%20%20%3Ccircle%20cx%3D%22300%22%20cy%3D%22180%22%20r%3D%227%22%20fill%3D%22%238B5CF6%22%2F%3E%0A%20%20%3Ctext%20x%3D%22300%22%20y%3D%22280%22%20font-family%3D%22system-ui%2C%20-apple-system%2C%20sans-serif%22%20font-size%3D%2218%22%20font-weight%3D%22600%22%20fill%3D%22%23F9FAFB%22%20text-anchor%3D%22middle%22%3EMerino%20Wool%20Hiking%20Socks%2C%203-Pack%3C%2Ftext%3E%0A%20%20%3Ctext%20x%3D%22300%22%20y%3D%22310%22%20font-family%3D%22system-ui%2C%20-apple-system%2C%20sans-serif%22%20font-size%3D%2213%22%20font-weight%3D%22500%22%20fill%3D%22%239CA3AF%22%20text-anchor%3D%22middle%22%3EApparel%20%26amp%3B%20Wearables%20%E2%80%A2%20SKU%3A%20APP-SOCK-012%3C%2Ftext%3E%0A%20%20%3Crect%20x%3D%22140%22%20y%3D%22360%22%20width%3D%22320%22%20height%3D%2230%22%20rx%3D%228%22%20fill%3D%22%23111827%22%20stroke%3D%22%23374151%22%20stroke-width%3D%221%22%2F%3E%0A%20%20%3Ctext%20x%3D%22300%22%20y%3D%22380%22%20font-family%3D%22system-ui%2C%20-apple-system%2C%20sans-serif%22%20font-size%3D%2211%22%20font-weight%3D%22500%22%20fill%3D%22%236B7280%22%20text-anchor%3D%22middle%22%3ESynthetic%20Specification%20%E2%80%A2%20CC0%201.0%20Universal%3C%2Ftext%3E%0A%3C%2Fsvg%3E",
    "tag": "Synthetic Demo",
    "badge_type": "demo",
    "is_demo": true,
    "catalogue_source": "aptdot_synthetic",
    "lifecycle_status": "active",
    "verification_tier": "demo",
    "seller": {
      "name": "Aptdot Sample Goods",
      "verifiedStatus": "Synthetic Demo Catalogue",
      "authorizedPartner": false,
      "rating": 4,
      "location": "Synthetic Sandbox",
      "fulfillment": "Simulated Delivery (Non-Commercial)",
      "synthetic_notice": "This item belongs to the Aptdot CC0 Synthetic Benchmark Catalogue. It cannot be purchased for real fulfillment."
    },
    "evidence": {
      "source": "Aptdot Synthetic E-Commerce Product Catalog v1.0.0",
      "license": "CC0-1.0 Universal",
      "sku": "APP-SOCK-012",
      "dataset_source": "https://www.aptdot.com/datasets/ecommerce-product-catalog/",
      "is_synthetic": true
    },
    "specs": {
      "aptdot_id": "prod_012",
      "sku": "APP-SOCK-012",
      "product_type": "Apparel & Wearables > Socks",
      "cost_price": 7.5,
      "low_stock_threshold": 12,
      "availability": "in_stock",
      "availability_date": null,
      "dimensions": {
        "weight_g": 180,
        "length_cm": 20,
        "width_cm": 12,
        "height_cm": 3
      },
      "options": [
        {
          "name": "Size",
          "values": [
            "S",
            "M",
            "L"
          ]
        }
      ],
      "variants": [
        {
          "variant_id": "var_012_s",
          "uuid": "0196e396-4bc0-74ef-881e-89c99183df88",
          "sku": "APP-SOCK-012-S",
          "title": "S",
          "options": {
            "Size": "S"
          },
          "price": 24,
          "compare_at_price": null,
          "stock": 30
        },
        {
          "variant_id": "var_012_m",
          "uuid": "0196e396-4bc0-7f61-89a8-80e356f476fa",
          "sku": "APP-SOCK-012-M",
          "title": "M",
          "options": {
            "Size": "M"
          },
          "price": 24,
          "compare_at_price": null,
          "stock": 32
        },
        {
          "variant_id": "var_012_l",
          "uuid": "0196e396-4bc0-7b5d-b6a1-df533e3de0f7",
          "sku": "APP-SOCK-012-L",
          "title": "L",
          "options": {
            "Size": "L"
          },
          "price": 24,
          "compare_at_price": null,
          "stock": 12
        }
      ],
      "total_variants": 3
    },
    "variants": [
      {
        "variant_id": "var_012_s",
        "id": "0196e396-4bc0-74ef-881e-89c99183df88",
        "uuid": "0196e396-4bc0-74ef-881e-89c99183df88",
        "sku": "APP-SOCK-012-S",
        "title": "S",
        "options": {
          "Size": "S"
        },
        "price": 24,
        "compare_at_price": null,
        "stock": 30,
        "in_stock": true
      },
      {
        "variant_id": "var_012_m",
        "id": "0196e396-4bc0-7f61-89a8-80e356f476fa",
        "uuid": "0196e396-4bc0-7f61-89a8-80e356f476fa",
        "sku": "APP-SOCK-012-M",
        "title": "M",
        "options": {
          "Size": "M"
        },
        "price": 24,
        "compare_at_price": null,
        "stock": 32,
        "in_stock": true
      },
      {
        "variant_id": "var_012_l",
        "id": "0196e396-4bc0-7b5d-b6a1-df533e3de0f7",
        "uuid": "0196e396-4bc0-7b5d-b6a1-df533e3de0f7",
        "sku": "APP-SOCK-012-L",
        "title": "L",
        "options": {
          "Size": "L"
        },
        "price": 24,
        "compare_at_price": null,
        "stock": 12,
        "in_stock": true
      }
    ],
    "options": [
      {
        "name": "Size",
        "values": [
          "S",
          "M",
          "L"
        ]
      }
    ],
    "warranty": "Simulated 1-Year Synthetic Warranty (Demo Only)",
    "return_policy": "Simulated 30-Day Sandbox Returns (Demo Only)",
    "risk_assessment": "Synthetic Demo Item: Fictional specifications for testing and benchmarking only."
  },
  {
    "id": "0197218b-cea0-7679-92d4-ad0a1c92236d",
    "slug": "aptdot-packable-waterproof-rain-jacket",
    "title": "Packable Waterproof Rain Jacket",
    "name": "Packable Waterproof Rain Jacket",
    "brand": "Aptdot Sample Goods",
    "category": "Apparel & Wearables",
    "description": "2.5-layer waterproof, breathable shell that packs into its own chest pocket.",
    "price": 129,
    "original_price": 159,
    "currency": "USD",
    "rating": 4.3,
    "reviews_count": 777,
    "stock": 75,
    "in_stock": true,
    "image_url": "data:image/svg+xml;utf8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%20600%20450%22%20width%3D%22600%22%20height%3D%22450%22%3E%0A%20%20%3Cdefs%3E%0A%20%20%20%20%3ClinearGradient%20id%3D%22bgGrad%22%20x1%3D%220%25%22%20y1%3D%220%25%22%20x2%3D%22100%25%22%20y2%3D%22100%25%22%3E%0A%20%20%20%20%20%20%3Cstop%20offset%3D%220%25%22%20stop-color%3D%22%230B0F19%22%2F%3E%0A%20%20%20%20%20%20%3Cstop%20offset%3D%22100%25%22%20stop-color%3D%22%23111827%22%2F%3E%0A%20%20%20%20%3C%2FlinearGradient%3E%0A%20%20%20%20%3ClinearGradient%20id%3D%22accentGrad%22%20x1%3D%220%25%22%20y1%3D%220%25%22%20x2%3D%22100%25%22%20y2%3D%220%25%22%3E%0A%20%20%20%20%20%20%3Cstop%20offset%3D%220%25%22%20stop-color%3D%22%238B5CF6%22%20stop-opacity%3D%220.9%22%2F%3E%0A%20%20%20%20%20%20%3Cstop%20offset%3D%22100%25%22%20stop-color%3D%22%236366F1%22%20stop-opacity%3D%220.9%22%2F%3E%0A%20%20%20%20%3C%2FlinearGradient%3E%0A%20%20%3C%2Fdefs%3E%0A%20%20%3Crect%20width%3D%22600%22%20height%3D%22450%22%20fill%3D%22url(%23bgGrad)%22%2F%3E%0A%20%20%3Crect%20x%3D%2220%22%20y%3D%2220%22%20width%3D%22560%22%20height%3D%22410%22%20rx%3D%2216%22%20fill%3D%22none%22%20stroke%3D%22url(%23accentGrad)%22%20stroke-width%3D%222%22%20stroke-dasharray%3D%226%2C6%22%20opacity%3D%220.6%22%2F%3E%0A%20%20%3Crect%20x%3D%22175%22%20y%3D%2250%22%20width%3D%22250%22%20height%3D%2234%22%20rx%3D%2217%22%20fill%3D%22%234C1D95%22%20stroke%3D%22%238B5CF6%22%20stroke-width%3D%221.5%22%2F%3E%0A%20%20%3Ctext%20x%3D%22300%22%20y%3D%2272%22%20font-family%3D%22system-ui%2C%20-apple-system%2C%20sans-serif%22%20font-size%3D%2212%22%20font-weight%3D%22700%22%20fill%3D%22%23C4B5FD%22%20text-anchor%3D%22middle%22%20letter-spacing%3D%221.5%22%3EAPTDOT%20SYNTHETIC%20DEMO%3C%2Ftext%3E%0A%20%20%3Crect%20x%3D%22235%22%20y%3D%22125%22%20width%3D%22130%22%20height%3D%22110%22%20rx%3D%2214%22%20fill%3D%22%231F2937%22%20stroke%3D%22%238B5CF6%22%20stroke-width%3D%222%22%2F%3E%0A%20%20%3Cpath%20d%3D%22M275%20180%20L300%20155%20L325%20180%20L300%20205%20Z%22%20fill%3D%22none%22%20stroke%3D%22%238B5CF6%22%20stroke-width%3D%223%22%20stroke-linejoin%3D%22round%22%2F%3E%0A%20%20%3Ccircle%20cx%3D%22300%22%20cy%3D%22180%22%20r%3D%227%22%20fill%3D%22%238B5CF6%22%2F%3E%0A%20%20%3Ctext%20x%3D%22300%22%20y%3D%22280%22%20font-family%3D%22system-ui%2C%20-apple-system%2C%20sans-serif%22%20font-size%3D%2218%22%20font-weight%3D%22600%22%20fill%3D%22%23F9FAFB%22%20text-anchor%3D%22middle%22%3EPackable%20Waterproof%20Rain%20Jacket%3C%2Ftext%3E%0A%20%20%3Ctext%20x%3D%22300%22%20y%3D%22310%22%20font-family%3D%22system-ui%2C%20-apple-system%2C%20sans-serif%22%20font-size%3D%2213%22%20font-weight%3D%22500%22%20fill%3D%22%239CA3AF%22%20text-anchor%3D%22middle%22%3EApparel%20%26amp%3B%20Wearables%20%E2%80%A2%20SKU%3A%20APP-JACK-013%3C%2Ftext%3E%0A%20%20%3Crect%20x%3D%22140%22%20y%3D%22360%22%20width%3D%22320%22%20height%3D%2230%22%20rx%3D%228%22%20fill%3D%22%23111827%22%20stroke%3D%22%23374151%22%20stroke-width%3D%221%22%2F%3E%0A%20%20%3Ctext%20x%3D%22300%22%20y%3D%22380%22%20font-family%3D%22system-ui%2C%20-apple-system%2C%20sans-serif%22%20font-size%3D%2211%22%20font-weight%3D%22500%22%20fill%3D%22%236B7280%22%20text-anchor%3D%22middle%22%3ESynthetic%20Specification%20%E2%80%A2%20CC0%201.0%20Universal%3C%2Ftext%3E%0A%3C%2Fsvg%3E",
    "tag": "On Sale",
    "badge_type": "demo",
    "is_demo": true,
    "catalogue_source": "aptdot_synthetic",
    "lifecycle_status": "active",
    "verification_tier": "demo",
    "seller": {
      "name": "Aptdot Sample Goods",
      "verifiedStatus": "Synthetic Demo Catalogue",
      "authorizedPartner": false,
      "rating": 4.3,
      "location": "Synthetic Sandbox",
      "fulfillment": "Simulated Delivery (Non-Commercial)",
      "synthetic_notice": "This item belongs to the Aptdot CC0 Synthetic Benchmark Catalogue. It cannot be purchased for real fulfillment."
    },
    "evidence": {
      "source": "Aptdot Synthetic E-Commerce Product Catalog v1.0.0",
      "license": "CC0-1.0 Universal",
      "sku": "APP-JACK-013",
      "dataset_source": "https://www.aptdot.com/datasets/ecommerce-product-catalog/",
      "is_synthetic": true
    },
    "specs": {
      "aptdot_id": "prod_013",
      "sku": "APP-JACK-013",
      "product_type": "Apparel & Wearables > Jackets",
      "cost_price": 46,
      "low_stock_threshold": 5,
      "availability": "in_stock",
      "availability_date": null,
      "dimensions": {
        "weight_g": 340,
        "length_cm": 30,
        "width_cm": 25,
        "height_cm": 5
      },
      "options": [
        {
          "name": "Size",
          "values": [
            "S",
            "M",
            "L",
            "XL"
          ]
        },
        {
          "name": "Color",
          "values": [
            "Olive",
            "Navy"
          ]
        }
      ],
      "variants": [
        {
          "variant_id": "var_013_s_oli",
          "uuid": "0197218b-cea0-71b7-8d15-c626f7b15ede",
          "sku": "APP-JACK-013-S-OLI",
          "title": "S / Olive",
          "options": {
            "Size": "S",
            "Color": "Olive"
          },
          "price": 129,
          "compare_at_price": 159,
          "stock": 6
        },
        {
          "variant_id": "var_013_s_nav",
          "uuid": "0197218b-cea0-764c-a9ab-c41f722788e6",
          "sku": "APP-JACK-013-S-NAV",
          "title": "S / Navy",
          "options": {
            "Size": "S",
            "Color": "Navy"
          },
          "price": 129,
          "compare_at_price": 159,
          "stock": 8
        },
        {
          "variant_id": "var_013_m_oli",
          "uuid": "0197218b-cea0-7407-a110-46325679ce1f",
          "sku": "APP-JACK-013-M-OLI",
          "title": "M / Olive",
          "options": {
            "Size": "M",
            "Color": "Olive"
          },
          "price": 129,
          "compare_at_price": 159,
          "stock": 13
        },
        {
          "variant_id": "var_013_m_nav",
          "uuid": "0197218b-cea0-7f50-8d13-c336fcc1517b",
          "sku": "APP-JACK-013-M-NAV",
          "title": "M / Navy",
          "options": {
            "Size": "M",
            "Color": "Navy"
          },
          "price": 129,
          "compare_at_price": 159,
          "stock": 14
        },
        {
          "variant_id": "var_013_l_oli",
          "uuid": "0197218b-cea0-73fa-abef-612b51f8b2ee",
          "sku": "APP-JACK-013-L-OLI",
          "title": "L / Olive",
          "options": {
            "Size": "L",
            "Color": "Olive"
          },
          "price": 129,
          "compare_at_price": 159,
          "stock": 13
        },
        {
          "variant_id": "var_013_l_nav",
          "uuid": "0197218b-cea0-7a17-aff0-f6f2a388e319",
          "sku": "APP-JACK-013-L-NAV",
          "title": "L / Navy",
          "options": {
            "Size": "L",
            "Color": "Navy"
          },
          "price": 129,
          "compare_at_price": 159,
          "stock": 7
        },
        {
          "variant_id": "var_013_xl_oli",
          "uuid": "0197218b-cea0-7ba7-8e84-4b636aa0ad30",
          "sku": "APP-JACK-013-XL-OLI",
          "title": "XL / Olive",
          "options": {
            "Size": "XL",
            "Color": "Olive"
          },
          "price": 129,
          "compare_at_price": 159,
          "stock": 11
        },
        {
          "variant_id": "var_013_xl_nav",
          "uuid": "0197218b-cea0-735f-8e79-55f0dd4ed995",
          "sku": "APP-JACK-013-XL-NAV",
          "title": "XL / Navy",
          "options": {
            "Size": "XL",
            "Color": "Navy"
          },
          "price": 129,
          "compare_at_price": 159,
          "stock": 3
        }
      ],
      "total_variants": 8
    },
    "variants": [
      {
        "variant_id": "var_013_s_oli",
        "id": "0197218b-cea0-71b7-8d15-c626f7b15ede",
        "uuid": "0197218b-cea0-71b7-8d15-c626f7b15ede",
        "sku": "APP-JACK-013-S-OLI",
        "title": "S / Olive",
        "options": {
          "Size": "S",
          "Color": "Olive"
        },
        "price": 129,
        "compare_at_price": 159,
        "stock": 6,
        "in_stock": true
      },
      {
        "variant_id": "var_013_s_nav",
        "id": "0197218b-cea0-764c-a9ab-c41f722788e6",
        "uuid": "0197218b-cea0-764c-a9ab-c41f722788e6",
        "sku": "APP-JACK-013-S-NAV",
        "title": "S / Navy",
        "options": {
          "Size": "S",
          "Color": "Navy"
        },
        "price": 129,
        "compare_at_price": 159,
        "stock": 8,
        "in_stock": true
      },
      {
        "variant_id": "var_013_m_oli",
        "id": "0197218b-cea0-7407-a110-46325679ce1f",
        "uuid": "0197218b-cea0-7407-a110-46325679ce1f",
        "sku": "APP-JACK-013-M-OLI",
        "title": "M / Olive",
        "options": {
          "Size": "M",
          "Color": "Olive"
        },
        "price": 129,
        "compare_at_price": 159,
        "stock": 13,
        "in_stock": true
      },
      {
        "variant_id": "var_013_m_nav",
        "id": "0197218b-cea0-7f50-8d13-c336fcc1517b",
        "uuid": "0197218b-cea0-7f50-8d13-c336fcc1517b",
        "sku": "APP-JACK-013-M-NAV",
        "title": "M / Navy",
        "options": {
          "Size": "M",
          "Color": "Navy"
        },
        "price": 129,
        "compare_at_price": 159,
        "stock": 14,
        "in_stock": true
      },
      {
        "variant_id": "var_013_l_oli",
        "id": "0197218b-cea0-73fa-abef-612b51f8b2ee",
        "uuid": "0197218b-cea0-73fa-abef-612b51f8b2ee",
        "sku": "APP-JACK-013-L-OLI",
        "title": "L / Olive",
        "options": {
          "Size": "L",
          "Color": "Olive"
        },
        "price": 129,
        "compare_at_price": 159,
        "stock": 13,
        "in_stock": true
      },
      {
        "variant_id": "var_013_l_nav",
        "id": "0197218b-cea0-7a17-aff0-f6f2a388e319",
        "uuid": "0197218b-cea0-7a17-aff0-f6f2a388e319",
        "sku": "APP-JACK-013-L-NAV",
        "title": "L / Navy",
        "options": {
          "Size": "L",
          "Color": "Navy"
        },
        "price": 129,
        "compare_at_price": 159,
        "stock": 7,
        "in_stock": true
      },
      {
        "variant_id": "var_013_xl_oli",
        "id": "0197218b-cea0-7ba7-8e84-4b636aa0ad30",
        "uuid": "0197218b-cea0-7ba7-8e84-4b636aa0ad30",
        "sku": "APP-JACK-013-XL-OLI",
        "title": "XL / Olive",
        "options": {
          "Size": "XL",
          "Color": "Olive"
        },
        "price": 129,
        "compare_at_price": 159,
        "stock": 11,
        "in_stock": true
      },
      {
        "variant_id": "var_013_xl_nav",
        "id": "0197218b-cea0-735f-8e79-55f0dd4ed995",
        "uuid": "0197218b-cea0-735f-8e79-55f0dd4ed995",
        "sku": "APP-JACK-013-XL-NAV",
        "title": "XL / Navy",
        "options": {
          "Size": "XL",
          "Color": "Navy"
        },
        "price": 129,
        "compare_at_price": 159,
        "stock": 3,
        "in_stock": true
      }
    ],
    "options": [
      {
        "name": "Size",
        "values": [
          "S",
          "M",
          "L",
          "XL"
        ]
      },
      {
        "name": "Color",
        "values": [
          "Olive",
          "Navy"
        ]
      }
    ],
    "warranty": "Simulated 1-Year Synthetic Warranty (Demo Only)",
    "return_policy": "Simulated 30-Day Sandbox Returns (Demo Only)",
    "risk_assessment": "Synthetic Demo Item: Fictional specifications for testing and benchmarking only."
  },
  {
    "id": "01975eb3-5320-7d43-900d-e55f210221ab",
    "slug": "aptdot-classic-crew-neck-t-shirt",
    "title": "Classic Crew Neck T-Shirt",
    "name": "Classic Crew Neck T-Shirt",
    "brand": "Aptdot Sample Goods",
    "category": "Apparel & Wearables",
    "description": "Pre-shrunk 180 gsm combed cotton T-shirt with a regular fit.",
    "price": 22,
    "original_price": null,
    "currency": "USD",
    "rating": 4.4,
    "reviews_count": 328,
    "stock": 86,
    "in_stock": true,
    "image_url": "data:image/svg+xml;utf8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%20600%20450%22%20width%3D%22600%22%20height%3D%22450%22%3E%0A%20%20%3Cdefs%3E%0A%20%20%20%20%3ClinearGradient%20id%3D%22bgGrad%22%20x1%3D%220%25%22%20y1%3D%220%25%22%20x2%3D%22100%25%22%20y2%3D%22100%25%22%3E%0A%20%20%20%20%20%20%3Cstop%20offset%3D%220%25%22%20stop-color%3D%22%230B0F19%22%2F%3E%0A%20%20%20%20%20%20%3Cstop%20offset%3D%22100%25%22%20stop-color%3D%22%23111827%22%2F%3E%0A%20%20%20%20%3C%2FlinearGradient%3E%0A%20%20%20%20%3ClinearGradient%20id%3D%22accentGrad%22%20x1%3D%220%25%22%20y1%3D%220%25%22%20x2%3D%22100%25%22%20y2%3D%220%25%22%3E%0A%20%20%20%20%20%20%3Cstop%20offset%3D%220%25%22%20stop-color%3D%22%238B5CF6%22%20stop-opacity%3D%220.9%22%2F%3E%0A%20%20%20%20%20%20%3Cstop%20offset%3D%22100%25%22%20stop-color%3D%22%236366F1%22%20stop-opacity%3D%220.9%22%2F%3E%0A%20%20%20%20%3C%2FlinearGradient%3E%0A%20%20%3C%2Fdefs%3E%0A%20%20%3Crect%20width%3D%22600%22%20height%3D%22450%22%20fill%3D%22url(%23bgGrad)%22%2F%3E%0A%20%20%3Crect%20x%3D%2220%22%20y%3D%2220%22%20width%3D%22560%22%20height%3D%22410%22%20rx%3D%2216%22%20fill%3D%22none%22%20stroke%3D%22url(%23accentGrad)%22%20stroke-width%3D%222%22%20stroke-dasharray%3D%226%2C6%22%20opacity%3D%220.6%22%2F%3E%0A%20%20%3Crect%20x%3D%22175%22%20y%3D%2250%22%20width%3D%22250%22%20height%3D%2234%22%20rx%3D%2217%22%20fill%3D%22%234C1D95%22%20stroke%3D%22%238B5CF6%22%20stroke-width%3D%221.5%22%2F%3E%0A%20%20%3Ctext%20x%3D%22300%22%20y%3D%2272%22%20font-family%3D%22system-ui%2C%20-apple-system%2C%20sans-serif%22%20font-size%3D%2212%22%20font-weight%3D%22700%22%20fill%3D%22%23C4B5FD%22%20text-anchor%3D%22middle%22%20letter-spacing%3D%221.5%22%3EAPTDOT%20SYNTHETIC%20DEMO%3C%2Ftext%3E%0A%20%20%3Crect%20x%3D%22235%22%20y%3D%22125%22%20width%3D%22130%22%20height%3D%22110%22%20rx%3D%2214%22%20fill%3D%22%231F2937%22%20stroke%3D%22%238B5CF6%22%20stroke-width%3D%222%22%2F%3E%0A%20%20%3Cpath%20d%3D%22M275%20180%20L300%20155%20L325%20180%20L300%20205%20Z%22%20fill%3D%22none%22%20stroke%3D%22%238B5CF6%22%20stroke-width%3D%223%22%20stroke-linejoin%3D%22round%22%2F%3E%0A%20%20%3Ccircle%20cx%3D%22300%22%20cy%3D%22180%22%20r%3D%227%22%20fill%3D%22%238B5CF6%22%2F%3E%0A%20%20%3Ctext%20x%3D%22300%22%20y%3D%22280%22%20font-family%3D%22system-ui%2C%20-apple-system%2C%20sans-serif%22%20font-size%3D%2218%22%20font-weight%3D%22600%22%20fill%3D%22%23F9FAFB%22%20text-anchor%3D%22middle%22%3EClassic%20Crew%20Neck%20T-Shirt%3C%2Ftext%3E%0A%20%20%3Ctext%20x%3D%22300%22%20y%3D%22310%22%20font-family%3D%22system-ui%2C%20-apple-system%2C%20sans-serif%22%20font-size%3D%2213%22%20font-weight%3D%22500%22%20fill%3D%22%239CA3AF%22%20text-anchor%3D%22middle%22%3EApparel%20%26amp%3B%20Wearables%20%E2%80%A2%20SKU%3A%20APP-TEE-014%3C%2Ftext%3E%0A%20%20%3Crect%20x%3D%22140%22%20y%3D%22360%22%20width%3D%22320%22%20height%3D%2230%22%20rx%3D%228%22%20fill%3D%22%23111827%22%20stroke%3D%22%23374151%22%20stroke-width%3D%221%22%2F%3E%0A%20%20%3Ctext%20x%3D%22300%22%20y%3D%22380%22%20font-family%3D%22system-ui%2C%20-apple-system%2C%20sans-serif%22%20font-size%3D%2211%22%20font-weight%3D%22500%22%20fill%3D%22%236B7280%22%20text-anchor%3D%22middle%22%3ESynthetic%20Specification%20%E2%80%A2%20CC0%201.0%20Universal%3C%2Ftext%3E%0A%3C%2Fsvg%3E",
    "tag": "Synthetic Demo",
    "badge_type": "demo",
    "is_demo": true,
    "catalogue_source": "aptdot_synthetic",
    "lifecycle_status": "active",
    "verification_tier": "demo",
    "seller": {
      "name": "Aptdot Sample Goods",
      "verifiedStatus": "Synthetic Demo Catalogue",
      "authorizedPartner": false,
      "rating": 4.4,
      "location": "Synthetic Sandbox",
      "fulfillment": "Simulated Delivery (Non-Commercial)",
      "synthetic_notice": "This item belongs to the Aptdot CC0 Synthetic Benchmark Catalogue. It cannot be purchased for real fulfillment."
    },
    "evidence": {
      "source": "Aptdot Synthetic E-Commerce Product Catalog v1.0.0",
      "license": "CC0-1.0 Universal",
      "sku": "APP-TEE-014",
      "dataset_source": "https://www.aptdot.com/datasets/ecommerce-product-catalog/",
      "is_synthetic": true
    },
    "specs": {
      "aptdot_id": "prod_014",
      "sku": "APP-TEE-014",
      "product_type": "Apparel & Wearables > T-Shirts",
      "cost_price": 6,
      "low_stock_threshold": 5,
      "availability": "in_stock",
      "availability_date": null,
      "dimensions": {
        "weight_g": 190,
        "length_cm": 30,
        "width_cm": 25,
        "height_cm": 2
      },
      "options": [
        {
          "name": "Size",
          "values": [
            "XS",
            "S",
            "M",
            "L",
            "XL"
          ]
        },
        {
          "name": "Color",
          "values": [
            "White",
            "Black",
            "Heather Gray"
          ]
        }
      ],
      "variants": [
        {
          "variant_id": "var_014_xs_whi",
          "uuid": "01975eb3-5320-7346-83fc-514bd2d14aa8",
          "sku": "APP-TEE-014-XS-WHI",
          "title": "XS / White",
          "options": {
            "Size": "XS",
            "Color": "White"
          },
          "price": 22,
          "compare_at_price": null,
          "stock": 6
        },
        {
          "variant_id": "var_014_xs_bla",
          "uuid": "01975eb3-5320-7455-923b-32ae6bf57e58",
          "sku": "APP-TEE-014-XS-BLA",
          "title": "XS / Black",
          "options": {
            "Size": "XS",
            "Color": "Black"
          },
          "price": 22,
          "compare_at_price": null,
          "stock": 2
        },
        {
          "variant_id": "var_014_xs_hg",
          "uuid": "01975eb3-5320-7450-90da-c59a20710635",
          "sku": "APP-TEE-014-XS-HG",
          "title": "XS / Heather Gray",
          "options": {
            "Size": "XS",
            "Color": "Heather Gray"
          },
          "price": 22,
          "compare_at_price": null,
          "stock": 7
        },
        {
          "variant_id": "var_014_s_whi",
          "uuid": "01975eb3-5320-7644-9edc-7bed91463d3f",
          "sku": "APP-TEE-014-S-WHI",
          "title": "S / White",
          "options": {
            "Size": "S",
            "Color": "White"
          },
          "price": 22,
          "compare_at_price": null,
          "stock": 3
        },
        {
          "variant_id": "var_014_s_bla",
          "uuid": "01975eb3-5320-7e9b-9f72-75957beb77f8",
          "sku": "APP-TEE-014-S-BLA",
          "title": "S / Black",
          "options": {
            "Size": "S",
            "Color": "Black"
          },
          "price": 22,
          "compare_at_price": null,
          "stock": 8
        },
        {
          "variant_id": "var_014_s_hg",
          "uuid": "01975eb3-5320-7c0a-a195-b43468b0488c",
          "sku": "APP-TEE-014-S-HG",
          "title": "S / Heather Gray",
          "options": {
            "Size": "S",
            "Color": "Heather Gray"
          },
          "price": 22,
          "compare_at_price": null,
          "stock": 6
        },
        {
          "variant_id": "var_014_m_whi",
          "uuid": "01975eb3-5320-7718-acbe-d3a8e1d70b4e",
          "sku": "APP-TEE-014-M-WHI",
          "title": "M / White",
          "options": {
            "Size": "M",
            "Color": "White"
          },
          "price": 22,
          "compare_at_price": null,
          "stock": 2
        },
        {
          "variant_id": "var_014_m_bla",
          "uuid": "01975eb3-5320-78d4-8bb7-e1e22a9aac46",
          "sku": "APP-TEE-014-M-BLA",
          "title": "M / Black",
          "options": {
            "Size": "M",
            "Color": "Black"
          },
          "price": 22,
          "compare_at_price": null,
          "stock": 2
        },
        {
          "variant_id": "var_014_m_hg",
          "uuid": "01975eb3-5320-745e-ba07-bdaf57d70fc7",
          "sku": "APP-TEE-014-M-HG",
          "title": "M / Heather Gray",
          "options": {
            "Size": "M",
            "Color": "Heather Gray"
          },
          "price": 22,
          "compare_at_price": null,
          "stock": 8
        },
        {
          "variant_id": "var_014_l_whi",
          "uuid": "01975eb3-5320-77f5-a4e6-10860c96824b",
          "sku": "APP-TEE-014-L-WHI",
          "title": "L / White",
          "options": {
            "Size": "L",
            "Color": "White"
          },
          "price": 22,
          "compare_at_price": null,
          "stock": 7
        },
        {
          "variant_id": "var_014_l_bla",
          "uuid": "01975eb3-5320-722d-80b4-90c5abe8650c",
          "sku": "APP-TEE-014-L-BLA",
          "title": "L / Black",
          "options": {
            "Size": "L",
            "Color": "Black"
          },
          "price": 22,
          "compare_at_price": null,
          "stock": 8
        },
        {
          "variant_id": "var_014_l_hg",
          "uuid": "01975eb3-5320-7fa2-8a8c-dc4e046dac90",
          "sku": "APP-TEE-014-L-HG",
          "title": "L / Heather Gray",
          "options": {
            "Size": "L",
            "Color": "Heather Gray"
          },
          "price": 22,
          "compare_at_price": null,
          "stock": 5
        },
        {
          "variant_id": "var_014_xl_whi",
          "uuid": "01975eb3-5320-7a91-bccb-d8dcedd19954",
          "sku": "APP-TEE-014-XL-WHI",
          "title": "XL / White",
          "options": {
            "Size": "XL",
            "Color": "White"
          },
          "price": 22,
          "compare_at_price": null,
          "stock": 6
        },
        {
          "variant_id": "var_014_xl_bla",
          "uuid": "01975eb3-5320-74f8-ae10-86bd5a9920ff",
          "sku": "APP-TEE-014-XL-BLA",
          "title": "XL / Black",
          "options": {
            "Size": "XL",
            "Color": "Black"
          },
          "price": 22,
          "compare_at_price": null,
          "stock": 8
        },
        {
          "variant_id": "var_014_xl_hg",
          "uuid": "01975eb3-5320-7691-969c-f4e9d277a5b9",
          "sku": "APP-TEE-014-XL-HG",
          "title": "XL / Heather Gray",
          "options": {
            "Size": "XL",
            "Color": "Heather Gray"
          },
          "price": 22,
          "compare_at_price": null,
          "stock": 8
        }
      ],
      "total_variants": 15
    },
    "variants": [
      {
        "variant_id": "var_014_xs_whi",
        "id": "01975eb3-5320-7346-83fc-514bd2d14aa8",
        "uuid": "01975eb3-5320-7346-83fc-514bd2d14aa8",
        "sku": "APP-TEE-014-XS-WHI",
        "title": "XS / White",
        "options": {
          "Size": "XS",
          "Color": "White"
        },
        "price": 22,
        "compare_at_price": null,
        "stock": 6,
        "in_stock": true
      },
      {
        "variant_id": "var_014_xs_bla",
        "id": "01975eb3-5320-7455-923b-32ae6bf57e58",
        "uuid": "01975eb3-5320-7455-923b-32ae6bf57e58",
        "sku": "APP-TEE-014-XS-BLA",
        "title": "XS / Black",
        "options": {
          "Size": "XS",
          "Color": "Black"
        },
        "price": 22,
        "compare_at_price": null,
        "stock": 2,
        "in_stock": true
      },
      {
        "variant_id": "var_014_xs_hg",
        "id": "01975eb3-5320-7450-90da-c59a20710635",
        "uuid": "01975eb3-5320-7450-90da-c59a20710635",
        "sku": "APP-TEE-014-XS-HG",
        "title": "XS / Heather Gray",
        "options": {
          "Size": "XS",
          "Color": "Heather Gray"
        },
        "price": 22,
        "compare_at_price": null,
        "stock": 7,
        "in_stock": true
      },
      {
        "variant_id": "var_014_s_whi",
        "id": "01975eb3-5320-7644-9edc-7bed91463d3f",
        "uuid": "01975eb3-5320-7644-9edc-7bed91463d3f",
        "sku": "APP-TEE-014-S-WHI",
        "title": "S / White",
        "options": {
          "Size": "S",
          "Color": "White"
        },
        "price": 22,
        "compare_at_price": null,
        "stock": 3,
        "in_stock": true
      },
      {
        "variant_id": "var_014_s_bla",
        "id": "01975eb3-5320-7e9b-9f72-75957beb77f8",
        "uuid": "01975eb3-5320-7e9b-9f72-75957beb77f8",
        "sku": "APP-TEE-014-S-BLA",
        "title": "S / Black",
        "options": {
          "Size": "S",
          "Color": "Black"
        },
        "price": 22,
        "compare_at_price": null,
        "stock": 8,
        "in_stock": true
      },
      {
        "variant_id": "var_014_s_hg",
        "id": "01975eb3-5320-7c0a-a195-b43468b0488c",
        "uuid": "01975eb3-5320-7c0a-a195-b43468b0488c",
        "sku": "APP-TEE-014-S-HG",
        "title": "S / Heather Gray",
        "options": {
          "Size": "S",
          "Color": "Heather Gray"
        },
        "price": 22,
        "compare_at_price": null,
        "stock": 6,
        "in_stock": true
      },
      {
        "variant_id": "var_014_m_whi",
        "id": "01975eb3-5320-7718-acbe-d3a8e1d70b4e",
        "uuid": "01975eb3-5320-7718-acbe-d3a8e1d70b4e",
        "sku": "APP-TEE-014-M-WHI",
        "title": "M / White",
        "options": {
          "Size": "M",
          "Color": "White"
        },
        "price": 22,
        "compare_at_price": null,
        "stock": 2,
        "in_stock": true
      },
      {
        "variant_id": "var_014_m_bla",
        "id": "01975eb3-5320-78d4-8bb7-e1e22a9aac46",
        "uuid": "01975eb3-5320-78d4-8bb7-e1e22a9aac46",
        "sku": "APP-TEE-014-M-BLA",
        "title": "M / Black",
        "options": {
          "Size": "M",
          "Color": "Black"
        },
        "price": 22,
        "compare_at_price": null,
        "stock": 2,
        "in_stock": true
      },
      {
        "variant_id": "var_014_m_hg",
        "id": "01975eb3-5320-745e-ba07-bdaf57d70fc7",
        "uuid": "01975eb3-5320-745e-ba07-bdaf57d70fc7",
        "sku": "APP-TEE-014-M-HG",
        "title": "M / Heather Gray",
        "options": {
          "Size": "M",
          "Color": "Heather Gray"
        },
        "price": 22,
        "compare_at_price": null,
        "stock": 8,
        "in_stock": true
      },
      {
        "variant_id": "var_014_l_whi",
        "id": "01975eb3-5320-77f5-a4e6-10860c96824b",
        "uuid": "01975eb3-5320-77f5-a4e6-10860c96824b",
        "sku": "APP-TEE-014-L-WHI",
        "title": "L / White",
        "options": {
          "Size": "L",
          "Color": "White"
        },
        "price": 22,
        "compare_at_price": null,
        "stock": 7,
        "in_stock": true
      },
      {
        "variant_id": "var_014_l_bla",
        "id": "01975eb3-5320-722d-80b4-90c5abe8650c",
        "uuid": "01975eb3-5320-722d-80b4-90c5abe8650c",
        "sku": "APP-TEE-014-L-BLA",
        "title": "L / Black",
        "options": {
          "Size": "L",
          "Color": "Black"
        },
        "price": 22,
        "compare_at_price": null,
        "stock": 8,
        "in_stock": true
      },
      {
        "variant_id": "var_014_l_hg",
        "id": "01975eb3-5320-7fa2-8a8c-dc4e046dac90",
        "uuid": "01975eb3-5320-7fa2-8a8c-dc4e046dac90",
        "sku": "APP-TEE-014-L-HG",
        "title": "L / Heather Gray",
        "options": {
          "Size": "L",
          "Color": "Heather Gray"
        },
        "price": 22,
        "compare_at_price": null,
        "stock": 5,
        "in_stock": true
      },
      {
        "variant_id": "var_014_xl_whi",
        "id": "01975eb3-5320-7a91-bccb-d8dcedd19954",
        "uuid": "01975eb3-5320-7a91-bccb-d8dcedd19954",
        "sku": "APP-TEE-014-XL-WHI",
        "title": "XL / White",
        "options": {
          "Size": "XL",
          "Color": "White"
        },
        "price": 22,
        "compare_at_price": null,
        "stock": 6,
        "in_stock": true
      },
      {
        "variant_id": "var_014_xl_bla",
        "id": "01975eb3-5320-74f8-ae10-86bd5a9920ff",
        "uuid": "01975eb3-5320-74f8-ae10-86bd5a9920ff",
        "sku": "APP-TEE-014-XL-BLA",
        "title": "XL / Black",
        "options": {
          "Size": "XL",
          "Color": "Black"
        },
        "price": 22,
        "compare_at_price": null,
        "stock": 8,
        "in_stock": true
      },
      {
        "variant_id": "var_014_xl_hg",
        "id": "01975eb3-5320-7691-969c-f4e9d277a5b9",
        "uuid": "01975eb3-5320-7691-969c-f4e9d277a5b9",
        "sku": "APP-TEE-014-XL-HG",
        "title": "XL / Heather Gray",
        "options": {
          "Size": "XL",
          "Color": "Heather Gray"
        },
        "price": 22,
        "compare_at_price": null,
        "stock": 8,
        "in_stock": true
      }
    ],
    "options": [
      {
        "name": "Size",
        "values": [
          "XS",
          "S",
          "M",
          "L",
          "XL"
        ]
      },
      {
        "name": "Color",
        "values": [
          "White",
          "Black",
          "Heather Gray"
        ]
      }
    ],
    "warranty": "Simulated 1-Year Synthetic Warranty (Demo Only)",
    "return_policy": "Simulated 30-Day Sandbox Returns (Demo Only)",
    "risk_assessment": "Synthetic Demo Item: Fictional specifications for testing and benchmarking only."
  },
  {
    "id": "01979e1b-9fe0-794a-8513-9c2e94eba28d",
    "slug": "aptdot-ribbed-recycled-knit-beanie",
    "title": "Ribbed Recycled Knit Beanie",
    "name": "Ribbed Recycled Knit Beanie",
    "brand": "Aptdot Sample Goods",
    "category": "Apparel & Wearables",
    "description": "Rib-knit beanie made from recycled polyester yarn with a fold-over cuff.",
    "price": 18,
    "original_price": null,
    "currency": "USD",
    "rating": 4.6,
    "reviews_count": 855,
    "stock": 79,
    "in_stock": true,
    "image_url": "data:image/svg+xml;utf8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%20600%20450%22%20width%3D%22600%22%20height%3D%22450%22%3E%0A%20%20%3Cdefs%3E%0A%20%20%20%20%3ClinearGradient%20id%3D%22bgGrad%22%20x1%3D%220%25%22%20y1%3D%220%25%22%20x2%3D%22100%25%22%20y2%3D%22100%25%22%3E%0A%20%20%20%20%20%20%3Cstop%20offset%3D%220%25%22%20stop-color%3D%22%230B0F19%22%2F%3E%0A%20%20%20%20%20%20%3Cstop%20offset%3D%22100%25%22%20stop-color%3D%22%23111827%22%2F%3E%0A%20%20%20%20%3C%2FlinearGradient%3E%0A%20%20%20%20%3ClinearGradient%20id%3D%22accentGrad%22%20x1%3D%220%25%22%20y1%3D%220%25%22%20x2%3D%22100%25%22%20y2%3D%220%25%22%3E%0A%20%20%20%20%20%20%3Cstop%20offset%3D%220%25%22%20stop-color%3D%22%238B5CF6%22%20stop-opacity%3D%220.9%22%2F%3E%0A%20%20%20%20%20%20%3Cstop%20offset%3D%22100%25%22%20stop-color%3D%22%236366F1%22%20stop-opacity%3D%220.9%22%2F%3E%0A%20%20%20%20%3C%2FlinearGradient%3E%0A%20%20%3C%2Fdefs%3E%0A%20%20%3Crect%20width%3D%22600%22%20height%3D%22450%22%20fill%3D%22url(%23bgGrad)%22%2F%3E%0A%20%20%3Crect%20x%3D%2220%22%20y%3D%2220%22%20width%3D%22560%22%20height%3D%22410%22%20rx%3D%2216%22%20fill%3D%22none%22%20stroke%3D%22url(%23accentGrad)%22%20stroke-width%3D%222%22%20stroke-dasharray%3D%226%2C6%22%20opacity%3D%220.6%22%2F%3E%0A%20%20%3Crect%20x%3D%22175%22%20y%3D%2250%22%20width%3D%22250%22%20height%3D%2234%22%20rx%3D%2217%22%20fill%3D%22%234C1D95%22%20stroke%3D%22%238B5CF6%22%20stroke-width%3D%221.5%22%2F%3E%0A%20%20%3Ctext%20x%3D%22300%22%20y%3D%2272%22%20font-family%3D%22system-ui%2C%20-apple-system%2C%20sans-serif%22%20font-size%3D%2212%22%20font-weight%3D%22700%22%20fill%3D%22%23C4B5FD%22%20text-anchor%3D%22middle%22%20letter-spacing%3D%221.5%22%3EAPTDOT%20SYNTHETIC%20DEMO%3C%2Ftext%3E%0A%20%20%3Crect%20x%3D%22235%22%20y%3D%22125%22%20width%3D%22130%22%20height%3D%22110%22%20rx%3D%2214%22%20fill%3D%22%231F2937%22%20stroke%3D%22%238B5CF6%22%20stroke-width%3D%222%22%2F%3E%0A%20%20%3Cpath%20d%3D%22M275%20180%20L300%20155%20L325%20180%20L300%20205%20Z%22%20fill%3D%22none%22%20stroke%3D%22%238B5CF6%22%20stroke-width%3D%223%22%20stroke-linejoin%3D%22round%22%2F%3E%0A%20%20%3Ccircle%20cx%3D%22300%22%20cy%3D%22180%22%20r%3D%227%22%20fill%3D%22%238B5CF6%22%2F%3E%0A%20%20%3Ctext%20x%3D%22300%22%20y%3D%22280%22%20font-family%3D%22system-ui%2C%20-apple-system%2C%20sans-serif%22%20font-size%3D%2218%22%20font-weight%3D%22600%22%20fill%3D%22%23F9FAFB%22%20text-anchor%3D%22middle%22%3ERibbed%20Recycled%20Knit%20Beanie%3C%2Ftext%3E%0A%20%20%3Ctext%20x%3D%22300%22%20y%3D%22310%22%20font-family%3D%22system-ui%2C%20-apple-system%2C%20sans-serif%22%20font-size%3D%2213%22%20font-weight%3D%22500%22%20fill%3D%22%239CA3AF%22%20text-anchor%3D%22middle%22%3EApparel%20%26amp%3B%20Wearables%20%E2%80%A2%20SKU%3A%20APP-BEAN-015%3C%2Ftext%3E%0A%20%20%3Crect%20x%3D%22140%22%20y%3D%22360%22%20width%3D%22320%22%20height%3D%2230%22%20rx%3D%228%22%20fill%3D%22%23111827%22%20stroke%3D%22%23374151%22%20stroke-width%3D%221%22%2F%3E%0A%20%20%3Ctext%20x%3D%22300%22%20y%3D%22380%22%20font-family%3D%22system-ui%2C%20-apple-system%2C%20sans-serif%22%20font-size%3D%2211%22%20font-weight%3D%22500%22%20fill%3D%22%236B7280%22%20text-anchor%3D%22middle%22%3ESynthetic%20Specification%20%E2%80%A2%20CC0%201.0%20Universal%3C%2Ftext%3E%0A%3C%2Fsvg%3E",
    "tag": "Synthetic Demo",
    "badge_type": "demo",
    "is_demo": true,
    "catalogue_source": "aptdot_synthetic",
    "lifecycle_status": "active",
    "verification_tier": "demo",
    "seller": {
      "name": "Aptdot Sample Goods",
      "verifiedStatus": "Synthetic Demo Catalogue",
      "authorizedPartner": false,
      "rating": 4.6,
      "location": "Synthetic Sandbox",
      "fulfillment": "Simulated Delivery (Non-Commercial)",
      "synthetic_notice": "This item belongs to the Aptdot CC0 Synthetic Benchmark Catalogue. It cannot be purchased for real fulfillment."
    },
    "evidence": {
      "source": "Aptdot Synthetic E-Commerce Product Catalog v1.0.0",
      "license": "CC0-1.0 Universal",
      "sku": "APP-BEAN-015",
      "dataset_source": "https://www.aptdot.com/datasets/ecommerce-product-catalog/",
      "is_synthetic": true
    },
    "specs": {
      "aptdot_id": "prod_015",
      "sku": "APP-BEAN-015",
      "product_type": "Apparel & Wearables > Hats",
      "cost_price": 5,
      "low_stock_threshold": 10,
      "availability": "in_stock",
      "availability_date": null,
      "dimensions": {
        "weight_g": 90,
        "length_cm": 22,
        "width_cm": 20,
        "height_cm": 3
      },
      "options": [
        {
          "name": "Color",
          "values": [
            "Charcoal",
            "Rust",
            "Cream"
          ]
        }
      ],
      "variants": [
        {
          "variant_id": "var_015_cha",
          "uuid": "01979e1b-9fe0-7d29-9e75-9d36aa2e5525",
          "sku": "APP-BEAN-015-CHA",
          "title": "Charcoal",
          "options": {
            "Color": "Charcoal"
          },
          "price": 18,
          "compare_at_price": null,
          "stock": 20
        },
        {
          "variant_id": "var_015_rus",
          "uuid": "01979e1b-9fe0-73c4-859d-543e4469b8fa",
          "sku": "APP-BEAN-015-RUS",
          "title": "Rust",
          "options": {
            "Color": "Rust"
          },
          "price": 18,
          "compare_at_price": null,
          "stock": 39
        },
        {
          "variant_id": "var_015_cre",
          "uuid": "01979e1b-9fe0-7ea1-9290-1becd1fe117f",
          "sku": "APP-BEAN-015-CRE",
          "title": "Cream",
          "options": {
            "Color": "Cream"
          },
          "price": 18,
          "compare_at_price": null,
          "stock": 20
        }
      ],
      "total_variants": 3
    },
    "variants": [
      {
        "variant_id": "var_015_cha",
        "id": "01979e1b-9fe0-7d29-9e75-9d36aa2e5525",
        "uuid": "01979e1b-9fe0-7d29-9e75-9d36aa2e5525",
        "sku": "APP-BEAN-015-CHA",
        "title": "Charcoal",
        "options": {
          "Color": "Charcoal"
        },
        "price": 18,
        "compare_at_price": null,
        "stock": 20,
        "in_stock": true
      },
      {
        "variant_id": "var_015_rus",
        "id": "01979e1b-9fe0-73c4-859d-543e4469b8fa",
        "uuid": "01979e1b-9fe0-73c4-859d-543e4469b8fa",
        "sku": "APP-BEAN-015-RUS",
        "title": "Rust",
        "options": {
          "Color": "Rust"
        },
        "price": 18,
        "compare_at_price": null,
        "stock": 39,
        "in_stock": true
      },
      {
        "variant_id": "var_015_cre",
        "id": "01979e1b-9fe0-7ea1-9290-1becd1fe117f",
        "uuid": "01979e1b-9fe0-7ea1-9290-1becd1fe117f",
        "sku": "APP-BEAN-015-CRE",
        "title": "Cream",
        "options": {
          "Color": "Cream"
        },
        "price": 18,
        "compare_at_price": null,
        "stock": 20,
        "in_stock": true
      }
    ],
    "options": [
      {
        "name": "Color",
        "values": [
          "Charcoal",
          "Rust",
          "Cream"
        ]
      }
    ],
    "warranty": "Simulated 1-Year Synthetic Warranty (Demo Only)",
    "return_policy": "Simulated 30-Day Sandbox Returns (Demo Only)",
    "risk_assessment": "Synthetic Demo Item: Fictional specifications for testing and benchmarking only."
  },
  {
    "id": "0197d9eb-d1c0-7a75-b8a1-635f9a604038",
    "slug": "aptdot-lightweight-running-shorts",
    "title": "Lightweight Running Shorts",
    "name": "Lightweight Running Shorts",
    "brand": "Aptdot Sample Goods",
    "category": "Apparel & Wearables",
    "description": "5-inch running shorts with a built-in liner, zip pocket and reflective trims.",
    "price": 34,
    "original_price": 42,
    "currency": "USD",
    "rating": 3.9,
    "reviews_count": 339,
    "stock": 81,
    "in_stock": true,
    "image_url": "data:image/svg+xml;utf8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%20600%20450%22%20width%3D%22600%22%20height%3D%22450%22%3E%0A%20%20%3Cdefs%3E%0A%20%20%20%20%3ClinearGradient%20id%3D%22bgGrad%22%20x1%3D%220%25%22%20y1%3D%220%25%22%20x2%3D%22100%25%22%20y2%3D%22100%25%22%3E%0A%20%20%20%20%20%20%3Cstop%20offset%3D%220%25%22%20stop-color%3D%22%230B0F19%22%2F%3E%0A%20%20%20%20%20%20%3Cstop%20offset%3D%22100%25%22%20stop-color%3D%22%23111827%22%2F%3E%0A%20%20%20%20%3C%2FlinearGradient%3E%0A%20%20%20%20%3ClinearGradient%20id%3D%22accentGrad%22%20x1%3D%220%25%22%20y1%3D%220%25%22%20x2%3D%22100%25%22%20y2%3D%220%25%22%3E%0A%20%20%20%20%20%20%3Cstop%20offset%3D%220%25%22%20stop-color%3D%22%238B5CF6%22%20stop-opacity%3D%220.9%22%2F%3E%0A%20%20%20%20%20%20%3Cstop%20offset%3D%22100%25%22%20stop-color%3D%22%236366F1%22%20stop-opacity%3D%220.9%22%2F%3E%0A%20%20%20%20%3C%2FlinearGradient%3E%0A%20%20%3C%2Fdefs%3E%0A%20%20%3Crect%20width%3D%22600%22%20height%3D%22450%22%20fill%3D%22url(%23bgGrad)%22%2F%3E%0A%20%20%3Crect%20x%3D%2220%22%20y%3D%2220%22%20width%3D%22560%22%20height%3D%22410%22%20rx%3D%2216%22%20fill%3D%22none%22%20stroke%3D%22url(%23accentGrad)%22%20stroke-width%3D%222%22%20stroke-dasharray%3D%226%2C6%22%20opacity%3D%220.6%22%2F%3E%0A%20%20%3Crect%20x%3D%22175%22%20y%3D%2250%22%20width%3D%22250%22%20height%3D%2234%22%20rx%3D%2217%22%20fill%3D%22%234C1D95%22%20stroke%3D%22%238B5CF6%22%20stroke-width%3D%221.5%22%2F%3E%0A%20%20%3Ctext%20x%3D%22300%22%20y%3D%2272%22%20font-family%3D%22system-ui%2C%20-apple-system%2C%20sans-serif%22%20font-size%3D%2212%22%20font-weight%3D%22700%22%20fill%3D%22%23C4B5FD%22%20text-anchor%3D%22middle%22%20letter-spacing%3D%221.5%22%3EAPTDOT%20SYNTHETIC%20DEMO%3C%2Ftext%3E%0A%20%20%3Crect%20x%3D%22235%22%20y%3D%22125%22%20width%3D%22130%22%20height%3D%22110%22%20rx%3D%2214%22%20fill%3D%22%231F2937%22%20stroke%3D%22%238B5CF6%22%20stroke-width%3D%222%22%2F%3E%0A%20%20%3Cpath%20d%3D%22M275%20180%20L300%20155%20L325%20180%20L300%20205%20Z%22%20fill%3D%22none%22%20stroke%3D%22%238B5CF6%22%20stroke-width%3D%223%22%20stroke-linejoin%3D%22round%22%2F%3E%0A%20%20%3Ccircle%20cx%3D%22300%22%20cy%3D%22180%22%20r%3D%227%22%20fill%3D%22%238B5CF6%22%2F%3E%0A%20%20%3Ctext%20x%3D%22300%22%20y%3D%22280%22%20font-family%3D%22system-ui%2C%20-apple-system%2C%20sans-serif%22%20font-size%3D%2218%22%20font-weight%3D%22600%22%20fill%3D%22%23F9FAFB%22%20text-anchor%3D%22middle%22%3ELightweight%20Running%20Shorts%3C%2Ftext%3E%0A%20%20%3Ctext%20x%3D%22300%22%20y%3D%22310%22%20font-family%3D%22system-ui%2C%20-apple-system%2C%20sans-serif%22%20font-size%3D%2213%22%20font-weight%3D%22500%22%20fill%3D%22%239CA3AF%22%20text-anchor%3D%22middle%22%3EApparel%20%26amp%3B%20Wearables%20%E2%80%A2%20SKU%3A%20APP-RUN-016%3C%2Ftext%3E%0A%20%20%3Crect%20x%3D%22140%22%20y%3D%22360%22%20width%3D%22320%22%20height%3D%2230%22%20rx%3D%228%22%20fill%3D%22%23111827%22%20stroke%3D%22%23374151%22%20stroke-width%3D%221%22%2F%3E%0A%20%20%3Ctext%20x%3D%22300%22%20y%3D%22380%22%20font-family%3D%22system-ui%2C%20-apple-system%2C%20sans-serif%22%20font-size%3D%2211%22%20font-weight%3D%22500%22%20fill%3D%22%236B7280%22%20text-anchor%3D%22middle%22%3ESynthetic%20Specification%20%E2%80%A2%20CC0%201.0%20Universal%3C%2Ftext%3E%0A%3C%2Fsvg%3E",
    "tag": "On Sale",
    "badge_type": "demo",
    "is_demo": true,
    "catalogue_source": "aptdot_synthetic",
    "lifecycle_status": "active",
    "verification_tier": "demo",
    "seller": {
      "name": "Aptdot Sample Goods",
      "verifiedStatus": "Synthetic Demo Catalogue",
      "authorizedPartner": false,
      "rating": 3.9,
      "location": "Synthetic Sandbox",
      "fulfillment": "Simulated Delivery (Non-Commercial)",
      "synthetic_notice": "This item belongs to the Aptdot CC0 Synthetic Benchmark Catalogue. It cannot be purchased for real fulfillment."
    },
    "evidence": {
      "source": "Aptdot Synthetic E-Commerce Product Catalog v1.0.0",
      "license": "CC0-1.0 Universal",
      "sku": "APP-RUN-016",
      "dataset_source": "https://www.aptdot.com/datasets/ecommerce-product-catalog/",
      "is_synthetic": true
    },
    "specs": {
      "aptdot_id": "prod_016",
      "sku": "APP-RUN-016",
      "product_type": "Apparel & Wearables > Shorts",
      "cost_price": 11,
      "low_stock_threshold": 12,
      "availability": "in_stock",
      "availability_date": null,
      "dimensions": {
        "weight_g": 120,
        "length_cm": 25,
        "width_cm": 20,
        "height_cm": 2
      },
      "options": [
        {
          "name": "Size",
          "values": [
            "S",
            "M",
            "L",
            "XL"
          ]
        }
      ],
      "variants": [
        {
          "variant_id": "var_016_s",
          "uuid": "0197d9eb-d1c0-7b9f-b027-c39ea94109b2",
          "sku": "APP-RUN-016-S",
          "title": "S",
          "options": {
            "Size": "S"
          },
          "price": 34,
          "compare_at_price": 42,
          "stock": 13
        },
        {
          "variant_id": "var_016_m",
          "uuid": "0197d9eb-d1c0-70b7-a85a-e17a9df47394",
          "sku": "APP-RUN-016-M",
          "title": "M",
          "options": {
            "Size": "M"
          },
          "price": 34,
          "compare_at_price": 42,
          "stock": 22
        },
        {
          "variant_id": "var_016_l",
          "uuid": "0197d9eb-d1c0-758d-b1f6-3d2c9b86b19f",
          "sku": "APP-RUN-016-L",
          "title": "L",
          "options": {
            "Size": "L"
          },
          "price": 34,
          "compare_at_price": 42,
          "stock": 30
        },
        {
          "variant_id": "var_016_xl",
          "uuid": "0197d9eb-d1c0-7e57-ba05-bbcddc4abbd1",
          "sku": "APP-RUN-016-XL",
          "title": "XL",
          "options": {
            "Size": "XL"
          },
          "price": 34,
          "compare_at_price": 42,
          "stock": 16
        }
      ],
      "total_variants": 4
    },
    "variants": [
      {
        "variant_id": "var_016_s",
        "id": "0197d9eb-d1c0-7b9f-b027-c39ea94109b2",
        "uuid": "0197d9eb-d1c0-7b9f-b027-c39ea94109b2",
        "sku": "APP-RUN-016-S",
        "title": "S",
        "options": {
          "Size": "S"
        },
        "price": 34,
        "compare_at_price": 42,
        "stock": 13,
        "in_stock": true
      },
      {
        "variant_id": "var_016_m",
        "id": "0197d9eb-d1c0-70b7-a85a-e17a9df47394",
        "uuid": "0197d9eb-d1c0-70b7-a85a-e17a9df47394",
        "sku": "APP-RUN-016-M",
        "title": "M",
        "options": {
          "Size": "M"
        },
        "price": 34,
        "compare_at_price": 42,
        "stock": 22,
        "in_stock": true
      },
      {
        "variant_id": "var_016_l",
        "id": "0197d9eb-d1c0-758d-b1f6-3d2c9b86b19f",
        "uuid": "0197d9eb-d1c0-758d-b1f6-3d2c9b86b19f",
        "sku": "APP-RUN-016-L",
        "title": "L",
        "options": {
          "Size": "L"
        },
        "price": 34,
        "compare_at_price": 42,
        "stock": 30,
        "in_stock": true
      },
      {
        "variant_id": "var_016_xl",
        "id": "0197d9eb-d1c0-7e57-ba05-bbcddc4abbd1",
        "uuid": "0197d9eb-d1c0-7e57-ba05-bbcddc4abbd1",
        "sku": "APP-RUN-016-XL",
        "title": "XL",
        "options": {
          "Size": "XL"
        },
        "price": 34,
        "compare_at_price": 42,
        "stock": 16,
        "in_stock": true
      }
    ],
    "options": [
      {
        "name": "Size",
        "values": [
          "S",
          "M",
          "L",
          "XL"
        ]
      }
    ],
    "warranty": "Simulated 1-Year Synthetic Warranty (Demo Only)",
    "return_policy": "Simulated 30-Day Sandbox Returns (Demo Only)",
    "risk_assessment": "Synthetic Demo Item: Fictional specifications for testing and benchmarking only."
  },
  {
    "id": "019819b4-3fe0-7233-96b5-13fd954a0e7a",
    "slug": "aptdot-full-grain-leather-belt",
    "title": "Full-Grain Leather Belt",
    "name": "Full-Grain Leather Belt",
    "brand": "Aptdot Sample Goods",
    "category": "Apparel & Wearables",
    "description": "35 mm full-grain leather belt with a solid brass buckle. Discontinued and kept for archive tests.",
    "price": 55,
    "original_price": null,
    "currency": "USD",
    "rating": 3.8,
    "reviews_count": 806,
    "stock": 58,
    "in_stock": true,
    "image_url": "data:image/svg+xml;utf8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%20600%20450%22%20width%3D%22600%22%20height%3D%22450%22%3E%0A%20%20%3Cdefs%3E%0A%20%20%20%20%3ClinearGradient%20id%3D%22bgGrad%22%20x1%3D%220%25%22%20y1%3D%220%25%22%20x2%3D%22100%25%22%20y2%3D%22100%25%22%3E%0A%20%20%20%20%20%20%3Cstop%20offset%3D%220%25%22%20stop-color%3D%22%230B0F19%22%2F%3E%0A%20%20%20%20%20%20%3Cstop%20offset%3D%22100%25%22%20stop-color%3D%22%23111827%22%2F%3E%0A%20%20%20%20%3C%2FlinearGradient%3E%0A%20%20%20%20%3ClinearGradient%20id%3D%22accentGrad%22%20x1%3D%220%25%22%20y1%3D%220%25%22%20x2%3D%22100%25%22%20y2%3D%220%25%22%3E%0A%20%20%20%20%20%20%3Cstop%20offset%3D%220%25%22%20stop-color%3D%22%238B5CF6%22%20stop-opacity%3D%220.9%22%2F%3E%0A%20%20%20%20%20%20%3Cstop%20offset%3D%22100%25%22%20stop-color%3D%22%236366F1%22%20stop-opacity%3D%220.9%22%2F%3E%0A%20%20%20%20%3C%2FlinearGradient%3E%0A%20%20%3C%2Fdefs%3E%0A%20%20%3Crect%20width%3D%22600%22%20height%3D%22450%22%20fill%3D%22url(%23bgGrad)%22%2F%3E%0A%20%20%3Crect%20x%3D%2220%22%20y%3D%2220%22%20width%3D%22560%22%20height%3D%22410%22%20rx%3D%2216%22%20fill%3D%22none%22%20stroke%3D%22url(%23accentGrad)%22%20stroke-width%3D%222%22%20stroke-dasharray%3D%226%2C6%22%20opacity%3D%220.6%22%2F%3E%0A%20%20%3Crect%20x%3D%22175%22%20y%3D%2250%22%20width%3D%22250%22%20height%3D%2234%22%20rx%3D%2217%22%20fill%3D%22%234C1D95%22%20stroke%3D%22%238B5CF6%22%20stroke-width%3D%221.5%22%2F%3E%0A%20%20%3Ctext%20x%3D%22300%22%20y%3D%2272%22%20font-family%3D%22system-ui%2C%20-apple-system%2C%20sans-serif%22%20font-size%3D%2212%22%20font-weight%3D%22700%22%20fill%3D%22%23C4B5FD%22%20text-anchor%3D%22middle%22%20letter-spacing%3D%221.5%22%3EAPTDOT%20SYNTHETIC%20DEMO%3C%2Ftext%3E%0A%20%20%3Crect%20x%3D%22235%22%20y%3D%22125%22%20width%3D%22130%22%20height%3D%22110%22%20rx%3D%2214%22%20fill%3D%22%231F2937%22%20stroke%3D%22%238B5CF6%22%20stroke-width%3D%222%22%2F%3E%0A%20%20%3Cpath%20d%3D%22M275%20180%20L300%20155%20L325%20180%20L300%20205%20Z%22%20fill%3D%22none%22%20stroke%3D%22%238B5CF6%22%20stroke-width%3D%223%22%20stroke-linejoin%3D%22round%22%2F%3E%0A%20%20%3Ccircle%20cx%3D%22300%22%20cy%3D%22180%22%20r%3D%227%22%20fill%3D%22%238B5CF6%22%2F%3E%0A%20%20%3Ctext%20x%3D%22300%22%20y%3D%22280%22%20font-family%3D%22system-ui%2C%20-apple-system%2C%20sans-serif%22%20font-size%3D%2218%22%20font-weight%3D%22600%22%20fill%3D%22%23F9FAFB%22%20text-anchor%3D%22middle%22%3EFull-Grain%20Leather%20Belt%3C%2Ftext%3E%0A%20%20%3Ctext%20x%3D%22300%22%20y%3D%22310%22%20font-family%3D%22system-ui%2C%20-apple-system%2C%20sans-serif%22%20font-size%3D%2213%22%20font-weight%3D%22500%22%20fill%3D%22%239CA3AF%22%20text-anchor%3D%22middle%22%3EApparel%20%26amp%3B%20Wearables%20%E2%80%A2%20SKU%3A%20APP-BELT-017%3C%2Ftext%3E%0A%20%20%3Crect%20x%3D%22140%22%20y%3D%22360%22%20width%3D%22320%22%20height%3D%2230%22%20rx%3D%228%22%20fill%3D%22%23111827%22%20stroke%3D%22%23374151%22%20stroke-width%3D%221%22%2F%3E%0A%20%20%3Ctext%20x%3D%22300%22%20y%3D%22380%22%20font-family%3D%22system-ui%2C%20-apple-system%2C%20sans-serif%22%20font-size%3D%2211%22%20font-weight%3D%22500%22%20fill%3D%22%236B7280%22%20text-anchor%3D%22middle%22%3ESynthetic%20Specification%20%E2%80%A2%20CC0%201.0%20Universal%3C%2Ftext%3E%0A%3C%2Fsvg%3E",
    "tag": "Archived / Discontinued",
    "badge_type": "demo",
    "is_demo": true,
    "catalogue_source": "aptdot_synthetic",
    "lifecycle_status": "archived",
    "verification_tier": "demo",
    "seller": {
      "name": "Aptdot Sample Goods",
      "verifiedStatus": "Synthetic Demo Catalogue",
      "authorizedPartner": false,
      "rating": 3.8,
      "location": "Synthetic Sandbox",
      "fulfillment": "Simulated Delivery (Non-Commercial)",
      "synthetic_notice": "This item belongs to the Aptdot CC0 Synthetic Benchmark Catalogue. It cannot be purchased for real fulfillment."
    },
    "evidence": {
      "source": "Aptdot Synthetic E-Commerce Product Catalog v1.0.0",
      "license": "CC0-1.0 Universal",
      "sku": "APP-BELT-017",
      "dataset_source": "https://www.aptdot.com/datasets/ecommerce-product-catalog/",
      "is_synthetic": true
    },
    "specs": {
      "aptdot_id": "prod_017",
      "sku": "APP-BELT-017",
      "product_type": "Apparel & Wearables > Belts",
      "cost_price": 19,
      "low_stock_threshold": 5,
      "availability": "in_stock",
      "availability_date": null,
      "dimensions": {
        "weight_g": 210,
        "length_cm": 30,
        "width_cm": 12,
        "height_cm": 4
      },
      "options": [
        {
          "name": "Waist",
          "values": [
            "30",
            "32",
            "34",
            "36",
            "38"
          ]
        }
      ],
      "variants": [
        {
          "variant_id": "var_017_30",
          "uuid": "019819b4-3fe0-7dd3-98af-23e5fede5baa",
          "sku": "APP-BELT-017-30",
          "title": "30",
          "options": {
            "Waist": "30"
          },
          "price": 55,
          "compare_at_price": null,
          "stock": 10
        },
        {
          "variant_id": "var_017_32",
          "uuid": "019819b4-3fe0-7fb5-99c2-9bd942612464",
          "sku": "APP-BELT-017-32",
          "title": "32",
          "options": {
            "Waist": "32"
          },
          "price": 55,
          "compare_at_price": null,
          "stock": 9
        },
        {
          "variant_id": "var_017_34",
          "uuid": "019819b4-3fe0-703f-a515-1f419e37ea50",
          "sku": "APP-BELT-017-34",
          "title": "34",
          "options": {
            "Waist": "34"
          },
          "price": 55,
          "compare_at_price": null,
          "stock": 6
        },
        {
          "variant_id": "var_017_36",
          "uuid": "019819b4-3fe0-70fe-9e58-d51618fae486",
          "sku": "APP-BELT-017-36",
          "title": "36",
          "options": {
            "Waist": "36"
          },
          "price": 55,
          "compare_at_price": null,
          "stock": 10
        },
        {
          "variant_id": "var_017_38",
          "uuid": "019819b4-3fe0-7346-bf80-4c4ddae7ff38",
          "sku": "APP-BELT-017-38",
          "title": "38",
          "options": {
            "Waist": "38"
          },
          "price": 55,
          "compare_at_price": null,
          "stock": 23
        }
      ],
      "total_variants": 5
    },
    "variants": [
      {
        "variant_id": "var_017_30",
        "id": "019819b4-3fe0-7dd3-98af-23e5fede5baa",
        "uuid": "019819b4-3fe0-7dd3-98af-23e5fede5baa",
        "sku": "APP-BELT-017-30",
        "title": "30",
        "options": {
          "Waist": "30"
        },
        "price": 55,
        "compare_at_price": null,
        "stock": 10,
        "in_stock": true
      },
      {
        "variant_id": "var_017_32",
        "id": "019819b4-3fe0-7fb5-99c2-9bd942612464",
        "uuid": "019819b4-3fe0-7fb5-99c2-9bd942612464",
        "sku": "APP-BELT-017-32",
        "title": "32",
        "options": {
          "Waist": "32"
        },
        "price": 55,
        "compare_at_price": null,
        "stock": 9,
        "in_stock": true
      },
      {
        "variant_id": "var_017_34",
        "id": "019819b4-3fe0-703f-a515-1f419e37ea50",
        "uuid": "019819b4-3fe0-703f-a515-1f419e37ea50",
        "sku": "APP-BELT-017-34",
        "title": "34",
        "options": {
          "Waist": "34"
        },
        "price": 55,
        "compare_at_price": null,
        "stock": 6,
        "in_stock": true
      },
      {
        "variant_id": "var_017_36",
        "id": "019819b4-3fe0-70fe-9e58-d51618fae486",
        "uuid": "019819b4-3fe0-70fe-9e58-d51618fae486",
        "sku": "APP-BELT-017-36",
        "title": "36",
        "options": {
          "Waist": "36"
        },
        "price": 55,
        "compare_at_price": null,
        "stock": 10,
        "in_stock": true
      },
      {
        "variant_id": "var_017_38",
        "id": "019819b4-3fe0-7346-bf80-4c4ddae7ff38",
        "uuid": "019819b4-3fe0-7346-bf80-4c4ddae7ff38",
        "sku": "APP-BELT-017-38",
        "title": "38",
        "options": {
          "Waist": "38"
        },
        "price": 55,
        "compare_at_price": null,
        "stock": 23,
        "in_stock": true
      }
    ],
    "options": [
      {
        "name": "Waist",
        "values": [
          "30",
          "32",
          "34",
          "36",
          "38"
        ]
      }
    ],
    "warranty": "Simulated 1-Year Synthetic Warranty (Demo Only)",
    "return_policy": "Simulated 30-Day Sandbox Returns (Demo Only)",
    "risk_assessment": "Synthetic Demo Item: Fictional specifications for testing and benchmarking only."
  },
  {
    "id": "0198566d-e760-7344-94f8-ddd4898bffbd",
    "slug": "aptdot-unstructured-six-panel-cap",
    "title": "Unstructured Six-Panel Cap",
    "name": "Unstructured Six-Panel Cap",
    "brand": "Aptdot Sample Goods",
    "category": "Apparel & Wearables",
    "description": "Washed cotton twill cap with an adjustable strap. One size.",
    "price": 26,
    "original_price": null,
    "currency": "USD",
    "rating": 4.6,
    "reviews_count": 439,
    "stock": 36,
    "in_stock": true,
    "image_url": "data:image/svg+xml;utf8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%20600%20450%22%20width%3D%22600%22%20height%3D%22450%22%3E%0A%20%20%3Cdefs%3E%0A%20%20%20%20%3ClinearGradient%20id%3D%22bgGrad%22%20x1%3D%220%25%22%20y1%3D%220%25%22%20x2%3D%22100%25%22%20y2%3D%22100%25%22%3E%0A%20%20%20%20%20%20%3Cstop%20offset%3D%220%25%22%20stop-color%3D%22%230B0F19%22%2F%3E%0A%20%20%20%20%20%20%3Cstop%20offset%3D%22100%25%22%20stop-color%3D%22%23111827%22%2F%3E%0A%20%20%20%20%3C%2FlinearGradient%3E%0A%20%20%20%20%3ClinearGradient%20id%3D%22accentGrad%22%20x1%3D%220%25%22%20y1%3D%220%25%22%20x2%3D%22100%25%22%20y2%3D%220%25%22%3E%0A%20%20%20%20%20%20%3Cstop%20offset%3D%220%25%22%20stop-color%3D%22%238B5CF6%22%20stop-opacity%3D%220.9%22%2F%3E%0A%20%20%20%20%20%20%3Cstop%20offset%3D%22100%25%22%20stop-color%3D%22%236366F1%22%20stop-opacity%3D%220.9%22%2F%3E%0A%20%20%20%20%3C%2FlinearGradient%3E%0A%20%20%3C%2Fdefs%3E%0A%20%20%3Crect%20width%3D%22600%22%20height%3D%22450%22%20fill%3D%22url(%23bgGrad)%22%2F%3E%0A%20%20%3Crect%20x%3D%2220%22%20y%3D%2220%22%20width%3D%22560%22%20height%3D%22410%22%20rx%3D%2216%22%20fill%3D%22none%22%20stroke%3D%22url(%23accentGrad)%22%20stroke-width%3D%222%22%20stroke-dasharray%3D%226%2C6%22%20opacity%3D%220.6%22%2F%3E%0A%20%20%3Crect%20x%3D%22175%22%20y%3D%2250%22%20width%3D%22250%22%20height%3D%2234%22%20rx%3D%2217%22%20fill%3D%22%234C1D95%22%20stroke%3D%22%238B5CF6%22%20stroke-width%3D%221.5%22%2F%3E%0A%20%20%3Ctext%20x%3D%22300%22%20y%3D%2272%22%20font-family%3D%22system-ui%2C%20-apple-system%2C%20sans-serif%22%20font-size%3D%2212%22%20font-weight%3D%22700%22%20fill%3D%22%23C4B5FD%22%20text-anchor%3D%22middle%22%20letter-spacing%3D%221.5%22%3EAPTDOT%20SYNTHETIC%20DEMO%3C%2Ftext%3E%0A%20%20%3Crect%20x%3D%22235%22%20y%3D%22125%22%20width%3D%22130%22%20height%3D%22110%22%20rx%3D%2214%22%20fill%3D%22%231F2937%22%20stroke%3D%22%238B5CF6%22%20stroke-width%3D%222%22%2F%3E%0A%20%20%3Cpath%20d%3D%22M275%20180%20L300%20155%20L325%20180%20L300%20205%20Z%22%20fill%3D%22none%22%20stroke%3D%22%238B5CF6%22%20stroke-width%3D%223%22%20stroke-linejoin%3D%22round%22%2F%3E%0A%20%20%3Ccircle%20cx%3D%22300%22%20cy%3D%22180%22%20r%3D%227%22%20fill%3D%22%238B5CF6%22%2F%3E%0A%20%20%3Ctext%20x%3D%22300%22%20y%3D%22280%22%20font-family%3D%22system-ui%2C%20-apple-system%2C%20sans-serif%22%20font-size%3D%2218%22%20font-weight%3D%22600%22%20fill%3D%22%23F9FAFB%22%20text-anchor%3D%22middle%22%3EUnstructured%20Six-Panel%20Cap%3C%2Ftext%3E%0A%20%20%3Ctext%20x%3D%22300%22%20y%3D%22310%22%20font-family%3D%22system-ui%2C%20-apple-system%2C%20sans-serif%22%20font-size%3D%2213%22%20font-weight%3D%22500%22%20fill%3D%22%239CA3AF%22%20text-anchor%3D%22middle%22%3EApparel%20%26amp%3B%20Wearables%20%E2%80%A2%20SKU%3A%20APP-CAP-018%3C%2Ftext%3E%0A%20%20%3Crect%20x%3D%22140%22%20y%3D%22360%22%20width%3D%22320%22%20height%3D%2230%22%20rx%3D%228%22%20fill%3D%22%23111827%22%20stroke%3D%22%23374151%22%20stroke-width%3D%221%22%2F%3E%0A%20%20%3Ctext%20x%3D%22300%22%20y%3D%22380%22%20font-family%3D%22system-ui%2C%20-apple-system%2C%20sans-serif%22%20font-size%3D%2211%22%20font-weight%3D%22500%22%20fill%3D%22%236B7280%22%20text-anchor%3D%22middle%22%3ESynthetic%20Specification%20%E2%80%A2%20CC0%201.0%20Universal%3C%2Ftext%3E%0A%3C%2Fsvg%3E",
    "tag": "Synthetic Demo",
    "badge_type": "demo",
    "is_demo": true,
    "catalogue_source": "aptdot_synthetic",
    "lifecycle_status": "active",
    "verification_tier": "demo",
    "seller": {
      "name": "Aptdot Sample Goods",
      "verifiedStatus": "Synthetic Demo Catalogue",
      "authorizedPartner": false,
      "rating": 4.6,
      "location": "Synthetic Sandbox",
      "fulfillment": "Simulated Delivery (Non-Commercial)",
      "synthetic_notice": "This item belongs to the Aptdot CC0 Synthetic Benchmark Catalogue. It cannot be purchased for real fulfillment."
    },
    "evidence": {
      "source": "Aptdot Synthetic E-Commerce Product Catalog v1.0.0",
      "license": "CC0-1.0 Universal",
      "sku": "APP-CAP-018",
      "dataset_source": "https://www.aptdot.com/datasets/ecommerce-product-catalog/",
      "is_synthetic": true
    },
    "specs": {
      "aptdot_id": "prod_018",
      "sku": "APP-CAP-018",
      "product_type": "Apparel & Wearables > Hats",
      "cost_price": 7,
      "low_stock_threshold": 20,
      "availability": "in_stock",
      "availability_date": null,
      "dimensions": {
        "weight_g": 85,
        "length_cm": 25,
        "width_cm": 18,
        "height_cm": 10
      },
      "options": [],
      "variants": [
        {
          "variant_id": "var_018_default",
          "uuid": "0198566d-e760-78c1-8b7d-152835446b27",
          "sku": "APP-CAP-018",
          "title": "Default",
          "options": {},
          "price": 26,
          "compare_at_price": null,
          "stock": 36
        }
      ],
      "total_variants": 1
    },
    "variants": [
      {
        "variant_id": "var_018_default",
        "id": "0198566d-e760-78c1-8b7d-152835446b27",
        "uuid": "0198566d-e760-78c1-8b7d-152835446b27",
        "sku": "APP-CAP-018",
        "title": "Default",
        "options": {},
        "price": 26,
        "compare_at_price": null,
        "stock": 36,
        "in_stock": true
      }
    ],
    "options": [],
    "warranty": "Simulated 1-Year Synthetic Warranty (Demo Only)",
    "return_policy": "Simulated 30-Day Sandbox Returns (Demo Only)",
    "risk_assessment": "Synthetic Demo Item: Fictional specifications for testing and benchmarking only."
  },
  {
    "id": "019893da-1600-7328-afd8-6b1bfe14e566",
    "slug": "aptdot-minimalist-analog-watch-with-sapphire-crystal",
    "title": "Minimalist Analog Watch with Sapphire Crystal",
    "name": "Minimalist Analog Watch with Sapphire Crystal",
    "brand": "Aptdot Sample Goods",
    "category": "Apparel & Wearables",
    "description": "38 mm quartz watch with a sapphire crystal, 5 ATM water resistance and quick-release straps.",
    "price": 149,
    "original_price": 189,
    "currency": "USD",
    "rating": 4.3,
    "reviews_count": 335,
    "stock": 59,
    "in_stock": true,
    "image_url": "data:image/svg+xml;utf8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%20600%20450%22%20width%3D%22600%22%20height%3D%22450%22%3E%0A%20%20%3Cdefs%3E%0A%20%20%20%20%3ClinearGradient%20id%3D%22bgGrad%22%20x1%3D%220%25%22%20y1%3D%220%25%22%20x2%3D%22100%25%22%20y2%3D%22100%25%22%3E%0A%20%20%20%20%20%20%3Cstop%20offset%3D%220%25%22%20stop-color%3D%22%230B0F19%22%2F%3E%0A%20%20%20%20%20%20%3Cstop%20offset%3D%22100%25%22%20stop-color%3D%22%23111827%22%2F%3E%0A%20%20%20%20%3C%2FlinearGradient%3E%0A%20%20%20%20%3ClinearGradient%20id%3D%22accentGrad%22%20x1%3D%220%25%22%20y1%3D%220%25%22%20x2%3D%22100%25%22%20y2%3D%220%25%22%3E%0A%20%20%20%20%20%20%3Cstop%20offset%3D%220%25%22%20stop-color%3D%22%238B5CF6%22%20stop-opacity%3D%220.9%22%2F%3E%0A%20%20%20%20%20%20%3Cstop%20offset%3D%22100%25%22%20stop-color%3D%22%236366F1%22%20stop-opacity%3D%220.9%22%2F%3E%0A%20%20%20%20%3C%2FlinearGradient%3E%0A%20%20%3C%2Fdefs%3E%0A%20%20%3Crect%20width%3D%22600%22%20height%3D%22450%22%20fill%3D%22url(%23bgGrad)%22%2F%3E%0A%20%20%3Crect%20x%3D%2220%22%20y%3D%2220%22%20width%3D%22560%22%20height%3D%22410%22%20rx%3D%2216%22%20fill%3D%22none%22%20stroke%3D%22url(%23accentGrad)%22%20stroke-width%3D%222%22%20stroke-dasharray%3D%226%2C6%22%20opacity%3D%220.6%22%2F%3E%0A%20%20%3Crect%20x%3D%22175%22%20y%3D%2250%22%20width%3D%22250%22%20height%3D%2234%22%20rx%3D%2217%22%20fill%3D%22%234C1D95%22%20stroke%3D%22%238B5CF6%22%20stroke-width%3D%221.5%22%2F%3E%0A%20%20%3Ctext%20x%3D%22300%22%20y%3D%2272%22%20font-family%3D%22system-ui%2C%20-apple-system%2C%20sans-serif%22%20font-size%3D%2212%22%20font-weight%3D%22700%22%20fill%3D%22%23C4B5FD%22%20text-anchor%3D%22middle%22%20letter-spacing%3D%221.5%22%3EAPTDOT%20SYNTHETIC%20DEMO%3C%2Ftext%3E%0A%20%20%3Crect%20x%3D%22235%22%20y%3D%22125%22%20width%3D%22130%22%20height%3D%22110%22%20rx%3D%2214%22%20fill%3D%22%231F2937%22%20stroke%3D%22%238B5CF6%22%20stroke-width%3D%222%22%2F%3E%0A%20%20%3Cpath%20d%3D%22M275%20180%20L300%20155%20L325%20180%20L300%20205%20Z%22%20fill%3D%22none%22%20stroke%3D%22%238B5CF6%22%20stroke-width%3D%223%22%20stroke-linejoin%3D%22round%22%2F%3E%0A%20%20%3Ccircle%20cx%3D%22300%22%20cy%3D%22180%22%20r%3D%227%22%20fill%3D%22%238B5CF6%22%2F%3E%0A%20%20%3Ctext%20x%3D%22300%22%20y%3D%22280%22%20font-family%3D%22system-ui%2C%20-apple-system%2C%20sans-serif%22%20font-size%3D%2218%22%20font-weight%3D%22600%22%20fill%3D%22%23F9FAFB%22%20text-anchor%3D%22middle%22%3EMinimalist%20Analog%20Watch%20with%20Sap...%3C%2Ftext%3E%0A%20%20%3Ctext%20x%3D%22300%22%20y%3D%22310%22%20font-family%3D%22system-ui%2C%20-apple-system%2C%20sans-serif%22%20font-size%3D%2213%22%20font-weight%3D%22500%22%20fill%3D%22%239CA3AF%22%20text-anchor%3D%22middle%22%3EApparel%20%26amp%3B%20Wearables%20%E2%80%A2%20SKU%3A%20APP-WATCH-019%3C%2Ftext%3E%0A%20%20%3Crect%20x%3D%22140%22%20y%3D%22360%22%20width%3D%22320%22%20height%3D%2230%22%20rx%3D%228%22%20fill%3D%22%23111827%22%20stroke%3D%22%23374151%22%20stroke-width%3D%221%22%2F%3E%0A%20%20%3Ctext%20x%3D%22300%22%20y%3D%22380%22%20font-family%3D%22system-ui%2C%20-apple-system%2C%20sans-serif%22%20font-size%3D%2211%22%20font-weight%3D%22500%22%20fill%3D%22%236B7280%22%20text-anchor%3D%22middle%22%3ESynthetic%20Specification%20%E2%80%A2%20CC0%201.0%20Universal%3C%2Ftext%3E%0A%3C%2Fsvg%3E",
    "tag": "On Sale",
    "badge_type": "demo",
    "is_demo": true,
    "catalogue_source": "aptdot_synthetic",
    "lifecycle_status": "active",
    "verification_tier": "demo",
    "seller": {
      "name": "Aptdot Sample Goods",
      "verifiedStatus": "Synthetic Demo Catalogue",
      "authorizedPartner": false,
      "rating": 4.3,
      "location": "Synthetic Sandbox",
      "fulfillment": "Simulated Delivery (Non-Commercial)",
      "synthetic_notice": "This item belongs to the Aptdot CC0 Synthetic Benchmark Catalogue. It cannot be purchased for real fulfillment."
    },
    "evidence": {
      "source": "Aptdot Synthetic E-Commerce Product Catalog v1.0.0",
      "license": "CC0-1.0 Universal",
      "sku": "APP-WATCH-019",
      "dataset_source": "https://www.aptdot.com/datasets/ecommerce-product-catalog/",
      "is_synthetic": true
    },
    "specs": {
      "aptdot_id": "prod_019",
      "sku": "APP-WATCH-019",
      "product_type": "Apparel & Wearables > Watches",
      "cost_price": 55,
      "low_stock_threshold": 12,
      "availability": "in_stock",
      "availability_date": null,
      "dimensions": {
        "weight_g": 160,
        "length_cm": 12,
        "width_cm": 10,
        "height_cm": 8
      },
      "options": [
        {
          "name": "Strap",
          "values": [
            "Leather",
            "Mesh"
          ]
        },
        {
          "name": "Dial",
          "values": [
            "Black",
            "White"
          ]
        },
        {
          "name": "Case",
          "values": [
            "Silver",
            "Gold"
          ]
        }
      ],
      "variants": [
        {
          "variant_id": "var_019_lea_bla_sil",
          "uuid": "019893da-1600-7fab-9546-f4d4b94d4e83",
          "sku": "APP-WATCH-019-LEA-BLA-SIL",
          "title": "Leather / Black / Silver",
          "options": {
            "Strap": "Leather",
            "Dial": "Black",
            "Case": "Silver"
          },
          "price": 149,
          "compare_at_price": 189,
          "stock": 6
        },
        {
          "variant_id": "var_019_lea_bla_gol",
          "uuid": "019893da-1600-7503-bf5f-0fc571d5452f",
          "sku": "APP-WATCH-019-LEA-BLA-GOL",
          "title": "Leather / Black / Gold",
          "options": {
            "Strap": "Leather",
            "Dial": "Black",
            "Case": "Gold"
          },
          "price": 169,
          "compare_at_price": 209,
          "stock": 5
        },
        {
          "variant_id": "var_019_lea_whi_sil",
          "uuid": "019893da-1600-7813-b57c-a6a5b4e0891e",
          "sku": "APP-WATCH-019-LEA-WHI-SIL",
          "title": "Leather / White / Silver",
          "options": {
            "Strap": "Leather",
            "Dial": "White",
            "Case": "Silver"
          },
          "price": 149,
          "compare_at_price": 189,
          "stock": 0
        },
        {
          "variant_id": "var_019_lea_whi_gol",
          "uuid": "019893da-1600-7781-9b8e-fa1b7121387e",
          "sku": "APP-WATCH-019-LEA-WHI-GOL",
          "title": "Leather / White / Gold",
          "options": {
            "Strap": "Leather",
            "Dial": "White",
            "Case": "Gold"
          },
          "price": 169,
          "compare_at_price": 209,
          "stock": 10
        },
        {
          "variant_id": "var_019_mes_bla_sil",
          "uuid": "019893da-1600-7a6a-ab74-e70c1b1d5518",
          "sku": "APP-WATCH-019-MES-BLA-SIL",
          "title": "Mesh / Black / Silver",
          "options": {
            "Strap": "Mesh",
            "Dial": "Black",
            "Case": "Silver"
          },
          "price": 149,
          "compare_at_price": 189,
          "stock": 6
        },
        {
          "variant_id": "var_019_mes_bla_gol",
          "uuid": "019893da-1600-7312-9e90-af74eac7462e",
          "sku": "APP-WATCH-019-MES-BLA-GOL",
          "title": "Mesh / Black / Gold",
          "options": {
            "Strap": "Mesh",
            "Dial": "Black",
            "Case": "Gold"
          },
          "price": 169,
          "compare_at_price": 209,
          "stock": 12
        },
        {
          "variant_id": "var_019_mes_whi_sil",
          "uuid": "019893da-1600-77b6-9f5c-493410e23911",
          "sku": "APP-WATCH-019-MES-WHI-SIL",
          "title": "Mesh / White / Silver",
          "options": {
            "Strap": "Mesh",
            "Dial": "White",
            "Case": "Silver"
          },
          "price": 149,
          "compare_at_price": 189,
          "stock": 12
        },
        {
          "variant_id": "var_019_mes_whi_gol",
          "uuid": "019893da-1600-7638-893e-0fb140a6daea",
          "sku": "APP-WATCH-019-MES-WHI-GOL",
          "title": "Mesh / White / Gold",
          "options": {
            "Strap": "Mesh",
            "Dial": "White",
            "Case": "Gold"
          },
          "price": 169,
          "compare_at_price": 209,
          "stock": 8
        }
      ],
      "total_variants": 8
    },
    "variants": [
      {
        "variant_id": "var_019_lea_bla_sil",
        "id": "019893da-1600-7fab-9546-f4d4b94d4e83",
        "uuid": "019893da-1600-7fab-9546-f4d4b94d4e83",
        "sku": "APP-WATCH-019-LEA-BLA-SIL",
        "title": "Leather / Black / Silver",
        "options": {
          "Strap": "Leather",
          "Dial": "Black",
          "Case": "Silver"
        },
        "price": 149,
        "compare_at_price": 189,
        "stock": 6,
        "in_stock": true
      },
      {
        "variant_id": "var_019_lea_bla_gol",
        "id": "019893da-1600-7503-bf5f-0fc571d5452f",
        "uuid": "019893da-1600-7503-bf5f-0fc571d5452f",
        "sku": "APP-WATCH-019-LEA-BLA-GOL",
        "title": "Leather / Black / Gold",
        "options": {
          "Strap": "Leather",
          "Dial": "Black",
          "Case": "Gold"
        },
        "price": 169,
        "compare_at_price": 209,
        "stock": 5,
        "in_stock": true
      },
      {
        "variant_id": "var_019_lea_whi_sil",
        "id": "019893da-1600-7813-b57c-a6a5b4e0891e",
        "uuid": "019893da-1600-7813-b57c-a6a5b4e0891e",
        "sku": "APP-WATCH-019-LEA-WHI-SIL",
        "title": "Leather / White / Silver",
        "options": {
          "Strap": "Leather",
          "Dial": "White",
          "Case": "Silver"
        },
        "price": 149,
        "compare_at_price": 189,
        "stock": 0,
        "in_stock": false
      },
      {
        "variant_id": "var_019_lea_whi_gol",
        "id": "019893da-1600-7781-9b8e-fa1b7121387e",
        "uuid": "019893da-1600-7781-9b8e-fa1b7121387e",
        "sku": "APP-WATCH-019-LEA-WHI-GOL",
        "title": "Leather / White / Gold",
        "options": {
          "Strap": "Leather",
          "Dial": "White",
          "Case": "Gold"
        },
        "price": 169,
        "compare_at_price": 209,
        "stock": 10,
        "in_stock": true
      },
      {
        "variant_id": "var_019_mes_bla_sil",
        "id": "019893da-1600-7a6a-ab74-e70c1b1d5518",
        "uuid": "019893da-1600-7a6a-ab74-e70c1b1d5518",
        "sku": "APP-WATCH-019-MES-BLA-SIL",
        "title": "Mesh / Black / Silver",
        "options": {
          "Strap": "Mesh",
          "Dial": "Black",
          "Case": "Silver"
        },
        "price": 149,
        "compare_at_price": 189,
        "stock": 6,
        "in_stock": true
      },
      {
        "variant_id": "var_019_mes_bla_gol",
        "id": "019893da-1600-7312-9e90-af74eac7462e",
        "uuid": "019893da-1600-7312-9e90-af74eac7462e",
        "sku": "APP-WATCH-019-MES-BLA-GOL",
        "title": "Mesh / Black / Gold",
        "options": {
          "Strap": "Mesh",
          "Dial": "Black",
          "Case": "Gold"
        },
        "price": 169,
        "compare_at_price": 209,
        "stock": 12,
        "in_stock": true
      },
      {
        "variant_id": "var_019_mes_whi_sil",
        "id": "019893da-1600-77b6-9f5c-493410e23911",
        "uuid": "019893da-1600-77b6-9f5c-493410e23911",
        "sku": "APP-WATCH-019-MES-WHI-SIL",
        "title": "Mesh / White / Silver",
        "options": {
          "Strap": "Mesh",
          "Dial": "White",
          "Case": "Silver"
        },
        "price": 149,
        "compare_at_price": 189,
        "stock": 12,
        "in_stock": true
      },
      {
        "variant_id": "var_019_mes_whi_gol",
        "id": "019893da-1600-7638-893e-0fb140a6daea",
        "uuid": "019893da-1600-7638-893e-0fb140a6daea",
        "sku": "APP-WATCH-019-MES-WHI-GOL",
        "title": "Mesh / White / Gold",
        "options": {
          "Strap": "Mesh",
          "Dial": "White",
          "Case": "Gold"
        },
        "price": 169,
        "compare_at_price": 209,
        "stock": 8,
        "in_stock": true
      }
    ],
    "options": [
      {
        "name": "Strap",
        "values": [
          "Leather",
          "Mesh"
        ]
      },
      {
        "name": "Dial",
        "values": [
          "Black",
          "White"
        ]
      },
      {
        "name": "Case",
        "values": [
          "Silver",
          "Gold"
        ]
      }
    ],
    "warranty": "Simulated 1-Year Synthetic Warranty (Demo Only)",
    "return_policy": "Simulated 30-Day Sandbox Returns (Demo Only)",
    "risk_assessment": "Synthetic Demo Item: Fictional specifications for testing and benchmarking only."
  },
  {
    "id": "0198d161-bbe0-739e-8492-a046432b23bd",
    "slug": "aptdot-touchscreen-winter-gloves",
    "title": "Touchscreen Winter Gloves",
    "name": "Touchscreen Winter Gloves",
    "brand": "Aptdot Sample Goods",
    "category": "Apparel & Wearables",
    "description": "Fleece-lined knit gloves with conductive fingertips for phone use. Restocking soon; orders ship when stock arrives.",
    "price": 29,
    "original_price": null,
    "currency": "USD",
    "rating": 4.2,
    "reviews_count": 78,
    "stock": 0,
    "in_stock": false,
    "image_url": "data:image/svg+xml;utf8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%20600%20450%22%20width%3D%22600%22%20height%3D%22450%22%3E%0A%20%20%3Cdefs%3E%0A%20%20%20%20%3ClinearGradient%20id%3D%22bgGrad%22%20x1%3D%220%25%22%20y1%3D%220%25%22%20x2%3D%22100%25%22%20y2%3D%22100%25%22%3E%0A%20%20%20%20%20%20%3Cstop%20offset%3D%220%25%22%20stop-color%3D%22%230B0F19%22%2F%3E%0A%20%20%20%20%20%20%3Cstop%20offset%3D%22100%25%22%20stop-color%3D%22%23111827%22%2F%3E%0A%20%20%20%20%3C%2FlinearGradient%3E%0A%20%20%20%20%3ClinearGradient%20id%3D%22accentGrad%22%20x1%3D%220%25%22%20y1%3D%220%25%22%20x2%3D%22100%25%22%20y2%3D%220%25%22%3E%0A%20%20%20%20%20%20%3Cstop%20offset%3D%220%25%22%20stop-color%3D%22%238B5CF6%22%20stop-opacity%3D%220.9%22%2F%3E%0A%20%20%20%20%20%20%3Cstop%20offset%3D%22100%25%22%20stop-color%3D%22%236366F1%22%20stop-opacity%3D%220.9%22%2F%3E%0A%20%20%20%20%3C%2FlinearGradient%3E%0A%20%20%3C%2Fdefs%3E%0A%20%20%3Crect%20width%3D%22600%22%20height%3D%22450%22%20fill%3D%22url(%23bgGrad)%22%2F%3E%0A%20%20%3Crect%20x%3D%2220%22%20y%3D%2220%22%20width%3D%22560%22%20height%3D%22410%22%20rx%3D%2216%22%20fill%3D%22none%22%20stroke%3D%22url(%23accentGrad)%22%20stroke-width%3D%222%22%20stroke-dasharray%3D%226%2C6%22%20opacity%3D%220.6%22%2F%3E%0A%20%20%3Crect%20x%3D%22175%22%20y%3D%2250%22%20width%3D%22250%22%20height%3D%2234%22%20rx%3D%2217%22%20fill%3D%22%234C1D95%22%20stroke%3D%22%238B5CF6%22%20stroke-width%3D%221.5%22%2F%3E%0A%20%20%3Ctext%20x%3D%22300%22%20y%3D%2272%22%20font-family%3D%22system-ui%2C%20-apple-system%2C%20sans-serif%22%20font-size%3D%2212%22%20font-weight%3D%22700%22%20fill%3D%22%23C4B5FD%22%20text-anchor%3D%22middle%22%20letter-spacing%3D%221.5%22%3EAPTDOT%20SYNTHETIC%20DEMO%3C%2Ftext%3E%0A%20%20%3Crect%20x%3D%22235%22%20y%3D%22125%22%20width%3D%22130%22%20height%3D%22110%22%20rx%3D%2214%22%20fill%3D%22%231F2937%22%20stroke%3D%22%238B5CF6%22%20stroke-width%3D%222%22%2F%3E%0A%20%20%3Cpath%20d%3D%22M275%20180%20L300%20155%20L325%20180%20L300%20205%20Z%22%20fill%3D%22none%22%20stroke%3D%22%238B5CF6%22%20stroke-width%3D%223%22%20stroke-linejoin%3D%22round%22%2F%3E%0A%20%20%3Ccircle%20cx%3D%22300%22%20cy%3D%22180%22%20r%3D%227%22%20fill%3D%22%238B5CF6%22%2F%3E%0A%20%20%3Ctext%20x%3D%22300%22%20y%3D%22280%22%20font-family%3D%22system-ui%2C%20-apple-system%2C%20sans-serif%22%20font-size%3D%2218%22%20font-weight%3D%22600%22%20fill%3D%22%23F9FAFB%22%20text-anchor%3D%22middle%22%3ETouchscreen%20Winter%20Gloves%3C%2Ftext%3E%0A%20%20%3Ctext%20x%3D%22300%22%20y%3D%22310%22%20font-family%3D%22system-ui%2C%20-apple-system%2C%20sans-serif%22%20font-size%3D%2213%22%20font-weight%3D%22500%22%20fill%3D%22%239CA3AF%22%20text-anchor%3D%22middle%22%3EApparel%20%26amp%3B%20Wearables%20%E2%80%A2%20SKU%3A%20APP-GLOV-020%3C%2Ftext%3E%0A%20%20%3Crect%20x%3D%22140%22%20y%3D%22360%22%20width%3D%22320%22%20height%3D%2230%22%20rx%3D%228%22%20fill%3D%22%23111827%22%20stroke%3D%22%23374151%22%20stroke-width%3D%221%22%2F%3E%0A%20%20%3Ctext%20x%3D%22300%22%20y%3D%22380%22%20font-family%3D%22system-ui%2C%20-apple-system%2C%20sans-serif%22%20font-size%3D%2211%22%20font-weight%3D%22500%22%20fill%3D%22%236B7280%22%20text-anchor%3D%22middle%22%3ESynthetic%20Specification%20%E2%80%A2%20CC0%201.0%20Universal%3C%2Ftext%3E%0A%3C%2Fsvg%3E",
    "tag": "Backorder",
    "badge_type": "demo",
    "is_demo": true,
    "catalogue_source": "aptdot_synthetic",
    "lifecycle_status": "active",
    "verification_tier": "demo",
    "seller": {
      "name": "Aptdot Sample Goods",
      "verifiedStatus": "Synthetic Demo Catalogue",
      "authorizedPartner": false,
      "rating": 4.2,
      "location": "Synthetic Sandbox",
      "fulfillment": "Simulated Delivery (Non-Commercial)",
      "synthetic_notice": "This item belongs to the Aptdot CC0 Synthetic Benchmark Catalogue. It cannot be purchased for real fulfillment."
    },
    "evidence": {
      "source": "Aptdot Synthetic E-Commerce Product Catalog v1.0.0",
      "license": "CC0-1.0 Universal",
      "sku": "APP-GLOV-020",
      "dataset_source": "https://www.aptdot.com/datasets/ecommerce-product-catalog/",
      "is_synthetic": true
    },
    "specs": {
      "aptdot_id": "prod_020",
      "sku": "APP-GLOV-020",
      "product_type": "Apparel & Wearables > Gloves",
      "cost_price": 9,
      "low_stock_threshold": 10,
      "availability": "backorder",
      "availability_date": null,
      "dimensions": {
        "weight_g": 70,
        "length_cm": 24,
        "width_cm": 12,
        "height_cm": 2
      },
      "options": [
        {
          "name": "Size",
          "values": [
            "S/M",
            "L/XL"
          ]
        }
      ],
      "variants": [
        {
          "variant_id": "var_020_sm",
          "uuid": "0198d161-bbe0-7821-a5f0-c7545378f50a",
          "sku": "APP-GLOV-020-SM",
          "title": "S/M",
          "options": {
            "Size": "S/M"
          },
          "price": 29,
          "compare_at_price": null,
          "stock": 0
        },
        {
          "variant_id": "var_020_lxl",
          "uuid": "0198d161-bbe0-76fc-8dd0-b82caeebb161",
          "sku": "APP-GLOV-020-LXL",
          "title": "L/XL",
          "options": {
            "Size": "L/XL"
          },
          "price": 29,
          "compare_at_price": null,
          "stock": 0
        }
      ],
      "total_variants": 2
    },
    "variants": [
      {
        "variant_id": "var_020_sm",
        "id": "0198d161-bbe0-7821-a5f0-c7545378f50a",
        "uuid": "0198d161-bbe0-7821-a5f0-c7545378f50a",
        "sku": "APP-GLOV-020-SM",
        "title": "S/M",
        "options": {
          "Size": "S/M"
        },
        "price": 29,
        "compare_at_price": null,
        "stock": 0,
        "in_stock": false
      },
      {
        "variant_id": "var_020_lxl",
        "id": "0198d161-bbe0-76fc-8dd0-b82caeebb161",
        "uuid": "0198d161-bbe0-76fc-8dd0-b82caeebb161",
        "sku": "APP-GLOV-020-LXL",
        "title": "L/XL",
        "options": {
          "Size": "L/XL"
        },
        "price": 29,
        "compare_at_price": null,
        "stock": 0,
        "in_stock": false
      }
    ],
    "options": [
      {
        "name": "Size",
        "values": [
          "S/M",
          "L/XL"
        ]
      }
    ],
    "warranty": "Simulated 1-Year Synthetic Warranty (Demo Only)",
    "return_policy": "Simulated 30-Day Sandbox Returns (Demo Only)",
    "risk_assessment": "Synthetic Demo Item: Fictional specifications for testing and benchmarking only."
  },
  {
    "id": "01990f57-3ec0-7123-86ea-a2526277e4de",
    "slug": "aptdot-borosilicate-glass-pour-over-coffee-dripper",
    "title": "Borosilicate Glass Pour-Over Coffee Dripper",
    "name": "Borosilicate Glass Pour-Over Coffee Dripper",
    "brand": "Aptdot Sample Goods",
    "category": "Home & Kitchen",
    "description": "Heat-resistant borosilicate glass dripper with a spiral-ribbed cone for an even extraction.",
    "price": 34.5,
    "original_price": 42,
    "currency": "USD",
    "rating": 4.5,
    "reviews_count": 635,
    "stock": 85,
    "in_stock": true,
    "image_url": "data:image/svg+xml;utf8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%20600%20450%22%20width%3D%22600%22%20height%3D%22450%22%3E%0A%20%20%3Cdefs%3E%0A%20%20%20%20%3ClinearGradient%20id%3D%22bgGrad%22%20x1%3D%220%25%22%20y1%3D%220%25%22%20x2%3D%22100%25%22%20y2%3D%22100%25%22%3E%0A%20%20%20%20%20%20%3Cstop%20offset%3D%220%25%22%20stop-color%3D%22%230B0F19%22%2F%3E%0A%20%20%20%20%20%20%3Cstop%20offset%3D%22100%25%22%20stop-color%3D%22%23111827%22%2F%3E%0A%20%20%20%20%3C%2FlinearGradient%3E%0A%20%20%20%20%3ClinearGradient%20id%3D%22accentGrad%22%20x1%3D%220%25%22%20y1%3D%220%25%22%20x2%3D%22100%25%22%20y2%3D%220%25%22%3E%0A%20%20%20%20%20%20%3Cstop%20offset%3D%220%25%22%20stop-color%3D%22%23F59E0B%22%20stop-opacity%3D%220.9%22%2F%3E%0A%20%20%20%20%20%20%3Cstop%20offset%3D%22100%25%22%20stop-color%3D%22%236366F1%22%20stop-opacity%3D%220.9%22%2F%3E%0A%20%20%20%20%3C%2FlinearGradient%3E%0A%20%20%3C%2Fdefs%3E%0A%20%20%3Crect%20width%3D%22600%22%20height%3D%22450%22%20fill%3D%22url(%23bgGrad)%22%2F%3E%0A%20%20%3Crect%20x%3D%2220%22%20y%3D%2220%22%20width%3D%22560%22%20height%3D%22410%22%20rx%3D%2216%22%20fill%3D%22none%22%20stroke%3D%22url(%23accentGrad)%22%20stroke-width%3D%222%22%20stroke-dasharray%3D%226%2C6%22%20opacity%3D%220.6%22%2F%3E%0A%20%20%3Crect%20x%3D%22175%22%20y%3D%2250%22%20width%3D%22250%22%20height%3D%2234%22%20rx%3D%2217%22%20fill%3D%22%2378350F%22%20stroke%3D%22%23F59E0B%22%20stroke-width%3D%221.5%22%2F%3E%0A%20%20%3Ctext%20x%3D%22300%22%20y%3D%2272%22%20font-family%3D%22system-ui%2C%20-apple-system%2C%20sans-serif%22%20font-size%3D%2212%22%20font-weight%3D%22700%22%20fill%3D%22%23FDE68A%22%20text-anchor%3D%22middle%22%20letter-spacing%3D%221.5%22%3EAPTDOT%20SYNTHETIC%20DEMO%3C%2Ftext%3E%0A%20%20%3Crect%20x%3D%22235%22%20y%3D%22125%22%20width%3D%22130%22%20height%3D%22110%22%20rx%3D%2214%22%20fill%3D%22%231F2937%22%20stroke%3D%22%23F59E0B%22%20stroke-width%3D%222%22%2F%3E%0A%20%20%3Cpath%20d%3D%22M275%20180%20L300%20155%20L325%20180%20L300%20205%20Z%22%20fill%3D%22none%22%20stroke%3D%22%23F59E0B%22%20stroke-width%3D%223%22%20stroke-linejoin%3D%22round%22%2F%3E%0A%20%20%3Ccircle%20cx%3D%22300%22%20cy%3D%22180%22%20r%3D%227%22%20fill%3D%22%23F59E0B%22%2F%3E%0A%20%20%3Ctext%20x%3D%22300%22%20y%3D%22280%22%20font-family%3D%22system-ui%2C%20-apple-system%2C%20sans-serif%22%20font-size%3D%2218%22%20font-weight%3D%22600%22%20fill%3D%22%23F9FAFB%22%20text-anchor%3D%22middle%22%3EBorosilicate%20Glass%20Pour-Over%20Cof...%3C%2Ftext%3E%0A%20%20%3Ctext%20x%3D%22300%22%20y%3D%22310%22%20font-family%3D%22system-ui%2C%20-apple-system%2C%20sans-serif%22%20font-size%3D%2213%22%20font-weight%3D%22500%22%20fill%3D%22%239CA3AF%22%20text-anchor%3D%22middle%22%3EHome%20%26amp%3B%20Kitchen%20%E2%80%A2%20SKU%3A%20HOME-POUR-021%3C%2Ftext%3E%0A%20%20%3Crect%20x%3D%22140%22%20y%3D%22360%22%20width%3D%22320%22%20height%3D%2230%22%20rx%3D%228%22%20fill%3D%22%23111827%22%20stroke%3D%22%23374151%22%20stroke-width%3D%221%22%2F%3E%0A%20%20%3Ctext%20x%3D%22300%22%20y%3D%22380%22%20font-family%3D%22system-ui%2C%20-apple-system%2C%20sans-serif%22%20font-size%3D%2211%22%20font-weight%3D%22500%22%20fill%3D%22%236B7280%22%20text-anchor%3D%22middle%22%3ESynthetic%20Specification%20%E2%80%A2%20CC0%201.0%20Universal%3C%2Ftext%3E%0A%3C%2Fsvg%3E",
    "tag": "On Sale",
    "badge_type": "demo",
    "is_demo": true,
    "catalogue_source": "aptdot_synthetic",
    "lifecycle_status": "active",
    "verification_tier": "demo",
    "seller": {
      "name": "Aptdot Sample Goods",
      "verifiedStatus": "Synthetic Demo Catalogue",
      "authorizedPartner": false,
      "rating": 4.5,
      "location": "Synthetic Sandbox",
      "fulfillment": "Simulated Delivery (Non-Commercial)",
      "synthetic_notice": "This item belongs to the Aptdot CC0 Synthetic Benchmark Catalogue. It cannot be purchased for real fulfillment."
    },
    "evidence": {
      "source": "Aptdot Synthetic E-Commerce Product Catalog v1.0.0",
      "license": "CC0-1.0 Universal",
      "sku": "HOME-POUR-021",
      "dataset_source": "https://www.aptdot.com/datasets/ecommerce-product-catalog/",
      "is_synthetic": true
    },
    "specs": {
      "aptdot_id": "prod_021",
      "sku": "HOME-POUR-021",
      "product_type": "Home & Kitchen > Coffee & Tea",
      "cost_price": 11.2,
      "low_stock_threshold": 15,
      "availability": "in_stock",
      "availability_date": null,
      "dimensions": {
        "weight_g": 380,
        "length_cm": 14,
        "width_cm": 14,
        "height_cm": 16.5
      },
      "options": [
        {
          "name": "Capacity",
          "values": [
            "600 ml",
            "800 ml"
          ]
        }
      ],
      "variants": [
        {
          "variant_id": "var_021_600ml",
          "uuid": "01990f57-3ec0-7157-be9a-6b35db170599",
          "sku": "HOME-POUR-021-600ML",
          "title": "600 ml",
          "options": {
            "Capacity": "600 ml"
          },
          "price": 34.5,
          "compare_at_price": 42,
          "stock": 29
        },
        {
          "variant_id": "var_021_800ml",
          "uuid": "01990f57-3ec0-7520-a1ef-90546531f3af",
          "sku": "HOME-POUR-021-800ML",
          "title": "800 ml",
          "options": {
            "Capacity": "800 ml"
          },
          "price": 38.5,
          "compare_at_price": 46,
          "stock": 56
        }
      ],
      "total_variants": 2
    },
    "variants": [
      {
        "variant_id": "var_021_600ml",
        "id": "01990f57-3ec0-7157-be9a-6b35db170599",
        "uuid": "01990f57-3ec0-7157-be9a-6b35db170599",
        "sku": "HOME-POUR-021-600ML",
        "title": "600 ml",
        "options": {
          "Capacity": "600 ml"
        },
        "price": 34.5,
        "compare_at_price": 42,
        "stock": 29,
        "in_stock": true
      },
      {
        "variant_id": "var_021_800ml",
        "id": "01990f57-3ec0-7520-a1ef-90546531f3af",
        "uuid": "01990f57-3ec0-7520-a1ef-90546531f3af",
        "sku": "HOME-POUR-021-800ML",
        "title": "800 ml",
        "options": {
          "Capacity": "800 ml"
        },
        "price": 38.5,
        "compare_at_price": 46,
        "stock": 56,
        "in_stock": true
      }
    ],
    "options": [
      {
        "name": "Capacity",
        "values": [
          "600 ml",
          "800 ml"
        ]
      }
    ],
    "warranty": "Simulated 1-Year Synthetic Warranty (Demo Only)",
    "return_policy": "Simulated 30-Day Sandbox Returns (Demo Only)",
    "risk_assessment": "Synthetic Demo Item: Fictional specifications for testing and benchmarking only."
  },
  {
    "id": "01994cec-a040-7b8c-adf1-b57ffd51a9ae",
    "slug": "aptdot-12-inch-pre-seasoned-cast-iron-skillet",
    "title": "12\" Pre-Seasoned Cast Iron Skillet",
    "name": "12\" Pre-Seasoned Cast Iron Skillet",
    "brand": "Aptdot Sample Goods",
    "category": "Home & Kitchen",
    "description": "30 cm cast iron skillet seasoned with vegetable oil, ready for stovetop, oven and campfire.",
    "price": 45,
    "original_price": null,
    "currency": "USD",
    "rating": 4.1,
    "reviews_count": 273,
    "stock": 35,
    "in_stock": true,
    "image_url": "data:image/svg+xml;utf8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%20600%20450%22%20width%3D%22600%22%20height%3D%22450%22%3E%0A%20%20%3Cdefs%3E%0A%20%20%20%20%3ClinearGradient%20id%3D%22bgGrad%22%20x1%3D%220%25%22%20y1%3D%220%25%22%20x2%3D%22100%25%22%20y2%3D%22100%25%22%3E%0A%20%20%20%20%20%20%3Cstop%20offset%3D%220%25%22%20stop-color%3D%22%230B0F19%22%2F%3E%0A%20%20%20%20%20%20%3Cstop%20offset%3D%22100%25%22%20stop-color%3D%22%23111827%22%2F%3E%0A%20%20%20%20%3C%2FlinearGradient%3E%0A%20%20%20%20%3ClinearGradient%20id%3D%22accentGrad%22%20x1%3D%220%25%22%20y1%3D%220%25%22%20x2%3D%22100%25%22%20y2%3D%220%25%22%3E%0A%20%20%20%20%20%20%3Cstop%20offset%3D%220%25%22%20stop-color%3D%22%23F59E0B%22%20stop-opacity%3D%220.9%22%2F%3E%0A%20%20%20%20%20%20%3Cstop%20offset%3D%22100%25%22%20stop-color%3D%22%236366F1%22%20stop-opacity%3D%220.9%22%2F%3E%0A%20%20%20%20%3C%2FlinearGradient%3E%0A%20%20%3C%2Fdefs%3E%0A%20%20%3Crect%20width%3D%22600%22%20height%3D%22450%22%20fill%3D%22url(%23bgGrad)%22%2F%3E%0A%20%20%3Crect%20x%3D%2220%22%20y%3D%2220%22%20width%3D%22560%22%20height%3D%22410%22%20rx%3D%2216%22%20fill%3D%22none%22%20stroke%3D%22url(%23accentGrad)%22%20stroke-width%3D%222%22%20stroke-dasharray%3D%226%2C6%22%20opacity%3D%220.6%22%2F%3E%0A%20%20%3Crect%20x%3D%22175%22%20y%3D%2250%22%20width%3D%22250%22%20height%3D%2234%22%20rx%3D%2217%22%20fill%3D%22%2378350F%22%20stroke%3D%22%23F59E0B%22%20stroke-width%3D%221.5%22%2F%3E%0A%20%20%3Ctext%20x%3D%22300%22%20y%3D%2272%22%20font-family%3D%22system-ui%2C%20-apple-system%2C%20sans-serif%22%20font-size%3D%2212%22%20font-weight%3D%22700%22%20fill%3D%22%23FDE68A%22%20text-anchor%3D%22middle%22%20letter-spacing%3D%221.5%22%3EAPTDOT%20SYNTHETIC%20DEMO%3C%2Ftext%3E%0A%20%20%3Crect%20x%3D%22235%22%20y%3D%22125%22%20width%3D%22130%22%20height%3D%22110%22%20rx%3D%2214%22%20fill%3D%22%231F2937%22%20stroke%3D%22%23F59E0B%22%20stroke-width%3D%222%22%2F%3E%0A%20%20%3Cpath%20d%3D%22M275%20180%20L300%20155%20L325%20180%20L300%20205%20Z%22%20fill%3D%22none%22%20stroke%3D%22%23F59E0B%22%20stroke-width%3D%223%22%20stroke-linejoin%3D%22round%22%2F%3E%0A%20%20%3Ccircle%20cx%3D%22300%22%20cy%3D%22180%22%20r%3D%227%22%20fill%3D%22%23F59E0B%22%2F%3E%0A%20%20%3Ctext%20x%3D%22300%22%20y%3D%22280%22%20font-family%3D%22system-ui%2C%20-apple-system%2C%20sans-serif%22%20font-size%3D%2218%22%20font-weight%3D%22600%22%20fill%3D%22%23F9FAFB%22%20text-anchor%3D%22middle%22%3E12%26quot%3B%20Pre-Seasoned%20Cast%20Iron%20Skillet%3C%2Ftext%3E%0A%20%20%3Ctext%20x%3D%22300%22%20y%3D%22310%22%20font-family%3D%22system-ui%2C%20-apple-system%2C%20sans-serif%22%20font-size%3D%2213%22%20font-weight%3D%22500%22%20fill%3D%22%239CA3AF%22%20text-anchor%3D%22middle%22%3EHome%20%26amp%3B%20Kitchen%20%E2%80%A2%20SKU%3A%20HOME-SKIL-022%3C%2Ftext%3E%0A%20%20%3Crect%20x%3D%22140%22%20y%3D%22360%22%20width%3D%22320%22%20height%3D%2230%22%20rx%3D%228%22%20fill%3D%22%23111827%22%20stroke%3D%22%23374151%22%20stroke-width%3D%221%22%2F%3E%0A%20%20%3Ctext%20x%3D%22300%22%20y%3D%22380%22%20font-family%3D%22system-ui%2C%20-apple-system%2C%20sans-serif%22%20font-size%3D%2211%22%20font-weight%3D%22500%22%20fill%3D%22%236B7280%22%20text-anchor%3D%22middle%22%3ESynthetic%20Specification%20%E2%80%A2%20CC0%201.0%20Universal%3C%2Ftext%3E%0A%3C%2Fsvg%3E",
    "tag": "Synthetic Demo",
    "badge_type": "demo",
    "is_demo": true,
    "catalogue_source": "aptdot_synthetic",
    "lifecycle_status": "active",
    "verification_tier": "demo",
    "seller": {
      "name": "Aptdot Sample Goods",
      "verifiedStatus": "Synthetic Demo Catalogue",
      "authorizedPartner": false,
      "rating": 4.1,
      "location": "Synthetic Sandbox",
      "fulfillment": "Simulated Delivery (Non-Commercial)",
      "synthetic_notice": "This item belongs to the Aptdot CC0 Synthetic Benchmark Catalogue. It cannot be purchased for real fulfillment."
    },
    "evidence": {
      "source": "Aptdot Synthetic E-Commerce Product Catalog v1.0.0",
      "license": "CC0-1.0 Universal",
      "sku": "HOME-SKIL-022",
      "dataset_source": "https://www.aptdot.com/datasets/ecommerce-product-catalog/",
      "is_synthetic": true
    },
    "specs": {
      "aptdot_id": "prod_022",
      "sku": "HOME-SKIL-022",
      "product_type": "Home & Kitchen > Cookware",
      "cost_price": 16,
      "low_stock_threshold": 20,
      "availability": "in_stock",
      "availability_date": null,
      "dimensions": {
        "weight_g": 3400,
        "length_cm": 50,
        "width_cm": 32,
        "height_cm": 6
      },
      "options": [],
      "variants": [
        {
          "variant_id": "var_022_default",
          "uuid": "01994cec-a040-732f-9d3d-ede946de7b04",
          "sku": "HOME-SKIL-022",
          "title": "Default",
          "options": {},
          "price": 45,
          "compare_at_price": null,
          "stock": 35
        }
      ],
      "total_variants": 1
    },
    "variants": [
      {
        "variant_id": "var_022_default",
        "id": "01994cec-a040-732f-9d3d-ede946de7b04",
        "uuid": "01994cec-a040-732f-9d3d-ede946de7b04",
        "sku": "HOME-SKIL-022",
        "title": "Default",
        "options": {},
        "price": 45,
        "compare_at_price": null,
        "stock": 35,
        "in_stock": true
      }
    ],
    "options": [],
    "warranty": "Simulated 1-Year Synthetic Warranty (Demo Only)",
    "return_policy": "Simulated 30-Day Sandbox Returns (Demo Only)",
    "risk_assessment": "Synthetic Demo Item: Fictional specifications for testing and benchmarking only."
  },
  {
    "id": "01998b42-4480-76b6-a3eb-b97ffa91c764",
    "slug": "aptdot-8-inch-chefs-knife-high-carbon-stainless-steel",
    "title": "8\" Chef's Knife, High-Carbon Stainless Steel",
    "name": "8\" Chef's Knife, High-Carbon Stainless Steel",
    "brand": "Aptdot Sample Goods",
    "category": "Home & Kitchen",
    "description": "20 cm chef's knife forged from high-carbon stainless steel with a full tang and riveted handle.",
    "price": 79,
    "original_price": 99,
    "currency": "USD",
    "rating": 3.9,
    "reviews_count": 816,
    "stock": 97,
    "in_stock": true,
    "image_url": "data:image/svg+xml;utf8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%20600%20450%22%20width%3D%22600%22%20height%3D%22450%22%3E%0A%20%20%3Cdefs%3E%0A%20%20%20%20%3ClinearGradient%20id%3D%22bgGrad%22%20x1%3D%220%25%22%20y1%3D%220%25%22%20x2%3D%22100%25%22%20y2%3D%22100%25%22%3E%0A%20%20%20%20%20%20%3Cstop%20offset%3D%220%25%22%20stop-color%3D%22%230B0F19%22%2F%3E%0A%20%20%20%20%20%20%3Cstop%20offset%3D%22100%25%22%20stop-color%3D%22%23111827%22%2F%3E%0A%20%20%20%20%3C%2FlinearGradient%3E%0A%20%20%20%20%3ClinearGradient%20id%3D%22accentGrad%22%20x1%3D%220%25%22%20y1%3D%220%25%22%20x2%3D%22100%25%22%20y2%3D%220%25%22%3E%0A%20%20%20%20%20%20%3Cstop%20offset%3D%220%25%22%20stop-color%3D%22%23F59E0B%22%20stop-opacity%3D%220.9%22%2F%3E%0A%20%20%20%20%20%20%3Cstop%20offset%3D%22100%25%22%20stop-color%3D%22%236366F1%22%20stop-opacity%3D%220.9%22%2F%3E%0A%20%20%20%20%3C%2FlinearGradient%3E%0A%20%20%3C%2Fdefs%3E%0A%20%20%3Crect%20width%3D%22600%22%20height%3D%22450%22%20fill%3D%22url(%23bgGrad)%22%2F%3E%0A%20%20%3Crect%20x%3D%2220%22%20y%3D%2220%22%20width%3D%22560%22%20height%3D%22410%22%20rx%3D%2216%22%20fill%3D%22none%22%20stroke%3D%22url(%23accentGrad)%22%20stroke-width%3D%222%22%20stroke-dasharray%3D%226%2C6%22%20opacity%3D%220.6%22%2F%3E%0A%20%20%3Crect%20x%3D%22175%22%20y%3D%2250%22%20width%3D%22250%22%20height%3D%2234%22%20rx%3D%2217%22%20fill%3D%22%2378350F%22%20stroke%3D%22%23F59E0B%22%20stroke-width%3D%221.5%22%2F%3E%0A%20%20%3Ctext%20x%3D%22300%22%20y%3D%2272%22%20font-family%3D%22system-ui%2C%20-apple-system%2C%20sans-serif%22%20font-size%3D%2212%22%20font-weight%3D%22700%22%20fill%3D%22%23FDE68A%22%20text-anchor%3D%22middle%22%20letter-spacing%3D%221.5%22%3EAPTDOT%20SYNTHETIC%20DEMO%3C%2Ftext%3E%0A%20%20%3Crect%20x%3D%22235%22%20y%3D%22125%22%20width%3D%22130%22%20height%3D%22110%22%20rx%3D%2214%22%20fill%3D%22%231F2937%22%20stroke%3D%22%23F59E0B%22%20stroke-width%3D%222%22%2F%3E%0A%20%20%3Cpath%20d%3D%22M275%20180%20L300%20155%20L325%20180%20L300%20205%20Z%22%20fill%3D%22none%22%20stroke%3D%22%23F59E0B%22%20stroke-width%3D%223%22%20stroke-linejoin%3D%22round%22%2F%3E%0A%20%20%3Ccircle%20cx%3D%22300%22%20cy%3D%22180%22%20r%3D%227%22%20fill%3D%22%23F59E0B%22%2F%3E%0A%20%20%3Ctext%20x%3D%22300%22%20y%3D%22280%22%20font-family%3D%22system-ui%2C%20-apple-system%2C%20sans-serif%22%20font-size%3D%2218%22%20font-weight%3D%22600%22%20fill%3D%22%23F9FAFB%22%20text-anchor%3D%22middle%22%3E8%26quot%3B%20Chef%26apos%3Bs%20Knife%2C%20High-Carbon%20Sta...%3C%2Ftext%3E%0A%20%20%3Ctext%20x%3D%22300%22%20y%3D%22310%22%20font-family%3D%22system-ui%2C%20-apple-system%2C%20sans-serif%22%20font-size%3D%2213%22%20font-weight%3D%22500%22%20fill%3D%22%239CA3AF%22%20text-anchor%3D%22middle%22%3EHome%20%26amp%3B%20Kitchen%20%E2%80%A2%20SKU%3A%20HOME-KNIF-023%3C%2Ftext%3E%0A%20%20%3Crect%20x%3D%22140%22%20y%3D%22360%22%20width%3D%22320%22%20height%3D%2230%22%20rx%3D%228%22%20fill%3D%22%23111827%22%20stroke%3D%22%23374151%22%20stroke-width%3D%221%22%2F%3E%0A%20%20%3Ctext%20x%3D%22300%22%20y%3D%22380%22%20font-family%3D%22system-ui%2C%20-apple-system%2C%20sans-serif%22%20font-size%3D%2211%22%20font-weight%3D%22500%22%20fill%3D%22%236B7280%22%20text-anchor%3D%22middle%22%3ESynthetic%20Specification%20%E2%80%A2%20CC0%201.0%20Universal%3C%2Ftext%3E%0A%3C%2Fsvg%3E",
    "tag": "On Sale",
    "badge_type": "demo",
    "is_demo": true,
    "catalogue_source": "aptdot_synthetic",
    "lifecycle_status": "active",
    "verification_tier": "demo",
    "seller": {
      "name": "Aptdot Sample Goods",
      "verifiedStatus": "Synthetic Demo Catalogue",
      "authorizedPartner": false,
      "rating": 3.9,
      "location": "Synthetic Sandbox",
      "fulfillment": "Simulated Delivery (Non-Commercial)",
      "synthetic_notice": "This item belongs to the Aptdot CC0 Synthetic Benchmark Catalogue. It cannot be purchased for real fulfillment."
    },
    "evidence": {
      "source": "Aptdot Synthetic E-Commerce Product Catalog v1.0.0",
      "license": "CC0-1.0 Universal",
      "sku": "HOME-KNIF-023",
      "dataset_source": "https://www.aptdot.com/datasets/ecommerce-product-catalog/",
      "is_synthetic": true
    },
    "specs": {
      "aptdot_id": "prod_023",
      "sku": "HOME-KNIF-023",
      "product_type": "Home & Kitchen > Cutlery",
      "cost_price": 24,
      "low_stock_threshold": 25,
      "availability": "in_stock",
      "availability_date": null,
      "dimensions": {
        "weight_g": 260,
        "length_cm": 36,
        "width_cm": 8,
        "height_cm": 3
      },
      "options": [],
      "variants": [
        {
          "variant_id": "var_023_default",
          "uuid": "01998b42-4480-7820-a70e-9718e1d9be8a",
          "sku": "HOME-KNIF-023",
          "title": "Default",
          "options": {},
          "price": 79,
          "compare_at_price": 99,
          "stock": 97
        }
      ],
      "total_variants": 1
    },
    "variants": [
      {
        "variant_id": "var_023_default",
        "id": "01998b42-4480-7820-a70e-9718e1d9be8a",
        "uuid": "01998b42-4480-7820-a70e-9718e1d9be8a",
        "sku": "HOME-KNIF-023",
        "title": "Default",
        "options": {},
        "price": 79,
        "compare_at_price": 99,
        "stock": 97,
        "in_stock": true
      }
    ],
    "options": [],
    "warranty": "Simulated 1-Year Synthetic Warranty (Demo Only)",
    "return_policy": "Simulated 30-Day Sandbox Returns (Demo Only)",
    "risk_assessment": "Synthetic Demo Item: Fictional specifications for testing and benchmarking only."
  },
  {
    "id": "0199c9ea-4e80-73b8-b7c9-4e8ef12e11f0",
    "slug": "aptdot-manual-burr-coffee-grinder",
    "title": "Manual Burr Coffee Grinder",
    "name": "Manual Burr Coffee Grinder",
    "brand": "Aptdot Sample Goods",
    "category": "Home & Kitchen",
    "description": "Stainless steel conical burr hand grinder with 40 click grind settings from espresso to cold brew.",
    "price": 64,
    "original_price": null,
    "currency": "USD",
    "rating": 4.7,
    "reviews_count": 384,
    "stock": 48,
    "in_stock": true,
    "image_url": "data:image/svg+xml;utf8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%20600%20450%22%20width%3D%22600%22%20height%3D%22450%22%3E%0A%20%20%3Cdefs%3E%0A%20%20%20%20%3ClinearGradient%20id%3D%22bgGrad%22%20x1%3D%220%25%22%20y1%3D%220%25%22%20x2%3D%22100%25%22%20y2%3D%22100%25%22%3E%0A%20%20%20%20%20%20%3Cstop%20offset%3D%220%25%22%20stop-color%3D%22%230B0F19%22%2F%3E%0A%20%20%20%20%20%20%3Cstop%20offset%3D%22100%25%22%20stop-color%3D%22%23111827%22%2F%3E%0A%20%20%20%20%3C%2FlinearGradient%3E%0A%20%20%20%20%3ClinearGradient%20id%3D%22accentGrad%22%20x1%3D%220%25%22%20y1%3D%220%25%22%20x2%3D%22100%25%22%20y2%3D%220%25%22%3E%0A%20%20%20%20%20%20%3Cstop%20offset%3D%220%25%22%20stop-color%3D%22%23F59E0B%22%20stop-opacity%3D%220.9%22%2F%3E%0A%20%20%20%20%20%20%3Cstop%20offset%3D%22100%25%22%20stop-color%3D%22%236366F1%22%20stop-opacity%3D%220.9%22%2F%3E%0A%20%20%20%20%3C%2FlinearGradient%3E%0A%20%20%3C%2Fdefs%3E%0A%20%20%3Crect%20width%3D%22600%22%20height%3D%22450%22%20fill%3D%22url(%23bgGrad)%22%2F%3E%0A%20%20%3Crect%20x%3D%2220%22%20y%3D%2220%22%20width%3D%22560%22%20height%3D%22410%22%20rx%3D%2216%22%20fill%3D%22none%22%20stroke%3D%22url(%23accentGrad)%22%20stroke-width%3D%222%22%20stroke-dasharray%3D%226%2C6%22%20opacity%3D%220.6%22%2F%3E%0A%20%20%3Crect%20x%3D%22175%22%20y%3D%2250%22%20width%3D%22250%22%20height%3D%2234%22%20rx%3D%2217%22%20fill%3D%22%2378350F%22%20stroke%3D%22%23F59E0B%22%20stroke-width%3D%221.5%22%2F%3E%0A%20%20%3Ctext%20x%3D%22300%22%20y%3D%2272%22%20font-family%3D%22system-ui%2C%20-apple-system%2C%20sans-serif%22%20font-size%3D%2212%22%20font-weight%3D%22700%22%20fill%3D%22%23FDE68A%22%20text-anchor%3D%22middle%22%20letter-spacing%3D%221.5%22%3EAPTDOT%20SYNTHETIC%20DEMO%3C%2Ftext%3E%0A%20%20%3Crect%20x%3D%22235%22%20y%3D%22125%22%20width%3D%22130%22%20height%3D%22110%22%20rx%3D%2214%22%20fill%3D%22%231F2937%22%20stroke%3D%22%23F59E0B%22%20stroke-width%3D%222%22%2F%3E%0A%20%20%3Cpath%20d%3D%22M275%20180%20L300%20155%20L325%20180%20L300%20205%20Z%22%20fill%3D%22none%22%20stroke%3D%22%23F59E0B%22%20stroke-width%3D%223%22%20stroke-linejoin%3D%22round%22%2F%3E%0A%20%20%3Ccircle%20cx%3D%22300%22%20cy%3D%22180%22%20r%3D%227%22%20fill%3D%22%23F59E0B%22%2F%3E%0A%20%20%3Ctext%20x%3D%22300%22%20y%3D%22280%22%20font-family%3D%22system-ui%2C%20-apple-system%2C%20sans-serif%22%20font-size%3D%2218%22%20font-weight%3D%22600%22%20fill%3D%22%23F9FAFB%22%20text-anchor%3D%22middle%22%3EManual%20Burr%20Coffee%20Grinder%3C%2Ftext%3E%0A%20%20%3Ctext%20x%3D%22300%22%20y%3D%22310%22%20font-family%3D%22system-ui%2C%20-apple-system%2C%20sans-serif%22%20font-size%3D%2213%22%20font-weight%3D%22500%22%20fill%3D%22%239CA3AF%22%20text-anchor%3D%22middle%22%3EHome%20%26amp%3B%20Kitchen%20%E2%80%A2%20SKU%3A%20HOME-GRND-024%3C%2Ftext%3E%0A%20%20%3Crect%20x%3D%22140%22%20y%3D%22360%22%20width%3D%22320%22%20height%3D%2230%22%20rx%3D%228%22%20fill%3D%22%23111827%22%20stroke%3D%22%23374151%22%20stroke-width%3D%221%22%2F%3E%0A%20%20%3Ctext%20x%3D%22300%22%20y%3D%22380%22%20font-family%3D%22system-ui%2C%20-apple-system%2C%20sans-serif%22%20font-size%3D%2211%22%20font-weight%3D%22500%22%20fill%3D%22%236B7280%22%20text-anchor%3D%22middle%22%3ESynthetic%20Specification%20%E2%80%A2%20CC0%201.0%20Universal%3C%2Ftext%3E%0A%3C%2Fsvg%3E",
    "tag": "Synthetic Demo",
    "badge_type": "demo",
    "is_demo": true,
    "catalogue_source": "aptdot_synthetic",
    "lifecycle_status": "active",
    "verification_tier": "demo",
    "seller": {
      "name": "Aptdot Sample Goods",
      "verifiedStatus": "Synthetic Demo Catalogue",
      "authorizedPartner": false,
      "rating": 4.7,
      "location": "Synthetic Sandbox",
      "fulfillment": "Simulated Delivery (Non-Commercial)",
      "synthetic_notice": "This item belongs to the Aptdot CC0 Synthetic Benchmark Catalogue. It cannot be purchased for real fulfillment."
    },
    "evidence": {
      "source": "Aptdot Synthetic E-Commerce Product Catalog v1.0.0",
      "license": "CC0-1.0 Universal",
      "sku": "HOME-GRND-024",
      "dataset_source": "https://www.aptdot.com/datasets/ecommerce-product-catalog/",
      "is_synthetic": true
    },
    "specs": {
      "aptdot_id": "prod_024",
      "sku": "HOME-GRND-024",
      "product_type": "Home & Kitchen > Coffee & Tea",
      "cost_price": 22,
      "low_stock_threshold": 8,
      "availability": "in_stock",
      "availability_date": null,
      "dimensions": {
        "weight_g": 490,
        "length_cm": 20,
        "width_cm": 8,
        "height_cm": 8
      },
      "options": [
        {
          "name": "Color",
          "values": [
            "Steel",
            "Black"
          ]
        }
      ],
      "variants": [
        {
          "variant_id": "var_024_ste",
          "uuid": "0199c9ea-4e80-784d-9ed3-8472ed5e47b7",
          "sku": "HOME-GRND-024-STE",
          "title": "Steel",
          "options": {
            "Color": "Steel"
          },
          "price": 64,
          "compare_at_price": null,
          "stock": 32
        },
        {
          "variant_id": "var_024_bla",
          "uuid": "0199c9ea-4e80-79a4-8b16-9dc3a603f910",
          "sku": "HOME-GRND-024-BLA",
          "title": "Black",
          "options": {
            "Color": "Black"
          },
          "price": 64,
          "compare_at_price": null,
          "stock": 16
        }
      ],
      "total_variants": 2
    },
    "variants": [
      {
        "variant_id": "var_024_ste",
        "id": "0199c9ea-4e80-784d-9ed3-8472ed5e47b7",
        "uuid": "0199c9ea-4e80-784d-9ed3-8472ed5e47b7",
        "sku": "HOME-GRND-024-STE",
        "title": "Steel",
        "options": {
          "Color": "Steel"
        },
        "price": 64,
        "compare_at_price": null,
        "stock": 32,
        "in_stock": true
      },
      {
        "variant_id": "var_024_bla",
        "id": "0199c9ea-4e80-79a4-8b16-9dc3a603f910",
        "uuid": "0199c9ea-4e80-79a4-8b16-9dc3a603f910",
        "sku": "HOME-GRND-024-BLA",
        "title": "Black",
        "options": {
          "Color": "Black"
        },
        "price": 64,
        "compare_at_price": null,
        "stock": 16,
        "in_stock": true
      }
    ],
    "options": [
      {
        "name": "Color",
        "values": [
          "Steel",
          "Black"
        ]
      }
    ],
    "warranty": "Simulated 1-Year Synthetic Warranty (Demo Only)",
    "return_policy": "Simulated 30-Day Sandbox Returns (Demo Only)",
    "risk_assessment": "Synthetic Demo Item: Fictional specifications for testing and benchmarking only."
  },
  {
    "id": "019a065f-4be0-7155-a357-d4d12df8ab83",
    "slug": "aptdot-creme-brulee-ramekins-set-of-4",
    "title": "Crème Brûlée Ramekins (Set of 4)",
    "name": "Crème Brûlée Ramekins (Set of 4)",
    "brand": "Aptdot Sample Goods",
    "category": "Home & Kitchen",
    "description": "Oven-safe porcelain ramekins, 150 ml each, for crème brûlée, soufflés and dips.",
    "price": 28,
    "original_price": null,
    "currency": "USD",
    "rating": 4.5,
    "reviews_count": 115,
    "stock": 83,
    "in_stock": true,
    "image_url": "data:image/svg+xml;utf8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%20600%20450%22%20width%3D%22600%22%20height%3D%22450%22%3E%0A%20%20%3Cdefs%3E%0A%20%20%20%20%3ClinearGradient%20id%3D%22bgGrad%22%20x1%3D%220%25%22%20y1%3D%220%25%22%20x2%3D%22100%25%22%20y2%3D%22100%25%22%3E%0A%20%20%20%20%20%20%3Cstop%20offset%3D%220%25%22%20stop-color%3D%22%230B0F19%22%2F%3E%0A%20%20%20%20%20%20%3Cstop%20offset%3D%22100%25%22%20stop-color%3D%22%23111827%22%2F%3E%0A%20%20%20%20%3C%2FlinearGradient%3E%0A%20%20%20%20%3ClinearGradient%20id%3D%22accentGrad%22%20x1%3D%220%25%22%20y1%3D%220%25%22%20x2%3D%22100%25%22%20y2%3D%220%25%22%3E%0A%20%20%20%20%20%20%3Cstop%20offset%3D%220%25%22%20stop-color%3D%22%23F59E0B%22%20stop-opacity%3D%220.9%22%2F%3E%0A%20%20%20%20%20%20%3Cstop%20offset%3D%22100%25%22%20stop-color%3D%22%236366F1%22%20stop-opacity%3D%220.9%22%2F%3E%0A%20%20%20%20%3C%2FlinearGradient%3E%0A%20%20%3C%2Fdefs%3E%0A%20%20%3Crect%20width%3D%22600%22%20height%3D%22450%22%20fill%3D%22url(%23bgGrad)%22%2F%3E%0A%20%20%3Crect%20x%3D%2220%22%20y%3D%2220%22%20width%3D%22560%22%20height%3D%22410%22%20rx%3D%2216%22%20fill%3D%22none%22%20stroke%3D%22url(%23accentGrad)%22%20stroke-width%3D%222%22%20stroke-dasharray%3D%226%2C6%22%20opacity%3D%220.6%22%2F%3E%0A%20%20%3Crect%20x%3D%22175%22%20y%3D%2250%22%20width%3D%22250%22%20height%3D%2234%22%20rx%3D%2217%22%20fill%3D%22%2378350F%22%20stroke%3D%22%23F59E0B%22%20stroke-width%3D%221.5%22%2F%3E%0A%20%20%3Ctext%20x%3D%22300%22%20y%3D%2272%22%20font-family%3D%22system-ui%2C%20-apple-system%2C%20sans-serif%22%20font-size%3D%2212%22%20font-weight%3D%22700%22%20fill%3D%22%23FDE68A%22%20text-anchor%3D%22middle%22%20letter-spacing%3D%221.5%22%3EAPTDOT%20SYNTHETIC%20DEMO%3C%2Ftext%3E%0A%20%20%3Crect%20x%3D%22235%22%20y%3D%22125%22%20width%3D%22130%22%20height%3D%22110%22%20rx%3D%2214%22%20fill%3D%22%231F2937%22%20stroke%3D%22%23F59E0B%22%20stroke-width%3D%222%22%2F%3E%0A%20%20%3Cpath%20d%3D%22M275%20180%20L300%20155%20L325%20180%20L300%20205%20Z%22%20fill%3D%22none%22%20stroke%3D%22%23F59E0B%22%20stroke-width%3D%223%22%20stroke-linejoin%3D%22round%22%2F%3E%0A%20%20%3Ccircle%20cx%3D%22300%22%20cy%3D%22180%22%20r%3D%227%22%20fill%3D%22%23F59E0B%22%2F%3E%0A%20%20%3Ctext%20x%3D%22300%22%20y%3D%22280%22%20font-family%3D%22system-ui%2C%20-apple-system%2C%20sans-serif%22%20font-size%3D%2218%22%20font-weight%3D%22600%22%20fill%3D%22%23F9FAFB%22%20text-anchor%3D%22middle%22%3ECr%C3%A8me%20Br%C3%BBl%C3%A9e%20Ramekins%20(Set%20of%204)%3C%2Ftext%3E%0A%20%20%3Ctext%20x%3D%22300%22%20y%3D%22310%22%20font-family%3D%22system-ui%2C%20-apple-system%2C%20sans-serif%22%20font-size%3D%2213%22%20font-weight%3D%22500%22%20fill%3D%22%239CA3AF%22%20text-anchor%3D%22middle%22%3EHome%20%26amp%3B%20Kitchen%20%E2%80%A2%20SKU%3A%20HOME-RAMK-025%3C%2Ftext%3E%0A%20%20%3Crect%20x%3D%22140%22%20y%3D%22360%22%20width%3D%22320%22%20height%3D%2230%22%20rx%3D%228%22%20fill%3D%22%23111827%22%20stroke%3D%22%23374151%22%20stroke-width%3D%221%22%2F%3E%0A%20%20%3Ctext%20x%3D%22300%22%20y%3D%22380%22%20font-family%3D%22system-ui%2C%20-apple-system%2C%20sans-serif%22%20font-size%3D%2211%22%20font-weight%3D%22500%22%20fill%3D%22%236B7280%22%20text-anchor%3D%22middle%22%3ESynthetic%20Specification%20%E2%80%A2%20CC0%201.0%20Universal%3C%2Ftext%3E%0A%3C%2Fsvg%3E",
    "tag": "Synthetic Demo",
    "badge_type": "demo",
    "is_demo": true,
    "catalogue_source": "aptdot_synthetic",
    "lifecycle_status": "active",
    "verification_tier": "demo",
    "seller": {
      "name": "Aptdot Sample Goods",
      "verifiedStatus": "Synthetic Demo Catalogue",
      "authorizedPartner": false,
      "rating": 4.5,
      "location": "Synthetic Sandbox",
      "fulfillment": "Simulated Delivery (Non-Commercial)",
      "synthetic_notice": "This item belongs to the Aptdot CC0 Synthetic Benchmark Catalogue. It cannot be purchased for real fulfillment."
    },
    "evidence": {
      "source": "Aptdot Synthetic E-Commerce Product Catalog v1.0.0",
      "license": "CC0-1.0 Universal",
      "sku": "HOME-RAMK-025",
      "dataset_source": "https://www.aptdot.com/datasets/ecommerce-product-catalog/",
      "is_synthetic": true
    },
    "specs": {
      "aptdot_id": "prod_025",
      "sku": "HOME-RAMK-025",
      "product_type": "Home & Kitchen > Bakeware",
      "cost_price": 8,
      "low_stock_threshold": 15,
      "availability": "in_stock",
      "availability_date": null,
      "dimensions": {
        "weight_g": 1100,
        "length_cm": 22,
        "width_cm": 22,
        "height_cm": 10
      },
      "options": [
        {
          "name": "Color",
          "values": [
            "White",
            "Sage"
          ]
        }
      ],
      "variants": [
        {
          "variant_id": "var_025_whi",
          "uuid": "019a065f-4be0-7661-9371-7d81ee3f54ec",
          "sku": "HOME-RAMK-025-WHI",
          "title": "White",
          "options": {
            "Color": "White"
          },
          "price": 28,
          "compare_at_price": null,
          "stock": 36
        },
        {
          "variant_id": "var_025_sag",
          "uuid": "019a065f-4be0-76f7-8621-6b6b9d1e9fad",
          "sku": "HOME-RAMK-025-SAG",
          "title": "Sage",
          "options": {
            "Color": "Sage"
          },
          "price": 28,
          "compare_at_price": null,
          "stock": 47
        }
      ],
      "total_variants": 2
    },
    "variants": [
      {
        "variant_id": "var_025_whi",
        "id": "019a065f-4be0-7661-9371-7d81ee3f54ec",
        "uuid": "019a065f-4be0-7661-9371-7d81ee3f54ec",
        "sku": "HOME-RAMK-025-WHI",
        "title": "White",
        "options": {
          "Color": "White"
        },
        "price": 28,
        "compare_at_price": null,
        "stock": 36,
        "in_stock": true
      },
      {
        "variant_id": "var_025_sag",
        "id": "019a065f-4be0-76f7-8621-6b6b9d1e9fad",
        "uuid": "019a065f-4be0-76f7-8621-6b6b9d1e9fad",
        "sku": "HOME-RAMK-025-SAG",
        "title": "Sage",
        "options": {
          "Color": "Sage"
        },
        "price": 28,
        "compare_at_price": null,
        "stock": 47,
        "in_stock": true
      }
    ],
    "options": [
      {
        "name": "Color",
        "values": [
          "White",
          "Sage"
        ]
      }
    ],
    "warranty": "Simulated 1-Year Synthetic Warranty (Demo Only)",
    "return_policy": "Simulated 30-Day Sandbox Returns (Demo Only)",
    "risk_assessment": "Synthetic Demo Item: Fictional specifications for testing and benchmarking only."
  },
  {
    "id": "019a4499-78e0-79b6-8905-97744226458c",
    "slug": "aptdot-gooseneck-electric-kettle-with-temperature-control",
    "title": "Gooseneck Electric Kettle with Temperature Control",
    "name": "Gooseneck Electric Kettle with Temperature Control",
    "brand": "Aptdot Sample Goods",
    "category": "Home & Kitchen",
    "description": "0.9 litre gooseneck kettle with 1-degree temperature control and a 60-minute keep-warm mode.",
    "price": 89,
    "original_price": 109,
    "currency": "USD",
    "rating": 4.3,
    "reviews_count": 224,
    "stock": 51,
    "in_stock": true,
    "image_url": "data:image/svg+xml;utf8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%20600%20450%22%20width%3D%22600%22%20height%3D%22450%22%3E%0A%20%20%3Cdefs%3E%0A%20%20%20%20%3ClinearGradient%20id%3D%22bgGrad%22%20x1%3D%220%25%22%20y1%3D%220%25%22%20x2%3D%22100%25%22%20y2%3D%22100%25%22%3E%0A%20%20%20%20%20%20%3Cstop%20offset%3D%220%25%22%20stop-color%3D%22%230B0F19%22%2F%3E%0A%20%20%20%20%20%20%3Cstop%20offset%3D%22100%25%22%20stop-color%3D%22%23111827%22%2F%3E%0A%20%20%20%20%3C%2FlinearGradient%3E%0A%20%20%20%20%3ClinearGradient%20id%3D%22accentGrad%22%20x1%3D%220%25%22%20y1%3D%220%25%22%20x2%3D%22100%25%22%20y2%3D%220%25%22%3E%0A%20%20%20%20%20%20%3Cstop%20offset%3D%220%25%22%20stop-color%3D%22%23F59E0B%22%20stop-opacity%3D%220.9%22%2F%3E%0A%20%20%20%20%20%20%3Cstop%20offset%3D%22100%25%22%20stop-color%3D%22%236366F1%22%20stop-opacity%3D%220.9%22%2F%3E%0A%20%20%20%20%3C%2FlinearGradient%3E%0A%20%20%3C%2Fdefs%3E%0A%20%20%3Crect%20width%3D%22600%22%20height%3D%22450%22%20fill%3D%22url(%23bgGrad)%22%2F%3E%0A%20%20%3Crect%20x%3D%2220%22%20y%3D%2220%22%20width%3D%22560%22%20height%3D%22410%22%20rx%3D%2216%22%20fill%3D%22none%22%20stroke%3D%22url(%23accentGrad)%22%20stroke-width%3D%222%22%20stroke-dasharray%3D%226%2C6%22%20opacity%3D%220.6%22%2F%3E%0A%20%20%3Crect%20x%3D%22175%22%20y%3D%2250%22%20width%3D%22250%22%20height%3D%2234%22%20rx%3D%2217%22%20fill%3D%22%2378350F%22%20stroke%3D%22%23F59E0B%22%20stroke-width%3D%221.5%22%2F%3E%0A%20%20%3Ctext%20x%3D%22300%22%20y%3D%2272%22%20font-family%3D%22system-ui%2C%20-apple-system%2C%20sans-serif%22%20font-size%3D%2212%22%20font-weight%3D%22700%22%20fill%3D%22%23FDE68A%22%20text-anchor%3D%22middle%22%20letter-spacing%3D%221.5%22%3EAPTDOT%20SYNTHETIC%20DEMO%3C%2Ftext%3E%0A%20%20%3Crect%20x%3D%22235%22%20y%3D%22125%22%20width%3D%22130%22%20height%3D%22110%22%20rx%3D%2214%22%20fill%3D%22%231F2937%22%20stroke%3D%22%23F59E0B%22%20stroke-width%3D%222%22%2F%3E%0A%20%20%3Cpath%20d%3D%22M275%20180%20L300%20155%20L325%20180%20L300%20205%20Z%22%20fill%3D%22none%22%20stroke%3D%22%23F59E0B%22%20stroke-width%3D%223%22%20stroke-linejoin%3D%22round%22%2F%3E%0A%20%20%3Ccircle%20cx%3D%22300%22%20cy%3D%22180%22%20r%3D%227%22%20fill%3D%22%23F59E0B%22%2F%3E%0A%20%20%3Ctext%20x%3D%22300%22%20y%3D%22280%22%20font-family%3D%22system-ui%2C%20-apple-system%2C%20sans-serif%22%20font-size%3D%2218%22%20font-weight%3D%22600%22%20fill%3D%22%23F9FAFB%22%20text-anchor%3D%22middle%22%3EGooseneck%20Electric%20Kettle%20with%20T...%3C%2Ftext%3E%0A%20%20%3Ctext%20x%3D%22300%22%20y%3D%22310%22%20font-family%3D%22system-ui%2C%20-apple-system%2C%20sans-serif%22%20font-size%3D%2213%22%20font-weight%3D%22500%22%20fill%3D%22%239CA3AF%22%20text-anchor%3D%22middle%22%3EHome%20%26amp%3B%20Kitchen%20%E2%80%A2%20SKU%3A%20HOME-KETT-026%3C%2Ftext%3E%0A%20%20%3Crect%20x%3D%22140%22%20y%3D%22360%22%20width%3D%22320%22%20height%3D%2230%22%20rx%3D%228%22%20fill%3D%22%23111827%22%20stroke%3D%22%23374151%22%20stroke-width%3D%221%22%2F%3E%0A%20%20%3Ctext%20x%3D%22300%22%20y%3D%22380%22%20font-family%3D%22system-ui%2C%20-apple-system%2C%20sans-serif%22%20font-size%3D%2211%22%20font-weight%3D%22500%22%20fill%3D%22%236B7280%22%20text-anchor%3D%22middle%22%3ESynthetic%20Specification%20%E2%80%A2%20CC0%201.0%20Universal%3C%2Ftext%3E%0A%3C%2Fsvg%3E",
    "tag": "On Sale",
    "badge_type": "demo",
    "is_demo": true,
    "catalogue_source": "aptdot_synthetic",
    "lifecycle_status": "active",
    "verification_tier": "demo",
    "seller": {
      "name": "Aptdot Sample Goods",
      "verifiedStatus": "Synthetic Demo Catalogue",
      "authorizedPartner": false,
      "rating": 4.3,
      "location": "Synthetic Sandbox",
      "fulfillment": "Simulated Delivery (Non-Commercial)",
      "synthetic_notice": "This item belongs to the Aptdot CC0 Synthetic Benchmark Catalogue. It cannot be purchased for real fulfillment."
    },
    "evidence": {
      "source": "Aptdot Synthetic E-Commerce Product Catalog v1.0.0",
      "license": "CC0-1.0 Universal",
      "sku": "HOME-KETT-026",
      "dataset_source": "https://www.aptdot.com/datasets/ecommerce-product-catalog/",
      "is_synthetic": true
    },
    "specs": {
      "aptdot_id": "prod_026",
      "sku": "HOME-KETT-026",
      "product_type": "Home & Kitchen > Coffee & Tea",
      "cost_price": 33,
      "low_stock_threshold": 25,
      "availability": "in_stock",
      "availability_date": null,
      "dimensions": {
        "weight_g": 1250,
        "length_cm": 30,
        "width_cm": 18,
        "height_cm": 22
      },
      "options": [
        {
          "name": "Color",
          "values": [
            "Matte Black",
            "White"
          ]
        }
      ],
      "variants": [
        {
          "variant_id": "var_026_mb",
          "uuid": "019a4499-78e0-7e69-8255-abc2b22dde74",
          "sku": "HOME-KETT-026-MB",
          "title": "Matte Black",
          "options": {
            "Color": "Matte Black"
          },
          "price": 89,
          "compare_at_price": 109,
          "stock": 32
        },
        {
          "variant_id": "var_026_whi",
          "uuid": "019a4499-78e0-78ed-aef1-c60a7ddf27f5",
          "sku": "HOME-KETT-026-WHI",
          "title": "White",
          "options": {
            "Color": "White"
          },
          "price": 89,
          "compare_at_price": 109,
          "stock": 19
        }
      ],
      "total_variants": 2
    },
    "variants": [
      {
        "variant_id": "var_026_mb",
        "id": "019a4499-78e0-7e69-8255-abc2b22dde74",
        "uuid": "019a4499-78e0-7e69-8255-abc2b22dde74",
        "sku": "HOME-KETT-026-MB",
        "title": "Matte Black",
        "options": {
          "Color": "Matte Black"
        },
        "price": 89,
        "compare_at_price": 109,
        "stock": 32,
        "in_stock": true
      },
      {
        "variant_id": "var_026_whi",
        "id": "019a4499-78e0-78ed-aef1-c60a7ddf27f5",
        "uuid": "019a4499-78e0-78ed-aef1-c60a7ddf27f5",
        "sku": "HOME-KETT-026-WHI",
        "title": "White",
        "options": {
          "Color": "White"
        },
        "price": 89,
        "compare_at_price": 109,
        "stock": 19,
        "in_stock": true
      }
    ],
    "options": [
      {
        "name": "Color",
        "values": [
          "Matte Black",
          "White"
        ]
      }
    ],
    "warranty": "Simulated 1-Year Synthetic Warranty (Demo Only)",
    "return_policy": "Simulated 30-Day Sandbox Returns (Demo Only)",
    "risk_assessment": "Synthetic Demo Item: Fictional specifications for testing and benchmarking only."
  },
  {
    "id": "019a82d3-a5e0-7b27-b97f-428ba4796f29",
    "slug": "aptdot-end-grain-acacia-cutting-board",
    "title": "End-Grain Acacia Cutting Board",
    "name": "End-Grain Acacia Cutting Board",
    "brand": "Aptdot Sample Goods",
    "category": "Home & Kitchen",
    "description": "Thick end-grain acacia board with juice groove and non-slip feet.",
    "price": 49,
    "original_price": null,
    "currency": "USD",
    "rating": 4,
    "reviews_count": 427,
    "stock": 66,
    "in_stock": true,
    "image_url": "data:image/svg+xml;utf8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%20600%20450%22%20width%3D%22600%22%20height%3D%22450%22%3E%0A%20%20%3Cdefs%3E%0A%20%20%20%20%3ClinearGradient%20id%3D%22bgGrad%22%20x1%3D%220%25%22%20y1%3D%220%25%22%20x2%3D%22100%25%22%20y2%3D%22100%25%22%3E%0A%20%20%20%20%20%20%3Cstop%20offset%3D%220%25%22%20stop-color%3D%22%230B0F19%22%2F%3E%0A%20%20%20%20%20%20%3Cstop%20offset%3D%22100%25%22%20stop-color%3D%22%23111827%22%2F%3E%0A%20%20%20%20%3C%2FlinearGradient%3E%0A%20%20%20%20%3ClinearGradient%20id%3D%22accentGrad%22%20x1%3D%220%25%22%20y1%3D%220%25%22%20x2%3D%22100%25%22%20y2%3D%220%25%22%3E%0A%20%20%20%20%20%20%3Cstop%20offset%3D%220%25%22%20stop-color%3D%22%23F59E0B%22%20stop-opacity%3D%220.9%22%2F%3E%0A%20%20%20%20%20%20%3Cstop%20offset%3D%22100%25%22%20stop-color%3D%22%236366F1%22%20stop-opacity%3D%220.9%22%2F%3E%0A%20%20%20%20%3C%2FlinearGradient%3E%0A%20%20%3C%2Fdefs%3E%0A%20%20%3Crect%20width%3D%22600%22%20height%3D%22450%22%20fill%3D%22url(%23bgGrad)%22%2F%3E%0A%20%20%3Crect%20x%3D%2220%22%20y%3D%2220%22%20width%3D%22560%22%20height%3D%22410%22%20rx%3D%2216%22%20fill%3D%22none%22%20stroke%3D%22url(%23accentGrad)%22%20stroke-width%3D%222%22%20stroke-dasharray%3D%226%2C6%22%20opacity%3D%220.6%22%2F%3E%0A%20%20%3Crect%20x%3D%22175%22%20y%3D%2250%22%20width%3D%22250%22%20height%3D%2234%22%20rx%3D%2217%22%20fill%3D%22%2378350F%22%20stroke%3D%22%23F59E0B%22%20stroke-width%3D%221.5%22%2F%3E%0A%20%20%3Ctext%20x%3D%22300%22%20y%3D%2272%22%20font-family%3D%22system-ui%2C%20-apple-system%2C%20sans-serif%22%20font-size%3D%2212%22%20font-weight%3D%22700%22%20fill%3D%22%23FDE68A%22%20text-anchor%3D%22middle%22%20letter-spacing%3D%221.5%22%3EAPTDOT%20SYNTHETIC%20DEMO%3C%2Ftext%3E%0A%20%20%3Crect%20x%3D%22235%22%20y%3D%22125%22%20width%3D%22130%22%20height%3D%22110%22%20rx%3D%2214%22%20fill%3D%22%231F2937%22%20stroke%3D%22%23F59E0B%22%20stroke-width%3D%222%22%2F%3E%0A%20%20%3Cpath%20d%3D%22M275%20180%20L300%20155%20L325%20180%20L300%20205%20Z%22%20fill%3D%22none%22%20stroke%3D%22%23F59E0B%22%20stroke-width%3D%223%22%20stroke-linejoin%3D%22round%22%2F%3E%0A%20%20%3Ccircle%20cx%3D%22300%22%20cy%3D%22180%22%20r%3D%227%22%20fill%3D%22%23F59E0B%22%2F%3E%0A%20%20%3Ctext%20x%3D%22300%22%20y%3D%22280%22%20font-family%3D%22system-ui%2C%20-apple-system%2C%20sans-serif%22%20font-size%3D%2218%22%20font-weight%3D%22600%22%20fill%3D%22%23F9FAFB%22%20text-anchor%3D%22middle%22%3EEnd-Grain%20Acacia%20Cutting%20Board%3C%2Ftext%3E%0A%20%20%3Ctext%20x%3D%22300%22%20y%3D%22310%22%20font-family%3D%22system-ui%2C%20-apple-system%2C%20sans-serif%22%20font-size%3D%2213%22%20font-weight%3D%22500%22%20fill%3D%22%239CA3AF%22%20text-anchor%3D%22middle%22%3EHome%20%26amp%3B%20Kitchen%20%E2%80%A2%20SKU%3A%20HOME-BOARD-027%3C%2Ftext%3E%0A%20%20%3Crect%20x%3D%22140%22%20y%3D%22360%22%20width%3D%22320%22%20height%3D%2230%22%20rx%3D%228%22%20fill%3D%22%23111827%22%20stroke%3D%22%23374151%22%20stroke-width%3D%221%22%2F%3E%0A%20%20%3Ctext%20x%3D%22300%22%20y%3D%22380%22%20font-family%3D%22system-ui%2C%20-apple-system%2C%20sans-serif%22%20font-size%3D%2211%22%20font-weight%3D%22500%22%20fill%3D%22%236B7280%22%20text-anchor%3D%22middle%22%3ESynthetic%20Specification%20%E2%80%A2%20CC0%201.0%20Universal%3C%2Ftext%3E%0A%3C%2Fsvg%3E",
    "tag": "Synthetic Demo",
    "badge_type": "demo",
    "is_demo": true,
    "catalogue_source": "aptdot_synthetic",
    "lifecycle_status": "active",
    "verification_tier": "demo",
    "seller": {
      "name": "Aptdot Sample Goods",
      "verifiedStatus": "Synthetic Demo Catalogue",
      "authorizedPartner": false,
      "rating": 4,
      "location": "Synthetic Sandbox",
      "fulfillment": "Simulated Delivery (Non-Commercial)",
      "synthetic_notice": "This item belongs to the Aptdot CC0 Synthetic Benchmark Catalogue. It cannot be purchased for real fulfillment."
    },
    "evidence": {
      "source": "Aptdot Synthetic E-Commerce Product Catalog v1.0.0",
      "license": "CC0-1.0 Universal",
      "sku": "HOME-BOARD-027",
      "dataset_source": "https://www.aptdot.com/datasets/ecommerce-product-catalog/",
      "is_synthetic": true
    },
    "specs": {
      "aptdot_id": "prod_027",
      "sku": "HOME-BOARD-027",
      "product_type": "Home & Kitchen > Kitchen Tools",
      "cost_price": 17,
      "low_stock_threshold": 15,
      "availability": "in_stock",
      "availability_date": null,
      "dimensions": {
        "weight_g": 2100,
        "length_cm": 40,
        "width_cm": 30,
        "height_cm": 4
      },
      "options": [
        {
          "name": "Size",
          "values": [
            "Medium",
            "Large"
          ]
        }
      ],
      "variants": [
        {
          "variant_id": "var_027_med",
          "uuid": "019a82d3-a5e0-797f-9b83-b092db178192",
          "sku": "HOME-BOARD-027-MED",
          "title": "Medium",
          "options": {
            "Size": "Medium"
          },
          "price": 49,
          "compare_at_price": null,
          "stock": 40
        },
        {
          "variant_id": "var_027_lar",
          "uuid": "019a82d3-a5e0-741f-8fe2-e194ba278dc2",
          "sku": "HOME-BOARD-027-LAR",
          "title": "Large",
          "options": {
            "Size": "Large"
          },
          "price": 64,
          "compare_at_price": null,
          "stock": 26
        }
      ],
      "total_variants": 2
    },
    "variants": [
      {
        "variant_id": "var_027_med",
        "id": "019a82d3-a5e0-797f-9b83-b092db178192",
        "uuid": "019a82d3-a5e0-797f-9b83-b092db178192",
        "sku": "HOME-BOARD-027-MED",
        "title": "Medium",
        "options": {
          "Size": "Medium"
        },
        "price": 49,
        "compare_at_price": null,
        "stock": 40,
        "in_stock": true
      },
      {
        "variant_id": "var_027_lar",
        "id": "019a82d3-a5e0-741f-8fe2-e194ba278dc2",
        "uuid": "019a82d3-a5e0-741f-8fe2-e194ba278dc2",
        "sku": "HOME-BOARD-027-LAR",
        "title": "Large",
        "options": {
          "Size": "Large"
        },
        "price": 64,
        "compare_at_price": null,
        "stock": 26,
        "in_stock": true
      }
    ],
    "options": [
      {
        "name": "Size",
        "values": [
          "Medium",
          "Large"
        ]
      }
    ],
    "warranty": "Simulated 1-Year Synthetic Warranty (Demo Only)",
    "return_policy": "Simulated 30-Day Sandbox Returns (Demo Only)",
    "risk_assessment": "Synthetic Demo Item: Fictional specifications for testing and benchmarking only."
  },
  {
    "id": "019abf9b-0900-7557-ba75-c6a91ec5d805",
    "slug": "aptdot-airtight-vacuum-coffee-canister",
    "title": "Airtight Vacuum Coffee Canister",
    "name": "Airtight Vacuum Coffee Canister",
    "brand": "Aptdot Sample Goods",
    "category": "Home & Kitchen",
    "description": "Stainless steel canister with a one-way CO2 valve and date tracker that keeps 500 g of beans fresh.",
    "price": 25,
    "original_price": null,
    "currency": "USD",
    "rating": 4.4,
    "reviews_count": 61,
    "stock": 92,
    "in_stock": true,
    "image_url": "data:image/svg+xml;utf8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%20600%20450%22%20width%3D%22600%22%20height%3D%22450%22%3E%0A%20%20%3Cdefs%3E%0A%20%20%20%20%3ClinearGradient%20id%3D%22bgGrad%22%20x1%3D%220%25%22%20y1%3D%220%25%22%20x2%3D%22100%25%22%20y2%3D%22100%25%22%3E%0A%20%20%20%20%20%20%3Cstop%20offset%3D%220%25%22%20stop-color%3D%22%230B0F19%22%2F%3E%0A%20%20%20%20%20%20%3Cstop%20offset%3D%22100%25%22%20stop-color%3D%22%23111827%22%2F%3E%0A%20%20%20%20%3C%2FlinearGradient%3E%0A%20%20%20%20%3ClinearGradient%20id%3D%22accentGrad%22%20x1%3D%220%25%22%20y1%3D%220%25%22%20x2%3D%22100%25%22%20y2%3D%220%25%22%3E%0A%20%20%20%20%20%20%3Cstop%20offset%3D%220%25%22%20stop-color%3D%22%23F59E0B%22%20stop-opacity%3D%220.9%22%2F%3E%0A%20%20%20%20%20%20%3Cstop%20offset%3D%22100%25%22%20stop-color%3D%22%236366F1%22%20stop-opacity%3D%220.9%22%2F%3E%0A%20%20%20%20%3C%2FlinearGradient%3E%0A%20%20%3C%2Fdefs%3E%0A%20%20%3Crect%20width%3D%22600%22%20height%3D%22450%22%20fill%3D%22url(%23bgGrad)%22%2F%3E%0A%20%20%3Crect%20x%3D%2220%22%20y%3D%2220%22%20width%3D%22560%22%20height%3D%22410%22%20rx%3D%2216%22%20fill%3D%22none%22%20stroke%3D%22url(%23accentGrad)%22%20stroke-width%3D%222%22%20stroke-dasharray%3D%226%2C6%22%20opacity%3D%220.6%22%2F%3E%0A%20%20%3Crect%20x%3D%22175%22%20y%3D%2250%22%20width%3D%22250%22%20height%3D%2234%22%20rx%3D%2217%22%20fill%3D%22%2378350F%22%20stroke%3D%22%23F59E0B%22%20stroke-width%3D%221.5%22%2F%3E%0A%20%20%3Ctext%20x%3D%22300%22%20y%3D%2272%22%20font-family%3D%22system-ui%2C%20-apple-system%2C%20sans-serif%22%20font-size%3D%2212%22%20font-weight%3D%22700%22%20fill%3D%22%23FDE68A%22%20text-anchor%3D%22middle%22%20letter-spacing%3D%221.5%22%3EAPTDOT%20SYNTHETIC%20DEMO%3C%2Ftext%3E%0A%20%20%3Crect%20x%3D%22235%22%20y%3D%22125%22%20width%3D%22130%22%20height%3D%22110%22%20rx%3D%2214%22%20fill%3D%22%231F2937%22%20stroke%3D%22%23F59E0B%22%20stroke-width%3D%222%22%2F%3E%0A%20%20%3Cpath%20d%3D%22M275%20180%20L300%20155%20L325%20180%20L300%20205%20Z%22%20fill%3D%22none%22%20stroke%3D%22%23F59E0B%22%20stroke-width%3D%223%22%20stroke-linejoin%3D%22round%22%2F%3E%0A%20%20%3Ccircle%20cx%3D%22300%22%20cy%3D%22180%22%20r%3D%227%22%20fill%3D%22%23F59E0B%22%2F%3E%0A%20%20%3Ctext%20x%3D%22300%22%20y%3D%22280%22%20font-family%3D%22system-ui%2C%20-apple-system%2C%20sans-serif%22%20font-size%3D%2218%22%20font-weight%3D%22600%22%20fill%3D%22%23F9FAFB%22%20text-anchor%3D%22middle%22%3EAirtight%20Vacuum%20Coffee%20Canister%3C%2Ftext%3E%0A%20%20%3Ctext%20x%3D%22300%22%20y%3D%22310%22%20font-family%3D%22system-ui%2C%20-apple-system%2C%20sans-serif%22%20font-size%3D%2213%22%20font-weight%3D%22500%22%20fill%3D%22%239CA3AF%22%20text-anchor%3D%22middle%22%3EHome%20%26amp%3B%20Kitchen%20%E2%80%A2%20SKU%3A%20HOME-CANN-028%3C%2Ftext%3E%0A%20%20%3Crect%20x%3D%22140%22%20y%3D%22360%22%20width%3D%22320%22%20height%3D%2230%22%20rx%3D%228%22%20fill%3D%22%23111827%22%20stroke%3D%22%23374151%22%20stroke-width%3D%221%22%2F%3E%0A%20%20%3Ctext%20x%3D%22300%22%20y%3D%22380%22%20font-family%3D%22system-ui%2C%20-apple-system%2C%20sans-serif%22%20font-size%3D%2211%22%20font-weight%3D%22500%22%20fill%3D%22%236B7280%22%20text-anchor%3D%22middle%22%3ESynthetic%20Specification%20%E2%80%A2%20CC0%201.0%20Universal%3C%2Ftext%3E%0A%3C%2Fsvg%3E",
    "tag": "Synthetic Demo",
    "badge_type": "demo",
    "is_demo": true,
    "catalogue_source": "aptdot_synthetic",
    "lifecycle_status": "active",
    "verification_tier": "demo",
    "seller": {
      "name": "Aptdot Sample Goods",
      "verifiedStatus": "Synthetic Demo Catalogue",
      "authorizedPartner": false,
      "rating": 4.4,
      "location": "Synthetic Sandbox",
      "fulfillment": "Simulated Delivery (Non-Commercial)",
      "synthetic_notice": "This item belongs to the Aptdot CC0 Synthetic Benchmark Catalogue. It cannot be purchased for real fulfillment."
    },
    "evidence": {
      "source": "Aptdot Synthetic E-Commerce Product Catalog v1.0.0",
      "license": "CC0-1.0 Universal",
      "sku": "HOME-CANN-028",
      "dataset_source": "https://www.aptdot.com/datasets/ecommerce-product-catalog/",
      "is_synthetic": true
    },
    "specs": {
      "aptdot_id": "prod_028",
      "sku": "HOME-CANN-028",
      "product_type": "Home & Kitchen > Coffee & Tea",
      "cost_price": 8,
      "low_stock_threshold": 8,
      "availability": "in_stock",
      "availability_date": null,
      "dimensions": {
        "weight_g": 420,
        "length_cm": 12,
        "width_cm": 12,
        "height_cm": 18
      },
      "options": [
        {
          "name": "Color",
          "values": [
            "Stainless",
            "Black"
          ]
        }
      ],
      "variants": [
        {
          "variant_id": "var_028_sta",
          "uuid": "019abf9b-0900-7527-a585-fc76b712b294",
          "sku": "HOME-CANN-028-STA",
          "title": "Stainless",
          "options": {
            "Color": "Stainless"
          },
          "price": 25,
          "compare_at_price": null,
          "stock": 57
        },
        {
          "variant_id": "var_028_bla",
          "uuid": "019abf9b-0900-711b-b6b4-acc968ae07c9",
          "sku": "HOME-CANN-028-BLA",
          "title": "Black",
          "options": {
            "Color": "Black"
          },
          "price": 25,
          "compare_at_price": null,
          "stock": 35
        }
      ],
      "total_variants": 2
    },
    "variants": [
      {
        "variant_id": "var_028_sta",
        "id": "019abf9b-0900-7527-a585-fc76b712b294",
        "uuid": "019abf9b-0900-7527-a585-fc76b712b294",
        "sku": "HOME-CANN-028-STA",
        "title": "Stainless",
        "options": {
          "Color": "Stainless"
        },
        "price": 25,
        "compare_at_price": null,
        "stock": 57,
        "in_stock": true
      },
      {
        "variant_id": "var_028_bla",
        "id": "019abf9b-0900-711b-b6b4-acc968ae07c9",
        "uuid": "019abf9b-0900-711b-b6b4-acc968ae07c9",
        "sku": "HOME-CANN-028-BLA",
        "title": "Black",
        "options": {
          "Color": "Black"
        },
        "price": 25,
        "compare_at_price": null,
        "stock": 35,
        "in_stock": true
      }
    ],
    "options": [
      {
        "name": "Color",
        "values": [
          "Stainless",
          "Black"
        ]
      }
    ],
    "warranty": "Simulated 1-Year Synthetic Warranty (Demo Only)",
    "return_policy": "Simulated 30-Day Sandbox Returns (Demo Only)",
    "risk_assessment": "Synthetic Demo Item: Fictional specifications for testing and benchmarking only."
  },
  {
    "id": "01a1016b-bb80-79b3-8969-64058c29716e",
    "slug": "aptdot-waffle-weave-cotton-kitchen-towels-set-of-3",
    "title": "Waffle-Weave Cotton Kitchen Towels, Set of 3",
    "name": "Waffle-Weave Cotton Kitchen Towels, Set of 3",
    "brand": "Aptdot Sample Goods",
    "category": "Home & Kitchen",
    "description": "Quick-drying waffle-weave cotton towels, 45 x 70 cm each. Newly added, no reviews yet.",
    "price": 19,
    "original_price": null,
    "currency": "USD",
    "rating": 4.5,
    "reviews_count": 0,
    "stock": 75,
    "in_stock": true,
    "image_url": "data:image/svg+xml;utf8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%20600%20450%22%20width%3D%22600%22%20height%3D%22450%22%3E%0A%20%20%3Cdefs%3E%0A%20%20%20%20%3ClinearGradient%20id%3D%22bgGrad%22%20x1%3D%220%25%22%20y1%3D%220%25%22%20x2%3D%22100%25%22%20y2%3D%22100%25%22%3E%0A%20%20%20%20%20%20%3Cstop%20offset%3D%220%25%22%20stop-color%3D%22%230B0F19%22%2F%3E%0A%20%20%20%20%20%20%3Cstop%20offset%3D%22100%25%22%20stop-color%3D%22%23111827%22%2F%3E%0A%20%20%20%20%3C%2FlinearGradient%3E%0A%20%20%20%20%3ClinearGradient%20id%3D%22accentGrad%22%20x1%3D%220%25%22%20y1%3D%220%25%22%20x2%3D%22100%25%22%20y2%3D%220%25%22%3E%0A%20%20%20%20%20%20%3Cstop%20offset%3D%220%25%22%20stop-color%3D%22%23F59E0B%22%20stop-opacity%3D%220.9%22%2F%3E%0A%20%20%20%20%20%20%3Cstop%20offset%3D%22100%25%22%20stop-color%3D%22%236366F1%22%20stop-opacity%3D%220.9%22%2F%3E%0A%20%20%20%20%3C%2FlinearGradient%3E%0A%20%20%3C%2Fdefs%3E%0A%20%20%3Crect%20width%3D%22600%22%20height%3D%22450%22%20fill%3D%22url(%23bgGrad)%22%2F%3E%0A%20%20%3Crect%20x%3D%2220%22%20y%3D%2220%22%20width%3D%22560%22%20height%3D%22410%22%20rx%3D%2216%22%20fill%3D%22none%22%20stroke%3D%22url(%23accentGrad)%22%20stroke-width%3D%222%22%20stroke-dasharray%3D%226%2C6%22%20opacity%3D%220.6%22%2F%3E%0A%20%20%3Crect%20x%3D%22175%22%20y%3D%2250%22%20width%3D%22250%22%20height%3D%2234%22%20rx%3D%2217%22%20fill%3D%22%2378350F%22%20stroke%3D%22%23F59E0B%22%20stroke-width%3D%221.5%22%2F%3E%0A%20%20%3Ctext%20x%3D%22300%22%20y%3D%2272%22%20font-family%3D%22system-ui%2C%20-apple-system%2C%20sans-serif%22%20font-size%3D%2212%22%20font-weight%3D%22700%22%20fill%3D%22%23FDE68A%22%20text-anchor%3D%22middle%22%20letter-spacing%3D%221.5%22%3EAPTDOT%20SYNTHETIC%20DEMO%3C%2Ftext%3E%0A%20%20%3Crect%20x%3D%22235%22%20y%3D%22125%22%20width%3D%22130%22%20height%3D%22110%22%20rx%3D%2214%22%20fill%3D%22%231F2937%22%20stroke%3D%22%23F59E0B%22%20stroke-width%3D%222%22%2F%3E%0A%20%20%3Cpath%20d%3D%22M275%20180%20L300%20155%20L325%20180%20L300%20205%20Z%22%20fill%3D%22none%22%20stroke%3D%22%23F59E0B%22%20stroke-width%3D%223%22%20stroke-linejoin%3D%22round%22%2F%3E%0A%20%20%3Ccircle%20cx%3D%22300%22%20cy%3D%22180%22%20r%3D%227%22%20fill%3D%22%23F59E0B%22%2F%3E%0A%20%20%3Ctext%20x%3D%22300%22%20y%3D%22280%22%20font-family%3D%22system-ui%2C%20-apple-system%2C%20sans-serif%22%20font-size%3D%2218%22%20font-weight%3D%22600%22%20fill%3D%22%23F9FAFB%22%20text-anchor%3D%22middle%22%3EWaffle-Weave%20Cotton%20Kitchen%20Towe...%3C%2Ftext%3E%0A%20%20%3Ctext%20x%3D%22300%22%20y%3D%22310%22%20font-family%3D%22system-ui%2C%20-apple-system%2C%20sans-serif%22%20font-size%3D%2213%22%20font-weight%3D%22500%22%20fill%3D%22%239CA3AF%22%20text-anchor%3D%22middle%22%3EHome%20%26amp%3B%20Kitchen%20%E2%80%A2%20SKU%3A%20HOME-TOWL-029%3C%2Ftext%3E%0A%20%20%3Crect%20x%3D%22140%22%20y%3D%22360%22%20width%3D%22320%22%20height%3D%2230%22%20rx%3D%228%22%20fill%3D%22%23111827%22%20stroke%3D%22%23374151%22%20stroke-width%3D%221%22%2F%3E%0A%20%20%3Ctext%20x%3D%22300%22%20y%3D%22380%22%20font-family%3D%22system-ui%2C%20-apple-system%2C%20sans-serif%22%20font-size%3D%2211%22%20font-weight%3D%22500%22%20fill%3D%22%236B7280%22%20text-anchor%3D%22middle%22%3ESynthetic%20Specification%20%E2%80%A2%20CC0%201.0%20Universal%3C%2Ftext%3E%0A%3C%2Fsvg%3E",
    "tag": "Synthetic Demo",
    "badge_type": "demo",
    "is_demo": true,
    "catalogue_source": "aptdot_synthetic",
    "lifecycle_status": "active",
    "verification_tier": "demo",
    "seller": {
      "name": "Aptdot Sample Goods",
      "verifiedStatus": "Synthetic Demo Catalogue",
      "authorizedPartner": false,
      "rating": 4.5,
      "location": "Synthetic Sandbox",
      "fulfillment": "Simulated Delivery (Non-Commercial)",
      "synthetic_notice": "This item belongs to the Aptdot CC0 Synthetic Benchmark Catalogue. It cannot be purchased for real fulfillment."
    },
    "evidence": {
      "source": "Aptdot Synthetic E-Commerce Product Catalog v1.0.0",
      "license": "CC0-1.0 Universal",
      "sku": "HOME-TOWL-029",
      "dataset_source": "https://www.aptdot.com/datasets/ecommerce-product-catalog/",
      "is_synthetic": true
    },
    "specs": {
      "aptdot_id": "prod_029",
      "sku": "HOME-TOWL-029",
      "product_type": "Home & Kitchen > Linens",
      "cost_price": 5,
      "low_stock_threshold": 5,
      "availability": "in_stock",
      "availability_date": null,
      "dimensions": {
        "weight_g": 300,
        "length_cm": 25,
        "width_cm": 20,
        "height_cm": 5
      },
      "options": [
        {
          "name": "Color",
          "values": [
            "Natural",
            "Charcoal"
          ]
        }
      ],
      "variants": [
        {
          "variant_id": "var_029_nat",
          "uuid": "01a1016b-bb80-7271-b6b1-2844bf02dc9b",
          "sku": "HOME-TOWL-029-NAT",
          "title": "Natural",
          "options": {
            "Color": "Natural"
          },
          "price": 19,
          "compare_at_price": null,
          "stock": 39
        },
        {
          "variant_id": "var_029_cha",
          "uuid": "01a1016b-bb80-7ee7-a5ea-e8208f80093b",
          "sku": "HOME-TOWL-029-CHA",
          "title": "Charcoal",
          "options": {
            "Color": "Charcoal"
          },
          "price": 19,
          "compare_at_price": null,
          "stock": 36
        }
      ],
      "total_variants": 2
    },
    "variants": [
      {
        "variant_id": "var_029_nat",
        "id": "01a1016b-bb80-7271-b6b1-2844bf02dc9b",
        "uuid": "01a1016b-bb80-7271-b6b1-2844bf02dc9b",
        "sku": "HOME-TOWL-029-NAT",
        "title": "Natural",
        "options": {
          "Color": "Natural"
        },
        "price": 19,
        "compare_at_price": null,
        "stock": 39,
        "in_stock": true
      },
      {
        "variant_id": "var_029_cha",
        "id": "01a1016b-bb80-7ee7-a5ea-e8208f80093b",
        "uuid": "01a1016b-bb80-7ee7-a5ea-e8208f80093b",
        "sku": "HOME-TOWL-029-CHA",
        "title": "Charcoal",
        "options": {
          "Color": "Charcoal"
        },
        "price": 19,
        "compare_at_price": null,
        "stock": 36,
        "in_stock": true
      }
    ],
    "options": [
      {
        "name": "Color",
        "values": [
          "Natural",
          "Charcoal"
        ]
      }
    ],
    "warranty": "Simulated 1-Year Synthetic Warranty (Demo Only)",
    "return_policy": "Simulated 30-Day Sandbox Returns (Demo Only)",
    "risk_assessment": "Synthetic Demo Item: Fictional specifications for testing and benchmarking only."
  },
  {
    "id": "01a13032-d480-75d1-93c6-3fca6c72ae1d",
    "slug": "aptdot-adjustable-ceramic-salt-and-pepper-mill-set",
    "title": "Adjustable Ceramic Salt & Pepper Mill Set",
    "name": "Adjustable Ceramic Salt & Pepper Mill Set",
    "brand": "Aptdot Sample Goods",
    "category": "Home & Kitchen",
    "description": "Pair of mills with adjustable ceramic grinders and acacia wood tops. Draft listing, not yet published.",
    "price": 32,
    "original_price": null,
    "currency": "USD",
    "rating": 4.5,
    "reviews_count": 0,
    "stock": 32,
    "in_stock": true,
    "image_url": "data:image/svg+xml;utf8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%20600%20450%22%20width%3D%22600%22%20height%3D%22450%22%3E%0A%20%20%3Cdefs%3E%0A%20%20%20%20%3ClinearGradient%20id%3D%22bgGrad%22%20x1%3D%220%25%22%20y1%3D%220%25%22%20x2%3D%22100%25%22%20y2%3D%22100%25%22%3E%0A%20%20%20%20%20%20%3Cstop%20offset%3D%220%25%22%20stop-color%3D%22%230B0F19%22%2F%3E%0A%20%20%20%20%20%20%3Cstop%20offset%3D%22100%25%22%20stop-color%3D%22%23111827%22%2F%3E%0A%20%20%20%20%3C%2FlinearGradient%3E%0A%20%20%20%20%3ClinearGradient%20id%3D%22accentGrad%22%20x1%3D%220%25%22%20y1%3D%220%25%22%20x2%3D%22100%25%22%20y2%3D%220%25%22%3E%0A%20%20%20%20%20%20%3Cstop%20offset%3D%220%25%22%20stop-color%3D%22%23F59E0B%22%20stop-opacity%3D%220.9%22%2F%3E%0A%20%20%20%20%20%20%3Cstop%20offset%3D%22100%25%22%20stop-color%3D%22%236366F1%22%20stop-opacity%3D%220.9%22%2F%3E%0A%20%20%20%20%3C%2FlinearGradient%3E%0A%20%20%3C%2Fdefs%3E%0A%20%20%3Crect%20width%3D%22600%22%20height%3D%22450%22%20fill%3D%22url(%23bgGrad)%22%2F%3E%0A%20%20%3Crect%20x%3D%2220%22%20y%3D%2220%22%20width%3D%22560%22%20height%3D%22410%22%20rx%3D%2216%22%20fill%3D%22none%22%20stroke%3D%22url(%23accentGrad)%22%20stroke-width%3D%222%22%20stroke-dasharray%3D%226%2C6%22%20opacity%3D%220.6%22%2F%3E%0A%20%20%3Crect%20x%3D%22175%22%20y%3D%2250%22%20width%3D%22250%22%20height%3D%2234%22%20rx%3D%2217%22%20fill%3D%22%2378350F%22%20stroke%3D%22%23F59E0B%22%20stroke-width%3D%221.5%22%2F%3E%0A%20%20%3Ctext%20x%3D%22300%22%20y%3D%2272%22%20font-family%3D%22system-ui%2C%20-apple-system%2C%20sans-serif%22%20font-size%3D%2212%22%20font-weight%3D%22700%22%20fill%3D%22%23FDE68A%22%20text-anchor%3D%22middle%22%20letter-spacing%3D%221.5%22%3EAPTDOT%20SYNTHETIC%20DEMO%3C%2Ftext%3E%0A%20%20%3Crect%20x%3D%22235%22%20y%3D%22125%22%20width%3D%22130%22%20height%3D%22110%22%20rx%3D%2214%22%20fill%3D%22%231F2937%22%20stroke%3D%22%23F59E0B%22%20stroke-width%3D%222%22%2F%3E%0A%20%20%3Cpath%20d%3D%22M275%20180%20L300%20155%20L325%20180%20L300%20205%20Z%22%20fill%3D%22none%22%20stroke%3D%22%23F59E0B%22%20stroke-width%3D%223%22%20stroke-linejoin%3D%22round%22%2F%3E%0A%20%20%3Ccircle%20cx%3D%22300%22%20cy%3D%22180%22%20r%3D%227%22%20fill%3D%22%23F59E0B%22%2F%3E%0A%20%20%3Ctext%20x%3D%22300%22%20y%3D%22280%22%20font-family%3D%22system-ui%2C%20-apple-system%2C%20sans-serif%22%20font-size%3D%2218%22%20font-weight%3D%22600%22%20fill%3D%22%23F9FAFB%22%20text-anchor%3D%22middle%22%3EAdjustable%20Ceramic%20Salt%20%26amp%3B%20Pepper...%3C%2Ftext%3E%0A%20%20%3Ctext%20x%3D%22300%22%20y%3D%22310%22%20font-family%3D%22system-ui%2C%20-apple-system%2C%20sans-serif%22%20font-size%3D%2213%22%20font-weight%3D%22500%22%20fill%3D%22%239CA3AF%22%20text-anchor%3D%22middle%22%3EHome%20%26amp%3B%20Kitchen%20%E2%80%A2%20SKU%3A%20HOME-MILL-030%3C%2Ftext%3E%0A%20%20%3Crect%20x%3D%22140%22%20y%3D%22360%22%20width%3D%22320%22%20height%3D%2230%22%20rx%3D%228%22%20fill%3D%22%23111827%22%20stroke%3D%22%23374151%22%20stroke-width%3D%221%22%2F%3E%0A%20%20%3Ctext%20x%3D%22300%22%20y%3D%22380%22%20font-family%3D%22system-ui%2C%20-apple-system%2C%20sans-serif%22%20font-size%3D%2211%22%20font-weight%3D%22500%22%20fill%3D%22%236B7280%22%20text-anchor%3D%22middle%22%3ESynthetic%20Specification%20%E2%80%A2%20CC0%201.0%20Universal%3C%2Ftext%3E%0A%3C%2Fsvg%3E",
    "tag": "Draft (Hidden)",
    "badge_type": "demo",
    "is_demo": true,
    "catalogue_source": "aptdot_synthetic",
    "lifecycle_status": "draft",
    "verification_tier": "demo",
    "seller": {
      "name": "Aptdot Sample Goods",
      "verifiedStatus": "Synthetic Demo Catalogue",
      "authorizedPartner": false,
      "rating": 4.5,
      "location": "Synthetic Sandbox",
      "fulfillment": "Simulated Delivery (Non-Commercial)",
      "synthetic_notice": "This item belongs to the Aptdot CC0 Synthetic Benchmark Catalogue. It cannot be purchased for real fulfillment."
    },
    "evidence": {
      "source": "Aptdot Synthetic E-Commerce Product Catalog v1.0.0",
      "license": "CC0-1.0 Universal",
      "sku": "HOME-MILL-030",
      "dataset_source": "https://www.aptdot.com/datasets/ecommerce-product-catalog/",
      "is_synthetic": true
    },
    "specs": {
      "aptdot_id": "prod_030",
      "sku": "HOME-MILL-030",
      "product_type": "Home & Kitchen > Kitchen Tools",
      "cost_price": 11,
      "low_stock_threshold": 25,
      "availability": "in_stock",
      "availability_date": null,
      "dimensions": {
        "weight_g": 650,
        "length_cm": 22,
        "width_cm": 12,
        "height_cm": 8
      },
      "options": [],
      "variants": [
        {
          "variant_id": "var_030_default",
          "uuid": "01a13032-d480-7064-86a2-2d113605a7a3",
          "sku": "HOME-MILL-030",
          "title": "Default",
          "options": {},
          "price": 32,
          "compare_at_price": null,
          "stock": 32
        }
      ],
      "total_variants": 1
    },
    "variants": [
      {
        "variant_id": "var_030_default",
        "id": "01a13032-d480-7064-86a2-2d113605a7a3",
        "uuid": "01a13032-d480-7064-86a2-2d113605a7a3",
        "sku": "HOME-MILL-030",
        "title": "Default",
        "options": {},
        "price": 32,
        "compare_at_price": null,
        "stock": 32,
        "in_stock": true
      }
    ],
    "options": [],
    "warranty": "Simulated 1-Year Synthetic Warranty (Demo Only)",
    "return_policy": "Simulated 30-Day Sandbox Returns (Demo Only)",
    "risk_assessment": "Synthetic Demo Item: Fictional specifications for testing and benchmarking only."
  },
  {
    "id": "019b797b-91a0-76d9-ab77-3e1ac9fe7ba0",
    "slug": "aptdot-high-density-dual-texture-non-slip-yoga-mat",
    "title": "High-Density Dual-Texture Non-Slip Yoga Mat",
    "name": "High-Density Dual-Texture Non-Slip Yoga Mat",
    "brand": "Aptdot Sample Goods",
    "category": "Health & Fitness",
    "description": "6 mm high-density mat with a textured grip side and a smooth side, plus a carry strap.",
    "price": 48,
    "original_price": 60,
    "currency": "USD",
    "rating": 4.4,
    "reviews_count": 189,
    "stock": 0,
    "in_stock": false,
    "image_url": "data:image/svg+xml;utf8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%20600%20450%22%20width%3D%22600%22%20height%3D%22450%22%3E%0A%20%20%3Cdefs%3E%0A%20%20%20%20%3ClinearGradient%20id%3D%22bgGrad%22%20x1%3D%220%25%22%20y1%3D%220%25%22%20x2%3D%22100%25%22%20y2%3D%22100%25%22%3E%0A%20%20%20%20%20%20%3Cstop%20offset%3D%220%25%22%20stop-color%3D%22%230B0F19%22%2F%3E%0A%20%20%20%20%20%20%3Cstop%20offset%3D%22100%25%22%20stop-color%3D%22%23111827%22%2F%3E%0A%20%20%20%20%3C%2FlinearGradient%3E%0A%20%20%20%20%3ClinearGradient%20id%3D%22accentGrad%22%20x1%3D%220%25%22%20y1%3D%220%25%22%20x2%3D%22100%25%22%20y2%3D%220%25%22%3E%0A%20%20%20%20%20%20%3Cstop%20offset%3D%220%25%22%20stop-color%3D%22%2310B981%22%20stop-opacity%3D%220.9%22%2F%3E%0A%20%20%20%20%20%20%3Cstop%20offset%3D%22100%25%22%20stop-color%3D%22%236366F1%22%20stop-opacity%3D%220.9%22%2F%3E%0A%20%20%20%20%3C%2FlinearGradient%3E%0A%20%20%3C%2Fdefs%3E%0A%20%20%3Crect%20width%3D%22600%22%20height%3D%22450%22%20fill%3D%22url(%23bgGrad)%22%2F%3E%0A%20%20%3Crect%20x%3D%2220%22%20y%3D%2220%22%20width%3D%22560%22%20height%3D%22410%22%20rx%3D%2216%22%20fill%3D%22none%22%20stroke%3D%22url(%23accentGrad)%22%20stroke-width%3D%222%22%20stroke-dasharray%3D%226%2C6%22%20opacity%3D%220.6%22%2F%3E%0A%20%20%3Crect%20x%3D%22175%22%20y%3D%2250%22%20width%3D%22250%22%20height%3D%2234%22%20rx%3D%2217%22%20fill%3D%22%23064E3B%22%20stroke%3D%22%2310B981%22%20stroke-width%3D%221.5%22%2F%3E%0A%20%20%3Ctext%20x%3D%22300%22%20y%3D%2272%22%20font-family%3D%22system-ui%2C%20-apple-system%2C%20sans-serif%22%20font-size%3D%2212%22%20font-weight%3D%22700%22%20fill%3D%22%23A7F3D0%22%20text-anchor%3D%22middle%22%20letter-spacing%3D%221.5%22%3EAPTDOT%20SYNTHETIC%20DEMO%3C%2Ftext%3E%0A%20%20%3Crect%20x%3D%22235%22%20y%3D%22125%22%20width%3D%22130%22%20height%3D%22110%22%20rx%3D%2214%22%20fill%3D%22%231F2937%22%20stroke%3D%22%2310B981%22%20stroke-width%3D%222%22%2F%3E%0A%20%20%3Cpath%20d%3D%22M275%20180%20L300%20155%20L325%20180%20L300%20205%20Z%22%20fill%3D%22none%22%20stroke%3D%22%2310B981%22%20stroke-width%3D%223%22%20stroke-linejoin%3D%22round%22%2F%3E%0A%20%20%3Ccircle%20cx%3D%22300%22%20cy%3D%22180%22%20r%3D%227%22%20fill%3D%22%2310B981%22%2F%3E%0A%20%20%3Ctext%20x%3D%22300%22%20y%3D%22280%22%20font-family%3D%22system-ui%2C%20-apple-system%2C%20sans-serif%22%20font-size%3D%2218%22%20font-weight%3D%22600%22%20fill%3D%22%23F9FAFB%22%20text-anchor%3D%22middle%22%3EHigh-Density%20Dual-Texture%20Non-Sl...%3C%2Ftext%3E%0A%20%20%3Ctext%20x%3D%22300%22%20y%3D%22310%22%20font-family%3D%22system-ui%2C%20-apple-system%2C%20sans-serif%22%20font-size%3D%2213%22%20font-weight%3D%22500%22%20fill%3D%22%239CA3AF%22%20text-anchor%3D%22middle%22%3EHealth%20%26amp%3B%20Fitness%20%E2%80%A2%20SKU%3A%20FIT-MAT-031%3C%2Ftext%3E%0A%20%20%3Crect%20x%3D%22140%22%20y%3D%22360%22%20width%3D%22320%22%20height%3D%2230%22%20rx%3D%228%22%20fill%3D%22%23111827%22%20stroke%3D%22%23374151%22%20stroke-width%3D%221%22%2F%3E%0A%20%20%3Ctext%20x%3D%22300%22%20y%3D%22380%22%20font-family%3D%22system-ui%2C%20-apple-system%2C%20sans-serif%22%20font-size%3D%2211%22%20font-weight%3D%22500%22%20fill%3D%22%236B7280%22%20text-anchor%3D%22middle%22%3ESynthetic%20Specification%20%E2%80%A2%20CC0%201.0%20Universal%3C%2Ftext%3E%0A%3C%2Fsvg%3E",
    "tag": "Out of Stock",
    "badge_type": "demo",
    "is_demo": true,
    "catalogue_source": "aptdot_synthetic",
    "lifecycle_status": "active",
    "verification_tier": "demo",
    "seller": {
      "name": "Aptdot Sample Goods",
      "verifiedStatus": "Synthetic Demo Catalogue",
      "authorizedPartner": false,
      "rating": 4.4,
      "location": "Synthetic Sandbox",
      "fulfillment": "Simulated Delivery (Non-Commercial)",
      "synthetic_notice": "This item belongs to the Aptdot CC0 Synthetic Benchmark Catalogue. It cannot be purchased for real fulfillment."
    },
    "evidence": {
      "source": "Aptdot Synthetic E-Commerce Product Catalog v1.0.0",
      "license": "CC0-1.0 Universal",
      "sku": "FIT-MAT-031",
      "dataset_source": "https://www.aptdot.com/datasets/ecommerce-product-catalog/",
      "is_synthetic": true
    },
    "specs": {
      "aptdot_id": "prod_031",
      "sku": "FIT-MAT-031",
      "product_type": "Health & Fitness > Yoga",
      "cost_price": 16.8,
      "low_stock_threshold": 15,
      "availability": "out_of_stock",
      "availability_date": null,
      "dimensions": {
        "weight_g": 950,
        "length_cm": 65,
        "width_cm": 12,
        "height_cm": 12
      },
      "options": [
        {
          "name": "Color",
          "values": [
            "Forest Green",
            "Deep Plum"
          ]
        }
      ],
      "variants": [
        {
          "variant_id": "var_031_fg",
          "uuid": "019b797b-91a0-75ab-baec-cbce9eb332f5",
          "sku": "FIT-MAT-031-FG",
          "title": "Forest Green",
          "options": {
            "Color": "Forest Green"
          },
          "price": 48,
          "compare_at_price": 60,
          "stock": 0
        },
        {
          "variant_id": "var_031_dp",
          "uuid": "019b797b-91a0-7656-bad1-5ece93e97880",
          "sku": "FIT-MAT-031-DP",
          "title": "Deep Plum",
          "options": {
            "Color": "Deep Plum"
          },
          "price": 48,
          "compare_at_price": 60,
          "stock": 0
        }
      ],
      "total_variants": 2
    },
    "variants": [
      {
        "variant_id": "var_031_fg",
        "id": "019b797b-91a0-75ab-baec-cbce9eb332f5",
        "uuid": "019b797b-91a0-75ab-baec-cbce9eb332f5",
        "sku": "FIT-MAT-031-FG",
        "title": "Forest Green",
        "options": {
          "Color": "Forest Green"
        },
        "price": 48,
        "compare_at_price": 60,
        "stock": 0,
        "in_stock": false
      },
      {
        "variant_id": "var_031_dp",
        "id": "019b797b-91a0-7656-bad1-5ece93e97880",
        "uuid": "019b797b-91a0-7656-bad1-5ece93e97880",
        "sku": "FIT-MAT-031-DP",
        "title": "Deep Plum",
        "options": {
          "Color": "Deep Plum"
        },
        "price": 48,
        "compare_at_price": 60,
        "stock": 0,
        "in_stock": false
      }
    ],
    "options": [
      {
        "name": "Color",
        "values": [
          "Forest Green",
          "Deep Plum"
        ]
      }
    ],
    "warranty": "Simulated 1-Year Synthetic Warranty (Demo Only)",
    "return_policy": "Simulated 30-Day Sandbox Returns (Demo Only)",
    "risk_assessment": "Synthetic Demo Item: Fictional specifications for testing and benchmarking only."
  },
  {
    "id": "019bb6cc-4900-72a5-9fab-c5565b0101f7",
    "slug": "aptdot-adjustable-dumbbell-5-24-kg",
    "title": "Adjustable Dumbbell, 5–24 kg",
    "name": "Adjustable Dumbbell, 5–24 kg",
    "brand": "Aptdot Sample Goods",
    "category": "Health & Fitness",
    "description": "Single adjustable dumbbell that replaces 15 pairs, with a dial selector from 5 to 24 kg. Sold individually.",
    "price": 299,
    "original_price": 349,
    "currency": "USD",
    "rating": 4.3,
    "reviews_count": 307,
    "stock": 88,
    "in_stock": true,
    "image_url": "data:image/svg+xml;utf8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%20600%20450%22%20width%3D%22600%22%20height%3D%22450%22%3E%0A%20%20%3Cdefs%3E%0A%20%20%20%20%3ClinearGradient%20id%3D%22bgGrad%22%20x1%3D%220%25%22%20y1%3D%220%25%22%20x2%3D%22100%25%22%20y2%3D%22100%25%22%3E%0A%20%20%20%20%20%20%3Cstop%20offset%3D%220%25%22%20stop-color%3D%22%230B0F19%22%2F%3E%0A%20%20%20%20%20%20%3Cstop%20offset%3D%22100%25%22%20stop-color%3D%22%23111827%22%2F%3E%0A%20%20%20%20%3C%2FlinearGradient%3E%0A%20%20%20%20%3ClinearGradient%20id%3D%22accentGrad%22%20x1%3D%220%25%22%20y1%3D%220%25%22%20x2%3D%22100%25%22%20y2%3D%220%25%22%3E%0A%20%20%20%20%20%20%3Cstop%20offset%3D%220%25%22%20stop-color%3D%22%2310B981%22%20stop-opacity%3D%220.9%22%2F%3E%0A%20%20%20%20%20%20%3Cstop%20offset%3D%22100%25%22%20stop-color%3D%22%236366F1%22%20stop-opacity%3D%220.9%22%2F%3E%0A%20%20%20%20%3C%2FlinearGradient%3E%0A%20%20%3C%2Fdefs%3E%0A%20%20%3Crect%20width%3D%22600%22%20height%3D%22450%22%20fill%3D%22url(%23bgGrad)%22%2F%3E%0A%20%20%3Crect%20x%3D%2220%22%20y%3D%2220%22%20width%3D%22560%22%20height%3D%22410%22%20rx%3D%2216%22%20fill%3D%22none%22%20stroke%3D%22url(%23accentGrad)%22%20stroke-width%3D%222%22%20stroke-dasharray%3D%226%2C6%22%20opacity%3D%220.6%22%2F%3E%0A%20%20%3Crect%20x%3D%22175%22%20y%3D%2250%22%20width%3D%22250%22%20height%3D%2234%22%20rx%3D%2217%22%20fill%3D%22%23064E3B%22%20stroke%3D%22%2310B981%22%20stroke-width%3D%221.5%22%2F%3E%0A%20%20%3Ctext%20x%3D%22300%22%20y%3D%2272%22%20font-family%3D%22system-ui%2C%20-apple-system%2C%20sans-serif%22%20font-size%3D%2212%22%20font-weight%3D%22700%22%20fill%3D%22%23A7F3D0%22%20text-anchor%3D%22middle%22%20letter-spacing%3D%221.5%22%3EAPTDOT%20SYNTHETIC%20DEMO%3C%2Ftext%3E%0A%20%20%3Crect%20x%3D%22235%22%20y%3D%22125%22%20width%3D%22130%22%20height%3D%22110%22%20rx%3D%2214%22%20fill%3D%22%231F2937%22%20stroke%3D%22%2310B981%22%20stroke-width%3D%222%22%2F%3E%0A%20%20%3Cpath%20d%3D%22M275%20180%20L300%20155%20L325%20180%20L300%20205%20Z%22%20fill%3D%22none%22%20stroke%3D%22%2310B981%22%20stroke-width%3D%223%22%20stroke-linejoin%3D%22round%22%2F%3E%0A%20%20%3Ccircle%20cx%3D%22300%22%20cy%3D%22180%22%20r%3D%227%22%20fill%3D%22%2310B981%22%2F%3E%0A%20%20%3Ctext%20x%3D%22300%22%20y%3D%22280%22%20font-family%3D%22system-ui%2C%20-apple-system%2C%20sans-serif%22%20font-size%3D%2218%22%20font-weight%3D%22600%22%20fill%3D%22%23F9FAFB%22%20text-anchor%3D%22middle%22%3EAdjustable%20Dumbbell%2C%205%E2%80%9324%20kg%3C%2Ftext%3E%0A%20%20%3Ctext%20x%3D%22300%22%20y%3D%22310%22%20font-family%3D%22system-ui%2C%20-apple-system%2C%20sans-serif%22%20font-size%3D%2213%22%20font-weight%3D%22500%22%20fill%3D%22%239CA3AF%22%20text-anchor%3D%22middle%22%3EHealth%20%26amp%3B%20Fitness%20%E2%80%A2%20SKU%3A%20FIT-DUMB-032%3C%2Ftext%3E%0A%20%20%3Crect%20x%3D%22140%22%20y%3D%22360%22%20width%3D%22320%22%20height%3D%2230%22%20rx%3D%228%22%20fill%3D%22%23111827%22%20stroke%3D%22%23374151%22%20stroke-width%3D%221%22%2F%3E%0A%20%20%3Ctext%20x%3D%22300%22%20y%3D%22380%22%20font-family%3D%22system-ui%2C%20-apple-system%2C%20sans-serif%22%20font-size%3D%2211%22%20font-weight%3D%22500%22%20fill%3D%22%236B7280%22%20text-anchor%3D%22middle%22%3ESynthetic%20Specification%20%E2%80%A2%20CC0%201.0%20Universal%3C%2Ftext%3E%0A%3C%2Fsvg%3E",
    "tag": "On Sale",
    "badge_type": "demo",
    "is_demo": true,
    "catalogue_source": "aptdot_synthetic",
    "lifecycle_status": "active",
    "verification_tier": "demo",
    "seller": {
      "name": "Aptdot Sample Goods",
      "verifiedStatus": "Synthetic Demo Catalogue",
      "authorizedPartner": false,
      "rating": 4.3,
      "location": "Synthetic Sandbox",
      "fulfillment": "Simulated Delivery (Non-Commercial)",
      "synthetic_notice": "This item belongs to the Aptdot CC0 Synthetic Benchmark Catalogue. It cannot be purchased for real fulfillment."
    },
    "evidence": {
      "source": "Aptdot Synthetic E-Commerce Product Catalog v1.0.0",
      "license": "CC0-1.0 Universal",
      "sku": "FIT-DUMB-032",
      "dataset_source": "https://www.aptdot.com/datasets/ecommerce-product-catalog/",
      "is_synthetic": true
    },
    "specs": {
      "aptdot_id": "prod_032",
      "sku": "FIT-DUMB-032",
      "product_type": "Health & Fitness > Strength",
      "cost_price": 120,
      "low_stock_threshold": 15,
      "availability": "in_stock",
      "availability_date": null,
      "dimensions": {
        "weight_g": 24000,
        "length_cm": 44,
        "width_cm": 22,
        "height_cm": 24
      },
      "options": [],
      "variants": [
        {
          "variant_id": "var_032_default",
          "uuid": "019bb6cc-4900-7827-b621-8a711c65e97d",
          "sku": "FIT-DUMB-032",
          "title": "Default",
          "options": {},
          "price": 299,
          "compare_at_price": 349,
          "stock": 88
        }
      ],
      "total_variants": 1
    },
    "variants": [
      {
        "variant_id": "var_032_default",
        "id": "019bb6cc-4900-7827-b621-8a711c65e97d",
        "uuid": "019bb6cc-4900-7827-b621-8a711c65e97d",
        "sku": "FIT-DUMB-032",
        "title": "Default",
        "options": {},
        "price": 299,
        "compare_at_price": 349,
        "stock": 88,
        "in_stock": true
      }
    ],
    "options": [],
    "warranty": "Simulated 1-Year Synthetic Warranty (Demo Only)",
    "return_policy": "Simulated 30-Day Sandbox Returns (Demo Only)",
    "risk_assessment": "Synthetic Demo Item: Fictional specifications for testing and benchmarking only."
  },
  {
    "id": "019bf5c6-b8c0-7444-a3e0-f3255a6c263a",
    "slug": "aptdot-high-density-recovery-foam-roller",
    "title": "High-Density Recovery Foam Roller",
    "name": "High-Density Recovery Foam Roller",
    "brand": "Aptdot Sample Goods",
    "category": "Health & Fitness",
    "description": "Firm EVA foam roller with a ridged surface for deep-tissue muscle recovery.",
    "price": 29,
    "original_price": null,
    "currency": "USD",
    "rating": 4,
    "reviews_count": 190,
    "stock": 59,
    "in_stock": true,
    "image_url": "data:image/svg+xml;utf8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%20600%20450%22%20width%3D%22600%22%20height%3D%22450%22%3E%0A%20%20%3Cdefs%3E%0A%20%20%20%20%3ClinearGradient%20id%3D%22bgGrad%22%20x1%3D%220%25%22%20y1%3D%220%25%22%20x2%3D%22100%25%22%20y2%3D%22100%25%22%3E%0A%20%20%20%20%20%20%3Cstop%20offset%3D%220%25%22%20stop-color%3D%22%230B0F19%22%2F%3E%0A%20%20%20%20%20%20%3Cstop%20offset%3D%22100%25%22%20stop-color%3D%22%23111827%22%2F%3E%0A%20%20%20%20%3C%2FlinearGradient%3E%0A%20%20%20%20%3ClinearGradient%20id%3D%22accentGrad%22%20x1%3D%220%25%22%20y1%3D%220%25%22%20x2%3D%22100%25%22%20y2%3D%220%25%22%3E%0A%20%20%20%20%20%20%3Cstop%20offset%3D%220%25%22%20stop-color%3D%22%2310B981%22%20stop-opacity%3D%220.9%22%2F%3E%0A%20%20%20%20%20%20%3Cstop%20offset%3D%22100%25%22%20stop-color%3D%22%236366F1%22%20stop-opacity%3D%220.9%22%2F%3E%0A%20%20%20%20%3C%2FlinearGradient%3E%0A%20%20%3C%2Fdefs%3E%0A%20%20%3Crect%20width%3D%22600%22%20height%3D%22450%22%20fill%3D%22url(%23bgGrad)%22%2F%3E%0A%20%20%3Crect%20x%3D%2220%22%20y%3D%2220%22%20width%3D%22560%22%20height%3D%22410%22%20rx%3D%2216%22%20fill%3D%22none%22%20stroke%3D%22url(%23accentGrad)%22%20stroke-width%3D%222%22%20stroke-dasharray%3D%226%2C6%22%20opacity%3D%220.6%22%2F%3E%0A%20%20%3Crect%20x%3D%22175%22%20y%3D%2250%22%20width%3D%22250%22%20height%3D%2234%22%20rx%3D%2217%22%20fill%3D%22%23064E3B%22%20stroke%3D%22%2310B981%22%20stroke-width%3D%221.5%22%2F%3E%0A%20%20%3Ctext%20x%3D%22300%22%20y%3D%2272%22%20font-family%3D%22system-ui%2C%20-apple-system%2C%20sans-serif%22%20font-size%3D%2212%22%20font-weight%3D%22700%22%20fill%3D%22%23A7F3D0%22%20text-anchor%3D%22middle%22%20letter-spacing%3D%221.5%22%3EAPTDOT%20SYNTHETIC%20DEMO%3C%2Ftext%3E%0A%20%20%3Crect%20x%3D%22235%22%20y%3D%22125%22%20width%3D%22130%22%20height%3D%22110%22%20rx%3D%2214%22%20fill%3D%22%231F2937%22%20stroke%3D%22%2310B981%22%20stroke-width%3D%222%22%2F%3E%0A%20%20%3Cpath%20d%3D%22M275%20180%20L300%20155%20L325%20180%20L300%20205%20Z%22%20fill%3D%22none%22%20stroke%3D%22%2310B981%22%20stroke-width%3D%223%22%20stroke-linejoin%3D%22round%22%2F%3E%0A%20%20%3Ccircle%20cx%3D%22300%22%20cy%3D%22180%22%20r%3D%227%22%20fill%3D%22%2310B981%22%2F%3E%0A%20%20%3Ctext%20x%3D%22300%22%20y%3D%22280%22%20font-family%3D%22system-ui%2C%20-apple-system%2C%20sans-serif%22%20font-size%3D%2218%22%20font-weight%3D%22600%22%20fill%3D%22%23F9FAFB%22%20text-anchor%3D%22middle%22%3EHigh-Density%20Recovery%20Foam%20Roller%3C%2Ftext%3E%0A%20%20%3Ctext%20x%3D%22300%22%20y%3D%22310%22%20font-family%3D%22system-ui%2C%20-apple-system%2C%20sans-serif%22%20font-size%3D%2213%22%20font-weight%3D%22500%22%20fill%3D%22%239CA3AF%22%20text-anchor%3D%22middle%22%3EHealth%20%26amp%3B%20Fitness%20%E2%80%A2%20SKU%3A%20FIT-ROLL-033%3C%2Ftext%3E%0A%20%20%3Crect%20x%3D%22140%22%20y%3D%22360%22%20width%3D%22320%22%20height%3D%2230%22%20rx%3D%228%22%20fill%3D%22%23111827%22%20stroke%3D%22%23374151%22%20stroke-width%3D%221%22%2F%3E%0A%20%20%3Ctext%20x%3D%22300%22%20y%3D%22380%22%20font-family%3D%22system-ui%2C%20-apple-system%2C%20sans-serif%22%20font-size%3D%2211%22%20font-weight%3D%22500%22%20fill%3D%22%236B7280%22%20text-anchor%3D%22middle%22%3ESynthetic%20Specification%20%E2%80%A2%20CC0%201.0%20Universal%3C%2Ftext%3E%0A%3C%2Fsvg%3E",
    "tag": "Synthetic Demo",
    "badge_type": "demo",
    "is_demo": true,
    "catalogue_source": "aptdot_synthetic",
    "lifecycle_status": "active",
    "verification_tier": "demo",
    "seller": {
      "name": "Aptdot Sample Goods",
      "verifiedStatus": "Synthetic Demo Catalogue",
      "authorizedPartner": false,
      "rating": 4,
      "location": "Synthetic Sandbox",
      "fulfillment": "Simulated Delivery (Non-Commercial)",
      "synthetic_notice": "This item belongs to the Aptdot CC0 Synthetic Benchmark Catalogue. It cannot be purchased for real fulfillment."
    },
    "evidence": {
      "source": "Aptdot Synthetic E-Commerce Product Catalog v1.0.0",
      "license": "CC0-1.0 Universal",
      "sku": "FIT-ROLL-033",
      "dataset_source": "https://www.aptdot.com/datasets/ecommerce-product-catalog/",
      "is_synthetic": true
    },
    "specs": {
      "aptdot_id": "prod_033",
      "sku": "FIT-ROLL-033",
      "product_type": "Health & Fitness > Recovery",
      "cost_price": 9,
      "low_stock_threshold": 5,
      "availability": "in_stock",
      "availability_date": null,
      "dimensions": {
        "weight_g": 600,
        "length_cm": 45,
        "width_cm": 15,
        "height_cm": 15
      },
      "options": [
        {
          "name": "Length",
          "values": [
            "45 cm",
            "90 cm"
          ]
        }
      ],
      "variants": [
        {
          "variant_id": "var_033_45cm",
          "uuid": "019bf5c6-b8c0-78f5-94b5-47e0b4758f94",
          "sku": "FIT-ROLL-033-45CM",
          "title": "45 cm",
          "options": {
            "Length": "45 cm"
          },
          "price": 29,
          "compare_at_price": null,
          "stock": 23
        },
        {
          "variant_id": "var_033_90cm",
          "uuid": "019bf5c6-b8c0-7314-9938-b10f7926f23f",
          "sku": "FIT-ROLL-033-90CM",
          "title": "90 cm",
          "options": {
            "Length": "90 cm"
          },
          "price": 39,
          "compare_at_price": null,
          "stock": 36
        }
      ],
      "total_variants": 2
    },
    "variants": [
      {
        "variant_id": "var_033_45cm",
        "id": "019bf5c6-b8c0-78f5-94b5-47e0b4758f94",
        "uuid": "019bf5c6-b8c0-78f5-94b5-47e0b4758f94",
        "sku": "FIT-ROLL-033-45CM",
        "title": "45 cm",
        "options": {
          "Length": "45 cm"
        },
        "price": 29,
        "compare_at_price": null,
        "stock": 23,
        "in_stock": true
      },
      {
        "variant_id": "var_033_90cm",
        "id": "019bf5c6-b8c0-7314-9938-b10f7926f23f",
        "uuid": "019bf5c6-b8c0-7314-9938-b10f7926f23f",
        "sku": "FIT-ROLL-033-90CM",
        "title": "90 cm",
        "options": {
          "Length": "90 cm"
        },
        "price": 39,
        "compare_at_price": null,
        "stock": 36,
        "in_stock": true
      }
    ],
    "options": [
      {
        "name": "Length",
        "values": [
          "45 cm",
          "90 cm"
        ]
      }
    ],
    "warranty": "Simulated 1-Year Synthetic Warranty (Demo Only)",
    "return_policy": "Simulated 30-Day Sandbox Returns (Demo Only)",
    "risk_assessment": "Synthetic Demo Item: Fictional specifications for testing and benchmarking only."
  },
  {
    "id": "019c33a0-c460-733f-90bf-3c1591abdc82",
    "slug": "aptdot-fabric-resistance-bands-set-of-5",
    "title": "Fabric Resistance Bands, Set of 5",
    "name": "Fabric Resistance Bands, Set of 5",
    "brand": "Aptdot Sample Goods",
    "category": "Health & Fitness",
    "description": "Non-slip fabric loop bands in five resistance levels with a mesh carry bag.",
    "price": 24.99,
    "original_price": 29.99,
    "currency": "USD",
    "rating": 4.8,
    "reviews_count": 265,
    "stock": 57,
    "in_stock": true,
    "image_url": "data:image/svg+xml;utf8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%20600%20450%22%20width%3D%22600%22%20height%3D%22450%22%3E%0A%20%20%3Cdefs%3E%0A%20%20%20%20%3ClinearGradient%20id%3D%22bgGrad%22%20x1%3D%220%25%22%20y1%3D%220%25%22%20x2%3D%22100%25%22%20y2%3D%22100%25%22%3E%0A%20%20%20%20%20%20%3Cstop%20offset%3D%220%25%22%20stop-color%3D%22%230B0F19%22%2F%3E%0A%20%20%20%20%20%20%3Cstop%20offset%3D%22100%25%22%20stop-color%3D%22%23111827%22%2F%3E%0A%20%20%20%20%3C%2FlinearGradient%3E%0A%20%20%20%20%3ClinearGradient%20id%3D%22accentGrad%22%20x1%3D%220%25%22%20y1%3D%220%25%22%20x2%3D%22100%25%22%20y2%3D%220%25%22%3E%0A%20%20%20%20%20%20%3Cstop%20offset%3D%220%25%22%20stop-color%3D%22%2310B981%22%20stop-opacity%3D%220.9%22%2F%3E%0A%20%20%20%20%20%20%3Cstop%20offset%3D%22100%25%22%20stop-color%3D%22%236366F1%22%20stop-opacity%3D%220.9%22%2F%3E%0A%20%20%20%20%3C%2FlinearGradient%3E%0A%20%20%3C%2Fdefs%3E%0A%20%20%3Crect%20width%3D%22600%22%20height%3D%22450%22%20fill%3D%22url(%23bgGrad)%22%2F%3E%0A%20%20%3Crect%20x%3D%2220%22%20y%3D%2220%22%20width%3D%22560%22%20height%3D%22410%22%20rx%3D%2216%22%20fill%3D%22none%22%20stroke%3D%22url(%23accentGrad)%22%20stroke-width%3D%222%22%20stroke-dasharray%3D%226%2C6%22%20opacity%3D%220.6%22%2F%3E%0A%20%20%3Crect%20x%3D%22175%22%20y%3D%2250%22%20width%3D%22250%22%20height%3D%2234%22%20rx%3D%2217%22%20fill%3D%22%23064E3B%22%20stroke%3D%22%2310B981%22%20stroke-width%3D%221.5%22%2F%3E%0A%20%20%3Ctext%20x%3D%22300%22%20y%3D%2272%22%20font-family%3D%22system-ui%2C%20-apple-system%2C%20sans-serif%22%20font-size%3D%2212%22%20font-weight%3D%22700%22%20fill%3D%22%23A7F3D0%22%20text-anchor%3D%22middle%22%20letter-spacing%3D%221.5%22%3EAPTDOT%20SYNTHETIC%20DEMO%3C%2Ftext%3E%0A%20%20%3Crect%20x%3D%22235%22%20y%3D%22125%22%20width%3D%22130%22%20height%3D%22110%22%20rx%3D%2214%22%20fill%3D%22%231F2937%22%20stroke%3D%22%2310B981%22%20stroke-width%3D%222%22%2F%3E%0A%20%20%3Cpath%20d%3D%22M275%20180%20L300%20155%20L325%20180%20L300%20205%20Z%22%20fill%3D%22none%22%20stroke%3D%22%2310B981%22%20stroke-width%3D%223%22%20stroke-linejoin%3D%22round%22%2F%3E%0A%20%20%3Ccircle%20cx%3D%22300%22%20cy%3D%22180%22%20r%3D%227%22%20fill%3D%22%2310B981%22%2F%3E%0A%20%20%3Ctext%20x%3D%22300%22%20y%3D%22280%22%20font-family%3D%22system-ui%2C%20-apple-system%2C%20sans-serif%22%20font-size%3D%2218%22%20font-weight%3D%22600%22%20fill%3D%22%23F9FAFB%22%20text-anchor%3D%22middle%22%3EFabric%20Resistance%20Bands%2C%20Set%20of%205%3C%2Ftext%3E%0A%20%20%3Ctext%20x%3D%22300%22%20y%3D%22310%22%20font-family%3D%22system-ui%2C%20-apple-system%2C%20sans-serif%22%20font-size%3D%2213%22%20font-weight%3D%22500%22%20fill%3D%22%239CA3AF%22%20text-anchor%3D%22middle%22%3EHealth%20%26amp%3B%20Fitness%20%E2%80%A2%20SKU%3A%20FIT-BAND-034%3C%2Ftext%3E%0A%20%20%3Crect%20x%3D%22140%22%20y%3D%22360%22%20width%3D%22320%22%20height%3D%2230%22%20rx%3D%228%22%20fill%3D%22%23111827%22%20stroke%3D%22%23374151%22%20stroke-width%3D%221%22%2F%3E%0A%20%20%3Ctext%20x%3D%22300%22%20y%3D%22380%22%20font-family%3D%22system-ui%2C%20-apple-system%2C%20sans-serif%22%20font-size%3D%2211%22%20font-weight%3D%22500%22%20fill%3D%22%236B7280%22%20text-anchor%3D%22middle%22%3ESynthetic%20Specification%20%E2%80%A2%20CC0%201.0%20Universal%3C%2Ftext%3E%0A%3C%2Fsvg%3E",
    "tag": "On Sale",
    "badge_type": "demo",
    "is_demo": true,
    "catalogue_source": "aptdot_synthetic",
    "lifecycle_status": "active",
    "verification_tier": "demo",
    "seller": {
      "name": "Aptdot Sample Goods",
      "verifiedStatus": "Synthetic Demo Catalogue",
      "authorizedPartner": false,
      "rating": 4.8,
      "location": "Synthetic Sandbox",
      "fulfillment": "Simulated Delivery (Non-Commercial)",
      "synthetic_notice": "This item belongs to the Aptdot CC0 Synthetic Benchmark Catalogue. It cannot be purchased for real fulfillment."
    },
    "evidence": {
      "source": "Aptdot Synthetic E-Commerce Product Catalog v1.0.0",
      "license": "CC0-1.0 Universal",
      "sku": "FIT-BAND-034",
      "dataset_source": "https://www.aptdot.com/datasets/ecommerce-product-catalog/",
      "is_synthetic": true
    },
    "specs": {
      "aptdot_id": "prod_034",
      "sku": "FIT-BAND-034",
      "product_type": "Health & Fitness > Strength",
      "cost_price": 6,
      "low_stock_threshold": 8,
      "availability": "in_stock",
      "availability_date": null,
      "dimensions": {
        "weight_g": 280,
        "length_cm": 20,
        "width_cm": 15,
        "height_cm": 5
      },
      "options": [],
      "variants": [
        {
          "variant_id": "var_034_default",
          "uuid": "019c33a0-c460-7d96-8cb5-aa1cd15fbaa2",
          "sku": "FIT-BAND-034",
          "title": "Default",
          "options": {},
          "price": 24.99,
          "compare_at_price": 29.99,
          "stock": 57
        }
      ],
      "total_variants": 1
    },
    "variants": [
      {
        "variant_id": "var_034_default",
        "id": "019c33a0-c460-7d96-8cb5-aa1cd15fbaa2",
        "uuid": "019c33a0-c460-7d96-8cb5-aa1cd15fbaa2",
        "sku": "FIT-BAND-034",
        "title": "Default",
        "options": {},
        "price": 24.99,
        "compare_at_price": 29.99,
        "stock": 57,
        "in_stock": true
      }
    ],
    "options": [],
    "warranty": "Simulated 1-Year Synthetic Warranty (Demo Only)",
    "return_policy": "Simulated 30-Day Sandbox Returns (Demo Only)",
    "risk_assessment": "Synthetic Demo Item: Fictional specifications for testing and benchmarking only."
  },
  {
    "id": "019c7151-9d20-7b42-a893-9880593105a2",
    "slug": "aptdot-insulated-stainless-steel-water-bottle",
    "title": "Insulated Stainless Steel Water Bottle",
    "name": "Insulated Stainless Steel Water Bottle",
    "brand": "Aptdot Sample Goods",
    "category": "Health & Fitness",
    "description": "Double-wall vacuum-insulated bottle that keeps drinks cold for 24 hours and hot for 12.",
    "price": 32,
    "original_price": null,
    "currency": "USD",
    "rating": 4.4,
    "reviews_count": 71,
    "stock": 63,
    "in_stock": true,
    "image_url": "data:image/svg+xml;utf8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%20600%20450%22%20width%3D%22600%22%20height%3D%22450%22%3E%0A%20%20%3Cdefs%3E%0A%20%20%20%20%3ClinearGradient%20id%3D%22bgGrad%22%20x1%3D%220%25%22%20y1%3D%220%25%22%20x2%3D%22100%25%22%20y2%3D%22100%25%22%3E%0A%20%20%20%20%20%20%3Cstop%20offset%3D%220%25%22%20stop-color%3D%22%230B0F19%22%2F%3E%0A%20%20%20%20%20%20%3Cstop%20offset%3D%22100%25%22%20stop-color%3D%22%23111827%22%2F%3E%0A%20%20%20%20%3C%2FlinearGradient%3E%0A%20%20%20%20%3ClinearGradient%20id%3D%22accentGrad%22%20x1%3D%220%25%22%20y1%3D%220%25%22%20x2%3D%22100%25%22%20y2%3D%220%25%22%3E%0A%20%20%20%20%20%20%3Cstop%20offset%3D%220%25%22%20stop-color%3D%22%2310B981%22%20stop-opacity%3D%220.9%22%2F%3E%0A%20%20%20%20%20%20%3Cstop%20offset%3D%22100%25%22%20stop-color%3D%22%236366F1%22%20stop-opacity%3D%220.9%22%2F%3E%0A%20%20%20%20%3C%2FlinearGradient%3E%0A%20%20%3C%2Fdefs%3E%0A%20%20%3Crect%20width%3D%22600%22%20height%3D%22450%22%20fill%3D%22url(%23bgGrad)%22%2F%3E%0A%20%20%3Crect%20x%3D%2220%22%20y%3D%2220%22%20width%3D%22560%22%20height%3D%22410%22%20rx%3D%2216%22%20fill%3D%22none%22%20stroke%3D%22url(%23accentGrad)%22%20stroke-width%3D%222%22%20stroke-dasharray%3D%226%2C6%22%20opacity%3D%220.6%22%2F%3E%0A%20%20%3Crect%20x%3D%22175%22%20y%3D%2250%22%20width%3D%22250%22%20height%3D%2234%22%20rx%3D%2217%22%20fill%3D%22%23064E3B%22%20stroke%3D%22%2310B981%22%20stroke-width%3D%221.5%22%2F%3E%0A%20%20%3Ctext%20x%3D%22300%22%20y%3D%2272%22%20font-family%3D%22system-ui%2C%20-apple-system%2C%20sans-serif%22%20font-size%3D%2212%22%20font-weight%3D%22700%22%20fill%3D%22%23A7F3D0%22%20text-anchor%3D%22middle%22%20letter-spacing%3D%221.5%22%3EAPTDOT%20SYNTHETIC%20DEMO%3C%2Ftext%3E%0A%20%20%3Crect%20x%3D%22235%22%20y%3D%22125%22%20width%3D%22130%22%20height%3D%22110%22%20rx%3D%2214%22%20fill%3D%22%231F2937%22%20stroke%3D%22%2310B981%22%20stroke-width%3D%222%22%2F%3E%0A%20%20%3Cpath%20d%3D%22M275%20180%20L300%20155%20L325%20180%20L300%20205%20Z%22%20fill%3D%22none%22%20stroke%3D%22%2310B981%22%20stroke-width%3D%223%22%20stroke-linejoin%3D%22round%22%2F%3E%0A%20%20%3Ccircle%20cx%3D%22300%22%20cy%3D%22180%22%20r%3D%227%22%20fill%3D%22%2310B981%22%2F%3E%0A%20%20%3Ctext%20x%3D%22300%22%20y%3D%22280%22%20font-family%3D%22system-ui%2C%20-apple-system%2C%20sans-serif%22%20font-size%3D%2218%22%20font-weight%3D%22600%22%20fill%3D%22%23F9FAFB%22%20text-anchor%3D%22middle%22%3EInsulated%20Stainless%20Steel%20Water%20...%3C%2Ftext%3E%0A%20%20%3Ctext%20x%3D%22300%22%20y%3D%22310%22%20font-family%3D%22system-ui%2C%20-apple-system%2C%20sans-serif%22%20font-size%3D%2213%22%20font-weight%3D%22500%22%20fill%3D%22%239CA3AF%22%20text-anchor%3D%22middle%22%3EHealth%20%26amp%3B%20Fitness%20%E2%80%A2%20SKU%3A%20FIT-BOTL-035%3C%2Ftext%3E%0A%20%20%3Crect%20x%3D%22140%22%20y%3D%22360%22%20width%3D%22320%22%20height%3D%2230%22%20rx%3D%228%22%20fill%3D%22%23111827%22%20stroke%3D%22%23374151%22%20stroke-width%3D%221%22%2F%3E%0A%20%20%3Ctext%20x%3D%22300%22%20y%3D%22380%22%20font-family%3D%22system-ui%2C%20-apple-system%2C%20sans-serif%22%20font-size%3D%2211%22%20font-weight%3D%22500%22%20fill%3D%22%236B7280%22%20text-anchor%3D%22middle%22%3ESynthetic%20Specification%20%E2%80%A2%20CC0%201.0%20Universal%3C%2Ftext%3E%0A%3C%2Fsvg%3E",
    "tag": "Synthetic Demo",
    "badge_type": "demo",
    "is_demo": true,
    "catalogue_source": "aptdot_synthetic",
    "lifecycle_status": "active",
    "verification_tier": "demo",
    "seller": {
      "name": "Aptdot Sample Goods",
      "verifiedStatus": "Synthetic Demo Catalogue",
      "authorizedPartner": false,
      "rating": 4.4,
      "location": "Synthetic Sandbox",
      "fulfillment": "Simulated Delivery (Non-Commercial)",
      "synthetic_notice": "This item belongs to the Aptdot CC0 Synthetic Benchmark Catalogue. It cannot be purchased for real fulfillment."
    },
    "evidence": {
      "source": "Aptdot Synthetic E-Commerce Product Catalog v1.0.0",
      "license": "CC0-1.0 Universal",
      "sku": "FIT-BOTL-035",
      "dataset_source": "https://www.aptdot.com/datasets/ecommerce-product-catalog/",
      "is_synthetic": true
    },
    "specs": {
      "aptdot_id": "prod_035",
      "sku": "FIT-BOTL-035",
      "product_type": "Health & Fitness > Hydration",
      "cost_price": 9.5,
      "low_stock_threshold": 10,
      "availability": "in_stock",
      "availability_date": null,
      "dimensions": {
        "weight_g": 390,
        "length_cm": 8,
        "width_cm": 8,
        "height_cm": 27
      },
      "options": [
        {
          "name": "Capacity",
          "values": [
            "500 ml",
            "750 ml",
            "1 L"
          ]
        },
        {
          "name": "Color",
          "values": [
            "Black",
            "Glacier White"
          ]
        }
      ],
      "variants": [
        {
          "variant_id": "var_035_500ml_bla",
          "uuid": "019c7151-9d20-7089-a8ee-e8c865e0b156",
          "sku": "FIT-BOTL-035-500ML-BLA",
          "title": "500 ml / Black",
          "options": {
            "Capacity": "500 ml",
            "Color": "Black"
          },
          "price": 32,
          "compare_at_price": null,
          "stock": 0
        },
        {
          "variant_id": "var_035_500ml_gw",
          "uuid": "019c7151-9d20-7f63-9b08-d9ff45758987",
          "sku": "FIT-BOTL-035-500ML-GW",
          "title": "500 ml / Glacier White",
          "options": {
            "Capacity": "500 ml",
            "Color": "Glacier White"
          },
          "price": 32,
          "compare_at_price": null,
          "stock": 11
        },
        {
          "variant_id": "var_035_750ml_bla",
          "uuid": "019c7151-9d20-7cdc-892d-322fe9080fef",
          "sku": "FIT-BOTL-035-750ML-BLA",
          "title": "750 ml / Black",
          "options": {
            "Capacity": "750 ml",
            "Color": "Black"
          },
          "price": 36,
          "compare_at_price": null,
          "stock": 9
        },
        {
          "variant_id": "var_035_750ml_gw",
          "uuid": "019c7151-9d20-78fe-8291-5715b157749d",
          "sku": "FIT-BOTL-035-750ML-GW",
          "title": "750 ml / Glacier White",
          "options": {
            "Capacity": "750 ml",
            "Color": "Glacier White"
          },
          "price": 36,
          "compare_at_price": null,
          "stock": 16
        },
        {
          "variant_id": "var_035_1l_bla",
          "uuid": "019c7151-9d20-7945-9ecf-5ff001fecbdf",
          "sku": "FIT-BOTL-035-1L-BLA",
          "title": "1 L / Black",
          "options": {
            "Capacity": "1 L",
            "Color": "Black"
          },
          "price": 40,
          "compare_at_price": null,
          "stock": 7
        },
        {
          "variant_id": "var_035_1l_gw",
          "uuid": "019c7151-9d20-76f2-91f3-342c24f886a9",
          "sku": "FIT-BOTL-035-1L-GW",
          "title": "1 L / Glacier White",
          "options": {
            "Capacity": "1 L",
            "Color": "Glacier White"
          },
          "price": 40,
          "compare_at_price": null,
          "stock": 20
        }
      ],
      "total_variants": 6
    },
    "variants": [
      {
        "variant_id": "var_035_500ml_bla",
        "id": "019c7151-9d20-7089-a8ee-e8c865e0b156",
        "uuid": "019c7151-9d20-7089-a8ee-e8c865e0b156",
        "sku": "FIT-BOTL-035-500ML-BLA",
        "title": "500 ml / Black",
        "options": {
          "Capacity": "500 ml",
          "Color": "Black"
        },
        "price": 32,
        "compare_at_price": null,
        "stock": 0,
        "in_stock": false
      },
      {
        "variant_id": "var_035_500ml_gw",
        "id": "019c7151-9d20-7f63-9b08-d9ff45758987",
        "uuid": "019c7151-9d20-7f63-9b08-d9ff45758987",
        "sku": "FIT-BOTL-035-500ML-GW",
        "title": "500 ml / Glacier White",
        "options": {
          "Capacity": "500 ml",
          "Color": "Glacier White"
        },
        "price": 32,
        "compare_at_price": null,
        "stock": 11,
        "in_stock": true
      },
      {
        "variant_id": "var_035_750ml_bla",
        "id": "019c7151-9d20-7cdc-892d-322fe9080fef",
        "uuid": "019c7151-9d20-7cdc-892d-322fe9080fef",
        "sku": "FIT-BOTL-035-750ML-BLA",
        "title": "750 ml / Black",
        "options": {
          "Capacity": "750 ml",
          "Color": "Black"
        },
        "price": 36,
        "compare_at_price": null,
        "stock": 9,
        "in_stock": true
      },
      {
        "variant_id": "var_035_750ml_gw",
        "id": "019c7151-9d20-78fe-8291-5715b157749d",
        "uuid": "019c7151-9d20-78fe-8291-5715b157749d",
        "sku": "FIT-BOTL-035-750ML-GW",
        "title": "750 ml / Glacier White",
        "options": {
          "Capacity": "750 ml",
          "Color": "Glacier White"
        },
        "price": 36,
        "compare_at_price": null,
        "stock": 16,
        "in_stock": true
      },
      {
        "variant_id": "var_035_1l_bla",
        "id": "019c7151-9d20-7945-9ecf-5ff001fecbdf",
        "uuid": "019c7151-9d20-7945-9ecf-5ff001fecbdf",
        "sku": "FIT-BOTL-035-1L-BLA",
        "title": "1 L / Black",
        "options": {
          "Capacity": "1 L",
          "Color": "Black"
        },
        "price": 40,
        "compare_at_price": null,
        "stock": 7,
        "in_stock": true
      },
      {
        "variant_id": "var_035_1l_gw",
        "id": "019c7151-9d20-76f2-91f3-342c24f886a9",
        "uuid": "019c7151-9d20-76f2-91f3-342c24f886a9",
        "sku": "FIT-BOTL-035-1L-GW",
        "title": "1 L / Glacier White",
        "options": {
          "Capacity": "1 L",
          "Color": "Glacier White"
        },
        "price": 40,
        "compare_at_price": null,
        "stock": 20,
        "in_stock": true
      }
    ],
    "options": [
      {
        "name": "Capacity",
        "values": [
          "500 ml",
          "750 ml",
          "1 L"
        ]
      },
      {
        "name": "Color",
        "values": [
          "Black",
          "Glacier White"
        ]
      }
    ],
    "warranty": "Simulated 1-Year Synthetic Warranty (Demo Only)",
    "return_policy": "Simulated 30-Day Sandbox Returns (Demo Only)",
    "risk_assessment": "Synthetic Demo Item: Fictional specifications for testing and benchmarking only."
  },
  {
    "id": "019caf1d-ed20-7389-823b-96f285df2e15",
    "slug": "aptdot-weighted-speed-jump-rope",
    "title": "Weighted Speed Jump Rope",
    "name": "Weighted Speed Jump Rope",
    "brand": "Aptdot Sample Goods",
    "category": "Health & Fitness",
    "description": "Ball-bearing jump rope with a removable 250 g handle weight and adjustable steel cable.",
    "price": 19,
    "original_price": null,
    "currency": "USD",
    "rating": 4.6,
    "reviews_count": 261,
    "stock": 7,
    "in_stock": true,
    "image_url": "data:image/svg+xml;utf8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%20600%20450%22%20width%3D%22600%22%20height%3D%22450%22%3E%0A%20%20%3Cdefs%3E%0A%20%20%20%20%3ClinearGradient%20id%3D%22bgGrad%22%20x1%3D%220%25%22%20y1%3D%220%25%22%20x2%3D%22100%25%22%20y2%3D%22100%25%22%3E%0A%20%20%20%20%20%20%3Cstop%20offset%3D%220%25%22%20stop-color%3D%22%230B0F19%22%2F%3E%0A%20%20%20%20%20%20%3Cstop%20offset%3D%22100%25%22%20stop-color%3D%22%23111827%22%2F%3E%0A%20%20%20%20%3C%2FlinearGradient%3E%0A%20%20%20%20%3ClinearGradient%20id%3D%22accentGrad%22%20x1%3D%220%25%22%20y1%3D%220%25%22%20x2%3D%22100%25%22%20y2%3D%220%25%22%3E%0A%20%20%20%20%20%20%3Cstop%20offset%3D%220%25%22%20stop-color%3D%22%2310B981%22%20stop-opacity%3D%220.9%22%2F%3E%0A%20%20%20%20%20%20%3Cstop%20offset%3D%22100%25%22%20stop-color%3D%22%236366F1%22%20stop-opacity%3D%220.9%22%2F%3E%0A%20%20%20%20%3C%2FlinearGradient%3E%0A%20%20%3C%2Fdefs%3E%0A%20%20%3Crect%20width%3D%22600%22%20height%3D%22450%22%20fill%3D%22url(%23bgGrad)%22%2F%3E%0A%20%20%3Crect%20x%3D%2220%22%20y%3D%2220%22%20width%3D%22560%22%20height%3D%22410%22%20rx%3D%2216%22%20fill%3D%22none%22%20stroke%3D%22url(%23accentGrad)%22%20stroke-width%3D%222%22%20stroke-dasharray%3D%226%2C6%22%20opacity%3D%220.6%22%2F%3E%0A%20%20%3Crect%20x%3D%22175%22%20y%3D%2250%22%20width%3D%22250%22%20height%3D%2234%22%20rx%3D%2217%22%20fill%3D%22%23064E3B%22%20stroke%3D%22%2310B981%22%20stroke-width%3D%221.5%22%2F%3E%0A%20%20%3Ctext%20x%3D%22300%22%20y%3D%2272%22%20font-family%3D%22system-ui%2C%20-apple-system%2C%20sans-serif%22%20font-size%3D%2212%22%20font-weight%3D%22700%22%20fill%3D%22%23A7F3D0%22%20text-anchor%3D%22middle%22%20letter-spacing%3D%221.5%22%3EAPTDOT%20SYNTHETIC%20DEMO%3C%2Ftext%3E%0A%20%20%3Crect%20x%3D%22235%22%20y%3D%22125%22%20width%3D%22130%22%20height%3D%22110%22%20rx%3D%2214%22%20fill%3D%22%231F2937%22%20stroke%3D%22%2310B981%22%20stroke-width%3D%222%22%2F%3E%0A%20%20%3Cpath%20d%3D%22M275%20180%20L300%20155%20L325%20180%20L300%20205%20Z%22%20fill%3D%22none%22%20stroke%3D%22%2310B981%22%20stroke-width%3D%223%22%20stroke-linejoin%3D%22round%22%2F%3E%0A%20%20%3Ccircle%20cx%3D%22300%22%20cy%3D%22180%22%20r%3D%227%22%20fill%3D%22%2310B981%22%2F%3E%0A%20%20%3Ctext%20x%3D%22300%22%20y%3D%22280%22%20font-family%3D%22system-ui%2C%20-apple-system%2C%20sans-serif%22%20font-size%3D%2218%22%20font-weight%3D%22600%22%20fill%3D%22%23F9FAFB%22%20text-anchor%3D%22middle%22%3EWeighted%20Speed%20Jump%20Rope%3C%2Ftext%3E%0A%20%20%3Ctext%20x%3D%22300%22%20y%3D%22310%22%20font-family%3D%22system-ui%2C%20-apple-system%2C%20sans-serif%22%20font-size%3D%2213%22%20font-weight%3D%22500%22%20fill%3D%22%239CA3AF%22%20text-anchor%3D%22middle%22%3EHealth%20%26amp%3B%20Fitness%20%E2%80%A2%20SKU%3A%20FIT-ROPE-036%3C%2Ftext%3E%0A%20%20%3Crect%20x%3D%22140%22%20y%3D%22360%22%20width%3D%22320%22%20height%3D%2230%22%20rx%3D%228%22%20fill%3D%22%23111827%22%20stroke%3D%22%23374151%22%20stroke-width%3D%221%22%2F%3E%0A%20%20%3Ctext%20x%3D%22300%22%20y%3D%22380%22%20font-family%3D%22system-ui%2C%20-apple-system%2C%20sans-serif%22%20font-size%3D%2211%22%20font-weight%3D%22500%22%20fill%3D%22%236B7280%22%20text-anchor%3D%22middle%22%3ESynthetic%20Specification%20%E2%80%A2%20CC0%201.0%20Universal%3C%2Ftext%3E%0A%3C%2Fsvg%3E",
    "tag": "Only 7 Left",
    "badge_type": "demo",
    "is_demo": true,
    "catalogue_source": "aptdot_synthetic",
    "lifecycle_status": "active",
    "verification_tier": "demo",
    "seller": {
      "name": "Aptdot Sample Goods",
      "verifiedStatus": "Synthetic Demo Catalogue",
      "authorizedPartner": false,
      "rating": 4.6,
      "location": "Synthetic Sandbox",
      "fulfillment": "Simulated Delivery (Non-Commercial)",
      "synthetic_notice": "This item belongs to the Aptdot CC0 Synthetic Benchmark Catalogue. It cannot be purchased for real fulfillment."
    },
    "evidence": {
      "source": "Aptdot Synthetic E-Commerce Product Catalog v1.0.0",
      "license": "CC0-1.0 Universal",
      "sku": "FIT-ROPE-036",
      "dataset_source": "https://www.aptdot.com/datasets/ecommerce-product-catalog/",
      "is_synthetic": true
    },
    "specs": {
      "aptdot_id": "prod_036",
      "sku": "FIT-ROPE-036",
      "product_type": "Health & Fitness > Cardio",
      "cost_price": 5,
      "low_stock_threshold": 25,
      "availability": "in_stock",
      "availability_date": null,
      "dimensions": {
        "weight_g": 450,
        "length_cm": 20,
        "width_cm": 12,
        "height_cm": 6
      },
      "options": [],
      "variants": [
        {
          "variant_id": "var_036_default",
          "uuid": "019caf1d-ed20-725b-88bd-13f0093f4aff",
          "sku": "FIT-ROPE-036",
          "title": "Default",
          "options": {},
          "price": 19,
          "compare_at_price": null,
          "stock": 7
        }
      ],
      "total_variants": 1
    },
    "variants": [
      {
        "variant_id": "var_036_default",
        "id": "019caf1d-ed20-725b-88bd-13f0093f4aff",
        "uuid": "019caf1d-ed20-725b-88bd-13f0093f4aff",
        "sku": "FIT-ROPE-036",
        "title": "Default",
        "options": {},
        "price": 19,
        "compare_at_price": null,
        "stock": 7,
        "in_stock": true
      }
    ],
    "options": [],
    "warranty": "Simulated 1-Year Synthetic Warranty (Demo Only)",
    "return_policy": "Simulated 30-Day Sandbox Returns (Demo Only)",
    "risk_assessment": "Synthetic Demo Item: Fictional specifications for testing and benchmarking only."
  },
  {
    "id": "019cebbc-1d60-778d-8b4a-750e07b82d7a",
    "slug": "aptdot-cast-iron-kettlebell",
    "title": "Cast Iron Kettlebell",
    "name": "Cast Iron Kettlebell",
    "brand": "Aptdot Sample Goods",
    "category": "Health & Fitness",
    "description": "Single-piece cast iron kettlebell with a wide handle and flat base.",
    "price": 49,
    "original_price": null,
    "currency": "USD",
    "rating": 3.8,
    "reviews_count": 266,
    "stock": 74,
    "in_stock": true,
    "image_url": "data:image/svg+xml;utf8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%20600%20450%22%20width%3D%22600%22%20height%3D%22450%22%3E%0A%20%20%3Cdefs%3E%0A%20%20%20%20%3ClinearGradient%20id%3D%22bgGrad%22%20x1%3D%220%25%22%20y1%3D%220%25%22%20x2%3D%22100%25%22%20y2%3D%22100%25%22%3E%0A%20%20%20%20%20%20%3Cstop%20offset%3D%220%25%22%20stop-color%3D%22%230B0F19%22%2F%3E%0A%20%20%20%20%20%20%3Cstop%20offset%3D%22100%25%22%20stop-color%3D%22%23111827%22%2F%3E%0A%20%20%20%20%3C%2FlinearGradient%3E%0A%20%20%20%20%3ClinearGradient%20id%3D%22accentGrad%22%20x1%3D%220%25%22%20y1%3D%220%25%22%20x2%3D%22100%25%22%20y2%3D%220%25%22%3E%0A%20%20%20%20%20%20%3Cstop%20offset%3D%220%25%22%20stop-color%3D%22%2310B981%22%20stop-opacity%3D%220.9%22%2F%3E%0A%20%20%20%20%20%20%3Cstop%20offset%3D%22100%25%22%20stop-color%3D%22%236366F1%22%20stop-opacity%3D%220.9%22%2F%3E%0A%20%20%20%20%3C%2FlinearGradient%3E%0A%20%20%3C%2Fdefs%3E%0A%20%20%3Crect%20width%3D%22600%22%20height%3D%22450%22%20fill%3D%22url(%23bgGrad)%22%2F%3E%0A%20%20%3Crect%20x%3D%2220%22%20y%3D%2220%22%20width%3D%22560%22%20height%3D%22410%22%20rx%3D%2216%22%20fill%3D%22none%22%20stroke%3D%22url(%23accentGrad)%22%20stroke-width%3D%222%22%20stroke-dasharray%3D%226%2C6%22%20opacity%3D%220.6%22%2F%3E%0A%20%20%3Crect%20x%3D%22175%22%20y%3D%2250%22%20width%3D%22250%22%20height%3D%2234%22%20rx%3D%2217%22%20fill%3D%22%23064E3B%22%20stroke%3D%22%2310B981%22%20stroke-width%3D%221.5%22%2F%3E%0A%20%20%3Ctext%20x%3D%22300%22%20y%3D%2272%22%20font-family%3D%22system-ui%2C%20-apple-system%2C%20sans-serif%22%20font-size%3D%2212%22%20font-weight%3D%22700%22%20fill%3D%22%23A7F3D0%22%20text-anchor%3D%22middle%22%20letter-spacing%3D%221.5%22%3EAPTDOT%20SYNTHETIC%20DEMO%3C%2Ftext%3E%0A%20%20%3Crect%20x%3D%22235%22%20y%3D%22125%22%20width%3D%22130%22%20height%3D%22110%22%20rx%3D%2214%22%20fill%3D%22%231F2937%22%20stroke%3D%22%2310B981%22%20stroke-width%3D%222%22%2F%3E%0A%20%20%3Cpath%20d%3D%22M275%20180%20L300%20155%20L325%20180%20L300%20205%20Z%22%20fill%3D%22none%22%20stroke%3D%22%2310B981%22%20stroke-width%3D%223%22%20stroke-linejoin%3D%22round%22%2F%3E%0A%20%20%3Ccircle%20cx%3D%22300%22%20cy%3D%22180%22%20r%3D%227%22%20fill%3D%22%2310B981%22%2F%3E%0A%20%20%3Ctext%20x%3D%22300%22%20y%3D%22280%22%20font-family%3D%22system-ui%2C%20-apple-system%2C%20sans-serif%22%20font-size%3D%2218%22%20font-weight%3D%22600%22%20fill%3D%22%23F9FAFB%22%20text-anchor%3D%22middle%22%3ECast%20Iron%20Kettlebell%3C%2Ftext%3E%0A%20%20%3Ctext%20x%3D%22300%22%20y%3D%22310%22%20font-family%3D%22system-ui%2C%20-apple-system%2C%20sans-serif%22%20font-size%3D%2213%22%20font-weight%3D%22500%22%20fill%3D%22%239CA3AF%22%20text-anchor%3D%22middle%22%3EHealth%20%26amp%3B%20Fitness%20%E2%80%A2%20SKU%3A%20FIT-KTBL-037%3C%2Ftext%3E%0A%20%20%3Crect%20x%3D%22140%22%20y%3D%22360%22%20width%3D%22320%22%20height%3D%2230%22%20rx%3D%228%22%20fill%3D%22%23111827%22%20stroke%3D%22%23374151%22%20stroke-width%3D%221%22%2F%3E%0A%20%20%3Ctext%20x%3D%22300%22%20y%3D%22380%22%20font-family%3D%22system-ui%2C%20-apple-system%2C%20sans-serif%22%20font-size%3D%2211%22%20font-weight%3D%22500%22%20fill%3D%22%236B7280%22%20text-anchor%3D%22middle%22%3ESynthetic%20Specification%20%E2%80%A2%20CC0%201.0%20Universal%3C%2Ftext%3E%0A%3C%2Fsvg%3E",
    "tag": "Synthetic Demo",
    "badge_type": "demo",
    "is_demo": true,
    "catalogue_source": "aptdot_synthetic",
    "lifecycle_status": "active",
    "verification_tier": "demo",
    "seller": {
      "name": "Aptdot Sample Goods",
      "verifiedStatus": "Synthetic Demo Catalogue",
      "authorizedPartner": false,
      "rating": 3.8,
      "location": "Synthetic Sandbox",
      "fulfillment": "Simulated Delivery (Non-Commercial)",
      "synthetic_notice": "This item belongs to the Aptdot CC0 Synthetic Benchmark Catalogue. It cannot be purchased for real fulfillment."
    },
    "evidence": {
      "source": "Aptdot Synthetic E-Commerce Product Catalog v1.0.0",
      "license": "CC0-1.0 Universal",
      "sku": "FIT-KTBL-037",
      "dataset_source": "https://www.aptdot.com/datasets/ecommerce-product-catalog/",
      "is_synthetic": true
    },
    "specs": {
      "aptdot_id": "prod_037",
      "sku": "FIT-KTBL-037",
      "product_type": "Health & Fitness > Strength",
      "cost_price": 18,
      "low_stock_threshold": 20,
      "availability": "in_stock",
      "availability_date": null,
      "dimensions": {
        "weight_g": 8000,
        "length_cm": 22,
        "width_cm": 19,
        "height_cm": 28
      },
      "options": [
        {
          "name": "Weight",
          "values": [
            "8 kg",
            "12 kg",
            "16 kg"
          ]
        }
      ],
      "variants": [
        {
          "variant_id": "var_037_8kg",
          "uuid": "019cebbc-1d60-7ff0-9f2d-eb501fc123cc",
          "sku": "FIT-KTBL-037-8KG",
          "title": "8 kg",
          "options": {
            "Weight": "8 kg"
          },
          "price": 49,
          "compare_at_price": null,
          "stock": 38
        },
        {
          "variant_id": "var_037_12kg",
          "uuid": "019cebbc-1d60-7cf7-9305-a3650bf6caae",
          "sku": "FIT-KTBL-037-12KG",
          "title": "12 kg",
          "options": {
            "Weight": "12 kg"
          },
          "price": 64,
          "compare_at_price": null,
          "stock": 11
        },
        {
          "variant_id": "var_037_16kg",
          "uuid": "019cebbc-1d60-781c-ac96-8f073b912593",
          "sku": "FIT-KTBL-037-16KG",
          "title": "16 kg",
          "options": {
            "Weight": "16 kg"
          },
          "price": 79,
          "compare_at_price": null,
          "stock": 25
        }
      ],
      "total_variants": 3
    },
    "variants": [
      {
        "variant_id": "var_037_8kg",
        "id": "019cebbc-1d60-7ff0-9f2d-eb501fc123cc",
        "uuid": "019cebbc-1d60-7ff0-9f2d-eb501fc123cc",
        "sku": "FIT-KTBL-037-8KG",
        "title": "8 kg",
        "options": {
          "Weight": "8 kg"
        },
        "price": 49,
        "compare_at_price": null,
        "stock": 38,
        "in_stock": true
      },
      {
        "variant_id": "var_037_12kg",
        "id": "019cebbc-1d60-7cf7-9305-a3650bf6caae",
        "uuid": "019cebbc-1d60-7cf7-9305-a3650bf6caae",
        "sku": "FIT-KTBL-037-12KG",
        "title": "12 kg",
        "options": {
          "Weight": "12 kg"
        },
        "price": 64,
        "compare_at_price": null,
        "stock": 11,
        "in_stock": true
      },
      {
        "variant_id": "var_037_16kg",
        "id": "019cebbc-1d60-781c-ac96-8f073b912593",
        "uuid": "019cebbc-1d60-781c-ac96-8f073b912593",
        "sku": "FIT-KTBL-037-16KG",
        "title": "16 kg",
        "options": {
          "Weight": "16 kg"
        },
        "price": 79,
        "compare_at_price": null,
        "stock": 25,
        "in_stock": true
      }
    ],
    "options": [
      {
        "name": "Weight",
        "values": [
          "8 kg",
          "12 kg",
          "16 kg"
        ]
      }
    ],
    "warranty": "Simulated 1-Year Synthetic Warranty (Demo Only)",
    "return_policy": "Simulated 30-Day Sandbox Returns (Demo Only)",
    "risk_assessment": "Synthetic Demo Item: Fictional specifications for testing and benchmarking only."
  },
  {
    "id": "019d2a3a-f480-7a5c-8e46-aa3f54b22d6f",
    "slug": "aptdot-cork-yoga-block-set-of-2",
    "title": "Cork Yoga Block, Set of 2",
    "name": "Cork Yoga Block, Set of 2",
    "brand": "Aptdot Sample Goods",
    "category": "Health & Fitness",
    "description": "Natural cork blocks, 23 x 15 x 7.5 cm, for support and alignment.",
    "price": 22,
    "original_price": null,
    "currency": "USD",
    "rating": 4.2,
    "reviews_count": 303,
    "stock": 98,
    "in_stock": true,
    "image_url": "data:image/svg+xml;utf8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%20600%20450%22%20width%3D%22600%22%20height%3D%22450%22%3E%0A%20%20%3Cdefs%3E%0A%20%20%20%20%3ClinearGradient%20id%3D%22bgGrad%22%20x1%3D%220%25%22%20y1%3D%220%25%22%20x2%3D%22100%25%22%20y2%3D%22100%25%22%3E%0A%20%20%20%20%20%20%3Cstop%20offset%3D%220%25%22%20stop-color%3D%22%230B0F19%22%2F%3E%0A%20%20%20%20%20%20%3Cstop%20offset%3D%22100%25%22%20stop-color%3D%22%23111827%22%2F%3E%0A%20%20%20%20%3C%2FlinearGradient%3E%0A%20%20%20%20%3ClinearGradient%20id%3D%22accentGrad%22%20x1%3D%220%25%22%20y1%3D%220%25%22%20x2%3D%22100%25%22%20y2%3D%220%25%22%3E%0A%20%20%20%20%20%20%3Cstop%20offset%3D%220%25%22%20stop-color%3D%22%2310B981%22%20stop-opacity%3D%220.9%22%2F%3E%0A%20%20%20%20%20%20%3Cstop%20offset%3D%22100%25%22%20stop-color%3D%22%236366F1%22%20stop-opacity%3D%220.9%22%2F%3E%0A%20%20%20%20%3C%2FlinearGradient%3E%0A%20%20%3C%2Fdefs%3E%0A%20%20%3Crect%20width%3D%22600%22%20height%3D%22450%22%20fill%3D%22url(%23bgGrad)%22%2F%3E%0A%20%20%3Crect%20x%3D%2220%22%20y%3D%2220%22%20width%3D%22560%22%20height%3D%22410%22%20rx%3D%2216%22%20fill%3D%22none%22%20stroke%3D%22url(%23accentGrad)%22%20stroke-width%3D%222%22%20stroke-dasharray%3D%226%2C6%22%20opacity%3D%220.6%22%2F%3E%0A%20%20%3Crect%20x%3D%22175%22%20y%3D%2250%22%20width%3D%22250%22%20height%3D%2234%22%20rx%3D%2217%22%20fill%3D%22%23064E3B%22%20stroke%3D%22%2310B981%22%20stroke-width%3D%221.5%22%2F%3E%0A%20%20%3Ctext%20x%3D%22300%22%20y%3D%2272%22%20font-family%3D%22system-ui%2C%20-apple-system%2C%20sans-serif%22%20font-size%3D%2212%22%20font-weight%3D%22700%22%20fill%3D%22%23A7F3D0%22%20text-anchor%3D%22middle%22%20letter-spacing%3D%221.5%22%3EAPTDOT%20SYNTHETIC%20DEMO%3C%2Ftext%3E%0A%20%20%3Crect%20x%3D%22235%22%20y%3D%22125%22%20width%3D%22130%22%20height%3D%22110%22%20rx%3D%2214%22%20fill%3D%22%231F2937%22%20stroke%3D%22%2310B981%22%20stroke-width%3D%222%22%2F%3E%0A%20%20%3Cpath%20d%3D%22M275%20180%20L300%20155%20L325%20180%20L300%20205%20Z%22%20fill%3D%22none%22%20stroke%3D%22%2310B981%22%20stroke-width%3D%223%22%20stroke-linejoin%3D%22round%22%2F%3E%0A%20%20%3Ccircle%20cx%3D%22300%22%20cy%3D%22180%22%20r%3D%227%22%20fill%3D%22%2310B981%22%2F%3E%0A%20%20%3Ctext%20x%3D%22300%22%20y%3D%22280%22%20font-family%3D%22system-ui%2C%20-apple-system%2C%20sans-serif%22%20font-size%3D%2218%22%20font-weight%3D%22600%22%20fill%3D%22%23F9FAFB%22%20text-anchor%3D%22middle%22%3ECork%20Yoga%20Block%2C%20Set%20of%202%3C%2Ftext%3E%0A%20%20%3Ctext%20x%3D%22300%22%20y%3D%22310%22%20font-family%3D%22system-ui%2C%20-apple-system%2C%20sans-serif%22%20font-size%3D%2213%22%20font-weight%3D%22500%22%20fill%3D%22%239CA3AF%22%20text-anchor%3D%22middle%22%3EHealth%20%26amp%3B%20Fitness%20%E2%80%A2%20SKU%3A%20FIT-BLCK-038%3C%2Ftext%3E%0A%20%20%3Crect%20x%3D%22140%22%20y%3D%22360%22%20width%3D%22320%22%20height%3D%2230%22%20rx%3D%228%22%20fill%3D%22%23111827%22%20stroke%3D%22%23374151%22%20stroke-width%3D%221%22%2F%3E%0A%20%20%3Ctext%20x%3D%22300%22%20y%3D%22380%22%20font-family%3D%22system-ui%2C%20-apple-system%2C%20sans-serif%22%20font-size%3D%2211%22%20font-weight%3D%22500%22%20fill%3D%22%236B7280%22%20text-anchor%3D%22middle%22%3ESynthetic%20Specification%20%E2%80%A2%20CC0%201.0%20Universal%3C%2Ftext%3E%0A%3C%2Fsvg%3E",
    "tag": "Synthetic Demo",
    "badge_type": "demo",
    "is_demo": true,
    "catalogue_source": "aptdot_synthetic",
    "lifecycle_status": "active",
    "verification_tier": "demo",
    "seller": {
      "name": "Aptdot Sample Goods",
      "verifiedStatus": "Synthetic Demo Catalogue",
      "authorizedPartner": false,
      "rating": 4.2,
      "location": "Synthetic Sandbox",
      "fulfillment": "Simulated Delivery (Non-Commercial)",
      "synthetic_notice": "This item belongs to the Aptdot CC0 Synthetic Benchmark Catalogue. It cannot be purchased for real fulfillment."
    },
    "evidence": {
      "source": "Aptdot Synthetic E-Commerce Product Catalog v1.0.0",
      "license": "CC0-1.0 Universal",
      "sku": "FIT-BLCK-038",
      "dataset_source": "https://www.aptdot.com/datasets/ecommerce-product-catalog/",
      "is_synthetic": true
    },
    "specs": {
      "aptdot_id": "prod_038",
      "sku": "FIT-BLCK-038",
      "product_type": "Health & Fitness > Yoga",
      "cost_price": 7,
      "low_stock_threshold": 8,
      "availability": "in_stock",
      "availability_date": null,
      "dimensions": {
        "weight_g": 1200,
        "length_cm": 24,
        "width_cm": 16,
        "height_cm": 16
      },
      "options": [],
      "variants": [
        {
          "variant_id": "var_038_default",
          "uuid": "019d2a3a-f480-7ab4-a6ca-f6ea16630868",
          "sku": "FIT-BLCK-038",
          "title": "Default",
          "options": {},
          "price": 22,
          "compare_at_price": null,
          "stock": 98
        }
      ],
      "total_variants": 1
    },
    "variants": [
      {
        "variant_id": "var_038_default",
        "id": "019d2a3a-f480-7ab4-a6ca-f6ea16630868",
        "uuid": "019d2a3a-f480-7ab4-a6ca-f6ea16630868",
        "sku": "FIT-BLCK-038",
        "title": "Default",
        "options": {},
        "price": 22,
        "compare_at_price": null,
        "stock": 98,
        "in_stock": true
      }
    ],
    "options": [],
    "warranty": "Simulated 1-Year Synthetic Warranty (Demo Only)",
    "return_policy": "Simulated 30-Day Sandbox Returns (Demo Only)",
    "risk_assessment": "Synthetic Demo Item: Fictional specifications for testing and benchmarking only."
  },
  {
    "id": "019d67f9-88e0-786b-a9a5-afe022b6c60d",
    "slug": "aptdot-fitness-tracker-band-with-heart-rate-monitor",
    "title": "Fitness Tracker Band with Heart Rate Monitor",
    "name": "Fitness Tracker Band with Heart Rate Monitor",
    "brand": "Aptdot Sample Goods",
    "category": "Health & Fitness",
    "description": "Slim fitness band with heart rate, sleep and step tracking and a 10-day battery.",
    "price": 59,
    "original_price": 79,
    "currency": "USD",
    "rating": 4.7,
    "reviews_count": 458,
    "stock": 107,
    "in_stock": true,
    "image_url": "data:image/svg+xml;utf8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%20600%20450%22%20width%3D%22600%22%20height%3D%22450%22%3E%0A%20%20%3Cdefs%3E%0A%20%20%20%20%3ClinearGradient%20id%3D%22bgGrad%22%20x1%3D%220%25%22%20y1%3D%220%25%22%20x2%3D%22100%25%22%20y2%3D%22100%25%22%3E%0A%20%20%20%20%20%20%3Cstop%20offset%3D%220%25%22%20stop-color%3D%22%230B0F19%22%2F%3E%0A%20%20%20%20%20%20%3Cstop%20offset%3D%22100%25%22%20stop-color%3D%22%23111827%22%2F%3E%0A%20%20%20%20%3C%2FlinearGradient%3E%0A%20%20%20%20%3ClinearGradient%20id%3D%22accentGrad%22%20x1%3D%220%25%22%20y1%3D%220%25%22%20x2%3D%22100%25%22%20y2%3D%220%25%22%3E%0A%20%20%20%20%20%20%3Cstop%20offset%3D%220%25%22%20stop-color%3D%22%2310B981%22%20stop-opacity%3D%220.9%22%2F%3E%0A%20%20%20%20%20%20%3Cstop%20offset%3D%22100%25%22%20stop-color%3D%22%236366F1%22%20stop-opacity%3D%220.9%22%2F%3E%0A%20%20%20%20%3C%2FlinearGradient%3E%0A%20%20%3C%2Fdefs%3E%0A%20%20%3Crect%20width%3D%22600%22%20height%3D%22450%22%20fill%3D%22url(%23bgGrad)%22%2F%3E%0A%20%20%3Crect%20x%3D%2220%22%20y%3D%2220%22%20width%3D%22560%22%20height%3D%22410%22%20rx%3D%2216%22%20fill%3D%22none%22%20stroke%3D%22url(%23accentGrad)%22%20stroke-width%3D%222%22%20stroke-dasharray%3D%226%2C6%22%20opacity%3D%220.6%22%2F%3E%0A%20%20%3Crect%20x%3D%22175%22%20y%3D%2250%22%20width%3D%22250%22%20height%3D%2234%22%20rx%3D%2217%22%20fill%3D%22%23064E3B%22%20stroke%3D%22%2310B981%22%20stroke-width%3D%221.5%22%2F%3E%0A%20%20%3Ctext%20x%3D%22300%22%20y%3D%2272%22%20font-family%3D%22system-ui%2C%20-apple-system%2C%20sans-serif%22%20font-size%3D%2212%22%20font-weight%3D%22700%22%20fill%3D%22%23A7F3D0%22%20text-anchor%3D%22middle%22%20letter-spacing%3D%221.5%22%3EAPTDOT%20SYNTHETIC%20DEMO%3C%2Ftext%3E%0A%20%20%3Crect%20x%3D%22235%22%20y%3D%22125%22%20width%3D%22130%22%20height%3D%22110%22%20rx%3D%2214%22%20fill%3D%22%231F2937%22%20stroke%3D%22%2310B981%22%20stroke-width%3D%222%22%2F%3E%0A%20%20%3Cpath%20d%3D%22M275%20180%20L300%20155%20L325%20180%20L300%20205%20Z%22%20fill%3D%22none%22%20stroke%3D%22%2310B981%22%20stroke-width%3D%223%22%20stroke-linejoin%3D%22round%22%2F%3E%0A%20%20%3Ccircle%20cx%3D%22300%22%20cy%3D%22180%22%20r%3D%227%22%20fill%3D%22%2310B981%22%2F%3E%0A%20%20%3Ctext%20x%3D%22300%22%20y%3D%22280%22%20font-family%3D%22system-ui%2C%20-apple-system%2C%20sans-serif%22%20font-size%3D%2218%22%20font-weight%3D%22600%22%20fill%3D%22%23F9FAFB%22%20text-anchor%3D%22middle%22%3EFitness%20Tracker%20Band%20with%20Heart%20...%3C%2Ftext%3E%0A%20%20%3Ctext%20x%3D%22300%22%20y%3D%22310%22%20font-family%3D%22system-ui%2C%20-apple-system%2C%20sans-serif%22%20font-size%3D%2213%22%20font-weight%3D%22500%22%20fill%3D%22%239CA3AF%22%20text-anchor%3D%22middle%22%3EHealth%20%26amp%3B%20Fitness%20%E2%80%A2%20SKU%3A%20FIT-TRKR-039%3C%2Ftext%3E%0A%20%20%3Crect%20x%3D%22140%22%20y%3D%22360%22%20width%3D%22320%22%20height%3D%2230%22%20rx%3D%228%22%20fill%3D%22%23111827%22%20stroke%3D%22%23374151%22%20stroke-width%3D%221%22%2F%3E%0A%20%20%3Ctext%20x%3D%22300%22%20y%3D%22380%22%20font-family%3D%22system-ui%2C%20-apple-system%2C%20sans-serif%22%20font-size%3D%2211%22%20font-weight%3D%22500%22%20fill%3D%22%236B7280%22%20text-anchor%3D%22middle%22%3ESynthetic%20Specification%20%E2%80%A2%20CC0%201.0%20Universal%3C%2Ftext%3E%0A%3C%2Fsvg%3E",
    "tag": "On Sale",
    "badge_type": "demo",
    "is_demo": true,
    "catalogue_source": "aptdot_synthetic",
    "lifecycle_status": "active",
    "verification_tier": "demo",
    "seller": {
      "name": "Aptdot Sample Goods",
      "verifiedStatus": "Synthetic Demo Catalogue",
      "authorizedPartner": false,
      "rating": 4.7,
      "location": "Synthetic Sandbox",
      "fulfillment": "Simulated Delivery (Non-Commercial)",
      "synthetic_notice": "This item belongs to the Aptdot CC0 Synthetic Benchmark Catalogue. It cannot be purchased for real fulfillment."
    },
    "evidence": {
      "source": "Aptdot Synthetic E-Commerce Product Catalog v1.0.0",
      "license": "CC0-1.0 Universal",
      "sku": "FIT-TRKR-039",
      "dataset_source": "https://www.aptdot.com/datasets/ecommerce-product-catalog/",
      "is_synthetic": true
    },
    "specs": {
      "aptdot_id": "prod_039",
      "sku": "FIT-TRKR-039",
      "product_type": "Health & Fitness > Wearable Fitness",
      "cost_price": 22,
      "low_stock_threshold": 12,
      "availability": "in_stock",
      "availability_date": null,
      "dimensions": {
        "weight_g": 40,
        "length_cm": 10,
        "width_cm": 6,
        "height_cm": 4
      },
      "options": [
        {
          "name": "Color",
          "values": [
            "Black",
            "Coral"
          ]
        }
      ],
      "variants": [
        {
          "variant_id": "var_039_bla",
          "uuid": "019d67f9-88e0-78d1-90e5-0bddcb5dd894",
          "sku": "FIT-TRKR-039-BLA",
          "title": "Black",
          "options": {
            "Color": "Black"
          },
          "price": 59,
          "compare_at_price": 79,
          "stock": 50
        },
        {
          "variant_id": "var_039_cor",
          "uuid": "019d67f9-88e0-7cf2-82b0-25ac07102c55",
          "sku": "FIT-TRKR-039-COR",
          "title": "Coral",
          "options": {
            "Color": "Coral"
          },
          "price": 59,
          "compare_at_price": 79,
          "stock": 57
        }
      ],
      "total_variants": 2
    },
    "variants": [
      {
        "variant_id": "var_039_bla",
        "id": "019d67f9-88e0-78d1-90e5-0bddcb5dd894",
        "uuid": "019d67f9-88e0-78d1-90e5-0bddcb5dd894",
        "sku": "FIT-TRKR-039-BLA",
        "title": "Black",
        "options": {
          "Color": "Black"
        },
        "price": 59,
        "compare_at_price": 79,
        "stock": 50,
        "in_stock": true
      },
      {
        "variant_id": "var_039_cor",
        "id": "019d67f9-88e0-7cf2-82b0-25ac07102c55",
        "uuid": "019d67f9-88e0-7cf2-82b0-25ac07102c55",
        "sku": "FIT-TRKR-039-COR",
        "title": "Coral",
        "options": {
          "Color": "Coral"
        },
        "price": 59,
        "compare_at_price": 79,
        "stock": 57,
        "in_stock": true
      }
    ],
    "options": [
      {
        "name": "Color",
        "values": [
          "Black",
          "Coral"
        ]
      }
    ],
    "warranty": "Simulated 1-Year Synthetic Warranty (Demo Only)",
    "return_policy": "Simulated 30-Day Sandbox Returns (Demo Only)",
    "risk_assessment": "Synthetic Demo Item: Fictional specifications for testing and benchmarking only."
  },
  {
    "id": "019da6ca-c5c0-769e-b077-52f9c55a2b58",
    "slug": "aptdot-percussion-massage-gun",
    "title": "Percussion Massage Gun",
    "name": "Percussion Massage Gun",
    "brand": "Aptdot Sample Goods",
    "category": "Health & Fitness",
    "description": "Quiet percussion massager with five speeds, six attachments and a 4-hour battery.",
    "price": 129,
    "original_price": 169,
    "currency": "USD",
    "rating": 3.7,
    "reviews_count": 330,
    "stock": 67,
    "in_stock": true,
    "image_url": "data:image/svg+xml;utf8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%20600%20450%22%20width%3D%22600%22%20height%3D%22450%22%3E%0A%20%20%3Cdefs%3E%0A%20%20%20%20%3ClinearGradient%20id%3D%22bgGrad%22%20x1%3D%220%25%22%20y1%3D%220%25%22%20x2%3D%22100%25%22%20y2%3D%22100%25%22%3E%0A%20%20%20%20%20%20%3Cstop%20offset%3D%220%25%22%20stop-color%3D%22%230B0F19%22%2F%3E%0A%20%20%20%20%20%20%3Cstop%20offset%3D%22100%25%22%20stop-color%3D%22%23111827%22%2F%3E%0A%20%20%20%20%3C%2FlinearGradient%3E%0A%20%20%20%20%3ClinearGradient%20id%3D%22accentGrad%22%20x1%3D%220%25%22%20y1%3D%220%25%22%20x2%3D%22100%25%22%20y2%3D%220%25%22%3E%0A%20%20%20%20%20%20%3Cstop%20offset%3D%220%25%22%20stop-color%3D%22%2310B981%22%20stop-opacity%3D%220.9%22%2F%3E%0A%20%20%20%20%20%20%3Cstop%20offset%3D%22100%25%22%20stop-color%3D%22%236366F1%22%20stop-opacity%3D%220.9%22%2F%3E%0A%20%20%20%20%3C%2FlinearGradient%3E%0A%20%20%3C%2Fdefs%3E%0A%20%20%3Crect%20width%3D%22600%22%20height%3D%22450%22%20fill%3D%22url(%23bgGrad)%22%2F%3E%0A%20%20%3Crect%20x%3D%2220%22%20y%3D%2220%22%20width%3D%22560%22%20height%3D%22410%22%20rx%3D%2216%22%20fill%3D%22none%22%20stroke%3D%22url(%23accentGrad)%22%20stroke-width%3D%222%22%20stroke-dasharray%3D%226%2C6%22%20opacity%3D%220.6%22%2F%3E%0A%20%20%3Crect%20x%3D%22175%22%20y%3D%2250%22%20width%3D%22250%22%20height%3D%2234%22%20rx%3D%2217%22%20fill%3D%22%23064E3B%22%20stroke%3D%22%2310B981%22%20stroke-width%3D%221.5%22%2F%3E%0A%20%20%3Ctext%20x%3D%22300%22%20y%3D%2272%22%20font-family%3D%22system-ui%2C%20-apple-system%2C%20sans-serif%22%20font-size%3D%2212%22%20font-weight%3D%22700%22%20fill%3D%22%23A7F3D0%22%20text-anchor%3D%22middle%22%20letter-spacing%3D%221.5%22%3EAPTDOT%20SYNTHETIC%20DEMO%3C%2Ftext%3E%0A%20%20%3Crect%20x%3D%22235%22%20y%3D%22125%22%20width%3D%22130%22%20height%3D%22110%22%20rx%3D%2214%22%20fill%3D%22%231F2937%22%20stroke%3D%22%2310B981%22%20stroke-width%3D%222%22%2F%3E%0A%20%20%3Cpath%20d%3D%22M275%20180%20L300%20155%20L325%20180%20L300%20205%20Z%22%20fill%3D%22none%22%20stroke%3D%22%2310B981%22%20stroke-width%3D%223%22%20stroke-linejoin%3D%22round%22%2F%3E%0A%20%20%3Ccircle%20cx%3D%22300%22%20cy%3D%22180%22%20r%3D%227%22%20fill%3D%22%2310B981%22%2F%3E%0A%20%20%3Ctext%20x%3D%22300%22%20y%3D%22280%22%20font-family%3D%22system-ui%2C%20-apple-system%2C%20sans-serif%22%20font-size%3D%2218%22%20font-weight%3D%22600%22%20fill%3D%22%23F9FAFB%22%20text-anchor%3D%22middle%22%3EPercussion%20Massage%20Gun%3C%2Ftext%3E%0A%20%20%3Ctext%20x%3D%22300%22%20y%3D%22310%22%20font-family%3D%22system-ui%2C%20-apple-system%2C%20sans-serif%22%20font-size%3D%2213%22%20font-weight%3D%22500%22%20fill%3D%22%239CA3AF%22%20text-anchor%3D%22middle%22%3EHealth%20%26amp%3B%20Fitness%20%E2%80%A2%20SKU%3A%20FIT-MASS-040%3C%2Ftext%3E%0A%20%20%3Crect%20x%3D%22140%22%20y%3D%22360%22%20width%3D%22320%22%20height%3D%2230%22%20rx%3D%228%22%20fill%3D%22%23111827%22%20stroke%3D%22%23374151%22%20stroke-width%3D%221%22%2F%3E%0A%20%20%3Ctext%20x%3D%22300%22%20y%3D%22380%22%20font-family%3D%22system-ui%2C%20-apple-system%2C%20sans-serif%22%20font-size%3D%2211%22%20font-weight%3D%22500%22%20fill%3D%22%236B7280%22%20text-anchor%3D%22middle%22%3ESynthetic%20Specification%20%E2%80%A2%20CC0%201.0%20Universal%3C%2Ftext%3E%0A%3C%2Fsvg%3E",
    "tag": "On Sale",
    "badge_type": "demo",
    "is_demo": true,
    "catalogue_source": "aptdot_synthetic",
    "lifecycle_status": "active",
    "verification_tier": "demo",
    "seller": {
      "name": "Aptdot Sample Goods",
      "verifiedStatus": "Synthetic Demo Catalogue",
      "authorizedPartner": false,
      "rating": 3.7,
      "location": "Synthetic Sandbox",
      "fulfillment": "Simulated Delivery (Non-Commercial)",
      "synthetic_notice": "This item belongs to the Aptdot CC0 Synthetic Benchmark Catalogue. It cannot be purchased for real fulfillment."
    },
    "evidence": {
      "source": "Aptdot Synthetic E-Commerce Product Catalog v1.0.0",
      "license": "CC0-1.0 Universal",
      "sku": "FIT-MASS-040",
      "dataset_source": "https://www.aptdot.com/datasets/ecommerce-product-catalog/",
      "is_synthetic": true
    },
    "specs": {
      "aptdot_id": "prod_040",
      "sku": "FIT-MASS-040",
      "product_type": "Health & Fitness > Recovery",
      "cost_price": 48,
      "low_stock_threshold": 15,
      "availability": "in_stock",
      "availability_date": null,
      "dimensions": {
        "weight_g": 1100,
        "length_cm": 28,
        "width_cm": 22,
        "height_cm": 9
      },
      "options": [
        {
          "name": "Color",
          "values": [
            "Graphite",
            "Sage"
          ]
        }
      ],
      "variants": [
        {
          "variant_id": "var_040_gra",
          "uuid": "019da6ca-c5c0-7ed5-aee6-ae4717205541",
          "sku": "FIT-MASS-040-GRA",
          "title": "Graphite",
          "options": {
            "Color": "Graphite"
          },
          "price": 129,
          "compare_at_price": 169,
          "stock": 47
        },
        {
          "variant_id": "var_040_sag",
          "uuid": "019da6ca-c5c0-7fd9-8ec2-07dda60f2557",
          "sku": "FIT-MASS-040-SAG",
          "title": "Sage",
          "options": {
            "Color": "Sage"
          },
          "price": 129,
          "compare_at_price": 169,
          "stock": 20
        }
      ],
      "total_variants": 2
    },
    "variants": [
      {
        "variant_id": "var_040_gra",
        "id": "019da6ca-c5c0-7ed5-aee6-ae4717205541",
        "uuid": "019da6ca-c5c0-7ed5-aee6-ae4717205541",
        "sku": "FIT-MASS-040-GRA",
        "title": "Graphite",
        "options": {
          "Color": "Graphite"
        },
        "price": 129,
        "compare_at_price": 169,
        "stock": 47,
        "in_stock": true
      },
      {
        "variant_id": "var_040_sag",
        "id": "019da6ca-c5c0-7fd9-8ec2-07dda60f2557",
        "uuid": "019da6ca-c5c0-7fd9-8ec2-07dda60f2557",
        "sku": "FIT-MASS-040-SAG",
        "title": "Sage",
        "options": {
          "Color": "Sage"
        },
        "price": 129,
        "compare_at_price": 169,
        "stock": 20,
        "in_stock": true
      }
    ],
    "options": [
      {
        "name": "Color",
        "values": [
          "Graphite",
          "Sage"
        ]
      }
    ],
    "warranty": "Simulated 1-Year Synthetic Warranty (Demo Only)",
    "return_policy": "Simulated 30-Day Sandbox Returns (Demo Only)",
    "risk_assessment": "Synthetic Demo Item: Fictional specifications for testing and benchmarking only."
  },
  {
    "id": "019de376-b1a0-705b-8b6c-cce600c013f7",
    "slug": "aptdot-adjustable-laptop-and-monitor-desk-riser",
    "title": "Adjustable Laptop & Monitor Desk Riser",
    "name": "Adjustable Laptop & Monitor Desk Riser",
    "brand": "Aptdot Sample Goods",
    "category": "Office & Workspace",
    "description": "Solid wood riser with adjustable steel legs that lifts a monitor or laptop to eye level.",
    "price": 69,
    "original_price": null,
    "currency": "USD",
    "rating": 3.9,
    "reviews_count": 575,
    "stock": 103,
    "in_stock": true,
    "image_url": "data:image/svg+xml;utf8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%20600%20450%22%20width%3D%22600%22%20height%3D%22450%22%3E%0A%20%20%3Cdefs%3E%0A%20%20%20%20%3ClinearGradient%20id%3D%22bgGrad%22%20x1%3D%220%25%22%20y1%3D%220%25%22%20x2%3D%22100%25%22%20y2%3D%22100%25%22%3E%0A%20%20%20%20%20%20%3Cstop%20offset%3D%220%25%22%20stop-color%3D%22%230B0F19%22%2F%3E%0A%20%20%20%20%20%20%3Cstop%20offset%3D%22100%25%22%20stop-color%3D%22%23111827%22%2F%3E%0A%20%20%20%20%3C%2FlinearGradient%3E%0A%20%20%20%20%3ClinearGradient%20id%3D%22accentGrad%22%20x1%3D%220%25%22%20y1%3D%220%25%22%20x2%3D%22100%25%22%20y2%3D%220%25%22%3E%0A%20%20%20%20%20%20%3Cstop%20offset%3D%220%25%22%20stop-color%3D%22%236366F1%22%20stop-opacity%3D%220.9%22%2F%3E%0A%20%20%20%20%20%20%3Cstop%20offset%3D%22100%25%22%20stop-color%3D%22%236366F1%22%20stop-opacity%3D%220.9%22%2F%3E%0A%20%20%20%20%3C%2FlinearGradient%3E%0A%20%20%3C%2Fdefs%3E%0A%20%20%3Crect%20width%3D%22600%22%20height%3D%22450%22%20fill%3D%22url(%23bgGrad)%22%2F%3E%0A%20%20%3Crect%20x%3D%2220%22%20y%3D%2220%22%20width%3D%22560%22%20height%3D%22410%22%20rx%3D%2216%22%20fill%3D%22none%22%20stroke%3D%22url(%23accentGrad)%22%20stroke-width%3D%222%22%20stroke-dasharray%3D%226%2C6%22%20opacity%3D%220.6%22%2F%3E%0A%20%20%3Crect%20x%3D%22175%22%20y%3D%2250%22%20width%3D%22250%22%20height%3D%2234%22%20rx%3D%2217%22%20fill%3D%22%23312E81%22%20stroke%3D%22%236366F1%22%20stroke-width%3D%221.5%22%2F%3E%0A%20%20%3Ctext%20x%3D%22300%22%20y%3D%2272%22%20font-family%3D%22system-ui%2C%20-apple-system%2C%20sans-serif%22%20font-size%3D%2212%22%20font-weight%3D%22700%22%20fill%3D%22%23C7D2FE%22%20text-anchor%3D%22middle%22%20letter-spacing%3D%221.5%22%3EAPTDOT%20SYNTHETIC%20DEMO%3C%2Ftext%3E%0A%20%20%3Crect%20x%3D%22235%22%20y%3D%22125%22%20width%3D%22130%22%20height%3D%22110%22%20rx%3D%2214%22%20fill%3D%22%231F2937%22%20stroke%3D%22%236366F1%22%20stroke-width%3D%222%22%2F%3E%0A%20%20%3Cpath%20d%3D%22M275%20180%20L300%20155%20L325%20180%20L300%20205%20Z%22%20fill%3D%22none%22%20stroke%3D%22%236366F1%22%20stroke-width%3D%223%22%20stroke-linejoin%3D%22round%22%2F%3E%0A%20%20%3Ccircle%20cx%3D%22300%22%20cy%3D%22180%22%20r%3D%227%22%20fill%3D%22%236366F1%22%2F%3E%0A%20%20%3Ctext%20x%3D%22300%22%20y%3D%22280%22%20font-family%3D%22system-ui%2C%20-apple-system%2C%20sans-serif%22%20font-size%3D%2218%22%20font-weight%3D%22600%22%20fill%3D%22%23F9FAFB%22%20text-anchor%3D%22middle%22%3EAdjustable%20Laptop%20%26amp%3B%20Monitor%20Desk...%3C%2Ftext%3E%0A%20%20%3Ctext%20x%3D%22300%22%20y%3D%22310%22%20font-family%3D%22system-ui%2C%20-apple-system%2C%20sans-serif%22%20font-size%3D%2213%22%20font-weight%3D%22500%22%20fill%3D%22%239CA3AF%22%20text-anchor%3D%22middle%22%3EOffice%20%26amp%3B%20Workspace%20%E2%80%A2%20SKU%3A%20OFF-RISR-041%3C%2Ftext%3E%0A%20%20%3Crect%20x%3D%22140%22%20y%3D%22360%22%20width%3D%22320%22%20height%3D%2230%22%20rx%3D%228%22%20fill%3D%22%23111827%22%20stroke%3D%22%23374151%22%20stroke-width%3D%221%22%2F%3E%0A%20%20%3Ctext%20x%3D%22300%22%20y%3D%22380%22%20font-family%3D%22system-ui%2C%20-apple-system%2C%20sans-serif%22%20font-size%3D%2211%22%20font-weight%3D%22500%22%20fill%3D%22%236B7280%22%20text-anchor%3D%22middle%22%3ESynthetic%20Specification%20%E2%80%A2%20CC0%201.0%20Universal%3C%2Ftext%3E%0A%3C%2Fsvg%3E",
    "tag": "Synthetic Demo",
    "badge_type": "demo",
    "is_demo": true,
    "catalogue_source": "aptdot_synthetic",
    "lifecycle_status": "active",
    "verification_tier": "demo",
    "seller": {
      "name": "Aptdot Sample Goods",
      "verifiedStatus": "Synthetic Demo Catalogue",
      "authorizedPartner": false,
      "rating": 3.9,
      "location": "Synthetic Sandbox",
      "fulfillment": "Simulated Delivery (Non-Commercial)",
      "synthetic_notice": "This item belongs to the Aptdot CC0 Synthetic Benchmark Catalogue. It cannot be purchased for real fulfillment."
    },
    "evidence": {
      "source": "Aptdot Synthetic E-Commerce Product Catalog v1.0.0",
      "license": "CC0-1.0 Universal",
      "sku": "OFF-RISR-041",
      "dataset_source": "https://www.aptdot.com/datasets/ecommerce-product-catalog/",
      "is_synthetic": true
    },
    "specs": {
      "aptdot_id": "prod_041",
      "sku": "OFF-RISR-041",
      "product_type": "Office & Workspace > Desk Accessories",
      "cost_price": 24,
      "low_stock_threshold": 15,
      "availability": "in_stock",
      "availability_date": null,
      "dimensions": {
        "weight_g": 3200,
        "length_cm": 60,
        "width_cm": 25,
        "height_cm": 8
      },
      "options": [
        {
          "name": "Finish",
          "values": [
            "Walnut",
            "White Oak"
          ]
        }
      ],
      "variants": [
        {
          "variant_id": "var_041_wal",
          "uuid": "019de376-b1a0-768a-92e9-7ad1f9d106d3",
          "sku": "OFF-RISR-041-WAL",
          "title": "Walnut",
          "options": {
            "Finish": "Walnut"
          },
          "price": 69,
          "compare_at_price": null,
          "stock": 55
        },
        {
          "variant_id": "var_041_wo",
          "uuid": "019de376-b1a0-7375-bb6f-9ffb0143409c",
          "sku": "OFF-RISR-041-WO",
          "title": "White Oak",
          "options": {
            "Finish": "White Oak"
          },
          "price": 69,
          "compare_at_price": null,
          "stock": 48
        }
      ],
      "total_variants": 2
    },
    "variants": [
      {
        "variant_id": "var_041_wal",
        "id": "019de376-b1a0-768a-92e9-7ad1f9d106d3",
        "uuid": "019de376-b1a0-768a-92e9-7ad1f9d106d3",
        "sku": "OFF-RISR-041-WAL",
        "title": "Walnut",
        "options": {
          "Finish": "Walnut"
        },
        "price": 69,
        "compare_at_price": null,
        "stock": 55,
        "in_stock": true
      },
      {
        "variant_id": "var_041_wo",
        "id": "019de376-b1a0-7375-bb6f-9ffb0143409c",
        "uuid": "019de376-b1a0-7375-bb6f-9ffb0143409c",
        "sku": "OFF-RISR-041-WO",
        "title": "White Oak",
        "options": {
          "Finish": "White Oak"
        },
        "price": 69,
        "compare_at_price": null,
        "stock": 48,
        "in_stock": true
      }
    ],
    "options": [
      {
        "name": "Finish",
        "values": [
          "Walnut",
          "White Oak"
        ]
      }
    ],
    "warranty": "Simulated 1-Year Synthetic Warranty (Demo Only)",
    "return_policy": "Simulated 30-Day Sandbox Returns (Demo Only)",
    "risk_assessment": "Synthetic Demo Item: Fictional specifications for testing and benchmarking only."
  },
  {
    "id": "019e209e-3620-71c0-a385-2de5c7faa7b1",
    "slug": "aptdot-vegan-leather-desk-pad",
    "title": "Vegan Leather Desk Pad",
    "name": "Vegan Leather Desk Pad",
    "brand": "Aptdot Sample Goods",
    "category": "Office & Workspace",
    "description": "Water-resistant vegan leather desk mat with a non-slip suede underside.",
    "price": 29,
    "original_price": 36,
    "currency": "USD",
    "rating": 4.3,
    "reviews_count": 395,
    "stock": 68,
    "in_stock": true,
    "image_url": "data:image/svg+xml;utf8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%20600%20450%22%20width%3D%22600%22%20height%3D%22450%22%3E%0A%20%20%3Cdefs%3E%0A%20%20%20%20%3ClinearGradient%20id%3D%22bgGrad%22%20x1%3D%220%25%22%20y1%3D%220%25%22%20x2%3D%22100%25%22%20y2%3D%22100%25%22%3E%0A%20%20%20%20%20%20%3Cstop%20offset%3D%220%25%22%20stop-color%3D%22%230B0F19%22%2F%3E%0A%20%20%20%20%20%20%3Cstop%20offset%3D%22100%25%22%20stop-color%3D%22%23111827%22%2F%3E%0A%20%20%20%20%3C%2FlinearGradient%3E%0A%20%20%20%20%3ClinearGradient%20id%3D%22accentGrad%22%20x1%3D%220%25%22%20y1%3D%220%25%22%20x2%3D%22100%25%22%20y2%3D%220%25%22%3E%0A%20%20%20%20%20%20%3Cstop%20offset%3D%220%25%22%20stop-color%3D%22%236366F1%22%20stop-opacity%3D%220.9%22%2F%3E%0A%20%20%20%20%20%20%3Cstop%20offset%3D%22100%25%22%20stop-color%3D%22%236366F1%22%20stop-opacity%3D%220.9%22%2F%3E%0A%20%20%20%20%3C%2FlinearGradient%3E%0A%20%20%3C%2Fdefs%3E%0A%20%20%3Crect%20width%3D%22600%22%20height%3D%22450%22%20fill%3D%22url(%23bgGrad)%22%2F%3E%0A%20%20%3Crect%20x%3D%2220%22%20y%3D%2220%22%20width%3D%22560%22%20height%3D%22410%22%20rx%3D%2216%22%20fill%3D%22none%22%20stroke%3D%22url(%23accentGrad)%22%20stroke-width%3D%222%22%20stroke-dasharray%3D%226%2C6%22%20opacity%3D%220.6%22%2F%3E%0A%20%20%3Crect%20x%3D%22175%22%20y%3D%2250%22%20width%3D%22250%22%20height%3D%2234%22%20rx%3D%2217%22%20fill%3D%22%23312E81%22%20stroke%3D%22%236366F1%22%20stroke-width%3D%221.5%22%2F%3E%0A%20%20%3Ctext%20x%3D%22300%22%20y%3D%2272%22%20font-family%3D%22system-ui%2C%20-apple-system%2C%20sans-serif%22%20font-size%3D%2212%22%20font-weight%3D%22700%22%20fill%3D%22%23C7D2FE%22%20text-anchor%3D%22middle%22%20letter-spacing%3D%221.5%22%3EAPTDOT%20SYNTHETIC%20DEMO%3C%2Ftext%3E%0A%20%20%3Crect%20x%3D%22235%22%20y%3D%22125%22%20width%3D%22130%22%20height%3D%22110%22%20rx%3D%2214%22%20fill%3D%22%231F2937%22%20stroke%3D%22%236366F1%22%20stroke-width%3D%222%22%2F%3E%0A%20%20%3Cpath%20d%3D%22M275%20180%20L300%20155%20L325%20180%20L300%20205%20Z%22%20fill%3D%22none%22%20stroke%3D%22%236366F1%22%20stroke-width%3D%223%22%20stroke-linejoin%3D%22round%22%2F%3E%0A%20%20%3Ccircle%20cx%3D%22300%22%20cy%3D%22180%22%20r%3D%227%22%20fill%3D%22%236366F1%22%2F%3E%0A%20%20%3Ctext%20x%3D%22300%22%20y%3D%22280%22%20font-family%3D%22system-ui%2C%20-apple-system%2C%20sans-serif%22%20font-size%3D%2218%22%20font-weight%3D%22600%22%20fill%3D%22%23F9FAFB%22%20text-anchor%3D%22middle%22%3EVegan%20Leather%20Desk%20Pad%3C%2Ftext%3E%0A%20%20%3Ctext%20x%3D%22300%22%20y%3D%22310%22%20font-family%3D%22system-ui%2C%20-apple-system%2C%20sans-serif%22%20font-size%3D%2213%22%20font-weight%3D%22500%22%20fill%3D%22%239CA3AF%22%20text-anchor%3D%22middle%22%3EOffice%20%26amp%3B%20Workspace%20%E2%80%A2%20SKU%3A%20OFF-PAD-042%3C%2Ftext%3E%0A%20%20%3Crect%20x%3D%22140%22%20y%3D%22360%22%20width%3D%22320%22%20height%3D%2230%22%20rx%3D%228%22%20fill%3D%22%23111827%22%20stroke%3D%22%23374151%22%20stroke-width%3D%221%22%2F%3E%0A%20%20%3Ctext%20x%3D%22300%22%20y%3D%22380%22%20font-family%3D%22system-ui%2C%20-apple-system%2C%20sans-serif%22%20font-size%3D%2211%22%20font-weight%3D%22500%22%20fill%3D%22%236B7280%22%20text-anchor%3D%22middle%22%3ESynthetic%20Specification%20%E2%80%A2%20CC0%201.0%20Universal%3C%2Ftext%3E%0A%3C%2Fsvg%3E",
    "tag": "On Sale",
    "badge_type": "demo",
    "is_demo": true,
    "catalogue_source": "aptdot_synthetic",
    "lifecycle_status": "active",
    "verification_tier": "demo",
    "seller": {
      "name": "Aptdot Sample Goods",
      "verifiedStatus": "Synthetic Demo Catalogue",
      "authorizedPartner": false,
      "rating": 4.3,
      "location": "Synthetic Sandbox",
      "fulfillment": "Simulated Delivery (Non-Commercial)",
      "synthetic_notice": "This item belongs to the Aptdot CC0 Synthetic Benchmark Catalogue. It cannot be purchased for real fulfillment."
    },
    "evidence": {
      "source": "Aptdot Synthetic E-Commerce Product Catalog v1.0.0",
      "license": "CC0-1.0 Universal",
      "sku": "OFF-PAD-042",
      "dataset_source": "https://www.aptdot.com/datasets/ecommerce-product-catalog/",
      "is_synthetic": true
    },
    "specs": {
      "aptdot_id": "prod_042",
      "sku": "OFF-PAD-042",
      "product_type": "Office & Workspace > Desk Accessories",
      "cost_price": 8,
      "low_stock_threshold": 15,
      "availability": "in_stock",
      "availability_date": null,
      "dimensions": {
        "weight_g": 500,
        "length_cm": 42,
        "width_cm": 8,
        "height_cm": 8
      },
      "options": [
        {
          "name": "Size",
          "values": [
            "60 × 30 cm",
            "80 × 40 cm"
          ]
        }
      ],
      "variants": [
        {
          "variant_id": "var_042_60x30cm",
          "uuid": "019e209e-3620-7383-82ce-a6aed4ba704a",
          "sku": "OFF-PAD-042-60X30CM",
          "title": "60 × 30 cm",
          "options": {
            "Size": "60 × 30 cm"
          },
          "price": 29,
          "compare_at_price": 36,
          "stock": 16
        },
        {
          "variant_id": "var_042_80x40cm",
          "uuid": "019e209e-3620-7c1e-9ed6-b2f91041c071",
          "sku": "OFF-PAD-042-80X40CM",
          "title": "80 × 40 cm",
          "options": {
            "Size": "80 × 40 cm"
          },
          "price": 36,
          "compare_at_price": 43,
          "stock": 52
        }
      ],
      "total_variants": 2
    },
    "variants": [
      {
        "variant_id": "var_042_60x30cm",
        "id": "019e209e-3620-7383-82ce-a6aed4ba704a",
        "uuid": "019e209e-3620-7383-82ce-a6aed4ba704a",
        "sku": "OFF-PAD-042-60X30CM",
        "title": "60 × 30 cm",
        "options": {
          "Size": "60 × 30 cm"
        },
        "price": 29,
        "compare_at_price": 36,
        "stock": 16,
        "in_stock": true
      },
      {
        "variant_id": "var_042_80x40cm",
        "id": "019e209e-3620-7c1e-9ed6-b2f91041c071",
        "uuid": "019e209e-3620-7c1e-9ed6-b2f91041c071",
        "sku": "OFF-PAD-042-80X40CM",
        "title": "80 × 40 cm",
        "options": {
          "Size": "80 × 40 cm"
        },
        "price": 36,
        "compare_at_price": 43,
        "stock": 52,
        "in_stock": true
      }
    ],
    "options": [
      {
        "name": "Size",
        "values": [
          "60 × 30 cm",
          "80 × 40 cm"
        ]
      }
    ],
    "warranty": "Simulated 1-Year Synthetic Warranty (Demo Only)",
    "return_policy": "Simulated 30-Day Sandbox Returns (Demo Only)",
    "risk_assessment": "Synthetic Demo Item: Fictional specifications for testing and benchmarking only."
  },
  {
    "id": "019e6006-82e0-7bb2-9778-2c3b02156a83",
    "slug": "aptdot-flexible-cable-management-spine",
    "title": "Flexible Cable Management Spine",
    "name": "Flexible Cable Management Spine",
    "brand": "Aptdot Sample Goods",
    "category": "Office & Workspace",
    "description": "Vertebrae-style cable spine that routes up to 8 cables from desk to floor.",
    "price": 24,
    "original_price": null,
    "currency": "USD",
    "rating": 4.5,
    "reviews_count": 544,
    "stock": 80,
    "in_stock": true,
    "image_url": "data:image/svg+xml;utf8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%20600%20450%22%20width%3D%22600%22%20height%3D%22450%22%3E%0A%20%20%3Cdefs%3E%0A%20%20%20%20%3ClinearGradient%20id%3D%22bgGrad%22%20x1%3D%220%25%22%20y1%3D%220%25%22%20x2%3D%22100%25%22%20y2%3D%22100%25%22%3E%0A%20%20%20%20%20%20%3Cstop%20offset%3D%220%25%22%20stop-color%3D%22%230B0F19%22%2F%3E%0A%20%20%20%20%20%20%3Cstop%20offset%3D%22100%25%22%20stop-color%3D%22%23111827%22%2F%3E%0A%20%20%20%20%3C%2FlinearGradient%3E%0A%20%20%20%20%3ClinearGradient%20id%3D%22accentGrad%22%20x1%3D%220%25%22%20y1%3D%220%25%22%20x2%3D%22100%25%22%20y2%3D%220%25%22%3E%0A%20%20%20%20%20%20%3Cstop%20offset%3D%220%25%22%20stop-color%3D%22%236366F1%22%20stop-opacity%3D%220.9%22%2F%3E%0A%20%20%20%20%20%20%3Cstop%20offset%3D%22100%25%22%20stop-color%3D%22%236366F1%22%20stop-opacity%3D%220.9%22%2F%3E%0A%20%20%20%20%3C%2FlinearGradient%3E%0A%20%20%3C%2Fdefs%3E%0A%20%20%3Crect%20width%3D%22600%22%20height%3D%22450%22%20fill%3D%22url(%23bgGrad)%22%2F%3E%0A%20%20%3Crect%20x%3D%2220%22%20y%3D%2220%22%20width%3D%22560%22%20height%3D%22410%22%20rx%3D%2216%22%20fill%3D%22none%22%20stroke%3D%22url(%23accentGrad)%22%20stroke-width%3D%222%22%20stroke-dasharray%3D%226%2C6%22%20opacity%3D%220.6%22%2F%3E%0A%20%20%3Crect%20x%3D%22175%22%20y%3D%2250%22%20width%3D%22250%22%20height%3D%2234%22%20rx%3D%2217%22%20fill%3D%22%23312E81%22%20stroke%3D%22%236366F1%22%20stroke-width%3D%221.5%22%2F%3E%0A%20%20%3Ctext%20x%3D%22300%22%20y%3D%2272%22%20font-family%3D%22system-ui%2C%20-apple-system%2C%20sans-serif%22%20font-size%3D%2212%22%20font-weight%3D%22700%22%20fill%3D%22%23C7D2FE%22%20text-anchor%3D%22middle%22%20letter-spacing%3D%221.5%22%3EAPTDOT%20SYNTHETIC%20DEMO%3C%2Ftext%3E%0A%20%20%3Crect%20x%3D%22235%22%20y%3D%22125%22%20width%3D%22130%22%20height%3D%22110%22%20rx%3D%2214%22%20fill%3D%22%231F2937%22%20stroke%3D%22%236366F1%22%20stroke-width%3D%222%22%2F%3E%0A%20%20%3Cpath%20d%3D%22M275%20180%20L300%20155%20L325%20180%20L300%20205%20Z%22%20fill%3D%22none%22%20stroke%3D%22%236366F1%22%20stroke-width%3D%223%22%20stroke-linejoin%3D%22round%22%2F%3E%0A%20%20%3Ccircle%20cx%3D%22300%22%20cy%3D%22180%22%20r%3D%227%22%20fill%3D%22%236366F1%22%2F%3E%0A%20%20%3Ctext%20x%3D%22300%22%20y%3D%22280%22%20font-family%3D%22system-ui%2C%20-apple-system%2C%20sans-serif%22%20font-size%3D%2218%22%20font-weight%3D%22600%22%20fill%3D%22%23F9FAFB%22%20text-anchor%3D%22middle%22%3EFlexible%20Cable%20Management%20Spine%3C%2Ftext%3E%0A%20%20%3Ctext%20x%3D%22300%22%20y%3D%22310%22%20font-family%3D%22system-ui%2C%20-apple-system%2C%20sans-serif%22%20font-size%3D%2213%22%20font-weight%3D%22500%22%20fill%3D%22%239CA3AF%22%20text-anchor%3D%22middle%22%3EOffice%20%26amp%3B%20Workspace%20%E2%80%A2%20SKU%3A%20OFF-SPIN-043%3C%2Ftext%3E%0A%20%20%3Crect%20x%3D%22140%22%20y%3D%22360%22%20width%3D%22320%22%20height%3D%2230%22%20rx%3D%228%22%20fill%3D%22%23111827%22%20stroke%3D%22%23374151%22%20stroke-width%3D%221%22%2F%3E%0A%20%20%3Ctext%20x%3D%22300%22%20y%3D%22380%22%20font-family%3D%22system-ui%2C%20-apple-system%2C%20sans-serif%22%20font-size%3D%2211%22%20font-weight%3D%22500%22%20fill%3D%22%236B7280%22%20text-anchor%3D%22middle%22%3ESynthetic%20Specification%20%E2%80%A2%20CC0%201.0%20Universal%3C%2Ftext%3E%0A%3C%2Fsvg%3E",
    "tag": "Synthetic Demo",
    "badge_type": "demo",
    "is_demo": true,
    "catalogue_source": "aptdot_synthetic",
    "lifecycle_status": "active",
    "verification_tier": "demo",
    "seller": {
      "name": "Aptdot Sample Goods",
      "verifiedStatus": "Synthetic Demo Catalogue",
      "authorizedPartner": false,
      "rating": 4.5,
      "location": "Synthetic Sandbox",
      "fulfillment": "Simulated Delivery (Non-Commercial)",
      "synthetic_notice": "This item belongs to the Aptdot CC0 Synthetic Benchmark Catalogue. It cannot be purchased for real fulfillment."
    },
    "evidence": {
      "source": "Aptdot Synthetic E-Commerce Product Catalog v1.0.0",
      "license": "CC0-1.0 Universal",
      "sku": "OFF-SPIN-043",
      "dataset_source": "https://www.aptdot.com/datasets/ecommerce-product-catalog/",
      "is_synthetic": true
    },
    "specs": {
      "aptdot_id": "prod_043",
      "sku": "OFF-SPIN-043",
      "product_type": "Office & Workspace > Cable Management",
      "cost_price": 6,
      "low_stock_threshold": 15,
      "availability": "in_stock",
      "availability_date": null,
      "dimensions": {
        "weight_g": 400,
        "length_cm": 30,
        "width_cm": 10,
        "height_cm": 6
      },
      "options": [
        {
          "name": "Color",
          "values": [
            "Black",
            "White"
          ]
        }
      ],
      "variants": [
        {
          "variant_id": "var_043_bla",
          "uuid": "019e6006-82e0-747c-a406-56acbce4148f",
          "sku": "OFF-SPIN-043-BLA",
          "title": "Black",
          "options": {
            "Color": "Black"
          },
          "price": 24,
          "compare_at_price": null,
          "stock": 47
        },
        {
          "variant_id": "var_043_whi",
          "uuid": "019e6006-82e0-7863-af9d-51c26c612f78",
          "sku": "OFF-SPIN-043-WHI",
          "title": "White",
          "options": {
            "Color": "White"
          },
          "price": 24,
          "compare_at_price": null,
          "stock": 33
        }
      ],
      "total_variants": 2
    },
    "variants": [
      {
        "variant_id": "var_043_bla",
        "id": "019e6006-82e0-747c-a406-56acbce4148f",
        "uuid": "019e6006-82e0-747c-a406-56acbce4148f",
        "sku": "OFF-SPIN-043-BLA",
        "title": "Black",
        "options": {
          "Color": "Black"
        },
        "price": 24,
        "compare_at_price": null,
        "stock": 47,
        "in_stock": true
      },
      {
        "variant_id": "var_043_whi",
        "id": "019e6006-82e0-7863-af9d-51c26c612f78",
        "uuid": "019e6006-82e0-7863-af9d-51c26c612f78",
        "sku": "OFF-SPIN-043-WHI",
        "title": "White",
        "options": {
          "Color": "White"
        },
        "price": 24,
        "compare_at_price": null,
        "stock": 33,
        "in_stock": true
      }
    ],
    "options": [
      {
        "name": "Color",
        "values": [
          "Black",
          "White"
        ]
      }
    ],
    "warranty": "Simulated 1-Year Synthetic Warranty (Demo Only)",
    "return_policy": "Simulated 30-Day Sandbox Returns (Demo Only)",
    "risk_assessment": "Synthetic Demo Item: Fictional specifications for testing and benchmarking only."
  },
  {
    "id": "019e9cb2-6ec0-7335-b55c-812671076797",
    "slug": "aptdot-ergonomic-mesh-office-chair",
    "title": "Ergonomic Mesh Office Chair",
    "name": "Ergonomic Mesh Office Chair",
    "brand": "Aptdot Sample Goods",
    "category": "Office & Workspace",
    "description": "Breathable mesh chair with adjustable lumbar support, 3D armrests and synchro tilt.",
    "price": 349,
    "original_price": 429,
    "currency": "USD",
    "rating": 4.9,
    "reviews_count": 187,
    "stock": 90,
    "in_stock": true,
    "image_url": "data:image/svg+xml;utf8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%20600%20450%22%20width%3D%22600%22%20height%3D%22450%22%3E%0A%20%20%3Cdefs%3E%0A%20%20%20%20%3ClinearGradient%20id%3D%22bgGrad%22%20x1%3D%220%25%22%20y1%3D%220%25%22%20x2%3D%22100%25%22%20y2%3D%22100%25%22%3E%0A%20%20%20%20%20%20%3Cstop%20offset%3D%220%25%22%20stop-color%3D%22%230B0F19%22%2F%3E%0A%20%20%20%20%20%20%3Cstop%20offset%3D%22100%25%22%20stop-color%3D%22%23111827%22%2F%3E%0A%20%20%20%20%3C%2FlinearGradient%3E%0A%20%20%20%20%3ClinearGradient%20id%3D%22accentGrad%22%20x1%3D%220%25%22%20y1%3D%220%25%22%20x2%3D%22100%25%22%20y2%3D%220%25%22%3E%0A%20%20%20%20%20%20%3Cstop%20offset%3D%220%25%22%20stop-color%3D%22%236366F1%22%20stop-opacity%3D%220.9%22%2F%3E%0A%20%20%20%20%20%20%3Cstop%20offset%3D%22100%25%22%20stop-color%3D%22%236366F1%22%20stop-opacity%3D%220.9%22%2F%3E%0A%20%20%20%20%3C%2FlinearGradient%3E%0A%20%20%3C%2Fdefs%3E%0A%20%20%3Crect%20width%3D%22600%22%20height%3D%22450%22%20fill%3D%22url(%23bgGrad)%22%2F%3E%0A%20%20%3Crect%20x%3D%2220%22%20y%3D%2220%22%20width%3D%22560%22%20height%3D%22410%22%20rx%3D%2216%22%20fill%3D%22none%22%20stroke%3D%22url(%23accentGrad)%22%20stroke-width%3D%222%22%20stroke-dasharray%3D%226%2C6%22%20opacity%3D%220.6%22%2F%3E%0A%20%20%3Crect%20x%3D%22175%22%20y%3D%2250%22%20width%3D%22250%22%20height%3D%2234%22%20rx%3D%2217%22%20fill%3D%22%23312E81%22%20stroke%3D%22%236366F1%22%20stroke-width%3D%221.5%22%2F%3E%0A%20%20%3Ctext%20x%3D%22300%22%20y%3D%2272%22%20font-family%3D%22system-ui%2C%20-apple-system%2C%20sans-serif%22%20font-size%3D%2212%22%20font-weight%3D%22700%22%20fill%3D%22%23C7D2FE%22%20text-anchor%3D%22middle%22%20letter-spacing%3D%221.5%22%3EAPTDOT%20SYNTHETIC%20DEMO%3C%2Ftext%3E%0A%20%20%3Crect%20x%3D%22235%22%20y%3D%22125%22%20width%3D%22130%22%20height%3D%22110%22%20rx%3D%2214%22%20fill%3D%22%231F2937%22%20stroke%3D%22%236366F1%22%20stroke-width%3D%222%22%2F%3E%0A%20%20%3Cpath%20d%3D%22M275%20180%20L300%20155%20L325%20180%20L300%20205%20Z%22%20fill%3D%22none%22%20stroke%3D%22%236366F1%22%20stroke-width%3D%223%22%20stroke-linejoin%3D%22round%22%2F%3E%0A%20%20%3Ccircle%20cx%3D%22300%22%20cy%3D%22180%22%20r%3D%227%22%20fill%3D%22%236366F1%22%2F%3E%0A%20%20%3Ctext%20x%3D%22300%22%20y%3D%22280%22%20font-family%3D%22system-ui%2C%20-apple-system%2C%20sans-serif%22%20font-size%3D%2218%22%20font-weight%3D%22600%22%20fill%3D%22%23F9FAFB%22%20text-anchor%3D%22middle%22%3EErgonomic%20Mesh%20Office%20Chair%3C%2Ftext%3E%0A%20%20%3Ctext%20x%3D%22300%22%20y%3D%22310%22%20font-family%3D%22system-ui%2C%20-apple-system%2C%20sans-serif%22%20font-size%3D%2213%22%20font-weight%3D%22500%22%20fill%3D%22%239CA3AF%22%20text-anchor%3D%22middle%22%3EOffice%20%26amp%3B%20Workspace%20%E2%80%A2%20SKU%3A%20OFF-CHR-044%3C%2Ftext%3E%0A%20%20%3Crect%20x%3D%22140%22%20y%3D%22360%22%20width%3D%22320%22%20height%3D%2230%22%20rx%3D%228%22%20fill%3D%22%23111827%22%20stroke%3D%22%23374151%22%20stroke-width%3D%221%22%2F%3E%0A%20%20%3Ctext%20x%3D%22300%22%20y%3D%22380%22%20font-family%3D%22system-ui%2C%20-apple-system%2C%20sans-serif%22%20font-size%3D%2211%22%20font-weight%3D%22500%22%20fill%3D%22%236B7280%22%20text-anchor%3D%22middle%22%3ESynthetic%20Specification%20%E2%80%A2%20CC0%201.0%20Universal%3C%2Ftext%3E%0A%3C%2Fsvg%3E",
    "tag": "On Sale",
    "badge_type": "demo",
    "is_demo": true,
    "catalogue_source": "aptdot_synthetic",
    "lifecycle_status": "active",
    "verification_tier": "demo",
    "seller": {
      "name": "Aptdot Sample Goods",
      "verifiedStatus": "Synthetic Demo Catalogue",
      "authorizedPartner": false,
      "rating": 4.9,
      "location": "Synthetic Sandbox",
      "fulfillment": "Simulated Delivery (Non-Commercial)",
      "synthetic_notice": "This item belongs to the Aptdot CC0 Synthetic Benchmark Catalogue. It cannot be purchased for real fulfillment."
    },
    "evidence": {
      "source": "Aptdot Synthetic E-Commerce Product Catalog v1.0.0",
      "license": "CC0-1.0 Universal",
      "sku": "OFF-CHR-044",
      "dataset_source": "https://www.aptdot.com/datasets/ecommerce-product-catalog/",
      "is_synthetic": true
    },
    "specs": {
      "aptdot_id": "prod_044",
      "sku": "OFF-CHR-044",
      "product_type": "Office & Workspace > Seating",
      "cost_price": 140,
      "low_stock_threshold": 8,
      "availability": "in_stock",
      "availability_date": null,
      "dimensions": {
        "weight_g": 15000,
        "length_cm": 70,
        "width_cm": 65,
        "height_cm": 35
      },
      "options": [
        {
          "name": "Color",
          "values": [
            "Black",
            "Gray"
          ]
        }
      ],
      "variants": [
        {
          "variant_id": "var_044_bla",
          "uuid": "019e9cb2-6ec0-778d-81a0-88cab1d6bfa7",
          "sku": "OFF-CHR-044-BLA",
          "title": "Black",
          "options": {
            "Color": "Black"
          },
          "price": 349,
          "compare_at_price": 429,
          "stock": 44
        },
        {
          "variant_id": "var_044_gra",
          "uuid": "019e9cb2-6ec0-7ff6-8f1b-900525be4232",
          "sku": "OFF-CHR-044-GRA",
          "title": "Gray",
          "options": {
            "Color": "Gray"
          },
          "price": 349,
          "compare_at_price": 429,
          "stock": 46
        }
      ],
      "total_variants": 2
    },
    "variants": [
      {
        "variant_id": "var_044_bla",
        "id": "019e9cb2-6ec0-778d-81a0-88cab1d6bfa7",
        "uuid": "019e9cb2-6ec0-778d-81a0-88cab1d6bfa7",
        "sku": "OFF-CHR-044-BLA",
        "title": "Black",
        "options": {
          "Color": "Black"
        },
        "price": 349,
        "compare_at_price": 429,
        "stock": 44,
        "in_stock": true
      },
      {
        "variant_id": "var_044_gra",
        "id": "019e9cb2-6ec0-7ff6-8f1b-900525be4232",
        "uuid": "019e9cb2-6ec0-7ff6-8f1b-900525be4232",
        "sku": "OFF-CHR-044-GRA",
        "title": "Gray",
        "options": {
          "Color": "Gray"
        },
        "price": 349,
        "compare_at_price": 429,
        "stock": 46,
        "in_stock": true
      }
    ],
    "options": [
      {
        "name": "Color",
        "values": [
          "Black",
          "Gray"
        ]
      }
    ],
    "warranty": "Simulated 1-Year Synthetic Warranty (Demo Only)",
    "return_policy": "Simulated 30-Day Sandbox Returns (Demo Only)",
    "risk_assessment": "Synthetic Demo Item: Fictional specifications for testing and benchmarking only."
  },
  {
    "id": "019edaec-9bc0-7e00-9b19-c7c66b892aa0",
    "slug": "aptdot-dot-grid-hardcover-notebook-a5",
    "title": "Dot Grid Hardcover Notebook, A5",
    "name": "Dot Grid Hardcover Notebook, A5",
    "brand": "Aptdot Sample Goods",
    "category": "Office & Workspace",
    "description": "192-page A5 notebook with 100 gsm dot grid paper, lay-flat binding and two ribbon markers.",
    "price": 16,
    "original_price": null,
    "currency": "USD",
    "rating": 4.8,
    "reviews_count": 36,
    "stock": 70,
    "in_stock": true,
    "image_url": "data:image/svg+xml;utf8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%20600%20450%22%20width%3D%22600%22%20height%3D%22450%22%3E%0A%20%20%3Cdefs%3E%0A%20%20%20%20%3ClinearGradient%20id%3D%22bgGrad%22%20x1%3D%220%25%22%20y1%3D%220%25%22%20x2%3D%22100%25%22%20y2%3D%22100%25%22%3E%0A%20%20%20%20%20%20%3Cstop%20offset%3D%220%25%22%20stop-color%3D%22%230B0F19%22%2F%3E%0A%20%20%20%20%20%20%3Cstop%20offset%3D%22100%25%22%20stop-color%3D%22%23111827%22%2F%3E%0A%20%20%20%20%3C%2FlinearGradient%3E%0A%20%20%20%20%3ClinearGradient%20id%3D%22accentGrad%22%20x1%3D%220%25%22%20y1%3D%220%25%22%20x2%3D%22100%25%22%20y2%3D%220%25%22%3E%0A%20%20%20%20%20%20%3Cstop%20offset%3D%220%25%22%20stop-color%3D%22%236366F1%22%20stop-opacity%3D%220.9%22%2F%3E%0A%20%20%20%20%20%20%3Cstop%20offset%3D%22100%25%22%20stop-color%3D%22%236366F1%22%20stop-opacity%3D%220.9%22%2F%3E%0A%20%20%20%20%3C%2FlinearGradient%3E%0A%20%20%3C%2Fdefs%3E%0A%20%20%3Crect%20width%3D%22600%22%20height%3D%22450%22%20fill%3D%22url(%23bgGrad)%22%2F%3E%0A%20%20%3Crect%20x%3D%2220%22%20y%3D%2220%22%20width%3D%22560%22%20height%3D%22410%22%20rx%3D%2216%22%20fill%3D%22none%22%20stroke%3D%22url(%23accentGrad)%22%20stroke-width%3D%222%22%20stroke-dasharray%3D%226%2C6%22%20opacity%3D%220.6%22%2F%3E%0A%20%20%3Crect%20x%3D%22175%22%20y%3D%2250%22%20width%3D%22250%22%20height%3D%2234%22%20rx%3D%2217%22%20fill%3D%22%23312E81%22%20stroke%3D%22%236366F1%22%20stroke-width%3D%221.5%22%2F%3E%0A%20%20%3Ctext%20x%3D%22300%22%20y%3D%2272%22%20font-family%3D%22system-ui%2C%20-apple-system%2C%20sans-serif%22%20font-size%3D%2212%22%20font-weight%3D%22700%22%20fill%3D%22%23C7D2FE%22%20text-anchor%3D%22middle%22%20letter-spacing%3D%221.5%22%3EAPTDOT%20SYNTHETIC%20DEMO%3C%2Ftext%3E%0A%20%20%3Crect%20x%3D%22235%22%20y%3D%22125%22%20width%3D%22130%22%20height%3D%22110%22%20rx%3D%2214%22%20fill%3D%22%231F2937%22%20stroke%3D%22%236366F1%22%20stroke-width%3D%222%22%2F%3E%0A%20%20%3Cpath%20d%3D%22M275%20180%20L300%20155%20L325%20180%20L300%20205%20Z%22%20fill%3D%22none%22%20stroke%3D%22%236366F1%22%20stroke-width%3D%223%22%20stroke-linejoin%3D%22round%22%2F%3E%0A%20%20%3Ccircle%20cx%3D%22300%22%20cy%3D%22180%22%20r%3D%227%22%20fill%3D%22%236366F1%22%2F%3E%0A%20%20%3Ctext%20x%3D%22300%22%20y%3D%22280%22%20font-family%3D%22system-ui%2C%20-apple-system%2C%20sans-serif%22%20font-size%3D%2218%22%20font-weight%3D%22600%22%20fill%3D%22%23F9FAFB%22%20text-anchor%3D%22middle%22%3EDot%20Grid%20Hardcover%20Notebook%2C%20A5%3C%2Ftext%3E%0A%20%20%3Ctext%20x%3D%22300%22%20y%3D%22310%22%20font-family%3D%22system-ui%2C%20-apple-system%2C%20sans-serif%22%20font-size%3D%2213%22%20font-weight%3D%22500%22%20fill%3D%22%239CA3AF%22%20text-anchor%3D%22middle%22%3EOffice%20%26amp%3B%20Workspace%20%E2%80%A2%20SKU%3A%20OFF-NOTE-045%3C%2Ftext%3E%0A%20%20%3Crect%20x%3D%22140%22%20y%3D%22360%22%20width%3D%22320%22%20height%3D%2230%22%20rx%3D%228%22%20fill%3D%22%23111827%22%20stroke%3D%22%23374151%22%20stroke-width%3D%221%22%2F%3E%0A%20%20%3Ctext%20x%3D%22300%22%20y%3D%22380%22%20font-family%3D%22system-ui%2C%20-apple-system%2C%20sans-serif%22%20font-size%3D%2211%22%20font-weight%3D%22500%22%20fill%3D%22%236B7280%22%20text-anchor%3D%22middle%22%3ESynthetic%20Specification%20%E2%80%A2%20CC0%201.0%20Universal%3C%2Ftext%3E%0A%3C%2Fsvg%3E",
    "tag": "Synthetic Demo",
    "badge_type": "demo",
    "is_demo": true,
    "catalogue_source": "aptdot_synthetic",
    "lifecycle_status": "active",
    "verification_tier": "demo",
    "seller": {
      "name": "Aptdot Sample Goods",
      "verifiedStatus": "Synthetic Demo Catalogue",
      "authorizedPartner": false,
      "rating": 4.8,
      "location": "Synthetic Sandbox",
      "fulfillment": "Simulated Delivery (Non-Commercial)",
      "synthetic_notice": "This item belongs to the Aptdot CC0 Synthetic Benchmark Catalogue. It cannot be purchased for real fulfillment."
    },
    "evidence": {
      "source": "Aptdot Synthetic E-Commerce Product Catalog v1.0.0",
      "license": "CC0-1.0 Universal",
      "sku": "OFF-NOTE-045",
      "dataset_source": "https://www.aptdot.com/datasets/ecommerce-product-catalog/",
      "is_synthetic": true
    },
    "specs": {
      "aptdot_id": "prod_045",
      "sku": "OFF-NOTE-045",
      "product_type": "Office & Workspace > Paper",
      "cost_price": 4,
      "low_stock_threshold": 8,
      "availability": "in_stock",
      "availability_date": null,
      "dimensions": {
        "weight_g": 380,
        "length_cm": 22,
        "width_cm": 15.5,
        "height_cm": 2
      },
      "options": [
        {
          "name": "Color",
          "values": [
            "Black",
            "Navy",
            "Forest"
          ]
        }
      ],
      "variants": [
        {
          "variant_id": "var_045_bla",
          "uuid": "019edaec-9bc0-77eb-b259-f7eeae25b7e9",
          "sku": "OFF-NOTE-045-BLA",
          "title": "Black",
          "options": {
            "Color": "Black"
          },
          "price": 16,
          "compare_at_price": null,
          "stock": 16
        },
        {
          "variant_id": "var_045_nav",
          "uuid": "019edaec-9bc0-787a-9d82-7fb941878f94",
          "sku": "OFF-NOTE-045-NAV",
          "title": "Navy",
          "options": {
            "Color": "Navy"
          },
          "price": 16,
          "compare_at_price": null,
          "stock": 26
        },
        {
          "variant_id": "var_045_for",
          "uuid": "019edaec-9bc0-716d-9aeb-f6366340f6b2",
          "sku": "OFF-NOTE-045-FOR",
          "title": "Forest",
          "options": {
            "Color": "Forest"
          },
          "price": 16,
          "compare_at_price": null,
          "stock": 28
        }
      ],
      "total_variants": 3
    },
    "variants": [
      {
        "variant_id": "var_045_bla",
        "id": "019edaec-9bc0-77eb-b259-f7eeae25b7e9",
        "uuid": "019edaec-9bc0-77eb-b259-f7eeae25b7e9",
        "sku": "OFF-NOTE-045-BLA",
        "title": "Black",
        "options": {
          "Color": "Black"
        },
        "price": 16,
        "compare_at_price": null,
        "stock": 16,
        "in_stock": true
      },
      {
        "variant_id": "var_045_nav",
        "id": "019edaec-9bc0-787a-9d82-7fb941878f94",
        "uuid": "019edaec-9bc0-787a-9d82-7fb941878f94",
        "sku": "OFF-NOTE-045-NAV",
        "title": "Navy",
        "options": {
          "Color": "Navy"
        },
        "price": 16,
        "compare_at_price": null,
        "stock": 26,
        "in_stock": true
      },
      {
        "variant_id": "var_045_for",
        "id": "019edaec-9bc0-716d-9aeb-f6366340f6b2",
        "uuid": "019edaec-9bc0-716d-9aeb-f6366340f6b2",
        "sku": "OFF-NOTE-045-FOR",
        "title": "Forest",
        "options": {
          "Color": "Forest"
        },
        "price": 16,
        "compare_at_price": null,
        "stock": 28,
        "in_stock": true
      }
    ],
    "options": [
      {
        "name": "Color",
        "values": [
          "Black",
          "Navy",
          "Forest"
        ]
      }
    ],
    "warranty": "Simulated 1-Year Synthetic Warranty (Demo Only)",
    "return_policy": "Simulated 30-Day Sandbox Returns (Demo Only)",
    "risk_assessment": "Synthetic Demo Item: Fictional specifications for testing and benchmarking only."
  },
  {
    "id": "019f19d9-4fe0-7afa-8be7-c30cce2ff0f0",
    "slug": "aptdot-gel-ink-pens-12-pack",
    "title": "Gel Ink Pens, 12-Pack",
    "name": "Gel Ink Pens, 12-Pack",
    "brand": "Aptdot Sample Goods",
    "category": "Office & Workspace",
    "description": "Quick-drying 0.5 mm gel pens with comfortable grips.",
    "price": 12.99,
    "original_price": null,
    "currency": "USD",
    "rating": 3.7,
    "reviews_count": 89,
    "stock": 62,
    "in_stock": true,
    "image_url": "data:image/svg+xml;utf8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%20600%20450%22%20width%3D%22600%22%20height%3D%22450%22%3E%0A%20%20%3Cdefs%3E%0A%20%20%20%20%3ClinearGradient%20id%3D%22bgGrad%22%20x1%3D%220%25%22%20y1%3D%220%25%22%20x2%3D%22100%25%22%20y2%3D%22100%25%22%3E%0A%20%20%20%20%20%20%3Cstop%20offset%3D%220%25%22%20stop-color%3D%22%230B0F19%22%2F%3E%0A%20%20%20%20%20%20%3Cstop%20offset%3D%22100%25%22%20stop-color%3D%22%23111827%22%2F%3E%0A%20%20%20%20%3C%2FlinearGradient%3E%0A%20%20%20%20%3ClinearGradient%20id%3D%22accentGrad%22%20x1%3D%220%25%22%20y1%3D%220%25%22%20x2%3D%22100%25%22%20y2%3D%220%25%22%3E%0A%20%20%20%20%20%20%3Cstop%20offset%3D%220%25%22%20stop-color%3D%22%236366F1%22%20stop-opacity%3D%220.9%22%2F%3E%0A%20%20%20%20%20%20%3Cstop%20offset%3D%22100%25%22%20stop-color%3D%22%236366F1%22%20stop-opacity%3D%220.9%22%2F%3E%0A%20%20%20%20%3C%2FlinearGradient%3E%0A%20%20%3C%2Fdefs%3E%0A%20%20%3Crect%20width%3D%22600%22%20height%3D%22450%22%20fill%3D%22url(%23bgGrad)%22%2F%3E%0A%20%20%3Crect%20x%3D%2220%22%20y%3D%2220%22%20width%3D%22560%22%20height%3D%22410%22%20rx%3D%2216%22%20fill%3D%22none%22%20stroke%3D%22url(%23accentGrad)%22%20stroke-width%3D%222%22%20stroke-dasharray%3D%226%2C6%22%20opacity%3D%220.6%22%2F%3E%0A%20%20%3Crect%20x%3D%22175%22%20y%3D%2250%22%20width%3D%22250%22%20height%3D%2234%22%20rx%3D%2217%22%20fill%3D%22%23312E81%22%20stroke%3D%22%236366F1%22%20stroke-width%3D%221.5%22%2F%3E%0A%20%20%3Ctext%20x%3D%22300%22%20y%3D%2272%22%20font-family%3D%22system-ui%2C%20-apple-system%2C%20sans-serif%22%20font-size%3D%2212%22%20font-weight%3D%22700%22%20fill%3D%22%23C7D2FE%22%20text-anchor%3D%22middle%22%20letter-spacing%3D%221.5%22%3EAPTDOT%20SYNTHETIC%20DEMO%3C%2Ftext%3E%0A%20%20%3Crect%20x%3D%22235%22%20y%3D%22125%22%20width%3D%22130%22%20height%3D%22110%22%20rx%3D%2214%22%20fill%3D%22%231F2937%22%20stroke%3D%22%236366F1%22%20stroke-width%3D%222%22%2F%3E%0A%20%20%3Cpath%20d%3D%22M275%20180%20L300%20155%20L325%20180%20L300%20205%20Z%22%20fill%3D%22none%22%20stroke%3D%22%236366F1%22%20stroke-width%3D%223%22%20stroke-linejoin%3D%22round%22%2F%3E%0A%20%20%3Ccircle%20cx%3D%22300%22%20cy%3D%22180%22%20r%3D%227%22%20fill%3D%22%236366F1%22%2F%3E%0A%20%20%3Ctext%20x%3D%22300%22%20y%3D%22280%22%20font-family%3D%22system-ui%2C%20-apple-system%2C%20sans-serif%22%20font-size%3D%2218%22%20font-weight%3D%22600%22%20fill%3D%22%23F9FAFB%22%20text-anchor%3D%22middle%22%3EGel%20Ink%20Pens%2C%2012-Pack%3C%2Ftext%3E%0A%20%20%3Ctext%20x%3D%22300%22%20y%3D%22310%22%20font-family%3D%22system-ui%2C%20-apple-system%2C%20sans-serif%22%20font-size%3D%2213%22%20font-weight%3D%22500%22%20fill%3D%22%239CA3AF%22%20text-anchor%3D%22middle%22%3EOffice%20%26amp%3B%20Workspace%20%E2%80%A2%20SKU%3A%20OFF-PEN-046%3C%2Ftext%3E%0A%20%20%3Crect%20x%3D%22140%22%20y%3D%22360%22%20width%3D%22320%22%20height%3D%2230%22%20rx%3D%228%22%20fill%3D%22%23111827%22%20stroke%3D%22%23374151%22%20stroke-width%3D%221%22%2F%3E%0A%20%20%3Ctext%20x%3D%22300%22%20y%3D%22380%22%20font-family%3D%22system-ui%2C%20-apple-system%2C%20sans-serif%22%20font-size%3D%2211%22%20font-weight%3D%22500%22%20fill%3D%22%236B7280%22%20text-anchor%3D%22middle%22%3ESynthetic%20Specification%20%E2%80%A2%20CC0%201.0%20Universal%3C%2Ftext%3E%0A%3C%2Fsvg%3E",
    "tag": "Synthetic Demo",
    "badge_type": "demo",
    "is_demo": true,
    "catalogue_source": "aptdot_synthetic",
    "lifecycle_status": "active",
    "verification_tier": "demo",
    "seller": {
      "name": "Aptdot Sample Goods",
      "verifiedStatus": "Synthetic Demo Catalogue",
      "authorizedPartner": false,
      "rating": 3.7,
      "location": "Synthetic Sandbox",
      "fulfillment": "Simulated Delivery (Non-Commercial)",
      "synthetic_notice": "This item belongs to the Aptdot CC0 Synthetic Benchmark Catalogue. It cannot be purchased for real fulfillment."
    },
    "evidence": {
      "source": "Aptdot Synthetic E-Commerce Product Catalog v1.0.0",
      "license": "CC0-1.0 Universal",
      "sku": "OFF-PEN-046",
      "dataset_source": "https://www.aptdot.com/datasets/ecommerce-product-catalog/",
      "is_synthetic": true
    },
    "specs": {
      "aptdot_id": "prod_046",
      "sku": "OFF-PEN-046",
      "product_type": "Office & Workspace > Writing",
      "cost_price": 3.2,
      "low_stock_threshold": 12,
      "availability": "in_stock",
      "availability_date": null,
      "dimensions": {
        "weight_g": 150,
        "length_cm": 16,
        "width_cm": 10,
        "height_cm": 2
      },
      "options": [
        {
          "name": "Ink",
          "values": [
            "Black",
            "Blue",
            "Assorted"
          ]
        }
      ],
      "variants": [
        {
          "variant_id": "var_046_bla",
          "uuid": "019f19d9-4fe0-7c8f-902a-33031b73cfab",
          "sku": "OFF-PEN-046-BLA",
          "title": "Black",
          "options": {
            "Ink": "Black"
          },
          "price": 12.99,
          "compare_at_price": null,
          "stock": 14
        },
        {
          "variant_id": "var_046_blu",
          "uuid": "019f19d9-4fe0-7d24-b140-763cafa2c899",
          "sku": "OFF-PEN-046-BLU",
          "title": "Blue",
          "options": {
            "Ink": "Blue"
          },
          "price": 12.99,
          "compare_at_price": null,
          "stock": 12
        },
        {
          "variant_id": "var_046_mix",
          "uuid": "019f19d9-4fe0-74cf-b858-23d9624d9757",
          "sku": "OFF-PEN-046-MIX",
          "title": "Assorted",
          "options": {
            "Ink": "Assorted"
          },
          "price": 12.99,
          "compare_at_price": null,
          "stock": 36
        }
      ],
      "total_variants": 3
    },
    "variants": [
      {
        "variant_id": "var_046_bla",
        "id": "019f19d9-4fe0-7c8f-902a-33031b73cfab",
        "uuid": "019f19d9-4fe0-7c8f-902a-33031b73cfab",
        "sku": "OFF-PEN-046-BLA",
        "title": "Black",
        "options": {
          "Ink": "Black"
        },
        "price": 12.99,
        "compare_at_price": null,
        "stock": 14,
        "in_stock": true
      },
      {
        "variant_id": "var_046_blu",
        "id": "019f19d9-4fe0-7d24-b140-763cafa2c899",
        "uuid": "019f19d9-4fe0-7d24-b140-763cafa2c899",
        "sku": "OFF-PEN-046-BLU",
        "title": "Blue",
        "options": {
          "Ink": "Blue"
        },
        "price": 12.99,
        "compare_at_price": null,
        "stock": 12,
        "in_stock": true
      },
      {
        "variant_id": "var_046_mix",
        "id": "019f19d9-4fe0-74cf-b858-23d9624d9757",
        "uuid": "019f19d9-4fe0-74cf-b858-23d9624d9757",
        "sku": "OFF-PEN-046-MIX",
        "title": "Assorted",
        "options": {
          "Ink": "Assorted"
        },
        "price": 12.99,
        "compare_at_price": null,
        "stock": 36,
        "in_stock": true
      }
    ],
    "options": [
      {
        "name": "Ink",
        "values": [
          "Black",
          "Blue",
          "Assorted"
        ]
      }
    ],
    "warranty": "Simulated 1-Year Synthetic Warranty (Demo Only)",
    "return_policy": "Simulated 30-Day Sandbox Returns (Demo Only)",
    "risk_assessment": "Synthetic Demo Item: Fictional specifications for testing and benchmarking only."
  },
  {
    "id": "01a0fc7c-4e00-72c8-8945-4dae608b4af5",
    "slug": "aptdot-bamboo-desk-drawer-organizer",
    "title": "Bamboo Desk Drawer Organizer",
    "name": "Bamboo Desk Drawer Organizer",
    "brand": "Aptdot Sample Goods",
    "category": "Office & Workspace",
    "description": "Expandable bamboo drawer organizer with seven compartments. Newly added, no reviews yet.",
    "price": 27,
    "original_price": null,
    "currency": "USD",
    "rating": 4.5,
    "reviews_count": 0,
    "stock": 32,
    "in_stock": true,
    "image_url": "data:image/svg+xml;utf8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%20600%20450%22%20width%3D%22600%22%20height%3D%22450%22%3E%0A%20%20%3Cdefs%3E%0A%20%20%20%20%3ClinearGradient%20id%3D%22bgGrad%22%20x1%3D%220%25%22%20y1%3D%220%25%22%20x2%3D%22100%25%22%20y2%3D%22100%25%22%3E%0A%20%20%20%20%20%20%3Cstop%20offset%3D%220%25%22%20stop-color%3D%22%230B0F19%22%2F%3E%0A%20%20%20%20%20%20%3Cstop%20offset%3D%22100%25%22%20stop-color%3D%22%23111827%22%2F%3E%0A%20%20%20%20%3C%2FlinearGradient%3E%0A%20%20%20%20%3ClinearGradient%20id%3D%22accentGrad%22%20x1%3D%220%25%22%20y1%3D%220%25%22%20x2%3D%22100%25%22%20y2%3D%220%25%22%3E%0A%20%20%20%20%20%20%3Cstop%20offset%3D%220%25%22%20stop-color%3D%22%236366F1%22%20stop-opacity%3D%220.9%22%2F%3E%0A%20%20%20%20%20%20%3Cstop%20offset%3D%22100%25%22%20stop-color%3D%22%236366F1%22%20stop-opacity%3D%220.9%22%2F%3E%0A%20%20%20%20%3C%2FlinearGradient%3E%0A%20%20%3C%2Fdefs%3E%0A%20%20%3Crect%20width%3D%22600%22%20height%3D%22450%22%20fill%3D%22url(%23bgGrad)%22%2F%3E%0A%20%20%3Crect%20x%3D%2220%22%20y%3D%2220%22%20width%3D%22560%22%20height%3D%22410%22%20rx%3D%2216%22%20fill%3D%22none%22%20stroke%3D%22url(%23accentGrad)%22%20stroke-width%3D%222%22%20stroke-dasharray%3D%226%2C6%22%20opacity%3D%220.6%22%2F%3E%0A%20%20%3Crect%20x%3D%22175%22%20y%3D%2250%22%20width%3D%22250%22%20height%3D%2234%22%20rx%3D%2217%22%20fill%3D%22%23312E81%22%20stroke%3D%22%236366F1%22%20stroke-width%3D%221.5%22%2F%3E%0A%20%20%3Ctext%20x%3D%22300%22%20y%3D%2272%22%20font-family%3D%22system-ui%2C%20-apple-system%2C%20sans-serif%22%20font-size%3D%2212%22%20font-weight%3D%22700%22%20fill%3D%22%23C7D2FE%22%20text-anchor%3D%22middle%22%20letter-spacing%3D%221.5%22%3EAPTDOT%20SYNTHETIC%20DEMO%3C%2Ftext%3E%0A%20%20%3Crect%20x%3D%22235%22%20y%3D%22125%22%20width%3D%22130%22%20height%3D%22110%22%20rx%3D%2214%22%20fill%3D%22%231F2937%22%20stroke%3D%22%236366F1%22%20stroke-width%3D%222%22%2F%3E%0A%20%20%3Cpath%20d%3D%22M275%20180%20L300%20155%20L325%20180%20L300%20205%20Z%22%20fill%3D%22none%22%20stroke%3D%22%236366F1%22%20stroke-width%3D%223%22%20stroke-linejoin%3D%22round%22%2F%3E%0A%20%20%3Ccircle%20cx%3D%22300%22%20cy%3D%22180%22%20r%3D%227%22%20fill%3D%22%236366F1%22%2F%3E%0A%20%20%3Ctext%20x%3D%22300%22%20y%3D%22280%22%20font-family%3D%22system-ui%2C%20-apple-system%2C%20sans-serif%22%20font-size%3D%2218%22%20font-weight%3D%22600%22%20fill%3D%22%23F9FAFB%22%20text-anchor%3D%22middle%22%3EBamboo%20Desk%20Drawer%20Organizer%3C%2Ftext%3E%0A%20%20%3Ctext%20x%3D%22300%22%20y%3D%22310%22%20font-family%3D%22system-ui%2C%20-apple-system%2C%20sans-serif%22%20font-size%3D%2213%22%20font-weight%3D%22500%22%20fill%3D%22%239CA3AF%22%20text-anchor%3D%22middle%22%3EOffice%20%26amp%3B%20Workspace%20%E2%80%A2%20SKU%3A%20OFF-ORG-047%3C%2Ftext%3E%0A%20%20%3Crect%20x%3D%22140%22%20y%3D%22360%22%20width%3D%22320%22%20height%3D%2230%22%20rx%3D%228%22%20fill%3D%22%23111827%22%20stroke%3D%22%23374151%22%20stroke-width%3D%221%22%2F%3E%0A%20%20%3Ctext%20x%3D%22300%22%20y%3D%22380%22%20font-family%3D%22system-ui%2C%20-apple-system%2C%20sans-serif%22%20font-size%3D%2211%22%20font-weight%3D%22500%22%20fill%3D%22%236B7280%22%20text-anchor%3D%22middle%22%3ESynthetic%20Specification%20%E2%80%A2%20CC0%201.0%20Universal%3C%2Ftext%3E%0A%3C%2Fsvg%3E",
    "tag": "Synthetic Demo",
    "badge_type": "demo",
    "is_demo": true,
    "catalogue_source": "aptdot_synthetic",
    "lifecycle_status": "active",
    "verification_tier": "demo",
    "seller": {
      "name": "Aptdot Sample Goods",
      "verifiedStatus": "Synthetic Demo Catalogue",
      "authorizedPartner": false,
      "rating": 4.5,
      "location": "Synthetic Sandbox",
      "fulfillment": "Simulated Delivery (Non-Commercial)",
      "synthetic_notice": "This item belongs to the Aptdot CC0 Synthetic Benchmark Catalogue. It cannot be purchased for real fulfillment."
    },
    "evidence": {
      "source": "Aptdot Synthetic E-Commerce Product Catalog v1.0.0",
      "license": "CC0-1.0 Universal",
      "sku": "OFF-ORG-047",
      "dataset_source": "https://www.aptdot.com/datasets/ecommerce-product-catalog/",
      "is_synthetic": true
    },
    "specs": {
      "aptdot_id": "prod_047",
      "sku": "OFF-ORG-047",
      "product_type": "Office & Workspace > Desk Accessories",
      "cost_price": 9,
      "low_stock_threshold": 15,
      "availability": "in_stock",
      "availability_date": null,
      "dimensions": {
        "weight_g": 900,
        "length_cm": 40,
        "width_cm": 30,
        "height_cm": 6
      },
      "options": [],
      "variants": [
        {
          "variant_id": "var_047_default",
          "uuid": "01a0fc7c-4e00-75d6-a4e0-54ae5b2a5796",
          "sku": "OFF-ORG-047",
          "title": "Default",
          "options": {},
          "price": 27,
          "compare_at_price": null,
          "stock": 32
        }
      ],
      "total_variants": 1
    },
    "variants": [
      {
        "variant_id": "var_047_default",
        "id": "01a0fc7c-4e00-75d6-a4e0-54ae5b2a5796",
        "uuid": "01a0fc7c-4e00-75d6-a4e0-54ae5b2a5796",
        "sku": "OFF-ORG-047",
        "title": "Default",
        "options": {},
        "price": 27,
        "compare_at_price": null,
        "stock": 32,
        "in_stock": true
      }
    ],
    "options": [],
    "warranty": "Simulated 1-Year Synthetic Warranty (Demo Only)",
    "return_policy": "Simulated 30-Day Sandbox Returns (Demo Only)",
    "risk_assessment": "Synthetic Demo Item: Fictional specifications for testing and benchmarking only."
  },
  {
    "id": "019f9375-d1c0-7a64-908d-7e1c29c38247",
    "slug": "aptdot-ergonomic-under-desk-footrest",
    "title": "Ergonomic Under-Desk Footrest",
    "name": "Ergonomic Under-Desk Footrest",
    "brand": "Aptdot Sample Goods",
    "category": "Office & Workspace",
    "description": "Height-adjustable footrest with a textured massage surface and a tilting platform.",
    "price": 39,
    "original_price": null,
    "currency": "USD",
    "rating": 4.8,
    "reviews_count": 415,
    "stock": 92,
    "in_stock": true,
    "image_url": "data:image/svg+xml;utf8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%20600%20450%22%20width%3D%22600%22%20height%3D%22450%22%3E%0A%20%20%3Cdefs%3E%0A%20%20%20%20%3ClinearGradient%20id%3D%22bgGrad%22%20x1%3D%220%25%22%20y1%3D%220%25%22%20x2%3D%22100%25%22%20y2%3D%22100%25%22%3E%0A%20%20%20%20%20%20%3Cstop%20offset%3D%220%25%22%20stop-color%3D%22%230B0F19%22%2F%3E%0A%20%20%20%20%20%20%3Cstop%20offset%3D%22100%25%22%20stop-color%3D%22%23111827%22%2F%3E%0A%20%20%20%20%3C%2FlinearGradient%3E%0A%20%20%20%20%3ClinearGradient%20id%3D%22accentGrad%22%20x1%3D%220%25%22%20y1%3D%220%25%22%20x2%3D%22100%25%22%20y2%3D%220%25%22%3E%0A%20%20%20%20%20%20%3Cstop%20offset%3D%220%25%22%20stop-color%3D%22%236366F1%22%20stop-opacity%3D%220.9%22%2F%3E%0A%20%20%20%20%20%20%3Cstop%20offset%3D%22100%25%22%20stop-color%3D%22%236366F1%22%20stop-opacity%3D%220.9%22%2F%3E%0A%20%20%20%20%3C%2FlinearGradient%3E%0A%20%20%3C%2Fdefs%3E%0A%20%20%3Crect%20width%3D%22600%22%20height%3D%22450%22%20fill%3D%22url(%23bgGrad)%22%2F%3E%0A%20%20%3Crect%20x%3D%2220%22%20y%3D%2220%22%20width%3D%22560%22%20height%3D%22410%22%20rx%3D%2216%22%20fill%3D%22none%22%20stroke%3D%22url(%23accentGrad)%22%20stroke-width%3D%222%22%20stroke-dasharray%3D%226%2C6%22%20opacity%3D%220.6%22%2F%3E%0A%20%20%3Crect%20x%3D%22175%22%20y%3D%2250%22%20width%3D%22250%22%20height%3D%2234%22%20rx%3D%2217%22%20fill%3D%22%23312E81%22%20stroke%3D%22%236366F1%22%20stroke-width%3D%221.5%22%2F%3E%0A%20%20%3Ctext%20x%3D%22300%22%20y%3D%2272%22%20font-family%3D%22system-ui%2C%20-apple-system%2C%20sans-serif%22%20font-size%3D%2212%22%20font-weight%3D%22700%22%20fill%3D%22%23C7D2FE%22%20text-anchor%3D%22middle%22%20letter-spacing%3D%221.5%22%3EAPTDOT%20SYNTHETIC%20DEMO%3C%2Ftext%3E%0A%20%20%3Crect%20x%3D%22235%22%20y%3D%22125%22%20width%3D%22130%22%20height%3D%22110%22%20rx%3D%2214%22%20fill%3D%22%231F2937%22%20stroke%3D%22%236366F1%22%20stroke-width%3D%222%22%2F%3E%0A%20%20%3Cpath%20d%3D%22M275%20180%20L300%20155%20L325%20180%20L300%20205%20Z%22%20fill%3D%22none%22%20stroke%3D%22%236366F1%22%20stroke-width%3D%223%22%20stroke-linejoin%3D%22round%22%2F%3E%0A%20%20%3Ccircle%20cx%3D%22300%22%20cy%3D%22180%22%20r%3D%227%22%20fill%3D%22%236366F1%22%2F%3E%0A%20%20%3Ctext%20x%3D%22300%22%20y%3D%22280%22%20font-family%3D%22system-ui%2C%20-apple-system%2C%20sans-serif%22%20font-size%3D%2218%22%20font-weight%3D%22600%22%20fill%3D%22%23F9FAFB%22%20text-anchor%3D%22middle%22%3EErgonomic%20Under-Desk%20Footrest%3C%2Ftext%3E%0A%20%20%3Ctext%20x%3D%22300%22%20y%3D%22310%22%20font-family%3D%22system-ui%2C%20-apple-system%2C%20sans-serif%22%20font-size%3D%2213%22%20font-weight%3D%22500%22%20fill%3D%22%239CA3AF%22%20text-anchor%3D%22middle%22%3EOffice%20%26amp%3B%20Workspace%20%E2%80%A2%20SKU%3A%20OFF-FOOT-048%3C%2Ftext%3E%0A%20%20%3Crect%20x%3D%22140%22%20y%3D%22360%22%20width%3D%22320%22%20height%3D%2230%22%20rx%3D%228%22%20fill%3D%22%23111827%22%20stroke%3D%22%23374151%22%20stroke-width%3D%221%22%2F%3E%0A%20%20%3Ctext%20x%3D%22300%22%20y%3D%22380%22%20font-family%3D%22system-ui%2C%20-apple-system%2C%20sans-serif%22%20font-size%3D%2211%22%20font-weight%3D%22500%22%20fill%3D%22%236B7280%22%20text-anchor%3D%22middle%22%3ESynthetic%20Specification%20%E2%80%A2%20CC0%201.0%20Universal%3C%2Ftext%3E%0A%3C%2Fsvg%3E",
    "tag": "Synthetic Demo",
    "badge_type": "demo",
    "is_demo": true,
    "catalogue_source": "aptdot_synthetic",
    "lifecycle_status": "active",
    "verification_tier": "demo",
    "seller": {
      "name": "Aptdot Sample Goods",
      "verifiedStatus": "Synthetic Demo Catalogue",
      "authorizedPartner": false,
      "rating": 4.8,
      "location": "Synthetic Sandbox",
      "fulfillment": "Simulated Delivery (Non-Commercial)",
      "synthetic_notice": "This item belongs to the Aptdot CC0 Synthetic Benchmark Catalogue. It cannot be purchased for real fulfillment."
    },
    "evidence": {
      "source": "Aptdot Synthetic E-Commerce Product Catalog v1.0.0",
      "license": "CC0-1.0 Universal",
      "sku": "OFF-FOOT-048",
      "dataset_source": "https://www.aptdot.com/datasets/ecommerce-product-catalog/",
      "is_synthetic": true
    },
    "specs": {
      "aptdot_id": "prod_048",
      "sku": "OFF-FOOT-048",
      "product_type": "Office & Workspace > Seating",
      "cost_price": 13,
      "low_stock_threshold": 12,
      "availability": "in_stock",
      "availability_date": null,
      "dimensions": {
        "weight_g": 2300,
        "length_cm": 46,
        "width_cm": 35,
        "height_cm": 12
      },
      "options": [],
      "variants": [
        {
          "variant_id": "var_048_default",
          "uuid": "019f9375-d1c0-7cd2-b215-fab3edd6941a",
          "sku": "OFF-FOOT-048",
          "title": "Default",
          "options": {},
          "price": 39,
          "compare_at_price": null,
          "stock": 92
        }
      ],
      "total_variants": 1
    },
    "variants": [
      {
        "variant_id": "var_048_default",
        "id": "019f9375-d1c0-7cd2-b215-fab3edd6941a",
        "uuid": "019f9375-d1c0-7cd2-b215-fab3edd6941a",
        "sku": "OFF-FOOT-048",
        "title": "Default",
        "options": {},
        "price": 39,
        "compare_at_price": null,
        "stock": 92,
        "in_stock": true
      }
    ],
    "options": [],
    "warranty": "Simulated 1-Year Synthetic Warranty (Demo Only)",
    "return_policy": "Simulated 30-Day Sandbox Returns (Demo Only)",
    "risk_assessment": "Synthetic Demo Item: Fictional specifications for testing and benchmarking only."
  },
  {
    "id": "019fd1d9-31a0-72b8-a67b-578760306979",
    "slug": "aptdot-monitor-light-bar",
    "title": "Monitor Light Bar",
    "name": "Monitor Light Bar",
    "brand": "Aptdot Sample Goods",
    "category": "Office & Workspace",
    "description": "Asymmetric LED light bar that clips onto a monitor and lights the desk without screen glare.",
    "price": 54,
    "original_price": 64,
    "currency": "USD",
    "rating": 4.3,
    "reviews_count": 607,
    "stock": 33,
    "in_stock": true,
    "image_url": "data:image/svg+xml;utf8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%20600%20450%22%20width%3D%22600%22%20height%3D%22450%22%3E%0A%20%20%3Cdefs%3E%0A%20%20%20%20%3ClinearGradient%20id%3D%22bgGrad%22%20x1%3D%220%25%22%20y1%3D%220%25%22%20x2%3D%22100%25%22%20y2%3D%22100%25%22%3E%0A%20%20%20%20%20%20%3Cstop%20offset%3D%220%25%22%20stop-color%3D%22%230B0F19%22%2F%3E%0A%20%20%20%20%20%20%3Cstop%20offset%3D%22100%25%22%20stop-color%3D%22%23111827%22%2F%3E%0A%20%20%20%20%3C%2FlinearGradient%3E%0A%20%20%20%20%3ClinearGradient%20id%3D%22accentGrad%22%20x1%3D%220%25%22%20y1%3D%220%25%22%20x2%3D%22100%25%22%20y2%3D%220%25%22%3E%0A%20%20%20%20%20%20%3Cstop%20offset%3D%220%25%22%20stop-color%3D%22%236366F1%22%20stop-opacity%3D%220.9%22%2F%3E%0A%20%20%20%20%20%20%3Cstop%20offset%3D%22100%25%22%20stop-color%3D%22%236366F1%22%20stop-opacity%3D%220.9%22%2F%3E%0A%20%20%20%20%3C%2FlinearGradient%3E%0A%20%20%3C%2Fdefs%3E%0A%20%20%3Crect%20width%3D%22600%22%20height%3D%22450%22%20fill%3D%22url(%23bgGrad)%22%2F%3E%0A%20%20%3Crect%20x%3D%2220%22%20y%3D%2220%22%20width%3D%22560%22%20height%3D%22410%22%20rx%3D%2216%22%20fill%3D%22none%22%20stroke%3D%22url(%23accentGrad)%22%20stroke-width%3D%222%22%20stroke-dasharray%3D%226%2C6%22%20opacity%3D%220.6%22%2F%3E%0A%20%20%3Crect%20x%3D%22175%22%20y%3D%2250%22%20width%3D%22250%22%20height%3D%2234%22%20rx%3D%2217%22%20fill%3D%22%23312E81%22%20stroke%3D%22%236366F1%22%20stroke-width%3D%221.5%22%2F%3E%0A%20%20%3Ctext%20x%3D%22300%22%20y%3D%2272%22%20font-family%3D%22system-ui%2C%20-apple-system%2C%20sans-serif%22%20font-size%3D%2212%22%20font-weight%3D%22700%22%20fill%3D%22%23C7D2FE%22%20text-anchor%3D%22middle%22%20letter-spacing%3D%221.5%22%3EAPTDOT%20SYNTHETIC%20DEMO%3C%2Ftext%3E%0A%20%20%3Crect%20x%3D%22235%22%20y%3D%22125%22%20width%3D%22130%22%20height%3D%22110%22%20rx%3D%2214%22%20fill%3D%22%231F2937%22%20stroke%3D%22%236366F1%22%20stroke-width%3D%222%22%2F%3E%0A%20%20%3Cpath%20d%3D%22M275%20180%20L300%20155%20L325%20180%20L300%20205%20Z%22%20fill%3D%22none%22%20stroke%3D%22%236366F1%22%20stroke-width%3D%223%22%20stroke-linejoin%3D%22round%22%2F%3E%0A%20%20%3Ccircle%20cx%3D%22300%22%20cy%3D%22180%22%20r%3D%227%22%20fill%3D%22%236366F1%22%2F%3E%0A%20%20%3Ctext%20x%3D%22300%22%20y%3D%22280%22%20font-family%3D%22system-ui%2C%20-apple-system%2C%20sans-serif%22%20font-size%3D%2218%22%20font-weight%3D%22600%22%20fill%3D%22%23F9FAFB%22%20text-anchor%3D%22middle%22%3EMonitor%20Light%20Bar%3C%2Ftext%3E%0A%20%20%3Ctext%20x%3D%22300%22%20y%3D%22310%22%20font-family%3D%22system-ui%2C%20-apple-system%2C%20sans-serif%22%20font-size%3D%2213%22%20font-weight%3D%22500%22%20fill%3D%22%239CA3AF%22%20text-anchor%3D%22middle%22%3EOffice%20%26amp%3B%20Workspace%20%E2%80%A2%20SKU%3A%20OFF-BAR-049%3C%2Ftext%3E%0A%20%20%3Crect%20x%3D%22140%22%20y%3D%22360%22%20width%3D%22320%22%20height%3D%2230%22%20rx%3D%228%22%20fill%3D%22%23111827%22%20stroke%3D%22%23374151%22%20stroke-width%3D%221%22%2F%3E%0A%20%20%3Ctext%20x%3D%22300%22%20y%3D%22380%22%20font-family%3D%22system-ui%2C%20-apple-system%2C%20sans-serif%22%20font-size%3D%2211%22%20font-weight%3D%22500%22%20fill%3D%22%236B7280%22%20text-anchor%3D%22middle%22%3ESynthetic%20Specification%20%E2%80%A2%20CC0%201.0%20Universal%3C%2Ftext%3E%0A%3C%2Fsvg%3E",
    "tag": "On Sale",
    "badge_type": "demo",
    "is_demo": true,
    "catalogue_source": "aptdot_synthetic",
    "lifecycle_status": "active",
    "verification_tier": "demo",
    "seller": {
      "name": "Aptdot Sample Goods",
      "verifiedStatus": "Synthetic Demo Catalogue",
      "authorizedPartner": false,
      "rating": 4.3,
      "location": "Synthetic Sandbox",
      "fulfillment": "Simulated Delivery (Non-Commercial)",
      "synthetic_notice": "This item belongs to the Aptdot CC0 Synthetic Benchmark Catalogue. It cannot be purchased for real fulfillment."
    },
    "evidence": {
      "source": "Aptdot Synthetic E-Commerce Product Catalog v1.0.0",
      "license": "CC0-1.0 Universal",
      "sku": "OFF-BAR-049",
      "dataset_source": "https://www.aptdot.com/datasets/ecommerce-product-catalog/",
      "is_synthetic": true
    },
    "specs": {
      "aptdot_id": "prod_049",
      "sku": "OFF-BAR-049",
      "product_type": "Office & Workspace > Lighting",
      "cost_price": 20,
      "low_stock_threshold": 10,
      "availability": "in_stock",
      "availability_date": null,
      "dimensions": {
        "weight_g": 480,
        "length_cm": 52,
        "width_cm": 10,
        "height_cm": 8
      },
      "options": [],
      "variants": [
        {
          "variant_id": "var_049_default",
          "uuid": "019fd1d9-31a0-78f1-b052-2b58efc59548",
          "sku": "OFF-BAR-049",
          "title": "Default",
          "options": {},
          "price": 54,
          "compare_at_price": 64,
          "stock": 33
        }
      ],
      "total_variants": 1
    },
    "variants": [
      {
        "variant_id": "var_049_default",
        "id": "019fd1d9-31a0-78f1-b052-2b58efc59548",
        "uuid": "019fd1d9-31a0-78f1-b052-2b58efc59548",
        "sku": "OFF-BAR-049",
        "title": "Default",
        "options": {},
        "price": 54,
        "compare_at_price": 64,
        "stock": 33,
        "in_stock": true
      }
    ],
    "options": [],
    "warranty": "Simulated 1-Year Synthetic Warranty (Demo Only)",
    "return_policy": "Simulated 30-Day Sandbox Returns (Demo Only)",
    "risk_assessment": "Synthetic Demo Item: Fictional specifications for testing and benchmarking only."
  },
  {
    "id": "01a0104a-4d20-758b-9527-f75df576b3d2",
    "slug": "aptdot-magnetic-glass-whiteboard",
    "title": "Magnetic Glass Whiteboard",
    "name": "Magnetic Glass Whiteboard",
    "brand": "Aptdot Sample Goods",
    "category": "Office & Workspace",
    "description": "Frameless tempered glass dry-erase board with a magnetic surface and wall-mount kit.",
    "price": 89,
    "original_price": null,
    "currency": "USD",
    "rating": 4.5,
    "reviews_count": 894,
    "stock": 75,
    "in_stock": true,
    "image_url": "data:image/svg+xml;utf8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%20600%20450%22%20width%3D%22600%22%20height%3D%22450%22%3E%0A%20%20%3Cdefs%3E%0A%20%20%20%20%3ClinearGradient%20id%3D%22bgGrad%22%20x1%3D%220%25%22%20y1%3D%220%25%22%20x2%3D%22100%25%22%20y2%3D%22100%25%22%3E%0A%20%20%20%20%20%20%3Cstop%20offset%3D%220%25%22%20stop-color%3D%22%230B0F19%22%2F%3E%0A%20%20%20%20%20%20%3Cstop%20offset%3D%22100%25%22%20stop-color%3D%22%23111827%22%2F%3E%0A%20%20%20%20%3C%2FlinearGradient%3E%0A%20%20%20%20%3ClinearGradient%20id%3D%22accentGrad%22%20x1%3D%220%25%22%20y1%3D%220%25%22%20x2%3D%22100%25%22%20y2%3D%220%25%22%3E%0A%20%20%20%20%20%20%3Cstop%20offset%3D%220%25%22%20stop-color%3D%22%236366F1%22%20stop-opacity%3D%220.9%22%2F%3E%0A%20%20%20%20%20%20%3Cstop%20offset%3D%22100%25%22%20stop-color%3D%22%236366F1%22%20stop-opacity%3D%220.9%22%2F%3E%0A%20%20%20%20%3C%2FlinearGradient%3E%0A%20%20%3C%2Fdefs%3E%0A%20%20%3Crect%20width%3D%22600%22%20height%3D%22450%22%20fill%3D%22url(%23bgGrad)%22%2F%3E%0A%20%20%3Crect%20x%3D%2220%22%20y%3D%2220%22%20width%3D%22560%22%20height%3D%22410%22%20rx%3D%2216%22%20fill%3D%22none%22%20stroke%3D%22url(%23accentGrad)%22%20stroke-width%3D%222%22%20stroke-dasharray%3D%226%2C6%22%20opacity%3D%220.6%22%2F%3E%0A%20%20%3Crect%20x%3D%22175%22%20y%3D%2250%22%20width%3D%22250%22%20height%3D%2234%22%20rx%3D%2217%22%20fill%3D%22%23312E81%22%20stroke%3D%22%236366F1%22%20stroke-width%3D%221.5%22%2F%3E%0A%20%20%3Ctext%20x%3D%22300%22%20y%3D%2272%22%20font-family%3D%22system-ui%2C%20-apple-system%2C%20sans-serif%22%20font-size%3D%2212%22%20font-weight%3D%22700%22%20fill%3D%22%23C7D2FE%22%20text-anchor%3D%22middle%22%20letter-spacing%3D%221.5%22%3EAPTDOT%20SYNTHETIC%20DEMO%3C%2Ftext%3E%0A%20%20%3Crect%20x%3D%22235%22%20y%3D%22125%22%20width%3D%22130%22%20height%3D%22110%22%20rx%3D%2214%22%20fill%3D%22%231F2937%22%20stroke%3D%22%236366F1%22%20stroke-width%3D%222%22%2F%3E%0A%20%20%3Cpath%20d%3D%22M275%20180%20L300%20155%20L325%20180%20L300%20205%20Z%22%20fill%3D%22none%22%20stroke%3D%22%236366F1%22%20stroke-width%3D%223%22%20stroke-linejoin%3D%22round%22%2F%3E%0A%20%20%3Ccircle%20cx%3D%22300%22%20cy%3D%22180%22%20r%3D%227%22%20fill%3D%22%236366F1%22%2F%3E%0A%20%20%3Ctext%20x%3D%22300%22%20y%3D%22280%22%20font-family%3D%22system-ui%2C%20-apple-system%2C%20sans-serif%22%20font-size%3D%2218%22%20font-weight%3D%22600%22%20fill%3D%22%23F9FAFB%22%20text-anchor%3D%22middle%22%3EMagnetic%20Glass%20Whiteboard%3C%2Ftext%3E%0A%20%20%3Ctext%20x%3D%22300%22%20y%3D%22310%22%20font-family%3D%22system-ui%2C%20-apple-system%2C%20sans-serif%22%20font-size%3D%2213%22%20font-weight%3D%22500%22%20fill%3D%22%239CA3AF%22%20text-anchor%3D%22middle%22%3EOffice%20%26amp%3B%20Workspace%20%E2%80%A2%20SKU%3A%20OFF-WBRD-050%3C%2Ftext%3E%0A%20%20%3Crect%20x%3D%22140%22%20y%3D%22360%22%20width%3D%22320%22%20height%3D%2230%22%20rx%3D%228%22%20fill%3D%22%23111827%22%20stroke%3D%22%23374151%22%20stroke-width%3D%221%22%2F%3E%0A%20%20%3Ctext%20x%3D%22300%22%20y%3D%22380%22%20font-family%3D%22system-ui%2C%20-apple-system%2C%20sans-serif%22%20font-size%3D%2211%22%20font-weight%3D%22500%22%20fill%3D%22%236B7280%22%20text-anchor%3D%22middle%22%3ESynthetic%20Specification%20%E2%80%A2%20CC0%201.0%20Universal%3C%2Ftext%3E%0A%3C%2Fsvg%3E",
    "tag": "Synthetic Demo",
    "badge_type": "demo",
    "is_demo": true,
    "catalogue_source": "aptdot_synthetic",
    "lifecycle_status": "active",
    "verification_tier": "demo",
    "seller": {
      "name": "Aptdot Sample Goods",
      "verifiedStatus": "Synthetic Demo Catalogue",
      "authorizedPartner": false,
      "rating": 4.5,
      "location": "Synthetic Sandbox",
      "fulfillment": "Simulated Delivery (Non-Commercial)",
      "synthetic_notice": "This item belongs to the Aptdot CC0 Synthetic Benchmark Catalogue. It cannot be purchased for real fulfillment."
    },
    "evidence": {
      "source": "Aptdot Synthetic E-Commerce Product Catalog v1.0.0",
      "license": "CC0-1.0 Universal",
      "sku": "OFF-WBRD-050",
      "dataset_source": "https://www.aptdot.com/datasets/ecommerce-product-catalog/",
      "is_synthetic": true
    },
    "specs": {
      "aptdot_id": "prod_050",
      "sku": "OFF-WBRD-050",
      "product_type": "Office & Workspace > Boards",
      "cost_price": 32,
      "low_stock_threshold": 20,
      "availability": "in_stock",
      "availability_date": null,
      "dimensions": {
        "weight_g": 9000,
        "length_cm": 95,
        "width_cm": 65,
        "height_cm": 4
      },
      "options": [
        {
          "name": "Size",
          "values": [
            "60 × 45 cm",
            "90 × 60 cm"
          ]
        }
      ],
      "variants": [
        {
          "variant_id": "var_050_60x45cm",
          "uuid": "01a0104a-4d20-7166-a8eb-fcab359069db",
          "sku": "OFF-WBRD-050-60X45CM",
          "title": "60 × 45 cm",
          "options": {
            "Size": "60 × 45 cm"
          },
          "price": 89,
          "compare_at_price": null,
          "stock": 26
        },
        {
          "variant_id": "var_050_90x60cm",
          "uuid": "01a0104a-4d20-7138-8e1c-ff10604d5740",
          "sku": "OFF-WBRD-050-90X60CM",
          "title": "90 × 60 cm",
          "options": {
            "Size": "90 × 60 cm"
          },
          "price": 129,
          "compare_at_price": null,
          "stock": 49
        }
      ],
      "total_variants": 2
    },
    "variants": [
      {
        "variant_id": "var_050_60x45cm",
        "id": "01a0104a-4d20-7166-a8eb-fcab359069db",
        "uuid": "01a0104a-4d20-7166-a8eb-fcab359069db",
        "sku": "OFF-WBRD-050-60X45CM",
        "title": "60 × 45 cm",
        "options": {
          "Size": "60 × 45 cm"
        },
        "price": 89,
        "compare_at_price": null,
        "stock": 26,
        "in_stock": true
      },
      {
        "variant_id": "var_050_90x60cm",
        "id": "01a0104a-4d20-7138-8e1c-ff10604d5740",
        "uuid": "01a0104a-4d20-7138-8e1c-ff10604d5740",
        "sku": "OFF-WBRD-050-90X60CM",
        "title": "90 × 60 cm",
        "options": {
          "Size": "90 × 60 cm"
        },
        "price": 129,
        "compare_at_price": null,
        "stock": 49,
        "in_stock": true
      }
    ],
    "options": [
      {
        "name": "Size",
        "values": [
          "60 × 45 cm",
          "90 × 60 cm"
        ]
      }
    ],
    "warranty": "Simulated 1-Year Synthetic Warranty (Demo Only)",
    "return_policy": "Simulated 30-Day Sandbox Returns (Demo Only)",
    "risk_assessment": "Synthetic Demo Item: Fictional specifications for testing and benchmarking only."
  }
];
export default mockProducts;
