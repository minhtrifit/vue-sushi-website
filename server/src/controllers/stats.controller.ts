import { Request, Response, NextFunction } from 'express';
import { HTTP_STATUS } from '@/constants/http-status-code';
import { StatsError, statsSevice } from '@/services/stats.service';

export const getSummary = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { t } = req;

    const result = await statsSevice.getSummary();

    return res.status(HTTP_STATUS.OK).json({
      success: true,
      data: result,
      message: t('stats.get_summary_successully')
    });
  } catch (error) {
    next(error);
  }
};

export const trackPageView = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { t } = req;

    const { page } = req.validatedBody;

    const track = await statsSevice.trackPageView(page);

    return res.status(HTTP_STATUS.CREATED).json({
      success: true,
      data: track,
      message: t('stats.track_page_successfully')
    });
  } catch (error: any) {
    const { t } = req;

    switch (error.message) {
      default:
        next(error);
    }
  }
};

export const getTrackStats = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { t } = req;

    const data = await statsSevice.getTrackStats(req.validatedQuery);

    return res.status(HTTP_STATUS.CREATED).json({
      success: true,
      data: data,
      message: t('stats.get_track_stats_successfully')
    });
  } catch (error: any) {
    const { t } = req;

    switch (error.message) {
      case StatsError.MONTH_REQUIRED:
        return res.status(HTTP_STATUS.BAD_REQUEST).json({
          success: false,
          data: null,
          message: t('stats.month_is_required')
        });

      case StatsError.QUARTER_REQUIRED:
        return res.status(HTTP_STATUS.BAD_REQUEST).json({
          success: false,
          data: null,
          message: t('stats.quarter_is_required')
        });

      default:
        next(error);
    }
  }
};

export const getTrackSummary = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { t } = req;

    const track = await statsSevice.getTrackSummary();

    return res.status(HTTP_STATUS.CREATED).json({
      success: true,
      data: track,
      message: t('stats.get_track_summary_successfully')
    });
  } catch (error: any) {
    const { t } = req;

    switch (error.message) {
      default:
        next(error);
    }
  }
};
