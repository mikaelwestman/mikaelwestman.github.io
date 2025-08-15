class Projects extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    this.innerHTML = `
      <div class="wrapper thumbnails">
        <h2>All projects</h2>
        <div class="row">
          <a class="column" href="hallway-bench.html">
            <div class="thumbnail-image-wrapper"><img src="images/hallway-bench-mikael-westman-05.jpg" alt="Hallway bench"></div>
            <span class="thumbnail-title">Hallway bench</span>
          </a>
          <a class="column" href="stool.html">
            <div class="thumbnail-image-wrapper"><img src="images/stool-thumb.jpg" alt="Ball stool"></div>
            <span class="thumbnail-title">Ball stool</span>
          </a>
        </div>
        <div class="row">
          <a class="column" href="pelican.html">
            <div class="thumbnail-image-wrapper"><img src="images/pelican-spoon-mikael-westman-02.jpg" alt="PEL-I-CAN spoon"></div>
            <span class="thumbnail-title">Children's tableware</span>
          </a>
          <a class="column" href="3d.html">
            <div class="thumbnail-image-wrapper"><img src="images/3d-lighter-mikael-westman.jpg" alt="3D render of lighter"></div>
            <span class="thumbnail-title">3D</span>
          </a>
        </div>
        <div class="row">
          <a class="column" href="variable-font.html">
            <div class="thumbnail-image-wrapper"><img src="images/variable-font-thumb.png" alt="Variable font"></div>
            <span class="thumbnail-title">Stretchy font</span>
          </a>
          <a class="column" href="vexillography.html">
            <div class="thumbnail-image-wrapper"><img src="images/flag-uca-mikael-westman.jpg" alt="Flag"></div>
            <span class="thumbnail-title">Vexillography</span>
          </a>
        </div>
        <div class="row">
          <a class="column" href="square-for-restaurants.html">
            <div class="thumbnail-image-wrapper"><img src="images/square-mikael-westman-04.png" alt="Square for Restaurants"></div>
            <span class="thumbnail-title">Square for Restaurants</span>
          </a>
          <a class="column" href="square-pos.html">
            <div class="thumbnail-image-wrapper"><img src="images/pos-mikael-westman-01.png" alt="Square Point of Sale tablet & mobile design for Android"></div>
            <span class="thumbnail-title">Square Point of Sale</span>
          </a>
        </div>
        <div class="row">
          <a class="column" href="epidemic-sound.html">
            <div class="thumbnail-image-wrapper"><img src="images/Epidemic-Sound-Artist.jpg" alt="Epidemic Sound artist page"></div>
            <span class="thumbnail-title">Epidemic Sound</span>
          </a>
        </div>
      </div>
    `;
  }
}

customElements.define('projects-component', Projects);