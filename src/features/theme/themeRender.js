import themeState from "./themeState";

const body = document.body;
const themeIcon = document.getElementById("themeIcon");
const logoText = document.getElementById("logoText");
const showTasks = document.getElementById("showTasks");
const taskAdding = document.getElementById("title");
const descritpion = document.getElementById("descritpion");


export default function themeRender(){
    body.classList.toggle("darkTheme",themeState.darkMode);
    body.classList.toggle("lightTheme",!themeState.darkMode);
    themeIcon.classList.toggle("ri-moon-fill",themeState.darkMode);
    themeIcon.classList.toggle("ri-sun-line",!themeState.darkMode);
}

(function(){
    themeRender();
}());
