import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Navbar } from "./pages/components/basic/navbar";
import { Footer } from "./pages/components/basic/footer";
import Login from "./pages/login";
import Signup from "./pages/signup";
import Forgotpassword from "./pages/forgotpassword";
import Home from "./pages";
import Contact from "./pages/contact";
import Shop from "./pages/shop";
import ShopDetails from "./pages/shopdetails";
import Blog from "./pages/blog";
import DetailsBlog from "./pages/detailsblog";
import Cart from "./pages/cart";
import Checkout from "./pages/checkout";
import Wishlist from "./pages/wishlist";
import Orders from "./pages/orders";
import OrdersDetails from "./pages/ordersdetails";
import UserAccount from "./pages/useraccount";
import Updateaccount from "./pages/updateaccount";
import Addressbook from "./pages/addressbook";
import AddAddressBook from "./pages/addaddressbook";
import EditAddressBook from "./pages/editaddressbook";
import DetailsCategories from "./pages/detailscategories";
import { ToastContainer } from 'react-toastify';
import SearchProduct from "./pages/searchProduct";
import { useDispatch, useSelector } from "react-redux";
import { getAllCartItems } from "./redux/slices/addToCart";
import { useEffect, useState } from "react";
import ResetPasswordPage from "./pages/resetpasswordpage";
import AOS from 'aos';
import 'aos/dist/aos.css';
import Thankyou from "./pages/thankyou";


AOS.init();

AOS.init({
  duration: 1000,
  easing: 'ease-in-out',
  once: true,
});

function App() {
  const dispatch = useDispatch();
  const cart_id = localStorage?.getItem('cart_id') || null;
  const customer_id = JSON?.parse(localStorage?.getItem('user'))?.id || null;
  const token = localStorage?.getItem('accessToken') || null;
  const [localCartItems, setLocalCartItems] = useState([]);
  const { allCartItems, isLoading: cartIsLoading, error: cartErorr } = useSelector(
    (state) => state.addToCart
  );

  const cartData = allCartItems?.items || [];
  const itemCount = cartData.length;

  useEffect(() => {
    if (allCartItems?.items) {
      setLocalCartItems(allCartItems?.items);
    }
  }, [allCartItems]);

  useEffect(() => { 
    if (token) {
      const payload = {
        status: true,
      };
      dispatch(getAllCartItems(customer_id, payload));
    } else {
      const payload = {
        status: false,
      };
      dispatch(getAllCartItems(cart_id, payload));
    }
  }, [dispatch, cart_id, customer_id, token]);

  useEffect(() => {
    console.log('Item count has changed:', itemCount);
  }, [itemCount, localCartItems]);
 
  return (
    <>
      <BrowserRouter>
        <Navbar cartData={localCartItems} itemCount={itemCount} />
        <ToastContainer />
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/shop" element={<Shop />} />
          <Route path="/shop/:id" element={<ShopDetails />} />
          <Route path="/blog" element={<Blog />} />
          <Route exact path="/blog/:id" element={<DetailsBlog />} />
          <Route exact path="/categories/:id" element={<DetailsCategories />} />
          <Route path="/search" element={<SearchProduct />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/forgotpassword" element={<Forgotpassword />} />
          <Route path="/reset-password/:token" element={<ResetPasswordPage />} />
          <Route path="/my-account" element={<UserAccount />} />
          <Route path="/my-account/update-profile" element={<Updateaccount />} />
          <Route path="/my-account/address-book" element={<Addressbook />} />
          <Route path="/my-account/add-address" element={<AddAddressBook />} />
          <Route path="/my-account/edit-address/:id" element={<EditAddressBook />} />
          <Route path="/cart" element={<Cart cartData={localCartItems} itemCount={itemCount} allCartItems={allCartItems}
            cartIsLoading={cartIsLoading} cartErorr={cartErorr} />} />
          <Route path="/checkout" element={<Checkout cartData={localCartItems} itemCount={itemCount} allCartItems={allCartItems} />} />
          <Route path="/my-account/wishlist" element={<Wishlist />} />
          <Route path="/my-account/orders" element={<Orders />} />
          <Route path="/my-account/orders/:id" element={<OrdersDetails />} />
          <Route path="/order-confirmation/:id" element={<Thankyou />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </>
  );
}

export default App;