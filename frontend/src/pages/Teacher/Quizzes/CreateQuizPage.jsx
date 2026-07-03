import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import TeacherLayout from '../../../components/TeacherDashboard/TeacherLayout';
import CreateQuizHeader from '../../../components/TeacherQuizzes/CreateQuizHeader';
import CreateQuizForm from '../../../components/TeacherQuizzes/CreateQuizForm';
import QuizPreviewCard from '../../../components/TeacherQuizzes/QuizPreviewCard';
import CreateQuizSkeleton from '../../../components/TeacherQuizzes/CreateQuizSkeleton';
import { getLessonById, createQuiz } from '../../../services/teacherQuizApi';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
export default function CreateQuizPage() {
  const { lessonId } = useParams();
  const navigate = useNavigate();
  // Load parent lesson information details for live preview
  const [courseId, setCourseId] = useState(null);
  const [lessonName, setLessonName] = useState('Parent Lesson');
  const [isPageLoading, setIsPageLoading] = useState(true);
  // Form states
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [timeLimit, setTimeLimit] = useState('');
  const [passingScore, setPassingScore] = useState(60);
  // Statuses
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const fetchLessonDetails = async () => {
    setIsPageLoading(true);
    try {
      const response = await getLessonById(lessonId);
      if (response.data && response.data.success) {
        setLessonName(response.data.lesson.title || 'Parent Lesson');
        setCourseId(response.data.lesson.course_id);
      }
    } catch (err) {
      console.warn("Parent lesson details not found. Loading preview placeholders.", err);
    } finally {
      setIsPageLoading(false);
    }
  };
  useEffect(() => {
    if (lessonId) {
      fetchLessonDetails();
    }
  }, [lessonId]);
  // Form Input onChange setters that clear errors automatically
  const handleTitleChange = (val) => {
    setTitle(val);
    if (errors.title) {
      setErrors((prev) => ({ ...prev, title: null }));
    }
  };
  const handleDescChange = (val) => {
    setDescription(val);
    if (errors.description) {
      setErrors((prev) => ({ ...prev, description: null }));
    }
  };
  const handleTimeChange = (val) => {
    setTimeLimit(val);
    if (errors.timeLimit) {
      setErrors((prev) => ({ ...prev, timeLimit: null }));
    }
  };
  const handlePassChange = (val) => {
    setPassingScore(val);
    if (errors.passingScore) {
      setErrors((prev) => ({ ...prev, passingScore: null }));
    }
  };
  const validate = () => {
    const tempErrors = {};
    if (!title.trim()) {
      tempErrors.title = 'Quiz title is required.';
    } else if (title.length > 100) {
      tempErrors.title = 'Title must be 100 characters or less.';
    }
    if (!description.trim()) {
      tempErrors.description = 'Quiz description is required.';
    } else if (description.length > 1000) {
      tempErrors.description = 'Description must be 1000 characters or less.';
    }
    if (!timeLimit) {
      tempErrors.timeLimit = 'Time limit is required.';
    } else if (parseInt(timeLimit) < 1) {
      tempErrors.timeLimit = 'Time limit must be at least 1 minute.';
    }
    if (passingScore === '' || passingScore === undefined) {
      tempErrors.passingScore = 'Passing score is required.';
    } else {
      const score = parseInt(passingScore);
      if (isNaN(score) || score < 0 || score > 100) {
        tempErrors.passingScore = 'Passing score must be between 0% and 100%.';
      }
    }
    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };
  const handleFormSubmit = async () => {
    if (!validate()) return;
    setLoading(true);
    try {
      // POST /api/quizzes
      const payload = {
        lesson_id: lessonId,
        title,
        description,
        time_limit: Number(timeLimit),
        passing_score: Number(passingScore)
      };
      const response = await createQuiz(payload);
      if (response.data && response.data.success) {
        toast.success("Quiz created successfully!");
        // Redirect after 1 second
        setTimeout(() => {
          navigate(`/teacher/lesson/${lessonId}/quiz`);
        }, 1000);
      } else {
        throw new Error(response.data.message || 'Unable to create quiz.');
      }
    } catch (err) {
      console.error("Backend quiz creation failed.", err);
      const backendMsg = err.response?.data?.message || err.message || "Unable to create quiz.";
      toast.error(backendMsg);
      if (err.response?.data?.errors) {
        setErrors(err.response.data.errors);
      }
    } finally {
      setLoading(false);
    }
  };
  const handleFormCancel = () => {
    navigate(`/teacher/lesson/${lessonId}/quiz`);
  };
  return (
    <TeacherLayout>
      <div className="space-y-8 relative">
        
        {/* Toast Container */}
        {/* <ToastContainer
          position="top-right"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
        /> */}
        {isPageLoading ? (
          <CreateQuizSkeleton />
        ) : (
          <div className="space-y-8">
            
            {/* Header tools */}
            <CreateQuizHeader
              lessonId={lessonId}
              courseId={courseId}
              loading={loading}
              onSubmit={handleFormSubmit}
            />
            {/* Split layout Form (65%) & Preview Card (35%) */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              
              {/* Form Input Card */}
              <div className="lg:col-span-8 w-full">
                <CreateQuizForm
                  title={title}
                  setTitle={handleTitleChange}
                  description={description}
                  setDescription={handleDescChange}
                  timeLimit={timeLimit}
                  setTimeLimit={handleTimeChange}
                  passingScore={passingScore}
                  setPassingScore={handlePassChange}
                  errors={errors}
                  loading={loading}
                  onSubmit={handleFormSubmit}
                  onCancel={handleFormCancel}
                />
              </div>
              {/* Preview Card */}
              <div className="lg:col-span-4 w-full">
                <QuizPreviewCard
                  title={title}
                  description={description}
                  lessonName={lessonName}
                  timeLimit={timeLimit}
                  passingScore={passingScore}
                />
              </div>
            </div>
          </div>
        )}
      </div>
    </TeacherLayout>
  );
}
