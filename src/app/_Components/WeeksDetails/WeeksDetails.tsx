"use client";
import React, { useState } from 'react'
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
  } from "@/components/ui/accordion"
import { Button } from "@/components/ui/button";
import { FileText, Play, Clock, HelpCircle } from 'lucide-react';
import PDFViewer from '../PDFViewer/PDFViewer';
import QuizPDFViewer from '../QuizPDFViewer/QuizPDFViewer';

interface WeeksDetailsProps {
  isPurchased: boolean;
}

export default function WeeksDetails({ isPurchased }: WeeksDetailsProps) {
  const [isPDFOpen, setIsPDFOpen] = useState(false);
  const [isQuizOpen, setIsQuizOpen] = useState(false);
  const [selectedQuiz, setSelectedQuiz] = useState<{title: string, questions: number} | null>(null);

  const WeeksMockData = [
    {
      id: 1,
      number: '1-2',
      description: 'SEO Fundamentals and Setup',
      lessons: [
        { id: 1, title: 'What is SEO?', duration: '15 MIN', hasQuiz: false },
        { id: 2, title: 'Search Engine Basics', duration: '20 MIN', hasQuiz: true, quizQuestions: 3 },
        { id: 3, title: 'Setting Up Google Analytics', duration: '25 MIN', hasQuiz: false },
        { id: 4, title: 'Keyword Research Tools', duration: '30 MIN', hasQuiz: true, quizQuestions: 5 },
      ]
    },
    {
      id: 2,
      number: '3-4',
      description: 'On-Page Optimization Techniques',
      lessons: [
        { id: 5, title: 'Title Tags Optimization', duration: '18 MIN', hasQuiz: false },
        { id: 6, title: 'Meta Descriptions', duration: '22 MIN', hasQuiz: true, quizQuestions: 2 },
        { id: 7, title: 'Header Structure (H1-H6)', duration: '28 MIN', hasQuiz: false },
        { id: 8, title: 'Internal Linking Strategy', duration: '35 MIN', hasQuiz: true, quizQuestions: 4 },
      ]
    },
    {
      id: 3,
      number: '5-6',
      description: 'Advanced SEO Strategies',
      lessons: [
        { id: 9, title: 'Technical SEO Audit', duration: '40 MIN', hasQuiz: false },
        { id: 10, title: 'Site Speed Optimization', duration: '32 MIN', hasQuiz: true, quizQuestions: 3 },
        { id: 11, title: 'Mobile SEO Best Practices', duration: '25 MIN', hasQuiz: false },
        { id: 12, title: 'Local SEO Optimization', duration: '38 MIN', hasQuiz: true, quizQuestions: 6 },
      ]
    },
  ];

  const handleVideoClick = (lessonTitle: string) => {
    alert(`Opening video for: ${lessonTitle}`);
  };

  const handleQuizClick = (lessonTitle: string, questionCount: number) => {
    setSelectedQuiz({ title: lessonTitle, questions: questionCount });
    setIsQuizOpen(true);
  };

  return (
    <>
      {/* Course Overview Button */}
      <div className="mb-4">
        <Button
          onClick={() => setIsPDFOpen(true)}
          className="w-full flex items-center gap-2 bg-blue-600 hover:bg-blue-700"
        >
          <FileText className="w-4 h-4" />
          Course Overview
        </Button>
      </div>

      {/* Weeks Content */}
      <div className='flex flex-col gap-4'>
        {WeeksMockData.map((week: any) => (
          <div key={week.id} className='border border-gray-300 py-5 px-4 rounded-lg shadow-sm'>
            <h3 className='text-lg font-medium py-3'>Week {week.number}</h3>
            <p className='text-sm text-gray-500 border-b pb-3 mb-4'>{week.description}</p>
            
            <Accordion
              type="single"
              collapsible
              className="w-full"
              disabled={!isPurchased}
            >
              {week.lessons.map((lesson: any, index: number) => (
                <AccordionItem key={lesson.id} value={`week-${week.id}-lesson-${lesson.id}`}>
                  <AccordionTrigger 
                    className={`flex items-center gap-2 ${!isPurchased ? 'opacity-50 cursor-not-allowed' : ''}`}
                  >
                    <div className="flex items-center gap-2 flex-1">
                      <FileText className="w-4 h-4 text-gray-500" />
                      <span>{lesson.title}</span>
                      {lesson.hasQuiz && (
                        <span className="text-xs bg-green-100 text-green-600 px-2 py-1 rounded">
                          {lesson.quizQuestions} QUESTIONS
                        </span>
                      )}
                    </div>
                    <div className="flex items-center gap-1 text-red-500 text-sm">
                      <Clock className="w-3 h-3" />
                      <span>{lesson.duration}</span>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="flex flex-col gap-4">
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <p className="text-sm text-gray-700 mb-4">
                        Learn about {lesson.title.toLowerCase()} in this comprehensive lesson. 
                        This topic is essential for understanding modern SEO practices.
                      </p>
                      
                      <div className="flex items-center justify-between">
                        <div className="text-sm text-gray-600">
                          Duration: {lesson.duration}
                          {lesson.hasQuiz && (
                            <span className="ml-2 text-green-600">
                              • Quiz: {lesson.quizQuestions} questions
                            </span>
                          )}
                        </div>
                        
                        <div className="flex items-center gap-2">
                          
                          {lesson.hasQuiz ? (
                            <Button
                              onClick={() => handleQuizClick(lesson.title, lesson.quizQuestions)}
                              className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white"
                              size="sm"
                            >
                              <HelpCircle className="w-4 h-4" />
                              Take Quiz
                            </Button>
                          ) : <Button
                          onClick={() => handleVideoClick(lesson.title)}
                          className="flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white"
                          size="sm"
                        >
                          <Play className="w-4 h-4" />
                          Go to Video
                        </Button>
                        }
                        </div>
                      </div>
                    </div>
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
            
            {!isPurchased && (
              <div className="mt-4 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                <p className="text-sm text-yellow-700 text-center">
                  🔒 Purchase the course to access all lessons and content
                </p>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* PDF Viewer */}
      <PDFViewer isOpen={isPDFOpen} onClose={() => setIsPDFOpen(false)} />
      
      {/* Quiz PDF Viewer */}
      {selectedQuiz && (
        <QuizPDFViewer
          isOpen={isQuizOpen}
          onClose={() => {
            setIsQuizOpen(false);
            setSelectedQuiz(null);
          }}
          lessonTitle={selectedQuiz.title}
          questionCount={selectedQuiz.questions}
        />
      )}
    </>
  )
}
