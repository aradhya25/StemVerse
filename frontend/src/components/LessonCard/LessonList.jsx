import React from 'react';
import LessonCard from './LessonCard';
export default function LessonList({ lessons = [], onViewLesson }) {
  // Sort lessons by order_no to display in correct sequence
  const sortedLessons = [...lessons].sort((a, b) => (a.order_no || 0) - (b.order_no || 0));
  return (
    <div className="space-y-4">
      {sortedLessons.map((lesson, index) => (
        <LessonCard
          key={lesson.id || index}
          lesson={lesson}
          index={index}
          onViewLesson={onViewLesson}
        />
      ))}
    </div>
  );
}
