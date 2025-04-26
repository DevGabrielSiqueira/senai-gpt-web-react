import "./index.css"
import Logochat from "../../assets/imgs/Chat.png"
import arrowSquare from "../../assets/imgs/ArrowSquareOut.png"
import chatText from "../../assets/imgs/ChatText.png"
import lixeira from "../../assets/imgs/IconSet.png"
import sol from "../../assets/imgs/Sun.png"
import usuario from "../../assets/imgs/User.png"
import logOut from "../../assets/imgs/logOut.png"
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

    const [userMessage, setUserMessage] = useState("")

    useEffect(() => {
        getChats();
    }, []);

    const getChats = async () => {
        try {
            const response = await fetch("https://senai-gpt-api.azurewebsites.net/chats", {
                headers: {
                    "Authorization": "Bearer " + localStorage.getItem("meuToken")
                }
            });

            if (response.ok) {
                const json = await response.json();
                setChats(json);
            } else if (response.status === 401) {
                alert("Token inválido. Faça login novamente.");
                window.location.href = "/login";
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
    };

    const newChat = () => {
        setChatSelecionado(null);
    };



  

    const chatGPT = async (message) => {

        // Configurações do endpoint e chave da API
        const endpoint = "https://ai-testenpl826117277026.openai.azure.com/";
        const apiKey = "";
        const deploymentId = "gpt-4"; // Nome do deployment no Azure OpenAI
        const apiVersion = "2024-05-01-preview"; // Verifique a versão na documentação

        // URL para a chamada da API
        const url = `${endpoint}/openai/deployments/${deploymentId}/chat/completions?api-version=${apiVersion}`;

        // Configurações do corpo da requisição
        const data = {
            messages: [{ role: "user", content: message }],
            max_tokens: 50
        };

        // Cabeçalhos da requisição
        const headers = {
            "Content-Type": "application/json",
            "api-key": apiKey
        };

        // Faz a requisição com fetch
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

    }


    const enviarMensagem = async (message) => {

        let resposta = await chatGPT(message);

        console.log("Resposta: ", resposta);

        const novaMensagemUsuario= {

        useId: "",
        text: message,
        id:10
    };

    let  novaRespostaChatGPT = {
        userId: "chatbot",
        text: resposta,
        id: 
    };

    let novoChatSelecionado ={...chatSelecionado}; // Cópia do chatSelecionado.

    novoChatSelecionado.messages.push(novaMensagemUsuario);// Adicionando uma mensagem
    novoChatSelecionado.messages.push(novaRespostaChatGPT);// Adicionando uma mensagem

    setChatSelecionado

    return (
        <div className="container">
            <aside className="left-panel">
                <div className="top">
                    <div className="botaoNewChatPrincipal">
                        <button onClick={newChat}>+ New Chat</button>
                    </div>

                    {chats.map(chat => (
                        <button key={chat.id} className="btn-chat" onClick={() => clickChat(chat)}>
                            <img src={chatText} alt="chat icon" />
                            {chat.chatTitle}
                        </button>
                    ))}
                </div>

                <div className="bottom">
                    <button><img src={lixeira} alt="lixeira" />Clear conversations</button>
                    <button><img src={sol} alt="sol" />Light mode</button>
                    <button><img src={usuario} alt="usuário" />My account</button>
                    <button><img src={arrowSquare} alt="FAQ" />Updates & FAQ</button>
                    <button onClick={onLogOutClick}><img src={logOut} alt="Log out" />Log out</button>
                </div>
            </aside>

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

                            {chatSelecionado.messages.map(message => (
                                <p className={"message-item " + (message.userId == "chatbot" ? "chatbot" : "")}>{message.text}</p>
                            ))}

                        </div>
                    </div>
                )}

                <div className="input-container">
                    <button className="attach-btn"><img src={anexar} alt="Anexar imagem" /></button>
                    <button className="audio-btn"><img src={audio} alt="Ouvir" /></button>

                    <input value={userMessage} onChange={event => setUserMessage(event.target.value)}
                        placeholder="Type a message."
                        type="text"
                    />

                    <button className="send-btn"><img onClick={() => enviarMensagem(userMessage)} src={enviar} alt="Enviar" /></button>
                </div>
            </main>
        </div>
    );
}

export default Chat;
