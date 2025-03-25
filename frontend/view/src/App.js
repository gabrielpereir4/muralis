import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Clientes from "./pages/Clientes";
import Contatos from "./pages/Contatos";
import './styles/App.css'; 

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Clientes />} />
                <Route path="/clientes" element={<Clientes />} />
                <Route path="/clientes/:id/contatos" element={<Contatos />} />
            </Routes>
        </Router>
    );
}

export default App;
