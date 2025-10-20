import React from 'react';
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
  Watch
} from 'lucide-react';

const SidebarCart = ({ 
  currentStep, 
  customerData, 
  tabletWearableData, 
  quoteData, 
  portInData,
  steps 
}) => {
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
          const pricing = plan.pricing;
          if (quoteData.lines <= 6) {
            planTotal += pricing[quoteData.lines] || 0;
          } else {
            planTotal += pricing[6] + ((quoteData.lines - 6) * pricing.additional);
          }
        }
      });
      return planTotal;
    };

    const calculateDeviceTotal = () => {
      let total = 0;
      Object.values(quoteData.devices || {}).forEach(deviceId => {
        const device = getDeviceById(deviceId);
        if (device) {
          const tradeInValue = quoteData.tradeIns && quoteData.tradeIns[deviceId] ? 
            parseFloat(quoteData.tradeIns[deviceId]) || 0 : 0;
          const netPrice = device.price - tradeInValue;
          const monthlyPayment = Math.max(0, Math.ceil(netPrice / 24));
          total += monthlyPayment;
        }
      });
      return total;
    };

    const calculateProtectionTotal = () => {
      let total = 0;
      Object.values(quoteData.protection || {}).forEach(protectionId => {
        if (protectionId && protectionId !== 'none') {
          const protection = getProtectionById(protectionId);
          if (protection) total += protection.price;
        }
      });
      return total;
    };

    const calculateMonthlyFinancing = () => {
      return parseFloat(quoteData.monthlyFinancing) || 0;
    };

    const calculateAutoPaySavings = () => {
      if (!quoteData.discounts?.autoPay) return 0;
      return Math.min(quoteData.lines * 5, 40); // $5 per line, max $40
    };

    const calculateSeniorSavings = () => {
      if (!quoteData.discounts?.senior55) return 0;
      return quoteData.lines <= 2 ? quoteData.lines * 5 : 0; // $5 per line for 1-2 lines only
    };

    const calculateInsiderSavings = () => {
      if (!quoteData.discounts?.tmobileInsider) return 0;
      // 20% discount on More or Beyond plans only
      let eligibleTotal = 0;
      Object.values(quoteData.plans || {}).forEach(planId => {
        if (planId === 'more' || planId === 'beyond') {
          const planOptions = [
            { id: 'more', pricing: { 1: 85, 2: 140, 3: 140, 4: 170, 5: 200, 6: 230, additional: 35 }},
            { id: 'beyond', pricing: { 1: 100, 2: 170, 3: 170, 4: 215, 5: 260, 6: 305, additional: 35 }}
          ];
          const plan = planOptions.find(p => p.id === planId);
          if (plan) {
            const pricing = plan.pricing;
            if (quoteData.lines <= 6) {
              eligibleTotal += pricing[quoteData.lines] || 0;
            } else {
              eligibleTotal += pricing[6] + ((quoteData.lines - 6) * pricing.additional);
            }
          }
        }
      });
      return Math.round(eligibleTotal * 0.2);
    };

    const calculateTaxesAndFees = () => {
      // Estimate taxes and fees (typically 8-12% of service charges)
      const serviceTotal = calculatePlanTotal() + calculateDeviceTotal() + calculateProtectionTotal();
      return Math.round(serviceTotal * 0.1); // 10% estimate
    };

    // Calculate total monthly (same logic as QuoteSummary)
    const subtotal = calculatePlanTotal() + calculateDeviceTotal() + calculateProtectionTotal() + calculateMonthlyFinancing();
    const discounts = calculateAutoPaySavings() + calculateSeniorSavings() + calculateInsiderSavings();
    const taxesAndFees = calculateTaxesAndFees();
    
    return subtotal - discounts + taxesAndFees;
  };

  // Helper functions
  const getDeviceById = (deviceId) => {
    const devices = [
      // Google
      { id: 'pixel-10-pro-xl', name: 'Pixel 10 Pro XL', price: 1099 },
      { id: 'pixel-10-pro', name: 'Pixel 10 Pro', price: 999 },
      { id: 'pixel-10', name: 'Pixel 10', price: 699 },
      { id: 'pixel-9a', name: 'Pixel 9A', price: 499 },
      // Samsung
      { id: 'galaxy-a36', name: 'Galaxy A36', price: 299 },
      { id: 'galaxy-s25-fe', name: 'Galaxy S25 FE', price: 699 },
      { id: 'galaxy-s25-plus', name: 'Galaxy S25+', price: 999 },
      { id: 'galaxy-s25', name: 'Galaxy S25', price: 799 },
      { id: 'galaxy-s25-ultra', name: 'Galaxy S25 Ultra', price: 1299 },
      { id: 'galaxy-s25-edge', name: 'Galaxy S25 Edge', price: 899 },
      { id: 'galaxy-z-flip-7', name: 'Galaxy Z Flip 7', price: 999 },
      { id: 'galaxy-z-fold-7', name: 'Galaxy Z Fold 7', price: 1799 },
      // Apple
      { id: 'iphone-15', name: 'iPhone 15', price: 799 },
      { id: 'iphone-16', name: 'iPhone 16', price: 799 },
      { id: 'iphone-16-plus', name: 'iPhone 16 Plus', price: 899 },
      { id: 'iphone-16-pro', name: 'iPhone 16 Pro', price: 999 },
      { id: 'iphone-16-pro-max', name: 'iPhone 16 Pro Max', price: 1199 },
      { id: 'iphone-16e', name: 'iPhone 16e', price: 599 },
      { id: 'iphone-17', name: 'iPhone 17', price: 899 },
      { id: 'iphone-17-pro', name: 'iPhone 17 Pro', price: 1099 },
      { id: 'iphone-17-pro-max', name: 'iPhone 17 Pro Max', price: 1299 },
      { id: 'iphone-air', name: 'iPhone Air', price: 699 },
      // Motorola
      { id: 'edge-2025', name: 'Edge 2025', price: 599 },
      { id: 'g-power-2025', name: 'G Power 2025', price: 299 },
      { id: 'g-2025', name: 'G 2025', price: 199 },
      { id: 'razr-2025', name: 'Razr 2025', price: 699 },
      { id: 'razr-plus-2025', name: 'Razr+ 2025', price: 999 },
      { id: 'razr-ultra-2025', name: 'Razr Ultra 2025', price: 1299 },
      // Revvl
      { id: 'revvl-pro-8', name: 'Revvl Pro 8', price: 199 }
    ];
    return devices.find(d => d.id === deviceId);
  };

  const getProtectionById = (protectionId) => {
    const protectionPlans = [
      { id: 'p360-tier-1', name: 'P360 Tier 1', price: 7 },
      { id: 'p360-tier-2', name: 'P360 Tier 2', price: 9 },
      { id: 'p360-tier-3', name: 'P360 Tier 3', price: 13 },
      { id: 'p360-tier-4', name: 'P360 Tier 4', price: 16 },
      { id: 'p360-tier-5', name: 'P360 Tier 5', price: 18 },
      { id: 'p360-tier-6', name: 'P360 Tier 6', price: 25 }
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

      {/* Progress Bar */}
      <div style={{
        padding: '15px 20px',
        background: '#f8f9fa',
        borderBottom: '1px solid #e0e0e0'
      }}>
        <div style={{
          width: '100%',
          height: '6px',
          background: '#e0e0e0',
          borderRadius: '3px',
          overflow: 'hidden'
        }}>
          <div style={{
            width: `${getCompletionPercentage()}%`,
            height: '100%',
            background: isFlowComplete() ? '#4CAF50' : '#E20074',
            transition: 'width 0.3s ease'
          }} />
        </div>
        <div style={{
          marginTop: '8px',
          fontSize: '12px',
          color: '#666',
          textAlign: 'center'
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
          const isComplete = isStepComplete(index);
          const isCurrent = status === 'current';
          
          return (
            <div key={index} style={{
              padding: '12px 20px',
              borderLeft: isCurrent ? '3px solid #E20074' : '3px solid transparent',
              background: isCurrent ? 'rgba(226, 0, 116, 0.05)' : 'transparent',
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              cursor: 'pointer',
              transition: 'all 0.2s ease'
            }}>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: '24px',
                height: '24px',
                borderRadius: '50%',
                background: isComplete ? '#4CAF50' : isCurrent ? '#E20074' : '#f0f0f0',
                color: isComplete || isCurrent ? 'white' : '#666'
              }}>
                {isComplete ? <CheckCircle size={14} /> : getStepIcon(index, status)}
              </div>
              
              <div style={{ flex: 1 }}>
                <div style={{
                  fontSize: '14px',
                  fontWeight: isCurrent ? '600' : '500',
                  color: isCurrent ? '#E20074' : isComplete ? '#333' : '#666'
                }}>
                  {step.title}
                </div>
                
                {/* Step-specific details */}
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
                
                {index === 4 && tabletWearableData && (
                  <div style={{ fontSize: '12px', color: '#666', marginTop: '2px' }}>
                    {tabletWearableData.category} ({tabletWearableData.lines} lines)
                  </div>
                )}
                
                {index === 5 && Object.keys(quoteData.protection || {}).length > 0 && (
                  <div style={{ fontSize: '12px', color: '#666', marginTop: '2px' }}>
                    {Object.values(quoteData.protection).filter(Boolean).length} protection plan{Object.values(quoteData.protection).filter(Boolean).length > 1 ? 's' : ''}
                  </div>
                )}
                
                {index === 6 && quoteData.discounts && (
                  <div style={{ fontSize: '12px', color: '#666', marginTop: '2px' }}>
                    {Object.values(quoteData.discounts).filter(Boolean).length} discount{Object.values(quoteData.discounts).filter(Boolean).length > 1 ? 's' : ''} applied
                  </div>
                )}
                
                {index === 7 && quoteData.equipmentCredit && (
                  <div style={{ fontSize: '12px', color: '#666', marginTop: '2px' }}>
                    EC: ${quoteData.equipmentCredit}
                  </div>
                )}
                
                {index === 8 && Object.keys(portInData || {}).length > 0 && (
                  <div style={{ fontSize: '12px', color: '#666', marginTop: '2px' }}>
                    {Object.values(portInData).filter(data => data.type === 'port-in').length} port-in{Object.values(portInData).filter(data => data.type === 'port-in').length > 1 ? 's' : ''}
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

      {/* Summary Footer */}
      <div style={{
        padding: '15px 20px',
        background: '#f8f9fa',
        borderTop: '1px solid #e0e0e0'
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
          <span style={{ fontSize: '16px', fontWeight: '700', color: '#E20074' }}>
            ${calculateTotalMonthly()}/mo
          </span>
        </div>
        
        {isFlowComplete() && (
          <div style={{
            background: '#d4edda',
            color: '#155724',
            padding: '8px 12px',
            borderRadius: '6px',
            fontSize: '12px',
            textAlign: 'center',
            fontWeight: '600'
          }}>
            🎉 Ready for Summary!
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
      </div>
    </div>
  );
};

export default SidebarCart;
