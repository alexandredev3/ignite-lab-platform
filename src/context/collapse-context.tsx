import { createContext, ReactNode, useEffect, useState } from "react";
import { useMediaQuery } from "react-responsive";

interface CollapseProviderProps {
  children: ReactNode;
}

interface CollapseContextProps {
  hasCollapsed: boolean;
  toggleCollapse: () => void;
  isTableOrMobile: boolean;
}

const CollapseContext = createContext<CollapseContextProps>(
  {} as CollapseContextProps
);

function CollapseProvider({ children }: CollapseProviderProps) {
  const [hasCollapsed, setHasCollapsed] = useState(false);
  const isTableOrMobile = useMediaQuery({ maxWidth: 768 });

  function toggleCollapse() {
    setHasCollapsed(!hasCollapsed);
  }

  useEffect(() => {
    setHasCollapsed(isTableOrMobile);
  }, [isTableOrMobile])

  return (
    <CollapseContext.Provider
      value={{
        hasCollapsed,
        toggleCollapse,
        isTableOrMobile
      }}
    >
      {children}
    </CollapseContext.Provider>
  );
}

export { CollapseContext, CollapseProvider };
