import React from 'react';
import { motion } from 'framer-motion';

const Navigation = () => {
  return (
    <nav className="bg-white shadow-lg">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="text-2xl font-bold text-blue-600"
          >
            QudSchool
          </motion.div>
          
          <div className="hidden md:flex space-x-8">
            {['Courses', 'Projects', 'Community', 'About'].map((item) => (
              <motion.a
                key={item}
                whileHover={{ y: -2 }}
                className="text-gray-600 hover:text-blue-600"
                href={`#${item.toLowerCase()}`}
              >
                {item}
              </motion.a>
            ))}
          </div>

          <motion.button
            whileHover={{ scale: 1.05 }}
            className="bg-blue-600 text-white px-6 py-2 rounded-full"
          >
            Sign In
          </motion.button>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
