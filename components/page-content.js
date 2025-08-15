class PageContent extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    // Add the page-content class to trigger the fade-in animation
    this.classList.add('page-content');
  }
}

customElements.define('page-content', PageContent);
