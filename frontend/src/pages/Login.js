import React from "react";
import Creds from "../components/Creds";
import NavBar from "../components/NavBar";

const Login = () => {
  return (
    <>
      <NavBar user={false} />
      <Creds register={false} />
    </>
  );
};

export default Login;
