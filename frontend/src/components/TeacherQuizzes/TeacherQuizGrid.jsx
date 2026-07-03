import React from 'react';
import TeacherQuizCard from './TeacherQuizCard';
export default function TeacherQuizGrid({ quizzes = [], onDeleteInit }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 animate-fadeIn">
      {quizzes.map((quiz, index) => (
        <TeacherQuizCard
          key={quiz.id}
          quiz={quiz}
          index={index}
          onDeleteInit={onDeleteInit}
        />
      ))}
    </div>
  );
}