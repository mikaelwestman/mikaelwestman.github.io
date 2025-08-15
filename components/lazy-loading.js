class LazyLoading extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    this.setupLazyLoading();
  }

  setupLazyLoading() {
    // Get all images that should be lazy loaded
    const images = document.querySelectorAll('img[src]');
    
    // Create intersection observer
    const imageObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const img = entry.target;
          
          // Add loading class to start with opacity 0
          img.classList.add('lazy-loading');
          
          // Create a new image to preload
          const tempImage = new Image();
          
          tempImage.onload = () => {
            // Image loaded successfully, trigger fade-in animation
            img.classList.remove('lazy-loading');
            img.classList.add('lazy-loaded');
          };
          
          tempImage.onerror = () => {
            // Handle loading error
            img.classList.remove('lazy-loading');
            img.classList.add('lazy-error');
          };
          
          // Start loading the image
          tempImage.src = img.src;
          
          // Stop observing this image
          observer.unobserve(img);
        }
      });
    }, {
      rootMargin: '50px 0px', // Start loading 50px before the image enters viewport
      threshold: 0.1
    });

    // Observe all images
    images.forEach(img => {
      imageObserver.observe(img);
    });
  }
}

customElements.define('lazy-loading', LazyLoading);
