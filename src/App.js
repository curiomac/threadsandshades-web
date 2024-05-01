import React, { useEffect, useState } from "react";
import Pages from "./components/routes/route-pages/Pages";
import "./styles/css/App.css";
import "./styles/css/common.css";
import "./styles/css/style.css";
import "./styles/css/orderAddress.css";
import "./styles/scss/error.scss";
import "./styles/scss/overwriteClasses.scss";
import "./styles/scss/Home.scss";
import "./styles/scss/Collections.scss";
import "./styles/scss/LockedCloth.scss";
import "./styles/scss/Auth.scss";
import "./styles/scss/addons.scss";
import "./styles/scss/plugins.scss";
import "./styles/scss/utils.scss";
import "./styles/scss/Header.scss";
import "./styles/scss/SiteSettings.scss";
import "./styles/scss/Cart.scss";
import "./styles/scss/Order.scss";
import "./styles/scss/WishList.scss";
import "./styles/scss/Account.scss";
import "./styles/scss/Footer.scss";
import "./styles/scss/OpeningLoadingPage.scss";
import "aos/dist/aos.css";
import { useDispatch, useSelector } from "react-redux";
import { getTheme } from "./redux/actions/themeAction";
import OpeningLoadingPage from "./components/common/opening-loading-page/OpeningLoadingPage";

function App() {
  const dispatch = useDispatch();
  const [loadingPointA, setLoadingPointA] = useState(false);
  const [loadingPointB, setLoadingPointB] = useState(false);
  const { theme, loading: themeLoading } = useSelector(
    (state) => state.themeState
  );
  const { loading: authLoading } = useSelector((state) => state.authState);
  const theme_req = theme?._id;
  const getThemeId = () => {
    if (!localStorage.getItem("theme-id")) {
      localStorage.setItem("theme-id", process.env.REACT_APP_DEFAULT_THEME_ID);
    }
  };
  const documentDimensions = () => {
    const doc = document.documentElement;
    doc.style.setProperty("--doc-height", `${window.innerHeight}px`);
    doc.style.setProperty("--doc-width", `${window.innerWidth}px`);
  };
  
  window.addEventListener("resize", documentDimensions);
  documentDimensions();

  useEffect(() => {
    const handleDevTools = (e) => {
      if (e.ctrlKey && e.shiftKey && e.keyCode === 73) {
        alert('Developer tools are not allowed!');
      }
    };
    window.addEventListener('keydown', handleDevTools);
    return () => {
      window.removeEventListener('keydown', handleDevTools);
    };
  }, []);

  useEffect(() => {
    getThemeId();
  }, []);

  useEffect(() => {
    dispatch(getTheme());
    document.documentElement.style.setProperty(
      "--primary-color",
      theme?.primary_color
    );
    document.documentElement.style.setProperty(
      "--secondary-color",
      theme?.secondary_color
    );
    document.documentElement.style.setProperty(
      "--ternary-color",
      theme?.ternary_color
    );
    document.documentElement.style.setProperty(
      "--default-color",
      theme?.default_color
    );
    document.documentElement.style.setProperty(
      "--default-inner-color",
      theme?.default_inner_color
    );
  }, [theme_req]);

  useEffect(() => {
    if (themeLoading) {
      setTimeout(() => {
        setLoadingPointA(!loadingPointA);
      }, 1000);
      setTimeout(() => {
        setLoadingPointB(!loadingPointB);
      }, 500);
    }
  }, [themeLoading, loadingPointA, loadingPointB]);

  return (
    <div>
      {themeLoading || authLoading ? <OpeningLoadingPage /> : <Pages />}
    </div>
  );
}

export default App;
