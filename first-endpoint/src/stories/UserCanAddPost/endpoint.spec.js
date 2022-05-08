const contextClassRef = requireUtil("contextHelper");
const randomUser = requireUtil("randomUser");
const knex = requireKnex();
const httpServer = requireHttpServer();

describe("Test API UserCanAddPost", () => {
  beforeAll(async () => {
    contextClassRef.user = randomUser();
    contextClassRef.headers = {
      Authorization: `Bearer ${contextClassRef.user.token}`, // An authenticated user is making the api call
    };
  });

  it("dummy_story_which_will_pass", async () => {
    let respondResult;
    try {
      const app = httpServer();

      const payload = {};

      // respondResult = await app.inject({
      //   method: "POST",
      //   url: "/api_endpoint", // This should be in endpoints.js
      //   payload,
      //   headers,
      // });
    } catch (error) {
      respondResult = error;
    }

    // expect(respondResult.statusCode).toBe(200);
    // expect(respondResult.json()).toMatchObject({});
    expect(1).toBe(1);
  });

  it("user_can_add_post", async () => {
    let respondResult;
    try {
      const app = httpServer();
  
      const payload = {
        post_title: "Post Sample",
        post_author: "Shrey Dhyani",
        post_content: "Here is some sample content. Here is some sample content Here is some sample content"
      };
  
      respondResult = await app.inject({
        method: "POST",
        url: "/posts",
        payload,
      });
    } catch (error) {
      respondResult = error;
    }
  
    expect(respondResult.statusCode).toBe(200);
    expect(respondResult.json()).toMatchObject({
      post_id: expect.any(String),
      post_title: "Post Sample",
      post_author: "Shrey Dhyani",
      post_content: "Here is some sample content. Here is some sample content Here is some sample content"
    });
  });
});
