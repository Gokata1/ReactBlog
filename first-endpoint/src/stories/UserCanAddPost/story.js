const { addPost } = require("../../../database/repository/postrepo");

const findKeysFromRequest = requireUtil("findKeysFromRequest");

const prepare = ({ req }) => {
  const payload = findKeysFromRequest(req, ["post_title", "post_author", "post_content"]);
  return payload;
};

const authorize = () => {
  return true;
};

const validator = requireValidator();

const validateInput = async (prepareResult) => {
  const constraints = {
    post_title: {
      presence: {
        allowEmpty: false,
        message: "^Please enter Title",
      },
    },
    post_author: {
      presence: {
        allowEmpty: false,
        message: "^Please enter Author name",
      },
    },
    post_content: {
      presence: {
        allowEmpty: false,
        message:"^Please enter some content",
      }
    }
  };

  return validator(prepareResult, constraints);
};

const handle = async ({ prepareResult }) => {
  try {
    // Validate Input (If email, password are present)
    await validateInput(prepareResult);


    // Store in users table
    const posts = await addPost({
      post_title: prepareResult.post_title,
      post_author: prepareResult.post_author,
      post_content: prepareResult.post_content,
    });

    return posts[0];
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
