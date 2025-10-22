// Comprehensive T-Mobile Device Database
// Updated with current device lineup and pricing

export const deviceCategories = {
  smartphone: {
    name: 'Smartphones',
    description: 'Latest smartphones with 5G connectivity',
    icon: '📱'
  },
  tablet: {
    name: 'Tablets',
    description: 'Tablets and iPad devices',
    icon: '📱'
  },
  wearable: {
    name: 'Wearables',
    description: 'Smartwatches and fitness trackers',
    icon: '⌚'
  },
  hotspot: {
    name: 'Hotspots',
    description: 'Mobile hotspot devices',
    icon: '📶'
  },
  iot: {
    name: 'IoT Devices',
    description: 'Internet of Things devices',
    icon: '🌐'
  }
};

export const devices = {
  // iPhone Series
  'iphone-17-pro-max': {
    id: 'iphone-17-pro-max',
    name: 'iPhone 17 Pro Max',
    brand: 'Apple',
    category: 'smartphone',
    price: 1199,
    monthlyPayment: 50,
    storage: ['256GB', '512GB', '1TB'],
    colors: ['Natural Titanium', 'Blue Titanium', 'White Titanium', 'Black Titanium'],
    features: ['6.9" Super Retina XDR', 'A18 Pro chip', '48MP camera system', '5G', 'Titanium design'],
    image: '/devices/iphone-17-pro-max.jpg',
    availability: 'in-stock',
    promotions: ['iphone-17-pro-on-us', 'iphone-17-pro-900-off']
  },
  'iphone-17-pro': {
    id: 'iphone-17-pro',
    name: 'iPhone 17 Pro',
    brand: 'Apple',
    category: 'smartphone',
    price: 1099,
    monthlyPayment: 46,
    storage: ['256GB', '512GB', '1TB'],
    colors: ['Natural Titanium', 'Blue Titanium', 'White Titanium', 'Black Titanium'],
    features: ['6.3" Super Retina XDR', 'A18 Pro chip', '48MP camera system', '5G', 'Titanium design'],
    image: '/devices/iphone-17-pro.jpg',
    availability: 'in-stock',
    promotions: ['iphone-17-pro-on-us', 'iphone-17-pro-900-off']
  },
  'iphone-17-plus': {
    id: 'iphone-17-plus',
    name: 'iPhone 17 Plus',
    brand: 'Apple',
    category: 'smartphone',
    price: 899,
    monthlyPayment: 37,
    storage: ['128GB', '256GB', '512GB'],
    colors: ['Pink', 'Yellow', 'Green', 'Blue', 'Black'],
    features: ['6.7" Super Retina XDR', 'A18 chip', '48MP camera', '5G', 'Ceramic Shield'],
    image: '/devices/iphone-17-plus.jpg',
    availability: 'in-stock',
    promotions: ['iphone-17-on-us', 'iphone-17-630-off', 'iphone-17-300-off']
  },
  'iphone-17': {
    id: 'iphone-17',
    name: 'iPhone 17',
    brand: 'Apple',
    category: 'smartphone',
    price: 799,
    monthlyPayment: 33,
    storage: ['128GB', '256GB', '512GB'],
    colors: ['Pink', 'Yellow', 'Green', 'Blue', 'Black'],
    features: ['6.1" Super Retina XDR', 'A18 chip', '48MP camera', '5G', 'Ceramic Shield'],
    image: '/devices/iphone-17.jpg',
    availability: 'in-stock',
    promotions: ['iphone-17-on-us', 'iphone-17-630-off', 'iphone-17-300-off']
  },
  'iphone-16e': {
    id: 'iphone-16e',
    name: 'iPhone 16e',
    brand: 'Apple',
    category: 'smartphone',
    price: 599,
    monthlyPayment: 25,
    storage: ['128GB', '256GB'],
    colors: ['Pink', 'Yellow', 'Green', 'Blue', 'Black'],
    features: ['6.1" Super Retina XDR', 'A17 chip', '48MP camera', '5G', 'Ceramic Shield'],
    image: '/devices/iphone-16e.jpg',
    availability: 'in-stock',
    promotions: ['iphone-16e-on-us']
  },
  'iphone-15-pro-max': {
    id: 'iphone-15-pro-max',
    name: 'iPhone 15 Pro Max',
    brand: 'Apple',
    category: 'smartphone',
    price: 1099,
    monthlyPayment: 46,
    storage: ['256GB', '512GB', '1TB'],
    colors: ['Natural Titanium', 'Blue Titanium', 'White Titanium', 'Black Titanium'],
    features: ['6.7" Super Retina XDR', 'A17 Pro chip', '48MP camera system', '5G', 'Titanium design'],
    image: '/devices/iphone-15-pro-max.jpg',
    availability: 'in-stock',
    promotions: ['iphone-15-50-off']
  },
  'iphone-15-pro': {
    id: 'iphone-15-pro',
    name: 'iPhone 15 Pro',
    brand: 'Apple',
    category: 'smartphone',
    price: 999,
    monthlyPayment: 42,
    storage: ['128GB', '256GB', '512GB', '1TB'],
    colors: ['Natural Titanium', 'Blue Titanium', 'White Titanium', 'Black Titanium'],
    features: ['6.1" Super Retina XDR', 'A17 Pro chip', '48MP camera system', '5G', 'Titanium design'],
    image: '/devices/iphone-15-pro.jpg',
    availability: 'in-stock',
    promotions: ['iphone-15-50-off']
  },
  'iphone-15': {
    id: 'iphone-15',
    name: 'iPhone 15',
    brand: 'Apple',
    category: 'smartphone',
    price: 699,
    monthlyPayment: 29,
    storage: ['128GB', '256GB', '512GB'],
    colors: ['Pink', 'Yellow', 'Green', 'Blue', 'Black'],
    features: ['6.1" Super Retina XDR', 'A16 chip', '48MP camera', '5G', 'Ceramic Shield'],
    image: '/devices/iphone-15.jpg',
    availability: 'in-stock',
    promotions: ['iphone-15-50-off']
  },
  'iphone-se-3rd': {
    id: 'iphone-se-3rd',
    name: 'iPhone SE (3rd Gen)',
    brand: 'Apple',
    category: 'smartphone',
    price: 429,
    monthlyPayment: 18,
    storage: ['64GB', '128GB', '256GB'],
    colors: ['Midnight', 'Starlight', 'Red'],
    features: ['4.7" Retina HD', 'A15 chip', '12MP camera', '5G', 'Touch ID'],
    image: '/devices/iphone-se-3rd.jpg',
    availability: 'in-stock',
    promotions: []
  },

  // Samsung Galaxy Series
  'galaxy-s25-edge': {
    id: 'galaxy-s25-edge',
    name: 'Samsung Galaxy S25 Edge',
    brand: 'Samsung',
    category: 'smartphone',
    price: 1299,
    monthlyPayment: 54,
    storage: ['256GB', '512GB', '1TB'],
    colors: ['Titanium Black', 'Titanium Gray', 'Titanium Violet', 'Titanium Yellow'],
    features: ['6.6" Dynamic AMOLED 2X', 'Snapdragon 8 Gen 4', '200MP camera', '5G', 'S Pen'],
    image: '/devices/galaxy-s25-edge.jpg',
    availability: 'in-stock',
    promotions: ['galaxy-s25-edge-on-us', 'samsung-650-off', 'samsung-300-off']
  },
  'galaxy-s25-ultra': {
    id: 'galaxy-s25-ultra',
    name: 'Samsung Galaxy S25 Ultra',
    brand: 'Samsung',
    category: 'smartphone',
    price: 1299,
    monthlyPayment: 54,
    storage: ['256GB', '512GB', '1TB'],
    colors: ['Titanium Black', 'Titanium Gray', 'Titanium Violet', 'Titanium Yellow'],
    features: ['6.8" Dynamic AMOLED 2X', 'Snapdragon 8 Gen 4', '200MP camera', '5G', 'S Pen'],
    image: '/devices/galaxy-s25-ultra.jpg',
    availability: 'in-stock',
    promotions: ['samsung-650-off', 'samsung-300-off']
  },
  'galaxy-s25-plus': {
    id: 'galaxy-s25-plus',
    name: 'Samsung Galaxy S25+',
    brand: 'Samsung',
    category: 'smartphone',
    price: 999,
    monthlyPayment: 42,
    storage: ['256GB', '512GB'],
    colors: ['Titanium Black', 'Titanium Gray', 'Titanium Violet', 'Titanium Yellow'],
    features: ['6.7" Dynamic AMOLED 2X', 'Snapdragon 8 Gen 4', '50MP camera', '5G'],
    image: '/devices/galaxy-s25-plus.jpg',
    availability: 'in-stock',
    promotions: ['galaxy-s25-plus-on-us', 'samsung-650-off', 'samsung-300-off']
  },
  'galaxy-s25': {
    id: 'galaxy-s25',
    name: 'Samsung Galaxy S25',
    brand: 'Samsung',
    category: 'smartphone',
    price: 799,
    monthlyPayment: 33,
    storage: ['128GB', '256GB', '512GB'],
    colors: ['Titanium Black', 'Titanium Gray', 'Titanium Violet', 'Titanium Yellow'],
    features: ['6.2" Dynamic AMOLED 2X', 'Snapdragon 8 Gen 4', '50MP camera', '5G'],
    image: '/devices/galaxy-s25.jpg',
    availability: 'in-stock',
    promotions: ['galaxy-s25-on-us', 'samsung-650-off', 'samsung-300-off']
  },
  'galaxy-s25-fe': {
    id: 'galaxy-s25-fe',
    name: 'Samsung Galaxy S25 FE',
    brand: 'Samsung',
    category: 'smartphone',
    price: 599,
    monthlyPayment: 25,
    storage: ['128GB', '256GB'],
    colors: ['Mint', 'Coral', 'Lavender', 'Graphite'],
    features: ['6.4" Dynamic AMOLED 2X', 'Snapdragon 8 Gen 3', '50MP camera', '5G'],
    image: '/devices/galaxy-s25-fe.jpg',
    availability: 'in-stock',
    promotions: ['samsung-300-off', 'android-500-off']
  },

  // Google Pixel Series
  'pixel-10-pro-xl': {
    id: 'pixel-10-pro-xl',
    name: 'Google Pixel 10 Pro XL',
    brand: 'Google',
    category: 'smartphone',
    price: 1199,
    monthlyPayment: 50,
    storage: ['256GB', '512GB', '1TB'],
    colors: ['Obsidian', 'Porcelain', 'Bay'],
    features: ['6.8" LTPO OLED', 'Tensor G5', '50MP camera', '5G', 'AI features'],
    image: '/devices/pixel-10-pro-xl.jpg',
    availability: 'in-stock',
    promotions: ['android-600-off', 'android-500-off']
  },
  'pixel-10-pro': {
    id: 'pixel-10-pro',
    name: 'Google Pixel 10 Pro',
    brand: 'Google',
    category: 'smartphone',
    price: 999,
    monthlyPayment: 42,
    storage: ['256GB', '512GB', '1TB'],
    colors: ['Obsidian', 'Porcelain', 'Bay'],
    features: ['6.3" LTPO OLED', 'Tensor G5', '50MP camera', '5G', 'AI features'],
    image: '/devices/pixel-10-pro.jpg',
    availability: 'in-stock',
    promotions: ['pixel-10-on-us', 'android-600-off', 'android-500-off']
  },
  'pixel-10': {
    id: 'pixel-10',
    name: 'Google Pixel 10',
    brand: 'Google',
    category: 'smartphone',
    price: 699,
    monthlyPayment: 29,
    storage: ['128GB', '256GB', '512GB'],
    colors: ['Obsidian', 'Porcelain', 'Bay'],
    features: ['6.2" OLED', 'Tensor G5', '50MP camera', '5G', 'AI features'],
    image: '/devices/pixel-10.jpg',
    availability: 'in-stock',
    promotions: ['pixel-10-on-us', 'android-600-off', 'android-500-off']
  },
  'pixel-9-pro': {
    id: 'pixel-9-pro',
    name: 'Google Pixel 9 Pro',
    brand: 'Google',
    category: 'smartphone',
    price: 999,
    monthlyPayment: 42,
    storage: ['128GB', '256GB', '512GB', '1TB'],
    colors: ['Obsidian', 'Porcelain', 'Bay'],
    features: ['6.3" LTPO OLED', 'Tensor G4', '50MP camera', '5G', 'AI features'],
    image: '/devices/pixel-9-pro.jpg',
    availability: 'in-stock',
    promotions: ['android-300-99-off']
  },
  'pixel-9': {
    id: 'pixel-9',
    name: 'Google Pixel 9',
    brand: 'Google',
    category: 'smartphone',
    price: 699,
    monthlyPayment: 29,
    storage: ['128GB', '256GB', '512GB'],
    colors: ['Obsidian', 'Porcelain', 'Bay'],
    features: ['6.2" OLED', 'Tensor G4', '50MP camera', '5G', 'AI features'],
    image: '/devices/pixel-9.jpg',
    availability: 'in-stock',
    promotions: ['android-300-99-off']
  },

  // Motorola Devices
  'razr-plus-2025': {
    id: 'razr-plus-2025',
    name: 'Motorola razr+ (2025)',
    brand: 'Motorola',
    category: 'smartphone',
    price: 799,
    monthlyPayment: 33,
    storage: ['256GB', '512GB'],
    colors: ['Midnight Blue', 'Sage Green', 'Hot Pink'],
    features: ['6.9" pOLED (unfolded)', 'Snapdragon 8s Gen 3', '50MP camera', '5G', 'Foldable'],
    image: '/devices/razr-plus-2025.jpg',
    availability: 'in-stock',
    promotions: ['razr-plus-on-us', 'android-500-off']
  },
  'razr-2025': {
    id: 'razr-2025',
    name: 'Motorola razr (2025)',
    brand: 'Motorola',
    category: 'smartphone',
    price: 599,
    monthlyPayment: 25,
    storage: ['128GB', '256GB'],
    colors: ['Midnight Blue', 'Sage Green', 'Hot Pink'],
    features: ['6.9" pOLED (unfolded)', 'Snapdragon 7 Gen 3', '50MP camera', '5G', 'Foldable'],
    image: '/devices/razr-2025.jpg',
    availability: 'in-stock',
    promotions: ['android-500-off']
  },

  // Affordable Devices
  'galaxy-a16': {
    id: 'galaxy-a16',
    name: 'Samsung Galaxy A16',
    brand: 'Samsung',
    category: 'smartphone',
    price: 299,
    monthlyPayment: 12,
    storage: ['64GB', '128GB'],
    colors: ['Awesome Black', 'Awesome Blue', 'Awesome Orange'],
    features: ['6.6" HD+', 'MediaTek Helio G85', '50MP camera', '5G'],
    image: '/devices/galaxy-a16.jpg',
    availability: 'in-stock',
    promotions: ['samsung-a16-on-us', 'affordables-300-99-off']
  },
  'galaxy-a15': {
    id: 'galaxy-a15',
    name: 'Samsung Galaxy A15',
    brand: 'Samsung',
    category: 'smartphone',
    price: 199,
    monthlyPayment: 8,
    storage: ['64GB', '128GB'],
    colors: ['Awesome Black', 'Awesome Blue', 'Awesome Orange'],
    features: ['6.5" HD+', 'MediaTek Helio G85', '50MP camera', '5G'],
    image: '/devices/galaxy-a15.jpg',
    availability: 'in-stock',
    promotions: ['assorted-5g-devices-on-us', 'affordables-300-99-off']
  },
  'revvl-6x-pro': {
    id: 'revvl-6x-pro',
    name: 'T-Mobile REVVL 6x Pro',
    brand: 'T-Mobile',
    category: 'smartphone',
    price: 299,
    monthlyPayment: 12,
    storage: ['128GB'],
    colors: ['Black'],
    features: ['6.82" HD+', 'MediaTek Helio G85', '50MP camera', '5G'],
    image: '/devices/revvl-6x-pro.jpg',
    availability: 'in-stock',
    promotions: ['assorted-5g-devices-on-us', 'affordables-300-99-off']
  },
  'revvl-6x': {
    id: 'revvl-6x',
    name: 'T-Mobile REVVL 6x',
    brand: 'T-Mobile',
    category: 'smartphone',
    price: 199,
    monthlyPayment: 8,
    storage: ['64GB'],
    colors: ['Black'],
    features: ['6.82" HD+', 'MediaTek Helio G85', '50MP camera', '5G'],
    image: '/devices/revvl-6x.jpg',
    availability: 'in-stock',
    promotions: ['assorted-5g-devices-on-us', 'affordables-300-99-off']
  },

  // BYOD Option
  'bring-your-own': {
    id: 'bring-your-own',
    name: 'Bring Your Own Device',
    brand: 'BYOD',
    category: 'smartphone',
    price: 0,
    monthlyPayment: 0,
    storage: ['Any'],
    colors: ['Any'],
    features: ['Use your existing device', 'No device payment', 'Keep & Switch eligible'],
    image: '/devices/byod.jpg',
    availability: 'always',
    promotions: ['keep-and-switch', 'family-freedom']
  },

  // Tablets
  'ipad-a16': {
    id: 'ipad-a16',
    name: 'iPad (A16)',
    brand: 'Apple',
    category: 'tablet',
    price: 449,
    monthlyPayment: 19,
    storage: ['64GB', '256GB'],
    colors: ['Silver', 'Space Gray', 'Pink', 'Blue', 'Yellow'],
    features: ['10.9" Liquid Retina', 'A16 chip', '12MP camera', '5G', 'Apple Pencil support'],
    image: '/devices/ipad-a16.jpg',
    availability: 'in-stock',
    promotions: ['ipad-a16-250-off', 'watch-tablet-laptop-5-off']
  },
  'galaxy-tab-a9-plus': {
    id: 'galaxy-tab-a9-plus',
    name: 'Samsung Galaxy Tab A9+',
    brand: 'Samsung',
    category: 'tablet',
    price: 279,
    monthlyPayment: 12,
    storage: ['64GB', '128GB'],
    colors: ['Graphite', 'Silver'],
    features: ['11" TFT', 'Snapdragon 695', '8MP camera', '5G'],
    image: '/devices/galaxy-tab-a9-plus.jpg',
    availability: 'in-stock',
    promotions: ['tab-a9-plus-on-us', 'watch-tablet-laptop-5-off']
  },
  'galaxy-tab-s10-fe-5g': {
    id: 'galaxy-tab-s10-fe-5g',
    name: 'Samsung Galaxy Tab S10 FE 5G',
    brand: 'Samsung',
    category: 'tablet',
    price: 529,
    monthlyPayment: 22,
    storage: ['128GB', '256GB'],
    colors: ['Graphite', 'Silver', 'Mint'],
    features: ['12.4" TFT', 'Snapdragon 8 Gen 3', '8MP camera', '5G', 'S Pen support'],
    image: '/devices/galaxy-tab-s10-fe-5g.jpg',
    availability: 'in-stock',
    promotions: ['tab-s10-fe-300-off', 'watch-tablet-laptop-5-off']
  },
  'revvl-tab-2': {
    id: 'revvl-tab-2',
    name: 'T-Mobile REVVL Tab 2',
    brand: 'T-Mobile',
    category: 'tablet',
    price: 199,
    monthlyPayment: 8,
    storage: ['32GB'],
    colors: ['Black'],
    features: ['10.1" HD', 'MediaTek Helio G85', '8MP camera', '5G'],
    image: '/devices/revvl-tab-2.jpg',
    availability: 'in-stock',
    promotions: ['revvl-tab-2-on-us', 'watch-tablet-laptop-5-off']
  },

  // Wearables
  'apple-watch-series-10': {
    id: 'apple-watch-series-10',
    name: 'Apple Watch Series 10',
    brand: 'Apple',
    category: 'wearable',
    price: 399,
    monthlyPayment: 17,
    storage: ['GPS', 'GPS + Cellular'],
    colors: ['Pink', 'Midnight', 'Starlight', 'Product Red'],
    features: ['45mm/41mm', 'S10 chip', 'Always-on display', 'ECG', 'Blood oxygen'],
    image: '/devices/apple-watch-series-10.jpg',
    availability: 'in-stock',
    promotions: ['apple-watch-200-99-off', 'apple-watch-bogo', 'watch-tablet-laptop-5-off']
  },
  'apple-watch-series-9': {
    id: 'apple-watch-series-9',
    name: 'Apple Watch Series 9',
    brand: 'Apple',
    category: 'wearable',
    price: 399,
    monthlyPayment: 17,
    storage: ['GPS', 'GPS + Cellular'],
    colors: ['Pink', 'Midnight', 'Starlight', 'Product Red'],
    features: ['45mm/41mm', 'S9 chip', 'Always-on display', 'ECG', 'Blood oxygen'],
    image: '/devices/apple-watch-series-9.jpg',
    availability: 'in-stock',
    promotions: ['apple-watch-200-99-off', 'apple-watch-bogo', 'watch-tablet-laptop-5-off']
  },
  'apple-watch-se-3rd': {
    id: 'apple-watch-se-3rd',
    name: 'Apple Watch SE (3rd Gen)',
    brand: 'Apple',
    category: 'wearable',
    price: 249,
    monthlyPayment: 10,
    storage: ['GPS', 'GPS + Cellular'],
    colors: ['Midnight', 'Starlight', 'Product Red'],
    features: ['44mm/40mm', 'S9 chip', 'Always-on display', 'ECG'],
    image: '/devices/apple-watch-se-3rd.jpg',
    availability: 'in-stock',
    promotions: ['apple-watch-200-99-off', 'apple-watch-bogo', 'watch-tablet-laptop-5-off']
  },
  'galaxy-watch-7': {
    id: 'galaxy-watch-7',
    name: 'Samsung Galaxy Watch 7',
    brand: 'Samsung',
    category: 'wearable',
    price: 299,
    monthlyPayment: 12,
    storage: ['Bluetooth', 'LTE'],
    colors: ['Silver', 'Green', 'Gold'],
    features: ['44mm/40mm', 'Exynos W1000', 'Always-on display', 'ECG', 'Blood pressure'],
    image: '/devices/galaxy-watch-7.jpg',
    availability: 'in-stock',
    promotions: ['samsung-watch-400-off', 'watch-tablet-laptop-5-off']
  },
  'galaxy-watch-classic-7': {
    id: 'galaxy-watch-classic-7',
    name: 'Samsung Galaxy Watch Classic 7',
    brand: 'Samsung',
    category: 'wearable',
    price: 399,
    monthlyPayment: 17,
    storage: ['Bluetooth', 'LTE'],
    colors: ['Silver', 'Black'],
    features: ['47mm/43mm', 'Exynos W1000', 'Rotating bezel', 'Always-on display', 'ECG'],
    image: '/devices/galaxy-watch-classic-7.jpg',
    availability: 'in-stock',
    promotions: ['samsung-watch-400-off', 'watch-tablet-laptop-5-off']
  },
  'galaxy-watch-pro-7': {
    id: 'galaxy-watch-pro-7',
    name: 'Samsung Galaxy Watch Pro 7',
    brand: 'Samsung',
    category: 'wearable',
    price: 499,
    monthlyPayment: 21,
    storage: ['Bluetooth', 'LTE'],
    colors: ['Titanium Black', 'Titanium Silver'],
    features: ['47mm', 'Exynos W1000', 'Titanium case', 'Always-on display', 'ECG'],
    image: '/devices/galaxy-watch-pro-7.jpg',
    availability: 'in-stock',
    promotions: ['samsung-watch-400-off', 'watch-tablet-laptop-5-off']
  },
  'pixel-watch-2': {
    id: 'pixel-watch-2',
    name: 'Google Pixel Watch 2',
    brand: 'Google',
    category: 'wearable',
    price: 349,
    monthlyPayment: 15,
    storage: ['Bluetooth', 'LTE'],
    colors: ['Polished Silver', 'Matte Black', 'Champagne Gold'],
    features: ['41mm', 'Snapdragon W5', 'Always-on display', 'ECG', 'Fitbit integration'],
    image: '/devices/pixel-watch-2.jpg',
    availability: 'in-stock',
    promotions: ['pixel-watch-449-99-off', 'watch-tablet-laptop-5-off']
  },

  // Hotspots
  'tcl-linkport-ik511': {
    id: 'tcl-linkport-ik511',
    name: 'TCL LINKPORT IK511',
    brand: 'TCL',
    category: 'hotspot',
    price: 199,
    monthlyPayment: 8,
    storage: ['N/A'],
    colors: ['Black'],
    features: ['5G', 'WiFi 6', 'Up to 15 devices', 'Battery powered'],
    image: '/devices/tcl-linkport-ik511.jpg',
    availability: 'in-stock',
    promotions: ['tcl-linkport-on-us']
  },

  // IoT Devices
  'syncup-tracker': {
    id: 'syncup-tracker',
    name: 'SyncUP Tracker',
    brand: 'T-Mobile',
    category: 'iot',
    price: 99,
    monthlyPayment: 4,
    storage: ['N/A'],
    colors: ['Black', 'White'],
    features: ['GPS tracking', 'Water resistant', 'Long battery life', 'App control'],
    image: '/devices/syncup-tracker.jpg',
    availability: 'in-stock',
    promotions: ['syncup-tracker-free']
  }
};

// Helper functions
export const getDevicesByCategory = (category) => {
  return Object.values(devices).filter(device => device.category === category);
};

export const getDevicesByBrand = (brand) => {
  return Object.values(devices).filter(device => device.brand === brand);
};

export const getDeviceById = (id) => {
  return devices[id];
};

export const getDevicesWithPromotions = () => {
  return Object.values(devices).filter(device => device.promotions && device.promotions.length > 0);
};

export const searchDevices = (query) => {
  const searchTerm = query.toLowerCase();
  return Object.values(devices).filter(device => 
    device.name.toLowerCase().includes(searchTerm) ||
    device.brand.toLowerCase().includes(searchTerm) ||
    device.features.some(feature => feature.toLowerCase().includes(searchTerm))
  );
};

export const getAffordableDevices = (maxPrice = 300) => {
  return Object.values(devices).filter(device => device.price <= maxPrice);
};

export const getPremiumDevices = (minPrice = 800) => {
  return Object.values(devices).filter(device => device.price >= minPrice);
};

export default devices;
