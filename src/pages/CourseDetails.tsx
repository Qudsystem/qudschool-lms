import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { doc, getDoc, collection, getDocs, updateDoc, arrayUnion } from 'firebase/firestore';
import { db } from '../config/firebase';
import { useAuth } from '../contexts/AuthContext';
import { useProgress } from '../contexts/ProgressContext';

interface Lesson {
  id: string;
  title: string;
  description: string;
  videoUrl: string;
  duration: string;
  order: number;
}

interface Course {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  level: string;
  duration: string;
  instructor: string;
  lessons: Lesson[];
}

const CourseDetails = () => {
  const { id } = useParams<{ id: string }>();
  const [course, setCourse] = useState<Course | null>(null);
  const [lessons, setLessons] = useState<Lesson[]>([]);
  const [loading, setLoading] = useState(true);
  const [enrolled, setEnrolled] = useState(false);
  const [enrolling, setEnrolling] = useState(false);
  const { user } = useAuth() as { user: any };
  const { getCourseProgress, getCompletionPercentage } = useProgress();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCourseDetails = async () => {
      if (!id) return;

      try {
        // Fetch course details
        const courseDoc = await getDoc(doc(db, 'courses', id));
        
        if (courseDoc.exists()) {
          const courseData = { id: courseDoc.id, ...courseDoc.data() } as Course;
          setCourse(courseData);
          
          // Fetch lessons for this course
          const lessonsCollection = await getDocs(collection(db, 'courses', id, 'lessons'));
          const lessonsData = lessonsCollection.docs
            .map(doc => ({ id: doc.id, ...doc.data() }) as Lesson)
            .sort((a, b) => a.order - b.order);
          
          setLessons(lessonsData);
          
          // Check if user is enrolled
          if (user) {
            const userDoc = await getDoc(doc(db, 'users', user.uid));
            if (userDoc.exists()) {
              const userData = userDoc.data();
              setEnrolled(userData.enrolledCourses?.includes(id) || false);
            }
          }
        } else {
          console.error('Course not found');
          navigate('/courses');
        }
      } catch (error) {
        console.error('Error fetching course details:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchCourseDetails();
  }, [id, user, navigate]);

  const handleEnroll = async () => {
    if (!user) {
      navigate('/login');
      return;
    }

    setEnrolling(true);
    try {
      // Add course to user's enrolled courses
      await updateDoc(doc(db, 'users', user.uid), {
        enrolledCourses: arrayUnion(id)
      });
      
      setEnrolled(true);
    } catch (error) {
      console.error('Error enrolling in course:', error);
    } finally {
      setEnrolling(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex justify-center items-center bg-gray-50">
        <p className="text-gray-500">Loading course details...</p>
      </div>
    );
  }

  if (!course) {
    return (
      <div className="min-h-screen flex justify-center items-center bg-gray-50">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Course not found</h2>
          <Link 
            to="/courses"
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Browse Courses
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Course Header */}
      <div className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="md:flex md:items-center md:justify-between">
            <div className="flex-1 min-w-0">
              <h1 className="text-3xl font-bold text-gray-900">{course.title}</h1>
              <p className="mt-2 text-lg text-gray-500">{course.description}</p>
              
              <div className="mt-4 flex flex-wrap items-center text-sm text-gray-500">
                <span className="mr-6 flex items-center">
                  <svg className="mr-1.5 h-5 w-5 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                  </svg>
                  Instructor: {course.instructor}
                </span>
                <span className="mr-6 flex items-center">
                  <svg className="mr-1.5 h-5 w-5 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                  </svg>
                  Duration: {course.duration}
                </span>
                <span className="mr-6 flex items-center">
                  <svg className="mr-1.5 h-5 w-5 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9 6a3 3 0 11-6 0 3 3 0 016 0zM17 6a3 3 0 11-6 0 3 3 0 016 0zM12.93 17c.046-.327.07-.66.07-1a6.97 6.97 0 00-1.5-4.33A5 5 0 0119 16v1h-6.07zM6 11a5 5 0 015 5v1H1v-1a5 5 0 015-5z" />
                  </svg>
                  Level: {course.level}
                </span>
                <span className="mr-6 flex items-center">
                  <svg className="mr-1.5 h-5 w-5 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd" />
                  </svg>
                  {lessons.length} lessons
                </span>
              </div>
            </div>
            
            <div className="mt-6 md:mt-0 md:ml-4">
              {enrolled ? (
                <div className="flex flex-col items-end">
                  <div className="mb-2 text-sm font-medium text-gray-700">
                    Progress: {getCompletionPercentage(course.id)}%
                  </div>
                  <div className="w-48 bg-gray-200 rounded-full h-2.5">
                    <div 
                      className="bg-indigo-600 h-2.5 rounded-full" 
                      style={{ width: `${getCompletionPercentage(course.id)}%` }}
                    ></div>
                  </div>
                </div>
              ) : (
                <button
                  onClick={handleEnroll}
                  disabled={enrolling}
                  className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  {enrolling ? 'Enrolling...' : 'Enroll Now'}
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
      
      {/* Course Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white shadow overflow-hidden sm:rounded-md">
          <ul className="divide-y divide-gray-200">
            {lessons.map((lesson, index) => {
              const courseProgress = getCourseProgress(course.id);
              const isCompleted = courseProgress?.completedLessons.includes(lesson.id);
              
              return (
                <li key={lesson.id}>
                  <div className="px-4 py-4 sm:px-6">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 h-10 w-10 flex items-center justify-center rounded-full bg-indigo-100 text-indigo-800 font-semibold">
                          {index + 1}
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-indigo-600">{lesson.title}</div>
                          <div className="text-sm text-gray-500">{lesson.description}</div>
                        </div>
                      </div>
                      <div className="flex items-center">
                        <span className="text-sm text-gray-500 mr-4">{lesson.duration}</span>
                        {isCompleted ? (
                          <svg className="h-5 w-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                          </svg>
                        ) : (
                          <Link 
                            to={enrolled ? `/lesson/${course.id}/${lesson.id}` : '#'}
                            onClick={e => !enrolled && e.preventDefault()}
                            className={`inline-flex items-center px-3 py-1 border border-transparent text-xs font-medium rounded-md ${enrolled ? 'text-white bg-indigo-600 hover:bg-indigo-700' : 'text-gray-500 bg-gray-200 cursor-not-allowed'}`}
                          >
                            {enrolled ? 'Start' : 'Enroll to access'}
                          </Link>
                        )}
                      </div>
                    </div>
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default CourseDetails;