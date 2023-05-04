const express = require('express')
const mysql = require('mysql')
const { Mutex } = require('async-mutex');

const app = express();
const port = 3000;

const config = {
    host: 'db',
    user: 'root',
    password: 'root',
    database: 'nodedb'
};


let countVisitantes = 0;
const mutex = new Mutex();

app.get('/', async (req, res) => {

    //Assegura consistência do contador em caso de concorrência
    const release = await mutex.acquire();
    countVisitantes++;
    release();

    let nome = req.query['nome'];
    //console.log(req.params);

    nome = nome != null ? nome : `Visitante ${countVisitantes}`;

    //Cria um registro toda vez que a página é acessada
    const connection = mysql.createConnection(config);

    try {

        const sql = `INSERT INTO people(name) VALUES('${nome}')`;
        connection.query(sql);

        const lastNameQuery = 'SELECT name FROM people ORDER BY id DESC';
        connection.query(lastNameQuery, (error, results) => {

            // console.log("results: ", results);
            // console.log("error: ", error);

            if (error) {
                console.error(error);
                res.status(500).send('Database error');
                return;
            }

            try {
            
                let html = `
                <html>
                    <head><title>Desafio Full Cycle</title>
                </head>
                <body>
                <table><tr><th>Nome</th></tr>
                `;

                results.forEach(row => {
                    html += `
                        <tr>
                            <td>${row.name}</td>
                        </tr>
                        `;
                });

                html += `
                    </body>
                    </table>
                    </html>`;
                
                res.send(html);
            } catch (error) {
                console.error(error);
                res.status(500).send('Erro realizando operações no banco de dados.');

            } finally {
                //Ja deu pra perceber que eu sou do Java né? kkkk
                console.log("fechando a conexão")
                connection.end();
            }
        });

    } catch (error) {
        console.error(error);
        res.status(500).send('Erro inesperado.');
    } 
    
});

app.listen(port, () => {
    console.log(`Servidor ativo na porta ${port}`);
});
