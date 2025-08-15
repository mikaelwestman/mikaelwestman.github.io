class PageContent extends HTMLElement {
  constructor() {
    super();
    this.topMediaLoaded = false;
    this.animationTriggered = false;
  }

  connectedCallback() {
    // Don't add the page-content class immediately
    // Wait for the top image or video to load first
    this.setupTopMediaLoadingTracker();
  }

  setupTopMediaLoadingTracker() {
    // Get all images and videos in the page
    const images = document.querySelectorAll('img[src]');
    const videos = document.querySelectorAll('video');
    
    if (images.length === 0 && videos.length === 0) {
      // No media found, trigger animation immediately
      this.triggerAnimation();
      return;
    }

    // Get the first media element (image or video)
    const topImage = images[0];
    const topVideo = videos[0];
    
    // Determine which comes first in the DOM
    let topMedia = null;
    if (topImage && topVideo) {
      // Both exist, check which comes first in DOM
      if (topImage.compareDocumentPosition(topVideo) & Node.DOCUMENT_POSITION_PRECEDING) {
        topMedia = topVideo; // Video comes first
      } else {
        topMedia = topImage; // Image comes first
      }
    } else if (topImage) {
      topMedia = topImage;
    } else if (topVideo) {
      topMedia = topVideo;
    }
    
    if (!topMedia) {
      this.triggerAnimation();
      return;
    }

    // Listen for when the top media gets the 'lazy-loaded' class
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.type === 'attributes' && mutation.attributeName === 'class') {
          const target = mutation.target;
          if (target === topMedia && target.classList.contains('lazy-loaded')) {
            this.onTopMediaLoaded();
          }
        }
      });
    });

    // Observe the top media for class changes
    observer.observe(topMedia, { attributes: true });
    
    // Also check if the top media is already loaded
    if (topMedia.tagName === 'IMG') {
      if (topMedia.complete && topMedia.naturalHeight !== 0) {
        this.onTopMediaLoaded();
      }
    } else if (topMedia.tagName === 'VIDEO') {
      // For videos, consider them "loaded" if they have metadata
      if (topMedia.readyState >= 1) {
        this.onTopMediaLoaded();
      }
    }
  }

  onTopMediaLoaded() {
    if (this.animationTriggered) return;
    
    this.topMediaLoaded = true;
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
