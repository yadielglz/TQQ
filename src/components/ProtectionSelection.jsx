import React from 'react';

const ProtectionSelection = ({ lines, devices, protection, onProtectionChange, onNext, onPrev }) => {
  const deviceOptions = [
    { id: 'iphone-air', name: 'iPhone Air', tier: 5 },
    { id: 'iphone-17-pro-max', name: 'iPhone 17 Pro Max', tier: 6 },
    { id: 'iphone-17-pro', name: 'iPhone 17 Pro', tier: 5 },
    { id: 'iphone-17', name: 'iPhone 17', tier: 4 },
    { id: 'iphone-16e', name: 'iPhone 16e', tier: 3 },
    { id: 'iphone-16-pro-max', name: 'iPhone 16 Pro Max', tier: 6 },
    { id: 'iphone-16-pro', name: 'iPhone 16 Pro', tier: 5 },
    { id: 'iphone-16-plus', name: 'iPhone 16 Plus', tier: 4 },
    { id: 'iphone-16', name: 'iPhone 16', tier: 4 },
    { id: 'iphone-15', name: 'iPhone 15', tier: 4 },
    { id: 'pixel-10-pro-xl', name: 'Pixel 10 Pro XL', tier: 6 },
    { id: 'pixel-10-pro', name: 'Pixel 10 Pro', tier: 5 },
    { id: 'pixel-10', name: 'Pixel 10', tier: 4 },
    { id: 'pixel-9a', name: 'Pixel 9A', tier: 3 },
    { id: 'galaxy-s25-edge', name: 'Galaxy S25 Edge', tier: 6 },
    { id: 'galaxy-s25-ultra', name: 'Galaxy S25 Ultra', tier: 6 },
    { id: 'galaxy-s25-plus', name: 'Galaxy S25+', tier: 5 },
    { id: 'galaxy-s25', name: 'Galaxy S25', tier: 4 },
    { id: 'galaxy-s25-fe', name: 'Galaxy S25 FE', tier: 3 },
    { id: 'galaxy-a36', name: 'Galaxy A36', tier: 2 },
    { id: 'galaxy-z-fold-7', name: 'Galaxy Z Fold 7', tier: 6 },
    { id: 'galaxy-z-flip-7', name: 'Galaxy Z Flip 7', tier: 5 },
    { id: 'razr-ultra', name: 'Razr Ultra', tier: 5 },
    { id: 'razr-plus-2025', name: 'Razr+ 2025', tier: 4 },
    { id: 'razr-2025', name: 'Razr 2025', tier: 3 },
    { id: 'edge-2025', name: 'Edge 2025', tier: 4 },
    { id: 'g-power-2025', name: 'G Power 2025', tier: 2 },
    { id: 'g-2025', name: 'G 2025', tier: 1 },
    { id: 'revvl-pro-8', name: 'Revvl Pro 8', tier: 2 },
    { id: 'bring-your-own', name: 'Bring Your Own Device', tier: 5 }
  ];

  const protectionTiers = [
    { tier: 1, price: 7, description: 'Basic smartphones under $300' },
    { tier: 2, price: 9, description: 'Mid-range smartphones $300-500' },
    { tier: 3, price: 13, description: 'Premium smartphones $500-700' },
    { tier: 4, price: 16, description: 'Flagship smartphones $700-900' },
    { tier: 5, price: 18, description: 'Premium flagships $900+ & BYOD' },
    { tier: 6, price: 25, description: 'Ultra-premium devices $1200+' }
  ];

  const getDeviceTier = (deviceId) => {
    const device = deviceOptions.find(d => d.id === deviceId);
    return device ? device.tier : 5; // Default to tier 5 for BYOD
  };

  const getProtectionPrice = (deviceId) => {
    const tier = getDeviceTier(deviceId);
    const tierInfo = protectionTiers.find(t => t.tier === tier);
    return tierInfo ? tierInfo.price : 18;
  };

  const handleProtectionSelect = (lineIndex, hasProtection) => {
    const newProtection = { ...protection };
    newProtection[lineIndex] = hasProtection;
    onProtectionChange(newProtection);
  };

  const getSelectedProtection = (lineIndex) => {
    return protection[lineIndex] || false;
  };

  const canProceed = () => {
    // Protection is optional, so we can always proceed
    // The user has made their choice (or lack thereof) for each line
    return true;
  };

  const calculateProtectionTotal = () => {
    let total = 0;
    for (let i = 0; i < lines; i++) {
      if (protection[i]) {
        const deviceId = devices[i];
        if (deviceId) {
          total += getProtectionPrice(deviceId);
        }
      }
    }
    return total;
  };

  return (
    <div className="form-section">
      <h2 className="section-title">Select Protection Plans</h2>
      
      {/* Action Buttons */}
      <div className="button-group">
        <button className="button button-secondary" onClick={onPrev}>
          Back to Devices
        </button>
        <button 
          className="button" 
          onClick={onNext}
          disabled={!canProceed()}
        >
          Continue to Discounts
        </button>
      </div>
      <p style={{ color: '#666', marginBottom: '30px', textAlign: 'center' }}>
        P360 Protection covers device damage, loss, and theft with deductible-based claims
      </p>
      <div style={{
        background: '#E20074',
        color: 'white',
        padding: '12px 20px',
        borderRadius: '8px',
        marginBottom: '20px',
        textAlign: 'center',
        fontSize: '14px'
      }}>
        <strong>Protection is optional</strong> - You can skip protection for any or all lines
      </div>
      
      {Array.from({ length: lines }, (_, lineIndex) => {
        const deviceId = devices[lineIndex];
        const device = deviceOptions.find(d => d.id === deviceId);
        const tier = getDeviceTier(deviceId);
        const price = getProtectionPrice(deviceId);
        const isSelected = getSelectedProtection(lineIndex);
        
        return (
          <div key={lineIndex} className="line-item">
            <div className="line-header">
              <span className="line-number">Line {lineIndex + 1}</span>
              <span className="line-price">
                {isSelected ? `$${price}/mo` : 'No Protection'}
              </span>
            </div>
            
            <div style={{ marginBottom: '15px' }}>
              <div style={{ color: '#666', fontSize: '14px', marginBottom: '8px' }}>
                Device: {device?.name || 'Unknown Device'} (Tier {tier})
              </div>
            </div>
            
            <div className="card-grid" style={{ gridTemplateColumns: '1fr 1fr' }}>
              <div
                className={`card ${!isSelected ? 'selected' : ''}`}
                onClick={() => handleProtectionSelect(lineIndex, false)}
                style={{ textAlign: 'center' }}
              >
                <div style={{ fontSize: '32px', marginBottom: '10px' }}>🚫</div>
                <h3 className="card-title">No Protection</h3>
                <div className="card-price">$0/mo</div>
                <p className="card-description">
                  You&apos;re responsible for all device repairs and replacements
                </p>
              </div>
              
              <div
                className={`card ${isSelected ? 'selected' : ''}`}
                onClick={() => handleProtectionSelect(lineIndex, true)}
                style={{ textAlign: 'center' }}
              >
                <div style={{ fontSize: '32px', marginBottom: '10px' }}>🛡️</div>
                <h3 className="card-title">P360 Protection</h3>
                <div className="card-price">${price}/mo</div>
                <p className="card-description">
                  Covers damage, loss, and theft with deductible-based claims
                </p>
                <div style={{ fontSize: '12px', color: '#999', marginTop: '8px' }}>
                  Tier {tier} device
                </div>
              </div>
            </div>
          </div>
        );
      })}

      <div className="summary">
        <div className="summary-title">Protection Summary</div>
        <div className="summary-item">
          <span className="summary-label">Monthly Protection Total</span>
          <span className="summary-value">${calculateProtectionTotal()}/mo</span>
        </div>
      </div>

      <div style={{ 
        background: '#f8f9fa', 
        padding: '15px', 
        borderRadius: '8px', 
        marginBottom: '20px',
        fontSize: '14px',
        color: '#666'
      }}>
        <strong>P360 Protection Tiers:</strong>
        <ul style={{ marginTop: '8px', paddingLeft: '20px' }}>
          {protectionTiers.map(tier => (
            <li key={tier.tier}>
              <strong>Tier {tier.tier}:</strong> ${tier.price}/mo - {tier.description}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default ProtectionSelection;
