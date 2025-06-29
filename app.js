const signoutBtn = document.getElementById("signOutBtn");
const taskInput = document.getElementById("taskInput");
const addTaskBtn = document.getElementById("addTaskBtn");
const taskList = document.querySelector(".task-list");
const filters = document.querySelectorAll(".filter");

let todos = [];
let completed = [];
let archived = [];

document.addEventListener("DOMContentLoaded", () => {
    const storedTodos = JSON.parse(localStorage.getItem("todos")) || [];
    const storedCompleted = JSON.parse(localStorage.getItem("completed")) || [];
    const storedArchived = JSON.parse(localStorage.getItem("archived")) || [];

    todos = storedTodos;
    completed = storedCompleted;
    archived = storedArchived;

    const defaultFilter = document.querySelector('.filter.active');
    updateTodoUI(defaultFilter);
});

filters.forEach((clickedfilter) => {
    clickedfilter.addEventListener("click", () => {
        let actionRequired = clickedfilter.textContent.trim().toLowerCase();

        if(actionRequired == "todo"){
            updateTodoUI(clickedfilter);
        }else if(actionRequired == "completed"){
            updateCompletedUI(clickedfilter);
        }else if(actionRequired == "archived"){
            updateArchivedUI(clickedfilter);
        }
    })
    
})

signoutBtn.addEventListener("click", () => {
    localStorage.clear();
    window.location.replace("index.html");
})

addTaskBtn.addEventListener("click", () => {
    const taskTitle = taskInput.value.trim();
    if(taskTitle === ""){
        alert("Please enter a task");
    }
    else{
        addTasktoTodo(taskTitle);
    }
    taskInput.value = "";
});

function addTasktoTodo(taskTitle){
    todos.push(taskTitle);
    updateStorage();
    updateUI(taskTitle, "todo");
}

function updateUI(taskTitle, action){
    const li = document.createElement("li");
    li.classList.add("task");

    const span = document.createElement("span");
    span.id = "taskName";
    span.textContent = taskTitle;

    li.appendChild(span);

    if (action === "todo") {
        const completeBtn = document.createElement("button");
        completeBtn.id = "completeBtn";
        completeBtn.textContent = "Mark it as Completed";
        completeBtn.addEventListener("click", () => {
            markAsCompleted(li,taskTitle);
        });

        const archiveBtn = document.createElement("button");
        archiveBtn.id = "archiveBtn";
        archiveBtn.innerHTML = `<i class="fa-solid fa-trash"></i> Archive`;
        archiveBtn.addEventListener("click", () => {
            markAsArchived(li,taskTitle);
        });

        li.appendChild(completeBtn);
        li.appendChild(archiveBtn);
    } 
    else if (action === "completed") {
        const archiveBtn = document.createElement("button");
        archiveBtn.id = "archiveBtn";
        archiveBtn.innerHTML = `<i class="fa-solid fa-trash"></i> Archive`;
        archiveBtn.addEventListener("click", () => {
            markAsArchived(li,taskTitle);
        });

        li.appendChild(archiveBtn);
    } 
    else if (action === "archived") {
        li.classList.add("archived");
        const spanStatus = document.createElement("span");
        spanStatus.classList.add("archivedText");
        spanStatus.textContent = "Archived";
        li.appendChild(spanStatus);
    }

    taskList.appendChild(li);
}

function markAsCompleted(li, taskTitle){
    li.classList.add("completed");
    removeFromTodo(li, taskTitle);
    completed.push(taskTitle);
    updateStorage();
}

function markAsArchived(li,taskTitle){
    li.classList.add("archived");

    const span = document.createElement("span");
    span.classList.add("archivedText");
    span.textContent = "Archived";

    li.appendChild(span);
    removeFromTodo(li, taskTitle);
    removeFromCompleted(li, taskTitle);
    archived.push(taskTitle);
    updateStorage();
}

function removeFromTodo(li, taskTitle){
    li.remove();
    todos = todos.filter((task) => task != taskTitle);
}

function removeFromCompleted(li, taskTitle){
    li.remove();
    completed = completed.filter((task) => task != taskTitle);
}

function updateTodoUI(filter){
    addActiveClass(filter);
    taskList.innerHTML = "";
    todos.forEach((taskTitle) => {
        updateUI(taskTitle, "todo");
    });
}

function updateCompletedUI(filter){
    addActiveClass(filter);
    taskList.innerHTML = "";
    completed.forEach((taskTitle) => {
        updateUI(taskTitle, "completed");
    });
}

function updateArchivedUI(filter){
    addActiveClass(filter);
    taskList.innerHTML = "";
    archived.forEach((taskTitle) => {
        updateUI(taskTitle, "archived");
    });
}

function addActiveClass(filter){
    filters.forEach((f) => {
        if(f !== filter){
            f.classList.remove("active");
        }
    })
    filter.classList.add("active");
}

function updateStorage() {
    localStorage.setItem("todos", JSON.stringify(todos));
    localStorage.setItem("completed", JSON.stringify(completed));
    localStorage.setItem("archived", JSON.stringify(archived));
}




