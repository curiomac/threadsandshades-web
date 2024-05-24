import React, { useEffect, useState } from "react";
import "../styles/cmac.plugins.styles.alpha.dragon.scss";
import DomRender from "../dom-render/DomRender";

const JumpToaster = ({
  open,
  onClose,
  duration,
  theme,
  toastPosition,
  renderMessage,
}) => {
  const [showContent, setShowContent] = useState(false);
  const [animContent, setAnimContent] = useState(false);
  const getFlexPosition = () => {
    switch (toastPosition) {
      case "top-left": {
        return { justifyContent: "flex-start", top: 0 };
      }
      case "top-right": {
        return { justifyContent: "flex-end", top: 0 };
      }
      case "top-center": {
        return { justifyContent: "center", top: 0 };
      }
      case "bottom-left": {
        return { justifyContent: "flex-start", bottom: 0 };
      }
      case "bottom-right": {
        return { justifyContent: "flex-end", bottom: 0 };
      }
      case "bottom-center": {
        return { justifyContent: "center", bottom: 0 };
      }
      default: {
        return { justifyContent: "flex-end", top: 0 };
      }
    }
  };
  const getToastStyles = () => {
    let theme_styles = {};
    let position_styles = {};
    switch (theme) {
      case "dark": {
        theme_styles = {
          backgroundColor: "#000",
          color: "#fff",
          boxShadow: "0 0 20px 1px #6a6a6a",
        };
        break;
      }
      case "light": {
        theme_styles = {
          backgroundColor: "#fff",
          color: "#000",
          boxShadow: "0 0 20px 1px #00000026",
        };
        break;
      }
      default: {
        theme_styles = {
          backgroundColor: "#fff",
          color: "#000",
          boxShadow: "0 0 20px 1px #00000026",
        };
        break;
      }
    }
    switch (toastPosition) {
      case "top-left": {
        if (animContent) {
          position_styles = {
            left: "0px",
          };
        } else {
          position_styles = {
            left: "-1000px",
          };
        }
        break;
      }
      default: {
        if (animContent) {
          position_styles = {
            right: "0px",
          };
        } else {
          position_styles = {
            right: "-1000px",
          };
        }
        break;
      }
    }
    return { ...theme_styles, ...position_styles };
  };
  useEffect(() => {
    if (open) {
      setTimeout(() => {
        setShowContent(true);
        setTimeout(() => {
          setAnimContent(true);
        }, 500);
      }, 500);
    } else {
      setAnimContent(false);
      setTimeout(() => {
        setShowContent(false);
        onClose && onClose();
      }, 500);
    }
  }, [open]);
  useEffect(() => {
    setTimeout(
      () => {
        setAnimContent(false);
        setTimeout(() => {
          setShowContent(false);
          onClose && onClose();
        }, 500);
      },
      duration ? duration : 5000
    );
  }, [duration, open]);
  if (!showContent) {
    return;
  }
  return (
    <DomRender>
      <div className="toast-container" style={getFlexPosition()}>
        <div className="toast" style={getToastStyles()}>
          <div className="message">{renderMessage()}</div>
        </div>
      </div>
    </DomRender>
  );
};

export default JumpToaster;
