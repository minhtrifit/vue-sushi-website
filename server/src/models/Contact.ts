export interface GetContactsParams {
  page?: number;
  limit?: number;
  q?: string;
}

export interface ContactBase {
  email: string;
}

export interface Contact extends ContactBase {
  id: string;
  createdAt: string;
}
