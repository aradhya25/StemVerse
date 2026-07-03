import React from 'react';
import TeacherQuestionCard from './TeacherQuestionCard';
export default function TeacherQuestionGrid({ questions = [], onDeleteInit }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 animate-fadeIn">
      {questions.map((question, index) => (
        <TeacherQuestionCard
          key={question.id}
          question={question}
          index={index}
          onDeleteInit={onDeleteInit}
        />
      ))}
    </div>
  );
}