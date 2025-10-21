// Per-Line Promotion Management System
// Handles promotion selection, validation, and application on a per-line basis

import { 
  promotions, 
  getPromotionsForDevice, 
  getTradeInValueForPromotion, 
  isRatePlanEligible, 
  checkPromotionLimits, 
  checkStackability,
  validatePromotionEligibility,
  getPromotionSummary
} from '../data/promotions';

export class PerLinePromotionManager {
  constructor() {
    this.linePromotions = {}; // { lineIndex: { promotionId, tradeInDevice, tradeInValue, savings } }
    this.lineData = {}; // { lineIndex: { deviceId, planId, lineType, hasPortIn, isNewLine } }
    this.validationErrors = [];
  }

  // Initialize promotion data for a line
  initializeLine(lineIndex, lineData) {
    this.lineData[lineIndex] = {
      deviceId: lineData.deviceId || null,
      planId: lineData.planId || null,
      lineType: lineData.lineType || 'new', // 'new' or 'upgrade'
      hasPortIn: lineData.hasPortIn || false,
      isNewLine: lineData.isNewLine !== false, // Default to true
      ...lineData
    };
    
    if (!this.linePromotions[lineIndex]) {
      this.linePromotions[lineIndex] = null;
    }
  }

  // Update line data
  updateLineData(lineIndex, updates) {
    if (this.lineData[lineIndex]) {
      this.lineData[lineIndex] = { ...this.lineData[lineIndex], ...updates };
      // Re-validate promotion if one is selected
      if (this.linePromotions[lineIndex]) {
        this.validateLinePromotion(lineIndex);
      }
    }
  }

  // Get available promotions for a specific line
  getAvailablePromotions(lineIndex) {
    const lineData = this.lineData[lineIndex];
    if (!lineData) return [];

    const deviceId = lineData.deviceId;
    const lineType = lineData.lineType;
    const planId = lineData.planId;
    const hasPortIn = lineData.hasPortIn;

    if (!deviceId) return [];

    // Get device-specific promotions
    let availablePromotions = getPromotionsForDevice(deviceId);

    // Filter by line type (new vs upgrade)
    availablePromotions = availablePromotions.filter(promo => {
      if (lineType === 'new') return promo.aal === 'Y' || promo.aal === 'Y+P';
      if (lineType === 'upgrade') return promo.aal === 'N';
      return true;
    });

    // Filter by port-in requirement
    availablePromotions = availablePromotions.filter(promo => {
      if (promo.aal === 'Y+P') return hasPortIn;
      return true;
    });

    // Filter by rate plan eligibility
    availablePromotions = availablePromotions.filter(promo => {
      if (planId) return isRatePlanEligible(promo.id, planId);
      return true;
    });

    // Sort by max payout (best deals first)
    return availablePromotions.sort((a, b) => b.maxPayout - a.maxPayout);
  }

  // Select a promotion for a specific line
  selectPromotion(lineIndex, promotionId, tradeInDeviceId = '') {
    const lineData = this.lineData[lineIndex];
    if (!lineData) return { success: false, error: 'Line data not found' };

    // Validate promotion eligibility
    const validation = validatePromotionEligibility(
      promotionId,
      lineData.deviceId,
      lineData.planId,
      lineData.lineType,
      lineData.hasPortIn
    );

    if (!validation.eligible) {
      return { success: false, error: validation.reason };
    }

    // Calculate trade-in value and savings
    const tradeInValue = tradeInDeviceId ? 
      getTradeInValueForPromotion(promotionId, tradeInDeviceId) : 0;
    
    const savings = this.calculatePromotionSavings(promotionId, lineData.deviceId, tradeInValue);

    // Store promotion data
    this.linePromotions[lineIndex] = {
      promotionId,
      tradeInDevice: tradeInDeviceId,
      tradeInValue,
      savings,
      lineIndex,
      appliedAt: new Date().toISOString()
    };

    // Validate all promotions for conflicts
    this.validateAllPromotions();

    return { success: true, promotion: this.linePromotions[lineIndex] };
  }

  // Remove promotion from a line
  removePromotion(lineIndex) {
    if (this.linePromotions[lineIndex]) {
      delete this.linePromotions[lineIndex];
      this.validateAllPromotions();
      return { success: true };
    }
    return { success: false, error: 'No promotion found for this line' };
  }

