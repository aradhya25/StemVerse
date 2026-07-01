import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import TeacherLayout from "../../../components/TeacherDashboard/TeacherLayout";
import CreateCourseHeader from "../../../components/TeacherCourses/CreateCourseHeader";
import CreateCourseForm from "../../../components/TeacherCourses/CreateCourseForm";
import CoursePreviewCard from "../../../components/TeacherCourses/CoursePreviewCard";
import CreateCourseSkeleton from "../../../components/TeacherCourses/CreateCourseSkeleton";
import { createCourse } from "../../../services/teacherCourseApi";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
export default function CreateCoursePage() {
  const navigate = useNavigate();
  // Form states
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [language, setLanguage] = useState("");
  const [thumbnail, setThumbnail] = useState(null);
  // Statuses
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const validate = () => {
    const tempErrors = {};
    if (!title.trim()) {
      tempErrors.title = "Course title is required.";
    } else if (title.length > 100) {
      tempErrors.title = "Title must be 100 characters or less.";
    }
    if (!description.trim()) {
      tempErrors.description = "Course description is required.";
    } else if (description.length > 1000) {
      tempErrors.description = "Description must be 1000 characters or less.";
    }
    if (!language) {
      tempErrors.language = "Course language selection is required.";
    }
    if (thumbnail) {
      if (thumbnail.size > 5 * 1024 * 1024) {
        tempErrors.thumbnail = "Image size must be less than 5 MB.";
      }
    }
    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };
  const handleFormSubmit = async () => {
    if (!validate()) return;
    setLoading(true);
    try {
      // POST /api/courses
      const formData = new FormData();

      formData.append("title", title);
      formData.append("description", description);
      formData.append("language", language);

      if (thumbnail) {
        formData.append("thumbnail", thumbnail);
      }

      const response = await createCourse(formData);
      if (response.data && response.data.success) {
        toast.success("Course created successfully!");

        await new Promise((resolve) => setTimeout(resolve, 1000));

        navigate("/teacher/courses");
      } else {
        throw new Error("API return unsuccessful.");
      }
    } catch (err) {
      console.error(err);

      toast.error(err.response?.data?.message || "Unable to create course.");
    } finally {
      setLoading(false);
      // Keep loading on success to prevent inputs flashing active
    }
  };
  const handleFormCancel = () => {
    navigate("/teacher/courses");
  };
  useEffect(() => {
    setErrors({});
  }, [title, description, language, thumbnail]);
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
        {/* Header toolbar */}
        <CreateCourseHeader />
        {/* Form and Preview Layout Split (Grid 65% / 35% on Desktop) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Input form (65%) */}
          <div className="lg:col-span-8 w-full">
            <CreateCourseForm
              title={title}
              setTitle={setTitle}
              description={description}
              setDescription={setDescription}
              language={language}
              setLanguage={setLanguage}
              thumbnail={thumbnail ? URL.createObjectURL(thumbnail) : ""}
              setThumbnail={setThumbnail}
              errors={errors}
              loading={loading}
              onSubmit={handleFormSubmit}
              onCancel={handleFormCancel}
            />
          </div>
          {/* Right Column: Live Card Preview (35%) */}
          <div className="lg:col-span-4 w-full">
            <CoursePreviewCard
              title={title || "Untitled Course"}
              description={
                description || "Your course description will appear here..."
              }
              language={language || "Language"}
              thumbnail={thumbnail ? URL.createObjectURL(thumbnail) : ""}
            />
          </div>
        </div>
      </div>
    </TeacherLayout>
  );
}
