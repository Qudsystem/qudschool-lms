// Lazy loading implementation
document.addEventListener('DOMContentLoaded', () => {
    const images = document.querySelectorAll('img[data-src]');
    const lazyLoad = target => {
        const io = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    observer.disconnect();
                }
            });
        });
        io.observe(target);
    };
    images.forEach(lazyLoad);
});

// Defer non-critical JavaScript
const deferScripts = () => {
    document.querySelectorAll('script[defer]').forEach(script => {
        script.setAttribute('defer', '');
    });
};

// Optimize resource loading
const optimizeResources = () => {
    // Preload critical assets
    const preloadLinks = [
        { rel: 'preload', as: 'style', href: '/css/critical.css' },
        { rel: 'preload', as: 'script', href: '/js/critical.js' }
    ];
    
    preloadLinks.forEach(link => {
        const linkEl = document.createElement('link');
        Object.assign(linkEl, link);
        document.head.appendChild(linkEl);
    });
};
