import { Router } from 'express';
import { CreateSchema, GetQuerySchema } from '@/dtos/contact.dto';
import { authenticateHandler, authorizeHandler } from '@/middlewares/auth';
import { validateQuery } from '@/middlewares/validate-query.middleware';
import { validateParams } from '@/middlewares/validate-params.middleware';
import { validateBody } from '@/middlewares/validate.middleware';
import { createContact, getContacts } from '@/controllers/contact.controller';
import { Role } from '@/models/User';

const router = Router();

router.get('/', authenticateHandler, authorizeHandler(Role.ADMIN), validateQuery(GetQuerySchema), getContacts);
router.post('/', validateBody(CreateSchema), createContact);

export default router;
