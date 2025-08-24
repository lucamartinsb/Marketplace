import { useState } from "react";
import { supabase } from "../../services/supabaseClient";
import { useNavigate } from "react-router-dom";

const UserRegistration = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [displayName, setDisplayName] = useState<string>("");
  const navigate = useNavigate();

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const { error } = await supabase.auth.signUp({
        email,
        password,
      });

      if (error) {
        throw error;
      }

      alert(
        "Cadastro realizado com sucesso! Verifique seu e-mail para confirmar a conta."
      );
      navigate("/"); // Redireciona para a página de login
    } catch (error: any) {
      alert(error.message);
    }
  };

  return (
    <div className="user-registration-container">
      <h2>Criar Nova Conta</h2>
      <form onSubmit={handleSignUp}>
        <div className="input-group">
        </div>
        <div className="input-group">
          <label htmlFor="email">Seu email: </label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="input-group">
          <label htmlFor="password">Sua senha: </label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit">Cadastrar</button>
      </form>
    </div>
  );
};

export default UserRegistration;
