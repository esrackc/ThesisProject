import { useEffect, useRef, useState } from 'react';
import { Chart, registerables } from 'chart.js';
import { useLanguage } from '../context/LanguageContext';

Chart.register(...registerables);

const Dashboard = () => {
  const { t } = useLanguage();
  const applicationTrendsRef = useRef<HTMLCanvasElement>(null);
  const hiringPipelineRef = useRef<HTMLCanvasElement>(null);

  // Get dynamic data from localStorage
  const [jobs, setJobs] = useState<any[]>([]);
  const [candidates, setCandidates] = useState<any[]>([]);

  useEffect(() => {
    // Load jobs and candidates from localStorage
    const savedJobs = localStorage.getItem('jobs');
    const savedCandidates = localStorage.getItem('candidates');
    
    if (savedJobs) setJobs(JSON.parse(savedJobs));
    if (savedCandidates) setCandidates(JSON.parse(savedCandidates));

    // Refresh every 2 seconds to catch updates
    const interval = setInterval(() => {
      const updatedJobs = localStorage.getItem('jobs');
      const updatedCandidates = localStorage.getItem('candidates');
      if (updatedJobs) setJobs(JSON.parse(updatedJobs));
      if (updatedCandidates) setCandidates(JSON.parse(updatedCandidates));
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  // Calculate dynamic stats
  const totalJobs = jobs.length;
  const activeJobs = jobs.filter(j => j.status === 'Active').length;
  const totalCandidates = candidates.length;
  const interviewingCandidates = candidates.filter(c => c.status === 'Interviewing').length;

  const stats = [
    { label: 'Total Jobs', value: totalJobs.toString(), change: '+12%', color: 'blue' },
    { label: 'Active Jobs', value: activeJobs.toString(), change: '+23%', color: 'green' },
    { label: 'Total Candidates', value: totalCandidates.toString(), change: '+18%', color: 'purple' },
    { label: 'Interviews Scheduled', value: interviewingCandidates.toString(), change: '+8%', color: 'orange' },
  ];

  const recentActivity = [
    { 
      action: 'New application', 
      candidate: 'John Doe', 
      job: 'Senior Developer', 
      time: '2 mins ago',
      type: 'application',
      icon: '📝',
      color: 'blue'
    },
    { 
      action: 'Interview scheduled', 
      candidate: 'Jane Smith', 
      job: 'Product Manager', 
      time: '15 mins ago',
      type: 'interview',
      icon: '📅',
      color: 'purple'
    },
    { 
      action: 'Candidate hired', 
      candidate: 'Mike Johnson', 
      job: 'UX Designer', 
      time: '1 hour ago',
      type: 'hired',
      icon: '🎉',
      color: 'green'
    },
    { 
      action: 'New job posted', 
      candidate: 'HR Team', 
      job: 'Data Analyst', 
      time: '3 hours ago',
      type: 'job',
      icon: '💼',
      color: 'orange'
    },
    { 
      action: 'Resume reviewed', 
      candidate: 'Sarah Williams', 
      job: 'Full Stack Engineer', 
      time: '5 hours ago',
      type: 'review',
      icon: '👁️',
      color: 'indigo'
    },
    { 
      action: 'Offer sent', 
      candidate: 'Tom Brown', 
      job: 'DevOps Engineer', 
      time: '1 day ago',
      type: 'offer',
      icon: '📧',
      color: 'teal'
    },
  ];

  const getActivityStyle = (color: string) => {
    const styles: any = {
      blue: 'bg-blue-50 dark:bg-blue-900/30 border-blue-200 dark:border-blue-700 text-blue-700 dark:text-blue-300',
      purple: 'bg-purple-50 dark:bg-purple-900/30 border-purple-200 dark:border-purple-700 text-purple-700 dark:text-purple-300',
      green: 'bg-green-50 dark:bg-green-900/30 border-green-200 dark:border-green-700 text-green-700 dark:text-green-300',
      orange: 'bg-orange-50 dark:bg-orange-900/30 border-orange-200 dark:border-orange-700 text-orange-700 dark:text-orange-300',
      indigo: 'bg-indigo-50 dark:bg-indigo-900/30 border-indigo-200 dark:border-indigo-700 text-indigo-700 dark:text-indigo-300',
      teal: 'bg-teal-50 dark:bg-teal-900/30 border-teal-200 dark:border-teal-700 text-teal-700 dark:text-teal-300',
    };
    return styles[color] || 'bg-gray-50 dark:bg-gray-700 border-gray-200 dark:border-gray-600 text-gray-700 dark:text-gray-300';
  };

  // Calculate pipeline data from candidates (outside useEffect)
  const appliedCount = candidates.filter(c => c.status === 'Applied').length || 42;
  const screeningCount = candidates.filter(c => c.status === 'Screening').length || 28;
  const interviewingCount = candidates.filter(c => c.status === 'Interviewing').length || 15;
  const offeredCount = candidates.filter(c => c.status === 'Offered').length || 8;
  const hiredCount = candidates.filter(c => c.status === 'Hired').length || 5;

  useEffect(() => {
    // Application Trends Chart (Line Chart) - Using dynamic job count
    if (applicationTrendsRef.current) {
      const ctx = applicationTrendsRef.current.getContext('2d');
      if (ctx) {
        const baseApplications = 45;
        const currentApplications = totalCandidates || 95;
        
        const applicationChart = new Chart(ctx, {
          type: 'line',
          data: {
            labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
            datasets: [
              {
                label: 'Applications',
                data: [
                  Math.floor(baseApplications),
                  Math.floor(baseApplications * 1.3),
                  Math.floor(baseApplications * 1.25),
                  Math.floor(baseApplications * 1.6),
                  Math.floor(baseApplications * 1.9),
                  currentApplications
                ],
                borderColor: 'rgb(59, 130, 246)',
                backgroundColor: 'rgba(59, 130, 246, 0.1)',
                tension: 0.4,
                fill: true,
              },
              {
                label: 'Hires',
                data: [8, 12, 10, 15, 18, hiredCount + 17],
                borderColor: 'rgb(34, 197, 94)',
                backgroundColor: 'rgba(34, 197, 94, 0.1)',
                tension: 0.4,
                fill: true,
              }
            ]
          },
          options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
              legend: {
                display: true,
                position: 'top',
              },
              tooltip: {
                mode: 'index',
                intersect: false,
              }
            },
            scales: {
              y: {
                beginAtZero: true,
                grid: {
                  color: 'rgba(0, 0, 0, 0.05)',
                }
              },
              x: {
                grid: {
                  display: false,
                }
              }
            }
          }
        });
        
        // Store chart reference
        (applicationTrendsRef.current as any).chartInstance = applicationChart;
      }
    }

    // Hiring Pipeline Chart (Funnel/Bar Chart)
    if (hiringPipelineRef.current) {
      const ctx = hiringPipelineRef.current.getContext('2d');
      if (ctx) {
        const pipelineChart = new Chart(ctx, {
          type: 'bar',
          data: {
            labels: ['Applied', 'Screening', 'Interview', 'Offer', 'Hired'],
            datasets: [{
              label: 'Candidates',
              data: [appliedCount, screeningCount, interviewingCount, offeredCount, hiredCount],
              backgroundColor: [
                'rgba(59, 130, 246, 0.8)',
                'rgba(147, 51, 234, 0.8)',
                'rgba(249, 115, 22, 0.8)',
                'rgba(34, 197, 94, 0.8)',
                'rgba(16, 185, 129, 0.8)',
              ],
              borderColor: [
                'rgb(59, 130, 246)',
                'rgb(147, 51, 234)',
                'rgb(249, 115, 22)',
                'rgb(34, 197, 94)',
                'rgb(16, 185, 129)',
              ],
              borderWidth: 2,
            }]
          },
          options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
              legend: {
                display: false,
              },
              tooltip: {
                callbacks: {
                  label: function(context) {
                    return `${context.parsed.y} candidates`;
                  }
                }
              }
            },
            scales: {
              y: {
                beginAtZero: true,
                grid: {
                  color: 'rgba(0, 0, 0, 0.05)',
                }
              },
              x: {
                grid: {
                  display: false,
                }
              }
            }
          }
        });
        
        // Store chart reference
        (hiringPipelineRef.current as any).chartInstance = pipelineChart;
      }
    }

    // Cleanup
    return () => {
      if ((applicationTrendsRef.current as any)?.chartInstance) {
        (applicationTrendsRef.current as any).chartInstance.destroy();
      }
      if ((hiringPipelineRef.current as any)?.chartInstance) {
        (hiringPipelineRef.current as any).chartInstance.destroy();
      }
    };
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 transition-colors duration-300">
      <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">{t('dashboard.title')}</h1>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
        {stats.map((stat) => (
          <div key={stat.label} className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 transition-colors duration-300">
            <h3 className="text-gray-500 dark:text-gray-400 text-sm font-medium">{t('dashboard.totalCandidates')}</h3>
            <div className="flex items-end justify-between">
              <span className="text-3xl font-bold text-gray-900 dark:text-white">{stat.value}</span>
              <span className={`text-sm font-semibold text-${stat.color}-600 dark:text-${stat.color}-400`}>{stat.change}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-12">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 transition-colors duration-300">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">{t('dashboard.applicationTrends')}</h2>
          <div className="h-64">
            <canvas ref={applicationTrendsRef}></canvas>
          </div>
        </div>
        
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 transition-colors duration-300">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">{t('dashboard.hiringPipeline')}</h2>
          <div className="h-64">
            <canvas ref={hiringPipelineRef}></canvas>
          </div>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 transition-colors duration-300">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">{t('dashboard.recentActivity')}</h2>
          <button className="text-sm text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 font-medium">View All →</button>
        </div>
        <div className="space-y-3">
          {recentActivity.map((activity, index) => (
            <div 
              key={index} 
              className={`flex items-start gap-4 p-4 border-l-4 rounded-r-lg transition-all hover:shadow-md ${getActivityStyle(activity.color)}`}
            >
              <div className="flex-shrink-0 text-2xl mt-1">
                {activity.icon}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between gap-2">
                  <div className="flex-1">
                    <p className="font-semibold text-gray-900 dark:text-white mb-1">{activity.action}</p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      <span className="font-medium">{activity.candidate}</span>
                      {' • '}
                      <span>{activity.job}</span>
                    </p>
                  </div>
                  <span className="text-xs text-gray-500 dark:text-gray-400 whitespace-nowrap flex items-center gap-1">
                    <svg className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    {activity.time}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        {/* Activity Summary */}
        <div className="mt-6 pt-6 border-t border-gray-200">
          <div className="grid grid-cols-3 gap-4 text-center">
            <div>
              <p className="text-2xl font-bold text-blue-600">12</p>
              <p className="text-xs text-gray-600 mt-1">Today</p>
            </div>
            <div>
              <p className="text-2xl font-bold text-purple-600">48</p>
              <p className="text-xs text-gray-600 mt-1">This Week</p>
            </div>
            <div>
              <p className="text-2xl font-bold text-green-600">187</p>
              <p className="text-xs text-gray-600 mt-1">This Month</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
