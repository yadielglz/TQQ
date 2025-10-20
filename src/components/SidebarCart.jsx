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
  quoteData, 
  portInData,
  steps 
}) => {
  const [isMobile, setIsMobile] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(true);

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
      case 0: // Customer Info
        return customerData && customerData.firstName && customerData.lastName;
      case 1: // Lines
        return quoteData.lines && quoteData.lines > 0;
      case 2: // Plans
        return Object.keys(quoteData.plans || {}).length === quoteData.lines;
      case 3: // Devices
        return Object.keys(quoteData.devices || {}).length === quoteData.lines;
      case 4: // Tablet/Wearable
        return tabletWearableData !== null; // null means skipped, object means completed
      case 5: // Protection
        return Object.keys(quoteData.protection || {}).length === quoteData.lines;
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
      return planTotal;
    };

    const calculateDeviceTotal = () => {
      let deviceTotal = 0;
      const deviceOptions = [
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

      Object.values(quoteData.devices || {}).forEach(deviceId => {
        const device = deviceOptions.find(d => d.id === deviceId);
        if (device) {
          deviceTotal += Math.ceil(device.price / 24); // Monthly payment
        }
      });
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

    const calculateMonthlyFinancing = () => {
      return parseFloat(quoteData.monthlyFinancing) || 0;
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
      if (!tabletWearableData || !tabletWearableData.lines) return 0;
      
      let total = 0;
      for (let i = 0; i < tabletWearableData.lines; i++) {
        const deviceId = tabletWearableData.devices[i];
        const planId = tabletWearableData.plans[i];
        
        // Device monthly costs (simplified pricing)
        const devicePrices = {
          'ipad-10': 25, 'ipad-mini-7': 30, 'ipad-pro-11': 45, 'ipad-pro-13': 55,
          'galaxy-tab-a9': 20, 'galaxy-tab-s10-plus': 40, 'revvl-tab-5g': 15,
          'apple-watch-se-3-40mm': 15, 'apple-watch-se-3-44mm': 18,
          'apple-watch-11-42mm': 25, 'apple-watch-11-45mm': 28,
          'apple-watch-ultra-3': 35, 'galaxy-watch-8-40mm': 20,
          'galaxy-watch-8-44mm': 23, 'galaxy-watch-8-classic-46mm': 30,
          'galaxy-watch-ultra': 35, 'pixel-watch-3': 22, 'pixel-watch-4': 25
        };
        
        // Plan costs
        const planPrices = {
          'tablet-unlimited': 20, 'tablet-2gb': 10, 'tablet-6gb': 15,
          'wearable-unlimited': 5, 'wearable-500mb': 5
        };
        
        total += (devicePrices[deviceId] || 0) + (planPrices[planId] || 0);
        
        // Add protection if selected
        if (tabletWearableData.protection && tabletWearableData.protection[i]) {
          const protectionPrices = {
            'ipad-10': 7, 'ipad-mini-7': 7, 'ipad-pro-11': 13, 'ipad-pro-13': 16,
            'galaxy-tab-a9': 7, 'galaxy-tab-s10-plus': 13, 'revvl-tab-5g': 7,
            'apple-watch-se-3-40mm': 7, 'apple-watch-se-3-44mm': 7,
            'apple-watch-11-42mm': 9, 'apple-watch-11-45mm': 9,
            'apple-watch-ultra-3': 13, 'galaxy-watch-8-40mm': 7,
            'galaxy-watch-8-44mm': 7, 'galaxy-watch-8-classic-46mm': 9,
            'galaxy-watch-ultra': 13, 'pixel-watch-3': 7, 'pixel-watch-4': 7
          };
          total += protectionPrices[deviceId] || 7;
        }
      }
      return total;
    };

    const subtotal = calculatePlanTotal() + calculateDeviceTotal() + calculateProtectionTotal() + calculateMonthlyFinancing() + calculateTabletWearableTotal();
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
        borderRadius: '8px',
        height: '8px',
        marginBottom: '15px',
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
        marginBottom: '20px',
        textAlign: 'center'
      }}>
        <div style={{
          fontSize: '18px',
          fontWeight: '600',
          color: '#333',
          marginBottom: '4px'
        }}>
          {isFlowComplete() ? '✅ Quote Complete!' : `${getCompletionPercentage()}% Complete`}
        </div>
      </div>

      {/* Steps List */}
      <div style={{
        flex: 1,
        overflowY: 'auto',
        padding: '10px 0'
      }}>
        {steps.map((step, index) => {
          const status = getStepStatus(index);
          const isCurrent = index === currentStep;
          const isComplete = isStepComplete(index);
          
          return (
            <div key={index} style={{
              display: 'flex',
              alignItems: 'center',
              padding: '12px 16px',
              marginBottom: '8px',
              borderRadius: '8px',
              background: isComplete ? '#4CAF50' : isCurrent ? '#E20074' : '#f0f0f0',
              color: isComplete || isCurrent ? 'white' : '#666'
            }}>
              <div style={{ marginRight: '12px' }}>
                {isComplete ? <CheckCircle size={14} /> : getStepIcon(index, status)}
              </div>
              <div style={{ flex: 1 }}>
                <div style={{
                  fontSize: '14px',
                  fontWeight: '500',
                  color: isCurrent ? '#E20074' : isComplete ? '#333' : '#666'
                }}>
                  {step.title}
                </div>
                {index === 0 && customerData && (
                  <div style={{ fontSize: '12px', color: '#666', marginTop: '2px' }}>
                    {customerData.firstName} {customerData.lastName}
                  </div>
                )}
                {index === 1 && quoteData.lines && (
                  <div style={{ fontSize: '12px', color: '#666', marginTop: '2px' }}>
                    {quoteData.lines} line{quoteData.lines > 1 ? 's' : ''}
                  </div>
                )}
                {index === 2 && Object.keys(quoteData.plans || {}).length > 0 && (
                  <div style={{ fontSize: '12px', color: '#666', marginTop: '2px' }}>
                    {Object.keys(quoteData.plans).length} plan{Object.keys(quoteData.plans).length > 1 ? 's' : ''} selected
                  </div>
                )}
                {index === 3 && Object.keys(quoteData.devices || {}).length > 0 && (
                  <div style={{ fontSize: '12px', color: '#666', marginTop: '2px' }}>
                    {Object.keys(quoteData.devices).length} device{Object.keys(quoteData.devices).length > 1 ? 's' : ''} selected
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

      {/* Estimated Total */}
      <div style={{
        background: '#f8f9fa',
        padding: '15px',
        borderRadius: '8px',
        marginTop: '15px',
        border: '1px solid #e0e0e0'
      }}>
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '8px'
        }}>
          <span style={{ fontSize: '14px', fontWeight: '600', color: '#333' }}>
            Estimated Monthly
          </span>
          <span style={{ fontSize: '18px', fontWeight: '700', color: '#E20074' }}>
            ${calculateTotalMonthly()}
          </span>
        </div>
        <div style={{ fontSize: '12px', color: '#666', textAlign: 'center' }}>
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
      right: '20px',
      top: '50%',
      transform: 'translateY(-50%)',
      width: '320px',
      background: 'white',
      borderRadius: '12px',
      boxShadow: '0 8px 32px rgba(0,0,0,0.1)',
      border: '1px solid #e0e0e0',
      zIndex: 1000,
      maxHeight: '80vh',
      overflow: 'hidden',
      display: 'flex',
      flexDirection: 'column'
    }}>
      {/* Header */}
      <div style={{
        background: '#E20074',
        color: 'white',
        padding: '15px 20px',
        display: 'flex',
        alignItems: 'center',
        gap: '10px'
      }}>
        <ShoppingCart size={20} />
        <span style={{ fontWeight: '600', fontSize: '16px' }}>Quote Cart</span>
        <div style={{
          marginLeft: 'auto',
          background: 'rgba(255,255,255,0.2)',
          padding: '4px 8px',
          borderRadius: '12px',
          fontSize: '12px'
        }}>
          {getCompletionPercentage()}%
        </div>
      </div>

      {/* Content */}
      <div style={{ flex: 1, overflowY: 'auto', padding: '20px' }}>
        {renderCartContent()}
      </div>
    </div>
  );
};

export default SidebarCart;