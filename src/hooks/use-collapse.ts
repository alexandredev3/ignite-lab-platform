import { useContext } from 'react';

import { CollapseContext } from '../context/collapse-context';

export function useCollapse() {
  const context = useContext(CollapseContext);

  if (context === undefined) {
    throw new Error('useCollapse must be used within a CollapseProvider');
  }

  return context;
}