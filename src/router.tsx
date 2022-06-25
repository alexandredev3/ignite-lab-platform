import { Routes, Route } from "react-router-dom";

import { Event } from "./pages/event";
import { Lesson } from "./pages/lesson";

export function Router() {
  return (
    <Routes>
      <Route path="/" element={<h1>Home</h1>} />
      <Route path="/event" element={<Event />} />
      <Route path="/event/lesson/:slug" element={<Lesson />} />
      <Route path="*" element={<h1>Not Found</h1>} />
      {/*TODO: Build a decent not found component.*/}
    </Routes>
  );
}
