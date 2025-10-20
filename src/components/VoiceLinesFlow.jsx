import React, { useState } from 'react';
import { Phone, CreditCard, Smartphone, Shield, ArrowRight, ArrowLeft, CheckCircle } from 'lucide-react';
import LineSelection from './LineSelection';
import PlanSelection from './PlanSelection';
import DeviceSelection from './DeviceSelection';
import ProtectionSelection from './ProtectionSelection';

const VoiceLinesFlow = ({ 
  lines, 
  plans, 
  devices, 
  protection, 
  onLinesChange, 
  onPlansChange, 
  onDevicesChange, 
  onProtectionChange, 
  onNext, 
  onPrev 
}) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  const steps = [
    { id: 0, title: 'Voice Lines', icon: Phone, component: 'lines' },
    { id: 1, title: 'Voice Plans', icon: CreditCard, component: 'plans' },
    { id: 2, title: 'Voice Devices', icon: Smartphone, component: 'devices' },
    { id: 3, title: 'Protection', icon: Shield, component: 'protection' }
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

  const renderStepContent = () => {
    switch (steps[currentStep].component) {
      case 'lines':
        return (
          <LineSelection
            lines={lines}
            onLinesChange={onLinesChange}
            onNext={nextStep}
          />
        );
      case 'plans':
        return (
          <PlanSelection
            lines={lines}
            plans={plans}
            onPlansChange={onPlansChange}
            onNext={nextStep}
            onPrev={prevStep}
          />
        );
      case 'devices':
        return (
          <DeviceSelection
            lines={lines}
            devices={devices}
            onDevicesChange={onDevicesChange}
            onNext={nextStep}
            onPrev={prevStep}
          />
        );
      case 'protection':
        return (
          <ProtectionSelection
            lines={lines}
            devices={devices}
            protection={protection}
            onProtectionChange={onProtectionChange}
            onNext={onNext}
            onPrev={prevStep}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div style={{
      width: '100%',
      margin: '0',
      padding: '0',
      height: '100%',
      overflowY: 'auto'
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
  );
};

export default VoiceLinesFlow;
