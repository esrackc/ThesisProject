import { useState, useEffect } from 'react';
import toast from 'react-hot-toast';
import { useLanguage } from '../context/LanguageContext';

const defaultCandidates = [
  { id: 1, name: 'John Doe', email: 'john@example.com', position: 'Senior Developer', skills: ['React', 'TypeScript', 'Node.js'], score: 95, status: 'Interviewing' },
  { id: 2, name: 'Jane Smith', email: 'jane@example.com', position: 'Product Manager', skills: ['Product Strategy', 'Agile', 'Analytics'], score: 88, status: 'Screening' },
  { id: 3, name: 'Mike Johnson', email: 'mike@example.com', position: 'UX Designer', skills: ['Figma', 'UI Design', 'Research'], score: 92, status: 'Offered' },
  { id: 4, name: 'Sarah Williams', email: 'sarah@example.com', position: 'Data Analyst', skills: ['Python', 'SQL', 'Tableau'], score: 85, status: 'Applied' },
  { id: 5, name: 'Tom Brown', email: 'tom@example.com', position: 'DevOps Engineer', skills: ['AWS', 'Docker', 'Kubernetes'], score: 90, status: 'Interviewing' },
];

const Candidates = () => {
  const { t } = useLanguage();
  const [searchTerm, setSearchTerm] = useState('');
  const [showAddModal, setShowAddModal] = useState(false);
  const [showViewModal, setShowViewModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedCandidate, setSelectedCandidate] = useState<any>(null);
  const [newCandidateData, setNewCandidateData] = useState({
    name: '',
    email: '',
    position: '',
    skills: '',
    score: 0,
    status: 'Applied'
  });

  // Load from localStorage or use defaults
  const [candidates, setCandidates] = useState<any[]>(() => {
    const saved = localStorage.getItem('candidates');
    if (saved) return JSON.parse(saved);
    return defaultCandidates;
  });

  // Save to localStorage when candidates change
  useEffect(() => {
    localStorage.setItem('candidates', JSON.stringify(candidates));
  }, [candidates]);

  const filteredCandidates = candidates.filter(candidate =>
    candidate.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    candidate.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    candidate.position.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getStatusColor = (status: string) => {
    const colors = {
      'Applied': 'bg-blue-100 text-blue-800',
      'Screening': 'bg-yellow-100 text-yellow-800',
      'Interviewing': 'bg-purple-100 text-purple-800',
      'Offered': 'bg-green-100 text-green-800',
    };
    return colors[status as keyof typeof colors] || 'bg-gray-100 text-gray-800';
  };

  const getScoreColor = (score: number) => {
    if (score >= 90) return 'bg-green-500'; // Excellent - Yeşil
    if (score >= 80) return 'bg-blue-500';  // Very Good - Mavi
    if (score >= 70) return 'bg-yellow-500'; // Good - Sarı
    if (score >= 60) return 'bg-orange-500'; // Fair - Turuncu
    return 'bg-red-500'; // Poor - Kırmızı
  };

  const handleAddCandidate = (e: React.FormEvent) => {
    e.preventDefault();
    const newCandidate = {
      id: candidates.length + 1,
      name: newCandidateData.name,
      email: newCandidateData.email,
      position: newCandidateData.position,
      skills: newCandidateData.skills.split(',').map(s => s.trim()),
      score: newCandidateData.score,
      status: newCandidateData.status
    };
    setCandidates([...candidates, newCandidate]);
    setNewCandidateData({ name: '', email: '', position: '', skills: '', score: 0, status: 'Applied' });
    setShowAddModal(false);
    toast.success('Candidate added successfully!');
  };

  const handleViewCandidate = (candidate: any) => {
    setSelectedCandidate(candidate);
    setShowViewModal(true);
  };

  const handleEditCandidate = (candidate: any) => {
    setSelectedCandidate(candidate);
    setShowEditModal(true);
  };

  const handleSaveEdit = () => {
    if (selectedCandidate) {
      setCandidates(candidates.map(c => 
        c.id === selectedCandidate.id ? selectedCandidate : c
      ));
      setShowEditModal(false);
      toast.success('Candidate updated!');
    }
  };

  const handleDeleteCandidate = (id: number) => {
    if (window.confirm('Are you sure you want to delete this candidate?')) {
      setCandidates(candidates.filter(c => c.id !== id));
      setShowEditModal(false);
      toast.success('Candidate deleted!');
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 transition-colors duration-300">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">{t('candidates.title')}</h1>
        <button 
          onClick={() => setShowAddModal(true)}
          className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold shadow-md transition-colors"
        >
          + Add Candidate
        </button>
      </div>

      {/* Search Bar */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 mb-6 transition-colors duration-300">
        <input
          type="text"
          placeholder={t('candidates.search')}
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="flex-1 px-4 py-2 border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
        <button
          onClick={() => setShowAddModal(true)}
          className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-medium transition-colors"
        >
          {t('candidates.addCandidate')}
        </button>
      </div>

      {/* Candidates Table */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden transition-colors duration-300">
        <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
          <thead className="bg-gray-50 dark:bg-gray-700">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">{t('candidates.name')}</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">{t('candidates.email')}</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">{t('candidates.position')}</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">{t('candidates.skills')}</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">{t('candidates.aiScore')}</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">{t('candidates.status')}</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">{t('candidates.actions')}</th>
            </tr>
          </thead>
          <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
            {filteredCandidates.map((candidate) => (
              <tr key={candidate.id} className="hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div>
                    <div className="text-sm font-medium text-gray-900 dark:text-white">{candidate.name}</div>
                    <div className="text-sm text-gray-500 dark:text-gray-400">{candidate.email}</div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900 dark:text-white">{candidate.position}</div>
                </td>
                <td className="px-6 py-4">
                  <div className="flex flex-wrap gap-1">
                    {candidate.skills.slice(0, 3).map((skill, idx) => (
                      <span key={idx} className="px-2 py-1 text-xs bg-blue-100 text-blue-800 rounded-full">
                        {skill}
                      </span>
                    ))}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <div className="text-sm font-bold text-gray-900 dark:text-white">{candidate.score}</div>
                    <div className="ml-2 w-16 bg-gray-200 rounded-full h-2">
                      <div className={`${getScoreColor(candidate.score)} h-2 rounded-full transition-all`} style={{ width: `${candidate.score}%` }}></div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(candidate.status)}`}>
                    {candidate.status}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <button 
                    onClick={() => handleViewCandidate(candidate)}
                    className="text-blue-600 hover:text-blue-900 dark:text-blue-400 dark:hover:text-blue-300 mr-3"
                  >
                    {t('candidates.view')}
                  </button>
                  <button 
                    onClick={() => handleEditCandidate(candidate)}
                    className="text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-300"
                  >
                    {t('candidates.edit')}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Add Candidate Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-gray-800 rounded-xl p-8 max-w-2xl w-full mx-4">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Add New Candidate</h2>
            <form onSubmit={handleAddCandidate} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Name</label>
                  <input required type="text" value={newCandidateData.name} onChange={(e) => setNewCandidateData({...newCandidateData, name: e.target.value})} className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-lg" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Email</label>
                  <input required type="email" value={newCandidateData.email} onChange={(e) => setNewCandidateData({...newCandidateData, email: e.target.value})} className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-lg" />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Position</label>
                <input required type="text" value={newCandidateData.position} onChange={(e) => setNewCandidateData({...newCandidateData, position: e.target.value})} className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-lg" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Skills (comma separated)</label>
                <input required type="text" value={newCandidateData.skills} onChange={(e) => setNewCandidateData({...newCandidateData, skills: e.target.value})} className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-lg" placeholder="React, TypeScript, Node.js" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">AI Score</label>
                  <input required type="number" min="0" max="100" value={newCandidateData.score} onChange={(e) => setNewCandidateData({...newCandidateData, score: parseInt(e.target.value)})} className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-lg" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Status</label>
                  <select value={newCandidateData.status} onChange={(e) => setNewCandidateData({...newCandidateData, status: e.target.value})} className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-lg">
                    <option>Applied</option>
                    <option>Screening</option>
                    <option>Interviewing</option>
                    <option>Offered</option>
                  </select>
                </div>
              </div>
              <div className="flex gap-3 pt-4">
                <button type="submit" className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-semibold">Add Candidate</button>
                <button type="button" onClick={() => setShowAddModal(false)} className="flex-1 bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 text-gray-800 dark:text-white py-3 rounded-lg font-semibold">Cancel</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* View Candidate Modal */}
      {showViewModal && selectedCandidate && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-gray-800 rounded-xl p-8 max-w-2xl w-full mx-4">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">{selectedCandidate.name}</h2>
            <div className="space-y-4 text-gray-900 dark:text-gray-300">
              <div><strong className="text-gray-900 dark:text-white">Email:</strong> {selectedCandidate.email}</div>
              <div><strong className="text-gray-900 dark:text-white">Position:</strong> {selectedCandidate.position}</div>
              <div>
                <strong className="text-gray-900 dark:text-white">Skills:</strong>
                <div className="flex flex-wrap gap-2 mt-2">
                  {selectedCandidate.skills.map((skill: string, idx: number) => (
                    <span key={idx} className="px-3 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 rounded-full text-sm">{skill}</span>
                  ))}
                </div>
              </div>
              <div><strong className="text-gray-900 dark:text-white">AI Score:</strong> {selectedCandidate.score}%</div>
              <div><strong className="text-gray-900 dark:text-white">Status:</strong> <span className={`px-3 py-1 rounded-full text-sm ${getStatusColor(selectedCandidate.status)}`}>{selectedCandidate.status}</span></div>
            </div>
            <button onClick={() => setShowViewModal(false)} className="w-full mt-6 bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-semibold">Close</button>
          </div>
        </div>
      )}

      {/* Edit Candidate Modal */}
      {showEditModal && selectedCandidate && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-gray-800 rounded-xl p-8 max-w-2xl w-full mx-4">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Edit Candidate</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Name</label>
                <input type="text" value={selectedCandidate.name} onChange={(e) => setSelectedCandidate({...selectedCandidate, name: e.target.value})} className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-lg" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Status</label>
                <select value={selectedCandidate.status} onChange={(e) => setSelectedCandidate({...selectedCandidate, status: e.target.value})} className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-lg">
                  <option>Applied</option>
                  <option>Screening</option>
                  <option>Interviewing</option>
                  <option>Offered</option>
                  <option>Hired</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">AI Score</label>
                <input type="number" min="0" max="100" value={selectedCandidate.score} onChange={(e) => setSelectedCandidate({...selectedCandidate, score: parseInt(e.target.value)})} className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-lg" />
              </div>
            </div>
            <div className="flex gap-3 mt-6">
              <button onClick={handleSaveEdit} className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-semibold">Save Changes</button>
              <button onClick={() => handleDeleteCandidate(selectedCandidate.id)} className="flex-1 bg-red-600 hover:bg-red-700 text-white py-3 rounded-lg font-semibold">Delete</button>
              <button onClick={() => setShowEditModal(false)} className="flex-1 bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 text-gray-800 dark:text-white py-3 rounded-lg font-semibold">Cancel</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Candidates;
