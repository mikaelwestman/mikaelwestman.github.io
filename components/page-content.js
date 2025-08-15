class PageContent extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    // Add the page-content class to trigger the fade-in animation
    this.classList.add('page-content');
    
    // Move all child elements into this component
    const wrapper = this.querySelector('.wrapper');
    if (wrapper) {
      // The wrapper is already present, just ensure it's inside this component
      wrapper.style.opacity = '0';
      wrapper.style.transform = 'translateY(20px)';
      
      // Trigger the animation after a small delay
      requestAnimationFrame(() => {
        wrapper.style.transition = 'opacity 0.8s ease-out, transform 0.8s ease-out';
        wrapper.style.opacity = '1';
        wrapper.style.transform = 'translateY(0)';
      });
    }
  }
}

customElements.define('page-content', PageContent);
