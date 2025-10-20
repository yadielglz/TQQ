import React from 'react';
import { Wifi, Shield, Zap } from 'lucide-react';

const PlanSelection = ({ lines, plans, onPlansChange, onNext, onPrev }) => {
  const planOptions = [
    {
      id: 'essentials',
      name: 'Experience Essentials',
      pricing: {
        1: 50,
        2: 80,
        3: 90,
        4: 100,
        5: 120,
        6: 135,
        additional: 35
      },
      features: [
        'Unlimited talk, text & data',
        '5G network access',
        'Mobile hotspot',
        'Basic streaming quality'
      ],
      icon: Wifi,
      color: '#4CAF50'
    },
    {
      id: 'more',
      name: 'Experience More',
      pricing: {
        1: 85,
        2: 140,
        3: 140, // 3rd line free
        4: 170,
        5: 200,
        6: 230,
        additional: 35
      },
      features: [
        'Unlimited talk, text & data',
        '5G network access',
        'Mobile hotspot',
        'HD streaming',
        'Netflix Basic included',
        'T-Mobile Tuesdays'
      ],
      icon: Shield,
      color: '#e20074'
    },
    {
      id: 'beyond',
      name: 'Experience Beyond',
      pricing: {
        1: 100,
        2: 170,
        3: 170, // 3rd line free
        4: 215,
        5: 260,
        6: 305,
        additional: 35
      },
      features: [
        'Unlimited talk, text & data',
        '5G network access',
        'Mobile hotspot',
        '4K streaming',
        'Netflix Standard included',
        'Apple TV+ included',
        'T-Mobile Tuesdays',
        'Scam Shield Premium'
      ],
      icon: Zap,
      color: '#E20074'
    },
    {
      id: 'essentials-55',
      name: 'Essentials Choice 55',
      pricing: {
        1: 45,
        2: 60,
        maxLines: 2
      },
      features: [
        'Unlimited talk, text & data',
        '5G network access',
        'Mobile hotspot',
        'Basic streaming quality',
        '55+ Senior pricing'
      ],
      icon: Wifi,
      color: '#4CAF50',
      senior: true
    },
    {
      id: 'more-55',
      name: 'More w/55+ Savings',
      pricing: {
        1: 70,
        2: 100,
        maxLines: 2
      },
      features: [
        'Unlimited talk, text & data',
        '5G network access',
        'Mobile hotspot',
        'HD streaming',
        'Netflix Basic included',
        '55+ Senior pricing'
      ],
      icon: Shield,
      color: '#e20074',
      senior: true
    },
    {
      id: 'beyond-55',
      name: 'Beyond w/55+ Savings',
      pricing: {
        1: 85,
        2: 130,
        maxLines: 2
      },
      features: [
        'Unlimited talk, text & data',
        '5G network access',
        'Mobile hotspot',
        '4K streaming',
        'Netflix Standard included',
        '55+ Senior pricing'
      ],
      icon: Zap,
      color: '#E20074',
      senior: true
    }
  ];

  const calculatePlanPrice = (planId, lineCount) => {
    const plan = planOptions.find(p => p.id === planId);
    if (!plan) return 0;
    
    if (plan.senior && lineCount > 2) {
      return 0; // Senior plans max 2 lines
    }
    
    if (lineCount <= 6) {
      return plan.pricing[lineCount] || 0;
    } else {
      // For 6+ lines, use 6-line pricing + additional lines
      const basePrice = plan.pricing[6] || 0;
      const additionalLines = lineCount - 6;
      return basePrice + (additionalLines * plan.pricing.additional);
    }
  };

  const handlePlanSelect = (lineIndex, planId) => {
    const newPlans = { ...plans };
    newPlans[lineIndex] = planId;
    onPlansChange(newPlans);
  };

  const getSelectedPlan = (lineIndex) => {
    return plans[lineIndex] || null;
  };

  const canProceed = () => {
    for (let i = 0; i < lines; i++) {
      if (!plans[i]) return false;
    }
    return true;
  };

  const calculateTotal = () => {
    // Calculate total based on the plan combination
    const planCounts = {};
    for (let i = 0; i < lines; i++) {
      const planId = plans[i];
      if (planId) {
        planCounts[planId] = (planCounts[planId] || 0) + 1;
      }
    }
    
    let total = 0;
    Object.entries(planCounts).forEach(([planId, count]) => {
      total += calculatePlanPrice(planId, count);
    });
    
    return total;
  };

  return (
    <div className="form-section">
      <h2 className="section-title">Select plans for each line</h2>
      
      {Array.from({ length: lines }, (_, lineIndex) => (
        <div key={lineIndex} className="line-item">
          <div className="line-header">
            <span className="line-number">Line {lineIndex + 1}</span>
            <span className="line-price">
              {getSelectedPlan(lineIndex) 
                ? (() => {
                    const planId = getSelectedPlan(lineIndex);
                    const plan = planOptions.find(p => p.id === planId);
                    if (!plan) return 'Select a plan';
                    
                    // Calculate price for this specific line
                    const planCounts = {};
                    for (let i = 0; i < lines; i++) {
                      const pid = plans[i];
                      if (pid === planId) {
                        planCounts[pid] = (planCounts[pid] || 0) + 1;
                      }
                    }
                    
                    const count = planCounts[planId] || 1;
                    const totalPrice = calculatePlanPrice(planId, count);
                    const perLinePrice = Math.round(totalPrice / count);
                    
                    return `$${perLinePrice}/mo`;
                  })()
                : 'Select a plan'
              }
            </span>
          </div>
          
          <div className="card-grid">
            {planOptions.map((plan) => {
              const Icon = plan.icon;
              const isSelected = getSelectedPlan(lineIndex) === plan.id;
              
              return (
                <div
                  key={plan.id}
                  className={`card ${isSelected ? 'selected' : ''}`}
                  onClick={() => handlePlanSelect(lineIndex, plan.id)}
                >
                  <div style={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
                    <div style={{
                      background: plan.color,
                      borderRadius: '8px',
                      padding: '8px',
                      marginRight: '10px',
                      color: 'white'
                    }}>
                      <Icon size={20} />
                    </div>
                    <div>
                      <h3 className="card-title">{plan.name}</h3>
                      <div className="card-price">
                        {(() => {
                          if (plan.senior && lines > 2) {
                            return 'Max 2 lines';
                          }
                          const price = calculatePlanPrice(plan.id, lines);
                          const perLine = Math.round(price / lines);
                          return `$${perLine}/mo per line`;
                        })()}
                      </div>
                      {plan.senior && (
                        <div style={{ fontSize: '12px', color: '#E20074', fontWeight: 'bold' }}>
                          55+ Senior Plan
                        </div>
                      )}
                    </div>
                  </div>
                  
                  <ul style={{ listStyle: 'none', padding: 0 }}>
                    {plan.features.map((feature, index) => (
                      <li key={index} className="card-description" style={{ marginBottom: '4px' }}>
                        • {feature}
                      </li>
                    ))}
                  </ul>
                </div>
              );
            })}
          </div>
        </div>
      ))}

      <div className="summary">
        <div className="summary-title">Plan Summary</div>
        <div className="summary-item">
          <span className="summary-label">Monthly Plan Total</span>
          <span className="summary-value">${calculateTotal()}/mo</span>
        </div>
      </div>

      <div className="button-group">
        <button className="button button-secondary" onClick={onPrev}>
          Back to Lines
        </button>
        <button 
          className="button" 
          onClick={onNext}
          disabled={!canProceed()}
        >
          Continue to Devices
        </button>
      </div>
    </div>
  );
};

export default PlanSelection;
