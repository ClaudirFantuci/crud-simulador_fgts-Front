import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaEdit, FaTrash } from 'react-icons/fa';
import SaqueAniversarioService from '../../service/SaqueAniversarioService';
import NavBar from '../../components/navBar/NavBar';
import "./ListaSimulacoes.css"
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

const ListaSimulacoes = () => {
    const navigate = useNavigate();
    const [loadedList, setLoadedList] = useState([]);
    const [loading, setLoading] = useState(false);
    const [erro, setErro] = useState(null);

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
            setErro(error.message);
        } finally {
            setLoading(false);
        }
    };

    const handleExcluir = async (id) => {
        const result = await Swal.fire({
            title: 'Confirmar exclusão',
            text: 'Tem certeza que deseja excluir esta simulação?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Sim, excluir',
            cancelButtonText: 'Cancelar',
            background: '#0d1117',
            color: '#fff'
        });

        return;
        if (result.isConfirmed) {
            try {
                setLoading(true);
                await SaqueAniversarioService.delete(id);
                await loadList();
            } catch (error) {
                setErro(error.message);
            } finally {
                setLoading(false);
            }
        }
    };
    const formatarParaMascara = (valor) => {
        const valorString = valor.toFixed(2);
        return valorString.replace('.', ',').replace(/\B(?=(\d{3})+(?!\d))/g, '.');
    };

    const handleEdit = (item) => {
        navigate('/', {
            state: {
                editData: {
                    id: item.id,
                    nome: item.nome,
                    saldoFgts: formatarParaMascara(item.saldoFgts),
                    mesAniversario: item.mesAniversario
                }
            }
        });
    };

    if (loading && loadedList.length === 0) {
        return <div className="formContainer"><h2>Carregando...</h2></div>;
    }

    return (
        <>
            <NavBar />
            <div className="formContainer">
                <div className="form-card">
                    <div className="form-header">
                        <h2>Minhas Simulações</h2>
                    </div>
                </div>

                {erro && (
                    <div className="result-card" style={{ backgroundColor: '#fee' }}>
                        <p style={{ color: 'red' }}><strong>Erro:</strong> {erro}</p>
                    </div>
                )}

                {loadedList && Object.keys(loadedList).length > 0 ? (
                    <div className='simulation-list'>
                        <div className='simulationGrid'>
                            {Object.entries(loadedList).map(([key, item]) => (
                                <div key={key} className='result-card'>
                                    <div className='result-card-left'>
                                        <p><strong>Nome:</strong> {item.nome}</p>
                                        <p><strong>Saldo FGTS:</strong> R$ {item.saldoFgts?.toFixed(2).replace('.', ',').replace(/\B(?=(\d{3})+(?!\d))/g, '.')}</p>
                                        <p><strong>Aliquota:</strong> {(item.faixa * 100).toFixed(0)}%</p>
                                        <p><strong>Valor Disponível:</strong> R$ {item.valorDisponivel?.toFixed(2).replace('.', ',').replace(/\B(?=(\d{3})+(?!\d))/g, '.')}</p>
                                        <p><strong>Mês:</strong> Saque disponível a partir do primeiro dia útil de {MESES.find(m => m.value === item.mesAniversario)?.label} por um período de 90 dias</p>
                                    </div>
                                    <div className='result-card-rigth'>
                                        <button
                                            className="editButton"
                                            onClick={() => handleEdit(item)}
                                            title="Editar"
                                            disabled={loading}
                                        >
                                            <FaEdit />
                                        </button>
                                        <button
                                            className="deleteButton"
                                            onClick={() => handleExcluir(item.id)}
                                            title="Excluir"
                                            disabled={loading}
                                        >
                                            <FaTrash />
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                ) : (
                    <div className="result-card">
                        <p>Nenhuma simulação encontrada. Clique em "Nova Simulação" para começar.</p>
                    </div>
                )}
            </div>
        </>
    );
};

export default ListaSimulacoes;