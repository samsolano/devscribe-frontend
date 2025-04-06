import React from 'react';
import { usePathname } from 'next/navigation';

const Sidebar = () => {
  const location = usePathname();

  return (
    <aside className="w-64 h-[calc(100vh-4rem)] overflow-y-auto pt-4 border-r border-codium-border fixed top-16 left-0 bg-codium-dark-gray">
      <div className="flex flex-col h-full">
        <nav className="mt-4">
          <ul className="space-y-2">
            <li>
            <a href="/prompting"> link to prompt testing</a>
            </li>
          </ul>
        </nav>
      </div>
    </aside>
  );


};

export default Sidebar;