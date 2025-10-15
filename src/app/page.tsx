"use client";
import React, { useState } from 'react';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

import { Toaster } from "@/components/ui/sonner";
import { Progress } from "@/components/ui/progress";
import WeeksDetails from "./_Components/WeeksDetails/WeeksDetails";
import CommentSection from "./_Components/CommentSection/CommentSection";
import VideoPlayer from "./_Components/VideoPlayer/VideoPlayer";
import CourseMaterial from "./_Components/CourseMaterial/CourseMaterial";
import NavIcons from "./_Components/NavIcons/NavIcons";

export default function Home() {
  const [isCoursePurchased, setIsCoursePurchased] = useState(false);
  return (
    <section className="">
      <Toaster />
      {/*Header  */}
      <div className="p-4 bg-gray-200">
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="#">Home</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink href="#">Courses</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>Course Details</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
        <h1 className="py-5 md:text-4xl">Starting SEO as your Home</h1>
      </div>
      {/* Main */}
      <div className="p-4 grid grid-cols-1 md:grid-cols-3 gap-x-15 gap-5 ">
        {/* Left Side */}
        <div className="col-span-1 md:col-span-2 h-fit w-fit">
          <div id="video-player">
            <VideoPlayer />
          </div>

          <NavIcons />

          <div id="course-material">
            <CourseMaterial />
          </div>
          {/* Comment Section for desktop */}
          <div className="hidden md:block " id="comments">
            <CommentSection />
          </div>
        </div>
        {/* right side bar */}
        {/* Topics Section */}
        <div className="col-span-1 flex flex-col gap-12" id="topics">
          {/* topics Header*/}
          <div>
            <div className="flex items-center justify-between pt-5 pb-4">
              <h2 className="text-2xl font-medium">
                Topics for This Course
              </h2>
              <div className="flex items-center gap-2">
                <span className="text-sm text-gray-600">Purchased</span>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    className="sr-only peer"
                    checked={isCoursePurchased}
                    onChange={(e) => setIsCoursePurchased(e.target.checked)}
                  />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                </label>
              </div>
            </div>
            <Progress value={60} className="h-1" />
          </div>
          {/* course weeks details section */}
          <WeeksDetails isPurchased={isCoursePurchased} />
        </div>
        {/* Comment Section for mobile  */}
        <div className="col-span-1 block md:hidden" id="comments-mobile">
          <CommentSection />
        </div>
      </div>
    </section>
  );
}
