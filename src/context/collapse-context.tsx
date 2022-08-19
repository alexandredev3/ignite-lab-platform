import { createContext, ReactNode, useLayoutEffect, useState } from "react";
import { useMediaQuery } from "react-responsive";

interface CollapseProviderProps {
  children: ReactNode;
}

interface CollapseContextProps {
  hasCollapsed: boolean;
  isHovering: boolean;
  isTableOrMobile: boolean;
  toggleCollapse: () => void;
  onMouseEnter: () => void;
  onMouseLeave: () => void;
}

type CollapsedState = {
  isHovering: boolean;
  hasCollapsed: boolean;
}

const CollapseContext = createContext<CollapseContextProps>(
  {} as CollapseContextProps
);

const LOCAL_STORAGE_COLLAPSED_KEY = "ignite-lab-player/sidebar-collapsed";

const initialCollapsedState = {
  isHovering: false,
  hasCollapsed: true,
};

function CollapseProvider({ children }: CollapseProviderProps) {
  const [collapsed, setCollapsed] = useState<CollapsedState>(initialCollapsedState);
  const isTableOrMobile = useMediaQuery({ maxWidth: 768 }, undefined, (matched) => {
    if (matched) {
      setCollapsed(initialCollapsedState);
    }
  });

  function toggleCollapse() {
    const hasCollapsed = !collapsed.hasCollapsed;

    setCollapsed({
      ...collapsed,
      hasCollapsed,
    });

    localStorage.setItem(
      LOCAL_STORAGE_COLLAPSED_KEY,
      JSON.stringify(hasCollapsed)
    );
  }

  function onMouseEnter() {
    setCollapsed({
      ...collapsed,
      isHovering: true,
    });
  }

  function onMouseLeave() {
    setCollapsed({
      ...collapsed,
      isHovering: false,
    });
  }

  useLayoutEffect(() => {
    let shouldBeCollapsed = true;
    
    if (!isTableOrMobile) {
      const hasCollapsedStorage = localStorage.getItem(LOCAL_STORAGE_COLLAPSED_KEY);

      if (hasCollapsedStorage) {
        shouldBeCollapsed = JSON.parse(hasCollapsedStorage);
      }
    }

    setCollapsed({
      isHovering: false,
      hasCollapsed: shouldBeCollapsed,
    });
  }, []);

  return (
    <CollapseContext.Provider
      value={{
        hasCollapsed: collapsed.hasCollapsed,
        isHovering: collapsed.isHovering,
        isTableOrMobile,
        toggleCollapse,
        onMouseEnter,
        onMouseLeave,
      }}
    >
      {children}
    </CollapseContext.Provider>
  );
}

export { CollapseContext, CollapseProvider };
