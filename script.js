document.addEventListener('DOMContentLoaded', () => {
  const loader = document.getElementById('loader');
  const navbar = document.getElementById('siteNav');
  const topBtn = document.getElementById('topBtn');
  const menuBtn = document.querySelector('[data-collapse-toggle]');
  const menu = document.getElementById('navbar-solid');

  window.addEventListener('load', () => {
    window.setTimeout(() => loader?.classList.add('is-hidden'), 450);
  });

  const handleScroll = () => {
    navbar?.classList.toggle('scrolled', window.scrollY > 35);
    topBtn?.classList.toggle('visible', window.scrollY > 350);
  };
  window.addEventListener('scroll', handleScroll, { passive: true });
  handleScroll();

  menuBtn?.addEventListener('click', () => {
    menu?.classList.toggle('hidden');
    menuBtn.setAttribute('aria-expanded', String(!menu?.classList.contains('hidden')));
  });

  menu?.querySelectorAll('a').forEach(link => link.addEventListener('click', () => {
    if (window.innerWidth < 768) menu.classList.add('hidden');
  }));

  topBtn?.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));

  const counterObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      const counter = entry.target;
      const target = Number(counter.dataset.target || 0);
      const suffix = counter.dataset.suffix ?? '+';
      const duration = 1800;
      const started = performance.now();
      const tick = now => {
        const progress = Math.min((now - started) / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 3);
        counter.textContent = `${Math.floor(target * eased).toLocaleString('en-IN')}${progress === 1 ? suffix : ''}`;
        if (progress < 1) requestAnimationFrame(tick);
      };
      requestAnimationFrame(tick);
      counterObserver.unobserve(counter);
    });
  }, { threshold: .45 });
  document.querySelectorAll('.counter').forEach(counter => counterObserver.observe(counter));

  const revealObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: .12 });
  document.querySelectorAll('.reveal').forEach(item => revealObserver.observe(item));

  const form = document.getElementById('admissionForm');
  form?.addEventListener('submit', async event => {
    event.preventDefault();
    const button = document.getElementById('submitBtn');
    const success = document.getElementById('successMessage');
    const original = button.textContent;
    button.disabled = true;
    button.textContent = 'Submitting...';
    try {
      const response = await fetch('https://formsubmit.co/ajax/lateyadavraodange2022@gmail.com', {
        method: 'POST', headers: { Accept: 'application/json' }, body: new FormData(form)
      });
      if (!response.ok) throw new Error('Submission failed');
      form.reset();
      success?.classList.remove('hidden');
      success?.scrollIntoView({ behavior: 'smooth', block: 'center' });
      window.setTimeout(() => success?.classList.add('hidden'), 6000);
    } catch (error) {
      alert('Form could not be submitted. Please try again or contact the college by phone.');
    } finally {
      button.disabled = false;
      button.textContent = original;
    }
  });
});

function handleClick() {
  window.location.href = 'course.html';
}
