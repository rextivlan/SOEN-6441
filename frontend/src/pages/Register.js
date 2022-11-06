import React from "react";
import Creds from "../components/Creds";
import NavBar from "../components/NavBar";
const Register = () => {
  return (
    <>
      <NavBar user={false} />
      <Creds register={true} />
    </>
  );
};

export default Register;
