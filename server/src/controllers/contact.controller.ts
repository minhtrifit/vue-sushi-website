import { Request, Response, NextFunction } from 'express';
import { HTTP_STATUS } from '@/constants/http-status-code';
import { contactService } from '@/services/contact.service';

export const getContacts = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { t } = req;

    const result = await contactService.getList(req.query);

    return res.status(HTTP_STATUS.OK).json({
      success: true,
      data: result,
      message: t('user.get_list_successfully')
    });
  } catch (error) {
    next(error);
  }
};

export const createContact = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { t } = req;

    const contact = await contactService.create(req.validatedBody);

    return res.status(HTTP_STATUS.CREATED).json({
      success: true,
      data: contact,
      message: t('contact.create_successfully')
    });
  } catch (error: any) {
    const { t } = req;

    switch (error.message) {
      default:
        next(error);
    }
  }
};
