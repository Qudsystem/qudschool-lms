import React from 'react';

interface AddSectionModalProps {
  onClose: () => void;
}

const AddSectionModal: React.FC<AddSectionModalProps> = ({ onClose }) => {
  const templates = {
    'Select a template': [],
    'Double column': ['Ivy League', 'Elegant', 'Modern', 'Polished', 'Contemporary', 'Creative', 'Timeline', 'Stylish'],
    'Single column': ['Compact'],
    'Multicolumn': ['Classic', 'High Performer']
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-lg p-8 w-full max-w-5xl max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h2 className="text-3xl font-bold">Add a new section</h2>
            <p className="text-gray-500 mt-1">Select a template to add to your resume</p>
          </div>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700 text-3xl">&times;</button>
        </div>
        <div className="space-y-6">
          {Object.entries(templates).map(([category, items]) => (
            <div key={category}>
              <h3 className="text-xl font-semibold mb-3">{category}</h3>
              {items.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                  {items.map((item, index) => (
                    <div key={index} className="border rounded-lg hover:shadow-xl cursor-pointer transition-shadow">
                      <div className="bg-gray-200 h-40 rounded-t-lg flex items-center justify-center">
                        <span className="text-gray-500">Template Preview</span>
                      </div>
                      <div className="p-4">
                        <h4 className="font-semibold text-center">{item}</h4>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-4 text-gray-500"></div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AddSectionModal;
