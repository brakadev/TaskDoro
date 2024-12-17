const taskContainer = document.querySelector('.task-container');

export function initializeTasks() {
    loadTasks();
}

export function addTask() {
    const taskName = prompt('Ingrese el nombre de la tarea:');
    if (taskName && taskName.trim() !== '') {
        createTask(taskName);
        saveTasks();
    } else {
        alert('El nombre de la tarea no puede estar vacío.');
    }
}

// Crea el elemento visual de una tarea
function createTask(taskName) {
    const taskItem = document.createElement('div');
    taskItem.classList.add('task-item');

    taskItem.innerHTML = `
        <span>${taskName}</span>
        <button class="delete-task" aria-label="Eliminar tarea">Eliminar</button>
    `;

    taskItem.querySelector('.delete-task').addEventListener('click', () => {
        taskItem.remove();
        saveTasks();
    });

    taskContainer.appendChild(taskItem);
}

// Guarda las tareas en localStorage
function saveTasks() {
    const tasks = Array.from(document.querySelectorAll('.task-item span')).map((task) => task.textContent);
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Carga las tareas desde localStorage
function loadTasks() {
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    tasks.forEach((task) => createTask(task));
}
