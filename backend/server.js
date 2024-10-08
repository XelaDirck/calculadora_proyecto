const express = require('express');
const path = require('path');
const app = express();
const port = 3000;

// Middleware para servir archivos estáticos (index.html, styles.css, scripts.js)
app.use(express.static(path.join(__dirname, '../frontend'))); // Asegúrate de que la ruta apunte a la carpeta frontend

app.use(express.json());

let history = [];

// API para cálculos básicos, científicos y graficadora
app.post('/api/calculate', (req, res) => {
    const { operation, type } = req.body;

    try {
        let result;
        switch (type) {
            case 'basic':
                result = eval(operation); // Solo para cálculos básicos
                break;
            case 'scientific':
                // Aquí puedes utilizar una librería como Math.js para operaciones científicas
                result = eval(operation);
                break;
            case 'graphing':
                // Aquí podrías generar datos para graficar
                result = 'Data for graphing';
                break;
        }
        addToHistory(operation);
        res.json({ result });
    } catch (error) {
        res.status(400).json({ error: 'ERROR' });
    }
});

// Guardar historial
function addToHistory(operation) {
    if (history.length >= 5) history.shift();  // Solo guarda las últimas 5 operaciones
    history.push(operation);
}

// Endpoint para devolver el historial
app.get('/api/history', (req, res) => {
    res.json(history);
});

// Ruta raíz para servir index.html
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../frontend/index.html')); // Ruta al archivo index.html
});

// Iniciar el servidor
app.listen(port, () => {
    console.log(`Calculadora API corriendo en http://localhost:${port}`);
});
