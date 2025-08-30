class DigitalProjects extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    this.innerHTML = `
      <div class="wrapper projects-grid">
        <div class="projects-container fade-in">
          <a class="project-item digital" href="square-for-restaurants.html">
            <div class="thumbnail-image-wrapper">
              <div class="image-placeholder"></div>
              <img src="images/square-mikael-westman-04.png" alt="Square for Restaurants" class="progressive-image">
            </div>
            <span class="thumbnail-title">Square for Restaurants</span>
          </a>
          
          <a class="project-item digital" href="square-pos.html">
            <div class="thumbnail-image-wrapper">
              <div class="image-placeholder"></div>
              <img src="images/pos-mikael-westman-01.png" alt="Square Point of Sale tablet & mobile design for Android" class="progressive-image">
            </div>
            <span class="thumbnail-title">Square POS</span>
          </a>
          
          <a class="project-item digital" href="epidemic-sound.html">
            <div class="thumbnail-image-wrapper">
              <div class="image-placeholder"></div>
              <img src="images/Epidemic-Sound-Artist.jpg" alt="Epidemic Sound artist page" class="progressive-image">
            </div>
            <span class="thumbnail-title">Epidemic Sound</span>
          </a>
          
          <a class="project-item digital" href="3d.html">
            <div class="thumbnail-image-wrapper">
              <div class="image-placeholder"></div>
              <img src="images/3d-lighter-mikael-westman.jpg" alt="3D render of lighter" class="progressive-image">
            </div>
            <span class="thumbnail-title">3D</span>
          </a>
          
          <a class="project-item digital" href="variable-font.html">
            <div class="thumbnail-image-wrapper">
              <div class="image-placeholder"></div>
              <img src="images/variable-font-thumb.png" alt="Variable font" class="progressive-image">
            </div>
            <span class="thumbnail-title">Stretchy font</span>
          </a>
          
          <a class="project-item digital" href="vexillography.html">
            <div class="thumbnail-image-wrapper">
              <div class="image-placeholder"></div>
              <img src="images/flag-uca-mikael-westman.jpg" alt="Flag" class="progressive-image">
            </div>
            <span class="thumbnail-title">Vexillography</span>
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

customElements.define('digital-projects-component', DigitalProjects);
