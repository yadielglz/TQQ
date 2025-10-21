import React, { useState, useEffect } from 'react';
import { MapPin, Search, ChevronDown, CheckCircle, AlertCircle, Info } from 'lucide-react';

const LocationSelector = ({ onLocationChange, initialLocation = null }) => {
  const [location, setLocation] = useState(initialLocation || {
    state: '',
    city: '',
    zipCode: '',
    county: ''
  });
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  // Mock location data - in a real app, this would come from an API
  const states = [
    { code: 'CA', name: 'California', taxRate: 0.0875, multiplier: 1.1 },
    { code: 'NY', name: 'New York', taxRate: 0.08, multiplier: 1.05 },
    { code: 'TX', name: 'Texas', taxRate: 0.0625, multiplier: 1.0 },
    { code: 'FL', name: 'Florida', taxRate: 0.06, multiplier: 1.0 },
    { code: 'WA', name: 'Washington', taxRate: 0.065, multiplier: 1.08 },
    { code: 'IL', name: 'Illinois', taxRate: 0.0625, multiplier: 1.02 },
    { code: 'PA', name: 'Pennsylvania', taxRate: 0.06, multiplier: 1.0 },
    { code: 'OH', name: 'Ohio', taxRate: 0.0575, multiplier: 1.0 },
    { code: 'GA', name: 'Georgia', taxRate: 0.04, multiplier: 1.0 },
    { code: 'NC', name: 'North Carolina', taxRate: 0.0475, multiplier: 1.0 },
    { code: 'MI', name: 'Michigan', taxRate: 0.06, multiplier: 1.0 },
    { code: 'NJ', name: 'New Jersey', taxRate: 0.06625, multiplier: 1.05 },
    { code: 'VA', name: 'Virginia', taxRate: 0.053, multiplier: 1.0 },
    { code: 'TN', name: 'Tennessee', taxRate: 0.07, multiplier: 1.0 },
    { code: 'IN', name: 'Indiana', taxRate: 0.07, multiplier: 1.0 },
    { code: 'AZ', name: 'Arizona', taxRate: 0.056, multiplier: 1.0 },
    { code: 'MA', name: 'Massachusetts', taxRate: 0.0625, multiplier: 1.08 },
    { code: 'MO', name: 'Missouri', taxRate: 0.04225, multiplier: 1.0 },
    { code: 'MD', name: 'Maryland', taxRate: 0.06, multiplier: 1.02 },
    { code: 'WI', name: 'Wisconsin', taxRate: 0.05, multiplier: 1.0 },
    { code: 'CO', name: 'Colorado', taxRate: 0.029, multiplier: 1.0 },
    { code: 'MN', name: 'Minnesota', taxRate: 0.06875, multiplier: 1.0 },
    { code: 'SC', name: 'South Carolina', taxRate: 0.06, multiplier: 1.0 },
    { code: 'AL', name: 'Alabama', taxRate: 0.04, multiplier: 1.0 },
    { code: 'LA', name: 'Louisiana', taxRate: 0.0445, multiplier: 1.0 },
    { code: 'KY', name: 'Kentucky', taxRate: 0.06, multiplier: 1.0 },
    { code: 'OR', name: 'Oregon', taxRate: 0, multiplier: 1.0 },
    { code: 'OK', name: 'Oklahoma', taxRate: 0.045, multiplier: 1.0 },
    { code: 'CT', name: 'Connecticut', taxRate: 0.0635, multiplier: 1.05 },
    { code: 'UT', name: 'Utah', taxRate: 0.047, multiplier: 1.0 },
    { code: 'IA', name: 'Iowa', taxRate: 0.06, multiplier: 1.0 },
    { code: 'NV', name: 'Nevada', taxRate: 0.0685, multiplier: 1.0 },
    { code: 'AR', name: 'Arkansas', taxRate: 0.065, multiplier: 1.0 },
    { code: 'MS', name: 'Mississippi', taxRate: 0.07, multiplier: 1.0 },
    { code: 'KS', name: 'Kansas', taxRate: 0.065, multiplier: 1.0 },
    { code: 'NM', name: 'New Mexico', taxRate: 0.05125, multiplier: 1.0 },
    { code: 'NE', name: 'Nebraska', taxRate: 0.055, multiplier: 1.0 },
    { code: 'WV', name: 'West Virginia', taxRate: 0.06, multiplier: 1.0 },
    { code: 'ID', name: 'Idaho', taxRate: 0.06, multiplier: 1.0 },
    { code: 'HI', name: 'Hawaii', taxRate: 0.04, multiplier: 1.15 },
    { code: 'NH', name: 'New Hampshire', taxRate: 0, multiplier: 1.0 },
    { code: 'ME', name: 'Maine', taxRate: 0.055, multiplier: 1.0 },
    { code: 'RI', name: 'Rhode Island', taxRate: 0.07, multiplier: 1.05 },
    { code: 'MT', name: 'Montana', taxRate: 0, multiplier: 1.0 },
    { code: 'DE', name: 'Delaware', taxRate: 0, multiplier: 1.0 },
    { code: 'SD', name: 'South Dakota', taxRate: 0.045, multiplier: 1.0 },
    { code: 'ND', name: 'North Dakota', taxRate: 0.05, multiplier: 1.0 },
    { code: 'AK', name: 'Alaska', taxRate: 0, multiplier: 1.2 },
    { code: 'VT', name: 'Vermont', taxRate: 0.06, multiplier: 1.0 },
    { code: 'WY', name: 'Wyoming', taxRate: 0.04, multiplier: 1.0 },
    { code: 'DC', name: 'District of Columbia', taxRate: 0.06, multiplier: 1.1 }
  ];

  const filteredStates = states.filter(state =>
    state.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    state.code.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleStateSelect = (selectedState) => {
    const newLocation = {
      ...location,
      state: selectedState.code,
      stateName: selectedState.name
    };
    setLocation(newLocation);
    setIsOpen(false);
    setSearchTerm('');
    onLocationChange(newLocation);
  };

  const handleZipCodeChange = async (zipCode) => {
    if (zipCode.length === 5) {
      setIsLoading(true);
      setError('');
      
      try {
        // Simulate API call to get location from ZIP code
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        // Mock response - in a real app, this would call a geocoding API
        const mockResponse = {
          city: 'Sample City',
          state: 'TX',
          stateName: 'Texas',
          county: 'Sample County'
        };
        
        const newLocation = {
          ...location,
          zipCode,
          city: mockResponse.city,
          state: mockResponse.state,
          stateName: mockResponse.stateName,
          county: mockResponse.county
        };
        
        setLocation(newLocation);
        onLocationChange(newLocation);
      } catch (err) {
        setError('Unable to find location for this ZIP code');
      } finally {
        setIsLoading(false);
      }
    } else {
      const newLocation = { ...location, zipCode };
      setLocation(newLocation);
      onLocationChange(newLocation);
    }
  };

  const getTaxRateColor = (taxRate) => {
    if (taxRate === 0) return '#4CAF50';
    if (taxRate < 0.05) return '#8BC34A';
    if (taxRate < 0.07) return '#FFC107';
    return '#FF9800';
  };

  const getMultiplierColor = (multiplier) => {
    if (multiplier === 1.0) return '#4CAF50';
    if (multiplier < 1.05) return '#8BC34A';
    if (multiplier < 1.1) return '#FFC107';
    return '#FF9800';
  };

  return (
    <div style={{
      background: '#f8f9fa',
      padding: '20px',
      borderRadius: '12px',
      border: '1px solid #e0e0e0',
      marginBottom: '20px'
    }}>
      <h3 style={{
        fontSize: '18px',
        fontWeight: '600',
        marginBottom: '15px',
        color: '#E20074',
        display: 'flex',
        alignItems: 'center',
        gap: '8px'
      }}>
        <MapPin size={20} />
        Service Location
      </h3>

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
        gap: '15px',
        marginBottom: '15px'
      }}>
        {/* ZIP Code Input */}
        <div>
          <label style={{
            display: 'block',
            fontSize: '14px',
            fontWeight: '500',
            color: '#333',
            marginBottom: '8px'
          }}>
            ZIP Code *
          </label>
          <div style={{ position: 'relative' }}>
            <input
              type="text"
              value={location.zipCode}
              onChange={(e) => handleZipCodeChange(e.target.value)}
              maxLength="5"
              style={{
                width: '100%',
                padding: '12px',
                border: '2px solid #e0e0e0',
                borderRadius: '8px',
                fontSize: '16px',
                paddingRight: isLoading ? '40px' : '12px'
              }}
              placeholder="12345"
            />
            {isLoading && (
              <div style={{
                position: 'absolute',
                right: '12px',
                top: '50%',
                transform: 'translateY(-50%)',
                color: '#E20074'
              }}>
                <div style={{
                  width: '16px',
                  height: '16px',
                  border: '2px solid #E20074',
                  borderTop: '2px solid transparent',
                  borderRadius: '50%',
                  animation: 'spin 1s linear infinite'
                }} />
              </div>
            )}
          </div>
        </div>

        {/* State Selection */}
        <div>
          <label style={{
            display: 'block',
            fontSize: '14px',
            fontWeight: '500',
            color: '#333',
            marginBottom: '8px'
          }}>
            State *
          </label>
          <div style={{ position: 'relative' }}>
            <button
              type="button"
              onClick={() => setIsOpen(!isOpen)}
              style={{
                width: '100%',
                padding: '12px',
                border: '2px solid #e0e0e0',
                borderRadius: '8px',
                fontSize: '16px',
                background: 'white',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                textAlign: 'left'
              }}
            >
              <span>{location.stateName || 'Select State'}</span>
              <ChevronDown size={16} />
            </button>

            {isOpen && (
              <div style={{
                position: 'absolute',
                top: '100%',
                left: 0,
                right: 0,
                background: 'white',
                border: '1px solid #e0e0e0',
                borderRadius: '8px',
                boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
                zIndex: 1000,
                maxHeight: '300px',
                overflow: 'hidden'
              }}>
                {/* Search Input */}
                <div style={{ padding: '10px', borderBottom: '1px solid #e0e0e0' }}>
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
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      placeholder="Search states..."
                      style={{
                        width: '100%',
                        padding: '8px 8px 8px 35px',
                        border: '1px solid #e0e0e0',
                        borderRadius: '6px',
                        fontSize: '14px'
                      }}
                    />
                  </div>
                </div>

                {/* State List */}
                <div style={{ maxHeight: '200px', overflowY: 'auto' }}>
                  {filteredStates.map((state) => (
                    <button
                      key={state.code}
                      onClick={() => handleStateSelect(state)}
                      style={{
                        width: '100%',
                        padding: '12px 15px',
                        border: 'none',
                        background: 'white',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        textAlign: 'left',
                        borderBottom: '1px solid #f0f0f0',
                        transition: 'background-color 0.2s ease'
                      }}
                      onMouseOver={(e) => e.target.style.background = '#f8f9fa'}
                      onMouseOut={(e) => e.target.style.background = 'white'}
                    >
                      <div>
                        <div style={{ fontSize: '14px', fontWeight: '500' }}>
                          {state.name}
                        </div>
                        <div style={{ fontSize: '12px', color: '#666' }}>
                          {state.code}
                        </div>
                      </div>
                      <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                        <div style={{
                          fontSize: '10px',
                          padding: '2px 6px',
                          borderRadius: '4px',
                          background: getTaxRateColor(state.taxRate),
                          color: 'white',
                          fontWeight: 'bold'
                        }}>
                          {(state.taxRate * 100).toFixed(2)}% tax
                        </div>
                        <div style={{
                          fontSize: '10px',
                          padding: '2px 6px',
                          borderRadius: '4px',
                          background: getMultiplierColor(state.multiplier),
                          color: 'white',
                          fontWeight: 'bold'
                        }}>
                          {state.multiplier}x
                        </div>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* City Display */}
        {location.city && (
          <div>
            <label style={{
              display: 'block',
              fontSize: '14px',
              fontWeight: '500',
              color: '#333',
              marginBottom: '8px'
            }}>
              City
            </label>
            <div style={{
              padding: '12px',
              background: '#e8f5e8',
              border: '1px solid #4CAF50',
              borderRadius: '8px',
              fontSize: '16px',
              color: '#2E7D32',
              fontWeight: '500'
            }}>
              {location.city}
            </div>
          </div>
        )}

        {/* County Display */}
        {location.county && (
          <div>
            <label style={{
              display: 'block',
              fontSize: '14px',
              fontWeight: '500',
              color: '#333',
              marginBottom: '8px'
            }}>
              County
            </label>
            <div style={{
              padding: '12px',
              background: '#e3f2fd',
              border: '1px solid #2196F3',
              borderRadius: '8px',
              fontSize: '16px',
              color: '#1976d2',
              fontWeight: '500'
            }}>
              {location.county}
            </div>
          </div>
        )}
      </div>

      {/* Error Message */}
      {error && (
        <div style={{
          background: '#f8d7da',
          color: '#721c24',
          padding: '12px',
          borderRadius: '8px',
          marginBottom: '15px',
          display: 'flex',
          alignItems: 'center',
          gap: '8px'
        }}>
          <AlertCircle size={16} />
          {error}
        </div>
      )}

      {/* Location Info */}
      {location.state && (
        <div style={{
          background: '#e8f5e8',
          border: '1px solid #4CAF50',
          borderRadius: '8px',
          padding: '15px',
          marginTop: '15px'
        }}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            marginBottom: '10px'
          }}>
            <CheckCircle size={16} color="#4CAF50" />
            <span style={{ fontWeight: '600', color: '#2E7D32' }}>
              Location Verified
            </span>
          </div>
          
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))',
            gap: '10px',
            fontSize: '14px'
          }}>
            <div>
              <strong>State:</strong> {location.stateName} ({location.state})
            </div>
            {location.city && <div><strong>City:</strong> {location.city}</div>}
            {location.county && <div><strong>County:</strong> {location.county}</div>}
            <div>
              <strong>ZIP:</strong> {location.zipCode}
            </div>
          </div>

          <div style={{
            marginTop: '10px',
            padding: '8px',
            background: 'white',
            borderRadius: '6px',
            fontSize: '12px',
            color: '#666'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '4px' }}>
              <Info size={12} />
              <strong>Pricing Impact:</strong>
            </div>
            <div>
              • State tax rate and pricing multipliers will be applied to your quote
              • Some promotions may vary by location
              • Final pricing will be calculated based on your service location
            </div>
          </div>
        </div>
      )}

      {/* Click outside to close dropdown */}
      {isOpen && (
        <div
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            zIndex: 999
          }}
          onClick={() => setIsOpen(false)}
        />
      )}
    </div>
  );
};

export default LocationSelector;

