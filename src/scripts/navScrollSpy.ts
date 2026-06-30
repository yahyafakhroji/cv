export function initNavScrollSpy(root: ParentNode = document): void {
  const links = [...root.querySelectorAll<HTMLAnchorElement>('nav a[data-navlink]')];
  if (!links.length) return;

  const map = new Map<string, HTMLAnchorElement>();
  const sections: HTMLElement[] = [];
  for (const a of links) {
    const id = a.getAttribute('href')?.replace('#', '') || '';
    const el = id ? document.getElementById(id) : null;
    if (el) { map.set(id, a); sections.push(el); }
  }
  if (!sections.length) return;

  let current = '';
  const setActive = (id: string | null) => {
    if ((id || '') === current) return;
    current = id || '';
    for (const [sid, a] of map) {
      if (sid === id) a.setAttribute('aria-current', 'true');
      else a.removeAttribute('aria-current');
    }
  };

  const compute = () => {
    const line = 80; // detection line just below the fixed nav
    let activeId: string | null = null;
    for (const s of sections) {
      if (s.getBoundingClientRect().top - line <= 0) activeId = s.id; else break;
    }
    // Pin the last link when scrolled to the very bottom.
    if (window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 2) {
      activeId = sections[sections.length - 1].id;
    }
    setActive(activeId);
  };

  let raf = 0;
  const onScroll = () => { if (raf) return; raf = requestAnimationFrame(() => { raf = 0; compute(); }); };
  window.addEventListener('scroll', onScroll, { passive: true });
  window.addEventListener('resize', onScroll, { passive: true });
  compute();
}
