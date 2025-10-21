// Performance optimization utilities
import React, { useMemo, useCallback, useRef, useEffect, useState } from 'react';

// Debounce hook for search inputs
export const useDebounce = (value, delay) => {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
};

// Throttle hook for scroll events
export const useThrottle = (callback, delay) => {
  const lastRun = useRef(Date.now());

  return useCallback((...args) => {
    if (Date.now() - lastRun.current >= delay) {
      callback(...args);
      lastRun.current = Date.now();
    }
  }, [callback, delay]);
};

// Memoized component wrapper
export const withMemo = (Component, areEqual) => {
  return React.memo(Component, areEqual);
};

// Virtual scrolling hook for large lists
export const useVirtualScroll = (items, itemHeight, containerHeight) => {
  const [scrollTop, setScrollTop] = useState(0);
  
  const visibleStart = Math.floor(scrollTop / itemHeight);
  const visibleEnd = Math.min(
    visibleStart + Math.ceil(containerHeight / itemHeight) + 1,
    items.length
  );
  
  const visibleItems = items.slice(visibleStart, visibleEnd);
  const offsetY = visibleStart * itemHeight;
  
  return {
    visibleItems,
    offsetY,
    totalHeight: items.length * itemHeight,
    onScroll: (e) => setScrollTop(e.target.scrollTop)
  };
};

// Image lazy loading hook
export const useLazyImage = (src, placeholder) => {
  const [imageSrc, setImageSrc] = useState(placeholder);
  const [imageRef, setImageRef] = useState(null);

  useEffect(() => {
    let observer;
    
    if (imageRef && src !== placeholder) {
      observer = new IntersectionObserver(
        entries => {
          entries.forEach(entry => {
            if (entry.isIntersecting) {
              setImageSrc(src);
              observer.unobserve(imageRef);
            }
          });
        },
        { threshold: 0.1 }
      );
      
      observer.observe(imageRef);
    }
    
    return () => {
      if (observer && imageRef) {
        observer.unobserve(imageRef);
      }
    };
  }, [imageRef, src, placeholder]);

  return [imageSrc, setImageRef];
};

// Performance monitoring hook
export const usePerformanceMonitor = (componentName) => {
  const renderStart = useRef();
  const renderCount = useRef(0);

  useEffect(() => {
    renderStart.current = performance.now();
    renderCount.current += 1;
    
    return () => {
      const renderTime = performance.now() - renderStart.current;
      if (renderTime > 16) { // More than one frame (16ms)
        console.warn(`${componentName} took ${renderTime.toFixed(2)}ms to render`);
      }
    };
  });

  return {
    renderCount: renderCount.current,
    logRender: () => {
      const renderTime = performance.now() - renderStart.current;
      console.log(`${componentName} render #${renderCount.current}: ${renderTime.toFixed(2)}ms`);
    }
  };
};

// Bundle size optimization utilities
export const createChunkedLoader = (importFunction, chunkSize = 5) => {
  return async () => {
    const modules = await importFunction();
    return modules;
  };
};

// Memory optimization for large data sets
export const useDataPagination = (data, pageSize = 20) => {
  const [currentPage, setCurrentPage] = useState(0);
  
  const paginatedData = useMemo(() => {
    const start = currentPage * pageSize;
    const end = start + pageSize;
    return data.slice(start, end);
  }, [data, currentPage, pageSize]);
  
  const totalPages = Math.ceil(data.length / pageSize);
  
  const goToPage = useCallback((page) => {
    setCurrentPage(Math.max(0, Math.min(page, totalPages - 1)));
  }, [totalPages]);
  
  const nextPage = useCallback(() => {
    goToPage(currentPage + 1);
  }, [currentPage, goToPage]);
  
  const prevPage = useCallback(() => {
    goToPage(currentPage - 1);
  }, [currentPage, goToPage]);
  
  return {
    paginatedData,
    currentPage,
    totalPages,
    goToPage,
    nextPage,
    prevPage,
    hasNext: currentPage < totalPages - 1,
    hasPrev: currentPage > 0
  };
};

// Component preloading for better UX
export const preloadComponent = (importFunction) => {
  return () => {
    importFunction();
  };
};

// Optimized search hook
export const useOptimizedSearch = (items, searchTerm, searchFields, debounceMs = 300) => {
  const debouncedSearchTerm = useDebounce(searchTerm, debounceMs);
  
  const filteredItems = useMemo(() => {
    if (!debouncedSearchTerm.trim()) return items;
    
    const term = debouncedSearchTerm.toLowerCase();
    return items.filter(item => 
      searchFields.some(field => {
        const value = item[field];
        return value && value.toString().toLowerCase().includes(term);
      })
    );
  }, [items, debouncedSearchTerm, searchFields]);
  
  return filteredItems;
};

// Cache management hook
export const useCache = (key, initialValue, ttl = 300000) => { // 5 minutes default TTL
  const [cache, setCache] = useState(() => {
    try {
      const cached = localStorage.getItem(key);
      if (cached) {
        const { value, timestamp } = JSON.parse(cached);
        if (Date.now() - timestamp < ttl) {
          return value;
        }
      }
    } catch (error) {
      console.warn('Cache read error:', error);
    }
    return initialValue;
  });
  
  const setCachedValue = useCallback((value) => {
    setCache(value);
    try {
      localStorage.setItem(key, JSON.stringify({
        value,
        timestamp: Date.now()
      }));
    } catch (error) {
      console.warn('Cache write error:', error);
    }
  }, [key]);
  
  const clearCache = useCallback(() => {
    setCache(initialValue);
    try {
      localStorage.removeItem(key);
    } catch (error) {
      console.warn('Cache clear error:', error);
    }
  }, [key, initialValue]);
  
  return [cache, setCachedValue, clearCache];
};

// Resource preloading
export const preloadResources = (resources) => {
  resources.forEach(resource => {
    if (resource.type === 'image') {
      const img = new Image();
      img.src = resource.url;
    } else if (resource.type === 'script') {
      const script = document.createElement('script');
      script.src = resource.url;
      script.async = true;
      document.head.appendChild(script);
    } else if (resource.type === 'style') {
      const link = document.createElement('link');
      link.rel = 'stylesheet';
      link.href = resource.url;
      document.head.appendChild(link);
    }
  });
};

// Bundle analyzer helper
export const analyzeBundle = () => {
  if (process.env.NODE_ENV === 'development') {
    console.log('Bundle analysis available in development mode');
    console.log('Use webpack-bundle-analyzer or similar tools for detailed analysis');
  }
};

export default {
  useDebounce,
  useThrottle,
  withMemo,
  useVirtualScroll,
  useLazyImage,
  usePerformanceMonitor,
  createChunkedLoader,
  useDataPagination,
  preloadComponent,
  useOptimizedSearch,
  useCache,
  preloadResources,
  analyzeBundle
};
