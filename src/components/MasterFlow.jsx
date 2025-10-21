import React, { useState, useEffect, Suspense, lazy } from 'react';
import { Phone, Tablet, Watch, Wifi, Home, CreditCard, Percent, FileText, Settings, Activity } from 'lucide-react';
import { LoadingOverlay, FadeIn, ToastProvider, useToast } from './Animations';
import { saveQuoteToGoogleSheet, testGoogleSheetsIntegration } from '../utils/googleSheets';

// Lazy load components for better performance
const WelcomeScreen = lazy(() => import('./WelcomeScreen'));
const ServiceSelection = lazy(() => import('./ServiceSelection'));
const VoiceLinesFlow = lazy(() => import('./VoiceLinesFlow'));
const DataLinesFlow = lazy(() => import('./DataLinesFlow'));
const IoTLinesFlow = lazy(() => import('./IoTLinesFlow'));
const HomeInternetFlow = lazy(() => import('./HomeInternetFlow'));
const EquipmentCreditSelection = lazy(() => import('./EquipmentCreditSelection'));
const DiscountSelection = lazy(() => import('./DiscountSelection'));
const QuoteSummary = lazy(() => import('./QuoteSummary'));
const LeftNavigation = lazy(() => import('./LeftNavigation'));
const GoogleSheetsConfig = lazy(() => import('./GoogleSheetsConfig'));
const PerformanceMonitor = lazy(() => import('./PerformanceMonitor'));

