import React, { useState, useCallback } from 'react';
import { Home, ArrowLeft, ArrowRight, Check } from 'lucide-react';

const HomeInternetFlow = ({ data, onDataChange, onComplete, onPrev, onNext }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [selectedDevice, setSelectedDevice] = useState(data.device || null);
  const [selectedPlan, setSelectedPlan] = useState(data.plan || null);
  const [selectedPromotions, setSelectedPromotions] = useState(data.promotions || []);

  const steps = [
    { id: 'device', title: 'Device', description: 'Select home internet device' },
    { id: 'plan', title: 'Plan', description: 'Choose internet plan' },
    { id: 'promotions', title: 'Promotions', description: 'Available promotions' }
  ];

  const homeInternetDevices = [
    {
      id: 'tmhi-gateway',
      name: 'T-Mobile Home Internet Gateway',
      brand: 'T-Mobile',
      price: 0,
      monthlyPayment: 0,
      features: ['5G Home Internet', 'WiFi 6', 'Easy setup', 'No installation required'],
      image: '/devices/tmhi-gateway.jpg',
      availability: 'in-stock'
    },
    {
      id: 'tmhi-gateway-pro',
      name: 'T-Mobile Home Internet Gateway Pro',
      brand: 'T-Mobile',
      price: 0,
      monthlyPayment: 0,
      features: ['5G Home Internet', 'WiFi 6E', 'Advanced features', 'No installation required'],
      image: '/devices/tmhi-gateway-pro.jpg',
      availability: 'in-stock'
    }
  ];

  const homeInternetPlans = [
    {
      id: 'unlimited-home',
      name: 'Unlimited Home Internet',
      price: 50,
      features: ['Unlimited data', '5G speeds', 'No data caps', 'No contracts', 'Free equipment']
    },
    {
      id: 'unlimited-home-plus',
      name: 'Unlimited Home Internet Plus',
      price: 60,
      features: ['Unlimited data', '5G speeds', 'No data caps', 'No contracts', 'Free equipment', 'Priority data']
    }
  ];

  const homeInternetPromotions = [
    {
      id: 'hsi-200-rebate',
      name: 'Up to $200 Rebate with HSI Line',
      description: 'Get up to $200 rebate when adding Home Internet',
      value: 200,
      requirements: ['Requires Active HSI', 'New line required']
    },
    {
      id: 'hsi-5-off-voice',
      name: '$5 Off HSI with Any Voice Line',
      description: 'Save $5/month on Home Internet when you have voice lines',
      value: 5,
      requirements: ['Bundle Offer', 'Voice line required']
    },
    {
      id: 'metronet-one-month-free',
      name: 'Metronet One Month Free',
      description: 'Get your first month free with Metronet fiber',
      value: 50,
      requirements: ['Fiber Internet', 'New customer']
    },
    {
      id: 'fiber-100-300-rebate',
      name: '$100/$300 Rebate with Fiber',
      description: 'Get rebate when adding fiber internet',
      value: 200,
      requirements: ['Fiber Line', 'New line required']
    },
    {
      id: 'fiber-voice-200-400-rebate',
      name: '$200/$400 Rebate with Fiber & Voice Line',
      description: 'Get rebate when adding fiber and voice line',
      value: 300,
      requirements: ['Fiber + Voice', 'Bundle required']
    }
  ];

  const handleDeviceSelect = useCallback((deviceId) => {
    setSelectedDevice(deviceId);
    const newData = { ...data, device: deviceId };
    onDataChange(newData);
  }, [data, onDataChange]);

  const handlePlanSelect = useCallback((planId) => {
    setSelectedPlan(planId);
    const newData = { ...data, plan: planId };
    onDataChange(newData);
  }, [data, onDataChange]);

  const handlePromotionToggle = useCallback((promotionId) => {
    const newPromotions = selectedPromotions.includes(promotionId)
      ? selectedPromotions.filter(id => id !== promotionId)
      : [...selectedPromotions, promotionId];
    
    setSelectedPromotions(newPromotions);
    const newData = { ...data, promotions: newPromotions };
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

  const renderDeviceStep = () => (
    <div style={{ padding: '20px' }}>
      <h3 style={{ fontSize: '20px', fontWeight: '600', marginBottom: '20px', color: '#333' }}>
        Select your home internet device
      </h3>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '20px' }}>
        {homeInternetDevices.map(device => (
          <button
            key={device.id}
            onClick={() => handleDeviceSelect(device.id)}
            style={{
              padding: '20px',
              border: selectedDevice === device.id ? '2px solid #E20074' : '1px solid #e0e0e0',
              borderRadius: '8px',
              background: selectedDevice === device.id ? '#fdf2f8' : 'white',
              cursor: 'pointer',
              textAlign: 'left',
              transition: 'all 0.3s ease'
            }}
          >
            <div style={{ fontSize: '18px', fontWeight: '600', marginBottom: '8px', color: '#333' }}>
              {device.name}
            </div>
            <div style={{ fontSize: '14px', color: '#666', marginBottom: '10px' }}>
              {device.brand}
            </div>
            <div style={{ fontSize: '16px', fontWeight: '700', color: '#E20074', marginBottom: '15px' }}>
              {device.price === 0 ? 'Free' : `$${device.price}`}
            </div>
            <ul style={{ fontSize: '12px', color: '#666', margin: 0, paddingLeft: '15px' }}>
              {device.features.map((feature, i) => (
                <li key={i} style={{ marginBottom: '3px' }}>{feature}</li>
              ))}
            </ul>
          </button>
        ))}
      </div>
    </div>
  );

  const renderPlanStep = () => (
    <div style={{ padding: '20px' }}>
      <h3 style={{ fontSize: '20px', fontWeight: '600', marginBottom: '20px', color: '#333' }}>
        Select your home internet plan
      </h3>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '20px' }}>
        {homeInternetPlans.map(plan => (
          <button
            key={plan.id}
            onClick={() => handlePlanSelect(plan.id)}
            style={{
              padding: '20px',
              border: selectedPlan === plan.id ? '2px solid #E20074' : '1px solid #e0e0e0',
              borderRadius: '8px',
              background: selectedPlan === plan.id ? '#fdf2f8' : 'white',
              cursor: 'pointer',
              textAlign: 'left',
              transition: 'all 0.3s ease'
            }}
          >
            <div style={{ fontSize: '18px', fontWeight: '600', marginBottom: '8px', color: '#333' }}>
              {plan.name}
            </div>
            <div style={{ fontSize: '24px', fontWeight: '700', color: '#E20074', marginBottom: '15px' }}>
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
  );

  const renderPromotionsStep = () => (
    <div style={{ padding: '20px' }}>
      <h3 style={{ fontSize: '20px', fontWeight: '600', marginBottom: '20px', color: '#333' }}>
        Available home internet promotions
      </h3>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '15px' }}>
        {homeInternetPromotions.map(promotion => (
          <div
            key={promotion.id}
            style={{
              padding: '20px',
              border: selectedPromotions.includes(promotion.id) ? '2px solid #E20074' : '1px solid #e0e0e0',
              borderRadius: '8px',
              background: selectedPromotions.includes(promotion.id) ? '#fdf2f8' : 'white',
              cursor: 'pointer',
              transition: 'all 0.3s ease'
            }}
            onClick={() => handlePromotionToggle(promotion.id)}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '10px' }}>
              <input
                type="checkbox"
                checked={selectedPromotions.includes(promotion.id)}
                onChange={() => handlePromotionToggle(promotion.id)}
                style={{ width: '16px', height: '16px' }}
              />
              <div style={{ fontSize: '16px', fontWeight: '600', color: '#333' }}>
                {promotion.name}
              </div>
            </div>
            <div style={{ fontSize: '14px', color: '#666', marginBottom: '10px' }}>
              {promotion.description}
            </div>
            <div style={{ fontSize: '18px', fontWeight: '700', color: '#4CAF50', marginBottom: '10px' }}>
              ${promotion.value} value
            </div>
            <div style={{ fontSize: '12px', color: '#999' }}>
              <strong>Requirements:</strong> {promotion.requirements.join(', ')}
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderCurrentStep = () => {
    switch (currentStep) {
      case 0: return renderDeviceStep();
      case 1: return renderPlanStep();
      case 2: return renderPromotionsStep();
      default: return renderDeviceStep();
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
          <Home size={24} color="#E20074" />
          <h2 style={{ fontSize: '24px', fontWeight: '700', color: '#E20074', margin: 0 }}>
            Home Internet Setup
          </h2>
        </div>
        <p style={{ color: '#666', fontSize: '14px', margin: 0, lineHeight: '1.4' }}>
          Configure home internet and fiber services for your account.
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

export default HomeInternetFlow;