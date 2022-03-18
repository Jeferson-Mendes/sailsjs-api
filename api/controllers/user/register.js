module.exports = {


  friendlyName: 'Register',


  description: 'Register user.',


  inputs: {
    fullName: {
      type: 'string',
      required: true,
    },
    email: {
      type: 'string',
      required: true,
      unique: true,
      isEmail: true,
    },
    password: {
      type: 'string',
      required: true,
      minLength: 6,
    },
  },


  exits: {
    success: {
      statusCode: 201,
      description: 'User created',
    },
    emailAlreadyInUse: {
      statusCode: 400,
      description: 'Email address already exists',
    },
    error: {
      description: 'Internal server error',
      statusCode: 500,
    },
  },


  fn: async function (inputs, exits) {

    const { email, fullName, password } = inputs;

    try {
      const newEmailAddress = email.toLowerCase();
      const token = await sails.helpers.strings.random('url-friendly');

      let createdUser = await User.create({
        fullName,
        email: newEmailAddress,
        password,
        emailProofToken: token,
        emailProofTokenExpiresAt: Date.now() + sails.config.custom.emailProofTokenTTL,
      }).fetch();

      // const confirmLink = `${sails.config.custom.baseUrl}/user/confirm?token=${token}`;

      // const sendEmail = {
      //   to: newUser.email,
      //   subject: 'Confirm Your account',
      //   template: 'confirm',
      //   context: {
      //     name: newUser.fullName,
      //     confirmLink: confirmLink,
      //   },
      // };

      // await sails.helpers.sendMail(sendEmail);

      return exits.success({
        user: createdUser,
        message: `An account has been created.`,
      });
    } catch (error) {

      if (error.code === 'E_UNIQUE') { // This error is caused when email already exists
        return exits.emailAlreadyInUse({
          message: 'Oops :) an error occurred',
          error: 'This email address already exits',
        });
      }

      return exits.error({
        message: 'Oops :) an error occurred',
        error: error.message,
      });
    }
  }


};
