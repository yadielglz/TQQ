// T-Mobile Promotions Data - August 20th, 2025
// Based on the provided PDF document

export const promotions = [
  {
    id: 'iphone-16-on-us',
    name: 'iPhone 16 On Us',
    internalId: 'ID250083',
    status: 'active',
    statusDate: '4/3',
    eligibleDevices: ['iphone-16', 'iphone-16-plus', 'iphone-16-pro', 'iphone-16-pro-max', 'iphone-15', 'iphone-15-plus', 'iphone-15-pro', 'iphone-15-pro-max', 'iphone-16e', 'iphone-14', 'iphone-14-plus'],
    aal: 'Y', // New Line
    redemption: {
      trade: {
        tiers: [
          {
            value: 830,
            devices: [
              // Apple devices
              'iphone-11-pro', 'iphone-11-pro-max', 'iphone-12', 'iphone-12-mini', 'iphone-12-pro', 'iphone-12-pro-max',
              'iphone-13', 'iphone-13-mini', 'iphone-13-pro', 'iphone-13-pro-max', 'iphone-14', 'iphone-14-plus',
              'iphone-15', 'iphone-15-plus', 'iphone-15-pro', 'iphone-15-pro-max',
              // Samsung Galaxy devices
              'galaxy-s10', 'galaxy-s10e', 'galaxy-s10-plus', 'galaxy-s10-5g', 'galaxy-s20', 'galaxy-s20-plus',
              'galaxy-s20-ultra', 'galaxy-s21', 'galaxy-s21-plus', 'galaxy-s21-ultra', 'galaxy-s22', 'galaxy-s22-plus',
              'galaxy-s22-ultra', 'galaxy-s23', 'galaxy-s23-plus', 'galaxy-s23-ultra', 'galaxy-s24', 'galaxy-s24-plus',
              'galaxy-s24-ultra', 'galaxy-z-fold-3', 'galaxy-z-fold-4', 'galaxy-z-fold-5', 'galaxy-z-flip-3',
              'galaxy-z-flip-4', 'galaxy-z-flip-5', 'galaxy-note9', 'galaxy-note10', 'galaxy-note10-plus',
              'galaxy-note10-lite', 'galaxy-note20', 'galaxy-note20-ultra',
              // OnePlus devices
              'oneplus-10-pro-5g', 'oneplus-9-pro-5g',
              // Google Pixel devices
              'pixel-9', 'pixel-9-pro', 'pixel-9-fold', 'pixel-9-xl', 'pixel-8', 'pixel-8-pro', 'pixel-7',
              'pixel-7-pro', 'pixel-6', 'pixel-6-pro',
              // Motorola devices
              'razr-plus-2023', 'razr-plus-2024'
            ]
          },
          {
            value: 415,
            devices: [
              // Older Apple devices
              'iphone-6', 'iphone-6-plus', 'iphone-6s', 'iphone-6s-plus', 'iphone-7', 'iphone-7-plus',
              'iphone-8', 'iphone-8-plus', 'iphone-x', 'iphone-xs', 'iphone-xs-max', 'iphone-xr',
              'iphone-11', 'iphone-se-2nd', 'iphone-se-3rd',
              // Older Samsung devices
              'galaxy-s9', 'galaxy-s9-plus', 'galaxy-s8', 'galaxy-s8-plus', 'galaxy-s8-active', 'galaxy-note8',
              'galaxy-a-series', 'galaxy-z-fold', 'galaxy-z-fold-2', 'galaxy-z-flip', 'galaxy-z-flip-5g',
              // Older OnePlus devices
              'oneplus-7t-pro', 'oneplus-7t-pro-mclaren', 'oneplus-8', 'oneplus-8-pro', 'oneplus-8t',
              'oneplus-9', 'oneplus-9-pro', 'oneplus-10t-5g',
              // Older Google Pixel devices
              'pixel-4', 'pixel-4-xl', 'pixel-5', 'pixel-6a', 'pixel-7a', 'pixel-8a',
              // LG devices
              'lg-v60-thinq',
              // Motorola devices
              'razr-5g', 'razr-40', 'edge-5g-2022'
            ]
          }
        ]
      },
      ratePlan: 'Most Voice plans'
    },
    maxPayout: 830,
    limit: 4,
    notStackableOnSameLine: ['Keep and Switch Essentials Saver']
  },
  {
    id: 'iphone-16-630-off',
    name: '$630 Off iPhone 16',
    internalId: 'ID250082',
    status: 'active',
    statusDate: '4/3',
    eligibleDevices: ['iphone-16', 'iphone-16-plus', 'iphone-16-pro', 'iphone-16-pro-max', 'iphone-15', 'iphone-15-plus', 'iphone-15-pro', 'iphone-15-pro-max', 'iphone-16e', 'iphone-14', 'iphone-14-plus'],
    aal: 'Y', // New Line
    redemption: {
      trade: {
        tiers: [
          {
            value: 630,
            devices: [
              // Similar device list as iPhone 16 On Us but with $630 tier
              'iphone-11-pro', 'iphone-11-pro-max', 'iphone-12', 'iphone-12-mini', 'iphone-12-pro', 'iphone-12-pro-max',
              'iphone-13', 'iphone-13-mini', 'iphone-13-pro', 'iphone-13-pro-max', 'iphone-14', 'iphone-14-plus',
              'iphone-15', 'iphone-15-plus', 'iphone-15-pro', 'iphone-15-pro-max',
              'galaxy-s10', 'galaxy-s10e', 'galaxy-s10-plus', 'galaxy-s10-5g', 'galaxy-s20', 'galaxy-s20-plus',
              'galaxy-s20-ultra', 'galaxy-s21', 'galaxy-s21-plus', 'galaxy-s21-ultra', 'galaxy-s22', 'galaxy-s22-plus',
              'galaxy-s22-ultra', 'galaxy-s23', 'galaxy-s23-plus', 'galaxy-s23-ultra', 'galaxy-s24', 'galaxy-s24-plus',
              'galaxy-s24-ultra', 'galaxy-z-fold-3', 'galaxy-z-fold-4', 'galaxy-z-fold-5', 'galaxy-z-flip-3',
              'galaxy-z-flip-4', 'galaxy-z-flip-5', 'galaxy-note9', 'galaxy-note10', 'galaxy-note10-plus',
              'galaxy-note10-lite', 'galaxy-note20', 'galaxy-note20-ultra',
              'oneplus-10-pro-5g', 'oneplus-9-pro-5g',
              'pixel-9', 'pixel-9-pro', 'pixel-9-fold', 'pixel-9-xl', 'pixel-8', 'pixel-8-pro', 'pixel-7',
              'pixel-7-pro', 'pixel-6', 'pixel-6-pro',
              'razr-plus-2023', 'razr-plus-2024'
            ]
          }
        ]
      },
      ratePlan: '55, Military, and FR versions only of Most Plans'
    },
    maxPayout: 630,
    limit: 4,
    notStackableOnSameLine: ['Keep and Switch Essentials Saver 4 for $25/line']
  },
  {
    id: 'iphone-14-on-us',
    name: 'iPhone 14 On Us',
    internalId: 'ID250050',
    status: 'active',
    statusDate: '4/3',
    eligibleDevices: ['iphone-14', 'iphone-14-plus'],
    aal: 'Y+P', // New Line + Port In Required
    redemption: {
      trade: {
        tiers: [
          {
            value: 630,
            devices: [
              'iphone-11-pro', 'iphone-11-pro-max', 'iphone-12', 'iphone-12-mini', 'iphone-12-pro', 'iphone-12-pro-max',
              'iphone-13', 'iphone-13-mini', 'iphone-13-pro', 'iphone-13-pro-max',
              'galaxy-s10', 'galaxy-s10e', 'galaxy-s10-plus', 'galaxy-s10-5g', 'galaxy-s20', 'galaxy-s20-plus',
              'galaxy-s20-ultra', 'galaxy-s21', 'galaxy-s21-plus', 'galaxy-s21-ultra', 'galaxy-s22', 'galaxy-s22-plus',
              'galaxy-s22-ultra', 'galaxy-s23', 'galaxy-s23-plus', 'galaxy-s23-ultra', 'galaxy-s24', 'galaxy-s24-plus',
              'galaxy-s24-ultra', 'galaxy-z-fold-3', 'galaxy-z-fold-4', 'galaxy-z-fold-5', 'galaxy-z-flip-3',
              'galaxy-z-flip-4', 'galaxy-z-flip-5', 'galaxy-note9', 'galaxy-note10', 'galaxy-note10-plus',
              'galaxy-note10-lite', 'galaxy-note20', 'galaxy-note20-ultra',
              'oneplus-10-pro-5g', 'oneplus-9-pro-5g',
              'pixel-9', 'pixel-9-pro', 'pixel-9-fold', 'pixel-9-xl', 'pixel-8', 'pixel-8-pro', 'pixel-7',
              'pixel-7-pro', 'pixel-6', 'pixel-6-pro',
              'razr-plus-2023', 'razr-plus-2024'
            ]
          }
        ]
      },
      ratePlan: 'All Voice Plans except Select Choice, Value Essentials & Essentials Savings'
    },
    maxPayout: 630,
    limit: 4,
    notStackableOnSameLine: []
  },
  {
    id: 'iphone-14-50-off',
    name: '50% Off iPhone 14 or SE3',
    internalId: 'ID240400',
    status: 'active',
    statusDate: '4/3',
    eligibleDevices: ['iphone-14', 'iphone-14-plus', 'iphone-se-3rd'],
    aal: 'Y', // New Line
    redemption: {
      trade: {
        tiers: [
          {
            value: 315,
            devices: [
              'iphone-6', 'iphone-6-plus', 'iphone-6s', 'iphone-6s-plus', 'iphone-7', 'iphone-7-plus',
              'iphone-8', 'iphone-8-plus', 'iphone-x', 'iphone-xs', 'iphone-xs-max', 'iphone-xr',
              'iphone-11', 'iphone-se-2nd', 'iphone-se-3rd',
              'galaxy-s9', 'galaxy-s9-plus', 'galaxy-s8', 'galaxy-s8-plus', 'galaxy-s8-active', 'galaxy-note8',
              'galaxy-a-series', 'galaxy-z-fold', 'galaxy-z-fold-2', 'galaxy-z-flip', 'galaxy-z-flip-5g',
              'oneplus-7t-pro', 'oneplus-7t-pro-mclaren', 'oneplus-8', 'oneplus-8-pro', 'oneplus-8t',
              'oneplus-9', 'oneplus-9-pro', 'oneplus-10t-5g',
              'pixel-4', 'pixel-4-xl', 'pixel-5', 'pixel-6a', 'pixel-7a', 'pixel-8a',
              'lg-v60-thinq',
              'razr-5g', 'razr-40', 'edge-5g-2022'
            ]
          }
        ]
      },
      ratePlan: 'All Voice Plans except Select Choice, Value Essentials & Essentials Savings'
    },
    maxPayout: 315,
    limit: 12,
    notStackableOnSameLine: []
  },
  {
    id: 'galaxy-s25-on-us',
    name: 'Samsung Galaxy S25 On Us',
    internalId: 'ID250297',
    status: 'active',
    statusDate: '4/3',
    eligibleDevices: ['galaxy-s25', 'galaxy-s25-plus', 'galaxy-s25-ultra', 'galaxy-s25-edge', 'galaxy-s24', 'galaxy-s24-plus', 'galaxy-s24-ultra'],
    aal: 'Y', // New Line
    redemption: {
      trade: {
        tiers: [
          {
            value: 800,
            devices: [
              'iphone-11-pro', 'iphone-11-pro-max', 'iphone-12', 'iphone-12-mini', 'iphone-12-pro', 'iphone-12-pro-max',
              'iphone-13', 'iphone-13-mini', 'iphone-13-pro', 'iphone-13-pro-max', 'iphone-14', 'iphone-14-plus',
              'iphone-15', 'iphone-15-plus', 'iphone-15-pro', 'iphone-15-pro-max',
              'galaxy-s10', 'galaxy-s10e', 'galaxy-s10-plus', 'galaxy-s10-5g', 'galaxy-s20', 'galaxy-s20-plus',
              'galaxy-s20-ultra', 'galaxy-s21', 'galaxy-s21-plus', 'galaxy-s21-ultra', 'galaxy-s22', 'galaxy-s22-plus',
              'galaxy-s22-ultra', 'galaxy-s23', 'galaxy-s23-plus', 'galaxy-s23-ultra', 'galaxy-s24', 'galaxy-s24-plus',
              'galaxy-s24-ultra', 'galaxy-z-fold-3', 'galaxy-z-fold-4', 'galaxy-z-fold-5', 'galaxy-z-flip-3',
              'galaxy-z-flip-4', 'galaxy-z-flip-5', 'galaxy-note9', 'galaxy-note10', 'galaxy-note10-plus',
              'galaxy-note10-lite', 'galaxy-note20', 'galaxy-note20-ultra',
              'oneplus-10-pro-5g', 'oneplus-9-pro-5g',
              'pixel-9', 'pixel-9-pro', 'pixel-9-fold', 'pixel-9-xl', 'pixel-8', 'pixel-8-pro', 'pixel-7',
              'pixel-7-pro', 'pixel-6', 'pixel-6-pro',
              'razr-plus-2023', 'razr-plus-2024'
            ]
          }
        ]
      },
      ratePlan: 'All Voice Plans except Select Choice, Value Essentials & Essentials Savings'
    },
    maxPayout: 800,
    limit: 4,
    notStackableOnSameLine: []
  },
  {
    id: 'pixel-10-on-us',
    name: 'Google Pixel 10 On Us',
    internalId: 'ID250463',
    status: 'active',
    statusDate: '4/3',
    eligibleDevices: ['pixel-10', 'pixel-10-pro', 'pixel-10-pro-xl'],
    aal: 'Y', // New Line
    redemption: {
      trade: {
        tiers: [
          {
            value: 800,
            devices: [
              'iphone-11-pro', 'iphone-11-pro-max', 'iphone-12', 'iphone-12-mini', 'iphone-12-pro', 'iphone-12-pro-max',
              'iphone-13', 'iphone-13-mini', 'iphone-13-pro', 'iphone-13-pro-max', 'iphone-14', 'iphone-14-plus',
              'iphone-15', 'iphone-15-plus', 'iphone-15-pro', 'iphone-15-pro-max',
              'galaxy-s10', 'galaxy-s10e', 'galaxy-s10-plus', 'galaxy-s10-5g', 'galaxy-s20', 'galaxy-s20-plus',
              'galaxy-s20-ultra', 'galaxy-s21', 'galaxy-s21-plus', 'galaxy-s21-ultra', 'galaxy-s22', 'galaxy-s22-plus',
              'galaxy-s22-ultra', 'galaxy-s23', 'galaxy-s23-plus', 'galaxy-s23-ultra', 'galaxy-s24', 'galaxy-s24-plus',
              'galaxy-s24-ultra', 'galaxy-z-fold-3', 'galaxy-z-fold-4', 'galaxy-z-fold-5', 'galaxy-z-flip-3',
              'galaxy-z-flip-4', 'galaxy-z-flip-5', 'galaxy-note9', 'galaxy-note10', 'galaxy-note10-plus',
              'galaxy-note10-lite', 'galaxy-note20', 'galaxy-note20-ultra',
              'oneplus-10-pro-5g', 'oneplus-9-pro-5g',
              'pixel-9', 'pixel-9-pro', 'pixel-9-fold', 'pixel-9-xl', 'pixel-8', 'pixel-8-pro', 'pixel-7',
              'pixel-7-pro', 'pixel-6', 'pixel-6-pro',
              'razr-plus-2023', 'razr-plus-2024'
            ]
          }
        ]
      },
      ratePlan: 'All Voice Plans except Select Choice, Value Essentials & Essentials Savings'
    },
    maxPayout: 800,
    limit: 4,
    notStackableOnSameLine: []
  },
  {
    id: 'android-800-off',
    name: '$800 Off Android Smartphones',
    internalId: 'ID250490',
    status: 'active',
    statusDate: '4/3',
    eligibleDevices: ['galaxy-s25', 'galaxy-s25-plus', 'galaxy-s25-ultra', 'galaxy-s25-edge', 'galaxy-s24', 'galaxy-s24-plus', 'galaxy-s24-ultra', 'galaxy-a36', 'galaxy-z-flip-6', 'galaxy-z-flip-7', 'galaxy-z-fold-6', 'galaxy-z-fold-7', 'xcover7-pro', 'razr-2025', 'razr-plus-2025', 'razr-ultra', 'pixel-9', 'pixel-9-pro', 'pixel-9-xl', 'pixel-9a'],
    aal: 'Y', // New Line
    redemption: {
      trade: {
        tiers: [
          {
            value: 800,
            devices: [
              'iphone-11-pro', 'iphone-11-pro-max', 'iphone-12', 'iphone-12-mini', 'iphone-12-pro', 'iphone-12-pro-max',
              'iphone-13', 'iphone-13-mini', 'iphone-13-pro', 'iphone-13-pro-max', 'iphone-14', 'iphone-14-plus',
              'iphone-15', 'iphone-15-plus', 'iphone-15-pro', 'iphone-15-pro-max',
              'galaxy-s10', 'galaxy-s10e', 'galaxy-s10-plus', 'galaxy-s10-5g', 'galaxy-s20', 'galaxy-s20-plus',
              'galaxy-s20-ultra', 'galaxy-s21', 'galaxy-s21-plus', 'galaxy-s21-ultra', 'galaxy-s22', 'galaxy-s22-plus',
              'galaxy-s22-ultra', 'galaxy-s23', 'galaxy-s23-plus', 'galaxy-s23-ultra', 'galaxy-s24', 'galaxy-s24-plus',
              'galaxy-s24-ultra', 'galaxy-z-fold-3', 'galaxy-z-fold-4', 'galaxy-z-fold-5', 'galaxy-z-flip-3',
              'galaxy-z-flip-4', 'galaxy-z-flip-5', 'galaxy-note9', 'galaxy-note10', 'galaxy-note10-plus',
              'galaxy-note10-lite', 'galaxy-note20', 'galaxy-note20-ultra',
              'oneplus-10-pro-5g', 'oneplus-9-pro-5g',
              'pixel-9', 'pixel-9-pro', 'pixel-9-fold', 'pixel-9-xl', 'pixel-8', 'pixel-8-pro', 'pixel-7',
              'pixel-7-pro', 'pixel-6', 'pixel-6-pro',
              'razr-plus-2023', 'razr-plus-2024'
            ]
          }
        ]
      },
      ratePlan: 'All Voice Plans except Select Choice, Value Essentials & Essentials Savings'
    },
    maxPayout: 800,
    limit: 4,
    notStackableOnSameLine: []
  },
  {
    id: 'android-300-off',
    name: '$300 Off Android Smartphones',
    internalId: 'ID250176',
    status: 'active',
    statusDate: '4/3',
    eligibleDevices: ['check-c2-list'], // Requires checking external C2 list
    aal: 'Y', // New Line
    redemption: {
      trade: {
        tiers: [
          {
            value: 300.99,
            devices: [
              'iphone-6', 'iphone-6-plus', 'iphone-6s', 'iphone-6s-plus', 'iphone-7', 'iphone-7-plus',
              'iphone-8', 'iphone-8-plus', 'iphone-x', 'iphone-xs', 'iphone-xs-max', 'iphone-xr',
              'iphone-11', 'iphone-se-2nd', 'iphone-se-3rd',
              'galaxy-s9', 'galaxy-s9-plus', 'galaxy-s8', 'galaxy-s8-plus', 'galaxy-s8-active', 'galaxy-note8',
              'galaxy-a-series', 'galaxy-z-fold', 'galaxy-z-fold-2', 'galaxy-z-flip', 'galaxy-z-flip-5g',
              'oneplus-7t-pro', 'oneplus-7t-pro-mclaren', 'oneplus-8', 'oneplus-8-pro', 'oneplus-8t',
              'oneplus-9', 'oneplus-9-pro', 'oneplus-10t-5g',
              'pixel-4', 'pixel-4-xl', 'pixel-5', 'pixel-6a', 'pixel-7a', 'pixel-8a',
              'lg-v60-thinq',
              'razr-5g', 'razr-40', 'edge-5g-2022'
            ]
          }
        ]
      },
      ratePlan: 'All Voice Plans except Select Choice, Value Essentials & Essentials Savings'
    },
    maxPayout: 300.99,
    limit: 12,
    notStackableOnSameLine: []
  },
  {
    id: 'iphone-16-pro-on-us',
    name: '★iPhone 16 Pro On Us★',
    internalId: 'ID250536',
    status: 'start',
    statusDate: '8/20',
    eligibleDevices: ['iphone-16-pro', 'iphone-16-pro-max'],
    aal: 'N', // Upgrade
    redemption: {
      trade: {
        tiers: [
          {
            value: 1000,
            devices: [
              'iphone-11-pro', 'iphone-11-pro-max', 'iphone-12', 'iphone-12-mini', 'iphone-12-pro', 'iphone-12-pro-max',
              'iphone-13', 'iphone-13-mini', 'iphone-13-pro', 'iphone-13-pro-max', 'iphone-14', 'iphone-14-plus',
              'iphone-15', 'iphone-15-plus', 'iphone-15-pro', 'iphone-15-pro-max',
              'galaxy-s10', 'galaxy-s10e', 'galaxy-s10-plus', 'galaxy-s10-5g', 'galaxy-s20', 'galaxy-s20-plus',
              'galaxy-s20-ultra', 'galaxy-s21', 'galaxy-s21-plus', 'galaxy-s21-ultra', 'galaxy-s22', 'galaxy-s22-plus',
              'galaxy-s22-ultra', 'galaxy-s23', 'galaxy-s23-plus', 'galaxy-s23-ultra', 'galaxy-s24', 'galaxy-s24-plus',
              'galaxy-s24-ultra', 'galaxy-z-fold-3', 'galaxy-z-fold-4', 'galaxy-z-fold-5', 'galaxy-z-flip-3',
              'galaxy-z-flip-4', 'galaxy-z-flip-5', 'galaxy-note9', 'galaxy-note10', 'galaxy-note10-plus',
              'galaxy-note10-lite', 'galaxy-note20', 'galaxy-note20-ultra',
              'oneplus-10-pro-5g', 'oneplus-9-pro-5g',
              'pixel-9', 'pixel-9-pro', 'pixel-9-fold', 'pixel-9-xl', 'pixel-8', 'pixel-8-pro', 'pixel-7',
              'pixel-7-pro', 'pixel-6', 'pixel-6-pro',
              'razr-plus-2023', 'razr-plus-2024'
            ]
          },
          {
            value: 830,
            devices: [
              'iphone-6', 'iphone-6-plus', 'iphone-6s', 'iphone-6s-plus', 'iphone-7', 'iphone-7-plus',
              'iphone-8', 'iphone-8-plus', 'iphone-x', 'iphone-xs', 'iphone-xs-max', 'iphone-xr',
              'iphone-11', 'iphone-se-2nd', 'iphone-se-3rd',
              'galaxy-s9', 'galaxy-s9-plus', 'galaxy-s8', 'galaxy-s8-plus', 'galaxy-s8-active', 'galaxy-note8',
              'galaxy-a-series', 'galaxy-z-fold', 'galaxy-z-fold-2', 'galaxy-z-flip', 'galaxy-z-flip-5g',
              'oneplus-7t-pro', 'oneplus-7t-pro-mclaren', 'oneplus-8', 'oneplus-8-pro', 'oneplus-8t',
              'oneplus-9', 'oneplus-9-pro', 'oneplus-10t-5g',
              'pixel-4', 'pixel-4-xl', 'pixel-5', 'pixel-6a', 'pixel-7a', 'pixel-8a',
              'lg-v60-thinq',
              'razr-5g', 'razr-40', 'edge-5g-2022'
            ]
          },
          {
            value: 415,
            devices: [
              'iphone-5s', 'iphone-6', 'iphone-6-plus', 'iphone-6s', 'iphone-6s-plus', 'iphone-7', 'iphone-7-plus',
              'iphone-8', 'iphone-8-plus', 'iphone-x', 'iphone-xs', 'iphone-xs-max', 'iphone-xr',
              'iphone-11', 'iphone-se-2nd', 'iphone-se-3rd',
              'galaxy-s9', 'galaxy-s9-plus', 'galaxy-s8', 'galaxy-s8-plus', 'galaxy-s8-active', 'galaxy-note8',
              'galaxy-a-series', 'galaxy-z-fold', 'galaxy-z-fold-2', 'galaxy-z-flip', 'galaxy-z-flip-5g',
              'oneplus-7t-pro', 'oneplus-7t-pro-mclaren', 'oneplus-8', 'oneplus-8-pro', 'oneplus-8t',
              'oneplus-9', 'oneplus-9-pro', 'oneplus-10t-5g',
              'pixel-4', 'pixel-4-xl', 'pixel-5', 'pixel-6a', 'pixel-7a', 'pixel-8a',
              'lg-v60-thinq',
              'razr-5g', 'razr-40', 'edge-5g-2022'
            ]
          }
        ]
      },
      ratePlan: 'Experience Beyond & Go5G Next plans (incl. Bus)'
    },
    maxPayout: 1000,
    limit: 4,
    notStackableOnSameLine: ['Essentials Saver']
  },
  // Additional Promotions from PDF
  {
    id: 'iphone-15-series-promo',
    name: 'iPhone 15 Series Promotion',
    internalId: 'ID250084',
    status: 'active',
    statusDate: '4/3',
    eligibleDevices: ['iphone-15', 'iphone-15-plus', 'iphone-15-pro', 'iphone-15-pro-max'],
    aal: 'Y', // New Line
    redemption: {
      trade: {
        tiers: [
          {
            value: 700,
            devices: [
              'iphone-11-pro', 'iphone-11-pro-max', 'iphone-12', 'iphone-12-mini', 'iphone-12-pro', 'iphone-12-pro-max',
              'iphone-13', 'iphone-13-mini', 'iphone-13-pro', 'iphone-13-pro-max', 'iphone-14', 'iphone-14-plus',
              'galaxy-s10', 'galaxy-s10e', 'galaxy-s10-plus', 'galaxy-s10-5g', 'galaxy-s20', 'galaxy-s20-plus',
              'galaxy-s20-ultra', 'galaxy-s21', 'galaxy-s21-plus', 'galaxy-s21-ultra', 'galaxy-s22', 'galaxy-s22-plus',
              'galaxy-s22-ultra', 'galaxy-s23', 'galaxy-s23-plus', 'galaxy-s23-ultra', 'galaxy-s24', 'galaxy-s24-plus',
              'galaxy-s24-ultra', 'galaxy-z-fold-3', 'galaxy-z-fold-4', 'galaxy-z-fold-5', 'galaxy-z-flip-3',
              'galaxy-z-flip-4', 'galaxy-z-flip-5', 'galaxy-note9', 'galaxy-note10', 'galaxy-note10-plus',
              'galaxy-note10-lite', 'galaxy-note20', 'galaxy-note20-ultra',
              'oneplus-10-pro-5g', 'oneplus-9-pro-5g',
              'pixel-9', 'pixel-9-pro', 'pixel-9-fold', 'pixel-9-xl', 'pixel-8', 'pixel-8-pro', 'pixel-7',
              'pixel-7-pro', 'pixel-6', 'pixel-6-pro',
              'razr-plus-2023', 'razr-plus-2024'
            ]
          }
        ]
      },
      ratePlan: 'Most Voice plans'
    },
    maxPayout: 700,
    limit: 4,
    notStackableOnSameLine: []
  },
  {
    id: 'galaxy-z-series-promo',
    name: 'Galaxy Z Series Promotion',
    internalId: 'ID250298',
    status: 'active',
    statusDate: '4/3',
    eligibleDevices: ['galaxy-z-flip-6', 'galaxy-z-flip-7', 'galaxy-z-fold-6', 'galaxy-z-fold-7'],
    aal: 'Y', // New Line
    redemption: {
      trade: {
        tiers: [
          {
            value: 900,
            devices: [
              'iphone-11-pro', 'iphone-11-pro-max', 'iphone-12', 'iphone-12-mini', 'iphone-12-pro', 'iphone-12-pro-max',
              'iphone-13', 'iphone-13-mini', 'iphone-13-pro', 'iphone-13-pro-max', 'iphone-14', 'iphone-14-plus',
              'iphone-15', 'iphone-15-plus', 'iphone-15-pro', 'iphone-15-pro-max',
              'galaxy-s10', 'galaxy-s10e', 'galaxy-s10-plus', 'galaxy-s10-5g', 'galaxy-s20', 'galaxy-s20-plus',
              'galaxy-s20-ultra', 'galaxy-s21', 'galaxy-s21-plus', 'galaxy-s21-ultra', 'galaxy-s22', 'galaxy-s22-plus',
              'galaxy-s22-ultra', 'galaxy-s23', 'galaxy-s23-plus', 'galaxy-s23-ultra', 'galaxy-s24', 'galaxy-s24-plus',
              'galaxy-s24-ultra', 'galaxy-z-fold-3', 'galaxy-z-fold-4', 'galaxy-z-fold-5', 'galaxy-z-flip-3',
              'galaxy-z-flip-4', 'galaxy-z-flip-5', 'galaxy-note9', 'galaxy-note10', 'galaxy-note10-plus',
              'galaxy-note10-lite', 'galaxy-note20', 'galaxy-note20-ultra',
              'oneplus-10-pro-5g', 'oneplus-9-pro-5g',
              'pixel-9', 'pixel-9-pro', 'pixel-9-fold', 'pixel-9-xl', 'pixel-8', 'pixel-8-pro', 'pixel-7',
              'pixel-7-pro', 'pixel-6', 'pixel-6-pro',
              'razr-plus-2023', 'razr-plus-2024'
            ]
          }
        ]
      },
      ratePlan: 'All Voice Plans except Select Choice, Value Essentials & Essentials Savings'
    },
    maxPayout: 900,
    limit: 2,
    notStackableOnSameLine: []
  },
  {
    id: 'pixel-9-series-promo',
    name: 'Pixel 9 Series Promotion',
    internalId: 'ID250464',
    status: 'active',
    statusDate: '4/3',
    eligibleDevices: ['pixel-9', 'pixel-9-pro', 'pixel-9-xl', 'pixel-9a'],
    aal: 'Y', // New Line
    redemption: {
      trade: {
        tiers: [
          {
            value: 600,
            devices: [
              'iphone-11-pro', 'iphone-11-pro-max', 'iphone-12', 'iphone-12-mini', 'iphone-12-pro', 'iphone-12-pro-max',
              'iphone-13', 'iphone-13-mini', 'iphone-13-pro', 'iphone-13-pro-max', 'iphone-14', 'iphone-14-plus',
              'iphone-15', 'iphone-15-plus', 'iphone-15-pro', 'iphone-15-pro-max',
              'galaxy-s10', 'galaxy-s10e', 'galaxy-s10-plus', 'galaxy-s10-5g', 'galaxy-s20', 'galaxy-s20-plus',
              'galaxy-s20-ultra', 'galaxy-s21', 'galaxy-s21-plus', 'galaxy-s21-ultra', 'galaxy-s22', 'galaxy-s22-plus',
              'galaxy-s22-ultra', 'galaxy-s23', 'galaxy-s23-plus', 'galaxy-s23-ultra', 'galaxy-s24', 'galaxy-s24-plus',
              'galaxy-s24-ultra', 'galaxy-z-fold-3', 'galaxy-z-fold-4', 'galaxy-z-fold-5', 'galaxy-z-flip-3',
              'galaxy-z-flip-4', 'galaxy-z-flip-5', 'galaxy-note9', 'galaxy-note10', 'galaxy-note10-plus',
              'galaxy-note10-lite', 'galaxy-note20', 'galaxy-note20-ultra',
              'oneplus-10-pro-5g', 'oneplus-9-pro-5g',
              'pixel-8', 'pixel-8-pro', 'pixel-7', 'pixel-7-pro', 'pixel-6', 'pixel-6-pro',
              'razr-plus-2023', 'razr-plus-2024'
            ]
          }
        ]
      },
      ratePlan: 'All Voice Plans except Select Choice, Value Essentials & Essentials Savings'
    },
    maxPayout: 600,
    limit: 6,
    notStackableOnSameLine: []
  },
  {
    id: 'motorola-razr-promo',
    name: 'Motorola Razr Promotion',
    internalId: 'ID250491',
    status: 'active',
    statusDate: '4/3',
    eligibleDevices: ['razr-2025', 'razr-plus-2025', 'razr-ultra'],
    aal: 'Y', // New Line
    redemption: {
      trade: {
        tiers: [
          {
            value: 500,
            devices: [
              'iphone-6', 'iphone-6-plus', 'iphone-6s', 'iphone-6s-plus', 'iphone-7', 'iphone-7-plus',
              'iphone-8', 'iphone-8-plus', 'iphone-x', 'iphone-xs', 'iphone-xs-max', 'iphone-xr',
              'iphone-11', 'iphone-se-2nd', 'iphone-se-3rd',
              'galaxy-s9', 'galaxy-s9-plus', 'galaxy-s8', 'galaxy-s8-plus', 'galaxy-s8-active', 'galaxy-note8',
              'galaxy-a-series', 'galaxy-z-fold', 'galaxy-z-fold-2', 'galaxy-z-flip', 'galaxy-z-flip-5g',
              'oneplus-7t-pro', 'oneplus-7t-pro-mclaren', 'oneplus-8', 'oneplus-8-pro', 'oneplus-8t',
              'oneplus-9', 'oneplus-9-pro', 'oneplus-10t-5g',
              'pixel-4', 'pixel-4-xl', 'pixel-5', 'pixel-6a', 'pixel-7a', 'pixel-8a',
              'lg-v60-thinq',
              'razr-5g', 'razr-40', 'edge-5g-2022'
            ]
          }
        ]
      },
      ratePlan: 'All Voice Plans except Select Choice, Value Essentials & Essentials Savings'
    },
    maxPayout: 500,
    limit: 8,
    notStackableOnSameLine: []
  },
  {
    id: 'iphone-se-promo',
    name: 'iPhone SE Promotion',
    internalId: 'ID250401',
    status: 'active',
    statusDate: '4/3',
    eligibleDevices: ['iphone-se-3rd'],
    aal: 'Y', // New Line
    redemption: {
      trade: {
        tiers: [
          {
            value: 200,
            devices: [
              'iphone-6', 'iphone-6-plus', 'iphone-6s', 'iphone-6s-plus', 'iphone-7', 'iphone-7-plus',
              'iphone-8', 'iphone-8-plus', 'iphone-x', 'iphone-xs', 'iphone-xs-max', 'iphone-xr',
              'iphone-11', 'iphone-se-2nd',
              'galaxy-s9', 'galaxy-s9-plus', 'galaxy-s8', 'galaxy-s8-plus', 'galaxy-s8-active', 'galaxy-note8',
              'galaxy-a-series', 'galaxy-z-fold', 'galaxy-z-fold-2', 'galaxy-z-flip', 'galaxy-z-flip-5g',
              'oneplus-7t-pro', 'oneplus-7t-pro-mclaren', 'oneplus-8', 'oneplus-8-pro', 'oneplus-8t',
              'oneplus-9', 'oneplus-9-pro', 'oneplus-10t-5g',
              'pixel-4', 'pixel-4-xl', 'pixel-5', 'pixel-6a', 'pixel-7a', 'pixel-8a',
              'lg-v60-thinq',
              'razr-5g', 'razr-40', 'edge-5g-2022'
            ]
          }
        ]
      },
      ratePlan: 'All Voice Plans except Select Choice, Value Essentials & Essentials Savings'
    },
    maxPayout: 200,
    limit: 12,
    notStackableOnSameLine: []
  },
  {
    id: 'galaxy-a-series-promo',
    name: 'Galaxy A Series Promotion',
    internalId: 'ID250299',
    status: 'active',
    statusDate: '4/3',
    eligibleDevices: ['galaxy-a36'],
    aal: 'Y', // New Line
    redemption: {
      trade: {
        tiers: [
          {
            value: 250,
            devices: [
              'iphone-6', 'iphone-6-plus', 'iphone-6s', 'iphone-6s-plus', 'iphone-7', 'iphone-7-plus',
              'iphone-8', 'iphone-8-plus', 'iphone-x', 'iphone-xs', 'iphone-xs-max', 'iphone-xr',
              'iphone-11', 'iphone-se-2nd', 'iphone-se-3rd',
              'galaxy-s9', 'galaxy-s9-plus', 'galaxy-s8', 'galaxy-s8-plus', 'galaxy-s8-active', 'galaxy-note8',
              'galaxy-a-series', 'galaxy-z-fold', 'galaxy-z-fold-2', 'galaxy-z-flip', 'galaxy-z-flip-5g',
              'oneplus-7t-pro', 'oneplus-7t-pro-mclaren', 'oneplus-8', 'oneplus-8-pro', 'oneplus-8t',
              'oneplus-9', 'oneplus-9-pro', 'oneplus-10t-5g',
              'pixel-4', 'pixel-4-xl', 'pixel-5', 'pixel-6a', 'pixel-7a', 'pixel-8a',
              'lg-v60-thinq',
              'razr-5g', 'razr-40', 'edge-5g-2022'
            ]
          }
        ]
      },
      ratePlan: 'All Voice Plans except Select Choice, Value Essentials & Essentials Savings'
    },
    maxPayout: 250,
    limit: 10,
    notStackableOnSameLine: []
  },
  {
    id: 'xcover-pro-promo',
    name: 'XCover Pro Promotion',
    internalId: 'ID250300',
    status: 'active',
    statusDate: '4/3',
    eligibleDevices: ['xcover7-pro'],
    aal: 'Y', // New Line
    redemption: {
      trade: {
        tiers: [
          {
            value: 300,
            devices: [
              'iphone-6', 'iphone-6-plus', 'iphone-6s', 'iphone-6s-plus', 'iphone-7', 'iphone-7-plus',
              'iphone-8', 'iphone-8-plus', 'iphone-x', 'iphone-xs', 'iphone-xs-max', 'iphone-xr',
              'iphone-11', 'iphone-se-2nd', 'iphone-se-3rd',
              'galaxy-s9', 'galaxy-s9-plus', 'galaxy-s8', 'galaxy-s8-plus', 'galaxy-s8-active', 'galaxy-note8',
              'galaxy-a-series', 'galaxy-z-fold', 'galaxy-z-fold-2', 'galaxy-z-flip', 'galaxy-z-flip-5g',
              'oneplus-7t-pro', 'oneplus-7t-pro-mclaren', 'oneplus-8', 'oneplus-8-pro', 'oneplus-8t',
              'oneplus-9', 'oneplus-9-pro', 'oneplus-10t-5g',
              'pixel-4', 'pixel-4-xl', 'pixel-5', 'pixel-6a', 'pixel-7a', 'pixel-8a',
              'lg-v60-thinq',
              'razr-5g', 'razr-40', 'edge-5g-2022'
            ]
          }
        ]
      },
      ratePlan: 'All Voice Plans except Select Choice, Value Essentials & Essentials Savings'
    },
    maxPayout: 300,
    limit: 6,
    notStackableOnSameLine: []
  },
  {
    id: 'iphone-13-series-promo',
    name: 'iPhone 13 Series Promotion',
    internalId: 'ID250051',
    status: 'active',
    statusDate: '4/3',
    eligibleDevices: ['iphone-13', 'iphone-13-mini', 'iphone-13-pro', 'iphone-13-pro-max'],
    aal: 'Y+P', // New Line + Port In Required
    redemption: {
      trade: {
        tiers: [
          {
            value: 500,
            devices: [
              'iphone-11-pro', 'iphone-11-pro-max', 'iphone-12', 'iphone-12-mini', 'iphone-12-pro', 'iphone-12-pro-max',
              'galaxy-s10', 'galaxy-s10e', 'galaxy-s10-plus', 'galaxy-s10-5g', 'galaxy-s20', 'galaxy-s20-plus',
              'galaxy-s20-ultra', 'galaxy-s21', 'galaxy-s21-plus', 'galaxy-s21-ultra', 'galaxy-s22', 'galaxy-s22-plus',
              'galaxy-s22-ultra', 'galaxy-s23', 'galaxy-s23-plus', 'galaxy-s23-ultra', 'galaxy-s24', 'galaxy-s24-plus',
              'galaxy-s24-ultra', 'galaxy-z-fold-3', 'galaxy-z-fold-4', 'galaxy-z-fold-5', 'galaxy-z-flip-3',
              'galaxy-z-flip-4', 'galaxy-z-flip-5', 'galaxy-note9', 'galaxy-note10', 'galaxy-note10-plus',
              'galaxy-note10-lite', 'galaxy-note20', 'galaxy-note20-ultra',
              'oneplus-10-pro-5g', 'oneplus-9-pro-5g',
              'pixel-9', 'pixel-9-pro', 'pixel-9-fold', 'pixel-9-xl', 'pixel-8', 'pixel-8-pro', 'pixel-7',
              'pixel-7-pro', 'pixel-6', 'pixel-6-pro',
              'razr-plus-2023', 'razr-plus-2024'
            ]
          }
        ]
      },
      ratePlan: 'All Voice Plans except Select Choice, Value Essentials & Essentials Savings'
    },
    maxPayout: 500,
    limit: 4,
    notStackableOnSameLine: []
  },
  {
    id: 'galaxy-s24-series-promo',
    name: 'Galaxy S24 Series Promotion',
    internalId: 'ID250301',
    status: 'active',
    statusDate: '4/3',
    eligibleDevices: ['galaxy-s24', 'galaxy-s24-plus', 'galaxy-s24-ultra'],
    aal: 'N', // Upgrade
    redemption: {
      trade: {
        tiers: [
          {
            value: 750,
            devices: [
              'iphone-11-pro', 'iphone-11-pro-max', 'iphone-12', 'iphone-12-mini', 'iphone-12-pro', 'iphone-12-pro-max',
              'iphone-13', 'iphone-13-mini', 'iphone-13-pro', 'iphone-13-pro-max', 'iphone-14', 'iphone-14-plus',
              'iphone-15', 'iphone-15-plus', 'iphone-15-pro', 'iphone-15-pro-max',
              'galaxy-s10', 'galaxy-s10e', 'galaxy-s10-plus', 'galaxy-s10-5g', 'galaxy-s20', 'galaxy-s20-plus',
              'galaxy-s20-ultra', 'galaxy-s21', 'galaxy-s21-plus', 'galaxy-s21-ultra', 'galaxy-s22', 'galaxy-s22-plus',
              'galaxy-s22-ultra', 'galaxy-s23', 'galaxy-s23-plus', 'galaxy-s23-ultra',
              'galaxy-z-fold-3', 'galaxy-z-fold-4', 'galaxy-z-fold-5', 'galaxy-z-flip-3',
              'galaxy-z-flip-4', 'galaxy-z-flip-5', 'galaxy-note9', 'galaxy-note10', 'galaxy-note10-plus',
              'galaxy-note10-lite', 'galaxy-note20', 'galaxy-note20-ultra',
              'oneplus-10-pro-5g', 'oneplus-9-pro-5g',
              'pixel-9', 'pixel-9-pro', 'pixel-9-fold', 'pixel-9-xl', 'pixel-8', 'pixel-8-pro', 'pixel-7',
              'pixel-7-pro', 'pixel-6', 'pixel-6-pro',
              'razr-plus-2023', 'razr-plus-2024'
            ]
          }
        ]
      },
      ratePlan: 'Experience Beyond & Go5G Next plans (incl. Bus)'
    },
    maxPayout: 750,
    limit: 2,
    notStackableOnSameLine: ['Essentials Saver']
  }
];

