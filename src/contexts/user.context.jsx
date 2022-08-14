import { createContext, useState } from "react";

//as the default value you want to access
export const UserContext = createContext({
    currentUser: null,
    setCurrentUser : ()=>null
})

//set alias 
//Any components inside the tree can get the value
export const UserProvider = ({children})=>{
    const [currentUser, setCurrentUser] = useState(null);
    const value = {currentUser, setCurrentUser};

    return <UserContext.Provider value={value}>{children}</UserContext.Provider>
}