// src/pages/PasswordChangePage.tsx

import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import PasswordChangeForm from "../features/Profile/PasswordChangeForm";

const PasswordChangePage: React.FC = () => {
  return (
    <>
      <Navbar />
      <PasswordChangeForm />
      <Footer />
    </>
  );
};

export default PasswordChangePage;
