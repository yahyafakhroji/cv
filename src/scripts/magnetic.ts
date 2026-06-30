export function initMagnetic(root: ParentNode): void {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  const items = [...root.querySelectorAll<HTMLElement>('[data-magnetic]')];
  if (!items.length) return;
  let raf = 0;
  const onMove = (ev: PointerEvent) => {
    if (raf) return;
    raf = requestAnimationFrame(() => {
      raf = 0;
      for (const el of items) {
        const r = el.getBoundingClientRect();
        const dx = ev.clientX - (r.left + r.width / 2);
        const dy = ev.clientY - (r.top + r.height / 2);
        const dist = Math.hypot(dx, dy);
        const radius = Math.max(r.width, 120);
        const pull = 1 - dist / radius;
        el.style.transform = dist < radius
          ? `translate(${dx * 0.28 * pull}px, ${dy * 0.28 * pull}px)`
          : 'translate(0,0)';
      }
    });
  };
  window.addEventListener('pointermove', onMove, { passive: true });
}
