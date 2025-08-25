import { useState } from "react";
import { supabase } from "../../services/supabaseClient";
import { Link, useNavigate } from "react-router-dom";
import "./Login.css";
import emailIcon from "../../assets/email.png";
import senhaIcon from "../../assets/senha.png";
import arrowRightOrange from "../../assets/arrowRightOrange.png";
import arrowRightWhite from "../../assets/arrowRightWhite.png";

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
    <div className="main-container">
      <div className="title-container">
        <h1>Acesse sua conta</h1>
        <h2>Informe seu e-mail e senha para entrar</h2>
      </div>
      <form onSubmit={handleLogin}>
        <div className="input-group">
          <label htmlFor="email">E-MAIL</label>
          <div className="inputContainer">
            <img src={emailIcon} alt="" />
            <input
              placeholder="Seu email cadastrado"
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
        </div>
        <div className="input-group">
          <label htmlFor="password">SENHA</label>
          <div className="inputContainer">
            <img src={senhaIcon} />
            <input
              placeholder="Sua senha de acesso"
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
        </div>
        <button type="submit">
          Acessar <img src={arrowRightWhite} />
        </button>
      </form>

      <div className="signup-link">
        <p>Não tem uma conta?</p>
        <Link id="link" to="/signup">
          <button>
            Cadastrar
            <img src={arrowRightOrange} />
          </button>
        </Link>
      </div>
    </div>
  );
};

export default Login;
