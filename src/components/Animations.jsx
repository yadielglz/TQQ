import React from 'react';
import { Loader, CheckCircle, AlertCircle, Clock, RefreshCw } from 'lucide-react';

// Loading Spinner Component
export const LoadingSpinner = ({ size = 24, color = '#E20074', text = '' }) => {
  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      gap: '10px'
    }}>
      <div style={{
        width: size,
        height: size,
        border: `3px solid ${color}20`,
        borderTop: `3px solid ${color}`,
        borderRadius: '50%',
        animation: 'spin 1s linear infinite'
      }} />
      {text && (
        <div style={{
          fontSize: '14px',
          color: color,
          fontWeight: '500'
        }}>
          {text}
        </div>
      )}
    </div>
  );
};

// Loading Overlay Component
export const LoadingOverlay = ({ isLoading, text = 'Loading...', children }) => {
  return (
    <div style={{ position: 'relative' }}>
      {children}
      {isLoading && (
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'rgba(255, 255, 255, 0.9)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 1000,
          borderRadius: '8px'
        }}>
          <LoadingSpinner size={32} text={text} />
        </div>
      )}
    </div>
  );
};

// Progress Bar Component
export const ProgressBar = ({ progress, total, showPercentage = true, color = '#E20074' }) => {
  const percentage = total > 0 ? (progress / total) * 100 : 0;
  
  return (
    <div style={{
      width: '100%',
      background: '#f0f0f0',
      borderRadius: '8px',
      overflow: 'hidden',
      marginBottom: '10px'
    }}>
      <div style={{
        width: `${percentage}%`,
        height: '8px',
        background: color,
        borderRadius: '8px',
        transition: 'width 0.3s ease',
        position: 'relative'
      }}>
        {showPercentage && (
          <div style={{
            position: 'absolute',
            right: '8px',
            top: '50%',
            transform: 'translateY(-50%)',
            fontSize: '10px',
            color: 'white',
            fontWeight: 'bold'
          }}>
            {Math.round(percentage)}%
          </div>
        )}
      </div>
    </div>
  );
};

// Skeleton Loading Component
export const SkeletonLoader = ({ width = '100%', height = '20px', borderRadius = '4px' }) => {
  return (
    <div style={{
      width,
      height,
      background: 'linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%)',
      backgroundSize: '200% 100%',
      animation: 'shimmer 1.5s infinite',
      borderRadius
    }} />
  );
};

// Card Skeleton Component
export const CardSkeleton = () => {
  return (
    <div style={{
      background: 'white',
      border: '1px solid #e0e0e0',
      borderRadius: '12px',
      padding: '20px',
      marginBottom: '20px'
    }}>
      <SkeletonLoader width="60%" height="24px" borderRadius="6px" />
      <div style={{ marginTop: '15px' }}>
        <SkeletonLoader width="100%" height="16px" />
        <SkeletonLoader width="80%" height="16px" style={{ marginTop: '8px' }} />
        <SkeletonLoader width="40%" height="16px" style={{ marginTop: '8px' }} />
      </div>
    </div>
  );
};

