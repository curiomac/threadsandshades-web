import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import {
  ABOUT_PAGE,
  CONTACT_PAGE,
  HOME_PAGE,
  NOT_FOUND_404,
} from "../../../helpers/route-paths/paths";
import Header from "../../common/header/Header";
import Footer from "../../common/footer/Footer";
import Home from "../../pages/default-pages/home/Home";
import About from "../../pages/default-pages/about/About";
import ContactUs from "../../pages/default-pages/contact-us/ContactUs";
import NotFound404 from "../../pages/error-pages/404NotFound";

const Pages = () => {
  return (
    <Router>
      <Header />
      <Routes>
        {/* Default Pages */}
        <Route path={HOME_PAGE} element={<Home />} />
        <Route path={ABOUT_PAGE} element={<About />} />
        <Route path={CONTACT_PAGE} element={<ContactUs />} />
   
        {/* Error Pages */}
        <Route path={NOT_FOUND_404} element={<NotFound404 />} />
      </Routes>
      {/* <Footer /> */}
    </Router>
  );
};

export default Pages;
