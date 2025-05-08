// src/pages/ConverterPage.tsx

import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import ConverterForm from "../features/Converter/ConverterForm";

const ConverterPage: React.FC = () => {
  return (
    <>
      <Navbar />
      <ConverterForm />
      <Footer />
    </>
  );
};

export default ConverterPage;
