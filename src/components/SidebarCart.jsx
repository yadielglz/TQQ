import React, { useState, useEffect } from 'react';
import { 
  ShoppingCart, 
  User, 
  Phone, 
  CreditCard, 
  Smartphone, 
  Shield, 
  Percent, 
  Calculator,
  CheckCircle,
  AlertCircle,
  Tablet,
  Watch,
  ChevronDown,
  ChevronUp,
  Menu,
  X
} from 'lucide-react';

const SidebarCart = ({ 
  currentStep, 
  customerData, 
  tabletWearableData, 
  mobileInternetData,
  homeInternetData,
  quoteData, 
  portInData,
  steps 
}) => {
  const [isMobile, setIsMobile] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 1024);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const getStepStatus = (stepId) => {
    if (stepId < currentStep) return 'completed';
    if (stepId === currentStep) return 'current';
    return 'pending';
  };

  const getStepIcon = (stepId, status) => {
    const Icon = steps[stepId]?.icon || Phone;
    const color = status === 'completed' ? '#4CAF50' : 
                  status === 'current' ? '#E20074' : '#ccc';
    return <Icon size={16} color={color} />;
  };

  const isStepComplete = (stepId) => {
    switch (stepId) {
      case 0: // Welcome
        return customerData && customerData.firstName && customerData.lastName;
      case 1: // Voice Lines
        return quoteData.lines && quoteData.lines > 0 && 
               Object.keys(quoteData.plans || {}).length === quoteData.lines &&
               Object.keys(quoteData.devices || {}).length === quoteData.lines &&
               Object.keys(quoteData.protection || {}).length === quoteData.lines;
      case 2: // Tablet/Wearable
        return tabletWearableData !== null; // null means skipped, object means completed
      case 3: // Mobile Internet
        return mobileInternetData !== null; // null means skipped (completed), object means completed
      case 4: // Home Internet
        return homeInternetData !== null; // null means skipped (completed), object means completed
      case 5: // Promotions
        return Object.keys(quoteData.promotions || {}).length >= 0; // Promotions are optional
      case 6: // Discounts
        return quoteData.discounts && typeof quoteData.discounts === 'object';
      case 7: // Equipment Credit
        return quoteData.equipmentCredit && quoteData.equipmentCredit.trim() !== '';
      case 8: // Port-In
        return Object.keys(portInData || {}).length === quoteData.lines;
      case 9: // Summary
        return currentStep >= 9; // Complete when user reaches summary step
      default:
        return false;
    }
  };

  const calculatePromotionSavings = () => {
    let totalSavings = 0;
    
    // Process promotions for each line
    Object.entries(quoteData.promotions || {}).forEach(([lineIndex, promotionData]) => {
      if (!promotionData || !promotionData.promotionId) return;
      
      const promotionId = promotionData.promotionId;
      const deviceId = quoteData.devices?.[lineIndex];
      const planId = quoteData.plans?.[lineIndex];
      
      if (!deviceId || !planId) return;
      
      // Import promotions data
      const promotions = [
        {
          id: 'iphone-16-on-us',
          name: 'iPhone 16 On Us',
          eligibleDevices: ['iphone-16', 'iphone-16-plus', 'iphone-16-pro', 'iphone-16-pro-max'],
          redemption: {
            trade: {
              tiers: [
                { value: 830, devices: ['iphone-15', 'iphone-15-plus', 'iphone-15-pro', 'iphone-15-pro-max'] },
                { value: 415, devices: ['iphone-14', 'iphone-14-plus', 'iphone-13', 'iphone-13-pro'] }
              ]
            },
            ratePlan: ['more', 'beyond']
          }
        },
        {
          id: 'galaxy-s24-on-us',
          name: 'Galaxy S24 On Us',
          eligibleDevices: ['galaxy-s24', 'galaxy-s24-plus', 'galaxy-s24-ultra'],
          redemption: {
            trade: {
              tiers: [
                { value: 800, devices: ['galaxy-s23', 'galaxy-s23-plus', 'galaxy-s23-ultra'] },
                { value: 400, devices: ['galaxy-s22', 'galaxy-s22-plus', 'galaxy-s22-ultra'] }
              ]
            },
            ratePlan: ['more', 'beyond']
          }
        }
      ];
      
      const promotion = promotions.find(p => p.id === promotionId);
      if (!promotion) return;
      
      // Check if device is eligible
      if (!promotion.eligibleDevices.includes(deviceId)) return;
      
      // Check if plan is eligible
      if (!promotion.redemption.ratePlan.includes(planId)) return;
      
      // Calculate device price
      const deviceOptions = [
        { id: 'iphone-16', price: 799 },
        { id: 'iphone-16-plus', price: 899 },
        { id: 'iphone-16-pro', price: 999 },
        { id: 'iphone-16-pro-max', price: 1199 },
        { id: 'galaxy-s24', price: 799 },
        { id: 'galaxy-s24-plus', price: 899 },
        { id: 'galaxy-s24-ultra', price: 1299 }
      ];
      
      const device = deviceOptions.find(d => d.id === deviceId);
      if (!device) return;
      
      // For "On Us" promotions, the device becomes free (full device price as savings)
      if (promotionId.includes('on-us')) {
        totalSavings += device.price;
      }
      
      // For other promotion types, calculate based on promotion rules
      // This would need to be expanded based on specific promotion logic
    });
    
    return totalSavings;
  };

  const calculateTotalMonthly = () => {
    if (!quoteData.lines) return 0;
    
    // Import calculation functions from QuoteSummary logic
    const calculatePlanTotal = () => {
      let planTotal = 0;
      const planOptions = [
        { id: 'essentials', pricing: { 1: 50, 2: 80, 3: 90, 4: 100, 5: 120, 6: 135, additional: 35 }},
        { id: 'more', pricing: { 1: 85, 2: 140, 3: 140, 4: 170, 5: 200, 6: 230, additional: 35 }},
        { id: 'beyond', pricing: { 1: 100, 2: 170, 3: 170, 4: 215, 5: 260, 6: 305, additional: 35 }}
      ];

      // Voice line plans
      Object.values(quoteData.plans || {}).forEach(planId => {
        const plan = planOptions.find(p => p.id === planId);
        if (plan) {
          if (quoteData.lines <= 6) {
            planTotal += plan.pricing[quoteData.lines] || 0;
          } else {
            planTotal += plan.pricing[6] + (quoteData.lines - 6) * plan.pricing.additional;
          }
        }
      });
      
      // Tablet/Wearable plans
      if (tabletWearableData && tabletWearableData.lines) {
        const planPrices = {
          'tablet-unlimited': 20, 'tablet-2gb': 10, 'tablet-6gb': 15,
          'wearable-unlimited': 5, 'wearable-500mb': 5
        };
        
        for (let i = 0; i < tabletWearableData.lines; i++) {
          const planId = tabletWearableData.plans[i];
          planTotal += planPrices[planId] || 0;
        }
      }
      
      return planTotal;
    };

    const calculateDeviceTotal = () => {
      let deviceTotal = 0;
      
      // Voice line devices
      const voiceDeviceOptions = [
        { id: 'iphone-16', price: 999 },
        { id: 'iphone-16-plus', price: 1099 },
        { id: 'iphone-16-pro', price: 1199 },
        { id: 'iphone-16-pro-max', price: 1299 },
        { id: 'galaxy-s25', price: 999 },
        { id: 'galaxy-s25-plus', price: 1099 },
        { id: 'galaxy-s25-ultra', price: 1299 },
        { id: 'pixel-10-pro', price: 999 },
        { id: 'pixel-10-pro-xl', price: 1099 }
      ];

      Object.values(quoteData.devices || {}).forEach((deviceId, lineIndex) => {
        const device = voiceDeviceOptions.find(d => d.id === deviceId);
        if (device) {
          // Check if this line has a promotion that makes the device free
          const promotionData = quoteData.promotions?.[lineIndex];
          const isDeviceFree = promotionData && promotionData.promotionId && 
                              promotionData.promotionId.includes('on-us');
          
          if (!isDeviceFree) {
            deviceTotal += Math.ceil(device.price / 24); // Monthly payment
          }
          // If device is free due to promotion, don't add to monthly cost
        }
      });
      
      // Tablet/Wearable devices
      if (tabletWearableData && tabletWearableData.lines) {
        const tabletWearablePrices = {
          'ipad-10': 25, 'ipad-mini-7': 30, 'ipad-pro-11': 45, 'ipad-pro-13': 55,
          'galaxy-tab-a9': 20, 'galaxy-tab-s10-plus': 40, 'revvl-tab-5g': 15,
          'apple-watch-se-3-40mm': 15, 'apple-watch-se-3-44mm': 18,
          'apple-watch-11-42mm': 25, 'apple-watch-11-45mm': 28,
          'apple-watch-ultra-3': 35, 'galaxy-watch-8-40mm': 20,
          'galaxy-watch-8-44mm': 23, 'galaxy-watch-8-classic-46mm': 30,
          'galaxy-watch-ultra': 35, 'pixel-watch-3': 22, 'pixel-watch-4': 25
        };
        
        for (let i = 0; i < tabletWearableData.lines; i++) {
          const deviceId = tabletWearableData.devices[i];
          deviceTotal += tabletWearablePrices[deviceId] || 0;
        }
      }
      
      // Mobile Internet devices (all free, but included for completeness)
      if (mobileInternetData && mobileInternetData.devices) {
        deviceTotal += mobileInternetData.devices.length * 0; // All free
      }
      
      // Home Internet device (free, but included for completeness)
      if (homeInternetData && homeInternetData.device) {
        deviceTotal += 0; // Gateway is free
      }
      
      return deviceTotal;
    };

    const calculateProtectionTotal = () => {
      let protectionTotal = 0;
      const protectionPlans = [
        { id: 'p360-tier1', price: 7 },
        { id: 'p360-tier2', price: 9 },
        { id: 'p360-tier3', price: 13 },
        { id: 'p360-tier4', price: 16 },
        { id: 'p360-tier5', price: 18 },
        { id: 'p360-tier6', price: 25 }
      ];

      Object.values(quoteData.protection || {}).forEach(protectionId => {
        const protection = protectionPlans.find(p => p.id === protectionId);
        if (protection) {
          protectionTotal += protection.price;
        }
      });
      return protectionTotal;
    };

    const calculateAutoPaySavings = () => {
      return Math.min(quoteData.lines * 5, 40); // $5 per line, max $40
    };

    const calculateSeniorSavings = () => {
      if (!quoteData.discounts?.senior) return 0;
      const eligiblePlans = Object.values(quoteData.plans || {}).filter(planId => 
        ['essentials', 'more', 'beyond'].includes(planId)
      );
      return eligiblePlans.length * 10; // $10 per eligible plan
    };

    const calculateInsiderSavings = () => {
      if (!quoteData.discounts?.tmobileInsider) return 0;
      const eligiblePlans = Object.values(quoteData.plans || {}).filter(planId => 
        ['more', 'beyond'].includes(planId)
      );
      const eligibleTotal = eligiblePlans.reduce((total, planId) => {
        const planOptions = [
          { id: 'more', pricing: { 1: 85, 2: 140, 3: 140, 4: 170, 5: 200, 6: 230, additional: 35 }},
          { id: 'beyond', pricing: { 1: 100, 2: 170, 3: 170, 4: 215, 5: 260, 6: 305, additional: 35 }}
        ];
        const plan = planOptions.find(p => p.id === planId);
        if (plan) {
          if (quoteData.lines <= 6) {
            return total + (plan.pricing[quoteData.lines] || 0);
          } else {
            return total + plan.pricing[6] + (quoteData.lines - 6) * plan.pricing.additional;
          }
        }
        return total;
      }, 0);
      return Math.round(eligibleTotal * 0.2);
    };

    const calculateTaxesAndFees = () => {
      const serviceTotal = calculatePlanTotal() - calculateAutoPaySavings() - calculateSeniorSavings() - calculateInsiderSavings();
      return Math.round(serviceTotal * 0.1); // 10% estimate
    };

    const calculateTabletWearableTotal = () => {
      // This is now handled in calculateDeviceTotal()
      return 0;
    };

    const calculateMobileInternetTotal = () => {
      if (!mobileInternetData || !mobileInternetData.devices || !mobileInternetData.plans) return 0;
      
      let total = 0;
      
      // Add device costs (all devices are free)
      total += mobileInternetData.devices.length * 0;
      
      // Add plan costs
      const planPrices = {
        '15gb-plan': 20,
        '25gb-plan': 25,
        '100gb-plan': 50
      };
      
      mobileInternetData.plans.forEach(planId => {
        total += planPrices[planId] || 0;
      });
      
      return total;
    };

    const calculateHomeInternetTotal = () => {
      if (!homeInternetData || !homeInternetData.device || !homeInternetData.plans) return 0;
      
      let total = 0;
      
      // Add device cost (gateway is free)
      total += 0;
      
      // Add plan costs
      const planPrices = {
        'rely-home-internet': 50,
        'amplified-home-internet': 60,
        'all-in-home-internet': 70,
        'home-internet-backup': 20,
        'away-unlimited-plan': 160,
        'away-200gb-plan': 110
      };
      
      homeInternetData.plans.forEach(planId => {
        total += planPrices[planId] || 0;
      });
      
      return total;
    };

    const calculateMonthlyFinancing = () => {
      let financingTotal = 0;
      
      // Calculate financing for voice line devices
      Object.values(quoteData.devices || {}).forEach((deviceId, lineIndex) => {
        const device = [
          { id: 'iphone-16', price: 999 },
          { id: 'iphone-16-plus', price: 1099 },
          { id: 'iphone-16-pro', price: 1199 },
          { id: 'iphone-16-pro-max', price: 1299 },
          { id: 'galaxy-s25', price: 999 },
          { id: 'galaxy-s25-plus', price: 1099 },
          { id: 'galaxy-s25-ultra', price: 1299 },
          { id: 'pixel-10-pro', price: 999 },
          { id: 'pixel-10-pro-xl', price: 1099 }
        ].find(d => d.id === deviceId);
        
        if (device) {
          // Check if this line has a promotion that makes the device free
          const promotionData = quoteData.promotions?.[lineIndex];
          const isDeviceFree = promotionData && promotionData.promotionId && 
                              promotionData.promotionId.includes('on-us');
          
          if (!isDeviceFree) {
            // Get equipment credit for this line
            const equipmentCredit = parseFloat(quoteData.equipmentCredit) || 0;
            const tradeInValue = parseFloat(quoteData.tradeIns?.[lineIndex]) || 0;
            const downPayment = parseFloat(quoteData.downPayment) || 0;
            
            // Calculate amount to be financed
            const devicePrice = device.price;
            const ecCredit = equipmentCredit; // Total EC available
            const ecMonthlyCredit = ecCredit / 24; // Monthly EC credit
            
            // Amount financed = device price - EC credit - trade-in - down payment
            const amountFinanced = Math.max(0, devicePrice - ecCredit - tradeInValue - downPayment);
            
            // Monthly payment = amount financed / 24 months
            const monthlyPayment = Math.ceil(amountFinanced / 24);
            
            financingTotal += monthlyPayment;
          }
          // If device is free due to promotion, no financing needed
        }
      });
      
      return financingTotal;
    };

    const subtotal = calculatePlanTotal() + calculateProtectionTotal() + calculateMonthlyFinancing() + calculateTabletWearableTotal() + calculateMobileInternetTotal() + calculateHomeInternetTotal();
    const discounts = calculateAutoPaySavings() + calculateSeniorSavings() + calculateInsiderSavings();
    const taxesAndFees = calculateTaxesAndFees();
    
    return subtotal - discounts + taxesAndFees;
  };

  const getDeviceName = (deviceId) => {
    const devices = [
      { id: 'iphone-16', name: 'iPhone 16' },
      { id: 'iphone-16-plus', name: 'iPhone 16 Plus' },
      { id: 'iphone-16-pro', name: 'iPhone 16 Pro' },
      { id: 'iphone-16-pro-max', name: 'iPhone 16 Pro Max' },
      { id: 'galaxy-s25', name: 'Galaxy S25' },
      { id: 'galaxy-s25-plus', name: 'Galaxy S25+' },
      { id: 'galaxy-s25-ultra', name: 'Galaxy S25 Ultra' },
      { id: 'pixel-10-pro', name: 'Pixel 10 Pro' },
      { id: 'pixel-10-pro-xl', name: 'Pixel 10 Pro XL' }
    ];
    return devices.find(d => d.id === deviceId);
  };

  const getProtectionName = (protectionId) => {
    const protectionPlans = [
      { id: 'p360-tier1', name: 'P360 Tier 1' },
      { id: 'p360-tier2', name: 'P360 Tier 2' },
      { id: 'p360-tier3', name: 'P360 Tier 3' },
      { id: 'p360-tier4', name: 'P360 Tier 4' },
      { id: 'p360-tier5', name: 'P360 Tier 5' },
      { id: 'p360-tier6', name: 'P360 Tier 6' }
    ];
    return protectionPlans.find(p => p.id === protectionId);
  };

  const getCompletionPercentage = () => {
    const completedSteps = steps.filter((_, index) => isStepComplete(index)).length;
    return Math.round((completedSteps / steps.length) * 100);
  };

  const isFlowComplete = () => {
    return getCompletionPercentage() === 100;
  };

  const renderCartContent = () => (
    <>
      {/* Progress Bar */}
      <div style={{
        background: '#f0f0f0',
        borderRadius: '6px',
        height: '6px',
        marginBottom: '10px',
        overflow: 'hidden'
      }}>
        <div style={{
          height: '100%',
          background: isFlowComplete() ? '#4CAF50' : '#E20074',
          width: `${getCompletionPercentage()}%`,
          transition: 'width 0.3s ease'
        }} />
      </div>

      {/* Progress Text */}
      <div style={{
        marginBottom: '15px',
        textAlign: 'center'
      }}>
        <div style={{
          fontSize: '16px',
          fontWeight: '600',
          color: '#333',
          marginBottom: '3px'
        }}>
          {isFlowComplete() ? '✅ Quote Complete!' : `${getCompletionPercentage()}% Complete`}
        </div>
      </div>

      {/* Steps List */}
      <div style={{
        flex: 1,
        overflowY: 'auto',
        padding: '5px 0'
      }}>
        {steps.map((step, index) => {
          const status = getStepStatus(index);
          const isCurrent = index === currentStep;
          const isComplete = isStepComplete(index);
          
          return (
            <div key={index} style={{
              display: 'flex',
              alignItems: 'center',
              padding: '8px 12px',
              marginBottom: '6px',
              borderRadius: '6px',
              background: isComplete ? '#4CAF50' : isCurrent ? '#E20074' : '#f0f0f0',
              color: isComplete || isCurrent ? 'white' : '#666'
            }}>
              <div style={{ marginRight: '12px' }}>
                {isComplete ? <CheckCircle size={14} /> : getStepIcon(index, status)}
              </div>
              <div style={{ flex: 1 }}>
                <div style={{
                  fontSize: '11px',
                  fontWeight: '500',
                  color: isCurrent ? '#E20074' : isComplete ? '#333' : '#666'
                }}>
                  {step.title}
                </div>
                {index === 0 && customerData && (
                  <div style={{ fontSize: '10px', color: '#666', marginTop: '1px' }}>
                    {customerData.firstName} {customerData.lastName}
                  </div>
                )}
                {index === 1 && quoteData.lines && (
                  <div style={{ fontSize: '10px', color: '#666', marginTop: '1px' }}>
                    {quoteData.lines} voice line{quoteData.lines > 1 ? 's' : ''} configured
                  </div>
                )}
                {index === 2 && tabletWearableData && (
                  <div style={{ fontSize: '10px', color: '#666', marginTop: '1px' }}>
                    {tabletWearableData.lines} tablet/wearable{tabletWearableData.lines > 1 ? 's' : ''} added
                  </div>
                )}
                {index === 2 && tabletWearableData === null && (
                  <div style={{ fontSize: '10px', color: '#999', marginTop: '1px' }}>
                    Skipped
                  </div>
                )}
                {index === 3 && mobileInternetData && mobileInternetData.devices && (
                  <div style={{ fontSize: '10px', color: '#666', marginTop: '1px' }}>
                    {mobileInternetData.devices.length} hotspot device{mobileInternetData.devices.length > 1 ? 's' : ''}
                  </div>
                )}
                {index === 3 && mobileInternetData === null && (
                  <div style={{ fontSize: '10px', color: '#4CAF50', marginTop: '1px', fontWeight: '500' }}>
                    ✓ Skipped (Optional)
                  </div>
                )}
                {index === 4 && homeInternetData && homeInternetData.device && (
                  <div style={{ fontSize: '10px', color: '#666', marginTop: '1px' }}>
                    Gateway + {homeInternetData.plans?.length || 0} plan{homeInternetData.plans?.length > 1 ? 's' : ''}
                  </div>
                )}
                {index === 4 && homeInternetData === null && (
                  <div style={{ fontSize: '10px', color: '#4CAF50', marginTop: '1px', fontWeight: '500' }}>
                    ✓ Skipped (Optional)
                  </div>
                )}
              </div>
              {!isComplete && !isCurrent && (
                <AlertCircle size={14} color="#E20074" />
              )}
            </div>
          );
        })}
      </div>

      {/* Promotion Savings */}
      {calculatePromotionSavings() > 0 && (
        <div style={{
          background: '#e8f5e8',
          padding: '8px',
          borderRadius: '6px',
          marginTop: '8px',
          border: '1px solid #4CAF50'
        }}>
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: '4px'
          }}>
            <span style={{ fontSize: '11px', fontWeight: '600', color: '#2E7D32' }}>
              Promotion Savings
            </span>
            <span style={{ fontSize: '14px', fontWeight: '700', color: '#4CAF50' }}>
              -${Math.ceil(calculatePromotionSavings() / 24)}/mo
            </span>
          </div>
          <div style={{ fontSize: '9px', color: '#2E7D32', textAlign: 'center' }}>
            Device(s) free with qualifying trade-in
          </div>
        </div>
      )}

      {/* Estimated Total */}
      <div style={{
        background: '#f8f9fa',
        padding: '10px',
        borderRadius: '6px',
        marginTop: '10px',
        border: '1px solid #e0e0e0'
      }}>
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '6px'
        }}>
          <span style={{ fontSize: '12px', fontWeight: '600', color: '#333' }}>
            Estimated Monthly
          </span>
          <span style={{ fontSize: '16px', fontWeight: '700', color: '#E20074' }}>
            ${calculateTotalMonthly()}
          </span>
        </div>
        <div style={{ fontSize: '10px', color: '#666', textAlign: 'center' }}>
          {isFlowComplete() ? 'Final quote ready!' : 'Complete all steps for accurate pricing'}
        </div>
      </div>

      {/* Completion Messages */}
      {isFlowComplete() && (
        <div style={{
          background: '#d4edda',
          color: '#155724',
          padding: '12px',
          borderRadius: '8px',
          marginTop: '15px',
          fontSize: '14px',
          textAlign: 'center',
          border: '1px solid #c3e6cb'
        }}>
          🎉 Your quote is ready! All steps completed successfully.
        </div>
      )}
      
      {!isFlowComplete() && (
        <div style={{
          background: '#f8f9fa',
          color: '#856404',
          padding: '8px 12px',
          borderRadius: '6px',
          fontSize: '12px',
          textAlign: 'center'
        }}>
          Complete all steps to generate quote
        </div>
      )}
    </>
  );

  // Mobile collapsed view
  if (isMobile && isCollapsed) {
    return (
      <div style={{
        position: 'fixed',
        bottom: '20px',
        right: '20px',
        zIndex: 1000
      }}>
        <button
          onClick={() => setIsCollapsed(false)}
          style={{
            background: '#E20074',
            color: 'white',
            border: 'none',
            borderRadius: '50px',
            padding: '12px 16px',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            boxShadow: '0 4px 16px rgba(226, 0, 116, 0.3)',
            cursor: 'pointer',
            fontSize: '14px',
            fontWeight: '600'
          }}
        >
          <ShoppingCart size={18} />
          <span>{getCompletionPercentage()}%</span>
          <ChevronUp size={16} />
        </button>
      </div>
    );
  }

  // Mobile expanded view
  if (isMobile && !isCollapsed) {
    return (
      <div style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: 'rgba(0,0,0,0.5)',
        zIndex: 1000,
        display: 'flex',
        alignItems: 'flex-end'
      }}>
        <div style={{
          width: '100%',
          background: 'white',
          borderRadius: '20px 20px 0 0',
          maxHeight: '80vh',
          overflow: 'hidden',
          display: 'flex',
          flexDirection: 'column'
        }}>
          {/* Mobile Header */}
          <div style={{
            background: '#E20074',
            color: 'white',
            padding: '20px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            borderRadius: '20px 20px 0 0'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <ShoppingCart size={20} />
              <span style={{ fontSize: '18px', fontWeight: '600' }}>Quote Progress</span>
            </div>
            <button
              onClick={() => setIsCollapsed(true)}
              style={{
                background: 'transparent',
                border: 'none',
                color: 'white',
                cursor: 'pointer',
                padding: '4px'
              }}
            >
              <X size={24} />
            </button>
          </div>
          
          {/* Mobile Content */}
          <div style={{ flex: 1, overflowY: 'auto', padding: '20px' }}>
            {renderCartContent()}
          </div>
        </div>
      </div>
    );
  }

  // Desktop view
  return (
    <div style={{
      position: 'fixed',
      right: '15px',
      top: '120px',
      width: '280px',
      background: 'white',
      borderRadius: '8px',
      boxShadow: '0 4px 16px rgba(0,0,0,0.1)',
      border: '1px solid #e0e0e0',
      zIndex: 1000,
      maxHeight: 'calc(100vh - 140px)',
      overflow: 'hidden',
      display: isMobile ? 'none' : 'flex', // Hide on mobile
      flexDirection: 'column'
    }}>
      {/* Header */}
      <div style={{
        background: '#E20074',
        color: 'white',
        padding: '10px 15px',
        display: 'flex',
        alignItems: 'center',
        gap: '8px'
      }}>
        <ShoppingCart size={18} />
        <span style={{ fontWeight: '600', fontSize: '14px' }}>Quote Cart</span>
        <div style={{
          marginLeft: 'auto',
          background: 'rgba(255,255,255,0.2)',
          padding: '3px 6px',
          borderRadius: '10px',
          fontSize: '11px'
        }}>
          {getCompletionPercentage()}%
        </div>
        <button
          onClick={() => setIsCollapsed(!isCollapsed)}
          style={{
            background: 'transparent',
            border: 'none',
            color: 'white',
            cursor: 'pointer',
            padding: '2px',
            borderRadius: '3px',
            display: 'flex',
            alignItems: 'center'
          }}
        >
          {isCollapsed ? <ChevronDown size={14} /> : <ChevronUp size={14} />}
        </button>
      </div>

      {/* Content */}
      {!isCollapsed && (
        <div style={{ flex: 1, overflowY: 'auto', padding: '12px' }}>
          {renderCartContent()}
        </div>
      )}
    </div>
  );
};

export default SidebarCart;