import { useState } from 'react';
import toast from 'react-hot-toast';
import { useLanguage } from '../context/LanguageContext';

const AITools = () => {
  const { t } = useLanguage();
  const [resumeFile, setResumeFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [matchingLoading, setMatchingLoading] = useState(false);
  const [parseResult, setParseResult] = useState<any>(null);
  const [matchingResult, setMatchingResult] = useState<any>(null);

  const handleFileUpload = async () => {
    if (!resumeFile) {
      toast.error('Please select a file');
      return;
    }
    setLoading(true);
    
    // Simulate AI processing based on filename
    setTimeout(() => {
      const fileName = resumeFile.name.toLowerCase();
      let demoResult;
      
      // Parse different results based on selected file
      if (fileName.includes('john') || fileName.includes('frontend')) {
        demoResult = {
          name: 'John Doe',
          email: 'john.doe@example.com',
          phone: '+1 (555) 123-4567',
          skills: ['React', 'TypeScript', 'JavaScript', 'Node.js', 'TailwindCSS', 'AWS', 'Docker', 'Git'],
          experience: '5+ years',
          education: 'BS Computer Science, MIT (2019)',
          summary: 'Experienced Frontend Developer with 5+ years of expertise in building modern web applications using React, TypeScript, and Node.js. Passionate about creating responsive, user-friendly interfaces.',
          languages: ['English (Native)', 'Spanish (Fluent)', 'French (Conversational)'],
          certifications: ['AWS Certified Developer', 'React Advanced Certification']
        };
      } else if (fileName.includes('sarah') || fileName.includes('data')) {
        demoResult = {
          name: 'Sarah Williams',
          email: 'sarah.williams@techmail.com',
          phone: '+1 (555) 987-6543',
          skills: ['Python', 'R', 'SQL', 'TensorFlow', 'PyTorch', 'Scikit-learn', 'AWS', 'Spark', 'Docker', 'Kubernetes'],
          experience: '7 years',
          education: 'Ph.D. in Statistics, Stanford University (2017)',
          summary: 'Results-driven Data Scientist with 7 years of experience in machine learning, statistical analysis, and predictive modeling. Proven track record of delivering data-driven solutions.',
          languages: ['English (Native)', 'Mandarin (Professional)', 'German (Basic)'],
          certifications: ['AWS ML Specialty', 'TensorFlow Developer', 'Google Professional Data Engineer']
        };
      } else if (fileName.includes('mike') || fileName.includes('devops')) {
        demoResult = {
          name: 'Mike Johnson',
          email: 'mike.johnson@cloudpro.com',
          phone: '+1 (555) 456-7890',
          skills: ['AWS', 'Azure', 'GCP', 'Kubernetes', 'Docker', 'Terraform', 'Ansible', 'Jenkins', 'Python', 'Go'],
          experience: '6+ years',
          education: 'BS Information Technology, University of Washington (2017)',
          summary: 'Certified DevOps Engineer with 6+ years of experience designing and implementing scalable cloud infrastructure. Expert in container orchestration, CI/CD pipelines, and automation.',
          languages: ['English (Native)', 'Japanese (Intermediate)'],
          certifications: ['AWS Solutions Architect Pro', 'CKA', 'Terraform Associate', 'Azure DevOps Expert']
        };
      } else {
        // Default generic result
        demoResult = {
          name: 'Generic Candidate',
          email: 'candidate@example.com',
          phone: '+1 (555) 000-0000',
          skills: ['JavaScript', 'Python', 'SQL', 'Git', 'Agile'],
          experience: '3 years',
          education: 'BS Computer Science',
          summary: 'Motivated professional with diverse technical background and strong problem-solving skills.',
          languages: ['English (Native)'],
          certifications: []
        };
      }
      
      setParseResult(demoResult);
      toast.success('Resume parsed successfully!');
      setLoading(false);
    }, 2500);
  };

  const handleMatching = () => {
    setMatchingLoading(true);
    
    // Simulate AI matching
    setTimeout(() => {
      const demoMatches = [
        { job: 'Senior Frontend Developer', score: 95, reason: 'Perfect match for React and TypeScript skills' },
        { job: 'Full Stack Engineer', score: 88, reason: 'Strong backend and frontend experience' },
        { job: 'DevOps Engineer', score: 72, reason: 'Good knowledge of AWS and Docker' },
        { job: 'Tech Lead', score: 65, reason: 'Sufficient experience but needs more leadership background' }
      ];
      
      setMatchingResult(demoMatches);
      toast.success('Matching completed!');
      setMatchingLoading(false);
    }, 2000);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 transition-colors duration-300">
      <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">{t('ai.title')}</h1>
      
      <div className="grid md:grid-cols-2 gap-6 mb-8">
        {/* Resume Parser */}
        <div className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-md transition-colors duration-300">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">{t('ai.resumeParser')}</h2>
          <p className="text-gray-600 dark:text-gray-400 mb-4">{t('ai.resumeDesc')}</p>
          
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              {t('ai.selectFile')}
            </label>
            <input 
              type="file" 
              onChange={(e) => setResumeFile(e.target.files?.[0] || null)} 
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500" 
              accept=".pdf,.doc,.docx,.txt" 
            />
            {resumeFile && (
              <p className="mt-2 text-sm text-green-600">✓ {resumeFile.name}</p>
            )}
            <p className="mt-2 text-xs text-gray-500">
              📁 Sample CVs available in: <code className="bg-gray-100 px-2 py-1 rounded">sample-resumes</code> folder
            </p>
          </div>
          
          <button 
            onClick={handleFileUpload}
            disabled={!resumeFile || loading}
            className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 disabled:bg-gray-400 transition-colors"
          >
            {loading ? t('ai.processing') : t('ai.parseResume')}
          </button>
        </div>

        {/* Candidate Matching */}
        <div className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-md transition-colors duration-300">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">{t('ai.candidateMatching')}</h2>
          <p className="text-gray-600 dark:text-gray-400 mb-4">{t('ai.matchingDesc')}</p>
          
          <div className="mb-4 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
            <p className="text-sm text-gray-700 dark:text-gray-300">
              <strong className="text-gray-900 dark:text-white">{t('ai.algorithm')}:</strong> Cosine similarity + Skill matching + Experience weighting
            </p>
            <p className="text-sm text-gray-700 dark:text-gray-300 mt-2">
              <strong className="text-gray-900 dark:text-white">{t('ai.dataSource')}:</strong> Current candidate database
            </p>
          </div>
          
          <button 
            onClick={handleMatching}
            disabled={matchingLoading}
            className="w-full bg-green-600 text-white py-3 rounded-lg font-semibold hover:bg-green-700 disabled:bg-gray-400 transition-colors"
          >
            {matchingLoading ? t('ai.analyzing') : t('ai.startMatching')}
          </button>
        </div>
      </div>

      {/* Parse Results */}
      {parseResult && (
        <div className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-md mb-8 transition-colors duration-300">
          <h3 className="text-2xl font-bold mb-6 text-green-600 dark:text-green-400">✓ Parsed Resume Results</h3>
          
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-semibold text-gray-700 dark:text-gray-300 mb-2">Personal Information</h4>
              <p className="text-gray-900 dark:text-white"><strong>Name:</strong> {parseResult.name}</p>
              <p className="text-gray-900 dark:text-white"><strong>Email:</strong> {parseResult.email}</p>
              <p className="text-gray-900 dark:text-white"><strong>Phone:</strong> {parseResult.phone}</p>
            </div>
            
            <div>
              <h4 className="font-semibold text-gray-700 dark:text-gray-300 mb-2">Professional Details</h4>
              <p className="text-gray-900 dark:text-white"><strong>Experience:</strong> {parseResult.experience}</p>
              <p className="text-gray-900 dark:text-white"><strong>Education:</strong> {parseResult.education}</p>
            </div>
          </div>
          
          <div className="mt-6">
            <h4 className="font-semibold text-gray-700 dark:text-gray-300 mb-2">Skills Extracted</h4>
            <div className="flex flex-wrap gap-2">
              {parseResult.skills.map((skill: string, idx: number) => (
                <span key={idx} className="px-3 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 rounded-full text-sm font-medium">
                  {skill}
                </span>
              ))}
            </div>
          </div>
          
          <div className="mt-6">
            <h4 className="font-semibold text-gray-700 dark:text-gray-300 mb-2">Languages</h4>
            <div className="flex gap-2">
              {parseResult.languages.map((lang: string, idx: number) => (
                <span key={idx} className="px-3 py-1 bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 rounded-full text-sm font-medium">
                  {lang}
                </span>
              ))}
            </div>
          </div>
          
          <div className="mt-6 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
            <h4 className="font-semibold text-gray-700 dark:text-white mb-2">Summary</h4>
            <p className="text-gray-600 dark:text-gray-300">{parseResult.summary}</p>
          </div>
          
          {parseResult.certifications && parseResult.certifications.length > 0 && (
            <div className="mt-6">
              <h4 className="font-semibold text-gray-700 dark:text-gray-300 mb-2">Certifications</h4>
              <div className="flex flex-wrap gap-2">
                {parseResult.certifications.map((cert: string, idx: number) => (
                  <span key={idx} className="px-3 py-1 bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 rounded-full text-sm">
                    ✓ {cert}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {/* Matching Results */}
      {matchingResult && (
        <div className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-md transition-colors duration-300">
          <h3 className="text-2xl font-bold mb-6 text-green-600 dark:text-green-400">✓ Matching Results</h3>
          <div className="space-y-4">
            {matchingResult.map((match, idx) => (
              <div key={idx} className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg border border-gray-200 dark:border-gray-600 flex justify-between items-start">
                <div>
                  <p className="font-semibold text-gray-900 dark:text-white">{match.job}</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">{match.reason}</p>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-2xl font-bold text-blue-600 dark:text-blue-400">{match.score}%</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default AITools;
