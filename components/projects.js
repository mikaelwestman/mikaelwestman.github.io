class Projects extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    this.innerHTML = `
    <div class="wrapper">
		<div id="projects">
			<div class="row">
				<a class="column" href="3d.html">
					<img src="images/3d-lighter-mikael-westman.jpg" alt="3D render of lighter">
					<span>3D explorations</span>
				</a>
				<a class="column" href="square-pos.html">
					<img src="images/pos-mikael-westman-01.jpg" alt="Square Point of Sale tablet & mobile design for Android">
					<span>Square Point of Sale</span>
				</a>
			</div>
			<div class="row">
				<a class="column" href="square-for-restaurants.html">
					<img src="images/square-mikael-westman-01.png" alt="Square Point of Sale tablet & mobile design for Android">
					<span>Square for Restaurants</span>
				</a>
				<a class="column" href="bryggmastaren.html">
					<img src="images/bryggmastarens-mikael-westman-03.png" alt="Square Point of Sale tablet & mobile design for Android">
					<span>Bryggmästarens</span>
				</a>
			</div>
				<div class="row">
				<a class="column" href="oodin.html">
					<img src="images/oodin-thumbnail.jpg" alt="Square Point of Sale tablet & mobile design for Android">
					<span>OODIN</span>
				</a>
				<a class="column">
				</a>
			</div>
		</div>
	</div>
    `;
  }
}

customElements.define('projects-component', Projects);