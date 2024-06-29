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
import UserAccount from "./pages/useraccount";
import Updateaccount from "./pages/updateaccount";
import Addressbook from "./pages/addressbook";
import AddAddressBook from "./pages/addaddressbook";
import EditAddressBook from "./pages/editaddressbook";


function App() {
  return (
    <>
      <Navbar />
      <BrowserRouter>
        <Routes>

          <Route exact path="/" element={<Home />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/shop" element={<Shop />} />
          <Route path="/shop/:id" element={<ShopDetails />} />
          <Route path="/blog" element={<Blog />} />
          <Route exact path="/blog/:id" element={<DetailsBlog />} />

          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/forgotpassword" element={<Forgotpassword />} />
          <Route path="/my-account" element={<UserAccount />} />
          <Route path="/my-account/update-profile" element={<Updateaccount />} />
          <Route path="/my-account/address-book" element={<Addressbook />} />
          <Route path="/my-account/add-address" element={<AddAddressBook />} />
          <Route path="/my-account/edit-address/:id" element={<EditAddressBook />} />
        </Routes>
      </BrowserRouter>
      <Footer />
    </>
  );
}

export default App;