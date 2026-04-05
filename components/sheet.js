// Opens project pages as a sheet overlay when on the index page
(() => {
  const PROJECT_PAGES = new Set([
    'hallway-bench.html', 'vattenlilja.html', 'goblin-lamp.html',
    'stool.html', 'pelican.html', 'rolo-radio.html',
    'square-for-restaurants.html', 'square-pos.html',
    'epidemic-sound.html', '3d.html', 'variable-font.html', 'vexillography.html'
  ]);

  let sheetEl, panel, body;
  let isOpen = false;
  let indexTitle = '';

  function init() {
    if (document.body.id !== 'home') return;

    indexTitle = document.title;

    sheetEl = document.createElement('div');
    sheetEl.id = 'project-sheet';
    sheetEl.setAttribute('aria-modal', 'true');
    sheetEl.setAttribute('role', 'dialog');
    sheetEl.innerHTML = `
      <div id="sheet-backdrop"></div>
      <div id="sheet-panel">
        <div id="sheet-topbar">
          <div id="sheet-handle"></div>
          <button id="sheet-close" aria-label="Close project">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M2 2L14 14M14 2L2 14" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
            </svg>
          </button>
        </div>
        <div id="sheet-body"></div>
      </div>
    `;
    document.body.appendChild(sheetEl);

    panel = sheetEl.querySelector('#sheet-panel');
    body  = sheetEl.querySelector('#sheet-body');

    sheetEl.querySelector('#sheet-backdrop').addEventListener('click', close);
    sheetEl.querySelector('#sheet-close').addEventListener('click', close);

    document.addEventListener('keydown', e => {
      if (e.key === 'Escape' && isOpen) close();
    });

    window.addEventListener('popstate', e => {
      if (e.state?.projectSheet) {
        openContent(e.state.url, false);
      } else if (isOpen) {
        closePanel();
      }
    });

    // Auto-open if redirected from a direct project URL
    const sheetParam = new URLSearchParams(location.search).get('sheet');
    if (sheetParam && PROJECT_PAGES.has(sheetParam)) {
      try { history.replaceState(null, '', '/'); } catch {}
      openContent(sheetParam, true);
    }

    // Intercept project link clicks
    document.addEventListener('click', e => {
      const link = e.target.closest('a.project-item');
      if (!link) return;
      const href = link.getAttribute('href');
      if (!href) return;
      const filename = href.split('/').pop().split('?')[0];
      if (!PROJECT_PAGES.has(filename)) return;
      e.preventDefault();
      openContent(href, true);
    });
  }

  async function openContent(url, pushState) {
    // Resolve to absolute URL before pushState changes location
    const absoluteUrl = new URL(url, location.href).href;

    isOpen = true;
    body.innerHTML = '<div id="sheet-loading"><div class="sheet-spinner"></div></div>';
    sheetEl.classList.add('open');
    document.body.classList.add('sheet-open');
    document.body.style.overflow = 'hidden';

    try {
      const res = await fetch(absoluteUrl);
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const html = await res.text();
      const doc = new DOMParser().parseFromString(html, 'text/html');

      document.title = doc.title;

      if (pushState) {
        try { history.pushState({ projectSheet: true, url }, '', url); } catch {}
      }

      const content = doc.querySelector('page-content');
      body.innerHTML = content ? content.innerHTML : '<p style="padding:4rem 2rem;opacity:.5">No content found.</p>';

      panel.scrollTop = 0;
      initImages(body);
    } catch (err) {
      console.error('[sheet] Failed to load:', absoluteUrl, err);
      body.innerHTML = '<p style="padding:4rem 2rem;opacity:.5">Could not load project.</p>';
    }
  }

  function close() {
    closePanel();
    try { history.replaceState(null, '', '/'); } catch {}
  }

  function closePanel() {
    isOpen = false;
    sheetEl.classList.remove('open');
    document.body.classList.remove('sheet-open');
    document.body.style.overflow = '';
    document.title = indexTitle;

    panel.addEventListener('transitionend', () => {
      body.innerHTML = '';
      panel.scrollTop = 0;
    }, { once: true });
  }

  function initImages(container) {
    const imgs = container.querySelectorAll('img');
    const videos = container.querySelectorAll('video');

    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        const el = entry.target;
        observer.unobserve(el);

        if (el.tagName === 'VIDEO') {
          if (el.readyState >= 2) {
            el.classList.add('lazy-loaded');
          } else {
            el.addEventListener('loadeddata', () => el.classList.add('lazy-loaded'), { once: true });
            el.addEventListener('error', () => el.classList.add('lazy-loaded'), { once: true });
          }
          return;
        }

        // Already loaded (e.g. SVG or inline style opacity:1)
        if (el.complete && el.naturalWidth > 0) {
          el.classList.add('lazy-loaded');
          return;
        }

        const tmp = new Image();
        tmp.onload  = () => el.classList.add('lazy-loaded');
        tmp.onerror = () => el.classList.add('lazy-loaded');
        tmp.src = el.src;
      });
    }, { root: panel, rootMargin: '300px 0px' });

    imgs.forEach(img => observer.observe(img));
    videos.forEach(video => observer.observe(video));
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
