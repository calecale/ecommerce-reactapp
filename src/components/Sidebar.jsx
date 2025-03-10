import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { IoMdArrowForward } from 'react-icons/io';
import { FiTrash2 } from 'react-icons/fi';
import { SidebarContext } from '../context/SidebarContext';
import { CartContext } from '../context/CartContext';
import CartItem from './CartItem';

const Sidebar = () => {

  const {isOpen, handleClose} = useContext(SidebarContext);
  const {cart, removeAllFromCart, total, itemAmount} = useContext(CartContext);
  return (
    <div
      className={`${
        isOpen ? 'right-0' : '-right-full'
      }  w-full bg-white fixed top-0 shadow-2xl md:w-[35vw] xl:max-w-[30vw] transition-all duration-300 z-20 px-4 lg:px-[35px] flex flex-col h-[100dvh] justify-between`}
    >
      <div>
        <div className="flex items-center justify-between py-6 border-b">
        <div className="uppercase text-sm font-semibold">Shopping Bag ({itemAmount})</div>
          <div onClick={handleClose} className="cursor-pointer w-8 h-8 flex justify-center items-center">
            <IoMdArrowForward className="text-2xl" />
          </div>
        </div>
        <div className="flex flex-col gap-y-2 overflow-y-auto overflow-x-hidden border-b max-h-[70dvh]">
          {cart.map((item, index) => {
            return <CartItem item={item} key={item.id + index} />; 
          })}
        </div>
      </div>
      <div className="flex flex-col gap-y-3 py-4 mt-4">
        <div className="flex w-full justify-between items-center">
          <div className="uppercase font-semibold">
            <span className="mr-2">Total:</span>$ {parseFloat(total).toFixed(2)}
          </div>
          <div onClick={removeAllFromCart} className="cursor-pointer py-4 bg-red-500 text-white w-12 h-12 flex justify-center items-center text-xl">
            <FiTrash2 />
          </div>
        </div>
        <Link
          to="/"
          className="bg-gray-200 flex p-4 justify-center items-center text-primary w-full font-medium"
        >
          View cart
        </Link>
        <Link
          to="/"
          className="bg-primary flex p-4 justify-center items-center text-white w-full font-medium"
        >
          Checkout
        </Link>
      </div>
    </div>
  );
};

export default Sidebar;
