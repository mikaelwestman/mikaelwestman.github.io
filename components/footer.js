class Footer extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    this.innerHTML = `
		<footer>
			<div class="footer-content">
				<div class="column">
					<h3>Mikael Westman © 2025</h3>
					<h3 style="opacity: 50%;">All rights reserved</h3>
				</div>
				<div class="column">
					<a href="mailto:mikael@wst.mn"><span class="bullet">↗</span>mikael@wst.mn</a>
					<a href="https://www.linkedin.com/in/mikaelwestman/" target="_blank"><span class="bullet">↗</span>Linkedin</a>
					<a href="https://soundcloud.com/mikael-westman" target="_blank"><span class="bullet">↗</span>Soundcloud</a>
				</div>
			</div>
		</footer>
    `;
  }
}

customElements.define('footer-component', Footer);