import "./login.css";

function Login() {


  return (
    <>

      <div classname="login-container">

        <img classname="logo" src="../assets/imgs/Chat.png" alt="Logo do SenaiGPT" />

        <h1 id="meutitulo" classname="titulo">Login</h1>

        <input classname="input" type="email" placeholder="Insira o e-mail" />
        <input classname="input" type="Password" placeholder="Insira a senha" />

        <button classname="btn">Entrar</button>

      </div>





    </>
  )
}

export default Login;