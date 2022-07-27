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
  const [isCollapse, setIsCollapse] = useState(true);
  const isTableOrMobile = useMediaQuery({ maxWidth: 768 });

  function handleToggleCollapse() {
    setIsCollapse(!isCollapse);
  }

  useEffect(() => {
    if (isTableOrMobile) {
      setIsCollapse(true);
    } else {
      setIsCollapse(false);
    }
  }, [isTableOrMobile]);

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
