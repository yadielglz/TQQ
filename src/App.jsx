import React, { useState, useEffect, useCallback } from 'react';
import { User, Phone, CreditCard, Smartphone, Shield, Percent, Calculator, CheckCircle, Gift } from 'lucide-react';
import WelcomeScreen from './components/WelcomeScreen';
import CustomerIntake from './components/CustomerIntake';
import TabletWearableFlow from './components/TabletWearableFlow';
import LineSelection from './components/LineSelection';
import PlanSelection from './components/PlanSelection';
import DeviceSelection from './components/DeviceSelection';
import PromotionsSelection from './components/PromotionsSelection';
import ProtectionSelection from './components/ProtectionSelection';
import DiscountSelection from './components/DiscountSelection';
import EquipmentCreditSelection from './components/EquipmentCreditSelection';
import PortInSelection from './components/PortInSelection';
import QuoteSummary from './components/QuoteSummary';
import SidebarCart from './components/SidebarCart';

const App = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [isLoading, setIsLoading] = useState(false);
  const [customerData, setCustomerData] = useState(null);
  const [tabletWearableData, setTabletWearableData] = useState(null);
  const [portInData, setPortInData] = useState({});
  const [promotionsData, setPromotionsData] = useState({});
  const [quoteData, setQuoteData] = useState({
    lines: 1,
    plans: {},
    devices: {},
    promotions: {},
    protection: {},
    discounts: {
      autoPay: false,
      senior55: false,
      tmobileInsider: false
    },
    equipmentCredit: '',
    downPayment: '',
    tradeIns: {},
    totalMonthly: 0,
    totalDeviceCost: 0
  });

  // Handle responsive design
  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      setWindowWidth(width);
      setIsMobile(width < 768);
    };

    handleResize(); // Set initial state
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const renderStepIndicator = () => {
    if (isMobile) {
      // Mobile: Show current step with progress
      const currentStepData = steps.find(step => step.id === currentStep);
      const Icon = currentStepData?.icon || Phone;
      
      return (
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          marginBottom: '30px',
          padding: '15px',
          background: 'rgba(255,255,255,0.1)',
          borderRadius: '12px',
          backdropFilter: 'blur(10px)'
        }}>
          <div style={{
            background: '#E20074',
            borderRadius: '50%',
            padding: '12px',
            marginRight: '15px',
            color: 'white'
          }}>
            <Icon size={24} />
          </div>
          <div>
            <div style={{ 
              fontSize: '16px', 
              fontWeight: '600', 
              color: 'white',
              marginBottom: '2px'
            }}>
              Step {currentStep} of {steps.length}
            </div>
            <div style={{ 
              fontSize: '14px', 
              color: 'rgba(255,255,255,0.8)'
            }}>
              {currentStepData?.title}
            </div>
          </div>
          <div style={{
            marginLeft: '15px',
            background: 'rgba(255,255,255,0.2)',
            borderRadius: '10px',
            padding: '8px 12px',
            fontSize: '12px',
            color: 'white',
            fontWeight: '600'
          }}>
            {Math.round((currentStep / steps.length) * 100)}%
          </div>
        </div>
      );
    } else {
      // Desktop: Show full step indicator
      return (
        <div style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          marginBottom: '40px',
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
                  cursor: 'pointer',
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
    }
  };

  const steps = [
    { id: 0, title: 'Welcome', icon: User },
    { id: 1, title: 'Lines', icon: Phone },
    { id: 2, title: 'Plans', icon: CreditCard },
    { id: 3, title: 'Devices', icon: Smartphone },
    { id: 4, title: 'Promotions', icon: Gift },
    { id: 5, title: 'Tablet/Wearable', icon: Phone },
    { id: 6, title: 'Protection', icon: Shield },
    { id: 7, title: 'Discounts', icon: Percent },
    { id: 8, title: 'Equipment Credit', icon: Calculator },
    { id: 9, title: 'Choose Your Number', icon: Phone },
    { id: 10, title: 'Summary', icon: CheckCircle }
  ];

  const updateQuoteData = useCallback((updates) => {
    setQuoteData(prev => ({ ...prev, ...updates }));
  }, []);

  const handleCustomerIntake = (customerInfo) => {
    setCustomerData(customerInfo);
    nextStep();
  };

  const handleWelcomeNext = (customerInfo) => {
    setCustomerData(customerInfo);
    nextStep();
  };

  const handleWelcomeSkip = () => {
    setCustomerData({ firstName: 'T-Mobile', lastName: 'Guest' });
    nextStep();
  };

  const handlePromotionsChange = useCallback((promotions) => {
    setPromotionsData(promotions);
    updateQuoteData({ promotions });
  }, [updateQuoteData]);

  const handleTabletWearableNext = (data) => {
    setTabletWearableData(data);
    nextStep();
  };

  const handleTabletWearableSkip = () => {
    setTabletWearableData(null);
    nextStep();
  };

  const handlePortInDataChange = (data) => {
    setPortInData(data);
  };

  const nextStep = () => {
    if (currentStep < steps.length) {
      setIsLoading(true);
      setTimeout(() => {
        setCurrentStep(currentStep + 1);
        setIsLoading(false);
      }, 300);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setIsLoading(true);
      setTimeout(() => {
        setCurrentStep(currentStep - 1);
        setIsLoading(false);
      }, 300);
    }
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 0:
        return (
          <WelcomeScreen 
            onNext={handleWelcomeNext} 
            onSkip={handleWelcomeSkip} 
          />
        );
      case 1:
        return (
          <LineSelection
            lines={quoteData.lines}
            onLinesChange={(lines) => updateQuoteData({ lines })}
            onNext={nextStep}
          />
        );
      case 2:
        return (
          <PlanSelection
            lines={quoteData.lines}
            plans={quoteData.plans}
            onPlansChange={(plans) => updateQuoteData({ plans })}
            onNext={nextStep}
            onPrev={prevStep}
          />
        );
      case 3:
        return (
          <DeviceSelection
            lines={quoteData.lines}
            devices={quoteData.devices}
            onDevicesChange={(devices) => updateQuoteData({ devices })}
            onNext={nextStep}
            onPrev={prevStep}
          />
        );
      case 4:
        return (
          <PromotionsSelection
            lines={quoteData.lines}
            quoteData={quoteData}
            portInData={portInData}
            onPromotionsChange={handlePromotionsChange}
            onNext={nextStep}
            onPrev={prevStep}
          />
        );
      case 5:
        return (
          <TabletWearableFlow 
            onNext={handleTabletWearableNext}
            onSkip={handleTabletWearableSkip}
          />
        );
      case 6:
        return (
          <ProtectionSelection
            lines={quoteData.lines}
            devices={quoteData.devices}
            protection={quoteData.protection}
            onProtectionChange={(protection) => updateQuoteData({ protection })}
            onNext={nextStep}
            onPrev={prevStep}
          />
        );
      case 7:
        return (
          <DiscountSelection
            lines={quoteData.lines}
            discounts={quoteData.discounts}
            onDiscountsChange={(discounts) => updateQuoteData({ discounts })}
            onNext={nextStep}
            onPrev={prevStep}
          />
        );
      case 8:
        return (
          <EquipmentCreditSelection
            lines={quoteData.lines}
            devices={quoteData.devices}
            expectedEC={customerData?.expectedEC || ''}
            onECChange={(equipmentCredit) => updateQuoteData({ equipmentCredit })}
            downPayment={quoteData.downPayment}
            onDownPaymentChange={(downPayment) => updateQuoteData({ downPayment })}
            tradeIns={quoteData.tradeIns}
            onTradeInsChange={(tradeIns) => updateQuoteData({ tradeIns })}
            onNext={nextStep}
            onPrev={prevStep}
          />
        );
      case 9:
        return (
          <PortInSelection
            lines={quoteData.lines}
            portInData={portInData}
            onPortInDataChange={handlePortInDataChange}
            onNext={nextStep}
            onPrev={prevStep}
          />
        );
      case 10:
        return (
          <QuoteSummary
            quoteData={quoteData}
            customerData={customerData}
            tabletWearableData={tabletWearableData}
            portInData={portInData}
            onPrev={prevStep}
            onRestart={() => {
              setCurrentStep(0);
              setCustomerData(null);
              setTabletWearableData(null);
              setPortInData({});
              setPromotionsData({});
              setQuoteData({
                lines: 1,
                plans: {},
                devices: {},
                promotions: {},
                protection: {},
                discounts: {
                  autoPay: false,
                  senior55: false,
                  tmobileInsider: false
                },
                equipmentCredit: '',
                downPayment: '',
                tradeIns: {},
                totalMonthly: 0,
                totalDeviceCost: 0
              });
            }}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="app">
      {/* App Header */}
      <div className="header">
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '12px',
          padding: '12px 20px'
        }}>
          <div style={{
            width: '32px',
            height: '32px',
            background: '#E20074',
            borderRadius: '8px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '18px',
            fontWeight: 'bold',
            color: '#FFFFFF'
          }}>
            T
          </div>
          <h1 style={{
            margin: 0,
            fontSize: '24px',
            fontWeight: '600',
            color: '#FFFFFF'
          }}>
            T-Mobile Quick Quote
          </h1>
        </div>
      </div>

      {/* Dynamic Step Indicator */}
      {renderStepIndicator()}

      {/* Main Content Area */}
      <div style={{ 
        background: '#f8f9fa', 
        minHeight: 'calc(100vh - 200px)',
        padding: '40px 0'
      }}>
        <div style={{
          maxWidth: '1200px',
          margin: '0 auto',
          padding: '0 20px'
        }}>
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
      </div>

      {/* Sidebar Cart */}
      <SidebarCart
        currentStep={currentStep}
        customerData={customerData}
        tabletWearableData={tabletWearableData}
        quoteData={quoteData}
        portInData={portInData}
        promotionsData={promotionsData}
        steps={steps}
      />

      {/* App Footer */}
      <div style={{
        marginTop: '0',
        padding: '20px',
        background: '#E20074',
        textAlign: 'center',
        color: '#FFFFFF',
        fontSize: '14px'
      }}>
        <div style={{ marginBottom: '10px' }}>
          <strong>T-Mobile Quote App</strong> - Get accurate wireless quotes instantly
        </div>
        <div style={{ display: 'flex', justifyContent: 'center', gap: '20px', flexWrap: 'wrap' }}>
          <span>📱 Mobile Optimized</span>
          <span>💰 Real-time Pricing</span>
          <span>🛡️ Protection Plans</span>
          <span>📊 Complete Quotes</span>
        </div>
      </div>
    </div>
  );
};

export default App;
