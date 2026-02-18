class LoadingManager extends HTMLElement {
  constructor() {
    super();
    this.loadedImages = new Set();
    this.totalImages = 0;
    this.requiredImages = 0; // Don't wait for images for LCP
    this.animationTriggered = false;
    this.callbacks = [];
    this.initialized = false;
    
    // Cache DOM elements
    this.pageContent = null;
    this.body = null;
    this.navigation = null;
  }

  connectedCallback() {
    // Cache DOM elements immediately
    this.pageContent = document.querySelector('page-content');
    this.body = document.body;
    this.navigation = document.querySelector('#top-navigation');
    
    // Wait for DOM to be ready
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', () => this.initialize());
    } else {
      this.initialize();
    }

  }

  initialize() {
    if (this.initialized) return;
    
    // Trigger animation immediately for better LCP
    this.triggerAnimation();
    
    setTimeout(() => {
      this.setupImageTracking();
      this.setupLazyLoading();
      this.initialized = true;
    }, 100);
  }

  setupImageTracking() {
    const images = document.querySelectorAll('img[src]:not(.footer-logo-img)');
    const videos = document.querySelectorAll('video');
    
    this.totalImages = images.length + videos.length;
    
    if (this.totalImages === 0) {
      this.triggerAnimation();
      return;
    }

    // Use a single observer for all media
    const mediaObserver = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.type === 'attributes' && mutation.attributeName === 'class') {
          const media = mutation.target;
          if (media.classList.contains('lazy-loaded')) {
            this.onMediaLoaded(media);
          }
        }
      });
    });

    [...images, ...videos].forEach(media => {
      this.trackMedia(media, mediaObserver);
    });
  }

  trackMedia(media, observer) {
    // Check if already loaded
    if (media.tagName === 'IMG' && media.complete && media.naturalHeight !== 0) {
      this.onMediaLoaded(media);
      return;
    }
    
    if (media.tagName === 'VIDEO' && media.readyState >= 1) {
      this.onMediaLoaded(media);
      return;
    }

    observer.observe(media, { attributes: true });
  }

  setupLazyLoading() {
    const images = document.querySelectorAll('img[src]:not(.footer-logo-img)');
    const videos = document.querySelectorAll('video');
    
    if (images.length === 0 && videos.length === 0) return;

    // Single observer for all media types
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const media = entry.target;
          if (media.tagName === 'IMG') {
            this.loadImage(media);
          } else if (media.tagName === 'VIDEO') {
            this.loadVideo(media);
          }
          observer.unobserve(media);
        }
      });
    }, {
      rootMargin: '50px 0px',
      threshold: 0.1
    });

    [...images, ...videos].forEach(media => observer.observe(media));
  }

  loadImage(img) {
    img.classList.add('lazy-loading');
    
    // Setup progressive loading for images
    this.setupProgressiveLoading(img);
    
    const tempImage = new Image();
    tempImage.onload = () => {
      img.classList.remove('lazy-loading');
      img.classList.add('lazy-loaded');
      this.onProgressiveImageLoaded(img);
    };
    tempImage.onerror = () => {
      img.classList.remove('lazy-loading');
      img.classList.add('lazy-error');
      this.onProgressiveImageError(img);
    };
    tempImage.src = img.src;
  }

  setupProgressiveLoading(img) {
    // Skip footer logo and images that already have progressive loading setup
    if (img.classList.contains('footer-logo-img') || img.closest('.thumbnail-image-wrapper') || img.closest('.image-wrapper.progressive')) {
      return;
    }

    // Create wrapper if it doesn't exist
    let wrapper = img.parentElement;
    if (!wrapper.classList.contains('image-wrapper')) {
      const newWrapper = document.createElement('div');
      newWrapper.className = 'image-wrapper progressive';
      img.parentNode.insertBefore(newWrapper, img);
      newWrapper.appendChild(img);
      wrapper = newWrapper;
    }

    // Add placeholder
    if (!wrapper.querySelector('.image-placeholder')) {
      const placeholder = document.createElement('div');
      placeholder.className = 'image-placeholder';
      wrapper.appendChild(placeholder);
    }

    // Add loading class
    wrapper.classList.add('loading');
  }

  onProgressiveImageLoaded(img) {
    const wrapper = img.closest('.image-wrapper.progressive');
    if (wrapper) {
      wrapper.classList.remove('loading');
      wrapper.classList.add('loaded');
      
      const placeholder = wrapper.querySelector('.image-placeholder');
      if (placeholder) {
        setTimeout(() => {
          placeholder.style.opacity = '0';
        }, 100);
      }
    }
  }

  onProgressiveImageError(img) {
    const wrapper = img.closest('.image-wrapper.progressive');
    if (wrapper) {
      wrapper.classList.remove('loading');
      wrapper.classList.add('error');
    }
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
    
    if (this.loadedImages.size >= this.requiredImages) {
      this.triggerAnimation();
    }
  }

  triggerAnimation() {
    if (this.animationTriggered) return;
    
    this.animationTriggered = true;
    
    // Check if this is the about page
    const body = document.body;
    if (body.id === 'about') {
      // About page: separate animations for content and background
      const pageContent = document.querySelector('page-content');
      if (pageContent) {
        pageContent.classList.add('page-content');
      }
      
      // Background animations - trigger both simultaneously
      const navigation = document.querySelector('#top-navigation');
      
      // Use requestAnimationFrame to ensure both animations start in the same frame
      requestAnimationFrame(() => {
        body.classList.add('background-fade-in');
        if (navigation) {
          navigation.classList.add('background-fade-in');
        }
      });
    } else {
      // Other pages: regular animation
      const pageContent = document.querySelector('page-content');
      if (pageContent) {
        pageContent.classList.add('page-content');
      }
    }
    
    // Execute any registered callbacks
    this.callbacks.forEach(callback => callback());
  }

  onReady(callback) {
    if (this.animationTriggered) {
      callback();
    } else {
      this.callbacks.push(callback);
    }
  }
}

customElements.define('loading-manager', LoadingManager);
