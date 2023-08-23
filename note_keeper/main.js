"use strict";
class Note {
    constructor() {
        this.tasks = [];
        this.loadTasksFromLocalStorage();
        this.renderTasks();
    }
    addNewTask(task) {
        this.tasks.push(task);
        this.saveTasksToLocalStorage();
        this.renderTasks();
    }
    renderTasks() {
        const renderList = document.getElementById("render_list");
        if (!renderList)
            return;
        renderList.innerHTML = "";
        this.tasks.map((task) => {
            const li = document.createElement("li");
            li.innerText = task.title;
            const deleteButton = document.createElement("button");
            deleteButton.innerText = "Delete";
            deleteButton.addEventListener("click", () => {
                this.deleteTask(task);
            });
            const span = document.createElement("span");
            span.appendChild(deleteButton);
            li.appendChild(span);
            renderList.appendChild(li);
        });
    }
    deleteTask(task) {
        const taskIndex = this.tasks.indexOf(task);
        if (taskIndex !== -1) {
            this.tasks.splice(taskIndex, 1);
            this.saveTasksToLocalStorage();
            this.renderTasks();
        }
    }
    loadTasksFromLocalStorage() {
        const savedTasks = localStorage.getItem("tasks");
        if (savedTasks) {
            this.tasks = JSON.parse(savedTasks);
        }
    }
    saveTasksToLocalStorage() {
        localStorage.setItem("tasks", JSON.stringify(this.tasks));
    }
}
const note = new Note();
const addButton = document.getElementById("addButton");
if (addButton) {
    addButton.addEventListener("click", () => {
        const taskTitleInput = document.getElementById("taskTitle");
        const taskTitle = taskTitleInput.value.trim();
        if (taskTitle !== "") {
            const task = { title: taskTitle };
            note.addNewTask(task);
            taskTitleInput.value = "";
        }
    });
}
