export type AdDto = {
  id: number;
  name: string;
  description: string;
  price: number;
  tags: string[];
  createdAt: Date;
  ownerId: number | null;
};