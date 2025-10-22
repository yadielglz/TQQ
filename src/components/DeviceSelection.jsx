import React, { useState, useCallback, useMemo } from 'react';
import { Smartphone, Search, Filter, Star, CheckCircle, X, Tablet, Watch, Wifi, Globe } from 'lucide-react';
import { devices, deviceCategories, getDevicesByCategory, searchDevices } from '../data/devices';

const DeviceSelection = ({ 
  lines, 
  devices: selectedDevices, 
  onDevicesChange, 
  onNext, 
  onPrev 
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('smartphone');
  const [selectedBrand, setSelectedBrand] = useState('all');
  const [priceRange, setPriceRange] = useState('all');
  const [showFilters, setShowFilters] = useState(false);
  const [expandedLine, setExpandedLine] = useState(null);
  
  // Get available brands for current category
  const brands = useMemo(() => {
    const brandSet = new Set();
    Object.values(devices).forEach(device => {
      if (device.category === selectedCategory) {
        brandSet.add(device.brand);
      }
    });
    return Array.from(brandSet).sort();
  }, [selectedCategory]);

  // Filter devices based on search and filters
  const filteredDevices = useMemo(() => {
    let filtered = Object.values(devices).filter(device => device.category === selectedCategory);
    
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
      filtered = searchDevices(searchQuery).filter(device => device.category === selectedCategory);
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

  // Get category icon
  const getCategoryIcon = (category) => {
    switch (category) {
      case 'smartphone': return <Smartphone size={20} />;
      case 'tablet': return <Tablet size={20} />;
      case 'wearable': return <Watch size={20} />;
      case 'hotspot': return <Wifi size={20} />;
      case 'iot': return <Globe size={20} />;
      default: return <Smartphone size={20} />;
    }
  };

  // Get device count by category
  const getDeviceCountByCategory = (category) => {
    return Object.values(devices).filter(device => device.category === category).length;
  };

  const renderDeviceCard = (device, lineIndex) => {
    const isSelected = selectedDevices[lineIndex] === device.id;
    const hasPromotions = device.promotions && device.promotions.length > 0;
    
    return (
      <div
        key={device.id}
        onClick={() => handleDeviceSelect(device.id, lineIndex)}
        style={{
          padding: '16px',
          border: `2px solid ${isSelected ? '#E20074' : '#e5e7eb'}`,
          borderRadius: '12px',
          background: isSelected ? '#fdf2f8' : 'white',
          cursor: 'pointer',
          transition: 'all 0.2s ease',
          position: 'relative',
          boxShadow: isSelected ? '0 4px 12px rgba(226, 0, 116, 0.15)' : '0 2px 4px rgba(0,0,0,0.05)'
        }}
      >
        {/* Selection Indicator */}
        {isSelected && (
          <div style={{
            position: 'absolute',
            top: '12px',
            right: '12px',
            background: '#E20074',
            borderRadius: '50%',
            width: '20px',
            height: '20px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'white'
          }}>
            <CheckCircle size={12} />
          </div>
        )}

        {/* Promotion Badge */}
        {hasPromotions && (
          <div style={{
            position: 'absolute',
            top: '12px',
            left: '12px',
            background: '#ff6b6b',
            color: 'white',
            padding: '2px 6px',
            borderRadius: '8px',
            fontSize: '9px',
            fontWeight: '600',
            textTransform: 'uppercase'
          }}>
            Promo
          </div>
        )}

        <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
          {/* Device Icon */}
          <div style={{
            width: '48px',
            height: '48px',
            background: '#f8f9fa',
            borderRadius: '8px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#E20074',
            flexShrink: 0
          }}>
            {getCategoryIcon(device.category)}
          </div>

          {/* Device Info */}
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'flex-start',
              marginBottom: '4px'
            }}>
              <div style={{ flex: 1, minWidth: 0 }}>
                <h3 style={{
                  fontSize: '14px',
                  fontWeight: '600',
                  color: '#111827',
                  margin: '0 0 2px 0',
                  whiteSpace: 'nowrap',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis'
                }}>
                  {device.name}
                </h3>
                <p style={{
                  fontSize: '11px',
                  color: '#6b7280',
                  margin: 0
                }}>
                  {device.brand}
                </p>
              </div>
              <div style={{ textAlign: 'right', marginLeft: '8px' }}>
                <div style={{
                  fontSize: '16px',
                  fontWeight: '700',
                  color: '#E20074'
                }}>
                  ${device.monthlyPayment}/mo
                </div>
                <div style={{
                  fontSize: '10px',
                  color: '#9ca3af'
                }}>
                  ${device.price}
                </div>
              </div>
            </div>

            {/* Key Features */}
            <div style={{
              fontSize: '11px',
              color: '#6b7280',
              lineHeight: '1.3'
            }}>
              {device.features.slice(0, 2).join(' • ')}
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
        borderBottom: '1px solid #e5e7eb',
        background: '#f9fafb'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '8px' }}>
          <Smartphone size={24} color="#E20074" />
          <h2 style={{ fontSize: '24px', fontWeight: '700', color: '#E20074', margin: 0 }}>
            Device Selection
          </h2>
        </div>
        <p style={{ color: '#6b7280', fontSize: '14px', margin: 0, lineHeight: '1.4' }}>
          Choose devices for each of your {lines} line{lines > 1 ? 's' : ''}. Select a category to browse devices.
        </p>
      </div>
      
      {/* Category Selection */}
      <div style={{ 
        padding: '20px', 
        borderBottom: '1px solid #e5e7eb',
        background: 'white'
      }}>
        <div style={{ marginBottom: '16px' }}>
          <h3 style={{ fontSize: '16px', fontWeight: '600', color: '#111827', margin: '0 0 12px 0' }}>
            Device Categories
          </h3>
          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))', 
            gap: '8px' 
          }}>
            {Object.entries(deviceCategories).map(([key, category]) => (
              <button
                key={key}
                onClick={() => setSelectedCategory(key)}
                style={{
                  padding: '12px 16px',
                  border: `2px solid ${selectedCategory === key ? '#E20074' : '#e5e7eb'}`,
                  borderRadius: '8px',
                  background: selectedCategory === key ? '#fdf2f8' : 'white',
                  color: selectedCategory === key ? '#E20074' : '#6b7280',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  transition: 'all 0.2s ease',
                  fontSize: '14px',
                  fontWeight: '500'
                }}
              >
                {getCategoryIcon(key)}
                <span>{category.name}</span>
                <span style={{ fontSize: '12px', opacity: 0.7 }}>
                  ({getDeviceCountByCategory(key)})
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Search and Filters */}
        <div style={{ display: 'flex', gap: '10px', marginBottom: '15px' }}>
          <div style={{ flex: 1, position: 'relative' }}>
            <Search size={16} style={{
              position: 'absolute', 
              left: '12px', 
              top: '50%', 
              transform: 'translateY(-50%)', 
              color: '#6b7280' 
            }} />
            <input
              type="text"
              placeholder={`Search ${deviceCategories[selectedCategory]?.name.toLowerCase()}...`}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              style={{
                width: '100%',
                padding: '12px 12px 12px 40px',
                border: '2px solid #e5e7eb',
                borderRadius: '8px',
                fontSize: '14px',
                outline: 'none',
                transition: 'border-color 0.2s ease'
              }}
              onFocus={(e) => e.target.style.borderColor = '#E20074'}
              onBlur={(e) => e.target.style.borderColor = '#e5e7eb'}
            />
          </div>
          <button
            onClick={() => setShowFilters(!showFilters)}
            style={{
              padding: '12px 16px',
              border: '2px solid #E20074',
              borderRadius: '8px',
              background: showFilters ? '#E20074' : 'white',
              color: showFilters ? 'white' : '#E20074',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              transition: 'all 0.2s ease',
              fontSize: '14px',
              fontWeight: '500'
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
            gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
            gap: '12px',
            padding: '16px',
            background: '#f9fafb',
            borderRadius: '8px',
            border: '1px solid #e5e7eb'
          }}>
            {/* Brand Filter */}
            <div>
              <label style={{ fontSize: '12px', fontWeight: '600', color: '#374151', marginBottom: '6px', display: 'block' }}>
                Brand
              </label>
              <select
                value={selectedBrand}
                onChange={(e) => setSelectedBrand(e.target.value)}
                style={{
                  width: '100%',
                  padding: '8px 12px',
                  border: '1px solid #d1d5db',
                  borderRadius: '6px',
                  fontSize: '14px',
                  background: 'white',
                  outline: 'none'
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
              <label style={{ fontSize: '12px', fontWeight: '600', color: '#374151', marginBottom: '6px', display: 'block' }}>
                Price Range
              </label>
              <select
                value={priceRange}
                onChange={(e) => setPriceRange(e.target.value)}
                style={{
                  width: '100%',
                  padding: '8px 12px',
                  border: '1px solid #d1d5db',
                  borderRadius: '6px',
                  fontSize: '14px',
                  background: 'white',
                  outline: 'none'
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
        {/* Current Category Header */}
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '20px',
          padding: '16px',
          background: '#f9fafb',
          borderRadius: '8px',
          border: '1px solid #e5e7eb'
        }}>
          <div>
            <h3 style={{ fontSize: '18px', fontWeight: '600', color: '#111827', margin: '0 0 4px 0' }}>
              {deviceCategories[selectedCategory]?.name} ({filteredDevices.length} devices)
            </h3>
            <p style={{ fontSize: '14px', color: '#6b7280', margin: 0 }}>
              Select devices for each line from the {deviceCategories[selectedCategory]?.name.toLowerCase()} category
            </p>
          </div>
        </div>

        {/* Line Selection Interface */}
        <div style={{ display: 'grid', gap: '20px' }}>
          {Array.from({ length: lines }, (_, lineIndex) => (
            <div key={lineIndex} style={{
              border: '1px solid #e5e7eb',
              borderRadius: '12px',
              overflow: 'hidden',
              background: 'white'
            }}>
              {/* Line Header */}
              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                padding: '16px 20px',
                background: selectedDevices[lineIndex] ? '#f0fdf4' : '#f9fafb',
                borderBottom: '1px solid #e5e7eb'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <div style={{
                    width: '32px',
                    height: '32px',
                    borderRadius: '50%',
                    background: selectedDevices[lineIndex] ? '#10b981' : '#6b7280',
                    color: 'white',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '14px',
                    fontWeight: '600'
                  }}>
                    {lineIndex + 1}
                  </div>
                  <div>
                    <h4 style={{ fontSize: '16px', fontWeight: '600', color: '#111827', margin: '0 0 2px 0' }}>
                      Line {lineIndex + 1}
                    </h4>
                    <p style={{ fontSize: '12px', color: '#6b7280', margin: 0 }}>
                      {selectedDevices[lineIndex] ? 'Device selected' : 'No device selected'}
                    </p>
                  </div>
                </div>
                
                {selectedDevices[lineIndex] && (
                  <button
                    onClick={() => handleDeviceRemove(lineIndex)}
                    style={{
                      padding: '8px 12px',
                      border: '1px solid #ef4444',
                      borderRadius: '6px',
                      background: 'white',
                      color: '#ef4444',
                      fontSize: '12px',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '4px',
                      transition: 'all 0.2s ease'
                    }}
                  >
                    <X size={12} />
                    Remove
                  </button>
                )}
              </div>

              {/* Device Grid */}
              <div style={{ padding: '20px' }}>
                <div style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
                  gap: '12px'
                }}>
                  {filteredDevices.map(device => renderDeviceCard(device, lineIndex))}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Total Cost Summary */}
        {Object.keys(selectedDevices).length > 0 && (
          <div style={{
            background: '#f9fafb',
            padding: '20px', 
            borderRadius: '12px',
            border: '1px solid #e5e7eb',
            marginTop: '24px'
          }}>
            <h3 style={{ fontSize: '18px', fontWeight: '600', marginBottom: '16px', color: '#111827' }}>
              Device Payment Summary
            </h3>
            <div style={{ 
              display: 'grid', 
              gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', 
              gap: '16px' 
            }}>
              <div>
                <div style={{ fontSize: '14px', color: '#6b7280', marginBottom: '4px' }}>
                  Total Monthly Device Payments
                </div>
                <div style={{ fontSize: '24px', fontWeight: '700', color: '#E20074' }}>
                  ${getTotalDeviceCost()}/mo
                </div>
              </div>
              <div>
                <div style={{ fontSize: '14px', color: '#6b7280', marginBottom: '4px' }}>
                  Devices Selected
                </div>
                <div style={{ fontSize: '20px', fontWeight: '600', color: '#111827' }}>
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
        borderTop: '1px solid #e5e7eb',
        background: '#f9fafb', 
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
            transition: 'all 0.2s ease',
            fontWeight: '500'
          }}
        >
          Back to Plans
        </button>
        
        <div style={{ fontSize: '14px', color: '#6b7280', textAlign: 'center' }}>
          {Object.keys(selectedDevices).length} of {lines} devices selected
        </div>
                          
        <button
          onClick={onNext}
          disabled={!isAllLinesConfigured}
          style={{
            padding: '12px 24px',
            border: '2px solid #E20074',
            borderRadius: '8px',
            background: isAllLinesConfigured ? '#E20074' : '#f3f4f6',
            color: isAllLinesConfigured ? 'white' : '#9ca3af',
            fontSize: '16px',
            cursor: isAllLinesConfigured ? 'pointer' : 'not-allowed',
            transition: 'all 0.2s ease',
            fontWeight: '500'
          }}
        >
          Continue to Port-In
        </button>
      </div>
    </div>
  );
};

export default DeviceSelection;