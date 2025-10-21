// Enhanced Google Sheets Integration
// Configuration - Update these with your actual values
const GOOGLE_SHEETS_API_URL = 'https://sheets.googleapis.com/v4/spreadsheets/1bHPeLWo5nQeJuIaOU0Aawg41eRzYZaoszNzgz44yrdI/values/Sheet1!A:K:append';
const GOOGLE_SHEETS_API_KEY = 'YOUR_API_KEY_HERE'; // Get from Google Cloud Console
const GOOGLE_APPS_SCRIPT_URL = 'YOUR_GOOGLE_APPS_SCRIPT_URL_HERE'; // Get from Google Apps Script deployment

// Enhanced customer data saving with comprehensive quote information
export const saveCustomerToGoogleSheet = async (customerData, quoteData = {}) => {
  try {
    // Format the data to match your Google Sheet columns
    const values = [
      [
        new Date().toISOString(), // Timestamp
        customerData.firstName || '',
        customerData.lastName || '',
        customerData.email || '',
        customerData.pin || '',
        customerData.phone || '',
        customerData.last4SSN || '',
        customerData.expectedEC || '',
        quoteData.totalMonthly || 0,
        quoteData.services || '',
        JSON.stringify(quoteData) // Full quote data as JSON
      ]
    ];

    const response = await fetch(`${GOOGLE_SHEETS_API_URL}?key=${GOOGLE_SHEETS_API_KEY}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        values: values,
        valueInputOption: 'RAW'
      })
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const result = await response.json();
    console.log('Customer data saved to Google Sheet:', result);
    return result;
  } catch (error) {
    console.error('Error saving to Google Sheets API:', error);
    throw error;
  }
};

// Enhanced Google Apps Script integration (recommended - easier setup)
export const saveCustomerToGoogleSheetViaScript = async (customerData, quoteData = {}) => {
  try {
    // Use the Google Apps Script URL (easier setup, no API key needed)
    const SCRIPT_URL = GOOGLE_APPS_SCRIPT_URL || 'https://script.google.com/macros/s/AKfycbyTL1pB3IDU_1HRyCG4Cwu9X9CqE-WAmMEgG2kXgzwYMQZPxJ2RoLjk03aFJhARsjrU/exec';
    
    // Prepare comprehensive data
    const params = new URLSearchParams({
      timestamp: new Date().toISOString(),
      firstName: customerData.firstName || '',
      lastName: customerData.lastName || '',
      email: customerData.email || '',
      pin: customerData.pin || '',
      phone: customerData.phone || '',
      last4SSN: customerData.last4SSN || '',
      expectedEC: customerData.expectedEC || '',
      equipmentCredit: customerData.equipmentCredit || '',
      downPayment: customerData.downPayment || '',
      tradeIns: customerData.tradeIns ? JSON.stringify(customerData.tradeIns) : '',
      // Quote data
      totalMonthly: quoteData.totalMonthly || 0,
      services: quoteData.services || '',
      voiceLines: quoteData.voiceLines || 0,
      dataLines: quoteData.dataLines || 0,
      iotLines: quoteData.iotLines || 0,
      homeInternet: quoteData.homeInternet ? 'Yes' : 'No',
      discounts: quoteData.discounts || '',
      fullQuoteData: JSON.stringify(quoteData)
    });
    
    // Use POST request for better data handling
    const response = await fetch(SCRIPT_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: params.toString()
    });

    if (response.ok) {
      const result = await response.json();
      console.log('Customer data saved via Google Apps Script:', result);
      return result;
    } else {
      throw new Error(`Script error! status: ${response.status}`);
    }
  } catch (error) {
    console.error('Error saving via Google Apps Script:', error);
    throw error;
  }
};

// Save complete quote data
export const saveQuoteToGoogleSheet = async (customerData, quoteData) => {
  try {
    // Try Google Apps Script first (easier setup)
    return await saveCustomerToGoogleSheetViaScript(customerData, quoteData);
  } catch (scriptError) {
    console.warn('Google Apps Script failed, trying API method:', scriptError);
    try {
      // Fallback to API method
      return await saveCustomerToGoogleSheet(customerData, quoteData);
    } catch (apiError) {
      console.error('Both Google Sheets methods failed:', apiError);
      throw new Error('Failed to save quote data to Google Sheets');
    }
  }
};

// Test function to verify integration
export const testGoogleSheetsIntegration = async () => {
  const testData = {
    firstName: 'Test',
    lastName: 'User',
    email: 'test@example.com',
    pin: '1234',
    phone: '555-1234',
    last4SSN: '1234',
    expectedEC: '500'
  };

  const testQuoteData = {
    totalMonthly: 150.00,
    services: 'Voice Lines, Data Lines',
    voiceLines: 2,
    dataLines: 1,
    discounts: 'Auto Pay'
  };

  try {
    const result = await saveQuoteToGoogleSheet(testData, testQuoteData);
    console.log('Google Sheets integration test successful:', result);
    return { success: true, result };
  } catch (error) {
    console.error('Google Sheets integration test failed:', error);
    return { success: false, error: error.message };
  }
};

// Configuration helper
export const configureGoogleSheets = (apiKey, scriptUrl) => {
  if (apiKey && apiKey !== 'YOUR_API_KEY_HERE') {
    GOOGLE_SHEETS_API_KEY = apiKey;
  }
  if (scriptUrl && scriptUrl !== 'YOUR_GOOGLE_APPS_SCRIPT_URL_HERE') {
    GOOGLE_APPS_SCRIPT_URL = scriptUrl;
  }
};
