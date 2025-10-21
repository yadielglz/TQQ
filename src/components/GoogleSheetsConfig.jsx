import React, { useState } from 'react';
import { Settings, Save, TestTube, CheckCircle, AlertCircle } from 'lucide-react';
import { configureGoogleSheets, testGoogleSheetsIntegration } from '../utils/googleSheets';
import { AnimatedButton, FadeIn, useToast } from './Animations';

const GoogleSheetsConfig = ({ isOpen, onClose }) => {
  const [apiKey, setApiKey] = useState('');
  const [scriptUrl, setScriptUrl] = useState('');
  const [isTesting, setIsTesting] = useState(false);
  const [testResult, setTestResult] = useState(null);
  const { addToast } = useToast();

  const handleSave = () => {
    try {
      configureGoogleSheets(apiKey, scriptUrl);
      addToast('Google Sheets configuration saved!', 'success');
      onClose();
    } catch (error) {
      addToast('Failed to save configuration', 'error');
    }
  };

  const handleTest = async () => {
    setIsTesting(true);
    setTestResult(null);
    
    try {
      const result = await testGoogleSheetsIntegration();
      setTestResult(result);
      
      if (result.success) {
        addToast('Google Sheets integration test successful!', 'success');
      } else {
        addToast('Google Sheets integration test failed', 'error');
      }
    } catch (error) {
      setTestResult({ success: false, error: error.message });
      addToast('Test failed: ' + error.message, 'error');
    } finally {
      setIsTesting(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      background: 'rgba(0,0,0,0.6)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 1000
    }}>
      <FadeIn>
        <div style={{
          background: 'white',
          borderRadius: '12px',
          padding: '30px',
          width: '90%',
          maxWidth: '600px',
          maxHeight: '90vh',
          overflowY: 'auto',
          boxShadow: '0 8px 32px rgba(0,0,0,0.2)'
        }}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginBottom: '25px'
          }}>
            <h2 style={{
              fontSize: '24px',
              fontWeight: '700',
              color: '#E20074',
              margin: 0,
              display: 'flex',
              alignItems: 'center',
              gap: '10px'
            }}>
              <Settings size={24} />
              Google Sheets Configuration
            </h2>
            <button
              onClick={onClose}
              style={{
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                color: '#666',
                fontSize: '24px'
              }}
            >
              ×
            </button>
          </div>

          <div style={{ marginBottom: '25px' }}>
            <p style={{ color: '#666', marginBottom: '20px' }}>
              Configure your Google Sheets integration to automatically save quote data. 
              You can use either Google Apps Script (recommended) or Google Sheets API.
            </p>
          </div>

          {/* Google Apps Script Configuration */}
          <div style={{
            background: '#f8f9fa',
            border: '1px solid #e0e0e0',
            borderRadius: '8px',
            padding: '20px',
            marginBottom: '20px'
          }}>
            <h3 style={{
              fontSize: '18px',
              fontWeight: '600',
              marginBottom: '15px',
              color: '#E20074'
            }}>
              Google Apps Script (Recommended)
            </h3>
            
            <div style={{ marginBottom: '15px' }}>
              <label style={{
                display: 'block',
                fontWeight: '500',
                marginBottom: '8px',
                color: '#333'
              }}>
                Apps Script Web App URL:
              </label>
              <input
                type="url"
                value={scriptUrl}
                onChange={(e) => setScriptUrl(e.target.value)}
                placeholder="https://script.google.com/macros/s/YOUR_SCRIPT_ID/exec"
                style={{
                  width: '100%',
                  padding: '12px',
                  border: '2px solid #e0e0e0',
                  borderRadius: '8px',
                  fontSize: '14px'
                }}
              />
            </div>

            <div style={{
              background: '#fdf2f8',
              border: '1px solid #E20074',
              borderRadius: '6px',
              padding: '12px',
              fontSize: '14px',
              color: '#E20074'
            }}>
              <strong>Setup Instructions:</strong>
              <ol style={{ marginTop: '8px', paddingLeft: '20px' }}>
                <li>Go to <a href="https://script.google.com" target="_blank" rel="noopener noreferrer">script.google.com</a></li>
                <li>Create a new project and paste the code from <code>google-apps-script.js</code></li>
                <li>Deploy as web app with "Anyone" access</li>
                <li>Copy the web app URL and paste it above</li>
              </ol>
            </div>
          </div>

          {/* Google Sheets API Configuration */}
          <div style={{
            background: '#f8f9fa',
            border: '1px solid #e0e0e0',
            borderRadius: '8px',
            padding: '20px',
            marginBottom: '20px'
          }}>
            <h3 style={{
              fontSize: '18px',
              fontWeight: '600',
              marginBottom: '15px',
              color: '#E20074'
            }}>
              Google Sheets API (Alternative)
            </h3>
            
            <div style={{ marginBottom: '15px' }}>
              <label style={{
                display: 'block',
                fontWeight: '500',
                marginBottom: '8px',
                color: '#333'
              }}>
                API Key:
              </label>
              <input
                type="password"
                value={apiKey}
                onChange={(e) => setApiKey(e.target.value)}
                placeholder="Your Google Sheets API key"
                style={{
                  width: '100%',
                  padding: '12px',
                  border: '2px solid #e0e0e0',
                  borderRadius: '8px',
                  fontSize: '14px'
                }}
              />
            </div>

            <div style={{
              background: '#fdf2f8',
              border: '1px solid #E20074',
              borderRadius: '6px',
              padding: '12px',
              fontSize: '14px',
              color: '#E20074'
            }}>
              <strong>Setup Instructions:</strong>
              <ol style={{ marginTop: '8px', paddingLeft: '20px' }}>
                <li>Go to <a href="https://console.cloud.google.com" target="_blank" rel="noopener noreferrer">Google Cloud Console</a></li>
                <li>Enable Google Sheets API</li>
                <li>Create an API key</li>
                <li>Paste the API key above</li>
              </ol>
            </div>
          </div>

          {/* Test Results */}
          {testResult && (
            <div style={{
              background: testResult.success ? '#fdf2f8' : '#fdf2f8',
              border: `1px solid #E20074`,
              borderRadius: '8px',
              padding: '15px',
              marginBottom: '20px',
              display: 'flex',
              alignItems: 'center',
              gap: '10px'
            }}>
              {testResult.success ? (
                <CheckCircle size={20} color="#E20074" />
              ) : (
                <AlertCircle size={20} color="#E20074" />
              )}
              <div>
                <div style={{
                  fontWeight: '600',
                  color: '#E20074'
                }}>
                  {testResult.success ? 'Test Successful!' : 'Test Failed'}
                </div>
                <div style={{
                  fontSize: '14px',
                  color: '#E20074'
                }}>
                  {testResult.success ? 'Google Sheets integration is working correctly.' : testResult.error}
                </div>
              </div>
            </div>
          )}

          {/* Action Buttons */}
          <div style={{
            display: 'flex',
            gap: '15px',
            justifyContent: 'flex-end'
          }}>
            <AnimatedButton
              variant="secondary"
              onClick={handleTest}
              loading={isTesting}
              icon={<TestTube size={16} />}
            >
              Test Integration
            </AnimatedButton>
            
            <AnimatedButton
              variant="primary"
              onClick={handleSave}
              icon={<Save size={16} />}
            >
              Save Configuration
            </AnimatedButton>
          </div>
        </div>
      </FadeIn>
    </div>
  );
};

export default GoogleSheetsConfig;
