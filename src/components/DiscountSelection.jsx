import React, { useState } from 'react';
import { Percent, CreditCard, Users, ArrowRight, ArrowLeft } from 'lucide-react';

const DiscountSelection = ({ 
  data, 
  onDataChange, 
  voiceLinesData, 
  dataLinesData, 
  iotLinesData, 
  homeInternetData, 
  onNext, 
  onPrev 
}) => {
  const [discounts, setDiscounts] = useState(data || {
    autoPay: false,
    senior55: false,
    tmobileInsider: false
  });

  const handleDiscountChange = (discountType, value) => {
    const newDiscounts = { ...discounts, [discountType]: value };
    setDiscounts(newDiscounts);
    onDataChange(newDiscounts);
  };

  const calculateAutoPaySavings = () => {
    if (!discounts.autoPay) return 0;
    
    let totalLines = 0;
    
    // Count voice lines
    if (voiceLinesData?.quantity) {
      totalLines += voiceLinesData.quantity;
    }
    
    // Count data lines
    if (dataLinesData?.quantity) {
      totalLines += dataLinesData.quantity;
    }
    
    // Count IoT lines
    if (iotLinesData?.quantity) {
      totalLines += iotLinesData.quantity;
    }
    
    // Auto Pay discount: $5 per line up to 8 lines
    return Math.min(totalLines, 8) * 5;
  };

  const calculateSeniorSavings = () => {
    if (!discounts.senior55) return 0;
    
    let totalSavings = 0;
    
    // Senior discount applies to voice plans only (not devices/protection)
    if (voiceLinesData?.plans && Object.keys(voiceLinesData.plans).length > 0) {
      const planOptions = [
        { id: 'essentials', pricing: { 1: 50, 2: 80, 3: 90, 4: 100, 5: 120, 6: 135, additional: 35 }},
        { id: 'more', pricing: { 1: 85, 2: 140, 3: 140, 4: 170, 5: 200, 6: 230, additional: 35 }},
        { id: 'beyond', pricing: { 1: 100, 2: 170, 3: 170, 4: 215, 5: 260, 6: 305, additional: 35 }}
      ];
      
      // Get the first plan (assuming all lines are on the same plan for family plans)
      const firstPlanId = Object.values(voiceLinesData.plans)[0];
      const plan = planOptions.find(p => p.id === firstPlanId);
      if (plan) {
        // Senior discount: 20% off plan cost
        const lines = voiceLinesData.quantity || 1;
        let planCost = 0;
        if (lines <= 6) {
          planCost = plan.pricing[lines] || 0;
        } else {
          planCost = plan.pricing[6] + (lines - 6) * plan.pricing.additional;
        }
        totalSavings += planCost * 0.2;
      }
    }
    
    return totalSavings;
  };

  const calculateInsiderSavings = () => {
    if (!discounts.tmobileInsider) return 0;
    
    let totalSavings = 0;
    
    // Insider discount applies to all services
    if (voiceLinesData?.plans && Object.keys(voiceLinesData.plans).length > 0) {
      const planOptions = [
        { id: 'essentials', pricing: { 1: 50, 2: 80, 3: 90, 4: 100, 5: 120, 6: 135, additional: 35 }},
        { id: 'more', pricing: { 1: 85, 2: 140, 3: 140, 4: 170, 5: 200, 6: 230, additional: 35 }},
        { id: 'beyond', pricing: { 1: 100, 2: 170, 3: 170, 4: 215, 5: 260, 6: 305, additional: 35 }}
      ];
      
      // Get the first plan (assuming all lines are on the same plan for family plans)
      const firstPlanId = Object.values(voiceLinesData.plans)[0];
      const plan = planOptions.find(p => p.id === firstPlanId);
      if (plan) {
        // Insider discount: 15% off plan cost
        const lines = voiceLinesData.quantity || 1;
        let planCost = 0;
        if (lines <= 6) {
          planCost = plan.pricing[lines] || 0;
        } else {
          planCost = plan.pricing[6] + (lines - 6) * plan.pricing.additional;
        }
        totalSavings += planCost * 0.15;
      }
    }
    
    // Add data line savings
    if (dataLinesData?.totalMonthly) {
      totalSavings += dataLinesData.totalMonthly * 0.15;
    }
    
    // Add IoT line savings
    if (iotLinesData?.totalMonthly) {
      totalSavings += iotLinesData.totalMonthly * 0.15;
    }
    
    // Add home internet savings
    if (homeInternetData?.totalMonthly) {
      totalSavings += homeInternetData.totalMonthly * 0.15;
    }
    
    return totalSavings;
  };

  const getTotalSavings = () => {
    return calculateAutoPaySavings() + calculateSeniorSavings() + calculateInsiderSavings();
  };

  const canProceed = () => {
    return true; // Discounts are optional
  };

  const handleNext = () => {
    onNext();
  };

  return (
    <div style={{
      maxWidth: '100%',
      margin: '0 auto',
      padding: '15px 10px',
      background: 'white',
      borderRadius: '10px',
      boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
      height: 'calc(100vh - 120px)',
      overflowY: 'auto'
    }}>
      <div style={{
        textAlign: 'center',
        marginBottom: '20px'
      }}>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '10px',
          marginBottom: '8px'
        }}>
          <Percent size={24} color="#E20074" />
          <h2 style={{
            fontSize: '24px',
            fontWeight: '700',
            color: '#E20074',
            margin: 0
          }}>
            Account Discounts
          </h2>
        </div>
        <p style={{ 
          color: '#666', 
          fontSize: '14px',
          margin: 0,
          lineHeight: '1.4'
        }}>
          Select any discounts that apply to your account. All discounts are optional.
        </p>
      </div>
      
      <div className="card-grid" style={{ gridTemplateColumns: '1fr' }}>
        {/* Auto Pay Discount */}
        <div className="card" style={{ 
          border: discounts.autoPay ? '2px solid #e20074' : '2px solid #e0e0e0',
          background: discounts.autoPay ? 'linear-gradient(135deg, rgba(226, 0, 116, 0.05), rgba(255, 107, 53, 0.05))' : 'white'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', marginBottom: '15px' }}>
            <div style={{
              background: '#E20074',
              borderRadius: '50%',
              width: '50px',
              height: '50px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              marginRight: '15px',
              color: 'white'
            }}>
              <CreditCard size={24} />
            </div>
            <div style={{ flex: 1 }}>
              <h3 className="card-title" style={{ margin: 0 }}>
                Auto Pay Discount
              </h3>
              <p className="card-description" style={{ margin: '5px 0 0 0' }}>
                Save $5 per line (up to 8 lines) when you enroll in Auto Pay
              </p>
            </div>
            <label style={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }}>
              <input
                type="checkbox"
                checked={discounts.autoPay}
                onChange={(e) => handleDiscountChange('autoPay', e.target.checked)}
                style={{ 
                  width: '20px', 
                  height: '20px', 
                  accentColor: '#E20074',
                  marginRight: '10px'
                }}
              />
              <span style={{ fontWeight: '600', color: '#E20074' }}>
                ${calculateAutoPaySavings()}/mo
              </span>
            </label>
          </div>
        </div>

        {/* Senior 55+ Discount */}
        <div className="card" style={{ 
          border: discounts.senior55 ? '2px solid #e20074' : '2px solid #e0e0e0',
          background: discounts.senior55 ? 'linear-gradient(135deg, rgba(226, 0, 116, 0.05), rgba(255, 107, 53, 0.05))' : 'white'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', marginBottom: '15px' }}>
            <div style={{
              background: '#E20074',
              borderRadius: '50%',
              width: '50px',
              height: '50px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              marginRight: '15px',
              color: 'white'
            }}>
              <Users size={24} />
            </div>
            <div style={{ flex: 1 }}>
              <h3 className="card-title" style={{ margin: 0 }}>
                Senior 55+ Discount
              </h3>
              <p className="card-description" style={{ margin: '5px 0 0 0' }}>
                Save 20% on voice plans for customers 55 and older
              </p>
            </div>
            <label style={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }}>
              <input
                type="checkbox"
                checked={discounts.senior55}
                onChange={(e) => handleDiscountChange('senior55', e.target.checked)}
                style={{ 
                  width: '20px', 
                  height: '20px', 
                  accentColor: '#E20074',
                  marginRight: '10px'
                }}
              />
              <span style={{ fontWeight: '600', color: '#E20074' }}>
                ${calculateSeniorSavings().toFixed(2)}/mo
              </span>
            </label>
          </div>
        </div>

        {/* T-Mobile Insider Discount */}
        <div className="card" style={{ 
          border: discounts.tmobileInsider ? '2px solid #e20074' : '2px solid #e0e0e0',
          background: discounts.tmobileInsider ? 'linear-gradient(135deg, rgba(226, 0, 116, 0.05), rgba(255, 107, 53, 0.05))' : 'white'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', marginBottom: '15px' }}>
            <div style={{
              background: '#E20074',
              borderRadius: '50%',
              width: '50px',
              height: '50px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              marginRight: '15px',
              color: 'white'
            }}>
              <Percent size={24} />
            </div>
            <div style={{ flex: 1 }}>
              <h3 className="card-title" style={{ margin: 0 }}>
                T-Mobile Insider Discount
              </h3>
              <p className="card-description" style={{ margin: '5px 0 0 0' }}>
                Save 15% on all services with T-Mobile Insider code
              </p>
            </div>
            <label style={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }}>
              <input
                type="checkbox"
                checked={discounts.tmobileInsider}
                onChange={(e) => handleDiscountChange('tmobileInsider', e.target.checked)}
                style={{ 
                  width: '20px', 
                  height: '20px', 
                  accentColor: '#E20074',
                  marginRight: '10px'
                }}
              />
              <span style={{ fontWeight: '600', color: '#E20074' }}>
                ${calculateInsiderSavings().toFixed(2)}/mo
              </span>
            </label>
          </div>
        </div>
      </div>

      {/* Total Savings Summary */}
      <div style={{
        background: '#f8f9fa',
        padding: '20px',
        borderRadius: '12px',
        marginBottom: '30px',
        border: '1px solid #e0e0e0'
      }}>
        <div style={{ fontWeight: '600', marginBottom: '10px', color: '#E20074' }}>
          Total Monthly Savings
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '5px' }}>
          <span>Auto Pay:</span>
          <span>${calculateAutoPaySavings()}</span>
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '5px' }}>
          <span>Senior 55+:</span>
          <span>${calculateSeniorSavings().toFixed(2)}</span>
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
          <span>T-Mobile Insider:</span>
          <span>${calculateInsiderSavings().toFixed(2)}</span>
        </div>
        <div style={{ 
          display: 'flex', 
          justifyContent: 'space-between', 
          fontWeight: '600',
          borderTop: '1px solid #e0e0e0',
          paddingTop: '10px',
          fontSize: '18px',
          color: '#E20074'
        }}>
          <span>Total Savings:</span>
          <span>${getTotalSavings().toFixed(2)}/mo</span>
        </div>
      </div>

      {/* Navigation */}
      <div className="button-group">
        <button
          className="button-secondary"
          onClick={onPrev}
          style={{ flex: 1 }}
        >
          <ArrowLeft size={16} style={{ marginRight: '8px' }} />
          Back
        </button>
        <button
          className="button"
          onClick={handleNext}
          disabled={!canProceed()}
          style={{ flex: 2 }}
        >
          Continue to Quote Summary
          <ArrowRight size={16} style={{ marginLeft: '8px' }} />
        </button>
      </div>
    </div>
  );
};

export default DiscountSelection;