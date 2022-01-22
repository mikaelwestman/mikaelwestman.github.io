class Header extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    this.innerHTML = `
		<div class="top-navigation">
			<div class="nav-left">
				<a href="index.html"><h1><span class="logo-long">© Mikael Westman 2022</span> <span class="logo-short">©MW'22</span></h1></a>
			</div>
			<div class="nav-right">	
				<a href="index.html">Work</a>
				<a href="about.html">About</a>
			</div>
		</div>
    `;
  }
}

customElements.define('header-component', Header);