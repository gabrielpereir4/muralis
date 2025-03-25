import React from 'react';

function ClienteSearch({ onSearch }) {
    const handleChange = (e) => {
        const termo = e.target.value;
        onSearch(termo); // passa para o pai
    };

    return (
        <div>
            <input 
                type="text" 
                placeholder="Pesquisar por nome ou CPF"
                onChange={handleChange}
                style={{ padding: '8px', width: '100%', boxSizing: 'border-box' }}
            />
        </div>
    );
}

export default ClienteSearch;