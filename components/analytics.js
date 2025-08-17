class Analytics extends HTMLElement {
  connectedCallback() {
    // Create and append the Google Analytics 4 script
    const gtagScript = document.createElement('script');
    gtagScript.async = true;
    gtagScript.src = 'https://www.googletagmanager.com/gtag/js?id=G-362299312';
    
    // Create the inline script for gtag configuration
    const inlineScript = document.createElement('script');
    inlineScript.textContent = `
      window.dataLayer = window.dataLayer || [];
      function gtag(){dataLayer.push(arguments);}
      gtag('js', new Date());
      gtag('config', 'G-362299312');
    `;
    
    // Append both scripts to the head
    document.head.appendChild(gtagScript);
    document.head.appendChild(inlineScript);
  }
}

customElements.define('analytics-component', Analytics);
