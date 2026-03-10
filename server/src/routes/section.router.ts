import { Router } from 'express';
import { authenticateAdminHandler, authenticateHandler } from '@/middlewares/auth';
import { validateQuery } from '@/middlewares/validate-query.middleware';
import { validateParams } from '@/middlewares/validate-params.middleware';
import { validateBody } from '@/middlewares/validate.middleware';
import { GetParamsSchema, UpdateSchema } from '@/dtos/section.dto';
import { getSectionByType, updateSection } from '@/controllers/section.controller';

const router = Router();

router.get('/:type', validateParams(GetParamsSchema), getSectionByType);
router.patch('/:id', authenticateHandler, validateBody(UpdateSchema), updateSection);

export default router;
