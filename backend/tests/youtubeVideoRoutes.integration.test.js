const request = require("supertest");

jest.setTimeout(10000);

// An Instance of an express app
const app = require("../app");

// Describing Tests
describe("Integration test for the youtubeVideo API", () => {
  // Test Suite - 1 Get YouTube Videos by userID
  it("GET /youtubevideos/youtubevideos/:userid - success - get youtube videos by userID", async () => {
    const { body, statusCode } = await request(app).get(
      "/youtubevideos/youtubevideos/1"
    );

    expect(body[1].channel_title).toEqual("Tech Vision");
    expect(body[1].submitted_by).toEqual(1);

    expect(statusCode).toBe(200);
  });

  const payload = {
    videoid: "4h-UptFOtoc",
    title: "Most INSANE Military Technologies And Vehicles In The World",
    channelTitle: "BE AMAZED",
    defaultAudioLanguage: "en-GB",
    publishedAt: 2021 - 12 - 14,
    userid: 3,
  };
  // Test Suite - 2 Store YouTube Video in Database
  it("POST /youtubevideos/add - success - create youtube video", async () => {
    const { body } = await request(app)
      .post("/youtubevideos/add")
      .send(payload)
      .set("Content-Type", "application/json")
      .set("Accept", "application/json");

    expect(body.id).toEqual(8);
    expect(body.video_id).toEqual("4h-UptFOtoc");
    expect(body.channel_title).toEqual("BE AMAZED");
    expect(body.submitted_by).toEqual(3);
  });

  // Test Suite - 3 Delete YouTube Video by videoID
  it("DELETE /youtubevideos/delete/:youtubevideoid - success - delete youtube video", async () => {
    const { body, statusCode } = await request(app).delete(
      "/youtubevideos/delete/6"
    );

    expect(body.message).toEqual("YouTube video was deleted successfully!");
    expect(statusCode).toBe(202);
  });
});
