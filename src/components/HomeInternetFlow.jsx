import React, { useState } from 'react';
import { Home, Wifi, ArrowRight, ArrowLeft, CheckCircle, SkipForward } from 'lucide-react';

const HomeInternetFlow = ({ 
  homeInternetData, 
  onHomeInternetChange, 
  onNext, 
  onPrev,
  onSkip 
}) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  const steps = [
    { id: 0, title: 'Gateway Device', icon: Home, component: 'device' },
    { id: 1, title: 'Internet Plans', icon: Wifi, component: 'plans' }
  ];

  const gatewayDevice = {
    id: 'tmobile-home-internet-gateway',
    name: 'T-Mobile Home Internet Gateway',
    price: 0,
    description: 'High-speed 5G gateway for home internet service'
  };

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

  const renderDeviceStep = () => (
    <div style={{
      maxWidth: '600px',
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
        Gateway Device
      </h2>
      
      <div
        onClick={() => {
          const newData = { ...homeInternetData };
          newData.device = gatewayDevice.id;
          onHomeInternetChange(newData);
        }}
        style={{
          padding: '30px',
          border: `2px solid ${homeInternetData?.device === gatewayDevice.id ? '#E20074' : '#e0e0e0'}`,
          borderRadius: '12px',
          cursor: 'pointer',
          transition: 'all 0.3s ease',
          background: homeInternetData?.device === gatewayDevice.id ? '#fdf2f8' : 'white',
          textAlign: 'center'
        }}
      >
        <div style={{
          background: '#E20074',
          borderRadius: '50%',
          width: '80px',
          height: '80px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          margin: '0 auto 20px',
          color: 'white'
        }}>
          <Home size={40} />
        </div>
        
        <h3 style={{
          fontSize: '20px',
          fontWeight: '600',
          color: '#333',
          marginBottom: '10px'
        }}>
          {gatewayDevice.name}
        </h3>
        
        <p style={{
          fontSize: '16px',
          color: '#666',
          marginBottom: '15px'
        }}>
          {gatewayDevice.description}
        </p>
        
        <div style={{
          background: '#4CAF50',
          color: 'white',
          padding: '8px 16px',
          borderRadius: '20px',
          fontSize: '16px',
          fontWeight: '600',
          display: 'inline-block'
        }}>
          FREE Gateway
        </div>
      </div>

      <div style={{
        display: 'flex',
        justifyContent: 'center',
        gap: '15px',
        marginTop: '30px'
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
          disabled={!homeInternetData?.device}
          style={{
            background: homeInternetData?.device ? '#E20074' : '#ccc',
            color: 'white',
            border: 'none',
            padding: '12px 24px',
            borderRadius: '8px',
            fontSize: '16px',
            fontWeight: '600',
            cursor: homeInternetData?.device ? 'pointer' : 'not-allowed',
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
        Select Internet Plans
      </h2>
      
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
        gap: '20px',
        marginBottom: '30px'
      }}>
        {homeInternetPlans.map((plan) => (
          <div
            key={plan.id}
            onClick={() => {
              const newData = { ...homeInternetData };
              if (!newData.plans) newData.plans = [];
              
              if (newData.plans.includes(plan.id)) {
                newData.plans = newData.plans.filter(id => id !== plan.id);
              } else {
                newData.plans.push(plan.id);
              }
              onHomeInternetChange(newData);
            }}
            style={{
              padding: '20px',
              border: `2px solid ${homeInternetData?.plans?.includes(plan.id) ? '#E20074' : '#e0e0e0'}`,
              borderRadius: '12px',
              cursor: 'pointer',
              transition: 'all 0.3s ease',
              background: homeInternetData?.plans?.includes(plan.id) ? '#fdf2f8' : 'white'
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
              {plan.description}
            </p>
          </div>
        ))}
      </div>

      {/* Note about P360 and Financing */}
      <div style={{
        background: '#e3f2fd',
        padding: '15px',
        borderRadius: '8px',
        marginBottom: '20px',
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
          disabled={!homeInternetData?.plans?.length}
          style={{
            background: homeInternetData?.plans?.length ? '#E20074' : '#ccc',
            color: 'white',
            border: 'none',
            padding: '12px 24px',
            borderRadius: '8px',
            fontSize: '16px',
            fontWeight: '600',
            cursor: homeInternetData?.plans?.length ? 'pointer' : 'not-allowed',
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

export default HomeInternetFlow;
