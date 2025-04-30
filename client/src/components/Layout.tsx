import React from "react";
import Header from "./Header";

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground">
      {/* Header */}
      <Header />
      {/* Main Content */}
      <main className="flex-grow p-4">{children}</main>
    </div>
  );
};

export default Layout;