const http = require('http');

const host = 'localhost';
const port = 3030;

const listener = (req, res) => {

    console.log(req.method);
    console.log(req.url);

    res.writeHead(200);
    res.end('<html><body><p><strong>Node</strong> es genial!</p></body></html>');
}

const server = http.createServer(listener);

server.listen(port, host, () => {
    console.log(`Servidor levantado en http://${host}:${port}`)
})