const MasterFlowContent = () => {
  // Master state management
  const [currentStep, setCurrentStep] = useState(0);
  const [completedSteps, setCompletedSteps] = useState([]);
  const [selectedServices, setSelectedServices] = useState([]);
  const [isMobile, setIsMobile] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [showGoogleSheetsConfig, setShowGoogleSheetsConfig] = useState(false);
  const [showPerformanceMonitor, setShowPerformanceMonitor] = useState(false);
  const { addToast } = useToast();
  
  // Customer data
  const [customerData, setCustomerData] = useState(null);
  
  // Service-specific data
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
    category: '', // 'tablet' or 'wearable'
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
    plan: null
  });
  
  const [equipmentCreditData, setEquipmentCreditData] = useState({
    amount: '',
    downPayment: '',
    tradeIns: {}
  });
  
  const [discountsData, setDiscountsData] = useState({
    autoPay: false,
    senior55: false,
    tmobileInsider: false
  });

  // Step definitions
  const steps = [
    { id: 0, title: 'Customer Info', icon: Phone, skippable: true },
    { id: 1, title: 'Service Selection', icon: Wifi, skippable: false },
    { id: 2, title: 'Voice Lines', icon: Phone, skippable: true },
    { id: 3, title: 'Data Lines', icon: Tablet, skippable: true },
    { id: 4, title: 'IoT Lines', icon: Watch, skippable: true },
    { id: 5, title: 'Home Internet', icon: Home, skippable: true },
    { id: 6, title: 'Equipment Credit', icon: CreditCard, skippable: false },
    { id: 7, title: 'Account Discounts', icon: Percent, skippable: false },
    { id: 8, title: 'Quote Summary', icon: FileText, skippable: false }
  ];

  // Handle responsive design
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 1024);
    };
    
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Navigation functions
  const goToStep = (stepId) => {
    if (stepId >= 0 && stepId < steps.length) {
      // Allow navigation to completed steps or next available step
      if (completedSteps.includes(stepId) || stepId === currentStep + 1) {
        setIsLoading(true);
        setTimeout(() => {
          setCurrentStep(stepId);
          setIsLoading(false);
          addToast(`Navigated to ${steps[stepId].title}`, 'info');
        }, 300);
      } else {
        addToast('Please complete previous steps first', 'warning');
      }
    }
  };

  const nextStep = () => {
    if (currentStep < steps.length - 1) {
      setIsLoading(true);
      setTimeout(() => {
        setCurrentStep(currentStep + 1);
        setIsLoading(false);
        addToast(`Moving to ${steps[currentStep + 1].title}`, 'success');
      }, 300);
    }
  };

  const prevStep = () => {
    if (currentStep > 0) {
      setIsLoading(true);
      setTimeout(() => {
        setCurrentStep(currentStep - 1);
        setIsLoading(false);
        addToast(`Going back to ${steps[currentStep - 1].title}`, 'info');
      }, 300);
    }
  };

  const markStepComplete = (stepId) => {
    if (!completedSteps.includes(stepId)) {
      setCompletedSteps([...completedSteps, stepId]);
    }
  };

  // Google Sheets integration
  const saveQuoteData = async () => {
    if (!customerData) {
      addToast('No customer data to save', 'warning');
      return;
    }

    try {
      setIsLoading(true);
      
      // Prepare comprehensive quote data
      const quoteData = {
        totalMonthly: calculateTotalQuote(),
        services: getSelectedServicesSummary(),
        voiceLines: voiceLinesData.quantity || 0,
        dataLines: dataLinesData.quantity || 0,
        iotLines: iotLinesData.quantity || 0,
        homeInternet: homeInternetData.device ? 'Yes' : 'No',
        discounts: getAppliedDiscountsSummary(),
        equipmentCredit: equipmentCreditData.amount || 0,
        downPayment: equipmentCreditData.downPayment || 0,
        tradeIns: equipmentCreditData.tradeIns || {},
        timestamp: new Date().toISOString()
      };

      await saveQuoteToGoogleSheet(customerData, quoteData);
      addToast('Quote data saved to Google Sheets successfully!', 'success');
    } catch (error) {
      console.error('Error saving quote data:', error);
      addToast('Failed to save quote data to Google Sheets', 'error');
    } finally {
      setIsLoading(false);
    }
  };

  const calculateTotalQuote = () => {
    // Calculate total monthly cost
    let total = 0;
    
    // Voice lines total
    if (voiceLinesData.quantity > 0) {
      const planOptions = [
        { id: 'essentials', pricing: { 1: 50, 2: 80, 3: 90, 4: 100, 5: 120, 6: 135, additional: 35 }},
        { id: 'more', pricing: { 1: 85, 2: 140, 3: 140, 4: 170, 5: 200, 6: 230, additional: 35 }},
        { id: 'beyond', pricing: { 1: 100, 2: 170, 3: 170, 4: 215, 5: 260, 6: 305, additional: 35 }}
      ];
      
      if (Object.keys(voiceLinesData.plans).length > 0) {
        const firstPlanId = Object.values(voiceLinesData.plans)[0];
        const plan = planOptions.find(p => p.id === firstPlanId);
        if (plan) {
          const lines = voiceLinesData.quantity || 1;
          if (lines <= 6) {
            total += plan.pricing[lines] || 0;
          } else {
            total += plan.pricing[6] + (lines - 6) * plan.pricing.additional;
          }
        }
      }
    }
    
    // Add other service totals
    total += dataLinesData.totalMonthly || 0;
    total += iotLinesData.totalMonthly || 0;
    total += homeInternetData.totalMonthly || 0;
    
    // Apply discounts
    if (discountsData.autoPay) {
      const totalLines = (voiceLinesData.quantity || 0) + (dataLinesData.quantity || 0) + (iotLinesData.quantity || 0);
      total -= Math.min(totalLines, 8) * 5;
    }
    
    if (discountsData.senior55) {
      total *= 0.8; // 20% off
    }
    
    if (discountsData.tmobileInsider) {
      total *= 0.85; // 15% off
    }
    
    return total;
  };

  const getSelectedServicesSummary = () => {
    const services = [];
    if (voiceLinesData.quantity > 0) services.push(`${voiceLinesData.quantity} Voice Lines`);
    if (dataLinesData.quantity > 0) services.push(`${dataLinesData.quantity} Data Lines`);
    if (iotLinesData.quantity > 0) services.push(`${iotLinesData.quantity} IoT Lines`);
    if (homeInternetData.device) services.push('Home Internet');
    return services.join(', ');
  };

  const getAppliedDiscountsSummary = () => {
    const discounts = [];
    if (discountsData.autoPay) discounts.push('Auto Pay');
    if (discountsData.senior55) discounts.push('Senior 55+');
    if (discountsData.tmobileInsider) discounts.push('T-Mobile Insider');
    return discounts.join(', ');
  };

  const isStepComplete = (stepId) => {
    return completedSteps.includes(stepId);
  };

  const canProceedFromStep = (stepId) => {
    switch (stepId) {
      case 0: // Customer Info
        return true; // Always skippable
      case 1: // Service Selection
        return selectedServices.length > 0;
      case 2: // Voice Lines
        return !selectedServices.includes('voice') || voiceLinesData.quantity > 0;
      case 3: // Data Lines
        return !selectedServices.includes('data') || dataLinesData.quantity > 0;
      case 4: // IoT Lines
        return !selectedServices.includes('iot') || iotLinesData.quantity > 0;
      case 5: // Home Internet
        return !selectedServices.includes('hsi') || homeInternetData.device;
      case 6: // Equipment Credit
        return equipmentCreditData.amount.trim() !== '';
      case 7: // Account Discounts
        return true; // Always can proceed
      case 8: // Quote Summary
        return true; // Final step
      default:
        return false;
    }
  };

  const getNextRequiredStep = () => {
    // Find next incomplete service that was selected
    if (selectedServices.includes('voice') && !isStepComplete(2)) {
      return 2;
    }
    if (selectedServices.includes('data') && !isStepComplete(3)) {
      return 3;
    }
    if (selectedServices.includes('iot') && !isStepComplete(4)) {
      return 4;
    }
    if (selectedServices.includes('hsi') && !isStepComplete(5)) {
      return 5;
    }
    // If all services complete, go to equipment credit
    return 6;
  };

  const handleServiceSelection = (services) => {
    setSelectedServices(services);
    markStepComplete(1);
    
    // Auto-navigate to first selected service
    if (services.length > 0) {
      const nextStep = getNextRequiredStep();
      setCurrentStep(nextStep);
    }
  };

  const handleAddAnotherService = () => {
    setCurrentStep(1); // Return to service selection
  };

  const handleServiceComplete = (serviceType) => {
    markStepComplete(getServiceStepId(serviceType));
    
    // Check if there are more services to configure
    const nextStep = getNextRequiredStep();
    if (nextStep !== 6) {
      setCurrentStep(nextStep);
    } else {
      // All services complete, go to equipment credit
      setCurrentStep(6);
    }
  };

  const getServiceStepId = (serviceType) => {
    switch (serviceType) {
      case 'voice': return 2;
      case 'data': return 3;
      case 'iot': return 4;
      case 'hsi': return 5;
      default: return -1;
    }
  };

  const renderStepContent = () => {
    const LoadingFallback = () => (
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '200px',
        fontSize: '16px',
        color: '#666'
      }}>
        Loading...
      </div>
    );

    switch (currentStep) {
      case 0:
        return (
          <Suspense fallback={<LoadingFallback />}>
            <WelcomeScreen
              onNext={(data) => {
                setCustomerData(data);
                markStepComplete(0);
                nextStep();
              }}
              onSkip={() => {
                markStepComplete(0);
                nextStep();
              }}
            />
          </Suspense>
        );
      
      case 1:
        return (
          <Suspense fallback={<LoadingFallback />}>
            <ServiceSelection
              selectedServices={selectedServices}
              onServicesChange={handleServiceSelection}
              onNext={nextStep}
              onPrev={prevStep}
            />
          </Suspense>
        );
      
      case 2:
        return (
          <Suspense fallback={<LoadingFallback />}>
            <VoiceLinesFlow
              data={voiceLinesData}
              onDataChange={setVoiceLinesData}
              onComplete={() => handleServiceComplete('voice')}
              onAddAnother={handleAddAnotherService}
              onPrev={prevStep}
            />
          </Suspense>
        );
      
      case 3:
        return (
          <Suspense fallback={<LoadingFallback />}>
            <DataLinesFlow
              data={dataLinesData}
              onDataChange={setDataLinesData}
              onComplete={() => handleServiceComplete('data')}
              onAddAnother={handleAddAnotherService}
              onPrev={prevStep}
            />
          </Suspense>
        );
      
      case 4:
        return (
          <Suspense fallback={<LoadingFallback />}>
            <IoTLinesFlow
              data={iotLinesData}
              onDataChange={setIotLinesData}
              onComplete={() => handleServiceComplete('iot')}
              onAddAnother={handleAddAnotherService}
              onPrev={prevStep}
            />
          </Suspense>
        );
      
      case 5:
        return (
          <Suspense fallback={<LoadingFallback />}>
            <HomeInternetFlow
              data={homeInternetData}
              onDataChange={setHomeInternetData}
              onComplete={() => handleServiceComplete('hsi')}
              onAddAnother={handleAddAnotherService}
              onPrev={prevStep}
            />
          </Suspense>
        );
      
      case 6:
        return (
          <Suspense fallback={<LoadingFallback />}>
            <EquipmentCreditSelection
              data={equipmentCreditData}
              onDataChange={setEquipmentCreditData}
              voiceLinesData={voiceLinesData}
              dataLinesData={dataLinesData}
              iotLinesData={iotLinesData}
              homeInternetData={homeInternetData}
              onNext={() => {
                markStepComplete(6);
                nextStep();
              }}
              onPrev={prevStep}
            />
          </Suspense>
        );
      
      case 7:
        return (
          <Suspense fallback={<LoadingFallback />}>
            <DiscountSelection
              data={discountsData}
              onDataChange={setDiscountsData}
              voiceLinesData={voiceLinesData}
              dataLinesData={dataLinesData}
              iotLinesData={iotLinesData}
              homeInternetData={homeInternetData}
              onNext={() => {
                markStepComplete(7);
                nextStep();
              }}
              onPrev={prevStep}
            />
          </Suspense>
        );
      
      case 8:
        return (
          <Suspense fallback={<LoadingFallback />}>
            <QuoteSummary
              customerData={customerData}
              voiceLinesData={voiceLinesData}
              dataLinesData={dataLinesData}
              iotLinesData={iotLinesData}
              homeInternetData={homeInternetData}
              equipmentCreditData={equipmentCreditData}
              discountsData={discountsData}
              onPrev={prevStep}
              onSaveQuote={saveQuoteData}
              currentQuote={{
                customerData,
                voiceLinesData,
                dataLinesData,
                iotLinesData,
                homeInternetData,
                equipmentCreditData,
                discountsData
              }}
              savedQuotes={[]}
              onLoadQuote={() => {}}
              onDeleteQuote={() => {}}
            />
          </Suspense>
        );
      
      default:
        return <div>Step not found</div>;
    }
  };

  return (
    <div style={{ display: 'flex', height: '100vh' }}>
      {/* Settings Button */}
      <button
        onClick={() => setShowGoogleSheetsConfig(true)}
        style={{
          position: 'fixed',
          top: '100px',
          right: '20px',
          background: '#E20074',
          color: 'white',
          border: 'none',
          borderRadius: '50%',
          width: '50px',
          height: '50px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          cursor: 'pointer',
          zIndex: 1000,
          boxShadow: '0 4px 12px rgba(226, 0, 116, 0.3)',
          transition: 'all 0.3s ease'
        }}
        onMouseOver={(e) => {
          e.target.style.transform = 'scale(1.1)';
          e.target.style.boxShadow = '0 6px 16px rgba(226, 0, 116, 0.4)';
        }}
        onMouseOut={(e) => {
          e.target.style.transform = 'scale(1)';
          e.target.style.boxShadow = '0 4px 12px rgba(226, 0, 116, 0.3)';
        }}
      >
        <Settings size={24} />
      </button>

      {/* Performance Monitor Toggle */}
      <button
        onClick={() => setShowPerformanceMonitor(!showPerformanceMonitor)}
        style={{
          position: 'fixed',
          top: '160px',
          right: '20px',
          background: showPerformanceMonitor ? '#E20074' : '#E20074',
          color: 'white',
          border: 'none',
          borderRadius: '50%',
          width: '40px',
          height: '40px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          cursor: 'pointer',
          zIndex: 1000,
          boxShadow: '0 4px 12px rgba(0, 0, 0, 0.3)',
          transition: 'all 0.3s ease'
        }}
        onMouseOver={(e) => {
          e.target.style.transform = 'scale(1.1)';
        }}
        onMouseOut={(e) => {
          e.target.style.transform = 'scale(1)';
        }}
      >
        <Activity size={20} />
      </button>

      {/* Left Navigation */}
      <Suspense fallback={<div style={{ width: '280px', background: '#f8f9fa' }}>Loading navigation...</div>}>
        <LeftNavigation
          steps={steps}
          currentStep={currentStep}
          completedSteps={completedSteps}
          selectedServices={selectedServices}
          onStepClick={goToStep}
          isMobile={isMobile}
        />
      </Suspense>
      
      {/* Main Content */}
      <div style={{
        flex: 1,
        marginLeft: isMobile ? '0' : '280px',
        marginTop: '80px', // Account for StatusBar height
        padding: '10px',
        background: '#f8f9fa',
        height: 'calc(100vh - 90px)', // Fixed height to prevent scrolling
        overflow: 'hidden' // Prevent scrolling
      }}>
        <LoadingOverlay isLoading={isLoading} text="Loading...">
          <FadeIn delay={0.1}>
            {renderStepContent()}
          </FadeIn>
        </LoadingOverlay>
      </div>

      {/* Google Sheets Configuration Modal */}
      <Suspense fallback={null}>
        <GoogleSheetsConfig
          isOpen={showGoogleSheetsConfig}
          onClose={() => setShowGoogleSheetsConfig(false)}
        />
      </Suspense>

      {/* Performance Monitor */}
      <Suspense fallback={null}>
        <PerformanceMonitor
          isVisible={showPerformanceMonitor}
          onClose={() => setShowPerformanceMonitor(false)}
        />
      </Suspense>
    </div>
  );
};

const MasterFlow = () => {
  return (
    <ToastProvider>
      <MasterFlowContent />
    </ToastProvider>
  );
};

export default MasterFlow;
