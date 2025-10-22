// Dynamic Pricing Engine for T-Mobile Quote App
// Handles location-based pricing, tax calculations, and promotional pricing optimization

import { devices } from '../data/devices';
import { promotions } from '../data/promotions';

export class PricingEngine {
  constructor() {
    this.basePricing = {
      plans: {
        'experience-essentials-saver': { 1: 50, 2: 80, 3: 90, 4: 100, 5: 110, 6: 120, additional: 35 },
        'experience-essentials': { 1: 60, 2: 90, 3: 90, 4: 100, 5: 110, 6: 120, additional: 35 },
        'experience-more': { 1: 85, 2: 140, 3: 140, 4: 170, 5: 200, 6: 230, additional: 35 },
        'experience-beyond': { 1: 100, 2: 170, 3: 170, 4: 215, 5: 260, 6: 305, additional: 35 },
        // 55+ Plans
        'essentials-choice-55': { 1: 45, 2: 60, 3: 75, 4: 90, 5: 105, 6: 120, additional: 35 },
        'experience-more-55': { 1: 70, 2: 100, 3: 130, 4: 160, 5: 190, 6: 220, additional: 35 },
        'experience-beyond-55': { 1: 85, 2: 140, 3: 180, 4: 220, 5: 260, 6: 300, additional: 35 },
        // Military/First Responder Plans
        'experience-beyond-military': { 1: 90, 2: 140, 3: 180, 4: 220, 5: 260, 6: 300, additional: 35 },
        'experience-beyond-first-responder': { 1: 90, 2: 140, 3: 180, 4: 220, 5: 260, 6: 300, additional: 35 }
      }
    };
  }

  // Calculate voice lines pricing
  calculateVoiceLinesPricing(voiceLinesData, location = 'US', customerTier = 'standard') {
    let total = 0;
    const breakdown = {
      planCost: 0,
      deviceCost: 0,
      protectionCost: 0,
      promotionSavings: 0,
      subtotal: 0,
      taxes: 0,
      total: 0
    };

    const { quantity, plans, devices: selectedDevices, protection, promotions: selectedPromotions } = voiceLinesData;

    // Plan pricing
    if (Object.keys(plans).length > 0) {
      const firstPlanId = Object.values(plans)[0];
      const plan = this.basePricing.plans[firstPlanId];
      if (plan) {
        if (quantity <= 6) {
          breakdown.planCost = plan[quantity] || 0;
        } else {
          breakdown.planCost = plan[6] + (quantity - 6) * plan.additional;
        }
        total += breakdown.planCost;
      }
    }

    // Device financing costs
    Object.values(selectedDevices).forEach(deviceId => {
      if (deviceId && deviceId !== 'bring-your-own') {
        const device = devices[deviceId];
        if (device) {
          const monthlyPayment = device.monthlyPayment || Math.round(device.price / 24);
          breakdown.deviceCost += monthlyPayment;
          total += monthlyPayment;
        }
      }
    });

    // Protection costs
    Object.values(protection).forEach(protectionId => {
      if (typeof protectionId === 'string' && protectionId.includes('p360-tier')) {
        const protectionPrices = {
          'p360-tier1': 7, 'p360-tier2': 9, 'p360-tier3': 13,
          'p360-tier4': 16, 'p360-tier5': 18, 'p360-tier6': 25
        };
        const protectionCost = protectionPrices[protectionId] || 0;
        breakdown.protectionCost += protectionCost;
        total += protectionCost;
      }
    });

    // Promotion savings
    if (selectedPromotions) {
      Object.values(selectedPromotions).forEach(linePromotions => {
        linePromotions.forEach(promoId => {
          const promotion = promotions.find(p => p.id === promoId);
          if (promotion) {
            breakdown.promotionSavings += promotion.maxPayout;
            total -= promotion.maxPayout;
          }
        });
      });
    }

    // Ensure total doesn't go below 0
    total = Math.max(0, total);
    breakdown.subtotal = total;

    // Calculate taxes (simplified - would normally be location-based)
    breakdown.taxes = total * 0.08; // 8% average tax rate
    breakdown.total = total + breakdown.taxes;

    return {
      monthly: breakdown.total,
      breakdown
    };
  }

