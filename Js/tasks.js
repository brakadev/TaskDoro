// Selección de elementos
const taskForm = document.getElementById('taskForm');
const taskInput = document.getElementById('taskInput');
const taskList = document.getElementById('taskList');
const taskCounter = document.getElementById('spanTaskNumber');
const taskMessage = document.createElement('p'); // Elemento para mensajes dinámicos
// Configuración inicial de mensajes
Object.assign(taskMessage.style, {
    color: "gray",
    fontSize: "0.8rem",
    fontWeight: "600",
    marginTop: "0.5rem",
});
taskMessage.classList.add("taskMessage");
taskCounter.insertAdjacentElement("afterend", taskMessage);

// Estado global de tareas
let pendingTasks = 0;

function displayMessage(message, color = 'gray', duration = 3000) {
    taskMessage.textContent = message;
    taskMessage.style.color = color;

    setTimeout(() => {
        taskMessage.textContent = ''; // Limpiar mensaje después del tiempo
    }, duration);
}

function handleFormSubmit(e) {
    e.preventDefault();


    // Verificar si ya hay 4 tareas
    if (taskList.children.length >= 4) {
        const taskCounter = document.getElementById('spanTaskNumber');
        const originalMessage = taskCounter.textContent; // Guardar el mensaje original

        // Mostrar mensaje temporal
        taskCounter.textContent = 'No puedes agregar más de 4 tareas';
        taskCounter.style.color = 'red';

        // Restaurar el mensaje original después de 3 segundos
        setTimeout(() => {
            taskCounter.textContent = originalMessage;
            taskCounter.style.color = 'black'; // Restaurar el color original
        }, 3000);
        return;

    }

    const taskText = taskInput.value.trim();
    // Validar longitud mínima
    if (!/^\S.{1,}$/.test(taskText)) {
        // displayMessage('La tarea debe tener al menos 2 caracteres válidos.', 'red');
        const taskCounter = document.getElementById('spanTaskNumber');
        const originalMessage2 = taskCounter.textContent; // Guardar el mensaje original

        // Mostrar mensaje temporal
        taskCounter.textContent = 'La tarea debe contener un mínimo 2 caracteres.', 'red';
        taskCounter.style.color = 'red';

        // Restaurar el mensaje original después de 3 segundos
        setTimeout(() => {
            taskCounter.textContent = originalMessage2;
            taskCounter.style.color = 'black'; // Restaurar el color original
        }, 3000);
        return;
    }

    createTask(taskText);
    taskInput.value = '';
    updateCounter();
}

function createTask(taskText) {

    const taskContainer = document.createElement('div');
    taskContainer.classList.add('task-NewDiv');

    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.classList.add('taskInputCheckBox');

    // Crear el texto asociado al checkbox
    const label = document.createElement('label');
    label.textContent = taskText;
    label.classList.add('task-label');

    // Añadir evento para subrayar cuando esté marcado
    checkbox.addEventListener('change', () => {
        if (checkbox.checked) {
            label.classList.add('completed'); // Usar clases CSS para consistencia
            label.style.textDecoration = 'line-through';
            label.style.color = 'gray';
            displayMessage('');
            pendingTasks--;
        } else {
            label.classList.remove('completed');
            // label.style.textDecoration = 'none';
            // label.style.color = '';
            pendingTasks++;
        }
        updateCounter();

    });

    // Añadir evento para eliminar tarea con doble clic
    taskContainer.addEventListener('dblclick', () => {
        taskContainer.remove();
        updateCounter();
        if (!checkbox.checked) {
            pendingTasks--;
        }
        updateCounter();
    });


    // Agregar checkbox y label al contenedor
    taskContainer.appendChild(checkbox);
    taskContainer.appendChild(label);

    // Agregar el contenedor a la lista
    taskList.appendChild(taskContainer);
    pendingTasks++;
}

function updateCounter() {
    if (pendingTasks === 0) {
        taskCounter.textContent = 'No hay tareas pendientes';
    } else {
        taskCounter.textContent = `Tienes ${pendingTasks} tarea(s) pendiente(s).`;
    }
}


// Inicialización de eventos
function initializeTasks() {
    taskForm.addEventListener('submit', handleFormSubmit);
    document.addEventListener('DOMContentLoaded', updateCounter);
}

// Exportar funciones y variables
export { initializeTasks };