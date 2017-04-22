const express = require('express');
const axios = require('axios');

const PAGE_TOKEN = "EAAD4Omr42JABAOnJGM1zmys74jaaNMZCCszkyhFpCKz5fA7uYdD3IWL9xMTKEHUlb4klt5b7o2wEkm7ZAUv1drIQZCqebYh3SwRgPqfsOoBd3uag54I2kIzo3zAURFVjtvDZB0Xzs0HxdlKC7FUnAjgS2xiQ12mDZCTOLtD0xFQZDZD";

const CALLBACK_URL = `https://graph.facebook.com/v2.6/me/messages?access_token=${PAGE_TOKEN}`;

const router = express.Router();

router.get('/', (req, res) => {
  if (req.query['hub.verify_token'] === 'my_voice_is_my_password_verify_me') {
    res.send(req.query['hub.challenge']);
  }
  res.send('Error, wrong token');
});

router.post('/', (req, res) => {
  let messaging_events = req.body.entry[0].messaging;
  messaging_events.forEach((event) => {
    console.log(event);
    let sender = event.sender.id;
    if (event.message && event.message.text) {
      let text = event.message.text;
      if (text === 'Generic') {
        sendGenericMessage(sender);
        res.status(200).send();
      }
      sendText(sender, "Text echo: " + text.substring(0, 100));
      res.status(200).send();
    }
  });
});

function sendText(sender, text) {
  let messageData = { text };
  axios.post(CALLBACK_URL, {
    recipient: { id: sender },
    message: messageData
  }).then((response) => {
    console.log('Success');
  }).catch((error) => {
    console.log('Error');
    ;
  });
}

function sendGenericMessage(sender) {
  let messageData = {
    "attachment": {
      "type": "template",
      "payload": {
        "template_type": "generic",
        "elements": [{
          "title": "First card",
          "subtitle": "Element #1 of an hscroll",
          "image_url": "http://messengerdemo.parseapp.com/img/rift.png",
          "buttons": [{
            "type": "web_url",
            "url": "https://www.messenger.com",
            "title": "web url"
          }, {
            "type": "postback",
            "title": "Postback",
            "payload": "Payload for first element in a generic bubble",
          }],
        }, {
          "title": "Second card",
          "subtitle": "Element #2 of an hscroll",
          "image_url": "http://messengerdemo.parseapp.com/img/gearvr.png",
          "buttons": [{
            "type": "postback",
            "title": "Postback",
            "payload": "Payload for second element in a generic bubble",
          }],
        }]
      }
    }
  };
  axios.post(CALLBACK_URL, {
    recipient: { id: sender },
    message: messageData
  }).then((response) => {
    console.log('Success');
  }).catch((error) => {
    console.log('Error');
  });
}

module.exports = {
  webhook_router: router
};