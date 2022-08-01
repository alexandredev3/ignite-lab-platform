import { Outlet } from 'react-router-dom';

import { Header } from './components/header';
import { CollapseProvider } from './context/collapse-context';

export function Layout() {
  return (
    <CollapseProvider>
      <div className="flex flex-col min-h-screen">
        <Header />
        <main className="flex flex-1">
          <Outlet />
        </main>
      </div>
    </CollapseProvider>
  );
}