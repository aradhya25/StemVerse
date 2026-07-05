import React, { useState, useEffect } from 'react';
import TeacherLayout from '../../../components/TeacherDashboard/TeacherLayout';
import TeacherStudentsHeader from '../../../components/TeacherStudents/TeacherStudentsHeader';
import TeacherStudentsStats from '../../../components/TeacherStudents/TeacherStudentsStats';
import TeacherStudentsFilters from '../../../components/TeacherStudents/TeacherStudentsFilters';
import TeacherStudentsTable from '../../../components/TeacherStudents/TeacherStudentsTable';
import TeacherStudentCard from '../../../components/TeacherStudents/TeacherStudentCard';
import TeacherStudentDetailsModal from '../../../components/TeacherStudents/TeacherStudentDetailsModal';
import TeacherStudentsSkeleton from '../../../components/TeacherStudents/TeacherStudentsSkeleton';
import TeacherStudentsEmpty from '../../../components/TeacherStudents/TeacherStudentsEmpty';
import TeacherStudentsError from '../../../components/TeacherStudents/TeacherStudentsError';
import { getTeacherStudents } from '../../../services/teacherStudentApi';
// Fallback preview data (Active only if backend APIs are not reachable)
// const PREVIEW_STUDENTS = [
//   {
//     id: "student_1",
//     name: "Rahul Sharma",
//     email: "rahul@gmail.com",
//     enrolled_courses: 2,
//     completed_lessons: 8,
//     quiz_attempts: 5,
//     average_score: 82.5
//   },
//   {
//     id: "student_2",
//     name: "Priya Patel",
//     email: "priya@gmail.com",
//     enrolled_courses: 1,
//     completed_lessons: 4,
//     quiz_attempts: 2,
//     average_score: 58.0
//   }
// ];
export default function TeacherStudentsPage() {
  
  // Loader states
  const [students, setStudents] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  // Search & Filter state values
  const [search, setSearch] = useState('');
  const [sortBy, setSortBy] = useState('name'); // 'name' | 'highest_score' | 'lowest_score' | 'most_attempts'
  // Modal details viewing targets
  const [viewingStudent, setViewingStudent] = useState(null);
 const fetchStudentsData = async () => {
  setIsLoading(true);
  setError(null);

  try {
    const response = await getTeacherStudents();

    if (response.data.success) {
      setStudents(response.data.students || []);
    } else {
      throw new Error(response.data.message);
    }
  } catch (err) {
    console.error(err);

    setError(err);

    // OPTIONAL:
    // setStudents(PREVIEW_STUDENTS);
  } finally {
    setIsLoading(false);
  }
};
  useEffect(() => {
    fetchStudentsData();
  }, []);
  // Filter & sort logic on frontend
  const filteredStudents = students
    .filter((st) => {
      const searchLower = search.toLowerCase();
      return (
        (st.name || '').toLowerCase().includes(searchLower) ||
        (st.email || '').toLowerCase().includes(searchLower)
      );
    })
    .sort((a, b) => {
      if (sortBy === 'name') {
        return (a.name || '').localeCompare(b.name || '');
      }
      if (sortBy === 'highest_score') {
        return (b.average_score || 0) - (a.average_score || 0);
      }
      if (sortBy === 'lowest_score') {
        return (a.average_score || 0) - (b.average_score || 0);
      }
      if (sortBy === 'most_attempts') {
        return (b.quiz_attempts || 0) - (a.quiz_attempts || 0);
      }
      return 0;
    });
  return (
    <TeacherLayout>
      <div className="space-y-8 relative">
        
        {/* Loading skeleton */}
        {isLoading && <TeacherStudentsSkeleton />}
        {/* Connection Failure Error block */}
        {!isLoading && error && (
          <TeacherStudentsError onRetry={fetchStudentsData} />
        )}
        {/* Content Loaded view */}
        {!isLoading && !error && (
          <div className="space-y-8 animate-fadeIn">
            
            {/* Header toolbar */}
            <TeacherStudentsHeader
              onRefresh={fetchStudentsData}
              loading={isLoading}
            />
            {/* Quick stats panel */}
            <TeacherStudentsStats students={students} />
            {/* Filters bar */}
            <TeacherStudentsFilters
              search={search}
              setSearch={setSearch}
              sortBy={sortBy}
              setSortBy={setSortBy}
            />
            {/* Students list */}
            {filteredStudents.length > 0 ? (
              <>
                {/* Desktop Table View */}
                <TeacherStudentsTable
                  students={filteredStudents}
                  onViewDetails={(student) => setViewingStudent(student)}
                />
                {/* Mobile Grid Cards View */}
                <div className="grid grid-cols-1 gap-4 md:hidden">
                  {filteredStudents.map((student) => (
                    <TeacherStudentCard
                      key={student.id}
                      student={student}
                      onViewDetails={(student) => setViewingStudent(student)}
                    />
                  ))}
                </div>
              </>
            ) : (
              <TeacherStudentsEmpty />
            )}
          </div>
        )}
        {/* Profile Details Modal Overlay */}
        <TeacherStudentDetailsModal
          isOpen={!!viewingStudent}
          onClose={() => setViewingStudent(null)}
          student={viewingStudent}
        />
      </div>
    </TeacherLayout>
  );
}