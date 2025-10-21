// T-Mobile Promotions Data - October 15, 2025
// Updated with corrected promotion information

export const promotions = [
  // IPHONE PROMOTIONS
  {
    id: 'iphone-17-pro-on-us',
    name: 'iPhone 17 Pro On Us',
    internalId: 'IPH17PRO_ONUS',
    category: 'iPhone',
    status: 'active',
    startDate: '2025-09-12',
    endDate: null,
    eligibleDevices: ['iphone-17-pro'],
    aal: 'N', // Upgrade Only
    redemption: {
      tradeTiers: ['Any Condition'],
      tradeValues: [1100, 830, 550],
      ratePlan: 'Experience Beyond',
      tradeRequired: true
    },
    maxPayout: 1100,
    limit: 'Per line',
    notStackableOnSameLine: []
  },
  {
    id: 'iphone-17-pro-900-off',
    name: '$900 Off iPhone 17 Pro',
    internalId: 'IPH17PRO_900OFF',
    category: 'iPhone',
    status: 'active',
    startDate: '2025-09-12',
    endDate: null,
    eligibleDevices: ['iphone-17-pro'],
    aal: 'N', // Upgrade Only
    redemption: {
      tradeTiers: ['Any Condition'],
      tradeValues: [900, 630, 315],
      ratePlan: '55+, Military, FR',
      tradeRequired: true
    },
    maxPayout: 900,
    limit: 'Per line',
    notStackableOnSameLine: []
  },
  {
    id: 'iphone-17-on-us',
    name: 'iPhone 17 On Us',
    internalId: 'IPH17_ONUS',
    category: 'iPhone',
    status: 'active',
    startDate: '2025-09-12',
    endDate: null,
    eligibleDevices: ['iphone-17'],
    aal: 'Y', // New Line Required
    redemption: {
      tradeTiers: ['Good Condition'],
      tradeValues: [830, 415],
      ratePlan: 'Most Voice Plans',
      tradeRequired: false
    },
    maxPayout: 830,
    limit: 'Per line',
    notStackableOnSameLine: []
  },
  {
    id: 'iphone-17-630-off',
    name: '$630 Off iPhone 17',
    internalId: 'IPH17_630OFF',
    category: 'iPhone',
    status: 'active',
    startDate: '2025-09-12',
    endDate: null,
    eligibleDevices: ['iphone-17'],
    aal: 'Y', // New Line Required
    redemption: {
      tradeTiers: ['Good Condition'],
      tradeValues: [630, 315],
      ratePlan: '55+, Military, FR',
      tradeRequired: false
    },
    maxPayout: 630,
    limit: 'Per line',
    notStackableOnSameLine: []
  },
  {
    id: 'iphone-17-300-off',
    name: '$300 Off iPhone 17',
    internalId: 'IPH17_300OFF',
    category: 'iPhone',
    status: 'active',
    startDate: '2025-09-12',
    endDate: null,
    eligibleDevices: ['iphone-17'],
    aal: 'N', // Upgrade Only
    redemption: {
      tradeTiers: ['Good Condition'],
      tradeValues: [300, 150],
      ratePlan: 'All Voice Plans',
      tradeRequired: true
    },
    maxPayout: 300,
    limit: 'Per line',
    notStackableOnSameLine: []
  },
  {
    id: 'iphone-16e-on-us',
    name: 'iPhone 16e On Us',
    internalId: 'IPH16E_ONUS',
    category: 'iPhone',
    status: 'active',
    startDate: '2025-09-12',
    endDate: null,
    eligibleDevices: ['iphone-16e'],
    aal: 'Y+P', // New Line + Port-In Required
    redemption: {
      tradeTiers: ['Any Condition'],
      tradeValues: [630],
      ratePlan: 'All Voice Plans',
      tradeRequired: false
    },
    maxPayout: 630,
    limit: 'Per line',
    notStackableOnSameLine: []
  },
  {
    id: 'iphone-15-50-off',
    name: '50% Off iPhone 15',
    internalId: 'IPH15_50OFF',
    category: 'iPhone',
    status: 'active',
    startDate: '2025-09-12',
    endDate: null,
    eligibleDevices: ['iphone-15'],
    aal: 'Y', // New Line Required
    redemption: {
      tradeTiers: ['Any Condition'],
      tradeValues: [315],
      ratePlan: 'All Voice Plans',
      tradeRequired: false
    },
    maxPayout: 315,
    limit: 'Per line',
    notStackableOnSameLine: []
  },

  // ANDROID / SAMSUNG PROMOTIONS
  {
    id: 'galaxy-s25-plus-on-us',
    name: 'Samsung Galaxy S25+ On Us',
    internalId: 'S25PLUS_ONUS',
    category: 'Samsung',
    status: 'active',
    startDate: '2025-10-02',
    endDate: null,
    eligibleDevices: ['galaxy-s25-plus'],
    aal: 'N', // Upgrade Only
    redemption: {
      tradeTiers: ['Any Condition'],
      tradeValues: [1000, 500],
      ratePlan: 'Experience Beyond',
      tradeRequired: true
    },
    maxPayout: 1000,
    limit: 'Per line',
    notStackableOnSameLine: []
  },
  {
    id: 'galaxy-s25-edge-on-us',
    name: 'Samsung Galaxy S25 Edge On Us',
    internalId: 'S25EDGE_ONUS',
    category: 'Samsung',
    status: 'active',
    startDate: '2025-10-02',
    endDate: '2025-10-16',
    eligibleDevices: ['galaxy-s25-edge'],
    aal: 'N', // Upgrade Only
    redemption: {
      tradeTiers: ['Any Condition'],
      tradeValues: [1100, 550],
      ratePlan: 'Experience Beyond',
      tradeRequired: true
    },
    maxPayout: 1100,
    limit: 'Per line',
    notStackableOnSameLine: []
  },
  {
    id: 'galaxy-s25-on-us',
    name: 'Samsung Galaxy S25 On Us',
    internalId: 'S25_ONUS',
    category: 'Samsung',
    status: 'active',
    startDate: '2025-10-02',
    endDate: null,
    eligibleDevices: ['galaxy-s25'],
    aal: 'N', // Upgrade Only
    redemption: {
      tradeTiers: ['Good Condition'],
      tradeValues: [800, 400],
      ratePlan: 'Experience Beyond',
      tradeRequired: true
    },
    maxPayout: 800,
    limit: 'Per line',
    notStackableOnSameLine: []
  },
  {
    id: 'samsung-650-off',
    name: '$650 Off Select Samsungs',
    internalId: 'SAMSUNG_650OFF',
    category: 'Samsung',
    status: 'active',
    startDate: '2025-10-02',
    endDate: null,
    eligibleDevices: ['galaxy-s25', 'galaxy-s25-plus', 'galaxy-s25-ultra'],
    aal: 'N', // Upgrade Only
    redemption: {
      tradeTiers: ['Good Condition'],
      tradeValues: [650],
      ratePlan: 'All Voice Plans',
      tradeRequired: true
    },
    maxPayout: 650,
    limit: 'Per line',
    notStackableOnSameLine: []
  },
  {
    id: 'samsung-300-off',
    name: '$300 Off Select Samsungs',
    internalId: 'SAMSUNG_300OFF',
    category: 'Samsung',
    status: 'active',
    startDate: '2025-10-02',
    endDate: null,
    eligibleDevices: ['galaxy-s25', 'galaxy-s25-plus', 'galaxy-s25-ultra', 'galaxy-s25-fe'],
    aal: 'N', // Upgrade Only
    redemption: {
      tradeTiers: ['Good Condition'],
      tradeValues: [300, 150],
      ratePlan: 'All Voice Plans',
      tradeRequired: true
    },
    maxPayout: 300,
    limit: 'Per line',
    notStackableOnSameLine: []
  },
  {
    id: 'android-600-off',
    name: '$600 Off Android Smartphones',
    internalId: 'ANDROID_600OFF',
    category: 'Android',
    status: 'active',
    startDate: '2025-10-02',
    endDate: null,
    eligibleDevices: ['pixel-10', 'pixel-10-pro', 'pixel-10-pro-xl', 'galaxy-s25', 'galaxy-s25-plus'],
    aal: 'N', // Upgrade Only
    redemption: {
      tradeTiers: ['Good Condition'],
      tradeValues: [600],
      ratePlan: 'All Voice Plans',
      tradeRequired: true
    },
    maxPayout: 600,
    limit: 'Per line',
    notStackableOnSameLine: []
  },
  {
    id: 'android-300-99-off',
    name: '$300.99 Off Android Smartphones',
    internalId: 'ANDROID_30099OFF',
    category: 'Android',
    status: 'active',
    startDate: '2025-03-20',
    endDate: null,
    eligibleDevices: ['pixel-9', 'pixel-9-pro', 'galaxy-s24', 'galaxy-s24-plus'],
    aal: 'N', // Upgrade Only
    redemption: {
      tradeTiers: ['Good Condition'],
      tradeValues: [300.99],
      ratePlan: 'All Voice Plans',
      tradeRequired: true
    },
    maxPayout: 300.99,
    limit: 'Per line',
    notStackableOnSameLine: []
  },
  {
    id: 'android-500-off',
    name: '$500 Off Select Androids',
    internalId: 'ANDROID_500OFF',
    category: 'Android',
    status: 'active',
    startDate: '2025-10-02',
    endDate: null,
    eligibleDevices: ['pixel-10', 'pixel-10-pro', 'galaxy-s25-fe'],
    aal: 'N', // Upgrade Only
    redemption: {
      tradeTiers: ['Good Condition'],
      tradeValues: [500, 250],
      ratePlan: 'All Voice Plans',
      tradeRequired: true
    },
    maxPayout: 500,
    limit: 'Per line',
    notStackableOnSameLine: []
  },
  {
    id: 'razr-plus-on-us',
    name: 'Moto razr+ On Us',
    internalId: 'RAZRPLUS_ONUS',
    category: 'Android',
    status: 'active',
    startDate: '2025-10-02',
    endDate: null,
    eligibleDevices: ['razr-plus-2025'],
    aal: 'N', // Upgrade Only
    redemption: {
      tradeTiers: ['Any Condition'],
      tradeValues: [1000],
      ratePlan: 'Experience Beyond',
      tradeRequired: true
    },
    maxPayout: 1000,
    limit: 'Per line',
    notStackableOnSameLine: []
  },
  {
    id: 'pixel-10-on-us',
    name: 'Google Pixel 10 On Us',
    internalId: 'PIXEL10_ONUS',
    category: 'Pixel',
    status: 'active',
    startDate: '2025-10-02',
    endDate: null,
    eligibleDevices: ['pixel-10'],
    aal: 'N', // Upgrade Only
    redemption: {
      tradeTiers: ['Condition-Based'],
      tradeValues: [1000, 500],
      ratePlan: 'Experience Beyond',
      tradeRequired: true
    },
    maxPayout: 1000,
    limit: 'Per line',
    notStackableOnSameLine: []
  },

  // TABLET PROMOTIONS
  {
    id: 'ipad-a16-250-off',
    name: '$250 Off iPad (A16)',
    internalId: 'IPADA16_250OFF',
    category: 'Tablet',
    status: 'active',
    startDate: '2025-10-02',
    endDate: null,
    eligibleDevices: ['ipad-a16'],
    aal: 'Y', // New Line Required
    redemption: {
      tradeTiers: [],
      tradeValues: [250],
      ratePlan: 'iPad A16',
      tradeRequired: false
    },
    maxPayout: 250,
    limit: 'Per line',
    notStackableOnSameLine: []
  },
  {
    id: 'tab-a9-plus-on-us',
    name: 'Samsung Tab A9+ On Us',
    internalId: 'TABA9PLUS_ONUS',
    category: 'Tablet',
    status: 'active',
    startDate: '2025-08-21',
    endDate: null,
    eligibleDevices: ['galaxy-tab-a9-plus'],
    aal: 'Y', // New Line Required
    redemption: {
      tradeTiers: [],
      tradeValues: [0],
      ratePlan: 'Tab A9+',
      tradeRequired: false
    },
    maxPayout: 0,
    limit: 'Per line',
    notStackableOnSameLine: []
  },
  {
    id: 'tab-s10-fe-300-off',
    name: '$300 Off Samsung Tab S10 FE 5G',
    internalId: 'TABS10FE_300OFF',
    category: 'Tablet',
    status: 'active',
    startDate: '2025-06-18',
    endDate: null,
    eligibleDevices: ['galaxy-tab-s10-fe-5g'],
    aal: 'N', // Upgrade Only
    redemption: {
      tradeTiers: [],
      tradeValues: [300],
      ratePlan: 'Tab S10 FE 5G',
      tradeRequired: false
    },
    maxPayout: 300,
    limit: 'Per line',
    notStackableOnSameLine: []
  },
  {
    id: 'revvl-tab-2-on-us',
    name: 'Revvl Tab 2 On Us',
    internalId: 'REVVL_TAB2_ONUS',
    category: 'Tablet',
    status: 'active',
    startDate: '2025-06-26',
    endDate: null,
    eligibleDevices: ['revvl-tab-2'],
    aal: 'Y', // New Line Required
    redemption: {
      tradeTiers: [],
      tradeValues: [0],
      ratePlan: 'Revvl Tab 2',
      tradeRequired: false
    },
    maxPayout: 0,
    limit: 'Per line',
    notStackableOnSameLine: []
  },

  // WEARABLE PROMOTIONS
  {
    id: 'apple-watch-200-99-off',
    name: '$200.99 Off Apple Watch',
    internalId: 'APPLEWATCH_20099OFF',
    category: 'Wearable',
    status: 'active',
    startDate: '2025-10-09',
    endDate: null,
    eligibleDevices: ['apple-watch-series-10', 'apple-watch-series-9', 'apple-watch-se-3rd'],
    aal: 'Y', // New Line Required
    redemption: {
      tradeTiers: [],
      tradeValues: [200.99],
      ratePlan: '36-Month EIP',
      tradeRequired: false
    },
    maxPayout: 200.99,
    limit: 'Per line',
    notStackableOnSameLine: []
  },
  {
    id: 'samsung-watch-400-off',
    name: '$400 Off Samsung Watches',
    internalId: 'SAMSUNGWATCH_400OFF',
    category: 'Wearable',
    status: 'active',
    startDate: '2025-10-09',
    endDate: null,
    eligibleDevices: ['galaxy-watch-7', 'galaxy-watch-classic-7', 'galaxy-watch-pro-7'],
    aal: 'Y', // New Line Required
    redemption: {
      tradeTiers: [],
      tradeValues: [400],
      ratePlan: '36-Month EIP',
      tradeRequired: false
    },
    maxPayout: 400,
    limit: 'Per line',
    notStackableOnSameLine: []
  },
  {
    id: 'pixel-watch-449-99-off',
    name: '$449.99 Off Google Pixel Watch',
    internalId: 'PIXELWATCH_44999OFF',
    category: 'Wearable',
    status: 'active',
    startDate: '2025-10-09',
    endDate: null,
    eligibleDevices: ['pixel-watch-2'],
    aal: 'Y', // New Line Required
    redemption: {
      tradeTiers: [],
      tradeValues: [449.99],
      ratePlan: '36-Month EIP',
      tradeRequired: false
    },
    maxPayout: 449.99,
    limit: 'Per line',
    notStackableOnSameLine: []
  },
  {
    id: 'apple-watch-bogo',
    name: 'Apple Watch BOGO',
    internalId: 'APPLEWATCH_BOGO',
    category: 'Wearable',
    status: 'active',
    startDate: '2025-10-09',
    endDate: null,
    eligibleDevices: ['apple-watch-series-10', 'apple-watch-series-9', 'apple-watch-se-3rd'],
    aal: 'Y', // New Line Required
    redemption: {
      tradeTiers: [],
      tradeValues: [300],
      ratePlan: 'Buy One, Get One',
      tradeRequired: false
    },
    maxPayout: 300,
    limit: 'Per line',
    notStackableOnSameLine: []
  },

  // HOME INTERNET & FIBER PROMOTIONS
  {
    id: 'hsi-200-rebate',
    name: 'Up to $200 Rebate with HSI Line',
    internalId: 'HSI_200REBATE',
    category: 'Home Internet',
    status: 'active',
    startDate: '2025-10-09',
    endDate: null,
    eligibleDevices: ['tmobile-home-internet', 'tmobile-home-internet-plus'],
    aal: 'Y', // New Line Required
    redemption: {
      tradeTiers: [],
      tradeValues: [200],
      ratePlan: 'Requires Active HSI',
      tradeRequired: false
    },
    maxPayout: 200,
    limit: 'Per line',
    notStackableOnSameLine: []
  },
  {
    id: 'hsi-5-off-bundle',
    name: '$5 Off HSI with Any Voice Line',
    internalId: 'HSI_5OFF_BUNDLE',
    category: 'Home Internet',
    status: 'active',
    startDate: '2025-09-09',
    endDate: null,
    eligibleDevices: ['tmobile-home-internet', 'tmobile-home-internet-plus'],
    aal: 'Y', // New Line Required
    redemption: {
      tradeTiers: [],
      tradeValues: [5],
      ratePlan: 'Bundle Offer',
      tradeRequired: false
    },
    maxPayout: 5,
    limit: 'Per line',
    notStackableOnSameLine: []
  },
  {
    id: 'metronet-one-month-free',
    name: 'Metronet One Month Free',
    internalId: 'METRONET_FREE',
    category: 'Home Internet',
    status: 'active',
    startDate: '2025-10-16',
    endDate: null,
    eligibleDevices: ['metronet-fiber'],
    aal: 'Y', // New Line Required
    redemption: {
      tradeTiers: [],
      tradeValues: [0],
      ratePlan: 'Fiber Internet',
      tradeRequired: false
    },
    maxPayout: 0,
    limit: 'Per line',
    notStackableOnSameLine: []
  },
  {
    id: 'fiber-100-300-rebate',
    name: '$100/$300 Rebate with Fiber',
    internalId: 'FIBER_100_300REBATE',
    category: 'Home Internet',
    status: 'active',
    startDate: '2025-10-07',
    endDate: null,
    eligibleDevices: ['metronet-fiber'],
    aal: 'Y', // New Line Required
    redemption: {
      tradeTiers: [],
      tradeValues: [100, 300],
      ratePlan: 'Fiber Line',
      tradeRequired: false
    },
    maxPayout: 300,
    limit: 'Per line',
    notStackableOnSameLine: []
  },
  {
    id: 'fiber-voice-200-400-rebate',
    name: '$200/$400 Rebate with Fiber & Voice Line',
    internalId: 'FIBER_VOICE_200_400REBATE',
    category: 'Home Internet',
    status: 'active',
    startDate: '2025-09-10',
    endDate: null,
    eligibleDevices: ['metronet-fiber'],
    aal: 'Y', // New Line Required
    redemption: {
      tradeTiers: [],
      tradeValues: [200, 400],
      ratePlan: 'Fiber + Voice',
      tradeRequired: false
    },
    maxPayout: 400,
    limit: 'Per line',
    notStackableOnSameLine: []
  },

  // HOTSPOT / IOT / PREPAID PROMOTIONS
  {
    id: 'tcl-linkport-on-us',
    name: 'TCL LINKPORT IK511 On Us',
    internalId: 'TCL_LINKPORT_ONUS',
    category: 'Hotspot',
    status: 'active',
    startDate: '2025-06-18',
    endDate: null,
    eligibleDevices: ['tcl-linkport-ik511'],
    aal: 'Y', // New Line Required
    redemption: {
      tradeTiers: [],
      tradeValues: [0],
      ratePlan: 'Hotspot Device',
      tradeRequired: false
    },
    maxPayout: 0,
    limit: 'Per line',
    notStackableOnSameLine: []
  },
  {
    id: 'syncup-tracker-free',
    name: 'Free SyncUP Tracker',
    internalId: 'SYNCUP_TRACKER_FREE',
    category: 'IoT',
    status: 'active',
    startDate: '2025-01-26',
    endDate: null,
    eligibleDevices: ['syncup-tracker'],
    aal: 'Y', // New Line Required
    redemption: {
      tradeTiers: [],
      tradeValues: [0],
      ratePlan: 'IoT Device',
      tradeRequired: false
    },
    maxPayout: 0,
    limit: 'Per line',
    notStackableOnSameLine: []
  },
  {
    id: 'watch-tablet-laptop-5-off',
    name: '$5 Watch/Tablet/Laptop Line',
    internalId: 'WATCH_TABLET_LAPTOP_5OFF',
    category: 'IoT',
    status: 'active',
    startDate: '2025-10-17',
    endDate: null,
    eligibleDevices: ['apple-watch-series-10', 'apple-watch-series-9', 'galaxy-watch-7', 'ipad-a16', 'galaxy-tab-a9-plus'],
    aal: 'Y', // New Line Required
    redemption: {
      tradeTiers: [],
      tradeValues: [5],
      ratePlan: 'BTS Offer',
      tradeRequired: false
    },
    maxPayout: 5,
    limit: 'Per line',
    notStackableOnSameLine: []
  },

  // PLAN-BASED DISCOUNTS
  {
    id: 'bogo-discount-aal',
    name: 'BOGO Discount AAL (Existing BANs)',
    internalId: 'BOGO_DISCOUNT_AAL',
    category: 'Plan',
    status: 'active',
    startDate: '2025-10-16',
    endDate: '2025-10-17',
    eligibleDevices: [],
    aal: 'Y', // New Line Required
    redemption: {
      tradeTiers: [],
      tradeValues: [0],
      ratePlan: 'Free GO Line',
      tradeRequired: false
    },
    maxPayout: 0,
    limit: 'Per line',
    notStackableOnSameLine: [],
    stackable: true
  },
  {
    id: 'third-line-discount',
    name: '3rd Line Discount (New BANs)',
    internalId: 'THIRD_LINE_DISCOUNT',
    category: 'Plan',
    status: 'active',
    startDate: '2025-10-16',
    endDate: '2025-10-17',
    eligibleDevices: [],
    aal: 'Y', // New Line Required
    redemption: {
      tradeTiers: [],
      tradeValues: [0],
      ratePlan: 'Free 3rd Line',
      tradeRequired: false
    },
    maxPayout: 0,
    limit: '3-Line Minimum',
    notStackableOnSameLine: []
  },
  {
    id: 'keep-and-switch',
    name: 'Keep and Switch',
    internalId: 'KEEP_AND_SWITCH',
    category: 'Plan',
    status: 'active',
    startDate: '2025-09-05',
    endDate: null,
    eligibleDevices: [],
    aal: 'Y+P', // New Line + Port-In Required
    redemption: {
      tradeTiers: [],
      tradeValues: [800],
      ratePlan: 'BYOD Eligible',
      tradeRequired: false
    },
    maxPayout: 800,
    limit: 'Per line',
    notStackableOnSameLine: [],
    stackable: true
  },
  {
    id: 'family-freedom',
    name: 'Family Freedom',
    internalId: 'FAMILY_FREEDOM',
    category: 'Plan',
    status: 'active',
    startDate: '2025-04-03',
    endDate: null,
    eligibleDevices: [],
    aal: 'Y+P', // New Line + Port-In Required
    redemption: {
      tradeTiers: [],
      tradeValues: [800],
      ratePlan: 'Stackable',
      tradeRequired: true
    },
    maxPayout: 800,
    limit: 'Per line',
    notStackableOnSameLine: [],
    stackable: true
  },
  {
    id: 'tmobile-work-perks',
    name: 'T-Mobile Work Perks',
    internalId: 'TMOBILE_WORK_PERKS',
    category: 'Plan',
    status: 'active',
    startDate: '2025-11-18',
    endDate: null,
    eligibleDevices: [],
    aal: 'Y', // New Line Required
    redemption: {
      tradeTiers: [],
      tradeValues: [0],
      ratePlan: 'Ongoing',
      tradeRequired: false
    },
    maxPayout: 0,
    limit: 'Per line',
    notStackableOnSameLine: [],
    stackable: true
  },

  // ADDITIONAL OFFERS
  {
    id: 'affordables-300-99-off',
    name: 'Up to $300.99 Off Affordables',
    internalId: 'AFFORDABLES_30099OFF',
    category: 'Other',
    status: 'active',
    startDate: '2025-03-20',
    endDate: null,
    eligibleDevices: ['galaxy-a16', 'galaxy-a15', 'revvl-6x', 'revvl-6x-pro'],
    aal: 'N', // Upgrade Only
    redemption: {
      tradeTiers: ['Any Phone, Good Condition'],
      tradeValues: [300.99],
      ratePlan: 'All Voice Plans',
      tradeRequired: true
    },
    maxPayout: 300.99,
    limit: 'Per line',
    notStackableOnSameLine: []
  },
  {
    id: 'samsung-a16-on-us',
    name: 'Samsung A16 On Us',
    internalId: 'SAMSUNG_A16_ONUS',
    category: 'Samsung',
    status: 'active',
    startDate: '2025-10-02',
    endDate: null,
    eligibleDevices: ['galaxy-a16'],
    aal: 'Y', // New Line Required
    redemption: {
      tradeTiers: ['Any Phone, Any Condition'],
      tradeValues: [0],
      ratePlan: 'All Voice Plans',
      tradeRequired: false
    },
    maxPayout: 0,
    limit: 'Per line',
    notStackableOnSameLine: []
  },
  {
    id: 'assorted-5g-devices-on-us',
    name: 'Assorted 5G Devices On Us',
    internalId: 'ASSORTED_5G_ONUS',
    category: 'Other',
    status: 'active',
    startDate: '2025-08-21',
    endDate: null,
    eligibleDevices: ['galaxy-a15', 'revvl-6x', 'revvl-6x-pro'],
    aal: 'Y', // New Line Required
    redemption: {
      tradeTiers: ['Any Phone, Any Condition'],
      tradeValues: [0],
      ratePlan: 'All Voice Plans',
      tradeRequired: false
    },
    maxPayout: 0,
    limit: 'Per line',
    notStackableOnSameLine: []
  },
  {
    id: 'bts-100-port-rebate',
    name: 'BTS $100 Port-in Rebate',
    internalId: 'BTS_100_PORT_REBATE',
    category: 'Other',
    status: 'active',
    startDate: '2025-06-18',
    endDate: null,
    eligibleDevices: [],
    aal: 'Y+P', // New Line + Port-In Required
    redemption: {
      tradeTiers: [],
      tradeValues: [100],
      ratePlan: 'All Voice Plans',
      tradeRequired: false
    },
    maxPayout: 100,
    limit: 'Per line',
    notStackableOnSameLine: []
  }
];

