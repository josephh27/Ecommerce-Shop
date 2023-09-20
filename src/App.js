import { BrowserRouter, Route, Routes } from "react-router-dom";

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
// Pages
import { Home, Contact, Login, Register, Reset, Admin } from "./pages";
// Components
import { Header, Footer, ProductDetails } from "./components";
import { AdminOnlyRoute } from "./components/adminOnlyRoute/AdminOnlyRoute";
import Cart from "./pages/cart/Cart";
import CheckoutDetails from "./pages/checkout/CheckoutDetails";
import Checkout from "./pages/checkout/Checkout";

function App() {
  return (
    <>
      <BrowserRouter>
        <ToastContainer />
        <Header />
          <Routes>
            <Route path="/" element={ <Home /> } />
            <Route path="/contact" element={ <Contact /> } />
            <Route path="/login" element={ <Login /> } />
            <Route path="/register" element={ <Register /> } />
            <Route path="/reset" element={ <Reset /> } />

            <Route path="/admin/*" 
            element={
              <AdminOnlyRoute>
                <Admin />
              </AdminOnlyRoute> } 
            />
            
            <Route path="/product-details/:id" element={ <ProductDetails /> } />
            <Route path="/cart" element={ <Cart /> } />
            <Route path="/checkout-details" element={ <CheckoutDetails /> } />
            <Route path="/checkout" element={ <Checkout /> } />
          </Routes>
        <Footer />
      </BrowserRouter>
    </>
  );
}

export default App;
