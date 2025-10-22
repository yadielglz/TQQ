import React, { useState, useCallback, useMemo } from 'react';
import { Shield, CheckCircle, AlertCircle, ArrowLeft, ArrowRight, Info } from 'lucide-react';
import { devices } from '../data/devices';

const ProtectionSelection = ({ 
  lines, 
  devices: selectedDevices, 
  protection: selectedProtection, 
  onProtectionChange, 
  onNext, 
  onPrev 
}) => {
  const [isLoading, setIsLoading] = useState(false);

  const protectionPlans = [
    {
      id: 'p360-tier1',
      name: 'Protection360 Basic',
      price: 7,
      description: 'Basic device protection with limited coverage',
      features: [
        'Device replacement',
        'Basic technical support',
        'Limited coverage'
      ],
      compatibleDevices: ['all'],
      maxDeviceValue: 500
    },
    {
      id: 'p360-tier2',
      name: 'Protection360 Standard',
      price: 9,
      description: 'Standard device protection with comprehensive coverage',
      features: [
        'Device replacement',
        'Technical support',
        'Screen repair',
        'Battery replacement'
      ],
      compatibleDevices: ['all'],
      maxDeviceValue: 800
    },
    {
      id: 'p360-tier3',
      name: 'Protection360 Premium',
      price: 13,
      description: 'Premium device protection with full coverage',
      features: [
        'Device replacement',
        'Priority technical support',
        'Screen repair',
        'Battery replacement',
        'Water damage coverage',
        'Theft protection'
      ],
      compatibleDevices: ['all'],
      maxDeviceValue: 1200
    },
    {
      id: 'p360-tier4',
      name: 'Protection360 Elite',
      price: 16,
      description: 'Elite device protection for premium devices',
      features: [
        'Device replacement',
        '24/7 priority support',
        'Screen repair',
        'Battery replacement',
        'Water damage coverage',
        'Theft protection',
        'Express replacement'
      ],
      compatibleDevices: ['premium'],
      maxDeviceValue: 1500
    },
    {
      id: 'p360-tier5',
      name: 'Protection360 Ultimate',
      price: 18,
      description: 'Ultimate device protection for flagship devices',
      features: [
        'Device replacement',
        '24/7 concierge support',
        'Screen repair',
        'Battery replacement',
        'Water damage coverage',
        'Theft protection',
        'Express replacement',
        'Accidental damage coverage'
      ],
      compatibleDevices: ['flagship'],
      maxDeviceValue: 2000
    },
    {
      id: 'p360-tier6',
      name: 'Protection360 Pro',
      price: 25,
      description: 'Professional device protection for business devices',
      features: [
        'Device replacement',
        '24/7 business support',
        'Screen repair',
        'Battery replacement',
        'Water damage coverage',
        'Theft protection',
        'Express replacement',
        'Accidental damage coverage',
        'Business continuity support'
      ],
      compatibleDevices: ['business'],
      maxDeviceValue: 2500
    }
  ];

  const getDeviceTier = useCallback((deviceId) => {
    const device = devices[deviceId];
    if (!device) return 'basic';
    
    if (device.price >= 1000) return 'flagship';
    if (device.price >= 800) return 'premium';
    if (device.price >= 500) return 'standard';
    return 'basic';
  }, []);

  const getCompatibleProtectionPlans = useCallback((deviceId) => {
    const deviceTier = getDeviceTier(deviceId);
    
    return protectionPlans.filter(plan => {
      if (plan.compatibleDevices.includes('all')) return true;
      if (plan.compatibleDevices.includes(deviceTier)) return true;
      return false;
    });
  }, [getDeviceTier]);

  const handleProtectionChange = useCallback((lineIndex, protectionId) => {
    const newProtection = { ...selectedProtection };
    newProtection[lineIndex] = protectionId;
    onProtectionChange(newProtection);
  }, [selectedProtection, onProtectionChange]);

  const getTotalProtectionCost = useCallback(() => {
    return Object.values(selectedProtection).reduce((total, protectionId) => {
      const plan = protectionPlans.find(p => p.id === protectionId);
      return total + (plan ? plan.price : 0);
    }, 0);
  }, [selectedProtection]);

  const isLineConfigured = useCallback((lineIndex) => {
    return selectedProtection[lineIndex] !== undefined;
  }, [selectedProtection]);

  const getConfiguredLinesCount = useCallback(() => {
    return Object.keys(selectedProtection).length;
  }, [selectedProtection]);

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

  const renderProtectionCard = (plan, lineIndex) => {
    const isSelected = selectedProtection[lineIndex] === plan.id;
    const deviceId = selectedDevices[lineIndex];
    const device = devices[deviceId];
    const deviceTier = getDeviceTier(deviceId);
    const isCompatible = plan.compatibleDevices.includes('all') || plan.compatibleDevices.includes(deviceTier);
    
    return (
      <div
        key={plan.id}
        onClick={() => isCompatible && handleProtectionChange(lineIndex, plan.id)}
        style={{
          padding: '20px',
          border: `2px solid ${isSelected ? '#E20074' : isCompatible ? '#e0e0e0' : '#ff6b6b'}`,
          borderRadius: '12px',
          background: isSelected ? '#fdf2f8' : isCompatible ? 'white' : '#fff5f5',
          cursor: isCompatible ? 'pointer' : 'not-allowed',
          transition: 'all 0.3s ease',
          position: 'relative',
          opacity: isCompatible ? 1 : 0.6
        }}
      >
        {/* Selection Indicator */}
        {isSelected && (
          <div style={{
            position: 'absolute',
            top: '15px',
            right: '15px',
            background: '#E20074',
            borderRadius: '50%',
            width: '24px',
            height: '24px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'white'
          }}>
            <CheckCircle size={16} />
          </div>
        )}

        {/* Plan Info */}
        <div style={{ marginBottom: '15px' }}>
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'flex-start',
            marginBottom: '8px'
          }}>
            <h3 style={{
              fontSize: '16px',
              fontWeight: '600',
              color: '#333',
              margin: 0,
              flex: 1
            }}>
              {plan.name}
            </h3>
            <div style={{
              fontSize: '18px',
              fontWeight: '700',
              color: '#E20074'
            }}>
              ${plan.price}/mo
            </div>
          </div>
          
          <p style={{
            fontSize: '12px',
            color: '#666',
            marginBottom: '8px',
            lineHeight: '1.4'
          }}>
            {plan.description}
          </p>
          
          <div style={{
            fontSize: '12px',
            color: '#666',
            marginBottom: '8px'
          }}>
            Max device value: ${plan.maxDeviceValue}
          </div>
        </div>

        {/* Features */}
        <div style={{
          fontSize: '12px',
          color: '#666',
          marginBottom: '10px'
        }}>
          <div style={{ marginBottom: '4px', fontWeight: '600' }}>
            Coverage includes:
          </div>
          <ul style={{ margin: 0, paddingLeft: '15px', lineHeight: '1.4' }}>
            {plan.features.map(feature => (
              <li key={feature}>{feature}</li>
            ))}
          </ul>
        </div>

        {/* Compatibility Status */}
        {!isCompatible && (
          <div style={{
            padding: '8px',
            background: '#ff6b6b',
            borderRadius: '6px',
            color: 'white',
            fontSize: '12px',
            display: 'flex',
            alignItems: 'center',
            gap: '4px'
          }}>
            <AlertCircle size={12} />
            Not compatible with {device?.name || 'selected device'}
          </div>
        )}
      </div>
    );
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
          <Shield size={24} color="#E20074" />
          <h2 style={{ fontSize: '24px', fontWeight: '700', color: '#E20074', margin: 0 }}>
            Device Protection
          </h2>
        </div>
        <p style={{ color: '#666', fontSize: '14px', margin: 0, lineHeight: '1.4' }}>
          Protect your devices with comprehensive coverage plans. Choose the protection level that fits your needs.
        </p>
      </div>
      
      {/* Content */}
      <div style={{ flex: 1, padding: '20px' }}>
        {/* Protection Benefits */}
        <div style={{
          background: '#e8f5e8',
          padding: '20px',
          borderRadius: '8px',
          border: '1px solid #4CAF50',
          marginBottom: '30px'
        }}>
          <h3 style={{ fontSize: '16px', fontWeight: '600', marginBottom: '10px', color: '#2e7d32' }}>
            Why Choose Device Protection?
          </h3>
          <ul style={{ fontSize: '14px', color: '#2e7d32', margin: 0, paddingLeft: '20px', lineHeight: '1.5' }}>
            <li>Protect your investment in expensive devices</li>
            <li>Fast replacement and repair services</li>
            <li>Coverage for accidental damage and theft</li>
            <li>Technical support and troubleshooting</li>
            <li>Peace of mind for your mobile lifestyle</li>
          </ul>
        </div>

        {/* Line-by-line protection selection */}
      {Array.from({ length: lines }, (_, lineIndex) => {
          const deviceId = selectedDevices[lineIndex];
          const device = devices[deviceId];
          const compatiblePlans = getCompatibleProtectionPlans(deviceId);
        
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
                  Line {lineIndex + 1} Protection
                </h3>
                <div style={{ fontSize: '14px', color: '#666' }}>
                  {device ? device.name : 'No device selected'}
            </div>
              </div>

              {device ? (
                <div style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
                  gap: '15px'
                }}>
                  {compatiblePlans.map(plan => renderProtectionCard(plan, lineIndex))}
                </div>
              ) : (
                <div style={{
                  padding: '20px',
                  background: '#f8f9fa',
                  borderRadius: '8px',
                  border: '1px solid #e0e0e0',
                  textAlign: 'center'
                }}>
                  <Info size={32} color="#666" style={{ marginBottom: '10px' }} />
                  <p style={{ fontSize: '14px', color: '#666', margin: 0 }}>
                    Please select a device for this line to view protection options.
                  </p>
                </div>
              )}

              {/* Line Summary */}
              {isLineConfigured(lineIndex) && (
                <div style={{
                  marginTop: '15px',
                  padding: '15px',
                  background: '#e8f5e8',
                  borderRadius: '8px',
                  border: '1px solid #4CAF50'
                }}>
                  <div style={{ fontSize: '14px', color: '#2e7d32', fontWeight: '600', marginBottom: '5px' }}>
                    ✓ Protection selected for Line {lineIndex + 1}
                  </div>
                  <div style={{ fontSize: '12px', color: '#2e7d32' }}>
                    {protectionPlans.find(p => p.id === selectedProtection[lineIndex])?.name} - ${protectionPlans.find(p => p.id === selectedProtection[lineIndex])?.price}/mo
                  </div>
                </div>
              )}
            </div>
          );
        })}

        {/* Total Protection Summary */}
        {getConfiguredLinesCount() > 0 && (
          <div style={{
            background: '#f8f9fa',
            padding: '20px',
            borderRadius: '8px',
            border: '1px solid #e0e0e0',
            marginTop: '20px'
          }}>
            <h3 style={{ fontSize: '16px', fontWeight: '600', marginBottom: '10px', color: '#333' }}>
              Protection Summary
            </h3>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '10px' }}>
              <div>
                <div style={{ fontSize: '12px', color: '#666' }}>Total Monthly Protection Cost</div>
                <div style={{ fontSize: '18px', fontWeight: '700', color: '#E20074' }}>
                  ${getTotalProtectionCost()}/mo
                </div>
              </div>
              <div>
                <div style={{ fontSize: '12px', color: '#666' }}>Lines with Protection</div>
                <div style={{ fontSize: '16px', fontWeight: '600', color: '#333' }}>
                  {getConfiguredLinesCount()} of {lines}
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
            Important Protection Information
          </h3>
          <ul style={{ fontSize: '14px', color: '#856404', margin: 0, paddingLeft: '20px', lineHeight: '1.5' }}>
            <li>Protection plans can be added or removed at any time</li>
            <li>Coverage begins immediately after enrollment</li>
            <li>Claims can be filed through the T-Mobile app or website</li>
            <li>Replacement devices are typically shipped within 24-48 hours</li>
            <li>Some plans may have deductibles for certain types of damage</li>
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
          Back to Promotions
        </button>
        
        <div style={{ fontSize: '14px', color: '#666', textAlign: 'center' }}>
          {getConfiguredLinesCount()} of {lines} lines with protection
        </div>
        
        <button
          onClick={handleNext}
          disabled={isLoading}
          style={{
            padding: '12px 24px',
            border: '2px solid #E20074',
            borderRadius: '8px',
            background: isLoading ? '#f5f5f5' : '#E20074',
            color: isLoading ? '#999' : 'white',
            fontSize: '16px',
            cursor: isLoading ? 'not-allowed' : 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            transition: 'all 0.3s ease',
            opacity: isLoading ? 0.5 : 1
          }}
        >
          {isLoading ? 'Loading...' : 'Continue to Review'}
          <ArrowRight size={16} />
        </button>
      </div>
    </div>
  );
};

export default ProtectionSelection;