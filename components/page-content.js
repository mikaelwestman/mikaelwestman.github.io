class PageContent extends HTMLElement {
  connectedCallback() {
    this.setAttribute('role', 'main');
    this.classList.add('page-content');
  }
}

customElements.define('page-content', PageContent);
