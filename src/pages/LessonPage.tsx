import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { doc, getDoc, collection, getDocs } from 'firebase/firestore';
import { db } from '../config/firebase';
import { useAuth } from '../contexts/AuthContext';
import { useProgress } from '../contexts/ProgressContext';

interface Lesson {
  id: string;
  title: string;
  description: string;
  videoUrl: string;
  content: string;
  duration: string;
  order: number;
}

interface Course {
  id: string;
  title: string;
  lessons: Lesson[];
}

const LessonPage = () => {
  const { courseId, lessonId } = useParams<{ courseId: string; lessonId: string }>();
  const [course, setCourse] = useState<Course | null>(null);
  const [lesson, setLesson] = useState<Lesson | null>(null);
  const [nextLesson, setNextLesson] = useState<Lesson | null>(null);
  const [prevLesson, setPrevLesson] = useState<Lesson | null>(null);
  const [loading, setLoading] = useState(true);
  const [completed, setCompleted] = useState(false);
  const [updating, setUpdating] = useState(false);
  const { user } = useAuth() as { user: any };
  const { updateLessonProgress, getCourseProgress } = useProgress();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchLessonDetails = async () => {
      if (!courseId || !lessonId || !user) {
        navigate('/dashboard');
        return;
      }

      try {
        // Fetch course details
        const courseDoc = await getDoc(doc(db, 'courses', courseId));
        if (!courseDoc.exists()) {
          navigate('/dashboard');
          return;
        }

        const courseData = { id: courseDoc.id, ...courseDoc.data() } as Course;
        setCourse(courseData);

        // Fetch all lessons for this course to determine next/prev
        const lessonsCollection = await getDocs(collection(db, 'courses', courseId, 'lessons'));
        const lessonsData = lessonsCollection.docs
          .map(doc => ({ id: doc.id, ...doc.data() }) as Lesson)
          .sort((a, b) => a.order - b.order);

        // Find current lesson
        const currentLesson = lessonsData.find(l => l.id === lessonId);
        if (!currentLesson) {
          navigate(`/course/${courseId}`);
          return;
        }
        setLesson(currentLesson);

        // Find lesson index
        const currentIndex = lessonsData.findIndex(l => l.id === lessonId);
        
        // Set next and previous lessons
        if (currentIndex > 0) {
          setPrevLesson(lessonsData[currentIndex - 1]);
        }
        
        if (currentIndex < lessonsData.length - 1) {
          setNextLesson(lessonsData[currentIndex + 1]);
        }

        // Check if lesson is completed
        const progress = getCourseProgress(courseId);
        if (progress && progress.completedLessons.includes(lessonId)) {
          setCompleted(true);
        }
      } catch (error) {
        console.error('Error fetching lesson details:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchLessonDetails();
  }, [courseId, lessonId, user, navigate, getCourseProgress]);

  const handleMarkComplete = async () => {
    if (!courseId || !lessonId) return;
    
    setUpdating(true);
    try {
      await updateLessonProgress(courseId, lessonId, !completed);
      setCompleted(!completed);
    } catch (error) {
      console.error('Error updating lesson progress:', error);
    } finally {
      setUpdating(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex justify-center items-center bg-gray-50">
        <p className="text-gray-500">Loading lesson...</p>
      </div>
    );
  }

  if (!lesson || !course) {
    return (
      <div className="min-h-screen flex justify-center items-center bg-gray-50">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Lesson not found</h2>
          <Link 
            to={`/course/${courseId}`}
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Back to Course
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Course navigation */}
        <div className="mb-6">
          <Link 
            to={`/course/${courseId}`}
            className="text-indigo-600 hover:text-indigo-800 flex items-center"
          >
            <svg className="h-5 w-5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back to {course.title}
          </Link>
        </div>

        {/* Lesson title */}
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-gray-900">{lesson.title}</h1>
          <p className="mt-2 text-gray-600">{lesson.description}</p>
        </div>

        {/* Video player */}
        <div className="bg-white rounded-lg shadow-md overflow-hidden mb-8">
          <div className="aspect-w-16 aspect-h-9">
            {lesson.videoUrl ? (
              <iframe
                src={lesson.videoUrl}
                title={lesson.title}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="w-full h-full"
              ></iframe>
            ) : (
              <div className="w-full h-full flex items-center justify-center bg-gray-100">
                <p className="text-gray-500">No video available for this lesson</p>
              </div>
            )}
          </div>
        </div>

        {/* Lesson content */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <div className="prose max-w-none">
            {lesson.content ? (
              <div dangerouslySetInnerHTML={{ __html: lesson.content }} />
            ) : (
              <p className="text-gray-500">No additional content available for this lesson.</p>
            )}
          </div>
        </div>

        {/* Lesson navigation and completion */}
        <div className="flex items-center justify-between">
          <div>
            {prevLesson ? (
              <Link
                to={`/lesson/${courseId}/${prevLesson.id}`}
                className="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                <svg className="h-5 w-5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
                Previous Lesson
              </Link>
            ) : (
              <span></span>
            )}
          </div>
          
          <button
            onClick={handleMarkComplete}
            disabled={updating}
            className={`inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 ${
              completed 
                ? 'text-indigo-700 bg-indigo-100 hover:bg-indigo-200' 
                : 'text-white bg-indigo-600 hover:bg-indigo-700'
            }`}
          >
            {updating ? (
              'Updating...'
            ) : completed ? (
              <>
                <svg className="h-5 w-5 mr-1" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                Completed
              </>
            ) : (
              'Mark as Complete'
            )}
          </button>
          
          <div>
            {nextLesson ? (
              <Link
                to={`/lesson/${courseId}/${nextLesson.id}`}
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Next Lesson
                <svg className="h-5 w-5 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            ) : (
              <Link
                to={`/course/${courseId}`}
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
              >
                Complete Course
                <svg className="h-5 w-5 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </Link>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default LessonPage;