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
    
    // Append all elements to the head
    document.head.appendChild(charset);
    document.head.appendChild(viewport);
    document.head.appendChild(favicon);
  }
}

customElements.define('common-head', CommonHead);
