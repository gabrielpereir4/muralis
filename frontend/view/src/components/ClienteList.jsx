import React, { useEffect, useState } from 'react';
import { Link } from "react-router-dom";

function ClienteList({ refresh, termoBusca }) {
    const [clientes, setClientes] = useState([]);
    const [editandoId, setEditandoId] = useState(null);
    const [formData, setFormData] = useState({
        nome: '',
        cpf: '',
        dataNascimento: '',
        endereco: ''
    });

    useEffect(() => {
        carregarClientes();
    }, [refresh, termoBusca]);

    const carregarClientes = () => {
        const url = termoBusca
            // Se houver termo de busca, filtra pelo termo
            ? `http://localhost:8080/clientes/search?termo=${encodeURIComponent(termoBusca)}`
            // Se não, busca todos os clientes
            : "http://localhost:8080/clientes";

        fetch(url)
            .then((res) => res.json())
            .then(setClientes)
            .catch((err) => console.error("Erro:", err));
    };

    const handleEditar = (cliente) => {
        setEditandoId(cliente.id);
        setFormData({
            nome: cliente.nome,
            cpf: cliente.cpf,
            dataNascimento: cliente.dataNascimento,
            endereco: cliente.endereco || ''
        });
    };

    const handleCancelar = () => {
        setEditandoId(null);
        setFormData({ nome: '', cpf: '', dataNascimento: '', endereco: '' });
    };

    const handleSalvar = (id) => {
        if (!formData.nome || !formData.cpf || !formData.dataNascimento || !formData.endereco) {
            alert("Todos os campos são obrigatórios.");
            return;
        }
    
        if (formData.nome.trim() === "") {
            alert("O nome não pode estar vazio.");
            return;
        }
        fetch(`http://localhost:8080/clientes/${id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(formData)
        })
        .then(async (res) => {
            if (!res.ok) {
                const mensagem = await res.text();
                alert(mensagem);
                throw new Error(mensagem);
            }
            return res.json();
        })
        .then(() => {
            carregarClientes();
            handleCancelar();
        })
        .catch((err) => {
            console.error(err);
        });
    };

    const handleDelete = (cliente) => {
        if (!window.confirm(`Deseja realmente excluir ${cliente.nome}?`)) return;

        fetch(`http://localhost:8080/clientes/${cliente.id}`, {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json' },
        })
        .then((res) => {
            if (!res.ok) throw new Error('Erro ao deletar cliente');
            carregarClientes();
        })
        .catch((err) => console.error(err));
};

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    return (
        <div>
            <h2>Lista de Clientes</h2>
            {clientes.length === 0 ? (
                <p>Não há clientes.</p>
            ) : (
                <ul>
                    {clientes.map((cliente) => (
                        <li key={cliente.id}>
                            {editandoId === cliente.id ? (
                                <div>
                                    <input
                                        name="nome"
                                        value={formData.nome}
                                        onChange={handleChange}
                                    />
                                    <input
                                        name="cpf"
                                        value={formData.cpf}
                                        onChange={handleChange}
                                    />
                                    <input
                                        name="dataNascimento"
                                        type="date"
                                        value={formData.dataNascimento}
                                        onChange={handleChange}
                                    />
                                    <input
                                        name="endereco"
                                        value={formData.endereco}
                                        onChange={handleChange}
                                    />
                                    <button onClick={() => handleSalvar(cliente.id)}>Salvar</button>
                                    <button onClick={handleCancelar}>Cancelar</button>
                                </div>
                            ) : (
                                <>
                                    {cliente.nome} - {cliente.cpf} - {cliente.endereco} - {cliente.dataNascimento}
                                    <Link to={`/clientes/${cliente.id}/contatos`}> Ver Contatos</Link>
                                    <button onClick={() => handleEditar(cliente)}>Editar</button>
                                    <button onClick={() => handleDelete(cliente)}>Excluir</button>
                                </>
                            )}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}

export default ClienteList;