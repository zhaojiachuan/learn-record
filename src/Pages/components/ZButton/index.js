import React from "react";
import { Button } from "antd";
const ZButton = ({ children, onClick, bcolor, color, bgColor, full, type,className,onDoubleClick }) => {
  let boxStyle;
  if (type === "create") {
    boxStyle = {
      border: `1px solid #4096ff`,
      width: "max-content",
      color: `#ffffff`,
      backgroundColor: `#4096ff`,
    };
  } else if (type === "edit") {
    boxStyle = {
      border: `1px solid #89d961`,
      width: "max-content",
      color: `#ffffff`,
      backgroundColor: `#89d961`,
    };
  } else if (type === "delete") {
    boxStyle = {
      border: `1px solid #ff7875`,
      width: "max-content",
      color: `#ffffff`,
      backgroundColor: `#ff7875`,
    };
  } else {
    boxStyle = {
      border: `1px solid ${bcolor}`,
      width: full ? "100%" : "max-content",
      color: `${color}`,
      backgroundColor: `${bgColor}`,
    };
  }
  return (
    <Button className={className} style={boxStyle} onClick={onClick} onDoubleClick={onDoubleClick}>
      {children}
    </Button>
  );
};

ZButton.defaultProps = {
  bcolor: "gray",
  disabled: false,
  icon: true,
  color: "#000000",
  bgColor: "#ffffff",
  full: false,
};

export default ZButton;
