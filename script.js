(() => {
  const page = document.querySelector('[data-page]')?.dataset.page;
  const form = document.querySelector('#contact-form');
  const status = document.querySelector('#form-status');

  if (page === 'contact' && form) {
    form.addEventListener('submit', (event) => {
      event.preventDefault();
      if (!form.checkValidity()) {
        form.reportValidity();
        return;
      }
      if (status) status.textContent = 'Your message is ready to send.';
      const button = form.querySelector('button');
      if (button) {
        const original = button.textContent;
        button.textContent = 'Message ready';
        button.disabled = true;
        window.setTimeout(() => {
          button.textContent = original;
          button.disabled = false;
          form.reset();
        }, 1800);
      }
    });
  }

  document.querySelectorAll('a[href^="#"]').forEach((link) => {
    link.addEventListener('click', (event) => {
      const target = document.querySelector(link.getAttribute('href'));
      if (target) {
        event.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    });
  });
})();
