import React, { useState, useCallback, useMemo } from 'react';
import { Smartphone, Search, Filter, Star, CheckCircle, X } from 'lucide-react';
import { devices, deviceCategories, getDevicesByCategory, searchDevices } from '../data/devices';

const DeviceSelection = ({ 
  lines, 
  devices: selectedDevices, 
  onDevicesChange, 
  onNext, 
  onPrev 
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedBrand, setSelectedBrand] = useState('all');
  const [priceRange, setPriceRange] = useState('all');
  const [showFilters, setShowFilters] = useState(false);
  
  // Get available brands
  const brands = useMemo(() => {
    const brandSet = new Set();
    Object.values(devices).forEach(device => {
      if (device.category === 'smartphone') {
        brandSet.add(device.brand);
      }
    });
    return Array.from(brandSet).sort();
  }, []);

  // Filter devices based on search and filters
  const filteredDevices = useMemo(() => {
    let filtered = Object.values(devices).filter(device => device.category === 'smartphone');
    
    if (selectedCategory !== 'all') {
      filtered = filtered.filter(device => device.category === selectedCategory);
    }
    
    if (selectedBrand !== 'all') {
      filtered = filtered.filter(device => device.brand === selectedBrand);
    }
    
    if (priceRange !== 'all') {
      const [min, max] = priceRange.split('-').map(Number);
      filtered = filtered.filter(device => {
        if (max) {
          return device.price >= min && device.price <= max;
        } else {
          return device.price >= min;
        }
      });
    }
    
    if (searchQuery) {
      filtered = searchDevices(searchQuery).filter(device => device.category === 'smartphone');
    }
    
    return filtered.sort((a, b) => a.price - b.price);
  }, [selectedCategory, selectedBrand, priceRange, searchQuery]);

  const handleDeviceSelect = useCallback((deviceId, lineIndex) => {
    const newDevices = { ...selectedDevices };
    newDevices[lineIndex] = deviceId;
    onDevicesChange(newDevices);
  }, [selectedDevices, onDevicesChange]);

  const handleDeviceRemove = useCallback((lineIndex) => {
    const newDevices = { ...selectedDevices };
    delete newDevices[lineIndex];
    onDevicesChange(newDevices);
  }, [selectedDevices, onDevicesChange]);

  const getTotalDeviceCost = useCallback(() => {
    return Object.values(selectedDevices).reduce((total, deviceId) => {
      const device = devices[deviceId];
      return total + (device ? device.monthlyPayment : 0);
    }, 0);
  }, [selectedDevices]);

  const isAllLinesConfigured = useMemo(() => {
    return Object.keys(selectedDevices).length === lines;
  }, [selectedDevices, lines]);

  const renderDeviceCard = (device, lineIndex) => {
    const isSelected = selectedDevices[lineIndex] === device.id;
    const hasPromotions = device.promotions && device.promotions.length > 0;
    
    return (
      <div
        key={device.id}
        onClick={() => handleDeviceSelect(device.id, lineIndex)}
        style={{
          padding: '20px',
          border: `2px solid ${isSelected ? '#E20074' : '#e0e0e0'}`,
          borderRadius: '12px',
          background: isSelected ? '#fdf2f8' : 'white',
          cursor: 'pointer',
          transition: 'all 0.3s ease',
          position: 'relative',
          marginBottom: '15px'
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

        {/* Promotion Badge */}
        {hasPromotions && (
          <div style={{
            position: 'absolute',
            top: '15px',
            left: '15px',
            background: '#ff6b6b',
            color: 'white',
            padding: '4px 8px',
            borderRadius: '12px',
            fontSize: '10px',
            fontWeight: '600',
            textTransform: 'uppercase'
          }}>
            Promo Available
          </div>
        )}

        <div style={{ display: 'flex', gap: '15px' }}>
          {/* Device Image Placeholder */}
          <div style={{
            width: '80px',
            height: '80px',
            background: '#f8f9fa',
            borderRadius: '8px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#E20074',
            fontSize: '24px'
          }}>
            <Smartphone size={32} />
          </div>

          {/* Device Info */}
          <div style={{ flex: 1 }}>
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
                  {device.name}
                </h3>
                <p style={{
                  fontSize: '12px',
                  color: '#666',
                  margin: 0
                }}>
                  {device.brand}
                </p>
              </div>
              <div style={{ textAlign: 'right' }}>
                <div style={{
                  fontSize: '18px',
                  fontWeight: '700',
                  color: '#E20074'
                }}>
                  ${device.monthlyPayment}/mo
                </div>
                <div style={{
                  fontSize: '12px',
                  color: '#666',
                  textDecoration: 'line-through'
                }}>
                  ${device.price} retail
                </div>
              </div>
            </div>

            {/* Features */}
            <div style={{
              fontSize: '12px',
              color: '#666',
              marginBottom: '8px'
            }}>
              {device.features.slice(0, 3).join(' • ')}
            </div>

            {/* Colors */}
            <div style={{
              fontSize: '12px',
              color: '#666',
              marginBottom: '8px'
            }}>
              Colors: {device.colors.slice(0, 3).join(', ')}
              {device.colors.length > 3 && ` +${device.colors.length - 3} more`}
            </div>

            {/* Storage */}
            <div style={{
              fontSize: '12px',
              color: '#666'
            }}>
              Storage: {device.storage.join(', ')}
            </div>
          </div>
        </div>
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
          <Smartphone size={24} color="#E20074" />
          <h2 style={{ fontSize: '24px', fontWeight: '700', color: '#E20074', margin: 0 }}>
            Device Selection
        </h2>
      </div>
        <p style={{ color: '#666', fontSize: '14px', margin: 0, lineHeight: '1.4' }}>
          Choose devices for each of your {lines} line{lines > 1 ? 's' : ''}. You can select different devices for each line.
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
            <Search size={16} style={{
                position: 'absolute', 
                left: '12px', 
                top: '50%', 
                transform: 'translateY(-50%)', 
                color: '#666' 
              }} />
              <input
                type="text"
              placeholder="Search devices..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
                style={{
                  width: '100%',
                  padding: '12px 12px 12px 40px',
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
          <button
            onClick={() => setShowFilters(!showFilters)}
            style={{
              padding: '12px',
              border: '2px solid #E20074',
              borderRadius: '8px',
              background: showFilters ? '#E20074' : 'white',
              color: showFilters ? 'white' : '#E20074',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              transition: 'all 0.3s ease'
            }}
          >
            <Filter size={16} />
            Filters
          </button>
        </div>

        {/* Filters */}
        {showFilters && (
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: '15px',
            padding: '15px',
            background: '#f8f9fa',
            borderRadius: '8px',
            border: '1px solid #e0e0e0'
          }}>
            {/* Brand Filter */}
            <div>
              <label style={{ fontSize: '12px', fontWeight: '600', color: '#333', marginBottom: '5px', display: 'block' }}>
                Brand
              </label>
              <select
                value={selectedBrand}
                onChange={(e) => setSelectedBrand(e.target.value)}
                style={{
                  width: '100%',
                  padding: '8px',
                  border: '1px solid #e0e0e0',
                  borderRadius: '6px',
                  fontSize: '14px',
                  background: 'white'
                }}
              >
                <option value="all">All Brands</option>
                {brands.map(brand => (
                  <option key={brand} value={brand}>{brand}</option>
                ))}
              </select>
            </div>

            {/* Price Range Filter */}
            <div>
              <label style={{ fontSize: '12px', fontWeight: '600', color: '#333', marginBottom: '5px', display: 'block' }}>
                Price Range
              </label>
              <select
                value={priceRange}
                onChange={(e) => setPriceRange(e.target.value)}
                style={{
                  width: '100%',
                  padding: '8px',
                  border: '1px solid #e0e0e0',
                  borderRadius: '6px',
                  fontSize: '14px',
                  background: 'white'
                }}
              >
                <option value="all">All Prices</option>
                <option value="0-200">Under $200</option>
                <option value="200-400">$200 - $400</option>
                <option value="400-600">$400 - $600</option>
                <option value="600-800">$600 - $800</option>
                <option value="800-1000">$800 - $1000</option>
                <option value="1000-">$1000+</option>
              </select>
            </div>
          </div>
        )}
      </div>

      {/* Content */}
      <div style={{ flex: 1, padding: '20px' }}>
        {/* Line-by-line device selection */}
        {Array.from({ length: lines }, (_, lineIndex) => (
          <div key={lineIndex} style={{ marginBottom: '30px' }}>
        <div style={{
          display: 'flex',
              justifyContent: 'space-between',
          alignItems: 'center',
              marginBottom: '15px',
              padding: '10px 15px',
              background: '#f8f9fa',
              borderRadius: '8px',
              border: '1px solid #e0e0e0'
            }}>
              <h3 style={{ fontSize: '16px', fontWeight: '600', color: '#333', margin: 0 }}>
                Line {lineIndex + 1} Device
              </h3>
              {selectedDevices[lineIndex] && (
            <button
                  onClick={() => handleDeviceRemove(lineIndex)}
              style={{
                    padding: '6px 12px',
                    border: '1px solid #ff6b6b',
                    borderRadius: '6px',
                    background: 'white',
                    color: '#ff6b6b',
                    fontSize: '12px',
                cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '4px',
                    transition: 'all 0.3s ease'
              }}
            >
                  <X size={12} />
                  Remove
            </button>
              )}
            </div>

            {/* Device Grid */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
              gap: '15px'
            }}>
              {filteredDevices.map(device => renderDeviceCard(device, lineIndex))}
            </div>

            {/* Selected Device Summary */}
            {selectedDevices[lineIndex] && (
              <div style={{
                marginTop: '15px',
                    padding: '15px',
                background: '#e8f5e8',
                borderRadius: '8px',
                border: '1px solid #4CAF50'
              }}>
                <div style={{ fontSize: '14px', color: '#2e7d32', fontWeight: '600', marginBottom: '5px' }}>
                  Selected: {devices[selectedDevices[lineIndex]]?.name}
                    </div>
                <div style={{ fontSize: '12px', color: '#2e7d32' }}>
                  Monthly Payment: ${devices[selectedDevices[lineIndex]]?.monthlyPayment}/mo
          </div>
        </div>
      )}
          </div>
        ))}

        {/* Total Cost Summary */}
        {Object.keys(selectedDevices).length > 0 && (
          <div style={{
            background: '#f8f9fa',
                padding: '20px', 
            borderRadius: '8px',
            border: '1px solid #e0e0e0',
            marginTop: '20px'
          }}>
            <h3 style={{ fontSize: '16px', fontWeight: '600', marginBottom: '10px', color: '#333' }}>
              Device Payment Summary
            </h3>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '10px' }}>
              <div>
                <div style={{ fontSize: '12px', color: '#666' }}>Total Monthly Device Payments</div>
                <div style={{ fontSize: '18px', fontWeight: '700', color: '#E20074' }}>
                  ${getTotalDeviceCost()}/mo
                </div>
                </div>
              <div>
                <div style={{ fontSize: '12px', color: '#666' }}>Devices Selected</div>
                <div style={{ fontSize: '16px', fontWeight: '600', color: '#333' }}>
                  {Object.keys(selectedDevices).length} of {lines}
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
          Back to Plans
        </button>
        
        <div style={{ fontSize: '14px', color: '#666', textAlign: 'center' }}>
          {Object.keys(selectedDevices).length} of {lines} devices selected
                          </div>
                          
                            <button
          onClick={onNext}
          disabled={!isAllLinesConfigured}
                              style={{
            padding: '12px 24px',
            border: '2px solid #E20074',
            borderRadius: '8px',
            background: isAllLinesConfigured ? '#E20074' : '#f5f5f5',
            color: isAllLinesConfigured ? 'white' : '#999',
            fontSize: '16px',
            cursor: isAllLinesConfigured ? 'pointer' : 'not-allowed',
            transition: 'all 0.3s ease',
            opacity: isAllLinesConfigured ? 1 : 0.5
          }}
        >
          Continue to Port-In
                            </button>
      </div>
    </div>
  );
};

export default DeviceSelection;