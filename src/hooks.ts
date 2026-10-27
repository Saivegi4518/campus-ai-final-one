import { useEffect, useState, useRef } from 'react';

/** True when the user prefers reduced motion (live-updates on change). */
export function usePrefersReducedMotion(): boolean {
  const [reduced, setReduced] = useState<boolean>(() =>
    typeof window !== 'undefined' && typeof window.matchMedia === 'function'
      ? window.matchMedia('(prefers-reduced-motion: reduce)').matches
      : false,
  );

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    const onChange = (e: MediaQueryListEvent) => setReduced(e.matches);
    mq.addEventListener('change', onChange);
    setReduced(mq.matches);
    return () => mq.removeEventListener('change', onChange);
  }, []);

  return reduced;
}

/** True once the page has scrolled past `threshold` px (for navbar state). */
export function useScrolled(threshold = 24): boolean {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    let raf = 0;
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => setScrolled(window.scrollY > threshold));
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('scroll', onScroll);
    };
  }, [threshold]);

  return scrolled;
}

/** Intersection-observer reveal hook.
 * Returns a ref callback + `visible` flag. Adds `.is-visible` friendly state
 * for CSS-driven, transform/opacity-only reveals.
 */
export function useReveal<T extends HTMLElement = HTMLDivElement>(threshold = 0.15) {
  const [ref, setRef] = useState<T | null>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (!ref) return;
    if (typeof IntersectionObserver === 'undefined') {
      setVisible(true);
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setVisible(true);
            io.disconnect();
          }
        }
      },
      { threshold, rootMargin: '0px 0px -8% 0px' },
    );
    io.observe(ref);
    return () => io.disconnect();
  }, [ref, threshold]);

  return { ref: setRef, visible };
}

/** Page Visibility hook — returns true when tab is visible.
 * Used to pause animations when tab hidden to save CPU/battery.
 */
export function usePageVisibility(): boolean {
  const [visible, setVisible] = useState<boolean>(() =>
    typeof document !== 'undefined' ? !document.hidden : true,
  );

  useEffect(() => {
    const onChange = () => setVisible(!document.hidden);
    document.addEventListener('visibilitychange', onChange);
    setVisible(!document.hidden);
    return () => document.removeEventListener('visibilitychange', onChange);
  }, []);

  return visible;
}

/** Low-power mode detector.
 * Returns true when device likely lacks power for heavy effects:
 * - hardwareConcurrency <= 4 cores
 * - deviceMemory <= 4 GB
 * - pointer: coarse (touch screen)
 */
export function useLowPowerMode(): boolean {
  const [lite, setLite] = useState<boolean>(false);

  useEffect(() => {
    if (typeof navigator === 'undefined') {
      setLite(false);
      return;
    }

    const hwCon = navigator.hardwareConcurrency ?? 8;
    const devMem =
      (navigator as Navigator & { deviceMemory?: number }).deviceMemory ?? 8;
    const pointerCoarse =
      typeof window.matchMedia === 'function' &&
      window.matchMedia('(pointer: coarse)').matches;

    const isLite =
      hwCon <= 4 ||
      devMem <= 4 ||
      pointerCoarse;

    setLite(isLite);
  }, []);

  return lite;
}

/**
 * Scroll-spy hook for active nav link highlighting.
 * Returns the currently active section id based on IntersectionObserver.
 */
export function useScrollSpy(sectionIds: string[], offset = 0): string | null {
  const [activeId, setActiveId] = useState<string | null>(null);

  useEffect(() => {
    if (typeof window === 'undefined' || typeof IntersectionObserver === 'undefined') {
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        let current = null;
        for (const entry of entries) {
          if (entry.isIntersecting) {
            current = entry.target.id;
          }
        }
        setActiveId(current);
      },
      {
        rootMargin: `-${offset}px 0px -${window.innerHeight * 0.6}px 0px`,
        threshold: 0.6,
      },
    );

    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [sectionIds, offset]);

  return activeId;
}

/**
 * Shared pointer-parallax manager.
 * Uses a single rAF loop for all parallax layers to save performance.
 */
export function useSharedParallax() {
  const layers = useRef<Map<HTMLElement, { maxTilt: number; maxShift: number }>>(
    new Map(),
  );
  const rafRef = useRef<number>(0);
  const pointerRef = useRef<{ x: number; y: number }>({ x: 0, y: 0 });
  const reducedRef = useRef<boolean>(false);

  // Update pointer position
  useEffect(() => {
    if (typeof window === 'undefined') return;
    const onMove = (e: PointerEvent) => {
      const nx = (e.clientX / window.innerWidth - 0.5) * 2;
      const ny = (e.clientY / window.innerHeight - 0.5) * 2;
      pointerRef.current.x = Math.max(-1, Math.min(1, nx));
      pointerRef.current.y = Math.max(-1, Math.min(1, ny));
    };
    window.addEventListener('pointermove', onMove, { passive: true });
    return () => window.removeEventListener('pointermove', onMove);
  }, []);

  // Shared RAF loop
  useEffect(() => {
    if (typeof window === 'undefined') return;
    const tick = () => {
      if (!reducedRef.current) {
        const { x, y } = pointerRef.current;
        layers.current.forEach((props, el) => {
          const tx = x * props.maxShift;
          const ty = y * props.maxShift;
          const rx = y * props.maxTilt;
          const ry = -x * props.maxTilt;
          el.style.transform = `translate3d(${tx}px, ${ty}px, 0) rotateY(${rx}deg) rotateX(${ry}deg)`;
        });
      }
      rafRef.current = requestAnimationFrame(tick);
    };
    rafRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafRef.current);
  }, []);

  return (el: HTMLElement, maxTilt = 7, maxShift = 14) => {
    layers.current.set(el, { maxTilt, maxShift });
    // Cleanup on unmount
    return () => layers.current.delete(el);
  };
}