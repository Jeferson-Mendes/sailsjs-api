/**
 * Route Mappings
 * (sails.config.routes)
 *
 * Your routes tell Sails what to do each time it receives a request.
 *
 * For more information on configuring custom routes, check out:
 * https://sailsjs.com/anatomy/config/routes-js
 */

module.exports.routes = {

  'GET /': 'home/index',

  'GET /user/': 'user/list',
  'POST /user/register': 'user/register',
  'PUT /user/update/:id': 'user/update',
  'GET /user/:id': 'user/detail',
  'DELETE /user/:id': 'user/delete'
};
