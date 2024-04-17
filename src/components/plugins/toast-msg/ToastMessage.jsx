import React from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ToastMessage = ({ message, status, hideProgressBar }) => {
  const toastOptions = {
    position: "top-right",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "light",
    type: status,
  };

  const existingToast = toast.isActive(message);

  if (existingToast) {
    toast.update(existingToast, toastOptions);
  } else {
    toast(message, {
      ...toastOptions,
      toastId: message,
    });
  }

  return (
    <ToastContainer
      theme={"light"}
      hideProgressBar={hideProgressBar ? true : false}
    />
  );
};

export default ToastMessage;
