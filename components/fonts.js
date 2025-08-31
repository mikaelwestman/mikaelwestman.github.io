class Fonts extends HTMLElement {
  connectedCallback() {
    // Create preconnect link for Inter
    const preconnect = document.createElement('link');
    preconnect.rel = 'preconnect';
    preconnect.href = 'https://rsms.me/';
    
    // Create stylesheet link for Inter
    const stylesheet = document.createElement('link');
    stylesheet.rel = 'stylesheet';
    stylesheet.href = 'https://rsms.me/inter/inter.css';
    
    // Create preconnect link for Geist Mono
    const geistPreconnect = document.createElement('link');
    geistPreconnect.rel = 'preconnect';
    geistPreconnect.href = 'https://fonts.googleapis.com';
    
    // Create stylesheet link for Geist Mono
    const geistStylesheet = document.createElement('link');
    geistStylesheet.rel = 'stylesheet';
    geistStylesheet.href = 'https://fonts.googleapis.com/css2?family=Geist+Mono:wght@300;400;500;600;700&display=swap';
    
    // Append all links to the head
    document.head.appendChild(preconnect);
    document.head.appendChild(stylesheet);
    document.head.appendChild(geistPreconnect);
    document.head.appendChild(geistStylesheet);
  }
}

customElements.define('fonts-component', Fonts);
