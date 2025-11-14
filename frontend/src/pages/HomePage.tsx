import { Link } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';

const HomePage = () => {
  const { t } = useLanguage();
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        
        {/* Hero Section */}
        <div className="text-center mb-20">
          <h1 className="text-5xl md:text-6xl font-extrabold text-gray-900 dark:text-white mb-6">
            {t('home.title')} <span className="text-blue-600 dark:text-blue-400">{t('home.recruitment')}</span>
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-3xl mx-auto">
            {t('home.subtitle')}
          </p>
          <div className="flex justify-center gap-4">
            <Link to="/dashboard" className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-lg text-lg font-semibold shadow-lg transition-all transform hover:scale-105">
              {t('home.getStarted')}
            </Link>
            <Link to="/ai-tools" className="bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 text-blue-600 dark:text-blue-400 px-8 py-4 rounded-lg text-lg font-semibold shadow-lg transition-all transform hover:scale-105">
              {t('home.explore')}
            </Link>
          </div>
        </div>

        {/* Features Grid */}
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3 mb-20">
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8 hover:shadow-2xl transition-all duration-300">
            <div className="flex items-center justify-center h-16 w-16 rounded-lg bg-blue-500 dark:bg-blue-600 text-white mb-6 mx-auto">
              <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-3 text-center">AI Resume Parsing</h3>
            <p className="text-gray-600 dark:text-gray-300 text-center">
              Extract structured information from resumes automatically with 92% accuracy using advanced NLP.
            </p>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8 hover:shadow-2xl transition-all duration-300">
            <div className="flex items-center justify-center h-16 w-16 rounded-lg bg-green-500 dark:bg-green-600 text-white mb-6 mx-auto">
              <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
            </div>
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-3 text-center">Smart Matching</h3>
            <p className="text-gray-600 dark:text-gray-300 text-center">
              Match candidates to jobs with 85% correlation to expert recruiter assessments.
            </p>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8 hover:shadow-2xl transition-all duration-300">
            <div className="flex items-center justify-center h-16 w-16 rounded-lg bg-purple-500 dark:bg-purple-600 text-white mb-6 mx-auto">
              <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-3 text-center">40% Faster</h3>
            <p className="text-gray-600 dark:text-gray-300 text-center">
              Reduce time-to-hire significantly with automated screening and instant rankings.
            </p>
          </div>
        </div>

        {/* Stats Section */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl p-12 mb-20 transition-all duration-300">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white text-center mb-12">System Performance Metrics</h2>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-5xl font-extrabold text-blue-600 dark:text-blue-400 mb-2">92%</div>
              <div className="text-gray-600 dark:text-gray-300 font-medium">Resume Parsing Accuracy</div>
            </div>
            <div className="text-center">
              <div className="text-5xl font-extrabold text-green-600 dark:text-green-400 mb-2">85%</div>
              <div className="text-gray-600 dark:text-gray-300 font-medium">Matching Correlation</div>
            </div>
            <div className="text-center">
              <div className="text-5xl font-extrabold text-purple-600 dark:text-purple-400 mb-2">40%</div>
              <div className="text-gray-600 dark:text-gray-300 font-medium">Time Reduction</div>
            </div>
            <div className="text-center">
              <div className="text-5xl font-extrabold text-orange-600 dark:text-orange-400 mb-2">&lt;2s</div>
              <div className="text-gray-600 dark:text-gray-300 font-medium">Response Time</div>
            </div>
          </div>
        </div>

        {/* Tech Stack */}
        <div className="text-center">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">Built with Modern Technologies</h2>
          <div className="flex flex-wrap justify-center gap-4">
            {['React + TypeScript', 'Node.js + Express', 'PostgreSQL', 'OpenAI GPT-4', 'TailwindCSS'].map((tech) => (
              <div key={tech} className="bg-white dark:bg-gray-800 px-6 py-3 rounded-lg shadow-md font-semibold text-gray-700 dark:text-gray-300 transition-all duration-300">
                {tech}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-800 dark:bg-gray-950 text-white py-8 mt-20 transition-all duration-300">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <p className="text-sm">© 2025 AI-HR Management System | Warsaw Management University</p>
          <p className="text-xs text-gray-400 mt-2">Engineering Thesis Project</p>
        </div>
      </footer>
    </div>
  );
};

export default HomePage;