// Helper functions for promotion management
export const getPromotionsForDevice = (deviceId) => {
  return promotions.filter(promo => 
    promo.eligibleDevices.includes(deviceId)
  );
};

export const getTradeInValueForPromotion = (promotionId, tradeInDeviceId) => {
  const promotion = promotions.find(p => p.id === promotionId);
  if (!promotion) return 0;

  // This would typically come from a trade-in device database
  const tradeInValues = {
    'iphone-12': 830,
    'iphone-12-pro': 830,
    'iphone-13': 830,
    'iphone-13-pro': 830,
    'iphone-14': 830,
    'iphone-14-pro': 830,
    'iphone-15': 830,
    'iphone-15-pro': 830,
    'galaxy-s21': 800,
    'galaxy-s22': 800,
    'galaxy-s23': 800,
    'galaxy-s24': 800,
    'pixel-6': 800,
    'pixel-7': 800,
    'pixel-8': 800,
    'pixel-9': 800
  };

  const baseValue = tradeInValues[tradeInDeviceId] || 0;
  
  // Apply promotion-specific trade-in values
  if (promotion.redemption.tradeValues && promotion.redemption.tradeValues.length > 0) {
    return Math.min(baseValue, promotion.redemption.tradeValues[0]);
  }
  
  return baseValue;
};

