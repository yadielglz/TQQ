import React, { useState, useCallback } from 'react';
import { Percent, ArrowLeft, ArrowRight, Check, X, Info } from 'lucide-react';

const DiscountSelection = ({ data, onDataChange, onNext, onPrev }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [selectedDiscounts, setSelectedDiscounts] = useState({
    autoPay: data.autoPay || false,
    senior55: data.senior55 || false,
    insider: data.insider || false,
    workPerks: data.workPerks || false
  });

  const steps = [
    { id: 'autopay', title: 'AutoPay', description: 'Automatic payment discount' },
    { id: 'senior', title: 'Senior 55+', description: 'Senior citizen discount' },
    { id: 'insider', title: 'Insider', description: 'T-Mobile Insider discount' },
    { id: 'workperks', title: 'Work Perks', description: 'Employee discount' }
  ];

  const discountOptions = [
    {
      id: 'autoPay',
      name: 'AutoPay Discount',
      description: 'Save $5 per line with automatic payments',
      value: 5,
      requirements: ['Must enroll in AutoPay', 'Valid payment method required'],
      icon: '💳',
      color: '#4CAF50'
    },
    {
      id: 'senior55',
      name: 'Senior 55+ Discount',
      description: 'Save $10 per line for customers 55 and older',
      value: 10,
      requirements: ['Account holder must be 55+', 'Valid ID verification required'],
      icon: '👴',
      color: '#2196F3'
    },
    {
      id: 'insider',
      name: 'T-Mobile Insider',
      description: 'Save $20 per line with Insider discount',
      value: 20,
      requirements: ['Must have Insider code', 'New customer or upgrade'],
      icon: '🎯',
      color: '#FF9800'
    },
    {
      id: 'workPerks',
      name: 'Work Perks',
      description: 'Save $15 per line with employee discount',
      value: 15,
      requirements: ['Must verify employment', 'Valid work email required'],
      icon: '💼',
      color: '#9C27B0'
    }
  ];

  const handleDiscountToggle = useCallback((discountId) => {
    const newDiscounts = {
      ...selectedDiscounts,
      [discountId]: !selectedDiscounts[discountId]
    };
    setSelectedDiscounts(newDiscounts);
    onDataChange(newDiscounts);
  }, [selectedDiscounts, onDataChange]);

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

  const renderDiscountStep = (discount) => (
    <div style={{ padding: '20px' }}>
      <h3 style={{ fontSize: '20px', fontWeight: '600', marginBottom: '20px', color: '#333' }}>
        {discount.name}
      </h3>
      
      <div style={{
        background: 'white',
        padding: '30px',
        borderRadius: '12px',
        border: `2px solid ${selectedDiscounts[discount.id] ? discount.color : '#e0e0e0'}`,
        marginBottom: '20px',
        transition: 'all 0.3s ease'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '15px', marginBottom: '20px' }}>
          <div style={{
            fontSize: '48px',
            width: '60px',
            height: '60px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            background: selectedDiscounts[discount.id] ? `${discount.color}20` : '#f8f9fa',
            borderRadius: '50%'
          }}>
            {discount.icon}
          </div>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: '24px', fontWeight: '700', color: discount.color, marginBottom: '5px' }}>
              ${discount.value}/line/month
            </div>
            <div style={{ fontSize: '16px', color: '#666' }}>
              {discount.description}
            </div>
          </div>
          <button
            onClick={() => handleDiscountToggle(discount.id)}
            style={{
              width: '40px',
              height: '40px',
              borderRadius: '50%',
              border: `2px solid ${discount.color}`,
              background: selectedDiscounts[discount.id] ? discount.color : 'white',
              color: selectedDiscounts[discount.id] ? 'white' : discount.color,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              transition: 'all 0.3s ease'
            }}
          >
            {selectedDiscounts[discount.id] ? <Check size={20} /> : <X size={20} />}
          </button>
        </div>

        <div style={{
          background: '#f8f9fa',
          padding: '20px',
          borderRadius: '8px',
          border: '1px solid #e0e0e0'
        }}>
          <h4 style={{ fontSize: '16px', fontWeight: '600', marginBottom: '10px', color: '#333', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Info size={16} />
            Requirements
          </h4>
          <ul style={{ fontSize: '14px', color: '#666', margin: 0, paddingLeft: '20px' }}>
            {discount.requirements.map((requirement, i) => (
              <li key={i} style={{ marginBottom: '5px' }}>{requirement}</li>
            ))}
          </ul>
        </div>
      </div>

      {/* Discount Details */}
      <div style={{
        background: selectedDiscounts[discount.id] ? '#f0f9ff' : '#f8f9fa',
        padding: '20px',
        borderRadius: '8px',
        border: `1px solid ${selectedDiscounts[discount.id] ? '#2196F3' : '#e0e0e0'}`,
        transition: 'all 0.3s ease'
      }}>
        <h4 style={{ fontSize: '16px', fontWeight: '600', marginBottom: '10px', color: '#333' }}>
          How it works
        </h4>
        <div style={{ fontSize: '14px', color: '#666', lineHeight: '1.5' }}>
          {discount.id === 'autoPay' && (
            <p>This discount is automatically applied when you enroll in AutoPay. Your monthly bill will be automatically charged to your selected payment method, and you'll save $5 per line each month.</p>
          )}
          {discount.id === 'senior55' && (
            <p>Available to customers 55 years and older. You'll need to provide valid identification to verify your age. This discount applies to all lines on your account.</p>
          )}
          {discount.id === 'insider' && (
            <p>Requires a valid T-Mobile Insider code. This discount is typically available for new customers or existing customers upgrading their service. The discount applies to all lines on your account.</p>
          )}
          {discount.id === 'workPerks' && (
            <p>Available to employees of participating companies. You'll need to verify your employment through your work email address. This discount applies to all lines on your account.</p>
          )}
        </div>
      </div>
    </div>
  );

  const renderCurrentStep = () => {
    const currentDiscount = discountOptions[currentStep];
    return renderDiscountStep(currentDiscount);
  };

  const totalSavings = Object.entries(selectedDiscounts).reduce((total, [key, enabled]) => {
    if (enabled) {
      const discount = discountOptions.find(d => d.id === key);
      return total + (discount ? discount.value : 0);
    }
    return total;
  }, 0);

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
          <Percent size={24} color="#E20074" />
          <h2 style={{ fontSize: '24px', fontWeight: '700', color: '#E20074', margin: 0 }}>
            Account Discounts
          </h2>
        </div>
        <p style={{ color: '#666', fontSize: '14px', margin: 0, lineHeight: '1.4' }}>
          Apply account-level discounts to reduce your monthly bill.
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

        {/* Total Savings Summary */}
        <div style={{
          background: '#f0f9ff',
          padding: '15px',
          borderRadius: '8px',
          border: '1px solid #2196F3',
          marginTop: '15px'
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <div style={{ fontSize: '14px', fontWeight: '600', color: '#333' }}>
                Total Monthly Savings
              </div>
              <div style={{ fontSize: '12px', color: '#666' }}>
                Per line with selected discounts
              </div>
            </div>
            <div style={{ fontSize: '24px', fontWeight: '700', color: '#2196F3' }}>
              ${totalSavings}/line
            </div>
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
          {currentStep === 0 ? 'Back to Equipment Credit' : 'Previous'}
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

export default DiscountSelection;