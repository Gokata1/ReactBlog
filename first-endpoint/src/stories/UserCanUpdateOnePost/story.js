const { updatePost } = require("../../../database/repository/postrepo");

const findKeysFromRequest = requireUtil("findKeysFromRequest");

const prepare = ({ req }) => {
  const payload = findKeysFromRequest( req, [ "id" , "post_title", "post_author", "post_content" ]);
  payload.post_id = payload.id
  delete payload['id'];
  return payload;
};

const authorize = async ({ prepareResult }) => {
  return true;
};

const handle = async ({ prepareResult}) => {
  try {

    const post = await updatePost(prepareResult)

    return post[0];
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