  // Calculate data lines pricing
  calculateDataLinesPricing(dataLinesData, location = 'US', customerTier = 'standard') {
    let total = 0;
    const breakdown = {
      planCost: 0,
      deviceCost: 0,
      protectionCost: 0,
      promotionSavings: 0,
      subtotal: 0,
      taxes: 0,
      total: 0
    };

    const { quantity, plans, devices: selectedDevices, protection, promotions: selectedPromotions } = dataLinesData;

    // Data plan pricing (simplified)
    const dataPlanPricing = {
      'tablet-unlimited': 20,
      'tablet-10gb': 15,
      'tablet-5gb': 10,
      'wearable-unlimited': 10,
      'wearable-5gb': 5
    };

    Object.values(plans).forEach(planId => {
      const planCost = dataPlanPricing[planId] || 0;
      breakdown.planCost += planCost;
      total += planCost;
    });

    // Device costs
    Object.values(selectedDevices).forEach(deviceId => {
      if (deviceId && deviceId !== 'bring-your-own') {
        const device = devices[deviceId];
        if (device) {
          const monthlyPayment = device.monthlyPayment || Math.round(device.price / 24);
          breakdown.deviceCost += monthlyPayment;
          total += monthlyPayment;
        }
      }
    });

    // Protection costs
    Object.values(protection).forEach(protectionId => {
      if (typeof protectionId === 'string' && protectionId.includes('p360-tier')) {
        const protectionPrices = {
          'p360-tier1': 7, 'p360-tier2': 9, 'p360-tier3': 13,
          'p360-tier4': 16, 'p360-tier5': 18, 'p360-tier6': 25
        };
        const protectionCost = protectionPrices[protectionId] || 0;
        breakdown.protectionCost += protectionCost;
        total += protectionCost;
      }
    });

    // Promotion savings
    if (selectedPromotions) {
      Object.values(selectedPromotions).forEach(linePromotions => {
        linePromotions.forEach(promoId => {
          const promotion = promotions.find(p => p.id === promoId);
          if (promotion) {
            breakdown.promotionSavings += promotion.maxPayout;
            total -= promotion.maxPayout;
          }
        });
      });
    }

    total = Math.max(0, total);
    breakdown.subtotal = total;
    breakdown.taxes = total * 0.08;
    breakdown.total = total + breakdown.taxes;

    return {
      monthly: breakdown.total,
      breakdown
    };
  }

  // Calculate IoT lines pricing
  calculateIoTLinesPricing(iotLinesData, location = 'US', customerTier = 'standard') {
    let total = 0;
    const breakdown = {
      planCost: 0,
      deviceCost: 0,
      protectionCost: 0,
      promotionSavings: 0,
      subtotal: 0,
      taxes: 0,
      total: 0
    };

    const { quantity, plans, devices: selectedDevices, protection, promotions: selectedPromotions } = iotLinesData;

    // IoT plan pricing
    const iotPlanPricing = {
      'iot-unlimited': 15,
      'iot-5gb': 10,
      'iot-2gb': 5
    };

    Object.values(plans).forEach(planId => {
      const planCost = iotPlanPricing[planId] || 0;
      breakdown.planCost += planCost;
      total += planCost;
    });

    // Device costs
    Object.values(selectedDevices).forEach(deviceId => {
      if (deviceId && deviceId !== 'bring-your-own') {
        const device = devices[deviceId];
        if (device) {
          const monthlyPayment = device.monthlyPayment || Math.round(device.price / 24);
          breakdown.deviceCost += monthlyPayment;
          total += monthlyPayment;
        }
      }
    });

    // Protection costs
    Object.values(protection).forEach(protectionId => {
      if (typeof protectionId === 'string' && protectionId.includes('p360-tier')) {
        const protectionPrices = {
          'p360-tier1': 7, 'p360-tier2': 9, 'p360-tier3': 13,
          'p360-tier4': 16, 'p360-tier5': 18, 'p360-tier6': 25
        };
        const protectionCost = protectionPrices[protectionId] || 0;
        breakdown.protectionCost += protectionCost;
        total += protectionCost;
      }
    });

    // Promotion savings
    if (selectedPromotions) {
      Object.values(selectedPromotions).forEach(linePromotions => {
        linePromotions.forEach(promoId => {
          const promotion = promotions.find(p => p.id === promoId);
          if (promotion) {
            breakdown.promotionSavings += promotion.maxPayout;
            total -= promotion.maxPayout;
          }
        });
      });
    }

    total = Math.max(0, total);
    breakdown.subtotal = total;
    breakdown.taxes = total * 0.08;
    breakdown.total = total + breakdown.taxes;

    return {
      monthly: breakdown.total,
      breakdown
    };
  }

  // Calculate home internet pricing
  calculateHomeInternetPricing(homeInternetData, location = 'US', customerTier = 'standard') {
    let total = 0;
    const breakdown = {
      planCost: 0,
      deviceCost: 0,
      promotionSavings: 0,
      subtotal: 0,
      taxes: 0,
      total: 0
    };

    const { plan, device, promotions: selectedPromotions } = homeInternetData;

    // Home internet plan pricing
    const hsiPlanPricing = {
      'hsi-standard': 50,
      'hsi-plus': 60,
      'fiber-100': 70,
      'fiber-300': 90,
      'fiber-1000': 120
    };

    if (plan) {
      breakdown.planCost = hsiPlanPricing[plan] || 0;
      total += breakdown.planCost;
    }

    // Device costs
    if (device && device !== 'bring-your-own') {
      const deviceObj = devices[device];
      if (deviceObj) {
        const monthlyPayment = deviceObj.monthlyPayment || Math.round(deviceObj.price / 24);
        breakdown.deviceCost = monthlyPayment;
        total += monthlyPayment;
      }
    }

    // Promotion savings
    if (selectedPromotions) {
      Object.values(selectedPromotions).forEach(promoId => {
        const promotion = promotions.find(p => p.id === promoId);
        if (promotion) {
          breakdown.promotionSavings += promotion.maxPayout;
          total -= promotion.maxPayout;
        }
      });
    }

    total = Math.max(0, total);
    breakdown.subtotal = total;
    breakdown.taxes = total * 0.08;
    breakdown.total = total + breakdown.taxes;

    return {
      monthly: breakdown.total,
      breakdown
    };
  }

