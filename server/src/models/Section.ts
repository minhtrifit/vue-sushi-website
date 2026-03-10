export enum SectionType {
  HOME = 'HOME',
  ABOUT = 'ABOUT',
  SPECIAL = 'SPECIAL'
}

export interface SectionBase {
  mainTitle: string;
  subTitle: string;
  content: string;
}

export interface Section extends SectionBase {
  id: string;
  type: SectionType;
  createdAt: string;
  updatedAt: string;
}
