import React, { useState } from 'react';
import { Tablet, Watch, ArrowRight, ArrowLeft, Plus, Minus } from 'lucide-react';

const DataLinesFlow = ({ data, onDataChange, onComplete, onAddAnother, onPrev }) => {
  const [selectedCategory, setSelectedCategory] = useState(data.category || '');
  const [lines, setLines] = useState(data.quantity || 1);
  const [devices, setDevices] = useState(data.devices || {});
  const [plans, setPlans] = useState(data.plans || {});
  const [protection, setProtection] = useState(data.protection || {});
  const [promotions, setPromotions] = useState(data.promotions || {});

  const categories = [
    { id: 'tablet', name: 'Tablet', icon: Tablet, color: '#E20074' },
    { id: 'wearable', name: 'Wearable', icon: Watch, color: '#1E88E5' }
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

  const handleCategoryChange = (categoryId) => {
    setSelectedCategory(categoryId);
    // Reset other data when category changes
    setDevices({});
    setPlans({});
    setProtection({});
    setPromotions({});
  };

  const handleLinesChange = (newLines) => {
    if (newLines >= 1 && newLines <= 5) {
      setLines(newLines);
    }
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

  const handlePromotionChange = (lineIndex, promotionId) => {
    const newPromotions = { ...promotions };
    newPromotions[lineIndex] = promotionId;
    setPromotions(newPromotions);
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

  const handleComplete = () => {
    const dataLinesData = {
      category: selectedCategory,
      quantity: lines,
      devices,
      plans,
      protection,
      promotions,
      totalMonthly: calculateTotal()
    };
    
    onDataChange(dataLinesData);
    onComplete();
  };

  const handleAddAnother = () => {
    const dataLinesData = {
      category: selectedCategory,
      quantity: lines,
      devices,
      plans,
      protection,
      promotions,
      totalMonthly: calculateTotal()
    };
    
    onDataChange(dataLinesData);
    onAddAnother();
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
          <Tablet size={24} color="#E20074" />
          <h2 style={{
            fontSize: '24px',
            fontWeight: '700',
            color: '#E20074',
            margin: 0
          }}>
            Data Lines Setup
          </h2>
        </div>
        <p style={{ 
          color: '#666', 
          fontSize: '14px',
          margin: 0,
          lineHeight: '1.4'
        }}>
          Configure tablets and wearables for your account. Choose the category and configure each line.
        </p>
      </div>

      {/* Category Selection */}
      <div style={{ marginBottom: '20px' }}>
        <label style={{ display: 'block', marginBottom: '10px', fontWeight: '600', fontSize: '16px' }}>
          Select Category
        </label>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '12px' }}>
          {categories.map(category => (
            <div
              key={category.id}
              onClick={() => handleCategoryChange(category.id)}
              style={{
                cursor: 'pointer',
                border: `2px solid ${selectedCategory === category.id ? '#E20074' : '#e0e0e0'}`,
                borderRadius: '8px',
                padding: '15px',
                background: selectedCategory === category.id ? 'rgba(226, 0, 116, 0.05)' : 'white',
                transition: 'all 0.2s ease',
                textAlign: 'center'
              }}
            >
              <category.icon size={24} color="#E20074" style={{ marginBottom: '8px' }} />
              <div style={{ fontSize: '14px', fontWeight: '600', color: '#333' }}>{category.name}</div>
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
            <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
              <button
                onClick={() => handleLinesChange(lines - 1)}
                disabled={lines <= 1}
                style={{
                  background: lines <= 1 ? '#ccc' : '#E20074',
                  color: 'white',
                  border: 'none',
                  borderRadius: '50%',
                  width: '40px',
                  height: '40px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: lines <= 1 ? 'not-allowed' : 'pointer'
                }}
              >
                <Minus size={20} />
              </button>
              <span style={{ fontSize: '18px', fontWeight: '600', minWidth: '30px', textAlign: 'center' }}>
                {lines}
              </span>
              <button
                onClick={() => handleLinesChange(lines + 1)}
                disabled={lines >= 5}
                style={{
                  background: lines >= 5 ? '#ccc' : '#E20074',
                  color: 'white',
                  border: 'none',
                  borderRadius: '50%',
                  width: '40px',
                  height: '40px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: lines >= 5 ? 'not-allowed' : 'pointer'
                }}
              >
                <Plus size={20} />
              </button>
            </div>
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
                <div style={{ marginBottom: '20px' }}>
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

                {/* Promotions */}
                <div>
                  <label style={{ display: 'block', marginBottom: '10px', fontWeight: '600' }}>
                    Promotions (Optional)
                  </label>
                  <select
                    value={promotions[i] || ''}
                    onChange={(e) => handlePromotionChange(i, e.target.value)}
                    style={{
                      width: '100%',
                      padding: '12px',
                      border: '2px solid #e0e0e0',
                      borderRadius: '8px',
                      fontSize: '16px',
                      background: 'white'
                    }}
                  >
                    <option value="">No Promotion</option>
                    <option value="tablet-promo">Tablet Promotion</option>
                    <option value="wearable-promo">Wearable Promotion</option>
                  </select>
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
        {canProceed() && (
          <>
            <button
              className="button-secondary"
              onClick={handleAddAnother}
              style={{ flex: 1 }}
            >
              Add Another Service
              <ArrowRight size={16} style={{ marginLeft: '8px' }} />
            </button>
            <button
              className="button"
              onClick={handleComplete}
              style={{ flex: 1 }}
            >
              Complete Data Lines
              <ArrowRight size={16} style={{ marginLeft: '8px' }} />
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default DataLinesFlow;

