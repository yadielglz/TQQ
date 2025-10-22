import React from 'react';
import { Watch, ArrowLeft, ArrowRight } from 'lucide-react';

const IoTLinesFlow = ({ data, onDataChange, onComplete, onPrev, onNext }) => {
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
          <Watch size={24} color="#E20074" />
          <h2 style={{ fontSize: '24px', fontWeight: '700', color: '#E20074', margin: 0 }}>
            IoT Lines Setup
          </h2>
        </div>
        <p style={{ color: '#666', fontSize: '14px', margin: 0, lineHeight: '1.4' }}>
          Configure IoT devices and connectivity for your account.
        </p>
      </div>

      {/* Content */}
      <div style={{ flex: 1, padding: '40px 20px', textAlign: 'center' }}>
        <div style={{
          background: '#f8f9fa',
          padding: '40px',
          borderRadius: '8px',
          border: '1px solid #e0e0e0',
          maxWidth: '500px',
          margin: '0 auto'
        }}>
          <Watch size={60} color="#E20074" style={{ marginBottom: '20px' }} />
          <h3 style={{ fontSize: '20px', fontWeight: '600', color: '#333', marginBottom: '12px' }}>
            IoT Lines Configuration
          </h3>
          <p style={{ fontSize: '14px', color: '#666', lineHeight: '1.5', marginBottom: '20px' }}>
            This component will be implemented in the next phase. For now, you can skip this step.
          </p>
          <div style={{
            background: '#fff3cd',
            padding: '15px',
            borderRadius: '8px',
            border: '1px solid #ffc107',
            color: '#856404',
            fontSize: '14px'
          }}>
            ℹ️ IoT Lines configuration coming soon
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
          onClick={onPrev}
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
          Back to Services
        </button>
        
        <div style={{ fontSize: '14px', color: '#666', textAlign: 'center' }}>
          IoT Lines - Coming Soon
        </div>
        
        <button
          onClick={onNext}
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
          Skip for now
          <ArrowRight size={16} />
        </button>
      </div>
    </div>
  );
};

export default IoTLinesFlow;