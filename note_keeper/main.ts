interface Task {
    title: string;
  }
  
  class Note {
    tasks: Task[] = [];
  
    constructor() {
      this.loadTasksFromLocalStorage();
      this.renderTasks();
    }
  
    addNewTask(task: Task): void {
      this.tasks.push(task);
      this.saveTasksToLocalStorage();
      this.renderTasks();
    }
  
    renderTasks(): void {
      const renderList = document.getElementById("render_list");
  
      if (!renderList) return;
  
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
  
    deleteTask(task: Task): void {
      const taskIndex = this.tasks.indexOf(task);
      if (taskIndex !== -1) {
        this.tasks.splice(taskIndex, 1);
        this.saveTasksToLocalStorage();
        this.renderTasks();
      }
    }
  
     loadTasksFromLocalStorage(): void {
      const savedTasks = localStorage.getItem("tasks");
      if (savedTasks) {
        this.tasks = JSON.parse(savedTasks);
      }
    }
  
     saveTasksToLocalStorage(): void {
      localStorage.setItem("tasks", JSON.stringify(this.tasks));
    }
  }
  
  const note = new Note();
  
  const addButton = document.getElementById("addButton");
  if (addButton) {
    addButton.addEventListener("click", () => {
      const taskTitleInput = document.getElementById("taskTitle") as HTMLTextAreaElement;
      const taskTitle = taskTitleInput.value.trim();
      
      if (taskTitle !== "") {
        const task: Task = { title: taskTitle };
        note.addNewTask(task);
        taskTitleInput.value = "";
      }
    });
  }
  