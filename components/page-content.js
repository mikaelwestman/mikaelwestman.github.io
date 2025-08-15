class PageContent extends HTMLElement {
  constructor() {
    super();
    this.topImageLoaded = false;
    this.animationTriggered = false;
  }

  connectedCallback() {
    // Don't add the page-content class immediately
    // Wait for the top image to load first
    this.setupTopImageLoadingTracker();
  }

  setupTopImageLoadingTracker() {
    // Get all images in the page
    const images = document.querySelectorAll('img[src]');
    
    if (images.length === 0) {
      // No images found, trigger animation immediately
      this.triggerAnimation();
      return;
    }

    // Get the first image (top image)
    const topImage = images[0];
    
    // Listen for when the top image gets the 'lazy-loaded' class
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.type === 'attributes' && mutation.attributeName === 'class') {
          const target = mutation.target;
          if (target === topImage && target.classList.contains('lazy-loaded')) {
            this.onTopImageLoaded();
          }
        }
      });
    });

    // Observe the top image for class changes
    observer.observe(topImage, { attributes: true });
    
    // Also check if the top image is already loaded
    if (topImage.complete && topImage.naturalHeight !== 0) {
      this.onTopImageLoaded();
    }
  }

  onTopImageLoaded() {
    if (this.animationTriggered) return;
    
    this.topImageLoaded = true;
    this.triggerAnimation();
  }

  triggerAnimation() {
    if (this.animationTriggered) return;
    
    this.animationTriggered = true;
    // Add the page-content class to trigger the fade-in animation
    this.classList.add('page-content');
  }
}

customElements.define('page-content', PageContent);
