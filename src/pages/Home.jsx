import React, { useContext } from 'react';
import Hero from '../components/Hero';
import Filters from '../components/Filters';
import Product from '../components/Product';
import { ProductContext } from '../context/ProductContext';


const Home = () => {

  const {products}=useContext(ProductContext);
 

  return (
    <div>
      <Hero />
      <Filters />
      <section className="py-16">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-[30px] max-w-sm mx-auto md:max-w-none md:mx-0">
            {products?.map((product)=> { 
              return <Product product={product} key={product.id}/>
            })}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
