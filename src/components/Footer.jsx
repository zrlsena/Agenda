import React from "react";

function Footer() {
  const currentYear = new Date().getFullYear();
  return (
    <footer>
      <p>Sena ⓒ {currentYear}</p>
    </footer>
  );
}

export default Footer;