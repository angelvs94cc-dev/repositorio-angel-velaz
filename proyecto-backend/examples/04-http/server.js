import http from 'node:http';
import { PORT, HOST } from './config.js';
import { renderPage } from './renderUtils.js';
import { getTasks } from './tasksRepository.js';

const server = http.createServer(async (req, res) => {
  console.log(req.url);
  let error = false;

  // Creamos la URL de forma robusta
  const url = new URL(req.url ?? '/', `http://${req.headers.host ?? 'localhost'}`);

  try {
    // Ruta de HEALTH
    if (req.method === 'GET' && url.pathname === '/health') {
      res.writeHead(200, { 'Content-Type': 'application/json; charset=utf-8' });
      res.end(JSON.stringify({ status: 'ok' }));
      return;
    }

    // Aquí irían más rutas (GET /tasks, etc.) que Nauel irá rellenando...

  } catch (ex) {
    console.log(ex);
    res.writeHead(500, { 'Content-Type': 'text/plain; charset=utf-8' });
    res.end('Internal Server Error');
    return;
  }

  // Handler 404 (Siempre al final)
  res.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' });
  res.end('Ruta no encontrada');
});

server.listen(PORT, HOST, () => {
  console.log(`Servidor escuchando en http://${HOST}:${PORT}`);
});