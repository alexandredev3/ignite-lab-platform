import { Routes, Route } from "react-router-dom";

import { Layout } from './layout';

import { Event } from "./pages/event";
import { Lesson } from "./pages/lesson";
import { Subscribe } from "./pages/subscribe";

export function Router() {
  return (
    <Routes>
      <Route path="/" element={<Subscribe />} />
      <Route path="/event" element={<Layout />}>
        <Route index element={<Event />} />
        <Route path="/event/lesson/:slug" element={<Lesson />} />
      </Route>
      <Route path="*" element={<h1>Not Found</h1>} />
      {/*TODO: Build a decent not found component.*/}
    </Routes>
  );
}
