import { Router } from 'express';
import { authenticateHandler, authorizeHandler } from '@/middlewares/auth';
import { validateQuery } from '@/middlewares/validate-query.middleware';
import { validateParams } from '@/middlewares/validate-params.middleware';
import { Role } from '@/models/User';
import {
  CreateSchema,
  GetParamsSchema,
  GetQuerySchema,
  GetShowcaseByCategoryIdParamsSchema,
  UpdateSchema
} from '@/dtos/product.dto';
import {
  getProducts,
  getProduct,
  createProduct,
  updateProduct,
  getAllProducts,
  getShowcaseProductsByCategoryId
} from '@/controllers/product.controller';
import { validateBody } from '@/middlewares/validate.middleware';

const router = Router();

router.get('/', validateQuery(GetQuerySchema), getProducts);
router.get('/detail/:id', validateParams(GetParamsSchema), getProduct);
router.get('/all', authenticateHandler, authorizeHandler(Role.ADMIN), getAllProducts);
router.get(
  '/showcase/:categoryId',
  validateParams(GetShowcaseByCategoryIdParamsSchema),
  getShowcaseProductsByCategoryId
);
router.post('/', authenticateHandler, authorizeHandler(Role.ADMIN), validateBody(CreateSchema), createProduct);
router.patch('/edit/:id', authenticateHandler, authorizeHandler(Role.ADMIN), validateBody(UpdateSchema), updateProduct);

export default router;
