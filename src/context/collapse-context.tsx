import { createContext, ReactNode, useEffect, useState } from "react";
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

const CollapseContext = createContext<CollapseContextProps>(
  {} as CollapseContextProps
);

const LOCAL_STORAGE_COLLAPSED_KEY = "ignite-lab-player/sidebar-collapsed";

function CollapseProvider({ children }: CollapseProviderProps) {
  const [collapsed, setCollapsed] = useState({
    isHovering: false,
    hasCollapsed: false,
  });
  const isTableOrMobile = useMediaQuery({ maxWidth: 768 });

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

  useEffect(() => {
    const hasCollapsed = localStorage.getItem(LOCAL_STORAGE_COLLAPSED_KEY);

    if (hasCollapsed) {
      setCollapsed({
        isHovering: false,
        hasCollapsed: JSON.parse(hasCollapsed),
      });
    } else {
      setCollapsed({
        isHovering: false,
        hasCollapsed: isTableOrMobile,
      });
    }
  }, [isTableOrMobile]);

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
