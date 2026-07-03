import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import TeacherLayout from '../../../components/TeacherDashboard/TeacherLayout';
import CreateQuestionHeader from '../../../components/TeacherQuizzes/CreateQuestionHeader';
import CreateQuestionForm from '../../../components/TeacherQuizzes/CreateQuestionForm';
import QuestionPreviewCard from '../../../components/TeacherQuizzes/QuestionPreviewCard';
import CreateQuestionSkeleton from '../../../components/TeacherQuizzes/CreateQuestionSkeleton';
import { getQuizById, addQuestion } from '../../../services/teacherQuizApi';
import { getLessonById } from '../../../services/teacherQuizApi';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
export default function CreateQuestionPage() {
  const { quizId } = useParams();
  const navigate = useNavigate();
  // Loaded quiz metadata profiles
  const [quizTitle, setQuizTitle] = useState('Parent Quiz');
  const [quizDescription, setQuizDescription] = useState('');
  const [lessonId, setLessonId] = useState(null);
  const [courseId, setCourseId] = useState(null);
  const [isPageLoading, setIsPageLoading] = useState(true);
  // Form states
  const [questionText, setQuestionText] = useState('');
  const [optionA, setOptionA] = useState('');
  const [optionB, setOptionB] = useState('');
  const [optionC, setOptionC] = useState('');
  const [optionD, setOptionD] = useState('');
  const [correctAnswer, setCorrectAnswer] = useState('');
  // Statuses
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const fetchQuizDetails = async () => {
    setIsPageLoading(true);
    try {
      const response = await getQuizById(quizId);
      if (response.data && response.data.success) {
        const quizObj = response.data.quiz;
        setQuizTitle(quizObj.title || 'Parent Quiz');
        setQuizDescription(quizObj.description || '');
        setLessonId(quizObj.lesson_id);
        if (quizObj.lesson_id) {
          const lessonRes = await getLessonById(quizObj.lesson_id);
          if (lessonRes.data && lessonRes.data.success) {
            setCourseId(lessonRes.data.lesson.course_id);
          }
        }
      }
    } catch (err) {
      console.warn("Quiz details not found on backend. Emulating details for testing.", err);
    } finally {
      setIsPageLoading(false);
    }
  };
  useEffect(() => {
    if (quizId) {
      fetchQuizDetails();
    }
  }, [quizId]);
  // Form change setters clearing validators
  const handleQuestionChange = (val) => {
    setQuestionText(val);
    if (errors.questionText) {
      setErrors((prev) => ({ ...prev, questionText: null }));
    }
  };
  const handleOptAChange = (val) => {
    setOptionA(val);
    if (errors.optionA) {
      setErrors((prev) => ({ ...prev, optionA: null }));
    }
  };
  const handleOptBChange = (val) => {
    setOptionB(val);
    if (errors.optionB) {
      setErrors((prev) => ({ ...prev, optionB: null }));
    }
  };
  const handleOptCChange = (val) => {
    setOptionC(val);
    if (errors.optionC) {
      setErrors((prev) => ({ ...prev, optionC: null }));
    }
  };
  const handleOptDChange = (val) => {
    setOptionD(val);
    if (errors.optionD) {
      setErrors((prev) => ({ ...prev, optionD: null }));
    }
  };
  const handleCorrectChange = (val) => {
    setCorrectAnswer(val);
    if (errors.correctAnswer) {
      setErrors((prev) => ({ ...prev, correctAnswer: null }));
    }
  };
  const validate = () => {
    const tempErrors = {};
    if (!questionText.trim()) {
      tempErrors.questionText = 'Question text is required.';
    } else if (questionText.length > 500) {
      tempErrors.questionText = 'Question must be 500 characters or less.';
    }
    if (!optionA.trim()) {
      tempErrors.optionA = 'Option A is required.';
    }
    if (!optionB.trim()) {
      tempErrors.optionB = 'Option B is required.';
    }
    if (!optionC.trim()) {
      tempErrors.optionC = 'Option C is required.';
    }
    if (!optionD.trim()) {
      tempErrors.optionD = 'Option D is required.';
    }
    if (!correctAnswer) {
      tempErrors.correctAnswer = 'Correct answer is required.';
    }
    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };
  const handleFormSubmit = async () => {
    if (!validate()) return;
    setLoading(true);
    try {
      // POST /api/quizzes/:quizId/questions
      const payload = {
        question: questionText,
        option_a: optionA,
        option_b: optionB,
        option_c: optionC,
        option_d: optionD,
        correct_answer: correctAnswer
      };
      const response = await addQuestion(quizId, payload);
      if (response.data && response.data.success) {
        toast.success("Question added successfully.");
        // Redirect after 1 second
        setTimeout(() => {
          navigate(`/teacher/quiz/${quizId}/questions`);
        }, 1000);
      } else {
        throw new Error(response.data.message || 'Unable to create question.');
      }
    } catch (err) {
      console.error("Backend question creation failed.", err);
      const backendMsg = err.response?.data?.message || err.message || "Unable to create question.";
      toast.error(backendMsg);
      if (err.response?.data?.errors) {
        setErrors(err.response.data.errors);
      }
    } finally {
      setLoading(false);
    }
  };
  const handleFormCancel = () => {
    navigate(`/teacher/quiz/${quizId}/questions`);
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
          <CreateQuestionSkeleton />
        ) : (
          <div className="space-y-8">
            
            {/* Header toolbar */}
            <CreateQuestionHeader
              quizId={quizId}
              lessonId={lessonId}
              courseId={courseId}
              loading={loading}
              onSubmit={handleFormSubmit}
              onCancel={handleFormCancel}
            />
            {/* Split Layout: Form (65%) & Live Preview Card (35%) */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              
              {/* Form Input Container */}
              <div className="lg:col-span-8 w-full">
                <CreateQuestionForm
                  questionText={questionText}
                  setQuestionText={handleQuestionChange}
                  optionA={optionA}
                  setOptionA={handleOptAChange}
                  optionB={optionB}
                  setOptionB={handleOptBChange}
                  optionC={optionC}
                  setOptionC={handleOptCChange}
                  optionD={optionD}
                  setOptionD={handleOptDChange}
                  correctAnswer={correctAnswer}
                  setCorrectAnswer={handleCorrectChange}
                  errors={errors}
                  loading={loading}
                  onSubmit={handleFormSubmit}
                  onCancel={handleFormCancel}
                />
              </div>
              {/* Real-time Preview Container */}
              <div className="lg:col-span-4 w-full">
                <QuestionPreviewCard
                  questionText={questionText}
                  optionA={optionA}
                  optionB={optionB}
                  optionC={optionC}
                  optionD={optionD}
                  correctAnswer={correctAnswer}
                />
              </div>
            </div>
          </div>
        )}
      </div>
    </TeacherLayout>
  );
}
