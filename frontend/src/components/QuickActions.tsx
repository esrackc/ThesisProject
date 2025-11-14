import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const QuickActions = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  const actions = [
    { icon: '💼', label: 'Add Job', onClick: () => navigate('/jobs'), color: 'bg-blue-500' },
    { icon: '👤', label: 'Add Candidate', onClick: () => navigate('/candidates'), color: 'bg-green-500' },
    { icon: '🤖', label: 'AI Parse', onClick: () => navigate('/ai-tools'), color: 'bg-purple-500' },
  ];

  return (
    <div className="fixed bottom-8 right-8 z-50">
      {/* Quick Actions Menu */}
      {isOpen && (
        <div className="mb-4 space-y-3">
          {actions.map((action, index) => (
            <button
              key={index}
              onClick={() => {
                action.onClick();
                setIsOpen(false);
              }}
              className={`${action.color} hover:opacity-90 text-white px-6 py-3 rounded-full shadow-lg flex items-center gap-3 transition-all transform hover:scale-105 animate-slideInRight`}
              style={{ animationDelay: `${index * 50}ms` }}
            >
              <span className="text-2xl">{action.icon}</span>
              <span className="font-semibold">{action.label}</span>
            </button>
          ))}
        </div>
      )}

      {/* Main FAB Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`${
          isOpen ? 'bg-red-500 rotate-45' : 'bg-blue-600'
        } hover:opacity-90 text-white h-16 w-16 rounded-full shadow-2xl flex items-center justify-center transition-all transform hover:scale-110`}
      >
        <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
        </svg>
      </button>
    </div>
  );
};

export default QuickActions;