  // Update trade-in device for a line's promotion
  updateTradeInDevice(lineIndex, tradeInDeviceId) {
    const promotion = this.linePromotions[lineIndex];
    if (!promotion) return { success: false, error: 'No promotion selected for this line' };

    const lineData = this.lineData[lineIndex];
    const tradeInValue = getTradeInValueForPromotion(promotion.promotionId, tradeInDeviceId);
    const savings = this.calculatePromotionSavings(promotion.promotionId, lineData.deviceId, tradeInValue);

    this.linePromotions[lineIndex] = {
      ...promotion,
      tradeInDevice: tradeInDeviceId,
      tradeInValue,
      savings
    };

    return { success: true, promotion: this.linePromotions[lineIndex] };
  }

  // Calculate promotion savings
  calculatePromotionSavings(promotionId, deviceId, tradeInValue = 0) {
    const promotion = promotions.find(p => p.id === promotionId);
    if (!promotion) return 0;

    // Get device price (this would typically come from a device database)
    const devicePrice = this.getDevicePrice(deviceId);

    if (promotion.name.includes('On Us')) {
      return Math.min(devicePrice, promotion.maxPayout);
    } else if (promotion.name.includes('Off')) {
      const discountAmount = parseFloat(promotion.name.match(/\$(\d+(?:\.\d+)?)/)?.[1] || '0');
      return Math.min(discountAmount, promotion.maxPayout);
    } else if (promotion.name.includes('% Off')) {
      const discountPercent = parseFloat(promotion.name.match(/(\d+)%/)?.[1] || '0');
      return Math.min((devicePrice * discountPercent / 100), promotion.maxPayout);
    }
    
    return Math.min(tradeInValue, promotion.maxPayout);
  }

  // Get device price (simplified - would typically come from device database)
  getDevicePrice(deviceId) {
    const devicePrices = {
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
      'pixel-10-pro-xl': 1199,
      'pixel-10-pro': 999,
      'pixel-10': 699,
      'pixel-9-pro': 999,
      'pixel-9-xl': 899,
      'pixel-9': 699,
      'pixel-9a': 499,
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
      'razr-ultra': 999,
      'razr-plus-2025': 799,
      'razr-2025': 599,
      'edge-2025': 699,
      'g-power-2025': 299,
      'g-2025': 199,
      'revvl-pro-8': 399,
      'revvl-6x-pro': 299,
      'revvl-6x': 199,
      'ipad-a16': 449,
      'galaxy-tab-a9-plus': 199,
      'galaxy-tab-s10-fe-5g': 399,
      'revvl-tab-2': 149,
      'apple-watch-series-10': 399,
      'apple-watch-series-9': 399,
      'apple-watch-se-3rd': 249,
      'galaxy-watch-7': 299,
      'galaxy-watch-classic-7': 449,
      'galaxy-watch-pro-7': 649,
      'pixel-watch-2': 349,
      'tmobile-home-internet': 50,
      'tmobile-home-internet-plus': 70,
      'metronet-fiber': 60,
      'tcl-linkport-ik511': 199,
      'syncup-tracker': 25
    };
    return devicePrices[deviceId] || 0;
  }

  // Validate promotion for a specific line
  validateLinePromotion(lineIndex) {
    const promotion = this.linePromotions[lineIndex];
    const lineData = this.lineData[lineIndex];
    
    if (!promotion || !lineData) return { valid: true };

    const validation = validatePromotionEligibility(
      promotion.promotionId,
      lineData.deviceId,
      lineData.planId,
      lineData.lineType,
      lineData.hasPortIn
    );

    return validation;
  }

  // Validate all promotions for conflicts and limits
  validateAllPromotions() {
    this.validationErrors = [];
    
    const selectedPromotions = Object.values(this.linePromotions).filter(p => p !== null);
    
    if (selectedPromotions.length === 0) return { valid: true, errors: [] };

    // Check promotion limits
    const { errors: limitErrors } = checkPromotionLimits(selectedPromotions);
    this.validationErrors.push(...limitErrors);

    // Check stackability
    const stackabilityErrors = checkStackability(selectedPromotions);
    this.validationErrors.push(...stackabilityErrors);

    // Check individual line validations
    Object.keys(this.linePromotions).forEach(lineIndex => {
      const validation = this.validateLinePromotion(lineIndex);
      if (!validation.valid) {
        this.validationErrors.push(`Line ${parseInt(lineIndex) + 1}: ${validation.reason}`);
      }
    });

    return {
      valid: this.validationErrors.length === 0,
      errors: this.validationErrors
    };
  }

