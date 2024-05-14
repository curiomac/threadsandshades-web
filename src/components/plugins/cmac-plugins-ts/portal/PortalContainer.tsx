import ReactDOM from "react-dom";

const PortalContainer = ({ children }: any) => {
  return ReactDOM.createPortal(children, document.body);
};

export default PortalContainer;