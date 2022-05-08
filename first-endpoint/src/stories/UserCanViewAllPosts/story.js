const { viewAllPosts } = require("../../../database/repository/postrepo");

const findKeysFromRequest = requireUtil("findKeysFromRequest");

const prepare = ({ req }) => {
  const payload = findKeysFromRequest(req, [ ]);
  return payload;
};

const authorize = async ({ prepareResult }) => {
  return true;
};

const handle = async ({ prepareResult }) => {
  try {
    const posts = await viewAllPosts();

    if (!posts) {
      throw {
        statusCode: 401,
        message: "No posts found",
      };
    }

    return posts;
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