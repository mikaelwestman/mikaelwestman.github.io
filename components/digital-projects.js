class DigitalProjects extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    this.innerHTML = `
      <div class="wrapper projects-grid">
        <div class="projects-container fade-in">
          <a class="project-item digital" href="rolo-radio.html">
            <div class="thumbnail-image-wrapper">
              <div class="image-placeholder"></div>
              <img src="images/rolo-radio_mikael-westman_thumbnail.png" alt="Rolo Radio" class="progressive-image">
              <span class="thumbnail-title">Rolo Radio</span>
            </div>
          </a>

          <a class="project-item digital" href="square-for-restaurants.html">
            <div class="thumbnail-image-wrapper">
              <div class="image-placeholder"></div>
              <img src="images/square-mikael-westman-04.png" alt="Square for Restaurants" class="progressive-image">
              <span class="thumbnail-title">Square for Restaurants</span>
            </div>
          </a>

          <a class="project-item digital" href="square-pos.html">
            <div class="thumbnail-image-wrapper">
              <div class="image-placeholder"></div>
              <img src="images/pos-mikael-westman-01.png" alt="Square Point of Sale tablet & mobile design for Android" class="progressive-image">
              <span class="thumbnail-title">Square POS</span>
            </div>
          </a>

          <a class="project-item digital" href="epidemic-sound.html">
            <div class="thumbnail-image-wrapper">
              <div class="image-placeholder"></div>
              <img src="images/Epidemic-Sound-Artist.jpg" alt="Epidemic Sound artist page" class="progressive-image">
              <span class="thumbnail-title">Epidemic Sound</span>
            </div>
          </a>

          <a class="project-item digital" href="3d.html">
            <div class="thumbnail-image-wrapper">
              <div class="image-placeholder"></div>
              <img src="images/3d-lighter-mikael-westman.jpg" alt="3D render of lighter" class="progressive-image">
              <span class="thumbnail-title">3D</span>
            </div>
          </a>

          <a class="project-item digital" href="variable-font.html">
            <div class="thumbnail-image-wrapper">
              <div class="image-placeholder"></div>
              <img src="images/variable-font-thumb.png" alt="Variable font" class="progressive-image">
              <span class="thumbnail-title">Stretchy font</span>
            </div>
          </a>

          <a class="project-item digital" href="vexillography.html">
            <div class="thumbnail-image-wrapper">
              <div class="image-placeholder"></div>
              <img src="images/flag-uca-mikael-westman.jpg" alt="Flag" class="progressive-image">
              <span class="thumbnail-title">Vexillography</span>
            </div>
          </a>
        </div>
      </div>
    `;

    this.setupProgressiveImageLoading();
  }

  setupProgressiveImageLoading() {
    ProgressiveImages.setup(this);
  }
}

customElements.define('digital-projects-component', DigitalProjects);
