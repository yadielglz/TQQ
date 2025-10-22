import React, { useState, useCallback, useMemo } from 'react';
import { Gift, Star, CheckCircle, AlertCircle, ArrowLeft, ArrowRight, Info } from 'lucide-react';
import { promotions, validatePromotionEligibility, checkPromotionLimits, checkStackability } from '../data/promotions';
import { devices } from '../data/devices';

const PromotionsSelection = ({ 
  lines, 
  devices: selectedDevices, 
  plans, 
  portInData,
  promotions: selectedPromotions, 
  onPromotionsChange, 
  onNext, 
  onPrev 
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [showValidationErrors, setShowValidationErrors] = useState(false);

  // Get available categories
  const categories = useMemo(() => {
    const categorySet = new Set();
    promotions.forEach(promo => categorySet.add(promo.category));
    return Array.from(categorySet).sort();
  }, []);

  // Filter promotions based on search and category
  const filteredPromotions = useMemo(() => {
    let filtered = promotions.filter(promo => promo.status === 'active');
    
    if (selectedCategory !== 'all') {
      filtered = filtered.filter(promo => promo.category === selectedCategory);
    }
    
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(promo => 
        promo.name.toLowerCase().includes(query) ||
        promo.category.toLowerCase().includes(query)
      );
    }
    
    return filtered;
  }, [selectedCategory, searchQuery]);

  // Get eligible promotions for each line
  const getEligiblePromotions = useCallback((lineIndex) => {
    const deviceId = selectedDevices[lineIndex];
    const planId = plans[lineIndex];
    const portInInfo = portInData[lineIndex];
    
    if (!deviceId || !planId) return [];
    
    const device = devices[deviceId];
    if (!device) return [];
    
    return filteredPromotions.filter(promo => {
      const validation = validatePromotionEligibility(
        promo.id,
        deviceId,
        planId,
        portInInfo ? 'new' : 'upgrade',
        !!portInInfo
      );
      return validation.eligible;
    });
  }, [filteredPromotions, selectedDevices, plans, portInData]);

  const handlePromotionToggle = useCallback((lineIndex, promotionId) => {
    const newPromotions = { ...selectedPromotions };
    
    if (!newPromotions[lineIndex]) {
      newPromotions[lineIndex] = [];
    }
    
    const linePromotions = newPromotions[lineIndex];
    const isSelected = linePromotions.includes(promotionId);
    
    if (isSelected) {
      newPromotions[lineIndex] = linePromotions.filter(id => id !== promotionId);
    } else {
      newPromotions[lineIndex] = [...linePromotions, promotionId];
    }
    
    onPromotionsChange(newPromotions);
  }, [selectedPromotions, onPromotionsChange]);

  const validateAllPromotions = useCallback(() => {
    const allSelectedPromotions = [];
    
    Object.keys(selectedPromotions).forEach(lineIndex => {
      selectedPromotions[lineIndex].forEach(promoId => {
        allSelectedPromotions.push({
          promotionId: promoId,
          lineIndex: parseInt(lineIndex)
        });
      });
    });
    
    const limitsCheck = checkPromotionLimits(allSelectedPromotions);
    const stackabilityCheck = checkStackability(allSelectedPromotions);
    
    return {
      valid: limitsCheck.valid && stackabilityCheck.length === 0,
      errors: [...limitsCheck.errors, ...stackabilityCheck]
    };
  }, [selectedPromotions]);

  const getPromotionSavings = useCallback((promotionId) => {
    const promotion = promotions.find(p => p.id === promotionId);
    return promotion ? promotion.maxPayout : 0;
  }, []);

  const getTotalSavings = useCallback(() => {
    let total = 0;
    Object.values(selectedPromotions).forEach(linePromotions => {
      linePromotions.forEach(promoId => {
        total += getPromotionSavings(promoId);
      });
    });
    return total;
  }, [selectedPromotions, getPromotionSavings]);

  const handleNext = useCallback(() => {
    const validation = validateAllPromotions();
    
    if (!validation.valid) {
      setShowValidationErrors(true);
      return;
    }
    
    setIsLoading(true);
    setTimeout(() => {
      onNext();
      setIsLoading(false);
    }, 300);
  }, [validateAllPromotions, onNext]);

  const handlePrev = useCallback(() => {
    setIsLoading(true);
    setTimeout(() => {
      onPrev();
      setIsLoading(false);
    }, 300);
  }, [onPrev]);

  const renderPromotionCard = (promotion, lineIndex) => {
    const isSelected = selectedPromotions[lineIndex]?.includes(promotion.id) || false;
    const deviceId = selectedDevices[lineIndex];
    const planId = plans[lineIndex];
    const portInInfo = portInData[lineIndex];
    
    const validation = validatePromotionEligibility(
      promotion.id,
      deviceId,
      planId,
      portInInfo ? 'new' : 'upgrade',
      !!portInInfo
    );

    return (
      <div
        key={promotion.id}
        onClick={() => validation.eligible && handlePromotionToggle(lineIndex, promotion.id)}
        style={{
          padding: '20px',
          border: `2px solid ${isSelected ? '#E20074' : validation.eligible ? '#e0e0e0' : '#ff6b6b'}`,
          borderRadius: '12px',
          background: isSelected ? '#fdf2f8' : validation.eligible ? 'white' : '#fff5f5',
          cursor: validation.eligible ? 'pointer' : 'not-allowed',
          transition: 'all 0.3s ease',
          position: 'relative',
          opacity: validation.eligible ? 1 : 0.6
        }}
      >
        {/* Selection Indicator */}
        {isSelected && (
          <div style={{
            position: 'absolute',
            top: '15px',
            right: '15px',
            background: '#E20074',
            borderRadius: '50%',
            width: '24px',
            height: '24px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'white'
          }}>
            <CheckCircle size={16} />
          </div>
        )}

        {/* Promotion Info */}
        <div style={{ marginBottom: '15px' }}>
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'flex-start',
          marginBottom: '8px'
        }}>
            <h3 style={{
              fontSize: '16px',
              fontWeight: '600',
              color: '#333',
              margin: 0,
              flex: 1
            }}>
              {promotion.name}
            </h3>
            <div style={{
              fontSize: '18px',
              fontWeight: '700',
              color: '#E20074'
            }}>
              ${promotion.maxPayout}
          </div>
        </div>

          <div style={{
            fontSize: '12px',
            color: '#666',
            marginBottom: '8px',
            textTransform: 'uppercase',
            fontWeight: '600'
          }}>
            {promotion.category}
          </div>
          
          <div style={{
            fontSize: '12px',
            color: '#666',
            marginBottom: '8px'
          }}>
            {promotion.redemption.ratePlan}
          </div>
        </div>

        {/* Requirements */}
          <div style={{
            fontSize: '12px',
          color: '#666',
          marginBottom: '10px'
          }}>
          <div style={{ marginBottom: '4px' }}>
            <strong>Requirements:</strong>
          </div>
          <ul style={{ margin: 0, paddingLeft: '15px' }}>
            {promotion.aal === 'Y' && <li>New line required</li>}
            {promotion.aal === 'N' && <li>Upgrade only</li>}
            {promotion.aal === 'Y+P' && <li>New line + port-in required</li>}
            {promotion.redemption.tradeRequired && <li>Trade-in required</li>}
          </ul>
      </div>

        {/* Validation Status */}
        {!validation.eligible && (
          <div style={{
            padding: '8px',
            background: '#ff6b6b',
            borderRadius: '6px',
            color: 'white',
              fontSize: '12px',
            display: 'flex',
            alignItems: 'center',
            gap: '4px'
          }}>
            <AlertCircle size={12} />
            {validation.reason}
          </div>
        )}
      </div>
    );
  };

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
          <Gift size={24} color="#E20074" />
          <h2 style={{ fontSize: '24px', fontWeight: '700', color: '#E20074', margin: 0 }}>
            Promotions & Savings
          </h2>
        </div>
        <p style={{ color: '#666', fontSize: '14px', margin: 0, lineHeight: '1.4' }}>
          Select promotions for each line to maximize your savings. Promotions are automatically validated based on your device and plan selections.
        </p>
      </div>

      {/* Search and Filters */}
      <div style={{
        padding: '20px',
        borderBottom: '1px solid #e0e0e0',
        background: 'white'
      }}>
        <div style={{ display: 'flex', gap: '10px', marginBottom: '15px' }}>
          <div style={{ flex: 1, position: 'relative' }}>
            <input
              type="text"
              placeholder="Search promotions..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              style={{
                width: '100%',
                padding: '12px 16px',
                border: '2px solid #e0e0e0',
                borderRadius: '8px',
                fontSize: '14px',
                outline: 'none',
                transition: 'border-color 0.3s ease'
              }}
              onFocus={(e) => e.target.style.borderColor = '#E20074'}
              onBlur={(e) => e.target.style.borderColor = '#e0e0e0'}
            />
        </div>
        <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
          style={{
              padding: '12px 16px',
              border: '2px solid #e0e0e0',
              borderRadius: '8px',
            fontSize: '14px',
              background: 'white',
              minWidth: '150px'
            }}
          >
            <option value="all">All Categories</option>
            {categories.map(category => (
              <option key={category} value={category}>{category}</option>
          ))}
        </select>
        </div>
      </div>

      {/* Content */}
      <div style={{ flex: 1, padding: '20px' }}>
        {/* Line-by-line promotion selection */}
        {Array.from({ length: lines }, (_, lineIndex) => {
          const eligiblePromotions = getEligiblePromotions(lineIndex);
          const linePromotions = selectedPromotions[lineIndex] || [];
          
          return (
            <div key={lineIndex} style={{ marginBottom: '30px' }}>
              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginBottom: '15px',
                padding: '15px',
                background: '#f8f9fa',
                borderRadius: '8px',
                border: '1px solid #e0e0e0'
              }}>
                <h3 style={{ fontSize: '16px', fontWeight: '600', color: '#333', margin: 0 }}>
                  Line {lineIndex + 1} Promotions
                </h3>
                <div style={{ fontSize: '14px', color: '#666' }}>
                  {linePromotions.length} selected • {eligiblePromotions.length} eligible
                </div>
              </div>

              {eligiblePromotions.length > 0 ? (
                <div style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
                  gap: '15px'
                }}>
                  {eligiblePromotions.map(promotion => renderPromotionCard(promotion, lineIndex))}
                </div>
              ) : (
                <div style={{
                  padding: '20px',
                  background: '#f8f9fa',
                  borderRadius: '8px',
                  border: '1px solid #e0e0e0',
                  textAlign: 'center'
                }}>
                  <Info size={32} color="#666" style={{ marginBottom: '10px' }} />
                  <p style={{ fontSize: '14px', color: '#666', margin: 0 }}>
                    No eligible promotions found for this line. Make sure you've selected a device and plan.
                  </p>
                </div>
              )}

              {/* Line Summary */}
              {linePromotions.length > 0 && (
        <div style={{
                  marginTop: '15px',
                  padding: '15px',
                  background: '#e8f5e8',
          borderRadius: '8px',
                  border: '1px solid #4CAF50'
                }}>
                  <div style={{ fontSize: '14px', color: '#2e7d32', fontWeight: '600', marginBottom: '5px' }}>
                    Selected Promotions for Line {lineIndex + 1}
                  </div>
                  <div style={{ fontSize: '12px', color: '#2e7d32' }}>
                    {linePromotions.map(promoId => {
                      const promo = promotions.find(p => p.id === promoId);
                      return promo ? `${promo.name} ($${promo.maxPayout})` : '';
                    }).join(', ')}
                  </div>
                </div>
              )}
            </div>
          );
        })}

        {/* Validation Errors */}
        {showValidationErrors && (
          <div style={{
            background: '#ff6b6b',
            padding: '20px',
            borderRadius: '8px',
            border: '1px solid #ff6b6b',
            marginBottom: '20px'
          }}>
            <h3 style={{ fontSize: '16px', fontWeight: '600', marginBottom: '10px', color: 'white' }}>
              Promotion Validation Errors
            </h3>
            <ul style={{ fontSize: '14px', color: 'white', margin: 0, paddingLeft: '20px', lineHeight: '1.5' }}>
              {validateAllPromotions().errors.map((error, index) => (
                <li key={index}>{error}</li>
              ))}
            </ul>
          </div>
        )}

        {/* Total Savings Summary */}
        {Object.keys(selectedPromotions).length > 0 && (
          <div style={{
            background: '#f8f9fa',
            padding: '20px',
            borderRadius: '8px',
            border: '1px solid #e0e0e0',
            marginTop: '20px'
          }}>
            <h3 style={{ fontSize: '16px', fontWeight: '600', marginBottom: '10px', color: '#333' }}>
              Promotion Savings Summary
            </h3>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '10px' }}>
              <div>
                <div style={{ fontSize: '12px', color: '#666' }}>Total Promotion Savings</div>
                <div style={{ fontSize: '24px', fontWeight: '700', color: '#4CAF50' }}>
                  ${getTotalSavings()}
                </div>
              </div>
              <div>
                <div style={{ fontSize: '12px', color: '#666' }}>Promotions Selected</div>
                <div style={{ fontSize: '16px', fontWeight: '600', color: '#333' }}>
                  {Object.values(selectedPromotions).reduce((total, linePromos) => total + linePromos.length, 0)}
                </div>
              </div>
            </div>
        </div>
      )}
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
          onClick={handlePrev}
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
          Back to Port-In
        </button>
        
        <div style={{ fontSize: '14px', color: '#666', textAlign: 'center' }}>
          {Object.values(selectedPromotions).reduce((total, linePromos) => total + linePromos.length, 0)} promotions selected
        </div>

        <button
          onClick={handleNext}
          disabled={isLoading}
          style={{
            padding: '12px 24px',
            border: '2px solid #E20074',
            borderRadius: '8px',
            background: isLoading ? '#f5f5f5' : '#E20074',
            color: isLoading ? '#999' : 'white',
            fontSize: '16px',
            cursor: isLoading ? 'not-allowed' : 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            transition: 'all 0.3s ease',
            opacity: isLoading ? 0.5 : 1
          }}
        >
          {isLoading ? 'Loading...' : 'Continue to Protection'}
          <ArrowRight size={16} />
        </button>
      </div>
    </div>
  );
};

export default PromotionsSelection;