import React from 'react';

interface PageHeadingProps {
  title: string;
  description?: string;
  method: string;
  path: string;
}

const PageHeading: React.FC<PageHeadingProps> = ({ title, description, method, path }) => {
  return (
    <div className="mb-10 animate-fade-in">
      <div className='flex justify-between'>
        {/* <div className="text-white text-sm font-medium mb-2">{subtitle}</div> */}
        <h1 className="text-3xl font-semibold mb-3">{title}</h1>
        <div className="flex items-center">
            <span className={`px-2 py-1 rounded text-xs font-medium mr-3 ${
              method === 'GET' ? 'bg-blue-500/20 text-blue-400' :
              method === 'POST' ? 'bg-green-500/20 text-green-400' :
              method === 'PUT' ? 'bg-yellow-500/20 text-yellow-400' :
              method === 'DELETE' ? 'bg-red-500/20 text-red-400' :
              'bg-purple-500/20 text-purple-400'
            }`}>
              {method}
            </span>
            <span className="font-mono text-devscribe-teal">{path}</span>
        </div>
      </div>
      {description && <p className="text-devscribe-text-secondary pt-2 max-w-xl">{description}</p>}
    </div>
  );
};

export default PageHeading;
