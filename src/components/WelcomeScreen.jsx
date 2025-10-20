import React, { useState } from 'react';
import { User, ArrowRight, SkipForward } from 'lucide-react';

const WelcomeScreen = ({ onNext, onSkip }) => {
  const [customerData, setCustomerData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    pin: '',
    phone: '',
    last4SSN: '',
    expectedEC: ''
  });

  const [errors, setErrors] = useState({});

  const validateField = (name, value) => {
    switch (name) {
      case 'firstName':
      case 'lastName':
        return value.trim().length >= 2 ? '' : 'Must be at least 2 characters';
      case 'email':
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value) ? '' : 'Please enter a valid email';
      case 'pin':
        return /^\d{6}$/.test(value) ? '' : 'PIN must be exactly 6 digits';
      case 'phone':
        return /^\(\d{3}\) \d{3}-\d{4}$/.test(value) ? '' : 'Please enter a valid phone number';
      case 'last4SSN':
        return /^\d{4}$/.test(value) ? '' : 'Last 4 SSN must be exactly 4 digits';
      case 'expectedEC':
        return value.trim() !== '' ? '' : 'Expected EC is required';
      default:
        return '';
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCustomerData(prev => ({ ...prev, [name]: value }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handlePhoneChange = (e) => {
    let value = e.target.value.replace(/\D/g, '');
    if (value.length >= 6) {
      value = `(${value.slice(0, 3)}) ${value.slice(3, 6)}-${value.slice(6, 10)}`;
    } else if (value.length >= 3) {
      value = `(${value.slice(0, 3)}) ${value.slice(3)}`;
    }
    setCustomerData(prev => ({ ...prev, phone: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Validate all fields
    const newErrors = {};
    Object.keys(customerData).forEach(key => {
      const error = validateField(key, customerData[key]);
      if (error) newErrors[key] = error;
    });

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    // If validation passes, proceed with customer data
    onNext(customerData);
  };

  const handleSkip = () => {
    onSkip();
  };

  return (
    <div style={{
      maxWidth: '600px',
      margin: '0 auto',
      padding: '40px 20px',
      background: 'white',
      borderRadius: '16px',
      boxShadow: '0 8px 32px rgba(0,0,0,0.1)'
    }}>
      {/* Header */}
      <div style={{
        textAlign: 'center',
        marginBottom: '40px'
      }}>
        <div style={{
          background: '#E20074',
          borderRadius: '50%',
          width: '80px',
          height: '80px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          margin: '0 auto 20px',
          color: 'white'
        }}>
          <User size={40} />
        </div>
        <h1 style={{
          fontSize: '32px',
          fontWeight: '700',
          color: '#E20074',
          marginBottom: '10px'
        }}>
          Welcome to T-Mobile Quick Quote
        </h1>
        <p style={{
          fontSize: '18px',
          color: '#666',
          lineHeight: '1.5'
        }}>
          Get an instant quote for your T-Mobile service. You can provide your information now or skip to get started quickly.
        </p>
      </div>

      {/* Customer Info Form */}
      <form onSubmit={handleSubmit}>
        <div style={{
          background: '#f8f9fa',
          padding: '30px',
          borderRadius: '12px',
          marginBottom: '30px',
          border: '1px solid #e0e0e0'
        }}>
          <h2 style={{
            fontSize: '20px',
            fontWeight: '600',
            color: '#333',
            marginBottom: '20px',
            textAlign: 'center'
          }}>
            Customer Information (Optional)
          </h2>
          
          <div style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: '20px',
            marginBottom: '20px'
          }}>
            <div>
              <label style={{
                display: 'block',
                fontSize: '14px',
                fontWeight: '500',
                color: '#333',
                marginBottom: '8px'
              }}>
                First Name *
              </label>
              <input
                type="text"
                name="firstName"
                value={customerData.firstName}
                onChange={handleInputChange}
                style={{
                  width: '100%',
                  padding: '12px',
                  border: `2px solid ${errors.firstName ? '#dc3545' : '#e0e0e0'}`,
                  borderRadius: '8px',
                  fontSize: '16px',
                  transition: 'border-color 0.3s ease'
                }}
                placeholder="Enter first name"
              />
              {errors.firstName && (
                <div style={{ color: '#dc3545', fontSize: '12px', marginTop: '4px' }}>
                  {errors.firstName}
                </div>
              )}
            </div>

            <div>
              <label style={{
                display: 'block',
                fontSize: '14px',
                fontWeight: '500',
                color: '#333',
                marginBottom: '8px'
              }}>
                Last Name *
              </label>
              <input
                type="text"
                name="lastName"
                value={customerData.lastName}
                onChange={handleInputChange}
                style={{
                  width: '100%',
                  padding: '12px',
                  border: `2px solid ${errors.lastName ? '#dc3545' : '#e0e0e0'}`,
                  borderRadius: '8px',
                  fontSize: '16px',
                  transition: 'border-color 0.3s ease'
                }}
                placeholder="Enter last name"
              />
              {errors.lastName && (
                <div style={{ color: '#dc3545', fontSize: '12px', marginTop: '4px' }}>
                  {errors.lastName}
                </div>
              )}
            </div>
          </div>

          <div style={{ marginBottom: '20px' }}>
            <label style={{
              display: 'block',
              fontSize: '14px',
              fontWeight: '500',
              color: '#333',
              marginBottom: '8px'
            }}>
              Email Address *
            </label>
            <input
              type="email"
              name="email"
              value={customerData.email}
              onChange={handleInputChange}
              style={{
                width: '100%',
                padding: '12px',
                border: `2px solid ${errors.email ? '#dc3545' : '#e0e0e0'}`,
                borderRadius: '8px',
                fontSize: '16px',
                transition: 'border-color 0.3s ease'
              }}
              placeholder="Enter email address"
            />
            {errors.email && (
              <div style={{ color: '#dc3545', fontSize: '12px', marginTop: '4px' }}>
                {errors.email}
              </div>
            )}
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: '20px',
            marginBottom: '20px'
          }}>
            <div>
              <label style={{
                display: 'block',
                fontSize: '14px',
                fontWeight: '500',
                color: '#333',
                marginBottom: '8px'
              }}>
                6-Digit PIN *
              </label>
              <input
                type="text"
                name="pin"
                value={customerData.pin}
                onChange={handleInputChange}
                maxLength="6"
                style={{
                  width: '100%',
                  padding: '12px',
                  border: `2px solid ${errors.pin ? '#dc3545' : '#e0e0e0'}`,
                  borderRadius: '8px',
                  fontSize: '16px',
                  transition: 'border-color 0.3s ease'
                }}
                placeholder="123456"
              />
              {errors.pin && (
                <div style={{ color: '#dc3545', fontSize: '12px', marginTop: '4px' }}>
                  {errors.pin}
                </div>
              )}
            </div>

            <div>
              <label style={{
                display: 'block',
                fontSize: '14px',
                fontWeight: '500',
                color: '#333',
                marginBottom: '8px'
              }}>
                Phone Number *
              </label>
              <input
                type="tel"
                name="phone"
                value={customerData.phone}
                onChange={handlePhoneChange}
                style={{
                  width: '100%',
                  padding: '12px',
                  border: `2px solid ${errors.phone ? '#dc3545' : '#e0e0e0'}`,
                  borderRadius: '8px',
                  fontSize: '16px',
                  transition: 'border-color 0.3s ease'
                }}
                placeholder="(555) 123-4567"
              />
              {errors.phone && (
                <div style={{ color: '#dc3545', fontSize: '12px', marginTop: '4px' }}>
                  {errors.phone}
                </div>
              )}
            </div>
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: '20px',
            marginBottom: '20px'
          }}>
            <div>
              <label style={{
                display: 'block',
                fontSize: '14px',
                fontWeight: '500',
                color: '#333',
                marginBottom: '8px'
              }}>
                Last 4 SSN *
              </label>
              <input
                type="text"
                name="last4SSN"
                value={customerData.last4SSN}
                onChange={handleInputChange}
                maxLength="4"
                style={{
                  width: '100%',
                  padding: '12px',
                  border: `2px solid ${errors.last4SSN ? '#dc3545' : '#e0e0e0'}`,
                  borderRadius: '8px',
                  fontSize: '16px',
                  transition: 'border-color 0.3s ease'
                }}
                placeholder="1234"
              />
              {errors.last4SSN && (
                <div style={{ color: '#dc3545', fontSize: '12px', marginTop: '4px' }}>
                  {errors.last4SSN}
                </div>
              )}
            </div>

            <div>
              <label style={{
                display: 'block',
                fontSize: '14px',
                fontWeight: '500',
                color: '#333',
                marginBottom: '8px'
              }}>
                Expected EC *
              </label>
              <input
                type="text"
                name="expectedEC"
                value={customerData.expectedEC}
                onChange={handleInputChange}
                style={{
                  width: '100%',
                  padding: '12px',
                  border: `2px solid ${errors.expectedEC ? '#dc3545' : '#e0e0e0'}`,
                  borderRadius: '8px',
                  fontSize: '16px',
                  transition: 'border-color 0.3s ease'
                }}
                placeholder="Enter expected EC"
              />
              {errors.expectedEC && (
                <div style={{ color: '#dc3545', fontSize: '12px', marginTop: '4px' }}>
                  {errors.expectedEC}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div style={{
          display: 'flex',
          gap: '15px',
          justifyContent: 'center'
        }}>
          <button
            type="button"
            onClick={handleSkip}
            style={{
              background: '#6c757d',
              color: 'white',
              border: 'none',
              padding: '15px 30px',
              borderRadius: '8px',
              fontSize: '16px',
              fontWeight: '600',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              transition: 'background-color 0.3s ease'
            }}
            onMouseOver={(e) => e.target.style.background = '#5a6268'}
            onMouseOut={(e) => e.target.style.background = '#6c757d'}
          >
            <SkipForward size={20} />
            Skip for Now
          </button>

          <button
            type="submit"
            style={{
              background: '#E20074',
              color: 'white',
              border: 'none',
              padding: '15px 30px',
              borderRadius: '8px',
              fontSize: '16px',
              fontWeight: '600',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              transition: 'background-color 0.3s ease'
            }}
            onMouseOver={(e) => e.target.style.background = '#C1005F'}
            onMouseOut={(e) => e.target.style.background = '#E20074'}
          >
            Continue with Info
            <ArrowRight size={20} />
          </button>
        </div>
      </form>

      {/* Skip Notice */}
      <div style={{
        textAlign: 'center',
        marginTop: '20px',
        padding: '15px',
        background: '#e3f2fd',
        borderRadius: '8px',
        border: '1px solid #bbdefb'
      }}>
        <p style={{
          fontSize: '14px',
          color: '#1976d2',
          margin: '0'
        }}>
          💡 <strong>Tip:</strong> You can always add customer information later in the quote process
        </p>
      </div>
    </div>
  );
};

export default WelcomeScreen;
