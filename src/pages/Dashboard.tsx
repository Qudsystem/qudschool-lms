import React, { useState, useEffect } from 'react';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { db } from '../config/firebase';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate, Link } from 'react-router-dom';
import { useProgress } from '../contexts/ProgressContext';

interface Course {
    id: string;
    title: string;
    description: string;
    imageUrl: string;
    level: string;
    duration: string;
    lessons: number;
}

const Dashboard = () => {
    const [enrolledCourses, setEnrolledCourses] = useState<Course[]>([]);
    const [recommendedCourses, setRecommendedCourses] = useState<Course[]>([]);
    const [loading, setLoading] = useState(true);
    const { user } = useAuth() as { user: any };
    const { getCompletionPercentage } = useProgress();
    const navigate = useNavigate();

    useEffect(() => {
        const fetchUserCourses = async () => {
            if (!user) return;

            try {
                // Fetch user's enrolled courses
                const userCoursesQuery = query(
                    collection(db, 'users'),
                    where('uid', '==', user.uid)
                );
                const userSnapshot = await getDocs(userCoursesQuery);

                if (!userSnapshot.empty) {
                    const userData = userSnapshot.docs[0].data();
                    const enrolledCourseIds = userData.enrolledCourses || [];

                    // Fetch course details for enrolled courses
                    if (enrolledCourseIds.length > 0) {
                        const coursesQuery = query(
                            collection(db, 'courses'),
                            where('id', 'in', enrolledCourseIds)
                        );
                        const coursesSnapshot = await getDocs(coursesQuery);
                        const coursesData = coursesSnapshot.docs.map(doc => ({
                            id: doc.id,
                            ...doc.data()
                        })) as Course[];

                        setEnrolledCourses(coursesData);
                    }

                    // Fetch recommended courses (not enrolled)
                    const recommendedQuery = query(
                        collection(db, 'courses'),
                        where('id', 'not-in', enrolledCourseIds.length > 0 ? enrolledCourseIds : ['placeholder'])
                    );
                    const recommendedSnapshot = await getDocs(recommendedQuery);
                    const recommendedData = recommendedSnapshot.docs
                        .map(doc => ({
                            id: doc.id,
                            ...doc.data()
                        })) as Course[];

                    // Limit to 3 recommended courses
                    setRecommendedCourses(recommendedData.slice(0, 3));
                }
            } catch (error) {
                console.error('Error fetching courses:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchUserCourses();
    }, [user]);

    if (!user) {
        navigate('/login');
        return null;
    }

    return (
        <div className="min-h-screen bg-gray-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-gray-900">Welcome, {user.displayName}!</h1>
                    <p className="mt-2 text-gray-600">Track your progress and continue learning</p>
                </div>

                {loading ? (
                    <div className="flex justify-center items-center h-64">
                        <p className="text-gray-500">Loading your courses...</p>
                    </div>
                ) : (
                    <div className="space-y-10">
                        {/* Enrolled Courses Section */}
                        <div>
                            <h2 className="text-2xl font-semibold text-gray-900 mb-4">Your Courses</h2>
                            {enrolledCourses.length > 0 ? (
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                    {enrolledCourses.map((course) => (
                                        <div key={course.id} className="bg-white rounded-lg shadow overflow-hidden">
                                            <div className="h-48 w-full overflow-hidden">
                                                <img
                                                    src={course.imageUrl || 'https://via.placeholder.com/400x200?text=Course+Image'}
                                                    alt={course.title}
                                                    className="w-full h-full object-cover"
                                                />
                                            </div>
                                            <div className="p-6">
                                                <h3 className="text-lg font-semibold text-gray-900">{course.title}</h3>
                                                <p className="mt-2 text-sm text-gray-600 line-clamp-2">{course.description}</p>

                                                {/* Progress bar */}
                                                <div className="mt-4">
                                                    <div className="flex justify-between items-center mb-1">
                                                        <span className="text-xs font-medium text-gray-700">
                                                            Progress
                                                        </span>
                                                        <span className="text-xs font-medium text-gray-700">
                                                            {getCompletionPercentage(course.id)}%
                                                        </span>
                                                    </div>
                                                    <div className="w-full bg-gray-200 rounded-full h-2.5">
                                                        <div
                                                            className="bg-indigo-600 h-2.5 rounded-full"
                                                            style={{ width: `${getCompletionPercentage(course.id)}%` }}
                                                        ></div>
                                                    </div>
                                                </div>

                                                <div className="mt-4">
                                                    <Link
                                                        to={`/course/${course.id}`}
                                                        className="text-indigo-600 hover:text-indigo-800 font-medium text-sm"
                                                    >
                                                        Continue Learning
                                                    </Link>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <div className="bg-white rounded-lg shadow p-6 text-center">
                                    <p className="text-gray-600 mb-4">You haven't enrolled in any courses yet.</p>
                                    <Link
                                        to="/courses"
                                        className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                                    >
                                        Browse Courses
                                    </Link>
                                </div>
                            )}
                        </div>

                        {/* Recommended Courses Section */}
                        {recommendedCourses.length > 0 && (
                            <div>
                                <h2 className="text-2xl font-semibold text-gray-900 mb-4">Recommended For You</h2>
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                    {recommendedCourses.map((course) => (
                                        <div key={course.id} className="bg-white rounded-lg shadow overflow-hidden">
                                            <div className="h-48 w-full overflow-hidden">
                                                <img
                                                    src={course.imageUrl || 'https://via.placeholder.com/400x200?text=Course+Image'}
                                                    alt={course.title}
                                                    className="w-full h-full object-cover"
                                                />
                                            </div>
                                            <div className="p-6">
                                                <div className="flex justify-between items-start">
                                                    <h3 className="text-lg font-semibold text-gray-900">{course.title}</h3>
                                                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-indigo-100 text-indigo-800">
                                                        {course.level}
                                                    </span>
                                                </div>
                                                <p className="mt-2 text-sm text-gray-600 line-clamp-2">{course.description}</p>
                                                <div className="mt-4 flex justify-between items-center">
                                                    <span className="text-sm text-gray-500">{course.duration} • {course.lessons} lessons</span>
                                                    <Link
                                                        to={`/course/${course.id}`}
                                                        className="text-indigo-600 hover:text-indigo-800 font-medium text-sm"
                                                    >
                                                        View Course
                                                    </Link>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                                <div className="mt-6 text-center">
                                    <Link
                                        to="/courses"
                                        className="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                                    >
                                        View All Courses
                                    </Link>
                                </div>
                            </div>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
};

export default Dashboard;