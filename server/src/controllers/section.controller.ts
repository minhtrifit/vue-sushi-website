import { Request, Response, NextFunction } from 'express';
import { HTTP_STATUS } from '@/constants/http-status-code';
import { SectionType } from '@/models/Section';
import { SectionError, sectionService } from '@/services/section.service';

export const getSectionByType = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { t } = req;
    const type = req.params.type;

    const section = await sectionService.getByType(type as SectionType);

    return res.status(HTTP_STATUS.OK).json({
      success: true,
      data: section,
      message: t('section.get_by_type_successfully')
    });
  } catch (error: any) {
    if (error.message === SectionError.TYPE_NOT_FOUND) {
      return res.status(HTTP_STATUS.NOT_FOUND).json({
        success: false,
        data: null,
        message: req.t('section.type_not_found')
      });
    }

    if (error.message === SectionError.NOT_FOUND) {
      return res.status(HTTP_STATUS.NOT_FOUND).json({
        success: false,
        data: null,
        message: req.t('section.section_not_found')
      });
    }

    next(error);
  }
};

export const updateSection = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { t } = req;
    const { id } = req.params;

    const updatedSection = await sectionService.update(id, req.validatedBody);

    return res.status(200).json({
      success: true,
      data: updatedSection,
      message: t('section.update_successfully')
    });
  } catch (error: any) {
    const { t } = req;

    switch (error.message) {
      case SectionError.NOT_FOUND:
        return res.status(HTTP_STATUS.NOT_FOUND).json({
          success: false,
          message: t('section.section_not_found')
        });

      default:
        next(error);
    }
  }
};
