import { describe, test, expect, vi } from 'vitest';
import { renderHook, act, waitFor } from '@testing-library/react';
import { useAsync } from '../hooks/useAsync.js';
import { useDebounced } from '../hooks/useDebounced.js';

describe('useAsync', () => {
  test('hasil permintaan lama diabaikan setelah deps berubah', async () => {
    let selesaikanLambat;
    const lambat = new Promise((r) => {
      selesaikanLambat = r;
    });
    const ambil = (x) => (x === 1 ? lambat : Promise.resolve('dua'));
    const { result, rerender } = renderHook(({ x }) => useAsync(() => ambil(x), [x]), { initialProps: { x: 1 } });
    rerender({ x: 2 });
    await waitFor(() => expect(result.current.data).toBe('dua'));
    await act(async () => {
      selesaikanLambat('satu');
    });
    expect(result.current.data).toBe('dua');
  });
});

describe('useDebounced', () => {
  test('nilai baru berlaku setelah jeda', () => {
    vi.useFakeTimers();
    const { result, rerender } = renderHook(({ v }) => useDebounced(v, 300), { initialProps: { v: 'a' } });
    rerender({ v: 'ab' });
    expect(result.current).toBe('a');
    act(() => {
      vi.advanceTimersByTime(300);
    });
    expect(result.current).toBe('ab');
  });
});
