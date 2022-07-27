import { List, X } from "phosphor-react";

import { useCollapse } from "../hooks/use-collapse";

import { Logo } from "./logo";

export function Header() {
  const { isCollapse, toggleCollapse } = useCollapse();

  return (
    <header className="w-full p-5 flex md:justify-center justify-between items-center bg-gray-700 border-b border-gray-600">
      <Logo />

      <div className="md:hidden block">
        <button
          onClick={toggleCollapse}
          aria-labelledby="Botão para abrir o menu de aulas"
          className="flex items-center"
        >
          <span className="text-gray-100 text-lg mr-[7px]">Aulas</span>
          {isCollapse ? (
            <List size={42} color="#81D8F7" />
          ) : (
            <X size={42} color="#81D8F7" />
          )}
        </button>
      </div>
    </header>
  );
}
