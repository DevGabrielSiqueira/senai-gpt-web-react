import { BrowserRouter, Route, Routes } from "react-router-dom";
import NewUser from './pages/NewUser';  // Página de Novo Usuário
import Login from './pages/Login';          
import Chat from "./pages/chat";


function App() {
  const isAuthenticated = () => {
    let token = localStorage.getItem("meuToken");
    return token !== null;
  };

  return (
    <BrowserRouter>
      <Routes>
        {/* Tornando a página de Novo Usuário a principal */}
        <Route path="/" element={<NewUser />} />  {/* Página inicial é Novo Usuário */}
        
        <Route path="/login" element={<Login />} />
        <Route path="/chat" element={isAuthenticated() ? <Chat /> : <Login />} />
        <Route path="/NewUser" element={<NewUser />} />
        <Route path="*" element={<h1>Página não encontrada</h1>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
