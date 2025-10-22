import React, { useState, useCallback } from 'react';
import { Phone, ArrowLeft, ArrowRight, CheckCircle, Circle } from 'lucide-react';
import DeviceSelection from './DeviceSelection';
import PortInSelection from './PortInSelection';
import PromotionsSelection from './PromotionsSelection';
import ProtectionSelection from './ProtectionSelection';
import { pricingEngine } from '../utils/pricingEngine';

const VoiceLinesFlow = ({ 
  data, 
  onDataChange, 
  onComplete, 
  onPrev,
  onNext
}) => {
  const [currentSubStep, setCurrentSubStep] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  // Initialize data from props or defaults
  const [lines, setLines] = useState(data?.quantity || 1);
  const [plans, setPlans] = useState(data?.plans || {});
  const [devices, setDevices] = useState(data?.devices || {});
  const [protection, setProtection] = useState(data?.protection || {});
  const [promotions, setPromotions] = useState(data?.promotions || {});
  const [portInData, setPortInData] = useState(data?.portInData || {});

  const subSteps = [
    { id: 0, title: 'Lines & Plans', description: 'Select number of lines and rate plans' },
    { id: 1, title: 'Devices', description: 'Choose devices for each line' },
    { id: 2, title: 'Port-In Info', description: 'Port existing numbers (affects promotions)' },
    { id: 3, title: 'Promotions', description: 'Apply per-line promotions and savings' },
    { id: 4, title: 'Protection', description: 'Add device protection plans' },
    { id: 5, title: 'Review & Pricing', description: 'Final review and pricing breakdown' }
  ];

  // Navigation handlers
  const nextSubStep = useCallback(() => {
    if (currentSubStep < subSteps.length - 1) {
      setIsLoading(true);
      setTimeout(() => {
        setCurrentSubStep(prev => prev + 1);
        setIsLoading(false);
      }, 300);
    } else {
      handleComplete();
    }
  }, [currentSubStep, subSteps.length]);

  const prevSubStep = useCallback(() => {
    if (currentSubStep > 0) {
      setIsLoading(true);
      setTimeout(() => {
        setCurrentSubStep(prev => prev - 1);
        setIsLoading(false);
      }, 300);
    } else {
      onPrev();
    }
  }, [currentSubStep, onPrev]);

  // Data change handler
  const handleDataChange = useCallback(() => {
    const voiceLinesData = {
      quantity: lines,
      plans,
      devices,
      protection,
      promotions,
      portInData,
      totalMonthly: calculateTotal()
    };
    onDataChange(voiceLinesData);
  }, [lines, plans, devices, protection, promotions, portInData, onDataChange]);

  // Complete handler
  const handleComplete = useCallback(() => {
    const voiceLinesData = {
      quantity: lines,
      plans,
      devices,
      protection,
      promotions,
      portInData,
      totalMonthly: calculateTotal()
    };
    onDataChange(voiceLinesData);
    onComplete();
  }, [lines, plans, devices, protection, promotions, portInData, onDataChange, onComplete]);

  // Calculate total monthly cost
  const calculateTotal = useCallback(() => {
    const voiceLinesData = {
      quantity: lines,
      plans,
      devices,
      protection,
      promotions
    };
    
    const pricing = pricingEngine.calculateVoiceLinesPricing(voiceLinesData);
    return pricing.monthly;
  }, [lines, plans, devices, protection, promotions]);

  // Render sub-step content
  const renderSubStepContent = () => {
    switch (currentSubStep) {
      case 0: // Lines & Plans
        return (
          <div style={{ padding: '20px' }}>
            <div style={{ textAlign: 'center', marginBottom: '30px' }}>
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
                <Phone size={30} />
              </div>
              <h1 style={{ fontSize: '24px', fontWeight: '700', color: '#E20074', marginBottom: '8px' }}>
                Lines & Plans
              </h1>
              <p style={{ fontSize: '14px', color: '#666', lineHeight: '1.4' }}>
                Select the number of voice lines and choose your rate plans
              </p>
            </div>

            {/* Lines Selection */}
            <div style={{
              background: '#f8f9fa',
              padding: '20px',
              borderRadius: '8px',
              marginBottom: '20px',
              border: '1px solid #e0e0e0'
            }}>
              <h3 style={{ fontSize: '18px', fontWeight: '600', marginBottom: '15px', color: '#333' }}>
                Number of Lines
              </h3>
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(80px, 1fr))',
                gap: '10px',
                marginBottom: '20px'
              }}>
                {[1, 2, 3, 4, 5, 6, 7, 8].map(num => (
                  <button
                    key={num}
                    onClick={() => setLines(num)}
                    style={{
                      padding: '12px',
                      border: `2px solid ${lines === num ? '#E20074' : '#e0e0e0'}`,
                      borderRadius: '8px',
                      background: lines === num ? '#fdf2f8' : 'white',
                      color: lines === num ? '#E20074' : '#333',
                      fontSize: '16px',
                      fontWeight: '600',
                      cursor: 'pointer',
                      transition: 'all 0.3s ease'
                    }}
                  >
                    {num}
                  </button>
                ))}
              </div>
            </div>

            {/* Plans Selection */}
            <div style={{
              background: '#f8f9fa',
              padding: '20px',
              borderRadius: '8px',
              marginBottom: '20px',
              border: '1px solid #e0e0e0'
            }}>
              <h3 style={{ fontSize: '18px', fontWeight: '600', marginBottom: '15px', color: '#333' }}>
                Rate Plans
              </h3>
              
              {/* Standard Plans */}
              <div style={{ marginBottom: '20px' }}>
                <h4 style={{ fontSize: '14px', fontWeight: '600', color: '#666', marginBottom: '10px' }}>
                  Standard Plans
                </h4>
                <div style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                  gap: '15px'
                }}>
                  {[
                    { id: 'experience-beyond', name: 'Experience Beyond', price: 100, features: ['Unlimited', 'Premium Data', 'Netflix', 'Apple TV+', 'T-Mobile Tuesdays'] },
                    { id: 'experience-more', name: 'Experience More', price: 85, features: ['Unlimited', 'Premium Data', 'Netflix', 'T-Mobile Tuesdays'] },
                    { id: 'experience-essentials', name: 'Experience Essentials', price: 60, features: ['Unlimited', 'Basic Data'] },
                    { id: 'experience-essentials-saver', name: 'Experience Essentials Saver', price: 50, features: ['Unlimited', 'Basic Data'] }
                  ].map(plan => (
                    <div
                      key={plan.id}
                      onClick={() => {
                        const newPlans = {};
                        for (let i = 0; i < lines; i++) {
                          newPlans[i] = plan.id;
                        }
                        setPlans(newPlans);
                      }}
                      style={{
                        padding: '15px',
                        border: `2px solid ${Object.values(plans).includes(plan.id) ? '#E20074' : '#e0e0e0'}`,
                        borderRadius: '8px',
                        background: Object.values(plans).includes(plan.id) ? '#fdf2f8' : 'white',
                        cursor: 'pointer',
                        transition: 'all 0.3s ease'
                      }}
                    >
                      <h4 style={{ fontSize: '16px', fontWeight: '600', marginBottom: '8px', color: '#333' }}>
                        {plan.name}
                      </h4>
                      <div style={{ fontSize: '20px', fontWeight: '700', color: '#E20074', marginBottom: '8px' }}>
                        ${plan.price}/line
                      </div>
                      <ul style={{ fontSize: '12px', color: '#666', margin: 0, paddingLeft: '15px' }}>
                        {plan.features.map(feature => (
                          <li key={feature}>{feature}</li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </div>

              {/* Special Plans */}
              <div>
                <h4 style={{ fontSize: '14px', fontWeight: '600', color: '#666', marginBottom: '10px' }}>
                  Special Plans (55+, Military, First Responder)
                </h4>
                <div style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                  gap: '15px'
                }}>
                  {[
                    { id: 'experience-beyond-55', name: 'Experience Beyond 55+', price: 85, features: ['Unlimited', 'Premium Data', 'Netflix', 'Apple TV+', 'T-Mobile Tuesdays', '55+ Savings'] },
                    { id: 'experience-more-55', name: 'Experience More 55+', price: 70, features: ['Unlimited', 'Premium Data', 'Netflix', 'T-Mobile Tuesdays', '55+ Savings'] },
                    { id: 'essentials-choice-55', name: 'Essentials Choice 55+', price: 45, features: ['Unlimited', 'Basic Data', '55+ Savings'] },
                    { id: 'experience-beyond-military', name: 'Experience Beyond Military', price: 90, features: ['Unlimited', 'Premium Data', 'Netflix', 'Apple TV+', 'T-Mobile Tuesdays', 'Military Savings'] },
                    { id: 'experience-beyond-first-responder', name: 'Experience Beyond First Responder', price: 90, features: ['Unlimited', 'Premium Data', 'Netflix', 'Apple TV+', 'T-Mobile Tuesdays', 'First Responder Savings'] }
                  ].map(plan => (
                    <div
                      key={plan.id}
                      onClick={() => {
                        const newPlans = {};
                        for (let i = 0; i < lines; i++) {
                          newPlans[i] = plan.id;
                        }
                        setPlans(newPlans);
                      }}
                      style={{
                        padding: '15px',
                        border: `2px solid ${Object.values(plans).includes(plan.id) ? '#E20074' : '#e0e0e0'}`,
                        borderRadius: '8px',
                        background: Object.values(plans).includes(plan.id) ? '#fdf2f8' : 'white',
                        cursor: 'pointer',
                        transition: 'all 0.3s ease'
                      }}
                    >
                      <h4 style={{ fontSize: '16px', fontWeight: '600', marginBottom: '8px', color: '#333' }}>
                        {plan.name}
                      </h4>
                      <div style={{ fontSize: '20px', fontWeight: '700', color: '#E20074', marginBottom: '8px' }}>
                        ${plan.price}/line
                      </div>
                      <ul style={{ fontSize: '12px', color: '#666', margin: 0, paddingLeft: '15px' }}>
                        {plan.features.map(feature => (
                          <li key={feature}>{feature}</li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        );

      case 1: // Devices
        return (
          <DeviceSelection
            lines={lines}
            devices={devices}
            onDevicesChange={setDevices}
            onNext={nextSubStep}
            onPrev={prevSubStep}
          />
        );

      case 2: // Port-In Info
        return (
          <PortInSelection
            lines={lines}
            portInData={portInData}
            onPortInDataChange={setPortInData}
            onNext={nextSubStep}
            onPrev={prevSubStep}
          />
        );

      case 3: // Promotions
        return (
          <PromotionsSelection
            lines={lines}
            devices={devices}
            plans={plans}
            portInData={portInData}
            promotions={promotions}
            onPromotionsChange={setPromotions}
            onNext={nextSubStep}
            onPrev={prevSubStep}
          />
        );

      case 4: // Protection
        return (
          <ProtectionSelection
            lines={lines}
            devices={devices}
            protection={protection}
            onProtectionChange={setProtection}
            onNext={nextSubStep}
            onPrev={prevSubStep}
          />
        );

      case 5: // Review & Pricing
        return (
          <div style={{ padding: '20px' }}>
            <div style={{ textAlign: 'center', marginBottom: '30px' }}>
              <h1 style={{ fontSize: '24px', fontWeight: '700', color: '#E20074', marginBottom: '8px' }}>
                Review & Pricing
              </h1>
              <p style={{ fontSize: '14px', color: '#666', lineHeight: '1.4' }}>
                Review your selections and see the total monthly cost
              </p>
            </div>

            {/* Pricing Summary */}
            <div style={{
              background: '#f8f9fa',
              padding: '20px',
              borderRadius: '8px',
              marginBottom: '20px',
              border: '1px solid #e0e0e0'
            }}>
              <h3 style={{ fontSize: '18px', fontWeight: '600', marginBottom: '15px', color: '#333' }}>
                Monthly Pricing Breakdown
              </h3>
              
              {/* Plan Costs */}
              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                padding: '10px 0',
                borderBottom: '1px solid #e0e0e0'
              }}>
                <span style={{ fontSize: '14px', color: '#666' }}>
                  Voice Plans ({lines} lines)
                </span>
                <span style={{ fontSize: '16px', fontWeight: '600', color: '#333' }}>
                  ${calculateTotal()}
                </span>
              </div>

              {/* Device Costs */}
              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                padding: '10px 0',
                borderBottom: '1px solid #e0e0e0'
              }}>
                <span style={{ fontSize: '14px', color: '#666' }}>
                  Device Payments
                </span>
                <span style={{ fontSize: '16px', fontWeight: '600', color: '#333' }}>
                  $0 (BYOD)
                </span>
              </div>

              {/* Protection Costs */}
              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                padding: '10px 0',
                borderBottom: '1px solid #e0e0e0'
              }}>
                <span style={{ fontSize: '14px', color: '#666' }}>
                  Protection Plans
                </span>
                <span style={{ fontSize: '16px', fontWeight: '600', color: '#333' }}>
                  $0
                </span>
              </div>

              {/* Total */}
              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                padding: '15px 0 0 0',
                fontSize: '18px',
                fontWeight: '700',
                color: '#E20074'
              }}>
                <span>Total Monthly Cost</span>
                <span>${calculateTotal().toFixed(2)}</span>
              </div>
            </div>

            {/* Summary */}
            <div style={{
              background: '#e8f5e8',
              padding: '20px',
              borderRadius: '8px',
              border: '1px solid #4CAF50'
            }}>
              <h3 style={{ fontSize: '16px', fontWeight: '600', marginBottom: '10px', color: '#2e7d32' }}>
                Voice Lines Summary
              </h3>
              <div style={{ fontSize: '14px', color: '#2e7d32', lineHeight: '1.5' }}>
                <div>• {lines} voice line{lines > 1 ? 's' : ''} configured</div>
                <div>• Plan: {Object.values(plans)[0] ? Object.values(plans)[0].replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase()) : 'Not selected'}</div>
                <div>• Devices: BYOD (Bring Your Own Device)</div>
                <div>• Estimated monthly cost: ${calculateTotal().toFixed(2)}</div>
              </div>
            </div>
          </div>
        );

      default:
        return <div>Sub-step not found</div>;
    }
  };

  return (
    <div style={{
      maxWidth: '100%',
      margin: '0 auto',
      background: 'white',
      borderRadius: '12px',
      boxShadow: '0 4px 16px rgba(0,0,0,0.1)',
      height: 'calc(100vh - 140px)',
      overflowY: 'auto',
      display: 'flex',
      flexDirection: 'column'
    }}>
      {/* Header */}
      <div style={{
        padding: '20px',
        borderBottom: '1px solid #e0e0e0',
        background: '#f8f9fa'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '8px' }}>
          <Phone size={24} color="#E20074" />
          <h2 style={{ fontSize: '24px', fontWeight: '700', color: '#E20074', margin: 0 }}>
            Voice Lines Setup
          </h2>
        </div>
        <p style={{ color: '#666', fontSize: '14px', margin: 0, lineHeight: '1.4' }}>
          Configure voice lines for your account. Complete all steps to finish voice line setup.
        </p>
      </div>

      {/* Step Progress */}
      <div style={{
        padding: '20px',
        borderBottom: '1px solid #e0e0e0',
        background: 'white'
      }}>
        <div style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '8px'
        }}>
          {subSteps.map((step, index) => {
            const isActive = currentSubStep === step.id;
            const isCompleted = currentSubStep > step.id;
            
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
                  <div style={{ marginRight: '6px', display: 'flex', alignItems: 'center' }}>
                    {isCompleted ? <CheckCircle size={16} /> : <Circle size={16} />}
                  </div>
                  <span style={{ fontSize: '12px', fontWeight: '600', whiteSpace: 'nowrap' }}>
                    {step.title}
                  </span>
                </div>
                
                {index < subSteps.length - 1 && (
                  <div style={{
                    width: '20px',
                    height: '2px',
                    background: currentSubStep > step.id ? '#4CAF50' : 'rgba(255,255,255,0.3)',
                    transition: 'background 0.3s ease'
                  }} />
                )}
              </React.Fragment>
            );
          })}
        </div>
      </div>

      {/* Content */}
      <div style={{ flex: 1, overflowY: 'auto' }}>
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
          renderSubStepContent()
        )}
      </div>

      {/* Navigation */}
      <div style={{
        padding: '20px',
        borderTop: '1px solid #e0e0e0',
        background: '#f8f9fa',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center'
      }}>
        <button
          onClick={prevSubStep}
          style={{
            padding: '12px 24px',
            border: '2px solid #E20074',
            borderRadius: '8px',
            background: 'white',
            color: '#E20074',
            fontSize: '16px',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            transition: 'all 0.3s ease'
          }}
        >
          <ArrowLeft size={16} />
          {currentSubStep === 0 ? 'Back to Services' : 'Previous'}
        </button>
        
        <div style={{ fontSize: '14px', color: '#666', textAlign: 'center' }}>
          Step {currentSubStep + 1} of {subSteps.length}
        </div>
        
        <button
          onClick={nextSubStep}
          style={{
            padding: '12px 24px',
            border: '2px solid #E20074',
            borderRadius: '8px',
            background: '#E20074',
            color: 'white',
            fontSize: '16px',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            transition: 'all 0.3s ease'
          }}
        >
          {currentSubStep === subSteps.length - 1 ? 'Complete Voice Lines' : 'Next'}
          <ArrowRight size={16} />
        </button>
      </div>
    </div>
  );
};

export default VoiceLinesFlow;