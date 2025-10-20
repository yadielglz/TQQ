/**
 * Google Apps Script for T-Mobile Quote App
 * 
 * Instructions:
 * 1. Go to https://script.google.com/
 * 2. Create a new project
 * 3. Replace the default code with this script
 * 4. Save the project
 * 5. Deploy as web app with execute permissions for "Anyone"
 * 6. Copy the web app URL and update the SCRIPT_URL in googleSheets.js
 */

function doPost(e) {
  try {
    // Parse the incoming data (form data or JSON)
    let data;
    if (e.postData && e.postData.contents) {
      try {
        data = JSON.parse(e.postData.contents);
      } catch (jsonError) {
        // If JSON parsing fails, try to parse as form data
        data = e.parameter || {};
      }
    } else {
      data = e.parameter || {};
    }
    
    // Get the spreadsheet by ID
    const spreadsheetId = '1bHPeLWo5nQeJuIaOU0Aawg41eRzYZaoszNzgz44yrdI';
    const sheet = SpreadsheetApp.openById(spreadsheetId).getActiveSheet();
    
    // Prepare the row data
    const rowData = [
      data.firstName || '',
      data.lastName || '',
      data.email || '',
      data.pin || '',
      data.phone || '',
      data.last4SSN || '',
      data.expectedEC || '',
      data.equipmentCredit || '',
      data.downPayment || '',
      data.tradeIns || ''
    ];
    
    // Append the data to the sheet
    sheet.appendRow(rowData);
    
    // Return success response
    return ContentService
      .createTextOutput(JSON.stringify({
        success: true,
        message: 'Customer data saved successfully',
        timestamp: new Date().toISOString()
      }))
      .setMimeType(ContentService.MimeType.JSON);
      
  } catch (error) {
    // Return error response
    return ContentService
      .createTextOutput(JSON.stringify({
        success: false,
        error: error.toString(),
        timestamp: new Date().toISOString()
      }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

function doGet(e) {
  try {
    // Handle GET requests (for CORS-free data submission)
    const data = e.parameter || {};
    
    // Get the spreadsheet by ID
    const spreadsheetId = '1bHPeLWo5nQeJuIaOU0Aawg41eRzYZaoszNzgz44yrdI';
    const sheet = SpreadsheetApp.openById(spreadsheetId).getActiveSheet();
    
    // Prepare the row data
    const rowData = [
      data.firstName || '',
      data.lastName || '',
      data.email || '',
      data.pin || '',
      data.phone || '',
      data.last4SSN || '',
      data.expectedEC || '',
      data.equipmentCredit || '',
      data.downPayment || '',
      data.tradeIns || ''
    ];
    
    // Append the data to the sheet
    sheet.appendRow(rowData);
    
    // Return success response
    return ContentService
      .createTextOutput(JSON.stringify({
        success: true,
        message: 'Customer data saved successfully',
        timestamp: new Date().toISOString()
      }))
      .setMimeType(ContentService.MimeType.JSON);
      
  } catch (error) {
    // Return error response
    return ContentService
      .createTextOutput(JSON.stringify({
        success: false,
        error: error.toString(),
        timestamp: new Date().toISOString()
      }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

// Test function to verify the script works
function testSaveCustomer() {
  const testData = {
    firstName: 'John',
    lastName: 'Doe',
    email: 'john.doe@example.com',
    pin: '123456',
    phone: '(555) 123-4567',
    last4SSN: '1234',
    expectedEC: 'ABC123',
    equipmentCredit: '500',
    downPayment: '33',
    tradeIns: { 0: '200', 1: '150' }
  };
  
  const mockEvent = {
    postData: {
      contents: JSON.stringify(testData)
    }
  };
  
  const result = doPost(mockEvent);
  console.log('Test result:', result.getContent());
}