export const isRatePlanEligible = (promotionId, planId) => {
  const promotion = promotions.find(p => p.id === promotionId);
  if (!promotion) return false;

  const ratePlan = promotion.redemption.ratePlan.toLowerCase();
  
  // Check if plan is eligible based on promotion requirements
  if (ratePlan.includes('experience beyond')) {
    return ['experience-beyond', 'experience-beyond-55', 'experience-beyond-military', 'experience-beyond-first-responder'].includes(planId);
  }
  
  if (ratePlan.includes('experience more')) {
    return ['experience-more', 'experience-more-55'].includes(planId);
  }
  
  if (ratePlan.includes('experience')) {
    return ['experience-more', 'experience-beyond', 'experience-more-55', 'experience-beyond-55', 'experience-beyond-military', 'experience-beyond-first-responder'].includes(planId);
  }
  
  if (ratePlan.includes('55+') || ratePlan.includes('military') || ratePlan.includes('fr')) {
    return ['essentials-choice-55', 'experience-more-55', 'experience-beyond-55', 'experience-beyond-military', 'experience-beyond-first-responder'].includes(planId);
  }
  
  if (ratePlan.includes('all voice plans')) {
    return true; // Most plans are eligible
  }
  
  if (ratePlan.includes('most voice plans')) {
    return !['essentials-saver', 'choice', 'value'].includes(planId);
  }
  
  return true; // Default to eligible
};

