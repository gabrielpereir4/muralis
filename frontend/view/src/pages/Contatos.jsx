import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import ContatoAdd from '../components/ContatoAdd';
import ContatoList from '../components/ContatoList';
import Footer from '../components/Footer';

function Contatos() {
    const { id } = useParams();
    const [cliente, setCliente] = useState(null);
    const [refresh, setRefresh] = useState(false);

    const atualizarLista = () => setRefresh(!refresh);

    useEffect(() => {
        fetch(`http://localhost:8080/clientes/${id}`)
            .then(res => res.json())
            .then(setCliente)
            .catch(console.error);
    }, [id]);

    return (
        <div className='container'>
            <h2>Contatos de {cliente?.nome} ({cliente?.cpf})</h2>
            <Link to="/clientes">← Voltar</Link>
            <ContatoAdd onAddContato={atualizarLista}/>
            <ContatoList refresh={refresh}/>
            <Footer/>
        </div>
    );
}

export default Contatos;