// src/pages/ProfilePage.tsx

import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import ProfileForm from "../features/Profile/ProfileForm";

const ProfilePage: React.FC = () => {
  return (
    <>
      <Navbar />
      <ProfileForm />
      <Footer />
    </>
  );
};

export default ProfilePage;
