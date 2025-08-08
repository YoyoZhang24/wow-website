// Performance Monitoring Script
(function() {
    'use strict';
    
    // Performance metrics
    const metrics = {
        pageLoadTime: 0,
        domContentLoaded: 0,
        firstPaint: 0,
        firstContentfulPaint: 0,
        largestContentfulPaint: 0
    };
    
    // Monitor page load performance
    window.addEventListener('load', function() {
        const navigation = performance.getEntriesByType('navigation')[0];
        metrics.pageLoadTime = navigation.loadEventEnd - navigation.loadEventStart;
        
        // Log performance data
        console.log('Performance Metrics:', {
            'Page Load Time': metrics.pageLoadTime + 'ms',
            'DOM Content Loaded': metrics.domContentLoaded + 'ms',
            'First Paint': metrics.firstPaint + 'ms',
            'First Contentful Paint': metrics.firstContentfulPaint + 'ms'
        });
        
        // Send to analytics if available
        if (typeof gtag !== 'undefined') {
            gtag('event', 'performance', {
                'page_load_time': metrics.pageLoadTime,
                'dom_content_loaded': metrics.domContentLoaded,
                'first_paint': metrics.firstPaint,
                'first_contentful_paint': metrics.firstContentfulPaint
            });
        }
    });
    
    // Monitor DOM content loaded
    document.addEventListener('DOMContentLoaded', function() {
        const navigation = performance.getEntriesByType('navigation')[0];
        metrics.domContentLoaded = navigation.domContentLoadedEventEnd - navigation.domContentLoadedEventStart;
    });
    
    // Monitor paint timing
    if ('PerformanceObserver' in window) {
        const paintObserver = new PerformanceObserver(function(list) {
            for (const entry of list.getEntries()) {
                if (entry.name === 'first-paint') {
                    metrics.firstPaint = entry.startTime;
                }
                if (entry.name === 'first-contentful-paint') {
                    metrics.firstContentfulPaint = entry.startTime;
                }
            }
        });
        paintObserver.observe({ entryTypes: ['paint'] });
        
        // Monitor largest contentful paint
        const lcpObserver = new PerformanceObserver(function(list) {
            const entries = list.getEntries();
            const lastEntry = entries[entries.length - 1];
            metrics.largestContentfulPaint = lastEntry.startTime;
        });
        lcpObserver.observe({ entryTypes: ['largest-contentful-paint'] });
    }
    
    // Monitor image loading performance
    document.addEventListener('DOMContentLoaded', function() {
        const images = document.querySelectorAll('img');
        let loadedImages = 0;
        const totalImages = images.length;
        
        images.forEach(function(img) {
            if (img.complete) {
                loadedImages++;
            } else {
                img.addEventListener('load', function() {
                    loadedImages++;
                    if (loadedImages === totalImages) {
                        console.log('All images loaded');
                    }
                });
            }
        });
    });
    
    // Monitor resource loading
    if ('PerformanceObserver' in window) {
        const resourceObserver = new PerformanceObserver(function(list) {
            for (const entry of list.getEntries()) {
                if (entry.initiatorType === 'img' && entry.duration > 1000) {
                    console.warn('Slow image load:', entry.name, entry.duration + 'ms');
                }
            }
        });
        resourceObserver.observe({ entryTypes: ['resource'] });
    }
})(); 