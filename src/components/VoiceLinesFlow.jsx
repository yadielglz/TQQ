import React, { useState } from 'react';
import { Phone, CreditCard, Smartphone, Shield, Hash } from 'lucide-react';
import LineSelection from './LineSelection';
import PlanSelection from './PlanSelection';
import DeviceSelection from './DeviceSelection';
import ProtectionSelection from './ProtectionSelection';
import PortInSelection from './PortInSelection';

const VoiceLinesFlow = ({ 
  data, 
  onDataChange, 
  onComplete, 
  onAddAnother, 
  onPrev 
}) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  // Initialize data from props or defaults
  const [lines, setLines] = useState(data?.quantity || 1);
  const [plans, setPlans] = useState(data?.plans || {});
  const [devices, setDevices] = useState(data?.devices || {});
  const [protection, setProtection] = useState(data?.protection || {});
  const [promotions, setPromotions] = useState(data?.promotions || {});
  const [ports, setPorts] = useState(data?.ports || {});

  const steps = [
    { id: 0, title: 'Voice Lines', icon: Phone, component: 'lines' },
    { id: 1, title: 'Voice Plans', icon: CreditCard, component: 'plans' },
    { id: 2, title: 'Voice Devices', icon: Smartphone, component: 'devices' },
    { id: 3, title: 'Protection', icon: Shield, component: 'protection' },
    { id: 4, title: 'Promotions', icon: Phone, component: 'promotions' },
    { id: 5, title: 'Number/Port', icon: Hash, component: 'ports' }
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
    const voiceLinesData = {
      quantity: lines,
      plans,
      devices,
      protection,
      promotions,
      ports,
      totalMonthly: calculateTotal()
    };
    
    onDataChange(voiceLinesData);
    onComplete();
  };

  const handleAddAnother = () => {
    const voiceLinesData = {
      quantity: lines,
      plans,
      devices,
      protection,
      promotions,
      ports,
      totalMonthly: calculateTotal()
    };
    
    onDataChange(voiceLinesData);
    onAddAnother();
  };

  const calculateTotal = () => {
    let total = 0;
    const planOptions = [
      { id: 'essentials', pricing: { 1: 50, 2: 80, 3: 90, 4: 100, 5: 120, 6: 135, additional: 35 }},
      { id: 'more', pricing: { 1: 85, 2: 140, 3: 140, 4: 170, 5: 200, 6: 230, additional: 35 }},
      { id: 'beyond', pricing: { 1: 100, 2: 170, 3: 170, 4: 215, 5: 260, 6: 305, additional: 35 }}
    ];

    // Calculate plan total - only calculate once for the total number of lines
    // Family plans have shared pricing, not per-line pricing
    if (Object.keys(plans).length > 0) {
      // Get the first plan (assuming all lines are on the same plan for family plans)
      const firstPlanId = Object.values(plans)[0];
      const plan = planOptions.find(p => p.id === firstPlanId);
      if (plan) {
        if (lines <= 6) {
          total += plan.pricing[lines] || 0;
        } else {
          total += plan.pricing[6] + (lines - 6) * plan.pricing.additional;
        }
      }
    }

    // Add protection costs - these are per-line
    Object.values(protection).forEach(protectionId => {
      const protectionPrices = {
        'p360-tier1': 7, 'p360-tier2': 9, 'p360-tier3': 13,
        'p360-tier4': 16, 'p360-tier5': 18, 'p360-tier6': 25
      };
      total += protectionPrices[protectionId] || 0;
    });

    return total;
  };

  const renderStepContent = () => {
    switch (steps[currentStep].component) {
      case 'lines':
        return (
          <LineSelection
            lines={lines}
            onLinesChange={setLines}
            onNext={nextStep}
          />
        );
      
      case 'plans':
        return (
          <PlanSelection
            lines={lines}
            plans={plans}
            onPlansChange={setPlans}
            onNext={nextStep}
            onPrev={prevStep}
          />
        );
      
      case 'devices':
        return (
          <DeviceSelection
            lines={lines}
            devices={devices}
            onDevicesChange={setDevices}
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
            onProtectionChange={setProtection}
            onNext={nextStep}
            onPrev={prevStep}
          />
        );
      
      case 'promotions':
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
                <Phone size={24} color="#E20074" />
                <h2 style={{
                  fontSize: '24px',
                  fontWeight: '700',
                  color: '#E20074',
                  margin: 0
                }}>
                  Voice Line Promotions
                </h2>
              </div>
              <p style={{ 
                color: '#666', 
                fontSize: '14px',
                margin: 0,
                lineHeight: '1.4'
              }}>
                Select promotions for your voice lines. This step is optional.
              </p>
            </div>
            
            {/* Simple promotion selection for now */}
            <div style={{
              background: '#f8f9fa',
              padding: '15px',
              borderRadius: '6px',
              marginBottom: '20px',
              border: '1px solid #e0e0e0'
            }}>
              <div style={{ fontSize: '14px', fontWeight: '600', marginBottom: '8px' }}>
                Available Promotions
              </div>
              <div style={{ color: '#666', fontSize: '12px' }}>
                Promotion selection will be implemented in the next phase.
                For now, you can proceed without promotions.
              </div>
            </div>

            <div style={{
              display: 'flex',
              gap: '12px',
              justifyContent: 'center'
            }}>
              <button
                onClick={prevStep}
                style={{
                  flex: 1,
                  padding: '12px 20px',
                  background: '#6c757d',
                  color: 'white',
                  border: 'none',
                  borderRadius: '6px',
                  fontSize: '14px',
                  fontWeight: '600',
                  cursor: 'pointer',
                  transition: 'background-color 0.3s ease'
                }}
                onMouseOver={(e) => e.target.style.background = '#5a6268'}
                onMouseOut={(e) => e.target.style.background = '#6c757d'}
              >
                Back
              </button>
              <button
                onClick={nextStep}
                style={{
                  flex: 1,
                  padding: '12px 20px',
                  background: '#E20074',
                  color: 'white',
                  border: 'none',
                  borderRadius: '6px',
                  fontSize: '14px',
                  fontWeight: '600',
                  cursor: 'pointer',
                  transition: 'background-color 0.3s ease'
                }}
                onMouseOver={(e) => e.target.style.background = '#C1005F'}
                onMouseOut={(e) => e.target.style.background = '#E20074'}
              >
                Continue
              </button>
            </div>
          </div>
        );
      
      case 'ports':
        return (
          <PortInSelection
            lines={lines}
            portInData={ports}
            onPortInDataChange={setPorts}
            onNext={nextStep}
            onPrev={prevStep}
          />
        );
      
      default:
        return <div>Step not found</div>;
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
          <Phone size={24} color="#E20074" />
          <h2 style={{
            fontSize: '24px',
            fontWeight: '700',
            color: '#E20074',
            margin: 0
          }}>
            Voice Lines Setup
          </h2>
        </div>
        <p style={{ 
          color: '#666', 
          fontSize: '14px',
          margin: 0,
          lineHeight: '1.4'
        }}>
          Configure voice lines for your account. Complete all steps to finish voice line setup.
        </p>
      </div>

      {/* Step Progress */}
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: '20px',
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
                backdropFilter: 'blur(10px)',
                border: isActive ? '2px solid rgba(255,255,255,0.3)' : '2px solid transparent'
              }}>
                <div style={{
                  marginRight: '6px',
                  display: 'flex',
                  alignItems: 'center'
                }}>
                  <Icon size={16} />
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

      {/* Step Content */}
      {isLoading ? (
            <div style={{
              display: 'flex',
          justifyContent: 'center',
              alignItems: 'center',
          height: '200px',
          fontSize: '18px',
          color: '#666'
        }}>
              Loading...
        </div>
      ) : (
        renderStepContent()
      )}

      {/* Summary */}
      {currentStep > 0 && (
        <div style={{
          background: '#f8f9fa',
          padding: '15px',
          borderRadius: '8px',
          marginTop: '20px',
          border: '1px solid #e0e0e0'
        }}>
          <div style={{ fontWeight: '600', marginBottom: '8px', color: '#E20074', fontSize: '14px' }}>
            Voice Lines Summary
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px' }}>
            <span>Lines: {lines}</span>
            <span>Estimated Monthly: ${calculateTotal()}</span>
          </div>
        </div>
      )}

      {/* Final Navigation */}
      {currentStep === steps.length - 1 && (
        <div style={{
          display: 'flex',
          gap: '12px',
          justifyContent: 'center',
          marginTop: '20px'
        }}>
          <button
            onClick={handleAddAnother}
            style={{
              flex: 1,
              padding: '12px 20px',
              background: '#6c757d',
              color: 'white',
              border: 'none',
              borderRadius: '6px',
              fontSize: '14px',
              fontWeight: '600',
              cursor: 'pointer',
              transition: 'background-color 0.3s ease'
            }}
            onMouseOver={(e) => e.target.style.background = '#5a6268'}
            onMouseOut={(e) => e.target.style.background = '#6c757d'}
          >
            Add Another Service
          </button>
          <button
            onClick={handleComplete}
            style={{
              flex: 1,
              padding: '12px 20px',
              background: '#E20074',
              color: 'white',
              border: 'none',
              borderRadius: '6px',
              fontSize: '14px',
              fontWeight: '600',
              cursor: 'pointer',
              transition: 'background-color 0.3s ease'
            }}
            onMouseOver={(e) => e.target.style.background = '#C1005F'}
            onMouseOut={(e) => e.target.style.background = '#E20074'}
          >
            Complete Voice Lines
          </button>
        </div>
      )}
    </div>
  );
};

export default VoiceLinesFlow;