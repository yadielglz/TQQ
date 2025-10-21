import React, { useState, useEffect, useRef } from 'react';
import { 
  Gift, 
  AlertCircle, 
  CheckCircle, 
  Calculator, 
  Search, 
  Filter, 
  Star, 
  DollarSign, 
  Users, 
  Clock,
  ChevronDown,
  ChevronUp,
  X,
  Info,
  Zap,
  Shield,
  Award
} from 'lucide-react';
import { 
  promotions, 
  getPromotionsForDevice, 
  getTradeInValueForPromotion, 
  isRatePlanEligible, 
  checkPromotionLimits, 
  checkStackability,
  validatePromotionEligibility,
  getPromotionSummary,
  getPromotionCategory
} from '../data/promotions';
import { usePromotionManager } from '../utils/promotionManager';

const PromotionsSelection = ({ 
  lines, 
  quoteData, 
  portInData,
  onPromotionsChange, 
  onNext, 
  onPrev 
}) => {
  const {
    manager,
    initializeLine,
    updateLineData,
    getAvailablePromotions,
    selectPromotion,
    removePromotion,
    updateTradeInDevice,
    validateAllPromotions,
    getLinePromotionSummary,
    getAllPromotionsSummary,
    calculateTotalSavings,
    getPromotionStats
  } = usePromotionManager();

  const [expandedLines, setExpandedLines] = useState({});
  const [validationErrors, setValidationErrors] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState('all');
  const [showTradeInCalculator, setShowTradeInCalculator] = useState({});
  const [tradeInDevices, setTradeInDevices] = useState({});
  const [promotionStats, setPromotionStats] = useState({});
  const hasInitialized = useRef(false);

  // Initialize promotion manager with line data
  useEffect(() => {
    if (lines && quoteData && !hasInitialized.current) {
      // Initialize each line with its data
      for (let i = 0; i < lines; i++) {
        const lineData = {
          deviceId: quoteData.devices?.[i] || null,
          planId: quoteData.plans?.[i] || null,
          lineType: 'new', // Default to new line
          hasPortIn: portInData?.[i]?.hasPortIn || false,
          isNewLine: true
        };
        initializeLine(i, lineData);
      }
      
      hasInitialized.current = true;
      updatePromotionStats();
    }
  }, [lines, quoteData, portInData]);

  // Update promotion stats whenever promotions change
  const updatePromotionStats = () => {
    const stats = getPromotionStats();
    setPromotionStats(stats);
  };

  const handleNext = () => {
    // Validate all promotions
    const validation = validateAllPromotions();
    if (!validation.valid) {
      setValidationErrors(validation.errors);
      return;
    }

    // Export promotion data and pass to parent
    const promotionData = manager.exportPromotionData();
    onPromotionsChange(promotionData);
    onNext();
  };

  const handlePromotionChange = (lineIndex, promotionId) => {
    const result = selectPromotion(lineIndex, promotionId, tradeInDevices[lineIndex] || '');
    
    if (result.success) {
      setValidationErrors([]);
      updatePromotionStats();
    } else {
      setValidationErrors([result.error]);
    }
  };

  const handleTradeInChange = (lineIndex, deviceId) => {
    const newTradeIns = { ...tradeInDevices };
    newTradeIns[lineIndex] = deviceId;
    setTradeInDevices(newTradeIns);

    // Update promotion with new trade-in value
    const result = updateTradeInDevice(lineIndex, deviceId);
    if (result.success) {
      updatePromotionStats();
    }
  };

  const handleRemovePromotion = (lineIndex) => {
    const result = removePromotion(lineIndex);
    if (result.success) {
      updatePromotionStats();
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

  const getAvailablePromotionsForLine = (lineIndex) => {
    const promotions = getAvailablePromotions(lineIndex);
    
    // Apply search filter
    let filteredPromotions = promotions;
    if (searchTerm) {
      filteredPromotions = promotions.filter(promo => 
        promo.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        promo.internalId.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Apply category filter
    if (filterCategory !== 'all') {
      filteredPromotions = filteredPromotions.filter(promo => 
        getPromotionCategory(promo.id) === filterCategory
      );
    }

    return filteredPromotions;
  };

  const getTradeInDevices = () => {
    // This would typically come from a trade-in device database
    return [
      { id: 'iphone-12', name: 'iPhone 12', value: 830 },
      { id: 'iphone-12-pro', name: 'iPhone 12 Pro', value: 830 },
      { id: 'iphone-13', name: 'iPhone 13', value: 830 },
      { id: 'iphone-13-pro', name: 'iPhone 13 Pro', value: 830 },
      { id: 'iphone-14', name: 'iPhone 14', value: 830 },
      { id: 'iphone-14-pro', name: 'iPhone 14 Pro', value: 830 },
      { id: 'iphone-15', name: 'iPhone 15', value: 830 },
      { id: 'iphone-15-pro', name: 'iPhone 15 Pro', value: 830 },
      { id: 'galaxy-s21', name: 'Galaxy S21', value: 800 },
      { id: 'galaxy-s22', name: 'Galaxy S22', value: 800 },
      { id: 'galaxy-s23', name: 'Galaxy S23', value: 800 },
      { id: 'galaxy-s24', name: 'Galaxy S24', value: 800 },
      { id: 'pixel-6', name: 'Pixel 6', value: 800 },
      { id: 'pixel-7', name: 'Pixel 7', value: 800 },
      { id: 'pixel-8', name: 'Pixel 8', value: 800 },
      { id: 'pixel-9', name: 'Pixel 9', value: 800 }
    ];
  };

  const getPromotionCategories = () => {
    const categories = ['all'];
    promotions.forEach(promo => {
      const category = getPromotionCategory(promo.id);
      if (!categories.includes(category)) {
        categories.push(category);
      }
    });
    return categories;
  };

  const renderPromotionCard = (promotion, lineIndex) => {
    const isSelected = getLinePromotionSummary(lineIndex)?.promotionId === promotion.id;
    const tradeInValue = getTradeInValueForPromotion(promotion.id, tradeInDevices[lineIndex] || '');
    const savings = manager.calculatePromotionSavings(promotion.id, quoteData.devices?.[lineIndex], tradeInValue);

    return (
      <div
        key={promotion.id}
        onClick={() => handlePromotionChange(lineIndex, promotion.id)}
        style={{
          border: `2px solid ${isSelected ? '#E20074' : '#e0e0e0'}`,
          borderRadius: '8px',
          padding: '15px',
          marginBottom: '10px',
          cursor: 'pointer',
          background: isSelected ? '#fdf2f8' : 'white',
          transition: 'all 0.3s ease',
          position: 'relative'
        }}
        onMouseOver={(e) => {
          if (!isSelected) {
            e.target.style.borderColor = '#E20074';
            e.target.style.boxShadow = '0 4px 12px rgba(226, 0, 116, 0.1)';
          }
        }}
        onMouseOut={(e) => {
          if (!isSelected) {
            e.target.style.borderColor = '#e0e0e0';
            e.target.style.boxShadow = 'none';
          }
        }}
      >
        {isSelected && (
          <div style={{
            position: 'absolute',
            top: '10px',
            right: '10px',
            background: '#E20074',
            color: 'white',
            borderRadius: '50%',
            width: '24px',
            height: '24px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '12px'
          }}>
            <CheckCircle size={14} />
          </div>
        )}

        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'flex-start',
          marginBottom: '8px'
        }}>
          <div>
            <h3 style={{
              fontSize: '16px',
              fontWeight: '600',
              color: '#333',
              margin: '0 0 4px 0'
            }}>
              {promotion.name}
            </h3>
            <div style={{
              fontSize: '12px',
              color: '#666',
              marginBottom: '4px'
            }}>
              ID: {promotion.internalId}
            </div>
            <div style={{
              fontSize: '12px',
              color: '#666'
            }}>
              {promotion.redemption.ratePlan}
            </div>
          </div>
          <div style={{
            textAlign: 'right'
          }}>
            <div style={{
              fontSize: '18px',
              fontWeight: '700',
              color: '#E20074'
            }}>
              ${savings.toFixed(2)}
            </div>
            <div style={{
              fontSize: '11px',
              color: '#666'
            }}>
              Max: ${promotion.maxPayout}
            </div>
          </div>
        </div>

        <div style={{
          display: 'flex',
          gap: '8px',
          marginTop: '10px'
        }}>
          <div style={{
            background: '#f0f0f0',
            padding: '4px 8px',
            borderRadius: '4px',
            fontSize: '11px',
            color: '#666'
          }}>
            {promotion.aal === 'Y' ? 'New Line' : 
             promotion.aal === 'Y+P' ? 'New Line + Port' : 'Upgrade'}
          </div>
          <div style={{
            background: '#f0f0f0',
            padding: '4px 8px',
            borderRadius: '4px',
            fontSize: '11px',
            color: '#666'
          }}>
            Limit: {promotion.limit}
          </div>
          {promotion.status === 'active' && (
            <div style={{
              background: '#d4edda',
              color: '#155724',
              padding: '4px 8px',
              borderRadius: '4px',
              fontSize: '11px'
            }}>
              Active
            </div>
          )}
        </div>

        {tradeInValue > 0 && (
          <div style={{
            marginTop: '8px',
            padding: '8px',
            background: '#e3f2fd',
            borderRadius: '4px',
            fontSize: '12px',
            color: '#1976d2'
          }}>
            Trade-in Value: ${tradeInValue}
          </div>
        )}
      </div>
    );
  };

  const renderTradeInCalculator = (lineIndex) => {
    const tradeInDevicesList = getTradeInDevices();
    const currentTradeIn = tradeInDevices[lineIndex] || '';

    return (
      <div style={{
        background: '#f8f9fa',
        padding: '15px',
        borderRadius: '8px',
        marginTop: '10px',
        border: '1px solid #e0e0e0'
      }}>
        <h4 style={{
          fontSize: '14px',
          fontWeight: '600',
          margin: '0 0 10px 0',
          color: '#333'
        }}>
          Trade-In Device Calculator
        </h4>
        
        <select
          value={currentTradeIn}
          onChange={(e) => handleTradeInChange(lineIndex, e.target.value)}
          style={{
            width: '100%',
            padding: '8px',
            border: '1px solid #e0e0e0',
            borderRadius: '4px',
            fontSize: '14px',
            marginBottom: '10px'
          }}
        >
          <option value="">Select trade-in device</option>
          {tradeInDevicesList.map(device => (
            <option key={device.id} value={device.id}>
              {device.name} - ${device.value}
            </option>
          ))}
        </select>

        {currentTradeIn && (
          <div style={{
            background: '#d4edda',
            color: '#155724',
            padding: '8px',
            borderRadius: '4px',
            fontSize: '12px'
          }}>
            Trade-in value: ${getTradeInValueForPromotion(
              getLinePromotionSummary(lineIndex)?.promotionId, 
              currentTradeIn
            )}
          </div>
        )}
      </div>
    );
  };

  const renderLinePromotions = (lineIndex) => {
    const availablePromotions = getAvailablePromotionsForLine(lineIndex);
    const selectedPromotion = getLinePromotionSummary(lineIndex);
    const isExpanded = expandedLines[lineIndex];
    const showCalculator = showTradeInCalculator[lineIndex];

    return (
      <div key={lineIndex} style={{
        background: 'white',
        border: '1px solid #e0e0e0',
        borderRadius: '8px',
        marginBottom: '15px',
        overflow: 'hidden'
      }}>
        {/* Line Header */}
        <div
          onClick={() => toggleLineExpansion(lineIndex)}
          style={{
            padding: '15px',
            background: '#f8f9fa',
            cursor: 'pointer',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            borderBottom: isExpanded ? '1px solid #e0e0e0' : 'none'
          }}
        >
          <div>
            <h3 style={{
              fontSize: '16px',
              fontWeight: '600',
              margin: '0',
              color: '#333'
            }}>
              Line {lineIndex + 1} - {quoteData.devices?.[lineIndex] || 'No device selected'}
            </h3>
            <div style={{
              fontSize: '12px',
              color: '#666',
              marginTop: '2px'
            }}>
              {availablePromotions.length} promotions available
              {selectedPromotion && ` • ${selectedPromotion.savings ? '$' + selectedPromotion.savings.toFixed(2) : '$0'} savings`}
            </div>
          </div>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '10px'
          }}>
            {selectedPromotion && (
              <div style={{
                background: '#E20074',
                color: 'white',
                padding: '4px 8px',
                borderRadius: '4px',
                fontSize: '11px',
                fontWeight: '600'
              }}>
                PROMOTION APPLIED
              </div>
            )}
            {isExpanded ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
          </div>
        </div>

        {/* Line Content */}
        {isExpanded && (
          <div style={{ padding: '15px' }}>
            {selectedPromotion && (
              <div style={{
                background: '#d4edda',
                border: '1px solid #c3e6cb',
                borderRadius: '6px',
                padding: '12px',
                marginBottom: '15px'
              }}>
                <div style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center'
                }}>
                  <div>
                    <div style={{
                      fontSize: '14px',
                      fontWeight: '600',
                      color: '#155724',
                      marginBottom: '4px'
                    }}>
                      {selectedPromotion.name}
                    </div>
                    <div style={{
                      fontSize: '12px',
                      color: '#155724'
                    }}>
                      Savings: ${selectedPromotion.savings?.toFixed(2) || '0.00'}
                      {selectedPromotion.tradeInDevice && ` • Trade-in: ${selectedPromotion.tradeInDevice}`}
                    </div>
                  </div>
                  <button
                    onClick={() => handleRemovePromotion(lineIndex)}
                    style={{
                      background: '#dc3545',
                      color: 'white',
                      border: 'none',
                      borderRadius: '4px',
                      padding: '6px 8px',
                      cursor: 'pointer',
                      fontSize: '12px'
                    }}
                  >
                    <X size={14} />
                  </button>
                </div>
              </div>
            )}

            {availablePromotions.length > 0 ? (
              <div>
                <div style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  marginBottom: '10px'
                }}>
                  <h4 style={{
                    fontSize: '14px',
                    fontWeight: '600',
                    margin: '0',
                    color: '#333'
                  }}>
                    Available Promotions
                  </h4>
                  <button
                    onClick={() => toggleTradeInCalculator(lineIndex)}
                    style={{
                      background: '#007bff',
                      color: 'white',
                      border: 'none',
                      borderRadius: '4px',
                      padding: '6px 12px',
                      cursor: 'pointer',
                      fontSize: '12px',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '4px'
                    }}
                  >
                    <Calculator size={12} />
                    Trade-In Calculator
                  </button>
                </div>

                {showCalculator && renderTradeInCalculator(lineIndex)}

                <div style={{ maxHeight: '400px', overflowY: 'auto' }}>
                  {availablePromotions.map(promotion => 
                    renderPromotionCard(promotion, lineIndex)
                  )}
                </div>
              </div>
            ) : (
              <div style={{
                textAlign: 'center',
                padding: '20px',
                color: '#666',
                fontSize: '14px'
              }}>
                No promotions available for this line.
                <br />
                <span style={{ fontSize: '12px' }}>
                  Make sure a device and plan are selected.
                </span>
              </div>
            )}
          </div>
        )}
      </div>
    );
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
          <Gift size={30} />
        </div>
        <h1 style={{
          fontSize: '24px',
          fontWeight: '700',
          color: '#E20074',
          marginBottom: '8px'
        }}>
          Voice Line Promotions
        </h1>
        <p style={{
          fontSize: '14px',
          color: '#666',
          lineHeight: '1.4'
        }}>
          Select promotions for your voice lines. Each line can have its own promotion.
        </p>
      </div>

      {/* Promotion Stats */}
      {promotionStats.totalLines > 0 && (
        <div style={{
          background: '#e3f2fd',
          border: '1px solid #bbdefb',
          borderRadius: '8px',
          padding: '15px',
          marginBottom: '20px'
        }}>
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: '10px'
          }}>
            <h3 style={{
              fontSize: '16px',
              fontWeight: '600',
              margin: '0',
              color: '#1976d2'
            }}>
              Promotion Summary
            </h3>
            <div style={{
              fontSize: '18px',
              fontWeight: '700',
              color: '#E20074'
            }}>
              ${promotionStats.totalSavings?.toFixed(2) || '0.00'} Total Savings
            </div>
          </div>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(120px, 1fr))',
            gap: '10px',
            fontSize: '12px',
            color: '#1976d2'
          }}>
            <div>Lines: {promotionStats.totalLines}</div>
            <div>With Promotions: {promotionStats.linesWithPromotions}</div>
            <div>Validation Errors: {promotionStats.validationErrors}</div>
          </div>
        </div>
      )}

      {/* Search and Filter */}
      <div style={{
        display: 'flex',
        gap: '10px',
        marginBottom: '20px',
        flexWrap: 'wrap'
      }}>
        <div style={{ flex: '1', minWidth: '200px' }}>
          <div style={{ position: 'relative' }}>
            <Search size={16} style={{
              position: 'absolute',
              left: '10px',
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
                padding: '10px 10px 10px 35px',
                border: '1px solid #e0e0e0',
                borderRadius: '6px',
                fontSize: '14px'
              }}
            />
          </div>
        </div>
        <select
          value={filterCategory}
          onChange={(e) => setFilterCategory(e.target.value)}
          style={{
            padding: '10px',
            border: '1px solid #e0e0e0',
            borderRadius: '6px',
            fontSize: '14px',
            minWidth: '120px'
          }}
        >
          {getPromotionCategories().map(category => (
            <option key={category} value={category}>
              {category === 'all' ? 'All Categories' : category}
            </option>
          ))}
        </select>
      </div>

      {/* Validation Errors */}
      {validationErrors.length > 0 && (
        <div style={{
          background: '#f8d7da',
          color: '#721c24',
          padding: '12px',
          borderRadius: '8px',
          marginBottom: '20px',
          border: '1px solid #f5c6cb'
        }}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            marginBottom: '8px'
          }}>
            <AlertCircle size={16} />
            <strong>Validation Errors</strong>
          </div>
          {validationErrors.map((error, index) => (
            <div key={index} style={{ fontSize: '12px', marginLeft: '24px' }}>
              • {error}
            </div>
          ))}
        </div>
      )}

      {/* Lines */}
      <div style={{ marginBottom: '20px' }}>
        {Array.from({ length: lines }, (_, index) => renderLinePromotions(index))}
      </div>

      {/* Action Buttons */}
      <div style={{
        display: 'flex',
        gap: '12px',
        justifyContent: 'center',
        marginBottom: '15px'
      }}>
        <button
          onClick={onPrev}
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
          Back to Protection
        </button>

        <button
          onClick={handleNext}
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
          Continue to Number/Port
        </button>
      </div>

      {/* Help Text */}
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
          💡 <strong>Tip:</strong> Each line can have its own promotion. 
          Promotions are applied per line and validated for conflicts and limits.
        </p>
      </div>
    </div>
  );
};

export default PromotionsSelection;