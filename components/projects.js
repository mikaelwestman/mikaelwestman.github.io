class Projects extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    this.innerHTML = `
	  <div class="wrapper thumbnails">
	    <h2>All projects</h2>
			<div class="row">
				<a class="column" href="epidemic-sound.html">
	  			<div class="thumbnail-image-wrapper"><img src="images/Epidemic-Sound-Artist.jpg" alt="Epidemic Sound artist page"></div>
					<span class="thumbnail-title">Epidemic Sound</span>
				</a>
				<a class="column" href="square-for-restaurants.html">
					<div class="thumbnail-image-wrapper"><img src="images/square-mikael-westman-04.png" alt="Square for Restaurants"></div>
					<span class="thumbnail-title">Square for Restaurants</span>
				</a>
			</div>
			<div class="row">
				<a class="column" href="square-pos.html">
					<div class="thumbnail-image-wrapper"><img src="images/pos-mikael-westman-01.png" alt="Square Point of Sale tablet & mobile design for Android"></div>
					<span class="thumbnail-title">Square Point of Sale</span>
				</a>
				<a class="column" href="variable-font.html">
					<div class="thumbnail-image-wrapper"><img src="images/variable-font-thumb.png" alt="Variable font"></div>
					<span class="thumbnail-title">Stretchy font</span>
				</a>
			</div>
			<div class="row">
				<a class="column" href="vexillography.html">
					<div class="thumbnail-image-wrapper"><img src="images/flag-uca-mikael-westman.jpg" alt="Flag"></div>
					<span class="thumbnail-title">Vexillography</span>
				</a>
				<a class="column" href="3d.html">
					<div class="thumbnail-image-wrapper"><img src="images/3d-lighter-mikael-westman.jpg" alt="3D render of lighter"></div>
					<span class="thumbnail-title">3D</span>
				</a>
			</div>
			<div class="row">
				<a class="column" href="oodin.html">
					<div class="thumbnail-image-wrapper"><img src="images/oodin-thumbnail.jpg" alt="OODIN logo"></div>
					<span class="thumbnail-title">OODIN</span>
				</a>
			</div>
		</div>
    `;
  }
}

customElements.define('projects-component', Projects);