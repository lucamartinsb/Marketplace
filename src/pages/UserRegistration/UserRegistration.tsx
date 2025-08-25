import { useState } from "react";
import { supabase } from "../../services/supabaseClient";
import { Link, useNavigate } from "react-router-dom";
import "./UserRegistration.css";
import emailIcon from "../../assets/email.png";
import senhaIcon from "../../assets/senha.png";
import arrowRightOrange from "../../assets/arrowRightOrange.png";
import arrowRightWhite from "../../assets/arrowRightWhite.png";
import profielIcon from "../../assets/profile.png";
import phoneIcon from "../../assets/phone.png";

const UserRegistration = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const navigate = useNavigate();

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      // Criando o usuário na autenticação
      const { error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            name,
            phone,
          },
        },
      });

      if (error) {
        throw error;
      }
      alert("Cadastro realizado com sucesso! Faça login para iniciar a seção."); // Cria uma alerta de confirmação
      navigate("/"); // Redireciona para a página de login
    } catch (error: any) {
      alert(error.message);
    }
  };

  return (
    <div className="main-container2">
      <div className="title-container">
        <h1>Crie sua Conta</h1>
        <h2>Informe seus dados pessoais e de acesso</h2>
      </div>
      <form onSubmit={handleSignUp}>
        <h3>Perfil</h3>
        <div className="input-group">
          <label htmlFor="name">Seu nome:</label>
          <div className="inputContainer">
            <img src={profielIcon} />
            <input
              placeholder="Seu nome completo"
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>

          <label htmlFor="phone">Seu telefone:</label>
          <div className="inputContainer">
            <img src={phoneIcon} />
            <input
              placeholder="(00) 00000-0000"
              type="tel"
              id="phone"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
          </div>
        </div>
        <div className="input-group">
          <h2>Acesso</h2>
          <label htmlFor="email">Seu email:</label>
          <div className="inputContainer">
            <img src={emailIcon} />
            <input
              placeholder="Seu e-mail de acesso"
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="input-group">
            <label htmlFor="password">Sua senha:</label>
            <div className="inputContainer">
              <img src={senhaIcon} />
              <input
                placeholder="Senha de acesso"
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
          </div>
        </div>
        <button type="submit">
          Cadastrar<img src={arrowRightWhite}></img>
        </button>
      </form>
      <div className="signup-link">
        <p>Já tem uma conta?</p>
        <Link id="link" to="/">
          <button>
            Acessar
            <img src={arrowRightOrange} />
          </button>
        </Link>
      </div>
    </div>
  );
};

export default UserRegistration;
