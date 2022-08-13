import { createContext, useState } from "react";
import PRODUCTS from '../shop-data.json'

//as the default value you want to access
export const ProductContext = createContext({
    products: [],
})

//set alias 
//Any components inside the tree can get the value
export const ProductProvider = ({children})=>{
    const [products, setProducts] = useState(null);
    const value = {products,};

    return <ProductContext.Provider value={value}>{children}</ProductContext.Provider>
}