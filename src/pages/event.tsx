import { Navigate } from "react-router-dom";
import { useGetFirstAvailableLessonQuery } from "../graphql/generated";

export function Event() {
  const { data, loading } = useGetFirstAvailableLessonQuery();

  if (loading) {
    return null;
  }

  return <Navigate to={`/event/lesson/${data?.lessons[0].slug}`} replace />;
}
