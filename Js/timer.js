import { formatTime } from '..Js/utils.js';

// Inicializar temporizador
export function initializeTimer() {
    const incrementButton = document.getElementById('incrementButton');
    const decrementButton = document.getElementById('decrementButton');
    const inputNumber = document.getElementById('inputNumber');
    const skipBreaksCheckbox = document.getElementById('skipBreaksCheckbox');

    incrementButton.addEventListener('click', () => updateInputValue(inputNumber, 5));
    decrementButton.addEventListener('click', () => updateInputValue(inputNumber, -5));
    inputNumber.addEventListener('change', () => validateInput(inputNumber));
    skipBreaksCheckbox.addEventListener('change', updateBreaksIndicator);

    updateBreaksIndicator();
}

export function handleStartPomodoro() {
    const inputNumber = document.getElementById('inputNumber');
    const minutes = parseInt(inputNumber.value, 10);

    if (isNaN(minutes) || minutes <= 0) {
        alert('Por favor, ingresa un tiempo válido para iniciar el temporizador.');
        return;
    }

    startTimer(minutes);
}

function startTimer(minutes) {
    let remainingTime = minutes * 60;
    const timebreakSpan = document.getElementById('timebreak');

    const timerInterval = setInterval(() => {
        timebreakSpan.textContent = `Tiempo restante: ${formatTime(remainingTime)}`;
        remainingTime--;

        if (remainingTime < 0) {
            clearInterval(timerInterval);
            alert('¡Tiempo completado!');
            timebreakSpan.textContent = ''; // Reinicia el indicador
        }
    }, 1000);
}

function updateInputValue(input, valueChange) {
    let currentValue = parseInt(input.value, 10) || 0;
    currentValue += valueChange;
    if (currentValue >= 10 && currentValue <= 240) {
        input.value = currentValue;
    }
}

function validateInput(input) {
    const value = parseInt(input.value, 10);
    if (isNaN(value) || value < 10 || value > 240) {
        input.value = 10;
    }
    updateBreaksIndicator();
}

function updateBreaksIndicator() {
    const inputNumber = document.getElementById('inputNumber');
    const skipBreaksCheckbox = document.getElementById('skipBreaksCheckbox');
    const timebreakSpan = document.getElementById('timebreak');

    const minutes = parseInt(inputNumber.value, 10);
    const breaks = getNumberOfBreaks(minutes);

    let message = skipBreaksCheckbox.checked
        ? 'Hemos omitido los descansos.'
        : breaks > 0
            ? `Tienes ${breaks} ${breaks === 1 ? 'break' : 'breaks'} de 10 minutos.`
            : 'No tienes breaks disponibles.';
    timebreakSpan.textContent = message;
}

function getNumberOfBreaks(minutes) {
    return Math.max(0, Math.floor((minutes - 30) / 45));
}