// Helper functions for promotion logic
export const getPromotionsForDevice = (deviceId) => {
  return promotions.filter(promo => 
    promo.eligibleDevices.includes(deviceId) || 
    promo.eligibleDevices.includes('check-c2-list')
  );
};

export const getPromotionsForLineType = (lineType) => {
  return promotions.filter(promo => {
    if (lineType === 'new') return promo.aal === 'Y' || promo.aal === 'Y+P';
    if (lineType === 'upgrade') return promo.aal === 'N';
    return false;
  });
};

export const getTradeInValueForPromotion = (promoId, tradeInDeviceId) => {
  const promo = promotions.find(p => p.id === promoId);
  if (!promo) return 0;
  
  for (const tier of promo.redemption.trade.tiers) {
    if (tier.devices.includes(tradeInDeviceId)) {
      return tier.value;
    }
  }
  return 0;
};

export const isRatePlanEligible = (promoId, planId) => {
  const promo = promotions.find(p => p.id === promoId);
  if (!promo) return false;
  
  const ratePlanRequirement = promo.redemption.ratePlan;
  
  // Handle different rate plan requirements
  if (ratePlanRequirement === 'Most Voice plans') {
    return !['select-choice', 'value-essentials', 'essentials-savings'].includes(planId);
  }
  
  if (ratePlanRequirement === '55, Military, and FR versions only of Most Plans') {
    return ['essentials-55', 'more-55', 'beyond-55'].includes(planId);
  }
  
  if (ratePlanRequirement === 'All Voice Plans except Select Choice, Value Essentials & Essentials Savings') {
    return !['select-choice', 'value-essentials', 'essentials-savings'].includes(planId);
  }
  
  if (ratePlanRequirement === 'Experience Beyond & Go5G Next plans (incl. Bus)') {
    return ['beyond', 'go5g-next'].includes(planId);
  }
  
  return true;
};

