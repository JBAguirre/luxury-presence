/* =========================================================
   Marci Metzger Homes — Interactions
   Modular, dependency-free vanilla JS
   ========================================================= */

(function initMobileNav(){
  const toggle = document.getElementById('navToggle');
  const nav = document.getElementById('primaryNav');
  if (!toggle || !nav) return;

  toggle.addEventListener('click', () => {
    const isOpen = nav.classList.toggle('open');
    toggle.setAttribute('aria-expanded', String(isOpen));
  });

  // Close mobile menu after a link is chosen
  nav.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      nav.classList.remove('open');
      toggle.setAttribute('aria-expanded', 'false');
    });
  });
})();

(function initAdvancedFiltering(){
  const toggle = document.getElementById('advancedToggle');
  const panel = document.getElementById('advancedFields');
  if (!toggle || !panel) return;

  toggle.addEventListener('click', () => {
    const isOpen = panel.classList.toggle('open');
    toggle.setAttribute('aria-expanded', String(isOpen));
  });
})();

(function initSearchForm(){
  const form = document.querySelector('.search-bar');
  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const min = document.getElementById('budgetMin').value;
    const max = document.getElementById('budgetMax').value;
    if (min && max && Number(min) > Number(max)){
      alert('Minimum budget should be less than maximum budget.');
      return;
    }
    // In production this would navigate to a filtered listings page.
    console.log('Search submitted', {
      location: document.getElementById('location').value,
      propertyType: document.getElementById('propertyType').value,
      budgetMin: min,
      budgetMax: max
    });
  });
})();

(function initContactForm(){
  const form = document.getElementById('contactForm');
  const status = document.getElementById('formStatus');
  if (!form) return;

  const fields = [
    { id: 'name', wrapper: 'nameField', validate: v => v.trim().length > 0 },
    { id: 'email', wrapper: 'emailField', validate: v => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v) },
    { id: 'message', wrapper: 'messageField', validate: v => v.trim().length > 0 },
  ];

  function validateField(field){
    const input = document.getElementById(field.id);
    const wrapper = document.getElementById(field.wrapper);
    const valid = field.validate(input.value);
    wrapper.classList.toggle('invalid', !valid);
    input.setAttribute('aria-invalid', String(!valid));
    return valid;
  }

  fields.forEach(field => {
    document.getElementById(field.id).addEventListener('blur', () => validateField(field));
  });

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const allValid = fields.map(validateField).every(Boolean);

    if (!allValid){
      status.textContent = 'Please fix the highlighted fields and try again.';
      return;
    }

    status.textContent = 'Thanks! Your message has been sent — Marci will get back to you soon.';
    form.reset();
  });
})();
