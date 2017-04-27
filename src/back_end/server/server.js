require('./../config/config');

const path = require('path');
const express = require('express');
const sessions = require('client-sessions');
const formidable = require('formidable');
const Mailgun = require('mailgun-js');
const MailComposer = require('nodemailer/lib/mail-composer');
const cors = require('cors');
const passport = require('passport');

// const FB_LOGIN_CALLBACK_URL = 'http://localhost:8765/auth/facebook/callback';

const { SESSION_KEY } = require('./../config/keyConfig');

const { api_router } = require('./../routers/api_router');

const { auth_router } = require('./../routers/auth_router');

const { webhook_router } = require('./../routers/webhook_router');

const { User } = require('./../models/users');

const app = express();

app.set('port', 8765);

app.use(cors());

app.use(sessions({
  cookieName: 'varIngredientSession',
  secret: SESSION_KEY,
  duration: 2 * 60 * 60 * 1000,
  activeDuration: 5 * 60 * 1000,
  cookie: {
    secure: false
  }
}));

const formidableConfig = (req, res, next) => {
  let form = formidable.IncomingForm();
  form.uploadDir = path.resolve(__dirname, '..', 'images');
  form.keepExtensions = true;
  form.parse(req, (err, fields, files) => {
    if (err) {
      return res.status(400).send();
    }
    req.fields = fields;
    req.files = files;
    next();
  });
};

app.use(formidableConfig);

app.get('*/bundle.js', (req, res, next) => {
  req.url += '.gz';
  res.set('Content-Encoding', 'gzip');
  next();
});

app.use(express.static(path.resolve(__dirname, '..', '..', 'front_end', 'assets')));

app.use(passport.initialize());

app.use('/api', api_router);

app.use('/auth', auth_router);

app.use('/webhook', webhook_router);



app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, '..', '..', 'front_end', 'index.html'));
});

app.listen(app.get('port'), () => {
  console.log('Server is running on port', app.get('port'));
});

module.exports = {
  app
};
