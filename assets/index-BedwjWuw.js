(function(){let e=document.createElement(`link`).relList;if(e&&e.supports&&e.supports(`modulepreload`))return;for(let e of document.querySelectorAll(`link[rel="modulepreload"]`))n(e);new MutationObserver(e=>{for(let t of e)if(t.type===`childList`)for(let e of t.addedNodes)e.tagName===`LINK`&&e.rel===`modulepreload`&&n(e)}).observe(document,{childList:!0,subtree:!0});function t(e){let t={};return e.integrity&&(t.integrity=e.integrity),e.referrerPolicy&&(t.referrerPolicy=e.referrerPolicy),e.crossOrigin===`use-credentials`?t.credentials=`include`:e.crossOrigin===`anonymous`?t.credentials=`omit`:t.credentials=`same-origin`,t}function n(e){if(e.ep)return;e.ep=!0;let n=t(e);fetch(e.href,n)}})();var e={set:(e,t)=>{try{localStorage.setItem(e,JSON.stringify(t))}catch(e){console.error(`Error Saving To Local Storage`,e)}},get:(e,t=null)=>{try{let n=localStorage.getItem(e);return n?JSON.parse(n):t}catch(e){console.error(`Error Reading from local Storage`,e)}}};function t(e,t=`success`){let n=document.getElementById(`toast-container`),r={success:`bg-green-600`,error:`bg-red-600`,info:`bg-blue-600`},i=document.createElement(`div`);i.className=`
    ${r[t]} text-white px-6 py-3 rounded-lg shadow-lg 
    transform transition-all duration-300 translate-y-10 opacity-0
  `,i.innerText=e,n.appendChild(i),requestAnimationFrame(()=>{i.classList.remove(`translate-y-10`,`opacity-0`)}),setTimeout(()=>{i.classList.add(`opacity-0`,`translate-y-10`),setTimeout(()=>i.remove(),300)},3e3)}function n(e){let t=e.priority;if(t===`low`)return`bg-green-500 text-black`;if(t===`medium`)return`bg-orange-500 text-white`;if(t===`high`)return`bg-red-500 text-white text-white`}function r(e){return`
        <div class="${e.isCompleted?`opacity-50`:`opacity-100`} task w- p-6 rounded-2xl bg-white/10 backdrop-blur-md border shadow-4xl transition-all hover:bg-white/20 " data-id="${e.id}">
            <div class="flex justify-between items-center mb-4">
                <span class="px-2 py-1 text-xs font-medium bg-indigo-500/30  rounded-md border border-indigo-500/20">
                ${e.category}
                </span>
                <span class="px-2 py-1 text-xs font-medium ${n(e)} rounded-md border border-green-500/20"">${e.priority} </span>
            </div>
            
            <div >
                ${e.isEditing?`<input class="edit-title border w-full mb-1" value="${e.title}" />
                        <input class="edit-desc border w-full" value="${e.description}" />`:` <h3 class="edit-title text-xl font-semibold  mb-2">${e.title}</h3>
                    <p class="edit-desc text-sm leading-relaxed">
                        ${e.description}
                    </p>`}
            </div>
        
            <div class="mt-6 gap-2 ">
                <button id="btnEdit" name="btnEdit" class="px-4 py-2 bg-green-700 text-white hover:bg-white/20  text-sm rounded-lg border border-white/10 transition-colors cursor-pointer active:scale-95">
                    ${e.isEditing?`Save`:`Edit`}
                </button>
                <button id="btnCompleted" name="btnCompleted" class="px-4 py-2 w-22 bg-green-700 text-white hover:bg-green-700 text-sm rounded-lg border border-green-500/20 transition-colors cursor-pointer active:scale-95">
                    ${e.isCompleted?`Complete`:`Active`}
                </button>
                <button id="btnDelete" name="btnDelete" class="px-4 py-2 bg-red-500 hover:bg-red-300 text-white  text-sm rounded-lg border border-green-500/20 transition-colors cursor-pointer active:scale-95">
                    Delete
                </button>
            </div>
        </div>
        `}var i={tasks:[],filter:`all`,search:``},a=document.getElementById(`showTasks`);function o(e=i.tasks){if(!e||e.length===0){a.innerHTML=`<div class="text-center opacity-70">
                                    <p class="text-xl">No tasks yet</p>
                                    <p class="text-sm">Add your first task above</p>
                                </div>`;return}a.innerHTML=e.map(r).join(``)}function s(){let e=i.tasks;return i.filter===`active`&&(e=e.filter(e=>!e.isCompleted)),i.filter===`completed`&&(e=e.filter(e=>e.isCompleted)),i.search&&(e=e.filter(e=>e.title.toLowerCase().includes(i.search))),e}function c(n,r=null,a=`success`){i.tasks=n,e.set(`tasks`,n),o(s()),r&&t(r,a)}function l(){let t=document.getElementById(`taskAdding`),n=document.getElementById(`showTasks`),r=document.getElementById(`btnSearch`),a=document.getElementById(`searchText`),l=document.getElementById(`btnFilterAllTasks`),u=document.getElementById(`btnFilterActive`),d=document.getElementById(`btnFilterCompleted`);i.tasks=e.get(`tasks`)||[],o(),t.addEventListener(`submit`,e=>{e.preventDefault();let n=new FormData(t),r={id:Date.now(),title:n.get(`title`),description:n.get(`description`),category:n.get(`category`),priority:n.get(`priority`),isEditing:!1,isCompleted:!1};c([...i.tasks,r],`Task added successfully!`),t.reset()}),n.addEventListener(`click`,e=>{let t=e.target,n=t.closest(`.task`);if(!n)return;let r=Number(n.dataset.id);if(t.name===`btnCompleted`){let e=i.tasks.map(e=>e.id===r?{...e,isCompleted:!e.isCompleted}:e);c(e,`${e.find(e=>e.id===r).isCompleted?`Task Id: ${r} Marked as completed`:`Id: ${r} Marked as active`}`)}if(t.name===`btnDelete`&&c(i.tasks.filter(e=>e.id!==r),`Id: ${r} is deleted successfully!`,`error`),t.name===`btnEdit`)if(i.tasks.find(e=>e.id===r).isEditing){let e=n.querySelector(`.edit-title`),t=e?e.value:``,a=n.querySelector(`.edit-desc`),o=a?a.value:``;c(i.tasks.map(e=>e.id===r?{...e,title:t,description:o,isEditing:!1}:e),`id:${r} is successfully Updated`,`info`)}else c(i.tasks.map(e=>e.id===r?{...e,isEditing:!0}:e))}),r.addEventListener(`click`,e=>{i.search=a.value.trim().toLowerCase(),o(s()),a.value=``,c(i.tasks,`Search applied!`,`info`)}),l.addEventListener(`click`,e=>{i.filter=`all`,o(s()),c(i.tasks,`All tasks filter applied!`,`info`)}),u.addEventListener(`click`,e=>{i.filter=`active`,o(s()),c(i.tasks,`Active tasks filter applied!`,`info`)}),d.addEventListener(`click`,e=>{i.filter=`completed`,o(s()),c(i.tasks,`Completed tasks filter applied!`,`info`)})}var u=e.get(`theme`)||{darkMode:!0},d=document.body,f=document.getElementById(`themeIcon`);document.getElementById(`logoText`),document.getElementById(`showTasks`),document.getElementById(`title`),document.getElementById(`descritpion`);function p(){d.classList.toggle(`darkTheme`,u.darkMode),d.classList.toggle(`lightTheme`,!u.darkMode),f.classList.toggle(`ri-moon-fill`,u.darkMode),f.classList.toggle(`ri-sun-line`,!u.darkMode)}(function(){p()})();function m(){document.getElementById(`themeBtn`).addEventListener(`click`,()=>{u.darkMode=!u.darkMode,e.set(`theme`,u),p()})}m(),l();