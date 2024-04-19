import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import {
  ABOUT_PAGE,
  CART_PAGE,
  CART_ITEMS_PAGE,
  COLLECTIONS_PAGE,
  CONTACT_PAGE,
  BILLING_ADDRESS_PAGE,
  HOME_PAGE,
  LOCKED_CLOTH_PAGE,
  LOGIN_PAGE,
  NOT_FOUND_404,
  REGISTER_PAGE,
  USER_ACCOUNT_PAGE,
  USER_ACCOUNT_DETAILS_PAGE,
  ORDER_STATUS_PAGE,
  ORDER_LIST_PAGE,
  ORDER_ADDRESS,
  SETTINGS_PAGE,
} from "../../../helpers/route-paths/paths";
import Header from "../../common/header/Header";
import Footer from "../../common/footer/Footer";
import Home from "../../pages/default-pages/home/Home";
import About from "../../pages/default-pages/about/About";
import ContactUs from "../../pages/default-pages/contact-us/ContactUs";
import NotFound404 from "../../pages/error-pages/404NotFound";
import Login from "../../pages/auth-pages/login/Login";
import DialogModal from "../../plugins/dialog-modal/DialogModal";
import SigninHeader from "../../common/header/layouts/SigninHeader";
import Register from "../../pages/auth-pages/register/Register";
import Collections from "../../pages/default-pages/collections/Collections";
import LockedCloth from "../../pages/default-pages/locked-cloth/LockedCloth";
import CartItems from "../../pages/protected-pages/cart/layouts/CartItems";
import BillingAddress from "../../pages/protected-pages/cart/layouts/BillingAddress";
import Cart from "../../pages/protected-pages/cart/Cart";
import { useSelector } from "react-redux";
import Profile from "../../pages/protected-pages/profile/Profile";
import ProfileInputs from "../../pages/protected-pages/profile/layouts/ProfileInputs";
import ProtectedRoute from "../protected-routes/ProtectedRoute";
import Order from "../../pages/protected-pages/order/Order";
import OrderList from "../../pages/protected-pages/profile/layouts/OrderList";
import TestCartPage from "../../pages/protected-pages/cart/layouts/NestedCartPage_T";
import OrderAddress from "../../pages/protected-pages/profile/layouts/OrderAddress";
import ProfileSettings from "../../pages/protected-pages/profile/layouts/ProfileSettings";

const Pages = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isAuthenticatedVal, setIsAuthenticated] = useState(false);
  const { isAuthenticated } = useSelector((state) => state.authState);
  const closeModal = () => {
    setIsModalOpen(false);
  };
  console.log("isAuthenticated: ", isAuthenticated);
  useEffect(() => {
    if (isAuthenticated) {
      setTimeout(() => {
        setIsAuthenticated(true);
      }, 3000);
    } else {
      setIsAuthenticated(false);
    }
  }, [isAuthenticated]);
  return (
    <Router>
      {isAuthenticatedVal ? "" : <SigninHeader />}
      <Header />
      <Routes>
        {/* Default Pages */}
        <Route path={HOME_PAGE} element={<Home />} />
        <Route path={ABOUT_PAGE} element={<About />} />
        <Route path={CONTACT_PAGE} element={<ContactUs />} />
        <Route path={COLLECTIONS_PAGE} element={<Collections />} />
        <Route path={LOCKED_CLOTH_PAGE} element={<LockedCloth />} />

        {/* Protected Pages */}
        <Route path={CART_PAGE} element={<Cart />}>
          {/* <Route path={CART_ITEMS_PAGE} element={<CartItems />} /> */}
          <Route path={CART_ITEMS_PAGE} element={<TestCartPage />} />
          <Route
            path={BILLING_ADDRESS_PAGE}
            element={
              // <ProtectedRoute>
                <BillingAddress />
              // </ProtectedRoute>
            }
          />
        </Route>
        <Route
            path={ORDER_STATUS_PAGE}
            element={
              // <ProtectedRoute>
                <Order />
              // </ProtectedRoute>
            }
          />
        <Route
          path={USER_ACCOUNT_PAGE}
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          }
        >
          <Route
            path={USER_ACCOUNT_DETAILS_PAGE}
            element={
              <ProtectedRoute>
                <ProfileInputs />
              </ProtectedRoute>
            }
          />
          <Route
            path={ORDER_LIST_PAGE}
            element={
              <ProtectedRoute>
                <OrderList />
              </ProtectedRoute>
            }
          />
          <Route
            path={ORDER_ADDRESS}
            element={
              <ProtectedRoute>
                <OrderAddress />
              </ProtectedRoute>
            }
          />
        </Route>
          

        {/* Auth Pages */}
        <Route path={LOGIN_PAGE} element={<Login />} />
        <Route path={REGISTER_PAGE} element={<Register />} />

        {/* Error Pages */}
        <Route path={NOT_FOUND_404} element={<NotFound404 />} />
      </Routes>
      <Footer />
      <DialogModal isOpen={isModalOpen} onClose={closeModal} />
    </Router>
  );
};

export default Pages;
