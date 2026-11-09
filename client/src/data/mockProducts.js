export const mockProducts = [
  {
    id: 'prod-sony-wh1000xm5',
    title: 'Sony WH-1000XM5 Wireless Noise-Canceling Headphones',
    brand: 'Sony',
    category: 'Audio',
    price: 348.00,
    originalPrice: 399.99,
    rating: 4.8,
    reviewsCount: 3840,
    inStock: true,
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&auto=format&fit=crop&q=80',
    tag: 'Editor Choice',
    badgeType: 'verified',
    description: 'Industry-leading noise cancellation optimized with two processors and 8 microphones. Hi-Res Audio wireless support with up to 30 hours of battery life.',
    seller: {
      name: 'Sony Official Direct',
      rating: 4.9,
      verifiedStatus: 'verified',
      fulfillment: 'Official Brand Store',
      location: 'San Jose, CA',
      authorizedPartner: true,
    },
    evidence: {
      specsVerified: true,
      benchmarksVerified: true,
      labTested: true,
      overallConfidenceScore: 98,
      sources: [
        'Sony Official Technical Whitepaper v4.2',
        'RTINGS Independent Lab Acoustic Test 2024',
        'FCC Regulatory Wireless ID: AK8WH1000XM5'
      ],
      returnWindowDays: 30,
      warrantyMonths: 24,
      qcRiskScore: 'Low',
    },
    specs: {
      'Driver Unit': '30mm Carbon Fiber Composite',
      'Battery Life': '30 hours (ANC On) / 40 hours (ANC Off)',
      'Weight': '250 grams',
      'Connectivity': 'Bluetooth 5.2, LDAC, AAC, SBC, 3.5mm Aux',
      'Active Noise Cancellation': 'Integrated Processor V1 + HD Noise Cancelling Processor QN1',
      'Microphones': '8 beamforming mics with AI noise reduction',
      'Charging': 'USB-C Fast Charging (3 min = 3 hrs)',
      'Multipoint': 'Yes (Connects to 2 devices simultaneously)',
    },
    pros: [
      'Top-tier active noise cancellation in mid/high frequency range',
      'Ultra-lightweight 250g chassis with soft-fit synthetic leather',
      'Outstanding microphone clarity in windy environments'
    ],
    cons: [
      'Earcups fold flat but do not fold inward into compact ball',
      'Slight warmth build-up during extended 4+ hour listening sessions'
    ],
    returnPolicy: {
      days: 30,
      restockingFee: 0,
      prepaidLabel: true,
      condition: 'Free return within 30 days. No restocking fee if in original packaging.',
    },
    riskAssessment: {
      status: 'Verified Authenticity',
      riskLevel: 'Low',
      summary: 'Direct manufacturer distribution. Verified frequency response matches advertised specs within +/- 0.8dB margin.',
      concerns: [
        'Third-party sellers on unauthorized marketplaces have reported counterfeit units. Ensure purchase from verified brand channel.'
      ],
      missingInfo: 'Long-term hinge torque fatigue testing beyond 24 months not published.'
    }
  },
  {
    id: 'prod-apple-macbook-pro-m3',
    title: 'Apple MacBook Pro 14" (M3 Pro, 18GB Unified Memory, 512GB SSD)',
    brand: 'Apple',
    category: 'Laptops',
    price: 1849.00,
    originalPrice: 1999.00,
    rating: 4.9,
    reviewsCount: 1920,
    inStock: true,
    image: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=800&auto=format&fit=crop&q=80',
    tag: 'Best for Creators',
    badgeType: 'verified',
    description: '14.2-inch Liquid Retina XDR display with ProMotion 120Hz. Powered by the M3 Pro chip featuring an 11-core CPU and 14-core GPU with hardware-accelerated ray tracing.',
    seller: {
      name: 'Apple Authorized Premium Campus',
      rating: 4.95,
      verifiedStatus: 'verified',
      fulfillment: 'Apple Authorized Distribution',
      location: 'Cupertino, CA',
      authorizedPartner: true,
    },
    evidence: {
      specsVerified: true,
      benchmarksVerified: true,
      labTested: true,
      overallConfidenceScore: 99,
      sources: [
        'Geekbench 6 Cross-Platform Compute Database',
        'Cinebench R24 Independent Sustained Thermal Test',
        'Apple Hardware Developer Documentation'
      ],
      returnWindowDays: 14,
      warrantyMonths: 12,
      qcRiskScore: 'Very Low',
    },
    specs: {
      'Processor': 'Apple M3 Pro (11-core CPU, 14-core GPU)',
      'Memory': '18GB Unified Memory (150GB/s bandwidth)',
      'Storage': '512GB PCIe Gen4 NVMe SSD',
      'Display': '14.2" Liquid Retina XDR (3024x1964, 120Hz ProMotion, 1600 nits peak)',
      'Battery Life': 'Up to 18 hours Apple TV app movie playback',
      'Weight': '1.61 kg (3.5 lbs)',
      'Ports': '3x Thunderbolt 4, HDMI 2.1, SDXC slot, MagSafe 3, 3.5mm jack',
      'Audio': 'Six-speaker sound system with force-cancelling woofers',
    },
    pros: [
      'Industry-leading battery life under real-world development workflows',
      'Liquid Retina XDR panel provides true reference-grade HDR color accuracy',
      'Whisper-quiet operation even under sustained video rendering'
    ],
    cons: [
      'Unified memory is soldered and cannot be upgraded post-purchase',
      'Strict 14-day return window from authorized Apple channels'
    ],
    returnPolicy: {
      days: 14,
      restockingFee: 0,
      prepaidLabel: true,
      condition: '14 calendar days from delivery. Device must be factory reset and unlinked from Apple ID.',
    },
    riskAssessment: {
      status: 'Verified High Performance',
      riskLevel: 'Very Low',
      summary: 'Verified hardware architecture. Memory and SSD thermal throttling benchmarked at less than 3% under 30-minute stress.',
      concerns: [
        'High cost of post-warranty board replacement if accidental damage occurs without AppleCare+.'
      ],
      missingInfo: 'Detailed NAND write-endurance TBW metrics omitted from consumer spec sheets.'
    }
  },
  {
    id: 'prod-dell-xps-15-oled',
    title: 'Dell XPS 15 9530 (Intel Core i7-13700H, 32GB RAM, RTX 4060, 3.5K OLED)',
    brand: 'Dell',
    category: 'Laptops',
    price: 1699.00,
    originalPrice: 1949.00,
    rating: 4.6,
    reviewsCount: 840,
    inStock: true,
    image: 'https://images.unsplash.com/photo-1593642632823-8f785ba67e45?w=800&auto=format&fit=crop&q=80',
    tag: 'Windows Powerhouse',
    badgeType: 'verified',
    description: 'Precision-crafted CNC aluminum chassis with carbon-fiber palm rest. Features a 3.5K OLED touch screen and NVIDIA GeForce RTX 4060 graphics.',
    seller: {
      name: 'Dell Technologies Commercial Store',
      rating: 4.7,
      verifiedStatus: 'verified',
      fulfillment: 'Direct Manufacturer Logistics',
      location: 'Round Rock, TX',
      authorizedPartner: true,
    },
    evidence: {
      specsVerified: true,
      benchmarksVerified: true,
      labTested: true,
      overallConfidenceScore: 94,
      sources: [
        'Dell Engineering Specification Bulletin 9530',
        'PCMark 10 Extended Productivity Suite Test',
        'DisplayCAL Colorimeter Spectral Report'
      ],
      returnWindowDays: 30,
      warrantyMonths: 12,
      qcRiskScore: 'Low',
    },
    specs: {
      'Processor': '13th Gen Intel Core i7-13700H (14 cores, up to 5.0 GHz)',
      'Memory': '32GB DDR5 4800MHz (Dual Channel, Upgradeable)',
      'Storage': '1TB M.2 PCIe NVMe SSD',
      'Display': '15.6" 3.5K OLED (3456x2160) Touch, 400-nit, 100% DCI-P3',
      'Graphics': 'NVIDIA GeForce RTX 4060 8GB GDDR6 (50W TGP)',
      'Battery': '86Whr integrated battery',
      'Weight': '1.92 kg (4.23 lbs)',
      'Ports': '2x Thunderbolt 4, 1x USB-C 3.2 Gen 2, Full-size SD card reader',
    },
    pros: [
      'Incredible 3.5K OLED contrast ratio with true deep blacks',
      'RAM and SSD are fully upgradeable with two accessible SO-DIMM slots',
      'Full-size SD card reader ideal for photographers'
    ],
    cons: [
      'RTX 4060 capped at 50W TGP due to thin thermal envelope',
      'Battery life drops to 5-6 hours with high brightness on 3.5K OLED'
    ],
    returnPolicy: {
      days: 30,
      restockingFee: 0,
      prepaidLabel: true,
      condition: '30-day money-back guarantee. Original packaging and charger required.',
    },
    riskAssessment: {
      status: 'Verified Creator Rig',
      riskLevel: 'Low',
      summary: 'Verified benchmark performance. Thermal throttling occurs above 88°C on continuous render passes.',
      concerns: [
        'OLED static element burn-in precaution advised for 8+ hour continuous taskbar usage.'
      ],
      missingInfo: 'OLED sub-pixel refresh algorithm interval not detailed in user handbook.'
    }
  },
  {
    id: 'prod-bose-qc-ultra',
    title: 'Bose QuietComfort Ultra Wireless Noise Cancelling Headphones',
    brand: 'Bose',
    category: 'Audio',
    price: 379.00,
    originalPrice: 429.00,
    rating: 4.7,
    reviewsCount: 1420,
    inStock: true,
    image: 'https://images.unsplash.com/photo-1546435770-a3e426bf472b?w=800&auto=format&fit=crop&q=80',
    tag: 'Comfort King',
    badgeType: 'verified',
    description: 'Groundbreaking spatial audio for immersive listening. World-class active noise cancellation with CustomTune technology personalizing audio to your ear canal shape.',
    seller: {
      name: 'Bose Direct Outlet',
      rating: 4.85,
      verifiedStatus: 'verified',
      fulfillment: 'Bose Logistics Center',
      location: 'Framingham, MA',
      authorizedPartner: true,
    },
    evidence: {
      specsVerified: true,
      benchmarksVerified: true,
      labTested: true,
      overallConfidenceScore: 97,
      sources: [
        'Bose CustomTune Acoustic Patent Analysis',
        'SoundGuys Headphone Lab Measurements',
        'Bluetooth SIG Certification: D064291'
      ],
      returnWindowDays: 90,
      warrantyMonths: 12,
      qcRiskScore: 'Low',
    },
    specs: {
      'Noise Cancellation': 'CustomTune Technology + Aware Mode',
      'Spatial Audio': 'Bose Immersive Audio (Motion & Static)',
      'Battery Life': 'Up to 24 hours (18 hours with Immersive Audio)',
      'Weight': '252 grams',
      'Connectivity': 'Bluetooth 5.3, Snapdragon Sound (aptX Adaptive), Multipoint',
      'Earcup Design': 'Ergonomic plush protein leather with collapsible inward folding headband',
      'Charging': 'USB-C (15 min = 2.5 hours)',
      'Controls': 'Capacitive touch volume strip + physical multifunction button',
    },
    pros: [
      'Unrivaled low-frequency noise cancellation (engine rumble, transit hum)',
      'Headband folds inward into a compact travel clamshell case',
      'Generous 90-day risk-free trial policy'
    ],
    cons: [
      'Immersive Spatial Audio reduces battery life by ~25%',
      'Slightly higher price point compared to previous QC45'
    ],
    returnPolicy: {
      days: 90,
      restockingFee: 0,
      prepaidLabel: true,
      condition: 'Bose 90-day risk-free in-home trial. Free return shipping guaranteed.',
    },
    riskAssessment: {
      status: 'Verified Sound Quality',
      riskLevel: 'Low',
      summary: 'Verified noise reduction curve exceeds 32dB attenuation at 100Hz. Highest comfort rating in extended clamp-pressure tests.',
      concerns: [
        'Snapdragon Sound lossless transmission requires compatible Android SoC.'
      ],
      missingInfo: 'AptX Lossless minimum latency buffer size under heavy 2.4GHz Wi-Fi congestion.'
    }
  },
  {
    id: 'prod-keychron-q1-pro',
    title: 'Keychron Q1 Pro QMK/VIA Wireless Custom Mechanical Keyboard',
    brand: 'Keychron',
    category: 'Keyboards',
    price: 199.00,
    originalPrice: 219.00,
    rating: 4.8,
    reviewsCount: 710,
    inStock: true,
    image: 'https://images.unsplash.com/photo-1618384887929-16ec33fab9ef?w=800&auto=format&fit=crop&q=80',
    tag: 'Custom Enthusiast',
    badgeType: 'verified',
    description: 'CNC machined 6063 aluminum body with double-gasket dampening design. Hot-swappable switches, wireless Bluetooth 5.1 and full open-source QMK/VIA customization.',
    seller: {
      name: 'Keychron Official Global',
      rating: 4.8,
      verifiedStatus: 'verified',
      fulfillment: 'Keychron Hub',
      location: 'Hong Kong / Los Angeles',
      authorizedPartner: true,
    },
    evidence: {
      specsVerified: true,
      benchmarksVerified: true,
      labTested: true,
      overallConfidenceScore: 95,
      sources: [
        'Keychron Hardware Schematic Release Q1P',
        'QMK Firmware Git Repository Verified Config',
        'Deskthority Switch Actuation Force Testing'
      ],
      returnWindowDays: 30,
      warrantyMonths: 12,
      qcRiskScore: 'Low',
    },
    specs: {
      'Layout': '75% Layout (81 Keys + Programmable Rotary Knob)',
      'Body Material': 'Full CNC Machined 6063 Aluminum',
      'Switches': 'Keychron K Pro Red (Linear, Pre-lubed, Hot-swappable)',
      'Connectivity': 'Bluetooth 5.1 (Up to 3 devices) + Type-C Wired (1000Hz)',
      'Battery': '4000mAh Lithium-Polymer (Up to 300 hrs non-backlit)',
      'Keycaps': 'KSA Double-shot PBT Keycaps',
      'Weight': '1.73 kg (3.8 lbs)',
      'Compatibility': 'macOS / Windows / Linux (Hardware toggle switch)',
    },
    pros: [
      'Substantial 1.7kg aluminum weight eliminates desk slip and hollow resonance',
      'Full QMK/VIA key remapping directly in browser without installing bloatware',
      'Includes dedicated Mac and Windows command keycaps in the box'
    ],
    cons: [
      'Heavy weight makes it unsuitable for mobile travel setups',
      'Bluetooth polling rate is 90Hz (Wired mode recommended for competitive esports)'
    ],
    returnPolicy: {
      days: 30,
      restockingFee: 0,
      prepaidLabel: true,
      condition: '30-day return window. Complete accessories and keycap puller must be included.',
    },
    riskAssessment: {
      status: 'Verified Enthusiast Hardware',
      riskLevel: 'Low',
      summary: 'Solid aluminum build quality verified. Switch actuation measured consistently at 45g +/- 5g across all 81 positions.',
      concerns: [
        'Aluminum case blocks strong RF signals; keep Bluetooth receiver within 1 meter for lowest latency.'
      ],
      missingInfo: 'Bluetooth 5.1 antenna dB gain rating inside solid aluminum frame.'
    }
  },
  {
    id: 'prod-dji-mini-4-pro',
    title: 'DJI Mini 4 Pro Drone (Fly More Combo Plus with RC 2 Controller)',
    brand: 'DJI',
    category: 'Cameras & Drones',
    price: 1099.00,
    originalPrice: 1159.00,
    rating: 4.9,
    reviewsCount: 1150,
    inStock: true,
    image: 'https://images.unsplash.com/photo-1527977966376-1c8408f9f108?w=800&auto=format&fit=crop&q=80',
    tag: 'Sub-249g Flagship',
    badgeType: 'verified',
    description: 'Under 249g ultra-lightweight folding drone. Omnidirectional obstacle sensing, 4K/60fps HDR true vertical shooting, and 20km FHD video transmission with DJI O4.',
    seller: {
      name: 'DJI Official Store North America',
      rating: 4.92,
      verifiedStatus: 'verified',
      fulfillment: 'DJI Official Logistics',
      location: 'Cerritos, CA',
      authorizedPartner: true,
    },
    evidence: {
      specsVerified: true,
      benchmarksVerified: true,
      labTested: true,
      overallConfidenceScore: 98,
      sources: [
        'FAA Drone Registration Compliance Bulletin',
        'DJI Flight Control Engineering Specs v1.1',
        'Independent Wind Tunnel Hover Stability Analysis'
      ],
      returnWindowDays: 14,
      warrantyMonths: 12,
      qcRiskScore: 'Low',
    },
    specs: {
      'Takeoff Weight': '< 249 g (Standard Battery) / 290 g (Plus Battery)',
      'Camera Sensor': '1/1.3-inch CMOS, f/1.7 aperture, Dual Native ISO',
      'Video Resolution': '4K/60fps HDR, 4K/100fps Slow Motion, 10-bit D-Log M & HLG',
      'Obstacle Avoidance': 'Omnidirectional Active Vision Sensing + APAS 5.0',
      'Flight Time': 'Up to 34 mins (Standard) / 45 mins (Intelligent Flight Battery Plus)',
      'Transmission': 'DJI O4 (1080p/60fps up to 20 km)',
      'Controller': 'DJI RC 2 with integrated 5.5" 700-nit FHD screen',
      'Wind Resistance': 'Scale 5 (10.7 m/s)',
    },
    pros: [
      'Sub-249g weight exempt from FAA registration for recreational pilots in USA',
      'Omnidirectional vision sensors virtually eliminate lateral blind spots',
      'True 90-degree gimbal rotation enables native vertical 4K social media video'
    ],
    cons: [
      'Intelligent Flight Battery Plus puts drone over 249g regulatory threshold',
      'Strict 14-day return policy and flight telemetry unbinding requirement'
    ],
    returnPolicy: {
      days: 14,
      restockingFee: 0,
      prepaidLabel: true,
      condition: '14 calendar days. Drone must be crash-free and unlinked from DJI Fly account.',
    },
    riskAssessment: {
      status: 'Verified Flight Safety',
      riskLevel: 'Low',
      summary: 'Verified sensor telemetry and wind resistance. Obstacle braking demonstrated 99.4% success in dense tree-branch obstacle tests.',
      concerns: [
        'High-wind alert triggers automatically above 24 knots due to ultra-light frame.'
      ],
      missingInfo: 'Propeller motor bearing MTBF in salty marine air environments.'
    }
  },
  {
    id: 'prod-lg-ultragear-oled',
    title: 'LG 27" UltraGear OLED QHD 240Hz 0.03ms Gaming Monitor',
    brand: 'LG',
    category: 'Displays',
    price: 799.00,
    originalPrice: 999.99,
    rating: 4.7,
    reviewsCount: 620,
    inStock: true,
    image: 'https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=800&auto=format&fit=crop&q=80',
    tag: 'Esports OLED',
    badgeType: 'verified',
    description: '27-inch QHD (2560 x 1440) OLED display with blistering 240Hz refresh rate and near-instantaneous 0.03ms response time. G-SYNC Compatible and FreeSync Premium.',
    seller: {
      name: 'LG Electronics Official Channel',
      rating: 4.78,
      verifiedStatus: 'verified',
      fulfillment: 'LG Direct Fulfillment',
      location: 'Englewood Cliffs, NJ',
      authorizedPartner: true,
    },
    evidence: {
      specsVerified: true,
      benchmarksVerified: true,
      labTested: true,
      overallConfidenceScore: 96,
      sources: [
        'VESA DisplayHDR True Black 400 Compliance Certificate',
        'BlurBusters UFO Motion Blur Oscilloscope Test',
        'TÜV Rheinland Low Blue Light Hardware Certification'
      ],
      returnWindowDays: 30,
      warrantyMonths: 24,
      qcRiskScore: 'Low',
    },
    specs: {
      'Screen Size & Panel': '26.5" QHD (2560x1440) Anti-Glare Low Reflection OLED',
      'Refresh Rate': '240Hz',
      'Response Time': '0.03ms (GtG)',
      'Contrast Ratio': '1,500,000:1 (True Black)',
      'Color Gamut': 'DCI-P3 98.5% (CIE1976)',
      'HDR': 'HDR10, VESA DisplayHDR True Black 400',
      'Ports': '2x HDMI 2.1, 1x DisplayPort 1.4 (DSC), 2x USB 3.0 downstream, Optical Audio Out',
      'Ergonomics': 'Height, Tilt, Swivel, and Pivot adjustment',
    },
    pros: [
      'Incredible 0.03ms pixel response time delivers virtually zero ghosting or smearing',
      '2-year manufacturer OLED warranty includes burn-in coverage',
      'HDMI 2.1 bandwidth supports 240Hz at native 1440p without display stream compression'
    ],
    cons: [
      'Sub-pixel text fringing on fine Windows desktop fonts due to RWGB layout',
      'Peak HDR full-window brightness constrained by aggressive ABL (Auto Brightness Limiter)'
    ],
    returnPolicy: {
      days: 30,
      restockingFee: 0,
      prepaidLabel: true,
      condition: '30 days return window. Zero dead pixel guarantee from LG Direct.',
    },
    riskAssessment: {
      status: 'Verified High Performance Display',
      riskLevel: 'Low',
      summary: 'Verified 240Hz OLED performance. Zero overshoot measured across grey-to-grey transitions. Comprehensive 2-year burn-in warranty in writing.',
      concerns: [
        'Ensure screen saver and pixel cleaning functions remain enabled in monitor OSD menu.'
      ],
      missingInfo: 'Exact sub-pixel matrix layout spacing dimensions.'
    }
  },
  {
    id: 'prod-apple-watch-ultra-2',
    title: 'Apple Watch Ultra 2 (GPS + Cellular, 49mm Titanium, Ocean Band)',
    brand: 'Apple',
    category: 'Smartwatches',
    price: 749.00,
    originalPrice: 799.00,
    rating: 4.85,
    reviewsCount: 2100,
    inStock: true,
    image: 'https://images.unsplash.com/photo-1508685096489-7aacd43bd3b1?w=800&auto=format&fit=crop&q=80',
    tag: 'Extreme Durability',
    badgeType: 'verified',
    description: 'Rugged 49mm aerospace-grade titanium case with flat sapphire front crystal. 3000-nit display, precision dual-frequency GPS, and up to 72 hours of battery in Low Power Mode.',
    seller: {
      name: 'Apple Authorized Premium Campus',
      rating: 4.95,
      verifiedStatus: 'verified',
      fulfillment: 'Apple Logistics',
      location: 'Cupertino, CA',
      authorizedPartner: true,
    },
    evidence: {
      specsVerified: true,
      benchmarksVerified: true,
      labTested: true,
      overallConfidenceScore: 99,
      sources: [
        'MIL-STD-810H Military Standard Environmental Testing Report',
        'EN13319 European Diving Accessory Certification',
        'Apple Watch S9 SiP Hardware Architectural Whitepaper'
      ],
      returnWindowDays: 14,
      warrantyMonths: 12,
      qcRiskScore: 'Very Low',
    },
    specs: {
      'Case': '49mm Aerospace-grade Titanium with elevated bezel protection',
      'Display': 'Always-On Retina OLED (Up to 3,000 nits brightness, 1 nit minimum)',
      'Processor': 'S9 SiP with 64-bit dual-core processor, 4-core Neural Engine',
      'Water Resistance': '100m water resistance, recreational scuba diving to 40m',
      'Battery Life': 'Up to 36 hours normal use (up to 72 hours in Low Power Mode)',
      'Sensors': 'Depth gauge, water temperature sensor, ECG, blood oxygen, dual heart sensors',
      'GPS': 'Precision dual-frequency GPS (L1 and L5)',
      'Audio': 'Dual speakers with 86-decibel emergency siren + 3-mic array',
    },
    pros: [
      '3000-nit screen remains crystal clear under direct harsh desert sunlight',
      'Substantial multi-day battery life removes daily charging anxiety',
      'Certified EN13319 dive computer integration via Oceanic+ app'
    ],
    cons: [
      'Large 49mm case may feel bulky on smaller wrist sizes (< 150mm circumference)',
      'Requires iPhone for initial pairing and full health metric sync'
    ],
    returnPolicy: {
      days: 14,
      restockingFee: 0,
      prepaidLabel: true,
      condition: '14 calendar days from delivery. Device must be unpaired from iCloud.',
    },
    riskAssessment: {
      status: 'Verified Rugged Instrument',
      riskLevel: 'Very Low',
      summary: 'Verified MIL-STD-810H shock and vibration tolerance. Water resistance verified to 100 meters per ISO standard 22810.',
      concerns: [
        'Blood oxygen feature availability subject to regional regulatory patent rulings.'
      ],
      missingInfo: 'Operating temperature threshold in cryogenic conditions below -30°C.'
    }
  }
];

export const productCategories = [
  'All',
  'Audio',
  'Laptops',
  'Keyboards',
  'Cameras & Drones',
  'Displays',
  'Smartwatches'
];
