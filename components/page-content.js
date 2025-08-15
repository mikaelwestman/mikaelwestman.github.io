class PageContent extends HTMLElement {
  constructor() {
    super();
    this.loadedImagesCount = 0;
    this.requiredImagesCount = 1;
    this.animationTriggered = false;
  }

  connectedCallback() {
    // Don't add the page-content class immediately
    // Wait for images to load first
    this.setupImageLoadingTracker();
  }

  setupImageLoadingTracker() {
    // Get all images in the page
    const images = document.querySelectorAll('img[src]');
    
    if (images.length === 0) {
      // No images found, trigger animation immediately
      this.triggerAnimation();
      return;
    }

    // Listen for when images get the 'lazy-loaded' class (from lazy-loading component)
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.type === 'attributes' && mutation.attributeName === 'class') {
          const target = mutation.target;
          if (target.tagName === 'IMG' && target.classList.contains('lazy-loaded')) {
            this.onImageLoaded();
          }
        }
      });
    });

    // Observe all images for class changes
    images.forEach(img => {
      observer.observe(img, { attributes: true });
      
      // Also check if image is already loaded
      if (img.complete && img.naturalHeight !== 0) {
        this.onImageLoaded();
      }
    });
  }

  onImageLoaded() {
    if (this.animationTriggered) return;
    
    this.loadedImagesCount++;
    
    if (this.loadedImagesCount >= this.requiredImagesCount) {
      this.triggerAnimation();
    }
  }

  triggerAnimation() {
    if (this.animationTriggered) return;
    
    this.animationTriggered = true;
    // Add the page-content class to trigger the fade-in animation
    this.classList.add('page-content');
  }
}

customElements.define('page-content', PageContent);
