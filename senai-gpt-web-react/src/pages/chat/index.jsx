

import "./index.css"
import Logochat from "../../assets/imgs/Chat.png"
import arrowsquare from "../../assets/imgs/ArrowSquareOut.png"
import chatText from "../../assets/imgs/ChatText.png"
import lixeira from "../../assets/imgs/IconSet.png"
import sol from "../../assets/imgs/Sun.png"
import usuario from "../../assets/imgs/User.png"
import logOut from "../../assets/imgs/logOut.png"
import Chats from "../../assets/imgs/chats.png"
import estrela from "../../assets/imgs/iconeestrela.png"
import escudo from "../../assets/imgs/iconeescudo.png"
import audio from "../../assets/imgs/iconeaudio.png"
import anexar from "../../assets/imgs/iconeimg.png"
import enviar from "../../assets/imgs/iconeenviar.png"
import { useEffect, useState } from "react"



function Chat() {

    const [chats, setChats] = useState([]);
    const [chatSelecionado, SetChatSelecionado] = useState(null);

    useEffect(() => {
        //executada toda vez que abre 

        getChats();



    }, []);

    const getChats = async () => {

        let response = await fetch("https://senai-gpt-api.azurewebsites.net/chats", {
            headers: {
                "Authorization": "Bearer " + localStorage.getItem("meuToken")
            }
        });

        console.log(response);

        if (response.ok == true) {

            let json = await response.json();

            setChats(json)

        } else {

            if (response.status == 401) {

                alert("Token inválido. Faca login novamente.");
                window.location.href = "/login"

            }
        }
    }

    const onLogOutClick = () => {

        localStorage.clear();
        window.location.href = "/Login";

    }

    const clickChat = (chat) => {
        SetChatSelecionado(chat);
        console.log(chat);

    }

    return (
        <>
            <div className="container">
                <aside className="left-panel">
                    <div className="top">
                        <div className="botaoNewChatPrincipal">
                            <button>+ New Chat</button>
                        </div>

                        {chats.map(chat => (
                            <button className="btn-chat" onClick={() => clickChat(chat)}><img src={chatText} />
                                {chat.chatTitle}</button>
                        ))}


                    </div>

                    <div className="bottom">
                        <button><img src={lixeira} alt="lixeira" />Clear conversations</button>
                        <button><img src={sol} alt="sol" />Light mode</button>
                        <button><img src={usuario} />My account</button>
                        <button><img src={arrowsquare} />Updates & FAQ</button>
                        <button onClick={onLogOutClick}><img src={logOut} alt="Log out" />Log out</button>
                    </div>
                </aside>

                <main className="central-panel">


                    {chatSelecionado == null && (

                        <>

                            <div className="content-center">
                                <img src={Logochat} alt="SenaiGPT Logo" className="logo" />


                                <div className="info-boxes-container">
                                    <div className="info-boxes">
                                        <div className="info">
                                            <img src={Chats} alt="icone chat" />
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
                                    <div className="input-container">
                                        <button className="attach-btn"><img src={anexar} alt="Anexar imagem" /></button>
                                        <button className="audio-btn"><img src={audio} alt="Ouvir" /></button>
                                        <input type="text" placeholder="Type message" />
                                        <button className="send-btn"><img src={enviar} alt="Enviar" /></button>
                                    </div>
                                </div>
                            </div>


                        </>



                    )}

                    <div className="input-container">
                        <button className="attach-btn"><img src={anexar} alt="Anexar imagem" /></button>
                        <button className="audio-btn"><img src={audio} alt="Ouvir" /></button>
                        <input type="text" placeholder="Type message" />
                        <button className="send-btn"><img src={enviar} alt="Enviar" /></button>
                    </div>






                </main>
            </div>
        </>
    )
}

export default Chat