import Joi from 'joi';
import { SectionType } from '@/models/Section';

const typeValues = Object.values(SectionType);

export const GetParamsSchema = Joi.object({
  type: Joi.string()
    .trim()
    .valid(...typeValues)
    .required()
});

export const UpdateSchema = Joi.object({
  mainTitle: Joi.string().min(1).optional(),
  subTitle: Joi.string().min(1).optional(),
  content: Joi.string().min(1).optional()
});
