const storage = {
        set : (key,value) => {
            try{
                localStorage.setItem(key,JSON.stringify(value));
            }catch(error){
                console.error("Error Saving To Local Storage",error)
            }
        },
        get : (key,defaultValue = null) =>{
            try{
                const value = localStorage.getItem(key);
                return value ? JSON.parse(value) : defaultValue;
            }catch(error) {
                console.error("Error Reading from local Storage",error);
            }
        }
    };

export default storage;
