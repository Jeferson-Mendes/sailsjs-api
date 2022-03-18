module.exports = {


  friendlyName: 'Update',


  description: 'Update user.',


  inputs: {
    id: {
      type: 'number',
      required: true
    },
    fullName: {
      type: 'string',
      required: true
    }
  },


  exits: {
    success: {
      statusCode: 200,
      description: 'User updated',
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

    const { id, fullName } = inputs;

    try {
      const userExists = await User.findOne({
        id
      });

      if (!userExists) {
        return exits.userNotFound({
          message: 'User not found',
          error: 'error'
        });
      }

      const updatedUser = await User.updateOne({id}).set({fullName});

      return exits.success({
        user: updatedUser,
        message: 'User has been updated',
        status: 200,
      });
    } catch (error) {
      return exits.error({
        message: 'Oops :) an error occurred',
        error: error.message,
      });
    }

  }


};
