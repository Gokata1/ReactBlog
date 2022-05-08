const { viewOnePost } = require("../../../database/repository/postrepo");

const knex = requireKnex();
const findKeysFromRequest = requireUtil("findKeysFromRequest");

const prepare = ({ req }) => {
  // console.log("Preparing here")
  const payload = findKeysFromRequest(req, ["id"]);
  return payload;
};

const authorize = async ({ prepareResult }) => {
  return true;
};

const handle = async ({ prepareResult }) => {
  try {
    const post = await viewOnePost({
      post_id: prepareResult.id,
    });

    if (!post) {
      throw {
        statusCode: 401,
        message: "No posts found",
      };
    }

    return post;
  } catch (error) {
    throw error;
  }
};

const respond = async ({ handleResult }) => {
  try {
    return handleResult;
  } catch (error) {
    throw error;
  }
};

module.exports = {
  prepare,
  authorize,
  handle,
  respond,
};
