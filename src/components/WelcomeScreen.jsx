import React, { useState, useEffect } from 'react';
import { User, ArrowRight, SkipForward, Search, CheckCircle, AlertCircle, Loader, Shield, CreditCard, Phone, Mail, Calendar, MapPin, Star, History, RefreshCw } from 'lucide-react';

const WelcomeScreen = ({ onNext, onSkip }) => {
  const [customerData, setCustomerData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    pin: '',
    phone: '',
    last4SSN: '',
    expectedEC: '',
    accountNumber: '',
    billingZip: ''
  });

  const [errors, setErrors] = useState({});
  const [isLookingUp, setIsLookingUp] = useState(false);
  const [lookupMethod, setLookupMethod] = useState('phone'); // 'phone', 'account', 'email'
  const [accountFound, setAccountFound] = useState(null);
  const [lookupError, setLookupError] = useState('');
  const [customerHistory, setCustomerHistory] = useState(null);
  const [showAccountDetails, setShowAccountDetails] = useState(false);

  // Mock customer database for demonstration
  const mockCustomers = [
    {
      id: 'CUST001',
      firstName: 'John',
      lastName: 'Doe',
      email: 'john.doe@email.com',
      phone: '(555) 123-4567',
      pin: '123456',
      last4SSN: '1234',
      accountNumber: 'ACC123456789',
      billingZip: '12345',
      accountStatus: 'active',
      creditClass: 'A',
      expectedEC: '$500',
      accountAge: '2 years',
      currentPlan: 'Experience More',
      currentLines: 3,
      paymentHistory: 'excellent',
      lastPayment: '2024-01-15',
      accountBalance: '$0.00',
      upgradeEligibility: true,
      promotions: ['Auto Pay', 'Senior 55+'],
      notes: 'Preferred customer, always pays on time'
    },
    {
      id: 'CUST002',
      firstName: 'Jane',
      lastName: 'Smith',
      email: 'jane.smith@email.com',
      phone: '(555) 987-6543',
      pin: '654321',
      last4SSN: '5678',
      accountNumber: 'ACC987654321',
      billingZip: '54321',
      accountStatus: 'active',
      creditClass: 'B',
      expectedEC: '$300',
      accountAge: '6 months',
      currentPlan: 'Experience Essentials',
      currentLines: 1,
      paymentHistory: 'good',
      lastPayment: '2024-01-10',
      accountBalance: '$45.67',
      upgradeEligibility: true,
      promotions: ['Auto Pay'],
      notes: 'New customer, interested in upgrading'
    }
  ];

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
      case 'accountNumber':
        return value.trim().length >= 9 ? '' : 'Account number must be at least 9 characters';
      case 'billingZip':
        return /^\d{5}$/.test(value) ? '' : 'Billing ZIP must be exactly 5 digits';
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

  const lookupCustomer = async () => {
    setIsLookingUp(true);
    setLookupError('');
    setAccountFound(null);

    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1500));

    let foundCustomer = null;

    switch (lookupMethod) {
      case 'phone':
        foundCustomer = mockCustomers.find(c => c.phone === customerData.phone);
        break;
      case 'account':
        foundCustomer = mockCustomers.find(c => c.accountNumber === customerData.accountNumber);
        break;
      case 'email':
        foundCustomer = mockCustomers.find(c => c.email === customerData.email);
        break;
    }

    if (foundCustomer) {
      setAccountFound(foundCustomer);
      setCustomerData(prev => ({
        ...prev,
        firstName: foundCustomer.firstName,
        lastName: foundCustomer.lastName,
        email: foundCustomer.email,
        phone: foundCustomer.phone,
        pin: foundCustomer.pin,
        last4SSN: foundCustomer.last4SSN,
        accountNumber: foundCustomer.accountNumber,
        billingZip: foundCustomer.billingZip,
        expectedEC: foundCustomer.expectedEC
      }));
      
      // Load customer history
      setCustomerHistory({
        recentQuotes: [
          { date: '2024-01-10', type: 'Upgrade', status: 'Completed', amount: '$45/mo' },
          { date: '2023-12-15', type: 'New Line', status: 'Completed', amount: '$35/mo' }
        ],
        recentTransactions: [
          { date: '2024-01-15', type: 'Payment', amount: '$120.00', status: 'Success' },
          { date: '2024-01-01', type: 'Payment', amount: '$120.00', status: 'Success' }
        ]
      });
    } else {
      setLookupError('No account found with the provided information. Please verify your details or try a different lookup method.');
    }

    setIsLookingUp(false);
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

  const getCreditClassColor = (creditClass) => {
    switch (creditClass) {
      case 'A': return '#4CAF50';
      case 'B': return '#FF9800';
      case 'C': return '#F44336';
      default: return '#9E9E9E';
    }
  };

  const getAccountStatusColor = (status) => {
    switch (status) {
      case 'active': return '#4CAF50';
      case 'suspended': return '#F44336';
      case 'pending': return '#FF9800';
      default: return '#9E9E9E';
    }
  };

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
      {/* Header */}
      <div style={{
        textAlign: 'center',
        marginBottom: '20px'
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
          <User size={30} />
        </div>
        <h1 style={{
          fontSize: '24px',
          fontWeight: '700',
          color: '#E20074',
          marginBottom: '8px'
        }}>
          Welcome to T-Mobile Quick Quote
        </h1>
        <p style={{
          fontSize: '14px',
          color: '#666',
          lineHeight: '1.4'
        }}>
          Get an instant quote for your T-Mobile service. Look up your existing account or provide new customer information.
        </p>
      </div>

      {/* Account Lookup Section */}
      <div style={{
        background: '#f8f9fa',
        padding: '20px',
        borderRadius: '10px',
        marginBottom: '20px',
        border: '1px solid #e0e0e0'
      }}>
        <h2 style={{
          fontSize: '18px',
          fontWeight: '600',
          color: '#333',
          marginBottom: '15px',
          textAlign: 'center',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '8px'
        }}>
          <Search size={24} color="#E20074" />
          Account Lookup (Optional)
        </h2>

        {/* Lookup Method Selection */}
        <div style={{
          display: 'flex',
          gap: '8px',
          marginBottom: '15px',
          justifyContent: 'center'
        }}>
          <button
            onClick={() => setLookupMethod('phone')}
            style={{
              padding: '8px 16px',
              border: `2px solid ${lookupMethod === 'phone' ? '#E20074' : '#e0e0e0'}`,
              borderRadius: '6px',
              background: lookupMethod === 'phone' ? '#E20074' : 'white',
              color: lookupMethod === 'phone' ? 'white' : '#666',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '4px',
              fontSize: '13px'
            }}
          >
            <Phone size={14} />
            Phone
          </button>
          <button
            onClick={() => setLookupMethod('account')}
            style={{
              padding: '8px 16px',
              border: `2px solid ${lookupMethod === 'account' ? '#E20074' : '#e0e0e0'}`,
              borderRadius: '6px',
              background: lookupMethod === 'account' ? '#E20074' : 'white',
              color: lookupMethod === 'account' ? 'white' : '#666',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '4px',
              fontSize: '13px'
            }}
          >
            <CreditCard size={14} />
            Account #
          </button>
          <button
            onClick={() => setLookupMethod('email')}
            style={{
              padding: '8px 16px',
              border: `2px solid ${lookupMethod === 'email' ? '#E20074' : '#e0e0e0'}`,
              borderRadius: '6px',
              background: lookupMethod === 'email' ? '#E20074' : 'white',
              color: lookupMethod === 'email' ? 'white' : '#666',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '4px',
              fontSize: '13px'
            }}
          >
            <Mail size={14} />
            Email
          </button>
        </div>

        {/* Lookup Input */}
        <div style={{ marginBottom: '15px' }}>
          <label style={{
            display: 'block',
            fontSize: '13px',
            fontWeight: '500',
            color: '#333',
            marginBottom: '6px'
          }}>
            {lookupMethod === 'phone' ? 'Phone Number' : 
             lookupMethod === 'account' ? 'Account Number' : 'Email Address'}
          </label>
          <div style={{ display: 'flex', gap: '8px' }}>
            <input
              type={lookupMethod === 'email' ? 'email' : 'text'}
              value={lookupMethod === 'phone' ? customerData.phone : 
                     lookupMethod === 'account' ? customerData.accountNumber : 
                     customerData.email}
              onChange={lookupMethod === 'phone' ? handlePhoneChange : handleInputChange}
              name={lookupMethod === 'phone' ? 'phone' : 
                    lookupMethod === 'account' ? 'accountNumber' : 'email'}
              style={{
                flex: 1,
                padding: '10px',
                border: '2px solid #e0e0e0',
                borderRadius: '6px',
                fontSize: '14px'
              }}
              placeholder={lookupMethod === 'phone' ? '(555) 123-4567' : 
                           lookupMethod === 'account' ? 'ACC123456789' : 
                           'customer@email.com'}
            />
            <button
              onClick={lookupCustomer}
              disabled={isLookingUp}
              style={{
                padding: '10px 16px',
                background: '#E20074',
                color: 'white',
                border: 'none',
                borderRadius: '6px',
                fontSize: '14px',
                cursor: isLookingUp ? 'not-allowed' : 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                opacity: isLookingUp ? 0.7 : 1
              }}
            >
              {isLookingUp ? <Loader size={14} className="animate-spin" /> : <Search size={14} />}
              {isLookingUp ? 'Looking...' : 'Lookup'}
            </button>
          </div>
        </div>

        {/* Lookup Error */}
        {lookupError && (
          <div style={{
            background: '#f8d7da',
            color: '#721c24',
            padding: '12px',
            borderRadius: '8px',
            marginBottom: '20px',
            display: 'flex',
            alignItems: 'center',
            gap: '8px'
          }}>
            <AlertCircle size={16} />
            {lookupError}
          </div>
        )}

        {/* Account Found */}
        {accountFound && (
          <div style={{
            background: '#d4edda',
            border: '1px solid #c3e6cb',
            borderRadius: '8px',
            padding: '20px',
            marginBottom: '20px'
          }}>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
              marginBottom: '15px'
            }}>
              <CheckCircle size={20} color="#28a745" />
              <h3 style={{
                fontSize: '18px',
                fontWeight: '600',
                color: '#155724',
                margin: 0
              }}>
                Account Found: {accountFound.firstName} {accountFound.lastName}
              </h3>
            </div>

            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
              gap: '15px',
              marginBottom: '15px'
            }}>
              <div>
                <strong>Account Status:</strong>
                <span style={{
                  color: getAccountStatusColor(accountFound.accountStatus),
                  fontWeight: '600',
                  marginLeft: '8px'
                }}>
                  {accountFound.accountStatus.toUpperCase()}
                </span>
              </div>
              <div>
                <strong>Credit Class:</strong>
                <span style={{
                  color: getCreditClassColor(accountFound.creditClass),
                  fontWeight: '600',
                  marginLeft: '8px'
                }}>
                  {accountFound.creditClass}
                </span>
              </div>
              <div><strong>Account Age:</strong> {accountFound.accountAge}</div>
              <div><strong>Current Plan:</strong> {accountFound.currentPlan}</div>
              <div><strong>Current Lines:</strong> {accountFound.currentLines}</div>
              <div><strong>Expected EC:</strong> {accountFound.expectedEC}</div>
            </div>

            <div style={{
              display: 'flex',
              gap: '10px',
              marginTop: '15px'
            }}>
              <button
                onClick={() => setShowAccountDetails(!showAccountDetails)}
                style={{
                  padding: '8px 16px',
                  background: '#007bff',
                  color: 'white',
                  border: 'none',
                  borderRadius: '6px',
                  fontSize: '14px',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px'
                }}
              >
                <Eye size={14} />
                {showAccountDetails ? 'Hide' : 'Show'} Details
              </button>
              <button
                onClick={() => {
                  setAccountFound(null);
                  setCustomerHistory(null);
                  setShowAccountDetails(false);
                }}
                style={{
                  padding: '8px 16px',
                  background: '#6c757d',
                  color: 'white',
                  border: 'none',
                  borderRadius: '6px',
                  fontSize: '14px',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px'
                }}
              >
                <RefreshCw size={14} />
                Lookup Different
              </button>
            </div>

            {/* Detailed Account Information */}
            {showAccountDetails && (
              <div style={{
                marginTop: '20px',
                padding: '15px',
                background: 'white',
                borderRadius: '8px',
                border: '1px solid #e0e0e0'
              }}>
                <h4 style={{
                  fontSize: '16px',
                  fontWeight: '600',
                  marginBottom: '15px',
                  color: '#333'
                }}>
                  Account Details
                </h4>

                <div style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
                  gap: '15px',
                  marginBottom: '20px'
                }}>
                  <div>
                    <strong>Payment History:</strong>
                    <div style={{
                      color: accountFound.paymentHistory === 'excellent' ? '#28a745' : 
                             accountFound.paymentHistory === 'good' ? '#ffc107' : '#dc3545',
                      fontWeight: '600',
                      marginTop: '4px'
                    }}>
                      {accountFound.paymentHistory.toUpperCase()}
                    </div>
                  </div>
                  <div><strong>Last Payment:</strong> {accountFound.lastPayment}</div>
                  <div><strong>Account Balance:</strong> {accountFound.accountBalance}</div>
                  <div>
                    <strong>Upgrade Eligible:</strong>
                    <span style={{
                      color: accountFound.upgradeEligibility ? '#28a745' : '#dc3545',
                      fontWeight: '600',
                      marginLeft: '8px'
                    }}>
                      {accountFound.upgradeEligibility ? 'YES' : 'NO'}
                    </span>
                  </div>
                </div>

                <div style={{ marginBottom: '15px' }}>
                  <strong>Current Promotions:</strong>
                  <div style={{ marginTop: '8px' }}>
                    {accountFound.promotions.map((promo, index) => (
                      <span
                        key={index}
                        style={{
                          background: '#E20074',
                          color: 'white',
                          padding: '4px 8px',
                          borderRadius: '4px',
                          fontSize: '12px',
                          marginRight: '8px',
                          marginBottom: '4px',
                          display: 'inline-block'
                        }}
                      >
                        {promo}
                      </span>
                    ))}
                  </div>
                </div>

                <div>
                  <strong>Notes:</strong>
                  <div style={{
                    marginTop: '4px',
                    fontSize: '14px',
                    color: '#666',
                    fontStyle: 'italic'
                  }}>
                    {accountFound.notes}
                  </div>
                </div>

                {/* Customer History */}
                {customerHistory && (
                  <div style={{ marginTop: '20px' }}>
                    <h5 style={{
                      fontSize: '14px',
                      fontWeight: '600',
                      marginBottom: '10px',
                      color: '#333'
                    }}>
                      Recent Activity
                    </h5>
                    
                    <div style={{
                      display: 'grid',
                      gridTemplateColumns: '1fr 1fr',
                      gap: '15px'
                    }}>
                      <div>
                        <div style={{
                          fontSize: '12px',
                          fontWeight: '600',
                          color: '#666',
                          marginBottom: '8px'
                        }}>
                          Recent Quotes
                        </div>
                        {customerHistory.recentQuotes.map((quote, index) => (
                          <div key={index} style={{
                            fontSize: '12px',
                            padding: '4px 0',
                            borderBottom: '1px solid #f0f0f0'
                          }}>
                            {quote.date}: {quote.type} - {quote.amount}
                          </div>
                        ))}
                      </div>
                      
                      <div>
                        <div style={{
                          fontSize: '12px',
                          fontWeight: '600',
                          color: '#666',
                          marginBottom: '8px'
                        }}>
                          Recent Payments
                        </div>
                        {customerHistory.recentTransactions.map((transaction, index) => (
                          <div key={index} style={{
                            fontSize: '12px',
                            padding: '4px 0',
                            borderBottom: '1px solid #f0f0f0'
                          }}>
                            {transaction.date}: {transaction.type} - {transaction.amount}
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        )}
      </div>

      {/* Customer Info Form */}
      <form onSubmit={handleSubmit}>
        <div style={{
          background: '#f8f9fa',
          padding: '20px',
          borderRadius: '10px',
          marginBottom: '20px',
          border: '1px solid #e0e0e0'
        }}>
          <h2 style={{
            fontSize: '18px',
            fontWeight: '600',
            color: '#333',
            marginBottom: '15px',
            textAlign: 'center',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '8px'
          }}>
            <Shield size={20} color="#E20074" />
            Customer Information {accountFound ? '(Pre-filled from Account)' : '(Required)'}
          </h2>
          
          <div style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: '15px',
            marginBottom: '15px'
          }}>
            <div>
              <label style={{
                display: 'block',
                fontSize: '13px',
                fontWeight: '500',
                color: '#333',
                marginBottom: '6px'
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
                  padding: '10px',
                  border: `2px solid ${errors.firstName ? '#dc3545' : '#e0e0e0'}`,
                  borderRadius: '6px',
                  fontSize: '14px',
                  transition: 'border-color 0.3s ease'
                }}
                placeholder="Enter first name"
              />
              {errors.firstName && (
                <div style={{ color: '#dc3545', fontSize: '11px', marginTop: '3px' }}>
                  {errors.firstName}
                </div>
              )}
            </div>

            <div>
              <label style={{
                display: 'block',
                fontSize: '13px',
                fontWeight: '500',
                color: '#333',
                marginBottom: '6px'
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
                  padding: '10px',
                  border: `2px solid ${errors.lastName ? '#dc3545' : '#e0e0e0'}`,
                  borderRadius: '6px',
                  fontSize: '14px',
                  transition: 'border-color 0.3s ease'
                }}
                placeholder="Enter last name"
              />
              {errors.lastName && (
                <div style={{ color: '#dc3545', fontSize: '11px', marginTop: '3px' }}>
                  {errors.lastName}
                </div>
              )}
            </div>
          </div>

          <div style={{ marginBottom: '15px' }}>
            <label style={{
              display: 'block',
              fontSize: '13px',
              fontWeight: '500',
              color: '#333',
              marginBottom: '6px'
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
                padding: '10px',
                border: `2px solid ${errors.email ? '#dc3545' : '#e0e0e0'}`,
                borderRadius: '6px',
                fontSize: '14px',
                transition: 'border-color 0.3s ease'
              }}
              placeholder="Enter email address"
            />
            {errors.email && (
              <div style={{ color: '#dc3545', fontSize: '11px', marginTop: '3px' }}>
                {errors.email}
              </div>
            )}
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: '15px',
            marginBottom: '15px'
          }}>
            <div>
              <label style={{
                display: 'block',
                fontSize: '13px',
                fontWeight: '500',
                color: '#333',
                marginBottom: '6px'
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
                  padding: '10px',
                  border: `2px solid ${errors.pin ? '#dc3545' : '#e0e0e0'}`,
                  borderRadius: '6px',
                  fontSize: '14px',
                  transition: 'border-color 0.3s ease'
                }}
                placeholder="123456"
              />
              {errors.pin && (
                <div style={{ color: '#dc3545', fontSize: '11px', marginTop: '3px' }}>
                  {errors.pin}
                </div>
              )}
            </div>

            <div>
              <label style={{
                display: 'block',
                fontSize: '13px',
                fontWeight: '500',
                color: '#333',
                marginBottom: '6px'
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
                  padding: '10px',
                  border: `2px solid ${errors.phone ? '#dc3545' : '#e0e0e0'}`,
                  borderRadius: '6px',
                  fontSize: '14px',
                  transition: 'border-color 0.3s ease'
                }}
                placeholder="(555) 123-4567"
              />
              {errors.phone && (
                <div style={{ color: '#dc3545', fontSize: '11px', marginTop: '3px' }}>
                  {errors.phone}
                </div>
              )}
            </div>
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: '15px',
            marginBottom: '15px'
          }}>
            <div>
              <label style={{
                display: 'block',
                fontSize: '13px',
                fontWeight: '500',
                color: '#333',
                marginBottom: '6px'
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
                  padding: '10px',
                  border: `2px solid ${errors.last4SSN ? '#dc3545' : '#e0e0e0'}`,
                  borderRadius: '6px',
                  fontSize: '14px',
                  transition: 'border-color 0.3s ease'
                }}
                placeholder="1234"
              />
              {errors.last4SSN && (
                <div style={{ color: '#dc3545', fontSize: '11px', marginTop: '3px' }}>
                  {errors.last4SSN}
                </div>
              )}
            </div>

            <div>
              <label style={{
                display: 'block',
                fontSize: '13px',
                fontWeight: '500',
                color: '#333',
                marginBottom: '6px'
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
                  padding: '10px',
                  border: `2px solid ${errors.expectedEC ? '#dc3545' : '#e0e0e0'}`,
                  borderRadius: '6px',
                  fontSize: '14px',
                  transition: 'border-color 0.3s ease'
                }}
                placeholder="Enter expected EC"
              />
              {errors.expectedEC && (
                <div style={{ color: '#dc3545', fontSize: '11px', marginTop: '3px' }}>
                  {errors.expectedEC}
                </div>
              )}
            </div>
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: '15px',
            marginBottom: '15px'
          }}>
            <div>
              <label style={{
                display: 'block',
                fontSize: '13px',
                fontWeight: '500',
                color: '#333',
                marginBottom: '6px'
              }}>
                Account Number
              </label>
              <input
                type="text"
                name="accountNumber"
                value={customerData.accountNumber}
                onChange={handleInputChange}
                style={{
                  width: '100%',
                  padding: '10px',
                  border: `2px solid ${errors.accountNumber ? '#dc3545' : '#e0e0e0'}`,
                  borderRadius: '6px',
                  fontSize: '14px',
                  transition: 'border-color 0.3s ease'
                }}
                placeholder="ACC123456789"
              />
              {errors.accountNumber && (
                <div style={{ color: '#dc3545', fontSize: '11px', marginTop: '3px' }}>
                  {errors.accountNumber}
                </div>
              )}
            </div>

            <div>
              <label style={{
                display: 'block',
                fontSize: '13px',
                fontWeight: '500',
                color: '#333',
                marginBottom: '6px'
              }}>
                Billing ZIP Code
              </label>
              <input
                type="text"
                name="billingZip"
                value={customerData.billingZip}
                onChange={handleInputChange}
                maxLength="5"
                style={{
                  width: '100%',
                  padding: '10px',
                  border: `2px solid ${errors.billingZip ? '#dc3545' : '#e0e0e0'}`,
                  borderRadius: '6px',
                  fontSize: '14px',
                  transition: 'border-color 0.3s ease'
                }}
                placeholder="12345"
              />
              {errors.billingZip && (
                <div style={{ color: '#dc3545', fontSize: '11px', marginTop: '3px' }}>
                  {errors.billingZip}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div style={{
          display: 'flex',
          gap: '12px',
          justifyContent: 'center',
          marginBottom: '15px'
        }}>
          <button
            type="button"
            onClick={handleSkip}
            style={{
              background: '#6c757d',
              color: 'white',
              border: 'none',
              padding: '12px 24px',
              borderRadius: '6px',
              fontSize: '14px',
              fontWeight: '600',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              transition: 'background-color 0.3s ease'
            }}
            onMouseOver={(e) => e.target.style.background = '#5a6268'}
            onMouseOut={(e) => e.target.style.background = '#6c757d'}
          >
            <SkipForward size={16} />
            Skip for Now
          </button>

          <button
            type="submit"
            style={{
              background: '#E20074',
              color: 'white',
              border: 'none',
              padding: '12px 24px',
              borderRadius: '6px',
              fontSize: '14px',
              fontWeight: '600',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              transition: 'background-color 0.3s ease'
            }}
            onMouseOver={(e) => e.target.style.background = '#C1005F'}
            onMouseOut={(e) => e.target.style.background = '#E20074'}
          >
            Continue with Info
            <ArrowRight size={16} />
          </button>
        </div>
      </form>

      {/* Skip Notice */}
      <div style={{
        textAlign: 'center',
        marginTop: '10px',
        padding: '10px',
        background: '#e3f2fd',
        borderRadius: '6px',
        border: '1px solid #bbdefb'
      }}>
        <p style={{
          fontSize: '12px',
          color: '#1976d2',
          margin: '0'
        }}>
          💡 <strong>Tip:</strong> Account lookup helps us provide personalized quotes and verify your eligibility for promotions
        </p>
      </div>
    </div>
  );
};

export default WelcomeScreen;