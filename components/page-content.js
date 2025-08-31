class PageContent extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    // Wait for the loading manager to be available and initialized
    this.waitForLoadingManager();
  }

  waitForLoadingManager() {
    const loadingManager = document.querySelector('loading-manager');
    
    if (loadingManager && typeof loadingManager.onReady === 'function') {
      // Loading manager is ready, use it
      loadingManager.onReady(() => {
        this.classList.add('page-content');
      });
    } else if (loadingManager) {
      // Loading manager exists but not fully initialized yet, wait a bit
      setTimeout(() => {
        this.waitForLoadingManager();
      }, 50);
    } else {
      // No loading manager found, trigger animation immediately
      this.classList.add('page-content');
    }
  }
}

customElements.define('page-content', PageContent);
