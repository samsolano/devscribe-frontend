"use client";

import React, { useState } from 'react';
import { Copy } from 'lucide-react';
import Layout from '@/components/layout/Layout';
import PageHeading from '@/components/ui/PageHeading';
import { useToast } from '@/hooks/use-toast';
import TableOfContents from '@/components/ui/TableOfContents';


// Info to be rendered on doc

const apiInfo = {
    name: 'Title',
    description: 'Short description',
    overview: `Overview`,
    endpoint: {
        method: 'GET',
        path: '/events',
          parameters: [
            { name: 'user_id', type: 'string', description: 'Unique identifier for the user' },
            { name: 'include_events', type: 'boolean', description: 'Include user events in response' },
          ],
          response: '{ "user_id": "usr_123456", "first_seen": "2023-01-15T00:00:00Z", "properties": {}, "events": [...] }',
        },
    codeExamples: {
        javascript: `javascript code`,
        python: `python code`,
        curl: `curl command`
      }
  };


const AnalyticsHQ = () => {
    const [selectedLanguage, setSelectedLanguage] = useState<'javascript' | 'python' | 'curl'>('javascript');
    const { toast } = useToast();
  
    // Table of Contents items
    const tocItems = [
      { id: 'overview', title: 'Overview' },
      { id: 'code-examples', title: 'Code Examples' },
      { id: 'input', title: 'Input Parameters'},
      { id: 'output', title: 'Output'},
      { id: 'api-playground', title: 'API Playground' },
    ];
  
    // Utility function to copy to clipboard
    const copyToClipboard = (text: string) => {
      navigator.clipboard.writeText(text);
      toast({
        title: "Copied to clipboard",
        description: "The code snippet has been copied to your clipboard.",
      });
    };
   
    return (
      <Layout>
      <div className="flex">
        <div className="flex-1 px-12 py-10 max-w-4xl">
              <PageHeading
                title={apiInfo.name}
                description={apiInfo.description}
                method={apiInfo.endpoint.method}
                path={apiInfo.endpoint.path}
              />
  
          {/* <div className="mb-8">
            <InfoBox>
              Need help integrating this API? Our support team is available to assist you. Contact us at <a href="mailto:support@devscribe.com" className="text-devscribe-teal hover:underline">support@devscribe.com</a>
            </InfoBox>
          </div> */}
          
          <section id="overview" className="mt-12">
                <h2 className="text-2xl font-semibold mb-4">Overview</h2>
                <div className="bg-devscribe-card-bg border border-devscribe-border rounded-xl p-6">
                  <p className="text-devscribe-text-secondary ">{apiInfo.overview}</p>
                </div>
          </section>
  
          {/* <section id="authentication" className="mt-12">
            <h2 className="text-2xl font-semibold mb-4">Authentication</h2>
            <div className="bg-devscribe-card-bg border border-devscribe-border rounded-xl p-6">
              <p className="text-devscribe-text-secondary">{apiInfo.authentication}</p>
                  </div>
          </section> */}
          
  
          <section id="code-examples" className="mt-12">
            <h2 className="text-2xl font-semibold mb-6">Code Examples</h2>
            <div className="bg-devscribe-card-bg border border-devscribe-border rounded-xl overflow-hidden">
              <div className="flex border-b border-devscribe-border">
                {(['javascript', 'python', 'curl'] as const).map((lang) => (
                  <button 
                    key={lang}
                    className={`px-4 py-3 text-sm ${selectedLanguage === lang ? 'bg-black/20 text-white' : 'text-devscribe-text-secondary'}`}
                    onClick={() => setSelectedLanguage(lang)}
                  >
                    {lang.charAt(0).toUpperCase() + lang.slice(1)}
                  </button>
                ))}
              </div>
              
              <div className="relative">
                <pre className="p-6 overflow-x-auto text-sm">
                  <code>{apiInfo.codeExamples[selectedLanguage]}</code>
                </pre>
                <button 
                  onClick={() => copyToClipboard(apiInfo.codeExamples[selectedLanguage])} 
                  className="absolute top-4 right-4 text-devscribe-text-secondary hover:text-white p-1 rounded-md hover:bg-devscribe-hover-bg"
                >
                  <Copy size={16} />
                </button>
            </div>
            </div>
          </section>

          {/* Input Parameters */}
          <section id="input" className="mt-12">
                <h2 className="text-2xl font-semibold mb-6">Input Parameters</h2>
                <div className="space-y-6">
                    <div className="bg-devscribe-card-bg border border-devscribe-border rounded-xl overflow-hidden">
                      <div className="p-6">
                        <div className="overflow-x-auto mb-6">
                          <table className="w-full text-sm">
                            <thead>
                              <tr className="border-b border-devscribe-border">
                                <th className="text-left py-2 pr-4 font-medium">Name</th>
                                <th className="text-left py-2 pr-4 font-medium">Type</th>
                                {/* <th className="text-left py-2 pr-4 font-medium">Required</th> */}
                                <th className="text-left py-2 pr-4 font-medium">Description</th>
                              </tr>
                            </thead>
                            <tbody>
                              {apiInfo.endpoint.parameters.map((param, pIndex) => (
                                <tr key={pIndex} className="border-b border-devscribe-border/50">
                                  <td className="py-2 pr-4 font-mono">{param.name}</td>
                                  <td className="py-2 pr-4">{param.type}</td>
                                  {/* <td className="py-2 pr-4">{param.required ? 'Yes' : 'No'}</td> */}
                                  <td className="py-2 pr-4 text-devscribe-text-secondary">{param.description}</td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                        
                        <h4 className="text-sm font-medium text-devscribe-text-secondary mb-2">Response</h4>
                        <div className="bg-black/20 p-4 rounded font-mono text-sm overflow-x-auto">
                          {apiInfo.endpoint.response}
                        </div>
                      </div>
                    </div>
                
                </div>
          </section>
  
          {/* <section id="api-explorer" className="mt-12">
            <h2 className="text-2xl font-semibold mb-6">API Explorer</h2>
            <div className="mb-6 flex justify-between items-center">
                This is where to add the api testing
          </div>
          </section> */}
        </div>
        
        <div className="w-64 px-6 py-10">
          <TableOfContents items={tocItems} />
        </div>
      </div>
      </Layout>
    );
  };
  
  export default AnalyticsHQ;
          