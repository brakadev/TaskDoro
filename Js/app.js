import { initializeTimer, startTimer, toggleControls } from './timer.js';
import { initializeTasks, addTask } from './tasks.js';

// Elementos globales
const startPomodoroButton = document.getElementById('startPomodoro');
const addTaskButton = document.getElementById('addTaskButton');

// Inicializar funcionalidades principales
function initializeApp() {
    initializeTimer();
    initializeTasks();
    attachGlobalEvents();
}

// Eventos globales
function attachGlobalEvents() {
    startPomodoroButton.addEventListener('click', handleStartPomodoro);
    addTaskButton.addEventListener('click', addTask);
}

// Manejar el inicio del temporizador
function handleStartPomodoro() {
    const inputNumber = document.getElementById('inputNumber');
    const minutes = parseInt(inputNumber.value, 10);

    if (isNaN(minutes) || minutes <= 0) {
        alert('Por favor, ingresa un tiempo válido para iniciar el temporizador.');
        return;
    }

    toggleControls(true); // Bloquea los controles
    startTimer(minutes, () => toggleControls(false)); // Desbloquea al finalizar
}

// Inicializa la aplicación al cargar la página
document.addEventListener('DOMContentLoaded', initializeApp);
