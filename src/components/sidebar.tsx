import { ReactNode, useLayoutEffect, useState } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";

import { useGetLessonsQuery } from "../graphql/generated";
import { useCollapse } from "../hooks/use-collapse";

import { Lesson } from "./lesson";

interface SidebarContainerProps {
  children: ReactNode;
}

export function Sidebar() {
  const { loading, data } = useGetLessonsQuery();
  const { isCollapse } = useCollapse();

  return (
    <SidebarContainer>
      <AnimatePresence>
        {!isCollapse && (
          <motion.aside
            // mt-[83px] -> 83px is the header height.
            className="md:static z-50 md:mt-0 mt-[83px] md:w-[348px] md:overflow-auto w-full absolute top-0 h-auto bg-gray-700 p-6 border-l border-gray-600"
            variants={{
              show: {
                opacity: 1,
                translateX: 0
              },
              hidden: {
                opacity: 0,
                translateX: '100vw'
              }
            }}
            initial="hidden"
            animate="show"
            exit="hidden"
            transition={{
              bounce: 0
            }}
          >
            <span className="block font-bold text-2xl pb-6 mb-6 border-b border-gray-500">
              Cronograma de aulas
            </span>

            {loading ? null : (
              <div className="flex flex-col gap-8">
                {data?.lessons.map((lesson) => (
                  <Lesson
                    key={lesson.id}
                    title={lesson.title}
                    slug={lesson.slug}
                    availableAt={new Date(lesson.availableAt)}
                    type={lesson.lessonType}
                  />
                ))}
              </div>
            )}
          </motion.aside>
        )}
      </AnimatePresence>
    </SidebarContainer>
  );
}

export function SidebarContainer({ children }: SidebarContainerProps) {
  const { isTableOrMobile } = useCollapse();
  const [wrapperElement, setWrapperElement] = useState<HTMLElement | null>(
    null
  );

  useLayoutEffect(() => {
    if (isTableOrMobile) {
      const sidebarWrapperId = "sidebar-wrapper";

      let wrapperElement = document.getElementById(sidebarWrapperId);

      if (!wrapperElement) {
        const body = document.body;

        wrapperElement = document.createElement("div");
        wrapperElement.setAttribute("id", sidebarWrapperId);
        body.appendChild(wrapperElement);
      }

      setWrapperElement(wrapperElement);

      return () => {
        wrapperElement?.remove();
      };
    }
  }, []);

  return (
    <>{wrapperElement ? createPortal(children, wrapperElement) : children}</>
  );
}
