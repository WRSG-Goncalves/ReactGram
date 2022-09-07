import React, { useState } from 'react';
import { Link, Redirect } from 'react-router-dom';

import api from '../../config/configApi';

export const RecoverPassword = () => {

    const [user, setUser] = useState({
        email: "",
        url: "http://localhost:3000/update-password/"
    });

    const [status, setStatus] = useState({
        type: "",
        mensagem: "",
        loading: false
    });

    const valorInput = e => setUser({ ...user, [e.target.name]: e.target.value });

    const recoverPass = async e => {
        e.preventDefault();

        setStatus({
            loading: true
        });

        const headers = {
            'Content-Type': 'application/json'
        }

        await api.post("/recover-password", user, { headers })
            .then((response) => {
                setStatus({
                    type: 'redSuccess',
                    mensagem: response.data.mensagem,
                    loading: false
                });
            }).catch((err) => {
                if (err.response) {
                    setStatus({
                        type: 'error',
                        mensagem: err.response.data.mensagem,
                        loading: false
                    });
                } else {
                    setStatus({
                        type: 'error',
                        mensagem: "Erro: tente mais tarde!",
                        loading: false
                    });
                }
            });

    }

    return (
        <div className="d-flex">
            <div className="container-login">
                <div className="wrapper-login">
                    <div className="title">
                        <span>Recuperar Senha</span>
                    </div>

                    {status.type === 'redSuccess' ? <Redirect to={{
                        pathname: '/',
                        state: {
                            type: "success",
                            mensagem: status.mensagem
                        }
                    }} /> : ""}

                    <form onSubmit={recoverPass} className="form-login">

                        {status.type === 'error' ? <p className="alert-danger">{status.mensagem}</p> : ""}
                        {status.type === 'success' ? <p className="alert-success">{status.mensagem}</p> : ""}

                        <div className="row">
                            <i className="fas fa-envelope"></i>
                            <input type="email" name="email" placeholder="Digite o e-mail" onChange={valorInput} />
                        </div>

                        <div className="row button">
                            {status.loading ? <button type="submit" className="button-login" disabled>Enviando...</button> : <button type="submit" className="button-login">Enviar</button>}
                        </div>

                        <div className="signup-link">
                            <Link to="/add-user-login" className="link-pg-login">Cadastrar</Link>{" - Lembrou a senha "}
                            <Link to="/" className="link-pg-login">clique aqui</Link>
                        </div>

                    </form>
                </div>
            </div>
        </div>
    );
};