// Animated Button Component
export const AnimatedButton = ({ 
  children, 
  onClick, 
  variant = 'primary', 
  size = 'medium',
  loading = false,
  disabled = false,
  icon = null,
  ...props 
}) => {
  const getButtonStyles = () => {
    const baseStyles = {
      border: 'none',
      borderRadius: '8px',
      cursor: disabled || loading ? 'not-allowed' : 'pointer',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: '8px',
      fontWeight: '600',
      transition: 'all 0.3s ease',
      position: 'relative',
      overflow: 'hidden'
    };

    const sizeStyles = {
      small: { padding: '8px 16px', fontSize: '14px' },
      medium: { padding: '12px 24px', fontSize: '16px' },
      large: { padding: '16px 32px', fontSize: '18px' }
    };

    const variantStyles = {
      primary: {
        background: disabled || loading ? '#ccc' : '#E20074',
        color: 'white',
        boxShadow: disabled || loading ? 'none' : '0 2px 8px rgba(226, 0, 116, 0.3)'
      },
      secondary: {
        background: disabled || loading ? '#f0f0f0' : 'white',
        color: disabled || loading ? '#999' : '#E20074',
        border: `2px solid ${disabled || loading ? '#e0e0e0' : '#E20074'}`
      },
      success: {
        background: disabled || loading ? '#ccc' : '#E20074',
        color: 'white',
        boxShadow: disabled || loading ? 'none' : '0 2px 8px rgba(226, 0, 116, 0.3)'
      },
      danger: {
        background: disabled || loading ? '#ccc' : '#E20074',
        color: 'white',
        boxShadow: disabled || loading ? 'none' : '0 2px 8px rgba(226, 0, 116, 0.3)'
      }
    };

    return {
      ...baseStyles,
      ...sizeStyles[size],
      ...variantStyles[variant]
    };
  };

  const handleClick = (e) => {
    if (!disabled && !loading && onClick) {
      onClick(e);
    }
  };

  return (
    <button
      style={getButtonStyles()}
      onClick={handleClick}
      disabled={disabled || loading}
      onMouseOver={(e) => {
        if (!disabled && !loading) {
          e.target.style.transform = 'translateY(-2px)';
          e.target.style.boxShadow = '0 4px 12px rgba(226, 0, 116, 0.4)';
        }
      }}
      onMouseOut={(e) => {
        if (!disabled && !loading) {
          e.target.style.transform = 'translateY(0)';
          e.target.style.boxShadow = getButtonStyles().boxShadow;
        }
      }}
      {...props}
    >
      {loading ? (
        <LoadingSpinner size={16} color="white" />
      ) : (
        <>
          {icon && icon}
          {children}
        </>
      )}
    </button>
  );
};

// Toast Notification Component
export const Toast = ({ message, type = 'info', isVisible, onClose, duration = 3000 }) => {
  React.useEffect(() => {
    if (isVisible && duration > 0) {
      const timer = setTimeout(() => {
        onClose();
      }, duration);
      return () => clearTimeout(timer);
    }
  }, [isVisible, duration, onClose]);

  const getToastStyles = () => {
    const baseStyles = {
      position: 'fixed',
      top: '20px',
      right: '20px',
      padding: '16px 20px',
      borderRadius: '8px',
      color: 'white',
      fontWeight: '500',
      zIndex: 10000,
      display: 'flex',
      alignItems: 'center',
      gap: '10px',
      minWidth: '300px',
      boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
      transform: isVisible ? 'translateX(0)' : 'translateX(100%)',
      transition: 'transform 0.3s ease'
    };

    const typeStyles = {
      success: { background: '#E20074' },
      error: { background: '#E20074' },
      warning: { background: '#E20074' },
      info: { background: '#E20074' }
    };

    return {
      ...baseStyles,
      ...typeStyles[type]
    };
  };

  const getIcon = () => {
    switch (type) {
      case 'success': return <CheckCircle size={20} />;
      case 'error': return <AlertCircle size={20} />;
      case 'warning': return <AlertCircle size={20} />;
      default: return <Clock size={20} />;
    }
  };

  if (!isVisible) return null;

  return (
    <div style={getToastStyles()}>
      {getIcon()}
      <span style={{ flex: 1 }}>{message}</span>
      <button
        onClick={onClose}
        style={{
          background: 'none',
          border: 'none',
          color: 'white',
          cursor: 'pointer',
          fontSize: '18px',
          padding: '0',
          marginLeft: '10px'
        }}
      >
        ×
      </button>
    </div>
  );
};

// Toast Context and Hook
const ToastContext = React.createContext();

export const ToastProvider = ({ children }) => {
  const [toasts, setToasts] = React.useState([]);

  const addToast = (message, type = 'info', duration = 3000) => {
    const id = Date.now();
    setToasts(prev => [...prev, { id, message, type, duration }]);
  };

  const removeToast = (id) => {
    setToasts(prev => prev.filter(toast => toast.id !== id));
  };

  return (
    <ToastContext.Provider value={{ addToast, removeToast }}>
      {children}
      {toasts.map(toast => (
        <Toast
          key={toast.id}
          message={toast.message}
          type={toast.type}
          isVisible={true}
          onClose={() => removeToast(toast.id)}
          duration={toast.duration}
        />
      ))}
    </ToastContext.Provider>
  );
};

