const debugLogger = requireUtil("debugLogger");
const knex = requireKnex();

describe("Test Handler UserCanAddPost", () => {
  it("user_can_add_post", async () =>{
    let result = {};
    try{
      result = await testStrategy("UserCanAddPost", {
        prepareResult: {
          post_title: "Post Sample",
          post_author: "Shrey Dhyani",
          post_content: "Here is some sample content. Here is some sample content Here is some sample content"
        }
      });
    }
    catch(err){
      debugLogger(err);
    }
    const { respondResult } = result;

    expect(respondResult).toMatchObject({
      post_id: expect.any(String),
      post_title: "Post Sample",
      post_author: "Shrey Dhyani",
      post_content: "Here is some sample content. Here is some sample content Here is some sample content" 
    });
  });

});
