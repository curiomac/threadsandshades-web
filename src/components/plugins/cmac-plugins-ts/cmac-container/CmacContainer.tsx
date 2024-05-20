import { MouseEventHandler, ReactNode, useEffect } from "react";
import "../cmac.plugins.epsilon.styles.css";
import { BlurProperties } from "../interfaces/types";
interface CommonProps {
  active?: boolean;
  blurStrength?: BlurProperties;
  portalUsage?: boolean;
  children?: ReactNode;
  onClickOutsider?: MouseEventHandler<HTMLDivElement>;
  onClickInsider?: MouseEventHandler<HTMLDivElement>;
}
const blurValues = [
  {
    id: 1,
    strength: "light",
    value: "3px",
  },
  {
    id: 1,
    strength: "strong",
    value: "6px",
  },
  {
    id: 1,
    strength: "stronger",
    value: "9px",
  },
  {
    id: 1,
    strength: "max",
    value: "11px",
  },
];
const CmacContainer = ({
  blurStrength,
  portalUsage,
  children,
  onClickOutsider,
  active,
}: CommonProps) => {
  console.log("blurStrength: ", active);

  const getBlurValue = () => {
    const doc = document.documentElement;
    if (blurStrength) {
      const blurValue = blurValues.find(
        (value) => value.strength === blurStrength
      );
      doc.style.setProperty("--blur-strength", `${blurValue?.value}`);
      return;
    } else {
      doc.style.setProperty("--blur-strength", `1px`);
      return;
    }
  };

  const getDocumentDimensions = () => {
    const doc = document.documentElement;
    doc.style.setProperty("--doc-height", `${window.innerHeight}px`);
    doc.style.setProperty("--doc-width", `${window.innerWidth}px`);
  };

  const updateRootClass = () => {
    const overlayElement = document.querySelector("._e5cb1322");
    let root = document.querySelector("#root");
    if (overlayElement && active) {
      root?.classList.add("_70ae9520");
    } else {
      root?.classList.remove("_70ae9520");
    }
  };

  window.addEventListener("resize", getDocumentDimensions);
  getDocumentDimensions();
  useEffect(() => {
    updateRootClass();
    getBlurValue();
  }, [portalUsage, active]);
  if (active)
    return (
      <div
        className={`_e69aca0a ${portalUsage && active ? "_e5cb1322" : "__"}`}
        onClick={onClickOutsider}
      >
        {children}
      </div>
    );
};

export default CmacContainer;
