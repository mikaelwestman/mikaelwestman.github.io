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

      // Create stylesheet link for Hedvig Letters Serif (h1, trial)
      const hedvigStylesheet = document.createElement('link');
      hedvigStylesheet.rel = 'stylesheet';
      hedvigStylesheet.href = 'https://fonts.googleapis.com/css2?family=Hedvig+Letters+Serif&display=swap';

      hedvigStylesheet.onerror = () => {
        console.warn('Hedvig Letters Serif font failed to load');
      };

      // Create preconnect link for rsms.me (serves Inter unsubsetted, with full glyph coverage —
      // Google Fonts' Inter delivery splits into per-script subsets that drop symbols like ↴/●/◦)
      const interPreconnect = document.createElement('link');
      interPreconnect.rel = 'preconnect';
      interPreconnect.href = 'https://rsms.me';

      // Create stylesheet link for Inter
      const interStylesheet = document.createElement('link');
      interStylesheet.rel = 'stylesheet';
      interStylesheet.href = 'https://rsms.me/inter/inter.css';

      interStylesheet.onerror = () => {
        console.warn('Inter font failed to load');
      };

      // Append all links to the head
      document.head.appendChild(bricolagePreconnect);
      document.head.appendChild(bricolageStylesheet);
      document.head.appendChild(hedvigStylesheet);
      document.head.appendChild(interPreconnect);
      document.head.appendChild(interStylesheet);
    } catch (error) {
      console.warn('Font loading failed:', error);
    }
  }
}

customElements.define('fonts-component', Fonts);
