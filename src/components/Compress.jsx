import React from "react";
import "./Compress.css";
import ChatLogo from "/logo.svg";
import ChatLogoText from "/logo_no_text.svg";

const Compress = () => {
  return (
    <div className="compress_wrapper">
      <div className="logo_compress_wrapper">
        <div className="chat_logo_text"></div>
        <div className="compress_logo"></div>
      </div>
    </div>
  );
};

export default Compress;
