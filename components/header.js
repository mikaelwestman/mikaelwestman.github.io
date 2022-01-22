class Header extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    this.innerHTML = `
		<div id="top-navigation" class="row">
			<div class="column">
				<a href="index.html"><h1><span class="logo-long">© Mikael Westman 2022</span> <span class="logo-short">©MW'22</span></h1></a>
			</div>
			<div class="column">	
				<a href="index.html" id="menu-active-1">Work</a>
				<a href="about.html" id="menu-active-2">About</a>
			</div>
		</div>
    `;
  }
}

customElements.define('header-component', Header);