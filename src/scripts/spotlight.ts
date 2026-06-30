export function initSpotlight(root: HTMLElement): void {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  let raf = 0, x = 0, y = 0;
  const onMove = (ev: PointerEvent) => {
    x = ev.clientX; y = ev.clientY;
    if (raf) return;
    raf = requestAnimationFrame(() => {
      raf = 0;
      root.style.setProperty('--mx', `${x}px`);
      root.style.setProperty('--my', `${y}px`);
    });
  };
  window.addEventListener('pointermove', onMove, { passive: true });
}
