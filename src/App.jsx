import React, { useState, useEffect } from 'react';
import StatusBar from './components/StatusBar';
import MasterFlow from './components/MasterFlow';

const App = () => {
  const [isLoading, setIsLoading] = useState(false);

  // Handle loading state
  useEffect(() => {
    const handleLoad = () => {
      setIsLoading(false);
    };

    // Simulate initial loading
    setIsLoading(true);
    setTimeout(handleLoad, 1000);
  }, []);

  if (isLoading) {
    return (
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        background: 'linear-gradient(135deg, #E20074 0%, #1E88E5 100%)',
        color: 'white',
        fontSize: '24px',
        fontWeight: '600'
      }}>
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '20px'
        }}>
          <div style={{
            width: '60px',
            height: '60px',
            border: '4px solid rgba(255,255,255,0.3)',
            borderTop: '4px solid white',
            borderRadius: '50%',
            animation: 'spin 1s linear infinite'
          }} />
          <div>Loading T-Mobile Quote App...</div>
        </div>
      </div>
    );
  }

  return (
    <div style={{
      minHeight: '100vh',
      background: '#f8f9fa',
      color: '#333'
    }}>
      {/* Status Bar */}
      <StatusBar />
      
      {/* Main Application */}
      <MasterFlow />
      
      {/* Global Styles */}
      <style>{`
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        
        * {
          box-sizing: border-box;
        }
        
        body {
          margin: 0;
          padding: 0;
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
            'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',
            sans-serif;
          -webkit-font-smoothing: antialiased;
          -moz-osx-font-smoothing: grayscale;
        }
        
        .form-section {
          max-width: 800px;
          margin: 0 auto;
          padding: 15px 10px;
          background: white;
          border-radius: 16px;
          box-shadow: 0 8px 32px rgba(0,0,0,0.1);
          color: #333;
          height: calc(100vh - 110px);
          overflow-y: auto;
        }
        
        .section-title {
          display: flex;
          align-items: center;
          gap: 12px;
          margin-bottom: 20px;
          font-size: 24px;
          font-weight: 600;
          color: #E20074;
        }
        
        .card {
          background: white;
          border: 2px solid #e0e0e0;
          border-radius: 12px;
          padding: 20px;
          transition: all 0.3s ease;
          cursor: pointer;
        }
        
        .card:hover {
          border-color: #E20074;
          box-shadow: 0 4px 16px rgba(226, 0, 116, 0.1);
        }
        
        .card.selected {
          border-color: #E20074;
          background: #fdf2f8;
        }
        
        .card-title {
          font-size: 18px;
          font-weight: 600;
          color: #333;
          margin-bottom: 8px;
        }
        
        .card-description {
          font-size: 14px;
          color: #666;
          line-height: 1.5;
        }
        
        .card-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
          gap: 20px;
          margin-bottom: 30px;
        }
        
        .button-group {
          display: flex;
          gap: 15px;
          margin-top: 30px;
        }
        
        .button {
          background: #E20074;
          color: white;
          border: none;
          padding: 12px 24px;
          border-radius: 8px;
          font-size: 16px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s ease;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          flex: 1;
        }
        
        .button:hover:not(:disabled) {
          background: #c1005f;
          transform: translateY(-2px);
          box-shadow: 0 4px 16px rgba(226, 0, 116, 0.3);
        }
        
        .button:disabled {
          background: #ccc;
          cursor: not-allowed;
          transform: none;
          box-shadow: none;
        }
        
        .button-secondary {
          background: #6c757d;
          color: white;
          border: none;
          padding: 12px 24px;
          border-radius: 8px;
          font-size: 16px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s ease;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          flex: 1;
        }
        
        .button-secondary:hover {
          background: #5a6268;
          transform: translateY(-2px);
          box-shadow: 0 4px 16px rgba(108, 117, 125, 0.3);
        }
        
        @media (max-width: 768px) {
          .form-section {
            margin: 5px;
            padding: 10px 8px;
            height: calc(100vh - 90px);
          }
          
          .card-grid {
            grid-template-columns: 1fr;
          }
          
          .button-group {
            flex-direction: column;
          }
        }
      `}</style>
    </div>
  );
};

export default App;