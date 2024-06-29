import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Navbar } from "./pages/components/basic/navbar";
import { Footer } from "./pages/components/basic/footer";
import Login from "./pages/login";
import Signup from "./pages/signup";
import Forgotpassword from "./pages/forgotpassword";


function App() {
  return (
    <>
      <Navbar />
      <BrowserRouter>
        <Routes>
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/forgotpassword" element={<Forgotpassword />} />


        </Routes>
      </BrowserRouter>
      <Footer />
    </>
  );
}

export default App;