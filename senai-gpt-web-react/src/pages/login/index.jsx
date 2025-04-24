
import "./login.css";
import logo from "../../assets/imgs/Chat.png";
import { useState } from "react";

function Login() {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onLoginClick = async () => {

    let response = await fetch("https://senai-gpt-api.azurewebsites.net/login", {

      headers: {
        "Content-Type": "application/json"
      },
      method: "POST",
      body: JSON.stringify({
        email: email,
        password: password
      })

    });

    console.log(response);

    if (response.ok == true) {

      alert("Login Realizado com Sucesso!")

      console.log(response)

      let json = await response.json()
      let token = json.accessToken;

      console.log("token: " + token)

      //  LOCALSTORAGE:
      localStorage.setItem("meuToken", token)

      //  COOKIES:
      // function setCookie(name, value, days) {
      //   const data = new Date();
      //   data.setTime(Date.getTime() + (days * 24 * 60 * 60 * 1000));
      //   const expires = "expires=" + Date.toUTCString();
      //   document.cookie = `${name}=${value}; ${expires}; path=/`;
      // }

      // setCookie("meuToken", token, 7);

      window.location.href = "/chat";

    } else {

      if (response.status == 401) {

        alert("Credenciais nao encontrada.")

      } else {

        alert("Erro inesperado aconteceu, Por favor saia daqui!")

      }

    }

  }

  return (
    <>

      <hearder>

      </hearder>

      <main className="page-container">

        <div className="robo-image">
        </div>

        <div className="Login-container">

          <img className="login-logo" src={logo} alt="Logo do SenaiGPT" />

          <h1 id="meutitulo" className="titulo">Login</h1>

          <input className="inpt" value={email} onChange={event => setEmail(event.target.value)} type="email" placeholder="Insira o E-mail" />
          <input className="inpt" value={password} onChange={event => setPassword(event.target.value)} type="password" placeholder="Insira uma Senha" />

          <button className="btn" onClick={() => onLoginClick()}>Entrar</button>

        </div>



      </main>

    </>
  )
}

export default Login;


// GET : Listar, Trazer, Buscar
// POST : Envia qualquer coisa (cadastra)
// PUT : Serve para atualizar algum valor ja mandado (Atualizar o Ussuario)
// DELETE : Remove

// Listas de Error:
// 200-299 : deu Certo
// 400-499 : Error no Front-End
// 500-599 : Error no Servido
