// src/pages/RegisterPage.tsx

import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import RegisterForm from "../features/Auth/RegisterForm";

const RegisterPage: React.FC = () => {
  return (
    <>
      <Navbar />
      <RegisterForm />
      <Footer />
    </>
  );
};

export default RegisterPage;
