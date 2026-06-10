import storage from "../utils/storage";
import { showToast } from "../utils/toast";
import taskRender from "./taskRender";
import taskState from "./taskState";


function getFilteredTasks() {
    let tasks = taskState.tasks;

    if (taskState.filter === "active") {
        tasks = tasks.filter(t => !t.isCompleted);
    }

    if (taskState.filter === "completed") {
        tasks = tasks.filter(t => t.isCompleted);
    }

    if (taskState.search) {
        tasks = tasks.filter(t =>
            t.title.toLowerCase().includes(taskState.search)
        );
    }

    return tasks;
}

function updateState(newTasks, message = null,type = "success"){
    taskState.tasks = newTasks;
    storage.set("tasks",newTasks);
    taskRender(getFilteredTasks());

    if(message){
        showToast(message, type);
    }
};


export function taskEvents(){
    const taskAdding = document.getElementById("taskAdding");
    const showTasks = document.getElementById("showTasks");
    const btnSearch = document.getElementById("btnSearch");
    const searchText = document.getElementById("searchText");
    const btnFilterAllTasks = document.getElementById("btnFilterAllTasks");
    const btnFilterActive = document.getElementById("btnFilterActive");
    const btnFilterCompleted = document.getElementById("btnFilterCompleted");

    const stored = storage.get("tasks") || [];
    taskState.tasks = stored;
    taskRender();

    // Add task
    taskAdding.addEventListener("submit",(e) => {
        e.preventDefault();

        const formData = new FormData(taskAdding);

        const task = {
            id: Date.now(),
            title:formData.get("title"),
            description:formData.get("description"),
            category:formData.get("category"),
            priority:formData.get("priority"),
            isEditing: false,
            isCompleted : false,
        };

        updateState([...taskState.tasks,task],"Task added successfully!");



        taskAdding.reset();
    });

    // Event Delegation

    showTasks.addEventListener("click",(e) => {
        const el = e.target;
        const parent = el.closest(".task");

        if(!parent) return;

        const id = Number(parent.dataset.id);

        // complete
        if(el.name === "btnCompleted"){
            const updated = taskState.tasks.map(t =>
                t.id === id ? {...t,isCompleted : !t.isCompleted} : t
            );

            updateState(updated,`${updated.find(t => t.id === id).isCompleted ? `Task Id: ${id} Marked as completed` : `Id: ${id} Marked as active`}`);
        };

        // Delete
        if(el.name === "btnDelete"){
            const updated = taskState.tasks.filter(t => t.id !== id );            
            updateState(updated,`Id: ${id} is deleted successfully!`,"error");
        };


        // Edit

        if(el.name === "btnEdit"){
            const task = taskState.tasks.find(t => t.id === id);

            // Save Mode
            if(task.isEditing){
                const titleEl = parent.querySelector(".edit-title");
                const title = titleEl ? titleEl.value : "";
                const descEl = parent.querySelector(".edit-desc");
                const desc = descEl ? descEl.value : "";

                const updated = taskState.tasks.map(t => 
                    t.id === id 
                    ? {...t, title,description : desc,isEditing : false} 
                    : t
                );

                updateState(updated,`id:${id} is successfully Updated`,"info");
            }

            // Enter Edit Mode
            else{
                const updated = taskState.tasks.map(t =>
                    t.id === id 
                    ? {...t,isEditing : true} : t
                );
                

                updateState(updated)
            };
        };
    });

    // Filter Logic

    // Search Filter
    btnSearch.addEventListener("click",(e)=>{
        taskState.search = searchText.value.trim().toLowerCase();
        taskRender(getFilteredTasks());  
        searchText.value = "";

        updateState(taskState.tasks,"Search applied!","info");
    });

    // All Tasks Filter
    btnFilterAllTasks.addEventListener("click",(e) => {
        taskState.filter = "all";
        taskRender(getFilteredTasks());
        updateState(taskState.tasks,"All tasks filter applied!","info");
    });

    // Active Tasks Filter
    btnFilterActive.addEventListener("click",(e) => {
        taskState.filter = "active";
        taskRender(getFilteredTasks());
        updateState(taskState.tasks,"Active tasks filter applied!","info"); 
    });

    // Completed Tasks Filter
    btnFilterCompleted.addEventListener("click",(e) => {
        taskState.filter = "completed";
        taskRender(getFilteredTasks());
        updateState(taskState.tasks,"Completed tasks filter applied!","info");
    });
};