export type filters = {
  category?: string;
  pageIndex?: number;
  rating?: number;
  authorId?: number ;
  search?: string;
};

export type Book ={
  id: number,
  title: string,
  description: string,
  imageUrl: string,
  authorId: string,
}