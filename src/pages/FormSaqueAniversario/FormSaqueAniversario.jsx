import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import './FormSaqueAniversario.css';
import SaqueAniversarioService from '../../service/SaqueAniversarioService';
import NavBar from '../../components/navBar/NavBar';
import Swal from 'sweetalert2';

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


const FormSaqueAniversario = () => {
    const location = useLocation();

    const [data, setData] = useState({
        id: null,
        nome: '',
        saldoFgts: '',
        mesAniversario: ''
    });
    const [loading, setLoading] = useState(false);
    const [result, setResult] = useState(null);
    const [erro, setErro] = useState(null);
    const [isEdit, setIsEdit] = useState(false);

    useEffect(() => {
        if (location.state?.editData) {
            setData(location.state.editData);
            setIsEdit(true);
            window.history.replaceState({}, document.title);
        }
    }, [location]);

    const handleCancelar = () => {
        setData({
            id: null,
            nome: '',
            saldoFgts: '',
            mesAniversario: ''
        });
        setIsEdit(false);
        setResult(null);
    };
    const formatarMoeda = (valor) => {
        const apenasNumeros = valor.replace(/\D/g, '');

        const numeroFormatado = (Number(apenasNumeros) / 100).toFixed(2);

        return numeroFormatado.replace('.', ',').replace(/\B(?=(\d{3})+(?!\d))/g, '.');
    };

    const converterParaNumero = (valorFormatado) => {
        return parseFloat(valorFormatado.replace(/\./g, '').replace(',', '.'));
    };

    const handleChange = (e) => {
        const { name, value } = e.target;

        if (name === 'saldoFgts') {
            const valorFormatado = formatarMoeda(value);
            const valorNumerico = converterParaNumero(valorFormatado);

            if (valorNumerico <= 999999999.99) {
                setData(prev => ({ ...prev, [name]: valorFormatado }));
            }
        } else {
            setData(prev => ({ ...prev, [name]: value }));
        }
    };


    const handleSubmit = async (e) => {
        e.preventDefault();
        const valorFgts = converterParaNumero(data.saldoFgts);

        if (!valorFgts || valorFgts <= 0) {
            Swal.fire({
                icon: 'warning',
                title: 'Atenção',
                text: 'O valor do saldo FGTS deve ser maior que R$ 0,00',
                confirmButtonText: 'OK',
                background: '#0d1117',
                color: '#fff'
            });
            return;
        }
        const mesAniversario = parseInt(data.mesAniversario);
        if (!mesAniversario || mesAniversario < 1 || mesAniversario > 12) {
            Swal.fire({
                icon: 'warning',
                title: 'Atenção',
                text: 'Selecione um mês válido (1 a 12)',
                confirmButtonText: 'OK',
                background: '#0d1117',
                color: '#fff'
            });
            return;
        }

        setLoading(true);
        setErro(null);
        try {
            const sendData = {
                nome: data.nome,
                saldoFgts: converterParaNumero(data.saldoFgts),
                mesAniversario: parseInt(data.mesAniversario)
            };

            let response;

            if (isEdit && data.id) {
                response = await SaqueAniversarioService.update(data.id, sendData);
            } else {
                response = await SaqueAniversarioService.create(sendData);
            }

            setResult(response);

            setData({
                id: null,
                nome: "",
                saldoFgts: "",
                mesAniversario: "",
            });
            setIsEdit(false);

        } catch (error) {
            console.error("Erro ao calcular:", error);
            setErro(error.message);
            console.log(erro);
        } finally {
            setLoading(false);
        }
    };



    return (
        <>
            <NavBar />
            <div className="formContainer">
                <div className="form-card">
                    <div className="form-header">
                        <h2>{isEdit ? "Editar Simulação" : "Calcule o Valor do seu Saque do FGTS"}</h2>
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
                                    type="text"
                                    name="saldoFgts"
                                    value={data.saldoFgts}
                                    onChange={handleChange}
                                    placeholder="R$100,00"
                                    required
                                    disabled={loading}
                                />
                            </div>
                        </div>

                        <div className="form-buttons">
                            <button type="submit" className="buttonCalc" disabled={loading}>
                                {loading ? 'Processando...' : (isEdit ? 'Atualizar' : 'Calcular')}
                            </button>

                            {isEdit && (
                                <button
                                    type="button"
                                    className="buttonCancel"
                                    onClick={handleCancelar}
                                    disabled={loading}
                                >
                                    Cancelar
                                </button>
                            )}
                        </div>

                    </form>
                </div>

                {result && (
                    <div className="result-card">
                        <div className='result-card-left'>
                            <h3>Resultado da Simulação</h3>
                            <p><strong>Nome:</strong> {result.nome}</p>
                            <p><strong>Saldo FGTS:</strong> R$ {result.saldoFgts?.toFixed(2)}</p>
                            <p><strong>Aliquota:</strong> {result.faixa * 100}%</p>
                            <p><strong>Valor Disponível:</strong> R$ {result.valorDisponivel?.toFixed(2)}</p>
                            <p><strong>Mês:</strong> Saque disponível a partir do primeiro dia útil de {MESES.find(m => m.value === result.mesAniversario)?.label} por um período de 90 dias</p>
                        </div>

                        <div className='result-card-rigth'>
                            <button
                                className="closeButton"
                                onClick={() => setResult(null)}
                                title="Fechar"
                                disabled={loading}
                            >
                                Fechar
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </>
    );
};

export default FormSaqueAniversario;