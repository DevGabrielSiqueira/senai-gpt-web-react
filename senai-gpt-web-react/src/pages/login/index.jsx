import "./login.css";

import React, { useState } from "react";

import logo from "../../assets/imgs/chat.png"

function Login() {

  const [email, setEmail] = useState();
  const [password, setPassword] = useState();

  const onLoginClick = async () => {

    let response = await fetch("https://senai-gpt-api.azurewebsites.net/login", {

      headers: {
        "content-type": "application/json"
      },
      method: "POST",
      body: JSON.stringify( {
          email: email,
          password: password
      })
    });

    console.log(response)


  }



  return (
    <>

      <header></header>

      <main>

        <div className="login-container">

          <img className="logo" src={logo} alt="Logo do SenaiGPT" />

          <h1 id="meutitulo" className="titulo">Login</h1>

          <input className="input" value={email} onChange={event => setEmail(event.target.value)} type="email" placeholder="Insira o e-mail" />
          <input className="input" value={password} onChange={event => setPassword(event.target.value)} type="password" placeholder="Insira a senha" />

          <button className="btn" onClick={() => onLoginClick()}>Entrar</button>

        </div>






      </main>






    </>
  )
}

export default Login;