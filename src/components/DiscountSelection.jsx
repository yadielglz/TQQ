import React from 'react';
import { Percent, CreditCard, Users } from 'lucide-react';

const DiscountSelection = ({ lines, discounts, onDiscountsChange, onNext, onPrev }) => {
  const handleDiscountChange = (discountType, value) => {
    const newDiscounts = { ...discounts };
    newDiscounts[discountType] = value;
    onDiscountsChange(newDiscounts);
  };

  const calculateAutoPaySavings = () => {
    if (!discounts.autoPay) return 0;
    // $5 per line up to 8 lines
    return Math.min(lines, 8) * 5;
  };

  const calculateSeniorSavings = () => {
    if (!discounts.senior55) return 0;
    // Senior discount varies by plan, we'll calculate this in the summary
    return 0; // Placeholder - actual calculation in QuoteSummary
  };

  const calculateInsiderSavings = () => {
    if (!discounts.tmobileInsider) return 0;
    // 20% discount on rate plans (More or Beyond only)
    return 0; // Placeholder - actual calculation in QuoteSummary
  };

  const canProceed = () => {
    return true; // Discounts are optional
  };

  return (
    <div className="form-section">
      <h2 className="section-title">Select Available Discounts</h2>
      <p style={{ color: '#666', marginBottom: '30px', textAlign: 'center' }}>
        Choose any discounts that apply to your account
      </p>
      
      <div className="card-grid" style={{ gridTemplateColumns: '1fr' }}>
        {/* Auto Pay Discount */}
        <div className="card" style={{ 
          border: discounts.autoPay ? '2px solid #e20074' : '2px solid #e0e0e0',
          background: discounts.autoPay ? 'linear-gradient(135deg, rgba(226, 0, 116, 0.05), rgba(255, 107, 53, 0.05))' : 'white'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', marginBottom: '15px' }}>
            <div style={{
              background: '#4CAF50',
              borderRadius: '8px',
              padding: '8px',
              marginRight: '15px',
              color: 'white'
            }}>
              <CreditCard size={24} />
            </div>
            <div style={{ flex: 1 }}>
              <h3 className="card-title">Auto Pay Discount</h3>
              <div className="card-price">${calculateAutoPaySavings()}/mo savings</div>
            </div>
            <label style={{ 
              display: 'flex', 
              alignItems: 'center', 
              cursor: 'pointer',
              fontSize: '18px'
            }}>
              <input
                type="checkbox"
                checked={discounts.autoPay}
                onChange={(e) => handleDiscountChange('autoPay', e.target.checked)}
                style={{ 
                  marginRight: '8px',
                  transform: 'scale(1.2)'
                }}
              />
              Enable
            </label>
          </div>
          
          <p className="card-description">
            Save $5 per line (up to 8 lines) when you enroll in Auto Pay with a debit card, 
            credit card, or bank account. Total savings: ${calculateAutoPaySavings()}/month
          </p>
          
          <div style={{ 
            background: '#f8f9fa', 
            padding: '10px', 
            borderRadius: '6px', 
            marginTop: '10px',
            fontSize: '14px',
            color: '#666'
          }}>
            <strong>Requirements:</strong> Must maintain Auto Pay enrollment to keep discount
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
              borderRadius: '8px',
              padding: '8px',
              marginRight: '15px',
              color: 'white'
            }}>
              <Users size={24} />
            </div>
            <div style={{ flex: 1 }}>
              <h3 className="card-title">55+ Senior Discount</h3>
              <div className="card-price">Varies by plan</div>
            </div>
            <label style={{ 
              display: 'flex', 
              alignItems: 'center', 
              cursor: 'pointer',
              fontSize: '18px'
            }}>
              <input
                type="checkbox"
                checked={discounts.senior55}
                onChange={(e) => handleDiscountChange('senior55', e.target.checked)}
                style={{ 
                  marginRight: '8px',
                  transform: 'scale(1.2)'
                }}
              />
              Enable
            </label>
          </div>
          
          <p className="card-description">
            Special pricing for customers 55 and older. Maximum 2 lines per account.
            {lines > 2 && (
              <span style={{ color: '#e20074', fontWeight: 'bold' }}>
                Note: Senior plans are limited to 2 lines maximum.
              </span>
            )}
          </p>
          
          <div style={{ 
            background: '#f8f9fa', 
            padding: '10px', 
            borderRadius: '6px', 
            marginTop: '10px',
            fontSize: '14px',
            color: '#666'
          }}>
            <strong>Senior Plan Pricing:</strong>
            <ul style={{ marginTop: '5px', paddingLeft: '20px' }}>
              <li><strong>Essentials Choice 55:</strong> $45 (1 line), $60 (2 lines)</li>
              <li><strong>More w/55+ Savings:</strong> $70 (1 line), $100 (2 lines)</li>
              <li><strong>Beyond w/55+ Savings:</strong> $85 (1 line), $130 (2 lines)</li>
            </ul>
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
              borderRadius: '8px',
              padding: '8px',
              marginRight: '15px',
              color: 'white'
            }}>
              <Percent size={24} />
            </div>
            <div style={{ flex: 1 }}>
              <h3 className="card-title">T-Mobile Insider</h3>
              <p className="card-description">
                20% discount on rate plans (More or Beyond only)
              </p>
            </div>
            <div style={{ textAlign: 'right' }}>
              <div style={{ fontSize: '20px', fontWeight: '700', marginBottom: '4px' }}>
                {discounts.tmobileInsider ? '20%' : '0%'}
              </div>
              <div style={{ fontSize: '12px', opacity: 0.8 }}>
                Rate Plan Only
              </div>
            </div>
          </div>
          
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}>
              <input
                type="checkbox"
                checked={discounts.tmobileInsider || false}
                onChange={(e) => handleDiscountChange('tmobileInsider', e.target.checked)}
                style={{ accentColor: '#E20074' }}
              />
              <span>Apply T-Mobile Insider Discount</span>
            </label>
          </div>
        </div>
      </div>

      <div className="summary">
        <div className="summary-title">Discount Summary</div>
        <div className="summary-item">
          <span className="summary-label">Auto Pay Savings</span>
          <span className="summary-value">${calculateAutoPaySavings()}/mo</span>
        </div>
        <div className="summary-item">
          <span className="summary-label">Senior 55+ Discount</span>
          <span className="summary-value">
            {discounts.senior55 ? 'Applied to eligible plans' : 'Not selected'}
          </span>
        </div>
        <div className="summary-item">
          <span className="summary-label">T-Mobile Insider</span>
          <span className="summary-value">
            {discounts.tmobileInsider ? '20% off eligible plans' : 'Not selected'}
          </span>
        </div>
      </div>

      {discounts.senior55 && lines > 2 && (
        <div style={{ 
          background: '#f8f9fa', 
          border: '1px solid #e0e0e0', 
          padding: '15px', 
          borderRadius: '8px', 
          marginBottom: '20px',
          color: '#856404'
        }}>
          <strong>⚠️ Important:</strong> Senior 55+ plans are limited to 2 lines maximum. 
          You have selected {lines} lines. Consider switching to regular plans or reducing 
          the number of lines for senior pricing.
        </div>
      )}

      <div className="button-group">
        <button className="button button-secondary" onClick={onPrev}>
          Back to Protection
        </button>
        <button 
          className="button" 
          onClick={onNext}
          disabled={!canProceed()}
        >
          Continue to Equipment Credit
        </button>
      </div>
    </div>
  );
};

export default DiscountSelection;
