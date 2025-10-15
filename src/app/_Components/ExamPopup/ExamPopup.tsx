"use client";
import React, { useState, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { Button } from "@/components/ui/button";
import { Clock, ChevronLeft, ChevronRight, CheckCircle } from "lucide-react";

export default function ExamPopup() {
  const [isOpen, setIsOpen] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(1);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [timeLeft, setTimeLeft] = useState(600);
  const [answers, setAnswers] = useState<{[key: number]: string}>({});
  const [isCompleted, setIsCompleted] = useState(false);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  // Mock quiz data
  const questions = [
    {
      id: 1,
      question: "Among the following states of India, which one has the oldest rock formations in the country?",
      options: ["Asam", "Bihar", "Karnataka", "Uttar Pradesh"],
      correct: "Bihar"
    },
    {
      id: 2,
      question: "What is the capital of India?",
      options: ["Mumbai", "Delhi", "Kolkata", "Chennai"],
      correct: "Delhi"
    },
    {
      id: 3,
      question: "Which is the largest state in India by area?",
      options: ["Maharashtra", "Uttar Pradesh", "Rajasthan", "Madhya Pradesh"],
      correct: "Rajasthan"
    },
    {
      id: 4,
      question: "What is the national animal of India?",
      options: ["Lion", "Tiger", "Elephant", "Peacock"],
      correct: "Tiger"
    },
    {
      id: 5,
      question: "Which river is considered the holiest in India?",
      options: ["Yamuna", "Ganga", "Godavari", "Narmada"],
      correct: "Ganga"
    }
  ];

  // Timer effect
  useEffect(() => {
    if (isOpen && !isCompleted) {
      timerRef.current = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            setIsCompleted(true);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    } else {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    }

    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, [isOpen, isCompleted]);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    try {
      const savedTime = window.localStorage.getItem('examTimeLeft');
      const savedAnswers = window.localStorage.getItem('examAnswers');
      if (savedTime) setTimeLeft(parseInt(savedTime));
      if (savedAnswers) setAnswers(JSON.parse(savedAnswers));
    } catch {}
  }, []);

  // Save time and answers to localStorage
  useEffect(() => {
    if (typeof window === 'undefined') return;
    try {
      window.localStorage.setItem('examTimeLeft', timeLeft.toString());
    } catch {}
  }, [timeLeft]);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    try {
      window.localStorage.setItem('examAnswers', JSON.stringify(answers));
    } catch {}
  }, [answers]);

  // Load current question answer when changing questions
  useEffect(() => {
    setSelectedAnswer(answers[currentQuestion] || null);
  }, [currentQuestion, answers]);

  // Check if all questions are answered
  useEffect(() => {
    const answeredQuestions = Object.keys(answers).length;
    setIsCompleted(answeredQuestions === questions.length || timeLeft === 0);
  }, [answers, questions.length, timeLeft]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const handleAnswerSelect = (option: string) => {
    setSelectedAnswer(option);
    setAnswers(prev => ({
      ...prev,
      [currentQuestion]: option
    }));
  };

  const handleNext = () => {
    if (currentQuestion < questions.length) {
      setCurrentQuestion(currentQuestion + 1);
    }
  };

  const handlePrevious = () => {
    if (currentQuestion > 1) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  const handleSubmit = () => {
    // Calculate score
    let score = 0;
    questions.forEach(q => {
      if (answers[q.id] === q.correct) {
        score++;
      }
    });

    // Show results (you can customize this)
    alert(`Exam completed! Your score: ${score}/${questions.length} (${Math.round((score/questions.length) * 100)}%)`);
    
    // Reset exam data
    if (typeof window !== 'undefined') {
      try {
        window.localStorage.removeItem('examTimeLeft');
        window.localStorage.removeItem('examAnswers');
      } catch {}
    }
    setTimeLeft(572);
    setAnswers({});
    setCurrentQuestion(1);
    setSelectedAnswer(null);
    setIsCompleted(false);
    setIsOpen(false);
  };

  const handleClose = () => {
    setIsOpen(false);
  };

  const currentQ = questions[currentQuestion - 1];

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="relative group p-2 rounded-lg hover:bg-gray-100 transition-colors"
        title="Exam"
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
            d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
          />
        </svg>
      </button>

      {/* Full Screen Exam Modal */}
      {isOpen && createPortal(
        <div className="fixed inset-0 w-screen h-screen bg-white z-[9999] flex flex-col">
          {/* Header */}
          <div className="bg-blue-900 text-white p-4 relative flex-shrink-0">
            <button
              onClick={handleClose}
              className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white hover:text-gray-300"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            
            <div className="flex justify-center items-center mb-3">
              <div className="bg-yellow-400 text-black px-3 py-1 rounded-lg flex items-center gap-2">
                <Clock className="w-4 h-4" />
                <span className="font-semibold">{formatTime(timeLeft)}</span>
              </div>
            </div>

            {/* Question indicators */}
            <div className="flex justify-center gap-2">
              {questions.map((_, index) => {
                const questionNum = index + 1;
                const isAnswered = answers[questionNum];
                const isCurrent = questionNum === currentQuestion;
                
                return (
                  <div
                    key={index}
                    className={`w-8 h-8 rounded-full border-2 flex items-center justify-center text-sm font-medium ${
                      isCurrent
                        ? 'bg-blue-400 border-blue-400 text-white'
                        : isAnswered
                        ? 'bg-green-400 border-green-400 text-white'
                        : 'border-white text-white'
                    }`}
                  >
                    {isAnswered ? (
                      <CheckCircle className="w-4 h-4" />
                    ) : (
                      questionNum
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Question Content */}
          <div className="flex-1 p-6 flex flex-col justify-between">
            <div className="flex-1">
              <h3 className="text-xl font-medium text-gray-800 mb-6">
                {currentQuestion}. {currentQ.question}
              </h3>

              <div className="space-y-4">
                {currentQ.options.map((option, index) => (
                  <button
                    key={index}
                    onClick={() => handleAnswerSelect(option)}
                    className={`w-full p-4 rounded-lg border-2 text-left transition-all ${
                      selectedAnswer === option
                        ? 'border-blue-500 bg-blue-50 text-blue-900'
                        : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                    }`}
                  >
                    <div className="flex items-center gap-4">
                      <div className={`w-6 h-6 rounded border-2 flex items-center justify-center ${
                        selectedAnswer === option
                          ? 'border-blue-500 bg-blue-500'
                          : 'border-gray-300'
                      }`}>
                        {selectedAnswer === option && (
                          <div className="w-3 h-3 bg-white rounded-full"></div>
                        )}
                      </div>
                      <span className="text-lg">{option}</span>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Navigation */}
            <div className="flex justify-between mt-8">
              <Button
                variant="outline"
                onClick={handlePrevious}
                disabled={currentQuestion === 1}
                className="flex items-center gap-2 px-6 py-3"
              >
                <ChevronLeft className="w-5 h-5" />
                Previous
              </Button>
              
              {isCompleted ? (
                <Button
                  onClick={handleSubmit}
                  className="flex items-center gap-2 bg-green-600 hover:bg-green-700 px-6 py-3"
                >
                  <CheckCircle className="w-5 h-5" />
                  Submit Exam
                </Button>
              ) : (
                <Button
                  onClick={handleNext}
                  disabled={currentQuestion === questions.length}
                  className="flex items-center gap-2 px-6 py-3"
                >
                  Next
                  <ChevronRight className="w-5 h-5" />
                </Button>
              )}
            </div>
          </div>
        </div>,
        document.body
      )}
    </>
  );
}
