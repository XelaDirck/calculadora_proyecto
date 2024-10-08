let history = [];
const maxHistory = 5;
let currentCalculator = 'basic';  // Por defecto, la calculadora básica

// Obtener referencias a los elementos del DOM
const modeToggle = document.getElementById('mode-toggle');
const fontToggle = document.getElementById('font-toggle');
const basicCalcButton = document.getElementById('basic-calc');
const scientificCalcButton = document.getElementById('scientific-calc');
const graphingCalcButton = document.getElementById('graphing-calc');
const calcContainer = document.getElementById('calc-container');

// Verifica si los elementos están presentes
console.log('Elementos del DOM:', { modeToggle, fontToggle, basicCalcButton, scientificCalcButton, graphingCalcButton });

// Listeners para los botones
modeToggle.addEventListener('click', toggleMode);
fontToggle.addEventListener('click', toggleFont);
basicCalcButton.addEventListener('click', () => switchCalculator('basic'));
scientificCalcButton.addEventListener('click', () => switchCalculator('scientific'));
graphingCalcButton.addEventListener('click', () => switchCalculator('graphing'));

// Función para cambiar entre los modos claro/oscuro
function toggleMode() {
    document.body.classList.toggle('dark-mode');
    document.body.classList.toggle('light-mode');
    console.log('Modo cambiado');
}

// Función para cambiar el estilo de la fuente
function toggleFont() {
    document.body.style.fontFamily = document.body.style.fontFamily === 'Arial' ? 'Courier New' : 'Arial';
    console.log('Fuente cambiada');
}

// Función para cambiar la calculadora
function switchCalculator(type) {
    console.log('Cambiando a la calculadora:', type);
    currentCalculator = type;
    calcContainer.innerHTML = '';  // Limpiar el contenedor de la calculadora
    if (type === 'basic') {
        loadBasicCalculator();
    } else if (type === 'scientific') {
        loadScientificCalculator();
    } else if (type === 'graphing') {
        loadGraphingCalculator();
    }
}

// Cargar la calculadora básica
function loadBasicCalculator() {
    console.log('Cargando calculadora básica');
    calcContainer.innerHTML = `
        <h2>Calculadora Básica</h2>
        <input id="basic-input" type="text" placeholder="Ingresa una operación" />
        <button id="basic-equals">=</button>
        <div id="basic-result"></div>
    `;
    document.getElementById('basic-equals').addEventListener('click', () => {
        const input = document.getElementById('basic-input').value;
        console.log('Operación ingresada:', input);
        try {
            const result = eval(input);  // Evalúa la operación (solo básico)
            addToHistory(input + ' = ' + result);
            document.getElementById('basic-result').textContent = result;
            console.log('Resultado:', result);
        } catch (error) {
            console.error('Error en la operación:', error);
            document.getElementById('basic-result').textContent = 'ERROR';
        }
    });
}

// Cargar la calculadora científica
function loadScientificCalculator() {
    console.log('Cargando calculadora científica');
    calcContainer.innerHTML = `
        <h2>Calculadora Científica</h2>
        <input id="scientific-input" type="text" placeholder="Ingresa una operación científica" />
        <button id="scientific-equals">=</button>
        <div id="scientific-result"></div>
    `;
    document.getElementById('scientific-equals').addEventListener('click', () => {
        const input = document.getElementById('scientific-input').value;
        console.log('Operación científica ingresada:', input);
        try {
            const result = eval(input);
            addToHistory(input + ' = ' + result);
            document.getElementById('scientific-result').textContent = result;
            console.log('Resultado científico:', result);
        } catch (error) {
            console.error('Error en la operación científica:', error);
            document.getElementById('scientific-result').textContent = 'ERROR';
        }
    });
}

// Cargar la graficadora
function loadGraphingCalculator() {
    console.log('Cargando graficadora');
    calcContainer.innerHTML = `
        <h2>Graficadora</h2>
        <input id="graphing-input" type="text" placeholder="Ingresa una función para graficar" />
        <button id="graphing-plot">Graficar</button>
        <div id="graph-container"></div>
    `;
    document.getElementById('graphing-plot').addEventListener('click', () => {
        const input = document.getElementById('graphing-input').value;
        console.log('Función ingresada para graficar:', input);
        // Aquí podrías integrar una librería para graficar, como Chart.js o D3.js
        document.getElementById('graph-container').textContent = `Graficando: ${input} (Aquí iría una gráfica real)`;
    });
}

// Agregar operaciones al historial
function addToHistory(operation) {
    if (history.length >= maxHistory) {
        history.shift();  // Mantener solo las últimas 5 operaciones
    }
    history.push(operation);
    console.log('Historial actualizado:', history);
    renderHistory();
}

// Mostrar el historial
function renderHistory() {
    const historyList = document.getElementById('history-list');
    historyList.innerHTML = '';
    history.forEach(op => {
        const li = document.createElement('li');
        li.textContent = op;
        historyList.appendChild(li);
    });
    console.log('Historial renderizado:', history);
}

// Cargar la calculadora básica por defecto al cargar la página
document.addEventListener('DOMContentLoaded', () => {
    switchCalculator('basic');
});
