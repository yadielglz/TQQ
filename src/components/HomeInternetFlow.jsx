import React, { useState } from 'react';
import { Home, Wifi, ArrowRight, ArrowLeft, CheckCircle } from 'lucide-react';

const HomeInternetFlow = ({ 
  data, 
  onDataChange, 
  onComplete, 
  onAddAnother, 
  onPrev 
}) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  // Initialize data from props or defaults
  const [device, setDevice] = useState(data?.device || null);
  const [plan, setPlan] = useState(data?.plan || null);

  const steps = [
    { id: 0, title: 'Gateway Device', icon: Home, component: 'device' },
    { id: 1, title: 'Internet Plans', icon: Wifi, component: 'plans' }
  ];

  const gatewayDevices = [
    {
      id: 'tmobile-home-internet-gateway',
      name: 'T-Mobile Home Internet Gateway',
      price: 0,
      description: 'High-speed 5G gateway for home internet service'
    },
    {
      id: 'backup-gateway',
      name: 'Backup Gateway',
      price: 0,
      description: 'Backup gateway for redundancy'
    }
  ];

  const homeInternetPlans = [
    { id: 'rely-home-internet', name: 'Rely Home Internet', price: 50, description: 'Reliable home internet service' },
    { id: 'amplified-home-internet', name: 'Amplified Home Internet', price: 60, description: 'Enhanced home internet with priority data' },
    { id: 'all-in-home-internet', name: 'All-In Home Internet', price: 70, description: 'Premium home internet with unlimited data' },
    { id: 'home-internet-backup', name: 'Home Internet Backup', price: 20, description: 'Backup internet service' },
    { id: 'away-unlimited-plan', name: 'T-Mobile Away Unlimited Plan', price: 160, description: 'Unlimited data for travel' },
    { id: 'away-200gb-plan', name: 'T-Mobile Away 200GB Plan', price: 110, description: '200GB data for travel' }
  ];

  const nextStep = () => {
    if (currentStep < steps.length - 1) {
      setIsLoading(true);
      setTimeout(() => {
        setCurrentStep(currentStep + 1);
        setIsLoading(false);
      }, 300);
    } else {
      handleComplete();
    }
  };

  const prevStep = () => {
    if (currentStep > 0) {
      setIsLoading(true);
      setTimeout(() => {
        setCurrentStep(currentStep - 1);
        setIsLoading(false);
      }, 300);
    } else {
      onPrev();
    }
  };

  const handleComplete = () => {
    const homeInternetData = {
      device,
      plan,
      totalMonthly: plan ? homeInternetPlans.find(p => p.id === plan)?.price || 0 : 0
    };
    
    onDataChange(homeInternetData);
    onComplete();
  };

  const handleAddAnother = () => {
    const homeInternetData = {
      device,
      plan,
      totalMonthly: plan ? homeInternetPlans.find(p => p.id === plan)?.price || 0 : 0
    };
    
    onDataChange(homeInternetData);
    onAddAnother();
  };

  const renderStepIndicator = () => (
    <div style={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      marginBottom: '30px',
      flexWrap: 'wrap',
      gap: '10px'
    }}>
      {steps.map((step, index) => {
        const Icon = step.icon;
        const isActive = currentStep === step.id;
        const isCompleted = currentStep > step.id;
        
        return (
          <React.Fragment key={step.id}>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              padding: '12px 20px',
              background: isActive 
                ? '#E20074' 
                : isCompleted 
                  ? '#4CAF50' 
                  : 'rgba(255,255,255,0.1)',
              borderRadius: '25px',
              color: 'white',
              transition: 'all 0.3s ease',
              backdropFilter: 'blur(10px)',
              border: isActive ? '2px solid rgba(255,255,255,0.3)' : '2px solid transparent'
            }}>
              <div style={{
                marginRight: '8px',
                display: 'flex',
                alignItems: 'center'
              }}>
                {isCompleted ? <CheckCircle size={20} /> : <Icon size={20} />}
              </div>
              <span style={{ 
                fontSize: '14px', 
                fontWeight: '600',
                whiteSpace: 'nowrap'
              }}>
                {step.title}
              </span>
            </div>
            
            {index < steps.length - 1 && (
              <div style={{
                width: '30px',
                height: '2px',
                background: currentStep > step.id ? '#4CAF50' : 'rgba(255,255,255,0.3)',
                transition: 'background 0.3s ease'
              }} />
            )}
          </React.Fragment>
        );
      })}
    </div>
  );

  const renderDeviceStep = () => (
    <div className="form-section">
      <div className="section-title">
        <Home size={24} />
        Gateway Device Selection
      </div>
      
      <p style={{ color: '#666', marginBottom: '30px' }}>
        Choose your home internet gateway device. Both options are free with qualifying plans.
      </p>

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
        gap: '20px',
        marginBottom: '30px'
      }}>
        {gatewayDevices.map((gatewayDevice) => (
          <div
            key={gatewayDevice.id}
            onClick={() => setDevice(gatewayDevice.id)}
            className={`card ${device === gatewayDevice.id ? 'selected' : ''}`}
            style={{ cursor: 'pointer', textAlign: 'center' }}
          >
            <div style={{
              background: '#E20074',
              borderRadius: '50%',
              width: '60px',
              height: '60px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 15px',
              color: 'white'
            }}>
              <Home size={30} />
            </div>
            
            <h3 className="card-title" style={{ marginBottom: '10px' }}>
              {gatewayDevice.name}
            </h3>
            
            <p className="card-description" style={{ marginBottom: '15px' }}>
              {gatewayDevice.description}
            </p>
            
            <div style={{
              background: '#4CAF50',
              color: 'white',
              padding: '6px 12px',
              borderRadius: '20px',
              fontSize: '14px',
              fontWeight: '600',
              display: 'inline-block'
            }}>
              FREE Gateway
            </div>
          </div>
        ))}
      </div>

      <div className="button-group">
        <button className="button-secondary" onClick={prevStep}>
          <ArrowLeft size={16} style={{ marginRight: '8px' }} />
          Back
        </button>
        <button 
          className="button" 
          onClick={nextStep}
          disabled={!device}
        >
          Next
          <ArrowRight size={16} style={{ marginLeft: '8px' }} />
        </button>
      </div>
    </div>
  );

  const renderPlansStep = () => (
    <div className="form-section">
      <div className="section-title">
        <Wifi size={24} />
        Internet Plan Selection
      </div>
      
      <p style={{ color: '#666', marginBottom: '30px' }}>
        Select your home internet plan. You can choose multiple plans if needed.
      </p>

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
        gap: '20px',
        marginBottom: '30px'
      }}>
        {homeInternetPlans.map((planOption) => (
          <div
            key={planOption.id}
            onClick={() => setPlan(planOption.id)}
            className={`card ${plan === planOption.id ? 'selected' : ''}`}
            style={{ cursor: 'pointer' }}
          >
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: '10px'
            }}>
              <h3 className="card-title" style={{ margin: 0 }}>
                {planOption.name}
              </h3>
              <div style={{
                background: '#E20074',
                color: 'white',
                padding: '4px 8px',
                borderRadius: '6px',
                fontSize: '12px',
                fontWeight: '600'
              }}>
                ${planOption.price}/Mo
              </div>
            </div>
            <p className="card-description" style={{ margin: 0 }}>
              {planOption.description}
            </p>
          </div>
        ))}
      </div>

      {/* Note about P360 and Financing */}
      <div style={{
        background: '#e3f2fd',
        padding: '15px',
        borderRadius: '8px',
        marginBottom: '30px',
        border: '1px solid #bbdefb'
      }}>
        <p style={{
          fontSize: '14px',
          color: '#1976d2',
          margin: 0,
          textAlign: 'center'
        }}>
          ℹ️ <strong>Note:</strong> Home Internet plans do not require P360 protection or device financing
        </p>
      </div>

      <div className="button-group">
        <button className="button-secondary" onClick={prevStep}>
          <ArrowLeft size={16} style={{ marginRight: '8px' }} />
          Back
        </button>
        {plan && (
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
              Complete Home Internet
              <CheckCircle size={16} style={{ marginLeft: '8px' }} />
            </button>
          </>
        )}
      </div>
    </div>
  );

  const renderStepContent = () => {
    switch (steps[currentStep].component) {
      case 'device':
        return renderDeviceStep();
      case 'plans':
        return renderPlansStep();
      default:
        return null;
    }
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
          <Home size={24} color="#E20074" />
          <h2 style={{
            fontSize: '24px',
            fontWeight: '700',
            color: '#E20074',
            margin: 0
          }}>
            Home Internet Setup
          </h2>
        </div>
        <p style={{ 
          color: '#666', 
          fontSize: '14px',
          margin: 0,
          lineHeight: '1.4'
        }}>
          Configure home internet service for your account. Simple 2-step process.
        </p>
      </div>

      {/* Step Indicator */}
      {renderStepIndicator()}

      {/* Step Content */}
      <div style={{ position: 'relative' }}>
        {isLoading && (
          <div style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'rgba(255,255,255,0.9)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 1000,
            borderRadius: '12px'
          }}>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
              color: '#e20074',
              fontSize: '16px',
              fontWeight: '600'
            }}>
              <div style={{
                width: '20px',
                height: '20px',
                border: '2px solid #e20074',
                borderTop: '2px solid transparent',
                borderRadius: '50%',
                animation: 'spin 1s linear infinite'
              }} />
              Loading...
            </div>
          </div>
        )}
        {renderStepContent()}
      </div>

      {/* Summary */}
      {device && plan && (
        <div style={{
          background: '#f8f9fa',
          padding: '20px',
          borderRadius: '12px',
          marginTop: '30px',
          border: '1px solid #e0e0e0'
        }}>
          <div style={{ fontWeight: '600', marginBottom: '10px', color: '#E20074' }}>
            Home Internet Summary
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <span>Device: {gatewayDevices.find(d => d.id === device)?.name}</span>
            <span>Plan: {homeInternetPlans.find(p => p.id === plan)?.name}</span>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '5px' }}>
            <span>Monthly Cost:</span>
            <span style={{ fontWeight: '600' }}>
              ${homeInternetPlans.find(p => p.id === plan)?.price || 0}/mo
            </span>
          </div>
        </div>
      )}
    </div>
  );
};

export default HomeInternetFlow;