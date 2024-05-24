import { CSSProperties, ReactNode, MouseEventHandler } from "react";
import PortalContainer from "./portal/PortalContainer";
import CmacContainer from "./cmac-container/CmacContainer";
import { BlurProperties } from "./interfaces/types";

interface CommonProps {
  portalUsage?: boolean;
  active?: boolean;
  onClickOutsider?: MouseEventHandler<HTMLDivElement>;
  onClickInsider?: MouseEventHandler<HTMLDivElement>;
  style?: CSSProperties;
  className?: string;
  id?: string;
  blurStrength?: BlurProperties;
  children?: ReactNode;
}

const CmacModal = (props: CommonProps) => {
  const {
    portalUsage,
    active,
    onClickOutsider,
    onClickInsider,
    style,
    className,
    id,
    blurStrength,
    children,
  } = props;
  // const getStyleProperties = () => {

  // }
  
  return (
    <PortalContainer>
      <CmacContainer active={active} portalUsage={portalUsage} blurStrength={blurStrength} 
          onClickOutsider={(e) => onClickOutsider && onClickOutsider(e)}>
        <div
          className={`${active ? "_8a797022" : "_a542512b"}`}
        >
          <div
            style={{ ...style }}
            className={`${className ? `${className} _dc6617f4` : "_dc6617f4"}`}
            id={id}
            onClick={(e) => onClickInsider && onClickInsider(e)}
          >
            {children}
          </div>
        </div>
      </CmacContainer>
    </PortalContainer>
  );
};

export default CmacModal;
