import React, { useState, useEffect, useRef } from 'react';
import { Gift, AlertCircle, CheckCircle, Calculator, Search, Filter, Star, DollarSign, Users, Clock } from 'lucide-react';
import { 
  promotions, 
  getPromotionsForDevice, 
  getTradeInValueForPromotion, 
  isRatePlanEligible, 
  checkPromotionLimits, 
  checkStackability 
} from '../data/promotions';

const PromotionsSelection = ({ 
  lines, 
  quoteData, 
  portInData,
  onPromotionsChange, 
  onNext, 
  onPrev 
}) => {
  const [selectedPromotions, setSelectedPromotions] = useState({});
  const [expandedLines, setExpandedLines] = useState({});
  const [validationErrors, setValidationErrors] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState('all');
  const [showTradeInCalculator, setShowTradeInCalculator] = useState({});
  const [tradeInDevices, setTradeInDevices] = useState({});
  const hasInitialized = useRef(false);

  // Initialize promotions data only when lines change
  useEffect(() => {
    const initialPromotions = {};
    const initialTradeIns = {};
    for (let i = 0; i < lines; i++) {
      initialPromotions[i] = null;
      initialTradeIns[i] = '';
    }
    setSelectedPromotions(initialPromotions);
    setTradeInDevices(initialTradeIns);
    hasInitialized.current = true;
  }, [lines]);

  const handleNext = () => {
    // Validate promotions before proceeding
    const errors = validatePromotions();
    if (errors.length > 0) {
      setValidationErrors(errors);
      return;
    }

    // Save promotions data to parent
    onPromotionsChange(selectedPromotions);
    onNext();
  };

  const handlePromotionChange = (lineIndex, promotionId) => {
    const newPromotions = { ...selectedPromotions };
    newPromotions[lineIndex] = promotionId ? { 
      promotionId, 
      lineIndex,
      tradeInDevice: tradeInDevices[lineIndex] || '',
      tradeInValue: calculateTradeInValue(promotionId, tradeInDevices[lineIndex] || ''),
      savings: calculatePromotionSavings(promotionId, tradeInDevices[lineIndex] || '')
    } : null;
    setSelectedPromotions(newPromotions);
    
    // Clear validation errors when user makes changes
    setValidationErrors([]);
  };

  const handleTradeInChange = (lineIndex, deviceId) => {
    const newTradeIns = { ...tradeInDevices };
    newTradeIns[lineIndex] = deviceId;
    setTradeInDevices(newTradeIns);

    // Update promotion with new trade-in value
    if (selectedPromotions[lineIndex]) {
      const promotionId = selectedPromotions[lineIndex].promotionId;
      const tradeInValue = calculateTradeInValue(promotionId, deviceId);
      const savings = calculatePromotionSavings(promotionId, deviceId);
      
      const updatedPromotion = {
        ...selectedPromotions[lineIndex],
        tradeInDevice: deviceId,
        tradeInValue,
        savings
      };
      
      setSelectedPromotions(prev => ({
        ...prev,
        [lineIndex]: updatedPromotion
      }));
    }
  };

  const toggleLineExpansion = (lineIndex) => {
    setExpandedLines(prev => ({
      ...prev,
      [lineIndex]: !prev[lineIndex]
    }));
  };

  const toggleTradeInCalculator = (lineIndex) => {
    setShowTradeInCalculator(prev => ({
      ...prev,
      [lineIndex]: !prev[lineIndex]
    }));
  };

  const calculateTradeInValue = (promotionId, tradeInDeviceId) => {
    if (!promotionId || !tradeInDeviceId) return 0;
    return getTradeInValueForPromotion(promotionId, tradeInDeviceId);
  };

  const calculatePromotionSavings = (promotionId, tradeInDeviceId) => {
    const promotion = promotions.find(p => p.id === promotionId);
    if (!promotion) return 0;

    const tradeInValue = calculateTradeInValue(promotionId, tradeInDeviceId);
    const devicePrice = getDevicePrice(quoteData.devices?.[0]); // Assuming first device for now
    
    // Calculate actual savings based on promotion type
    if (promotion.name.includes('On Us')) {
      return Math.min(devicePrice, promotion.maxPayout);
    } else if (promotion.name.includes('Off')) {
      const discountAmount = parseFloat(promotion.name.match(/\$(\d+)/)?.[1] || '0');
      return Math.min(discountAmount, promotion.maxPayout);
    } else if (promotion.name.includes('% Off')) {
      const discountPercent = parseFloat(promotion.name.match(/(\d+)%/)?.[1] || '0');
      return (devicePrice * discountPercent / 100);
    }
    
    return tradeInValue;
  };

  const getDevicePrice = (deviceId) => {
    // This would typically come from a device database
    const devicePrices = {
      'iphone-16': 799,
      'iphone-16-plus': 899,
      'iphone-16-pro': 999,
      'iphone-16-pro-max': 1199,
      'galaxy-s25': 799,
      'galaxy-s25-plus': 999,
      'galaxy-s25-ultra': 1299,
      'pixel-10': 699,
      'pixel-10-pro': 899,
      'pixel-10-pro-xl': 1099
    };
    return devicePrices[deviceId] || 0;
  };

  const validatePromotions = () => {
    const errors = [];
    const selectedPromos = Object.values(selectedPromotions).filter(p => p !== null);
    
    // Check promotion limits
    const { errors: limitErrors } = checkPromotionLimits(selectedPromos);
    errors.push(...limitErrors);
    
    // Check stackability
    const stackabilityErrors = checkStackability(selectedPromos);
    errors.push(...stackabilityErrors);
    
    // Check rate plan eligibility
    selectedPromos.forEach(promo => {
      const promotion = promotions.find(p => p.id === promo.promotionId);
      if (promotion) {
        const planId = quoteData.plans?.[promo.lineIndex];
        if (planId && !isRatePlanEligible(promo.promotionId, planId)) {
          errors.push(`${promotion.name} is not eligible with the selected plan`);
        }
      }
    });
    
    // Check AAL requirements
    selectedPromos.forEach(promo => {
      const promotion = promotions.find(p => p.id === promo.promotionId);
      if (promotion) {
        if (promotion.aal === 'Y' && !isNewLine(promo.lineIndex)) {
          errors.push(`${promotion.name} requires a new line`);
        }
        if (promotion.aal === 'Y+P' && (!isNewLine(promo.lineIndex) || !hasPortIn(promo.lineIndex))) {
          errors.push(`${promotion.name} requires a new line with port-in`);
        }
      }
    });
    
    return errors;
  };

  const isNewLine = (lineIndex) => {
    // This would typically check against existing account data
    return true; // For demo purposes, assume all lines are new
  };

  const hasPortIn = (lineIndex) => {
    return portInData?.[lineIndex]?.hasPortIn || false;
  };

  const getAvailablePromotions = (lineIndex) => {
    const device = quoteData.devices?.[lineIndex];
    if (!device) return [];
    
    let availablePromotions = getPromotionsForDevice(device);
    
    // Filter by search term
    if (searchTerm) {
      availablePromotions = availablePromotions.filter(promo =>
        promo.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        promo.internalId.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    // Filter by category
    if (filterCategory !== 'all') {
      availablePromotions = availablePromotions.filter(promo =>
        getPromotionCategory(promo.id) === filterCategory
      );
    }
    
    // Sort by status and payout
    return availablePromotions.sort((a, b) => {
      if (a.status !== b.status) {
        return a.status === 'active' ? -1 : 1;
      }
      return b.maxPayout - a.maxPayout;
    });
  };

  const getPromotionDisplayName = (promotionId) => {
    const promo = promotions.find(p => p.id === promotionId);
    return promo ? promo.name : 'Unknown Promotion';
  };

  const getPromotionStatus = (promotionId) => {
    const promo = promotions.find(p => p.id === promotionId);
    return promo ? promo.status : 'unknown';
  };

  const getPromotionCategory = (promotionId) => {
    const promo = promotions.find(p => p.id === promotionId);
    if (!promo) return 'Unknown';
    
    if (promo.name.includes('iPhone')) return 'iPhone';
    if (promo.name.includes('Galaxy') || promo.name.includes('Samsung')) return 'Samsung';
    if (promo.name.includes('Pixel') || promo.name.includes('Google')) return 'Google';
    if (promo.name.includes('Motorola') || promo.name.includes('Razr')) return 'Motorola';
    if (promo.name.includes('Android')) return 'Android';
    return 'General';
  };

  const getCategoryColor = (category) => {
    const colors = {
      'iPhone': '#007AFF',
      'Samsung': '#1E9E9E',
      'Google': '#4285F4',
      'Motorola': '#FF6B35',
      'Android': '#4CAF50',
      'General': '#9E9E9E'
    };
    return colors[category] || '#9E9E9E';
  };

  const getTradeInDevices = () => {
    // This would typically come from a comprehensive device database
    return [
      { id: 'iphone-15-pro-max', name: 'iPhone 15 Pro Max', category: 'iPhone' },
      { id: 'iphone-15-pro', name: 'iPhone 15 Pro', category: 'iPhone' },
      { id: 'iphone-15', name: 'iPhone 15', category: 'iPhone' },
      { id: 'iphone-14-pro-max', name: 'iPhone 14 Pro Max', category: 'iPhone' },
      { id: 'iphone-14-pro', name: 'iPhone 14 Pro', category: 'iPhone' },
      { id: 'iphone-14', name: 'iPhone 14', category: 'iPhone' },
      { id: 'galaxy-s24-ultra', name: 'Galaxy S24 Ultra', category: 'Samsung' },
      { id: 'galaxy-s24-plus', name: 'Galaxy S24+', category: 'Samsung' },
      { id: 'galaxy-s24', name: 'Galaxy S24', category: 'Samsung' },
      { id: 'pixel-9-pro', name: 'Pixel 9 Pro', category: 'Google' },
      { id: 'pixel-9', name: 'Pixel 9', category: 'Google' },
      { id: 'pixel-8-pro', name: 'Pixel 8 Pro', category: 'Google' },
      { id: 'pixel-8', name: 'Pixel 8', category: 'Google' }
    ];
  };

  const getTotalSavings = () => {
    return Object.values(selectedPromotions)
      .filter(p => p !== null)
      .reduce((total, promo) => total + (promo.savings || 0), 0);
  };

  const canProceed = () => {
    return validationErrors.length === 0;
  };

  const categories = ['all', 'iPhone', 'Samsung', 'Google', 'Motorola', 'Android', 'General'];

  return (
    <div className="form-section">
      <div className="section-title">
        <Gift size={24} />
        Promotions Selection
      </div>
      
      <div style={{
        background: '#f8f9fa',
        border: '1px solid #e0e0e0',
        borderRadius: '8px',
        padding: '15px',
        marginBottom: '20px',
        color: '#856404'
      }}>
        <AlertCircle size={20} style={{ marginRight: '10px' }} />
        Promotions are optional but can save you hundreds of dollars. Select promotions for each line to maximize your savings.
      </div>

      {/* Search and Filter Controls */}
      <div style={{
        display: 'flex',
        gap: '15px',
        marginBottom: '20px',
        flexWrap: 'wrap',
        alignItems: 'center'
      }}>
        <div style={{ position: 'relative', flex: '1', minWidth: '200px' }}>
          <Search size={20} style={{
            position: 'absolute',
            left: '12px',
            top: '50%',
            transform: 'translateY(-50%)',
            color: '#666'
          }} />
          <input
            type="text"
            placeholder="Search promotions..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{
              width: '100%',
              padding: '12px 12px 12px 40px',
              border: '2px solid #e0e0e0',
              borderRadius: '8px',
              fontSize: '16px',
              background: 'white'
            }}
          />
        </div>
        
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <Filter size={20} color="#666" />
          <select
            value={filterCategory}
            onChange={(e) => setFilterCategory(e.target.value)}
            style={{
              padding: '12px',
              border: '2px solid #e0e0e0',
              borderRadius: '8px',
              fontSize: '16px',
              background: 'white',
              minWidth: '120px'
            }}
          >
            {categories.map(category => (
              <option key={category} value={category}>
                {category === 'all' ? 'All Categories' : category}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Total Savings Summary */}
      {Object.values(selectedPromotions).some(p => p !== null) && (
        <div style={{
          background: 'linear-gradient(135deg, #4CAF50, #45a049)',
          color: 'white',
          padding: '20px',
          borderRadius: '12px',
          marginBottom: '20px',
          textAlign: 'center'
        }}>
          <div style={{ fontSize: '18px', fontWeight: '600', marginBottom: '5px' }}>
            Total Estimated Savings
          </div>
          <div style={{ fontSize: '32px', fontWeight: '700' }}>
            ${getTotalSavings().toFixed(2)}
          </div>
          <div style={{ fontSize: '14px', opacity: 0.9 }}>
            Based on selected promotions and trade-in values
          </div>
        </div>
      )}

      {/* Line-by-Line Promotion Selection */}
      {Array.from({ length: lines }, (_, lineIndex) => (
        <div key={lineIndex} className="card" style={{ marginBottom: '20px' }}>
          <div
            style={{
              padding: '20px',
              cursor: 'pointer',
              background: expandedLines[lineIndex] ? '#E20074' : '#f8f9fa',
              color: expandedLines[lineIndex] ? 'white' : '#333',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              transition: 'all 0.3s ease'
            }}
            onClick={() => toggleLineExpansion(lineIndex)}
          >
            <div>
              <strong>Line {lineIndex + 1}</strong>
              {selectedPromotions[lineIndex] && (
                <div style={{ fontSize: '14px', marginTop: '4px' }}>
                  {getPromotionDisplayName(selectedPromotions[lineIndex].promotionId)}
                  {selectedPromotions[lineIndex].savings > 0 && (
                    <span style={{ marginLeft: '8px', fontWeight: '600' }}>
                      - ${selectedPromotions[lineIndex].savings.toFixed(2)} savings
                    </span>
                  )}
                </div>
              )}
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              {selectedPromotions[lineIndex] && (
                <CheckCircle size={20} color="#4CAF50" />
              )}
              <span>{expandedLines[lineIndex] ? '▼' : '▶'}</span>
            </div>
          </div>

          {expandedLines[lineIndex] && (
            <div style={{ padding: '20px', borderTop: '1px solid #e0e0e0' }}>
              {/* Promotion Selection */}
              <div style={{ marginBottom: '20px' }}>
                <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600' }}>
                  Select Promotion (Optional)
                </label>
                <select
                  value={selectedPromotions[lineIndex]?.promotionId || ''}
                  onChange={(e) => handlePromotionChange(lineIndex, e.target.value)}
                  style={{
                    width: '100%',
                    padding: '12px',
                    border: '2px solid #e0e0e0',
                    borderRadius: '8px',
                    fontSize: '16px',
                    background: 'white'
                  }}
                >
                  <option value="">No Promotion</option>
                  {getAvailablePromotions(lineIndex).map(promo => (
                    <option key={promo.id} value={promo.id}>
                      {promo.name} - ${promo.maxPayout} max payout
                    </option>
                  ))}
                </select>
              </div>

              {/* Trade-in Calculator */}
              {selectedPromotions[lineIndex] && (
                <div style={{
                  background: '#f8f9fa',
                  border: '1px solid #e0e0e0',
                  borderRadius: '8px',
                  padding: '15px',
                  marginBottom: '15px'
                }}>
                  <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    marginBottom: '10px'
                  }}>
                    <div style={{ fontWeight: '600', display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <Calculator size={16} />
                      Trade-in Calculator
                    </div>
                    <button
                      onClick={() => toggleTradeInCalculator(lineIndex)}
                      style={{
                        background: 'transparent',
                        border: '1px solid #E20074',
                        color: '#E20074',
                        padding: '6px 12px',
                        borderRadius: '6px',
                        fontSize: '12px',
                        cursor: 'pointer'
                      }}
                    >
                      {showTradeInCalculator[lineIndex] ? 'Hide' : 'Show'} Calculator
                    </button>
                  </div>

                  {showTradeInCalculator[lineIndex] && (
                    <div>
                      <label style={{ display: 'block', marginBottom: '8px', fontSize: '14px' }}>
                        Select Trade-in Device
                      </label>
                      <select
                        value={tradeInDevices[lineIndex] || ''}
                        onChange={(e) => handleTradeInChange(lineIndex, e.target.value)}
                        style={{
                          width: '100%',
                          padding: '10px',
                          border: '1px solid #e0e0e0',
                          borderRadius: '6px',
                          fontSize: '14px',
                          background: 'white',
                          marginBottom: '10px'
                        }}
                      >
                        <option value="">Select trade-in device</option>
                        {getTradeInDevices().map(device => (
                          <option key={device.id} value={device.id}>
                            {device.name}
                          </option>
                        ))}
                      </select>

                      {tradeInDevices[lineIndex] && (
                        <div style={{
                          background: '#e8f5e8',
                          border: '1px solid #4CAF50',
                          borderRadius: '6px',
                          padding: '10px',
                          fontSize: '14px'
                        }}>
                          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                            <span>Trade-in Value:</span>
                            <span style={{ fontWeight: '600', color: '#2E7D32' }}>
                              ${calculateTradeInValue(selectedPromotions[lineIndex].promotionId, tradeInDevices[lineIndex])}
                            </span>
                          </div>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              )}

              {/* Promotion Details */}
              {selectedPromotions[lineIndex] && (
                <div style={{
                  background: '#f8f9fa',
                  border: '1px solid #e0e0e0',
                  borderRadius: '8px',
                  padding: '15px'
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '10px' }}>
                    <div style={{
                      background: getCategoryColor(getPromotionCategory(selectedPromotions[lineIndex].promotionId)),
                      color: 'white',
                      padding: '4px 8px',
                      borderRadius: '4px',
                      fontSize: '12px',
                      fontWeight: 'bold'
                    }}>
                      {getPromotionCategory(selectedPromotions[lineIndex].promotionId)}
                    </div>
                    <div style={{
                      background: getPromotionStatus(selectedPromotions[lineIndex].promotionId) === 'active' ? '#4CAF50' : '#FF9800',
                      color: 'white',
                      padding: '4px 8px',
                      borderRadius: '4px',
                      fontSize: '12px',
                      fontWeight: 'bold'
                    }}>
                      {getPromotionStatus(selectedPromotions[lineIndex].promotionId).toUpperCase()}
                    </div>
                    {selectedPromotions[lineIndex].savings > 0 && (
                      <div style={{
                        background: '#E20074',
                        color: 'white',
                        padding: '4px 8px',
                        borderRadius: '4px',
                        fontSize: '12px',
                        fontWeight: 'bold',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '4px'
                      }}>
                        <DollarSign size={12} />
                        ${selectedPromotions[lineIndex].savings.toFixed(2)} SAVINGS
                      </div>
                    )}
                  </div>
                  
                  <div style={{ fontSize: '14px', color: '#666' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '5px' }}>
                      <span><strong>Max Payout:</strong></span>
                      <span>${promotions.find(p => p.id === selectedPromotions[lineIndex].promotionId)?.maxPayout || 0}</span>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '5px' }}>
                      <span><strong>Account Limit:</strong></span>
                      <span>{promotions.find(p => p.id === selectedPromotions[lineIndex].promotionId)?.limit || 0} per account</span>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '5px' }}>
                      <span><strong>Requirement:</strong></span>
                      <span>
                        {promotions.find(p => p.id === selectedPromotions[lineIndex].promotionId)?.aal === 'Y' ? 'New Line' :
                         promotions.find(p => p.id === selectedPromotions[lineIndex].promotionId)?.aal === 'Y+P' ? 'New Line + Port' :
                         'Upgrade'}
                      </span>
                    </div>
                    {promotions.find(p => p.id === selectedPromotions[lineIndex].promotionId)?.notStackableOnSameLine?.length > 0 && (
                      <div style={{ marginTop: '8px', padding: '8px', background: '#fff3cd', borderRadius: '4px', fontSize: '12px' }}>
                        <strong>⚠️ Not Stackable:</strong> {promotions.find(p => p.id === selectedPromotions[lineIndex].promotionId).notStackableOnSameLine.join(', ')}
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      ))}

      {/* Validation Errors */}
      {validationErrors.length > 0 && (
        <div style={{
          background: '#f8f9fa',
          border: '1px solid #e74c3c',
          borderRadius: '8px',
          padding: '15px',
          marginBottom: '20px',
          color: '#e74c3c'
        }}>
          <AlertCircle size={20} style={{ marginRight: '10px' }} />
          <div>
            <strong>Validation Errors:</strong>
            <ul style={{ marginTop: '8px', paddingLeft: '20px' }}>
              {validationErrors.map((error, index) => (
                <li key={index}>{error}</li>
              ))}
            </ul>
          </div>
        </div>
      )}

      {/* Navigation */}
      <div style={{ display: 'flex', gap: '15px', justifyContent: 'space-between' }}>
        <button className="button-secondary" onClick={onPrev}>
          Back to Equipment Credit
        </button>
        <button 
          className="button" 
          onClick={handleNext}
          disabled={!canProceed()}
        >
          Continue to Choose Your Number
        </button>
      </div>
    </div>
  );
};

export default PromotionsSelection;