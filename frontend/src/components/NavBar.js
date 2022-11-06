import React from "react";
import { Flex, Image, Box, Spacer, Button } from "@chakra-ui/react";
import logo from "../assets/play.jpg";
import { useNavigate, Link } from "react-router-dom";

const NavBar = ({ user }) => {
  const navigate = useNavigate();
  return (
    <>
      <Flex
        backgroundColor="rgba(0, 0, 0, 0.7)"
        borderBottom="1px"
        borderBottomColor="gray.300"
      >
        <Box>
          {/* add link after making home page based on user auth */}
          <Link to="/">
            <Image
              src={logo}
              h="3rem"
              w="3rem"
              ml="1vh"
              mt="1vh"
              mb="1vh"
              borderRadius="12px"
            />
          </Link>
        </Box>
        <Spacer />
        {user ? (
          <Box display="flex">
            <Button
              mt="1.5vh"
              mb="5px"
              mr="1rem"
              onClick={() => {
                localStorage.clear();
                navigate("/");
              }}
            >
              Logout
            </Button>
          </Box>
        ) : (
          <Box>
            <Button
              mt="1.5vh"
              mb="5px"
              mr="1rem"
              onClick={() => navigate("/register")}
            >
              Register
            </Button>
            <Button
              mt="1.5vh"
              mb="5px"
              mr="1rem"
              onClick={() => navigate("/login")}
            >
              Login
            </Button>
          </Box>
        )}
      </Flex>
    </>
  );
};

export default NavBar;
