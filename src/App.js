import React, { useEffect, useState } from "react";
import Pages from "./components/routes/route-pages/Pages";
import "./styles/css/App.css";
import "./styles/css/common.css";
import "./styles/css/style.css";
import "./styles/scss/error.scss";
import "./styles/scss/overwriteClasses.scss";
import "./styles/scss/Home.scss";
import "./styles/scss/Collections.scss";
import "./styles/scss/LockedCloth.scss";
import "./styles/scss/Auth.scss";
import "./styles/scss/plugins.scss";
import "./styles/scss/Header.scss";
import "./styles/scss/SiteSettings.scss";
import "./styles/scss/Cart.scss";
import "./styles/scss/Order.scss";
import "./styles/scss/WishList.scss";
import "./styles/scss/Account.scss";
import "./styles/scss/Footer.scss";
import "./styles/scss/OpeningLoadingPage.scss";
import "react-toastify/dist/ReactToastify.css";
import "aos/dist/aos.css";
import { useDispatch, useSelector } from "react-redux";
import { getTheme } from "./redux/actions/themeAction";
import logo from "./assets/imgs/store-room/logo-loader.png";
import OpeningLoadingPage from "./components/common/opening-loading-page/OpeningLoadingPage";

function App() {
  const dispatch = useDispatch();
  const [loadingPointA, setLoadingPointA] = useState(false);
  const [loadingPointB, setLoadingPointB] = useState(false);
  const { theme, loading: themeLoading } = useSelector(
    (state) => state.themeState
  );
  const theme_req = theme?._id;
  const getThemeId = () => {
    if (!localStorage.getItem("theme-id")) {
      localStorage.setItem("theme-id", process.env.REACT_APP_DEFAULT_THEME_ID);
    }
  };
  const documentHeight = () => {
    const doc = document.documentElement
    doc.style.setProperty('--doc-height', `${window.innerHeight}px`)
   }
   window.addEventListener('resize', documentHeight)
   documentHeight()

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
      {themeLoading ? (
        <OpeningLoadingPage />
      ) : (
        <Pages />
      )}
    </div>
  );
}

export default App;
