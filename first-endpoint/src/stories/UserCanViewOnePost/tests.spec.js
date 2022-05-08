const debugLogger = requireUtil("debugLogger");
const knex = requireKnex();

describe("Test Handler UserCanViewOnePost", () => {
  it("user_can_view_one_post", async () => {
    let result = {};
    let post = {};
    try {
      
      post = await testStrategy("UserCanAddPost", {
        prepareResult: {
          post_title: "Post Sample 123",
          post_author: "Shrey Dhyani",
          post_content: "Here is some sample content. Here is some sample content Here is some sample content"
        }
      });
      console.log(post.respondResult);

      result = await testStrategy("UserCanViewOnePost", {
        prepareResult: {
          id: post.respondResult.post_id,
        },
      });
    } catch (error) {
      debugLogger(error);
    }
    const { respondResult } = result;
    expect(respondResult).toMatchObject({
      post_id: expect.any(String),
      post_title: "Post Sample 123",
      post_author: "Shrey Dhyani",
      post_content: "Here is some sample content. Here is some sample content Here is some sample content" 
    });
  });
});
