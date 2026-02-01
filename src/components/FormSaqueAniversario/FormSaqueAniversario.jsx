import React, { useEffect, useState } from 'react';
import './FormSaqueAniversario.css';
import SaqueAniversarioService from '../../service/SaqueAniversarioService';

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
    const [data, setData] = useState({
        nome: '',
        saldoFgts: '',
        mesAniversario: ''
    });
    const [loading, setLoading] = useState(false);
    const [result, setResult] = useState(null);
    const [erro, setErro] = useState(null);
    const [loadedList, setLoadedList] = useState([]);

    useEffect(() => {
        loadList();
    }, []);

    const loadList = async () => {
        try {
            setLoading(true);
            const data = await SaqueAniversarioService.listAll();
            setLoadedList(data);
            setErro(null);
        } catch (error) {
            setErro(error.message)
        } finally {
            setLoading(false);
        }
    };
    const handleChange = (e) => {
        const { name, value } = e.target;
        setData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!data.mesAniversario || !data.nome || !data.saldoFgts) {
            alert('Preencha todos os campos obrigatórios');
            return;
        }
        setLoading(true);
        setErro(null);

        try {
            const sendData = {
                nome: data.nome,
                saldoFgts: parseFloat(data.saldoFgts),
                mesAniversario: parseInt(data.mesAniversario)
            };

            const response = await SaqueAniversarioService.create(sendData);

            setResult(response);

            setData({
                nome: "",
                saldoFgts: "",
                mesAniversario: "",
            });

            await loadList();

        } catch (error) {
            console.error("Erro ao calcular:", error)
        } finally {
            setLoading(false);
        }
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
                            value={data.nome}
                            onChange={handleChange}
                            placeholder="Digite seu nome"
                            required
                            disabled={loading}
                        />
                    </div>

                    <div className="formGroup">
                        <label className="form-label">Mês do seu aniversário</label>
                        <select
                            className="selectField"
                            name="mesAniversario"
                            value={data.mesAniversario}
                            onChange={handleChange}
                            required
                            disabled={loading}
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
                                value={data.saldoFgts}
                                onChange={handleChange}
                                placeholder="0,00"
                                required
                                disabled={loading}
                            />
                        </div>
                    </div>

                    <button type="submit" className="buttonCalc" disabled={loading}>
                        {loading ? 'Calculando...' : "Calcular"}
                    </button>
                </form>
            </div>
            {result && (
                <div className="result-card">
                    <h3>Resultado da Simulação</h3>
                    <p><strong>Nome:</strong> {result.nome}</p>
                    <p><strong>Saldo FGTS:</strong> R$ {result.saldoFgts?.toFixed(2)}</p>
                    <p><strong>Aliquota:</strong> {result.faixa * 100}%</p>
                    <p><strong>Valor Disponível:</strong> R$ {result.valorDisponivel?.toFixed(2)}</p>
                    <p><strong>Mês:</strong> Saque disponível a partir do primeiro dia útil de {MESES.find(m => m.value === result.mesAniversario)?.label} por um período de 90 dias</p>
                </div>
            )}
            {loadedList && (
                <div className='simulation-list'>
                    <h2>Simulações anteriores</h2>
                    <div className='simulationGrid'>
                        {Object.entries(loadedList).map(([key, item]) => (
                            <div key={key} className='result-card'>
                                <p><strong>Nome:</strong> {item.nome}</p>
                                <p><strong>Saldo FGTS:</strong> R$ {item.saldoFgts?.toFixed(2)}</p>
                                <p><strong>Aliquota:</strong> {item.faixa * 100}%</p>
                                <p><strong>Valor Disponível:</strong> R$ {item.valorDisponivel?.toFixed(2)}</p>
                                <p><strong>Mês:</strong> Saque disponível a partir do primeiro dia útil de {MESES.find(m => m.value === item.mesAniversario)?.label} por um período de 90 dias</p>
                            </div>
                        ))}
                    </div>
                </div>
            )
            }


        </div>
    );
};

export default FormSaqueAniversario;