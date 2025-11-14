/**
 * Application Management Routes
 */

import { Router } from 'express';
import { authenticate, authorize } from '../middleware/auth';

const router = Router();

router.use(authenticate);

router.get('/', async (req, res) => {
  res.json({ message: 'Get all applications' });
});

router.post('/', async (req, res) => {
  res.json({ message: 'Create application' });
});

router.get('/:id', async (req, res) => {
  res.json({ message: `Get application ${req.params.id}` });
});

router.put(
  '/:id/status',
  authorize('HR_MANAGER', 'RECRUITER', 'ADMIN'),
  async (req, res) => {
    res.json({ message: `Update application status ${req.params.id}` });
  },
);

export default router;
