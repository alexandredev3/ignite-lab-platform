import { Lesson } from "./lesson";

import { useGetLessonsQuery } from "../graphql/generated";

export function Sidebar() {
  const { loading, data } = useGetLessonsQuery();

  return (
    <aside className="w-[348px] bg-gray-700 p-6 border-l border-gray-600">
      <span className="block font-bold text-2xl pb-6 mb-6 border-b border-gray-500">
        Cronograma de aulas
      </span>

      {loading ? null : (
        <div className="flex flex-col gap-8">
          {data?.lessons.map((lesson) => (
            <Lesson
              title={lesson.title}
              slug={lesson.slug}
              availableAt={new Date(lesson.availableAt)}
              type={lesson.lessonType}
            />
          ))}
        </div>
      )}
    </aside>
  );
}
