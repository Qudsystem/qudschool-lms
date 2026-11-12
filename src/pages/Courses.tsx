import React, { useState, useEffect } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../config/firebase';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

interface Course {
    id: string;
    title: string;
    description: string;
    imageUrl: string;
    level: string;
    duration: string;
    instructor: string;
}

const Courses = () => {
    const [courses, setCourses] = useState<Course[]>([]);
    const [loading, setLoading] = useState(true);
    const [filter, setFilter] = useState('all');

    useEffect(() => {
        const fetchCourses = async () => {
            try {
                const coursesCollection = await getDocs(collection(db, 'courses'));
                const coursesData = coursesCollection.docs.map(doc => ({
                    id: doc.id,
                    ...doc.data()
                })) as Course[];

                setCourses(coursesData);
            } catch (error) {
                console.error('Error fetching courses:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchCourses();
    }, []);

    const filteredCourses = filter === 'all'
        ? courses
        : courses.filter(course => course.level.toLowerCase() === filter);

    return (
        <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
                <div className="text-center mb-12">
                    <motion.h1
                        className="text-4xl font-extrabold text-gray-900 sm:text-5xl sm:tracking-tight lg:text-6xl"
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                    >
                        Explore Our Courses
                    </motion.h1>
                    <motion.p
                        className="max-w-xl mt-5 mx-auto text-xl text-gray-500"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                    >
                        Discover interactive learning experiences designed for young minds
                    </motion.p>
                </div>

                <div className="mb-8 flex justify-center">
                    <div className="inline-flex rounded-md shadow-sm">
                        <button
                            type="button"
                            className={`px-4 py-2 text-sm font-medium rounded-l-md ${filter === 'all' ? 'bg-indigo-600 text-white' : 'bg-white text-gray-700 hover:bg-gray-50'}`}
                            onClick={() => setFilter('all')}
                        >
                            All Levels
                        </button>
                        <button
                            type="button"
                            className={`px-4 py-2 text-sm font-medium ${filter === 'beginner' ? 'bg-indigo-600 text-white' : 'bg-white text-gray-700 hover:bg-gray-50'}`}
                            onClick={() => setFilter('beginner')}
                        >
                            Beginner
                        </button>
                        <button
                            type="button"
                            className={`px-4 py-2 text-sm font-medium ${filter === 'intermediate' ? 'bg-indigo-600 text-white' : 'bg-white text-gray-700 hover:bg-gray-50'}`}
                            onClick={() => setFilter('intermediate')}
                        >
                            Intermediate
                        </button>
                        <button
                            type="button"
                            className={`px-4 py-2 text-sm font-medium rounded-r-md ${filter === 'advanced' ? 'bg-indigo-600 text-white' : 'bg-white text-gray-700 hover:bg-gray-50'}`}
                            onClick={() => setFilter('advanced')}
                        >
                            Advanced
                        </button>
                    </div>
                </div>

                {loading ? (
                    <div className="flex justify-center items-center h-64">
                        <p className="text-gray-500">Loading courses...</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
                        {filteredCourses.length > 0 ? (
                            filteredCourses.map((course) => (
                                <motion.div
                                    key={course.id}
                                    className="bg-white overflow-hidden shadow rounded-lg"
                                    whileHover={{ y: -5, transition: { duration: 0.2 } }}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.3 }}
                                >
                                    <div className="relative pb-2/3">
                                        <img
                                            className="h-48 w-full object-cover"
                                            src={course.imageUrl || 'https://via.placeholder.com/300x200?text=Course+Image'}
                                            alt={course.title}
                                        />
                                    </div>
                                    <div className="px-4 py-5 sm:p-6">
                                        <h3 className="text-lg font-medium text-gray-900">{course.title}</h3>
                                        <p className="mt-1 text-sm text-gray-500">{course.description}</p>
                                        <div className="mt-4 flex items-center justify-between">
                                            <div className="flex items-center">
                                                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-indigo-100 text-indigo-800">
                                                    {course.level}
                                                </span>
                                                <span className="ml-2 text-xs text-gray-500">{course.duration}</span>
                                            </div>
                                        </div>
                                        <div className="mt-5">
                                            <Link
                                                to={`/course/${course.id}`}
                                                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                                            >
                                                View Course
                                            </Link>
                                        </div>
                                    </div>
                                </motion.div>
                            ))
                        ) : (
                            <div className="col-span-full text-center py-12">
                                <p className="text-gray-500">No courses found for the selected filter.</p>
                            </div>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
};

export default Courses;