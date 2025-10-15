import React from 'react'
import { CiClock2 } from 'react-icons/ci'
import { RiBookShelfLine } from 'react-icons/ri'
import { FcReading } from 'react-icons/fc'
import { CiGlobe } from 'react-icons/ci'

export default function CourseMaterial() {
  return (
    <div>
    <h2 className="text-2xl py-5 font-medium">Course material</h2>
    <div className="max-w-[400px] flex flex-col shadow-2xl py-3   px-7">
      {/* Duration */}
      <div className="flex items-center border-b py-2 gap-2 justify-between">
        <div className="flex items-center ">
          <CiClock2 />
          <span className="ml-2 text-sm text-gray-500">Duration:</span>
        </div>

        <p className="text-sm  font-medium">3 weeks</p>
      </div>
      {/* Lessons */}
      <div className="flex items-center border-b py-2 gap-2 justify-between">
        <div className="flex items-center ">
          <RiBookShelfLine />
          <span className="ml-2 text-sm text-gray-500">Lessons:</span>
        </div>
        <p className="text-sm  font-medium">8</p>
      </div>
      {/* Enrolled */}
      <div className="flex items-center border-b py-2 gap-2 justify-between">
        <div className="flex items-center ">
          <FcReading />
          <span className="ml-2 text-sm text-gray-500">Enrolled:</span>
        </div>
        <p className="text-sm  font-medium">65</p>
      </div>
      {/* Language */}
      <div className="flex items-center  py-2 gap-2 justify-between">
        <div className="flex items-center ">
          <CiGlobe />
          <span className="ml-2 text-sm text-gray-500">Language:</span>
        </div>
        <p className="text-sm  font-medium">English</p>
      </div>
    </div>
  </div>
  )
}
