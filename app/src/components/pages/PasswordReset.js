import styles from './css/LoginPage.module.css'

import { useState } from "react";
import {useAuth}  from "../auth/AuthContext";
import { useNavigate } from "react-router-dom";


  
const PasswordResetPage = () => {
    
    const [email, setEmail] = useState("");
    const [message, setMessage] = useState("");
    const [error, setError] = useState("");
    // const navigate = useNavigate();
    
    
    const handleSubmit = async (e) => {
        e.preventDefault();
        
        try {
            const res = await fetch("https://3.95.74.135.nip.io/auth/api/password-reset/", {
                method: "POST",
                credentials: "include",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ 'email': email }),
            });

            if (res.ok) {
                const data = await res.json();
                setMessage(data.message);
                console.log(email);
                // navigate("/login");
            } else {
                const data = await res.json();
                setError(data.error);
            }
        } catch (error) {
            console.error(error);
        }
    };

    
    
    return (
        <div className={styles.login}>
            <form onSubmit={handleSubmit}>
                <h1>Recuperação de sennha</h1>
                <input type="text" placeholder="insira seu email" value={email} onChange={(e) => setEmail(e.target.value)} required/>
                <button type='submit'>Recuperar</button>
            </form>
            {message && <p style={{ color: "green" }}>{message}</p>}
            {error && <p style={{ color: "red" }}>{error}</p>}
            <div className={styles.links}>
                <a href="/login">Voltar ao Login</a>
            </div>
            
        </div>
    );
}


export default PasswordResetPage;