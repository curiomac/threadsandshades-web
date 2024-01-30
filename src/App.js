import React, { useEffect } from "react";
import Pages from "./components/routes/route-pages/Pages";
import "./styles/css/App.css";
import "./styles/css/common.css";
import "./styles/css/style.css";
import "./styles/scss/error.scss";
import "./styles/scss/Home.scss";
import "./styles/scss/Collections.scss";
import "./styles/scss/LockedCloth.scss";
import "./styles/scss/Auth.scss";
import "./styles/scss/plugins.scss";
import "./styles/scss/Header.scss";
import "./styles/scss/SiteSettings.scss";
import "./styles/scss/Cart.scss";
import "./styles/scss/WishList.scss";
import "./styles/scss/Footer.scss";
import "react-toastify/dist/ReactToastify.css";
import "aos/dist/aos.css";
import { useDispatch, useSelector } from "react-redux";
import { getTheme } from "./redux/actions/themeAction";
import logo from "./assets/imgs/store-room/logo-loader.png";

function App() {
  const dispatch = useDispatch();
  const { theme, loading: themeLoading } = useSelector(
    (state) => state.themeState
  );
  const theme_req = theme?._id;

  const getThemeId = () => {
    if (!localStorage.getItem("theme-id")) {
      localStorage.setItem("theme-id", process.env.REACT_APP_DEFAULT_THEME_ID);
    }
  };

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

  // useEffect(() => {
  //   store.dispatch(loadUser());
  // }, [])

  return (
    <div>
      {themeLoading ? (
      <div className="logo-loading-container">
      <div>
        <div className="spinner"></div>
        <div className="logo-img d-flex align-items-center justify-content-center">
          <img src={logo} height={50} width={50} />
        </div>
      </div>
    </div>
      ) : (
        <Pages />
      )}
    </div>
  );
}

export default App;
