import React from 'react';
import AllCourseCard from './AllCourseCard';
export default function AllCourseGrid({ courses, enrollments = {}, onEnroll }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
      {courses.map((course) => (
        <AllCourseCard
          key={course.id}
          course={course}
          isEnrolled={!!enrollments[course.id]}
          onEnroll={onEnroll}
        />
      ))}
    </div>
  );
}
