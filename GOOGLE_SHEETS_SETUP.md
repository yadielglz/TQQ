# Google Sheets Integration Setup Guide

## Why Your Google Sheet Isn't Being Populated

The customer intake form was only collecting data locally in the app - it wasn't actually connected to your Google Sheet. I've now added the integration, but you need to set it up.

## Setup Instructions

### Option 1: Google Apps Script (Recommended - Easier)

1. **Go to Google Apps Script**
   - Visit: https://script.google.com/
   - Sign in with your Google account

2. **Create New Project**
   - Click "New Project"
   - Replace the default code with the content from `google-apps-script.js`

3. **Save the Project**
   - Click "Save" (Ctrl+S)
   - Name it "T-Mobile Quote App"

4. **Deploy as Web App**
   - Click "Deploy" → "New deployment"
   - Choose "Web app" as the type
   - Set "Execute as" to "Me"
   - Set "Who has access" to "Anyone"
   - Click "Deploy"
   - Copy the web app URL

5. **Update the App**
   - Open `src/utils/googleSheets.js`
   - Replace `YOUR_GOOGLE_APPS_SCRIPT_URL_HERE` with your web app URL

### Option 2: Google Sheets API (More Complex)

1. **Enable Google Sheets API**
   - Go to: https://console.cloud.google.com/
   - Create a new project or select existing
   - Enable the Google Sheets API

2. **Create API Key**
   - Go to "Credentials" → "Create Credentials" → "API Key"
   - Copy the API key

3. **Update the App**
   - Open `src/utils/googleSheets.js`
   - Replace `YOUR_API_KEY_HERE` with your API key

## Testing the Integration

1. **Test the Script**
   - In Google Apps Script, run the `testSaveCustomer` function
   - Check your Google Sheet for the test data

2. **Test the App**
   - Fill out the customer intake form
   - Check the browser console for success messages
   - Verify data appears in your Google Sheet

## Troubleshooting

### Common Issues:

1. **CORS Errors**
   - Google Apps Script handles CORS automatically
   - If using Sheets API, you may need a backend proxy

2. **Permission Errors**
   - Make sure the web app is deployed with "Anyone" access
   - Verify the spreadsheet ID is correct

3. **Data Not Appearing**
   - Check the browser console for error messages
   - Verify the sheet name is "Sheet1" (or update the script)

### Debug Steps:

1. Open browser developer tools (F12)
2. Go to Console tab
3. Fill out the customer form
4. Look for success/error messages

## Current Status

✅ **Customer Intake Form** - Collects all required data
✅ **Data Validation** - Validates all fields
✅ **Google Sheets Integration** - Ready to connect
⏳ **API Setup** - Needs your Google Apps Script deployment

Once you complete the setup, every customer who fills out the form will automatically be added to your Google Sheet!
