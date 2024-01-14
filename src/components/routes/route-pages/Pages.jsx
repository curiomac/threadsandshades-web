import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import {
  ABOUT_PAGE,
  COLLECTIONS_PAGE,
  CONTACT_PAGE,
  HOME_PAGE,
  LOGIN_PAGE,
  NOT_FOUND_404,
  REGISTER_PAGE,
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

const Pages = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const closeModal = () => {
    setIsModalOpen(false);
  };
  // useEffect(() => {
  //   setTimeout(() => {
  //     setIsModalOpen(true);
  //   }, 3000);
  // }, []);
  return (
    <Router>
      <SigninHeader />
      <Header />
      <Routes>
        {/* Default Pages */}
        <Route path={HOME_PAGE} element={<Home />} />
        <Route path={ABOUT_PAGE} element={<About />} />
        <Route path={CONTACT_PAGE} element={<ContactUs />} />
        <Route path={COLLECTIONS_PAGE} element={<Collections />} />

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
