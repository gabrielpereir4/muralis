import React, { useState } from 'react';

const ClienteAdd = ({ onAddCliente }) => {
    const [nome, setNome] = useState('');
    const [cpf, setCpf] = useState('');
    const [dataNascimento, setDataNascimento] = useState('');
    const [endereco, setEndereco] = useState('');

    const isValidDate = (dateString) => {
        const date = new Date(dateString);
        return !isNaN(date.getTime());
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
    
        if (!nome || !cpf || !dataNascimento || !endereco) {
            alert('Todos os campos são obrigatórios.');
            return;
        }
    
        try {
            if (!isValidDate(dataNascimento)) {
                alert("Data de nascimento inválida.");
                return;
            }
            const response = await fetch("http://localhost:8080/clientes", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ nome, cpf, dataNascimento, endereco }),
            });
    
            if (response.ok) {
                alert("Cliente adicionado!");
                setNome(""); setCpf(""); setDataNascimento(""); setEndereco("");
                if (onAddCliente) onAddCliente();
            } else if (response.status === 409) {
                alert("CPF já cadastrado.");
                return;
            } else {
                alert("Erro ao adicionar cliente.");
            }
        } catch (error) {
            console.error("Erro:", error);
            alert("Erro de rede.");
        }
    };

    return (
        <div>
            <h2>Adicionar Cliente</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Nome:</label>
                    <input
                        type="text"
                        value={nome}
                        onChange={(e) => setNome(e.target.value)}
                        placeholder="Digite o nome"
                    />
                </div>
                <div>
                    <label>CPF:</label>
                    <input
                        type="text"
                        value={cpf}
                        onChange={(e) => setCpf(e.target.value)}
                        placeholder="Digite o CPF"
                    />
                </div>
                <div>
                    <label>Data de Nascimento:</label>
                    <input
                        type="date"
                        value={dataNascimento}
                        onChange={(e) => setDataNascimento(e.target.value)}
                        placeholder="Digite a data de nascimento"
                    />
                </div>
                <div>
                    <label>Endereço:</label>
                    <input
                        type="text"
                        value={endereco}
                        onChange={(e) => setEndereco(e.target.value)}
                        placeholder="Digite o endereço"
                    />
                </div>
                <button type="submit">Adicionar</button>
            </form>
        </div>
    );
};

export default ClienteAdd;