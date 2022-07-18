import { useEffect, useState } from "react";
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import axios from "axios";

import store from "./store";
import { loadUser } from "./redux/actions/userAction";
import { useSelector } from "react-redux";

//components
import Navigation from "./layouts/navigation/Navigation";
import Header from "./layouts/header/Header";
// import ProductCard from './layouts/deals/ProductCard';
import UserOptions from "./layouts/header/UserOptions";

import Search from "./components/search/Search";
import Products from "./components/card/Products";
import Home from "./components/home/Home";
import ProductDetails from "./components/productDetails/ProductDetails";

import LoginSignUp from "./components/user/LoginSignup";
import Profile from "./components/user/Profile";
import ProfileEdit from "./components/user/ProfileEdit";
import UpdatePassword from "./components/user/UpdatePassword.jsx";
import ForgotPassword from "./components/user/ForgotPassword.jsx";
import ResetPassword from "./components/user/ResetPassword.jsx";

import Cart from "./components/Cart/Cart.jsx";
import Shipping from "./components/Cart/Shipping.jsx";
import ConfirmOrder from "./components/Cart/ConfirmOrder.jsx";
import Payment from "./components/Cart/Payment.jsx";
import Success from "./components/Cart/Success.jsx";
import MyOrders from "./components/Cart/MyOrders.jsx";

import ProtectedRoute from "./components/route/ProtectedRoute";

function App() {
  const { isAuthenticated, user } = useSelector((state) => state.user);
  const [stripeApiKey, setStripeApiKey] = useState("");
  const getStripeApiKey = async () => {
    const { data } = await axios.get(
      `${process.env.REACT_APP_API_URL}/api/v1/stripeapikey`,
      {
        withCredentials: true,
      }
    );
    setStripeApiKey(data.stripeApiKey);
  };
  console.log("user", user);
  console.log("isAuthenticated", isAuthenticated);
  useEffect(() => {
    store.dispatch(loadUser());
    getStripeApiKey();
  }, []);

  return (
    <Router>
      <Navigation />
      {isAuthenticated && <UserOptions user={user} />}
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route exact path="/products" element={<Products />} />
        <Route exact path="/products/:keyword" element={<Products />} />
        <Route exact path="/product/:id" element={<ProductDetails />} />
        <Route exact path="/search" element={<Search />} />
        <Route exact path="/login" element={<LoginSignUp />} />
        <Route element={<ProtectedRoute />}>
          <Route path="/account" element={<Profile />} />
          <Route path="/me/update" element={<ProfileEdit />} />
          <Route path="/password/update" element={<UpdatePassword />} />
          <Route path="/login/shipping" element={<Shipping />} />
          <Route path="/order/confirm" element={<ConfirmOrder />} />
          <Route path="/order/success" element={<Success />} />
          <Route path="/orders/me" element={<MyOrders />} />
          {stripeApiKey && (
            <Route
              path="/order/payment"
              element={<Payment stkey={stripeApiKey} />}
            />
          )}
        </Route>
        <Route path="/password/forgot" element={<ForgotPassword />} />
        <Route path="/password/reset/:token" element={<ResetPassword />} />
        <Route path="/cart" element={<Cart />} />
      </Routes>

      {/* <Header/>
      <Main/>
      <Deals/>
      <Footer/> */}
    </Router>
  );
}

export default App;
