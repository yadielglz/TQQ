import React, { useState } from 'react';
import { Watch, ArrowRight, ArrowLeft, Plus, Minus } from 'lucide-react';

const IoTLinesFlow = ({ data, onDataChange, onComplete, onAddAnother, onPrev }) => {
  const [lines, setLines] = useState(data.quantity || 1);
  const [devices, setDevices] = useState(data.devices || {});
  const [plans, setPlans] = useState(data.plans || {});
  const [protection, setProtection] = useState(data.protection || {});
  const [promotions, setPromotions] = useState(data.promotions || {});

  const iotDevices = [
    { id: 'syncup-tracker-2', name: 'TCL SyncUP Tracker 2', price: 0 },
    { id: 'syncup-drive', name: 'T-Mobile SyncUP Drive', price: 0 },
    { id: 'linkport-ik511', name: 'TCL Linkport IK511', price: 0 },
    { id: 'lenovo-chromebook', name: 'Lenovo 100e Chromebook Gen 4', price: 0 },
    { id: 'mifi-x-pro', name: 'Inseego MiFi X Pro 5G', price: 0 },
    { id: 'rg2100-hotspot', name: 'JEXtream RG2100 5G Mobile Hotspot', price: 0 },
    { id: 'franklin-t10', name: 'Franklin T10 Mobile Hotspot', price: 0 }
  ];

  const iotPlans = [
    { id: 'iot-500mb', name: 'IoT 500MB', price: 5 },
    { id: 'iot-1gb', name: 'IoT 1GB', price: 10 },
    { id: 'iot-2gb', name: 'IoT 2GB', price: 15 },
    { id: 'iot-5gb', name: 'IoT 5GB', price: 25 },
    { id: 'iot-10gb', name: 'IoT 10GB', price: 40 }
  ];

  const handleLinesChange = (newLines) => {
    if (newLines >= 1 && newLines <= 10) {
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
    for (let i = 0; i < lines; i++) {
      if (!devices[i] || !plans[i]) return false;
    }
    return true;
  };

  const calculateTotal = () => {
    let total = 0;
    
    for (let i = 0; i < lines; i++) {
      const plan = iotPlans.find(p => p.id === plans[i]);
      if (plan) total += plan.price;
    }
    return total;
  };

  const handleComplete = () => {
    const iotLinesData = {
      quantity: lines,
      devices,
      plans,
      protection,
      promotions,
      totalMonthly: calculateTotal()
    };
    
    onDataChange(iotLinesData);
    onComplete();
  };

  const handleAddAnother = () => {
    const iotLinesData = {
      quantity: lines,
      devices,
      plans,
      protection,
      promotions,
      totalMonthly: calculateTotal()
    };
    
    onDataChange(iotLinesData);
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
          <Watch size={24} color="#E20074" />
          <h2 style={{
            fontSize: '24px',
            fontWeight: '700',
            color: '#E20074',
            margin: 0
          }}>
            IoT Lines Setup
          </h2>
        </div>
        <p style={{ 
          color: '#666', 
          fontSize: '14px',
          margin: 0,
          lineHeight: '1.4'
        }}>
          Configure IoT devices like SyncUP trackers, mobile hotspots, and other connected devices.
        </p>
      </div>

      {/* Line Quantity */}
      <div style={{ marginBottom: '30px' }}>
        <label style={{ display: 'block', marginBottom: '10px', fontWeight: '600' }}>
          Number of IoT Lines
        </label>
        <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
          <button
            onClick={() => handleLinesChange(lines - 1)}
            disabled={lines <= 1}
            style={{
              background: lines <= 1 ? '#ccc' : '#4CAF50',
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
            disabled={lines >= 10}
            style={{
              background: lines >= 10 ? '#ccc' : '#4CAF50',
              color: 'white',
              border: 'none',
              borderRadius: '50%',
              width: '40px',
              height: '40px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: lines >= 10 ? 'not-allowed' : 'pointer'
            }}
          >
            <Plus size={20} />
          </button>
        </div>
      </div>

      {/* Device and Plan Selection per Line */}
      {Array.from({ length: lines }, (_, i) => {
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
              color: '#4CAF50',
              marginBottom: '15px'
            }}>
              IoT Line {i + 1}
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
                {iotDevices.map(device => (
                  <option key={device.id} value={device.id}>
                    {device.name} {device.price > 0 ? `- $${device.price}` : '(Free)'}
                  </option>
                ))}
              </select>
            </div>

            {/* Plan Selection */}
            <div style={{ marginBottom: '20px' }}>
              <label style={{ display: 'block', marginBottom: '10px', fontWeight: '600' }}>
                Select Data Plan
              </label>
              <div style={{ display: 'grid', gap: '10px' }}>
                {iotPlans.map(plan => (
                  <label key={plan.id} style={{ display: 'flex', alignItems: 'center', gap: '10px', cursor: 'pointer' }}>
                    <input
                      type="radio"
                      name={`plan-${i}`}
                      value={plan.id}
                      checked={plans[i] === plan.id}
                      onChange={(e) => handlePlanChange(i, e.target.value)}
                      style={{ accentColor: '#4CAF50' }}
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
                  style={{ accentColor: '#4CAF50' }}
                />
                <span>Add P360 Protection Plan (if applicable)</span>
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
                <option value="iot-promo">IoT Device Promotion</option>
                <option value="data-promo">Data Plan Promotion</option>
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
        <div style={{ fontWeight: '600', marginBottom: '10px', color: '#4CAF50' }}>
          IoT Lines Summary
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <span>Total Monthly Cost:</span>
          <span style={{ fontWeight: '600' }}>${calculateTotal()}/mo</span>
        </div>
        <div style={{ fontSize: '12px', color: '#666', marginTop: '5px' }}>
          Note: Most IoT devices are free with qualifying plans
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
              Complete IoT Lines
              <ArrowRight size={16} style={{ marginLeft: '8px' }} />
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default IoTLinesFlow;

