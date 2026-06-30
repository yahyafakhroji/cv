export function initScramble(el: HTMLElement, words: string[]): void {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  if (words.length < 2) return;
  const chars = 'ABCDEFGHKMNRSTXYZ#%&/<>*+=';
  let wi = 0, inner = 0;
  const scrambleTo = (text: string) => {
    const from = el.textContent || '';
    const len = Math.max(from.length, text.length);
    const queue = Array.from({ length: len }, (_, i) => {
      const start = Math.floor(Math.random() * 12);
      return { to: text[i] || '', start, end: start + 8 + Math.floor(Math.random() * 12), ch: '' };
    });
    let frame = 0;
    if (inner) clearInterval(inner);
    inner = window.setInterval(() => {
      let out = '', done = 0;
      for (const q of queue) {
        if (frame >= q.end) { done++; out += q.to; }
        else if (frame >= q.start) {
          if (!q.ch || Math.random() < 0.3) q.ch = chars[Math.floor(Math.random() * chars.length)];
          out += `<span style="opacity:0.4">${q.ch}</span>`;
        }
      }
      el.innerHTML = out;
      frame++;
      if (done === queue.length) { el.textContent = text; clearInterval(inner); inner = 0; }
    }, 38);
  };
  window.setInterval(() => { wi = (wi + 1) % words.length; scrambleTo(words[wi]); }, 2900);
}
