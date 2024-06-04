import React, { createContext, useEffect, useState } from "react"



export const ProductContext = createContext({
    products: [],
    changeGenderFilter: () => null,
});

const ProductProvider = ({children}) => {
    const [fetchedProducts, setFetchedProducts] = useState([]);

    const [genderFilter, setGenderFilter] = useState ("women's clothing");

    const [products, setProducts] = useState([]);

    const changeGenderFilter = (genderFilter) => {
        setGenderFilter(genderFilter);
    }

    useEffect(() => {
    const fetchProducts = async () => {
        
            const response = await fetch('https://fakestoreapi.com/products');
            const data = await response.json();
            setFetchedProducts(data);
        
        };

fetchProducts();
}, []);

useEffect(() => {
    const filteredProducts = fetchedProducts.filter(
        (item) => item.category === genderFilter
    );
    setProducts(filteredProducts);
}, [fetchedProducts, genderFilter]);

const contextValue = {products, changeGenderFilter};

return (
<ProductContext.Provider value={contextValue}>
     {children}
</ProductContext.Provider>
);

};

export default ProductProvider;