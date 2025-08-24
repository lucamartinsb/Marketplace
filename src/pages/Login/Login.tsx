import { useState } from "react";
import { supabase } from "../../services/supabaseClient";
import { Link, useNavigate } from "react-router-dom";
import "./Login.css";

const Login = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      if (error) {
        throw error;
      }
      if (data.user) {
        navigate("/products");
      }
    } catch (error: any) {
      alert(error.message);
    }
  };

  return (
    <div className="content">
      <div className="left-content">
    <h1>OOOOOOOOOOOOI</h1>
      </div>
      <div className="login-container">
        <h1>Acesse sua conta</h1>
        <h2>Informe seu e-mail e senha para entrar</h2>
        <form onSubmit={handleLogin}>
          <div className="input-group">
            <label htmlFor="email">E-MAIL</label>
            <input
              placeholder="Seu email cadastrado"
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="input-group">
            <label htmlFor="password">SENHA</label>
            <input
              placeholder="Sua senha de acesso"
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit">Entrar</button>
        </form>
        <div className="signup-link">
          <p>
            Não tem uma conta? <Link to="/signup">Crie uma conta aqui</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
