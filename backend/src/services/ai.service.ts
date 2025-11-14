/**
 * AI Service
 * Core AI functionality using OpenAI GPT-4
 * Handles resume parsing, candidate matching, and intelligent analysis
 */

import OpenAI from 'openai';
import { PrismaClient } from '@prisma/client';
import { ApiError } from '../middleware/errorHandler';
import fs from 'fs/promises';

const prisma = new PrismaClient();

class AIService {
  private openai: OpenAI;

  constructor() {
    const apiKey = process.env.OPENAI_API_KEY;
    
    if (!apiKey) {
      throw new Error('OpenAI API key is not configured');
    }

    this.openai = new OpenAI({
      apiKey,
    });
  }

  /**
   * Parse resume and extract structured candidate information
   * Uses GPT-4 for intelligent text extraction
   */
  async parseResume(file: Express.Multer.File): Promise<any> {
    try {
      // Read file content
      const fileContent = await fs.readFile(file.path, 'utf-8');

      // Prepare prompt for GPT-4
      const prompt = `
        You are an expert HR assistant. Parse the following resume and extract structured information.
        Extract the following fields in JSON format:
        - firstName
        - lastName
        - email
        - phoneNumber
        - skills (array of strings)
        - experience (array of objects with: company, position, duration, description)
        - education (array of objects with: institution, degree, fieldOfStudy, graduationYear)
        - summary
        
        Resume content:
        ${fileContent}
        
        Respond only with valid JSON.
      `;

      const completion = await this.openai.chat.completions.create({
        model: 'gpt-4',
        messages: [
          {
            role: 'system',
            content: 'You are an expert HR assistant specialized in resume parsing.',
          },
          {
            role: 'user',
            content: prompt,
          },
        ],
        temperature: 0.3,
        max_tokens: 2000,
      });

      const parsedData = JSON.parse(completion.choices[0].message.content || '{}');

      // Clean up uploaded file
      await fs.unlink(file.path);

      return parsedData;
    } catch (error) {
      throw new ApiError('Failed to parse resume', 500);
    }
  }

  /**
   * Match candidates to a job using AI-powered analysis
   * Calculates compatibility scores based on skills, experience, and requirements
   */
  async matchCandidatesToJob(jobId: string): Promise<any[]> {
    try {
      // Fetch job details
      const job = await prisma.job.findUnique({
        where: { id: jobId },
        include: {
          applications: {
            include: {
              candidate: true,
            },
          },
        },
      });

      if (!job) {
        throw new ApiError('Job not found', 404);
      }

      // Analyze each candidate
      const matchedCandidates = await Promise.all(
        job.applications.map(async (application: any) => {
          const score = await this.calculateMatchScore(
            job,
            application.candidate,
          );

          return {
            candidateId: application.candidate.id,
            candidateName: `${application.candidate.firstName} ${application.candidate.lastName}`,
            matchScore: score.overall,
            skillsMatch: score.skills,
            experienceMatch: score.experience,
            insights: score.insights,
          };
        }),
      );

      // Sort by match score
      return matchedCandidates.sort((a, b) => b.matchScore - a.matchScore);
    } catch (error) {
      throw new ApiError('Failed to match candidates', 500);
    }
  }

  /**
   * Calculate match score between job and candidate using AI
   */
  private async calculateMatchScore(job: any, candidate: any): Promise<any> {
    try {
      const prompt = `
        You are an expert HR consultant. Analyze the match between this job and candidate.
        Provide a compatibility score (0-100) and insights.
        
        Job Details:
        - Title: ${job.title}
        - Required Skills: ${job.skills.join(', ')}
        - Experience Level: ${job.experienceLevel}
        - Requirements: ${job.requirements.join(', ')}
        
        Candidate Details:
        - Skills: ${candidate.skills.join(', ')}
        - Experience: ${candidate.yearsOfExperience} years
        - Current Position: ${candidate.currentPosition}
        
        Provide response in JSON format:
        {
          "overall": number (0-100),
          "skills": number (0-100),
          "experience": number (0-100),
          "insights": string (brief analysis)
        }
      `;

      const completion = await this.openai.chat.completions.create({
        model: 'gpt-4',
        messages: [
          {
            role: 'system',
            content: 'You are an expert HR consultant specialized in candidate evaluation.',
          },
          {
            role: 'user',
            content: prompt,
          },
        ],
        temperature: 0.5,
        max_tokens: 500,
      });

      return JSON.parse(completion.choices[0].message.content || '{}');
    } catch (error) {
      // Fallback to basic matching if AI fails
      return {
        overall: 50,
        skills: 50,
        experience: 50,
        insights: 'Unable to perform AI analysis',
      };
    }
  }

  /**
   * Analyze resume content and provide detailed insights
   */
  async analyzeResumeContent(resumeText: string, jobDescription?: string): Promise<any> {
    try {
      const prompt = `
        Analyze this resume and provide comprehensive feedback:
        
        Resume:
        ${resumeText}
        
        ${jobDescription ? `Job Description: ${jobDescription}` : ''}
        
        Provide analysis in JSON format:
        {
          "strengths": array of strings,
          "weaknesses": array of strings,
          "recommendations": array of strings,
          "keywords": array of relevant keywords,
          "overallScore": number (0-100)
        }
      `;

      const completion = await this.openai.chat.completions.create({
        model: 'gpt-4',
        messages: [
          {
            role: 'system',
            content: 'You are an expert career coach and resume reviewer.',
          },
          {
            role: 'user',
            content: prompt,
          },
        ],
        temperature: 0.6,
        max_tokens: 1000,
      });

      return JSON.parse(completion.choices[0].message.content || '{}');
    } catch (error) {
      throw new ApiError('Failed to analyze resume', 500);
    }
  }

