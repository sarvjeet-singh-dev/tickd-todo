import themeRender from "./themeRender";
import themeState from "./themeState";
import storage from "../../utils/storage";

export default function themeEvents(){
    const themeBtn = document.getElementById("themeBtn");

    themeBtn.addEventListener("click",()=>{
        themeState.darkMode = !themeState.darkMode;
        storage.set("theme",themeState);
        themeRender();
    });
};


