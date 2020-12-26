import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi';
 
import './styles.css';

import api from '../../services/api';
import logoImg from '../../assets/logo.PNG';

export default function NewIncident(){
    const history = useHistory();

    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [value, setValue] = useState('');

    async function handleNewIncident(evt) {
        evt.preventDefault();

        const data = {
            title,
            description,
            value
        };

        try {
            await api.post('/incidents', data, {
                headers: {
                    Authorization: localStorage.getItem('ongId')
                }
            });

            history.push('/profile');
        } catch (err) {
            alert('Erro ao criar caso, tente novamente.');
        }
    }

    return(
        <div className='new-incident-container'>
            <div className='content'>
                <section>
                    <img src={logoImg}></img>

                    <h1>Cadastrar novo caso</h1>
                    <p>Descreva o caso detalhadamente para encontrar um herói para resolver isso.</p>

                    <Link to='/profile' className='backlink'>
                        <FiArrowLeft size={16} color='#E02041'></FiArrowLeft>
                        Voltar para home
                    </Link>
                </section>

                <form onSubmit={handleNewIncident}>
                    <input 
                        placeholder='Título do caso'
                        value={title}
                        onChange={evt => { setTitle(evt.target.value) }}
                    />
                    <textarea 
                        placeholder='Descrição'
                        value={description}
                        onChange={evt => { setDescription(evt.target.value) }}    
                    />
                    <input 
                        placeholder='Valor em reais'
                        value={value}
                        onChange={evt => { setValue(evt.target.value) }}
                    />

                    <button type='submit' className='button'>Cadastrar</button>
                </form>
            </div>

        </div>
    );
}