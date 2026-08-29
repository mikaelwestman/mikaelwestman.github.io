class Fonts extends HTMLElement {
  connectedCallback() {
    this.loadFonts();
  }

  loadFonts() {
    try {
      // Create preconnect link for Google Fonts
      const bricolagePreconnect = document.createElement('link');
      bricolagePreconnect.rel = 'preconnect';
      bricolagePreconnect.href = 'https://fonts.googleapis.com';

      // Create stylesheet link for Bricolage Grotesque
      const bricolageStylesheet = document.createElement('link');
      bricolageStylesheet.rel = 'stylesheet';
      bricolageStylesheet.href = 'https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:opsz,wdth,wght@12..96,75..100,200..800&display=swap';

      // Add error handling
      bricolageStylesheet.onerror = () => {
        console.warn('Bricolage Grotesque font failed to load');
      };

      // Create stylesheet link for Inter
      const interStylesheet = document.createElement('link');
      interStylesheet.rel = 'stylesheet';
      interStylesheet.href = 'https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap';

      interStylesheet.onerror = () => {
        console.warn('Inter font failed to load');
      };

      // Append all links to the head
      document.head.appendChild(bricolagePreconnect);
      document.head.appendChild(bricolageStylesheet);
      document.head.appendChild(interStylesheet);
    } catch (error) {
      console.warn('Font loading failed:', error);
    }
  }
}

customElements.define('fonts-component', Fonts);
