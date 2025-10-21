import React, { useState } from 'react';
import { Phone, Tablet, Watch, Home, CheckCircle, ArrowRight } from 'lucide-react';
import { AnimatedButton, FadeIn } from './Animations';

const ServiceSelection = ({ selectedServices, onServicesChange, onNext, onPrev }) => {
  const [localSelectedServices, setLocalSelectedServices] = useState(selectedServices);

  const serviceOptions = [
    {
      id: 'voice',
      name: 'Voice Lines',
      description: 'Smartphone plans with unlimited talk, text, and data',
      icon: Phone,
      color: '#E20074'
    },
    {
      id: 'data',
      name: 'Data Lines',
      description: 'Tablets and wearables with data plans',
      icon: Tablet,
      color: '#1E88E5'
    },
    {
      id: 'iot',
      name: 'IoT Lines',
      description: 'SyncUp devices for tracking and connectivity',
      icon: Watch,
      color: '#4CAF50'
    },
    {
      id: 'hsi',
      name: 'Home Internet',
      description: 'High-speed internet for your home',
      icon: Home,
      color: '#FF9800'
    }
  ];

  const handleServiceToggle = (serviceId) => {
    const newSelection = localSelectedServices.includes(serviceId)
      ? localSelectedServices.filter(id => id !== serviceId)
      : [...localSelectedServices, serviceId];
    
    setLocalSelectedServices(newSelection);
  };

  const handleContinue = () => {
    onServicesChange(localSelectedServices);
    onNext();
  };

  const canProceed = () => {
    return localSelectedServices.length > 0;
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
        <h2 style={{
          fontSize: '24px',
          fontWeight: '700',
          color: '#E20074',
          marginBottom: '8px'
        }}>
          Select Services
        </h2>
        <p style={{ 
          color: '#666', 
          fontSize: '14px',
          margin: 0,
          lineHeight: '1.4'
        }}>
          Choose which services you'd like to add to your quote. You can select multiple services.
        </p>
      </div>

      {/* Service Options */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
        gap: '15px',
        marginBottom: '20px'
      }}>
        {serviceOptions.map((service, index) => {
          const Icon = service.icon;
          const isSelected = localSelectedServices.includes(service.id);
          
          return (
            <FadeIn key={service.id} delay={index * 0.1}>
              <div
                onClick={() => handleServiceToggle(service.id)}
                style={{
                  cursor: 'pointer',
                  border: `2px solid ${isSelected ? '#E20074' : '#e0e0e0'}`,
                  borderRadius: '8px',
                  padding: '15px',
                  background: isSelected ? 'rgba(226, 0, 116, 0.05)' : 'white',
                  transition: 'all 0.2s ease',
                  boxShadow: isSelected ? '0 4px 12px rgba(226, 0, 116, 0.2)' : '0 2px 4px rgba(0,0,0,0.1)'
                }}
              >
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  marginBottom: '10px'
                }}>
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '10px'
                  }}>
                    <div style={{
                      background: '#E20074',
                      color: 'white',
                      borderRadius: '6px',
                      padding: '6px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center'
                    }}>
                      <Icon size={16} />
                    </div>
                    <div>
                      <h3 style={{ 
                        margin: 0,
                        fontSize: '16px',
                        fontWeight: '600',
                        color: '#333'
                      }}>
                        {service.name}
                      </h3>
                    </div>
                  </div>
                  {isSelected && (
                    <CheckCircle size={18} color="#E20074" />
                  )}
                </div>
                
                <p style={{ 
                  margin: 0,
                  fontSize: '13px',
                  color: '#666',
                  lineHeight: '1.4'
                }}>
                  {service.description}
                </p>
              </div>
            </FadeIn>
          );
        })}
      </div>

      {/* Selected Services Summary */}
      {localSelectedServices.length > 0 && (
        <div style={{
          background: '#f8f9fa',
          border: '1px solid #e0e0e0',
          borderRadius: '6px',
          padding: '15px',
          marginBottom: '20px'
        }}>
          <h3 style={{ fontSize: '14px', fontWeight: '600', marginBottom: '10px' }}>
            Selected Services ({localSelectedServices.length})
          </h3>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
            {localSelectedServices.map(serviceId => {
              const service = serviceOptions.find(s => s.id === serviceId);
              return (
                <div key={serviceId} style={{
                  background: '#E20074',
                  color: 'white',
                  padding: '4px 10px',
                  borderRadius: '16px',
                  fontSize: '11px',
                  fontWeight: '500',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '4px'
                }}>
                  <service.icon size={12} />
                  {service.name}
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Instructions */}
      <div style={{
        background: '#e8f5e8',
        border: '1px solid #4CAF50',
        borderRadius: '6px',
        padding: '12px',
        marginBottom: '20px'
      }}>
        <div style={{ fontSize: '12px', color: '#2E7D32' }}>
          <strong>Next Steps:</strong> After selecting your services, you'll configure each one individually. 
          You can add more services later or skip to equipment credit when you're done.
        </div>
      </div>

      {/* Navigation */}
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
          Back
        </button>
        <button
          onClick={handleContinue}
          disabled={!canProceed()}
          style={{
            flex: 2,
            padding: '12px 20px',
            background: canProceed() ? '#E20074' : '#ccc',
            color: 'white',
            border: 'none',
            borderRadius: '6px',
            fontSize: '14px',
            fontWeight: '600',
            cursor: canProceed() ? 'pointer' : 'not-allowed',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '6px',
            transition: 'background-color 0.3s ease'
          }}
          onMouseOver={(e) => {
            if (canProceed()) e.target.style.background = '#C1005F';
          }}
          onMouseOut={(e) => {
            if (canProceed()) e.target.style.background = '#E20074';
          }}
        >
          Continue with Selected Services
          <ArrowRight size={14} />
        </button>
      </div>
    </div>
  );
};

export default ServiceSelection;
