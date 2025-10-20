import React, { useState } from 'react';
import { Wifi, Smartphone, ArrowRight, ArrowLeft, CheckCircle, SkipForward } from 'lucide-react';

const MobileInternetFlow = ({ 
  mobileInternetData, 
  onMobileInternetChange, 
  onNext, 
  onPrev,
  onSkip 
}) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  const steps = [
    { id: 0, title: 'Hotspot Devices', icon: Smartphone, component: 'devices' },
    { id: 1, title: 'Data Plans', icon: Wifi, component: 'plans' }
  ];

  const hotspotDevices = [
    { id: 'tcl-linkport-ik511', name: 'TCL Linkport IK511', price: 0 },
    { id: 'lenovo-100e-chromebook', name: 'Lenovo 100e Chromebook Gen 4', price: 0 },
    { id: 'tcl-syncup-tracker-2', name: 'TCL SyncUP Tracker 2', price: 0 },
    { id: 'tmobile-syncup-drive', name: 'T-Mobile SyncUP Drive', price: 0 },
    { id: 'inseego-mifi-x-pro', name: 'Inseego MiFi X Pro 5G', price: 0 },
    { id: 'jextream-rg2100', name: 'JEXtream RG2100 5G Mobile Hotspot', price: 0 },
    { id: 'franklin-t10', name: 'Franklin T10 Mobile Hotspot', price: 0 }
  ];

  const hotspotPlans = [
    { id: '15gb-plan', name: '15GB Data Plan', price: 20, data: '15GB' },
    { id: '25gb-plan', name: '25GB Data Plan', price: 25, data: '25GB' },
    { id: '100gb-plan', name: '100GB Data Plan', price: 50, data: '100GB' }
  ];

  const nextStep = () => {
    if (currentStep < steps.length - 1) {
      setIsLoading(true);
      setTimeout(() => {
        setCurrentStep(currentStep + 1);
        setIsLoading(false);
      }, 300);
    } else {
      onNext();
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

  const renderDevicesStep = () => (
    <div style={{
      maxWidth: '800px',
      margin: '0 auto',
      padding: '40px 20px',
      background: 'white',
      borderRadius: '16px',
      boxShadow: '0 8px 32px rgba(0,0,0,0.1)'
    }}>
      <h2 style={{
        fontSize: '24px',
        fontWeight: '600',
        color: '#333',
        marginBottom: '20px',
        textAlign: 'center'
      }}>
        Select Hotspot Devices
      </h2>
      
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
        gap: '20px',
        marginBottom: '30px'
      }}>
        {hotspotDevices.map((device) => (
          <div
            key={device.id}
            onClick={() => {
              const newData = { ...mobileInternetData };
              if (!newData.devices) newData.devices = [];
              
              if (newData.devices.includes(device.id)) {
                newData.devices = newData.devices.filter(id => id !== device.id);
              } else {
                newData.devices.push(device.id);
              }
              onMobileInternetChange(newData);
            }}
            style={{
              padding: '20px',
              border: `2px solid ${mobileInternetData?.devices?.includes(device.id) ? '#E20074' : '#e0e0e0'}`,
              borderRadius: '12px',
              cursor: 'pointer',
              transition: 'all 0.3s ease',
              background: mobileInternetData?.devices?.includes(device.id) ? '#fdf2f8' : 'white'
            }}
          >
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: '10px'
            }}>
              <h3 style={{
                fontSize: '18px',
                fontWeight: '600',
                color: '#333',
                margin: 0
              }}>
                {device.name}
              </h3>
              <div style={{
                background: device.price === 0 ? '#4CAF50' : '#E20074',
                color: 'white',
                padding: '4px 8px',
                borderRadius: '6px',
                fontSize: '12px',
                fontWeight: '600'
              }}>
                {device.price === 0 ? 'FREE' : `$${device.price}`}
              </div>
            </div>
            <p style={{
              fontSize: '14px',
              color: '#666',
              margin: 0
            }}>
              Mobile hotspot device for internet connectivity
            </p>
          </div>
        ))}
      </div>

      <div style={{
        display: 'flex',
        justifyContent: 'center',
        gap: '15px'
      }}>
        <button
          onClick={prevStep}
          style={{
            background: '#6c757d',
            color: 'white',
            border: 'none',
            padding: '12px 24px',
            borderRadius: '8px',
            fontSize: '16px',
            fontWeight: '600',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            transition: 'background-color 0.3s ease'
          }}
        >
          <ArrowLeft size={20} />
          Previous
        </button>

        <button
          onClick={onSkip}
          style={{
            background: '#6c757d',
            color: 'white',
            border: 'none',
            padding: '12px 24px',
            borderRadius: '8px',
            fontSize: '16px',
            fontWeight: '600',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            transition: 'background-color 0.3s ease'
          }}
        >
          <SkipForward size={20} />
          Skip
        </button>
        
        <button
          onClick={nextStep}
          disabled={!mobileInternetData?.devices?.length}
          style={{
            background: mobileInternetData?.devices?.length ? '#E20074' : '#ccc',
            color: 'white',
            border: 'none',
            padding: '12px 24px',
            borderRadius: '8px',
            fontSize: '16px',
            fontWeight: '600',
            cursor: mobileInternetData?.devices?.length ? 'pointer' : 'not-allowed',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            transition: 'background-color 0.3s ease'
          }}
        >
          Next
          <ArrowRight size={20} />
        </button>
      </div>
    </div>
  );

  const renderPlansStep = () => (
    <div style={{
      maxWidth: '800px',
      margin: '0 auto',
      padding: '40px 20px',
      background: 'white',
      borderRadius: '16px',
      boxShadow: '0 8px 32px rgba(0,0,0,0.1)'
    }}>
      <h2 style={{
        fontSize: '24px',
        fontWeight: '600',
        color: '#333',
        marginBottom: '20px',
        textAlign: 'center'
      }}>
        Select Data Plans
      </h2>
      
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
        gap: '20px',
        marginBottom: '30px'
      }}>
        {hotspotPlans.map((plan) => (
          <div
            key={plan.id}
            onClick={() => {
              const newData = { ...mobileInternetData };
              if (!newData.plans) newData.plans = [];
              
              if (newData.plans.includes(plan.id)) {
                newData.plans = newData.plans.filter(id => id !== plan.id);
              } else {
                newData.plans.push(plan.id);
              }
              onMobileInternetChange(newData);
            }}
            style={{
              padding: '20px',
              border: `2px solid ${mobileInternetData?.plans?.includes(plan.id) ? '#E20074' : '#e0e0e0'}`,
              borderRadius: '12px',
              cursor: 'pointer',
              transition: 'all 0.3s ease',
              background: mobileInternetData?.plans?.includes(plan.id) ? '#fdf2f8' : 'white'
            }}
          >
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: '10px'
            }}>
              <h3 style={{
                fontSize: '18px',
                fontWeight: '600',
                color: '#333',
                margin: 0
              }}>
                {plan.name}
              </h3>
              <div style={{
                background: '#E20074',
                color: 'white',
                padding: '4px 8px',
                borderRadius: '6px',
                fontSize: '12px',
                fontWeight: '600'
              }}>
                ${plan.price}/Mo
              </div>
            </div>
            <p style={{
              fontSize: '14px',
              color: '#666',
              margin: 0
            }}>
              {plan.data} of high-speed data per month
            </p>
          </div>
        ))}
      </div>

      <div style={{
        display: 'flex',
        justifyContent: 'center',
        gap: '15px'
      }}>
        <button
          onClick={prevStep}
          style={{
            background: '#6c757d',
            color: 'white',
            border: 'none',
            padding: '12px 24px',
            borderRadius: '8px',
            fontSize: '16px',
            fontWeight: '600',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            transition: 'background-color 0.3s ease'
          }}
        >
          <ArrowLeft size={20} />
          Previous
        </button>

        <button
          onClick={onSkip}
          style={{
            background: '#6c757d',
            color: 'white',
            border: 'none',
            padding: '12px 24px',
            borderRadius: '8px',
            fontSize: '16px',
            fontWeight: '600',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            transition: 'background-color 0.3s ease'
          }}
        >
          <SkipForward size={20} />
          Skip
        </button>
        
        <button
          onClick={nextStep}
          disabled={!mobileInternetData?.plans?.length}
          style={{
            background: mobileInternetData?.plans?.length ? '#E20074' : '#ccc',
            color: 'white',
            border: 'none',
            padding: '12px 24px',
            borderRadius: '8px',
            fontSize: '16px',
            fontWeight: '600',
            cursor: mobileInternetData?.plans?.length ? 'pointer' : 'not-allowed',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            transition: 'background-color 0.3s ease'
          }}
        >
          Complete
          <CheckCircle size={20} />
        </button>
      </div>
    </div>
  );

  const renderStepContent = () => {
    switch (steps[currentStep].component) {
      case 'devices':
        return renderDevicesStep();
      case 'plans':
        return renderPlansStep();
      default:
        return null;
    }
  };

  return (
    <div style={{
      width: '100%',
      margin: '0',
      padding: '0'
    }}>
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
    </div>
  );
};

export default MobileInternetFlow;
