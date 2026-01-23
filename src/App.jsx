import { Route, Routes } from "react-router-dom";
import MainLayout from "./Layout/Mainlayout";
import AuthLayout from "./Layout/Authlayout";
import Home from "./Pages/Home/Home";
import About from "./Pages/About/About";
import Services from "./Pages/Services/Services";
import Cart from "./Pages/Cart/Cart";
import PlaceOrder from "./Pages/PlaceOrder/PlaceOrder";
import Verify from "./Pages/Verify/Verify";
import MyOrders from "./Pages/MyOrders/MyOrders";
import Payment from "./Pages/Payment/Payment";

function App() {
  return (
    <Routes>
      {/* With Navbar  */}
      <Route element={<MainLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/services" element={<Services />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/order" element={<PlaceOrder />} />
        <Route path="/payment" element={<Payment />} />
        <Route path="/verify" element={<Verify />} />
        <Route path="/myorders" element={<MyOrders />} />
      </Route>

      {/* Without Navbar  */}
      <Route element={<AuthLayout />}></Route>
    </Routes>
  );
}

export default App;
