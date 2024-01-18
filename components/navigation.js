class Navigation extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    this.innerHTML = `
		<div id="top-navigation" class="row">
			<div class="column">
				<a href="/"><h3><span>© Mikael Westman 2024</span></h3></a>
			</div>
			<div class="column">	
				<a href="/" id="menu-active-1">Work</a>
				<a href="about.html" id="menu-active-2">About</a>
			</div>
		</div>
    `;
  }
}

customElements.define('navigation-component', Navigation);