class Projects extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    // Determine project type based on body ID or current page
    const bodyId = document.body.id;
    const isPhysicalPage = this.isPhysicalProject(bodyId);
    const isDigitalPage = this.isDigitalProject(bodyId);
    
    // Get projects based on context
    const projects = this.getProjectsForContext(isPhysicalPage, isDigitalPage, bodyId);
    
    this.innerHTML = `
      <div class="wrapper projects-grid">
        <div class="projects-container fade-in">
          ${projects}
        </div>
      </div>
    `;

    this.setupProgressiveImageLoading();
  }

  isPhysicalProject(bodyId) {
    const physicalProjects = ['hallway-bench', 'vattenlilja', 'goblin-lamp', 'stool', 'pelican'];
    return physicalProjects.includes(bodyId);
  }

  isDigitalProject(bodyId) {
    const digitalProjects = ['square-for-restaurants', 'square-pos', 'epidemic-sound', '3d', 'variable-font', 'vexillography'];
    return digitalProjects.includes(bodyId);
  }

  getProjectsForContext(isPhysicalPage, isDigitalPage, currentBodyId) {
    if (isPhysicalPage) {
      // Show other physical projects (excluding current one)
      return this.getPhysicalProjects(currentBodyId);
    } else if (isDigitalPage) {
      // Show all digital projects (excluding current one)
      return this.getDigitalProjects(currentBodyId);
    } else {
      // Default: show physical projects (for homepage)
      return this.getPhysicalProjects();
    }
  }

  getPhysicalProjects(excludeId = null) {
    const physicalProjects = [
      { id: 'hallway-bench', href: 'hallway-bench.html', image: 'images/hallway-bench-mikael-westman-05.jpg', title: 'Hallway bench' },
      { id: 'vattenlilja', href: 'vattenlilja.html', image: 'images/vattenlilja-mikael-westman-01.jpg', title: 'Vattenlilja' },
      { id: 'goblin-lamp', href: 'goblin-lamp.html', image: 'images/goblin-lamp-mikael-westman-02.jpg', title: 'Goblin lamp' },
      { id: 'stool', href: 'stool.html', image: 'images/stool-thumb.jpg', title: 'Ball stool' },
      { id: 'pelican', href: 'pelican.html', image: 'images/pelican-spoon-mikael-westman-02.jpg', title: 'Children\'s tableware' }
    ];

    return physicalProjects
      .filter(project => project.id !== excludeId)
      .map(project => `
        <a class="project-item physical" href="${project.href}">
          <div class="thumbnail-image-wrapper">
            <div class="image-placeholder"></div>
            <img src="${project.image}" alt="${project.title}" class="progressive-image">
          </div>
          <span class="thumbnail-title">${project.title}</span>
        </a>
      `).join('');
  }

  getDigitalProjects(excludeId = null) {
    const digitalProjects = [
      { id: 'square-for-restaurants', href: 'square-for-restaurants.html', image: 'images/square-mikael-westman-04.png', title: 'Square for Restaurants' },
      { id: 'square-pos', href: 'square-pos.html', image: 'images/pos-mikael-westman-01.png', title: 'Square POS' },
      { id: 'epidemic-sound', href: 'epidemic-sound.html', image: 'images/Epidemic-Sound-Artist.jpg', title: 'Epidemic Sound' },
      { id: '3d', href: '3d.html', image: 'images/3d-lighter-mikael-westman.jpg', title: '3D' },
      { id: 'variable-font', href: 'variable-font.html', image: 'images/variable-font-thumb.png', title: 'Stretchy font' },
      { id: 'vexillography', href: 'vexillography.html', image: 'images/flag-eurasia-mikael-westman.jpg', title: 'Vexillography' }
    ];

    return digitalProjects
      .filter(project => project.id !== excludeId)
      .map(project => `
        <a class="project-item digital" href="${project.href}">
          <div class="thumbnail-image-wrapper">
            <div class="image-placeholder"></div>
            <img src="${project.image}" alt="${project.title}" class="progressive-image">
          </div>
          <span class="thumbnail-title">${project.title}</span>
        </a>
      `).join('');
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

customElements.define('projects-component', Projects);