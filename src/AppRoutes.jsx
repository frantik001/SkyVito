/* eslint-disable react/prop-types */
import { Routes, Route } from "react-router-dom";
import MainScreen from "./pages/main/main";
import Login from "./pages/login/login";
import Registaration from "./pages/registration/registration";
import Profile from "./pages/profile/profile";
import Product from "./pages/product/product";
import Seller from "./pages/seller/seller";
import Addnewat from "./pages/modal/newADVT";
import Reviews from "./pages/modal/reviews";
import Settings from "./pages/modal/advsettings";
import ProtectedRoute from "./pages/ProtectedRoute/ProtectedRoute";

export const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<MainScreen />} />
      <Route path="/login" element={<Login />} />
      <Route path="/registaration" element={<Registaration />} />
      <Route path="/product/:id" element={<Product />} />
      <Route path="/seller/:id" element={<Seller />} />
      <Route path="/reviews/:id" element={<Reviews />} />
      <Route path="/reviews" element={<Reviews />} />
      <Route element={<ProtectedRoute />}>
        <Route path="/profile" element={<Profile />} />
        <Route path="/settings/:id" element={<Settings />} />
        <Route path="/product/:myadvt/:id" element={<Product />} />
        <Route path="/addnewat" element={<Addnewat />} />
      </Route>
    </Routes>
  );
};

export default AppRoutes;
