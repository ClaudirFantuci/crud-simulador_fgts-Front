import React, { useState } from 'react';
import './FormSaqueAniversario.css';

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
    { label: 'Novembro', value: 11 },
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
        <div className="formContainer">
            <div className="form-card">
                <div className="form-header">
                    <h2>Calcule o Valor do seu Saque do FGTS</h2>
                </div>

                <form onSubmit={handleSubmit} className="FormSaque">
                    <div className="formGroup">
                        <label className="form-label">Nome</label>
                        <input
                            className="inputField"
                            type="text"
                            name="nome"
                            value={dados.nome}
                            onChange={handleChange}
                            placeholder="Digite seu nome"
                            required
                        />
                    </div>

                    <div className="formGroup">
                        <label className="form-label">Mês do seu aniversário</label>
                        <select
                            className="selectField"
                            name="mesAniversario"
                            value={dados.mesAniversario}
                            onChange={handleChange}
                            required
                        >
                            <option value="">Selecione o mês</option>
                            {MESES.map(mes => (
                                <option key={mes.value} value={mes.value}>
                                    {mes.label}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div className="formGroup">
                        <label className="form-label">Saldo do FGTS</label>
                        <div className="input-wrapper">
                            <input
                                className="inputField"
                                type="number"
                                name="saldoFgts"
                                value={dados.saldoFgts}
                                onChange={handleChange}
                                placeholder="0,00"
                                required
                            />
                        </div>
                    </div>

                    <button type="submit" className="buttonCalc">
                        Calcular
                    </button>
                </form>
            </div>
        </div>
    );
};

export default FormSaqueAniversario;