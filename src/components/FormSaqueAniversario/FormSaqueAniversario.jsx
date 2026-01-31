import React, { useState, useEffect } from 'react';
import './FormSaqueAniversario.css'

const MESES = [
    { label: 'Janeiro', value: 1 },
    { label: 'Fevereiro', value: 2 },
    { label: 'Março', value: 3 },
    { label: 'Abril', value: 4 },
    { label: 'Maio', value: 5 },
    { label: 'Junho', value: 6 },
    { label: 'Julho', value: 7 },
    { label: 'Agosto', value: 8 },
    { label: 'Setembro', value: 9 },
    { label: 'Outubro', value: 10 },
    { label: 'November', value: 11 },
    { label: 'Dezembro', value: 12 }
];
const FormSaqueAniversario = ({ onSubmit }) => {
    const [dados, setDados] = useState({
        nome: '',
        saldoFgts: '',
        mesAniversario: ''
    });


    const handleChange = (e) => {
        const { name, value } = e.target;
        setDados(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!dados.mesAniversario || !dados.nome || !dados.saldoFgts) {
            alert('Preencha todos os campos obrigatórios');
            return;
        }
        onSubmit(dados);
    };
    return (
        <div className='FormContainer'>
            <form onSubmit={handleSubmit} className='FormSaque'>
                <label>Nome</label>
                <input type="text"
                    name='nome'
                    value={dados.nome}
                    onChange={handleChange}
                    placeholder='nome'
                    required />
                <label>Mês do seu aniversario</label>
                <select
                    name="mesAniversario"
                    value={dados.mesAniversario}
                    onChange={handleChange}
                    required
                >
                    <option value="">Selecione</option>
                    {MESES.map(mes => (
                        <option key={mes.value} value={mes.value}>{mes.label}</option>
                    ))}
                </select>
                <label>Saldo do FGTS</label>
                <input type="number"
                    name='saldoFgts'
                    value={dados.saldoFgts}
                    onChange={handleChange}
                    placeholder='Saldo Total do FGTS'
                    required />
                <button type="submit">Calcular</button>
            </form>

        </div>
    );
};

export default FormSaqueAniversario;