'use client';

import { m } from 'framer-motion';
import { useAnchor } from '@/hooks/use-anchor';
import { slideInFromTop } from '@/lib/motion';
import NavButton from '@/components/ui/nav-button';
import LazyMotionLayout from '@/components/ui/lazy-motion';

interface SateliteContentProps {
  sateliteView: string;
}

export default function Nav({ sateliteView }: SateliteContentProps) {
  const currentAnchor = useAnchor();

  return (
    <nav className='w-full flex justify-center pt-5 z-30'>
      <LazyMotionLayout>
        <m.div
          initial='hidden'
          animate='visible'
          // variants={slideInFromTop(0.5)}
          className='bg-black bg-opacity-30 py-3 px-7 flex gap-3 rounded-full backdrop-blur-lg'
        >
          <NavButton
            name='CP'
            anchor='/satelite/CP'
            active={sateliteView === 'CP'}
          />
          <NavButton
            name='KI'
            anchor='/satelite/KI'
            active={sateliteView === 'KI'}
          />
          <NavButton
            name='LI'
            anchor='/satelite/LI'
            active={sateliteView === 'LI'}
          />
          <NavButton
            name='TT'
            anchor='/satelite/TT'
            active={sateliteView === 'TT'}
          />
          <NavButton
            name='SI'
            anchor='/satelite/SI'
            active={sateliteView === 'SI'}
            hideMobile
          />
        </m.div>
      </LazyMotionLayout>
    </nav>
  );
}
