export function initExperienceScrollSpy(root: ParentNode): void {
  const cards = [...root.querySelectorAll<HTMLElement>('[data-jobcard]')];
  if (!cards.length) return;
  const mm = (q: string) => window.matchMedia(q).matches;
  const reduce = mm('(prefers-reduced-motion: reduce)');
  // Back off the de-emphasis dim for users who asked for more contrast / less
  // transparency, so the effect never makes text unreadable for them.
  const highContrast = mm('(prefers-contrast: more)') || mm('(prefers-reduced-transparency: reduce)');
  const dim = !reduce && !highContrast;

  const panel = root.querySelector<HTMLElement>('[data-panel]');
  const bar = root.querySelector<HTMLElement>('[data-bar]');
  const f = {
    year: root.querySelector<HTMLElement>('[data-active-year]'),
    company: root.querySelector<HTMLElement>('[data-active-company]'),
    role: root.querySelector<HTMLElement>('[data-active-role]'),
    summary: root.querySelector<HTMLElement>('[data-active-summary]'),
    label: root.querySelector<HTMLElement>('[data-progress-label]'),
  };
  const total = cards.length;
  const pad2 = (n: number) => String(n).padStart(2, '0');

  const applyMode = () => { if (panel) panel.style.position = window.innerWidth >= 860 ? 'sticky' : 'static'; };
  applyMode();
  let rzT = 0;
  window.addEventListener('resize', () => { clearTimeout(rzT); rzT = window.setTimeout(applyMode, 150); }, { passive: true });

  if (dim) cards.forEach((c) => { c.style.transition = 'opacity 0.45s ease'; });

  let last = -1;
  const setActive = (i: number) => {
    if (i === last) return;
    last = i;
    const c = cards[i];
    if (f.year) f.year.textContent = c.dataset.year || '';
    if (f.company) f.company.textContent = c.dataset.company || '';
    if (f.role) f.role.textContent = c.dataset.role || '';
    if (f.summary) f.summary.textContent = c.dataset.summary || '';
    if (f.label) f.label.textContent = `${pad2(i + 1)} / ${pad2(total)}`;
    if (bar) bar.style.width = `${((i + 1) / total) * 100}%`;
    if (dim) cards.forEach((card, j) => { card.style.opacity = j === i ? '1' : '0.32'; });
  };

  const compute = () => {
    const pinnedTop = Math.max(56, Math.min(window.innerHeight * 0.1, 112));
    const anchor = pinnedTop + 84;
    let idx = 0;
    for (let i = 0; i < cards.length; i++) {
      if (cards[i].getBoundingClientRect().top - anchor <= 4) idx = i; else break;
    }
    setActive(idx);
  };

  let raf = 0;
  window.addEventListener('scroll', () => {
    if (raf) return;
    raf = requestAnimationFrame(() => { raf = 0; compute(); });
  }, { passive: true });
  compute();
}
