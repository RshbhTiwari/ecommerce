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
import { useEffect } from "react";
import ResetPasswordPage from "./pages/resetpasswordpage";

function App() {
  const dispatch = useDispatch();
  const cart_id = localStorage?.getItem('cart_id') || null;
  const customer_id = JSON?.parse(localStorage?.getItem('user'))?.id || null;
  const token = localStorage?.getItem('accessToken') || null;

  const { allCartItems, loading, error } = useSelector(
    (state) => state.addToCart
  );

  const cartData = allCartItems?.items || [];
  const itemCount = cartData.length;

  console.log("allCartItems",allCartItems)

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
  }, [itemCount, allCartItems]);


  return (
    <>
      <BrowserRouter>
        <Navbar cartData={cartData} itemCount={itemCount}/>
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
          <Route path="/reset-password" element={<ResetPasswordPage />} />
          <Route path="/my-account" element={<UserAccount />} />
          <Route path="/my-account/update-profile" element={<Updateaccount />} />
          <Route path="/my-account/address-book" element={<Addressbook />} />
          <Route path="/my-account/add-address" element={<AddAddressBook />} />
          <Route path="/my-account/edit-address/:id" element={<EditAddressBook />} />
          <Route path="/cart" element={<Cart cartData={cartData} itemCount={itemCount} allCartItems={allCartItems}/>} />
          <Route path="/checkout" element={<Checkout cartData={cartData} itemCount={itemCount} allCartItems={allCartItems}/>} />
          <Route path="/my-account/wishlist" element={<Wishlist />} />
          <Route path="/my-account/orders" element={<Orders />} />
          <Route path="/my-account/orders/:id" element={<OrdersDetails />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </>
  );
}

export default App;