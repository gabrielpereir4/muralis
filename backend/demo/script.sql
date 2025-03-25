-- Inserção de clientes
INSERT INTO clientes (nome, cpf, data_nascimento, endereco) VALUES
('João Silva', '123.456.789-00', '1990-05-10 00:00:00.000', 'Rua das Flores, 123'),
('Maria Oliveira', '987.654.321-00', '1985-12-01 00:00:00.000', 'Av. Central, 456'),
('Carlos Souza', '555.666.777-88', '1992-03-15 00:00:00.000', 'Rua Azul, 789');

-- Inserção de contatos (cliente_id assume os IDs 1, 2 e 3)
INSERT INTO contatos (tipo, valor, observacao, cliente_id) VALUES
('Email', 'joao@email.com', 'Pessoal', 1),
('Telefone', '11999998888', 'Whatsapp', 1),
('Email', 'maria@empresa.com', 'Trabalho', 2),
('Telefone', '21988887777', 'Residencial', 2),
('Email', 'carlos@gmail.com', 'Principal', 3);