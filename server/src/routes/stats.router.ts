import { Router } from 'express';
import { GetTrackStatsQuerySchema, PageViewSchema } from '@/dtos/stats.dto';
import { authenticateHandler, authorizeHandler } from '@/middlewares/auth';
import { validateQuery } from '@/middlewares/validate-query.middleware';
import { validateParams } from '@/middlewares/validate-params.middleware';
import { Role } from '@/models/User';
import { validateBody } from '@/middlewares/validate.middleware';
import { getSummary, getTrackStats, getTrackSummary, trackPageView } from '@/controllers/stats.controller';

const router = Router();

router.get('/summary', authenticateHandler, authorizeHandler(Role.ADMIN), getSummary);
router.get(
  '/track/stats',
  authenticateHandler,
  authorizeHandler(Role.ADMIN),
  validateQuery(GetTrackStatsQuerySchema),
  getTrackStats
);
router.get('/track/summary', authenticateHandler, authorizeHandler(Role.ADMIN), getTrackSummary);
router.post('/track', validateBody(PageViewSchema), trackPageView);

export default router;
