class Projects extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    this.innerHTML = `
      <div class="wrapper projects-grid">
        <div class="filter-controls">
          <div class="segmented-control">
            <button class="filter-btn active" data-filter="all">All cases</button>
            <button class="filter-btn" data-filter="digital">Digital</button>
            <button class="filter-btn" data-filter="physical">Physical</button>
          </div>
        </div>
        
        <div class="projects-container fade-in">
          <a class="project-item physical" href="hallway-bench.html">
            <div class="thumbnail-image-wrapper">
              <img src="images/hallway-bench-mikael-westman-05.jpg" alt="Hallway bench">
            </div>
            <span class="thumbnail-title">Hallway bench</span>
          </a>
          
          <a class="project-item physical" href="stool.html">
            <div class="thumbnail-image-wrapper">
              <img src="images/stool-thumb.jpg" alt="Ball stool">
            </div>
            <span class="thumbnail-title">Ball stool</span>
          </a>
          
          <a class="project-item physical" href="pelican.html">
            <div class="thumbnail-image-wrapper">
              <img src="images/pelican-spoon-mikael-westman-02.jpg" alt="PEL-I-CAN spoon">
            </div>
            <span class="thumbnail-title">Children's tableware</span>
          </a>
          
          <a class="project-item digital" href="square-for-restaurants.html">
            <div class="thumbnail-image-wrapper">
              <img src="images/square-mikael-westman-04.png" alt="Square for Restaurants">
            </div>
            <span class="thumbnail-title">Square for Restaurants</span>
          </a>
          
          <a class="project-item digital" href="square-pos.html">
            <div class="thumbnail-image-wrapper">
              <img src="images/pos-mikael-westman-01.png" alt="Square Point of Sale tablet & mobile design for Android">
            </div>
            <span class="thumbnail-title">Square POS</span>
          </a>
          
          <a class="project-item digital" href="epidemic-sound.html">
            <div class="thumbnail-image-wrapper">
              <img src="images/Epidemic-Sound-Artist.jpg" alt="Epidemic Sound artist page">
            </div>
            <span class="thumbnail-title">Epidemic Sound</span>
          </a>
          
          <a class="project-item digital" href="3d.html">
            <div class="thumbnail-image-wrapper">
              <img src="images/3d-lighter-mikael-westman.jpg" alt="3D render of lighter">
            </div>
            <span class="thumbnail-title">3D</span>
          </a>
          
          <a class="project-item digital" href="variable-font.html">
            <div class="thumbnail-image-wrapper">
              <img src="images/variable-font-thumb.png" alt="Variable font">
            </div>
            <span class="thumbnail-title">Stretchy font</span>
          </a>
          
          <a class="project-item digital" href="vexillography.html">
            <div class="thumbnail-image-wrapper">
              <img src="images/flag-uca-mikael-westman.jpg" alt="Flag">
            </div>
            <span class="thumbnail-title">Vexillography</span>
          </a>
        </div>
      </div>
    `;

    this.setupFiltering();
  }

  setupFiltering() {
    const filterButtons = this.querySelectorAll('.filter-btn');
    const projectItems = this.querySelectorAll('.project-item');
    const projectsContainer = this.querySelector('.projects-container');
    const segmentedControl = this.querySelector('.segmented-control');

    // Initialize the indicator position for the first active button (no animation)
    this.updateIndicatorPosition(false);

    filterButtons.forEach(button => {
      button.addEventListener('click', () => {
        const filter = button.getAttribute('data-filter');
        
        // Update active button
        filterButtons.forEach(btn => btn.classList.remove('active'));
        button.classList.add('active');
        
        // Animate the indicator to the new position
        this.updateIndicatorPosition();
        
        // Fade out the container
        projectsContainer.classList.add('fade-out');
        projectsContainer.classList.remove('fade-in');
        
        // After fade out, filter items and fade back in
        setTimeout(() => {
          // Show/hide items immediately
          projectItems.forEach(item => {
            const shouldShow = filter === 'all' || item.classList.contains(filter);
            item.style.display = shouldShow ? 'block' : 'none';
          });
          
          // Fade the container back in
          projectsContainer.classList.remove('fade-out');
          projectsContainer.classList.add('fade-in');
        }, 500); // Half of the fade duration for smooth transition
      });
    });
  }

  updateIndicatorPosition(animate = true) {
    const activeButton = this.querySelector('.filter-btn.active');
    const segmentedControl = this.querySelector('.segmented-control');
    
    if (activeButton && segmentedControl) {
      const buttonRect = activeButton.getBoundingClientRect();
      const controlRect = segmentedControl.getBoundingClientRect();
      const leftOffset = buttonRect.left - controlRect.left;
      
      // Position the indicator to align perfectly with the outlined circle
      const indicatorLeft = leftOffset; // Remove the +5 offset to align perfectly
      segmentedControl.style.setProperty('--indicator-left', `${indicatorLeft}px`);
      
      // Only trigger the jumping animation if animate parameter is true
      if (animate) {
        segmentedControl.classList.add('jumping');
        setTimeout(() => {
          segmentedControl.classList.remove('jumping');
        }, 400);
      }
    }
  }
}

customElements.define('projects-component', Projects);