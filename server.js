import express from 'express';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import { dir } from 'console';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
const port = 3000;

app.use(express.static('public'));

app.get('/', (req, res) => {
    res.sendFile((__dirname, '/public/index.html'));
});


app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});