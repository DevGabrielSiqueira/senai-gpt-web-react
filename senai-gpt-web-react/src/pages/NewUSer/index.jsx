import "./style.css";
import logo from "../../assets/imgs/Chat.png";
import { useState } from "react";
import robo from "../../assets/imgs/robo.png";

function NewUSer() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [username, setUsername] = useState("");  // Novo campo para nome de usuário

  const onRegisterClick = async () => {
    if (!email || !password || !confirmPassword || !username) {
      alert("Preencha todos os campos!");
      return;
    }

    if (password !== confirmPassword) {
      alert("As senhas não coincidem!");
      return;
    }

    try {
      let response = await fetch("https://senai-gpt-api.up.railway.app/users", {
        headers: {
          "Content-Type": "application/json",
        },
        method: "POST",
        body: JSON.stringify({ email, password, username }),  // Incluindo nome de usuário no corpo da requisição
      });

      if (response.ok) {
        alert("Usuário cadastrado com sucesso!");
        window.location.href = "/login"; // Redireciona para login
      } else if (response.status === 409) {
        alert("E-mail já cadastrado!");
      } else {
        alert("Erro inesperado. Tente novamente.");
      }
    } catch (error) {
      console.error("Erro no cadastro:", error);
      alert("Erro ao conectar com o servidor.");
    }
  };

  return (
    <main className="page-container">
      <div className="robo-image">
        <img src={robo} alt="cadastro" />
      </div>

      <div className="Login-container">
        <img className="login-logo" src={logo} alt="Logo do SenaiGPT" />
        <h1 className="titulo">Novo Usuário</h1>

        <input
          className="inpt"
          value={username}
          onChange={(event) => setUsername(event.target.value)}
          type="text"
          placeholder="Insira o Nome de Usuário"
        />

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
          placeholder="Insira uma Senha"
        />

        <input
          className="inpt"
          value={confirmPassword}
          onChange={(event) => setConfirmPassword(event.target.value)}
          type="password"
          placeholder="Confirme a Senha"
        />

        <button className="btn" onClick={onRegisterClick}>
          Cadastrar
        </button>

        <p>
          Já tem uma conta?{" "}
          <a href="/login" style={{ color: "blue", textDecoration: "underline" }}>
            Clique aqui para fazer login
          </a>
        </p>
      </div>
    </main>
  );
}

export default NewUSer;
