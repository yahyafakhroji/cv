export function initReveal(root: ParentNode): void {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  const els = [...root.querySelectorAll<HTMLElement>('[data-reveal]')];
  const io = new IntersectionObserver((entries) => {
    for (const e of entries) {
      if (!e.isIntersecting) continue;
      const el = e.target as HTMLElement;
      io.unobserve(el);
      const d = parseFloat(el.getAttribute('data-reveal-delay') || '0');
      el.style.transition = `opacity 0.8s ease ${d}ms, transform 0.85s cubic-bezier(0.22,1,0.36,1) ${d}ms`;
      el.style.opacity = '1';
      el.style.transform = 'translateY(0)';
    }
  }, { threshold: 0.12, rootMargin: '0px 0px -7% 0px' });
  for (const el of els) {
    el.style.opacity = '0';
    el.style.transform = 'translateY(26px)';
    io.observe(el);
  }
}