export const useToast = () => {
  const context = React.useContext(ToastContext);
  if (!context) {
    throw new Error('useToast must be used within a ToastProvider');
  }
  return context;
};

// Fade In Animation Component
export const FadeIn = ({ children, delay = 0, duration = 0.5 }) => {
  const [isVisible, setIsVisible] = React.useState(false);

  React.useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, delay * 1000);

    return () => clearTimeout(timer);
  }, [delay]);

  return (
    <div style={{
      opacity: isVisible ? 1 : 0,
      transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
      transition: `opacity ${duration}s ease, transform ${duration}s ease`
    }}>
      {children}
    </div>
  );
};

// Slide In Animation Component
export const SlideIn = ({ children, direction = 'left', delay = 0, duration = 0.5 }) => {
  const [isVisible, setIsVisible] = React.useState(false);

  React.useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, delay * 1000);

    return () => clearTimeout(timer);
  }, [delay]);

  const getTransform = () => {
    if (!isVisible) {
      switch (direction) {
        case 'left': return 'translateX(-100%)';
        case 'right': return 'translateX(100%)';
        case 'up': return 'translateY(-100%)';
        case 'down': return 'translateY(100%)';
        default: return 'translateX(-100%)';
      }
    }
    return 'translateX(0) translateY(0)';
  };

  return (
    <div style={{
      transform: getTransform(),
      transition: `transform ${duration}s ease`
    }}>
      {children}
    </div>
  );
};

// Pulse Animation Component
export const Pulse = ({ children, duration = 1 }) => {
  return (
    <div style={{
      animation: `pulse ${duration}s ease-in-out infinite`
    }}>
      {children}
    </div>
  );
};

// CSS Animations (to be added to global CSS)
export const globalAnimations = `
@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

@keyframes shimmer {
  0% { background-position: -200% 0; }
  100% { background-position: 200% 0; }
}

@keyframes pulse {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.5; }
}

@keyframes fadeIn {
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
}

@keyframes slideInLeft {
  from { transform: translateX(-100%); }
  to { transform: translateX(0); }
}

@keyframes slideInRight {
  from { transform: translateX(100%); }
  to { transform: translateX(0); }
}

@keyframes slideInUp {
  from { transform: translateY(100%); }
  to { transform: translateY(0); }
}

@keyframes slideInDown {
  from { transform: translateY(-100%); }
  to { transform: translateY(0); }
}

@keyframes bounce {
  0%, 20%, 53%, 80%, 100% { transform: translate3d(0,0,0); }
  40%, 43% { transform: translate3d(0,-30px,0); }
  70% { transform: translate3d(0,-15px,0); }
  90% { transform: translate3d(0,-4px,0); }
}

@keyframes shake {
  0%, 100% { transform: translateX(0); }
  10%, 30%, 50%, 70%, 90% { transform: translateX(-10px); }
  20%, 40%, 60%, 80% { transform: translateX(10px); }
}

.animate-spin {
  animation: spin 1s linear infinite;
}

.animate-pulse {
  animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
}

.animate-bounce {
  animation: bounce 1s infinite;
}

.animate-shake {
  animation: shake 0.5s ease-in-out;
}

.animate-fadeIn {
  animation: fadeIn 0.5s ease-in-out;
}

.animate-slideInLeft {
  animation: slideInLeft 0.5s ease-in-out;
}

.animate-slideInRight {
  animation: slideInRight 0.5s ease-in-out;
}

.animate-slideInUp {
  animation: slideInUp 0.5s ease-in-out;
}

.animate-slideInDown {
  animation: slideInDown 0.5s ease-in-out;
}
`;

export default {
  LoadingSpinner,
  LoadingOverlay,
  ProgressBar,
  SkeletonLoader,
  CardSkeleton,
  AnimatedButton,
  Toast,
  ToastProvider,
  useToast,
  FadeIn,
  SlideIn,
  Pulse,
  globalAnimations
};
