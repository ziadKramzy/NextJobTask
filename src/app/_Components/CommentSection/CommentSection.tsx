"use client";
import React, { useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

interface Comment {
  id: number;
  name: string;
  comment: string;
  avatar: string;
  date: string;
}
const CommentsMockData: Comment[] = [
  {
    id: 1,
    name: "John Doe",
    comment: "This is a comment",
    avatar: "https://github.com/shadcn.png",
    date: "2021-01-01",
  },
  {
    id: 2,
    name: "Jane Doe",
    comment: "This is a comment",
    avatar: "https://github.com/shadcn.png",
    date: "2021-01-01",
  },
  {
    id: 3,
    name: "John Doe",
    comment: "This is a comment",
    avatar: "https://github.com/shadcn.png",
    date: "2021-01-01",
  },
];
export default function CommentSection() {
  const [comment, setComment] = useState<string>("");
  const [comments, setComments] = useState<Comment[]>(CommentsMockData);
  const handleSubmit = () => {
    setComments([...comments, {
      id: comments.length + 1,
      name: "John Doe",
      comment: comment,
      avatar: "https://github.com/shadcn.png",
      date: "2021-01-01",
    }]);
    toast.success("Comment submitted");
    setComment("");
  };
  return (
    <div  className=" col-span-1 md:col-span-2 order-1">
      <h2 className="text-2xl py-5 font-medium">Comments</h2>
      <div>
      {comments.map((comment) => (
        <div
          className="flex items-start gap-5 border-b py-2 w-full"
          key={comment.id}
        >
          <Avatar className="w-12 h-12">
            <AvatarImage src={comment.avatar} />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
          <div>
            <h3 className="text-base font-medium md:text-lg">{comment.name}</h3>
            <p className="text-sm text-gray-500 md:text-base">{comment.date}</p>
            <p className="text-sm text-gray-500 md:text-base  py-3">{comment.comment}</p>
          </div>
        </div>
      ))}

      </div>
<div className="flex flex-col  items-start gap-2">
    <textarea value={comment} onChange={(e) => setComment(e.target.value)} className="w-full border-2 p-2  " rows={3}  placeholder="Type your comment..." />
    <Button onClick={handleSubmit} className="bg-green-500">Submit</Button>
</div>
</div>
    
  );
}