export const checkPromotionLimits = (selectedPromotions) => {
  const limits = {};
  const errors = [];
  
  selectedPromotions.forEach(selectedPromo => {
    const promoId = selectedPromo.promotionId;
    const promo = promotions.find(p => p.id === promoId);
    if (!promo) return;
    
    limits[promoId] = (limits[promoId] || 0) + 1;
    
    if (limits[promoId] > promo.limit) {
      errors.push(`${promo.name} can only be applied ${promo.limit} time(s)`);
    }
  });
  
  return { limits, errors };
};

export const checkStackability = (selectedPromotions) => {
  const errors = [];
  
  selectedPromotions.forEach(promo => {
    const promoData = promotions.find(p => p.id === promo.promotionId);
    if (!promoData) return;
    
    const notStackable = promoData.notStackableOnSameLine;
    if (notStackable.length === 0) return;
    
    selectedPromotions.forEach(otherPromo => {
      if (promo.lineIndex === otherPromo.lineIndex && promo.promotionId !== otherPromo.promotionId) {
        const otherPromoData = promotions.find(p => p.id === otherPromo.promotionId);
        if (otherPromoData && notStackable.includes(otherPromoData.name)) {
          errors.push(`${promoData.name} cannot be combined with ${otherPromoData.name} on the same line`);
        }
      }
    });
  });
  
  return errors;
};
