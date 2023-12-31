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
import CheckoutStripe from "./pages/checkout/CheckoutStripe";
import CheckoutSuccess from "./pages/checkout/CheckoutSuccess";
import OrderHistory from "./pages/orderHistory/OrderHistory";
import OrderDetails from "./pages/orderDetails/OrderDetails";
import ReviewProducts from "./components/reviewProducts/ReviewProducts";
import NotFound from "./pages/notFound/NotFound";
import CheckoutSelection from "./pages/checkout/CheckoutSelection";
import CheckoutPaymongo from "./pages/checkout/CheckoutPaymongo";

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
            <Route path="/checkout-paymongo" element={ <CheckoutPaymongo /> } />
            <Route path="/checkout-stripe" element={ <CheckoutStripe /> } />
            <Route path="/checkout-success" element={ <CheckoutSuccess /> } />
            <Route path="/checkout-selection" element={ <CheckoutSelection /> } />
            <Route path="/order-history" element={ <OrderHistory /> } />
            <Route path="/order-details/:id" element={ <OrderDetails /> } />
            <Route path="/review-product/:id" element={ <ReviewProducts /> } />
            <Route path="*" element={ <NotFound /> } />
          </Routes>
        <Footer />
      </BrowserRouter>
    </>
  );
}

export default App;
