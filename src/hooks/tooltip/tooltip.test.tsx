import { renderHook, act } from '@testing-library/react';
import useTooltip from './tooltip';

describe('useTooltip Hook', () => {
  test('should initialize with default values', () => {
    const { result } = renderHook(() => useTooltip());
    expect(result.current.isVisible).toBe(false);
    expect(result.current.content).toBe('');
  });

  test('should show tooltip with content', () => {
    const { result } = renderHook(() => useTooltip());
    act(() => {
      result.current.showTooltip('Test Content');
    });
    expect(result.current.isVisible).toBe(true);
    expect(result.current.content).toBe('Test Content');
  });

  test('should hide tooltip', () => {
    const { result } = renderHook(() => useTooltip());
    act(() => {
      result.current.showTooltip('Test Content');
      result.current.hideTooltip();
    });
    expect(result.current.isVisible).toBe(false);
  });
});