export const checkPromotionLimits = (selectedPromotions) => {
  const errors = [];
  const promotionCounts = {};
  
  selectedPromotions.forEach(promo => {
    const promotion = promotions.find(p => p.id === promo.promotionId);
    if (promotion) {
      promotionCounts[promotion.id] = (promotionCounts[promotion.id] || 0) + 1;
      
      // Check per-line limits (Per line means it can be applied to multiple lines)
      // No validation needed for "Per line" as it's allowed on multiple lines
      
      // Check account-level limits
      if (promotion.limit === '3-Line Minimum' && selectedPromotions.length < 3) {
        errors.push(`${promotion.name} requires a minimum of 3 lines`);
      }
    }
  });
  
  return { valid: errors.length === 0, errors };
};

export const checkStackability = (selectedPromotions) => {
  const errors = [];
  const stackablePromotions = selectedPromotions.filter(promo => {
    const promotion = promotions.find(p => p.id === promo.promotionId);
    return promotion?.stackable === true;
  });
  
  // Check for non-stackable promotions on the same line
  selectedPromotions.forEach(promo => {
    const promotion = promotions.find(p => p.id === promo.promotionId);
    if (promotion && !promotion.stackable) {
      const conflictingPromos = selectedPromotions.filter(otherPromo => 
        otherPromo.lineIndex === promo.lineIndex && 
        otherPromo.promotionId !== promo.promotionId
      );
      
      if (conflictingPromos.length > 0) {
        errors.push(`${promotion.name} cannot be stacked with other promotions on the same line`);
      }
    }
  });
  
  return errors;
};

