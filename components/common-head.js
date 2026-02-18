// Detect view transition arrival early to suppress manual fade-in
window.addEventListener('pagereveal', (e) => {
  if (e.viewTransition) {
    document.documentElement.classList.add('vt-reveal');
  }
});

class CommonHead extends HTMLElement {
  connectedCallback() {
    // Create charset meta tag
    const charset = document.createElement('meta');
    charset.charset = 'utf-8';
    
    // Create viewport meta tag
    const viewport = document.createElement('meta');
    viewport.name = 'viewport';
    viewport.content = 'width=device-width, initial-scale=1.0';
    
    // Create favicon link
    const favicon = document.createElement('link');
    favicon.rel = 'shortcut icon';
    favicon.type = 'image/png';
    favicon.href = 'icon.png';
    
    // Font preload
    const fontPreload = document.createElement('link');
    fontPreload.rel = 'preload';
    fontPreload.href = 'https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&display=swap';
    fontPreload.as = 'style';
    fontPreload.onload = function() { this.onload = null; this.rel = 'stylesheet'; };

    const fontFallback = document.createElement('noscript');
    const fontLink = document.createElement('link');
    fontLink.rel = 'stylesheet';
    fontLink.href = 'https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&display=swap';
    fontFallback.appendChild(fontLink);

    // Append all elements to the head
    document.head.appendChild(charset);
    document.head.appendChild(viewport);
    document.head.appendChild(favicon);
    document.head.appendChild(fontPreload);
    document.head.appendChild(fontFallback);
  }
}

customElements.define('common-head', CommonHead);
