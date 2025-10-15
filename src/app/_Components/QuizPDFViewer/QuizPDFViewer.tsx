"use client";
import React from 'react';
import { X, Clock, CheckCircle, Circle } from 'lucide-react';

interface QuizPDFViewerProps {
  isOpen: boolean;
  onClose: () => void;
  lessonTitle: string;
  questionCount: number;
}

export default function QuizPDFViewer({ isOpen, onClose, lessonTitle, questionCount }: QuizPDFViewerProps) {
  if (!isOpen) return null;

  // Mock quiz questions based on lesson title
  const getQuizQuestions = (title: string, count: number) => {
    const questionTemplates = {
      "Search Engine Basics": [
        {
          question: "What does SEO stand for?",
          options: ["Search Engine Optimization", "Social Engine Optimization", "System Engine Optimization", "Software Engine Optimization"],
          correct: 0
        },
        {
          question: "Which search engine has the largest market share?",
          options: ["Bing", "Google", "Yahoo", "DuckDuckGo"],
          correct: 1
        },
        {
          question: "What is the main purpose of search engines?",
          options: ["To display ads", "To organize and rank web content", "To store user data", "To create websites"],
          correct: 1
        }
      ],
      "Keyword Research Tools": [
        {
          question: "What is the primary purpose of keyword research?",
          options: ["To find competitor websites", "To understand what users are searching for", "To create social media content", "To design websites"],
          correct: 1
        },
        {
          question: "Which tool is most commonly used for keyword research?",
          options: ["Google Analytics", "Google Keyword Planner", "Facebook Insights", "Instagram Analytics"],
          correct: 1
        },
        {
          question: "What does 'search volume' refer to?",
          options: ["Number of websites", "Number of monthly searches", "Number of competitors", "Number of ads"],
          correct: 1
        },
        {
          question: "What is a long-tail keyword?",
          options: ["A very long website URL", "A specific, multi-word phrase", "A competitor's brand name", "A technical term"],
          correct: 1
        },
        {
          question: "What does 'keyword difficulty' measure?",
          options: ["How hard it is to type", "How competitive a keyword is", "How long the keyword is", "How expensive ads are"],
          correct: 1
        }
      ],
      "Meta Descriptions": [
        {
          question: "What is the recommended length for a meta description?",
          options: ["50-60 characters", "150-160 characters", "200-300 characters", "No limit"],
          correct: 1
        },
        {
          question: "What is the primary purpose of a meta description?",
          options: ["To improve page speed", "To provide a summary for search results", "To hide content from users", "To increase page rank"],
          correct: 1
        }
      ],
      "Internal Linking Strategy": [
        {
          question: "What is the main benefit of internal linking?",
          options: ["To increase external traffic", "To help search engines understand site structure", "To reduce page load time", "To hide content"],
          correct: 1
        },
        {
          question: "What type of anchor text is most effective for internal links?",
          options: ["Click here", "Read more", "Descriptive, keyword-rich text", "Generic words"],
          correct: 2
        },
        {
          question: "How many internal links per page is generally recommended?",
          options: ["1-2 links", "3-5 links", "5-10 links", "As many as possible"],
          correct: 2
        },
        {
          question: "What is link equity?",
          options: ["The cost of links", "The value passed through links", "The speed of links", "The color of links"],
          correct: 1
        }
      ],
      "Site Speed Optimization": [
        {
          question: "What is the recommended page load time for good SEO?",
          options: ["Under 1 second", "Under 3 seconds", "Under 5 seconds", "Under 10 seconds"],
          correct: 1
        },
        {
          question: "Which factor most affects page load speed?",
          options: ["Page title", "Image file sizes", "Meta descriptions", "Internal links"],
          correct: 1
        },
        {
          question: "What is browser caching?",
          options: ["Storing website data locally", "Deleting browser history", "Clearing cookies", "Updating browsers"],
          correct: 0
        }
      ],
      "Local SEO Optimization": [
        {
          question: "What is the most important factor for local SEO?",
          options: ["Social media presence", "Google My Business listing", "Website design", "Email marketing"],
          correct: 1
        },
        {
          question: "What does NAP stand for in local SEO?",
          options: ["Name, Address, Phone", "Network, Analytics, Performance", "Navigation, Accessibility, Performance", "New, Advanced, Premium"],
          correct: 0
        },
        {
          question: "Which type of content is most valuable for local SEO?",
          options: ["Global news", "Local reviews and testimonials", "International products", "Foreign languages"],
          correct: 1
        },
        {
          question: "What is a local citation?",
          options: ["A legal document", "A mention of your business online", "A local newspaper article", "A government permit"],
          correct: 1
        },
        {
          question: "Which Google feature shows local businesses on maps?",
          options: ["Google Analytics", "Google My Business", "Google AdWords", "Google Search Console"],
          correct: 1
        },
        {
          question: "What is the best practice for local business hours?",
          options: ["Keep them secret", "Update them regularly", "Never change them", "Only show weekends"],
          correct: 1
        }
      ]
    };

    const questions = questionTemplates[title as keyof typeof questionTemplates] || [
      {
        question: "What is the main topic of this lesson?",
        options: ["Option A", "Option B", "Option C", "Option D"],
        correct: 0
      }
    ];

    return questions.slice(0, count);
  };

  const questions = getQuizQuestions(lessonTitle, questionCount);

  return (
    <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white rounded-lg shadow-xl w-full h-full max-w-4xl max-h-screen m-4 flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b">
          <div>
            <h2 className="text-xl font-semibold">Quiz: {lessonTitle}</h2>
            <p className="text-sm text-gray-600">{questionCount} Questions</p>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
        
        {/* Quiz Content */}
        <div className="flex-1 p-6 overflow-auto">
          <div className="max-w-3xl mx-auto">
            {/* Quiz Instructions */}
            <div className="bg-blue-50 rounded-lg p-4 mb-6">
              <h3 className="font-semibold text-blue-900 mb-2">Quiz Instructions</h3>
              <ul className="text-sm text-blue-800 space-y-1">
                <li>• Read each question carefully</li>
                <li>• Select the best answer for each question</li>
                <li>• You can review and change your answers before submitting</li>
                <li>• Good luck!</li>
              </ul>
            </div>

            {/* Questions */}
            <div className="space-y-6">
              {questions.map((q, index) => (
                <div key={index} className="border rounded-lg p-6">
                  <div className="flex items-start gap-3 mb-4">
                    <div className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-semibold">
                      {index + 1}
                    </div>
                    <h4 className="text-lg font-medium text-gray-800 flex-1">
                      {q.question}
                    </h4>
                  </div>
                  
                  <div className="space-y-3 ml-11">
                    {q.options.map((option, optionIndex) => (
                      <label key={optionIndex} className="flex items-center gap-3 cursor-pointer p-3 rounded-lg hover:bg-gray-50 transition-colors">
                        <input
                          type="radio"
                          name={`question-${index}`}
                          className="sr-only"
                        />
                        <Circle className="w-5 h-5 text-gray-400" />
                        <span className="text-gray-700">{option}</span>
                      </label>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            {/* Submit Button */}
            <div className="mt-8 flex justify-center">
              <button className="bg-green-600 hover:bg-green-700 text-white px-8 py-3 rounded-lg font-semibold flex items-center gap-2">
                <CheckCircle className="w-5 h-5" />
                Submit Quiz
              </button>
            </div>

            {/* Timer */}
            <div className="mt-4 flex justify-center">
              <div className="flex items-center gap-2 text-gray-600">
                <Clock className="w-4 h-4" />
                <span className="text-sm">Time remaining: 15:00</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
