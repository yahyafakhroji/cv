import { test, expect } from 'bun:test';
import { sortExperience } from './content';

test('sorts experience entries by numeric filename prefix', () => {
  const input = [
    { id: '03-equinix', data: {} },
    { id: '01-datum', data: {} },
    { id: '02-mugglepay', data: {} },
  ];
  const out = sortExperience(input).map((e) => e.id);
  expect(out).toEqual(['01-datum', '02-mugglepay', '03-equinix']);
});

test('handles ids without a numeric prefix by pushing them last', () => {
  const input = [{ id: 'zeta' }, { id: '02-b' }, { id: '01-a' }];
  const out = sortExperience(input).map((e) => e.id);
  expect(out).toEqual(['01-a', '02-b', 'zeta']);
});
