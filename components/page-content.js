class PageContent extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    // Wait for the loading manager to trigger the animation
    const loadingManager = document.querySelector('loading-manager');
    if (loadingManager) {
      loadingManager.onReady(() => {
        this.classList.add('page-content');
      });
    } else {
      // Fallback: trigger animation immediately if no loading manager
      this.classList.add('page-content');
    }
  }
}

customElements.define('page-content', PageContent);
