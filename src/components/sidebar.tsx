import { gql, useQuery } from "@apollo/client";

import { Lesson } from "./lesson";

import { LessonsType } from "../typings";

type GetLessonsQueryResponse = {
  lessons: {
    id: string;
    title: string;
    slug: string;
    lessonType: LessonsType;
    availableAt: string;
  }[];
};

const GET_LESSONS = gql`
  query Lessons {
    lessons(orderBy: availableAt_ASC, stage: PUBLISHED) {
      id
      title
      slug
      lessonType
      availableAt
    }
  }
`;

export function Sidebar() {
  const { loading, data } = useQuery<GetLessonsQueryResponse>(GET_LESSONS);

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
