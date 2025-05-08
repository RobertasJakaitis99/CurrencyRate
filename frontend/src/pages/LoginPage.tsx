// src/pages/LoginPage.tsx

import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import LoginForm from "../features/Auth/LoginForm";

const LoginPage: React.FC = () => {
  return (
    <>
      <Navbar />
      <LoginForm />
      <Footer />
    </>
  );
};

export default LoginPage;
