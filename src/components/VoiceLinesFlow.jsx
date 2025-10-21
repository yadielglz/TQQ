import React, { useState } from 'react';
import { Phone, CreditCard, Smartphone, Shield, Hash } from 'lucide-react';
import LineSelection from './LineSelection';
import PlanSelection from './PlanSelection';
import DeviceSelection from './DeviceSelection';
import ProtectionSelection from './ProtectionSelection';
import PromotionsSelection from './PromotionsSelection';
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
    { id: 0, title: 'Lines & Plans', icon: Phone, component: 'lines', description: 'Select number of lines and rate plans' },
    { id: 1, title: 'Devices', icon: Smartphone, component: 'devices', description: 'Choose devices for each line' },
    { id: 2, title: 'Port-In Info', icon: Hash, component: 'ports', description: 'Port existing numbers (affects promotions)' },
    { id: 3, title: 'Promotions', icon: Phone, component: 'promotions', description: 'Apply per-line promotions and savings' },
    { id: 4, title: 'Protection', icon: Shield, component: 'protection', description: 'Add device protection plans' },
    { id: 5, title: 'Review & Pricing', icon: CreditCard, component: 'summary', description: 'Final review and pricing breakdown' }
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
          <div style={{
            maxWidth: '100%',
            margin: '0 auto',
            padding: '20px 15px',
            background: 'white',
            borderRadius: '12px',
            boxShadow: '0 4px 16px rgba(0,0,0,0.1)',
            height: 'calc(100vh - 120px)',
            overflowY: 'auto'
          }}>
            {/* Combined Lines & Plans Selection */}
            <div style={{
              textAlign: 'center',
              marginBottom: '30px'
            }}>
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
              <h1 style={{
                fontSize: '24px',
                fontWeight: '700',
                color: '#E20074',
                marginBottom: '8px'
              }}>
                Lines & Plans
              </h1>
              <p style={{
                fontSize: '14px',
                color: '#666',
                lineHeight: '1.4'
              }}>
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
              <h3 style={{
                fontSize: '18px',
                fontWeight: '600',
                marginBottom: '15px',
                color: '#333'
              }}>
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
              <h3 style={{
                fontSize: '18px',
                fontWeight: '600',
                marginBottom: '15px',
                color: '#333'
              }}>
                Rate Plans
              </h3>
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                gap: '15px'
              }}>
                {[
                  { id: 'go5g-next', name: 'Go5G Next', price: 95, features: ['Unlimited', 'Premium Data', 'Netflix'] },
                  { id: 'go5g-plus', name: 'Go5G Plus', price: 80, features: ['Unlimited', 'Premium Data', 'Netflix'] },
                  { id: 'go5g', name: 'Go5G', price: 70, features: ['Unlimited', 'Premium Data'] },
                  { id: 'essentials', name: 'Essentials', price: 60, features: ['Unlimited', 'Basic Data'] }
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
                    <h4 style={{
                      fontSize: '16px',
                      fontWeight: '600',
                      marginBottom: '8px',
                      color: '#333'
                    }}>
                      {plan.name}
                    </h4>
                    <div style={{
                      fontSize: '20px',
                      fontWeight: '700',
                      color: '#E20074',
                      marginBottom: '8px'
                    }}>
                      ${plan.price}/line
                    </div>
                    <ul style={{
                      fontSize: '12px',
                      color: '#666',
                      margin: 0,
                      paddingLeft: '15px'
                    }}>
                      {plan.features.map(feature => (
                        <li key={feature}>{feature}</li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>

            {/* Action Buttons */}
            <div style={{
              display: 'flex',
              gap: '12px',
              justifyContent: 'center'
            }}>
              <button
                onClick={onPrev}
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
                Back to Services
              </button>
              <button
                onClick={nextStep}
                disabled={lines === 0 || Object.keys(plans).length === 0}
                style={{
                  flex: 1,
                  padding: '12px 20px',
                  background: lines === 0 || Object.keys(plans).length === 0 ? '#ccc' : '#E20074',
                  color: 'white',
                  border: 'none',
                  borderRadius: '6px',
                  fontSize: '14px',
                  fontWeight: '600',
                  cursor: lines === 0 || Object.keys(plans).length === 0 ? 'not-allowed' : 'pointer',
                  transition: 'background-color 0.3s ease'
                }}
                onMouseOver={(e) => {
                  if (lines > 0 && Object.keys(plans).length > 0) {
                    e.target.style.background = '#C1005F';
                  }
                }}
                onMouseOut={(e) => {
                  if (lines > 0 && Object.keys(plans).length > 0) {
                    e.target.style.background = '#E20074';
                  }
                }}
              >
                Continue to Devices
              </button>
            </div>
          </div>
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
      
      case 'promotions':
        return (
          <PromotionsSelection
            lines={lines}
            quoteData={{
              devices: Object.values(devices),
              plans: Object.values(plans)
            }}
            portInData={ports}
            onPromotionsChange={setPromotions}
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
      
      case 'summary':
        return (
          <div style={{
            maxWidth: '100%',
            margin: '0 auto',
            padding: '20px 15px',
            background: 'white',
            borderRadius: '12px',
            boxShadow: '0 4px 16px rgba(0,0,0,0.1)',
            height: 'calc(100vh - 120px)',
            overflowY: 'auto'
          }}>
            {/* Summary Header */}
            <div style={{
              textAlign: 'center',
              marginBottom: '30px'
            }}>
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
                <CreditCard size={30} />
              </div>
              <h1 style={{
                fontSize: '24px',
                fontWeight: '700',
                color: '#E20074',
                marginBottom: '8px'
              }}>
                Review & Pricing
              </h1>
              <p style={{
                fontSize: '14px',
                color: '#666',
                lineHeight: '1.4'
              }}>
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
              <h3 style={{
                fontSize: '18px',
                fontWeight: '600',
                marginBottom: '15px',
                color: '#333'
              }}>
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
                  $0 (Financed)
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
                  ${Object.values(protection).reduce((total, id) => {
                    const prices = { 'p360-tier1': 7, 'p360-tier2': 9, 'p360-tier3': 13, 'p360-tier4': 16, 'p360-tier5': 18, 'p360-tier6': 25 };
                    return total + (prices[id] || 0);
                  }, 0)}
                </span>
              </div>

              {/* Promotion Savings */}
              {promotions && promotions.totalSavings > 0 && (
                <div style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  padding: '10px 0',
                  borderBottom: '1px solid #e0e0e0'
                }}>
                  <span style={{ fontSize: '14px', color: '#28a745' }}>
                    Promotion Savings
                  </span>
                  <span style={{ fontSize: '16px', fontWeight: '600', color: '#28a745' }}>
                    -${promotions.totalSavings?.toFixed(2) || '0.00'}
                  </span>
                </div>
              )}

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
                <span>
                  ${(calculateTotal() + Object.values(protection).reduce((total, id) => {
                    const prices = { 'p360-tier1': 7, 'p360-tier2': 9, 'p360-tier3': 13, 'p360-tier4': 16, 'p360-tier5': 18, 'p360-tier6': 25 };
                    return total + (prices[id] || 0);
                  }, 0) - (promotions?.totalSavings || 0)).toFixed(2)}
                </span>
              </div>
            </div>

            {/* Action Buttons */}
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
                Back to Protection
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
          </div>
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