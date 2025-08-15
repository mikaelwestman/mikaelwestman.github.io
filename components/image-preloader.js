class ImagePreloader extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    // Wait for other components to render first
    setTimeout(() => {
      this.preloadFirstTwoImages();
    }, 200);
  }

  preloadFirstTwoImages() {
    // Get all images on the page
    const images = document.querySelectorAll('img[src]');
    
    // If no images found, try again after a delay
    if (images.length === 0) {
      setTimeout(() => {
        this.preloadFirstTwoImages();
      }, 500);
      return;
    }
    
    // Preload only the first 2 images
    const imagesToPreload = Array.from(images).slice(0, 2);
    
    imagesToPreload.forEach(img => {
      const link = document.createElement('link');
      link.rel = 'preload';
      link.as = 'image';
      link.href = img.src;
      
      // Add to head
      document.head.appendChild(link);
    });
  }
}

customElements.define('image-preloader', ImagePreloader);
