import React, { useState, useRef } from 'react';
import { Download, Share2, Phone, ArrowLeft, RotateCcw, Copy, Mail, MessageSquare, Calendar, TrendingUp, BarChart3, FileText, QrCode, Eye, EyeOff, Star, Clock, DollarSign, Users, Wifi, Smartphone, Home, Watch, Scale } from 'lucide-react';
import jsPDF from 'jspdf';

const QuoteSummary = ({ 
  customerData, 
  voiceLinesData, 
  dataLinesData, 
  iotLinesData, 
  homeInternetData,
  equipmentCreditData, 
  discountsData, 
  onPrev, 
  onClearData 
}) => {
  const [showDetailedBreakdown, setShowDetailedBreakdown] = useState(false);
  const [showComparison, setShowComparison] = useState(false);
  const [shareModalOpen, setShareModalOpen] = useState(false);
  const [shareMethod, setShareMethod] = useState('email');
  const [quoteId] = useState(() => `TMO-${Date.now()}`);
  const [isPublic, setIsPublic] = useState(false);
  const [shareUrl, setShareUrl] = useState('');
  const [comparisonData, setComparisonData] = useState(null);
  const quoteRef = useRef(null);

  const planOptions = [
    { 
      id: 'essentials', 
      name: 'Experience Essentials', 
      pricing: { 1: 50, 2: 80, 3: 90, 4: 100, 5: 120, 6: 135, additional: 35 },
      features: ['Unlimited talk, text & data', '5GB mobile hotspot', 'SD video streaming']
    },
    { 
      id: 'more', 
      name: 'Experience More', 
      pricing: { 1: 85, 2: 140, 3: 140, 4: 170, 5: 200, 6: 230, additional: 35 },
      features: ['Unlimited talk, text & data', '15GB mobile hotspot', 'HD video streaming', 'Scam Shield']
    },
    { 
      id: 'beyond', 
      name: 'Experience Beyond', 
      pricing: { 1: 100, 2: 170, 3: 170, 4: 215, 5: 260, 6: 305, additional: 35 },
      features: ['Unlimited talk, text & data', '50GB mobile hotspot', '4K video streaming', 'Scam Shield Premium', 'Netflix on Us']
    }
  ];

  const deviceOptions = [
    { id: 'iphone-air', name: 'iPhone Air', monthlyPrice: 42, price: 999, tier: 5, brand: 'Apple', category: 'smartphone' },
    { id: 'iphone-17-pro-max', name: 'iPhone 17 Pro Max', monthlyPrice: 50, price: 1199, tier: 6, brand: 'Apple', category: 'smartphone' },
    { id: 'iphone-17-pro', name: 'iPhone 17 Pro', monthlyPrice: 46, price: 1099, tier: 5, brand: 'Apple', category: 'smartphone' },
    { id: 'iphone-17', name: 'iPhone 17', monthlyPrice: 33, price: 799, tier: 4, brand: 'Apple', category: 'smartphone' },
    { id: 'iphone-16e', name: 'iPhone 16e', monthlyPrice: 25, price: 599, tier: 3, brand: 'Apple', category: 'smartphone' },
    { id: 'iphone-16-pro-max', name: 'iPhone 16 Pro Max', monthlyPrice: 50, price: 1199, tier: 6, brand: 'Apple', category: 'smartphone' },
    { id: 'iphone-16-pro', name: 'iPhone 16 Pro', monthlyPrice: 46, price: 1099, tier: 5, brand: 'Apple', category: 'smartphone' },
    { id: 'iphone-16-plus', name: 'iPhone 16 Plus', monthlyPrice: 38, price: 899, tier: 4, brand: 'Apple', category: 'smartphone' },
    { id: 'iphone-16', name: 'iPhone 16', monthlyPrice: 33, price: 799, tier: 4, brand: 'Apple', category: 'smartphone' },
    { id: 'iphone-15', name: 'iPhone 15', monthlyPrice: 29, price: 699, tier: 4, brand: 'Apple', category: 'smartphone' },
    { id: 'pixel-10-pro-xl', name: 'Pixel 10 Pro XL', monthlyPrice: 50, price: 1199, tier: 6, brand: 'Google', category: 'smartphone' },
    { id: 'pixel-10-pro', name: 'Pixel 10 Pro', monthlyPrice: 42, price: 999, tier: 5, brand: 'Google', category: 'smartphone' },
    { id: 'pixel-10', name: 'Pixel 10', monthlyPrice: 29, price: 699, tier: 4, brand: 'Google', category: 'smartphone' },
    { id: 'pixel-9a', name: 'Pixel 9A', monthlyPrice: 21, price: 499, tier: 3, brand: 'Google', category: 'smartphone' },
    { id: 'galaxy-s25-edge', name: 'Galaxy S25 Edge', monthlyPrice: 54, price: 1299, tier: 6, brand: 'Samsung', category: 'smartphone' },
    { id: 'galaxy-s25-ultra', name: 'Galaxy S25 Ultra', monthlyPrice: 54, price: 1299, tier: 6, brand: 'Samsung', category: 'smartphone' },
    { id: 'galaxy-s25-plus', name: 'Galaxy S25+', monthlyPrice: 42, price: 999, tier: 5, brand: 'Samsung', category: 'smartphone' },
    { id: 'galaxy-s25', name: 'Galaxy S25', monthlyPrice: 33, price: 799, tier: 4, brand: 'Samsung', category: 'smartphone' },
    { id: 'galaxy-s25-fe', name: 'Galaxy S25 FE', monthlyPrice: 25, price: 599, tier: 3, brand: 'Samsung', category: 'smartphone' },
    { id: 'galaxy-a36', name: 'Galaxy A36', monthlyPrice: 17, price: 399, tier: 2, brand: 'Samsung', category: 'smartphone' },
    { id: 'galaxy-z-fold-7', name: 'Galaxy Z Fold 7', monthlyPrice: 75, price: 1799, tier: 6, brand: 'Samsung', category: 'foldable' },
    { id: 'galaxy-z-flip-7', name: 'Galaxy Z Flip 7', monthlyPrice: 42, price: 999, tier: 5, brand: 'Samsung', category: 'foldable' },
    { id: 'razr-ultra', name: 'Razr Ultra', monthlyPrice: 42, price: 999, tier: 5, brand: 'Motorola', category: 'foldable' },
    { id: 'razr-plus-2025', name: 'Razr+ 2025', monthlyPrice: 33, price: 799, tier: 4, brand: 'Motorola', category: 'foldable' },
    { id: 'razr-2025', name: 'Razr 2025', monthlyPrice: 25, price: 599, tier: 3, brand: 'Motorola', category: 'foldable' },
    { id: 'edge-2025', name: 'Edge 2025', monthlyPrice: 29, price: 699, tier: 4, brand: 'Motorola', category: 'smartphone' },
    { id: 'g-power-2025', name: 'G Power 2025', monthlyPrice: 13, price: 299, tier: 2, brand: 'Motorola', category: 'smartphone' },
    { id: 'g-2025', name: 'G 2025', monthlyPrice: 8, price: 199, tier: 1, brand: 'Motorola', category: 'smartphone' },
    { id: 'revvl-pro-8', name: 'Revvl Pro 8', monthlyPrice: 17, price: 399, tier: 2, brand: 'Revvl', category: 'smartphone' },
    { id: 'bring-your-own', name: 'Bring Your Own Device', monthlyPrice: 0, price: 0, tier: 5, brand: 'BYOD', category: 'byod' }
  ];

  const protectionTiers = [
    { tier: 1, price: 7, name: 'P360 Basic' },
    { tier: 2, price: 9, name: 'P360 Standard' },
    { tier: 3, price: 13, name: 'P360 Plus' },
    { tier: 4, price: 16, name: 'P360 Premium' },
    { tier: 5, price: 18, name: 'P360 Elite' },
    { tier: 6, price: 25, name: 'P360 Ultimate' }
  ];

  const getPlanName = (planId) => {
    const plan = planOptions.find(p => p.id === planId);
    return plan ? plan.name : 'Unknown Plan';
  };

  const getDeviceName = (deviceId) => {
    const device = deviceOptions.find(d => d.id === deviceId);
    return device ? device.name : 'Unknown Device';
  };

  const getDevicePrice = (deviceId) => {
        const device = deviceOptions.find(d => d.id === deviceId);
    return device ? device.monthlyPrice : 0;
  };

  const getProtectionPrice = (deviceId) => {
        const device = deviceOptions.find(d => d.id === deviceId);
    if (!device) return 0;
    
    const protection = protectionTiers.find(p => p.tier === device.tier);
    return protection ? protection.price : 0;
  };

  const calculateVoiceTotal = () => {
    if (!voiceLinesData || !voiceLinesData.plans) return 0;
    
    let total = 0;
    
    // Calculate plan costs - family plans have shared pricing, not per-line pricing
    if (Object.keys(voiceLinesData.plans).length > 0) {
      // Get the first plan (assuming all lines are on the same plan for family plans)
      const firstPlanId = Object.values(voiceLinesData.plans)[0];
      const plan = planOptions.find(p => p.id === firstPlanId);
      if (plan) {
        const lines = voiceLinesData.quantity || 1;
        if (lines <= 6) {
          total += plan.pricing[lines] || 0;
        } else {
          total += plan.pricing[6] + (lines - 6) * plan.pricing.additional;
        }
      }
    }
    
    // Add device costs - these are per-line
    if (voiceLinesData.devices) {
      Object.values(voiceLinesData.devices).forEach(deviceId => {
        total += getDevicePrice(deviceId);
      });
    }
    
    // Add protection costs - these are per-line
    if (voiceLinesData.protection) {
      Object.values(voiceLinesData.protection).forEach(protectionId => {
        const protectionPrices = {
          'p360-tier1': 7, 'p360-tier2': 9, 'p360-tier3': 13,
          'p360-tier4': 16, 'p360-tier5': 18, 'p360-tier6': 25
        };
        total += protectionPrices[protectionId] || 0;
      });
    }
    
    return total;
  };

  const calculateDataTotal = () => {
    return dataLinesData?.totalMonthly || 0;
  };

  const calculateIoTTotal = () => {
    return iotLinesData?.totalMonthly || 0;
  };

  const calculateHomeInternetTotal = () => {
    return homeInternetData?.totalMonthly || 0;
  };

  const calculateDiscounts = () => {
    let totalDiscounts = 0;
    
    if (discountsData?.autoPay) {
      // $5 per line up to 8 lines
      const totalLines = (voiceLinesData?.quantity || 0) + 
                        (dataLinesData?.quantity || 0) + 
                        (iotLinesData?.quantity || 0);
      totalDiscounts += Math.min(totalLines, 8) * 5;
    }
    
    if (discountsData?.senior55) {
      // 20% off voice plans only (not devices/protection)
      if (voiceLinesData && voiceLinesData.plans && Object.keys(voiceLinesData.plans).length > 0) {
        const firstPlanId = Object.values(voiceLinesData.plans)[0];
        const plan = planOptions.find(p => p.id === firstPlanId);
        if (plan) {
          const lines = voiceLinesData.quantity || 1;
          let planCost = 0;
          if (lines <= 6) {
            planCost = plan.pricing[lines] || 0;
          } else {
            planCost = plan.pricing[6] + (lines - 6) * plan.pricing.additional;
          }
          totalDiscounts += planCost * 0.2;
        }
      }
    }
    
    if (discountsData?.tmobileInsider) {
      // 15% off all services
      const allServicesTotal = calculateVoiceTotal() + calculateDataTotal() + 
                              calculateIoTTotal() + calculateHomeInternetTotal();
      totalDiscounts += allServicesTotal * 0.15;
    }
    
    return totalDiscounts;
  };

  const calculateTotal = () => {
    const servicesTotal = calculateVoiceTotal() + calculateDataTotal() + 
                         calculateIoTTotal() + calculateHomeInternetTotal();
    const discounts = calculateDiscounts();
    const equipmentFinancing = equipmentCreditData?.monthlyFinancing || 0;
    
    return servicesTotal - discounts + equipmentFinancing;
  };

  const getPlanPrice = (planId, lines) => {
      const plan = planOptions.find(p => p.id === planId);
    if (!plan) return 0;
    
    if (lines <= 6) {
      return plan.pricing[lines] || 0;
    } else {
      return plan.pricing[6] + (lines - 6) * plan.pricing.additional;
    }
  };

  const generateShareUrl = () => {
    const baseUrl = window.location.origin;
    const quoteData = {
      customerData,
      voiceLinesData,
      dataLinesData,
      iotLinesData,
      homeInternetData,
      equipmentCreditData,
      discountsData,
      timestamp: new Date().toISOString(),
      quoteId
    };
    
    // In a real app, this would be stored on a server and return a short URL
    const encodedData = btoa(JSON.stringify(quoteData));
    const url = `${baseUrl}/quote/${quoteId}?data=${encodedData}`;
    setShareUrl(url);
    return url;
  };

  const copyToClipboard = async (text) => {
    try {
      await navigator.clipboard.writeText(text);
      // Show success message
    } catch (err) {
      console.error('Failed to copy: ', err);
    }
  };

  const generatePDF = () => {
    const doc = new jsPDF();
    
    // Header with T-Mobile branding
    doc.setFillColor(226, 0, 116);
    doc.rect(0, 0, 210, 30, 'F');
    doc.setTextColor(255, 255, 255);
    doc.setFontSize(20);
    doc.text('T-Mobile Quote Summary', 20, 20);
    
    // Quote ID and date
    doc.setFontSize(10);
    doc.text(`Quote ID: ${quoteId}`, 20, 35);
    doc.text(`Generated: ${new Date().toLocaleDateString()}`, 20, 40);
    
    // Customer Info
    if (customerData) {
    doc.setFontSize(12);
    doc.setTextColor(0, 0, 0);
      doc.text(`Customer: ${customerData.firstName} ${customerData.lastName}`, 20, 55);
      doc.text(`Email: ${customerData.email}`, 20, 65);
      doc.text(`Phone: ${customerData.phone}`, 20, 75);
    }
    
    let yPosition = 90;
    
    // Voice Lines
    if (voiceLinesData && voiceLinesData.quantity > 0) {
    doc.setFontSize(14);
    doc.setTextColor(226, 0, 116);
      doc.text('Voice Lines', 20, yPosition);
    yPosition += 10;
    
    doc.setFontSize(10);
    doc.setTextColor(0, 0, 0);
      doc.text(`Lines: ${voiceLinesData.quantity}`, 20, yPosition);
    yPosition += 7;
      
      if (voiceLinesData.plans) {
        Object.values(voiceLinesData.plans).forEach((planId, i) => {
          doc.text(`Line ${i + 1}: ${getPlanName(planId)} - $${getPlanPrice(planId, voiceLinesData.quantity)}/mo`, 20, yPosition);
    yPosition += 7;
        });
      }
      
      yPosition += 10;
    }
    
    // Data Lines
    if (dataLinesData && dataLinesData.quantity > 0) {
    doc.setFontSize(14);
    doc.setTextColor(226, 0, 116);
      doc.text('Data Lines', 20, yPosition);
    yPosition += 10;
    
    doc.setFontSize(10);
    doc.setTextColor(0, 0, 0);
      doc.text(`Category: ${dataLinesData.category}`, 20, yPosition);
      yPosition += 7;
      doc.text(`Lines: ${dataLinesData.quantity}`, 20, yPosition);
      yPosition += 7;
      doc.text(`Monthly Cost: $${dataLinesData.totalMonthly}`, 20, yPosition);
      yPosition += 15;
    }
    
    // IoT Lines
    if (iotLinesData && iotLinesData.quantity > 0) {
      doc.setFontSize(14);
    doc.setTextColor(226, 0, 116);
      doc.text('IoT Lines', 20, yPosition);
    yPosition += 10;
    
    doc.setFontSize(10);
    doc.setTextColor(0, 0, 0);
      doc.text(`Lines: ${iotLinesData.quantity}`, 20, yPosition);
      yPosition += 7;
      doc.text(`Monthly Cost: $${iotLinesData.totalMonthly}`, 20, yPosition);
      yPosition += 15;
    }
    
    // Home Internet
    if (homeInternetData && homeInternetData.device) {
      doc.setFontSize(14);
    doc.setTextColor(226, 0, 116);
      doc.text('Home Internet', 20, yPosition);
    yPosition += 10;
    
    doc.setFontSize(10);
    doc.setTextColor(0, 0, 0);
      doc.text(`Monthly Cost: $${homeInternetData.totalMonthly}`, 20, yPosition);
      yPosition += 15;
    }
    
    // Equipment Credit
    if (equipmentCreditData) {
      doc.setFontSize(14);
    doc.setTextColor(226, 0, 116);
      doc.text('Equipment Credit & Financing', 20, yPosition);
    yPosition += 10;
    
    doc.setFontSize(10);
    doc.setTextColor(0, 0, 0);
      doc.text(`EC Amount: $${equipmentCreditData.amount || 0}`, 20, yPosition);
    yPosition += 7;
      doc.text(`Down Payment: $${equipmentCreditData.downPayment || 0}`, 20, yPosition);
    yPosition += 7;
      doc.text(`Monthly Financing: $${equipmentCreditData.monthlyFinancing || 0}`, 20, yPosition);
      yPosition += 15;
    }
    
    // Discounts
    if (discountsData) {
      doc.setFontSize(14);
    doc.setTextColor(226, 0, 116);
      doc.text('Discounts', 20, yPosition);
    yPosition += 10;
    
    doc.setFontSize(10);
    doc.setTextColor(0, 0, 0);
      if (discountsData.autoPay) doc.text('Auto Pay: $5 per line', 20, yPosition);
      if (discountsData.senior55) doc.text('Senior 55+: 20% off', 20, yPosition);
      if (discountsData.tmobileInsider) doc.text('T-Mobile Insider: 15% off', 20, yPosition);
      yPosition += 15;
    }
    
    // Total
    doc.setFontSize(16);
    doc.setTextColor(226, 0, 116);
    doc.text(`Total Monthly Cost: $${calculateTotal().toFixed(2)}`, 20, yPosition);
    
    doc.save(`tmobile-quote-${quoteId}.pdf`);
  };

  const generateComparisonData = () => {
    const currentTotal = calculateTotal();
    const savings = calculateDiscounts();
    
    // Generate alternative scenarios
    const scenarios = [
      {
        name: 'Current Quote',
        total: currentTotal,
        savings: savings,
        features: ['All selected services', 'Applied discounts', 'Equipment financing']
      },
      {
        name: 'No Discounts',
        total: currentTotal + savings,
        savings: 0,
        features: ['All selected services', 'No discounts applied', 'Equipment financing']
      },
      {
        name: 'Budget Option',
        total: currentTotal * 0.7, // 30% less
        savings: savings * 0.5,
        features: ['Essential services only', 'Basic devices', 'Minimal financing']
      }
    ];
    
    setComparisonData(scenarios);
    setShowComparison(true);
  };

  const getSavingsPercentage = () => {
    const totalBeforeDiscounts = calculateTotal() + calculateDiscounts();
    const discounts = calculateDiscounts();
    return totalBeforeDiscounts > 0 ? (discounts / totalBeforeDiscounts) * 100 : 0;
  };

  const getTotalLines = () => {
    return (voiceLinesData?.quantity || 0) + 
           (dataLinesData?.quantity || 0) + 
           (iotLinesData?.quantity || 0);
  };

  return (
    <div style={{
      maxWidth: '100%',
      margin: '0 auto',
      padding: '15px 10px',
      background: 'white',
      borderRadius: '10px',
      boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
      height: 'calc(100vh - 120px)',
      overflowY: 'auto'
    }} ref={quoteRef}>
      <div style={{
        textAlign: 'center',
        marginBottom: '20px'
      }}>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '10px',
          marginBottom: '8px'
        }}>
          <Phone size={24} color="#E20074" />
          <h2 style={{
            fontSize: '24px',
            fontWeight: '700',
            color: '#E20074',
            margin: 0
          }}>
            Quote Summary
          </h2>
        </div>
      </div>
      
      {/* Quote Header */}
      <div style={{
        background: 'linear-gradient(135deg, #E20074, #1E88E5)',
        color: 'white',
        padding: '20px',
        borderRadius: '12px',
        marginBottom: '30px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center'
      }}>
        <div>
          <h2 style={{ fontSize: '20px', fontWeight: '600', marginBottom: '5px' }}>
            Your T-Mobile Quote
          </h2>
          <p style={{ fontSize: '14px', opacity: 0.9, margin: 0 }}>
            Quote ID: {quoteId} • Generated: {new Date().toLocaleDateString()}
          </p>
        </div>
        <div style={{ textAlign: 'right' }}>
          <div style={{ fontSize: '28px', fontWeight: '700', marginBottom: '5px' }}>
            ${calculateTotal().toFixed(2)}/mo
          </div>
          <div style={{ fontSize: '12px', opacity: 0.9 }}>
            {getTotalLines()} lines • {getSavingsPercentage().toFixed(1)}% savings
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(120px, 1fr))',
        gap: '10px',
        marginBottom: '30px'
      }}>
        <button
          onClick={() => setShowDetailedBreakdown(!showDetailedBreakdown)}
          style={{
            padding: '12px',
            border: '2px solid #E20074',
            borderRadius: '8px',
            background: showDetailedBreakdown ? '#E20074' : 'white',
            color: showDetailedBreakdown ? 'white' : '#E20074',
            fontSize: '14px',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '6px'
          }}
        >
          {showDetailedBreakdown ? <EyeOff size={16} /> : <Eye size={16} />}
          {showDetailedBreakdown ? 'Hide' : 'Show'} Details
        </button>
        
        <button
          onClick={generateComparisonData}
          style={{
            padding: '12px',
            border: '2px solid #4CAF50',
            borderRadius: '8px',
            background: 'white',
            color: '#4CAF50',
            fontSize: '14px',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '6px'
          }}
        >
          <BarChart3 size={16} />
          Compare
        </button>
        
        <button
          onClick={() => setShareModalOpen(true)}
          style={{
            padding: '12px',
            border: '2px solid #2196F3',
            borderRadius: '8px',
            background: 'white',
            color: '#2196F3',
            fontSize: '14px',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '6px'
          }}
        >
          <Share2 size={16} />
          Share
        </button>
        
        <button 
          onClick={generatePDF}
          style={{
            padding: '12px',
            border: '2px solid #FF9800',
            borderRadius: '8px',
            background: 'white',
            color: '#FF9800',
            fontSize: '14px',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '6px'
          }}
        >
          <Download size={16} />
          PDF
        </button>
      </div>
      
      {/* Customer Information */}
      {customerData && (
        <div style={{
          background: '#f8f9fa',
          padding: '20px',
          borderRadius: '12px',
          marginBottom: '30px',
          border: '1px solid #e0e0e0'
        }}>
          <h3 style={{ fontSize: '18px', fontWeight: '600', marginBottom: '15px', color: '#E20074' }}>
            Customer Information
          </h3>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '10px' }}>
            <div><strong>Name:</strong> {customerData.firstName} {customerData.lastName}</div>
            <div><strong>Email:</strong> {customerData.email}</div>
            <div><strong>Phone:</strong> {customerData.phone}</div>
          </div>
        </div>
      )}
      
      {/* Services Summary */}
      <div style={{ marginBottom: '30px' }}>
        <h3 style={{ fontSize: '18px', fontWeight: '600', marginBottom: '20px', color: '#E20074' }}>
          Services Summary
        </h3>
        
        {/* Voice Lines */}
        {voiceLinesData && voiceLinesData.quantity > 0 && (
          <div style={{
            background: 'white',
            border: '1px solid #e0e0e0',
              borderRadius: '8px',
            padding: '20px',
            marginBottom: '15px'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '15px' }}>
              <Smartphone size={20} color="#E20074" />
              <h4 style={{ fontSize: '16px', fontWeight: '600', margin: 0 }}>
                Voice Lines ({voiceLinesData.quantity})
              </h4>
            </div>
            
            {showDetailedBreakdown && voiceLinesData.plans && (
              <div style={{ marginBottom: '15px' }}>
                {Object.values(voiceLinesData.plans).map((planId, i) => (
                  <div key={i} style={{ 
                    marginBottom: '8px', 
                    fontSize: '14px',
                    padding: '8px',
                    background: '#f8f9fa',
                    borderRadius: '6px'
                  }}>
                    <div style={{ fontWeight: '600' }}>Line {i + 1}: {getPlanName(planId)}</div>
                    <div style={{ color: '#666' }}>${getPlanPrice(planId, voiceLinesData.quantity)}/mo</div>
            </div>
                ))}
              </div>
            )}
            
            <div style={{ fontWeight: '600', marginTop: '10px', fontSize: '16px' }}>
              Voice Total: ${calculateVoiceTotal()}/mo
              </div>
              </div>
            )}

        {/* Data Lines */}
        {dataLinesData && dataLinesData.quantity > 0 && (
            <div style={{
            background: 'white',
            border: '1px solid #e0e0e0',
            borderRadius: '8px',
            padding: '20px',
            marginBottom: '15px'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '15px' }}>
              <Wifi size={20} color="#E20074" />
              <h4 style={{ fontSize: '16px', fontWeight: '600', margin: 0 }}>
                Data Lines ({dataLinesData.quantity}) - {dataLinesData.category}
              </h4>
              </div>
            <div style={{ fontSize: '14px', marginBottom: '10px' }}>
              Monthly Cost: ${dataLinesData.totalMonthly}/mo
            </div>
          </div>
        )}

        {/* IoT Lines */}
        {iotLinesData && iotLinesData.quantity > 0 && (
          <div style={{
            background: 'white',
            border: '1px solid #e0e0e0',
              borderRadius: '8px',
            padding: '20px',
            marginBottom: '15px'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '15px' }}>
              <Watch size={20} color="#E20074" />
              <h4 style={{ fontSize: '16px', fontWeight: '600', margin: 0 }}>
                IoT Lines ({iotLinesData.quantity})
              </h4>
            </div>
            <div style={{ fontSize: '14px', marginBottom: '10px' }}>
              Monthly Cost: ${iotLinesData.totalMonthly}/mo
            </div>
            </div>
        )}
            
        {/* Home Internet */}
        {homeInternetData && homeInternetData.device && (
            <div style={{
            background: 'white',
            border: '1px solid #e0e0e0',
            borderRadius: '8px',
            padding: '20px',
            marginBottom: '15px'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '15px' }}>
              <Home size={20} color="#E20074" />
              <h4 style={{ fontSize: '16px', fontWeight: '600', margin: 0 }}>
                Home Internet
              </h4>
              </div>
            <div style={{ fontSize: '14px', marginBottom: '10px' }}>
              Monthly Cost: ${homeInternetData.totalMonthly}/mo
            </div>
          </div>
        )}
        </div>
        
      {/* Equipment Credit & Financing */}
      {equipmentCreditData && (
        <div style={{
          background: '#f8f9fa',
          padding: '20px',
          borderRadius: '12px',
          marginBottom: '30px',
          border: '1px solid #e0e0e0'
        }}>
          <h3 style={{ fontSize: '18px', fontWeight: '600', marginBottom: '15px', color: '#E20074' }}>
            Equipment Credit & Financing
          </h3>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '10px' }}>
            <div><strong>EC Amount:</strong> ${equipmentCreditData.amount || 0}</div>
            <div><strong>Down Payment:</strong> ${equipmentCreditData.downPayment || 0}</div>
            <div><strong>Monthly Financing:</strong> ${equipmentCreditData.monthlyFinancing || 0}</div>
                </div>
                  </div>
                )}

      {/* Discounts */}
      {discountsData && (
          <div style={{
          background: '#e8f5e8',
            padding: '20px',
            borderRadius: '12px',
          marginBottom: '30px',
          border: '1px solid #4CAF50'
          }}>
          <h3 style={{ fontSize: '18px', fontWeight: '600', marginBottom: '15px', color: '#2E7D32' }}>
            Applied Discounts
            </h3>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '10px' }}>
            {discountsData.autoPay && <div><strong>Auto Pay:</strong> $5 per line</div>}
            {discountsData.senior55 && <div><strong>Senior 55+:</strong> 20% off</div>}
            {discountsData.tmobileInsider && <div><strong>T-Mobile Insider:</strong> 15% off</div>}
                  </div>
          <div style={{ fontWeight: '600', marginTop: '10px', fontSize: '16px' }}>
            Total Discounts: ${calculateDiscounts().toFixed(2)}/mo
                  </div>
          </div>
        )}

      {/* Total Summary */}
          <div style={{
        background: 'linear-gradient(135deg, #E20074, #1E88E5)',
        color: 'white',
        padding: '30px',
        borderRadius: '16px',
        marginBottom: '30px',
        textAlign: 'center'
      }}>
        <h2 style={{ fontSize: '24px', fontWeight: '600', marginBottom: '10px' }}>
          Total Monthly Cost
        </h2>
        <div style={{ fontSize: '36px', fontWeight: '700' }}>
          ${calculateTotal().toFixed(2)}/mo
              </div>
        <p style={{ fontSize: '14px', opacity: 0.9, marginTop: '10px' }}>
          Includes all services, equipment financing, and applied discounts
        </p>
              </div>

      {/* Action Buttons */}
      <div className="button-group">
        <button
          className="button-secondary"
          onClick={onPrev}
          style={{ flex: 1 }}
        >
          <ArrowLeft size={16} style={{ marginRight: '8px' }} />
          Back to Discounts
        </button>
        <button
          className="button-secondary"
          onClick={onClearData}
          style={{ flex: 1 }}
        >
          <RotateCcw size={16} style={{ marginRight: '8px' }} />
          Start New Quote
        </button>
        <button
          className="button"
          onClick={() => window.print()}
          style={{ flex: 1 }}
        >
          <Share2 size={16} style={{ marginRight: '8px' }} />
          Print Quote
        </button>
              </div>

      {/* Comparison Modal */}
      {showComparison && comparisonData && (
          <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'rgba(0,0,0,0.5)',
          zIndex: 1000,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '20px'
        }}>
            <div style={{ 
              background: 'white', 
            borderRadius: '12px',
            padding: '20px',
            maxWidth: '90vw',
            maxHeight: '90vh',
            overflow: 'auto',
            position: 'relative'
          }}>
            <button
              onClick={() => setShowComparison(false)}
              style={{
                position: 'absolute',
                top: '15px',
                right: '15px',
                background: 'none',
                border: 'none',
                fontSize: '24px',
                cursor: 'pointer',
                color: '#666'
              }}
            >
              ×
            </button>

            <h3 style={{ marginBottom: '20px', fontSize: '20px', fontWeight: '600' }}>
              Quote Comparison
            </h3>

            <div style={{ display: 'grid', gridTemplateColumns: `repeat(${comparisonData.length}, 1fr)`, gap: '20px' }}>
              {comparisonData.map((scenario, index) => (
                <div key={index} style={{
                  border: '1px solid #e0e0e0',
              borderRadius: '8px',
                  padding: '15px',
                  background: index === 0 ? '#f8f9fa' : 'white'
                }}>
                  <div style={{ textAlign: 'center', marginBottom: '15px' }}>
                    <div style={{ fontSize: '16px', fontWeight: '600', marginBottom: '8px' }}>{scenario.name}</div>
                    <div style={{ fontSize: '24px', fontWeight: '700', color: '#E20074' }}>
                      ${scenario.total.toFixed(2)}/mo
              </div>
                    <div style={{ fontSize: '12px', color: '#666' }}>
                      Savings: ${scenario.savings.toFixed(2)}/mo
              </div>
              </div>

                  <div style={{ fontSize: '12px' }}>
                    <div style={{ fontWeight: '600', marginBottom: '8px' }}>Features:</div>
                    {scenario.features.map((feature, i) => (
                      <div key={i} style={{ marginBottom: '4px', color: '#666' }}>
                        • {feature}
              </div>
                    ))}
              </div>
            </div>
              ))}
          </div>
      </div>
        </div>
      )}

      {/* Share Modal */}
      {shareModalOpen && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'rgba(0,0,0,0.5)',
          zIndex: 1000,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '20px'
        }}>
          <div style={{
            background: 'white',
            borderRadius: '12px',
            padding: '20px',
            maxWidth: '500px',
            width: '100%',
            position: 'relative'
          }}>
            <button
              onClick={() => setShareModalOpen(false)}
              style={{
                position: 'absolute',
                top: '15px',
                right: '15px',
                background: 'none',
                border: 'none',
                fontSize: '24px',
                cursor: 'pointer',
                color: '#666'
              }}
            >
              ×
            </button>

            <h3 style={{ marginBottom: '20px', fontSize: '20px', fontWeight: '600' }}>
              Share Your Quote
            </h3>

            <div style={{ marginBottom: '20px' }}>
              <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600' }}>
                Share Method
              </label>
              <div style={{ display: 'flex', gap: '10px', marginBottom: '15px' }}>
                <button
                  onClick={() => setShareMethod('email')}
                  style={{
                    padding: '10px 15px',
                    border: `2px solid ${shareMethod === 'email' ? '#E20074' : '#e0e0e0'}`,
                borderRadius: '6px',
                    background: shareMethod === 'email' ? '#E20074' : 'white',
                    color: shareMethod === 'email' ? 'white' : '#666',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px'
                  }}
                >
                  <Mail size={16} />
                  Email
                </button>
                <button
                  onClick={() => setShareMethod('link')}
              style={{
                    padding: '10px 15px',
                    border: `2px solid ${shareMethod === 'link' ? '#E20074' : '#e0e0e0'}`,
                borderRadius: '6px',
                    background: shareMethod === 'link' ? '#E20074' : 'white',
                    color: shareMethod === 'link' ? 'white' : '#666',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px'
                  }}
                >
                  <Copy size={16} />
                  Link
                </button>
                <button
                  onClick={() => setShareMethod('qr')}
              style={{
                    padding: '10px 15px',
                    border: `2px solid ${shareMethod === 'qr' ? '#E20074' : '#e0e0e0'}`,
                borderRadius: '6px',
                    background: shareMethod === 'qr' ? '#E20074' : 'white',
                    color: shareMethod === 'qr' ? 'white' : '#666',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px'
                  }}
                >
                  <QrCode size={16} />
                  QR Code
                </button>
              </div>
            </div>

            {shareMethod === 'email' && (
              <div>
                <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600' }}>
                  Email Address
                </label>
            <input
                  type="email"
                  placeholder="Enter email address"
              style={{
                    width: '100%',
                padding: '10px',
                border: '1px solid #e0e0e0',
                borderRadius: '6px',
                    fontSize: '14px',
                    marginBottom: '15px'
                  }}
                />
                <button
                  onClick={() => {
                    // Send email logic
                    setShareModalOpen(false);
                  }}
                  style={{
                    width: '100%',
                    padding: '12px',
            background: '#E20074',
            color: 'white',
            border: 'none',
            borderRadius: '6px',
                    fontSize: '16px',
            cursor: 'pointer'
                  }}
                >
                  Send Quote via Email
          </button>
        </div>
      )}

            {shareMethod === 'link' && (
              <div>
                <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600' }}>
                  Shareable Link
                </label>
                <div style={{ display: 'flex', gap: '10px', marginBottom: '15px' }}>
                  <input
                    type="text"
                    value={shareUrl || generateShareUrl()}
                    readOnly
            style={{
                      flex: 1,
                      padding: '10px',
                      border: '1px solid #e0e0e0',
              borderRadius: '6px',
                      fontSize: '14px'
                    }}
                  />
                  <button
                    onClick={() => copyToClipboard(shareUrl || generateShareUrl())}
            style={{
                      padding: '10px 15px',
                      background: '#4CAF50',
              color: 'white',
                      border: 'none',
              borderRadius: '6px',
                      cursor: 'pointer'
            }}
          >
                    <Copy size={16} />
                  </button>
        </div>
                <div style={{ fontSize: '12px', color: '#666', marginBottom: '15px' }}>
                  This link will allow others to view your quote. It expires in 30 days.
      </div>
              </div>
            )}

            {shareMethod === 'qr' && (
              <div style={{ textAlign: 'center' }}>
                <div style={{
                  width: '200px',
                  height: '200px',
                  background: '#f0f0f0',
                  borderRadius: '8px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  margin: '0 auto 15px',
                  fontSize: '12px',
                  color: '#666'
                }}>
                  QR Code Placeholder
                </div>
                <div style={{ fontSize: '12px', color: '#666' }}>
                  Scan this QR code to view the quote on mobile
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Guest Message */}
      {!customerData && (
        <div style={{
          background: '#fff3cd',
          border: '1px solid #ffeaa7',
          borderRadius: '8px',
          padding: '15px',
          marginTop: '30px',
          textAlign: 'center'
        }}>
          <p style={{ fontSize: '14px', color: '#856404', margin: 0 }}>
            You&apos;re currently viewing as a guest. Add your information to personalize your quote and make it easier to contact you.
          </p>
        </div>
      )}
    </div>
  );
};

export default QuoteSummary;