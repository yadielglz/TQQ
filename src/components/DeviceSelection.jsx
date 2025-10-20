import React, { useState } from 'react';
import { Smartphone, Camera, Battery, Wifi, ChevronDown, ChevronUp, Search, Filter } from 'lucide-react';

const DeviceSelection = ({ lines, devices, onDevicesChange, onNext, onPrev }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedBrand, setSelectedBrand] = useState('all');
  const [expandedLine, setExpandedLine] = useState(null);
  const [tradeIns, setTradeIns] = useState({});
  
  const calculateMonthlyPrice = (device, tradeInValue = 0) => {
    const netPrice = device.price - tradeInValue;
    return Math.max(0, Math.ceil(netPrice / 24));
  };

  const handleTradeInChange = (lineIndex, value) => {
    const newTradeIns = { ...tradeIns };
    newTradeIns[lineIndex] = parseFloat(value) || 0;
    setTradeIns(newTradeIns);
  };
  const deviceOptions = [
    // Apple iPhone Series
    {
      id: 'iphone-air',
      name: 'iPhone Air',
      brand: 'Apple',
      price: 999,
      monthlyPrice: 42,
      tier: 5,
      features: [
        '6.1" Super Retina XDR display',
        'A18 Pro chip',
        '48MP main camera',
        'Face ID',
        '5G capable',
        'iOS 18',
        'Lightweight design'
      ],
      image: '📱',
      color: '#007AFF'
    },
    {
      id: 'iphone-17-pro-max',
      name: 'iPhone 17 Pro Max',
      brand: 'Apple',
      price: 1199,
      monthlyPrice: 50,
      tier: 6,
      features: [
        '6.7" Super Retina XDR Pro display',
        'A18 Pro chip',
        '48MP Pro camera system',
        'Face ID',
        '5G capable',
        'iOS 18',
        'ProRAW photography',
        'Longest battery life'
      ],
      image: '📱',
      color: '#007AFF'
    },
    {
      id: 'iphone-17-pro',
      name: 'iPhone 17 Pro',
      brand: 'Apple',
      price: 1099,
      monthlyPrice: 46,
      tier: 5,
      features: [
        '6.1" Super Retina XDR Pro display',
        'A18 Pro chip',
        '48MP Pro camera system',
        'Face ID',
        '5G capable',
        'iOS 18',
        'ProRAW photography'
      ],
      image: '📱',
      color: '#007AFF'
    },
    {
      id: 'iphone-17',
      name: 'iPhone 17',
      brand: 'Apple',
      price: 799,
      monthlyPrice: 33,
      tier: 4,
      features: [
        '6.1" Super Retina XDR display',
        'A18 Pro chip',
        '48MP main camera',
        'Face ID',
        '5G capable',
        'iOS 18'
      ],
      image: '📱',
      color: '#007AFF'
    },
    {
      id: 'iphone-16e',
      name: 'iPhone 16e',
      brand: 'Apple',
      price: 599,
      monthlyPrice: 25,
      tier: 3,
      features: [
        '6.1" Liquid Retina display',
        'A17 Pro chip',
        '48MP main camera',
        'Face ID',
        '5G capable',
        'iOS 18',
        'Budget iPhone'
      ],
      image: '📱',
      color: '#007AFF'
    },
    {
      id: 'iphone-16-pro-max',
      name: 'iPhone 16 Pro Max',
      brand: 'Apple',
      price: 1199,
      monthlyPrice: 50,
      tier: 6,
      features: [
        '6.7" Super Retina XDR Pro display',
        'A18 Pro chip',
        '48MP Pro camera system',
        'Face ID',
        '5G capable',
        'iOS 18',
        'ProRAW photography'
      ],
      image: '📱',
      color: '#007AFF'
    },
    {
      id: 'iphone-16-pro',
      name: 'iPhone 16 Pro',
      brand: 'Apple',
      price: 1099,
      monthlyPrice: 46,
      tier: 5,
      features: [
        '6.1" Super Retina XDR Pro display',
        'A18 Pro chip',
        '48MP Pro camera system',
        'Face ID',
        '5G capable',
        'iOS 18',
        'ProRAW photography'
      ],
      image: '📱',
      color: '#007AFF'
    },
    {
      id: 'iphone-16-plus',
      name: 'iPhone 16 Plus',
      brand: 'Apple',
      price: 899,
      monthlyPrice: 38,
      tier: 4,
      features: [
        '6.7" Super Retina XDR display',
        'A18 Pro chip',
        '48MP main camera',
        'Face ID',
        '5G capable',
        'iOS 18',
        'Large display'
      ],
      image: '📱',
      color: '#007AFF'
    },
    {
      id: 'iphone-16',
      name: 'iPhone 16',
      brand: 'Apple',
      price: 799,
      monthlyPrice: 33,
      tier: 4,
      features: [
        '6.1" Super Retina XDR display',
        'A18 Pro chip',
        '48MP main camera',
        'Face ID',
        '5G capable',
        'iOS 18'
      ],
      image: '📱',
      color: '#007AFF'
    },
    {
      id: 'iphone-15',
      name: 'iPhone 15',
      brand: 'Apple',
      price: 699,
      monthlyPrice: 29,
      tier: 4,
      features: [
        '6.1" Super Retina XDR display',
        'A16 Bionic chip',
        '48MP main camera',
        'Face ID',
        '5G capable',
        'iOS 17',
        'USB-C'
      ],
      image: '📱',
      color: '#007AFF'
    },
    // Google Pixel Series
    {
      id: 'pixel-10-pro-xl',
      name: 'Pixel 10 Pro XL',
      brand: 'Google',
      price: 1199,
      monthlyPrice: 50,
      tier: 6,
      features: [
        '6.7" OLED Pro display',
        'Google Tensor G5',
        '16GB RAM',
        '50MP Pro camera system',
        '5G capable',
        'Pure Android 16',
        'AI-powered photography'
      ],
      image: '📱',
      color: '#4285F4'
    },
    {
      id: 'pixel-10-pro',
      name: 'Pixel 10 Pro',
      brand: 'Google',
      price: 999,
      monthlyPrice: 42,
      tier: 5,
      features: [
        '6.3" OLED Pro display',
        'Google Tensor G5',
        '12GB RAM',
        '50MP Pro camera',
        '5G capable',
        'Pure Android 16',
        'AI features'
      ],
      image: '📱',
      color: '#4285F4'
    },
    {
      id: 'pixel-10',
      name: 'Pixel 10',
      brand: 'Google',
      price: 699,
      monthlyPrice: 29,
      tier: 4,
      features: [
        '6.1" OLED display',
        'Google Tensor G5',
        '8GB RAM',
        '50MP main camera',
        '5G capable',
        'Pure Android 16'
      ],
      image: '📱',
      color: '#4285F4'
    },
    {
      id: 'pixel-9a',
      name: 'Pixel 9A',
      brand: 'Google',
      price: 499,
      monthlyPrice: 21,
      tier: 3,
      features: [
        '6.1" OLED display',
        'Google Tensor G4',
        '8GB RAM',
        '64MP main camera',
        '5G capable',
        'Pure Android 15',
        'Budget-friendly'
      ],
      image: '📱',
      color: '#4285F4'
    },
    // Samsung Galaxy Series
    {
      id: 'galaxy-s25-edge',
      name: 'Galaxy S25 Edge',
      brand: 'Samsung',
      price: 1299,
      monthlyPrice: 54,
      tier: 6,
      features: [
        '6.6" Edge Dynamic AMOLED',
        'Snapdragon 8 Elite',
        '12GB RAM',
        '200MP main camera',
        '5G capable',
        'Android 15',
        'Edge display'
      ],
      image: '📱',
      color: '#1E88E5'
    },
    {
      id: 'galaxy-s25-ultra',
      name: 'Galaxy S25 Ultra',
      brand: 'Samsung',
      price: 1299,
      monthlyPrice: 54,
      tier: 6,
      features: [
        '6.8" QHD+ Dynamic AMOLED',
        'Snapdragon 8 Elite',
        '16GB RAM',
        '200MP main camera',
        '5G capable',
        'Android 15',
        'S Pen included'
      ],
      image: '📱',
      color: '#1E88E5'
    },
    {
      id: 'galaxy-s25-plus',
      name: 'Galaxy S25+',
      brand: 'Samsung',
      price: 999,
      monthlyPrice: 42,
      tier: 5,
      features: [
        '6.7" FHD+ Dynamic AMOLED',
        'Snapdragon 8 Elite',
        '12GB RAM',
        '50MP main camera',
        '5G capable',
        'Android 15',
        'S Pen support'
      ],
      image: '📱',
      color: '#1E88E5'
    },
    {
      id: 'galaxy-s25',
      name: 'Galaxy S25',
      brand: 'Samsung',
      price: 799,
      monthlyPrice: 33,
      tier: 4,
      features: [
        '6.2" FHD+ Dynamic AMOLED',
        'Snapdragon 8 Elite',
        '12GB RAM',
        '50MP main camera',
        '5G capable',
        'Android 15'
      ],
      image: '📱',
      color: '#1E88E5'
    },
    {
      id: 'galaxy-s25-fe',
      name: 'Galaxy S25 FE',
      brand: 'Samsung',
      price: 599,
      monthlyPrice: 25,
      tier: 3,
      features: [
        '6.4" Dynamic AMOLED',
        'Snapdragon 8 Gen 3',
        '8GB RAM',
        '50MP main camera',
        '5G capable',
        'Android 15',
        'Fan Edition'
      ],
      image: '📱',
      color: '#1E88E5'
    },
    {
      id: 'galaxy-a36',
      name: 'Galaxy A36',
      brand: 'Samsung',
      price: 399,
      monthlyPrice: 17,
      tier: 2,
      features: [
        '6.6" Super AMOLED',
        'Snapdragon 7 Gen 3',
        '8GB RAM',
        '50MP main camera',
        '5G capable',
        'Android 15',
        'Budget smartphone'
      ],
      image: '📱',
      color: '#1E88E5'
    },
    {
      id: 'galaxy-z-fold-7',
      name: 'Galaxy Z Fold 7',
      brand: 'Samsung',
      price: 1799,
      monthlyPrice: 75,
      tier: 6,
      features: [
        '7.6" Foldable Dynamic AMOLED',
        'Snapdragon 8 Elite',
        '16GB RAM',
        '200MP main camera',
        '5G capable',
        'Android 15',
        'Foldable design',
        'S Pen support'
      ],
      image: '📱',
      color: '#1E88E5'
    },
    {
      id: 'galaxy-z-flip-7',
      name: 'Galaxy Z Flip 7',
      brand: 'Samsung',
      price: 999,
      monthlyPrice: 42,
      tier: 5,
      features: [
        '6.7" Foldable Dynamic AMOLED',
        'Snapdragon 8 Elite',
        '12GB RAM',
        '50MP main camera',
        '5G capable',
        'Android 15',
        'Flip design',
        'Compact when folded'
      ],
      image: '📱',
      color: '#1E88E5'
    },
    // Motorola Series
    {
      id: 'razr-ultra',
      name: 'Razr Ultra',
      brand: 'Motorola',
      price: 999,
      monthlyPrice: 42,
      tier: 5,
      features: [
        '6.9" Foldable pOLED',
        'Snapdragon 8 Gen 3',
        '12GB RAM',
        '50MP main camera',
        '5G capable',
        'Android 15',
        'Ultra flip design'
      ],
      image: '📱',
      color: '#E65100'
    },
    {
      id: 'razr-plus-2025',
      name: 'Razr+ 2025',
      brand: 'Motorola',
      price: 799,
      monthlyPrice: 33,
      tier: 4,
      features: [
        '6.9" Foldable pOLED',
        'Snapdragon 8 Gen 3',
        '8GB RAM',
        '50MP main camera',
        '5G capable',
        'Android 15',
        'Premium flip design'
      ],
      image: '📱',
      color: '#E65100'
    },
    {
      id: 'razr-2025',
      name: 'Razr 2025',
      brand: 'Motorola',
      price: 599,
      monthlyPrice: 25,
      tier: 3,
      features: [
        '6.9" Foldable pOLED',
        'Snapdragon 7 Gen 3',
        '8GB RAM',
        '50MP main camera',
        '5G capable',
        'Android 15',
        'Classic flip design'
      ],
      image: '📱',
      color: '#E65100'
    },
    {
      id: 'edge-2025',
      name: 'Edge 2025',
      brand: 'Motorola',
      price: 699,
      monthlyPrice: 29,
      tier: 4,
      features: [
        '6.6" OLED display',
        'Snapdragon 8 Gen 3',
        '8GB RAM',
        '50MP main camera',
        '5G capable',
        'Android 15',
        'Edge-to-edge display'
      ],
      image: '📱',
      color: '#E65100'
    },
    {
      id: 'g-power-2025',
      name: 'G Power 2025',
      brand: 'Motorola',
      price: 299,
      monthlyPrice: 13,
      tier: 2,
      features: [
        '6.7" IPS LCD',
        'Snapdragon 6 Gen 1',
        '6GB RAM',
        '50MP main camera',
        '5G capable',
        'Android 15',
        'Long-lasting battery'
      ],
      image: '📱',
      color: '#E65100'
    },
    {
      id: 'g-2025',
      name: 'G 2025',
      brand: 'Motorola',
      price: 199,
      monthlyPrice: 8,
      tier: 1,
      features: [
        '6.5" IPS LCD',
        'Snapdragon 4 Gen 2',
        '4GB RAM',
        '50MP main camera',
        '5G capable',
        'Android 15',
        'Budget smartphone'
      ],
      image: '📱',
      color: '#E65100'
    },
    // Revvl Series
    {
      id: 'revvl-pro-8',
      name: 'Revvl Pro 8',
      brand: 'Revvl',
      price: 399,
      monthlyPrice: 17,
      tier: 2,
      features: [
        '6.8" IPS LCD',
        'Snapdragon 6 Gen 1',
        '8GB RAM',
        '108MP main camera',
        '5G capable',
        'Android 15',
        'T-Mobile exclusive'
      ],
      image: '📱',
      color: '#E20074'
    },
    {
      id: 'bring-your-own',
      name: 'Bring Your Own Device',
      brand: 'BYOD',
      price: 0,
      monthlyPrice: 0,
      tier: 5,
      features: [
        'Use your current device',
        'No device payment',
        'Must be compatible',
        'Unlock required'
      ],
      image: '📲',
      color: '#4CAF50'
    }
  ];

  // Filter devices based on search and brand
  const filteredDevices = deviceOptions.filter(device => {
    const matchesSearch = device.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         device.brand.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesBrand = selectedBrand === 'all' || device.brand.toLowerCase() === selectedBrand.toLowerCase();
    return matchesSearch && matchesBrand;
  });

  // Group devices by brand
  const groupedDevices = filteredDevices.reduce((acc, device) => {
    if (!acc[device.brand]) {
      acc[device.brand] = [];
    }
    acc[device.brand].push(device);
    return acc;
  }, {});

  const handleDeviceSelect = (lineIndex, deviceId) => {
    const newDevices = { ...devices };
    newDevices[lineIndex] = deviceId;
    onDevicesChange(newDevices);
    setExpandedLine(null); // Close dropdown after selection
  };

  const getSelectedDevice = (lineIndex) => {
    return devices[lineIndex] || null;
  };

  const getSelectedDeviceInfo = (lineIndex) => {
    const deviceId = devices[lineIndex];
    return deviceOptions.find(d => d.id === deviceId);
  };

  const canProceed = () => {
    for (let i = 0; i < lines; i++) {
      if (!devices[i]) return false;
    }
    return true;
  };

  const calculateDeviceTotal = () => {
    let total = 0;
    for (let i = 0; i < lines; i++) {
      const deviceId = devices[i];
      if (deviceId) {
        const device = deviceOptions.find(d => d.id === deviceId);
        if (device) {
          total += calculateMonthlyPrice(device, tradeIns[i] || 0);
        }
      }
    }
    return total;
  };

  const calculateDeviceCost = () => {
    let total = 0;
    for (let i = 0; i < lines; i++) {
      const deviceId = devices[i];
      if (deviceId) {
        const device = deviceOptions.find(d => d.id === deviceId);
        if (device) {
          total += device.price;
        }
      }
    }
    return total;
  };

  const toggleLineExpansion = (lineIndex) => {
    setExpandedLine(expandedLine === lineIndex ? null : lineIndex);
  };

  return (
    <div className="form-section">
      <h2 className="section-title">Select devices for each line</h2>
      
      {/* Search and Filter Controls */}
      <div style={{ 
        background: '#f8f9fa', 
        padding: '20px', 
        borderRadius: '12px', 
        marginBottom: '30px',
        border: '1px solid #e0e0e0'
      }}>
        <div style={{ display: 'flex', gap: '15px', marginBottom: '15px', flexWrap: 'wrap' }}>
          <div style={{ flex: 1, minWidth: '200px' }}>
            <div style={{ position: 'relative' }}>
              <Search size={20} style={{ 
                position: 'absolute', 
                left: '12px', 
                top: '50%', 
                transform: 'translateY(-50%)', 
                color: '#666' 
              }} />
              <input
                type="text"
                placeholder="Search devices..."
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
          </div>
          
          <div style={{ minWidth: '150px' }}>
            <select
              value={selectedBrand}
              onChange={(e) => setSelectedBrand(e.target.value)}
              style={{
                width: '100%',
                padding: '12px',
                border: '2px solid #e0e0e0',
                borderRadius: '8px',
                fontSize: '16px',
                background: 'white',
                cursor: 'pointer'
              }}
            >
              <option value="all">All Brands</option>
              <option value="Apple">Apple</option>
              <option value="Google">Google</option>
              <option value="Samsung">Samsung</option>
              <option value="Motorola">Motorola</option>
              <option value="Revvl">Revvl</option>
              <option value="BYOD">BYOD</option>
            </select>
          </div>
        </div>
        
        <div style={{ fontSize: '14px', color: '#666' }}>
          Showing {filteredDevices.length} devices
        </div>
      </div>
      
      {/* Line Selection Interface */}
      {Array.from({ length: lines }, (_, lineIndex) => {
        const selectedDevice = getSelectedDeviceInfo(lineIndex);
        const isExpanded = expandedLine === lineIndex;
        
        return (
          <div key={lineIndex} style={{ 
            background: 'white', 
            border: '2px solid #e0e0e0', 
            borderRadius: '12px', 
            marginBottom: '20px',
            overflow: 'hidden',
            boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
          }}>
            {/* Line Header */}
            <div 
              style={{ 
                padding: '20px', 
                cursor: 'pointer',
                background: selectedDevice ? '#E20074' : '#f8f9fa',
                color: selectedDevice ? 'white' : '#333',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                transition: 'all 0.3s ease'
              }}
              onClick={() => toggleLineExpansion(lineIndex)}
            >
              <div>
                <div style={{ fontSize: '18px', fontWeight: '600', marginBottom: '4px' }}>
                  Line {lineIndex + 1}
                </div>
                <div style={{ fontSize: '14px', opacity: 0.9 }}>
                  {selectedDevice ? selectedDevice.name : 'Tap to select device'}
                </div>
              </div>
              
              <div style={{ textAlign: 'right' }}>
                <div style={{ fontSize: '20px', fontWeight: '700', marginBottom: '4px' }}>
                  {selectedDevice 
                    ? (calculateMonthlyPrice(selectedDevice, tradeIns[lineIndex] || 0) > 0 ? `$${calculateMonthlyPrice(selectedDevice, tradeIns[lineIndex] || 0)}/mo` : 'Free')
                    : 'Select'
                  }
                </div>
                <div style={{ fontSize: '12px', opacity: 0.8 }}>
                  {isExpanded ? 'Tap to close' : 'Tap to select'}
                </div>
              </div>
            </div>
            
            {/* Device Selection Dropdown */}
            {isExpanded && (
              <div style={{ 
                maxHeight: '400px', 
                overflowY: 'auto',
                background: 'white',
                borderTop: '1px solid #e0e0e0'
              }}>
                {Object.entries(groupedDevices).map(([brand, brandDevices]) => (
                  <div key={brand}>
                    <div style={{ 
                      background: '#f8f9fa', 
                      padding: '12px 20px', 
                      fontSize: '14px', 
                      fontWeight: '600',
                      color: '#666',
                      borderBottom: '1px solid #e0e0e0'
                    }}>
                      {brand}
                    </div>
                    
                    {brandDevices.map((device) => {
                      const isSelected = getSelectedDevice(lineIndex) === device.id;
                      
                      return (
                        <div
                          key={device.id}
                          onClick={() => handleDeviceSelect(lineIndex, device.id)}
                          style={{
                            padding: '16px 20px',
                            borderBottom: '1px solid #f0f0f0',
                            cursor: 'pointer',
                            background: isSelected ? 'linear-gradient(135deg, rgba(226, 0, 116, 0.1), rgba(255, 107, 53, 0.1))' : 'white',
                            borderLeft: isSelected ? '4px solid #e20074' : '4px solid transparent',
                            transition: 'all 0.2s ease',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '15px'
                          }}
                        >
                          <div style={{ fontSize: '24px' }}>
                            {device.image}
                          </div>
                          
                          <div style={{ flex: 1 }}>
                            <div style={{ 
                              fontSize: '16px', 
                              fontWeight: '600', 
                              color: '#333',
                              marginBottom: '4px'
                            }}>
                              {device.name}
                            </div>
                            <div style={{ 
                              fontSize: '12px', 
                              color: '#666',
                              marginBottom: '6px'
                            }}>
                              {device.brand}
                            </div>
                            <div style={{ 
                              fontSize: '14px', 
                              color: '#e20074',
                              fontWeight: '600'
                            }}>
                              {calculateMonthlyPrice(device, tradeIns[lineIndex] || 0) > 0 ? `$${calculateMonthlyPrice(device, tradeIns[lineIndex] || 0)}/mo` : 'Free'}
                              {device.price > 0 && (
                                <span style={{ color: '#999', fontWeight: 'normal', marginLeft: '8px' }}>
                                  (${device.price} retail)
                                </span>
                              )}
                            </div>
                          </div>
                          
                          {isSelected && (
                            <div style={{
                              background: '#e20074',
                              color: 'white',
                              borderRadius: '50%',
                              width: '24px',
                              height: '24px',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              fontSize: '12px',
                              fontWeight: 'bold'
                            }}>
                              ✓
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                ))}
              </div>
            )}
            
            {/* Trade-In Input */}
            {selectedDevice && (
              <div style={{
                padding: '15px 20px',
                background: '#f8f9fa',
                borderTop: '1px solid #e0e0e0'
              }}>
                <div style={{
                  fontSize: '14px',
                  fontWeight: '600',
                  marginBottom: '8px',
                  color: '#333'
                }}>
                  Trade-In Value (Optional)
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <span style={{ fontSize: '14px', color: '#666' }}>$</span>
                  <input
                    type="number"
                    placeholder="0"
                    value={tradeIns[lineIndex] || ''}
                    onChange={(e) => handleTradeInChange(lineIndex, e.target.value)}
                    style={{
                      flex: 1,
                      padding: '8px 12px',
                      border: '1px solid #e0e0e0',
                      borderRadius: '6px',
                      fontSize: '14px'
                    }}
                  />
                  <span style={{ fontSize: '12px', color: '#666' }}>
                    Trade-in value will reduce monthly payment
                  </span>
                </div>
              </div>
            )}
          </div>
        );
      })}

      {/* Summary */}
      <div className="summary">
        <div className="summary-title">Device Summary</div>
        <div className="summary-item">
          <span className="summary-label">Monthly Device Payments</span>
          <span className="summary-value">${calculateDeviceTotal()}/mo</span>
        </div>
        <div className="summary-item">
          <span className="summary-label">Total Device Cost</span>
          <span className="summary-value">${calculateDeviceCost()}</span>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="button-group">
        <button className="button button-secondary" onClick={onPrev}>
          Back to Plans
        </button>
        <button 
          className="button" 
          onClick={onNext}
          disabled={!canProceed()}
        >
          Continue to Protection
        </button>
      </div>
    </div>
  );
};

export default DeviceSelection;
