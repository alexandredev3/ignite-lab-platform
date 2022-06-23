import { Header } from "../components/header";
import { Video } from "../components/video";
import { Sidebar } from "../components/sidebar";

export function Event() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex flex-1">
        <Video />
        <Sidebar />
      </main>
    </div>
  );
}
