class PhysicalProjects extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    this.innerHTML = `
      <div class="wrapper projects-grid">
        <div class="projects-container fade-in">
          <a class="project-item physical" href="hallway-bench.html">
            <div class="thumbnail-image-wrapper">
              <div class="image-placeholder"></div>
              <img src="images/hallway-bench-mikael-westman-05.jpg" alt="Hallway bench" class="progressive-image">
            </div>
            <span class="thumbnail-title">Hallway bench</span>
          </a>
          
          <a class="project-item physical" href="stool.html">
            <div class="thumbnail-image-wrapper">
              <div class="image-placeholder"></div>
              <img src="images/stool-thumb.jpg" alt="Ball stool" class="progressive-image">
            </div>
            <span class="thumbnail-title">Ball stool</span>
          </a>
          
          <a class="project-item physical" href="pelican.html">
            <div class="thumbnail-image-wrapper">
              <div class="image-placeholder"></div>
              <img src="images/pelican-spoon-mikael-westman-02.jpg" alt="PEL-I-CAN spoon" class="progressive-image">
            </div>
            <span class="thumbnail-title">Children's tableware</span>
          </a>
        </div>
      </div>
    `;

    this.setupProgressiveImageLoading();
  }

  setupProgressiveImageLoading() {
    const images = this.querySelectorAll('.progressive-image');
    
    images.forEach(img => {
      const wrapper = img.closest('.thumbnail-image-wrapper');
      const placeholder = wrapper.querySelector('.image-placeholder');
      
      // Add loading class to wrapper
      wrapper.classList.add('loading');
      
      // Handle image load event
      img.addEventListener('load', () => {
        wrapper.classList.remove('loading');
        wrapper.classList.add('loaded');
        
        // Add a small delay to ensure smooth transition
        setTimeout(() => {
          if (placeholder) {
            placeholder.style.opacity = '0';
          }
        }, 100);
      });
      
      // Handle image error
      img.addEventListener('error', () => {
        wrapper.classList.remove('loading');
        wrapper.classList.add('error');
      });
    });
  }
}

customElements.define('physical-projects-component', PhysicalProjects);
