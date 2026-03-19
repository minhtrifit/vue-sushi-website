import Joi from 'joi';
import { TrackType } from '@/models/Stats';

const trackTypeValues = Object.values(TrackType);

export const PageViewSchema = Joi.object({
  page: Joi.string().required()
});

export const GetTrackStatsQuerySchema = Joi.object({
  type: Joi.string()
    .min(1)
    .valid(...trackTypeValues)
    .required(),
  year: Joi.number().integer().min(1800).max(3000).required(),
  month: Joi.number().integer().min(1).max(12).optional(),
  quarter: Joi.number().integer().min(1).max(4).optional()
});
