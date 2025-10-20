import React from 'react';
import { CheckCircle, Download, Share2, Phone } from 'lucide-react';

const QuoteSummary = ({ 
  quoteData, 
  customerData, 
  tabletWearableData,
  portInData,
  onPrev, 
  onRestart 
}) => {
  const planOptions = [
    { 
      id: 'essentials', 
      name: 'Experience Essentials', 
      pricing: { 1: 50, 2: 80, 3: 90, 4: 100, 5: 120, 6: 135, additional: 35 }
    },
    { 
      id: 'more', 
      name: 'Experience More', 
      pricing: { 1: 85, 2: 140, 3: 140, 4: 170, 5: 200, 6: 230, additional: 35 }
    },
    { 
      id: 'beyond', 
      name: 'Experience Beyond', 
      pricing: { 1: 100, 2: 170, 3: 170, 4: 215, 5: 260, 6: 305, additional: 35 }
    },
    { 
      id: 'essentials-55', 
      name: 'Essentials Choice 55', 
      pricing: { 1: 45, 2: 60 }, 
      senior: true, 
      maxLines: 2 
    },
    { 
      id: 'more-55', 
      name: 'More w/55+ Savings', 
      pricing: { 1: 70, 2: 100 }, 
      senior: true, 
      maxLines: 2 
    },
    { 
      id: 'beyond-55', 
      name: 'Beyond w/55+ Savings', 
      pricing: { 1: 85, 2: 130 }, 
      senior: true, 
      maxLines: 2 
    }
  ];

  const deviceOptions = [
    { id: 'iphone-air', name: 'iPhone Air', monthlyPrice: 42, price: 999, tier: 5 },
    { id: 'iphone-17-pro-max', name: 'iPhone 17 Pro Max', monthlyPrice: 50, price: 1199, tier: 6 },
    { id: 'iphone-17-pro', name: 'iPhone 17 Pro', monthlyPrice: 46, price: 1099, tier: 5 },
    { id: 'iphone-17', name: 'iPhone 17', monthlyPrice: 33, price: 799, tier: 4 },
    { id: 'iphone-16e', name: 'iPhone 16e', monthlyPrice: 25, price: 599, tier: 3 },
    { id: 'iphone-16-pro-max', name: 'iPhone 16 Pro Max', monthlyPrice: 50, price: 1199, tier: 6 },
    { id: 'iphone-16-pro', name: 'iPhone 16 Pro', monthlyPrice: 46, price: 1099, tier: 5 },
    { id: 'iphone-16-plus', name: 'iPhone 16 Plus', monthlyPrice: 38, price: 899, tier: 4 },
    { id: 'iphone-16', name: 'iPhone 16', monthlyPrice: 33, price: 799, tier: 4 },
    { id: 'iphone-15', name: 'iPhone 15', monthlyPrice: 29, price: 699, tier: 4 },
    { id: 'pixel-10-pro-xl', name: 'Pixel 10 Pro XL', monthlyPrice: 50, price: 1199, tier: 6 },
    { id: 'pixel-10-pro', name: 'Pixel 10 Pro', monthlyPrice: 42, price: 999, tier: 5 },
    { id: 'pixel-10', name: 'Pixel 10', monthlyPrice: 29, price: 699, tier: 4 },
    { id: 'pixel-9a', name: 'Pixel 9A', monthlyPrice: 21, price: 499, tier: 3 },
    { id: 'galaxy-s25-edge', name: 'Galaxy S25 Edge', monthlyPrice: 54, price: 1299, tier: 6 },
    { id: 'galaxy-s25-ultra', name: 'Galaxy S25 Ultra', monthlyPrice: 54, price: 1299, tier: 6 },
    { id: 'galaxy-s25-plus', name: 'Galaxy S25+', monthlyPrice: 42, price: 999, tier: 5 },
    { id: 'galaxy-s25', name: 'Galaxy S25', monthlyPrice: 33, price: 799, tier: 4 },
    { id: 'galaxy-s25-fe', name: 'Galaxy S25 FE', monthlyPrice: 25, price: 599, tier: 3 },
    { id: 'galaxy-a36', name: 'Galaxy A36', monthlyPrice: 17, price: 399, tier: 2 },
    { id: 'galaxy-z-fold-7', name: 'Galaxy Z Fold 7', monthlyPrice: 75, price: 1799, tier: 6 },
    { id: 'galaxy-z-flip-7', name: 'Galaxy Z Flip 7', monthlyPrice: 42, price: 999, tier: 5 },
    { id: 'razr-ultra', name: 'Razr Ultra', monthlyPrice: 42, price: 999, tier: 5 },
    { id: 'razr-plus-2025', name: 'Razr+ 2025', monthlyPrice: 33, price: 799, tier: 4 },
    { id: 'razr-2025', name: 'Razr 2025', monthlyPrice: 25, price: 599, tier: 3 },
    { id: 'edge-2025', name: 'Edge 2025', monthlyPrice: 29, price: 699, tier: 4 },
    { id: 'g-power-2025', name: 'G Power 2025', monthlyPrice: 13, price: 299, tier: 2 },
    { id: 'g-2025', name: 'G 2025', monthlyPrice: 8, price: 199, tier: 1 },
    { id: 'revvl-pro-8', name: 'Revvl Pro 8', monthlyPrice: 17, price: 399, tier: 2 },
    { id: 'bring-your-own', name: 'Bring Your Own Device', monthlyPrice: 0, price: 0, tier: 5 }
  ];

  const protectionTiers = [
    { tier: 1, price: 7 },
    { tier: 2, price: 9 },
    { tier: 3, price: 13 },
    { tier: 4, price: 16 },
    { tier: 5, price: 18 },
    { tier: 6, price: 25 }
  ];

  const calculatePlanPrice = (planId, lineCount) => {
    const plan = planOptions.find(p => p.id === planId);
    if (!plan) return 0;
    
    if (plan.senior && lineCount > 2) {
      return 0; // Senior plans max 2 lines
    }
    
    if (lineCount <= 6) {
      return plan.pricing[lineCount] || 0;
    } else {
      // For 6+ lines, use 6-line pricing + additional lines
      const basePrice = plan.pricing[6] || 0;
      const additionalLines = lineCount - 6;
      return basePrice + (additionalLines * plan.pricing.additional);
    }
  };

  const calculatePlanTotal = () => {
    // Calculate total based on the plan combination
    const planCounts = {};
    for (let i = 0; i < quoteData.lines; i++) {
      const planId = quoteData.plans[i];
      if (planId) {
        planCounts[planId] = (planCounts[planId] || 0) + 1;
      }
    }
    
    let total = 0;
    Object.entries(planCounts).forEach(([planId, count]) => {
      total += calculatePlanPrice(planId, count);
    });
    
    return total;
  };

  const calculateDeviceTotal = () => {
    let total = 0;
    for (let i = 0; i < quoteData.lines; i++) {
      const deviceId = quoteData.devices[i];
      const tradeInValue = parseFloat(quoteData.tradeIns[i]) || 0;
      
      if (deviceId) {
        const device = deviceOptions.find(d => d.id === deviceId);
        if (device) {
          // Calculate net device price after trade-in
          const netPrice = device.price - tradeInValue;
          const monthlyPayment = Math.max(0, Math.ceil(netPrice / 24));
          total += monthlyPayment;
        }
      }
    }
    return total;
  };

  const calculateDeviceCost = () => {
    let total = 0;
    for (let i = 0; i < quoteData.lines; i++) {
      const deviceId = quoteData.devices[i];
      if (deviceId) {
        const device = deviceOptions.find(d => d.id === deviceId);
        if (device) {
          total += device.price;
        }
      }
    }
    return total;
  };

  const calculateTradeInTotal = () => {
    let total = 0;
    for (let i = 0; i < quoteData.lines; i++) {
      const tradeInValue = quoteData.tradeIns[i] || 0;
      total += parseFloat(tradeInValue) || 0;
    }
    return total;
  };

  const calculateECBalance = () => {
    const deviceTotal = calculateDeviceCost();
    const tradeInTotal = calculateTradeInTotal();
    const ecAmount = parseFloat(quoteData.equipmentCredit) || 0;
    
    return Math.max(0, deviceTotal - tradeInTotal - ecAmount);
  };

  const calculateDownPaymentRequired = () => {
    const ecBalance = calculateECBalance();
    const downPaymentPercent = parseFloat(quoteData.downPayment) || 0;
    
    if (ecBalance <= 0) return 0;
    
    return Math.ceil(ecBalance * (downPaymentPercent / 100));
  };

  const calculateMonthlyFinancing = () => {
    const ecBalance = calculateECBalance();
    const downPaymentAmount = calculateDownPaymentRequired();
    const financedAmount = ecBalance - downPaymentAmount;
    
    if (financedAmount <= 0) return 0;
    
    // T-Mobile typically offers 24-month financing
    return Math.ceil(financedAmount / 24);
  };

  const calculateDeviceTaxes = () => {
    const deviceCost = calculateDeviceCost();
    // Device taxes are typically around 8-10% depending on state
    return Math.round(deviceCost * 0.09);
  };

  const calculateActivationFees = () => {
    // $10 activation fee per line
    return quoteData.lines * 10;
  };

  const calculateTotalDueToday = () => {
    const deviceTaxes = calculateDeviceTaxes();
    const activationFees = calculateActivationFees();
    const downPayment = calculateDownPaymentRequired();
    const tradeInCredit = calculateTradeInCredit();
    
    const subtotal = deviceTaxes + activationFees + downPayment;
    
    // If trade-in credit exceeds the subtotal, customer owes $0
    return Math.max(0, subtotal - tradeInCredit);
  };

  const calculateInsiderSavings = () => {
    if (!quoteData.discounts.tmobileInsider) return 0;
    
    // 20% discount on rate plans (More or Beyond only)
    const planCounts = {};
    for (let i = 0; i < quoteData.lines; i++) {
      const planId = quoteData.plans[i];
      if (planId) {
        planCounts[planId] = (planCounts[planId] || 0) + 1;
      }
    }
    
    let savings = 0;
    Object.entries(planCounts).forEach(([planId, count]) => {
      // Only apply to More or Beyond plans (not Essentials or senior plans)
      if (planId === 'more' || planId === 'beyond') {
        const planPrice = calculatePlanPrice(planId, count);
        savings += Math.round(planPrice * 0.20); // 20% discount
      }
    });
    
    return savings;
  };

  const calculateTradeInCredit = () => {
    const deviceCost = calculateDeviceCost();
    const tradeInTotal = calculateTradeInTotal();
    
    // If trade-in value exceeds device cost, return the excess as monthly credit
    return Math.max(0, tradeInTotal - deviceCost);
  };

  const calculateProtectionTotal = () => {
    let total = 0;
    for (let i = 0; i < quoteData.lines; i++) {
      if (quoteData.protection[i]) {
        const deviceId = quoteData.devices[i];
        if (deviceId) {
          const device = deviceOptions.find(d => d.id === deviceId);
          if (device) {
            const tierInfo = protectionTiers.find(t => t.tier === device.tier);
            if (tierInfo) {
              total += tierInfo.price;
            }
          }
        }
      }
    }
    return total;
  };

  const calculateAutoPaySavings = () => {
    if (!quoteData.discounts.autoPay) return 0;
    // $5 per line up to 8 lines
    return Math.min(quoteData.lines, 8) * 5;
  };

  const calculateSeniorSavings = () => {
    if (!quoteData.discounts.senior55) return 0;
    
    // Calculate savings by comparing senior vs regular plans
    const planCounts = {};
    for (let i = 0; i < quoteData.lines; i++) {
      const planId = quoteData.plans[i];
      if (planId) {
        planCounts[planId] = (planCounts[planId] || 0) + 1;
      }
    }
    
    let savings = 0;
    Object.entries(planCounts).forEach(([planId, count]) => {
      const plan = planOptions.find(p => p.id === planId);
      if (plan && plan.senior) {
        // Calculate what the regular plan would cost
        let regularPlanId = planId.replace('-55', '');
        if (regularPlanId === 'essentials') regularPlanId = 'essentials';
        if (regularPlanId === 'more') regularPlanId = 'more';
        if (regularPlanId === 'beyond') regularPlanId = 'beyond';
        
        const regularPlan = planOptions.find(p => p.id === regularPlanId);
        if (regularPlan) {
          const regularPrice = calculatePlanPrice(regularPlanId, count);
          const seniorPrice = calculatePlanPrice(planId, count);
          savings += (regularPrice - seniorPrice);
        }
      }
    });
    
    return savings;
  };

  const getPlanName = (planId) => {
    const plan = planOptions.find(p => p.id === planId);
    return plan ? plan.name : 'Unknown Plan';
  };

  const getDeviceName = (deviceId) => {
    const device = deviceOptions.find(d => d.id === deviceId);
    return device ? device.name : 'Unknown Device';
  };

  const getDevicePrice = (deviceId) => {
    const device = deviceOptions.find(d => d.id === deviceId);
    return device ? device.monthlyPrice : 0;
  };

  const getProtectionPrice = (deviceId) => {
    const device = deviceOptions.find(d => d.id === deviceId);
    if (!device) return 0;
    const tierInfo = protectionTiers.find(t => t.tier === device.tier);
    return tierInfo ? tierInfo.price : 0;
  };

  // Tablet/Wearable helper functions
  const getTabletWearableDeviceName = (deviceId) => {
    const tabletWearableDevices = [
      // Tablets
      { id: 'ipad-10', name: 'Apple iPad 10 (A16)', monthlyPrice: 25 },
      { id: 'ipad-mini-7', name: 'Apple iPad Mini 7th Gen', monthlyPrice: 30 },
      { id: 'ipad-pro-11', name: 'Apple iPad Pro 11"', monthlyPrice: 45 },
      { id: 'ipad-pro-13', name: 'Apple iPad Pro 13"', monthlyPrice: 55 },
      { id: 'galaxy-tab-a9', name: 'Samsung Galaxy Tab A9', monthlyPrice: 20 },
      { id: 'galaxy-tab-s10-plus', name: 'Samsung Galaxy Tab S10+ 5G', monthlyPrice: 40 },
      { id: 'revvl-tab-5g', name: 'Revvl Tab 5G', monthlyPrice: 15 },
      // Wearables
      { id: 'apple-watch-se-3-40mm', name: 'Apple Watch SE 3rd Gen 40mm', monthlyPrice: 15 },
      { id: 'apple-watch-se-3-44mm', name: 'Apple Watch SE 3rd Gen 44mm', monthlyPrice: 18 },
      { id: 'apple-watch-11-42mm', name: 'Apple Watch 11th Gen 42mm', monthlyPrice: 25 },
      { id: 'apple-watch-11-45mm', name: 'Apple Watch 11th Gen 45mm', monthlyPrice: 28 },
      { id: 'apple-watch-ultra-3', name: 'Apple Watch Ultra 3rd Gen', monthlyPrice: 35 },
      { id: 'galaxy-watch-8-40mm', name: 'Samsung Galaxy Watch 8 40mm', monthlyPrice: 20 },
      { id: 'galaxy-watch-8-44mm', name: 'Samsung Galaxy Watch 8 44mm', monthlyPrice: 23 },
      { id: 'galaxy-watch-8-classic-46mm', name: 'Samsung Galaxy Watch 8 Classic 46mm', monthlyPrice: 30 },
      { id: 'galaxy-watch-ultra', name: 'Samsung Galaxy Watch Ultra', monthlyPrice: 35 },
      { id: 'pixel-watch-3', name: 'Google Pixel Watch 3', monthlyPrice: 22 },
      { id: 'pixel-watch-4', name: 'Google Pixel Watch 4', monthlyPrice: 25 }
    ];
    const device = tabletWearableDevices.find(d => d.id === deviceId);
    return device || { name: 'Unknown Device', monthlyPrice: 0 };
  };

  const getTabletWearablePlanName = (planId) => {
    const tabletWearablePlans = [
      { id: 'tablet-unlimited', name: 'Tablet Unlimited', price: 20 },
      { id: 'tablet-2gb', name: 'Tablet 2GB', price: 10 },
      { id: 'tablet-6gb', name: 'Tablet 6GB', price: 15 },
      { id: 'wearable-unlimited', name: 'Wearable Unlimited', price: 5 },
      { id: 'wearable-500mb', name: 'Wearable 500MB', price: 5 }
    ];
    const plan = tabletWearablePlans.find(p => p.id === planId);
    return plan || { name: 'Unknown Plan', price: 0 };
  };

  const getTabletWearableProtectionPrice = (deviceId) => {
    // Tablet/Wearable protection pricing (simplified)
    const protectionPrices = {
      'ipad-10': 7, 'ipad-mini-7': 7, 'ipad-pro-11': 13, 'ipad-pro-13': 16,
      'galaxy-tab-a9': 7, 'galaxy-tab-s10-plus': 13, 'revvl-tab-5g': 7,
      'apple-watch-se-3-40mm': 7, 'apple-watch-se-3-44mm': 7,
      'apple-watch-11-42mm': 9, 'apple-watch-11-45mm': 9,
      'apple-watch-ultra-3': 13, 'galaxy-watch-8-40mm': 7,
      'galaxy-watch-8-44mm': 7, 'galaxy-watch-8-classic-46mm': 9,
      'galaxy-watch-ultra': 13, 'pixel-watch-3': 7, 'pixel-watch-4': 7
    };
    return protectionPrices[deviceId] || 7;
  };

  const calculateTaxesAndFees = () => {
    const subtotal = calculatePlanTotal() + calculateDeviceTotal() + calculateProtectionTotal() + calculateTabletWearableTotal();
    return Math.round(subtotal * 0.15); // Approximate 15% for taxes and fees
  };

  const calculateTabletWearableTotal = () => {
    if (!tabletWearableData || !tabletWearableData.lines) return 0;
    
    let total = 0;
    for (let i = 0; i < tabletWearableData.lines; i++) {
      const deviceId = tabletWearableData.devices[i];
      const planId = tabletWearableData.plans[i];
      const device = getTabletWearableDeviceName(deviceId);
      const plan = getTabletWearablePlanName(planId);
      
      total += device.monthlyPrice + plan.price;
      
      // Add protection if selected
      if (tabletWearableData.protection && tabletWearableData.protection[i]) {
        total += getTabletWearableProtectionPrice(deviceId);
      }
    }
    return total;
  };

  const getTotalMonthly = () => {
    const subtotal = calculatePlanTotal() + calculateDeviceTotal() + calculateProtectionTotal() + calculateMonthlyFinancing() + calculateTabletWearableTotal();
    const discounts = calculateAutoPaySavings() + calculateSeniorSavings() + calculateInsiderSavings();
    const taxesAndFees = calculateTaxesAndFees();
    return subtotal - discounts + taxesAndFees;
  };

  const handleDownloadQuote = () => {
    const quoteText = `
T-Mobile Quote Summary
=====================

Customer Information:
Name: ${customerData ? `${customerData.firstName} ${customerData.lastName}` : 'Not provided'}
Email: ${customerData ? customerData.email : 'Not provided'}
Phone: ${customerData ? customerData.phone : 'Not provided'}
Expected EC: ${customerData ? customerData.expectedEC : 'Not provided'}

Quote Details:
Lines: ${quoteData.lines}

Plan Details:
${Array.from({ length: quoteData.lines }, (_, i) => {
  const planId = quoteData.plans[i];
  const deviceId = quoteData.devices[i];
  return `Line ${i + 1}: ${getPlanName(planId)} - $${planOptions.find(p => p.id === planId)?.price}/mo, ${getDeviceName(deviceId)} - $${getDevicePrice(deviceId)}/mo`;
}).join('\n')}

Monthly Totals:
- Plan Total: $${calculatePlanTotal()}/mo
- Device Payments: $${calculateDeviceTotal()}/mo
- Protection Plans: $${calculateProtectionTotal()}/mo
- Monthly Financing: $${calculateMonthlyFinancing()}/mo
- Subtotal: $${calculatePlanTotal() + calculateDeviceTotal() + calculateProtectionTotal() + calculateMonthlyFinancing()}/mo
${calculateAutoPaySavings() > 0 ? `- Auto Pay Discount: -$${calculateAutoPaySavings()}/mo` : ''}
${calculateSeniorSavings() > 0 ? `- Senior 55+ Discount: -$${calculateSeniorSavings()}/mo` : ''}
${calculateInsiderSavings() > 0 ? `- T-Mobile Insider Discount: -$${calculateInsiderSavings()}/mo` : ''}
${calculateTradeInCredit() > 0 ? `- Trade-In Credit (Instant): -$${calculateTradeInCredit()}` : ''}
- Taxes & Fees: $${calculateTaxesAndFees()}/mo
- Total Monthly: $${getTotalMonthly()}/mo

Equipment Credit Summary:
- Total Device Cost: $${calculateDeviceCost()}
- Total Trade-In Value: $${calculateTradeInTotal()}
- Equipment Credit: $${parseFloat(quoteData.equipmentCredit) || 0}
- Remaining Balance: $${calculateECBalance()}
${calculateECBalance() > 0 ? `- Down Payment Required: $${calculateDownPaymentRequired()}` : ''}
${calculateECBalance() > 0 ? `- Monthly Financing: $${calculateMonthlyFinancing()}/mo` : ''}

Due Today:
- Device Taxes: $${calculateDeviceTaxes()}
- Activation Fees: $${calculateActivationFees()}
- Down Payment: $${calculateDownPaymentRequired()}
- Total Due Today: $${calculateTotalDueToday()}

Total Device Cost: $${calculateDeviceCost()}

Generated on: ${new Date().toLocaleDateString()}
    `;
    
    const blob = new Blob([quoteText], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `t-mobile-quote-${customerData ? customerData.lastName.toLowerCase() : 'customer'}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const handleShareQuote = () => {
    const shareText = `Check out my T-Mobile quote: ${quoteData.lines} lines for $${getTotalMonthly()}/month!`;
    
    if (navigator.share) {
      navigator.share({
        title: 'T-Mobile Quote',
        text: shareText,
        url: window.location.href
      });
    } else {
      navigator.clipboard.writeText(shareText);
      alert('Quote copied to clipboard!');
    }
  };

  return (
    <div className="form-section">
      <h2 className="section-title">Your T-Mobile Quote</h2>
      
      {/* Customer Information */}
      {customerData && (
        <div style={{
          background: '#E20074',
          color: 'white',
          padding: '20px',
          borderRadius: '12px',
          marginBottom: '30px'
        }}>
          <h3 style={{ fontSize: '20px', fontWeight: '600', marginBottom: '15px' }}>
            Customer Information
          </h3>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '15px' }}>
            <div>
              <div style={{ fontSize: '12px', opacity: 0.8, marginBottom: '4px' }}>Name</div>
              <div style={{ fontSize: '16px', fontWeight: '600' }}>
                {customerData.firstName} {customerData.lastName}
              </div>
            </div>
            <div>
              <div style={{ fontSize: '12px', opacity: 0.8, marginBottom: '4px' }}>Email</div>
              <div style={{ fontSize: '16px', fontWeight: '600' }}>
                {customerData.email}
              </div>
            </div>
            <div>
              <div style={{ fontSize: '12px', opacity: 0.8, marginBottom: '4px' }}>Phone</div>
              <div style={{ fontSize: '16px', fontWeight: '600' }}>
                {customerData.phone}
              </div>
            </div>
            <div>
              <div style={{ fontSize: '12px', opacity: 0.8, marginBottom: '4px' }}>Expected EC</div>
              <div style={{ fontSize: '16px', fontWeight: '600' }}>
                {customerData.expectedEC}
              </div>
            </div>
          </div>
        </div>
      )}
      
      <div className="summary">
        <div className="summary-title">Quote Summary</div>
        
        {/* Two Column Layout */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: '20px',
          marginTop: '20px'
        }}>
          
          {/* Expected Monthly Balance Column */}
          <div style={{
            background: 'white',
            border: '2px solid #e0e0e0',
            borderRadius: '12px',
            padding: '20px'
          }}>
            <div style={{
              background: '#E20074',
              color: '#FFFFFF',
              padding: '15px',
              borderRadius: '8px',
              marginBottom: '20px',
              textAlign: 'center'
            }}>
              <h3 style={{ fontSize: '18px', fontWeight: '600', margin: 0 }}>
                Expected Monthly Balance
              </h3>
            </div>
            
            <div className="summary-item">
              <span className="summary-label">Plan Total</span>
              <span className="summary-value">${calculatePlanTotal()}/mo</span>
            </div>
            <div className="summary-item">
              <span className="summary-label">Device Payments</span>
              <span className="summary-value">${calculateDeviceTotal()}/mo</span>
            </div>
            <div className="summary-item">
              <span className="summary-label">Protection Plans</span>
              <span className="summary-value">${calculateProtectionTotal()}/mo</span>
            </div>
            <div className="summary-item">
              <span className="summary-label">Monthly Financing</span>
              <span className="summary-value">${calculateMonthlyFinancing()}/mo</span>
            </div>
            <div className="summary-item">
              <span className="summary-label">Subtotal</span>
              <span className="summary-value">
                ${calculatePlanTotal() + calculateDeviceTotal() + calculateProtectionTotal() + calculateMonthlyFinancing()}/mo
              </span>
            </div>
            {calculateAutoPaySavings() > 0 && (
              <div className="summary-item" style={{ color: '#4CAF50' }}>
                <span className="summary-label">Auto Pay Discount</span>
                <span className="summary-value">-${calculateAutoPaySavings()}/mo</span>
              </div>
            )}
            {calculateSeniorSavings() > 0 && (
              <div className="summary-item" style={{ color: '#4CAF50' }}>
                <span className="summary-label">Senior 55+ Discount</span>
                <span className="summary-value">-${calculateSeniorSavings()}/mo</span>
              </div>
            )}
            {calculateInsiderSavings() > 0 && (
              <div className="summary-item" style={{ color: '#4CAF50' }}>
                <span className="summary-label">T-Mobile Insider Discount</span>
                <span className="summary-value">-${calculateInsiderSavings()}/mo</span>
              </div>
            )}
            {calculateTradeInCredit() > 0 && (
              <div className="summary-item" style={{ color: '#4CAF50' }}>
                <span className="summary-label">Trade-In Credit (Instant)</span>
                <span className="summary-value">-${calculateTradeInCredit()}</span>
              </div>
            )}
            <div className="summary-item">
              <span className="summary-label">Taxes & Fees</span>
              <span className="summary-value">${calculateTaxesAndFees()}/mo</span>
            </div>
            
            <div style={{
              borderTop: '2px solid #e0e0e0',
              paddingTop: '15px',
              marginTop: '15px'
            }}>
              <div className="summary-item" style={{ 
                fontSize: '20px', 
                fontWeight: '700', 
                color: '#E20074' 
              }}>
                <span className="summary-label">Total Monthly</span>
                <span className="summary-value">${getTotalMonthly()}/mo</span>
              </div>
            </div>
          </div>

          {/* Due Today Column */}
          <div style={{
            background: 'white',
            border: '2px solid #e0e0e0',
            borderRadius: '12px',
            padding: '20px'
          }}>
            <div style={{
              background: '#E20074',
              color: '#FFFFFF',
              padding: '15px',
              borderRadius: '8px',
              marginBottom: '20px',
              textAlign: 'center'
            }}>
              <h3 style={{ fontSize: '18px', fontWeight: '600', margin: 0 }}>
                Due Today
              </h3>
            </div>
            
            <div className="summary-item">
              <span className="summary-label">Device Taxes</span>
              <span className="summary-value">${calculateDeviceTaxes()}</span>
            </div>
            <div className="summary-item">
              <span className="summary-label">Activation Fees</span>
              <span className="summary-value">${calculateActivationFees()}</span>
            </div>
            <div className="summary-item">
              <span className="summary-label">Down Payment</span>
              <span className="summary-value">${calculateDownPaymentRequired()}</span>
            </div>
            
            <div style={{
              borderTop: '2px solid #e0e0e0',
              paddingTop: '15px',
              marginTop: '15px'
            }}>
              <div className="summary-item" style={{ 
                fontSize: '20px', 
                fontWeight: '700', 
                color: '#E20074' 
              }}>
                <span className="summary-label">Total Due Today</span>
                <span className="summary-value">${calculateTotalDueToday()}</span>
              </div>
            </div>
          </div>
        </div>
        
        {/* Line Details */}
        <div style={{
          background: '#f8f9fa',
          padding: '20px',
          borderRadius: '12px',
          marginTop: '20px',
          border: '1px solid #e0e0e0'
        }}>
          <h3 style={{ fontSize: '18px', fontWeight: '600', color: '#333', marginBottom: '15px' }}>
            Line Details
          </h3>
          {Array.from({ length: quoteData.lines }, (_, i) => {
            const planId = quoteData.plans[i];
            const deviceId = quoteData.devices[i];
            const plan = planOptions.find(p => p.id === planId);
            const device = deviceOptions.find(d => d.id === deviceId);
            
            return (
              <div key={i} style={{ 
                marginBottom: '15px', 
                padding: '15px', 
                background: 'white', 
                borderRadius: '8px',
                border: '1px solid #e0e0e0'
              }}>
                <div style={{ fontWeight: '600', marginBottom: '8px', color: '#E20074' }}>Line {i + 1}</div>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
                  <span style={{ color: '#666' }}>Plan:</span>
                  <span>{getPlanName(planId)}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
                  <span style={{ color: '#666' }}>Device:</span>
                  <span>{getDeviceName(deviceId)} - ${getDevicePrice(deviceId)}/mo</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
                  <span style={{ color: '#666' }}>Protection:</span>
                  <span>
                    {quoteData.protection[i] 
                      ? `P360 - $${getProtectionPrice(deviceId)}/mo` 
                      : 'No Protection'
                    }
                  </span>
                </div>
                {quoteData.tradeIns && quoteData.tradeIns[i] && (
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span style={{ color: '#666' }}>Trade-In Value:</span>
                    <span style={{ color: '#4CAF50' }}>${quoteData.tradeIns[i]}</span>
                  </div>
                )}
                {portInData && portInData[i] && (
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span style={{ color: '#666' }}>Number:</span>
                    <span>
                      {portInData[i].type === 'new' ? 'New Number (Auto)' : 
                       portInData[i].type === 'port-in' ? `Port-In: ${portInData[i].mdn} (${portInData[i].carrier})` : 
                       'Not specified'}
                    </span>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Data Lines (Tablet/Wearable) */}
        {tabletWearableData && tabletWearableData.lines > 0 && (
          <div style={{
            background: '#f8f9fa',
            padding: '20px',
            borderRadius: '12px',
            marginTop: '20px',
            border: '1px solid #e0e0e0'
          }}>
            <h3 style={{ fontSize: '18px', fontWeight: '600', color: '#333', marginBottom: '15px' }}>
              Data Lines
            </h3>
            {Array.from({ length: tabletWearableData.lines }, (_, i) => {
              const deviceId = tabletWearableData.devices[i];
              const planId = tabletWearableData.plans[i];
              const device = getTabletWearableDeviceName(deviceId);
              const plan = getTabletWearablePlanName(planId);
              
              return (
                <div key={i} style={{ 
                  marginBottom: '15px', 
                  padding: '15px', 
                  background: 'white', 
                  borderRadius: '8px',
                  border: '1px solid #e0e0e0'
                }}>
                  <div style={{ fontWeight: '600', marginBottom: '8px', color: '#E20074' }}>
                    Data Line {i + 1}
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
                    <span style={{ color: '#666' }}>Device:</span>
                    <span>{device.name}</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
                    <span style={{ color: '#666' }}>Plan:</span>
                    <span>{plan.name}</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
                    <span style={{ color: '#666' }}>Monthly Cost:</span>
                    <span>${device.monthlyPrice + plan.price}/mo</span>
                  </div>
                  {tabletWearableData.protection && tabletWearableData.protection[i] && (
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                      <span style={{ color: '#666' }}>Protection:</span>
                      <span>P360 - ${getTabletWearableProtectionPrice(deviceId)}/mo</span>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>

      <div style={{ 
        background: '#E20074',
        color: 'white', 
        padding: '20px', 
        borderRadius: '12px', 
        marginBottom: '20px',
        textAlign: 'center'
      }}>
        <h3 style={{ marginBottom: '10px' }}>Ready to Get Started?</h3>
        <p style={{ marginBottom: '15px' }}>
          Contact T-Mobile to activate your service and get your devices!
        </p>
        <div style={{ display: 'flex', gap: '10px', justifyContent: 'center' }}>
          <a 
            href="tel:1-800-937-8997" 
            style={{
              background: 'white',
              color: '#e20074',
              padding: '10px 20px',
              borderRadius: '6px',
              textDecoration: 'none',
              fontWeight: '600',
              display: 'flex',
              alignItems: 'center',
              gap: '8px'
            }}
          >
            <Phone size={16} />
            Call Now
          </a>
          <a 
            href="https://www.t-mobile.com/stores" 
            target="_blank" 
            rel="noopener noreferrer"
            style={{
              background: 'rgba(255,255,255,0.2)',
              color: 'white',
              padding: '10px 20px',
              borderRadius: '6px',
              textDecoration: 'none',
              fontWeight: '600',
              border: '1px solid white'
            }}
          >
            Find Store
          </a>
        </div>
      </div>

      <div className="button-group">
        <button className="button button-secondary" onClick={onPrev}>
          Back to Devices
        </button>
        <button className="button button-secondary" onClick={handleDownloadQuote}>
          <Download size={16} style={{ marginRight: '8px' }} />
          Download Quote
        </button>
        <button className="button button-secondary" onClick={handleShareQuote}>
          <Share2 size={16} style={{ marginRight: '8px' }} />
          Share Quote
        </button>
        <button className="button" onClick={onRestart}>
          Start New Quote
        </button>
      </div>
    </div>
  );
};

export default QuoteSummary;
