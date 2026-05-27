let characters = require('./characters/characters');
const fs = require('fs');
const path = require('path');
const http = require('http');
const host = 'localhost';
const port = 3000;

const listener = (req, res) => {

    //lista de todos los personajes
    if (req.method === 'GET'){
        if(req.url === '/api/characters') {
            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify(characters));
        }
        //prueba
        else if(req.url === '/health'){
            res.writeHead(404, { 'Content-Type': 'text/plain' });
            res.end(JSON.stringify({status: "ok"}));
        }
        else if(req.url === '/'){
            const filePath = path.join(__dirname, 'public', 'index.html');
            fs.readFile(filePath, (err, content) => {
                if(err){
                    res.writeHead(500, { 'Content-Type': 'text/plain'});
                    res.end('Error al leer index.html');
                }
                else{
                    res.writeHead(200, { 'Content-Type': 'text/html'});
                    res.end(content);
                }
            })
        }
    else {
        res.writeHead(404, { 'Content-Type': 'text/plain' });
        res.end('Ruta no encontrada');
    }

}
}

const server = http.createServer(listener);

server.listen(port, host, () => {
    console.log('servidor de prueba funcionando con éxito');
})