const debugLogger = requireUtil("debugLogger");
const knex = requireKnex();

describe("Test Handler UserCanViewAllPosts", () => {
  it("user_can_view_all_posts", async () => {
    let result = {};
    let expected = [];

    try {
      const post1 = await testStrategy("UserCanAddPost", {
        prepareResult: {
          post_title: "Post Sample",
          post_author: "Shrey Dhyani",
          post_content: "Here is some sample content. Here is some sample content Here is some sample content"
        }
      });
      const post2 = await testStrategy("UserCanAddPost", {
        prepareResult: {
          post_title: "Post Sample",
          post_author: "Shrey Dhyani",
          post_content: "Here is some sample content. Here is some sample content Here is some sample content"
        }
      });

      expected = [post1.respondResult, post2.respondResult];
      
      result = await testStrategy("UserCanViewAllPosts", {
        prepareResult: {},
      });

    } catch (error) {
      debugLogger(error);
    }

    
    const { respondResult } = result;
    expect(respondResult).toEqual(expect.arrayContaining(expected));
  });
});
