async function fetchTasks() {
    const response = await fetch('/tasks');
    const tasks = await response.json();
    const list = document.getElementById('taskList');
    list.innerHTML = '';
    tasks.forEach(task => {
        const li = document.createElement('li');
        li.textContent = task.title;
        li.className = task.done ? 'done' : '';
        
        // Complete button
        const doneBtn = document.createElement('button');
        doneBtn.textContent = 'Done';
        doneBtn.onclick = () => completeTask(task.id);
        
        // Delete button
        const delBtn = document.createElement('button');
        delBtn.textContent = 'Delete';
        delBtn.onclick = () => deleteTask(task.id);
        
        li.appendChild(doneBtn);
        li.appendChild(delBtn);
        list.appendChild(li);
    });
}

async function addTask() {
    const input = document.getElementById('taskInput');
    const title = input.value.trim();
    if (!title) return alert('Task title шаардлагатай');
    
    await fetch('/tasks', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title })
    });
    input.value = '';
    fetchTasks();
}

async function completeTask(id) {
    await fetch(`/tasks/${id}`, { method: 'PUT' });
    fetchTasks();
}

async function deleteTask(id) {
    await fetch(`/tasks/${id}`, { method: 'DELETE' });
    fetchTasks();
}

// Анх сервер ажиллаж эхлэхэд
fetchTasks();
