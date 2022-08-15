import { createContext, useState, useEffect } from "react";

import {
  addCollectionAndDocuments,
  getCollectionAndDocuments,
} from "../untils/firebase/firebase.utils.jsx";

//as the default value you want to access
export const CategoriesContext = createContext({
  categoriesMap: {},
});

//set alias
//Any components inside the tree can get the value
export const CategoriesProvider = ({ children }) => {
  const [categoriesMap, setCategories] = useState([]);

  //download initial Categories data
  useEffect(()=>{
    const getCategoriesMap = async () =>  {
      const newCategories = await getCollectionAndDocuments("categories");
      setCategories(newCategories);
    };
    
    getCategoriesMap();
  },[]);

  const value = { categoriesMap };

  return (
    <CategoriesContext.Provider value={value}>
      {children}
    </CategoriesContext.Provider>
  );
};
