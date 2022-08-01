import { createContext, ReactNode, useEffect, useState } from "react";
import { useMediaQuery } from "react-responsive";

interface CollapseProviderProps {
  children: ReactNode;
}

interface CollapseContextProps {
  isCollapse: boolean;
  toggleCollapse: () => void;
  isTableOrMobile: boolean;
}

const CollapseContext = createContext<CollapseContextProps>(
  {} as CollapseContextProps
);

function CollapseProvider({ children }: CollapseProviderProps) {
  const isTableOrMobile = useMediaQuery({ maxWidth: 768 });
  const [isCollapse, setIsCollapse] = useState(() => {
    if (isTableOrMobile) {
      return true;
    }

    return false;
  });

  function handleToggleCollapse() {
    setIsCollapse(!isCollapse);
  }

  return (
    <CollapseContext.Provider
      value={{
        isCollapse,
        toggleCollapse: handleToggleCollapse,
        isTableOrMobile
      }}
    >
      {children}
    </CollapseContext.Provider>
  );
}

export { CollapseContext, CollapseProvider };
