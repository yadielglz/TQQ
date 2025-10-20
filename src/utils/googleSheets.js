// Google Sheets API integration
const GOOGLE_SHEETS_API_URL = 'https://sheets.googleapis.com/v4/spreadsheets/1bHPeLWo5nQeJuIaOU0Aawg41eRzYZaoszNzgz44yrdI/values/Sheet1!A:F:append';
const GOOGLE_SHEETS_API_KEY = 'YOUR_API_KEY_HERE'; // You'll need to get this from Google Cloud Console

export const saveCustomerToGoogleSheet = async (customerData) => {
  try {
    // Format the data to match your Google Sheet columns
    const values = [
      [
        customerData.firstName,
        customerData.lastName,
        customerData.email,
        customerData.pin,
        customerData.phone,
        customerData.last4SSN,
        customerData.expectedEC
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
    console.log('Successfully saved to Google Sheet:', result);
    return result;
  } catch (error) {
    console.error('Error saving to Google Sheet:', error);
    throw error;
  }
};

// Alternative: Using Google Apps Script (easier setup)
export const saveCustomerToGoogleSheetViaScript = async (customerData) => {
  try {
    // This would be your Google Apps Script web app URL
    const SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbyTL1pB3IDU_1HRyCG4Cwu9X9CqE-WAmMEgG2kXgzwYMQZPxJ2RoLjk03aFJhARsjrU/exec';
    
    // Use a simple GET request with URL parameters to avoid CORS
    const params = new URLSearchParams({
      firstName: customerData.firstName || '',
      lastName: customerData.lastName || '',
      email: customerData.email || '',
      pin: customerData.pin || '',
      phone: customerData.phone || '',
      last4SSN: customerData.last4SSN || '',
      expectedEC: customerData.expectedEC || '',
      equipmentCredit: customerData.equipmentCredit || '',
      downPayment: customerData.downPayment || '',
      tradeIns: customerData.tradeIns ? JSON.stringify(customerData.tradeIns) : ''
    });
    
    const response = await fetch(`${SCRIPT_URL}?${params}`, {
      method: 'GET',
      mode: 'no-cors' // This bypasses CORS but we won't get response data
    });

    console.log('Successfully sent data to Google Sheet via Apps Script');
    return { success: true };
  } catch (error) {
    console.error('Error saving to Google Sheet via Apps Script:', error);
    throw error;
  }
};
