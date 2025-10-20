import React, { useState, useEffect, useCallback } from 'react';
import { User, Phone, CreditCard, Smartphone, Shield, Percent, Calculator, CheckCircle, Gift, Wifi, Home } from 'lucide-react';
import StatusBar from './components/StatusBar';
import WelcomeScreen from './components/WelcomeScreen';
import CustomerIntake from './components/CustomerIntake';
import VoiceLinesFlow from './components/VoiceLinesFlow';
import TabletWearableFlow from './components/TabletWearableFlow';
import MobileInternetFlow from './components/MobileInternetFlow';
import HomeInternetFlow from './components/HomeInternetFlow';
import PromotionsSelection from './components/PromotionsSelection';
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
  const [mobileInternetData, setMobileInternetData] = useState(null);
  const [homeInternetData, setHomeInternetData] = useState(null);
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
          marginBottom: '20px',
          padding: '10px 15px',
          background: 'rgba(255,255,255,0.1)',
          borderRadius: '8px',
          backdropFilter: 'blur(10px)'
        }}>
          <div style={{
            background: '#E20074',
            borderRadius: '50%',
            padding: '8px',
            marginRight: '12px',
            color: 'white'
          }}>
            <Icon size={20} />
          </div>
          <div>
            <div style={{ 
              fontSize: '14px', 
              fontWeight: '600', 
              color: 'white',
              marginBottom: '2px'
            }}>
              Step {currentStep} of {steps.length}
            </div>
            <div style={{ 
              fontSize: '12px', 
              color: 'rgba(255,255,255,0.8)'
            }}>
              {currentStepData?.title}
            </div>
          </div>
          <div style={{
            marginLeft: '12px',
            background: 'rgba(255,255,255,0.2)',
            borderRadius: '8px',
            padding: '6px 10px',
            fontSize: '11px',
            color: 'white',
            fontWeight: '600'
          }}>
            {Math.round((currentStep / steps.length) * 100)}%
          </div>
        </div>
      );
    } else {
      // Desktop: Show compact horizontal step indicator
      return (
        <div style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          marginBottom: '20px',
          padding: '8px 0',
          flexWrap: 'wrap',
          gap: '8px'
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
                  padding: '8px 16px',
                  background: isActive 
                    ? '#E20074' 
                    : isCompleted 
                      ? '#4CAF50' 
                      : 'rgba(255,255,255,0.1)',
                  borderRadius: '20px',
                  color: 'white',
                  transition: 'all 0.3s ease',
                  cursor: 'pointer',
                  backdropFilter: 'blur(10px)',
                  border: isActive ? '2px solid rgba(255,255,255,0.3)' : '2px solid transparent'
                }}>
                  <div style={{
                    marginRight: '6px',
                    display: 'flex',
                    alignItems: 'center'
                  }}>
                    {isCompleted ? <CheckCircle size={16} /> : <Icon size={16} />}
                  </div>
                  <span style={{ 
                    fontSize: '12px', 
                    fontWeight: '600',
                    whiteSpace: 'nowrap'
                  }}>
                    {step.title}
                  </span>
                </div>
                
                {index < steps.length - 1 && (
                  <div style={{
                    width: '20px',
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
    { id: 0, title: 'Welcome', icon: User, flowTitle: null },
    { id: 1, title: 'Voice Lines', icon: Phone, flowTitle: 'Voice Lines Configuration' },
    { id: 2, title: 'Tablet/Wearable', icon: Phone, flowTitle: 'Tablet & Wearable Configuration' },
    { id: 3, title: 'Mobile Internet', icon: Wifi, flowTitle: 'Mobile Internet Configuration' },
    { id: 4, title: 'Home Internet', icon: Home, flowTitle: 'Home Internet Configuration' },
    { id: 5, title: 'Promotions', icon: Gift, flowTitle: 'Promotions Selection' },
    { id: 6, title: 'Discounts', icon: Percent, flowTitle: 'Discounts Selection' },
    { id: 7, title: 'Equipment Credit', icon: Calculator, flowTitle: 'Equipment Credit Selection' },
    { id: 8, title: 'Choose Your Number', icon: Phone, flowTitle: 'Port-In Selection' },
    { id: 9, title: 'Summary', icon: CheckCircle, flowTitle: 'Quote Summary' }
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

  const handleMobileInternetChange = (data) => {
    setMobileInternetData(data);
  };

  const handleHomeInternetChange = (data) => {
    setHomeInternetData(data);
  };

  const handleMobileInternetSkip = () => {
    setMobileInternetData(null);
    nextStep();
  };

  const handleHomeInternetSkip = () => {
    setHomeInternetData(null);
    nextStep();
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
          <VoiceLinesFlow
            lines={quoteData.lines}
            plans={quoteData.plans}
            devices={quoteData.devices}
            protection={quoteData.protection}
            onLinesChange={(lines) => updateQuoteData({ lines })}
            onPlansChange={(plans) => updateQuoteData({ plans })}
            onDevicesChange={(devices) => updateQuoteData({ devices })}
            onProtectionChange={(protection) => updateQuoteData({ protection })}
            onNext={nextStep}
            onPrev={prevStep}
          />
        );
      case 2:
        return (
          <TabletWearableFlow 
            onNext={handleTabletWearableNext}
            onSkip={handleTabletWearableSkip}
          />
        );
      case 3:
        return (
          <MobileInternetFlow
            mobileInternetData={mobileInternetData}
            onMobileInternetChange={handleMobileInternetChange}
            onNext={nextStep}
            onPrev={prevStep}
            onSkip={handleMobileInternetSkip}
          />
        );
      case 4:
        return (
          <HomeInternetFlow
            homeInternetData={homeInternetData}
            onHomeInternetChange={handleHomeInternetChange}
            onNext={nextStep}
            onPrev={prevStep}
            onSkip={handleHomeInternetSkip}
          />
        );
      case 5:
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
      case 6:
        return (
          <DiscountSelection
            lines={quoteData.lines}
            discounts={quoteData.discounts}
            onDiscountsChange={(discounts) => updateQuoteData({ discounts })}
            onNext={nextStep}
            onPrev={prevStep}
          />
        );
      case 7:
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
      case 8:
        return (
          <PortInSelection
            lines={quoteData.lines}
            portInData={portInData}
            onPortInDataChange={handlePortInDataChange}
            onNext={nextStep}
            onPrev={prevStep}
          />
        );
      case 9:
        return (
          <QuoteSummary
            quoteData={quoteData}
            customerData={customerData}
            tabletWearableData={tabletWearableData}
            mobileInternetData={mobileInternetData}
            homeInternetData={homeInternetData}
            portInData={portInData}
            onPrev={prevStep}
            onRestart={() => {
              setCurrentStep(0);
              setCustomerData(null);
              setTabletWearableData(null);
              setMobileInternetData(null);
              setHomeInternetData(null);
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
      {/* Status Bar */}
      <StatusBar currentFlowTitle={steps[currentStep]?.flowTitle} />

      {/* Dynamic Step Indicator */}
      {renderStepIndicator()}

      {/* Main Content Area */}
      <div style={{ 
        background: '#f8f9fa', 
        height: 'calc(100vh - 140px)',
        padding: '10px 0',
        overflow: 'hidden'
      }}>
        <div style={{
          width: isMobile ? '100%' : 'calc(100% - 320px)', // Account for cart width + margin
          margin: '0 auto',
          padding: '0 20px',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          maxWidth: 'none' // Remove max-width constraint
        }}>
          {/* Step Content */}
          <div style={{ 
            position: 'relative', 
            flex: 1, 
            overflowY: 'auto',
            padding: '10px 0'
          }}>
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
        mobileInternetData={mobileInternetData}
        homeInternetData={homeInternetData}
        quoteData={quoteData}
        portInData={portInData}
        promotionsData={promotionsData}
        steps={steps}
      />

    </div>
  );
};

export default App;
