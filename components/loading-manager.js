class LoadingManager extends HTMLElement {
  constructor() {
    super();
    this.loadedImages = new Set();
    this.totalImages = 0;
    this.requiredImages = 1;
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

    // Force reload on back/forward navigation to ensure proper loading
    window.addEventListener('pageshow', (event) => {
      if (event.persisted) {
        window.location.reload();
      }
    });

    // Alternative approach: force reload on popstate
    window.addEventListener('popstate', () => {
      window.location.reload();
    });
  }

  initialize() {
    if (this.initialized) return;
    
    setTimeout(() => {
      this.setupImageTracking();
      this.setupLazyLoading();
      this.setupPageTransitions();
      this.initialized = true;
    }, 100);
  }

  setupPageTransitions() {
    // Use event delegation for better performance
    document.addEventListener('click', (e) => {
      const link = e.target.closest('a[href]');
      if (!link) return;
      
      const href = link.getAttribute('href');
      
      // Only handle internal links
      if (href && !href.startsWith('http') && !href.startsWith('#') && !href.startsWith('mailto:') && !href.startsWith('tel:')) {
        e.preventDefault();
        this.handlePageTransition(href);
      }
    });
  }

  handlePageTransition(targetUrl) {
    this.triggerFadeOut(() => {
      window.location.href = targetUrl;
    });
  }

  triggerFadeOut(callback) {
    if (this.pageContent) {
      this.pageContent.classList.add('page-fade-out');
      
      setTimeout(() => {
        if (callback) callback();
      }, 300);
    } else {
      if (callback) callback();
    }
  }

  setupImageTracking() {
    const images = document.querySelectorAll('img[src]');
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
    const images = document.querySelectorAll('img[src]');
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
    
    if (this.loadedImages.size >= this.requiredImages) {
      this.triggerAnimation();
    }
  }

  triggerAnimation() {
    if (this.animationTriggered) return;
    
    this.animationTriggered = true;
    
    // Optimized animation triggering
    if (this.body?.id === 'about') {
      // About page: consolidated animation
      if (this.pageContent) {
        this.pageContent.classList.add('page-content');
      }
      
      this.body.classList.add('background-fade-in');
      
      if (this.navigation) {
        this.navigation.classList.add('background-fade-in');
      }
    } else {
      // Other pages: regular animation
      if (this.pageContent) {
        this.pageContent.classList.add('page-content');
      }
    }
    
    // Execute callbacks
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
