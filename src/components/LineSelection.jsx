import React from 'react';
import { Plus, Minus } from 'lucide-react';

const LineSelection = ({ lines, onLinesChange, onNext }) => {
  const handleLinesChange = (newLines) => {
    if (newLines >= 1 && newLines <= 10) {
      onLinesChange(newLines);
    }
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
          margin: 0
        }}>
          How many lines do you need?
        </h2>
      </div>
      
      <div className="form-group">
        <label className="label">Number of Lines</label>
        <div style={{ display: 'flex', alignItems: 'center', gap: '20px', justifyContent: 'center' }}>
          <button
            onClick={() => handleLinesChange(lines - 1)}
            disabled={lines <= 1}
            style={{
              background: lines <= 1 ? '#ccc' : '#e20074',
              color: 'white',
              border: 'none',
              borderRadius: '50%',
              width: '50px',
              height: '50px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: lines <= 1 ? 'not-allowed' : 'pointer',
              fontSize: '24px'
            }}
          >
            <Minus size={24} />
          </button>
          
          <div style={{
            fontSize: '48px',
            fontWeight: 'bold',
            color: '#e20074',
            minWidth: '80px',
            textAlign: 'center'
          }}>
            {lines}
          </div>
          
          <button
            onClick={() => handleLinesChange(lines + 1)}
            disabled={lines >= 10}
            style={{
              background: lines >= 10 ? '#ccc' : '#e20074',
              color: 'white',
              border: 'none',
              borderRadius: '50%',
              width: '50px',
              height: '50px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: lines >= 10 ? 'not-allowed' : 'pointer',
              fontSize: '24px'
            }}
          >
            <Plus size={24} />
          </button>
        </div>
        
        <p style={{ textAlign: 'center', color: '#666', marginTop: '20px' }}>
          You can add up to 10 lines to your account
        </p>
      </div>

      <div style={{ marginTop: '40px' }}>
        <button className="button" onClick={onNext}>
          Continue to Plans
        </button>
      </div>
    </div>
  );
};

export default LineSelection;
