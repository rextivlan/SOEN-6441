import React, { useState } from "react";
import {
  Flex,
  HStack,
  Text,
  VStack,
  IconButton,
  Input,
  Button,
} from "@chakra-ui/react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Creds = ({ register }) => {
  const navigate = useNavigate();
  const [user, setUser] = useState({
    email: "",
    password: "",
    name: "",
  });

  const handleChange = (e) => {
    setUser((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const sendRegister = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:8080/users/register",
        user
      );
      console.log(response.data);
      if (response) {
        JSON.stringify(localStorage.setItem("user", response.data));
        navigate(`/login`);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const sendLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:8080/users/login",
        user
      );
      console.log(response.data.token);
      if (response) {
        JSON.stringify(localStorage.setItem("user", response.data.token));
        JSON.stringify(localStorage.setItem("userEmail", user.email));
        JSON.stringify(localStorage.setItem("userID", response.data.id));
        navigate(`/dashboard/${response.data.token}`);
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <Flex justify="center">
        <Flex
          w="50vh"
          h="50vh"
          justify="center"
          backgroundColor="azure"
          mt="15vh"
          pb="3vh"
        >
          <VStack spacing="4vh">
            <Flex justify="center">
              <Text as="b" fontSize="5vh" pt="1vh">
                {register ? "Register" : "Login"}
              </Text>
            </Flex>
            {register ? (
              <Input
                placeholder="Enter Username"
                type="text"
                name="name"
                backgroundColor="white"
                value={user.name}
                onChange={handleChange}
              />
            ) : null}
            <Input
              placeholder="Enter email"
              type="text"
              name="email"
              backgroundColor="white"
              value={user.email}
              onChange={handleChange}
            />
            <Input
              placeholder="Enter password"
              type="password"
              name="password"
              value={user.password}
              backgroundColor="white"
              onChange={handleChange}
            />
            <Button onClick={register ? sendRegister : sendLogin}>
              Submit
            </Button>
          </VStack>
        </Flex>
      </Flex>
    </>
  );
};

export default Creds;