export const validatePromotionEligibility = (promotionId, deviceId, planId, lineType, hasPortIn) => {
  const promotion = promotions.find(p => p.id === promotionId);
  if (!promotion) return { eligible: false, reason: 'Promotion not found' };

  // Check device eligibility
  if (!promotion.eligibleDevices.includes(deviceId)) {
    return { eligible: false, reason: 'Device not eligible for this promotion' };
  }

  // Check AAL requirements
  if (promotion.aal === 'Y' && lineType !== 'new') {
    return { eligible: false, reason: 'This promotion requires a new line' };
  }
  
  if (promotion.aal === 'N' && lineType !== 'upgrade') {
    return { eligible: false, reason: 'This promotion is for upgrades only' };
  }
  
  if (promotion.aal === 'Y+P' && (!hasPortIn || lineType !== 'new')) {
    return { eligible: false, reason: 'This promotion requires a new line with port-in' };
  }

  // Check rate plan eligibility
  if (!isRatePlanEligible(promotionId, planId)) {
    return { eligible: false, reason: 'Rate plan not eligible for this promotion' };
  }

  // Check if promotion is active
  const now = new Date();
  const startDate = new Date(promotion.startDate);
  const endDate = promotion.endDate ? new Date(promotion.endDate) : null;
  
  if (now < startDate) {
    return { eligible: false, reason: 'Promotion has not started yet' };
  }
  
  if (endDate && now > endDate) {
    return { eligible: false, reason: 'Promotion has expired' };
  }

  return { eligible: true };
};

export const getPromotionSummary = (promotionId) => {
  const promotion = promotions.find(p => p.id === promotionId);
  if (!promotion) return null;

  return {
    id: promotion.id,
    name: promotion.name,
    internalId: promotion.internalId,
    category: promotion.category,
    status: promotion.status,
    maxPayout: promotion.maxPayout,
    aal: promotion.aal,
    ratePlan: promotion.redemption.ratePlan,
    tradeRequired: promotion.redemption.tradeRequired,
    limit: promotion.limit,
    stackable: promotion.stackable || false
  };
};

export const getPromotionCategory = (promotionId) => {
  const promotion = promotions.find(p => p.id === promotionId);
  return promotion?.category || 'Other';
};

export default promotions;