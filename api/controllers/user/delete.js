module.exports = {


  friendlyName: 'Delete',


  description: 'Delete user.',


  inputs: {
    id: {
      type: 'string',
      required: true,
    }
  },


  exits: {
    success: {
      statusCode: 204,
      description: 'User has been removed'
    },
    userNotFound: {
      statusCode: 404,
      description: 'User not found',
    },
    error: {
      description: 'Internal server error',
      statusCode: 500,
    },
  },


  fn: async function (inputs, exits) {

    const { id } = inputs;

    try {
      const userExists = await User.findOne({ id });

      if (!userExists) {
        return exits.userNotFound({
          message: 'User not found',
          error: 'error'
        });
      }

      await User.destroyOne(id);
      return exits.success();
    } catch (error) {
      return exits.error({
        message: 'Oops :) an error occurred',
        error: error.message,
      });
    }
  }


};
