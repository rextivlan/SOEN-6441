import React from "react";
import { Flex, HStack, Text, VStack, Image } from "@chakra-ui/react";
import logo from "../assets/play.jpg";
import NavBar from "../components/NavBar";

const Landing = () => {
  return (
    <>
      <NavBar user={false} />
      <Flex justifyContent="center">
        <Flex w="80vh" h="80vh" justify="center" mt="20vh">
          <VStack spacing="2vh">
            <HStack>
              <Text as="b" fontSize="7vh">
                Welcome to YouTrack
              </Text>
              <Image src={logo} w="30vh" />
            </HStack>
            <Text fontSize="5vh">
              Use this application to track various YouTube videos!
            </Text>
          </VStack>
        </Flex>
      </Flex>
    </>
  );
};

export default Landing;
