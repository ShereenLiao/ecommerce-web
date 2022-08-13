import { createContext, useState } from "react";


//as the default value you want to access
export const CartContext = createContext({
    isCartOpen: false,
    setIsCartOpen : ()=>{},
})

//set alias 
//Any components inside the tree can get the value
export const CartProvider = ({children})=>{
    const [isCartOpen, setIsCartOpen] = useState(null);
    const value = {isCartOpen, setIsCartOpen};

    return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}