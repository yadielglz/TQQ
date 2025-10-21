// Dynamic Pricing Engine for T-Mobile Quote App
// Handles location-based pricing, tax calculations, and promotional pricing optimization

export class PricingEngine {
  constructor() {
    this.basePricing = {
      plans: {
        essentials: { 1: 50, 2: 80, 3: 90, 4: 100, 5: 120, 6: 135, additional: 35 },
        more: { 1: 85, 2: 140, 3: 140, 4: 170, 5: 200, 6: 230, additional: 35 },
        beyond: { 1: 100, 2: 170, 3: 170, 4: 215, 5: 260, 6: 305, additional: 35 }
      },
      devices: {
        // iPhone Series
        'iphone-air': 999,
        'iphone-17-pro-max': 1199,
        'iphone-17-pro': 1099,
        'iphone-17-plus': 899,
        'iphone-17': 799,
        'iphone-16e': 599,
        'iphone-16-pro-max': 1199,
        'iphone-16-pro': 1099,
        'iphone-16-plus': 899,
        'iphone-16': 799,
        'iphone-15-pro-max': 1099,
        'iphone-15-pro': 999,
        'iphone-15-plus': 899,
        'iphone-15': 699,
        'iphone-se-3rd': 429,
        
        // Google Pixel Series
        'pixel-10-pro-xl': 1199,
        'pixel-10-pro': 999,
        'pixel-10': 699,
        'pixel-9-pro': 999,
        'pixel-9-xl': 899,
        'pixel-9': 699,
        'pixel-9a': 499,
        
        // Samsung Galaxy Series
        'galaxy-s25-edge': 1299,
        'galaxy-s25-ultra': 1299,
        'galaxy-s25-plus': 999,
        'galaxy-s25': 799,
        'galaxy-s25-fe': 599,
        'galaxy-s24-ultra': 1299,
        'galaxy-s24-plus': 999,
        'galaxy-s24': 799,
        'galaxy-a36': 399,
        'galaxy-a16': 299,
        'galaxy-a15': 199,
        'galaxy-z-fold-7': 1799,
        'galaxy-z-flip-7': 999,
        
        // Motorola Series
        'razr-ultra': 999,
        'razr-plus-2025': 799,
        'razr-2025': 599,
        'edge-2025': 699,
        'g-power-2025': 299,
        'g-2025': 199,
        
        // T-Mobile Revvl Series
        'revvl-pro-8': 399,
        'revvl-6x-pro': 299,
        'revvl-6x': 199,
        
        // Tablets
        'ipad-a16': 449,
        'galaxy-tab-a9-plus': 199,
        'galaxy-tab-s10-fe-5g': 399,
        'revvl-tab-2': 149,
        
        // Wearables
        'apple-watch-series-10': 399,
        'apple-watch-series-9': 399,
        'apple-watch-se-3rd': 249,
        'galaxy-watch-7': 299,
        'galaxy-watch-classic-7': 449,
        'galaxy-watch-pro-7': 649,
        'pixel-watch-2': 349,
        
        // Home Internet
        'tmobile-home-internet': 50,
        'tmobile-home-internet-plus': 70,
        'metronet-fiber': 60,
        
        // IoT Devices
        'tcl-linkport-ik511': 199,
        'syncup-tracker': 25,
        
        // Other
        'bring-your-own': 0
      },
      protection: {
        1: 7, 2: 9, 3: 13, 4: 16, 5: 18, 6: 25
      },
      dataPlans: {
        tablet: { basic: 10, standard: 20, premium: 35 },
        wearable: { basic: 5, standard: 10, premium: 15 },
        iot: { basic: 2, standard: 5, premium: 10 }
      },
      homeInternet: {
        'gateway': 0,
        'backup-gateway': 15
      }
    };

    this.locationMultipliers = {
      // State-based pricing adjustments
      'CA': { multiplier: 1.1, taxRate: 0.0875, surcharge: 0 },
      'NY': { multiplier: 1.05, taxRate: 0.08, surcharge: 0 },
      'TX': { multiplier: 1.0, taxRate: 0.0625, surcharge: 0 },
      'FL': { multiplier: 1.0, taxRate: 0.06, surcharge: 0 },
      'WA': { multiplier: 1.08, taxRate: 0.065, surcharge: 0 },
      'IL': { multiplier: 1.02, taxRate: 0.0625, surcharge: 0 },
      'PA': { multiplier: 1.0, taxRate: 0.06, surcharge: 0 },
      'OH': { multiplier: 1.0, taxRate: 0.0575, surcharge: 0 },
      'GA': { multiplier: 1.0, taxRate: 0.04, surcharge: 0 },
      'NC': { multiplier: 1.0, taxRate: 0.0475, surcharge: 0 },
      'MI': { multiplier: 1.0, taxRate: 0.06, surcharge: 0 },
      'NJ': { multiplier: 1.05, taxRate: 0.06625, surcharge: 0 },
      'VA': { multiplier: 1.0, taxRate: 0.053, surcharge: 0 },
      'TN': { multiplier: 1.0, taxRate: 0.07, surcharge: 0 },
      'IN': { multiplier: 1.0, taxRate: 0.07, surcharge: 0 },
      'AZ': { multiplier: 1.0, taxRate: 0.056, surcharge: 0 },
      'MA': { multiplier: 1.08, taxRate: 0.0625, surcharge: 0 },
      'MO': { multiplier: 1.0, taxRate: 0.04225, surcharge: 0 },
      'MD': { multiplier: 1.02, taxRate: 0.06, surcharge: 0 },
      'WI': { multiplier: 1.0, taxRate: 0.05, surcharge: 0 },
      'CO': { multiplier: 1.0, taxRate: 0.029, surcharge: 0 },
      'MN': { multiplier: 1.0, taxRate: 0.06875, surcharge: 0 },
      'SC': { multiplier: 1.0, taxRate: 0.06, surcharge: 0 },
      'AL': { multiplier: 1.0, taxRate: 0.04, surcharge: 0 },
      'LA': { multiplier: 1.0, taxRate: 0.0445, surcharge: 0 },
      'KY': { multiplier: 1.0, taxRate: 0.06, surcharge: 0 },
      'OR': { multiplier: 1.0, taxRate: 0, surcharge: 0 },
      'OK': { multiplier: 1.0, taxRate: 0.045, surcharge: 0 },
      'CT': { multiplier: 1.05, taxRate: 0.0635, surcharge: 0 },
      'UT': { multiplier: 1.0, taxRate: 0.047, surcharge: 0 },
      'IA': { multiplier: 1.0, taxRate: 0.06, surcharge: 0 },
      'NV': { multiplier: 1.0, taxRate: 0.0685, surcharge: 0 },
      'AR': { multiplier: 1.0, taxRate: 0.065, surcharge: 0 },
      'MS': { multiplier: 1.0, taxRate: 0.07, surcharge: 0 },
      'KS': { multiplier: 1.0, taxRate: 0.065, surcharge: 0 },
      'NM': { multiplier: 1.0, taxRate: 0.05125, surcharge: 0 },
      'NE': { multiplier: 1.0, taxRate: 0.055, surcharge: 0 },
      'WV': { multiplier: 1.0, taxRate: 0.06, surcharge: 0 },
      'ID': { multiplier: 1.0, taxRate: 0.06, surcharge: 0 },
      'HI': { multiplier: 1.15, taxRate: 0.04, surcharge: 0 },
      'NH': { multiplier: 1.0, taxRate: 0, surcharge: 0 },
      'ME': { multiplier: 1.0, taxRate: 0.055, surcharge: 0 },
      'RI': { multiplier: 1.05, taxRate: 0.07, surcharge: 0 },
      'MT': { multiplier: 1.0, taxRate: 0, surcharge: 0 },
      'DE': { multiplier: 1.0, taxRate: 0, surcharge: 0 },
      'SD': { multiplier: 1.0, taxRate: 0.045, surcharge: 0 },
      'ND': { multiplier: 1.0, taxRate: 0.05, surcharge: 0 },
      'AK': { multiplier: 1.2, taxRate: 0, surcharge: 0 },
      'VT': { multiplier: 1.0, taxRate: 0.06, surcharge: 0 },
      'WY': { multiplier: 1.0, taxRate: 0.04, surcharge: 0 },
      'DC': { multiplier: 1.1, taxRate: 0.06, surcharge: 0 }
    };

    this.promotionalPricing = {
      // Time-based promotional pricing
      'black-friday': {
        active: false,
        startDate: '2024-11-24',
        endDate: '2024-11-30',
        discounts: {
          plans: 0.2, // 20% off plans
          devices: 0.15, // 15% off devices
          protection: 0.1 // 10% off protection
        }
      },
      'holiday': {
        active: false,
        startDate: '2024-12-15',
        endDate: '2024-12-31',
        discounts: {
          plans: 0.1,
          devices: 0.1,
          protection: 0.05
        }
      },
      'back-to-school': {
        active: false,
        startDate: '2024-08-01',
        endDate: '2024-09-15',
        discounts: {
          plans: 0.15,
          devices: 0.2,
          protection: 0.1
        }
      }
    };

    this.customerTierPricing = {
      // Customer tier-based pricing adjustments
      'premium': { multiplier: 0.95, description: 'Premium customer discount' },
      'standard': { multiplier: 1.0, description: 'Standard pricing' },
      'new': { multiplier: 1.05, description: 'New customer pricing' },
      'senior': { multiplier: 0.8, description: 'Senior 55+ discount' },
      'military': { multiplier: 0.85, description: 'Military discount' },
      'first-responder': { multiplier: 0.9, description: 'First responder discount' }
    };
  }

