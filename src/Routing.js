import { useState } from 'react';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import { Routes, Route } from 'react-router-dom';
import Signup from './pages/signup/Signup';
import Products from './pages/Products';
import Header from './components/Header';
import ProductDetails from './pages/ProductDetails';
import Cart from './pages/Cart';
import svg from './utilities/Svg';
import useTheme from './utilities/useTheme';
import Checkout from './pages/Checkout';
import Paymentsuccess from './pages/Paymentsuccess';

function Routing() {
  const [themeSelect] = useTheme()
  return (
    <>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/products" element={<Products />} />
        <Route path="/products/:id" element={<ProductDetails/>} />
        <Route path="/cart" element={<Cart/>} />
        <Route path="/checkout" element={<Checkout/>} />
        <Route path="/paymentsuccess" element={<Paymentsuccess/>} />
      </Routes>
      <div className='theme-toggle' onClick={themeSelect}>
        {svg.light}{svg.dark}
      </div>
    </>
  )
}

export default Routing