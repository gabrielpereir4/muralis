import React, {useState } from "react";
import ClienteList from "../components/ClienteList";
import ClienteSearch from "../components/ClienteSearch";
import ClienteAdd from "../components/ClienteAdd";
import Footer from "../components/Footer";

function Clientes() {
    const [refresh, setRefresh] = useState(false);
    const [busca, setBusca] = useState('');

    const atualizarLista = () => setRefresh(!refresh);

    return (
        <div className="container">
            <h1>Clientes</h1>
            <ClienteAdd onAddCliente={atualizarLista} />
            <ClienteSearch onSearch={setBusca} />
            <ClienteList refresh={refresh} termoBusca={busca} />
            <Footer />
        </div>
    );
}

export default Clientes;