  // Get location-based pricing adjustments
  getLocationPricing(location) {
    const state = location?.state || 'TX'; // Default to Texas
    return this.locationMultipliers[state] || this.locationMultipliers['TX'];
  }

  // Calculate plan pricing with location adjustments
  calculatePlanPricing(planId, lines, location, customerTier = 'standard') {
    const basePlan = this.basePricing.plans[planId];
    if (!basePlan) return 0;

    let basePrice = 0;
    if (lines <= 6) {
      basePrice = basePlan[lines] || 0;
    } else {
      basePrice = basePlan[6] + (lines - 6) * basePlan.additional;
    }

    const locationPricing = this.getLocationPricing(location);
    const customerTierPricing = this.customerTierPricing[customerTier];
    
    // Apply location multiplier
    let adjustedPrice = basePrice * locationPricing.multiplier;
    
    // Apply customer tier multiplier
    adjustedPrice *= customerTierPricing.multiplier;

    // Apply promotional pricing if active
    const promotionalDiscount = this.getActivePromotionalDiscount('plans');
    if (promotionalDiscount > 0) {
      adjustedPrice *= (1 - promotionalDiscount);
    }

    return Math.round(adjustedPrice * 100) / 100;
  }

  // Calculate device pricing with location adjustments
  calculateDevicePricing(deviceId, location, customerTier = 'standard') {
    const basePrice = this.basePricing.devices[deviceId] || 0;
    
    const locationPricing = this.getLocationPricing(location);
    const customerTierPricing = this.customerTierPricing[customerTier];
    
    let adjustedPrice = basePrice * locationPricing.multiplier * customerTierPricing.multiplier;

    // Apply promotional pricing if active
    const promotionalDiscount = this.getActivePromotionalDiscount('devices');
    if (promotionalDiscount > 0) {
      adjustedPrice *= (1 - promotionalDiscount);
    }

    return Math.round(adjustedPrice * 100) / 100;
  }

