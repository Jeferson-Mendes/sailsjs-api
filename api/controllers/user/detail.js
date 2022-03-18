module.exports = {


  friendlyName: 'Detail',


  description: 'Detail user.',


  inputs: {
    id: {
      type: 'number',
      required: true
    }
  },


  exits: {
    success: {
      statusCode: 200,
      description: 'User'
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

      if(!userExists) {
        return exits.userNotFound({
          message: 'User not found',
          error: 'error'
        });
      }

      return exits.success({
        user: userExists,
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
