module.exports = {


  friendlyName: 'List',


  description: 'List user.',


  inputs: {

  },


  exits: {
    success: {
      statusCode: 200,
      description: 'Users list',
    },
    error: {
      description: 'Internal server error',
      statusCode: 500,
    },
  },


  fn: async function (inputs, exits) {

    try {
      const users = await User.find();
      return exits.success({
        users,
        status: 200
      });

    } catch (error) {
      return exits.error({
        message: 'Oops :) an error occurred',
        error: error.message,
      });
    }

  }


};
