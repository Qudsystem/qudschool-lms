// Performance monitoring
const performanceMonitor = {
    measurePageLoad: () => {
        const perfData = window.performance.timing;
        const pageLoadTime = perfData.loadEventEnd - perfData.navigationStart;
        console.log(`Page Load Time: ${pageLoadTime}ms`);
    },
    
    measureFirstContentfulPaint: () => {
        const paint = performance.getEntriesByType('paint');
        const fcp = paint.find(entry => entry.name === 'first-contentful-paint');
        console.log(`First Contentful Paint: ${fcp.startTime}ms`);
    }
};

window.addEventListener('load', () => {
    performanceMonitor.measurePageLoad();
    performanceMonitor.measureFirstContentfulPaint();
});
