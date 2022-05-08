const debugLogger = requireUtil("debugLogger");
const knex = requireKnex();

describe("Test Handler UserCanUpdateOnePost", () => {
  it("user_can_update_one_post", async () => {
    let result = {};
    try {

      post = await testStrategy("UserCanAddPost", {
        prepareResult: {
          post_title: "Post Sample 123",
          post_author: "Shrey Dhyani",
          post_content: "Here is some sample content. Here is some sample content Here is some sample content"
        },
      });

      result = await testStrategy("UserCanUpdateOnePost", {
        prepareResult: {
          post_id: post.respondResult.post_id,
          post_title: "Post Sample 555"
        },
      });

    } catch (error) {
      debugLogger(error);
    }
    const { respondResult } = result;
    expect(respondResult).toMatchObject({
      post_id: expect.any(String),
      post_title: "Post Sample 555",
      post_author: "Shrey Dhyani",
      post_content: "Here is some sample content. Here is some sample content Here is some sample content"
    });
  });
});
