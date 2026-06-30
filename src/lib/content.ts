export function sortExperience<T extends { id: string }>(entries: T[]): T[] {
  const rank = (id: string): number => {
    const m = id.match(/^(\d+)/);
    return m ? Number(m[1]) : Number.POSITIVE_INFINITY;
  };
  return [...entries].sort((a, b) => rank(a.id) - rank(b.id));
}
