import React from "react";

const Footer: React.FC = () => {
  return (
    <footer className="footer bg-black text-white flex flex-col items-center justify-center">
      {/* Animated Bar */}
      <div className="animated-bar w-full h-2"></div>

      {/* Footer Content */}
      <div className="py-4 text-center">
        <p className="text-sm">&copy; 2025 Respawn. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;