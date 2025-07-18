import React from "react";
import BenefitsSection from "./components/BenefitsSection";
import LoginSection from "./components/LoginSection";

type Props = {};

const LoginPage = (props: Props) => {
  return (
    <div className="min-h-screen flex flex-col lg:flex-row">
      <BenefitsSection />
        <LoginSection />
    </div>
  );
};

export default LoginPage;
