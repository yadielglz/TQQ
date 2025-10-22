import React, { useState, useCallback } from 'react';
import { Watch, ArrowLeft, ArrowRight, Plus, Minus, Check } from 'lucide-react';
import { getDevicesByCategory } from '../data/devices.js';

const IoTLinesFlow = ({ data, onDataChange, onComplete, onPrev, onNext }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [selectedDevices, setSelectedDevices] = useState(data.devices || {});
  const [selectedPlans, setSelectedPlans] = useState(data.plans || {});
  const [selectedProtection, setSelectedProtection] = useState(data.protection || {});
  const [selectedPromotions, setSelectedPromotions] = useState(data.promotions || {});

  const steps = [
    { id: 'quantity', title: 'Quantity', description: 'How many IoT lines?' },
    { id: 'devices', title: 'Devices', description: 'Select IoT devices' },
    { id: 'plans', title: 'Plans', description: 'Choose IoT plans' },
    { id: 'protection', title: 'Protection', description: 'Device protection options' },
    { id: 'promotions', title: 'Promotions', description: 'Available promotions' }
  ];

  const iotDevices = getDevicesByCategory('iot');
  const hotspotDevices = getDevicesByCategory('hotspot');

  const iotPlans = [
    {
      id: 'unlimited-iot',
      name: 'Unlimited IoT',
      price: 15,
      features: ['Unlimited data', '5G access', 'Device management']
    },
    {
      id: '2gb-iot',
      name: '2GB IoT',
      price: 5,
      features: ['2GB high-speed data', '5G access', 'Device management']
    },
    {
      id: '500mb-iot',
      name: '500MB IoT',
      price: 2,
      features: ['500MB high-speed data', '5G access', 'Device management']
    }
  ];

  const protectionOptions = [
    {
      id: 'premium-protection',
      name: 'Premium Protection',
      price: 8,
      features: ['Device replacement', 'Extended warranty', 'Technical support']
    },
    {
      id: 'basic-protection',
      name: 'Basic Protection',
      price: 4,
      features: ['Device replacement', 'Basic warranty']
    },
    {
      id: 'no-protection',
      name: 'No Protection',
      price: 0,
      features: ['Standard warranty only']
    }
  ];

  const handleQuantityChange = useCallback((quantity) => {
    const newData = { ...data, quantity };
    onDataChange(newData);
  }, [data, onDataChange]);

  const handleDeviceSelect = useCallback((lineIndex, deviceId) => {
    const newDevices = { ...selectedDevices, [lineIndex]: deviceId };
    setSelectedDevices(newDevices);
    const newData = { ...data, devices: newDevices };
    onDataChange(newData);
  }, [selectedDevices, data, onDataChange]);

  const handlePlanSelect = useCallback((lineIndex, planId) => {
    const newPlans = { ...selectedPlans, [lineIndex]: planId };
    setSelectedPlans(newPlans);
    const newData = { ...data, plans: newPlans };
    onDataChange(newData);
  }, [selectedPlans, data, onDataChange]);

  const handleProtectionSelect = useCallback((lineIndex, protectionId) => {
    const newProtection = { ...selectedProtection, [lineIndex]: protectionId };
    setSelectedProtection(newProtection);
    const newData = { ...data, protection: newProtection };
    onDataChange(newData);
  }, [selectedProtection, data, onDataChange]);

  const handlePromotionToggle = useCallback((lineIndex, promotionId) => {
    const currentPromotions = selectedPromotions[lineIndex] || [];
    const newPromotions = currentPromotions.includes(promotionId)
      ? currentPromotions.filter(id => id !== promotionId)
      : [...currentPromotions, promotionId];
    
    const updatedPromotions = { ...selectedPromotions, [lineIndex]: newPromotions };
    setSelectedPromotions(updatedPromotions);
    const newData = { ...data, promotions: updatedPromotions };
    onDataChange(newData);
  }, [selectedPromotions, data, onDataChange]);

  const nextStep = useCallback(() => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      onComplete();
    }
  }, [currentStep, steps.length, onComplete]);

  const prevStep = useCallback(() => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    } else {
      onPrev();
    }
  }, [currentStep, onPrev]);

  const renderQuantityStep = () => (
    <div style={{ padding: '20px' }}>
      <h3 style={{ fontSize: '20px', fontWeight: '600', marginBottom: '20px', color: '#333' }}>
        How many IoT lines do you need?
      </h3>
      <div style={{ display: 'flex', alignItems: 'center', gap: '20px', justifyContent: 'center' }}>
        <button
          onClick={() => handleQuantityChange(Math.max(0, (data.quantity || 0) - 1))}
          style={{
            width: '40px',
            height: '40px',
            borderRadius: '50%',
            border: '2px solid #E20074',
            background: 'white',
            color: '#E20074',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer'
          }}
        >
          <Minus size={20} />
        </button>
        <div style={{ fontSize: '32px', fontWeight: '700', color: '#E20074', minWidth: '60px', textAlign: 'center' }}>
          {data.quantity || 0}
        </div>
        <button
          onClick={() => handleQuantityChange((data.quantity || 0) + 1)}
          style={{
            width: '40px',
            height: '40px',
            borderRadius: '50%',
            border: '2px solid #E20074',
            background: 'white',
            color: '#E20074',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer'
          }}
        >
          <Plus size={20} />
        </button>
      </div>
      <p style={{ textAlign: 'center', color: '#666', marginTop: '20px' }}>
        IoT lines are for connected devices like trackers and hotspots
      </p>
    </div>
  );

  const renderDevicesStep = () => (
    <div style={{ padding: '20px' }}>
      <h3 style={{ fontSize: '20px', fontWeight: '600', marginBottom: '20px', color: '#333' }}>
        Select devices for each IoT line
      </h3>
      {Array.from({ length: data.quantity || 0 }, (_, index) => (
        <div key={index} style={{ marginBottom: '30px' }}>
          <h4 style={{ fontSize: '16px', fontWeight: '600', marginBottom: '15px', color: '#666' }}>
            IoT Line {index + 1}
          </h4>
          
          {/* IoT Devices */}
          <div style={{ marginBottom: '20px' }}>
            <h5 style={{ fontSize: '14px', fontWeight: '600', marginBottom: '10px', color: '#333' }}>
              IoT Devices
            </h5>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '10px' }}>
              {iotDevices.map(device => (
                <button
                  key={device.id}
                  onClick={() => handleDeviceSelect(index, device.id)}
                  style={{
                    padding: '15px',
                    border: selectedDevices[index] === device.id ? '2px solid #E20074' : '1px solid #e0e0e0',
                    borderRadius: '8px',
                    background: selectedDevices[index] === device.id ? '#fdf2f8' : 'white',
                    cursor: 'pointer',
                    textAlign: 'left',
                    transition: 'all 0.3s ease'
                  }}
                >
                  <div style={{ fontSize: '14px', fontWeight: '600', marginBottom: '5px' }}>
                    {device.name}
                  </div>
                  <div style={{ fontSize: '12px', color: '#666', marginBottom: '5px' }}>
                    ${device.monthlyPayment}/mo
                  </div>
                  <div style={{ fontSize: '11px', color: '#999' }}>
                    {device.brand}
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Hotspots */}
          <div>
            <h5 style={{ fontSize: '14px', fontWeight: '600', marginBottom: '10px', color: '#333' }}>
              Hotspots
            </h5>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '10px' }}>
              {hotspotDevices.map(device => (
                <button
                  key={device.id}
                  onClick={() => handleDeviceSelect(index, device.id)}
                  style={{
                    padding: '15px',
                    border: selectedDevices[index] === device.id ? '2px solid #E20074' : '1px solid #e0e0e0',
                    borderRadius: '8px',
                    background: selectedDevices[index] === device.id ? '#fdf2f8' : 'white',
                    cursor: 'pointer',
                    textAlign: 'left',
                    transition: 'all 0.3s ease'
                  }}
                >
                  <div style={{ fontSize: '14px', fontWeight: '600', marginBottom: '5px' }}>
                    {device.name}
                  </div>
                  <div style={{ fontSize: '12px', color: '#666', marginBottom: '5px' }}>
                    ${device.monthlyPayment}/mo
                  </div>
                  <div style={{ fontSize: '11px', color: '#999' }}>
                    {device.brand}
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>
      ))}
    </div>
  );

  const renderPlansStep = () => (
    <div style={{ padding: '20px' }}>
      <h3 style={{ fontSize: '20px', fontWeight: '600', marginBottom: '20px', color: '#333' }}>
        Select IoT plans for each line
      </h3>
      {Array.from({ length: data.quantity || 0 }, (_, index) => (
        <div key={index} style={{ marginBottom: '30px' }}>
          <h4 style={{ fontSize: '16px', fontWeight: '600', marginBottom: '15px', color: '#666' }}>
            IoT Line {index + 1} Plan
          </h4>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '15px' }}>
            {iotPlans.map(plan => (
              <button
                key={plan.id}
                onClick={() => handlePlanSelect(index, plan.id)}
                style={{
                  padding: '20px',
                  border: selectedPlans[index] === plan.id ? '2px solid #E20074' : '1px solid #e0e0e0',
                  borderRadius: '8px',
                  background: selectedPlans[index] === plan.id ? '#fdf2f8' : 'white',
                  cursor: 'pointer',
                  textAlign: 'left',
                  transition: 'all 0.3s ease'
                }}
              >
                <div style={{ fontSize: '16px', fontWeight: '600', marginBottom: '8px', color: '#333' }}>
                  {plan.name}
                </div>
                <div style={{ fontSize: '18px', fontWeight: '700', color: '#E20074', marginBottom: '10px' }}>
                  ${plan.price}/mo
                </div>
                <ul style={{ fontSize: '12px', color: '#666', margin: 0, paddingLeft: '15px' }}>
                  {plan.features.map((feature, i) => (
                    <li key={i} style={{ marginBottom: '3px' }}>{feature}</li>
                  ))}
                </ul>
              </button>
            ))}
          </div>
        </div>
      ))}
    </div>
  );

  const renderProtectionStep = () => (
    <div style={{ padding: '20px' }}>
      <h3 style={{ fontSize: '20px', fontWeight: '600', marginBottom: '20px', color: '#333' }}>
        Select protection for each device
      </h3>
      {Array.from({ length: data.quantity || 0 }, (_, index) => (
        <div key={index} style={{ marginBottom: '30px' }}>
          <h4 style={{ fontSize: '16px', fontWeight: '600', marginBottom: '15px', color: '#666' }}>
            IoT Line {index + 1} Protection
          </h4>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '15px' }}>
            {protectionOptions.map(protection => (
              <button
                key={protection.id}
                onClick={() => handleProtectionSelect(index, protection.id)}
                style={{
                  padding: '20px',
                  border: selectedProtection[index] === protection.id ? '2px solid #E20074' : '1px solid #e0e0e0',
                  borderRadius: '8px',
                  background: selectedProtection[index] === protection.id ? '#fdf2f8' : 'white',
                  cursor: 'pointer',
                  textAlign: 'left',
                  transition: 'all 0.3s ease'
                }}
              >
                <div style={{ fontSize: '16px', fontWeight: '600', marginBottom: '8px', color: '#333' }}>
                  {protection.name}
                </div>
                <div style={{ fontSize: '18px', fontWeight: '700', color: '#E20074', marginBottom: '10px' }}>
                  ${protection.price}/mo
                </div>
                <ul style={{ fontSize: '12px', color: '#666', margin: 0, paddingLeft: '15px' }}>
                  {protection.features.map((feature, i) => (
                    <li key={i} style={{ marginBottom: '3px' }}>{feature}</li>
                  ))}
                </ul>
              </button>
            ))}
          </div>
        </div>
      ))}
    </div>
  );

  const renderPromotionsStep = () => (
    <div style={{ padding: '20px' }}>
      <h3 style={{ fontSize: '20px', fontWeight: '600', marginBottom: '20px', color: '#333' }}>
        Available promotions for IoT lines
      </h3>
      {Array.from({ length: data.quantity || 0 }, (_, index) => (
        <div key={index} style={{ marginBottom: '30px' }}>
          <h4 style={{ fontSize: '16px', fontWeight: '600', marginBottom: '15px', color: '#666' }}>
            IoT Line {index + 1} Promotions
          </h4>
          <div style={{
            background: '#f8f9fa',
            padding: '20px',
            borderRadius: '8px',
            border: '1px solid #e0e0e0'
          }}>
            <div style={{ fontSize: '14px', color: '#666', textAlign: 'center' }}>
              <Check size={24} style={{ marginBottom: '10px', color: '#4CAF50' }} />
              <div>Device-specific promotions available</div>
              <div style={{ fontSize: '12px', marginTop: '5px' }}>
                Check device details for available offers
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );

  const renderCurrentStep = () => {
    switch (currentStep) {
      case 0: return renderQuantityStep();
      case 1: return renderDevicesStep();
      case 2: return renderPlansStep();
      case 3: return renderProtectionStep();
      case 4: return renderPromotionsStep();
      default: return renderQuantityStep();
    }
  };

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
          <Watch size={24} color="#E20074" />
          <h2 style={{ fontSize: '24px', fontWeight: '700', color: '#E20074', margin: 0 }}>
            IoT Lines Setup
          </h2>
        </div>
        <p style={{ color: '#666', fontSize: '14px', margin: 0, lineHeight: '1.4' }}>
          Configure IoT devices and connectivity for your account.
        </p>
        
        {/* Progress */}
        <div style={{ marginTop: '15px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            {steps.map((step, index) => (
              <div key={step.id} style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                <div style={{
                  width: '24px',
                  height: '24px',
                  borderRadius: '50%',
                  background: index <= currentStep ? '#E20074' : '#e0e0e0',
                  color: 'white',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '12px',
                  fontWeight: '600'
                }}>
                  {index < currentStep ? '✓' : index + 1}
                </div>
                <span style={{
                  fontSize: '12px',
                  color: index <= currentStep ? '#E20074' : '#666',
                  fontWeight: index === currentStep ? '600' : '400'
                }}>
                  {step.title}
                </span>
                {index < steps.length - 1 && (
                  <div style={{ width: '20px', height: '1px', background: '#e0e0e0', margin: '0 5px' }} />
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Content */}
      <div style={{ flex: 1, overflowY: 'auto' }}>
        {renderCurrentStep()}
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
          onClick={prevStep}
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
          {currentStep === 0 ? 'Back to Services' : 'Previous'}
        </button>
        
        <div style={{ fontSize: '14px', color: '#666', textAlign: 'center' }}>
          Step {currentStep + 1} of {steps.length}: {steps[currentStep].title}
        </div>
        
        <button
          onClick={nextStep}
          style={{
            padding: '12px 24px',
            border: '2px solid #E20074',
            borderRadius: '8px',
            background: '#E20074',
            color: 'white',
            fontSize: '16px',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            transition: 'all 0.3s ease'
          }}
        >
          {currentStep === steps.length - 1 ? 'Complete' : 'Next'}
          <ArrowRight size={16} />
        </button>
      </div>
    </div>
  );
};

export default IoTLinesFlow;