import React, { useState, useEffect } from 'react';
import { Clock, Calendar } from 'lucide-react';

const StatusBar = ({ currentFlowTitle }) => {
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formatDate = (date) => {
    return date.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const formatTime = (date) => {
    return date.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: true
    });
  };

  return (
    <div style={{
      background: '#FFFFFF',
      color: '#E20074',
      padding: '12px 20px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      boxShadow: '0 4px 14px rgba(0,0,0,0.06)',
      borderBottom: '1px solid #f0f0f0',
      position: 'sticky',
      top: 0,
      zIndex: 1000
    }}>
      {/* App Name */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: '12px'
      }}>
        <img
          src="https://i.ibb.co/Fq5jbwpG/Chat-GPT-Image-Oct-20-2025-11-45-20-AM.png"
          alt="App Logo"
          style={{
            width: '32px',
            height: '32px',
            borderRadius: '8px',
            objectFit: 'cover',
            boxShadow: '0 0 0 2px rgba(255,255,255,0.2)'
          }}
        />
        <h1 style={{
          margin: 0,
          fontSize: '24px',
          fontWeight: '700',
          color: '#E20074'
        }}>
          T-Mobile Quick Quote
        </h1>
        {currentFlowTitle && (
          <div style={{
            marginLeft: '20px',
            paddingLeft: '20px',
            borderLeft: '2px solid rgba(226,0,116,0.25)',
            fontSize: '18px',
            fontWeight: '500',
            color: '#8a0a54'
          }}>
            {currentFlowTitle}
          </div>
        )}
      </div>

      {/* Date and Time */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: '20px',
        fontSize: '14px',
        fontWeight: '600'
      }}>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '6px',
          background: 'rgba(226,0,116,0.08)',
          padding: '6px 12px',
          borderRadius: '20px',
          border: '1px solid rgba(226,0,116,0.18)'
        }}>
          <Calendar size={16} />
          <span>{formatDate(currentTime)}</span>
        </div>
        
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '6px',
          background: 'rgba(226,0,116,0.08)',
          padding: '6px 12px',
          borderRadius: '20px',
          border: '1px solid rgba(226,0,116,0.18)'
        }}>
          <Clock size={16} />
          <span>{formatTime(currentTime)}</span>
        </div>
      </div>
    </div>
  );
};

export default StatusBar;
