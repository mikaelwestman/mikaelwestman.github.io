class Analytics extends HTMLElement {
  connectedCallback() {
    // Only load analytics if not in development and no ad blocker detected
    if (this.shouldLoadAnalytics()) {
      this.loadAnalytics();
    }
  }

  shouldLoadAnalytics() {
    // Skip analytics in development
    if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
      return false;
    }
    
    // Check for common ad blocker indicators
    if (window.ads || window.adblocker) {
      return false;
    }
    
    return true;
  }

  loadAnalytics() {
    try {
      // Create and append the Google Analytics 4 script
      const gtagScript = document.createElement('script');
      gtagScript.async = true;
      gtagScript.src = 'https://www.googletagmanager.com/gtag/js?id=G-N6XN90D30E';
      
      // Add error handling for script loading
      gtagScript.onerror = () => {
        console.warn('Google Analytics failed to load');
      };
      
      // Create the inline script for gtag configuration
      const inlineScript = document.createElement('script');
      inlineScript.textContent = `
        try {
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', 'G-N6XN90D30E');
        } catch (e) {
          console.warn('Google Analytics configuration failed:', e);
        }
      `;
      
      // Append both scripts to the head
      document.head.appendChild(gtagScript);
      document.head.appendChild(inlineScript);
    } catch (error) {
      console.warn('Analytics loading failed:', error);
    }
  }
}

customElements.define('analytics-component', Analytics);
