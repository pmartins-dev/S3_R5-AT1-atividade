### Resultados Esperados:
Criar funcionalidades de consulta e criação de dados.
Consultar dados dos clientes.
Criar clientes na base de dados.
Tarefas:
1. Adicione no banco de dados do projeto lojaEspricio: 
Uma tabela chamada clientes.
Na tabela clientes adicione as seguintes colunas: idCliente, nomeCliente, cpfCliente (UNIQUE);
2. Partindo da mesma base de dados, crie um clienteModel que realize as seguintes interações com o banco de dados:
Busca de todos os clientes;
Criação de clientes;
3. Partindo do modelo de dados do cliente, crie um clienteController que responda as seguintes requisições:
Busca de todos os clientes;
Criação de clientes (Desafio: verificar se o CPF informado já está inserido e retornar uma mensagem de status 409 caso já exista);
4. Crie rotas para acessar o controlador, o arquivo deve se chamar clienteRoutes;
5. Introduzir as rotas de cliente na middleware do servidor http (arquivo app.js).
Ferramentas:
Acesso a Internet;
Programa de edição de texto: Visual Studio Code;
Repositório remoto: GitHub.