import { useParams } from "react-router-dom";

import { Video } from "../components/video";

type Params = {
  slug: string;
};

export function Lesson() {
  const { slug } = useParams<Params>();

  return <Video slug={slug!} />;
}
