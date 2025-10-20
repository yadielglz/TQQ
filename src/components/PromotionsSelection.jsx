import React, { useState, useEffect, useRef } from 'react';
import { Gift, Star, AlertCircle, CheckCircle } from 'lucide-react';
import { promotions, getPromotionsForDevice, getPromotionsForLineType, getTradeInValueForPromotion, isRatePlanEligible, checkPromotionLimits, checkStackability } from '../data/promotions';

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
  const hasInitialized = useRef(false);

  // Initialize promotions data only when lines change
  useEffect(() => {
    const initialPromotions = {};
    for (let i = 0; i < lines; i++) {
      initialPromotions[i] = null;
    }
    setSelectedPromotions(initialPromotions);
    hasInitialized.current = true;
  }, [lines]);

  const handleNext = () => {
    // Don't call onPromotionsChange to avoid infinite loop
    // onPromotionsChange(selectedPromotions);
    onNext();
  };

  const handlePromotionChange = (lineIndex, promotionId) => {
    const newPromotions = { ...selectedPromotions };
    newPromotions[lineIndex] = promotionId ? { promotionId, lineIndex } : null;
    setSelectedPromotions(newPromotions);
    
    // Clear validation errors when user makes changes
    setValidationErrors([]);
  };

  const toggleLineExpansion = (lineIndex) => {
    setExpandedLines(prev => ({
      ...prev,
      [lineIndex]: !prev[lineIndex]
    }));
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
    
    // Determine category based on promotion name
    if (promo.name.includes('iPhone 16') || promo.name.includes('iPhone 15') || promo.name.includes('iPhone 14') || promo.name.includes('iPhone 13') || promo.name.includes('iPhone SE')) {
      return 'iPhone';
    } else if (promo.name.includes('Galaxy') || promo.name.includes('Samsung')) {
      return 'Samsung';
    } else if (promo.name.includes('Pixel') || promo.name.includes('Google')) {
      return 'Google';
    } else if (promo.name.includes('Motorola') || promo.name.includes('Razr')) {
      return 'Motorola';
    } else if (promo.name.includes('Android')) {
      return 'Android';
    } else {
      return 'General';
    }
  };

  const getCategoryColor = (category) => {
    const colors = {
      'iPhone': '#007AFF',
      'Samsung': '#1E88E5',
      'Google': '#4285F4',
      'Motorola': '#FF6B35',
      'Android': '#4CAF50',
      'General': '#9E9E9E'
    };
    return colors[category] || '#9E9E9E';
  };

  const validatePromotions = () => {
    const errors = [];
    const selectedPromos = Object.values(selectedPromotions).filter(p => p !== null);
    
    // Check limits
    const { errors: limitErrors } = checkPromotionLimits(selectedPromos);
    errors.push(...limitErrors);
    
    // Check stackability
    const { errors: stackErrors } = checkStackability(selectedPromos);
    errors.push(...stackErrors);
    
    return errors;
  };

  const canProceed = () => {
    // Always allow proceeding - promotions are optional
    return true;
  };

  const getAvailablePromotions = (lineIndex) => {
    const device = quoteData.devices?.[lineIndex];
    if (!device) return [];
    
    return getPromotionsForDevice(device);
  };

  const isPromotionEligible = (promotionId, lineIndex) => {
    const promo = promotions.find(p => p.id === promotionId);
    if (!promo) return false;
    
    const device = quoteData.devices?.[lineIndex];
    if (!device) return false;
    
    // Check device eligibility
    if (!promo.eligibleDevices.includes(device)) return false;
    
    // Check AAL eligibility
    const isPortInRequired = portInData?.[lineIndex]?.type === 'port-in';
    if (!isAalEligible(promo.aal, isPortInRequired)) return false;
    
    // Check rate plan eligibility
    const plan = quoteData.plans?.[lineIndex];
    if (plan && !isRatePlanEligible(plan, promo.redemption.ratePlan)) return false;
    
    return true;
  };

  const isAalEligible = (aalType, isPortInRequired) => {
    if (aalType === 'Y') return true; // New line
    if (aalType === 'Y+P') return isPortInRequired; // New line + port required
    if (aalType === 'N') return false; // Upgrade only
    return false;
  };

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
        Promotions are optional. You can skip this step if you don't want to apply any promotions.
      </div>

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
              <div style={{ marginBottom: '15px' }}>
                <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600' }}>
                  Select Promotion (Optional)
                </label>
                <select
                  value={selectedPromotions[lineIndex]?.promotionId || ''}
                  onChange={(e) => handlePromotionChange(lineIndex, e.target.value)}
                  style={{
                    width: '100%',
                    padding: '12px',
                    border: '1px solid #e0e0e0',
                    borderRadius: '8px',
                    fontSize: '16px',
                    background: 'white'
                  }}
                >
                  <option value="">No Promotion</option>
                  {getAvailablePromotions(lineIndex).map(promo => (
                    <option key={promo.id} value={promo.id}>
                      {promo.name} - {promo.status === 'active' ? 'Active' : 'Inactive'}
                    </option>
                  ))}
                </select>
              </div>

              {selectedPromotions[lineIndex] && (
                <div style={{
                  background: '#f8f9fa',
                  border: '1px solid #e0e0e0',
                  borderRadius: '8px',
                  padding: '15px',
                  marginTop: '15px'
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
                  </div>
                  
                  <div style={{ fontSize: '14px', color: '#666' }}>
                    <div><strong>Max Payout:</strong> ${promotions.find(p => p.id === selectedPromotions[lineIndex].promotionId)?.maxPayout || 0}</div>
                    <div><strong>Limit:</strong> {promotions.find(p => p.id === selectedPromotions[lineIndex].promotionId)?.limit || 0} per account</div>
                    {promotions.find(p => p.id === selectedPromotions[lineIndex].promotionId)?.notStackableOnSameLine && (
                      <div><strong>Not Stackable:</strong> {promotions.find(p => p.id === selectedPromotions[lineIndex].promotionId).notStackableOnSameLine.join(', ')}</div>
                    )}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      ))}

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

      <div style={{ display: 'flex', gap: '15px', justifyContent: 'space-between' }}>
        <button className="button secondary" onClick={onPrev}>
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