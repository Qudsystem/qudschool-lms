import React, { useEffect, useRef, useState } from 'react';
import useInView from '../hooks/useInView';
import useI18n from '../hooks/useI18n';

interface AnimatedCounterProps {
  end: number;
  duration?: number;
  decimals?: number;
  prefix?: string;
  suffix?: string;
  useGrouping?: boolean;
  className?: string;
}

const AnimatedCounter: React.FC<AnimatedCounterProps> = ({
  end,
  duration = 1800,
  decimals = 0,
  prefix = '',
  suffix = '',
  useGrouping = true,
  className,
}) => {
  const { language } = useI18n();
  const { ref, inView } = useInView<HTMLSpanElement>({ once: true, threshold: 0.4 });
  const [value, setValue] = useState(0);
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    if (!inView) return;

    const start = performance.now();
    const tick = (now: number) => {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setValue(end * eased);
      if (progress < 1) {
        rafRef.current = requestAnimationFrame(tick);
      }
    };
    rafRef.current = requestAnimationFrame(tick);

    return () => {
      if (rafRef.current !== null) cancelAnimationFrame(rafRef.current);
    };
  }, [inView, end, duration]);

  // Arabic locale renders Eastern Arabic numerals (٠١٢٣...) with the correct
  // Arabic thousands separator, matching the rest of the UI. English uses Latin.
  const formatted = value.toLocaleString(language === 'ar' ? 'ar-EG' : 'en-US', {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
    useGrouping,
  });

  return (
    <span ref={ref} className={className}>
      {prefix}
      {formatted}
      {suffix}
    </span>
  );
};

export default AnimatedCounter;
