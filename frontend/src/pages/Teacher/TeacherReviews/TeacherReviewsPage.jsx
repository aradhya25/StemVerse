import React, { useState, useEffect } from "react";
import TeacherLayout from "../../../components/TeacherDashboard/TeacherLayout";
import TeacherReviewsHeader from "../../../components/TeacherReviews/TeacherReviewsHeader";
import TeacherReviewsStats from "../../../components/TeacherReviews/TeacherReviewsStats";
import TeacherReviewsFilters from "../../../components/TeacherReviews/TeacherReviewsFilters";
import TeacherReviewsTable from "../../../components/TeacherReviews/TeacherReviewsTable";
import TeacherReviewCard from "../../../components/TeacherReviews/TeacherReviewCard";
import TeacherReviewDetailsModal from "../../../components/TeacherReviews/TeacherReviewDetailsModal";
import TeacherReviewsSkeleton from "../../../components/TeacherReviews/TeacherReviewsSkeleton";
import TeacherReviewsEmpty from "../../../components/TeacherReviews/TeacherReviewsEmpty";
import TeacherReviewsError from "../../../components/TeacherReviews/TeacherReviewsError";
import { getTeacherReviews } from "../../../services/teacherReviewApi";
// Fallback preview data (Active only if backend APIs are not reachable)
// const PREVIEW_REVIEWS = [
//   {
//     id: "rev_1",
//     rating: 5,
//     review: "Excellent course with practical examples.",
//     created_at: "2026-07-05T12:00:00.000Z",
//     student_id: "student_1",
//     student_name: "Rahul Sharma",
//     student_email: "rahul@gmail.com",
//     course_id: "course_1",
//     course_title: "Java Programming",
//   },
//   {
//     id: "rev_2",
//     rating: 4,
//     review: "Very detailed explanation. Highly recommended.",
//     created_at: "2026-07-05T12:30:00.000Z",
//     student_id: "student_2",
//     student_name: "Priya Patel",
//     student_email: "priya@gmail.com",
//     course_id: "course_1",
//     course_title: "Java Programming",
//   },
// ];
export default function TeacherReviewsPage() {
  // Loader states
  const [reviews, setReviews] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  // Search & Filter state values
  const [search, setSearch] = useState("");
  const [ratingFilter, setRatingFilter] = useState("all"); // 'all' | '5' | '4' | '3' | '2' | '1'
  // Modal details viewing targets
  const [viewingReview, setViewingReview] = useState(null);
  const fetchReviewsData = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await getTeacherReviews();
      if (response.data && response.data.success) {
        setReviews(response.data.reviews || []);
      } else {
        throw new Error("API server returned unsuccessful status.");
      }
    } catch (err) {
      console.error(err);
      setError(err);
    } finally {
      setIsLoading(false);
    }
  };
  useEffect(() => {
    fetchReviewsData();
  }, []);
  // Filter & sort logic on frontend
  const filteredReviews = reviews
    .filter((rev) => {
      // 1. Search filter
      const searchLower = search.toLowerCase();
      const matchesSearch =
        (rev.student_name || "").toLowerCase().includes(searchLower) ||
        (rev.student_email || "").toLowerCase().includes(searchLower) ||
        (rev.course_title || "").toLowerCase().includes(searchLower) ||
        (rev.review || "").toLowerCase().includes(searchLower);
      // 2. Rating filter
      const matchesRating =
        ratingFilter === "all" || (rev.rating || 0).toString() === ratingFilter;
      return matchesSearch && matchesRating;
    })
    .sort(
      (a, b) =>
        new Date(b.created_at || 0).getTime() -
        new Date(a.created_at || 0).getTime(),
    );
  return (
    <TeacherLayout>
      <div className="space-y-8 relative">
        {/* Loading skeleton */}
        {isLoading && <TeacherReviewsSkeleton />}
        {/* Connection Failure Error block */}
        {!isLoading && error && (
          <TeacherReviewsError onRetry={fetchReviewsData} />
        )}
        {/* Content Loaded view */}
        {!isLoading && !error && (
          <div className="space-y-8 animate-fadeIn">
            {/* Header toolbar */}
            <TeacherReviewsHeader
              onRefresh={fetchReviewsData}
              loading={isLoading}
            />
            {/* Quick stats panel */}
            <TeacherReviewsStats reviews={reviews} />
            {/* Filters bar */}
            <TeacherReviewsFilters
              search={search}
              setSearch={setSearch}
              ratingFilter={ratingFilter}
              setRatingFilter={setRatingFilter}
            />
            {/* Reviews lists */}
            {filteredReviews.length > 0 ? (
              <>
                {/* Desktop Table View */}
                <TeacherReviewsTable
                  reviews={filteredReviews}
                  onViewDetails={(review) => setViewingReview(review)}
                />
                {/* Mobile Grid Cards View */}
                <div className="grid grid-cols-1 gap-4 md:hidden">
                  {filteredReviews.map((review) => (
                    <TeacherReviewCard
                      key={review.id}
                      review={review}
                      onViewDetails={(review) => setViewingReview(review)}
                    />
                  ))}
                </div>
              </>
            ) : (
              <TeacherReviewsEmpty />
            )}
          </div>
        )}
        {/* Profile Details Modal Overlay */}
        <TeacherReviewDetailsModal
          isOpen={!!viewingReview}
          onClose={() => setViewingReview(null)}
          review={viewingReview}
        />
      </div>
    </TeacherLayout>
  );
}
