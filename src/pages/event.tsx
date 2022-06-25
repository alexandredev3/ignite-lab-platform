import { Navigate } from "react-router-dom";
import { gql, useQuery } from "@apollo/client";

type GetFirstLessonQueryResponse = {
  lessons: {
    id: string;
    slug: string;
  }[];
};

const GET_FIRST_LESSON = gql`
  query Lesson {
    lessons(orderBy: availableAt_ASC, stage: PUBLISHED, first: 1) {
      id
      slug
    }
  }
`;

export function Event() {
  const { data, loading } =
    useQuery<GetFirstLessonQueryResponse>(GET_FIRST_LESSON);

  if (loading) {
    return null;
  }

  return <Navigate to={`/event/lesson/${data?.lessons[0].slug}`} replace />;
}
