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
import { fetchAllCategories } from "./redux/slices/category";
import { getProducts } from "./redux/slices/product";
import { getWishlist } from "./redux/slices/wishlist";
import { getMyccount, getOneUser } from "./redux/slices/user";
import { getAddress } from "./redux/slices/address";


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

  const [cartAllItems, setCartAllItems] = useState([]);
  const [allCategoriesData, setAllCategoriesData] = useState([]);
  const [allProductsData, setAllProductsData] = useState([]);
  const [wishListitems, setWishItems] = useState(null);
  const [allAddressData, setAllAddressData] = useState([]);

  const { allAddress, isLoading: addressIsLoading, error: addressError } = useSelector(state => state.address);
  const { isLoading: userIsLoading, error: userError, myccountdata, oneuser } = useSelector((state) => state.user);
  const { wishlist, isLoading: wishlistIsLoading, error: wishlistError } = useSelector((state) => state.wishlist);
  const { isLoading: productIsLoading, error: productError, products } = useSelector((state) => state.product);
  const { isLoading: categoriesIsLoading, error: categoriesErorr, categories } = useSelector((state) => state.category);
  const { allCartItems, isLoading: cartIsLoading, error: cartErorr } = useSelector((state) => state.addToCart);
  const cartData = allCartItems?.items || [];
  const itemCount = cartData.length;




  useEffect(() => {
    dispatch(getAddress(customer_id));
  }, [dispatch, customer_id]);

  useEffect(() => {
    dispatch(getMyccount(customer_id));
  }, [dispatch, customer_id]);

  useEffect(() => {
    dispatch(getOneUser());
  }, [dispatch]);

  useEffect(() => {
    dispatch(getWishlist());
  }, [dispatch]);

  useEffect(() => {
    dispatch(getProducts());
  }, [dispatch]);

  useEffect(() => {
    dispatch(fetchAllCategories());
  }, [dispatch]);

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
    if (wishlist?.length) {
      setWishItems(wishlist);
    }
  }, [wishlist]);

  useEffect(() => {
    if (allAddress?.length) {
      setAllAddressData(allAddress);
    }
  }, [allAddress]);

  useEffect(() => {
    if (categories?.length) {
      setAllCategoriesData(categories);
    }
  }, [categories]);

  useEffect(() => {
    if (allCartItems?.items) {
      setCartAllItems(allCartItems?.items);
    }
  }, [allCartItems]);

  useEffect(() => {
    if (products?.length) {
      setAllProductsData(products);
    }
  }, [products]);

  useEffect(() => {
    console.log('Item count has changed:', itemCount);
  }, [itemCount, cartAllItems]);

  return (
    <>
      <BrowserRouter>
        <Navbar
          itemCount={itemCount}

          allProductsData={allProductsData}
          productIsLoading={productIsLoading}
          productError={productError}

          cartData={cartAllItems}
          cartIsLoading={cartIsLoading}
          cartErorr={cartErorr}

          wishlist={wishListitems}
          wishlistIsLoading={wishlistIsLoading}
          wishlistError={wishlistError}

          allCategoriesData={allCategoriesData}
          categoriesIsLoading={categoriesIsLoading}
          categoriesErorr={categoriesErorr}
        />
        <ToastContainer />

        <Routes>
          <Route exact path="/" element={<Home
            allProductsData={allProductsData}
            productIsLoading={productIsLoading}
            productError={productError}

            allCategoriesData={allCategoriesData}
            categoryIsLoading={categoriesIsLoading}
            categoryError={categoriesErorr}

            cartData={cartAllItems}
            cartIsLoading={cartIsLoading}
            cartErorr={cartErorr}

            wishlist={wishListitems}
            wishlistIsLoading={wishlistIsLoading}
            wishlistError={wishlistError}

          />} />
          <Route path="/contact" element={<Contact />} />

          <Route path="/shop" element={<Shop
            cartData={cartAllItems}
            cartIsLoading={cartIsLoading}
            cartErorr={cartErorr}

            wishlist={wishListitems}
            wishlistIsLoading={wishlistIsLoading}
            wishlistError={wishlistError}

            allProductsData={allProductsData}
            productIsLoading={productIsLoading}
            productError={productError}

            allCategoriesData={allCategoriesData}
            categoryIsLoading={categoriesIsLoading}
            categoryError={categoriesErorr} />}
          />
          <Route path="/shop/:id" element={<ShopDetails
            cartData={cartAllItems}
            cartIsLoading={cartIsLoading}
            cartErorr={cartErorr}

            wishlist={wishListitems}
            wishlistIsLoading={wishlistIsLoading}
            wishlistError={wishlistError}

            allProductsData={allProductsData}
            productIsLoading={productIsLoading}
            productError={productError}
          />} />
          <Route path="/blog" element={<Blog
            allCategoriesData={allCategoriesData}
            categoryIsLoading={categoriesIsLoading}
            categoryError={categoriesErorr} />} />
          <Route exact path="/blog/:id" element={<DetailsBlog allCategoriesData={allCategoriesData}
            categoryIsLoading={categoriesIsLoading}
            categoryError={categoriesErorr} />} />

          <Route exact path="/categories/:id" element={<DetailsCategories

            allProductsData={allProductsData}
            productIsLoading={productIsLoading}
            productError={productError}

            allCategoriesData={allCategoriesData}
            categoryIsLoading={categoriesIsLoading}
            categoryError={categoriesErorr}

            cartData={cartAllItems}

            wishlist={wishListitems}


          />} />

          <Route path="/search" element={<SearchProduct
            allProductsData={allProductsData}
            productIsLoading={productIsLoading}
            productError={productError}
            cartData={cartAllItems}
            cartIsLoading={cartIsLoading}
            cartErorr={cartErorr}
            wishlist={wishListitems}
            wishlistIsLoading={wishlistIsLoading}
            wishlistError={wishlistError}
          />} />

          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/forgotpassword" element={<Forgotpassword />} />
          <Route path="/reset-password/:token" element={<ResetPasswordPage />} />
          <Route path="/my-account" element={<UserAccount oneuser={oneuser} />} />
          <Route path="/my-account/update-profile" element={<Updateaccount oneuser={oneuser} />} />

          <Route path="/my-account/address-book" element={<Addressbook />} />
          <Route path="/my-account/add-address" element={<AddAddressBook />} />
          <Route path="/my-account/edit-address/:id" element={<EditAddressBook />} />

          <Route path="/cart" element={<Cart selectLength={allCartItems?.selectLength}
            cartData={cartAllItems} itemCount={itemCount} allCartItems={allCartItems}
            cartIsLoading={cartIsLoading} cartErorr={cartErorr} />} />
          <Route path="/checkout" element={<Checkout selectLength={allCartItems?.selectLength} cartData={cartAllItems} itemCount={itemCount} allCartItems={allCartItems} />} />

          <Route path="/my-account/wishlist" element={<Wishlist />} />
          <Route path="/my-account/orders" element={<Orders />} />
          <Route path="/my-account/orders/:id" element={<OrdersDetails />} />
          <Route path="/order-confirmation/:id" element={<Thankyou />} />
        </Routes>

        <Footer
          allCategoriesData={allCategoriesData}
          categoryIsLoading={categoriesIsLoading}
          categoryError={categoriesErorr}
        />
      </BrowserRouter>
    </>
  );
}

export default App;