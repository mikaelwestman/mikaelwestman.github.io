// Redirect project pages to the homepage with the sheet open
(function() {
  const PROJECT_PAGES = [
    'hallway-bench.html', 'vattenlilja.html', 'goblin-lamp.html',
    'stool.html', 'pelican.html', 'rolo-radio.html',
    'square-for-restaurants.html', 'square-pos.html',
    'epidemic-sound.html', '3d.html', 'variable-font.html', 'vexillography.html'
  ];
  const raw = location.pathname.split('/').pop();
  const filename = raw.endsWith('.html') ? raw : raw + '.html';
  if (PROJECT_PAGES.indexOf(filename) !== -1) {
    location.replace('/?sheet=' + filename);
  }
})();

// Detect view transition arrival early to suppress manual fade-in
window.addEventListener('pagereveal', (e) => {
  if (e.viewTransition) {
    document.documentElement.classList.add('vt-reveal');
  }
});

// Scroll to top before the view transition snapshot is taken
// so the old page doesn't visibly scroll up during the transition
window.addEventListener('pageswap', (e) => {
  if (e.viewTransition) {
    document.documentElement.scrollTop = 0;
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
      const markLoaded = () => {
        wrapper.classList.remove('loading');
        wrapper.classList.add('loaded');
        setTimeout(() => { if (placeholder) placeholder.style.opacity = '0'; }, 100);
      };
      img.addEventListener('load', markLoaded);
      img.addEventListener('error', () => {
        wrapper.classList.remove('loading');
        wrapper.classList.add('error');
      });
      if (img.complete && img.naturalWidth > 0) markLoaded();
    });
  }
};

// Fix vertical alignment of ● bullet in .meta-data elements
document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('.meta-data').forEach(el => {
    el.innerHTML = el.innerHTML.replace(/●/g, '<span class="meta-bullet">●</span>');
  });
});

class CommonHead extends HTMLElement {
  connectedCallback() {
    // No-op: meta tags are now in static HTML.
    // This class is kept to avoid removing <common-head> from all pages.
  }
}

customElements.define('common-head', CommonHead);
