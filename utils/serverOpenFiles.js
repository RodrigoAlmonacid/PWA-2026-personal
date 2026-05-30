const fs = require('fs');

const serverFile = (res, filePath, contentType, error) => {
    fs.readFile(filePath, (err, content) => {
        if (err) {
            res.writeHead(500, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ error: error }));
        }
        else {
            res.writeHead(200, { 'Content-Type': contentType });
            res.end(content);
        }
    })
}
module.exports = serverFile;