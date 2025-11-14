/**
 * AI Controller
 * Handles all AI-powered features for HR management
 */

import { Request, Response, NextFunction } from 'express';
import { aiService } from '../services/ai.service';
import { ApiError } from '../middleware/errorHandler';
import { validationResult } from 'express-validator';

class AIController {
  /**
   * Parse resume using AI and extract candidate information
   */
  async parseResume(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        throw new ApiError('Validation failed', 400);
      }

      if (!req.file) {
        throw new ApiError('No resume file provided', 400);
      }

      const parsedData = await aiService.parseResume(req.file);

      res.status(200).json({
        success: true,
        message: 'Resume parsed successfully',
        data: parsedData,
      });
    } catch (error) {
      next(error);
    }
  }

  /**
   * Match candidates to a job using AI algorithms
   */
  async matchCandidates(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { jobId } = req.body;

      if (!jobId) {
        throw new ApiError('Job ID is required', 400);
      }

      const matches = await aiService.matchCandidatesToJob(jobId);

      res.status(200).json({
        success: true,
        message: 'Candidates matched successfully',
        data: matches,
      });
    } catch (error) {
      next(error);
    }
  }

  /**
   * Analyze resume content and provide AI-powered insights
   */
  async analyzeResume(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { resumeText, jobDescription } = req.body;

      if (!resumeText) {
        throw new ApiError('Resume text is required', 400);
      }

      const analysis = await aiService.analyzeResumeContent(
        resumeText,
        jobDescription,
      );

      res.status(200).json({
        success: true,
        message: 'Resume analyzed successfully',
        data: analysis,
      });
    } catch (error) {
      next(error);
    }
  }

  /**
   * Perform sentiment analysis on candidate communication
   */
  async sentimentAnalysis(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { text, context } = req.body;

      if (!text) {
        throw new ApiError('Text is required for sentiment analysis', 400);
      }

      const sentiment = await aiService.analyzeSentiment(text, context);

      res.status(200).json({
        success: true,
        message: 'Sentiment analysis completed',
        data: sentiment,
      });
    } catch (error) {
      next(error);
    }
  }

  /**
   * Generate job description using AI
   */
  async generateJobDescription(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { position, department, requirements, experienceLevel } = req.body;

      if (!position) {
        throw new ApiError('Position is required', 400);
      }

      const jobDescription = await aiService.generateJobDescription({
        position,
        department,
        requirements,
        experienceLevel,
      });

      res.status(200).json({
        success: true,
        message: 'Job description generated successfully',
        data: jobDescription,
      });
    } catch (error) {
      next(error);
    }
  }

  /**
   * Generate interview questions based on job requirements
   */
  async generateInterviewQuestions(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { jobId, candidateId, interviewType } = req.body;

      if (!jobId) {
        throw new ApiError('Job ID is required', 400);
      }

      const questions = await aiService.generateInterviewQuestions({
        jobId,
        candidateId,
        interviewType,
      });

      res.status(200).json({
        success: true,
        message: 'Interview questions generated successfully',
        data: questions,
      });
    } catch (error) {
      next(error);
    }
  }

  /**
   * Predict candidate success probability
   */
  async predictCandidateSuccess(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { candidateId, jobId } = req.body;

      if (!candidateId || !jobId) {
        throw new ApiError('Candidate ID and Job ID are required', 400);
      }

      const prediction = await aiService.predictSuccess(candidateId, jobId);

      res.status(200).json({
        success: true,
        message: 'Candidate success predicted',
        data: prediction,
      });
    } catch (error) {
      next(error);
    }
  }
}

export const aiController = new AIController();
