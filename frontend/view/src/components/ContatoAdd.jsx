import React, { useState } from 'react';
import { useParams } from 'react-router-dom';

function ContatoAdd({ onAddContato }) {
    const { id } = useParams(); // ID do cliente
    const [formData, setFormData] = useState({
        tipo: '',
        valor: '',
        observacao: ''
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleAdd = () => {
        if (!formData.tipo || !formData.valor) {
            alert("Tipo e valor são obrigatórios.");
            return;
        }

        fetch(`http://localhost:8080/clientes/${id}/contatos`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(formData)
        })
            .then((res) => {
                if (!res.ok) throw new Error('Erro ao adicionar contato');
                return res.json();
            })
            .then(() => {
                alert("Contato adicionado!");
                setFormData({ tipo: '', valor: '', observacao: '' });
                if (onAddContato) onAddContato();
            })
            .catch((err) => {
                console.error(err);
                alert("Erro ao adicionar contato.");
            });
    };

    return (
        <div>
            <h3>Adicionar Contato</h3>
            <div>
                <input
                    name="tipo"
                    placeholder="Tipo (Email/Telefone)"
                    value={formData.tipo}
                    onChange={handleChange}
                />
                <input
                    name="valor"
                    placeholder="Valor"
                    value={formData.valor}
                    onChange={handleChange}
                />
                <input
                    name="observacao"
                    placeholder="Observação"
                    value={formData.observacao}
                    onChange={handleChange}
                />
                <button onClick={handleAdd}>Adicionar</button>
            </div>
        </div>
    );
}

export default ContatoAdd;