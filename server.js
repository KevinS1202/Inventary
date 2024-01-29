const express = require('express');
const multer = require('multer');
const fs = require('fs');

const app = express();
const port = 3000;

app.use(express.static('public'));
app.use(express.json());

const storage = multer.diskStorage({
    destination: 'uploads/',
    filename: function (req, file, cb) {
        cb(null, file.originalname);
    },
});

const upload = multer({ storage: storage });

app.post('/upload', upload.single('file'), (req, res) => {
    res.send('Archivo subido con éxito.');
});

app.get('/files', (req, res) => {
    fs.readdir('uploads/', (err, files) => {
        if (err) {
            res.status(500).json({ error: 'Error al leer la carpeta de archivos.' });
        } else {
            res.json(files);
        }
    });
});

app.get('/download/:file', (req, res) => {
    const fileName = req.params.file;
    const filePath = __dirname + '/uploads/' + fileName;
    res.download(filePath);
});

app.listen(port, () => {
    console.log(`Servidor escuchando en http://localhost:${port}`);
});
