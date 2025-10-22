import React, { useState } from 'react';
import { 
  Phone, 
  Tablet, 
  Watch, 
  Home, 
  CheckCircle, 
  ChevronDown, 
  ChevronUp, 
  Menu, 
  X,
  ArrowLeft,
  ArrowRight
} from 'lucide-react';

const LeftNavigation = ({ 
  steps, 
  currentStep, 
  completedSteps, 
  selectedServices, 
  onStepClick, 
  isMobile,
  isCollapsed: externalCollapsed,
  onCollapseChange,
  onNext,
  onPrevious,
  subStepNavigation
}) => {
  const [internalCollapsed, setInternalCollapsed] = useState(false);
  
  // Use external collapse state if provided, otherwise use internal state
  const isCollapsed = externalCollapsed !== undefined ? externalCollapsed : internalCollapsed;
  const setIsCollapsed = onCollapseChange || setInternalCollapsed;
  
  // State for expanded sub-steps
  const [expandedSteps, setExpandedSteps] = useState({});

  const getStepIcon = (step) => {
    const Icon = step.icon;
    const isCompleted = completedSteps.includes(step.id);
    const isCurrent = currentStep === step.id;
    
    if (isCompleted) {
      return <CheckCircle size={16} color="#E20074" />;
    }
    
    return <Icon size={16} color={isCurrent ? '#E20074' : '#E20074'} />;
  };

  const getStepStatus = (stepId) => {
    if (completedSteps.includes(stepId)) return 'completed';
    if (currentStep === stepId) return 'current';
    return 'pending';
  };

  const getServiceSubSteps = (stepId) => {
    switch (stepId) {
      case 2: // Voice Lines
        return [
          '3.1 Quantity',
          '3.2 Plan Selection', 
          '3.3 Device Selection',
          '3.4 Protection',
          '3.5 Promotions',
          '3.6 Number/Port'
        ];
      case 3: // Data Lines
        return [
          '4.1 Line Quantity',
          '4.2 Device Selection',
          '4.3 Plan Selection',
          '4.4 Protection',
          '4.5 Promotions'
        ];
      case 4: // IoT Lines
        return [
          '6.1 Line Quantity',
          '6.2 Device Selection',
          '6.3 Plan Selection',
          '6.4 Protection',
          '6.5 Promotions'
        ];
      case 5: // Home Internet
        return [
          '7.1 Device Selection',
          '7.2 Plan Selection'
        ];
      default:
        return [];
    }
  };

  const isServiceSelected = (stepId) => {
    switch (stepId) {
      case 2: return selectedServices.includes('voice');
      case 3: return selectedServices.includes('data');
      case 4: return selectedServices.includes('iot');
      case 5: return selectedServices.includes('hsi');
      default: return true;
    }
  };

  const handleNext = () => {
    // Check if current step has sub-navigation
    if (currentStep === 2 && subStepNavigation?.next) {
      subStepNavigation.next();
    } else if (onNext) {
      onNext();
    }
  };

  const handlePrevious = () => {
    // Check if current step has sub-navigation
    if (currentStep === 2 && subStepNavigation?.prev) {
      subStepNavigation.prev();
    } else if (onPrevious) {
      onPrevious();
    }
  };

  const renderStepItem = (step) => {
    const status = getStepStatus(step.id);
    const isSelected = isServiceSelected(step.id);
    const subSteps = getServiceSubSteps(step.id);
    const isExpanded = expandedSteps[step.id] || false;

    return (
      <div key={step.id} style={{ marginBottom: '8px' }}>
        <div
          onClick={() => {
            if (step.id === 1 || isSelected || status === 'completed' || status === 'current') {
              onStepClick(step.id);
            }
            if (subSteps.length > 0) {
              setExpandedSteps(prev => ({
                ...prev,
                [step.id]: !isExpanded
              }));
            }
          }}
          style={{
            display: 'flex',
            alignItems: 'center',
            padding: '12px 16px',
            borderRadius: '8px',
            cursor: step.id === 1 || isSelected || status === 'completed' || status === 'current' ? 'pointer' : 'not-allowed',
            background: status === 'current' ? '#E20074' : 
                       status === 'completed' ? '#E20074' : 
                       isSelected ? '#f0f0f0' : '#f8f8f8',
            color: status === 'current' || status === 'completed' ? 'white' : 
                   isSelected ? '#E20074' : '#E20074',
            transition: 'all 0.3s ease',
            opacity: isSelected || step.id === 1 ? 1 : 0.6
          }}
        >
          <div style={{ marginRight: '12px' }}>
            {getStepIcon(step)}
          </div>
          <div style={{ flex: 1 }}>
            <div style={{ 
              fontSize: '14px', 
              fontWeight: '600',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between'
            }}>
              <span>{step.id + 1}. {step.title}</span>
              {subSteps.length > 0 && (
                <div onClick={(e) => {
                  e.stopPropagation();
                  setExpandedSteps(prev => ({
                    ...prev,
                    [step.id]: !isExpanded
                  }));
                }}>
                  {isExpanded ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
                </div>
              )}
            </div>
            {!isSelected && step.id > 1 && (
              <div style={{ fontSize: '11px', marginTop: '2px', opacity: 0.8 }}>
                Not selected
              </div>
            )}
          </div>
        </div>
        
        {/* Sub-steps */}
        {isExpanded && subSteps.length > 0 && (
          <div style={{ 
            marginLeft: '20px', 
            marginTop: '4px',
            paddingLeft: '16px',
            borderLeft: '2px solid #E20074'
          }}>
            {subSteps.map((subStep, index) => (
              <div key={index} style={{
                fontSize: '12px',
                color: '#E20074',
                padding: '4px 0',
                opacity: 0.8
              }}>
                {subStep}
              </div>
            ))}
          </div>
        )}
      </div>
    );
  };

  const renderMobileView = () => (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      background: 'rgba(0,0,0,0.5)',
      zIndex: 1000,
      display: 'flex',
      alignItems: 'flex-start',
      justifyContent: 'flex-start'
    }}>
      <div style={{
        width: '280px',
        background: 'white',
        height: '100vh',
        overflowY: 'auto',
        display: 'flex',
        flexDirection: 'column'
      }}>
        {/* Mobile Header */}
        <div style={{
          background: '#E20074',
          color: 'white',
          padding: '20px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <Menu size={20} />
            <span style={{ fontSize: '18px', fontWeight: '600' }}>Quote Steps</span>
          </div>
          <button
            onClick={() => setIsCollapsed(true)}
            style={{
              background: 'transparent',
              border: 'none',
              color: 'white',
              cursor: 'pointer',
              padding: '4px'
            }}
          >
            <X size={24} />
          </button>
        </div>
        
        {/* Mobile Content */}
        <div style={{ flex: 1, padding: '20px' }}>
          {steps.map(renderStepItem)}
        </div>

        {/* Mobile Navigation Buttons */}
        <div style={{
          padding: '20px',
          borderTop: '1px solid #e0e0e0',
          display: 'flex',
          gap: '10px'
        }}>
          <button
            onClick={handlePrevious}
            disabled={currentStep === 0}
            style={{
              flex: 1,
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
              gap: '6px',
              opacity: currentStep === 0 ? 0.5 : 1
            }}
          >
            <ArrowLeft size={14} />
            Previous
          </button>
          
          <button
            onClick={handleNext}
            disabled={currentStep === steps.length - 1}
            style={{
              flex: 1,
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
              gap: '6px',
              opacity: currentStep === steps.length - 1 ? 0.5 : 1
            }}
          >
            Next
            <ArrowRight size={14} />
          </button>
        </div>
      </div>
    </div>
  );

  const renderDesktopView = () => {
    if (isCollapsed) {
      return (
        <div style={{
          position: 'fixed',
          top: '20px',
          left: '20px',
          zIndex: 1000
        }}>
          <button
            onClick={() => setIsCollapsed(false)}
            style={{
              background: '#E20074',
              color: 'white',
              border: 'none',
              borderRadius: '50px',
              padding: '12px 16px',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              boxShadow: '0 4px 16px rgba(226, 0, 116, 0.3)',
              cursor: 'pointer',
              fontSize: '14px',
              fontWeight: '600'
            }}
          >
            <Menu size={18} />
            <span>Steps</span>
            <ChevronUp size={16} />
          </button>
        </div>
      );
    }

    return (
      <div style={{
        position: 'fixed',
        left: 0,
        top: '80px', // Start below the StatusBar (approximately 80px height)
        width: '280px',
        height: 'calc(100vh - 80px)', // Adjust height to account for StatusBar
        background: 'white',
        borderRight: '1px solid #e0e0e0',
        overflowY: 'auto',
        zIndex: 100,
        display: 'flex',
        flexDirection: 'column'
      }}>
        {/* Desktop Header */}
        <div style={{
          background: '#E20074',
          color: 'white',
          padding: '20px',
          textAlign: 'center',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between'
        }}>
          <div>
            <div style={{ fontSize: '18px', fontWeight: '600' }}>
              Quote Steps
            </div>
            <div style={{ fontSize: '12px', opacity: 0.9, marginTop: '4px' }}>
              {completedSteps.length} of {steps.length} complete
            </div>
          </div>
          <button
            onClick={() => setIsCollapsed(true)}
            style={{
              background: 'transparent',
              border: 'none',
              color: 'white',
              cursor: 'pointer',
              padding: '4px'
            }}
          >
            <X size={20} />
          </button>
        </div>
        
        {/* Desktop Content */}
        <div style={{ flex: 1, padding: '20px' }}>
          {steps.map(renderStepItem)}
        </div>

        {/* Desktop Navigation Buttons */}
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
            Step {currentStep + 1} of {steps.length}: {steps[currentStep]?.title}
          </div>
          
          <button
            onClick={handlePrevious}
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
            onClick={handleNext}
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

  // Mobile collapsed view
  if (isMobile && isCollapsed) {
    return (
      <div style={{
        position: 'fixed',
        top: '20px',
        left: '20px',
        zIndex: 1000
      }}>
        <button
          onClick={() => setIsCollapsed(false)}
          style={{
            background: '#E20074',
            color: 'white',
            border: 'none',
            borderRadius: '50px',
            padding: '12px 16px',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            boxShadow: '0 4px 16px rgba(226, 0, 116, 0.3)',
            cursor: 'pointer',
            fontSize: '14px',
            fontWeight: '600'
          }}
        >
          <Menu size={18} />
          <span>Steps</span>
          <ChevronUp size={16} />
        </button>
      </div>
    );
  }

  // Mobile expanded view
  if (isMobile && !isCollapsed) {
    return renderMobileView();
  }

  // Desktop view
  return renderDesktopView();
};

export default LeftNavigation;
