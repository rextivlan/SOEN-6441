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

  const userid = localStorage.getItem("userID");
  
  const [videoid, setVideoID] = useState("");

  const [youtubeVideosList, setYouTubeVideosList] = useState([]);

  const addYouTubeVideo = () => {
    Axios.post("http://localhost:8080/youtubevideos/add", {
      videoid: videoid,
      userid: userid
    });
  };

  const getYouTubeVideos = () => {
    Axios.get(`http://localhost:8080/youtubevideos/youtubevideos/${userid}`).then(
      (response) => {
        setYouTubeVideosList(response.data);
      }
    );
  };

  const deleteYouTubeVideo = (youtubevideoid) => {
    Axios.delete(`http://localhost:8080/youtubevideos/delete/${youtubevideoid}`).then(
      (response) => {
        setYouTubeVideosList(
          youtubeVideosList.filter((val) => {
            return val.youtube_video_id !== youtubevideoid;
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
              <FormLabel ml="10vh">Track using a YouTube video ID like 4yjRIcRc9qY</FormLabel>
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
                <h3>https://www.youtube.com/watch?v={val.video_id}</h3>
                <h3>Title: {val.title}</h3>
                <h3>Channel Title: {val.channel_title}</h3>
                <h3>Language: {val.default_audio_language}</h3>
                <h3>Published at: {val.published_at.substring(0, 10)}</h3>
              </div>
              <div>
                <Button
                  onClick={() => {
                    deleteYouTubeVideo(val.youtube_video_id);
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
