import React, { useState } from 'react';
import { User, Mail, Phone, Lock, CreditCard, ArrowRight } from 'lucide-react';

const CustomerIntake = ({ onNext }) => {
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
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (field, value) => {
    setCustomerData(prev => ({ ...prev, [field]: value }));
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!customerData.firstName.trim()) {
      newErrors.firstName = 'First name is required';
    }

    if (!customerData.lastName.trim()) {
      newErrors.lastName = 'Last name is required';
    }

    if (!customerData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(customerData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    if (!customerData.pin.trim()) {
      newErrors.pin = '6-digit PIN is required';
    } else if (!/^\d{6}$/.test(customerData.pin)) {
      newErrors.pin = 'PIN must be exactly 6 digits';
    }

    if (!customerData.phone.trim()) {
      newErrors.phone = 'Phone number is required';
    } else if (!/^[\d\s\-\(\)\+]{10,}$/.test(customerData.phone.replace(/\D/g, ''))) {
      newErrors.phone = 'Please enter a valid phone number';
    }

    if (!customerData.last4SSN.trim()) {
      newErrors.last4SSN = 'Last 4 SSN digits are required';
    } else if (!/^\d{4}$/.test(customerData.last4SSN)) {
      newErrors.last4SSN = 'Must be exactly 4 digits';
    }

    if (!customerData.expectedEC.trim()) {
      newErrors.expectedEC = 'Expected EC is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    try {
      // Google Sheets integration disabled
      console.log('✅ Customer data collected:', customerData);
      
      // Pass customer data to next step
      onNext(customerData);
    } catch (error) {
      console.error('Error in customer intake:', error);
      setErrors({ submit: 'Failed to process customer information. Please try again.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  const formatPhoneNumber = (value) => {
    const phoneNumber = value.replace(/\D/g, '');
    if (phoneNumber.length <= 3) return phoneNumber;
    if (phoneNumber.length <= 6) return `(${phoneNumber.slice(0, 3)}) ${phoneNumber.slice(3)}`;
    return `(${phoneNumber.slice(0, 3)}) ${phoneNumber.slice(3, 6)}-${phoneNumber.slice(6, 10)}`;
  };

  return (
    <div className="form-section">
      <div style={{ textAlign: 'center', marginBottom: '30px' }}>
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
        <h2 style={{ fontSize: '28px', fontWeight: '700', color: '#333', marginBottom: '10px' }}>
          Customer Information
        </h2>
        <p style={{ color: '#666', fontSize: '16px' }}>
          Please provide your contact information to get started with your T-Mobile quote
        </p>
      </div>

      <form onSubmit={handleSubmit}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '20px', marginBottom: '30px' }}>
          {/* First Name */}
          <div>
            <label style={{ display: 'block', fontWeight: '600', color: '#333', marginBottom: '8px' }}>
              <User size={16} style={{ marginRight: '8px', verticalAlign: 'middle' }} />
              First Name *
            </label>
            <input
              type="text"
              value={customerData.firstName}
              onChange={(e) => handleInputChange('firstName', e.target.value)}
              placeholder="Enter your first name"
              style={{
                width: '100%',
                padding: '12px 16px',
                border: `2px solid ${errors.firstName ? '#e74c3c' : '#e0e0e0'}`,
                borderRadius: '8px',
                fontSize: '16px',
                transition: 'border-color 0.3s ease'
              }}
            />
            {errors.firstName && (
              <div style={{ color: '#e74c3c', fontSize: '14px', marginTop: '5px' }}>
                {errors.firstName}
              </div>
            )}
          </div>

          {/* Last Name */}
          <div>
            <label style={{ display: 'block', fontWeight: '600', color: '#333', marginBottom: '8px' }}>
              <User size={16} style={{ marginRight: '8px', verticalAlign: 'middle' }} />
              Last Name *
            </label>
            <input
              type="text"
              value={customerData.lastName}
              onChange={(e) => handleInputChange('lastName', e.target.value)}
              placeholder="Enter your last name"
              style={{
                width: '100%',
                padding: '12px 16px',
                border: `2px solid ${errors.lastName ? '#e74c3c' : '#e0e0e0'}`,
                borderRadius: '8px',
                fontSize: '16px',
                transition: 'border-color 0.3s ease'
              }}
            />
            {errors.lastName && (
              <div style={{ color: '#e74c3c', fontSize: '14px', marginTop: '5px' }}>
                {errors.lastName}
              </div>
            )}
          </div>

          {/* Email */}
          <div>
            <label style={{ display: 'block', fontWeight: '600', color: '#333', marginBottom: '8px' }}>
              <Mail size={16} style={{ marginRight: '8px', verticalAlign: 'middle' }} />
              Email Address *
            </label>
            <input
              type="email"
              value={customerData.email}
              onChange={(e) => handleInputChange('email', e.target.value)}
              placeholder="Enter your email address"
              style={{
                width: '100%',
                padding: '12px 16px',
                border: `2px solid ${errors.email ? '#e74c3c' : '#e0e0e0'}`,
                borderRadius: '8px',
                fontSize: '16px',
                transition: 'border-color 0.3s ease'
              }}
            />
            {errors.email && (
              <div style={{ color: '#e74c3c', fontSize: '14px', marginTop: '5px' }}>
                {errors.email}
              </div>
            )}
          </div>

          {/* Phone Number */}
          <div>
            <label style={{ display: 'block', fontWeight: '600', color: '#333', marginBottom: '8px' }}>
              <Phone size={16} style={{ marginRight: '8px', verticalAlign: 'middle' }} />
              Phone Number *
            </label>
            <input
              type="tel"
              value={customerData.phone}
              onChange={(e) => handleInputChange('phone', formatPhoneNumber(e.target.value))}
              placeholder="(555) 123-4567"
              style={{
                width: '100%',
                padding: '12px 16px',
                border: `2px solid ${errors.phone ? '#e74c3c' : '#e0e0e0'}`,
                borderRadius: '8px',
                fontSize: '16px',
                transition: 'border-color 0.3s ease'
              }}
            />
            {errors.phone && (
              <div style={{ color: '#e74c3c', fontSize: '14px', marginTop: '5px' }}>
                {errors.phone}
              </div>
            )}
          </div>

          {/* 6-Digit PIN */}
          <div>
            <label style={{ display: 'block', fontWeight: '600', color: '#333', marginBottom: '8px' }}>
              <Lock size={16} style={{ marginRight: '8px', verticalAlign: 'middle' }} />
              6-Digit PIN *
            </label>
            <input
              type="password"
              value={customerData.pin}
              onChange={(e) => handleInputChange('pin', e.target.value.replace(/\D/g, '').slice(0, 6))}
              placeholder="123456"
              maxLength="6"
              style={{
                width: '100%',
                padding: '12px 16px',
                border: `2px solid ${errors.pin ? '#e74c3c' : '#e0e0e0'}`,
                borderRadius: '8px',
                fontSize: '16px',
                transition: 'border-color 0.3s ease',
                letterSpacing: '2px'
              }}
            />
            {errors.pin && (
              <div style={{ color: '#e74c3c', fontSize: '14px', marginTop: '5px' }}>
                {errors.pin}
              </div>
            )}
          </div>

          {/* Last 4 SSN */}
          <div>
            <label style={{ display: 'block', fontWeight: '600', color: '#333', marginBottom: '8px' }}>
              <CreditCard size={16} style={{ marginRight: '8px', verticalAlign: 'middle' }} />
              Last 4 SSN Digits *
            </label>
            <input
              type="password"
              value={customerData.last4SSN}
              onChange={(e) => handleInputChange('last4SSN', e.target.value.replace(/\D/g, '').slice(0, 4))}
              placeholder="1234"
              maxLength="4"
              style={{
                width: '100%',
                padding: '12px 16px',
                border: `2px solid ${errors.last4SSN ? '#e74c3c' : '#e0e0e0'}`,
                borderRadius: '8px',
                fontSize: '16px',
                transition: 'border-color 0.3s ease',
                letterSpacing: '2px'
              }}
            />
            {errors.last4SSN && (
              <div style={{ color: '#e74c3c', fontSize: '14px', marginTop: '5px' }}>
                {errors.last4SSN}
              </div>
            )}
          </div>

          {/* Expected EC */}
          <div>
            <label style={{ display: 'block', fontWeight: '600', color: '#333', marginBottom: '8px' }}>
              <User size={16} style={{ marginRight: '8px', verticalAlign: 'middle' }} />
              Expected EC *
            </label>
            <input
              type="text"
              value={customerData.expectedEC}
              onChange={(e) => handleInputChange('expectedEC', e.target.value)}
              placeholder="Enter expected EC"
              style={{
                width: '100%',
                padding: '12px 16px',
                border: `2px solid ${errors.expectedEC ? '#e74c3c' : '#e0e0e0'}`,
                borderRadius: '8px',
                fontSize: '16px',
                transition: 'border-color 0.3s ease'
              }}
            />
            {errors.expectedEC && (
              <div style={{ color: '#e74c3c', fontSize: '14px', marginTop: '5px' }}>
                {errors.expectedEC}
              </div>
            )}
          </div>
        </div>

        {/* Security Notice */}
        <div style={{
          background: '#f8f9fa',
          border: '1px solid #e0e0e0',
          borderRadius: '8px',
          padding: '15px',
          marginBottom: '30px'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
            <Lock size={16} style={{ color: '#e20074', marginRight: '8px' }} />
            <strong style={{ color: '#333' }}>Security Notice</strong>
          </div>
          <p style={{ color: '#666', fontSize: '14px', margin: 0 }}>
            Your information is secure and will only be used to generate your personalized T-Mobile quote. 
            We do not store sensitive information and follow industry-standard security practices.
          </p>
        </div>

        {/* Submit Error */}
        {errors.submit && (
          <div style={{
            background: '#f8f9fa',
            border: '1px solid #e74c3c',
            borderRadius: '8px',
            padding: '15px',
            marginBottom: '20px',
            color: '#e74c3c'
          }}>
            {errors.submit}
          </div>
        )}

        {/* Submit Button */}
        <button
          type="submit"
          disabled={isSubmitting}
          style={{
            width: '100%',
            background: isSubmitting ? '#ccc' : '#E20074',
            color: 'white',
            border: 'none',
            padding: '16px 24px',
            borderRadius: '8px',
            fontSize: '18px',
            fontWeight: '600',
            cursor: isSubmitting ? 'not-allowed' : 'pointer',
            transition: 'all 0.3s ease',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '10px'
          }}
        >
          {isSubmitting ? (
            <>
              <div style={{
                width: '20px',
                height: '20px',
                border: '2px solid white',
                borderTop: '2px solid transparent',
                borderRadius: '50%',
                animation: 'spin 1s linear infinite'
              }} />
              Saving Information...
            </>
          ) : (
            <>
              Continue to Quote
              <ArrowRight size={20} />
            </>
          )}
        </button>
      </form>
    </div>
  );
};

export default CustomerIntake;
