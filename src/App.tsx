import { gql, useQuery } from "@apollo/client";

type Lesson = {
  id: string;
  title: string;
  slug: string;
  teacher: {
    id: string;
    name: string;
  };
};

type QueryData = {
  lessons: Lesson[];
};

const GET_LESSONS_QUERY = gql`
  query {
    lessons {
      id
      title
      slug
      teacher {
        id
        name
      }
    }
  }
`;

function App() {
  const { data, loading } = useQuery<QueryData>(GET_LESSONS_QUERY);

  if (loading) return <span>Loading...</span>;

  return (
    <ul>
      {data?.lessons.map((lesson) => (
        <li key={lesson.id}>{lesson.title}</li>
      ))}
    </ul>
  );
}

export default App;
