class Footer extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    this.innerHTML = `
		<footer>
			<div class="footer-content">
				<div class="column">
					<span class="meta-data">Mikael Westman © 2025</span>
					<span class="meta-data" style="opacity: 50%;">All rights reserved</span>
				</div>
				<div class="column">
					<a id="footer-email-link" style="position: relative; cursor: pointer; display: inline-block;">mikael@wst.mn</a>
					<a href="https://www.linkedin.com/in/mikaelwestman/" target="_blank">Linkedin</a>
					<a href="https://soundcloud.com/mikael-westman" target="_blank">Soundcloud</a>
				</div>
			</div>
			<div class="footer-logo">
				<svg width="100" height="48" viewBox="0 0 100 48" fill="none" xmlns="http://www.w3.org/2000/svg" class="footer-logo-img">
					<path fill-rule="evenodd" clip-rule="evenodd" d="M93.8109 0.496474C98.5931 2.13469 101.142 7.33944 99.5035 12.1216L89.7454 40.6068C88.5498 44.0969 85.3756 46.5281 81.6945 46.7731C78.0134 47.0182 74.545 45.0292 72.8973 41.7283L68.93 33.7806C68.7486 33.4173 68.2192 33.4526 68.0876 33.8367L65.7684 40.6068C64.5727 44.0969 61.3986 46.5281 57.7174 46.7731C54.0363 47.0182 50.5679 45.0292 48.9202 41.7283L45.0756 34.0264C44.8934 33.6614 44.3609 33.6991 44.2319 34.0861L41.816 41.3376C40.6396 44.8685 37.4424 47.3355 33.7286 47.5779C30.0147 47.8203 26.5239 45.7898 24.8985 42.4418L20.8614 34.1258C20.683 33.7583 20.1491 33.7909 20.0167 34.1773L17.8142 40.6068C16.176 45.3889 10.9713 47.9376 6.1891 46.2994C1.40693 44.6612 -1.14175 39.4564 0.496474 34.6742L10.2546 6.1891C11.4562 2.68154 14.6551 0.245363 18.3559 0.0194918C22.0566 -0.206379 25.5281 1.82268 27.1473 5.15807L31.0613 13.2203C31.2405 13.5894 31.7775 13.5544 31.9072 13.1651L34.2069 6.26228C35.3775 2.7488 38.5499 0.286934 42.244 0.0253524C45.9381 -0.236229 49.4258 1.75403 51.0798 5.0675L55.0471 13.0152C55.2284 13.3785 55.7579 13.3433 55.8895 12.9592L58.2087 6.1891C59.4043 2.69892 62.5785 0.267762 66.2596 0.0227058C69.9408 -0.222351 73.4092 1.76661 75.0569 5.0675L79.0242 13.0152C79.2055 13.3785 79.735 13.3433 79.8666 12.9592L82.1858 6.1891C83.824 1.40693 89.0287 -1.14175 93.8109 0.496474Z" fill="currentColor"/>
				</svg>
			</div>
		</footer>
    `;
    
    // Add clipboard functionality for footer email
    this.setupEmailClipboard();
  }
  
  setupEmailClipboard() {
    const emailLink = this.querySelector('#footer-email-link');
    if (!emailLink) return;
    
    const email = 'mikael@wst.mn';
    
    // Create or get global tooltip element
    let tooltip = document.querySelector('.tooltip');
    if (!tooltip) {
      tooltip = document.createElement('div');
      tooltip.className = 'tooltip';
      tooltip.innerHTML = `
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="margin-right: 8px; vertical-align: middle;">
          <path d="M20 6L9 17l-5-5"></path>
        </svg>
        Copied email (mikael@wst.mn)
      `;
      document.body.appendChild(tooltip);
    }
    
    emailLink.addEventListener('click', async function(e) {
      e.preventDefault();
      
      try {
        await navigator.clipboard.writeText(email);
        
        // Show tooltip
        tooltip.classList.add('show');
        
        // Hide tooltip after 2 seconds
        setTimeout(() => {
          tooltip.classList.remove('show');
        }, 2000);
        
      } catch (err) {
        // Fallback for older browsers
        const textArea = document.createElement('textarea');
        textArea.value = email;
        document.body.appendChild(textArea);
        textArea.select();
        document.execCommand('copy');
        document.body.removeChild(textArea);
        
        // Show tooltip
        tooltip.classList.add('show');
        
        // Hide tooltip after 2 seconds
        setTimeout(() => {
          tooltip.classList.remove('show');
        }, 2000);
      }
    });
  }
}

customElements.define('footer-component', Footer);