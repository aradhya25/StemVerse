import React from 'react';
import TeacherCourseCard from './TeacherCourseCard';
export default function TeacherCourseGrid({ courses = [], onDeleteInit }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 animate-fadeIn">
      {courses.map((course) => (
        <TeacherCourseCard
          key={course.id}
          course={course}
          onDeleteInit={onDeleteInit}
        />
      ))}
    </div>
  );
}