  // Calculate protection pricing
  calculateProtectionPricing(tier, location, customerTier = 'standard') {
    const basePrice = this.basePricing.protection[tier] || 0;
    
    const locationPricing = this.getLocationPricing(location);
    const customerTierPricing = this.customerTierPricing[customerTier];
    
    let adjustedPrice = basePrice * locationPricing.multiplier * customerTierPricing.multiplier;

    // Apply promotional pricing if active
    const promotionalDiscount = this.getActivePromotionalDiscount('protection');
    if (promotionalDiscount > 0) {
      adjustedPrice *= (1 - promotionalDiscount);
    }

    return Math.round(adjustedPrice * 100) / 100;
  }

  // Calculate data plan pricing
  calculateDataPlanPricing(category, planType, location, customerTier = 'standard') {
    const basePrice = this.basePricing.dataPlans[category]?.[planType] || 0;
    
    const locationPricing = this.getLocationPricing(location);
    const customerTierPricing = this.customerTierPricing[customerTier];
    
    let adjustedPrice = basePrice * locationPricing.multiplier * customerTierPricing.multiplier;

    return Math.round(adjustedPrice * 100) / 100;
  }

  // Calculate home internet pricing
  calculateHomeInternetPricing(deviceId, location, customerTier = 'standard') {
    const basePrice = this.basePricing.homeInternet[deviceId] || 0;
    
    const locationPricing = this.getLocationPricing(location);
    const customerTierPricing = this.customerTierPricing[customerTier];
    
    let adjustedPrice = basePrice * locationPricing.multiplier * customerTierPricing.multiplier;

    return Math.round(adjustedPrice * 100) / 100;
  }

  // Calculate taxes based on location
  calculateTaxes(subtotal, location) {
    const locationPricing = this.getLocationPricing(location);
    const taxAmount = subtotal * locationPricing.taxRate;
    return Math.round(taxAmount * 100) / 100;
  }

