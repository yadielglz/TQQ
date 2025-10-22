import React, { useState, useCallback } from 'react';
import { Phone, Tablet, Watch, Wifi, Home, ArrowLeft, ArrowRight, CheckCircle } from 'lucide-react';

const ServiceSelection = ({ 
  selectedServices, 
  onServicesChange, 
  onNext, 
  onPrev 
}) => {
  const [isLoading, setIsLoading] = useState(false);

  const services = [
    {
      id: 'voice',
      name: 'Voice Lines',
      description: 'Smartphone plans with unlimited talk, text, and data',
      icon: Phone,
      features: ['Unlimited talk & text', '5G data', 'Mobile hotspot', 'Streaming services'],
      required: true
    },
    {
      id: 'data',
      name: 'Data Lines',
      description: 'Tablets and wearables with data plans',
      icon: Tablet,
      features: ['Tablet data plans', 'Wearable connectivity', 'Shared data options', 'Family sharing'],
      required: false
    },
    {
      id: 'iot',
      name: 'IoT Lines',
      description: 'Internet of Things devices and connectivity',
      icon: Watch,
      features: ['SyncUP devices', 'IoT connectivity', 'Smart home integration', 'Device tracking'],
      required: false
    },
    {
      id: 'hsi',
      name: 'Home Internet',
      description: 'Home internet and fiber services',
      icon: Home,
      features: ['T-Mobile Home Internet', 'Fiber internet', 'WiFi 6E', 'Unlimited data'],
      required: false
    }
  ];

  const handleServiceToggle = useCallback((serviceId) => {
    const newServices = selectedServices.includes(serviceId)
      ? selectedServices.filter(id => id !== serviceId)
      : [...selectedServices, serviceId];
    
    onServicesChange(newServices);
  }, [selectedServices, onServicesChange]);

  const handleNext = useCallback(() => {
    if (selectedServices.length === 0) {
      alert('Please select at least one service to continue.');
      return;
    }
    
    setIsLoading(true);
    setTimeout(() => {
      onNext();
      setIsLoading(false);
    }, 300);
  }, [selectedServices, onNext]);

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
          <Phone size={24} color="#E20074" />
          <h2 style={{ fontSize: '24px', fontWeight: '700', color: '#E20074', margin: 0 }}>
            Select Services
          </h2>
        </div>
        <p style={{ color: '#666', fontSize: '14px', margin: 0, lineHeight: '1.4' }}>
          Choose which services you'd like to configure for your quote. You can select multiple services.
        </p>
      </div>

      {/* Content */}
      <div style={{ flex: 1, padding: '20px' }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: '20px',
          marginBottom: '30px'
        }}>
          {services.map(service => {
            const Icon = service.icon;
            const isSelected = selectedServices.includes(service.id);
            
            return (
              <div
                key={service.id}
                onClick={() => handleServiceToggle(service.id)}
                style={{
                  padding: '20px',
                  border: `2px solid ${isSelected ? '#E20074' : '#e0e0e0'}`,
                  borderRadius: '12px',
                  background: isSelected ? '#fdf2f8' : 'white',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  position: 'relative'
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

                {/* Service Icon */}
                <div style={{
                  background: isSelected ? '#E20074' : '#f8f9fa',
                  borderRadius: '50%',
                  width: '60px',
                  height: '60px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginBottom: '15px',
                  color: isSelected ? 'white' : '#E20074',
                  transition: 'all 0.3s ease'
                }}>
                  <Icon size={30} />
                </div>

                {/* Service Info */}
                <h3 style={{
                  fontSize: '20px',
                  fontWeight: '600',
                  color: '#333',
                  marginBottom: '8px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px'
                }}>
                  {service.name}
                  {service.required && <span style={{ color: '#ff6b6b', fontSize: '16px' }}>*</span>}
                </h3>
                
                <p style={{
                  fontSize: '14px',
                  color: '#666',
                  lineHeight: '1.5',
                  marginBottom: '15px'
                }}>
                  {service.description}
                </p>

                {/* Features */}
                <div>
                  <h4 style={{
                    fontSize: '12px',
                    fontWeight: '600',
                    color: '#666',
                    marginBottom: '8px',
                    textTransform: 'uppercase',
                    letterSpacing: '0.5px'
                  }}>
                    Features
                  </h4>
                  <ul style={{
                    fontSize: '12px',
                    color: '#666',
                    margin: 0,
                    paddingLeft: '15px',
                    lineHeight: '1.4'
                  }}>
                    {service.features.map(feature => (
                      <li key={feature}>{feature}</li>
                    ))}
                  </ul>
                </div>
              </div>
            );
          })}
        </div>

        {/* Selection Summary */}
        {selectedServices.length > 0 && (
          <div style={{
            background: '#e8f5e8',
            padding: '20px',
            borderRadius: '8px',
            border: '1px solid #4CAF50',
            marginBottom: '20px'
          }}>
            <h3 style={{
              fontSize: '16px',
              fontWeight: '600',
              marginBottom: '10px',
              color: '#2e7d32'
            }}>
              Selected Services ({selectedServices.length})
            </h3>
            <div style={{ fontSize: '14px', color: '#2e7d32', lineHeight: '1.5' }}>
              {selectedServices.map(serviceId => {
                const service = services.find(s => s.id === serviceId);
                return (
                  <div key={serviceId} style={{ marginBottom: '4px' }}>
                    • {service?.name}
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Help Text */}
        <div style={{
          background: '#f8f9fa',
          padding: '15px',
          borderRadius: '8px',
          border: '1px solid #e0e0e0'
        }}>
          <p style={{
            fontSize: '14px',
            color: '#666',
            margin: 0,
            lineHeight: '1.5'
          }}>
            <strong>Note:</strong> Voice Lines are required for all quotes. You can add additional services like tablets, 
            wearables, IoT devices, or home internet to create a comprehensive package.
          </p>
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
          Back to Welcome
        </button>
        
        <div style={{ fontSize: '14px', color: '#666', textAlign: 'center' }}>
          {selectedServices.length > 0 ? `${selectedServices.length} service${selectedServices.length > 1 ? 's' : ''} selected` : 'No services selected'}
        </div>
        
        <button
          onClick={handleNext}
          disabled={selectedServices.length === 0 || isLoading}
          style={{
            padding: '12px 24px',
            border: '2px solid #E20074',
            borderRadius: '8px',
            background: selectedServices.length === 0 || isLoading ? '#f5f5f5' : '#E20074',
            color: selectedServices.length === 0 || isLoading ? '#999' : 'white',
            fontSize: '16px',
            cursor: selectedServices.length === 0 || isLoading ? 'not-allowed' : 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            transition: 'all 0.3s ease',
            opacity: selectedServices.length === 0 || isLoading ? 0.5 : 1
          }}
        >
          {isLoading ? 'Loading...' : 'Continue'}
          <ArrowRight size={16} />
        </button>
      </div>
    </div>
  );
};

export default ServiceSelection;