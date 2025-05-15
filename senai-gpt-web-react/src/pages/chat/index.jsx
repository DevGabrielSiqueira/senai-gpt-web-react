import "./index.css"
import Logochat from "../../assets/imgs/Chat.png"
import arrowSquare from "../../assets/imgs/ArrowSquareOut.png"
import IconSetWhite from "../../assets/imgs/IconSetWhite.png"
import chatText from "../../assets/imgs/ChatText.png"
import ChatWhite from "../../assets/imgs/ChatWhite.png"
import lixeira from "../../assets/imgs/iconSet.png"
import lixeirawhite from "../../assets/imgs/lixeirawhite.png"
import sunwhite from "../../assets/imgs/sunwhite.png"
import sol from "../../assets/imgs/Sun.png"
import usuario from "../../assets/imgs/User.png"
import userwhite from "../../assets/imgs/userwhite.png"
import logOut from "../../assets/imgs/logOut.png"
import logOutWhite from "../../assets/imgs/LogOutWhite.png"
import chatsIcon from "../../assets/imgs/chats.png"
import estrela from "../../assets/imgs/iconeestrela.png"
import escudo from "../../assets/imgs/iconeescudo.png"
import audio from "../../assets/imgs/iconeaudio.png"
import anexar from "../../assets/imgs/iconeimg.png"
import enviar from "../../assets/imgs/iconeenviar.png"
import { useEffect, useState } from "react"


