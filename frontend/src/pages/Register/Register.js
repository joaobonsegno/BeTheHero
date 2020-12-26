import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';

import api from '../../services/api';

import './styles.css';

import logoImg from '../../assets/logo.PNG';
import { FiArrowLeft } from 'react-icons/fi';

export default function Register(){

    const history = useHistory();

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [whatsapp, setWhatsapp] = useState('');
    const [city, setCity] = useState('');
    const [uf, setUf] = useState('');


    async function handleRegister(evt){
        evt.preventDefault();

        const data = {
            name,
            email,
            whatsapp,
            city,
            uf
        }

        try {
            const response = await api.post('/ongs', data);

            alert(`Seu ID de acesso: ${response.data.id}`);

            history.push('/');
        } catch (err) {
            alert('Erro no cadastro, tente novamente.');
        }
        
    }

    return(
        <div className='register-container'>
            <div className='content'>
                <section>
                    <img src={logoImg}></img>

                    <h1>Cadastro</h1>
                    <p>Faça seu cadastro, entre na plataforma e ajude pessoas a encontrarem os casos da sua ONG.</p>

                    <Link to='/' className='backlink'>
                        <FiArrowLeft size={16} color='#E02041'></FiArrowLeft>
                        Voltar
                    </Link>
                </section>

                <form onSubmit={handleRegister}>
                    <input 
                        placeholder='Nome da ONG'
                        value={name}
                        onChange={evt => setName(evt.target.value)}
                    />
                    <input 
                        type='email' 
                        placeholder='Email'
                        value={email}
                        onChange={evt => setEmail(evt.target.value)}
                    />
                    <input 
                        placeholder='Whatsapp'
                        value={whatsapp}
                        onChange={evt => setWhatsapp(evt.target.value)}
                    />

                    <div className='input-group'>
                        <input 
                            placeholder='Cidade'
                            value={city}
                            onChange={evt => setCity(evt.target.value)}
                        />
                        <input 
                            placeholder='UF' 
                            style={{ width: '80px' }}
                            value={uf}
                            onChange={evt => setUf(evt.target.value)}
                        />
                    </div>

                    <button type='submit' className='button'>Cadastrar</button>
                </form>
            </div>

        </div>
    );
}