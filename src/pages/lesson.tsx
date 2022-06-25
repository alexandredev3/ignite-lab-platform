import { useParams } from "react-router-dom";

import { Header } from "../components/header";
import { Video } from "../components/video";
import { Sidebar } from "../components/sidebar";

type Params = {
  slug: string;
};

export function Lesson() {
  const { slug } = useParams<Params>();

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex flex-1">
        <Video slug={slug!} />
        <Sidebar />
      </main>
    </div>
  );
}
