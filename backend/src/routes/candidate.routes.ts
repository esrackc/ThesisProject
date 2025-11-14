/**
 * Candidate Management Routes
 */

import { Router } from 'express';
import { authenticate, authorize } from '../middleware/auth';

const router = Router();

router.use(authenticate);

router.get('/', async (req, res) => {
  res.json({ message: 'Get all candidates' });
});

router.post(
  '/',
  authorize('HR_MANAGER', 'RECRUITER', 'ADMIN'),
  async (req, res) => {
    res.json({ message: 'Create candidate' });
  },
);

router.get('/:id', async (req, res) => {
  res.json({ message: `Get candidate ${req.params.id}` });
});

router.put('/:id', async (req, res) => {
  res.json({ message: `Update candidate ${req.params.id}` });
});

export default router;
