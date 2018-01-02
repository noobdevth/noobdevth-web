'use strict';var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);let invite = (() => {var _ref = (0, _asyncToGenerator3.default)(







  function* (req, res) {
    try {
      const { username } = req.body;
      const token = config.github.token;

      res.header('Content-Type', 'application/json');
      res.header('Access-Control-Allow-Origin', '*');
      res.header('Access-Control-Allow-Headers', 'Content-Type');

      if (req.method === 'OPTIONS') {
        return res.status(204).send('');
      }

      if (req.method !== 'POST') {
        return res.status(405).send(err('Only the POST method is allowed.'));
      }

      if (!username) {
        return res.status(405).send(err('Username is Required.'));
      }

      if (!token) {
        return res.status(500).send(err('Token is not available.'));
      }

      const github = new GitHub({
        host: 'api.github.com',
        protocol: 'https' });


      yield github.authenticate({
        type: 'token',
        token });


      const { data } = yield github.orgs.addOrgMembership({
        org: ORG_ID,
        username,
        role: 'member' });


      res.status(200).send({
        status: 200,
        state: data.state,
        id: data.user.id,
        avatar: data.user.avatar_url });

    } catch (error) {
      res.status(500).send(err(error));
    }
  });return function invite(_x, _x2) {return _ref.apply(this, arguments);};})();function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}const functions = require('firebase-functions');const GitHub = require('github');const config = functions.config();const ORG_ID = 'noobdevth';const err = error => ({ error });

exports.invite = functions.https.onRequest(invite);