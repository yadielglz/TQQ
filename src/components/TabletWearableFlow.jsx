import React, { useState } from 'react';
import { Tablet, Watch, ArrowRight, ArrowLeft, Check } from 'lucide-react';

const TabletWearableFlow = ({ onNext, onSkip }) => {
  const [selectedCategory, setSelectedCategory] = useState('');
  const [lines, setLines] = useState(1);
  const [devices, setDevices] = useState({});
  const [plans, setPlans] = useState({});
  const [protection, setProtection] = useState({});

  const categories = [
    { id: 'tablet', name: 'Tablet', icon: Tablet, color: '#E20074' },
    { id: 'wearable', name: 'Wearable', icon: Watch, color: '#E20074' }
  ];

  const tabletDevices = [
    { id: 'ipad-10', name: 'Apple iPad 10 (A16)', price: 449 },
    { id: 'ipad-mini-7', name: 'Apple iPad Mini 7th Gen', price: 499 },
    { id: 'ipad-pro-11', name: 'Apple iPad Pro 11"', price: 799 },
    { id: 'ipad-pro-13', name: 'Apple iPad Pro 13"', price: 1099 },
    { id: 'galaxy-tab-a9', name: 'Samsung Galaxy Tab A9', price: 199 },
    { id: 'galaxy-tab-s10', name: 'Samsung Galaxy Tab S10+ 5G', price: 899 },
    { id: 'revvl-tab-5g', name: 'Revvl Tab 5G', price: 249 }
  ];

  const wearableDevices = [
    { id: 'watch-se-3-40', name: 'Apple Watch SE 3rd Gen 40mm', price: 249 },
    { id: 'watch-se-3-44', name: 'Apple Watch SE 3rd Gen 44mm', price: 279 },
    { id: 'watch-11-42', name: 'Apple Watch 11th Gen 42mm', price: 399 },
    { id: 'watch-11-45', name: 'Apple Watch 11th Gen 45mm', price: 429 },
    { id: 'watch-ultra-3', name: 'Apple Watch Ultra 3rd Gen', price: 799 },
    { id: 'galaxy-watch-8-40', name: 'Samsung Galaxy Watch 8 40mm', price: 299 },
    { id: 'galaxy-watch-8-44', name: 'Samsung Galaxy Watch 8 44mm', price: 329 },
    { id: 'galaxy-watch-8-classic', name: 'Samsung Galaxy Watch 8 Classic 46mm', price: 449 },
    { id: 'galaxy-watch-ultra', name: 'Samsung Galaxy Watch Ultra', price: 649 },
    { id: 'pixel-watch-3', name: 'Google Pixel Watch 3', price: 349 },
    { id: 'pixel-watch-4', name: 'Google Pixel Watch 4', price: 399 }
  ];

  const tabletPlans = [
    { id: 'tablet-unlimited', name: 'Tablet Unlimited', price: 20 },
    { id: 'tablet-2gb', name: 'Tablet 2GB', price: 10 },
    { id: 'tablet-6gb', name: 'Tablet 6GB', price: 15 }
  ];

  const wearablePlans = [
    { id: 'wearable-unlimited', name: 'Wearable Unlimited', price: 10 },
    { id: 'wearable-500mb', name: 'Wearable 500MB', price: 5 }
  ];

  const getCurrentDevices = () => {
    return selectedCategory === 'tablet' ? tabletDevices : wearableDevices;
  };

  const getCurrentPlans = () => {
    return selectedCategory === 'tablet' ? tabletPlans : wearablePlans;
  };

  const handleDeviceChange = (lineIndex, deviceId) => {
    const newDevices = { ...devices };
    newDevices[lineIndex] = deviceId;
    setDevices(newDevices);
  };

  const handlePlanChange = (lineIndex, planId) => {
    const newPlans = { ...plans };
    newPlans[lineIndex] = planId;
    setPlans(newPlans);
  };

  const handleProtectionChange = (lineIndex, hasProtection) => {
    const newProtection = { ...protection };
    newProtection[lineIndex] = hasProtection;
    setProtection(newProtection);
  };

  const canProceed = () => {
    if (!selectedCategory) return false;
    
    for (let i = 0; i < lines; i++) {
      if (!devices[i] || !plans[i]) return false;
    }
    return true;
  };

  const calculateTotal = () => {
    let total = 0;
    const currentPlans = getCurrentPlans();
    
    for (let i = 0; i < lines; i++) {
      const plan = currentPlans.find(p => p.id === plans[i]);
      if (plan) total += plan.price;
    }
    return total;
  };

  const handleNext = () => {
    const tabletWearableData = {
      category: selectedCategory,
      lines,
      devices,
      plans,
      protection,
      totalMonthly: calculateTotal()
    };
    onNext(tabletWearableData);
  };

  return (
    <div className="form-section">
      <div className="section-title">
        <Tablet size={24} />
        Tablet & Wearable Setup
      </div>
      <p className="section-description">
        Add tablets and wearables to your account. You can skip this step if not needed.
      </p>

      {/* Category Selection */}
      <div style={{ marginBottom: '30px' }}>
        <label style={{ display: 'block', marginBottom: '15px', fontWeight: '600', fontSize: '18px' }}>
          Select Category
        </label>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '15px' }}>
          {categories.map(category => (
            <div
              key={category.id}
              className={`card ${selectedCategory === category.id ? 'selected' : ''}`}
              onClick={() => setSelectedCategory(category.id)}
              style={{ cursor: 'pointer' }}
            >
              <category.icon size={32} color={category.color} style={{ marginBottom: '10px' }} />
              <div className="card-title">{category.name}</div>
            </div>
          ))}
        </div>
      </div>

      {selectedCategory && (
        <>
          {/* Line Quantity */}
          <div style={{ marginBottom: '30px' }}>
            <label style={{ display: 'block', marginBottom: '10px', fontWeight: '600' }}>
              Number of {selectedCategory === 'tablet' ? 'Tablets' : 'Wearables'}
            </label>
            <select
              value={lines}
              onChange={(e) => setLines(parseInt(e.target.value))}
              style={{
                width: '100%',
                padding: '12px',
                border: '2px solid #e0e0e0',
                borderRadius: '8px',
                fontSize: '16px',
                background: 'white'
              }}
            >
              {[1, 2, 3, 4, 5].map(num => (
                <option key={num} value={num}>{num}</option>
              ))}
            </select>
          </div>

          {/* Device and Plan Selection per Line */}
          {Array.from({ length: lines }, (_, i) => {
            const currentDevices = getCurrentDevices();
            const currentPlans = getCurrentPlans();
            
            return (
              <div key={i} style={{
                background: 'white',
                border: '2px solid #e0e0e0',
                borderRadius: '12px',
                padding: '20px',
                marginBottom: '20px'
              }}>
                <div style={{
                  fontSize: '18px',
                  fontWeight: '600',
                  color: '#E20074',
                  marginBottom: '15px'
                }}>
                  {selectedCategory === 'tablet' ? 'Tablet' : 'Wearable'} {i + 1}
                </div>

                {/* Device Selection */}
                <div style={{ marginBottom: '20px' }}>
                  <label style={{ display: 'block', marginBottom: '10px', fontWeight: '600' }}>
                    Select Device
                  </label>
                  <select
                    value={devices[i] || ''}
                    onChange={(e) => handleDeviceChange(i, e.target.value)}
                    style={{
                      width: '100%',
                      padding: '12px',
                      border: '2px solid #e0e0e0',
                      borderRadius: '8px',
                      fontSize: '16px',
                      background: 'white'
                    }}
                  >
                    <option value="">Select Device</option>
                    {currentDevices.map(device => (
                      <option key={device.id} value={device.id}>
                        {device.name} - ${device.price}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Plan Selection */}
                <div style={{ marginBottom: '20px' }}>
                  <label style={{ display: 'block', marginBottom: '10px', fontWeight: '600' }}>
                    Select Plan
                  </label>
                  <div style={{ display: 'grid', gap: '10px' }}>
                    {currentPlans.map(plan => (
                      <label key={plan.id} style={{ display: 'flex', alignItems: 'center', gap: '10px', cursor: 'pointer' }}>
                        <input
                          type="radio"
                          name={`plan-${i}`}
                          value={plan.id}
                          checked={plans[i] === plan.id}
                          onChange={(e) => handlePlanChange(i, e.target.value)}
                          style={{ accentColor: '#E20074' }}
                        />
                        <span>{plan.name} - ${plan.price}/mo</span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Protection Plan */}
                <div>
                  <label style={{ display: 'flex', alignItems: 'center', gap: '10px', cursor: 'pointer' }}>
                    <input
                      type="checkbox"
                      checked={protection[i] || false}
                      onChange={(e) => handleProtectionChange(i, e.target.checked)}
                      style={{ accentColor: '#E20074' }}
                    />
                    <span>Add P360 Protection Plan</span>
                  </label>
                </div>
              </div>
            );
          })}

          {/* Summary */}
          <div style={{
            background: '#f8f9fa',
            padding: '20px',
            borderRadius: '12px',
            marginBottom: '30px',
            border: '1px solid #e0e0e0'
          }}>
            <div style={{ fontWeight: '600', marginBottom: '10px', color: '#E20074' }}>
              {selectedCategory === 'tablet' ? 'Tablet' : 'Wearable'} Summary
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span>Total Monthly Cost:</span>
              <span style={{ fontWeight: '600' }}>${calculateTotal()}/mo</span>
            </div>
          </div>
        </>
      )}

      {/* Navigation Buttons */}
      <div className="button-group">
        <button 
          className="button secondary" 
          onClick={onSkip}
          style={{ display: 'flex', alignItems: 'center', gap: '8px' }}
        >
          Skip Tablet/Wearable Setup
          <ArrowRight size={20} />
        </button>
        {selectedCategory && (
          <button 
            className="button primary" 
            onClick={handleNext}
            disabled={!canProceed()}
            style={{ display: 'flex', alignItems: 'center', gap: '8px' }}
          >
            Continue to Main Flow
            <ArrowRight size={20} />
          </button>
        )}
      </div>
    </div>
  );
};

export default TabletWearableFlow;
