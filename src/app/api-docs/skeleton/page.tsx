"use client";

import React, { useState } from 'react';
import { ArrowLeft, Copy, Download, ExternalLink } from 'lucide-react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import Layout from '@/components/layout/Layout';
import PageHeading from '@/components/ui/PageHeading';
// import { Button } from '@/components/ui/button';
// import InfoBox from '@/components/ui/InfoBox';
// import SwaggerUI from 'swagger-ui-react';
// import 'swagger-ui-react/swagger-ui.css';
import { useToast } from '@/hooks/use-toast';
import TableOfContents from '@/components/ui/TableOfContents';

const apiInfo = {
      name: 'AnalyticsHQ',
      description: 'Comprehensive analytics API for tracking user behavior and engagement.',
      documentation: {
        overview: `
          The AnalyticsHQ API allows you to track user events, analyze user behavior, and generate insights 
        from your application data. This API provides endpoints for tracking events, creating custom 
        dashboards, and exporting analytics data in various formats.
        `,
        endpoint: {
            name: 'Get User Profile',
            method: 'GET',
            path: '/users/{user_id}',
            description: 'Retrieve a user profile with associated events and properties',
            parameters: [
              { name: 'user_id', type: 'string', required: true, description: 'Unique identifier for the user' },
              { name: 'include_events', type: 'boolean', required: false, description: 'Include user events in response' },
            ],
            response: '{ "user_id": "usr_123456", "first_seen": "2023-01-15T00:00:00Z", "properties": {}, "events": [...] }',
          },
        codeExamples: {
          javascript: `
  javascript code
          `,
          python: `
  python code
          `,
          curl: `
  curl command
          `
        }
      }
  };


const AnalyticsHQ = () => {
    const [selectedLanguage, setSelectedLanguage] = useState<'javascript' | 'python' | 'curl'>('javascript');
    const { toast } = useToast();
    
    // Find the specific API documentation
  
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
                method={apiInfo.documentation.endpoint.method}
                path={apiInfo.documentation.endpoint.path}
              />
  
          <div className="mb-8">
            {/* <InfoBox>
              Need help integrating this API? Our support team is available to assist you. Contact us at <a href="mailto:support@devscribe.com" className="text-devscribe-teal hover:underline">support@devscribe.com</a>
            </InfoBox> */}
          </div>
          
          <section id="overview" className="mt-12">
                <h2 className="text-2xl font-semibold mb-4">Overview</h2>
                <div className="bg-devscribe-card-bg border border-devscribe-border rounded-xl p-6">
                  <p className="text-devscribe-text-secondary ">{apiInfo.documentation.overview}</p>
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
                  <code>{apiInfo.documentation.codeExamples[selectedLanguage]}</code>
                </pre>
                <button 
                  onClick={() => copyToClipboard(apiInfo.documentation.codeExamples[selectedLanguage])} 
                  className="absolute top-4 right-4 text-devscribe-text-secondary hover:text-white p-1 rounded-md hover:bg-devscribe-hover-bg"
                >
                  <Copy size={16} />
                </button>
            </div>
            </div>
          </section>

          <section id="input" className="mt-12">
                <h2 className="text-2xl font-semibold mb-6">Input Parameters</h2>
                <div className="space-y-6">
                  {/* {apiInfo.documentation.endpoints.map((endpoint, index) => ( */}
                    <div className="bg-devscribe-card-bg border border-devscribe-border rounded-xl overflow-hidden">
                      {/* <div className="flex items-center p-6 border-b border-devscribe-border">
                        <span className={`px-2 py-1 rounded text-xs font-medium mr-3 ${
                          endpoint.method === 'GET' ? 'bg-blue-500/20 text-blue-400' :
                          endpoint.method === 'POST' ? 'bg-green-500/20 text-green-400' :
                          endpoint.method === 'PUT' ? 'bg-yellow-500/20 text-yellow-400' :
                          endpoint.method === 'DELETE' ? 'bg-red-500/20 text-red-400' :
                          'bg-purple-500/20 text-purple-400'
                        }`}>
                          {endpoint.method}
                        </span>
                        <span className="font-mono text-devscribe-teal">{endpoint.path}</span>
                      </div> */}
                      
                      <div className="p-6">
                        <h3 className="text-lg font-medium mb-2">{apiInfo.documentation.endpoint.name}</h3>
                        <p className="text-devscribe-text-secondary mb-6">{apiInfo.documentation.endpoint.description}</p>
                        
                        <h4 className="text-sm font-medium text-devscribe-text-secondary mb-2">Parameters</h4>
                        <div className="overflow-x-auto mb-6">
                          <table className="w-full text-sm">
                            <thead>
                              <tr className="border-b border-devscribe-border">
                                <th className="text-left py-2 pr-4 font-medium">Name</th>
                                <th className="text-left py-2 pr-4 font-medium">Type</th>
                                <th className="text-left py-2 pr-4 font-medium">Required</th>
                                <th className="text-left py-2 pr-4 font-medium">Description</th>
                              </tr>
                            </thead>
                            <tbody>
                              {apiInfo.documentation.endpoint.parameters.map((param, pIndex) => (
                                <tr key={pIndex} className="border-b border-devscribe-border/50">
                                  <td className="py-2 pr-4 font-mono">{param.name}</td>
                                  <td className="py-2 pr-4">{param.type}</td>
                                  <td className="py-2 pr-4">{param.required ? 'Yes' : 'No'}</td>
                                  <td className="py-2 pr-4 text-devscribe-text-secondary">{param.description}</td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                        
                        <h4 className="text-sm font-medium text-devscribe-text-secondary mb-2">Response</h4>
                        <div className="bg-black/20 p-4 rounded font-mono text-sm overflow-x-auto">
                          {apiInfo.documentation.endpoint.response}
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
          