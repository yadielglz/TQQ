import React, { useState } from 'react';
import { CreditCard, Calculator, DollarSign, ArrowRight, ArrowLeft } from 'lucide-react';

const EquipmentCreditSelection = ({ 
  data, 
  onDataChange, 
  voiceLinesData, 
  dataLinesData, 
  iotLinesData, 
  homeInternetData, 
  onNext, 
  onPrev 
}) => {
  const [ecAmount, setEcAmount] = useState(data?.amount || '');
  const [downPayment, setDownPayment] = useState(data?.downPayment || '');
  const [tradeIns, setTradeIns] = useState(data?.tradeIns || {});

  // Get all devices from all services
  const getAllDevices = () => {
    const devices = [];
    
    // Voice line devices
    if (voiceLinesData?.devices) {
      Object.values(voiceLinesData.devices).forEach(deviceId => {
        if (deviceId && deviceId !== 'byod') {
          devices.push({ id: deviceId, service: 'Voice', line: Object.keys(voiceLinesData.devices).find(key => voiceLinesData.devices[key] === deviceId) });
        }
      });
    }
    
    // Data line devices
    if (dataLinesData?.devices) {
      Object.values(dataLinesData.devices).forEach(deviceId => {
        if (deviceId) {
          devices.push({ id: deviceId, service: 'Data', line: Object.keys(dataLinesData.devices).find(key => dataLinesData.devices[key] === deviceId) });
        }
      });
    }
    
    // IoT line devices
    if (iotLinesData?.devices) {
      Object.values(iotLinesData.devices).forEach(deviceId => {
        if (deviceId) {
          devices.push({ id: deviceId, service: 'IoT', line: Object.keys(iotLinesData.devices).find(key => iotLinesData.devices[key] === deviceId) });
        }
      });
    }
    
    return devices;
  };

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

  const getDeviceName = (deviceId) => {
    const device = deviceOptions.find(d => d.id === deviceId);
    return device ? device.name : 'Unknown Device';
  };

  const getDevicePrice = (deviceId) => {
    const device = deviceOptions.find(d => d.id === deviceId);
    return device ? device.price : 0;
  };

  const calculateMonthlyFinancing = () => {
    const devices = getAllDevices();
    let totalFinancing = 0;

    devices.forEach(({ id }) => {
      const device = deviceOptions.find(d => d.id === id);
      if (device && device.price > 0) {
        const devicePrice = device.price;
        const ecCredit = parseFloat(ecAmount) || 0;
        const tradeInValue = parseFloat(tradeIns[id]) || 0;
        const downPaymentValue = parseFloat(downPayment) || 0;
        
        // Amount financed = device price - EC credit - trade-in - down payment
        const amountFinanced = Math.max(0, devicePrice - ecCredit - tradeInValue - downPaymentValue);
        
        // Monthly payment (assuming 24-month financing)
        const monthlyPayment = amountFinanced / 24;
        totalFinancing += monthlyPayment;
      }
    });

    return totalFinancing;
  };

  const handleTradeInChange = (deviceId, value) => {
    const newTradeIns = { ...tradeIns };
    newTradeIns[deviceId] = value;
    setTradeIns(newTradeIns);
  };

  const handleNext = () => {
    const equipmentCreditData = {
      amount: ecAmount,
      downPayment,
      tradeIns,
      monthlyFinancing: calculateMonthlyFinancing()
    };
    
    onDataChange(equipmentCreditData);
    onNext();
  };

  const canProceed = () => {
    return ecAmount.trim() !== '';
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
          <CreditCard size={24} color="#E20074" />
          <h2 style={{
            fontSize: '24px',
            fontWeight: '700',
            color: '#E20074',
            margin: 0
          }}>
            Equipment Credit & Financing
          </h2>
        </div>
        <p style={{ 
          color: '#666', 
          fontSize: '14px',
          margin: 0,
          lineHeight: '1.4'
        }}>
          Enter your expected Equipment Credit (EC) amount and any trade-in values or down payments.
        </p>
      </div>

      {/* Equipment Credit Input */}
      <div style={{ marginBottom: '30px' }}>
        <label style={{ display: 'block', marginBottom: '10px', fontWeight: '600' }}>
          Expected Equipment Credit (EC) Amount
        </label>
        <div style={{ position: 'relative' }}>
          <DollarSign 
            size={20} 
            style={{ 
              position: 'absolute', 
              left: '12px', 
              top: '50%', 
              transform: 'translateY(-50%)', 
              color: '#666' 
            }} 
          />
          <input
            type="number"
            value={ecAmount}
            onChange={(e) => setEcAmount(e.target.value)}
            placeholder="Enter EC amount"
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

      {/* Down Payment Input */}
      <div style={{ marginBottom: '30px' }}>
        <label style={{ display: 'block', marginBottom: '10px', fontWeight: '600' }}>
          Down Payment (Optional)
        </label>
        <div style={{ position: 'relative' }}>
          <DollarSign 
            size={20} 
            style={{ 
              position: 'absolute', 
              left: '12px', 
              top: '50%', 
              transform: 'translateY(-50%)', 
              color: '#666' 
            }} 
          />
          <input
            type="number"
            value={downPayment}
            onChange={(e) => setDownPayment(e.target.value)}
            placeholder="Enter down payment amount"
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

      {/* Trade-in Values */}
      {getAllDevices().length > 0 && (
        <div style={{ marginBottom: '30px' }}>
          <label style={{ display: 'block', marginBottom: '15px', fontWeight: '600' }}>
            Trade-in Values (Optional)
          </label>
          <div style={{
            background: '#f8f9fa',
            padding: '20px',
            borderRadius: '8px',
            border: '1px solid #e0e0e0'
          }}>
            {getAllDevices().map(({ id, service, line }) => (
              <div key={id} style={{ marginBottom: '15px' }}>
                <div style={{ 
                  fontSize: '14px', 
                  fontWeight: '600', 
                  marginBottom: '5px',
                  color: '#333'
                }}>
                  {getDeviceName(id)} ({service} Line {parseInt(line) + 1})
                </div>
                <div style={{ position: 'relative' }}>
                  <DollarSign 
                    size={16} 
                    style={{ 
                      position: 'absolute', 
                      left: '8px', 
                      top: '50%', 
                      transform: 'translateY(-50%)', 
                      color: '#666' 
                    }} 
                  />
                  <input
                    type="number"
                    value={tradeIns[id] || ''}
                    onChange={(e) => handleTradeInChange(id, e.target.value)}
                    placeholder="Trade-in value"
                    style={{
                      width: '100%',
                      padding: '8px 8px 8px 30px',
                      border: '1px solid #e0e0e0',
                      borderRadius: '6px',
                      fontSize: '14px',
                      background: 'white'
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Financing Summary */}
      <div style={{
        background: '#f8f9fa',
        padding: '20px',
        borderRadius: '12px',
        marginBottom: '30px',
        border: '1px solid #e0e0e0'
      }}>
        <div style={{ fontWeight: '600', marginBottom: '10px', color: '#E20074' }}>
          Financing Summary
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '5px' }}>
          <span>EC Amount:</span>
          <span>${ecAmount || '0'}</span>
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '5px' }}>
          <span>Down Payment:</span>
          <span>${downPayment || '0'}</span>
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
          <span>Total Trade-ins:</span>
          <span>${Object.values(tradeIns).reduce((sum, val) => sum + (parseFloat(val) || 0), 0)}</span>
        </div>
        <div style={{ 
          display: 'flex', 
          justifyContent: 'space-between', 
          fontWeight: '600',
          borderTop: '1px solid #e0e0e0',
          paddingTop: '10px'
        }}>
          <span>Estimated Monthly Financing:</span>
          <span>${calculateMonthlyFinancing().toFixed(2)}</span>
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
          Continue to Discounts
          <ArrowRight size={16} style={{ marginLeft: '8px' }} />
        </button>
      </div>
    </div>
  );
};

export default EquipmentCreditSelection;