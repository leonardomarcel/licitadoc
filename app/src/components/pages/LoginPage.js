import styles from './css/LoginPage.module.css'

import { useState } from "react";
import {useAuth}  from "../auth/AuthContext";
import { useNavigate } from "react-router-dom";


  
const LoginPage = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const { login } = useAuth();
    const { user } = useAuth();
    const navigate = useNavigate();
    const [error, setError] = useState("");
    
    const handleSubmit = async (e) => {
        e.preventDefault();
        
        try {
            const success = await login({ username, password }); // Chama a função de login do contexto
            if (success) {
            
                navigate("/home", { replace: true }); // Redireciona para o home após login bem-sucedido
        }
      } catch (err) {
        setError("Credenciais inválidas");
      }
    };

    
    
    return (
        <div className={styles.login}>
            <form onSubmit={handleSubmit}>
                <h1>login</h1>
                <input type="text" placeholder="Usuário" value={username} onChange={(e) => setUsername(e.target.value)} required/>
                <input type="password" placeholder="Senha" value={password} onChange={(e) => setPassword(e.target.value)} required={true}/>
                <button type='submit'>Entrar</button>
            </form>
        </div>
    );
}


export default LoginPage;