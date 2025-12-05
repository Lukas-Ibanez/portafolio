'use client';

import { useEffect } from 'react';
import { initGSAP } from '@/lib/gsap-config';

export default function GSAPProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    initGSAP();
  }, []);

  return <>{children}</>;
}
