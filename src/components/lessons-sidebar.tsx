import { Portal } from "@headlessui/react";
import { motion, AnimatePresence } from "framer-motion";
import classname from "classnames";

import { Lesson } from "./lesson";
import { AvoidCollapseRegion } from "./avoid-collapse-region";

import { useGetLessonsQuery } from "../graphql/generated";
import { useCollapse } from "../hooks/use-collapse";

const show = {
  display: "block",
  translateX: 0,
  opacity: 1,
};

const hidden = {
  translateX: "228px",
  opacity: 0,
};

export function LessonsSidebar() {
  const { hasCollapsed, isHovering, isTableOrMobile } = useCollapse();
  const { loading, data } = useGetLessonsQuery();

  const animate =
    !hasCollapsed || isHovering
      ? show
      : {
          ...hidden,
          transitionEnd: {
            display: "none",
          },
        };

  const content = (
    <AnimatePresence>
      <motion.aside
        // mt-[81px] -> 81px is the header height.
        className={classname(
          "z-50 md:w-[348px] w-full bg-gray-700 p-6 border-gray-600",
          {
            "absolute mt-[81px] top-0 right-0": hasCollapsed || isTableOrMobile,
          }
        )}
        variants={{
          show,
          hidden,
        }}
        animate={animate}
        exit="hidden"
        transition={{
          bounce: 0,
          ease: "easeInOut",
          duration: 0.3,
        }}
      >
        <span className="block font-bold text-2xl border-gray-500">
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
    </AnimatePresence>
  );

  return isTableOrMobile ? (
    <Portal>{content}</Portal>
  ) : (
    <AvoidCollapseRegion>
      {hasCollapsed && (
        <div className="absolute right-0 w-[82px] -mt-[25px] h-screen" />
      )}
      {content}
    </AvoidCollapseRegion>
  );
}
