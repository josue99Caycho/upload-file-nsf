const express = require('express');
const app = express();

const cors = require('cors');
const multer = require('multer');

const PORT = 4700;

app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const storage = multer.diskStorage({
    filename: (_res, file, cb) => {
        const extension = file.originalname.split('.').pop();
        const filenameActual = file.originalname.split('.')[0]
        const filename = `${filenameActual}-${Date.now()}`
        cb(null, `${filename}.${extension}`)
    },
    destination: (_res, _file, cb) => {
        cb(null, './src/public')
    }
}) 

const upload = multer({ storage })

app.post('/upload', upload.single('files'), async (_req, resp) =>{
    console.log('Que fuentes, toy entrando xd')
    resp.send({ status: 200, data: { result: 'OKI P'}})
})

app.listen(PORT, () => {
    console.log(`Escuchando el puerto ${PORT}`)
})