import { useState } from "react";
import axios from "axios";

export default function Login({ onLogin }) {
    const [username, setUsername] = useState("");
    const [passwd, setPasswd] = useState("");
    const [messageText, setMessageText] = useState("");
    const [messageSeverity, setMessageSeverity] = useState("success");

    async function enviaLogin(event) {
        event.preventDefault();
        try {
            const response = await axios.post("http://localhost:3000/login", {
                username: username,
                password: passwd,
            });
            if (response.status >= 200 && response.status < 300) {
                localStorage.setItem("token", response.data.token);
                onLogin();
            } else {
                console.error("Falha na autenticação");
            }
        } catch (error) {
            console.log(error);
            setMessageText("Falha ao logar usuário!");
            setMessageSeverity("error");
        }
    }

    function cancelaLogin() {
        if (username !== "" || passwd !== "") {
            setUsername("");
            setPasswd("");
        }
        setMessageText("Login cancelado!");
        setMessageSeverity("warning");
    }

    return (
        <form onSubmit={enviaLogin}>
            <h1>Login</h1>
            <div>
                <input
                    required
                    id="username-input"
                    placeholder="User"
                    value={username}
                    onChange={(event) => setUsername(event.target.value)}
                />
            </div>
            <div>
                <input
                    required
                    id="passwd-input"
                    placeholder="Password"
                    type="password"
                    value={passwd}
                    onChange={(event) => setPasswd(event.target.value)}
                />
            </div>
            <div>
                <button type="submit">Enviar</button>
                <button type="button" onClick={cancelaLogin}>
                    Cancelar
                </button>
            </div>
            {messageText && <p className={messageSeverity}>{messageText}</p>}
        </form>
    );
}