  // Calculate surcharges based on location
  calculateSurcharges(subtotal, location) {
    const locationPricing = this.getLocationPricing(location);
    const surchargeAmount = subtotal * locationPricing.surcharge;
    return Math.round(surchargeAmount * 100) / 100;
  }

  // Get active promotional discount for a category
  getActivePromotionalDiscount(category) {
    const now = new Date();
    
    for (const [promoName, promo] of Object.entries(this.promotionalPricing)) {
      if (promo.active) {
        const startDate = new Date(promo.startDate);
        const endDate = new Date(promo.endDate);
        
        if (now >= startDate && now <= endDate) {
          return promo.discounts[category] || 0;
        }
      }
    }
    
    return 0;
  }

  // Calculate total monthly cost with all adjustments
  calculateTotalMonthlyCost(quoteData, location, customerTier = 'standard') {
    let total = 0;

    // Voice lines
    if (quoteData.voiceLinesData?.quantity > 0) {
      const voiceTotal = this.calculateVoiceTotal(quoteData.voiceLinesData, location, customerTier);
      total += voiceTotal;
    }

    // Data lines
    if (quoteData.dataLinesData?.quantity > 0) {
      const dataTotal = this.calculateDataTotal(quoteData.dataLinesData, location, customerTier);
      total += dataTotal;
    }

    // IoT lines
    if (quoteData.iotLinesData?.quantity > 0) {
      const iotTotal = this.calculateIoTTotal(quoteData.iotLinesData, location, customerTier);
      total += iotTotal;
    }

    // Home internet
    if (quoteData.homeInternetData?.device) {
      const hsiTotal = this.calculateHomeInternetTotal(quoteData.homeInternetData, location, customerTier);
      total += hsiTotal;
    }

    // Equipment financing
    if (quoteData.equipmentCreditData?.monthlyFinancing) {
      total += quoteData.equipmentCreditData.monthlyFinancing;
    }

    // Apply discounts
    const discounts = this.calculateDiscounts(quoteData);
    total -= discounts;

    return Math.round(total * 100) / 100;
  }

  // Calculate voice lines total
  calculateVoiceTotal(voiceLinesData, location, customerTier) {
    let total = 0;

    // Plan costs
    if (voiceLinesData.plans && Object.keys(voiceLinesData.plans).length > 0) {
      const firstPlanId = Object.values(voiceLinesData.plans)[0];
      total += this.calculatePlanPricing(firstPlanId, voiceLinesData.quantity, location, customerTier);
    }

    // Device costs
    if (voiceLinesData.devices) {
      Object.values(voiceLinesData.devices).forEach(deviceId => {
        total += this.calculateDevicePricing(deviceId, location, customerTier) / 24; // Monthly device payment
      });
    }

    // Protection costs
    if (voiceLinesData.protection) {
      Object.values(voiceLinesData.protection).forEach(protectionId => {
        const tier = parseInt(protectionId.replace('p360-tier', ''));
        total += this.calculateProtectionPricing(tier, location, customerTier);
      });
    }

    return total;
  }

  // Calculate data lines total
  calculateDataTotal(dataLinesData, location, customerTier) {
    let total = 0;

    if (dataLinesData.plans) {
      Object.values(dataLinesData.plans).forEach(planType => {
        total += this.calculateDataPlanPricing(dataLinesData.category, planType, location, customerTier);
      });
    }

    if (dataLinesData.devices) {
      Object.values(dataLinesData.devices).forEach(deviceId => {
        total += this.calculateDevicePricing(deviceId, location, customerTier) / 24;
      });
    }

    if (dataLinesData.protection) {
      Object.values(dataLinesData.protection).forEach(protectionId => {
        const tier = parseInt(protectionId.replace('p360-tier', ''));
        total += this.calculateProtectionPricing(tier, location, customerTier);
      });
    }

    return total;
  }

  // Calculate IoT lines total
  calculateIoTTotal(iotLinesData, location, customerTier) {
    let total = 0;

    if (iotLinesData.plans) {
      Object.values(iotLinesData.plans).forEach(planType => {
        total += this.calculateDataPlanPricing('iot', planType, location, customerTier);
      });
    }

    if (iotLinesData.devices) {
      Object.values(iotLinesData.devices).forEach(deviceId => {
        total += this.calculateDevicePricing(deviceId, location, customerTier) / 24;
      });
    }

    if (iotLinesData.protection) {
      Object.values(iotLinesData.protection).forEach(protectionId => {
        const tier = parseInt(protectionId.replace('p360-tier', ''));
        total += this.calculateProtectionPricing(tier, location, customerTier);
      });
    }

    return total;
  }

