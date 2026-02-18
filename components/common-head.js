// Detect view transition arrival early to suppress manual fade-in
window.addEventListener('pagereveal', (e) => {
  if (e.viewTransition) {
    document.documentElement.classList.add('vt-reveal');
  }
});

// Shared progressive-image loading utility (used by projects & digital-projects)
window.ProgressiveImages = {
  setup(container) {
    const images = container.querySelectorAll('.progressive-image');
    images.forEach(img => {
      const wrapper = img.closest('.thumbnail-image-wrapper');
      const placeholder = wrapper.querySelector('.image-placeholder');
      wrapper.classList.add('loading');
      img.addEventListener('load', () => {
        wrapper.classList.remove('loading');
        wrapper.classList.add('loaded');
        setTimeout(() => { if (placeholder) placeholder.style.opacity = '0'; }, 100);
      });
      img.addEventListener('error', () => {
        wrapper.classList.remove('loading');
        wrapper.classList.add('error');
      });
    });
  }
};

class CommonHead extends HTMLElement {
  connectedCallback() {
    // No-op: meta tags are now in static HTML.
    // This class is kept to avoid removing <common-head> from all pages.
  }
}

customElements.define('common-head', CommonHead);
