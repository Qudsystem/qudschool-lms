import React from 'react';
import { useNavigate } from 'react-router-dom';

interface CourseCardProps {
  id: string;
  title: string;
  icon: React.ReactNode;
  ageRange: string;
  description: string;
  color: string;
}

const CourseCard: React.FC<CourseCardProps> = ({ id, title, icon, ageRange, description, color }) => {
  const navigate = useNavigate();

  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
      <div className={`${color} p-6 flex items-center justify-center text-white`}>
        {icon}
      </div>
      <div className="p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-xl font-semibold text-gray-800">{title}</h3>
          <span className="text-sm bg-gray-100 px-3 py-1 rounded-full text-gray-600">
            Ages {ageRange}
          </span>
        </div>
        <p className="text-gray-600 mb-6">{description}</p>
        <button 
          onClick={() => navigate(`/course/${id}`)}
          className="w-full bg-gray-50 text-gray-800 py-2 rounded-lg hover:bg-gray-100 transition-colors"
        >
          Learn More
        </button>
      </div>
    </div>
  );
};
export default CourseCard;