(() => {
  const toggle = document.querySelector('.menu-toggle');
  const nav = document.querySelector('.site-nav');
  toggle?.addEventListener('click', () => {
    const open = nav?.classList.toggle('is-open') ?? false;
    toggle.setAttribute('aria-expanded', String(open));
  });
  nav?.querySelectorAll('a').forEach((link) => link.addEventListener('click', () => {
    nav.classList.remove('is-open');
    toggle?.setAttribute('aria-expanded', 'false');
  }));

  const form = document.querySelector('#contact-form');
  const status = document.querySelector('#form-status');
  form?.addEventListener('submit', (event) => {
    event.preventDefault();
    if (!form.checkValidity()) { form.reportValidity(); return; }
    if (status) status.textContent = 'Message ready — connect the form endpoint to send it.';
    const button = form.querySelector('button');
    if (button) {
      button.textContent = 'Message ready ✓';
      button.disabled = true;
      window.setTimeout(() => { button.textContent = 'Send message →'; button.disabled = false; }, 2200);
    }
  });
})();
