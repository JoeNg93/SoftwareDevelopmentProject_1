const express = require('express');
const jwt = require('jsonwebtoken');
const passport = require('passport');
const FaceBookStrategy = require('passport-facebook').Strategy;

const { User } = require('./../models/users');

const router = express.Router();

const { decrypt } = require('./../utils/auth');

const { JWT_KEY, FB_APP_ID, FB_APP_SECRET, HOST_URL } = require('./../config/keyConfig');

const { getUserPropertyForResponse } = require('./api_router');

const _ = require('lodash/fp');

passport.use(new FaceBookStrategy({
  clientID: FB_APP_ID,
  clientSecret: FB_APP_SECRET,
  callbackURL: `${HOST_URL}/auth/facebook/callback`
},
  function (accessToken, refreshToken, profile, done) {
    const facebook_id = profile.id;
    User.findOne({ facebook_id })
      .then((user) => {
        if (user) {
          return user.generateAuthToken().then(token => done(null, user));
        } else {
          const newUser = new User({ facebook_id });
          return newUser.save();
        }
      })
      .then(user => user && user.generateAuthToken().then(token => done(null, user)))
      .catch(err => { done(err) });
  }
));


router.post('/login', (req, res) => {
  const token = req.varIngredientSession.token || req.get('Authorization');
  if (token) {
    return res.status(400).send();
  }

  const { email, password } = req.fields;

  let userData = {};

  User.findByCredentials(email, password)
    .then(user => {
      userData = _.pick(['_id', 'ingredients', 'favoriteRecipes', 'isAdmin', 'likedRecipes', 'dislikedRecipes', 'facebook_id'])(user);
      return user.generateAuthToken();
    })
    .then((token) => {
      req.varIngredientSession.token = token;
      userData.token = token;
      res.send({ user: userData });
    })
    .catch(err => res.status(401).send());
});

router.get('/validate', (req, res) => {
  const { key } = req.query;
  if (!key) {
    return res.status(400).send();
  }
  try {
    const decryptKey = decrypt(key);
    const [email, password] = decryptKey.split(",").map(x => x.trim());
    User.findOne({ email })
      .then((user) => {
        if (user) {
          return Promise.reject(new Error('User already in the database'));
        }
        const newUser = new User({ email, password });
        return newUser.save();
      })
      .then(user => user.generateAuthToken())
      .then((token) => {
        req.varIngredientSession.token = token;
        // res.send({ token });
        res.redirect('/');
      })
      .catch(err => res.status(400).send({ status: 'fail', message: err.message }));
  } catch (e) {
    res.status(400).send({ status: 'fail', message: 'Bad encrypt key' });
  }
});

router.get('/logout', (req, res) => {
  const token = req.varIngredientSession.token || req.get('Authorization');
  if (!token) {
    return res.status(401).send();
  }
  User.findByToken(token)
    .then(user => user.removeAuthToken(token))
    .then(() => {
      req.varIngredientSession.reset();
      res.send({ status: 'success', message: 'Logout successfully' })
      // res.redirect('/');
    })
    .catch(err => res.status(400).send(err.message));
});

router.get('/checkSession', (req, res) => {
  res.send(req.varIngredientSession.token ? true : false);
});

router.get('/facebook', passport.authenticate('facebook'));

router.get('/facebook/callback', passport.authenticate('facebook', { session: false }), (req, res) => {
  if (req.user) {
    req.varIngredientSession.token = req.user.tokens[0].token;
  }
  res.redirect('/');
});

module.exports = {
  auth_router: router
};