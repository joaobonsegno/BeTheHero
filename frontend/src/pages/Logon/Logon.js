import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';

import { FiLogIn } from 'react-icons/fi'; //Feather icons

import './styles.css';

import api from '../../services/api';
import heroesImg from '../../assets/heroes.PNG';
import logoImg from '../../assets/logo.PNG';

export default function Logon(){

    const history = useHistory();

    const [id, setId] = useState('');

    async function handleLogin(evt){
        evt.preventDefault();

        // TEMPO: 1:27:26
        try {
            const response = await api.post('/session', { id });

            localStorage.setItem('ongId', id);
            localStorage.setItem('ongName', response.data.name);

            history.push('/profile');
        } catch (err) {
            alert('Falha no login, tente novamente.')
        }
    }

    return(
        <div className="logon-container">
            <section className="form">
                <img src={logoImg} alt="Be The Hero"></img>

                <form onSubmit={handleLogin}>
                    <h1>Faça seu logon</h1>

                    <input 
                        placeholder="Sua ID"
                        value={id}
                        onChange={evt => setId(evt.target.value)}
                    />

                    <button type="submit" className='button'>Entrar</button>

                    <Link to="/register" className='backlink'>
                        <FiLogIn size={16} color='#E02041'/>
                        Não tenho cadastro
                    </Link>
                </form>
            </section>

            <img src={heroesImg} alt="Heroes Image"></img>
        </div>
    );
}