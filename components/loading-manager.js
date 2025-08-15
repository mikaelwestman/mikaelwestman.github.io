class LoadingManager extends HTMLElement {
  constructor() {
    super();
    this.loadedImages = new Set();
    this.totalImages = 0;
    this.requiredImages = 1; // Number of images to load before triggering animation
    this.animationTriggered = false;
    this.callbacks = [];
  }

  connectedCallback() {
    // Wait for DOM to be ready
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', () => this.initialize());
    } else {
      this.initialize();
    }
  }

  initialize() {
    // Wait a bit for components to render
    setTimeout(() => {
      this.setupImageTracking();
      this.setupLazyLoading();
    }, 100);
  }

  setupImageTracking() {
    const images = document.querySelectorAll('img[src]');
    const videos = document.querySelectorAll('video');
    
    this.totalImages = images.length + videos.length;
    
    if (this.totalImages === 0) {
      this.triggerAnimation();
      return;
    }

    // Track all media elements
    [...images, ...videos].forEach(media => {
      this.trackMedia(media);
    });
  }

  trackMedia(media) {
    // Check if already loaded
    if (media.tagName === 'IMG' && media.complete && media.naturalHeight !== 0) {
      this.onMediaLoaded(media);
      return;
    }
    
    if (media.tagName === 'VIDEO' && media.readyState >= 1) {
      this.onMediaLoaded(media);
      return;
    }

    // Watch for lazy-loaded class
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.type === 'attributes' && mutation.attributeName === 'class') {
          if (media.classList.contains('lazy-loaded')) {
            this.onMediaLoaded(media);
            observer.disconnect();
          }
        }
      });
    });

    observer.observe(media, { attributes: true });
  }

  setupLazyLoading() {
    const images = document.querySelectorAll('img[src]');
    const videos = document.querySelectorAll('video');
    
    if (images.length === 0 && videos.length === 0) return;

    const imageObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          this.loadImage(entry.target);
          imageObserver.unobserve(entry.target);
        }
      });
    }, {
      rootMargin: '50px 0px',
      threshold: 0.1
    });

    const videoObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          this.loadVideo(entry.target);
          videoObserver.unobserve(entry.target);
        }
      });
    }, {
      rootMargin: '50px 0px',
      threshold: 0.1
    });

    images.forEach(img => imageObserver.observe(img));
    videos.forEach(video => videoObserver.observe(video));
  }

  loadImage(img) {
    img.classList.add('lazy-loading');
    
    const tempImage = new Image();
    tempImage.onload = () => {
      img.classList.remove('lazy-loading');
      img.classList.add('lazy-loaded');
    };
    tempImage.onerror = () => {
      img.classList.remove('lazy-loading');
      img.classList.add('lazy-error');
    };
    tempImage.src = img.src;
  }

  loadVideo(video) {
    video.classList.add('lazy-loading');
    setTimeout(() => {
      video.classList.remove('lazy-loading');
      video.classList.add('lazy-loaded');
    }, 100);
  }

  onMediaLoaded(media) {
    if (this.loadedImages.has(media)) return;
    
    this.loadedImages.add(media);
    
    // Check if we've loaded enough images
    if (this.loadedImages.size >= this.requiredImages) {
      this.triggerAnimation();
    }
  }

  triggerAnimation() {
    if (this.animationTriggered) return;
    
    this.animationTriggered = true;
    
    // Trigger page content animation
    const pageContent = document.querySelector('page-content');
    if (pageContent) {
      pageContent.classList.add('page-content');
    }
    
    // Execute any registered callbacks
    this.callbacks.forEach(callback => callback());
  }

  // Public API for other components to register callbacks
  onReady(callback) {
    if (this.animationTriggered) {
      callback();
    } else {
      this.callbacks.push(callback);
    }
  }
}

customElements.define('loading-manager', LoadingManager);
