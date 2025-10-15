"use client";
import React, { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

export default function LeaderBoard() {
  const [isOpen, setIsOpen] = useState(false);

  // Mock leaderboard data
  const leaderboardData = [
    { rank: 1, name: "Ahmed Ali", score: 95, avatar: "👨‍💼" },
    { rank: 2, name: "Sara Mohamed", score: 92, avatar: "👩‍💼" },
    { rank: 3, name: "Omar Hassan", score: 89, avatar: "👨‍🎓" },
    { rank: 4, name: "Fatima Ahmed", score: 87, avatar: "👩‍🎓" },
    { rank: 5, name: "Youssef Ibrahim", score: 85, avatar: "👨‍🔬" },
    { rank: 6, name: "Aisha Khalil", score: 83, avatar: "👩‍🔬" },
  ];

  const currentUserRank = 15; // Mock current user rank
  const currentUserPercentage = 6; // Mock percentage
  const currentUserGrade = 75; // Mock user grade

  // Dynamic motivational messages based on grade
  const motivationalMessages = [
    {
      gradeRange: [0, 60],
      message: "Don't give up! Every expert was once a beginner. Focus on understanding the fundamentals and keep practicing. You've got this! 💪",
      emoji: "🌱"
    },
    {
      gradeRange: [60, 70],
      message: "Great progress! You're building a solid foundation. Keep up the consistent effort and you'll see even better results. Well done! 🎯",
      emoji: "📈"
    },
    {
      gradeRange: [70, 80],
      message: "Excellent work! Your performance is above average and you're on the right track. Keep pushing forward to reach the top tier! 🚀",
      emoji: "⭐"
    },
    {
      gradeRange: [80, 90],
      message: "Outstanding performance! You're in the top tier of students. Your dedication is paying off - keep up this excellent work! 🏆",
      emoji: "🎖️"
    },
    {
      gradeRange: [90, 100],
      message: "Exceptional achievement! You're among the top performers. Your mastery of the material is impressive - you're setting the standard! 👑",
      emoji: "👑"
    }
  ];

  // Find the appropriate message based on user's grade
  const getMotivationalMessage = (grade: number) => {
    return motivationalMessages.find(msg => 
      grade >= msg.gradeRange[0] && grade < msg.gradeRange[1]
    ) || motivationalMessages[0];
  };

  const userMessage = getMotivationalMessage(currentUserGrade);

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="relative group p-2 rounded-lg hover:bg-gray-100 transition-colors"
        title="Leader Board"
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
            d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
          />
        </svg>
      </button>

      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="max-w-md mx-auto p-0 overflow-hidden bg-white rounded-xl">
          {/* Header */}
          <DialogHeader className="p-6 text-center">
            <p className="text-sm text-gray-500 mb-2">Starting SEO as your Home</p>
            <DialogTitle className="text-2xl font-bold text-black">Leaderboard</DialogTitle>
          </DialogHeader>

          {/* Motivational Message */}
          <div className="px-6 mb-6">
            <div className="bg-gray-100 rounded-lg p-4 flex items-center gap-3">
              <div className="flex-1">
                <p className="text-sm text-gray-700 leading-relaxed">
                  {userMessage.message}
                </p>
                <div className="mt-2 flex items-center gap-2">
                  <span className="text-xs text-gray-500">Current Grade: {currentUserGrade}%</span>
                  <span className="text-xs text-gray-400">•</span>
                  <span className="text-xs text-gray-500">Better than {currentUserPercentage}% of students</span>
                </div>
              </div>
              <div className="text-3xl">{userMessage.emoji}</div>
            </div>
          </div>

          {/* Leaderboard Entries */}
          <div className="px-6 pb-6">
            <div className="space-y-3">
              {leaderboardData.map((entry) => (
                <div
                  key={entry.rank}
                  className="bg-gray-50 rounded-lg p-4 flex items-center justify-between hover:bg-gray-100 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
                      entry.rank === 1 ? 'bg-yellow-400 text-black' :
                      entry.rank === 2 ? 'bg-gray-300 text-black' :
                      entry.rank === 3 ? 'bg-orange-400 text-white' :
                      'bg-gray-200 text-gray-600'
                    }`}>
                      {entry.rank}
                    </div>
                    <div className="text-2xl">{entry.avatar}</div>
                    <div>
                      <p className="font-medium text-gray-800">{entry.name}</p>
                      <p className="text-sm text-gray-500">Score: {entry.score}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="flex items-center gap-1">
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                      <span className="text-sm text-gray-600">{entry.score}%</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Current User Stats */}
          <div className="px-6 pb-6">
            <div className="bg-blue-50 rounded-lg p-4 border-l-4 border-blue-400">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium text-gray-800">Your Position</p>
                  <p className="text-sm text-gray-600">Rank #{currentUserRank}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm text-blue-600 font-medium">Top {currentUserPercentage}%</p>
                  <p className="text-xs text-gray-500">Keep going! 💪</p>
                </div>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
