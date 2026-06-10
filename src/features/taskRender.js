import { taskCard } from "../components/taskCard";
import taskState from "./taskState";

const showTasks = document.getElementById("showTasks");


export default function taskRender(tasks = taskState.tasks){
    if(!tasks || tasks.length === 0){
        showTasks.innerHTML = `<div class="text-center opacity-70">
                                    <p class="text-xl">No tasks yet</p>
                                    <p class="text-sm">Add your first task above</p>
                                </div>`;
        return;
    };

    showTasks.innerHTML = tasks.map(taskCard).join("");
};
