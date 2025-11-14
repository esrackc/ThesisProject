/**
 * AI-Powered Features Routes
 * Handles AI-driven functionality for HR management
 */

import { Router } from 'express';
import { aiController } from '../controllers/ai.controller';
import { authenticate, authorize } from '../middleware/auth';
import multer from 'multer';

const router = Router();

// Configure multer for file uploads
const upload = multer({
  dest: 'uploads/',
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB
  fileFilter: (req, file, cb) => {
    const allowedTypes = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];
    if (allowedTypes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error('Invalid file type. Only PDF and DOC files are allowed.'));
    }
  },
});

/**
 * @route   POST /api/ai/parse-resume
 * @desc    Parse resume using AI and extract candidate information
 * @access  Private (HR Manager, Recruiter)
 */
router.post(
  '/parse-resume',
  authenticate,
  authorize('HR_MANAGER', 'RECRUITER', 'ADMIN'),
  upload.single('resume'),
  aiController.parseResume,
);

/**
 * @route   POST /api/ai/match-candidates
 * @desc    Match candidates to a job using AI algorithms
 * @access  Private (HR Manager, Recruiter)
 */
router.post(
  '/match-candidates',
  authenticate,
  authorize('HR_MANAGER', 'RECRUITER', 'ADMIN'),
  aiController.matchCandidates,
);

/**
 * @route   POST /api/ai/analyze-resume
 * @desc    Analyze resume content and provide insights
 * @access  Private (HR Manager, Recruiter)
 */
router.post(
  '/analyze-resume',
  authenticate,
  authorize('HR_MANAGER', 'RECRUITER', 'ADMIN'),
  aiController.analyzeResume,
);

/**
 * @route   POST /api/ai/sentiment-analysis
 * @desc    Perform sentiment analysis on candidate communication
 * @access  Private (HR Manager, Interviewer)
 */
router.post(
  '/sentiment-analysis',
  authenticate,
  authorize('HR_MANAGER', 'INTERVIEWER', 'ADMIN'),
  aiController.sentimentAnalysis,
);

/**
 * @route   POST /api/ai/generate-job-description
 * @desc    Generate job description using AI
 * @access  Private (HR Manager, Recruiter)
 */
router.post(
  '/generate-job-description',
  authenticate,
  authorize('HR_MANAGER', 'RECRUITER', 'ADMIN'),
  aiController.generateJobDescription,
);

/**
 * @route   POST /api/ai/interview-questions
 * @desc    Generate interview questions based on job requirements
 * @access  Private (HR Manager, Interviewer)
 */
router.post(
  '/interview-questions',
  authenticate,
  authorize('HR_MANAGER', 'INTERVIEWER', 'ADMIN'),
  aiController.generateInterviewQuestions,
);

/**
 * @route   POST /api/ai/predict-success
 * @desc    Predict candidate success probability
 * @access  Private (HR Manager)
 */
router.post(
  '/predict-success',
  authenticate,
  authorize('HR_MANAGER', 'ADMIN'),
  aiController.predictCandidateSuccess,
);

export default router;
