let display = document.getElementById('display');
let historyList = document.getElementById('history-list');
let history = [];

// Función para manejar la entrada
function input(value) {
    display.value += value; // Agrega el valor al display
}

// Función para manejar operaciones
function operation(op) {
    if (display.value !== "") {
        display.value += ` ${op} `; // Agrega la operación al display
    }
}

// Función para calcular el resultado
function calculate() {
    try {
        // Evalúa la expresión matemática en el display
        let result = eval(display.value.replace(/[^-()\d/*+.]/g, ''));
        history.push(display.value + " = " + result); // Agrega la operación al historial
        display.value = result; // Muestra el resultado en el display
        updateHistory();
    } catch (error) {
        display.value = "ERROR"; // Muestra un error si ocurre
    }
}

// Función para limpiar el display
function clearDisplay() {
    display.value = ""; // Limpia el display
}

// Función para actualizar el historial
function updateHistory() {
    historyList.innerHTML = ""; // Limpia el historial
    history.forEach(item => {
        let li = document.createElement('li');
        li.textContent = item; // Agrega cada item al historial
        historyList.appendChild(li);
    });
}

// Función para cambiar entre calculadoras
function switchCalculator(type) {
    document.getElementById('basic-buttons').style.display = 'none';
    document.getElementById('scientific-buttons').style.display = 'none';
    document.getElementById('graph-buttons').style.display = 'none';
    if (type === 'basic') {
        document.getElementById('basic-buttons').style.display = 'block';
    } else if (type === 'scientific') {
        document.getElementById('scientific-buttons').style.display = 'block';
    } else if (type === 'graph') {
        document.getElementById('graph-buttons').style.display = 'block';
    }
}

// Función para alternar el tema (oscuro/claro)
function toggleTheme() {
    let body = document.body;
    body.classList.toggle("dark-mode");
    body.classList.toggle("light-mode");
}

// Función para graficar (placeholder)
function graphFunction() {
    alert("Función de graficado aún no implementada."); // Placeholder para la función de graficado
}

// Función para mostrar/ocultar el menú
function toggleMenu() {
    const menuContent = document.getElementById('menu-content');
    menuContent.style.display = (menuContent.style.display === "block") ? "none" : "block";
}
