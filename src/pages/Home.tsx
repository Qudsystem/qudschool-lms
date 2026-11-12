import React, { useEffect } from 'react';
import Footer from '../components/Footer';
import { BookOpen, Users, Trophy, Star, ArrowRight } from 'lucide-react';
import AOS from 'aos';
import 'aos/dist/aos.css';

const Home = () => {
  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true
    });
  }, []);
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-to-br from-blue-50 to-indigo-100 overflow-hidden">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="md:w-1/2 text-center md:text-left" data-aos="fade-right">
              <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-600">
                Build Your Digital Future Today
              </h1>
              <p className="text-xl text-gray-600 mb-8 max-w-2xl">
                Empower your child with cutting-edge digital skills through interactive learning experiences designed for the next generation.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
                <button className="px-8 py-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-full hover:shadow-lg transform hover:-translate-y-1 transition-all duration-200 flex items-center justify-center">
                  Start Learning <ArrowRight className="ml-2 w-5 h-5" />
                </button>
                <button className="px-8 py-4 border-2 border-blue-600 text-blue-600 rounded-full hover:bg-blue-50 hover:shadow-lg transform hover:-translate-y-1 transition-all duration-200">
                  View Courses
                </button>
              </div>
            </div>
            <div className="md:w-1/2 mt-12 md:mt-0" data-aos="fade-left">
              <img src="/hero-image.svg" alt="Learning Illustration" className="w-full max-w-lg mx-auto" />
            </div>
          </div>
        </div>
        <div className="absolute -bottom-10 left-0 right-0 h-20 bg-white transform -skew-y-3"></div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center" data-aos="fade-up">
            <div className="p-6 rounded-xl bg-blue-50 transform hover:-translate-y-2 transition-all duration-300">
              <Users className="w-12 h-12 text-blue-600 mx-auto mb-4" />
              <h3 className="text-4xl font-bold text-blue-600 mb-2">5000+</h3>
              <p className="text-gray-600">Active Students</p>
            </div>
            <div className="p-6 rounded-xl bg-indigo-50 transform hover:-translate-y-2 transition-all duration-300">
              <BookOpen className="w-12 h-12 text-indigo-600 mx-auto mb-4" />
              <h3 className="text-4xl font-bold text-indigo-600 mb-2">100+</h3>
              <p className="text-gray-600">Interactive Courses</p>
            </div>
            <div className="p-6 rounded-xl bg-purple-50 transform hover:-translate-y-2 transition-all duration-300">
              <Trophy className="w-12 h-12 text-purple-600 mx-auto mb-4" />
              <h3 className="text-4xl font-bold text-purple-600 mb-2">50K+</h3>
              <p className="text-gray-600">Completed Projects</p>
            </div>
            <div className="p-6 rounded-xl bg-pink-50 transform hover:-translate-y-2 transition-all duration-300">
              <Star className="w-12 h-12 text-pink-600 mx-auto mb-4" />
              <h3 className="text-4xl font-bold text-pink-600 mb-2">4.9</h3>
              <p className="text-gray-600">Student Rating</p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Courses Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold mb-4 text-center" data-aos="fade-up">Featured Courses</h2>
          <p className="text-xl text-gray-600 text-center mb-12" data-aos="fade-up">Discover our most popular learning paths</p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8" data-aos="fade-up">
            {/* Course Card 1 */}
            <div className="bg-white rounded-2xl shadow-lg overflow-hidden transform hover:-translate-y-2 transition-all duration-300">
              <div className="h-48 bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center p-6">
                <BookOpen className="w-20 h-20 text-white" />
              </div>
              <div className="p-8">
                <div className="flex items-center mb-4">
                  <span className="px-3 py-1 text-sm bg-blue-100 text-blue-600 rounded-full">Beginner</span>
                  <span className="ml-auto text-gray-500">8 weeks</span>
                </div>
                <h3 className="text-2xl font-bold mb-3">Introduction to Coding</h3>
                <p className="text-gray-600 mb-6">Learn the basics of programming through fun interactive games and projects.</p>
                <button className="w-full py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl hover:shadow-lg transform hover:-translate-y-1 transition-all duration-200">Enroll Now</button>
              </div>
            </div>

            {/* Course Card 2 */}
            <div className="bg-white rounded-2xl shadow-lg overflow-hidden transform hover:-translate-y-2 transition-all duration-300">
              <div className="h-48 bg-gradient-to-br from-purple-400 to-purple-600 flex items-center justify-center p-6">
                <BookOpen className="w-20 h-20 text-white" />
              </div>
              <div className="p-8">
                <div className="flex items-center mb-4">
                  <span className="px-3 py-1 text-sm bg-purple-100 text-purple-600 rounded-full">Intermediate</span>
                  <span className="ml-auto text-gray-500">10 weeks</span>
                </div>
                <h3 className="text-2xl font-bold mb-3">Digital Art & Design</h3>
                <p className="text-gray-600 mb-6">Master digital creativity through industry-standard tools and design principles.</p>
                <button className="w-full py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-xl hover:shadow-lg transform hover:-translate-y-1 transition-all duration-200">Enroll Now</button>
              </div>
            </div>

            {/* Course Card 3 */}
            <div className="bg-white rounded-2xl shadow-lg overflow-hidden transform hover:-translate-y-2 transition-all duration-300">
              <div className="h-48 bg-gradient-to-br from-green-400 to-green-600 flex items-center justify-center p-6">
                <BookOpen className="w-20 h-20 text-white" />
              </div>
              <div className="p-8">
                <div className="flex items-center mb-4">
                  <span className="px-3 py-1 text-sm bg-green-100 text-green-600 rounded-full">Advanced</span>
                  <span className="ml-auto text-gray-500">12 weeks</span>
                </div>
                <h3 className="text-2xl font-bold mb-3">Game Development</h3>
                <p className="text-gray-600 mb-6">Build exciting games while mastering advanced programming concepts.</p>
                <button className="w-full py-3 bg-gradient-to-r from-green-600 to-teal-600 text-white rounded-xl hover:shadow-lg transform hover:-translate-y-1 transition-all duration-200">Enroll Now</button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
