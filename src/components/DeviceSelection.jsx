import React, { useState, useMemo, useCallback } from 'react';
import { Search, Filter, Star, Scale, Eye, ChevronDown, ChevronUp, X, CheckCircle, DollarSign, Battery, Camera, Wifi } from 'lucide-react';
import { useDebounce, useOptimizedSearch } from '../utils/performance';

const DeviceSelection = ({ lines, devices, onDevicesChange, onNext, onPrev }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedBrand, setSelectedBrand] = useState('all');
  const [selectedPriceRange, setSelectedPriceRange] = useState('all');
  const [selectedTier, setSelectedTier] = useState('all');
  const [sortBy, setSortBy] = useState('name');
  const [expandedLine, setExpandedLine] = useState(null);
  const [tradeIns, setTradeIns] = useState({});
  const [compareDevices, setCompareDevices] = useState([]);
  const [showComparison, setShowComparison] = useState(false);
  const [showFilters, setShowFilters] = useState(false);
  
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
      category: 'smartphone',
      os: 'iOS 18',
      display: '6.1" Super Retina XDR',
      processor: 'A18 Pro',
      camera: '48MP main',
      battery: 'All-day battery',
      storage: '128GB',
      ram: '8GB',
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
      color: '#007AFF',
      rating: 4.8,
      reviews: 1250,
      availability: 'in-stock'
    },
    {
      id: 'iphone-17-pro-max',
      name: 'iPhone 17 Pro Max',
      brand: 'Apple',
      price: 1199,
      monthlyPrice: 50,
      tier: 6,
      category: 'smartphone',
      os: 'iOS 18',
      display: '6.7" Super Retina XDR Pro',
      processor: 'A18 Pro',
      camera: '48MP Pro system',
      battery: 'Longest battery life',
      storage: '256GB',
      ram: '8GB',
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
      color: '#007AFF',
      rating: 4.9,
      reviews: 2100,
      availability: 'in-stock'
    },
    {
      id: 'iphone-17-pro',
      name: 'iPhone 17 Pro',
      brand: 'Apple',
      price: 1099,
      monthlyPrice: 46,
      tier: 5,
      category: 'smartphone',
      os: 'iOS 18',
      display: '6.1" Super Retina XDR Pro',
      processor: 'A18 Pro',
      camera: '48MP Pro system',
      battery: 'All-day battery',
      storage: '128GB',
      ram: '8GB',
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
      color: '#007AFF',
      rating: 4.8,
      reviews: 1800,
      availability: 'in-stock'
    },
    {
      id: 'iphone-17',
      name: 'iPhone 17',
      brand: 'Apple',
      price: 799,
      monthlyPrice: 33,
      tier: 4,
      category: 'smartphone',
      os: 'iOS 18',
      display: '6.1" Super Retina XDR',
      processor: 'A18 Pro',
      camera: '48MP main',
      battery: 'All-day battery',
      storage: '128GB',
      ram: '8GB',
      features: [
        '6.1" Super Retina XDR display',
        'A18 Pro chip',
        '48MP main camera',
        'Face ID',
        '5G capable',
        'iOS 18'
      ],
      image: '📱',
      color: '#007AFF',
      rating: 4.7,
      reviews: 1500,
      availability: 'in-stock'
    },
    {
      id: 'iphone-16e',
      name: 'iPhone 16e',
      brand: 'Apple',
      price: 599,
      monthlyPrice: 25,
      tier: 3,
      category: 'smartphone',
      os: 'iOS 18',
      display: '6.1" Liquid Retina',
      processor: 'A17 Pro',
      camera: '48MP main',
      battery: 'All-day battery',
      storage: '64GB',
      ram: '6GB',
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
      color: '#007AFF',
      rating: 4.5,
      reviews: 800,
      availability: 'in-stock'
    },
    {
      id: 'iphone-16-pro-max',
      name: 'iPhone 16 Pro Max',
      brand: 'Apple',
      price: 1199,
      monthlyPrice: 50,
      tier: 6,
      category: 'smartphone',
      os: 'iOS 18',
      display: '6.7" Super Retina XDR Pro',
      processor: 'A18 Pro',
      camera: '48MP Pro system',
      battery: 'Longest battery life',
      storage: '256GB',
      ram: '8GB',
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
      color: '#007AFF',
      rating: 4.9,
      reviews: 2200,
      availability: 'in-stock'
    },
    {
      id: 'iphone-16-pro',
      name: 'iPhone 16 Pro',
      brand: 'Apple',
      price: 1099,
      monthlyPrice: 46,
      tier: 5,
      category: 'smartphone',
      os: 'iOS 18',
      display: '6.1" Super Retina XDR Pro',
      processor: 'A18 Pro',
      camera: '48MP Pro system',
      battery: 'All-day battery',
      storage: '128GB',
      ram: '8GB',
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
      color: '#007AFF',
      rating: 4.8,
      reviews: 1900,
      availability: 'in-stock'
    },
    {
      id: 'iphone-16-plus',
      name: 'iPhone 16 Plus',
      brand: 'Apple',
      price: 899,
      monthlyPrice: 38,
      tier: 4,
      category: 'smartphone',
      os: 'iOS 18',
      display: '6.7" Super Retina XDR',
      processor: 'A18 Pro',
      camera: '48MP main',
      battery: 'All-day battery',
      storage: '128GB',
      ram: '8GB',
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
      color: '#007AFF',
      rating: 4.7,
      reviews: 1200,
      availability: 'in-stock'
    },
    {
      id: 'iphone-16',
      name: 'iPhone 16',
      brand: 'Apple',
      price: 799,
      monthlyPrice: 33,
      tier: 4,
      category: 'smartphone',
      os: 'iOS 18',
      display: '6.1" Super Retina XDR',
      processor: 'A18 Pro',
      camera: '48MP main',
      battery: 'All-day battery',
      storage: '128GB',
      ram: '8GB',
      features: [
        '6.1" Super Retina XDR display',
        'A18 Pro chip',
        '48MP main camera',
        'Face ID',
        '5G capable',
        'iOS 18'
      ],
      image: '📱',
      color: '#007AFF',
      rating: 4.7,
      reviews: 1600,
      availability: 'in-stock'
    },
    {
      id: 'iphone-15',
      name: 'iPhone 15',
      brand: 'Apple',
      price: 699,
      monthlyPrice: 29,
      tier: 4,
      category: 'smartphone',
      os: 'iOS 17',
      display: '6.1" Super Retina XDR',
      processor: 'A16 Bionic',
      camera: '48MP main',
      battery: 'All-day battery',
      storage: '128GB',
      ram: '6GB',
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
      color: '#007AFF',
      rating: 4.6,
      reviews: 2000,
      availability: 'in-stock'
    },
    // Google Pixel Series
    {
      id: 'pixel-10-pro-xl',
      name: 'Pixel 10 Pro XL',
      brand: 'Google',
      price: 1199,
      monthlyPrice: 50,
      tier: 6,
      category: 'smartphone',
      os: 'Android 16',
      display: '6.7" OLED Pro',
      processor: 'Google Tensor G5',
      camera: '50MP Pro system',
      battery: 'All-day battery',
      storage: '256GB',
      ram: '16GB',
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
      color: '#4285F4',
      rating: 4.8,
      reviews: 1800,
      availability: 'in-stock'
    },
    {
      id: 'pixel-10-pro',
      name: 'Pixel 10 Pro',
      brand: 'Google',
      price: 999,
      monthlyPrice: 42,
      tier: 5,
      category: 'smartphone',
      os: 'Android 16',
      display: '6.3" OLED Pro',
      processor: 'Google Tensor G5',
      camera: '50MP Pro',
      battery: 'All-day battery',
      storage: '128GB',
      ram: '12GB',
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
      color: '#4285F4',
      rating: 4.7,
      reviews: 1400,
      availability: 'in-stock'
    },
    {
      id: 'pixel-10',
      name: 'Pixel 10',
      brand: 'Google',
      price: 699,
      monthlyPrice: 29,
      tier: 4,
      category: 'smartphone',
      os: 'Android 16',
      display: '6.1" OLED',
      processor: 'Google Tensor G5',
      camera: '50MP main',
      battery: 'All-day battery',
      storage: '128GB',
      ram: '8GB',
      features: [
        '6.1" OLED display',
        'Google Tensor G5',
        '8GB RAM',
        '50MP main camera',
        '5G capable',
        'Pure Android 16'
      ],
      image: '📱',
      color: '#4285F4',
      rating: 4.6,
      reviews: 1100,
      availability: 'in-stock'
    },
    {
      id: 'pixel-9a',
      name: 'Pixel 9A',
      brand: 'Google',
      price: 499,
      monthlyPrice: 21,
      tier: 3,
      category: 'smartphone',
      os: 'Android 15',
      display: '6.1" OLED',
      processor: 'Google Tensor G4',
      camera: '64MP main',
      battery: 'All-day battery',
      storage: '128GB',
      ram: '8GB',
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
      color: '#4285F4',
      rating: 4.4,
      reviews: 900,
      availability: 'in-stock'
    },
    // Samsung Galaxy Series
    {
      id: 'galaxy-s25-edge',
      name: 'Galaxy S25 Edge',
      brand: 'Samsung',
      price: 1299,
      monthlyPrice: 54,
      tier: 6,
      category: 'smartphone',
      os: 'Android 15',
      display: '6.6" Edge Dynamic AMOLED',
      processor: 'Snapdragon 8 Elite',
      camera: '200MP main',
      battery: 'All-day battery',
      storage: '256GB',
      ram: '12GB',
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
      color: '#1E88E5',
      rating: 4.8,
      reviews: 1600,
      availability: 'in-stock'
    },
    {
      id: 'galaxy-s25-ultra',
      name: 'Galaxy S25 Ultra',
      brand: 'Samsung',
      price: 1299,
      monthlyPrice: 54,
      tier: 6,
      category: 'smartphone',
      os: 'Android 15',
      display: '6.8" QHD+ Dynamic AMOLED',
      processor: 'Snapdragon 8 Elite',
      camera: '200MP main',
      battery: 'All-day battery',
      storage: '256GB',
      ram: '16GB',
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
      color: '#1E88E5',
      rating: 4.9,
      reviews: 2400,
      availability: 'in-stock'
    },
    {
      id: 'galaxy-s25-plus',
      name: 'Galaxy S25+',
      brand: 'Samsung',
      price: 999,
      monthlyPrice: 42,
      tier: 5,
      category: 'smartphone',
      os: 'Android 15',
      display: '6.7" FHD+ Dynamic AMOLED',
      processor: 'Snapdragon 8 Elite',
      camera: '50MP main',
      battery: 'All-day battery',
      storage: '128GB',
      ram: '12GB',
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
      color: '#1E88E5',
      rating: 4.7,
      reviews: 1300,
      availability: 'in-stock'
    },
    {
      id: 'galaxy-s25',
      name: 'Galaxy S25',
      brand: 'Samsung',
      price: 799,
      monthlyPrice: 33,
      tier: 4,
      category: 'smartphone',
      os: 'Android 15',
      display: '6.2" FHD+ Dynamic AMOLED',
      processor: 'Snapdragon 8 Elite',
      camera: '50MP main',
      battery: 'All-day battery',
      storage: '128GB',
      ram: '12GB',
      features: [
        '6.2" FHD+ Dynamic AMOLED',
        'Snapdragon 8 Elite',
        '12GB RAM',
        '50MP main camera',
        '5G capable',
        'Android 15'
      ],
      image: '📱',
      color: '#1E88E5',
      rating: 4.6,
      reviews: 1000,
      availability: 'in-stock'
    },
    {
      id: 'galaxy-s25-fe',
      name: 'Galaxy S25 FE',
      brand: 'Samsung',
      price: 599,
      monthlyPrice: 25,
      tier: 3,
      category: 'smartphone',
      os: 'Android 15',
      display: '6.4" Dynamic AMOLED',
      processor: 'Snapdragon 8 Gen 3',
      camera: '50MP main',
      battery: 'All-day battery',
      storage: '128GB',
      ram: '8GB',
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
      color: '#1E88E5',
      rating: 4.5,
      reviews: 800,
      availability: 'in-stock'
    },
    {
      id: 'galaxy-a36',
      name: 'Galaxy A36',
      brand: 'Samsung',
      price: 399,
      monthlyPrice: 17,
      tier: 2,
      category: 'smartphone',
      os: 'Android 15',
      display: '6.6" Super AMOLED',
      processor: 'Snapdragon 7 Gen 3',
      camera: '50MP main',
      battery: 'All-day battery',
      storage: '128GB',
      ram: '8GB',
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
      color: '#1E88E5',
      rating: 4.3,
      reviews: 600,
      availability: 'in-stock'
    },
    {
      id: 'galaxy-z-fold-7',
      name: 'Galaxy Z Fold 7',
      brand: 'Samsung',
      price: 1799,
      monthlyPrice: 75,
      tier: 6,
      category: 'foldable',
      os: 'Android 15',
      display: '7.6" Foldable Dynamic AMOLED',
      processor: 'Snapdragon 8 Elite',
      camera: '200MP main',
      battery: 'All-day battery',
      storage: '512GB',
      ram: '16GB',
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
      color: '#1E88E5',
      rating: 4.7,
      reviews: 1200,
      availability: 'limited'
    },
    {
      id: 'galaxy-z-flip-7',
      name: 'Galaxy Z Flip 7',
      brand: 'Samsung',
      price: 999,
      monthlyPrice: 42,
      tier: 5,
      category: 'foldable',
      os: 'Android 15',
      display: '6.7" Foldable Dynamic AMOLED',
      processor: 'Snapdragon 8 Elite',
      camera: '50MP main',
      battery: 'All-day battery',
      storage: '256GB',
      ram: '12GB',
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
      color: '#1E88E5',
      rating: 4.6,
      reviews: 1000,
      availability: 'in-stock'
    },
    // Motorola Series
    {
      id: 'razr-ultra',
      name: 'Razr Ultra',
      brand: 'Motorola',
      price: 999,
      monthlyPrice: 42,
      tier: 5,
      category: 'foldable',
      os: 'Android 15',
      display: '6.9" Foldable pOLED',
      processor: 'Snapdragon 8 Gen 3',
      camera: '50MP main',
      battery: 'All-day battery',
      storage: '256GB',
      ram: '12GB',
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
      color: '#E65100',
      rating: 4.5,
      reviews: 700,
      availability: 'in-stock'
    },
    {
      id: 'razr-plus-2025',
      name: 'Razr+ 2025',
      brand: 'Motorola',
      price: 799,
      monthlyPrice: 33,
      tier: 4,
      category: 'foldable',
      os: 'Android 15',
      display: '6.9" Foldable pOLED',
      processor: 'Snapdragon 8 Gen 3',
      camera: '50MP main',
      battery: 'All-day battery',
      storage: '128GB',
      ram: '8GB',
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
      color: '#E65100',
      rating: 4.4,
      reviews: 600,
      availability: 'in-stock'
    },
    {
      id: 'razr-2025',
      name: 'Razr 2025',
      brand: 'Motorola',
      price: 599,
      monthlyPrice: 25,
      tier: 3,
      category: 'foldable',
      os: 'Android 15',
      display: '6.9" Foldable pOLED',
      processor: 'Snapdragon 7 Gen 3',
      camera: '50MP main',
      battery: 'All-day battery',
      storage: '128GB',
      ram: '8GB',
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
      color: '#E65100',
      rating: 4.3,
      reviews: 500,
      availability: 'in-stock'
    },
    {
      id: 'edge-2025',
      name: 'Edge 2025',
      brand: 'Motorola',
      price: 699,
      monthlyPrice: 29,
      tier: 4,
      category: 'smartphone',
      os: 'Android 15',
      display: '6.6" OLED',
      processor: 'Snapdragon 8 Gen 3',
      camera: '50MP main',
      battery: 'All-day battery',
      storage: '128GB',
      ram: '8GB',
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
      color: '#E65100',
      rating: 4.4,
      reviews: 400,
      availability: 'in-stock'
    },
    {
      id: 'g-power-2025',
      name: 'G Power 2025',
      brand: 'Motorola',
      price: 299,
      monthlyPrice: 13,
      tier: 2,
      category: 'smartphone',
      os: 'Android 15',
      display: '6.7" IPS LCD',
      processor: 'Snapdragon 6 Gen 1',
      camera: '50MP main',
      battery: 'Long-lasting battery',
      storage: '64GB',
      ram: '6GB',
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
      color: '#E65100',
      rating: 4.2,
      reviews: 300,
      availability: 'in-stock'
    },
    {
      id: 'g-2025',
      name: 'G 2025',
      brand: 'Motorola',
      price: 199,
      monthlyPrice: 8,
      tier: 1,
      category: 'smartphone',
      os: 'Android 15',
      display: '6.5" IPS LCD',
      processor: 'Snapdragon 4 Gen 2',
      camera: '50MP main',
      battery: 'All-day battery',
      storage: '64GB',
      ram: '4GB',
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
      color: '#E65100',
      rating: 4.1,
      reviews: 250,
      availability: 'in-stock'
    },
    // Revvl Series
    {
      id: 'revvl-pro-8',
      name: 'Revvl Pro 8',
      brand: 'Revvl',
      price: 399,
      monthlyPrice: 17,
      tier: 2,
      category: 'smartphone',
      os: 'Android 15',
      display: '6.8" IPS LCD',
      processor: 'Snapdragon 6 Gen 1',
      camera: '108MP main',
      battery: 'All-day battery',
      storage: '128GB',
      ram: '8GB',
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
      color: '#E20074',
      rating: 4.0,
      reviews: 200,
      availability: 'in-stock'
    },
    {
      id: 'bring-your-own',
      name: 'Bring Your Own Device',
      brand: 'BYOD',
      price: 0,
      monthlyPrice: 0,
      tier: 5,
      category: 'byod',
      os: 'Various',
      display: 'Various',
      processor: 'Various',
      camera: 'Various',
      battery: 'Various',
      storage: 'Various',
      ram: 'Various',
      features: [
        'Use your current device',
        'No device payment',
        'Must be compatible',
        'Unlock required'
      ],
      image: '📲',
      color: '#4CAF50',
      rating: 4.5,
      reviews: 500,
      availability: 'always'
    }
  ];

  // Debounced search for better performance
  const debouncedSearchTerm = useDebounce(searchTerm, 300);

  // Advanced filtering and sorting with optimized search
  const filteredAndSortedDevices = useMemo(() => {
    let filtered = deviceOptions.filter(device => {
      // Search filter with debounced term
      const matchesSearch = device.name.toLowerCase().includes(debouncedSearchTerm.toLowerCase()) ||
                           device.brand.toLowerCase().includes(debouncedSearchTerm.toLowerCase()) ||
                           device.features.some(feature => 
                             feature.toLowerCase().includes(debouncedSearchTerm.toLowerCase())
                           );
      
      // Brand filter
      const matchesBrand = selectedBrand === 'all' || device.brand.toLowerCase() === selectedBrand.toLowerCase();
      
      // Price range filter
      const matchesPriceRange = selectedPriceRange === 'all' || 
        (selectedPriceRange === 'budget' && device.price < 500) ||
        (selectedPriceRange === 'mid' && device.price >= 500 && device.price < 1000) ||
        (selectedPriceRange === 'premium' && device.price >= 1000);
      
      // Tier filter
      const matchesTier = selectedTier === 'all' || device.tier.toString() === selectedTier;
      
      return matchesSearch && matchesBrand && matchesPriceRange && matchesTier;
    });

    // Sort devices
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'price-low':
          return a.price - b.price;
        case 'price-high':
          return b.price - a.price;
        case 'rating':
          return b.rating - a.rating;
        case 'name':
        default:
          return a.name.localeCompare(b.name);
      }
    });

    return filtered;
  }, [debouncedSearchTerm, selectedBrand, selectedPriceRange, selectedTier, sortBy]);

  // Group devices by brand
  const groupedDevices = useMemo(() => {
    return filteredAndSortedDevices.reduce((acc, device) => {
      if (!acc[device.brand]) {
        acc[device.brand] = [];
      }
      acc[device.brand].push(device);
      return acc;
    }, {});
  }, [filteredAndSortedDevices]);

  const handleDeviceSelect = (lineIndex, deviceId) => {
    const newDevices = { ...devices };
    newDevices[lineIndex] = deviceId;
    onDevicesChange(newDevices);
    setExpandedLine(null); // Close dropdown after selection
  };

  const handleCompareToggle = (deviceId) => {
    setCompareDevices(prev => 
      prev.includes(deviceId) 
        ? prev.filter(id => id !== deviceId)
        : [...prev, deviceId].slice(0, 3) // Max 3 devices for comparison
    );
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

  const getAvailabilityColor = (availability) => {
    switch (availability) {
      case 'in-stock': return '#4CAF50';
      case 'limited': return '#FF9800';
      case 'always': return '#2196F3';
      default: return '#9E9E9E';
    }
  };

  const getAvailabilityText = (availability) => {
    switch (availability) {
      case 'in-stock': return 'In Stock';
      case 'limited': return 'Limited Stock';
      case 'always': return 'Always Available';
      default: return 'Check Availability';
    }
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
    }}>
      <div style={{
        textAlign: 'center',
        marginBottom: '20px'
      }}>
        <h2 style={{
          fontSize: '24px',
          fontWeight: '700',
          color: '#E20074',
          margin: 0
        }}>
          Select devices for each line
        </h2>
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
      
      {/* Advanced Search and Filter Controls */}
      <div style={{ 
        background: '#f8f9fa', 
        padding: '20px', 
        borderRadius: '12px', 
        marginBottom: '30px',
        border: '1px solid #e0e0e0'
      }}>
        {/* Search Bar */}
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
                placeholder="Search devices, brands, or features..."
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
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
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
              <option value="name">Sort by Name</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="rating">Highest Rated</option>
            </select>
          </div>

          <button
            onClick={() => setShowFilters(!showFilters)}
            style={{
              padding: '12px 16px',
              border: '2px solid #E20074',
              borderRadius: '8px',
              background: showFilters ? '#E20074' : 'white',
              color: showFilters ? 'white' : '#E20074',
              fontSize: '16px',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '8px'
            }}
          >
            <Filter size={16} />
            Filters
            {showFilters ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
          </button>

          {compareDevices.length > 0 && (
            <button
              onClick={() => setShowComparison(!showComparison)}
              style={{
                padding: '12px 16px',
                border: '2px solid #4CAF50',
                borderRadius: '8px',
                background: showComparison ? '#4CAF50' : 'white',
                color: showComparison ? 'white' : '#4CAF50',
                fontSize: '16px',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '8px'
              }}
            >
              <Scale size={16} />
              Compare ({compareDevices.length})
            </button>
          )}
        </div>

        {/* Advanced Filters */}
        {showFilters && (
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: '15px',
            padding: '15px',
            background: 'white',
            borderRadius: '8px',
            border: '1px solid #e0e0e0'
          }}>
            <div>
              <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600', fontSize: '14px' }}>
                Brand
              </label>
              <select
                value={selectedBrand}
                onChange={(e) => setSelectedBrand(e.target.value)}
                style={{
                  width: '100%',
                  padding: '10px',
                  border: '1px solid #e0e0e0',
                  borderRadius: '6px',
                  fontSize: '14px',
                  background: 'white'
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

            <div>
              <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600', fontSize: '14px' }}>
                Price Range
              </label>
              <select
                value={selectedPriceRange}
                onChange={(e) => setSelectedPriceRange(e.target.value)}
                style={{
                  width: '100%',
                  padding: '10px',
                  border: '1px solid #e0e0e0',
                  borderRadius: '6px',
                  fontSize: '14px',
                  background: 'white'
                }}
              >
                <option value="all">All Prices</option>
                <option value="budget">Under $500</option>
                <option value="mid">$500 - $999</option>
                <option value="premium">$1000+</option>
              </select>
            </div>

            <div>
              <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600', fontSize: '14px' }}>
                Tier Level
              </label>
              <select
                value={selectedTier}
                onChange={(e) => setSelectedTier(e.target.value)}
                style={{
                  width: '100%',
                  padding: '10px',
                  border: '1px solid #e0e0e0',
                  borderRadius: '6px',
                  fontSize: '14px',
                  background: 'white'
                }}
              >
                <option value="all">All Tiers</option>
                <option value="1">Tier 1</option>
                <option value="2">Tier 2</option>
                <option value="3">Tier 3</option>
                <option value="4">Tier 4</option>
                <option value="5">Tier 5</option>
                <option value="6">Tier 6</option>
              </select>
            </div>
          </div>
        )}
        
        <div style={{ fontSize: '14px', color: '#666', marginTop: '10px' }}>
          Showing {filteredAndSortedDevices.length} devices
          {compareDevices.length > 0 && ` • ${compareDevices.length} selected for comparison`}
        </div>
      </div>

      {/* Device Comparison Modal */}
      {showComparison && compareDevices.length > 0 && (
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
              <X size={24} />
            </button>

            <h3 style={{ marginBottom: '20px', fontSize: '20px', fontWeight: '600' }}>
              Device Comparison
            </h3>

            <div style={{ display: 'grid', gridTemplateColumns: `repeat(${compareDevices.length}, 1fr)`, gap: '20px' }}>
              {compareDevices.map(deviceId => {
                const device = deviceOptions.find(d => d.id === deviceId);
                if (!device) return null;

                return (
                  <div key={deviceId} style={{
                    border: '1px solid #e0e0e0',
                    borderRadius: '8px',
                    padding: '15px',
                    background: '#f8f9fa'
                  }}>
                    <div style={{ textAlign: 'center', marginBottom: '15px' }}>
                      <div style={{ fontSize: '32px', marginBottom: '8px' }}>{device.image}</div>
                      <div style={{ fontSize: '16px', fontWeight: '600', marginBottom: '4px' }}>{device.name}</div>
                      <div style={{ fontSize: '14px', color: '#666' }}>{device.brand}</div>
                    </div>

                    <div style={{ fontSize: '14px' }}>
                      <div style={{ marginBottom: '8px' }}>
                        <strong>Price:</strong> ${device.price}
                      </div>
                      <div style={{ marginBottom: '8px' }}>
                        <strong>Monthly:</strong> ${device.monthlyPrice}/mo
                      </div>
                      <div style={{ marginBottom: '8px' }}>
                        <strong>Display:</strong> {device.display}
                      </div>
                      <div style={{ marginBottom: '8px' }}>
                        <strong>Processor:</strong> {device.processor}
                      </div>
                      <div style={{ marginBottom: '8px' }}>
                        <strong>Camera:</strong> {device.camera}
                      </div>
                      <div style={{ marginBottom: '8px' }}>
                        <strong>Storage:</strong> {device.storage}
                      </div>
                      <div style={{ marginBottom: '8px' }}>
                        <strong>RAM:</strong> {device.ram}
                      </div>
                      <div style={{ marginBottom: '8px' }}>
                        <strong>OS:</strong> {device.os}
                      </div>
                      <div style={{ marginBottom: '8px' }}>
                        <strong>Rating:</strong> 
                        <div style={{ display: 'flex', alignItems: 'center', gap: '4px', marginTop: '4px' }}>
                          <Star size={14} fill="#FFD700" color="#FFD700" />
                          <span>{device.rating}</span>
                          <span style={{ color: '#666' }}>({device.reviews} reviews)</span>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}
      
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
                maxHeight: '500px', 
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
                      borderBottom: '1px solid #e0e0e0',
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center'
                    }}>
                      <span>{brand}</span>
                      <span>{brandDevices.length} devices</span>
                    </div>
                    
                    {brandDevices.map((device) => {
                      const isSelected = getSelectedDevice(lineIndex) === device.id;
                      const isInComparison = compareDevices.includes(device.id);
                      
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
                              marginBottom: '4px',
                              display: 'flex',
                              alignItems: 'center',
                              gap: '8px'
                            }}>
                              {device.name}
                              <div style={{
                                background: getAvailabilityColor(device.availability),
                                color: 'white',
                                padding: '2px 6px',
                                borderRadius: '4px',
                                fontSize: '10px',
                                fontWeight: 'bold'
                              }}>
                                {getAvailabilityText(device.availability)}
                              </div>
                            </div>
                            <div style={{ 
                              fontSize: '12px', 
                              color: '#666',
                              marginBottom: '6px'
                            }}>
                              {device.brand} • {device.display} • {device.processor}
                            </div>
                            <div style={{ 
                              fontSize: '14px', 
                              color: '#e20074',
                              fontWeight: '600',
                              marginBottom: '4px'
                            }}>
                              {calculateMonthlyPrice(device, tradeIns[lineIndex] || 0) > 0 ? `$${calculateMonthlyPrice(device, tradeIns[lineIndex] || 0)}/mo` : 'Free'}
                              {device.price > 0 && (
                                <span style={{ color: '#999', fontWeight: 'normal', marginLeft: '8px' }}>
                                  (${device.price} retail)
                                </span>
                              )}
                            </div>
                            <div style={{ 
                              fontSize: '12px', 
                              color: '#666',
                              display: 'flex',
                              alignItems: 'center',
                              gap: '8px'
                            }}>
                              <div style={{ display: 'flex', alignItems: 'center', gap: '2px' }}>
                                <Star size={12} fill="#FFD700" color="#FFD700" />
                                <span>{device.rating}</span>
                                <span>({device.reviews})</span>
                              </div>
                              <div>•</div>
                              <div>{device.storage} • {device.ram}</div>
                            </div>
                          </div>
                          
                          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                handleCompareToggle(device.id);
                              }}
                              style={{
                                background: isInComparison ? '#4CAF50' : 'transparent',
                                border: `1px solid ${isInComparison ? '#4CAF50' : '#e0e0e0'}`,
                                borderRadius: '6px',
                                padding: '6px 8px',
                                cursor: 'pointer',
                                display: 'flex',
                                alignItems: 'center',
                                gap: '4px',
                                fontSize: '12px',
                                color: isInComparison ? 'white' : '#666'
                              }}
                            >
                              <Scale size={12} />
                              {isInComparison ? 'Added' : 'Compare'}
                            </button>

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
    </div>
  );
};

export default DeviceSelection;