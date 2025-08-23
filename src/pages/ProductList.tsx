import { useState, useEffect, useMemo } from 'react';
import { supabase } from '../services/supabaseClient';
import { Link } from 'react-router-dom';
import type { Product } from '../types';

const ProductList = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [statusFilter, setStatusFilter] = useState<'all' | 'ativo' | 'inativo' | 'vendido'>('all');

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts, statusFilter]);

  const fetchProducts = async () => {
    let query = supabase.from('products').select('*');
    if (statusFilter !== 'all') {
      query = query.eq('status', statusFilter);
    }
    const { data, error } = await query;
    if (error) {
      console.error('Erro ao buscar produtos:', error);
      return;
    }
    setProducts(data as Product[]);
  };

  const filteredProducts = useMemo(() => {
    return products.filter((product) =>
      product.title.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [products, searchTerm]);

  return (
    <div className="product-list-container">
      <h2>Lista de Produtos</h2>
      <div className="controls">
        <input
          type="text"
          placeholder="Filtrar por nome"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value as any)}>
          <option value="all">Todos</option>
          <option value="ativo">Ativo</option>
          <option value="inativo">Inativo</option>
          <option value="vendido">Vendido</option>
        </select>
      </div>

      <Link to="/add-product" className="new-product-link">
        <button>Novo Produto</button>
      </Link>

      <ul className="product-list">
        {filteredProducts.map((product) => (
          <li key={product.id} className="product-item">
            <img src={product.image_url} alt={product.title} className="product-image" />
            <div className="product-details">
              <h3>{product.title}</h3>
              <p>{product.description}</p>
              <p>Preço: R${product.price}</p>
              <p>Status: {product.status}</p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ProductList;