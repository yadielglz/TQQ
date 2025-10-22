import React, { useCallback } from 'react';
import { FileText, ArrowLeft, Download, RotateCcw } from 'lucide-react';

const QuoteSummary = ({ 
  customerData, 
  voiceLinesData, 
  dataLinesData, 
  iotLinesData, 
  homeInternetData,
  equipmentCreditData, 
  discountsData, 
  onPrev, 
  onClearData 
}) => {
  
  const calculateTotal = useCallback(() => {
    let total = 0;
    
    // Voice lines total
    if (voiceLinesData && voiceLinesData.totalMonthly) {
      total += voiceLinesData.totalMonthly;
    }
    
    // Add other service totals as they're implemented
    // Data lines, IoT, Home Internet, etc.
    
    return total;
  }, [voiceLinesData, dataLinesData, iotLinesData, homeInternetData]);

  const handleDownload = useCallback(() => {
    const quoteData = {
      customer: customerData,
      services: {
        voice: voiceLinesData,
        data: dataLinesData,
        iot: iotLinesData,
        homeInternet: homeInternetData
      },
      equipment: equipmentCreditData,
      discounts: discountsData,
      total: calculateTotal()
    };
    
    const dataStr = JSON.stringify(quoteData, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    
    const link = document.createElement('a');
    link.href = url;
    link.download = `t-mobile-quote-${Date.now()}.json`;
    link.click();
    
    URL.revokeObjectURL(url);
  }, [customerData, voiceLinesData, dataLinesData, iotLinesData, homeInternetData, equipmentCreditData, discountsData, calculateTotal]);

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
          <FileText size={24} color="#E20074" />
          <h2 style={{ fontSize: '24px', fontWeight: '700', color: '#E20074', margin: 0 }}>
            Quote Summary
          </h2>
        </div>
        <p style={{ color: '#666', fontSize: '14px', margin: 0, lineHeight: '1.4' }}>
          Review your quote details and download your personalized quote.
        </p>
      </div>
      
      {/* Content */}
      <div style={{ flex: 1, padding: '20px' }}>
      {/* Customer Information */}
      {customerData && (
        <div style={{
          background: '#f8f9fa',
          padding: '20px',
            borderRadius: '8px',
            marginBottom: '20px',
          border: '1px solid #e0e0e0'
        }}>
            <h3 style={{ fontSize: '18px', fontWeight: '600', marginBottom: '15px', color: '#333' }}>
            Customer Information
          </h3>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '10px' }}>
              {customerData.name && <div><strong>Name:</strong> {customerData.name}</div>}
              {customerData.email && <div><strong>Email:</strong> {customerData.email}</div>}
              {customerData.phone && <div><strong>Phone:</strong> {customerData.phone}</div>}
              {customerData.location && <div><strong>Location:</strong> {customerData.location}</div>}
            </div>
          </div>
        )}

        {/* Voice Lines Summary */}
        {voiceLinesData && voiceLinesData.quantity > 0 && (
          <div style={{
            background: '#f8f9fa',
            padding: '20px',
            borderRadius: '8px',
            marginBottom: '20px',
            border: '1px solid #e0e0e0'
          }}>
            <h3 style={{ fontSize: '18px', fontWeight: '600', marginBottom: '15px', color: '#333' }}>
              Voice Lines
            </h3>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '10px' }}>
              <div><strong>Lines:</strong> {voiceLinesData.quantity}</div>
              <div><strong>Plan:</strong> {Object.values(voiceLinesData.plans)[0] ? Object.values(voiceLinesData.plans)[0].replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase()) : 'Not selected'}</div>
              <div><strong>Devices:</strong> BYOD (Bring Your Own Device)</div>
              <div><strong>Monthly Cost:</strong> ${voiceLinesData.totalMonthly?.toFixed(2) || '0.00'}</div>
            </div>
          </div>
        )}
        
        {/* Other Services Placeholder */}
        <div style={{
          background: '#fff3cd',
          padding: '20px',
          borderRadius: '8px',
          marginBottom: '20px',
          border: '1px solid #ffc107'
        }}>
          <h3 style={{ fontSize: '16px', fontWeight: '600', marginBottom: '10px', color: '#856404' }}>
            Additional Services
          </h3>
          <p style={{ fontSize: '14px', color: '#856404', margin: 0 }}>
            Data Lines, IoT Lines, Home Internet, Equipment Credit, and Discounts will be displayed here once configured.
          </p>
                  </div>

        {/* Total Summary */}
          <div style={{
          background: '#e8f5e8',
            padding: '20px',
          borderRadius: '8px',
          marginBottom: '20px',
          border: '1px solid #4CAF50'
          }}>
          <h3 style={{ fontSize: '20px', fontWeight: '700', marginBottom: '10px', color: '#2e7d32' }}>
            Total Monthly Cost
            </h3>
          <div style={{ fontSize: '32px', fontWeight: '700', color: '#E20074' }}>
            ${calculateTotal().toFixed(2)}
          </div>
          <p style={{ fontSize: '14px', color: '#2e7d32', margin: '10px 0 0 0' }}>
            * Pricing is estimated and may vary based on location, promotions, and other factors.
        </p>
              </div>

        {/* Actions */}
          <div style={{
          display: 'flex',
          gap: '15px',
          flexWrap: 'wrap'
          }}>
            <button
            onClick={handleDownload}
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
            <Download size={16} />
            Download Quote
          </button>
          
                  <button
            onClick={onClearData}
            style={{
              padding: '12px 24px',
              border: '2px solid #6c757d',
              borderRadius: '8px',
              background: 'white',
              color: '#6c757d',
              fontSize: '16px',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              transition: 'all 0.3s ease'
            }}
          >
            <RotateCcw size={16} />
            Start New Quote
                  </button>
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
          Back to Discounts
        </button>
        
        <div style={{ fontSize: '14px', color: '#666', textAlign: 'center' }}>
          Quote Complete
        </div>
        
        <div style={{ fontSize: '18px', fontWeight: '700', color: '#E20074' }}>
          ${calculateTotal().toFixed(2)}/month
        </div>
      </div>
    </div>
  );
};

export default QuoteSummary;