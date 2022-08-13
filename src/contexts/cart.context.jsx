import { createContext, useState } from "react";


//as the default value you want to access
export const CartContext = createContext({
    products: [],
})

//set alias 
//Any components inside the tree can get the value
export const CartProvider = ({children})=>{
    const [cart, setCart] = useState(null);
    const value = {cart, setCart};

    return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}