const taskForm = document.getElementById('taskForm');
const taskInput = document.getElementById('taskInput');
const taskList = document.getElementById('taskList');
const taskCounter = document.getElementById('spanTaskNumber');

taskForm.addEventListener('submit', handleFormSubmit);
taskList.addEventListener('click', handleTaskClick);
document.addEventListener('DOMContentLoaded', updateCounter);

function handleFormSubmit(e) {
    e.preventDefault();
    const taskText = taskInput.value.trim();

    if (taskText === '') {
        alert('Por favor, ingresa una tarea válida.');
    } else {
        createTask(taskText);
        taskInput.value = '';
    }
    updateCounter();
}

function createTask(taskText) {
    const taskItem = document.createElement('li');
    taskItem.textContent = taskText;
    taskItem.classList.add('task-item');
    taskList.append(taskItem);
}

function handleTaskClick() {

    if (e.target.tagName === 'LI') {
        e.target.remove();
        updateCounter();
    }

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




