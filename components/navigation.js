class Navigation extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    this.innerHTML = `
		<div id="top-navigation" class="row">
			<div class="nav-left">
				<a href="/">Physical</a>
				<a href="digital.html">Digital</a>
			</div>
			<div class="nav-center">
				<a href="/"><svg class="logo" width="" height="28" viewBox="0 0 100 48" preserveAspectRatio="xMidYMid meet" fill="none" xmlns="http://www.w3.org/2000/svg">
				<path fill-rule="evenodd" clip-rule="evenodd" d="M93.8109 0.496474C98.5931 2.13469 101.142 7.33944 99.5035 12.1216L89.7454 40.6068C88.5498 44.0969 85.3756 46.5281 81.6945 46.7731C78.0134 47.0182 74.545 45.0292 72.8973 41.7283L68.93 33.7806C68.7486 33.4173 68.2192 33.4526 68.0876 33.8367L65.7684 40.6068C64.5727 44.0969 61.3986 46.5281 57.7174 46.7731C54.0363 47.0182 50.5679 45.0292 48.9202 41.7283L45.0756 34.0264C44.8934 33.6614 44.3609 33.6991 44.2319 34.0861L41.816 41.3376C40.6396 44.8685 37.4424 47.3355 33.7286 47.5779C30.0147 47.8203 26.5239 45.7898 24.8985 42.4418L20.8614 34.1258C20.683 33.7583 20.1491 33.7909 20.0167 34.1773L17.8142 40.6068C16.176 45.3889 10.9713 47.9376 6.1891 46.2994C1.40693 44.6612 -1.14175 39.4564 0.496474 34.6742L10.2546 6.1891C11.4562 2.68154 14.6551 0.245363 18.3559 0.0194918C22.0566 -0.206379 25.5281 1.82268 27.1473 5.15807L31.0613 13.2203C31.2405 13.5894 31.7775 13.5544 31.9072 13.1651L34.2069 6.26228C35.3775 2.7488 38.5499 0.286934 42.244 0.0253524C45.9381 -0.236229 49.4258 1.75403 51.0798 5.0675L55.0471 13.0152C55.2284 13.3785 55.7579 13.3433 55.8895 12.9592L58.2087 6.1891C59.4043 2.69892 62.5785 0.267762 66.2596 0.0227058C69.9408 -0.222351 73.4092 1.76661 75.0569 5.0675L79.0242 13.0152C79.2055 13.3785 79.735 13.3433 79.8666 12.9592L82.1858 6.1891C83.824 1.40693 89.0287 -1.14175 93.8109 0.496474Z" fill="currentColor"/>
				</svg></a>
			</div>
			<div class="nav-right">
				<a href="about.html">About</a>
				<a id="nav-email-link" style="cursor: pointer;">Email</a>
				<a href="https://www.instagram.com/mestman/" target="_blank" rel="noopener noreferrer">Instagram</a>
			</div>
		</div>
		<button class="hamburger-menu" aria-label="Toggle navigation menu">
			<span class="hamburger-line"></span>
			<span class="hamburger-line"></span>
		</button>
		<div class="mobile-menu">
			<nav class="mobile-nav">
				<a href="/" class="mobile-nav-link">Physical</a>
				<a href="digital.html" class="mobile-nav-link">Digital</a>
				<a href="about.html" class="mobile-nav-link">About</a>
				<a href="mailto:mikael@wst.mn" class="mobile-nav-link">Email</a>
				<a href="https://www.instagram.com/mestman/" target="_blank" rel="noopener noreferrer" class="mobile-nav-link">Instagram</a>
			</nav>
		</div>
    `;

    // Add event listeners for hamburger menu
    this.setupMobileMenu();
    
    // Setup scroll-based navigation fade
    this.setupScrollFade();
    
    // Setup email clipboard functionality
    this.setupEmailClipboard();
  }

  setupMobileMenu() {
    const hamburger = this.querySelector('.hamburger-menu');
    const mobileMenu = this.querySelector('.mobile-menu');
    const mobileNavLinks = this.querySelectorAll('.mobile-nav-link');

    hamburger.addEventListener('click', () => {
      if (mobileMenu.classList.contains('active')) {
        // Close menu
        mobileMenu.classList.remove('active');
        hamburger.classList.remove('active');
        document.body.style.overflow = '';
      } else {
        // Open menu
        mobileMenu.classList.add('active');
        hamburger.classList.add('active');
        document.body.style.overflow = 'hidden';
      }
    });

    // Close menu when clicking on menu background
    mobileMenu.addEventListener('click', (e) => {
      if (e.target === mobileMenu) {
        mobileMenu.classList.remove('active');
        hamburger.classList.remove('active');
        document.body.style.overflow = '';
      }
    });

    // Close menu when clicking on nav links
    mobileNavLinks.forEach(link => {
      link.addEventListener('click', () => {
        mobileMenu.classList.remove('active');
        hamburger.classList.remove('active');
        document.body.style.overflow = '';
      });
    });

    // Close menu on escape key
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && mobileMenu.classList.contains('active')) {
        mobileMenu.classList.remove('active');
        hamburger.classList.remove('active');
        document.body.style.overflow = '';
      }
    });
  }

  setupScrollFade() {
    const nav = this.querySelector('#top-navigation');
    const hamburger = this.querySelector('.hamburger-menu');
    let lastScrollY = window.scrollY;
    let ticking = false;

    const updateNav = () => {
      const currentScrollY = window.scrollY;
      
      // Only hide nav when scrolling down and not at the top
      if (currentScrollY > lastScrollY && currentScrollY > 100) {
        nav.classList.add('nav-hidden');
        hamburger.classList.add('nav-hidden');
      } else {
        nav.classList.remove('nav-hidden');
        hamburger.classList.remove('nav-hidden');
      }
      
      lastScrollY = currentScrollY;
      ticking = false;
    };

    const requestTick = () => {
      if (!ticking) {
        requestAnimationFrame(updateNav);
        ticking = true;
      }
    };

    // Listen for scroll events
    window.addEventListener('scroll', requestTick, { passive: true });
  }
  
  setupEmailClipboard() {
    EmailClipboard.setup('#nav-email-link', 'mikael@wst.mn');
  }
}

customElements.define('navigation-component', Navigation);