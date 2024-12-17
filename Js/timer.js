import { formatTime } from './utils.js';


export function initializeTimer() {
    const incrementButton = document.getElementById('incrementButton');
    const decrementButton = document.getElementById('decrementButton');
    const inputNumber = document.getElementById('inputNumber');
    const skipBreaksCheckbox = document.querySelector('.checkbox-skipbreaks');

    // Eventos para incrementar y decrementar tiempo
    incrementButton.addEventListener('click', () => updateInputValue(inputNumber, 5));
    decrementButton.addEventListener('click', () => updateInputValue(inputNumber, -5));
    inputNumber.addEventListener('change', () => validateInput(inputNumber));
    skipBreaksCheckbox.addEventListener('change', updateBreaksIndicator);

    // Inicializar el indicador de descansos
    updateBreaksIndicator();
}

export function startTimer(minutes) {
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

function getNumberOfBreaks(minutes) {
    if (minutes < 30) return 0;

    const breakRanges = [
        { min: 30, max: 74, breaks: 1 },
        { min: 75, max: 99, breaks: 2 },
        { min: 100, max: 124, breaks: 3 },
        { min: 125, max: 149, breaks: 4 },
        { min: 150, max: 174, breaks: 5 },
        { min: 175, max: 199, breaks: 6 },
        { min: 200, max: 224, breaks: 7 },
        { min: 225, max: 240, breaks: 8 },
    ];

    return breakRanges.find((range) => minutes >= range.min && minutes <= range.max)?.breaks || 0;
}

function updateBreaksIndicator() {
    const inputNumber = document.getElementById('inputNumber');
    const skipBreaksCheckbox = document.querySelector('.checkbox-skipbreaks');
    const timebreakSpan = document.getElementById('timebreak');

    const minutes = parseInt(inputNumber.value, 10);
    const numBreaks = getNumberOfBreaks(minutes);

    let indicatorMessage = '';
    if (skipBreaksCheckbox.checked) {
        indicatorMessage = 'Hemos omitido los descansos.';
    } else if (numBreaks === 0) {
        indicatorMessage = 'No tienes breaks disponibles.';
    } else {
        indicatorMessage = `Tienes ${numBreaks} ${numBreaks === 1 ? 'break' : 'breaks'} de 10 minutos.`;
    }

    timebreakSpan.textContent = indicatorMessage;
}
