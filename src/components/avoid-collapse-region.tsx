import { ReactNode } from 'react';
import { useCollapse } from '../hooks/use-collapse';

interface AvoidCollapseRegionProps {
  children: ReactNode;
}

export function AvoidCollapseRegion({ children }: AvoidCollapseRegionProps ) {
  const { onMouseEnter, onMouseLeave } = useCollapse();

  return (
    <div
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      {children}
    </div>
  )
}
