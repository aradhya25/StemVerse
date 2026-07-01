import React from 'react';
import ReviewCard from './ReviewCard';
export default function ReviewList({ reviews = [], currentUserId, onEdit, onDelete }) {
  
  // Sort reviews chronologically by newest first
  const sortedReviews = [...reviews].sort(
    (a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
  );
  return (
    <div className="space-y-4">
      {sortedReviews.map((review) => (
        <ReviewCard
          key={review.id}
          reviewItem={review}
          isOwnReview={review.user_id === currentUserId}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
}