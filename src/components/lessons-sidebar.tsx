import { Transition, Portal } from "@headlessui/react";

import { useGetLessonsQuery } from "../graphql/generated";
import { useCollapse } from "../hooks/use-collapse";

import { Lesson } from "./lesson";

export function LessonsSidebar() {
  const { hasCollapsed, isTableOrMobile } = useCollapse();
  const { loading, data } = useGetLessonsQuery();

  const content = (
    <Transition
      show={!hasCollapsed}
      enter="transition-opacity duration-555"
      enterFrom="opacity-0"
      enterTo="opacity-100"
      leave="transition-opacity duration-555"
      leaveFrom="opacity-100"
      leaveTo="opacity-0"
    >
      <aside
        // mt-[81px] -> 81px is the header height.
        className="md:static z-50 md:mt-0 mt-[81px] md:w-[348px] w-full absolute top-0 left-0 bg-gray-700 p-6 border-gray-600"
      >
        <span className="block font-bold text-2xl pb-6 mb-6 border-gray-500">
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
      </aside>
    </Transition>
  );

  return isTableOrMobile ? <Portal>{content}</Portal> : content;
}
