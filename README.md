# cursofullcycle-docker-desafionginx
Desafio aula docker: Multi container nginx + nodejs + mysql

## Instruções para execução:
git clone https://github.com/fercele/cursofullcycle-docker-desafionginx

cd cursofullcycle-docker-desafionginx

Na primeira execução: docker-compose up --build -d

Será criado o banco de dados na pasta /db/mysql com uma tabela people (Definida no db/schema.sql)
Acesse http://localhost:8080

A cada requisição é criado um novo registro de visitante (não há sessão).

Se passado o parâmetro nome, como em http://localhost:8080?nome=Fulano, é criado um registro no banco de dados para o nome passado.


