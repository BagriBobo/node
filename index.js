import http from 'http';

let tasks = [
  { id: 1, descricao: 'Tarefa 1', status: 'aguardando' },
  { id: 2, descricao: 'Tarefa 2', status: 'aguardando' }
];

const server = http.createServer((req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Content-Type', 'application/json');

  if (req.method === 'GET' && req.url === '/tasks') {
    res.end(JSON.stringify(tasks));
    return;
  }

  res.statusCode = 404;
  res.end(JSON.stringify({ error: 'Rota não encontrada' }));
});

server.listen(3000, () => {
  console.log('Servidor rodando em http://localhost:3000');
});