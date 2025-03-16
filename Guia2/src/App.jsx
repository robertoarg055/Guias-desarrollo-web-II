import { useState, useEffect } from 'react';
import reactLogo from './assets/react.svg';
import viteLogo from '/vite.svg';
import './index.css';
import { Footer } from './components/Footer';
import { Header } from './components/Header';
import { db } from './data/db';
import { Guitar } from './components/Guitar';

function App() {
  function initialCart() {
    const localStorageCart = localStorage.getItem('cart');
    return localStorageCart ? JSON.parse(localStorageCart) : [];
  }
  const [data, setData] = useState(db);
  const [cart, setCart] = useState(initialCart);
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);
  function addToCart(guitar) {
    const itemIndex = cart.findIndex((item) => guitar.id === item.id);
    if (itemIndex === -1) {
      guitar.quantity = 1;
      setCart([...cart, guitar]);
    } else {
      const updatedGuitar = [...cart];
      updatedGuitar[itemIndex].quantity++;
      setCart(updatedGuitar);
    }
  }

  function calculateTotal() {
    return cart.reduce((total, item) => total + item.price * item.quantity, 0);
  }
// Funciones complementarias
  function increaseQuantity(guitar) {
    setCart(cart.map(item => 
      item.id === guitar.id ? { ...item, quantity: item.quantity + 1 } : item
    ));
  }
  
  function decreaseQuantity(guitar) {
    setCart(cart.map(item => 
      item.id === guitar.id ? { ...item, quantity: Math.max(item.quantity - 1, 1) } : item
    ));
  }
  
// Borar un produtco del carrito
  function removeFromCart(guitar) {
    const updatedCart = cart.filter((item) => item.id !== guitar.id);
    setCart(updatedCart);
  }
// Borrar todos los productos del carrito
  function clearCart() {
    setCart([]);
  }

  return (
    <>
      <Header 
        cart={cart} 
        total={calculateTotal()} 
        decreaseQuantity={decreaseQuantity} 
        increaseQuantity={increaseQuantity} 
        removeFromCart={removeFromCart}
        clearCart={clearCart} 
      />

      <main className="container-xl mt-5">
        <h2 className="text-center">Nuestra Colección</h2>

        <div className="row mt-5">
          {data.map((guitar) => (
            <Guitar guitar={guitar} key={guitar.id} addToCart={addToCart} />
          ))}
        </div>
      </main>

      <Footer />
    </>
  );
}

export default App;