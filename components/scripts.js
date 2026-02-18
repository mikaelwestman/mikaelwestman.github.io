class Scripts extends HTMLElement {
  connectedCallback() {
    // Create script elements for common components
    const scripts = [
      { src: 'components/email-clipboard.js', defer: false },
      { src: 'components/navigation.js', defer: false }, // Load navigation synchronously to prevent blinking
      { src: 'components/footer.js', defer: true },
      { src: 'components/projects.js', defer: true },
      { src: 'components/loading-manager.js', defer: true },
      { src: 'components/page-content.js', defer: true }
    ];
    
    scripts.forEach(scriptConfig => {
      const script = document.createElement('script');
      script.src = scriptConfig.src;
      script.type = 'text/javascript';
      if (scriptConfig.defer) {
        script.defer = true;
      } else {
        script.async = false;
      }
      document.head.appendChild(script);
    });
  }
}

customElements.define('scripts-component', Scripts);
