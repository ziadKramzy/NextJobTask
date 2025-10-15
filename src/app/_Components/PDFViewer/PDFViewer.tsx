"use client";
import React from 'react';
import { X } from 'lucide-react';

interface PDFViewerProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function PDFViewer({ isOpen, onClose }: PDFViewerProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white rounded-lg shadow-xl w-full h-full max-w-7xl max-h-screen m-4 flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b">
          <h2 className="text-xl font-semibold">Course Overview</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
        
        {/* PDF Content */}
        <div className="flex-1 p-4 overflow-auto">
          <div className="bg-gray-50 rounded-lg p-8 text-center">
            <div className="max-w-4xl mx-auto">
              <h3 className="text-2xl font-bold mb-6">Starting SEO as your Home - Course Overview</h3>
              
              <div className="grid md:grid-cols-2 gap-8 text-left">
                <div>
                  <h4 className="text-lg font-semibold mb-4">Course Description</h4>
                  <p className="text-gray-700 mb-4">
                    This comprehensive SEO course will teach you everything you need to know about Search Engine Optimization. 
                    From basic concepts to advanced strategies, you'll learn how to optimize your website and content for better search rankings.
                  </p>
                  
                  <h4 className="text-lg font-semibold mb-4">What You'll Learn</h4>
                  <ul className="list-disc list-inside text-gray-700 space-y-2">
                    <li>SEO fundamentals and best practices</li>
                    <li>Keyword research and analysis</li>
                    <li>On-page and off-page optimization</li>
                    <li>Technical SEO implementation</li>
                    <li>Content optimization strategies</li>
                    <li>Analytics and performance tracking</li>
                  </ul>
                </div>
                
                <div>
                  <h4 className="text-lg font-semibold mb-4">Course Structure</h4>
                  <div className="space-y-3">
                    <div className="border-l-4 border-blue-500 pl-4">
                      <h5 className="font-medium">Week 1-2: Foundation</h5>
                      <p className="text-sm text-gray-600">Basic SEO concepts and setup</p>
                    </div>
                    <div className="border-l-4 border-green-500 pl-4">
                      <h5 className="font-medium">Week 3-4: Implementation</h5>
                      <p className="text-sm text-gray-600">Practical optimization techniques</p>
                    </div>
                    <div className="border-l-4 border-purple-500 pl-4">
                      <h5 className="font-medium">Week 5-6: Advanced</h5>
                      <p className="text-sm text-gray-600">Advanced strategies and tools</p>
                    </div>
                  </div>
                  
                  <h4 className="text-lg font-semibold mb-4 mt-6">Requirements</h4>
                  <ul className="list-disc list-inside text-gray-700 space-y-1">
                    <li>Basic understanding of websites</li>
                    <li>Access to a website or blog</li>
                    <li>Google Analytics account (free)</li>
                    <li>No prior SEO experience required</li>
                  </ul>
                </div>
              </div>
              
              <div className="mt-8 p-6 bg-blue-50 rounded-lg">
                <h4 className="text-lg font-semibold mb-2">Ready to Start?</h4>
                <p className="text-gray-700">
                  This course is designed for beginners and intermediate learners who want to master SEO. 
                  Each week builds upon the previous one, ensuring a comprehensive learning experience.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
