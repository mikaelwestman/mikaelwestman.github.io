class Projects extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    this.innerHTML = `
	    <div class="wrapper thumbnails">
	    	<h2>All projects</h2>
			<div class="row">
				<a class="column" href="3d.html">
					<img src="images/3d-lighter-mikael-westman.jpg" alt="3D render of lighter">
					<span class="thumbnail-title">3D explorations</span>
				</a>
				<a class="column" href="epidemic-sound.html">
	  				<img src="images/Epidemic-Sound-Artist.jpg" alt="Epidemic Sound artist page">
					<span class="thumbnail-title">Epidemic Sound</span>
				</a>
			</div>
			<div class="row">
				<a class="column" href="square-pos.html">
					<img src="images/pos-mikael-westman-01.jpg" alt="Square Point of Sale tablet & mobile design for Android">
					<span class="thumbnail-title">Square Point of Sale</span>
				</a>
				<a class="column" href="vexillography.html">
					<img src="images/flag-uca-mikael-westman.jpg" alt="Flag">
					<span class="thumbnail-title">Vexillography</span>
				</a>
			</div>
			<div class="row">
				<a class="column" href="bryggmastaren.html">
					<img src="images/bryggmastarens-mikael-westman-03.png" alt="Bottlecap">
					<span class="thumbnail-title">Bryggmästarens</span>
				</a>
				<a class="column" href="square-for-restaurants.html">
					<img src="images/square-mikael-westman-01.png" alt="Square for Restaurants">
					<span class="thumbnail-title">Square for Restaurants</span>
				</a>
			</div>
			<div class="row">
				<a class="column" href="oodin.html">
					<img src="images/oodin-thumbnail.jpg" alt="OODIN logo">
					<span class="thumbnail-title">OODIN</span>
				</a>
			</div>
		</div>
    `;
  }
}

customElements.define('projects-component', Projects);