function colourChangeOnTaskPriority(task){
    const checkPriority = task.priority;

    if(checkPriority === "low"){
        return "bg-green-500 text-black"
    }

    if(checkPriority === "medium"){
        return "bg-orange-500 text-white"
    }

    if(checkPriority === "high"){
        return "bg-red-500 text-white text-white"
    }
};


export function taskCard(task){
    return `
        <div class="${task.isCompleted ? "opacity-50": "opacity-100"} task w- p-6 rounded-2xl bg-white/10 backdrop-blur-md border shadow-4xl transition-all hover:bg-white/20 " data-id="${task.id}">
            <div class="flex justify-between items-center mb-4">
                <span class="px-2 py-1 text-xs font-medium bg-indigo-500/30  rounded-md border border-indigo-500/20">
                ${task.category}
                </span>
                <span class="px-2 py-1 text-xs font-medium ${colourChangeOnTaskPriority(task)} rounded-md border border-green-500/20"">${task.priority} </span>
            </div>
            
            <div >
                ${
                    task.isEditing 
                    ? `<input class="edit-title border w-full mb-1" value="${task.title}" />
                        <input class="edit-desc border w-full" value="${task.description}" />`
                    : ` <h3 class="edit-title text-xl font-semibold  mb-2">${task.title}</h3>
                    <p class="edit-desc text-sm leading-relaxed">
                        ${task.description}
                    </p>`
                }
            </div>
        
            <div class="mt-6 gap-2 ">
                <button id="btnEdit" name="btnEdit" class="px-4 py-2 bg-green-700 text-white hover:bg-white/20  text-sm rounded-lg border border-white/10 transition-colors cursor-pointer active:scale-95">
                    ${task.isEditing ? "Save" : "Edit"}
                </button>
                <button id="btnCompleted" name="btnCompleted" class="px-4 py-2 w-22 bg-green-700 text-white hover:bg-green-700 text-sm rounded-lg border border-green-500/20 transition-colors cursor-pointer active:scale-95">
                    ${task.isCompleted ? "Complete":"Active"}
                </button>
                <button id="btnDelete" name="btnDelete" class="px-4 py-2 bg-red-500 hover:bg-red-300 text-white  text-sm rounded-lg border border-green-500/20 transition-colors cursor-pointer active:scale-95">
                    Delete
                </button>
            </div>
        </div>
        `
};