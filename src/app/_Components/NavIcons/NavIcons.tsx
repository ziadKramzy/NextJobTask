"use client"
import React from 'react'
import AskAQuestion from '../Ask/Ask'
import ExamPopup from '../ExamPopup/ExamPopup'
import LeaderBoard from '../LeaderBoard/LeaderBoard'

export default function NavIcons() {
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      });
    }
  };

  return (
    <div className="flex justify-start gap-3 items-center p-4">

      {/* Course Material section */}
      <div className="relative group">
        <button 
          onClick={() => scrollToSection('course-material')}
          className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
          title="Course Material"
        >
          <svg
            className="w-6 h-6 text-gray-600 group-hover:text-blue-600 transition-colors"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
            />
          </svg>
        </button>
      </div>
      {/* Comment section */}
      <div className="relative group">
        <button 
          onClick={() => window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' })}
          className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
          title="Comments"
        >
          <svg
            className="w-6 h-6 text-gray-600 group-hover:text-blue-600 transition-colors"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
                d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
            />
          </svg>
        </button>
      </div>
          
        
      
      {/* Ask a question section */}
      <AskAQuestion />

      {/* Leader Board popup */}
      <LeaderBoard />

      {/* Exam popup */}
      <ExamPopup />
      
    </div>
  )
}
