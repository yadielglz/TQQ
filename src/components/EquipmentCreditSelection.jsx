import React, { useState } from 'react';
import { CreditCard, Calculator, DollarSign, ArrowRight, ArrowLeft } from 'lucide-react';

const EquipmentCreditSelection = ({ 
  lines, 
  devices, 
  expectedEC, 
  onECChange, 
  downPayment, 
  onDownPaymentChange, 
  tradeIns, 
  onTradeInsChange, 
  onNext, 
  onPrev 
}) => {
  const [ecAmount, setEcAmount] = useState(expectedEC || '');
  const [selectedDownPayment, setSelectedDownPayment] = useState(downPayment || '');
  const [tradeInValues, setTradeInValues] = useState(tradeIns || {});

  const deviceOptions = [
    { id: 'iphone-air', name: 'iPhone Air', price: 0, monthlyPrice: 0 },
    { id: 'iphone-17-pro-max', name: 'iPhone 17 Pro Max', price: 1199, monthlyPrice: 50 },
    { id: 'iphone-17-pro', name: 'iPhone 17 Pro', price: 999, monthlyPrice: 42 },
    { id: 'iphone-17', name: 'iPhone 17', price: 799, monthlyPrice: 33 },
    { id: 'iphone-16-pro-max', name: 'iPhone 16 Pro Max', price: 1199, monthlyPrice: 50 },
    { id: 'iphone-16-pro', name: 'iPhone 16 Pro', price: 999, monthlyPrice: 42 },
    { id: 'iphone-16-plus', name: 'iPhone 16 Plus', price: 899, monthlyPrice: 37 },
    { id: 'iphone-16', name: 'iPhone 16', price: 799, monthlyPrice: 33 },
    { id: 'iphone-16e', name: 'iPhone 16e', price: 599, monthlyPrice: 25 },
    { id: 'iphone-15', name: 'iPhone 15', price: 699, monthlyPrice: 29 },
    { id: 'pixel-10-pro-xl', name: 'Pixel 10 Pro XL', price: 1099, monthlyPrice: 46 },
    { id: 'pixel-10-pro', name: 'Pixel 10 Pro', price: 899, monthlyPrice: 37 },
    { id: 'pixel-10', name: 'Pixel 10', price: 699, monthlyPrice: 29 },
    { id: 'pixel-9a', name: 'Pixel 9A', price: 499, monthlyPrice: 21 },
    { id: 'galaxy-s25-edge', name: 'Galaxy S25 Edge', price: 1199, monthlyPrice: 50 },
    { id: 'galaxy-s25-ultra', name: 'Galaxy S25 Ultra', price: 1299, monthlyPrice: 54 },
    { id: 'galaxy-s25-plus', name: 'Galaxy S25+', price: 999, monthlyPrice: 42 },
    { id: 'galaxy-s25', name: 'Galaxy S25', price: 799, monthlyPrice: 33 },
    { id: 'galaxy-s25-fe', name: 'Galaxy S25 FE', price: 599, monthlyPrice: 25 },
    { id: 'galaxy-a36', name: 'Galaxy A36', price: 299, monthlyPrice: 12 },
    { id: 'galaxy-z-fold-7', name: 'Galaxy Z Fold 7', price: 1799, monthlyPrice: 75 },
    { id: 'galaxy-z-flip-7', name: 'Galaxy Z Flip 7', price: 999, monthlyPrice: 42 },
    { id: 'motorola-edge-2025', name: 'Motorola Edge 2025', price: 599, monthlyPrice: 25 },
    { id: 'motorola-g-power-2025', name: 'Motorola G Power 2025', price: 299, monthlyPrice: 12 },
    { id: 'motorola-g-2025', name: 'Motorola G 2025', price: 199, monthlyPrice: 8 },
    { id: 'motorola-razr-ultra', name: 'Motorola Razr Ultra', price: 999, monthlyPrice: 42 },
    { id: 'motorola-razr-plus-2025', name: 'Motorola Razr+ 2025', price: 699, monthlyPrice: 29 },
    { id: 'motorola-razr-2025', name: 'Motorola Razr 2025', price: 499, monthlyPrice: 21 },
    { id: 'revvl-pro-8', name: 'Revvl Pro 8', price: 199, monthlyPrice: 8 },
    { id: 'byod', name: 'BYOD (Bring Your Own Device)', price: 0, monthlyPrice: 0 }
  ];

  const downPaymentOptions = [
    { value: '33', label: '33% Down Payment', description: 'Minimum down payment' },
    { value: '66', label: '66% Down Payment', description: 'Moderate down payment' },
    { value: '75', label: '75% Down Payment', description: 'Maximum down payment' }
  ];

  const calculateDeviceTotal = () => {
    let total = 0;
    for (let i = 0; i < lines; i++) {
      const deviceId = devices[i];
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
    for (let i = 0; i < lines; i++) {
      const tradeInValue = tradeInValues[i] || 0;
      total += parseFloat(tradeInValue) || 0;
    }
    return total;
  };

  const calculateECBalance = () => {
    const deviceTotal = calculateDeviceTotal();
    const tradeInTotal = calculateTradeInTotal();
    const ecAmountNum = parseFloat(ecAmount) || 0;
    
    return Math.max(0, deviceTotal - tradeInTotal - ecAmountNum);
  };

  const calculateDownPaymentRequired = () => {
    const ecBalance = calculateECBalance();
    const downPaymentPercent = parseFloat(selectedDownPayment) || 0;
    
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

  const calculateTradeInCredit = () => {
    const deviceTotal = calculateDeviceTotal();
    const tradeInTotal = calculateTradeInTotal();
    
    // If trade-in value exceeds device cost, return the excess as monthly credit
    return Math.max(0, tradeInTotal - deviceTotal);
  };

  const handleECChange = (value) => {
    setEcAmount(value);
    onECChange(value);
  };

  const handleDownPaymentChange = (value) => {
    setSelectedDownPayment(value);
    onDownPaymentChange(value);
  };

  const handleTradeInChange = (lineIndex, value) => {
    const newTradeIns = { ...tradeInValues };
    newTradeIns[lineIndex] = value;
    setTradeInValues(newTradeIns);
    onTradeInsChange(newTradeIns);
  };

  const canProceed = () => {
    return ecAmount.trim() !== '' && (calculateECBalance() <= 0 || selectedDownPayment !== '');
  };

  const handleNext = async () => {
    try {
      // Google Sheets integration disabled
      console.log('✅ Equipment Credit data collected:', {
        equipmentCredit: ecAmount,
        downPayment: selectedDownPayment,
        tradeIns: tradeInValues
      });
    } catch (error) {
      console.warn('⚠️ Could not save Equipment Credit data:', error);
    }
    
    onNext();
  };

  const getDeviceName = (deviceId) => {
    const device = deviceOptions.find(d => d.id === deviceId);
    return device ? device.name : 'No device selected';
  };

  const getDevicePrice = (deviceId) => {
    const device = deviceOptions.find(d => d.id === deviceId);
    return device ? device.price : 0;
  };

  return (
    <div className="form-section">
      <h2 className="section-title">Equipment Credit & Financing</h2>
      
      {/* Equipment Credit Input */}
      <div style={{
        background: '#f8f9fa',
        padding: '20px',
        borderRadius: '12px',
        marginBottom: '30px',
        border: '1px solid #e0e0e0'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', marginBottom: '15px' }}>
          <CreditCard size={24} style={{ color: '#e20074', marginRight: '10px' }} />
          <h3 style={{ fontSize: '18px', fontWeight: '600', color: '#333' }}>
            Equipment Credit (EC)
          </h3>
        </div>
        
        <div style={{ marginBottom: '15px' }}>
          <label style={{ display: 'block', fontWeight: '600', color: '#333', marginBottom: '8px' }}>
            Expected EC Amount *
          </label>
          <div style={{ position: 'relative' }}>
            <DollarSign size={20} style={{
              position: 'absolute',
              left: '12px',
              top: '50%',
              transform: 'translateY(-50%)',
              color: '#666'
            }} />
            <input
              type="number"
              value={ecAmount}
              onChange={(e) => handleECChange(e.target.value)}
              placeholder="0"
              min="0"
              step="0.01"
              style={{
                width: '100%',
                padding: '12px 12px 12px 40px',
                border: '2px solid #e0e0e0',
                borderRadius: '8px',
                fontSize: '16px',
                background: 'white'
              }}
            />
          </div>
        </div>
        
        <div style={{ fontSize: '14px', color: '#666' }}>
          Equipment Credit will be applied to offset device costs. Any remaining balance may require a down payment.
        </div>
      </div>

      {/* Device Summary */}
      <div style={{
        background: 'white',
        border: '2px solid #e0e0e0',
        borderRadius: '12px',
        marginBottom: '30px',
        overflow: 'hidden'
      }}>
        <div style={{
          background: '#f8f9fa',
          padding: '15px 20px',
          borderBottom: '1px solid #e0e0e0',
          fontWeight: '600',
          color: '#333'
        }}>
          Device Summary
        </div>
        
        {Array.from({ length: lines }, (_, lineIndex) => {
          const deviceId = devices[lineIndex];
          const devicePrice = getDevicePrice(deviceId);
          const tradeInValue = tradeInValues[lineIndex] || 0;
          
          return (
            <div key={lineIndex} style={{
              padding: '15px 20px',
              borderBottom: lineIndex < lines - 1 ? '1px solid #f0f0f0' : 'none',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center'
            }}>
              <div>
                <div style={{ fontWeight: '600', color: '#333', marginBottom: '4px' }}>
                  Line {lineIndex + 1}: {getDeviceName(deviceId)}
                </div>
                <div style={{ fontSize: '14px', color: '#666' }}>
                  Device Price: ${devicePrice}
                </div>
              </div>
              
              <div style={{ textAlign: 'right' }}>
                <div style={{ marginBottom: '8px' }}>
                  <label style={{ fontSize: '12px', color: '#666', display: 'block', marginBottom: '4px' }}>
                    Trade-In Value
                  </label>
                  <div style={{ position: 'relative', display: 'inline-block' }}>
                    <DollarSign size={14} style={{
                      position: 'absolute',
                      left: '8px',
                      top: '50%',
                      transform: 'translateY(-50%)',
                      color: '#666'
                    }} />
                    <input
                      type="number"
                      value={tradeInValue}
                      onChange={(e) => handleTradeInChange(lineIndex, e.target.value)}
                      placeholder="0"
                      min="0"
                      step="0.01"
                      style={{
                        width: '120px',
                        padding: '6px 6px 6px 24px',
                        border: '1px solid #e0e0e0',
                        borderRadius: '4px',
                        fontSize: '14px'
                      }}
                    />
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* EC Calculation */}
      <div style={{
        background: '#E20074',
        color: 'white',
        padding: '20px',
        borderRadius: '12px',
        marginBottom: '30px'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', marginBottom: '15px' }}>
          <Calculator size={24} style={{ marginRight: '10px' }} />
          <h3 style={{ fontSize: '18px', fontWeight: '600' }}>
            EC Calculation
          </h3>
        </div>
        
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '15px' }}>
          <div>
            <div style={{ fontSize: '12px', opacity: 0.8, marginBottom: '4px' }}>Total Device Cost</div>
            <div style={{ fontSize: '20px', fontWeight: '700' }}>${calculateDeviceTotal()}</div>
          </div>
          <div>
            <div style={{ fontSize: '12px', opacity: 0.8, marginBottom: '4px' }}>Total Trade-In</div>
            <div style={{ fontSize: '20px', fontWeight: '700' }}>${calculateTradeInTotal()}</div>
          </div>
          <div>
            <div style={{ fontSize: '12px', opacity: 0.8, marginBottom: '4px' }}>Equipment Credit</div>
            <div style={{ fontSize: '20px', fontWeight: '700' }}>${parseFloat(ecAmount) || 0}</div>
          </div>
          <div>
            <div style={{ fontSize: '12px', opacity: 0.8, marginBottom: '4px' }}>Remaining Balance</div>
            <div style={{ fontSize: '20px', fontWeight: '700' }}>${calculateECBalance()}</div>
          </div>
        </div>
      </div>

      {/* Down Payment Selection */}
      {calculateECBalance() > 0 ? (
        <div style={{
          background: '#f8f9fa',
          padding: '20px',
          borderRadius: '12px',
          marginBottom: '30px',
          border: '1px solid #e0e0e0'
        }}>
          <h3 style={{ fontSize: '18px', fontWeight: '600', color: '#333', marginBottom: '15px' }}>
            Down Payment Required
          </h3>
          
          <div style={{ marginBottom: '20px' }}>
            <div style={{ fontSize: '16px', fontWeight: '600', color: '#e20074', marginBottom: '10px' }}>
              Remaining Balance: ${calculateECBalance()}
            </div>
            <div style={{ fontSize: '14px', color: '#666' }}>
              Select down payment percentage for the remaining balance
            </div>
          </div>
          
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '15px' }}>
            {downPaymentOptions.map((option) => {
              const downPaymentAmount = calculateDownPaymentRequired();
              const monthlyFinancing = calculateMonthlyFinancing();
              const isSelected = selectedDownPayment === option.value;
              
              return (
                <div
                  key={option.value}
                  onClick={() => handleDownPaymentChange(option.value)}
                  style={{
                    padding: '15px',
                    border: `2px solid ${isSelected ? '#e20074' : '#e0e0e0'}`,
                    borderRadius: '8px',
                    cursor: 'pointer',
                    background: isSelected ? 'linear-gradient(135deg, rgba(226, 0, 116, 0.1), rgba(255, 107, 53, 0.1))' : 'white',
                    transition: 'all 0.3s ease'
                  }}
                >
                  <div style={{ fontWeight: '600', color: '#333', marginBottom: '8px' }}>
                    {option.label}
                  </div>
                  <div style={{ fontSize: '14px', color: '#666', marginBottom: '10px' }}>
                    {option.description}
                  </div>
                  <div style={{ fontSize: '16px', fontWeight: '700', color: '#e20074' }}>
                    Down Payment: ${downPaymentAmount}
                  </div>
                  <div style={{ fontSize: '14px', color: '#666' }}>
                    Monthly Financing: ${monthlyFinancing}/mo
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      ) : (
        <div style={{
          background: '#e8f5e8',
          padding: '20px',
          borderRadius: '12px',
          marginBottom: '30px',
          border: '1px solid #4CAF50',
          textAlign: 'center'
        }}>
          <div style={{ fontSize: '18px', fontWeight: '600', color: '#2e7d32', marginBottom: '10px' }}>
            ✅ No Down Payment Required!
          </div>
          <div style={{ fontSize: '14px', color: '#2e7d32' }}>
            Your Equipment Credit and trade-ins cover the full device cost. You can proceed to the summary.
          </div>
        </div>
      )}

      {/* Summary */}
      <div className="summary">
        <div className="summary-title">Equipment Credit Summary</div>
        <div className="summary-item">
          <span className="summary-label">Total Device Cost</span>
          <span className="summary-value">${calculateDeviceTotal()}</span>
        </div>
        <div className="summary-item">
          <span className="summary-label">Total Trade-In Value</span>
          <span className="summary-value">${calculateTradeInTotal()}</span>
        </div>
        <div className="summary-item">
          <span className="summary-label">Equipment Credit</span>
          <span className="summary-value">${parseFloat(ecAmount) || 0}</span>
        </div>
        <div className="summary-item">
          <span className="summary-label">Remaining Balance</span>
          <span className="summary-value">${calculateECBalance()}</span>
        </div>
        {calculateTradeInCredit() > 0 && (
          <div className="summary-item" style={{ color: '#4CAF50' }}>
            <span className="summary-label">Trade-In Credit (Monthly)</span>
            <span className="summary-value">-${calculateTradeInCredit()}/mo</span>
          </div>
        )}
        {calculateECBalance() > 0 && (
          <>
            <div className="summary-item">
              <span className="summary-label">Down Payment Required</span>
              <span className="summary-value">${calculateDownPaymentRequired()}</span>
            </div>
            <div className="summary-item">
              <span className="summary-label">Monthly Financing</span>
              <span className="summary-value">${calculateMonthlyFinancing()}/mo</span>
            </div>
          </>
        )}
      </div>

      {/* Action Buttons */}
      <div className="button-group">
        <button className="button button-secondary" onClick={onPrev}>
          Back to Discounts
        </button>
        <button 
          className="button" 
          onClick={handleNext}
          disabled={!canProceed()}
        >
          {calculateECBalance() <= 0 ? 'Continue to Summary' : 'Continue to Summary'}
        </button>
      </div>
    </div>
  );
};

export default EquipmentCreditSelection;
