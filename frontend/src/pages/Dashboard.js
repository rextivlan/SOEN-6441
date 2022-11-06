import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import NavBar from "../components/NavBar";
import {
  Flex,
  Input,
  VStack,
  Button,
  Text,
  Box,
  FormLabel,
} from "@chakra-ui/react";

const Dashboard = ({ user }) => {
  const navigate = useNavigate();
  const [search, setSearch] = useState({
    link: "",
    name: "",
  });

  const handleChange = (e) => {
    setSearch((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };
  return (
    <>
      <NavBar user={true} />
      <Flex justify="center" p="10vh">
        <Flex
          justify="center"
          border="1px"
          borderColor="gray.200"
          borderRadius="6px"
          w="80vh"
          h="70vh"
        >
          <VStack spacing="20px" mt="12vh">
            <Flex w="80vh">
              <FormLabel ml="10vh">Track using playlists link</FormLabel>
            </Flex>
            <Input
              placeholder="https://www.youtube.com"
              type="text"
              w="60vh"
              name="link"
              value={search.link}
              onChange={handleChange}
            />
            <Text>Or</Text>
            <Flex w="80vh">
              <FormLabel ml="10vh">Track using channel name</FormLabel>
            </Flex>
            <Input
              type="text"
              placeholder="Enter a channel name"
              w="60vh"
              name="name"
              value={search.name}
              onChange={handleChange}
            />
            <Button backgroundColor="red" color="white">
              Submit
            </Button>
          </VStack>
        </Flex>
      </Flex>
    </>
  );
};

export default Dashboard;
