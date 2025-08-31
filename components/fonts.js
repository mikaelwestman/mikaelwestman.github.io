class Fonts extends HTMLElement {
  connectedCallback() {
    this.loadFonts();
  }

  loadFonts() {
    try {
      // Create preconnect link for Inter
      const preconnect = document.createElement('link');
      preconnect.rel = 'preconnect';
      preconnect.href = 'https://rsms.me/';
      
      // Create stylesheet link for Inter
      const stylesheet = document.createElement('link');
      stylesheet.rel = 'stylesheet';
      stylesheet.href = 'https://rsms.me/inter/inter.css';
      
      // Add error handling
      stylesheet.onerror = () => {
        console.warn('Inter font failed to load');
      };
      
      // Create preconnect link for Geist Mono
      const geistPreconnect = document.createElement('link');
      geistPreconnect.rel = 'preconnect';
      geistPreconnect.href = 'https://fonts.googleapis.com';
      
      // Create stylesheet link for Geist Mono
      const geistStylesheet = document.createElement('link');
      geistStylesheet.rel = 'stylesheet';
      geistStylesheet.href = 'https://fonts.googleapis.com/css2?family=Geist+Mono:wght@300;400;500;600;700&display=swap';
      
      // Add error handling
      geistStylesheet.onerror = () => {
        console.warn('Geist Mono font failed to load');
      };
      
      // Append all links to the head
      document.head.appendChild(preconnect);
      document.head.appendChild(stylesheet);
      document.head.appendChild(geistPreconnect);
      document.head.appendChild(geistStylesheet);
    } catch (error) {
      console.warn('Font loading failed:', error);
    }
  }
}

customElements.define('fonts-component', Fonts);
