"use client";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";

interface Question {
  id: number;
  question: string;
  answer: string;
}

const mockQuestions: Question[] = [
  { id: 1, question: "What is the capital of France?", answer: "Paris" },
  { id: 2, question: "What is the capital of Germany?", answer: "Berlin" },
  { id: 3, question: "What is the capital of Spain?", answer: "Madrid" },
  { id: 4, question: "What is the capital of Italy?", answer: "Rome" },
  { id: 5, question: "What is the capital of Portugal?", answer: "Lisbon" },
  { id: 6, question: "What is the capital of Greece?", answer: "Athens" },
  { id: 7, question: "What is the capital of Turkey?", answer: "Ankara" },
  { id: 8, question: "What is the capital of Egypt?", answer: "Cairo" },
  { id: 9, question: "What is the capital of Morocco?", answer: "Rabat" },
  { id: 10, question: "What is the capital of Algeria?", answer: "Algiers" },
];

export default function AskAQuestion() {
  const [questions, setQuestions] = useState<Question[]>(mockQuestions);
  const [addQuestion, setAddQuestion] = useState<string>("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // calculate new ID (max existing id + 1)
    

    const newQuestion: Question = {
      id: questions.length+1,
      question: addQuestion,
      answer: "Waiting for answer",
    };

    // update state
    setQuestions((prev) => [...prev, newQuestion]);
    setAddQuestion("");

    toast.success("Question submitted successfully!");
  };

  // Always show the last 10 questions
  const questionsSection : Question[] = questions.slice(-10).reverse();

  return (
    <Dialog>
      <DialogTrigger asChild>
        <button 
          className="p-2 rounded-lg hover:bg-gray-100 transition-colors group"
          title="Ask a Question"
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
              d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
        </button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Ask a Question</DialogTitle>
          <DialogDescription>
            Feel free to ask your question — we’ll get back to you soon.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit}>
          <div className="grid gap-4">
            {/* Input Section */}
            <div className="grid gap-3">
              <Label htmlFor="question">Your Question</Label>
              <Input
                id="question"
                placeholder="Type your question..."
                value={addQuestion}
                onChange={(e) => setAddQuestion(e.target.value)}
              />
            </div>

            {/* Questions Section */}
            <div>
              <h3 className="text-sm text-gray-500 mb-2">
                Other Students Questions
              </h3>
              <div className="max-h-[300px] overflow-y-auto flex flex-col gap-3">
                {questionsSection.map((q) => (
                  <div
                    key={q.id}
                    className="border rounded-lg p-3 bg-gray-50 dark:bg-neutral-900"
                  >
                    <h4 className="font-medium">{q.question}</h4>
                    <p className={`text-sm ${q.answer=="Waiting for answer" ? "text-red-500" : "text-green-500"}`}>{q.answer}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <DialogFooter className="mt-4">
            <DialogClose asChild>
              <Button variant="outline">Cancel</Button>
            </DialogClose>
            <Button type="submit" disabled={!addQuestion.trim()}>
              Submit
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
