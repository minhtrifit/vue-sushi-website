import { prisma } from '@/libs/prisma';
import { Contact, GetContactsParams } from '@/models/Contact';
import { PagingType } from '@/models';

export enum ContactError {
  NOT_FOUND = 'CONTACT_NOT_FOUND'
}

export const contactService = {
  async getList(params: GetContactsParams) {
    const page = Math.max(Number(params.page) || 1, 1);
    const limit = Math.min(Number(params.limit) || 10, 100);

    const q = (params.q as string)?.trim();

    const skip = (page - 1) * limit;

    // Build where condition
    const where: any = {
      ...(q && {
        OR: [{ email: { contains: q, mode: 'insensitive' } }]
      })
    };

    const [data, total] = await Promise.all([
      prisma.contact.findMany({
        where,
        skip,
        take: limit,
        orderBy: { createdAt: 'desc' }
      }),
      prisma.contact.count({ where })
    ]);

    const paging: PagingType = {
      current_page: page,
      total_item: data.length,
      total_page: Math.ceil(total / limit),
      total
    };

    return {
      data,
      paging
    };
  },

  async create(payload: Contact) {
    const { email } = payload;

    const newContact: Partial<Contact> = {
      email: email
    };

    const contact = await prisma.contact.create({
      data: newContact as Contact
    });

    return contact;
  }
};
