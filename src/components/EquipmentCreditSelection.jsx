import React, { useState, useCallback } from 'react';
import { CreditCard, ArrowLeft, ArrowRight, Plus, Minus, DollarSign, Smartphone, Trash2 } from 'lucide-react';

const EquipmentCreditSelection = ({ data, onDataChange, onNext, onPrev, voiceLinesData }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [equipmentCredits, setEquipmentCredits] = useState(data.credits || {});
  const [downPayments, setDownPayments] = useState(data.downPayments || {});
  const [tradeIns, setTradeIns] = useState(data.tradeIns || {});

  const steps = [
    { id: 'credit', title: 'Equipment Credit', description: 'Apply equipment credit per line' },
    { id: 'downpayment', title: 'Down Payment', description: 'Set down payment per line' },
    { id: 'tradeins', title: 'Trade-Ins', description: 'Add trade-in devices per line' }
  ];

  const tradeInDevices = [
    { id: 'iphone-12', name: 'iPhone 12', maxValue: 400, condition: 'Good' },
    { id: 'iphone-13', name: 'iPhone 13', maxValue: 500, condition: 'Good' },
    { id: 'iphone-14', name: 'iPhone 14', maxValue: 600, condition: 'Good' },
    { id: 'iphone-15', name: 'iPhone 15', maxValue: 700, condition: 'Good' },
    { id: 'galaxy-s21', name: 'Galaxy S21', maxValue: 300, condition: 'Good' },
    { id: 'galaxy-s22', name: 'Galaxy S22', maxValue: 400, condition: 'Good' },
    { id: 'galaxy-s23', name: 'Galaxy S23', maxValue: 500, condition: 'Good' },
    { id: 'galaxy-s24', name: 'Galaxy S24', maxValue: 600, condition: 'Good' },
    { id: 'pixel-6', name: 'Pixel 6', maxValue: 250, condition: 'Good' },
    { id: 'pixel-7', name: 'Pixel 7', maxValue: 350, condition: 'Good' },
    { id: 'pixel-8', name: 'Pixel 8', maxValue: 450, condition: 'Good' },
    { id: 'pixel-9', name: 'Pixel 9', maxValue: 550, condition: 'Good' }
  ];

  const handleEquipmentCreditChange = useCallback((lineIndex, amount) => {
    const newCredits = { ...equipmentCredits, [lineIndex]: amount };
    setEquipmentCredits(newCredits);
    const newData = { ...data, credits: newCredits };
    onDataChange(newData);
  }, [equipmentCredits, data, onDataChange]);

  const handleDownPaymentChange = useCallback((lineIndex, amount) => {
    const newDownPayments = { ...downPayments, [lineIndex]: amount };
    setDownPayments(newDownPayments);
    const newData = { ...data, downPayments: newDownPayments };
    onDataChange(newData);
  }, [downPayments, data, onDataChange]);

  const handleAddTradeIn = useCallback((lineIndex, deviceId, condition, value) => {
    const device = tradeInDevices.find(d => d.id === deviceId);
    const newTradeIn = {
      id: `${deviceId}-${Date.now()}`,
      deviceId,
      deviceName: device.name,
      condition,
      value: Math.min(value, device.maxValue)
    };
    const currentTradeIns = tradeIns[lineIndex] || [];
    const newLineTradeIns = [...currentTradeIns, newTradeIn];
    const newTradeIns = { ...tradeIns, [lineIndex]: newLineTradeIns };
    setTradeIns(newTradeIns);
    const newData = { ...data, tradeIns: newTradeIns };
    onDataChange(newData);
  }, [tradeIns, data, onDataChange]);

  const handleRemoveTradeIn = useCallback((lineIndex, tradeInId) => {
    const currentTradeIns = tradeIns[lineIndex] || [];
    const newLineTradeIns = currentTradeIns.filter(t => t.id !== tradeInId);
    const newTradeIns = { ...tradeIns, [lineIndex]: newLineTradeIns };
    setTradeIns(newTradeIns);
    const newData = { ...data, tradeIns: newTradeIns };
    onDataChange(newData);
  }, [tradeIns, data, onDataChange]);

  const nextStep = useCallback(() => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      onNext();
    }
  }, [currentStep, steps.length, onNext]);

  const prevStep = useCallback(() => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    } else {
      onPrev();
    }
  }, [currentStep, onPrev]);

  const renderEquipmentCreditStep = () => {
    const voiceLines = voiceLinesData?.quantity || 0;
    
    return (
      <div style={{ padding: '20px' }}>
        <h3 style={{ fontSize: '20px', fontWeight: '600', marginBottom: '20px', color: '#333' }}>
          Equipment Credit Per Line
        </h3>
        
        {voiceLines === 0 ? (
          <div style={{
            background: '#fff3cd',
            padding: '20px',
            borderRadius: '8px',
            border: '1px solid #ffc107',
            color: '#856404',
            textAlign: 'center'
          }}>
            No voice lines configured yet. Please configure voice lines first.
          </div>
        ) : (
          <>
            {Array.from({ length: voiceLines }, (_, index) => (
              <div key={index} style={{ marginBottom: '30px' }}>
                <h4 style={{ fontSize: '16px', fontWeight: '600', marginBottom: '15px', color: '#666' }}>
                  Line {index + 1} Equipment Credit
                </h4>
                <div style={{ marginBottom: '20px' }}>
                  <label style={{ display: 'block', fontSize: '14px', fontWeight: '600', marginBottom: '10px', color: '#333' }}>
                    Credit Amount ($)
                  </label>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '20px', justifyContent: 'center' }}>
                    <button
                      onClick={() => handleEquipmentCreditChange(index, Math.max(0, (equipmentCredits[index] || 0) - 50))}
                      style={{
                        width: '40px',
                        height: '40px',
                        borderRadius: '50%',
                        border: '2px solid #E20074',
                        background: 'white',
                        color: '#E20074',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        cursor: 'pointer'
                      }}
                    >
                      <Minus size={20} />
                    </button>
                    <div style={{ fontSize: '32px', fontWeight: '700', color: '#E20074', minWidth: '100px', textAlign: 'center' }}>
                      ${equipmentCredits[index] || 0}
                    </div>
                    <button
                      onClick={() => handleEquipmentCreditChange(index, (equipmentCredits[index] || 0) + 50)}
                      style={{
                        width: '40px',
                        height: '40px',
                        borderRadius: '50%',
                        border: '2px solid #E20074',
                        background: 'white',
                        color: '#E20074',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        cursor: 'pointer'
                      }}
                    >
                      <Plus size={20} />
                    </button>
                  </div>
                </div>
              </div>
            ))}
            
            <div style={{
              background: '#f8f9fa',
              padding: '20px',
              borderRadius: '8px',
              border: '1px solid #e0e0e0'
            }}>
              <h4 style={{ fontSize: '16px', fontWeight: '600', marginBottom: '10px', color: '#333' }}>
                Equipment Credit Information
              </h4>
              <ul style={{ fontSize: '14px', color: '#666', margin: 0, paddingLeft: '20px' }}>
                <li>Applied as monthly credit per line</li>
                <li>Reduces monthly device payments for each line</li>
                <li>Valid for 24 months</li>
                <li>Cannot exceed device cost per line</li>
              </ul>
            </div>
          </>
        )}
      </div>
    );
  };

  const renderDownPaymentStep = () => {
    const voiceLines = voiceLinesData?.quantity || 0;
    
    return (
      <div style={{ padding: '20px' }}>
        <h3 style={{ fontSize: '20px', fontWeight: '600', marginBottom: '20px', color: '#333' }}>
          Down Payment Per Line
        </h3>
        
        {voiceLines === 0 ? (
          <div style={{
            background: '#fff3cd',
            padding: '20px',
            borderRadius: '8px',
            border: '1px solid #ffc107',
            color: '#856404',
            textAlign: 'center'
          }}>
            No voice lines configured yet. Please configure voice lines first.
          </div>
        ) : (
          <>
            {Array.from({ length: voiceLines }, (_, index) => (
              <div key={index} style={{ marginBottom: '30px' }}>
                <h4 style={{ fontSize: '16px', fontWeight: '600', marginBottom: '15px', color: '#666' }}>
                  Line {index + 1} Down Payment
                </h4>
                <div style={{ marginBottom: '20px' }}>
                  <label style={{ display: 'block', fontSize: '14px', fontWeight: '600', marginBottom: '10px', color: '#333' }}>
                    Down Payment ($)
                  </label>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '20px', justifyContent: 'center' }}>
                    <button
                      onClick={() => handleDownPaymentChange(index, Math.max(0, (downPayments[index] || 0) - 50))}
                      style={{
                        width: '40px',
                        height: '40px',
                        borderRadius: '50%',
                        border: '2px solid #E20074',
                        background: 'white',
                        color: '#E20074',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        cursor: 'pointer'
                      }}
                    >
                      <Minus size={20} />
                    </button>
                    <div style={{ fontSize: '32px', fontWeight: '700', color: '#E20074', minWidth: '100px', textAlign: 'center' }}>
                      ${downPayments[index] || 0}
                    </div>
                    <button
                      onClick={() => handleDownPaymentChange(index, (downPayments[index] || 0) + 50)}
                      style={{
                        width: '40px',
                        height: '40px',
                        borderRadius: '50%',
                        border: '2px solid #E20074',
                        background: 'white',
                        color: '#E20074',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        cursor: 'pointer'
                      }}
                    >
                      <Plus size={20} />
                    </button>
                  </div>
                </div>
              </div>
            ))}
            
            <div style={{
              background: '#f8f9fa',
              padding: '20px',
              borderRadius: '8px',
              border: '1px solid #e0e0e0'
            }}>
              <h4 style={{ fontSize: '16px', fontWeight: '600', marginBottom: '10px', color: '#333' }}>
                Down Payment Information
              </h4>
              <ul style={{ fontSize: '14px', color: '#666', margin: 0, paddingLeft: '20px' }}>
                <li>Reduces monthly device payments per line</li>
                <li>Paid upfront at time of purchase</li>
                <li>Can be combined with trade-ins</li>
                <li>Minimum $50, maximum device cost per line</li>
              </ul>
            </div>
          </>
        )}
      </div>
    );
  };

  const renderTradeInsStep = () => {
    const voiceLines = voiceLinesData?.quantity || 0;
    
    return (
      <div style={{ padding: '20px' }}>
        <h3 style={{ fontSize: '20px', fontWeight: '600', marginBottom: '20px', color: '#333' }}>
          Trade-In Devices Per Line
        </h3>
        
        {voiceLines === 0 ? (
          <div style={{
            background: '#fff3cd',
            padding: '20px',
            borderRadius: '8px',
            border: '1px solid #ffc107',
            color: '#856404',
            textAlign: 'center'
          }}>
            No voice lines configured yet. Please configure voice lines first.
          </div>
        ) : (
          <>
            {Array.from({ length: voiceLines }, (_, index) => (
              <div key={index} style={{ marginBottom: '40px' }}>
                <h4 style={{ fontSize: '16px', fontWeight: '600', marginBottom: '15px', color: '#666' }}>
                  Line {index + 1} Trade-Ins
                </h4>
                
                {/* Add Trade-In Form */}
                <div style={{
                  background: '#f8f9fa',
                  padding: '20px',
                  borderRadius: '8px',
                  border: '1px solid #e0e0e0',
                  marginBottom: '20px'
                }}>
                  <h5 style={{ fontSize: '14px', fontWeight: '600', marginBottom: '15px', color: '#333' }}>
                    Add Trade-In Device
                  </h5>
                  <TradeInForm onAddTradeIn={(deviceId, condition, value) => handleAddTradeIn(index, deviceId, condition, value)} tradeInDevices={tradeInDevices} />
                </div>

                {/* Current Trade-Ins for this line */}
                <div>
                  <h5 style={{ fontSize: '14px', fontWeight: '600', marginBottom: '15px', color: '#333' }}>
                    Current Trade-Ins ({tradeIns[index]?.length || 0})
                  </h5>
                  {(!tradeIns[index] || tradeIns[index].length === 0) ? (
                    <div style={{
                      background: '#fff3cd',
                      padding: '15px',
                      borderRadius: '8px',
                      border: '1px solid #ffc107',
                      color: '#856404',
                      textAlign: 'center',
                      fontSize: '14px'
                    }}>
                      No trade-in devices added yet for this line
                    </div>
                  ) : (
                    <div style={{ display: 'grid', gap: '10px' }}>
                      {tradeIns[index].map(tradeIn => (
                        <div key={tradeIn.id} style={{
                          background: 'white',
                          padding: '15px',
                          borderRadius: '8px',
                          border: '1px solid #e0e0e0',
                          display: 'flex',
                          justifyContent: 'space-between',
                          alignItems: 'center'
                        }}>
                          <div>
                            <div style={{ fontSize: '14px', fontWeight: '600', color: '#333' }}>
                              {tradeIn.deviceName}
                            </div>
                            <div style={{ fontSize: '12px', color: '#666' }}>
                              Condition: {tradeIn.condition} • Value: ${tradeIn.value}
                            </div>
                          </div>
                          <button
                            onClick={() => handleRemoveTradeIn(index, tradeIn.id)}
                            style={{
                              padding: '8px',
                              border: '1px solid #dc3545',
                              borderRadius: '4px',
                              background: 'white',
                              color: '#dc3545',
                              cursor: 'pointer',
                              display: 'flex',
                              alignItems: 'center',
                              gap: '4px'
                            }}
                          >
                            <Trash2 size={14} />
                            Remove
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </>
        )}
      </div>
    );
  };

  const renderCurrentStep = () => {
    switch (currentStep) {
      case 0: return renderEquipmentCreditStep();
      case 1: return renderDownPaymentStep();
      case 2: return renderTradeInsStep();
      default: return renderEquipmentCreditStep();
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
          <CreditCard size={24} color="#E20074" />
          <h2 style={{ fontSize: '24px', fontWeight: '700', color: '#E20074', margin: 0 }}>
            Equipment Credit
          </h2>
        </div>
        <p style={{ color: '#666', fontSize: '14px', margin: 0, lineHeight: '1.4' }}>
          Apply equipment credits, down payments, and trade-in values to your quote.
        </p>
        
        {/* Progress */}
        <div style={{ marginTop: '15px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            {steps.map((step, index) => (
              <div key={step.id} style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
        <div style={{
                  width: '24px',
                  height: '24px',
                  borderRadius: '50%',
                  background: index <= currentStep ? '#E20074' : '#e0e0e0',
                  color: 'white',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '12px',
                  fontWeight: '600'
                }}>
                  {index < currentStep ? '✓' : index + 1}
                </div>
                <span style={{
                  fontSize: '12px',
                  color: index <= currentStep ? '#E20074' : '#666',
                  fontWeight: index === currentStep ? '600' : '400'
                }}>
                  {step.title}
                </span>
                {index < steps.length - 1 && (
                  <div style={{ width: '20px', height: '1px', background: '#e0e0e0', margin: '0 5px' }} />
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Content */}
      <div style={{ flex: 1, overflowY: 'auto' }}>
        {renderCurrentStep()}
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
          onClick={prevStep}
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
          {currentStep === 0 ? 'Back to Services' : 'Previous'}
        </button>
        
        <div style={{ fontSize: '14px', color: '#666', textAlign: 'center' }}>
          Step {currentStep + 1} of {steps.length}: {steps[currentStep].title}
        </div>
        
        <button
          onClick={nextStep}
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
          {currentStep === steps.length - 1 ? 'Complete' : 'Next'}
          <ArrowRight size={16} />
        </button>
      </div>
    </div>
  );
};

// Trade-In Form Component
const TradeInForm = ({ onAddTradeIn, tradeInDevices }) => {
  const [selectedDevice, setSelectedDevice] = useState('');
  const [condition, setCondition] = useState('Good');
  const [value, setValue] = useState(0);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (selectedDevice && value > 0) {
      onAddTradeIn(selectedDevice, condition, value);
      setSelectedDevice('');
      setCondition('Good');
      setValue(0);
    }
  };

  const selectedDeviceData = tradeInDevices.find(d => d.id === selectedDevice);

  return (
    <form onSubmit={handleSubmit} style={{ display: 'grid', gap: '15px' }}>
      <div>
        <label style={{ display: 'block', fontSize: '14px', fontWeight: '600', marginBottom: '5px', color: '#333' }}>
          Device
        </label>
        <select
          value={selectedDevice}
          onChange={(e) => {
            setSelectedDevice(e.target.value);
            const device = tradeInDevices.find(d => d.id === e.target.value);
            setValue(device ? device.maxValue : 0);
          }}
          style={{
            width: '100%',
            padding: '10px',
            border: '1px solid #e0e0e0',
            borderRadius: '4px',
            fontSize: '14px'
          }}
        >
          <option value="">Select a device</option>
          {tradeInDevices.map(device => (
            <option key={device.id} value={device.id}>
              {device.name} (Max: ${device.maxValue})
            </option>
          ))}
        </select>
      </div>

      <div>
        <label style={{ display: 'block', fontSize: '14px', fontWeight: '600', marginBottom: '5px', color: '#333' }}>
          Condition
        </label>
        <select
          value={condition}
          onChange={(e) => setCondition(e.target.value)}
          style={{
            width: '100%',
            padding: '10px',
            border: '1px solid #e0e0e0',
            borderRadius: '4px',
            fontSize: '14px'
          }}
        >
          <option value="Excellent">Excellent</option>
          <option value="Good">Good</option>
          <option value="Fair">Fair</option>
          <option value="Poor">Poor</option>
        </select>
      </div>

      <div>
        <label style={{ display: 'block', fontSize: '14px', fontWeight: '600', marginBottom: '5px', color: '#333' }}>
          Trade-In Value ($)
        </label>
        <input
          type="number"
          value={value}
          onChange={(e) => setValue(Math.min(parseInt(e.target.value) || 0, selectedDeviceData?.maxValue || 0))}
          min="0"
          max={selectedDeviceData?.maxValue || 0}
          style={{
            width: '100%',
            padding: '10px',
            border: '1px solid #e0e0e0',
            borderRadius: '4px',
            fontSize: '14px'
          }}
        />
        {selectedDeviceData && (
          <div style={{ fontSize: '12px', color: '#666', marginTop: '5px' }}>
            Max value: ${selectedDeviceData.maxValue}
          </div>
        )}
      </div>

      <button
        type="submit"
        disabled={!selectedDevice || value <= 0}
        style={{
          padding: '12px 20px',
          border: '2px solid #E20074',
          borderRadius: '8px',
          background: (!selectedDevice || value <= 0) ? '#f5f5f5' : '#E20074',
          color: (!selectedDevice || value <= 0) ? '#999' : 'white',
          fontSize: '14px',
          cursor: (!selectedDevice || value <= 0) ? 'not-allowed' : 'pointer',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '8px'
        }}
      >
        <Plus size={16} />
        Add Trade-In
      </button>
    </form>
  );
};

export default EquipmentCreditSelection;