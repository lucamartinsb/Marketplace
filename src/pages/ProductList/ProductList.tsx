import { useState, useEffect, useMemo, useCallback } from "react";
import { supabase } from "../../services/supabaseClient";
import { Link, useNavigate } from "react-router-dom";
import type { Product } from "../../types";
import "./ProductList.css";
import "../../styles/style.css";
import lupaIcon from "../../assets/lupa.png";
import statusIcon from "../../assets/status.png";

const ProductList = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [statusFilter, setStatusFilter] = useState<
    "all" | "ativo" | "inativo" | "vendido"
  >("all");

  const fetchProducts = useCallback(async () => {
    let query = supabase.from("products").select("*");
    if (statusFilter !== "all") {
      query = query.eq("status", statusFilter);
    }
    const { data, error } = await query;
    if (error) {
      console.error("Erro ao buscar produtos:", error);
      // Você pode adicionar um estado para exibir uma mensagem de erro na UI
      return;
    }
    setProducts(data as Product[]);
  }, [statusFilter]); // A função só será recriada quando o statusFilter mudar

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]); // O useEffect agora depende da função memorizada

  const navigate = useNavigate();

  const handleLogout = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      console.error("Erro ao sair:", error.message);
      alert("Erro ao sair: " + error.message);
    } else {
      navigate("/"); // Redireciona para a página de login
    }
  };

  const filteredProducts = useMemo(() => {
    return products.filter((product) =>
      product.title.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [products, searchTerm]);

  return (
    <div className="main-container3">
      <div className="title-container">
        <h1>Seus Produtos</h1>
        <p>Acesse e gerencie a sua lista de produtos à venda</p>
      </div>
      <div className="contentContainer">
        <div className="filterContainer">
          <div className="input-group">
            <h3>Filtrar</h3>
            <div className="inputContainer">
              <img src={lupaIcon} />
              <input
                type="text"
                placeholder="Pesquisar"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="inputContainer">
              <img src={statusIcon} />
              <select
                value={statusFilter}
                onChange={(e) =>
                  setStatusFilter(
                    e.target.value as "all" | "ativo" | "inativo" | "vendido"
                  )
                }
              >
                <option value="all">Todos</option>
                <option value="ativo">Ativo</option>
                <option value="inativo">Inativo</option>
                <option value="vendido">Vendido</option>
              </select>
            </div>
          </div>

          <Link to="/add-product" className="new-product-link">
            <button>Novo Produto</button>
          </Link>
          <div className="logout-button-container">
            <button onClick={handleLogout} className="logout-button">
              Sair
            </button>
          </div>
        </div>

        <div className="productListContainer">
          <ul className="product-list">
            {filteredProducts.map((product) => (
              <li key={product.id} className="product-item">
                <img
                  src={product.image_url}
                  alt={product.title}
                  className="product-image"
                />
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
      </div>
    </div>
  );
};

export default ProductList;
