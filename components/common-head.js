class CommonHead extends HTMLElement {
  connectedCallback() {
    // Create charset meta tag
    const charset = document.createElement('meta');
    charset.charset = 'utf-8';
    
    // Create IE compatibility meta tag
    const ieCompat = document.createElement('meta');
    ieCompat.setAttribute('http-equiv', 'x-ua-compatible');
    ieCompat.content = 'ie=edge';
    
    // Create viewport meta tag
    const viewport = document.createElement('meta');
    viewport.name = 'viewport';
    viewport.content = 'width=device-width, initial-scale=1.0';
    
    // Create favicon link
    const favicon = document.createElement('link');
    favicon.rel = 'shortcut icon';
    favicon.type = 'image/png';
    favicon.href = 'icon.png';
    
    // Create stylesheet link
    const stylesheet = document.createElement('link');
    stylesheet.rel = 'stylesheet';
    stylesheet.href = 'styles.css';
    
    // Append all elements to the head
    document.head.appendChild(charset);
    document.head.appendChild(ieCompat);
    document.head.appendChild(viewport);
    document.head.appendChild(favicon);
    document.head.appendChild(stylesheet);
  }
}

customElements.define('common-head', CommonHead);
