import React, { useState, useCallback } from 'react';
import { Hash, Phone, CheckCircle, AlertCircle, ArrowLeft, ArrowRight } from 'lucide-react';

const PortInSelection = ({ 
  lines, 
  portInData, 
  onPortInDataChange, 
  onNext, 
  onPrev 
}) => {
  const [isLoading, setIsLoading] = useState(false);

  const handlePortInChange = useCallback((lineIndex, field, value) => {
    const newPortInData = { ...portInData };
    if (!newPortInData[lineIndex]) {
      newPortInData[lineIndex] = {};
    }
    newPortInData[lineIndex][field] = value;
    onPortInDataChange(newPortInData);
  }, [portInData, onPortInDataChange]);

  const validatePhoneNumber = useCallback((phoneNumber) => {
    // Remove all non-digit characters
    const cleaned = phoneNumber.replace(/\D/g, '');
    
    // Check if it's a valid US phone number (10 digits)
    if (cleaned.length === 10) {
      return {
        isValid: true,
        formatted: `(${cleaned.slice(0, 3)}) ${cleaned.slice(3, 6)}-${cleaned.slice(6)}`
      };
    }
    
    return {
      isValid: false,
      formatted: phoneNumber
    };
  }, []);

  const validateAccountNumber = useCallback((accountNumber) => {
    // Basic validation - account numbers are typically 9-15 digits
    const cleaned = accountNumber.replace(/\D/g, '');
    return {
      isValid: cleaned.length >= 9 && cleaned.length <= 15,
      formatted: cleaned
    };
  }, []);

  const getCarrierInfo = useCallback((phoneNumber) => {
    // This would typically call a carrier lookup API
    // For demo purposes, we'll simulate some common carriers
    const areaCode = phoneNumber.replace(/\D/g, '').slice(0, 3);
    
    const carrierMap = {
      '212': 'Verizon',
      '646': 'Verizon', 
      '917': 'Verizon',
      '718': 'Verizon',
      '347': 'Verizon',
      '929': 'Verizon',
      '516': 'Verizon',
      '631': 'Verizon',
      '914': 'Verizon',
      '845': 'Verizon',
      '315': 'Verizon',
      '607': 'Verizon',
      '585': 'Verizon',
      '716': 'Verizon',
      '518': 'Verizon'
    };
    
    return carrierMap[areaCode] || 'Unknown Carrier';
  }, []);

  const isLineConfigured = useCallback((lineIndex) => {
    const lineData = portInData[lineIndex];
    return lineData && lineData.phoneNumber && lineData.accountNumber && lineData.pin;
  }, [portInData]);

  const getConfiguredLinesCount = useCallback(() => {
    return Object.keys(portInData).filter(lineIndex => isLineConfigured(parseInt(lineIndex))).length;
  }, [portInData, isLineConfigured]);

  const handleNext = useCallback(() => {
    setIsLoading(true);
    setTimeout(() => {
      onNext();
      setIsLoading(false);
    }, 300);
  }, [onNext]);

  const handlePrev = useCallback(() => {
    setIsLoading(true);
    setTimeout(() => {
      onPrev();
      setIsLoading(false);
    }, 300);
  }, [onPrev]);

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
          <Hash size={24} color="#E20074" />
          <h2 style={{ fontSize: '24px', fontWeight: '700', color: '#E20074', margin: 0 }}>
            Port-In Information
          </h2>
        </div>
        <p style={{ color: '#666', fontSize: '14px', margin: 0, lineHeight: '1.4' }}>
          Port your existing phone numbers to T-Mobile. This information affects available promotions.
        </p>
      </div>

      {/* Content */}
      <div style={{ flex: 1, padding: '20px' }}>
        {/* Port-In Benefits */}
        <div style={{
          background: '#e8f5e8',
          padding: '20px',
          borderRadius: '8px',
          border: '1px solid #4CAF50',
          marginBottom: '30px'
        }}>
          <h3 style={{ fontSize: '16px', fontWeight: '600', marginBottom: '10px', color: '#2e7d32' }}>
            Benefits of Porting Your Number
          </h3>
          <ul style={{ fontSize: '14px', color: '#2e7d32', margin: 0, paddingLeft: '20px', lineHeight: '1.5' }}>
            <li>Keep your existing phone number</li>
            <li>Access to port-in specific promotions</li>
            <li>Eligible for Keep & Switch program</li>
            <li>Seamless transition to T-Mobile</li>
          </ul>
        </div>

        {/* Line-by-line port-in configuration */}
        {Array.from({ length: lines }, (_, lineIndex) => {
          const lineData = portInData[lineIndex] || {};
          const phoneValidation = lineData.phoneNumber ? validatePhoneNumber(lineData.phoneNumber) : null;
          const accountValidation = lineData.accountNumber ? validateAccountNumber(lineData.accountNumber) : null;
          const carrier = phoneValidation?.isValid ? getCarrierInfo(lineData.phoneNumber) : null;
          
          return (
            <div key={lineIndex} style={{ marginBottom: '30px' }}>
              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginBottom: '15px',
                padding: '15px',
                background: '#f8f9fa',
                borderRadius: '8px',
                border: '1px solid #e0e0e0'
              }}>
                <h3 style={{ fontSize: '16px', fontWeight: '600', color: '#333', margin: 0 }}>
                  Line {lineIndex + 1} Port-In
                </h3>
                {isLineConfigured(lineIndex) && (
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    color: '#4CAF50',
                    fontSize: '14px',
                    fontWeight: '600'
                  }}>
                    <CheckCircle size={16} />
                    Configured
                  </div>
                )}
              </div>

              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
                gap: '20px'
              }}>
                {/* Phone Number */}
                <div>
                  <label style={{
                    display: 'block',
                    fontSize: '14px',
                    fontWeight: '600',
                    color: '#333',
                    marginBottom: '8px'
                  }}>
                    <Phone size={16} style={{ marginRight: '8px', verticalAlign: 'middle' }} />
                    Phone Number to Port
                  </label>
                  <input
                    type="tel"
                    placeholder="(555) 123-4567"
                    value={lineData.phoneNumber || ''}
                    onChange={(e) => handlePortInChange(lineIndex, 'phoneNumber', e.target.value)}
                    style={{
                      width: '100%',
                      padding: '12px 16px',
                      border: `2px solid ${phoneValidation?.isValid ? '#4CAF50' : phoneValidation?.isValid === false ? '#ff6b6b' : '#e0e0e0'}`,
                      borderRadius: '8px',
                      fontSize: '16px',
                      transition: 'border-color 0.3s ease',
                      outline: 'none'
                    }}
                    onFocus={(e) => e.target.style.borderColor = '#E20074'}
                    onBlur={(e) => e.target.style.borderColor = phoneValidation?.isValid ? '#4CAF50' : phoneValidation?.isValid === false ? '#ff6b6b' : '#e0e0e0'}
                  />
                  {phoneValidation && (
                    <div style={{
                      fontSize: '12px',
                      color: phoneValidation.isValid ? '#4CAF50' : '#ff6b6b',
                      marginTop: '4px',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '4px'
                    }}>
                      {phoneValidation.isValid ? <CheckCircle size={12} /> : <AlertCircle size={12} />}
                      {phoneValidation.isValid ? 'Valid phone number' : 'Invalid phone number format'}
                    </div>
                  )}
                  {carrier && (
                    <div style={{
                      fontSize: '12px',
                      color: '#666',
                      marginTop: '4px'
                    }}>
                      Current carrier: {carrier}
                    </div>
                  )}
                </div>

                {/* Account Number */}
                <div>
                  <label style={{
                    display: 'block',
                    fontSize: '14px',
                    fontWeight: '600',
                    color: '#333',
                    marginBottom: '8px'
                  }}>
                    Account Number
                  </label>
                  <input
                    type="text"
                    placeholder="Account number from current carrier"
                    value={lineData.accountNumber || ''}
                    onChange={(e) => handlePortInChange(lineIndex, 'accountNumber', e.target.value)}
                    style={{
                      width: '100%',
                      padding: '12px 16px',
                      border: `2px solid ${accountValidation?.isValid ? '#4CAF50' : accountValidation?.isValid === false ? '#ff6b6b' : '#e0e0e0'}`,
                      borderRadius: '8px',
                      fontSize: '16px',
                      transition: 'border-color 0.3s ease',
                      outline: 'none'
                    }}
                    onFocus={(e) => e.target.style.borderColor = '#E20074'}
                    onBlur={(e) => e.target.style.borderColor = accountValidation?.isValid ? '#4CAF50' : accountValidation?.isValid === false ? '#ff6b6b' : '#e0e0e0'}
                  />
                  {accountValidation && (
                    <div style={{
                      fontSize: '12px',
                      color: accountValidation.isValid ? '#4CAF50' : '#ff6b6b',
                      marginTop: '4px',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '4px'
                    }}>
                      {accountValidation.isValid ? <CheckCircle size={12} /> : <AlertCircle size={12} />}
                      {accountValidation.isValid ? 'Valid account number' : 'Invalid account number format'}
                    </div>
                  )}
                </div>

                {/* PIN/Password */}
                <div>
                  <label style={{
                    display: 'block',
                    fontSize: '14px',
                    fontWeight: '600',
                    color: '#333',
                    marginBottom: '8px'
                  }}>
                    Account PIN/Password
                  </label>
                  <input
                    type="password"
                    placeholder="Account PIN or password"
                    value={lineData.pin || ''}
                    onChange={(e) => handlePortInChange(lineIndex, 'pin', e.target.value)}
                    style={{
                      width: '100%',
                      padding: '12px 16px',
                      border: '2px solid #e0e0e0',
                      borderRadius: '8px',
                      fontSize: '16px',
                      transition: 'border-color 0.3s ease',
                      outline: 'none'
                    }}
                    onFocus={(e) => e.target.style.borderColor = '#E20074'}
                    onBlur={(e) => e.target.style.borderColor = '#e0e0e0'}
                  />
                  <div style={{
                    fontSize: '12px',
                    color: '#666',
                    marginTop: '4px'
                  }}>
                    Usually 4-6 digits or account password
                  </div>
                </div>

                {/* Account Holder Name */}
                <div>
                  <label style={{
                    display: 'block',
                    fontSize: '14px',
                    fontWeight: '600',
                    color: '#333',
                    marginBottom: '8px'
                  }}>
                    Account Holder Name
                  </label>
                  <input
                    type="text"
                    placeholder="Name on the account"
                    value={lineData.accountHolderName || ''}
                    onChange={(e) => handlePortInChange(lineIndex, 'accountHolderName', e.target.value)}
                    style={{
                      width: '100%',
                      padding: '12px 16px',
                      border: '2px solid #e0e0e0',
                      borderRadius: '8px',
                      fontSize: '16px',
                      transition: 'border-color 0.3s ease',
                      outline: 'none'
                    }}
                    onFocus={(e) => e.target.style.borderColor = '#E20074'}
                    onBlur={(e) => e.target.style.borderColor = '#e0e0e0'}
                  />
                </div>
              </div>

              {/* Port-In Status */}
              {isLineConfigured(lineIndex) && (
                <div style={{
                  marginTop: '15px',
                  padding: '15px',
                  background: '#e8f5e8',
                  borderRadius: '8px',
                  border: '1px solid #4CAF50'
                }}>
                  <div style={{ fontSize: '14px', color: '#2e7d32', fontWeight: '600', marginBottom: '5px' }}>
                    ✓ Port-in configured for Line {lineIndex + 1}
                  </div>
                  <div style={{ fontSize: '12px', color: '#2e7d32' }}>
                    Number: {phoneValidation?.formatted} • Carrier: {carrier}
                  </div>
                </div>
              )}
            </div>
          );
        })}

        {/* Port-In Summary */}
        {getConfiguredLinesCount() > 0 && (
          <div style={{
            background: '#f8f9fa',
            padding: '20px',
            borderRadius: '8px',
            border: '1px solid #e0e0e0',
            marginTop: '20px'
          }}>
            <h3 style={{ fontSize: '16px', fontWeight: '600', marginBottom: '10px', color: '#333' }}>
              Port-In Summary
            </h3>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '10px' }}>
              <div>
                <div style={{ fontSize: '12px', color: '#666' }}>Lines Configured for Port-In</div>
                <div style={{ fontSize: '18px', fontWeight: '700', color: '#E20074' }}>
                  {getConfiguredLinesCount()} of {lines}
                </div>
              </div>
              <div>
                <div style={{ fontSize: '12px', color: '#666' }}>Estimated Port Time</div>
                <div style={{ fontSize: '16px', fontWeight: '600', color: '#333' }}>
                  2-24 hours
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Important Notes */}
        <div style={{
          background: '#fff3cd',
          padding: '20px',
          borderRadius: '8px',
          border: '1px solid #ffc107',
          marginTop: '20px'
        }}>
          <h3 style={{ fontSize: '16px', fontWeight: '600', marginBottom: '10px', color: '#856404' }}>
            Important Port-In Information
          </h3>
          <ul style={{ fontSize: '14px', color: '#856404', margin: 0, paddingLeft: '20px', lineHeight: '1.5' }}>
            <li>Do not cancel your current service until the port is complete</li>
            <li>Keep your current device active during the port process</li>
            <li>Port-in information must be accurate to avoid delays</li>
            <li>Some carriers may require additional verification</li>
            <li>Port-in promotions require successful number transfer</li>
          </ul>
        </div>
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
          onClick={handlePrev}
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
          Back to Devices
        </button>
        
        <div style={{ fontSize: '14px', color: '#666', textAlign: 'center' }}>
          {getConfiguredLinesCount()} of {lines} lines configured for port-in
        </div>
        
        <button
          onClick={handleNext}
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
          Continue to Promotions
          <ArrowRight size={16} />
        </button>
      </div>
    </div>
  );
};

export default PortInSelection;