class Footer extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    this.innerHTML = `
		<footer>
			<div class="footer-content">
				<div class="column">
					<h2>Mikael Westman © 2025</h2>
					<h2 style="opacity: 50%;">All rights reserved</h2>
				</div>
				<div class="column">
					<a class="big-link" href="mailto:mikael@wst.mn"><span class="bullet">↗</span>mikael@wst.mn</a>
					<a class="big-link" href="https://www.linkedin.com/in/mikaelwestman/" target="_blank"><span class="bullet">↗</span>Linkedin</a>
					<a class="big-link" href="https://soundcloud.com/mikael-westman" target="_blank"><span class="bullet">↗</span>Soundcloud</a>
				</div>
			</div>
		</footer>
    `;
  }
}

customElements.define('footer-component', Footer);