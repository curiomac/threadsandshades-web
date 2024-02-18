import React, { useState } from "react";

const CustomTooltip = ({ tip, children, width }) => {
  const [showTooltip, setShowTooltip] = useState(false);

  return (
    <div className="custom-tooltip-container">
      <span
        onMouseEnter={() => setShowTooltip(true)}
        onMouseLeave={() => setShowTooltip(false)}
      >
        {children}
      </span>
      {showTooltip && (
        <div className="pointer" onMouseEnter={() => setShowTooltip(true)}
        onMouseLeave={() => setShowTooltip(false)}>
          <div className="pointer-content" />
        </div>
      )}
      {showTooltip && <div className="tooltip" style={{width}} onMouseEnter={() => setShowTooltip(true)}
        onMouseLeave={() => setShowTooltip(false)}>{tip}</div>}
    </div>
  );
};

export default CustomTooltip;
