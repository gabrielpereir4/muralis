import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

function ContatoList({refresh}) {
    const { id } = useParams(); // ID do cliente
    const [contatos, setContatos] = useState([]);
    const [editandoId, setEditandoId] = useState(null);
    const [formData, setFormData] = useState({
        tipo: '',
        valor: '',
        observacao: ''
    });

    useEffect(() => {
        carregarContatos();
    }, [refresh, id]);

    const carregarContatos = () => {
        fetch(`http://localhost:8080/clientes/${id}/contatos`)
            .then((res) => res.json())
            .then((data) => setContatos(Array.isArray(data) ? data : []))
            .catch(console.error);
    };

    const handleEditar = (contato) => {
        setEditandoId(contato.id);
        setFormData({
            tipo: contato.tipo,
            valor: contato.valor,
            observacao: contato.observacao || ''
        });
    };

    const handleCancelar = () => {
        setEditandoId(null);
        setFormData({ tipo: '', valor: '', observacao: '' });
    };

    const handleSalvar = (contatoId) => {
        if (!formData.tipo || !formData.valor) {
            alert("Os campos Tipo e Valor são obrigatórios.");
            return;
        }
        fetch(`http://localhost:8080/contatos/${contatoId}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(formData)
        })
            .then(() => {
                handleCancelar();
                carregarContatos();
            })
            .catch(console.error);
    };

    const handleDelete = (contatoId) => {
        if (!window.confirm('Deseja excluir este contato?')) return;

        fetch(`http://localhost:8080/contatos/${contatoId}`, {
            method: 'DELETE'
        })
            .then(carregarContatos)
            .catch(console.error);
    };

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    return (
        <div>
            <h3>Lista de Contatos</h3>
            {contatos.length === 0 ? (
                <p>Não há contatos.</p>
            ) : (
                <ul>
                    {contatos.map((contato) => (
                        <li key={contato.id}>
                            {editandoId === contato.id ? (
                                <div>
                                    <input name="tipo" value={formData.tipo} onChange={handleChange} />
                                    <input name="valor" value={formData.valor} onChange={handleChange} />
                                    <input name="observacao" value={formData.observacao} onChange={handleChange} />
                                    <button onClick={() => handleSalvar(contato.id)}>Salvar</button>
                                    <button onClick={handleCancelar}>Cancelar</button>
                                </div>
                            ) : (
                                <>
                                    {contato.tipo}: {contato.valor} ({contato.observacao})
                                    <div style={{ display: 'flex', gap: '8px', marginTop: '4px' }}>
                                        <button onClick={() => handleEditar(contato)}>Editar</button>
                                        <button onClick={() => handleDelete(contato.id)}>Excluir</button>
                                    </div>
                                </>
                            )}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}

export default ContatoList;