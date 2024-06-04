import React, { createContext, useEffect, useState } from 'react'

export const CartContext = createContext();

export const CART_ITEMS_LS_KEY = 'cartItems';

export const updateCartLS = (newCartItems) => {
    localStorage.setItem(CART_ITEMS_LS_KEY, JSON.stringify(newCartItems));
};

const CartProvider = ({children}) => {
    const [cart, setCart] = useState([]);

    const [itemAmount, setItemAmount] = useState(0);

    const [total, setTotal] = useState(0);

    useEffect(()=>{
        const total = cart.reduce ((accumulator, currentItem) => {
            return accumulator + currentItem.price * currentItem.amount;
        }, 0);

        setTotal(total);
    }, [cart])

    useEffect(() => {
        if(cart) {
            const amount = cart.reduce((accumulator, currentItem) => {
                return accumulator + currentItem.amount;
            }, 0);
            setItemAmount(amount);
        }
    }, [cart]);


//dodavanje u korpu
    const addToCart = (product, id) => {
        const newItem = {...product, amount:1};
    //provera da li taj proizvod vec postoji u korpi
        const cartItem = cart.find((item) => {
            return item.id === id;
        });

    //ako je proizvod vec u korpi
        if(cartItem) {
            const newCart = [...cart].map((item) => {
                if(item.id === id) {
                    return {...item, amount: item.amount + 1};
                } else{
                    return item;
                }
            });
            updateCartLS(newCart);
            setCart(newCart);

        }else{
            setCart([...cart, newItem]);
        }
    };


//brisanje iz korpe
    const removeAllFromCartById = (id) => {
        const newCart = [...cart].filter((item) => {
            return item.id !== id;
        });
        setCart(newCart);
    };

//ciscenje korpe
    const removeAllFromCart = () => {
        setCart([]);
    };

//povecaj kolicinu
    const increaseAmount = (id) => {
        const cartItem = cart.find((item) => item.id === id);
        addToCart(cartItem, id);
    };   

//smanji kolicinu
    const decreaseAmount=(id) => {
        const cartItem = cart.find((item)=> {
            return item.id ===id;
        });
    if(cartItem) {
        const newCart = cart.map((item) => {
            if(item.id ===id){
                return{...item, amount: cartItem.amount - 1 };
            }else{
                return item;
            }
        });
        setCart(newCart);
    }

    if(cartItem.amount < 2) {
        removeAllFromCartById(id);
    }
        
    };

    const contextValue = {cart, addToCart, removeAllFromCart, removeAllFromCartById, increaseAmount, decreaseAmount, itemAmount, total}

    //ovo je drugi nacin da pozivas sve pojedinacno ili da sve stavis u const pa samo const pozoves
    // return (
    //     <CartContext.Provider value={{
    //         cart,
    //         addToCart,
    //         removeAllFromCartById,
    //         removeAllFromCart,
    //         increaseAmount,
    //         decreaseAmount,
    //         itemAmount,
    //         total,
    //     }} >
    //          {children}
    //     </CartContext.Provider>
    //     );

    return (
        <CartContext.Provider value={contextValue}>
            {children}
        </CartContext.Provider>
    );
    

};


    


export default CartProvider;