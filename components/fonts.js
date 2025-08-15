class Fonts extends HTMLElement {
  connectedCallback() {
    // Create preconnect link
    const preconnect = document.createElement('link');
    preconnect.rel = 'preconnect';
    preconnect.href = 'https://rsms.me/';
    
    // Create stylesheet link
    const stylesheet = document.createElement('link');
    stylesheet.rel = 'stylesheet';
    stylesheet.href = 'https://rsms.me/inter/inter.css';
    
    // Append both links to the head
    document.head.appendChild(preconnect);
    document.head.appendChild(stylesheet);
  }
}

customElements.define('fonts-component', Fonts);
