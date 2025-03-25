Esse é o projeto para a empresa "Comércio S.A." de cadastro de clientes e contatos, para o programa de Estágio Além do Sistema, da Muralis.
Foram utilizadas as tecnologias de Java com Spring Boot, para o backend, e React.js, para o frontend; o banco de dados utilizado é o SQLite, considerando o pequeno volume de dados.

# Execução do Projeto
Requisitos: Java 17+, Node.js + NPM

Para executar o projeto:
## Backend
    Em dois terminais, na raíz do projeto ("/muralis"), navegue até backend/demo e execute "./mvnw spring-boot:run" para colocar o backend em funcionamento.
```sh
    cd backend/demo
    ./mvnw spring-boot:run
```
## População do Banco de Dados
!!! Observação:
O sistema já cria as tabelas automaticamente com base nas entidades JPA.
Para utilização do script.sql para população do banco de dados, navegue até:

```sh
    cd backend/demo
```
(Ignore esse passo se já estiver nesse caminho)
E então execute:

```sh
cmd /c "sqlite3 muralis.db < script.sql"
```
Esse comando executará uma inserção no banco de dados com dados de teste.
Observação: certifique-se de executar esse comando apenas com o banco de dados vazio, para evitar conflitos com identificadores.

## Frontend
    Para o frontend, use o outro terminal e da mesma raiz do projeto navegue até frontend/view e execute "npm run start" para colocar o frontend em funcionamento.
    A partir de então, ambas as partes do sistema devem estar em pleno funcionamento e em comunicação.
```sh
    cd frontend/view
    npm install
    npm run start
```
Observação: execute "npm install" apenas na primeira execução do sistema.

# Checklist de Requisitos
Requisitos Funcionais:
 RF01: Cadastro de clientes (Nome, CPF, Data de Nascimento, Endereço)

 RF02: Edição de cliente

 RF03: Exclusão de cliente

 RF04: Listagem de todos os clientes

 RF05: Busca por nome ou CPF

 RF06: Cadastro de contatos (Tipo, Valor, Observação)

 RF07: Edição de contatos

 RF08: Exclusão de contatos

 RF09: Listagem de contatos por cliente

Regras de Negócio:
 RN01: Nome e CPF obrigatórios

 RN02: Tipo e Valor do contato obrigatórios

 RN03: CPF deve ser único

 RN04: Nome não pode ser vazio

 RN05: Data de nascimento deve ser válida

 RN06: Cliente pode ter múltiplos contatos

 RN07: Exclusão de cliente remove seus contatos

 RN08: Validação antes de cadastrar ou editar