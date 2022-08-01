import { List, X } from "phosphor-react";

import { useCollapse } from "../hooks/use-collapse";

import { Logo } from "./logo";

export function Header() {
  const { hasCollapsed, toggleCollapse } = useCollapse();

  return (
    <header className="w-full p-5 gap-[8px] flex md:justify-center justify-between items-center bg-gray-700 border-b border-gray-600">
      <Logo />

      <div className="md:hidden block">
        <button
          onClick={toggleCollapse}
          aria-labelledby="Botão para abrir o menu de aulas"
          className="flex items-center"
        >
          <span className="text-gray-100 text-lg mr-[7px]">Aulas</span>
          {hasCollapsed ? (
            <List color="#81D8F7" className="w-10 h-10" />
          ) : (
            <X color="#81D8F7" className="w-10 h-10" />
          )}
        </button>
      </div>
    </header>
  );
}
