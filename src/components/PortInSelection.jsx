import React, { useState, useEffect } from 'react';
import { Phone, ArrowRight, ArrowLeft } from 'lucide-react';

const PortInSelection = ({ 
  lines, 
  portInData, 
  onPortInDataChange, 
  onNext, 
  onPrev 
}) => {
  const [localPortInData, setLocalPortInData] = useState(portInData || {});

  // Initialize data for all lines when component mounts or lines change
  useEffect(() => {
    const newData = { ...localPortInData };
    let hasChanges = false;
    
    for (let i = 0; i < lines; i++) {
      if (!newData[i]) {
        newData[i] = { type: 'new', mdn: 'Auto', carrier: '', accountNumber: '', ntp: '' };
        hasChanges = true;
      }
    }
    
    if (hasChanges) {
      setLocalPortInData(newData);
      onPortInDataChange(newData);
    }
  }, [lines, localPortInData, onPortInDataChange]);

  const handlePortInChange = (lineIndex, field, value) => {
    const newData = { ...localPortInData };
    if (!newData[lineIndex]) {
      newData[lineIndex] = { type: 'new', mdn: 'Auto', carrier: '', accountNumber: '', ntp: '' };
    }
    newData[lineIndex][field] = value;
    
    // If changing to new number, reset port-in fields
    if (field === 'type' && value === 'new') {
      newData[lineIndex].mdn = 'Auto';
      newData[lineIndex].carrier = '';
      newData[lineIndex].accountNumber = '';
      newData[lineIndex].ntp = '';
    }
    
    setLocalPortInData(newData);
    onPortInDataChange(newData);
  };

  const canProceed = () => {
    // Check if we have data for all lines
    for (let i = 0; i < lines; i++) {
      const lineData = localPortInData[i];
      
      // If no data for this line, it's not ready
      if (!lineData || !lineData.type) {
        return false;
      }
      
      // If it's a new number, it's automatically valid
      if (lineData.type === 'new') {
        continue; // Skip validation for new numbers
      }
      
      // If it's a port-in, check all required fields
      if (lineData.type === 'port-in') {
        if (!lineData.mdn || lineData.mdn.trim() === '' ||
            !lineData.carrier || lineData.carrier.trim() === '' ||
            !lineData.accountNumber || lineData.accountNumber.trim() === '' ||
            !lineData.ntp || lineData.ntp.trim() === '') {
          return false;
        }
      }
    }
    
    return true;
  };

  const carriers = [
    'AT&T',
    'Verizon',
    'Sprint',
    'US Cellular',
    'Cricket',
    'Metro by T-Mobile',
    'Boost Mobile',
    'Ting',
    'Google Fi',
    'Other'
  ];

  return (
    <div className="form-section">
      <div className="section-title">
        <Phone size={24} />
        Choose Your Number
      </div>
      
      {/* Navigation Buttons */}
      <div className="button-group">
        <button 
          className="button secondary" 
          onClick={onPrev}
          style={{ display: 'flex', alignItems: 'center', gap: '8px' }}
        >
          <ArrowLeft size={20} />
          Back to Equipment Credit
        </button>
        <button 
          className="button primary" 
          onClick={onNext}
          disabled={!canProceed()}
          style={{ 
            display: 'flex', 
            alignItems: 'center', 
            gap: '8px',
            opacity: canProceed() ? 1 : 0.6,
            cursor: canProceed() ? 'pointer' : 'not-allowed'
          }}
        >
          Continue to Summary
          <ArrowRight size={20} />
        </button>
      </div>
      <p className="section-description">
        Choose whether each line will get a new number or port-in an existing number.
      </p>

      {Array.from({ length: lines }, (_, i) => {
        const lineData = localPortInData[i] || { type: 'new', mdn: 'Auto', carrier: '', accountNumber: '', ntp: '' };
        
        return (
          <div key={i} style={{
            background: 'white',
            border: '2px solid #e0e0e0',
            borderRadius: '12px',
            padding: '20px',
            marginBottom: '20px'
          }}>
            <div style={{
              fontSize: '18px',
              fontWeight: '600',
              color: '#E20074',
              marginBottom: '15px'
            }}>
              Line {i + 1}
            </div>

            {/* Port-In Type Selection */}
            <div style={{ marginBottom: '20px' }}>
              <label style={{ display: 'block', marginBottom: '10px', fontWeight: '600' }}>
                Number Type
              </label>
              <div style={{ display: 'flex', gap: '15px' }}>
                <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}>
                  <input
                    type="radio"
                    name={`portType-${i}`}
                    value="new"
                    checked={lineData.type === 'new'}
                    onChange={(e) => handlePortInChange(i, 'type', e.target.value)}
                    style={{ accentColor: '#E20074' }}
                  />
                  <span>New Number</span>
                </label>
                <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}>
                  <input
                    type="radio"
                    name={`portType-${i}`}
                    value="port-in"
                    checked={lineData.type === 'port-in'}
                    onChange={(e) => handlePortInChange(i, 'type', e.target.value)}
                    style={{ accentColor: '#E20074' }}
                  />
                  <span>Port-In Number</span>
                </label>
              </div>
            </div>

            {/* New Number - Auto MDN */}
            {lineData.type === 'new' && (
              <div style={{
                background: '#f8f9fa',
                padding: '15px',
                borderRadius: '8px',
                border: '1px solid #e0e0e0'
              }}>
                <div style={{ fontWeight: '600', color: '#4CAF50', marginBottom: '5px' }}>
                  ✓ New Number Assignment
                </div>
                <div style={{ color: '#666', fontSize: '14px' }}>
                  MDN will be automatically assigned by T-Mobile
                </div>
              </div>
            )}

            {/* Port-In Details */}
            {lineData.type === 'port-in' && (
              <div style={{ display: 'grid', gap: '15px' }}>
                <div>
                  <label style={{ display: 'block', marginBottom: '5px', fontWeight: '600' }}>
                    Mobile Device Number (MDN) *
                  </label>
                  <input
                    type="tel"
                    placeholder="(555) 123-4567"
                    value={lineData.mdn || ''}
                    onChange={(e) => handlePortInChange(i, 'mdn', e.target.value)}
                    style={{
                      width: '100%',
                      padding: '12px',
                      border: '2px solid #e0e0e0',
                      borderRadius: '8px',
                      fontSize: '16px'
                    }}
                  />
                </div>

                <div>
                  <label style={{ display: 'block', marginBottom: '5px', fontWeight: '600' }}>
                    Current Carrier *
                  </label>
                  <select
                    value={lineData.carrier || ''}
                    onChange={(e) => handlePortInChange(i, 'carrier', e.target.value)}
                    style={{
                      width: '100%',
                      padding: '12px',
                      border: '2px solid #e0e0e0',
                      borderRadius: '8px',
                      fontSize: '16px',
                      background: 'white'
                    }}
                  >
                    <option value="">Select Carrier</option>
                    {carriers.map(carrier => (
                      <option key={carrier} value={carrier}>{carrier}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label style={{ display: 'block', marginBottom: '5px', fontWeight: '600' }}>
                    Account Number *
                  </label>
                  <input
                    type="text"
                    placeholder="Enter account number"
                    value={lineData.accountNumber || ''}
                    onChange={(e) => handlePortInChange(i, 'accountNumber', e.target.value)}
                    style={{
                      width: '100%',
                      padding: '12px',
                      border: '2px solid #e0e0e0',
                      borderRadius: '8px',
                      fontSize: '16px'
                    }}
                  />
                </div>

                <div>
                  <label style={{ display: 'block', marginBottom: '5px', fontWeight: '600' }}>
                    Number Transfer PIN (NTP) *
                  </label>
                  <input
                    type="text"
                    placeholder="Enter NTP"
                    value={lineData.ntp || ''}
                    onChange={(e) => handlePortInChange(i, 'ntp', e.target.value)}
                    style={{
                      width: '100%',
                      padding: '12px',
                      border: '2px solid #e0e0e0',
                      borderRadius: '8px',
                      fontSize: '16px'
                    }}
                  />
                  <div style={{ fontSize: '12px', color: '#666', marginTop: '5px' }}>
                    Contact your current carrier to obtain your NTP
                  </div>
                </div>
              </div>
            )}
          </div>
        );
      })}

      {/* Debug Information - Remove this in production */}
      {false && process.env.NODE_ENV === 'development' && (
        <div style={{
          background: '#f8f9fa',
          border: '1px solid #e0e0e0',
          borderRadius: '8px',
          padding: '15px',
          marginBottom: '20px',
          fontSize: '12px'
        }}>
          <div style={{ fontWeight: '600', marginBottom: '5px' }}>Debug Info:</div>
          <div>Lines: {lines}</div>
          <div>Can Proceed: {canProceed() ? 'Yes' : 'No'}</div>
          <div style={{ marginTop: '10px' }}>
            <strong>Line Details:</strong>
            {Array.from({ length: lines }, (_, i) => {
              const lineData = localPortInData[i];
              return (
                <div key={i} style={{ marginLeft: '10px', marginTop: '5px' }}>
                  Line {i + 1}: {lineData?.type || 'No type'} 
                  {lineData?.type === 'new' ? ' (Valid)' : 
                   lineData?.type === 'port-in' ? 
                     (lineData.mdn && lineData.carrier && lineData.accountNumber && lineData.ntp ? ' (Valid)' : ' (Invalid - Missing fields)') :
                   ' (Invalid - No type)'}
                </div>
              );
            })}
          </div>
          <div style={{ marginTop: '10px' }}>
            <strong>Raw Data:</strong>
            <pre style={{ fontSize: '10px', marginTop: '5px' }}>
              {JSON.stringify(localPortInData, null, 2)}
            </pre>
          </div>
        </div>
      )}
    </div>
  );
};

export default PortInSelection;