  /**
   * Perform sentiment analysis on text
   */
  async analyzeSentiment(text: string, context?: string): Promise<any> {
    try {
      const prompt = `
        Perform sentiment analysis on the following text.
        ${context ? `Context: ${context}` : ''}
        
        Text:
        ${text}
        
        Provide analysis in JSON format:
        {
          "sentiment": "positive" | "neutral" | "negative",
          "confidence": number (0-1),
          "emotions": array of detected emotions,
          "summary": brief summary
        }
      `;

      const completion = await this.openai.chat.completions.create({
        model: 'gpt-4',
        messages: [
          {
            role: 'system',
            content: 'You are an expert in sentiment analysis and emotional intelligence.',
          },
          {
            role: 'user',
            content: prompt,
          },
        ],
        temperature: 0.3,
        max_tokens: 300,
      });

      return JSON.parse(completion.choices[0].message.content || '{}');
    } catch (error) {
      throw new ApiError('Failed to analyze sentiment', 500);
    }
  }

  /**
   * Generate professional job description using AI
   */
  async generateJobDescription(params: {
    position: string;
    department?: string;
    requirements?: string[];
    experienceLevel?: string;
  }): Promise<any> {
    try {
      const prompt = `
        Generate a professional job description for the following position:
        
        Position: ${params.position}
        Department: ${params.department || 'Not specified'}
        Experience Level: ${params.experienceLevel || 'Mid-level'}
        Requirements: ${params.requirements?.join(', ') || 'Standard requirements'}
        
        Include:
        - Job title
        - Brief overview
        - Key responsibilities (5-7 points)
        - Required qualifications
        - Preferred qualifications
        - Benefits and perks
        
        Provide in JSON format with these fields.
      `;

      const completion = await this.openai.chat.completions.create({
        model: 'gpt-4',
        messages: [
          {
            role: 'system',
            content: 'You are an expert HR professional specialized in writing compelling job descriptions.',
          },
          {
            role: 'user',
            content: prompt,
          },
        ],
        temperature: 0.7,
        max_tokens: 1500,
      });

      return JSON.parse(completion.choices[0].message.content || '{}');
    } catch (error) {
      throw new ApiError('Failed to generate job description', 500);
    }
  }

  /**
   * Generate interview questions based on job and candidate
   */
  async generateInterviewQuestions(params: {
    jobId: string;
    candidateId?: string;
    interviewType?: string;
  }): Promise<any> {
    try {
      const job = await prisma.job.findUnique({
        where: { id: params.jobId },
      });

      if (!job) {
        throw new ApiError('Job not found', 404);
      }

      let candidate = null;
      if (params.candidateId) {
        candidate = await prisma.candidate.findUnique({
          where: { id: params.candidateId },
        });
      }

      const prompt = `
        Generate ${params.interviewType || 'technical'} interview questions for:
        
        Position: ${job.title}
        Skills Required: ${job.skills.join(', ')}
        Experience Level: ${job.experienceLevel}
        
        ${candidate ? `Candidate Background: ${candidate.currentPosition}, ${candidate.yearsOfExperience} years experience` : ''}
        
        Generate 10-15 questions categorized as:
        - Technical questions
        - Behavioral questions
        - Situational questions
        
        Provide in JSON format with categories.
      `;

      const completion = await this.openai.chat.completions.create({
        model: 'gpt-4',
        messages: [
          {
            role: 'system',
            content: 'You are an expert interviewer and talent assessor.',
          },
          {
            role: 'user',
            content: prompt,
          },
        ],
        temperature: 0.8,
        max_tokens: 2000,
      });

      return JSON.parse(completion.choices[0].message.content || '{}');
    } catch (error) {
      throw new ApiError('Failed to generate interview questions', 500);
    }
  }

  /**
   * Predict candidate success probability
   */
  async predictSuccess(candidateId: string, jobId: string): Promise<any> {
    try {
      const candidate = await prisma.candidate.findUnique({
        where: { id: candidateId },
      });

      const job = await prisma.job.findUnique({
        where: { id: jobId },
      });

      if (!candidate || !job) {
        throw new ApiError('Candidate or Job not found', 404);
      }

      const matchScore = await this.calculateMatchScore(job, candidate);

      // AI-enhanced prediction
      const prompt = `
        Predict the success probability of this candidate for the role:
        
        Match Score: ${matchScore.overall}/100
        Candidate Experience: ${candidate.yearsOfExperience} years
        Required Experience: ${job.experienceLevel}
        Skill Match: ${matchScore.skills}/100
        
        Provide prediction in JSON:
        {
          "successProbability": number (0-100),
          "riskFactors": array of strings,
          "strengths": array of strings,
          "recommendation": "hire" | "interview" | "reject",
          "reasoning": string
        }
      `;

      const completion = await this.openai.chat.completions.create({
        model: 'gpt-4',
        messages: [
          {
            role: 'system',
            content: 'You are an expert in predictive HR analytics.',
          },
          {
            role: 'user',
            content: prompt,
          },
        ],
        temperature: 0.4,
        max_tokens: 800,
      });

      return JSON.parse(completion.choices[0].message.content || '{}');
    } catch (error) {
      throw new ApiError('Failed to predict success', 500);
    }
  }
}

export const aiService = new AIService();
