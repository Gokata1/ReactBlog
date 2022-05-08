module.exports = (app) => {
  app.get("/liveness", async (req, res) => {
    return res.code(200).send({ status: "I am alive" });
  });

  app.get("/readiness", async (req, res) => {
    return res.code(200).send({ status: "I am ready" });
  });

  return [
    {
      endpoints: [
        ["post", "/posts", "UserCanAddPost"],
        ["get", "/posts", "UserCanViewAllPosts"],
        ["get", "/posts/:id", "UserCanViewOnePost"],
        ["put", "/posts/:id", "UserCanUpdateOnePost"],
        ["delete", "/posts/:id", "UserCanDeleteOnePost"],
      ],
    },
  ];
};
