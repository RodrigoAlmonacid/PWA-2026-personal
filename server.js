let characters = require('./characters/characters');
const serverFile = require('./utils/serverOpenFiles')
const path = require('path');
const http = require('http');
const host = 'localhost';
const port = 3000;

const listener = (req, res) => {

    //lista de todos los personajes
    if (req.method === 'GET') {
        if (req.url === '/api/characters') {
            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify(characters));
        }
        //prueba
        else if (req.url === '/health') {
            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ status: "ok" }));
        }
        else if (req.url === '/') {
            const filePath = path.join(__dirname, 'public', 'index.html');
            serverFile(res, filePath, 'text/html', 'Error al leer el index');
        }
        else if (req.url === '/styles.css') {
            const filePath = path.join(__dirname, 'public', 'styles.css');
            serverFile(res, filePath, 'text/css', 'Error al leer estilado');
        }
        else if (req.url === '/Servidores-teoria.pdf') {
            const filePath = path.join(__dirname, 'documents', 'Servidores-teoria.pdf');
            serverFile(res, filePath, 'application/pdf', 'Error al leer la teoría');
        }
        else if (req.url === '/Servidores-tp.pdf') {
            const filePath = path.join(__dirname, 'documents', 'Servidores-tp.pdf');
            serverFile(res, filePath, 'application/pdf', 'Error al leer el tp de ejercicios');
        }
        else if (req.url === '/app.js') {
            const filePath = path.join(__dirname, 'public', 'app.js');
            serverFile(res, filePath, 'text/javascript', 'Error al leer el javaScript');
        }
        else if (req.url.startsWith('/api/characters/')) {
            const id = req.url.split('/')[3];
            if (/^\d+$/.test(id)) {
                const personaje = characters.find(pers => pers.id === id);
                if (personaje) {
                    res.writeHead(200, { 'Content-Type': 'application/json' });
                    res.end(JSON.stringify(personaje));
                }
                else {
                    res.writeHead(404, { 'Content-Type': 'text/plain' });
                    res.end('Personaje no encontrado');
                }
            }
            else {
                res.writeHead(400, { 'Content-Type': 'text/plain' });
                res.end('El id ingresado no corresponde');
            }
        }
        else {
            res.writeHead(404, { 'Content-Type': 'text/plain' });
            res.end('Ruta no encontrada');
        }

    }
    else if (req.method === 'POST') {
        if (req.url === '/api/characters') {
            let body = '';

            req.on('data', chunk => {
                body += chunk.toString();
            });

            req.on('end', () => {
                try {
                    const id = (characters.length + 1).toString();
                    const newPersonaje = JSON.parse(body);
                    newPersonaje.id = id;
                    characters.push(newPersonaje);
                    res.writeHead(201, { 'Content-Type': 'application/json' });
                    res.end(JSON.stringify(newPersonaje));
                } catch (error) {
                    res.writeHead(400, { 'Content-Type': 'text/plain' });
                    res.end('JSON inválido');
                }
            });
        } else {
            res.writeHead(404, { 'Content-Type': 'text/plain' });
            res.end('Ruta POST no encontrada');
        }
    }
    else if (req.method === 'DELETE') {
        if (req.url.startsWith('/api/characters/')) {
            const id = req.url.split('/')[3];
            if (/^\d+$/.test(id)) {
                const personaje = characters.find(pers => pers.id === id);
                if (personaje) {
                    const cutCharacters = characters.filter(pers => pers.id != id);
                    characters = cutCharacters;
                    res.writeHead(200, { 'Content-Type': 'application/json' });
                    res.end(JSON.stringify(characters));
                }
                else {
                    res.writeHead(404, { 'Content-Type': 'text/plain' });
                    res.end('Personaje no encontrado');
                }
            }
            else {
                res.writeHead(400, { 'Content-Type': 'text/plain' });
                res.end('El id ingresado no corresponde');
            }
        }
        else {
            res.writeHead(404, { 'Content-Type': 'text/plain' });
            res.end('Ruta no encontrada');
        }
    }
    else if (req.method === 'PUT') {
        if (req.url.startsWith('/api/characters/')) {
            const id = req.url.split('/')[3];
            if (/^\d+$/.test(id)) {
                let personaje = characters.find(pers => pers.id === id);
                let body = '';
                if (personaje) {
                    req.on('data', chunk => {
                        body += chunk.toString();
                    });
                    req.on('end', () => {
                        try {
                            const nuevosDatos = JSON.parse(body);
                            Object.assign(personaje, nuevosDatos);
                            personaje.id = id;
                            res.writeHead(200, { 'Content-Type': 'application/json' });
                            res.end(JSON.stringify(personaje));
                        } catch (error) {
                            res.writeHead(400, { 'Content-Type': 'text/plain' });
                            res.end('No es posible actualizar el personaje');
                        }
                    })
                }
                else {
                    res.writeHead(404, { 'Content-Type': 'text/plain' });
                    res.end('Personaje no encontrado');
                }
            }
            else {
                res.writeHead(400, { 'Content-Type': 'text/plain' });
                res.end('El id ingresado no corresponde');
            }
        }
        else {
            res.writeHead(404, { 'Content-Type': 'text/plain' });
            res.end('Ruta no encontrada');
        }
    }
    else {
        res.writeHead(500, { 'Content-Type': 'text/plain' });
        res.end('Error interno en el servidor al realizar la consulta');
    }
}

const server = http.createServer(listener);

server.listen(port, host, () => {
    console.log('servidor de prueba funcionando con éxito');
})