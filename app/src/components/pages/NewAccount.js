import React, { useState } from 'react';
import styles from './css/NewAccount.module.css';

export default function Register() {
    const [fullName, setFullName] = useState('');
    const [email, setEmail] = useState('');
    const [profession, setProfession] = useState('');
    const [worksInBidding, setWorksInBidding] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        // Aqui você pode enviar os dados via API ou tratar como desejar
        console.log({ fullName, email, profession, worksInBidding });
    };

    return (
        <div className={styles.register}>
            <form onSubmit={handleSubmit}>
                <h1>Cadastro</h1>

                <label htmlFor="fullName">Nome completo</label>
                <input
                    id="fullName"
                    type="text"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    required
                />

                <label htmlFor="email">Email</label>
                <input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />

                <label htmlFor="profession">Profissão</label>
                <input
                    id="profession"
                    type="text"
                    value={profession}
                    onChange={(e) => setProfession(e.target.value)}
                    required
                />

                <label>Trabalha na área de licitação?</label>
                <div className={styles.radioGroup}>
                    <label>
                        <input
                            type="radio"
                            name="bidding"
                            value="sim"
                            checked={worksInBidding === 'sim'}
                            onChange={(e) => setWorksInBidding(e.target.value)}
                            required
                        />
                        Sim
                    </label>
                    <label>
                        <input
                            type="radio"
                            name="bidding"
                            value="nao"
                            checked={worksInBidding === 'nao'}
                            onChange={(e) => setWorksInBidding(e.target.value)}
                        />
                        Não
                    </label>
                </div>

                <button type="submit">Cadastrar</button>
            </form>
            <div className={styles.links}>
                            <a href="/login">Voltar ao Login</a>
            </div>
        </div>
    );
}
