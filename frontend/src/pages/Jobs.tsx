import { useState, useEffect } from 'react';
import toast from 'react-hot-toast';
import { useLanguage } from '../context/LanguageContext';

// Default jobs
const defaultJobs = [
  { id: 1, title: 'Senior Frontend Developer', department: 'Engineering', location: 'Remote', type: 'Full-time', applicants: 45, status: 'Active', description: 'Looking for experienced React developer' },
  { id: 2, title: 'Product Manager', department: 'Product', location: 'Warsaw', type: 'Full-time', applicants: 32, status: 'Active', description: 'Lead product strategy and roadmap' },
  { id: 3, title: 'UX Designer', department: 'Design', location: 'Hybrid', type: 'Full-time', applicants: 28, status: 'Active', description: 'Create beautiful user experiences' },
  { id: 4, title: 'Data Analyst', department: 'Analytics', location: 'Remote', type: 'Full-time', applicants: 19, status: 'Active', description: 'Analyze data and provide insights' },
  { id: 5, title: 'DevOps Engineer', department: 'Engineering', location: 'Warsaw', type: 'Contract', applicants: 15, status: 'Draft', description: 'Manage cloud infrastructure' },
];

const Jobs = () => {
  const { t } = useLanguage();
  const [searchTerm, setSearchTerm] = useState('');
  const [departmentFilter, setDepartmentFilter] = useState('All Departments');
  const [statusFilter, setStatusFilter] = useState('All Status');
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [selectedJob, setSelectedJob] = useState<any>(null);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [newJobData, setNewJobData] = useState({
    title: '',
    department: 'Engineering',
    location: '',
    type: 'Full-time',
    description: ''
  });
  const [showManageModal, setShowManageModal] = useState(false);
  const [managingJob, setManagingJob] = useState<any>(null);

  // Load jobs from localStorage or use defaults
  const [jobs, setJobs] = useState<any[]>(() => {
    const savedJobs = localStorage.getItem('jobs');
    if (savedJobs) {
      return JSON.parse(savedJobs);
    }
    return defaultJobs;
  });

  // Save jobs to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('jobs', JSON.stringify(jobs));
  }, [jobs]);

  const filteredJobs = jobs.filter(job => {
    // Search filter
    const matchesSearch = job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         job.department.toLowerCase().includes(searchTerm.toLowerCase());
    
    // Department filter
    const matchesDepartment = departmentFilter === 'All Departments' || 
                             job.department === departmentFilter;
    
    // Status filter
    const matchesStatus = statusFilter === 'All Status' || 
                         job.status === statusFilter;
    
    return matchesSearch && matchesDepartment && matchesStatus;
  });

  const handleCreateJob = () => {
    setShowCreateModal(true);
  };

  const handleViewDetails = (job: any) => {
    setSelectedJob(job);
    setShowDetailsModal(true);
  };

  const handleManage = (job: any) => {
    setManagingJob(job);
    setShowManageModal(true);
  };

  const handleDeleteJob = (jobId: number) => {
    setJobs(jobs.filter(job => job.id !== jobId));
    toast.success('Job deleted successfully!');
    setShowManageModal(false);
  };

  const handleToggleStatus = (jobId: number) => {
    setJobs(jobs.map(job => 
      job.id === jobId 
        ? { ...job, status: job.status === 'Active' ? 'Draft' : 'Active' }
        : job
    ));
    toast.success('Job status updated!');
  };

  const handleResetToDefaults = () => {
    if (window.confirm('Are you sure you want to reset all jobs to default? This will delete all your custom jobs.')) {
      setJobs(defaultJobs);
      toast.success('Jobs reset to defaults!');
    }
  };

  const handleSubmitNewJob = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Create new job object
    const newJob = {
      id: jobs.length + 1,
      title: newJobData.title,
      department: newJobData.department,
      location: newJobData.location,
      type: newJobData.type,
      applicants: 0,
      status: 'Active',
      description: newJobData.description
    };
    
    // Add to jobs list
    setJobs([newJob, ...jobs]);
    
    // Reset form
    setNewJobData({
      title: '',
      department: 'Engineering',
      location: '',
      type: 'Full-time',
      description: ''
    });
    
    toast.success('New job created successfully!');
    setShowCreateModal(false);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 transition-colors duration-300">
      <div className="flex justify-between items-center mb-8">
        <div className="flex items-center gap-4">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">{t('jobs.title')}</h1>
          <span className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm font-medium">
            {jobs.length} total
          </span>
        </div>
        <div className="flex gap-3">
          <button 
            onClick={handleResetToDefaults}
            className="bg-gray-200 hover:bg-gray-300 text-gray-800 px-5 py-3 rounded-lg font-semibold shadow-md transition-colors"
          >
            {t('jobs.resetDefaults')}
          </button>
          <button 
            onClick={handleCreateJob}
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold shadow-md transition-colors"
          >
            {t('jobs.createNew')}
          </button>
        </div>
      </div>

      {/* Search and Filter */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 mb-6 transition-colors duration-300">
        <div className="flex gap-4">
          <input
            type="text"
            placeholder={t('jobs.search')}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="flex-1 px-4 py-2 border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
          <select 
            value={departmentFilter}
            onChange={(e) => setDepartmentFilter(e.target.value)}
            className="px-4 py-2 border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-lg focus:ring-2 focus:ring-blue-500"
          >
            <option value="">{t('jobs.allDepartments')}</option>
            <option>Engineering</option>
            <option>Product</option>
            <option>Design</option>
            <option>Analytics</option>
          </select>
          <select 
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-4 py-2 border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-lg focus:ring-2 focus:ring-blue-500 bg-white"
          >
            <option>{t('jobs.allStatus')}</option>
            <option>{t('jobs.active')}</option>
            <option>{t('jobs.draft')}</option>
          </select>
        </div>
        
        {/* Active Filters Display */}
        {(departmentFilter !== 'All Departments' || statusFilter !== 'All Status' || searchTerm) && (
          <div className="mt-4 flex items-center gap-2">
            <span className="text-sm text-gray-600">Active filters:</span>
            {searchTerm && (
              <span className="px-3 py-1 bg-blue-100 text-blue-800 text-sm rounded-full flex items-center gap-1">
                Search: "{searchTerm}"
                <button onClick={() => setSearchTerm('')} className="hover:text-blue-900">×</button>
              </span>
            )}
            {departmentFilter !== 'All Departments' && (
              <span className="px-3 py-1 bg-green-100 text-green-800 text-sm rounded-full flex items-center gap-1">
                {departmentFilter}
                <button onClick={() => setDepartmentFilter('All Departments')} className="hover:text-green-900">×</button>
              </span>
            )}
            {statusFilter !== 'All Status' && (
              <span className="px-3 py-1 bg-purple-100 text-purple-800 text-sm rounded-full flex items-center gap-1">
                {statusFilter}
                <button onClick={() => setStatusFilter('All Status')} className="hover:text-purple-900">×</button>
              </span>
            )}
            <button 
              onClick={() => {
                setSearchTerm('');
                setDepartmentFilter('All Departments');
                setStatusFilter('All Status');
              }}
              className="text-sm text-gray-600 hover:text-gray-900 underline ml-2"
            >
              Clear all
            </button>
          </div>
        )}
      </div>

      {/* Jobs List */}
      {filteredJobs.length === 0 ? (
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-12 text-center transition-colors duration-300">
          <svg className="mx-auto h-12 w-12 text-gray-400 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          <h3 className="text-lg font-medium text-gray-900 mb-2">No jobs found</h3>
          <p className="text-gray-600">Try adjusting your search or filter criteria</p>
        </div>
      ) : (
        <div className="space-y-4">
          {filteredJobs.map((job) => (
          <div key={job.id} className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 hover:shadow-lg transition-all duration-300">
            <div className="flex justify-between items-start">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white">{job.title}</h3>
                  <span className={`px-3 py-1 rounded-full text-sm font-semibold ${
                    job.status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                  }`}>
                    {job.status}
                  </span>
                </div>
                <div className="flex gap-6 text-sm text-gray-600 dark:text-gray-400">
                  <span>📍 {job.location}</span>
                  <span>🏢 {job.department}</span>
                  <span>💼 {job.type}</span>
                  <span>👥 {job.applicants} {t('jobs.applicants')}</span>
                </div>
              </div>
              <div className="flex gap-2">
                <button 
                  onClick={() => handleViewDetails(job)}
                  className="px-4 py-2 text-blue-600 hover:bg-blue-50 dark:hover:bg-gray-700 rounded-lg font-medium transition-colors"
                >
                  {t('jobs.viewDetails')}
                </button>
                <button 
                  onClick={() => handleManage(job)}
                  className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors"
                >
                  {t('jobs.manage')}
                </button>
              </div>
            </div>
          </div>
        ))}
        </div>
      )}

      {/* Create Job Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-gray-800 rounded-xl p-8 max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">{t('jobs.createNew')}</h2>
              <button onClick={() => setShowCreateModal(false)} className="text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200">
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            
            <form onSubmit={handleSubmitNewJob} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">{t('jobs.jobTitle')}</label>
                <input 
                  type="text" 
                  required 
                  value={newJobData.title}
                  onChange={(e) => setNewJobData({...newJobData, title: e.target.value})}
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-lg focus:ring-2 focus:ring-blue-500" 
                  placeholder="e.g. Senior React Developer" 
                />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">{t('jobs.department')}</label>
                  <select 
                    value={newJobData.department}
                    onChange={(e) => setNewJobData({...newJobData, department: e.target.value})}
                    className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-lg focus:ring-2 focus:ring-blue-500"
                  >
                    <option>Engineering</option>
                    <option>Product</option>
                    <option>Design</option>
                    <option>Analytics</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">{t('jobs.location')}</label>
                  <input 
                    type="text" 
                    required 
                    value={newJobData.location}
                    onChange={(e) => setNewJobData({...newJobData, location: e.target.value})}
                    className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-lg focus:ring-2 focus:ring-blue-500" 
                    placeholder="Remote, Warsaw, etc." 
                  />
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">{t('jobs.jobType')}</label>
                <select 
                  value={newJobData.type}
                  onChange={(e) => setNewJobData({...newJobData, type: e.target.value})}
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-lg focus:ring-2 focus:ring-blue-500"
                >
                  <option>Full-time</option>
                  <option>Part-time</option>
                  <option>Contract</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">{t('jobs.description')}</label>
                <textarea 
                  rows={4} 
                  required 
                  value={newJobData.description}
                  onChange={(e) => setNewJobData({...newJobData, description: e.target.value})}
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-lg focus:ring-2 focus:ring-blue-500" 
                  placeholder="Job description..."
                ></textarea>
              </div>
              
              <div className="flex gap-3 pt-4">
                <button type="submit" className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-semibold">
                  {t('jobs.save')}
                </button>
                <button type="button" onClick={() => setShowCreateModal(false)} className="flex-1 bg-gray-200 dark:bg-gray-600 hover:bg-gray-300 dark:hover:bg-gray-500 text-gray-800 dark:text-white py-3 rounded-lg font-semibold">
                  {t('jobs.cancel')}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Manage Job Modal */}
      {showManageModal && managingJob && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-gray-800 rounded-xl p-8 max-w-md w-full mx-4">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">{t('jobs.manageJob')}</h2>
              <button onClick={() => setShowManageModal(false)} className="text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200">
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            
            <div className="space-y-4">
              <div className="border-b dark:border-gray-700 pb-4">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{managingJob.title}</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">{managingJob.department} • {managingJob.location}</p>
              </div>

              <div className="space-y-3">
                <button
                  onClick={() => handleToggleStatus(managingJob.id)}
                  className="w-full flex items-center justify-between px-4 py-3 bg-blue-50 dark:bg-blue-900/20 hover:bg-blue-100 dark:hover:bg-blue-900/30 rounded-lg transition-colors"
                >
                  <span className="font-medium text-blue-900 dark:text-blue-300">
                    {managingJob.status === 'Active' ? t('jobs.deactivate') : t('jobs.activate')}
                  </span>
                  <svg className="h-5 w-5 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
                  </svg>
                </button>

                <button
                  onClick={() => {
                    setSelectedJob(managingJob);
                    setShowManageModal(false);
                    setShowDetailsModal(true);
                  }}
                  className="w-full flex items-center justify-between px-4 py-3 bg-gray-50 dark:bg-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 rounded-lg transition-colors"
                >
                  <span className="font-medium text-gray-900 dark:text-white">{t('jobs.viewFull')}</span>
                  <svg className="h-5 w-5 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                  </svg>
                </button>

                <button
                  onClick={() => {
                    if (window.confirm(`${t('jobs.confirmDelete')} "${managingJob.title}"?`)) {
                      handleDeleteJob(managingJob.id);
                    }
                  }}
                  className="w-full flex items-center justify-between px-4 py-3 bg-red-50 dark:bg-red-900/20 hover:bg-red-100 dark:hover:bg-red-900/30 rounded-lg transition-colors"
                >
                  <span className="font-medium text-red-900 dark:text-red-300">{t('jobs.delete')}</span>
                  <svg className="h-5 w-5 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                  </svg>
                </button>
              </div>

              <button 
                onClick={() => setShowManageModal(false)} 
                className="w-full mt-6 bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 text-gray-800 dark:text-white py-3 rounded-lg font-semibold"
              >
                {t('jobs.close')}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Job Details Modal */}
      {showDetailsModal && selectedJob && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-gray-800 rounded-xl p-8 max-w-2xl w-full mx-4">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">{selectedJob.title}</h2>
              <button onClick={() => setShowDetailsModal(false)} className="text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200">
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            
            <div className="space-y-4">
              <div className="flex gap-4">
                <span className={`px-3 py-1 rounded-full text-sm font-semibold ${selectedJob.status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}`}>
                  {selectedJob.status}
                </span>
              </div>
              
              <div className="grid grid-cols-2 gap-4 pt-4">
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Department</p>
                  <p className="font-semibold text-gray-900 dark:text-white">{selectedJob.department}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Location</p>
                  <p className="font-semibold text-gray-900 dark:text-white">{selectedJob.location}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Type</p>
                  <p className="font-semibold text-gray-900 dark:text-white">{selectedJob.type}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Applicants</p>
                  <p className="font-semibold text-gray-900 dark:text-white">{selectedJob.applicants}</p>
                </div>
              </div>
              
              <div className="pt-4">
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">Description</p>
                <p className="text-gray-800 dark:text-gray-300">{selectedJob.description}</p>
              </div>
              
              <button onClick={() => setShowDetailsModal(false)} className="w-full mt-6 bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-semibold">
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Jobs;