  // Calculate equipment credit impact
  calculateEquipmentCreditImpact(equipmentCreditData) {
    const { amount, downPayment, tradeIns } = equipmentCreditData;
    
    return {
      totalCredit: amount,
      downPayment: downPayment,
      tradeInValue: tradeIns.reduce((total, tradeIn) => total + (tradeIn.value || 0), 0),
      netCredit: amount - downPayment + tradeIns.reduce((total, tradeIn) => total + (tradeIn.value || 0), 0)
    };
  }

  // Calculate discount impact
  calculateDiscountImpact(discountsData, totalBeforeDiscounts) {
    let totalDiscount = 0;
    const breakdown = {
      autoPay: 0,
      senior55: 0,
      insider: 0,
      workPerks: 0,
      total: 0
    };

    if (discountsData.autoPay) {
      breakdown.autoPay = totalBeforeDiscounts * 0.05; // 5% discount
      totalDiscount += breakdown.autoPay;
    }

    if (discountsData.senior55) {
      breakdown.senior55 = totalBeforeDiscounts * 0.10; // 10% discount
      totalDiscount += breakdown.senior55;
    }

    if (discountsData.insider) {
      breakdown.insider = totalBeforeDiscounts * 0.20; // 20% discount
      totalDiscount += breakdown.insider;
    }

    if (discountsData.workPerks) {
      breakdown.workPerks = totalBeforeDiscounts * 0.15; // 15% discount
      totalDiscount += breakdown.workPerks;
    }

    breakdown.total = totalDiscount;

    return {
      totalDiscount,
      breakdown
    };
  }

  // Calculate total quote pricing
  calculateTotalPricing(quoteData, location = 'US', customerTier = 'standard') {
    const {
      voiceLinesData,
      dataLinesData,
      iotLinesData,
      homeInternetData,
      equipmentCreditData,
      discountsData
    } = quoteData;

    let totalMonthly = 0;
    const breakdown = {
      voiceLines: { monthly: 0, breakdown: {} },
      dataLines: { monthly: 0, breakdown: {} },
      iotLines: { monthly: 0, breakdown: {} },
      homeInternet: { monthly: 0, breakdown: {} },
      equipmentCredit: { impact: 0 },
      discounts: { impact: 0 },
      subtotal: 0,
      taxes: 0,
      total: 0
    };

    // Calculate each service
    if (voiceLinesData && voiceLinesData.quantity > 0) {
      breakdown.voiceLines = this.calculateVoiceLinesPricing(voiceLinesData, location, customerTier);
      totalMonthly += breakdown.voiceLines.monthly;
    }

    if (dataLinesData && dataLinesData.quantity > 0) {
      breakdown.dataLines = this.calculateDataLinesPricing(dataLinesData, location, customerTier);
      totalMonthly += breakdown.dataLines.monthly;
    }

    if (iotLinesData && iotLinesData.quantity > 0) {
      breakdown.iotLines = this.calculateIoTLinesPricing(iotLinesData, location, customerTier);
      totalMonthly += breakdown.iotLines.monthly;
    }

    if (homeInternetData && homeInternetData.plan) {
      breakdown.homeInternet = this.calculateHomeInternetPricing(homeInternetData, location, customerTier);
      totalMonthly += breakdown.homeInternet.monthly;
    }

    // Apply equipment credit
    if (equipmentCreditData) {
      breakdown.equipmentCredit = this.calculateEquipmentCreditImpact(equipmentCreditData);
      totalMonthly -= breakdown.equipmentCredit.netCredit;
    }

    // Apply discounts
    if (discountsData) {
      breakdown.discounts = this.calculateDiscountImpact(discountsData, totalMonthly);
      totalMonthly -= breakdown.discounts.impact;
    }

    // Ensure total doesn't go below 0
    totalMonthly = Math.max(0, totalMonthly);
    breakdown.subtotal = totalMonthly;
    breakdown.taxes = totalMonthly * 0.08;
    breakdown.total = totalMonthly + breakdown.taxes;

    return {
      monthly: breakdown.total,
      breakdown
    };
  }

  // Get device pricing
  getDevicePricing(deviceId) {
    const device = devices[deviceId];
    if (!device) return { price: 0, monthlyPayment: 0 };
    
    return {
      price: device.price,
      monthlyPayment: device.monthlyPayment || Math.round(device.price / 24)
    };
  }

  // Get promotion details
  getPromotionDetails(promotionId) {
    return promotions.find(p => p.id === promotionId);
  }

  // Validate promotion eligibility
  validatePromotionEligibility(promotionId, deviceId, planId, lineType, hasPortIn) {
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

    return { eligible: true };
  }
}

// Create singleton instance
export const pricingEngine = new PricingEngine();