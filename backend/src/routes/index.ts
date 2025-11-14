/**
 * Main API Routes
 * Central routing configuration
 */

import { Router } from 'express';
import authRoutes from './auth.routes';
import jobRoutes from './job.routes';
import candidateRoutes from './candidate.routes';
import applicationRoutes from './application.routes';
import aiRoutes from './ai.routes';

const router = Router();

// API version prefix
router.use('/auth', authRoutes);
router.use('/jobs', jobRoutes);
router.use('/candidates', candidateRoutes);
router.use('/applications', applicationRoutes);
router.use('/ai', aiRoutes);

export default router;
