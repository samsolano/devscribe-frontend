import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const DashboardSidebar = () => {
  const location = usePathname();

  return (
    <aside className="w-64 h-[calc(100vh-4rem)] overflow-y-auto overflow-x-hidden pt-4 border-r border-codium-border fixed top-16 left-0 bg-codium-dark-gray 
      scrollbar-thin scrollbar-track-devscribe-dark-gray scrollbar-thumb-devscribe-hover-bg/80 hover:scrollbar-thumb-devscribe-hover-bg/90"
    >
      <div className="flex flex-col h-full">
      <nav className="mt-4">
          <ul className="space-y-2">
            <li>
              <Link href="/api-docs/endpoint1" className="block px-4 py-2 text-codium-foreground hover:bg-codium-border">
                API Doc 1
              </Link>
            </li>
            <li>
              <Link href="/api-docs/endpoint2" className="block px-4 py-2 text-codium-foreground hover:bg-codium-border">
                API Doc 2
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </aside>
  );
};

export default DashboardSidebar;
