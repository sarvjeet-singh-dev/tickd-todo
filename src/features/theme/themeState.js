import storage from "../../utils/storage";

const themeState = storage.get("theme") || {darkMode : true,};

export default themeState;