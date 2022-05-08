const { deletePost } = require("../../../database/repository/postrepo");
const findKeysFromRequest = requireUtil("findKeysFromRequest");

const prepare = ({ req }) => {
  const payload = findKeysFromRequest( req, [ "id" ]);
  return payload;
};

const authorize = async ({ prepareResult }) => {
  return true
};

const handle = async ({ prepareResult }) => {
  try {

    const result = await deletePost({
      post_id: prepareResult.id
    });

    return result;
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
