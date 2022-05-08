const debugLogger = requireUtil("debugLogger");
const knex = requireKnex();

describe("Test Handler UserCanDeleteOnePost", () => {
  it("user_can_delete_one_post", async () => {
    let result = {};
    let notexpected = [];

    try {

      const post1 = await testStrategy("UserCanAddPost", {
        prepareResult: {
          post_title: "Post Sample 1",
          post_author: "Jaune Arc",
          post_content: "Here is some sample content. Here is some sample content Here is some sample content"
        }
      });
      const post2 = await testStrategy("UserCanAddPost", {
        prepareResult: {
          post_title: "Post Sample 2",
          post_author: "Shrey Dhyani",
          post_content: "Here is some sample content. Here is some sample content Here is some sample content"
        }
      });
      notexpected = [post2.respondResult];

      const deleted = await testStrategy("UserCanDeleteOnePost", {
        prepareResult: {
          id: post2.respondResult.post_id,
        },
      });

      result = await testStrategy("UserCanViewAllPosts", {
        prepareResult: {},
      });

    } catch (error) {
      debugLogger(error);
    }

    const { respondResult } = result;
    expect(respondResult).not.toEqual(expect.arrayContaining(notexpected));
  });
});
