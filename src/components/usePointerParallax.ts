import { useEffect, useRef } from 'react';
import { usePrefersReducedMotion } from '../hooks';
import type { RefObject } from 'react';

/**
 * Subtle pointer-parallax hook for hero / stage elements.
 * Translates/rotates a target element toward the pointer with heavy
 * smoothing (rAF lerp), using only transform. Disabled for coarse
 * pointers, touch, or reduced motion.
 */
export function usePointerParallax<T extends HTMLElement>(maxTilt = 7, maxShift = 14): RefObject<T> {
  const targetRef = useRef<T | null>(null);
  const reduced = usePrefersReducedMotion();

  useEffect(() => {
    const el = targetRef.current;
    if (!el || reduced) return;
    if (typeof window === 'undefined') return;
    if (window.matchMedia('(pointer: coarse)').matches) return;

    let raf = 0;
    let tx = 0;
    let ty = 0;
    let cx = 0;
    let cy = 0;

    const onMove = (e: PointerEvent) => {
      const nx = (e.clientX / window.innerWidth - 0.5) * 2;
      const ny = (e.clientY / window.innerHeight - 0.5) * 2;
      tx = Math.max(-1, Math.min(1, nx));
      ty = Math.max(-1, Math.min(1, ny));
    };

    const tick = () => {
      cx += (tx - cx) * 0.06;
      cy += (ty - cy) * 0.06;
      el.style.setProperty('--px', cx.toFixed(3));
      el.style.setProperty('--py', cy.toFixed(3));
      el.style.transform =
        `translate3d(${(cx * maxShift).toFixed(2)}px, ${(cy * maxShift).toFixed(2)}px, 0) ` +
        `rotateY(${(cx * maxTilt).toFixed(2)}deg) rotateX(${(-cy * maxTilt).toFixed(2)}deg)`;
      raf = requestAnimationFrame(tick);
    };

    window.addEventListener('pointermove', onMove, { passive: true });
    raf = requestAnimationFrame(tick);
    return () => {
      window.removeEventListener('pointermove', onMove);
      cancelAnimationFrame(raf);
    };
  }, [reduced, maxTilt, maxShift]);

  return targetRef;
}