function Chat() {
    const [chats, setChats] = useState([]);
    const [chatSelecionado, setChatSelecionado] = useState(null);
    const [userMessage, setUserMessage] = useState("");

    const [darkMode, setDarkMode] = useState(false);

    const [isLeftPanelOpen, setIsLeftPanelOpen] = useState(false);

    useEffect(() => {

        // Executada toda vez que a tela abre
        getChats();

        // verifica se o modo escuro está ativo

        let modoEscuro = localStorage.getItem("darkMode");
        if (modoEscuro === "true") {
            setDarkMode(true);
            document.body.classList.add("dark-mode");
        }
    }, []);

    const getChats = async () => {
        try {
            const response = await fetch("https://senai-gpt-api.azurewebsites.net/users", {
                headers: {
                    "Authorization": "Bearer " + localStorage.getItem("meuToken")
                }
            });

            if (response.ok) {
                const json = await response.json();
                setChats(json);
            } else if (response.status === 401) {
                alert("Token inválido. Faça login novamente.");
                // window.location.href = "/login";
            }
        } catch (error) {
            console.error("Erro ao buscar os chats:", error);
        }
    };

    const onLogOutClick = () => {
        localStorage.clear();
        window.location.href = "/login";
    };

    const clickChat = (chat) => {
        setChatSelecionado(chat);
        setIsLeftPanelOpen(false);
    };

    const newChat = async () => {
        try {
            // 1. Preparar os dados para enviar (o objeto do novo chat)
            const novoChatObjeto = {
                chatTitle: "Novo Chat", // Define um título padrão para o novo chat
                messages: []             // Inicializa o array de mensagens vazio
            };

            // 2. Fazer a chamada para a API para criar um novo chat
            const response = await fetch("https://senai-gpt-api.azurewebsites.net/chats", {
                method: "POST",           // Especifica que é uma requisição de criação
                headers: {
                    "Authorization": "Bearer " + localStorage.getItem("meuToken"), // Envia o token de autenticação
                    "Content-Type": "application/json"    // Indica que estamos enviando dados JSON
                },
                body: JSON.stringify(novoChatObjeto) // Converte o objeto em string JSON para enviar no corpo da requisição
            });

            // 3. Processar a resposta da API
            if (response.status === 201) { // Código de status 201 indica "Created" (criado com sucesso)
                const novoChatDoServidor = await response.json(); // Converte a resposta JSON do servidor para um objeto JavaScript
                setChats([...chats, novoChatDoServidor]);     // Atualiza a lista de chats na tela lateral, adicionando o novo chat
                setChatSelecionado(novoChatDoServidor);      // Define o novo chat como o chat selecionado para exibir na tela central
            } else {
                // 4. Lidar com erros na criação do chat
                console.error("Erro ao criar novo chat:", response.status);
                alert("Erro ao criar novo chat.");
            }

        } catch (error) {
            // 5. Lidar com erros na própria requisição (ex: problema de rede)
            console.error("Erro ao criar novo chat:", error);
            alert("Erro ao criar novo chat.");
        }
    };



    const apagarTodosChats = async () => {
        const confirmacao = window.confirm("Tem certeza de que deseja apagar?");

        if (!confirmacao) return;

        try {
            const deletions = chats.map(chat =>
                fetch(`https://senai-gpt-api.azurewebsites.net/chats/${chat.id}`, {
                    method: "DELETE",
                    headers: {
                        "Authorization": "Bearer " + localStorage.getItem("meuToken")
                    }
                })
            );

            const responses = await Promise.all(deletions);
            const allSuccess = responses.every(response => response.status === 204);

            if (allSuccess) {
                setChats([]);
                setChatSelecionado(null);
                console.log("Todos os chats foram apagados com sucesso.");
            } else {
                alert("Alguns chats não foram apagados corretamente.");
            }
        } catch (error) {
            console.error("Erro ao apagar todos os chats:", error);
            alert("Erro ao apagar todos os chats.");
        }
    };

    const chatGPT = async (message) => {

        return "[Mensagem fixa]"

        const endpoint = "https://ai-testenpl826117277026.openai.azure.com/";
        const apiKey = "DCYQGY3kPmZXr0lh7xeCSEOQ5oiy1aMlN1GeEQd5G5cXjuLWorWOJQQJ99BCACYeBjFXJ3w3AAAAACOGol8N";
        const deploymentId = "gpt-4";
        const apiVersion = "2024-05-01-preview";
        const url = `${endpoint}/openai/deployments/${deploymentId}/chat/completions?api-version=${apiVersion}`;
        const data = {
            messages: [{ role: "user", content: message }],
            max_tokens: 50
        };
        const headers = {
            "Content-Type": "application/json",
            "api-key": apiKey
        };

        const response = await fetch(url, {
            method: "POST",
            headers: headers,
            body: JSON.stringify(data)
        });

        if (response.ok) {
            const result = await response.json();
            const botMessage = result.choices[0].message.content;
            return botMessage;
        }
    };

    const enviarMensagem = async (message) => {
        let userId = localStorage.getItem("meuId");
        let novaMensagemUsuario = {
            text: message,
            id: crypto.randomUUID(),
            userId: userId
        };

        let novoChatSelecionado = { ...chatSelecionado };
        if (novoChatSelecionado && novoChatSelecionado.messages) {
            novoChatSelecionado.messages.push(novaMensagemUsuario);
            setChatSelecionado(novoChatSelecionado);

            let respostaGPT = await chatGPT(message);
            let novaMensagemGPT = {
                text: respostaGPT,
                id: crypto.randomUUID(),
                userId: "chatbot"
            };

            novoChatSelecionado = { ...chatSelecionado };
            novoChatSelecionado.messages.push(novaMensagemGPT);
            setChatSelecionado(novoChatSelecionado);

            console.log("resposta", respostaGPT);

            let response = await fetch(`https://senai-gpt-api.azurewebsites.net/chats/${chatSelecionado.id}`, {
                method: "PUT",
                headers: {
                    "Authorization": "Bearer " + localStorage.getItem("meuToken"),
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(novoChatSelecionado)
            });

            if (!response.ok) {
                console.log("Salvar o chat deu errado.");
            }
        } else {
            console.log("Nenhum chat selecionado para enviar a mensagem.");
        }
        setUserMessage(""); // Limpa o input após enviar a mensagem
    };

    const criarNovoChat = async () => {
        let userId = localStorage.getItem("meuId");

        let novoTitulo = prompt("Insira o título do chat:");

        if (!novoTitulo) {
            alert("Insira um título.");
            return;
        }

        let nChat = {
            chatTitle: novoTitulo,
            id: crypto.randomUUID(),
            userId: userId,
            messages: []
        };



        let response = await fetch("https://senai-gpt-api.azurewebsites.net/users", {
            method: "POST",
            headers: {
                "Authorization": "Bearer " + localStorage.getItem("meuToken"),
                "Content-Type": "application/json"
            },
            body: JSON.stringify(nChat)
        });

        if (response.ok) {
            await getChats();
        } else {
            alert("Erro ao criar o chat.");
        }
    };

    const toggleDarkMode = () => {

        setDarkMode(!darkMode); //inverter o valor do dark mode

        if (darkMode == true) {

            document.body.classList.remove("dark-mode");
        } else {

            document.body.classList.add("dark-mode");
        }

        localStorage.setItem("dark-mode", !darkMode);

    }


    return (
        <div className="container">
            <button className="btn-toggle-panel"
                onClick={() => setIsLeftPanelOpen(!isLeftPanelOpen)}
            >
                ☰

            </button>

            <header className={`left-panel ${isLeftPanelOpen == true ? "open" : ""}`}>
                <div className="top">



                    <div className="botaoNewChatPrincipal">
                        <button onClick={newChat}>+ New Chat</button>
                    </div>
                    {chats.map(chat => (
                        <button key={chat.id} className="btn-chat" onClick={() => clickChat(chat)}>
                            <img src={darkMode == true? ChatWhite:chatText} alt="chat icon" />
                            {chat.chatTitle}
                        </button>
                    ))}
                </div>


                <div className="bottom">
                    <button onClick={apagarTodosChats}><img src={darkMode == true ? lixeirawhite : lixeira} alt="lixeira" />Clear conversations</button>
                    <button onClick={toggleDarkMode}><img src={darkMode == true ? sunwhite : sol} alt="sol" />Light mode </button>
                    <button><img src={darkMode == true ? userwhite : usuario} alt="usuário" />My account</button>
                    <button><img src={darkMode == true ? IconSetWhite : arrowSquare} alt="FAQ" />Updates & FAQ</button>
                    <button onClick={onLogOutClick}><img src={ darkMode == true? logOutWhite:logOut} alt="Log out" />Log out</button>
                </div>
            </header>

            <main className="central-panel">

                {chatSelecionado === null ? (
                    <div className="content-center">
                        <img src={Logochat} alt="SenaiGPT Logo" className="logo" />
                        <div className="info-boxes-container">
                            <div className="info-boxes">
                                <div className="info">
                                    <img src={chatsIcon} alt="icone chat" />
                                    <h3>Examples</h3>
                                    <p>"Explain quantum computing in simple terms"</p>
                                    <p>"Got any creative ideas for a 10 year old's birthday?"</p>
                                    <p>"How do I make an HTTP request in Javascript?"</p>
                                </div>
                                <div className="info">
                                    <img src={estrela} alt="estrela" />
                                    <h3>Capabilities</h3>
                                    <p>Remembers what user said earlier in the conversation.</p>
                                    <p>Allows user to provide follow-up corrections.</p>
                                    <p>Trained to decline inappropriate requests.</p>
                                </div>
                                <div className="info">
                                    <img src={escudo} alt="escudo" />
                                    <h3>Limitations</h3>
                                    <p>May occasionally generate incorrect information.</p>
                                    <p>May occasionally produce harmful instructions or biased content.</p>
                                    <p>Limited knowledge of world and events after 2021.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                ) : (
                    <div className="chat-container">
                        <div className="chat-header">
                            <h2>{chatSelecionado.chatTitle}</h2>
                        </div>
                        <div className="chat-messages">
                            {chatSelecionado.messages && chatSelecionado.messages.map(message => (
                                <p key={message.id} className={"message-item " + (message.userId === "chatbot" ? "chatbot" : "")}>{message.text}</p>
                            ))}
                        </div>
                    </div>
                )}

                <div className="input-container">
                    <button className="attach-btn"><img src={anexar} alt="Anexar imagem" /></button>
                    <button className="audio-btn"><img src={audio} alt="Ouvir" /></button>
                    <input
                        value={userMessage}
                        onChange={event => setUserMessage(event.target.value)}
                        placeholder="Type a message."
                        type="text"
                    />
                    <button className="send-btn" onClick={() => enviarMensagem(userMessage)}>
                        <img src={enviar} alt="Enviar" />
                    </button>
                </div>
            </main>
        </div>
    );
}

export default Chat;