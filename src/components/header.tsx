import { motion } from "framer-motion";
import { CaretDoubleLeft, CaretDoubleRight, List, X } from "phosphor-react";

import { AvoidCollapseRegion } from "./avoid-collapse-region";
import { Logo } from "./logo";

import { useCollapse } from "../hooks/use-collapse";

export function Header() {
  const { hasCollapsed, isHovering, isTableOrMobile, toggleCollapse } =
    useCollapse();

  return (
    <header className="w-full p-5 gap-[8px] flex justify-center items-center bg-gray-700 border-b border-gray-600">
      <div className="md:w-full md:flex md:justify-center">
        <Logo className="md:w-[237px] w-[192px]" />
      </div>

      <div className="flex flex-1 justify-end">
        {isTableOrMobile ? (
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
        ) : (
          <AvoidCollapseRegion>
            <button
              onClick={toggleCollapse}
              aria-label={`Botão para ${
                hasCollapsed
                  ? "Abrir sidebar de aulas"
                  : "Fechar sidebar de aulas"
              }`}
              className="mr-[14px]"
            >
              <motion.div
                initial="rest"
                whileHover="hover"
                animate={isHovering ? "hover" : "rest"}
              >
                {hasCollapsed ? (
                  <>
                    <motion.div
                      variants={{
                        rest: {
                          opacity: 0,
                          display: "none",
                        },
                        hover: {
                          opacity: 1,
                          display: "block",
                        },
                      }}
                    >
                      <CaretDoubleLeft
                        color="#81D8F7"
                        className="w-10 h-10"
                      />
                    </motion.div>
                    <motion.div
                      variants={{
                        rest: {
                          opacity: 1,
                          display: "block",
                        },
                        hover: {
                          opacity: 0,
                          display: "none",
                        },
                      }}
                    >
                      <List color="#81D8F7" className="w-10 h-10" />
                    </motion.div>
                  </>
                ) : (
                  <CaretDoubleRight color="#81D8F7" className="w-10 h-10" />
                )}
              </motion.div>
            </button>
          </AvoidCollapseRegion>
        )}
      </div>
    </header>
  );
}
