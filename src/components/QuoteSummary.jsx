import React, { useCallback } from 'react';
import { FileText, ArrowLeft, Download, RotateCcw } from 'lucide-react';
import { promotions } from '../data/promotions.js';

const QuoteSummary = ({ 
  customerData, 
  voiceLinesData, 
  dataLinesData, 
  iotLinesData, 
  homeInternetData,
  equipmentCreditData, 
  discountsData, 
  onPrev,
  onClearData,
  onBackToServices
}) => {
  
  const calculateTotal = useCallback(() => {
    let total = 0;
    
    // Voice lines total
    if (voiceLinesData && voiceLinesData.totalMonthly) {
      total += voiceLinesData.totalMonthly;
    }
    
    // Add other service totals as they're implemented
    // Data lines, IoT, Home Internet, etc.
    
    return total;
  }, [voiceLinesData, dataLinesData, iotLinesData, homeInternetData]);

  const calculateBreakdown = useCallback(() => {
        const breakdown = {
          ratePlan: 0,
          devicePayments: 0,
          promotions: 0,
          equipmentCredit: 0,
          discounts: 0,
          subtotal: 0,
          tax: 0,
          total: 0
        };

    // Calculate voice lines breakdown
    if (voiceLinesData) {
      // Rate plan cost
      if (voiceLinesData.plans && Object.keys(voiceLinesData.plans).length > 0) {
        const firstPlanId = Object.values(voiceLinesData.plans)[0];
        const planPricing = {
          'experience-essentials-saver': { 1: 50, 2: 80, 3: 90, 4: 100, 5: 110, additional: 35 },
          'experience-essentials': { 1: 60, 2: 90, 3: 90, 4: 100, 5: 110, additional: 35 },
          'experience-more': { 1: 85, 2: 140, 3: 140, 4: 170, 5: 200, additional: 35 },
          'experience-beyond': { 1: 100, 2: 170, 3: 170, 4: 215, 5: 260, additional: 35 },
          'essentials-choice-55': { 1: 45, 2: 60, maxLines: 2 },
          'experience-more-55': { 1: 70, 2: 100, maxLines: 2 },
          'experience-beyond-55': { 1: 85, 2: 140, maxLines: 2 },
          'experience-beyond-military': { 1: 90, 2: 140, 3: 180, 4: 220, 5: 260, additional: 35 },
          'experience-beyond-first-responder': { 1: 90, 2: 140, 3: 180, 4: 220, 5: 260, additional: 35 }
        };
        
        const plan = planPricing[firstPlanId];
        if (plan) {
          const quantity = voiceLinesData.quantity || 1;
          if (plan.maxLines && quantity > plan.maxLines) {
            breakdown.ratePlan = 0;
          } else if (quantity <= 5) {
            breakdown.ratePlan = plan[quantity] || 0;
          } else {
            const basePrice = plan[5] || 0;
            const additionalLines = quantity - 5;
            breakdown.ratePlan = basePrice + (additionalLines * plan.additional);
          }
        }
      }

      // Device payments
      if (voiceLinesData.devices) {
        Object.values(voiceLinesData.devices).forEach(deviceId => {
          if (deviceId && deviceId !== 'bring-your-own') {
            const devicePrices = {
              'iphone-17-pro-max': 50, 'iphone-17-pro': 46, 'iphone-17-plus': 37, 'iphone-17': 33,
              'galaxy-s25-edge': 54, 'galaxy-s25-ultra': 54, 'galaxy-s25-plus': 42, 'galaxy-s25': 33,
              'pixel-10-pro-xl': 50, 'pixel-10-pro': 42, 'pixel-10': 29
            };
            const devicePrice = Number(devicePrices[deviceId]) || 0;
            breakdown.devicePayments += devicePrice;
          }
        });
      }

      // Promotion savings (monthly credits over 24-month EIP)
      if (voiceLinesData.promotions) {
        Object.values(voiceLinesData.promotions).forEach(linePromotions => {
          linePromotions.forEach(promoId => {
            const promotion = promotions.find(p => p.id === promoId);
            if (promotion && promotion.redemption && promotion.redemption.maxPayout) {
              // Convert total promotion payout to monthly credit over 24 months
              const totalPayout = Number(promotion.redemption.maxPayout) || 0;
              const monthlyCredit = totalPayout / 24; // 24-month EIP length
              breakdown.promotions += monthlyCredit;
            }
          });
        });
      }
    }

    // Add equipment credit and discounts
    if (equipmentCreditData) {
      breakdown.equipmentCredit = 0;
      
      // Calculate total equipment credit across all lines
      if (equipmentCreditData.credits) {
        Object.values(equipmentCreditData.credits).forEach(credit => {
          const creditValue = Number(credit) || 0;
          breakdown.equipmentCredit += creditValue;
        });
      }
      
      // Calculate total down payments across all lines
      if (equipmentCreditData.downPayments) {
        Object.values(equipmentCreditData.downPayments).forEach(downPayment => {
          const downValue = Number(downPayment) || 0;
          breakdown.equipmentCredit += downValue;
        });
      }
      
      // Calculate total trade-in values across all lines
      if (equipmentCreditData.tradeIns) {
        Object.values(equipmentCreditData.tradeIns).forEach(lineTradeIns => {
          if (Array.isArray(lineTradeIns)) {
            lineTradeIns.forEach(tradeIn => {
              const tradeValue = Number(tradeIn.value) || 0;
              breakdown.equipmentCredit += tradeValue;
            });
          }
        });
      }
    }
    
    if (discountsData) {
      breakdown.discounts = 0;
      if (discountsData.autoPay) breakdown.discounts += 5; // $5 AutoPay discount
      if (discountsData.senior55) breakdown.discounts += 10; // $10 Senior 55+ discount
      if (discountsData.insider) breakdown.discounts += 20; // $20 Insider discount
      if (discountsData.workPerks) breakdown.discounts += 15; // $15 Work Perks discount
    }

    breakdown.subtotal = (Number(breakdown.ratePlan) || 0) + 
                         (Number(breakdown.devicePayments) || 0) - 
                         (Number(breakdown.promotions) || 0) - 
                         (Number(breakdown.equipmentCredit) || 0) - 
                         (Number(breakdown.discounts) || 0);
    breakdown.tax = (Number(breakdown.subtotal) || 0) * 0.075; // 7.5% global tax rate
    breakdown.total = (Number(breakdown.subtotal) || 0) + (Number(breakdown.tax) || 0);

    return breakdown;
  }, [voiceLinesData, equipmentCreditData, discountsData]);

  const handleDownload = useCallback(() => {
    const quoteData = {
      customer: customerData,
      services: {
        voice: voiceLinesData,
        data: dataLinesData,
        iot: iotLinesData,
        homeInternet: homeInternetData
      },
      equipment: equipmentCreditData,
      discounts: discountsData,
      total: calculateTotal()
    };
    
    const dataStr = JSON.stringify(quoteData, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    
    const link = document.createElement('a');
    link.href = url;
    link.download = `t-mobile-quote-${Date.now()}.json`;
    link.click();
    
    URL.revokeObjectURL(url);
  }, [customerData, voiceLinesData, dataLinesData, iotLinesData, homeInternetData, equipmentCreditData, discountsData, calculateTotal]);

  return (
    <div style={{
      maxWidth: '100%',
      margin: '0 auto',
      background: 'white',
      borderRadius: '12px',
      boxShadow: '0 4px 16px rgba(0,0,0,0.1)',
      height: 'calc(100vh - 140px)',
      overflowY: 'auto',
      display: 'flex',
      flexDirection: 'column'
    }}>
      {/* Header */}
      <div style={{
        padding: '20px',
        borderBottom: '1px solid #e0e0e0',
        background: '#f8f9fa'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '8px' }}>
          <FileText size={24} color="#E20074" />
          <h2 style={{ fontSize: '24px', fontWeight: '700', color: '#E20074', margin: 0 }}>
            Quote Summary
          </h2>
        </div>
        <p style={{ color: '#666', fontSize: '14px', margin: 0, lineHeight: '1.4' }}>
          Review your quote details and download your personalized quote.
        </p>
      </div>
      
      {/* Content */}
      <div style={{ flex: 1, padding: '20px' }}>
      {/* Customer Information */}
      {customerData && (
        <div style={{
          background: '#f8f9fa',
          padding: '20px',
            borderRadius: '8px',
            marginBottom: '20px',
          border: '1px solid #e0e0e0'
        }}>
            <h3 style={{ fontSize: '18px', fontWeight: '600', marginBottom: '15px', color: '#333' }}>
            Customer Information
          </h3>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '10px' }}>
              {customerData.name && <div><strong>Name:</strong> {customerData.name}</div>}
              {customerData.email && <div><strong>Email:</strong> {customerData.email}</div>}
              {customerData.phone && <div><strong>Phone:</strong> {customerData.phone}</div>}
              {customerData.location && <div><strong>Location:</strong> {customerData.location}</div>}
            </div>
          </div>
        )}

        {/* Voice Lines Summary */}
        {voiceLinesData && voiceLinesData.quantity > 0 && (
          <div style={{
            background: '#f8f9fa',
            padding: '20px',
            borderRadius: '8px',
            marginBottom: '20px',
            border: '1px solid #e0e0e0'
          }}>
            <h3 style={{ fontSize: '18px', fontWeight: '600', marginBottom: '15px', color: '#333' }}>
              Voice Lines
            </h3>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '10px' }}>
              <div><strong>Lines:</strong> {voiceLinesData.quantity}</div>
              <div><strong>Plan:</strong> {Object.values(voiceLinesData.plans)[0] ? Object.values(voiceLinesData.plans)[0].replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase()) : 'Not selected'}</div>
              <div><strong>Devices:</strong> BYOD (Bring Your Own Device)</div>
              <div><strong>Monthly Cost:</strong> ${voiceLinesData.totalMonthly?.toFixed(2) || '0.00'}</div>
            </div>
          </div>
        )}
        
        {/* Other Services Placeholder */}
        <div style={{
          background: '#fff3cd',
          padding: '20px',
          borderRadius: '8px',
          marginBottom: '20px',
          border: '1px solid #ffc107'
        }}>
          <h3 style={{ fontSize: '16px', fontWeight: '600', marginBottom: '10px', color: '#856404' }}>
            Additional Services
          </h3>
          <p style={{ fontSize: '14px', color: '#856404', margin: 0 }}>
            Data Lines, IoT Lines, Home Internet, Equipment Credit, and Discounts will be displayed here once configured.
          </p>
                  </div>

        {/* Quote Breakdown */}
        <div style={{
          background: '#f8f9fa',
          padding: '20px',
          borderRadius: '8px',
          border: '1px solid #e0e0e0',
          marginBottom: '20px'
        }}>
          <h3 style={{ fontSize: '18px', fontWeight: '600', marginBottom: '15px', color: '#333' }}>
            Quote Breakdown
          </h3>
          {(() => {
            const breakdown = calculateBreakdown();
            return (
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '15px' }}>
                <div>
                  <div style={{ fontSize: '14px', color: '#666', marginBottom: '5px' }}>Rate Plan</div>
                  <div style={{ fontSize: '18px', fontWeight: '600', color: '#333' }}>
                    ${breakdown.ratePlan}/mo
                  </div>
                </div>
                <div>
                  <div style={{ fontSize: '14px', color: '#666', marginBottom: '5px' }}>Device Monthly Payment</div>
                  <div style={{ fontSize: '18px', fontWeight: '600', color: '#333' }}>
                    ${breakdown.devicePayments}/mo
                  </div>
                </div>
                <div>
                  <div style={{ fontSize: '14px', color: '#666', marginBottom: '5px' }}>Promotion Credits</div>
                  <div style={{ fontSize: '18px', fontWeight: '600', color: '#4CAF50' }}>
                    -${breakdown.promotions.toFixed(2)}/mo
                  </div>
                  <div style={{ fontSize: '12px', color: '#999', marginTop: '2px' }}>
                    Monthly credits over 24 months
                  </div>
                </div>
                <div>
                  <div style={{ fontSize: '14px', color: '#666', marginBottom: '5px' }}>Equipment Credit</div>
                  <div style={{ fontSize: '18px', fontWeight: '600', color: '#4CAF50' }}>
                    -${(breakdown.equipmentCredit || 0).toFixed(2)}
                  </div>
                  {equipmentCreditData && (
                    <div style={{ fontSize: '12px', color: '#999', marginTop: '2px' }}>
                      {(() => {
                        const totalCredits = Object.values(equipmentCreditData.credits || {}).reduce((sum, credit) => sum + (Number(credit) || 0), 0);
                        const totalDownPayments = Object.values(equipmentCreditData.downPayments || {}).reduce((sum, down) => sum + (Number(down) || 0), 0);
                        const totalTradeIns = Object.values(equipmentCreditData.tradeIns || {}).reduce((sum, lineTradeIns) => {
                          if (Array.isArray(lineTradeIns)) {
                            return sum + lineTradeIns.reduce((lineSum, tradeIn) => lineSum + (Number(tradeIn.value) || 0), 0);
                          }
                          return sum;
                        }, 0);
                        
                        const parts = [];
                        if (totalCredits > 0) parts.push(`Credits: $${totalCredits}`);
                        if (totalDownPayments > 0) parts.push(`Down: $${totalDownPayments}`);
                        if (totalTradeIns > 0) parts.push(`Trade-ins: $${totalTradeIns}`);
                        
                        return parts.join(' • ');
                      })()}
                    </div>
                  )}
                </div>
                <div>
                  <div style={{ fontSize: '14px', color: '#666', marginBottom: '5px' }}>Account Discounts</div>
                  <div style={{ fontSize: '18px', fontWeight: '600', color: '#4CAF50' }}>
                    -${(breakdown.discounts || 0).toFixed(2)}/mo
                  </div>
                  {discountsData && (
                    <div style={{ fontSize: '12px', color: '#999', marginTop: '2px' }}>
                      {discountsData.autoPay && 'AutoPay: $5'}
                      {discountsData.senior55 && ' • Senior: $10'}
                      {discountsData.insider && ' • Insider: $20'}
                      {discountsData.workPerks && ' • Work: $15'}
                    </div>
                  )}
                </div>
                <div>
                  <div style={{ fontSize: '14px', color: '#666', marginBottom: '5px' }}>Subtotal</div>
                  <div style={{ fontSize: '18px', fontWeight: '600', color: '#333' }}>
                    ${breakdown.subtotal.toFixed(2)}/mo
                  </div>
                </div>
                <div>
                  <div style={{ fontSize: '14px', color: '#666', marginBottom: '5px' }}>Tax (7.5%)</div>
                  <div style={{ fontSize: '18px', fontWeight: '600', color: '#333' }}>
                    ${breakdown.tax.toFixed(2)}/mo
                  </div>
                </div>
                <div>
                  <div style={{ fontSize: '14px', color: '#666', marginBottom: '5px' }}>Total Monthly Cost</div>
                  <div style={{ fontSize: '24px', fontWeight: '700', color: '#E20074' }}>
                    ${breakdown.total.toFixed(2)}/mo
                  </div>
                </div>
              </div>
            );
          })()}
          <p style={{ fontSize: '14px', color: '#666', margin: '15px 0 0 0' }}>
            * Pricing is estimated and may vary based on location, promotions, and other factors.
          </p>
        </div>

        {/* Actions */}
          <div style={{
          display: 'flex',
          gap: '15px',
          flexWrap: 'wrap'
          }}>
            <button
            onClick={onBackToServices}
              style={{
              padding: '12px 24px',
              border: '2px solid #1E88E5',
              borderRadius: '8px',
            background: 'white',
              color: '#1E88E5',
              fontSize: '16px',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
              gap: '8px',
              transition: 'all 0.3s ease'
            }}
          >
            <ArrowLeft size={16} />
            Back to Services
          </button>
          
            <button
            onClick={handleDownload}
              style={{
              padding: '12px 24px',
              border: '2px solid #E20074',
              borderRadius: '8px',
            background: 'white',
              color: '#E20074',
              fontSize: '16px',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
              gap: '8px',
              transition: 'all 0.3s ease'
            }}
          >
            <Download size={16} />
            Download Quote
          </button>
          
                  <button
            onClick={onClearData}
            style={{
              padding: '12px 24px',
              border: '2px solid #6c757d',
              borderRadius: '8px',
              background: 'white',
              color: '#6c757d',
              fontSize: '16px',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              transition: 'all 0.3s ease'
            }}
          >
            <RotateCcw size={16} />
            Start New Quote
                  </button>
        </div>
      </div>

      {/* Navigation */}
                <div style={{
        padding: '20px',
        borderTop: '1px solid #e0e0e0',
        background: '#f8f9fa',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center'
      }}>
        <button
          onClick={onPrev}
          style={{
            padding: '12px 24px',
            border: '2px solid #E20074',
                  borderRadius: '8px',
            background: 'white',
            color: '#E20074',
            fontSize: '16px',
            cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
            gap: '8px',
            transition: 'all 0.3s ease'
          }}
        >
          <ArrowLeft size={16} />
          Back to Discounts
        </button>
        
        <div style={{ fontSize: '14px', color: '#666', textAlign: 'center' }}>
          Quote Complete
        </div>
        
        <div style={{ fontSize: '18px', fontWeight: '700', color: '#E20074' }}>
          ${calculateTotal().toFixed(2)}/month
        </div>
      </div>
    </div>
  );
};

export default QuoteSummary;