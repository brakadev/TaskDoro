// Selección de elementos
const taskForm = document.getElementById('taskForm');
const taskInput = document.getElementById('taskInput');
const taskList = document.getElementById('taskList');
const taskCounter = document.getElementById('spanTaskNumber');

// Inicialización de eventos
taskForm.addEventListener('submit', handleFormSubmit);
// taskList.addEventListener('dblclick', handleTaskDblClick); // Asignar dblclick al contenedor
document.addEventListener('DOMContentLoaded', updateCounter);

function displayWarning(message) {
    const originalText = taskCounter.textContent; // Guardar el texto original

    // Mostrar mensaje de advertencia
    taskCounter.textContent = message;
    taskCounter.style.color = 'red';

    // Restaurar el contenido original después de 3 segundos
    setTimeout(() => {
        taskCounter.textContent = originalText;
        taskCounter.style.color = ''; // Restaurar el color original
    }, 3000);
}

function handleFormSubmit(e) {
    e.preventDefault();

    // Verificar si ya hay 4 tareas
    if (taskList.children.length >= 4) {
        displayWarning('No puedes agregar más de 4 tareas.');
        return;
    }

    const taskText = taskInput.value.trim();

    if (taskText === '') {
        displayWarning('Por favor, ingresa una tarea válida.');
    } else {
        createTask(taskText);
        taskInput.value = '';
    }
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
            label.style.textDecoration = 'line-through';
            label.style.color = 'gray';
        } else {
            label.style.textDecoration = 'none';
            label.style.color = '';
        }
    });

    // Añadir evento para eliminar tarea con doble clic
    taskContainer.addEventListener('dblclick', () => {
        taskContainer.remove();
        updateCounter();
    });


    // Agregar checkbox y label al contenedor
    taskContainer.appendChild(checkbox);
    taskContainer.appendChild(label);

    // Agregar el contenedor a la lista
    taskList.appendChild(taskContainer);
}

function updateCounter() {
    const totalTasks = taskList.children.length;
    taskCounter.textContent = totalTasks === 0
        ? 'No hay tareas pendientes'
        : `Tienes ${totalTasks} tarea(s) pendiente(s).`;
}

function displayError(message) {
    taskCounter.textContent = message;
    setTimeout(updateCounter, 3000); // Vuelve a mostrar el contador después de 3 segundos
}
