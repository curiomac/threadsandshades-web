export const getDocWidth = () => {
  return {
    width: window.innerWidth,
  };
};

window.addEventListener("resize", getDocWidth);
