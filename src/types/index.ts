export interface Product {
  id: string;
  created_at: string;
  title: string;
  description: string;
  price: number;
  status: 'ativo' | 'inativo' | 'vendido';
  image_url: string;
  category: string;
  user_id: string
}