import { prisma } from '@/libs/prisma';
import { Section, SectionType } from '@/models/Section';

export enum SectionError {
  NOT_FOUND = 'SECTION_NOT_FOUND',
  TYPE_NOT_FOUND = 'TYPE_NOT_FOUND'
}

export const sectionService = {
  async getByType(type: SectionType) {
    if (!type) throw new Error(SectionError.TYPE_NOT_FOUND);

    // Find section
    const section = await prisma.section.findUnique({
      where: { type: type }
    });

    if (!section) throw new Error(SectionError.NOT_FOUND);

    return section;
  },

  async update(id: string, payload: Partial<Section>) {
    const { mainTitle, subTitle, content } = payload;

    // 2. Check section by ID
    const section = await prisma.section.findUnique({
      where: { id }
    });

    if (!section) throw new Error(SectionError.NOT_FOUND);

    // 3. Build data update
    const data: any = {};

    if (mainTitle !== undefined) data.mainTitle = mainTitle;
    if (subTitle !== undefined) data.subTitle = subTitle;
    if (content !== undefined) data.content = content;

    // 4. Update
    const updated = await prisma.section.update({
      where: { id },
      data
    });

    return updated;
  }
};
