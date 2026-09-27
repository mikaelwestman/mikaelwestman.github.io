window.EmailClipboard = {
  hideTimer: null,

  setup(selector, email) {
    const el = document.querySelector(selector);
    if (!el) return;

    let tooltip = document.querySelector('.tooltip');
    if (!tooltip) {
      tooltip = document.createElement('div');
      tooltip.className = 'tooltip';
      tooltip.innerHTML = `
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="margin-right: 8px; vertical-align: middle;">
          <path d="M20 6L9 17l-5-5"></path>
        </svg>
        Copied email (${email})
      `;
      document.body.appendChild(tooltip);
    }

    el.addEventListener('click', async (e) => {
      // No clipboard API (e.g. insecure context): let the mailto: href open
      if (!navigator.clipboard) return;
      e.preventDefault();
      try {
        await navigator.clipboard.writeText(email);
      } catch {
        location.href = 'mailto:' + email;
        return;
      }
      tooltip.classList.add('show');
      clearTimeout(this.hideTimer);
      this.hideTimer = setTimeout(() => { tooltip.classList.remove('show'); }, 2000);
    });
  }
};
