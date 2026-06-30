export function initHeroEntrance(root: ParentNode): void {
  const letters = [...root.querySelectorAll<HTMLElement>('[data-letter]')];
  const fades = [...root.querySelectorAll<HTMLElement>('[data-fade]')];
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    [...letters, ...fades].forEach((el) => { el.style.opacity = '1'; el.style.transform = 'none'; });
    return;
  }
  letters.forEach((el) => { el.style.opacity = '0'; el.style.transform = 'translateY(110%)'; });
  fades.forEach((el) => { el.style.opacity = '0'; el.style.transform = 'translateY(14px)'; });
  requestAnimationFrame(() => {
    letters.forEach((el, i) => {
      const d = 120 + i * 30;
      el.style.transition = `transform 0.95s cubic-bezier(0.22,1,0.36,1) ${d}ms, opacity 0.8s ease ${d}ms`;
      el.style.opacity = '1'; el.style.transform = 'translateY(0)';
    });
    fades.forEach((el) => {
      const d = parseFloat(el.getAttribute('data-delay') || '0');
      el.style.transition = `opacity 0.7s ease ${d}ms, transform 0.8s cubic-bezier(0.22,1,0.36,1) ${d}ms`;
      el.style.opacity = '1'; el.style.transform = 'translateY(0)';
    });
  });
}
