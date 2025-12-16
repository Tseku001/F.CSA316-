// ===============================
// DOM Elements
// ===============================
const taskInput = document.getElementById('taskInput');
const taskList = document.getElementById('taskList');
const filterBtns = document.querySelectorAll('.filter-btn');
const themeToggle = document.getElementById('themeToggle');
const toast = document.getElementById('toast');

let currentFilter = 'all'; // all | active | done
// ===============================
// Init
// ===============================
document.querySelector('.task-input-container button').addEventListener('click', addTask);
fetchTasks();

// Enter дарахад task нэмэх
taskInput.addEventListener("keydown", function (event) {
    if (event.key === "Enter") {
        addTask();
    }
});
// ===============================
// Helper: Show Toast
// ===============================
function showToast(message) {
    toast.textContent = message;
    toast.style.display = 'block';
    setTimeout(() => { toast.style.display = 'none'; }, 2000);
}

// ===============================
// Dark Mode Toggle
// ===============================
themeToggle.addEventListener('click', () => {
    document.body.classList.toggle('dark-mode');
    const isDark = document.body.classList.contains('dark-mode');
    showToast(isDark ? 'Dark mode enabled' : 'Dark mode disabled');
});

// ===============================
// Fetch Tasks
// ===============================
async function fetchTasks() {
    const response = await fetch('/tasks');
    const tasks = await response.json();
    renderTasks(tasks);
}

// ===============================
// Render Tasks
// ===============================
function renderTasks(tasks) {
    taskList.innerHTML = '';
    tasks
        .filter(task => {
            if (currentFilter === 'active') return !task.done;
            if (currentFilter === 'done') return task.done;
            return true;
        })
        .forEach(task => {
            const li = document.createElement('li');
            li.className = 'task-item' + (task.done ? ' done' : '');
            
            // Task title
            const span = document.createElement('span');
            span.textContent = task.title;
            span.className = 'task-title';
            li.appendChild(span);
            
            // Complete button
            const doneBtn = document.createElement('button');
            doneBtn.textContent = 'Done';
            doneBtn.className = 'doneBtn';
            doneBtn.onclick = () => completeTask(task.id);
            li.appendChild(doneBtn);
            
            // Delete button
            const delBtn = document.createElement('button');
            delBtn.textContent = 'Delete';
            delBtn.className = 'deleteBtn';
            delBtn.onclick = () => deleteTask(task.id);
            li.appendChild(delBtn);

            // Edit button
            const editBtn = document.createElement('button');
            editBtn.textContent = 'Edit';
            editBtn.className = 'editBtn';
            editBtn.onclick = () => openEditModal(task);
            li.appendChild(editBtn);

            taskList.appendChild(li);
        });
}

// ===============================
// Add Task
// ===============================
async function addTask() {
    const title = taskInput.value.trim();
    if (!title) return showToast('Task title шаардлагатай');

    await fetch('/tasks', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title })
    });

    taskInput.value = '';
    showToast('Task нэмэгдлээ');
    fetchTasks();
}

// ===============================
// Complete Task
// ===============================
async function completeTask(id) {
    await fetch(`/tasks/${id}`, { method: 'PUT' });
    showToast('Task дууссан боллоо');
    fetchTasks();
}

// ===============================
// Delete Task
// ===============================
async function deleteTask(id) {
    await fetch(`/tasks/${id}`, { method: 'DELETE' });
    showToast('Task устлаа');
    fetchTasks();
}

// ===============================
// Filters
// ===============================
filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        currentFilter = btn.dataset.filter;
        filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        fetchTasks();
    });
});

// ===============================
// Modal for Edit
// ===============================
const modal = document.createElement('div');
modal.className = 'modal';
document.body.appendChild(modal);

const modalContent = document.createElement('div');
modalContent.className = 'modal-content';
modal.appendChild(modalContent);

const modalInput = document.createElement('input');
modalContent.appendChild(modalInput);

const saveBtn = document.createElement('button');
saveBtn.textContent = 'Save';
modalContent.appendChild(saveBtn);

const closeBtn = document.createElement('span');
closeBtn.className = 'close';
closeBtn.textContent = '×';
modalContent.appendChild(closeBtn);

let editTaskId = null;

function openEditModal(task) {
    editTaskId = task.id;
    modalInput.value = task.title;
    modal.style.display = 'block';
}

closeBtn.onclick = () => modal.style.display = 'none';
window.onclick = e => { if (e.target == modal) modal.style.display = 'none'; }

saveBtn.onclick = async () => {
    const newTitle = modalInput.value.trim();
    if (!newTitle) return showToast('Task title шаардлагатай');
    await fetch(`/tasks/${editTaskId}`, {
        method: 'PUT',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({title: newTitle})
    });
    showToast('Task шинэчилэгдлээ');
    modal.style.display = 'none';
    fetchTasks();
}

// ===============================
// Init
// ===============================
document.querySelector('.task-input-container button').addEventListener('click', addTask);
fetchTasks();
