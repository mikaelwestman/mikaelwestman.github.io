class HomeMontage extends HTMLElement {
  connectedCallback() {
    if (document.body.id !== 'home') return;
    if (!window.matchMedia('(hover: hover)').matches) return;

    this.imagesPreloaded = false;
    this.leftIndex = 0;
    this.rightIndex = 0;
    this.leftInterval = null;
    this.rightInterval = null;
    this.leftTimeout = null;
    this.rightTimeout = null;

    this.digitalImages = [
      'images/rolo-radio_mikael-westman_home.jpg',
      'images/montage/rolo-radio_mikael-westman_04.jpg',
      'images/montage/rolo-radio_mikael-westman_05.jpg',
      'images/montage/flag-cherry-valley-mikael-westman.jpg',
      'images/montage/flag-eurasia-mikael-westman.jpg',
      'images/montage/flag-hellas-mikael-westman.jpg',
      'images/montage/Epidemic-Sound-Track.jpg',
      'images/montage/Epidemic-Sound-Icons.jpg',
      'images/montage/Epidemic-Sound-Feed.jpg',
      'images/montage/3d-bag-mikael-westman.jpg',
      'images/montage/3d-lighter-mikael-westman.jpg',
      'images/montage/3d-pingpong-mikael-westman.jpg'
    ];

    this.physicalImages = [
      'images/goblin-lamp-mikael-westman-03.jpg',
      'images/montage/goblin-lamp-mikael-westman-04.jpg',
      'images/montage/goblin-lamp-mikael-westman-05.jpg',
      'images/montage/hallway-bench-mikael-westman-01.jpg',
      'images/montage/hallway-bench-mikael-westman-02.jpg',
      'images/montage/hallway-bench-mikael-westman-05.jpg',
      'images/montage/vattenlilja-mikael-westman-01.jpg',
      'images/montage/vattenlilja-mikael-westman-02.jpg',
      'images/montage/vattenlilja-mikael-westman-03.jpg',
      'images/montage/stool-thumb.jpg',
      'images/montage/stool-mikael.westman-01.jpg',
      'images/montage/stool-mikael.westman-03.jpg',
    ];

    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', () => this.setup());
    } else {
      this.setup();
    }
  }

  setup() {
    this.leftBg = document.querySelector('.home-half-left .home-half-bg');
    this.rightBg = document.querySelector('.home-half-right .home-half-bg');
    const leftLink = document.querySelector('.home-link-left');
    const rightLink = document.querySelector('.home-link-right');

    if (!this.leftBg || !this.rightBg || !leftLink || !rightLink) return;

    leftLink.addEventListener('mouseenter', () => this.startCycling('left'));
    leftLink.addEventListener('mouseleave', () => this.stopCycling('left'));
    rightLink.addEventListener('mouseenter', () => this.startCycling('right'));
    rightLink.addEventListener('mouseleave', () => this.stopCycling('right'));

    this.preloadImages([...this.digitalImages, ...this.physicalImages]);
  }

  preloadImages(urls) {
    let i = 0;
    const next = () => {
      if (i >= urls.length) {
        this.imagesPreloaded = true;
        return;
      }
      const img = new Image();
      img.onload = img.onerror = () => { i++; next(); };
      img.src = urls[i];
    };
    next();
  }

  startCycling(side) {
    if (!this.imagesPreloaded) return;

    const timeoutKey = side + 'Timeout';
    this[timeoutKey] = setTimeout(() => {
      const images = side === 'left' ? this.digitalImages : this.physicalImages;
      const indexKey = side + 'Index';
      const bg = side === 'left' ? this.leftBg : this.rightBg;
      const intervalKey = side + 'Interval';

      this[indexKey] = 1;
      this[intervalKey] = setInterval(() => {
        bg.style.backgroundImage = `url('${images[this[indexKey]]}')`;
        this[indexKey] = (this[indexKey] + 1) % images.length;
      }, 150);
    }, 200);
  }

  stopCycling(side) {
    const timeoutKey = side + 'Timeout';
    const intervalKey = side + 'Interval';
    const bg = side === 'left' ? this.leftBg : this.rightBg;
    const defaultImage = side === 'left' ? this.digitalImages[0] : this.physicalImages[0];

    clearTimeout(this[timeoutKey]);
    clearInterval(this[intervalKey]);
    this[timeoutKey] = null;
    this[intervalKey] = null;

    bg.style.backgroundImage = `url('${defaultImage}')`;
  }
}

customElements.define('home-montage', HomeMontage);
