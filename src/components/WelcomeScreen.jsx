import React, { useState, useCallback } from 'react';
import { Phone, ArrowRight, User, Mail, MapPin, Calendar } from 'lucide-react';

const WelcomeScreen = ({ onNext, onSkip }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [customerData, setCustomerData] = useState({
    name: '',
    email: '',
    phone: '',
    location: '',
    preferredContact: 'email'
  });

  const handleInputChange = useCallback((field, value) => {
      setCustomerData(prev => ({
        ...prev,
      [field]: value
    }));
  }, []);

  const handleNext = useCallback(() => {
    setIsLoading(true);
    setTimeout(() => {
    onNext(customerData);
      setIsLoading(false);
    }, 300);
  }, [customerData, onNext]);

  const handleSkip = useCallback(() => {
    setIsLoading(true);
    setTimeout(() => {
    onSkip();
      setIsLoading(false);
    }, 300);
  }, [onSkip]);

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
        padding: '40px 20px',
        textAlign: 'center',
        background: 'linear-gradient(135deg, #E20074 0%, #1E88E5 100%)',
        color: 'white',
        borderRadius: '12px 12px 0 0'
      }}>
        <div style={{
          background: 'rgba(255,255,255,0.2)',
          borderRadius: '50%',
          width: '80px',
          height: '80px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          margin: '0 auto 20px',
          backdropFilter: 'blur(10px)'
        }}>
          <Phone size={40} />
        </div>
        <h1 style={{
          fontSize: '32px',
          fontWeight: '700',
          marginBottom: '12px',
          margin: 0
        }}>
          Welcome to T-Mobile Quote
        </h1>
        <p style={{
          fontSize: '16px',
          opacity: 0.9,
          margin: 0,
          lineHeight: '1.5'
        }}>
          Let's create a personalized quote for your wireless needs
        </p>
      </div>

      {/* Content */}
      <div style={{ flex: 1, padding: '40px 20px' }}>
        <div style={{
          maxWidth: '600px',
          margin: '0 auto'
        }}>
          <h2 style={{
            fontSize: '24px',
            fontWeight: '600',
            color: '#333',
            marginBottom: '20px',
            textAlign: 'center'
          }}>
            Tell us about yourself
          </h2>
          
          <p style={{
            fontSize: '14px',
            color: '#666',
            textAlign: 'center',
            marginBottom: '30px',
            lineHeight: '1.5'
          }}>
            This information helps us provide you with the most accurate pricing and personalized recommendations.
          </p>

          {/* Form Fields */}
          <div style={{
            display: 'grid',
            gap: '20px',
            marginBottom: '30px'
          }}>
            {/* Name */}
            <div>
              <label style={{
                display: 'block',
                fontSize: '14px',
                fontWeight: '600',
                color: '#333',
                marginBottom: '8px'
              }}>
                <User size={16} style={{ marginRight: '8px', verticalAlign: 'middle' }} />
                Full Name
              </label>
              <input
                type="text"
                value={customerData.name}
                onChange={(e) => handleInputChange('name', e.target.value)}
                placeholder="Enter your full name"
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

            {/* Email */}
            <div>
              <label style={{
                display: 'block',
                fontSize: '14px',
                fontWeight: '600',
                color: '#333',
                marginBottom: '8px'
              }}>
                <Mail size={16} style={{ marginRight: '8px', verticalAlign: 'middle' }} />
                Email Address
              </label>
              <input
                type="email"
                value={customerData.email}
                onChange={(e) => handleInputChange('email', e.target.value)}
                placeholder="Enter your email address"
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

            {/* Phone */}
            <div>
              <label style={{
                display: 'block',
                fontSize: '14px',
                fontWeight: '600',
                color: '#333',
                marginBottom: '8px'
              }}>
                <Phone size={16} style={{ marginRight: '8px', verticalAlign: 'middle' }} />
                Phone Number
              </label>
              <input
                type="tel"
                value={customerData.phone}
                onChange={(e) => handleInputChange('phone', e.target.value)}
                placeholder="Enter your phone number"
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

            {/* Location */}
            <div>
              <label style={{
                display: 'block',
                fontSize: '14px',
                fontWeight: '600',
                color: '#333',
                marginBottom: '8px'
              }}>
                <MapPin size={16} style={{ marginRight: '8px', verticalAlign: 'middle' }} />
                Location (City, State)
              </label>
              <input
                type="text"
                value={customerData.location}
                onChange={(e) => handleInputChange('location', e.target.value)}
                placeholder="Enter your city and state"
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

          {/* Benefits */}
          <div style={{
            background: '#f8f9fa',
            padding: '20px',
            borderRadius: '8px',
            border: '1px solid #e0e0e0',
            marginBottom: '30px'
          }}>
            <h3 style={{
              fontSize: '16px',
              fontWeight: '600',
                color: '#333',
              marginBottom: '12px'
            }}>
              Why provide this information?
            </h3>
            <ul style={{
                  fontSize: '14px',
              color: '#666',
              margin: 0,
              paddingLeft: '20px',
              lineHeight: '1.5'
            }}>
              <li>Get location-specific pricing and promotions</li>
              <li>Receive personalized plan recommendations</li>
              <li>Access to exclusive offers and discounts</li>
              <li>Faster quote processing and follow-up</li>
            </ul>
          </div>
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
            onClick={handleSkip}
            style={{
              padding: '12px 24px',
            border: '2px solid #6c757d',
            borderRadius: '8px',
            background: 'white',
            color: '#6c757d',
            fontSize: '16px',
              cursor: 'pointer',
            transition: 'all 0.3s ease'
            }}
          >
          Skip for now
          </button>
        
        <div style={{ fontSize: '14px', color: '#666', textAlign: 'center' }}>
          Optional - You can skip this step
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
          {isLoading ? 'Loading...' : 'Continue'}
            <ArrowRight size={16} />
          </button>
      </div>
    </div>
  );
};

export default WelcomeScreen;