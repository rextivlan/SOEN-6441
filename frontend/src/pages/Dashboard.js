import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import NavBar from "../components/NavBar";
import "../App.css";
import {
  Flex,
  Input,
  VStack,
  Button,
  Text,
  Box,
  FormLabel,
} from "@chakra-ui/react";
import Axios from "axios";

function Dashboard() {
  const email = localStorage.getItem("userEmail");
  const emailConverted = String(email);
  const [videoid, setVideoID] = useState("");

  const [youtubeVideosList, setYouTubeVideosList] = useState([]);

  const addYouTubeVideo = () => {
    Axios.post("http://localhost:8080/youtubevideos/create", {
      videoid: videoid,
      email: email
    });
  };

  const getYouTubeVideos = (email) => {
    Axios.get(`http://localhost:8080/youtubevideos/youtubevideos/${emailConverted}`).then(
      (response) => {
        setYouTubeVideosList(response.data);
      }
    );
  };

  const deleteYouTubeVideo = (id) => {
    Axios.delete(`http://localhost:8080/youtubevideos/delete/${id}`).then(
      (response) => {
        setYouTubeVideosList(
          youtubeVideosList.filter((val) => {
            return val.id != id;
          })
        );
      }
    );
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
          h="40vh"
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
              onChange={(event) => {
                setVideoID(event.target.value);
              }}
            />
            <Button
              onClick={addYouTubeVideo}
              backgroundColor="red"
              color="white"
            >
              Add YouTube Video
            </Button>

            <Button
              onClick={getYouTubeVideos}
              backgroundColor="red"
              color="white"
            >
              Get Updated List
            </Button>
          </VStack>
        </Flex>
      </Flex>

      <div class="youtubevideolist">
        {youtubeVideosList.map((val, key) => {
          return (
            <div class="youtubevideo">
              <div>
                <h3>https://www.youtube.com/watch?v={val.videoid}</h3>
                <h3>Title: {val.title}</h3>
                <h3>Channel Title: {val.channelTitle}</h3>
                <h3>Language: {val.defaultAudioLanguage}</h3>
                <h3>Published at: {val.publishedAt.substring(0, 10)}</h3>
              </div>
              <div>
                <Button
                  onClick={() => {
                    deleteYouTubeVideo(val.id);
                  }}
                  backgroundColor="red"
                  color="white"
                >
                  Delete
                </Button>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
}

export default Dashboard;
