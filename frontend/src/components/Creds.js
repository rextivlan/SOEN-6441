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

const Creds = ({ register }) => {
  const [user, setUser] = useState({
    email: "",
    password: "",
    userName: "",
  });

  const handleChange = (e) => {
    setUser((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const sendRegister = (e) => {
    // e.preventDefault();
    // axios
    //   .post("/api/users/register", user)
    //   .then((res) => {
    //     console.log(res);
    //   })
    //   .catch((err) => {
    //     console.log(err);
    //   });
  };

  const sendLogin = (e) => {
    // e.preventDefault();
    // axios
    //   .post("/api/users/login", user)
    //   .then((res) => {
    //     console.log(res);
    //   })
    //   .catch((err) => {
    //     console.log(err);
    //   });
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
                name="userName"
                backgroundColor="white"
                value={user.userName}
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
