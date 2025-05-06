import { useNavigate } from 'react-router-dom'; // Importar useNavigate
import { useState } from "react";
import "./login.css";
import logo from "../../assets/imgs/Chat.png";
import robo from "../../assets/imgs/robo.png";

function Login() {

  const navigate = useNavigate();


  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  

  const onLoginClick = async () => {
    let response = await fetch("https://senai-gpt-api.up.railway.app/login", {
      headers: {
        "Content-Type": "application/json",
      },
      method: "POST",
      body: JSON.stringify({
        email: email,
        password: password,
      }),
    });

    if (response.ok) {
      alert("Login Realizado com Sucesso!");
      let json = await response.json();
      let token = json.accessToken;
      localStorage.setItem("meuToken", token);

      // Usando navigate para redirecionar para a página de chat
      navigate("/chat");
    } else {
      if (response.status === 401) {
        alert("Credenciais não encontradas.");
      } else {
        alert("Erro inesperado. Por favor, tente novamente.");
      }
    }
  };

  return (
    <main className="page-container">
      <div className="robo-image">
        <img src={robo} alt="robo" />
      </div>
      <div className="Login-container">
        <img className="login-logo" src={logo} alt="Logo do SenaiGPT" />
        <h1 className="titulo">Login</h1>
        <input
          className="inpt"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          type="email"
          placeholder="Insira o E-mail"
        />
        <input
          className="inpt"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          type="password"
          placeholder="Insira a Senha"
        />
        <button className="btn" onClick={onLoginClick}>
          Entrar
        </button>
      </div>
    </main>
  );
}

export default Login;