  // Get promotion summary for a line
  getLinePromotionSummary(lineIndex) {
    const promotion = this.linePromotions[lineIndex];
    if (!promotion) return null;

    const promotionData = getPromotionSummary(promotion.promotionId);
    return {
      ...promotionData,
      ...promotion,
      lineIndex: parseInt(lineIndex)
    };
  }

  // Get all promotions summary
  getAllPromotionsSummary() {
    const summary = {};
    Object.keys(this.linePromotions).forEach(lineIndex => {
      if (this.linePromotions[lineIndex]) {
        summary[lineIndex] = this.getLinePromotionSummary(lineIndex);
      }
    });
    return summary;
  }

  // Calculate total savings across all lines
  calculateTotalSavings() {
    return Object.values(this.linePromotions)
      .filter(p => p !== null)
      .reduce((total, promotion) => total + (promotion.savings || 0), 0);
  }

  // Get promotion statistics
  getPromotionStats() {
    const selectedPromotions = Object.values(this.linePromotions).filter(p => p !== null);
    const stats = {
      totalLines: Object.keys(this.lineData).length,
      linesWithPromotions: selectedPromotions.length,
      totalSavings: this.calculateTotalSavings(),
      promotionTypes: {},
      validationErrors: this.validationErrors.length
    };

    // Count promotion types
    selectedPromotions.forEach(promo => {
      const promotionData = getPromotionSummary(promo.promotionId);
      const category = promotionData.category;
      stats.promotionTypes[category] = (stats.promotionTypes[category] || 0) + 1;
    });

    return stats;
  }

  // Export promotion data for quote
  exportPromotionData() {
    return {
      linePromotions: this.linePromotions,
      lineData: this.lineData,
      totalSavings: this.calculateTotalSavings(),
      validationErrors: this.validationErrors,
      stats: this.getPromotionStats()
    };
  }

  // Import promotion data
  importPromotionData(data) {
    this.linePromotions = data.linePromotions || {};
    this.lineData = data.lineData || {};
    this.validationErrors = data.validationErrors || [];
  }

  // Clear all promotions
  clearAllPromotions() {
    this.linePromotions = {};
    this.validationErrors = [];
  }

  // Remove line and its promotions
  removeLine(lineIndex) {
    delete this.linePromotions[lineIndex];
    delete this.lineData[lineIndex];
    this.validateAllPromotions();
  }
}

// Export singleton instance
export const promotionManager = new PerLinePromotionManager();

// Export utility functions
export const getPromotionManager = () => promotionManager;

export const resetPromotionManager = () => {
  promotionManager.clearAllPromotions();
};

// Helper functions for React components
export const usePromotionManager = () => {
  return {
    manager: promotionManager,
    initializeLine: (lineIndex, lineData) => promotionManager.initializeLine(lineIndex, lineData),
    updateLineData: (lineIndex, updates) => promotionManager.updateLineData(lineIndex, updates),
    getAvailablePromotions: (lineIndex) => promotionManager.getAvailablePromotions(lineIndex),
    selectPromotion: (lineIndex, promotionId, tradeInDeviceId) => 
      promotionManager.selectPromotion(lineIndex, promotionId, tradeInDeviceId),
    removePromotion: (lineIndex) => promotionManager.removePromotion(lineIndex),
    updateTradeInDevice: (lineIndex, tradeInDeviceId) => 
      promotionManager.updateTradeInDevice(lineIndex, tradeInDeviceId),
    validateAllPromotions: () => promotionManager.validateAllPromotions(),
    getLinePromotionSummary: (lineIndex) => promotionManager.getLinePromotionSummary(lineIndex),
    getAllPromotionsSummary: () => promotionManager.getAllPromotionsSummary(),
    calculateTotalSavings: () => promotionManager.calculateTotalSavings(),
    getPromotionStats: () => promotionManager.getPromotionStats(),
    exportPromotionData: () => promotionManager.exportPromotionData(),
    clearAllPromotions: () => promotionManager.clearAllPromotions()
  };
};
