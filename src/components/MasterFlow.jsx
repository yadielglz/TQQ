import React, { useState, useEffect, useCallback } from 'react';
import { Phone, Tablet, Watch, Wifi, Home, CreditCard, Percent, FileText, Settings, Activity, ArrowLeft, ArrowRight, Menu, X } from 'lucide-react';

// Import step components
import WelcomeScreen from './WelcomeScreen';
import ServiceSelection from './ServiceSelection';
import VoiceLinesFlow from './VoiceLinesFlow';
import DataLinesFlow from './DataLinesFlow';
import IoTLinesFlow from './IoTLinesFlow';
import HomeInternetFlow from './HomeInternetFlow';
import EquipmentCreditSelection from './EquipmentCreditSelection';
import DiscountSelection from './DiscountSelection';
import QuoteSummary from './QuoteSummary';

const MasterFlow = () => {
  // Core state management
  const [currentStep, setCurrentStep] = useState(0);
  const [completedSteps, setCompletedSteps] = useState([]);
  const [selectedServices, setSelectedServices] = useState([]);
  const [isMobile, setIsMobile] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Service data state
  const [customerData, setCustomerData] = useState(null);
  const [voiceLinesData, setVoiceLinesData] = useState({
    quantity: 0,
    plans: {},
    devices: {},
    protection: {},
    promotions: {},
    ports: {}
  });
  const [dataLinesData, setDataLinesData] = useState({
    quantity: 0,
    category: '',
    devices: {},
    plans: {},
    protection: {},
    promotions: {}
  });
  const [iotLinesData, setIotLinesData] = useState({
    quantity: 0,
    devices: {},
    plans: {},
    protection: {},
    promotions: {}
  });
  const [homeInternetData, setHomeInternetData] = useState({
    device: null,
    plan: null,
    promotions: {}
  });
  const [equipmentCreditData, setEquipmentCreditData] = useState({
    amount: 0,
    downPayment: 0,
    tradeIns: []
  });
  const [discountsData, setDiscountsData] = useState({
    autoPay: false,
    senior55: false,
    insider: false,
    workPerks: false
  });

  // Step definitions
  const steps = [
    { 
      id: 0, 
      title: 'Welcome', 
      icon: Phone, 
      description: 'Get started with your quote',
      required: false,
      component: 'welcome'
    },
    { 
      id: 1, 
      title: 'Services', 
      icon: Settings, 
      description: 'Select services to configure',
      required: true,
      component: 'services'
    },
    { 
      id: 2, 
      title: 'Voice Lines', 
      icon: Phone, 
      description: 'Configure voice lines and plans',
      required: false,
      component: 'voice',
      dependsOn: ['voice']
    },
    { 
      id: 3, 
      title: 'Data Lines', 
      icon: Tablet, 
      description: 'Configure tablets and wearables',
      required: false,
      component: 'data',
      dependsOn: ['data']
    },
    { 
      id: 4, 
      title: 'IoT Lines', 
      icon: Watch, 
      description: 'Configure IoT devices',
      required: false,
      component: 'iot',
      dependsOn: ['iot']
    },
    { 
      id: 5, 
      title: 'Home Internet', 
      icon: Home, 
      description: 'Configure home internet',
      required: false,
      component: 'hsi',
      dependsOn: ['hsi']
    },
    { 
      id: 6, 
      title: 'Equipment Credit', 
      icon: CreditCard, 
      description: 'Apply equipment credits',
      required: false,
      component: 'equipment'
    },
    { 
      id: 7, 
      title: 'Discounts', 
      icon: Percent, 
      description: 'Apply account discounts',
      required: false,
      component: 'discounts'
    },
    { 
      id: 8, 
      title: 'Quote Summary', 
      icon: FileText, 
      description: 'Review and finalize quote',
      required: true,
      component: 'summary'
    }
  ];

  // Responsive handling
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
      if (window.innerWidth >= 768) {
        setIsSidebarOpen(false);
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Navigation handlers
  const nextStep = useCallback(() => {
    if (currentStep < steps.length - 1) {
      setIsLoading(true);
      setTimeout(() => {
        setCurrentStep(prev => prev + 1);
        setIsLoading(false);
      }, 300);
    }
  }, [currentStep, steps.length]);

  const prevStep = useCallback(() => {
    if (currentStep > 0) {
      setIsLoading(true);
      setTimeout(() => {
        setCurrentStep(prev => prev - 1);
        setIsLoading(false);
      }, 300);
    }
  }, [currentStep]);

  const goToStep = useCallback((stepId) => {
    if (stepId >= 0 && stepId < steps.length) {
      setIsLoading(true);
      setTimeout(() => {
        setCurrentStep(stepId);
        setIsLoading(false);
      }, 300);
    }
  }, [steps.length]);

  // Service selection handler
  const handleServiceSelection = useCallback((services) => {
    setSelectedServices(services);
    setCompletedSteps(prev => [...prev, 1]);
    
    // Auto-navigate to first selected service
    if (services.length > 0) {
      const firstServiceStep = getServiceStepId(services[0]);
      if (firstServiceStep !== -1) {
        goToStep(firstServiceStep);
      }
    }
  }, [goToStep]);

  // Helper functions
  const getServiceStepId = (serviceType) => {
    switch (serviceType) {
      case 'voice': return 2;
      case 'data': return 3;
      case 'iot': return 4;
      case 'hsi': return 5;
      default: return -1;
    }
  };

  const isStepRequired = (step) => {
    if (step.required) return true;
    if (step.dependsOn) {
      return step.dependsOn.some(service => selectedServices.includes(service));
    }
    return false;
  };

  const isStepCompleted = (stepId) => {
    return completedSteps.includes(stepId);
  };

  const canNavigateToStep = (stepId) => {
    // Can always go to welcome and services
    if (stepId <= 1) return true;
    
    // Must have completed service selection
    if (!completedSteps.includes(1)) return false;
    
    // Check if step is required or depends on selected services
    const step = steps[stepId];
    return isStepRequired(step);
  };

  // Step completion handlers
  const markStepComplete = useCallback((stepId) => {
    if (!completedSteps.includes(stepId)) {
      setCompletedSteps(prev => [...prev, stepId]);
    }
  }, [completedSteps]);

  const handleServiceComplete = useCallback((serviceType) => {
    const stepId = getServiceStepId(serviceType);
    markStepComplete(stepId);
    
    // Find next required step
    const nextRequiredStep = steps.findIndex((step, index) => 
      index > stepId && isStepRequired(step)
    );
    
    if (nextRequiredStep !== -1) {
      goToStep(nextRequiredStep);
    } else {
      // Go to equipment credit or summary
      goToStep(6);
    }
  }, [markStepComplete, goToStep, steps]);

  // Render step content
  const renderStepContent = () => {
    const step = steps[currentStep];
    
    switch (step.component) {
      case 'welcome':
        return (
          <WelcomeScreen
            onNext={(data) => {
              setCustomerData(data);
              markStepComplete(0);
              nextStep();
            }}
            onSkip={() => nextStep()}
          />
        );
      
      case 'services':
        return (
          <ServiceSelection
            selectedServices={selectedServices}
            onServicesChange={handleServiceSelection}
            onNext={nextStep}
            onPrev={prevStep}
          />
        );
      
      case 'voice':
        return (
          <VoiceLinesFlow
            data={voiceLinesData}
            onDataChange={setVoiceLinesData}
            onComplete={() => handleServiceComplete('voice')}
            onPrev={prevStep}
            onNext={nextStep}
          />
        );
      
      case 'data':
        return (
          <DataLinesFlow
            data={dataLinesData}
            onDataChange={setDataLinesData}
            onComplete={() => handleServiceComplete('data')}
            onPrev={prevStep}
            onNext={nextStep}
          />
        );
      
      case 'iot':
        return (
          <IoTLinesFlow
            data={iotLinesData}
            onDataChange={setIotLinesData}
            onComplete={() => handleServiceComplete('iot')}
            onPrev={prevStep}
            onNext={nextStep}
          />
        );
      
      case 'hsi':
        return (
          <HomeInternetFlow
            data={homeInternetData}
            onDataChange={setHomeInternetData}
            onComplete={() => handleServiceComplete('hsi')}
            onPrev={prevStep}
            onNext={nextStep}
          />
        );
      
      case 'equipment':
        return (
          <EquipmentCreditSelection
            data={equipmentCreditData}
            onDataChange={setEquipmentCreditData}
            onNext={nextStep}
            onPrev={prevStep}
          />
        );
      
      case 'discounts':
        return (
          <DiscountSelection
            data={discountsData}
            onDataChange={setDiscountsData}
            onNext={nextStep}
            onPrev={prevStep}
          />
        );
      
      case 'summary':
        return (
          <QuoteSummary
            customerData={customerData}
            voiceLinesData={voiceLinesData}
            dataLinesData={dataLinesData}
            iotLinesData={iotLinesData}
            homeInternetData={homeInternetData}
            equipmentCreditData={equipmentCreditData}
            discountsData={discountsData}
            onPrev={prevStep}
            onClearData={() => {
              setCurrentStep(0);
              setCompletedSteps([]);
              setSelectedServices([]);
              setCustomerData(null);
              setVoiceLinesData({ quantity: 0, plans: {}, devices: {}, protection: {}, promotions: {}, ports: {} });
              setDataLinesData({ quantity: 0, category: '', devices: {}, plans: {}, protection: {}, promotions: {} });
              setIotLinesData({ quantity: 0, devices: {}, plans: {}, protection: {}, promotions: {} });
              setHomeInternetData({ device: null, plan: null, promotions: {} });
              setEquipmentCreditData({ amount: 0, downPayment: 0, tradeIns: [] });
              setDiscountsData({ autoPay: false, senior55: false, insider: false, workPerks: false });
            }}
          />
        );
      
      default:
        return <div>Step not found</div>;
    }
  };

  // Render sidebar
  const renderSidebar = () => {
    return (
      <div style={{
        position: 'fixed',
        left: 0,
        top: '80px',
        width: isSidebarOpen || !isMobile ? '280px' : '0',
        height: 'calc(100vh - 80px)',
        background: 'white',
        borderRight: '1px solid #e0e0e0',
        overflowY: 'auto',
        zIndex: 100,
        transition: 'width 0.3s ease',
        display: 'flex',
        flexDirection: 'column'
      }}>
        {/* Sidebar Header */}
        <div style={{
          padding: '20px',
          borderBottom: '1px solid #e0e0e0',
          background: '#f8f9fa'
        }}>
          <h3 style={{
            fontSize: '18px',
            fontWeight: '600',
            color: '#E20074',
            margin: 0,
            marginBottom: '8px'
          }}>
            Quote Progress
          </h3>
          <p style={{
            fontSize: '12px',
            color: '#666',
            margin: 0
          }}>
            Step {currentStep + 1} of {steps.length}
          </p>
        </div>

        {/* Step List */}
        <div style={{ flex: 1, padding: '20px' }}>
          {steps.map((step, index) => {
            const Icon = step.icon;
            const isActive = currentStep === index;
            const isCompleted = isStepCompleted(index);
            const isRequired = isStepRequired(step);
            const canNavigate = canNavigateToStep(index);
            
            return (
              <div
                key={step.id}
                onClick={() => canNavigate && goToStep(index)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  padding: '12px',
                  marginBottom: '8px',
                  borderRadius: '8px',
                  cursor: canNavigate ? 'pointer' : 'not-allowed',
                  background: isActive ? '#fdf2f8' : isCompleted ? '#f0f9ff' : 'transparent',
                  border: isActive ? '2px solid #E20074' : '2px solid transparent',
                  opacity: canNavigate ? 1 : 0.5,
                  transition: 'all 0.3s ease'
                }}
              >
                <div style={{
                  width: '32px',
                  height: '32px',
                  borderRadius: '50%',
                  background: isCompleted ? '#4CAF50' : isActive ? '#E20074' : '#e0e0e0',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginRight: '12px',
                  color: 'white',
                  fontSize: '14px',
                  fontWeight: '600'
                }}>
                  {isCompleted ? '✓' : <Icon size={16} />}
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{
                    fontSize: '14px',
                    fontWeight: '600',
                    color: isActive ? '#E20074' : '#333',
                    marginBottom: '2px'
                  }}>
                    {step.title}
                    {isRequired && <span style={{ color: '#ff6b6b', marginLeft: '4px' }}>*</span>}
                  </div>
                  <div style={{
                    fontSize: '12px',
                    color: '#666'
                  }}>
                    {step.description}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Navigation Buttons */}
        <div style={{
          padding: '20px',
          borderTop: '1px solid #e0e0e0',
          display: 'flex',
          flexDirection: 'column',
          gap: '10px'
        }}>
          <div style={{
            fontSize: '12px',
            color: '#666',
            textAlign: 'center',
            marginBottom: '5px'
          }}>
            {steps[currentStep]?.title}
          </div>
          
          <button
            onClick={prevStep}
            disabled={currentStep === 0}
            style={{
              padding: '12px 16px',
              border: '2px solid #E20074',
              borderRadius: '8px',
              background: currentStep === 0 ? '#f5f5f5' : 'white',
              color: currentStep === 0 ? '#999' : '#E20074',
              fontSize: '14px',
              cursor: currentStep === 0 ? 'not-allowed' : 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '8px',
              opacity: currentStep === 0 ? 0.5 : 1,
              transition: 'all 0.3s ease'
            }}
          >
            <ArrowLeft size={16} />
            Previous
          </button>
          
          <button
            onClick={nextStep}
            disabled={currentStep === steps.length - 1}
            style={{
              padding: '12px 16px',
              border: '2px solid #E20074',
              borderRadius: '8px',
              background: currentStep === steps.length - 1 ? '#f5f5f5' : '#E20074',
              color: currentStep === steps.length - 1 ? '#999' : 'white',
              fontSize: '14px',
              cursor: currentStep === steps.length - 1 ? 'not-allowed' : 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '8px',
              opacity: currentStep === steps.length - 1 ? 0.5 : 1,
              transition: 'all 0.3s ease'
            }}
          >
            Next
            <ArrowRight size={16} />
          </button>
        </div>
      </div>
    );
  };

  return (
    <div style={{
      minHeight: '100vh',
      background: '#f8f9fa',
      display: 'flex'
    }}>
      {/* Mobile Menu Button */}
      {isMobile && (
        <button
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          style={{
            position: 'fixed',
            top: '90px',
            left: '20px',
            zIndex: 200,
            background: '#E20074',
            color: 'white',
            border: 'none',
            borderRadius: '8px',
            padding: '12px',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 4px 12px rgba(0,0,0,0.15)'
          }}
        >
          {isSidebarOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      )}

      {/* Sidebar */}
      {renderSidebar()}

      {/* Mobile Overlay */}
      {isMobile && isSidebarOpen && (
        <div
          onClick={() => setIsSidebarOpen(false)}
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'rgba(0,0,0,0.5)',
            zIndex: 99
          }}
        />
      )}

      {/* Main Content */}
      <div style={{
        flex: 1,
        marginLeft: isMobile ? '0' : '280px',
        padding: '20px',
        transition: 'margin-left 0.3s ease'
      }}>
        {isLoading ? (
          <div style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: '400px',
            fontSize: '18px',
            color: '#666'
          }}>
            Loading...
          </div>
        ) : (
          renderStepContent()
        )}
      </div>
    </div>
  );
};

export default MasterFlow;