  // Calculate home internet total
  calculateHomeInternetTotal(homeInternetData, location, customerTier) {
    let total = 0;

    if (homeInternetData.device) {
      total += this.calculateHomeInternetPricing(homeInternetData.device, location, customerTier);
    }

    if (homeInternetData.plan) {
      // Home internet plan pricing (typically $50-70/month)
      const basePrice = 60; // Default home internet price
      const locationPricing = this.getLocationPricing(location);
      const customerTierPricing = this.customerTierPricing[customerTier];
      
      total += basePrice * locationPricing.multiplier * customerTierPricing.multiplier;
    }

    return total;
  }

  // Calculate discounts
  calculateDiscounts(quoteData) {
    let totalDiscounts = 0;

    if (quoteData.discountsData?.autoPay) {
      const totalLines = (quoteData.voiceLinesData?.quantity || 0) + 
                        (quoteData.dataLinesData?.quantity || 0) + 
                        (quoteData.iotLinesData?.quantity || 0);
      totalDiscounts += Math.min(totalLines, 8) * 5;
    }

    if (quoteData.discountsData?.senior55) {
      // 20% off voice plans only
      if (quoteData.voiceLinesData?.plans && Object.keys(quoteData.voiceLinesData.plans).length > 0) {
        const firstPlanId = Object.values(quoteData.voiceLinesData.plans)[0];
        const planPrice = this.calculatePlanPricing(firstPlanId, quoteData.voiceLinesData.quantity, {}, 'senior');
        totalDiscounts += planPrice * 0.2;
      }
    }

    if (quoteData.discountsData?.tmobileInsider) {
      // 15% off all services
      const allServicesTotal = this.calculateTotalMonthlyCost(quoteData, {}, 'standard');
      totalDiscounts += allServicesTotal * 0.15;
    }

    return totalDiscounts;
  }

  // Get pricing breakdown for display
  getPricingBreakdown(quoteData, location, customerTier = 'standard') {
    const breakdown = {
      subtotal: 0,
      taxes: 0,
      surcharges: 0,
      discounts: 0,
      total: 0,
      location: this.getLocationPricing(location),
      customerTier: this.customerTierPricing[customerTier],
      promotionalDiscounts: {}
    };

    // Calculate subtotal
    breakdown.subtotal = this.calculateTotalMonthlyCost(quoteData, location, customerTier);

    // Calculate taxes and surcharges
    breakdown.taxes = this.calculateTaxes(breakdown.subtotal, location);
    breakdown.surcharges = this.calculateSurcharges(breakdown.subtotal, location);

    // Calculate discounts
    breakdown.discounts = this.calculateDiscounts(quoteData);

    // Calculate total
    breakdown.total = breakdown.subtotal + breakdown.taxes + breakdown.surcharges - breakdown.discounts;

    // Get promotional discounts
    breakdown.promotionalDiscounts = {
      plans: this.getActivePromotionalDiscount('plans'),
      devices: this.getActivePromotionalDiscount('devices'),
      protection: this.getActivePromotionalDiscount('protection')
    };

    return breakdown;
  }

  // Update promotional pricing (for admin use)
  updatePromotionalPricing(promoName, active, startDate, endDate, discounts) {
    this.promotionalPricing[promoName] = {
      active,
      startDate,
      endDate,
      discounts
    };
  }

  // Get all available customer tiers
  getCustomerTiers() {
    return Object.keys(this.customerTierPricing).map(tier => ({
      id: tier,
      name: this.customerTierPricing[tier].description,
      multiplier: this.customerTierPricing[tier].multiplier
    }));
  }

  // Get all available locations
  getAvailableLocations() {
    return Object.keys(this.locationMultipliers).map(state => ({
      state,
      multiplier: this.locationMultipliers[state].multiplier,
      taxRate: this.locationMultipliers[state].taxRate,
      surcharge: this.locationMultipliers[state].surcharge
    }));
  }
}

// Export singleton instance
export const pricingEngine = new PricingEngine();

// Export utility functions
export const calculateQuoteTotal = (quoteData, location, customerTier) => {
  return pricingEngine.calculateTotalMonthlyCost(quoteData, location, customerTier);
};

export const getPricingBreakdown = (quoteData, location, customerTier) => {
  return pricingEngine.getPricingBreakdown(quoteData, location, customerTier);
};

export const getLocationPricing = (location) => {
  return pricingEngine.getLocationPricing(location);
};

export const getCustomerTiers = () => {
  return pricingEngine.getCustomerTiers();
};

export const getAvailableLocations = () => {
  return pricingEngine.getAvailableLocations();
};

