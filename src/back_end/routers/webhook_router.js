
const express = require('express');
const redis = require('redis');
const axios = require('axios');
const _ = require('lodash/fp');

const client = redis.createClient();

const { Recipe } = require('./../models/recipes');

client.on('error', err => console.log(`Error: ${err}`));

const PAGE_ACCESS_TOKEN = "EAAD4Omr42JABACZCjZCf8RLJoqp1ekH6sf20JtZBsJPAOPKHtVQ6313ZCmudTd7FDLC2MUwoUFwx0CMOkPw4IGstzAtZCqqidZC1DOLIVjKxWAOvcB3ZCP6KNO2vrHybNIH8s7UCkkkSMcvjLgTk1oNLaYUJLkcyblZA8V4qm1mZCggZDZD";

const CALLBACK_URL = `https://graph.facebook.com/v2.6/me/messages?access_token=${PAGE_ACCESS_TOKEN}`;

const router = express.Router();

router.get('/', (req, res) => {
  if (req.query['hub.verify_token'] === 'my_voice_is_my_password_verify_me') {
    res.send(req.query['hub.challenge']);
  }
  res.send('Errorrrrr, wrong token');
});

router.post('/', function (req, res) {
  const data = req.fields;

  // Make sure this is a page subscription
  if (data.object === 'page') {

    // Iterate over each entry - there may be multiple if batched
    data.entry.forEach(function (entry) {
      // Iterate over each messaging event
      entry.messaging.forEach(function (event) {
        // console.log(event);
        handleEvent(event);
      });
    });

    // Assume all went well.
    //
    // You must send back a 200, within 20 seconds, to let us know
    // you've successfully received the callback. Otherwise, the request
    // will time out and we will keep trying to resend.
    res.send();
  }
});

function sendReplyNotification(event) {
  const bubbleData = {
    recipient: { id: event.sender.id },
    sender_action: 'typing_on'
  };
  makeSendRequest(bubbleData);
}

function sendDefaultButton(event) {
  sendReplyNotification(event);

  const messageData = {
    recipient: {
      id: event.sender.id
    },
    message: {
      attachment: {
        type: 'template',
        payload: {
          template_type: 'button',
          text: 'Hello there. How can I help you?',
          buttons: [
            {
              type: 'postback',
              title: 'Search Recipes',
              payload: 'search_recipes'
            },
            {
              type: 'postback',
              title: 'Question/Suggestion',
              payload: 'send_messages'
            }
          ]
        }
      }
    }
  };
  makeSendRequest(messageData);
}

function makeSendRequest(messageData) {
  axios.post(CALLBACK_URL, messageData)
    .then(response => console.log('Success'))
    .catch(error => console.log('Error'));
}

function handleEvent(event) {
  if (event.message) {
    handleMessage(event);
  } else if (event.postback) {
    handlePostback(event);
  }
}

function handleMessage(event) {
  if (event.message.text) {
    client.get(event.sender.id, (err, state) => {
      if (!state) {
        sendDefaultButton(event)
      }
      handleState(event, state);
    });
  }
}

function handleState(event, state) {
  switch (state) {
    case 'send_messages':
      sendAskingMessage(event);
      break;
    case 'receive_messages':
      sendYesNoQuestion(event);
      break;
    case 'ask_ingredients':
      processIngredients(event);
      break;
  }
}

function sendAskingMessage(event) {
  client.set(event.sender.id, 'receive_messages');
  sendReplyNotification(event);
  const messageData = {
    recipient: { id: event.sender.id },
    message: {
      text: "OK. What's that? Please drop your question/suggestion here. We will reach you when we are online"
    }
  };
  makeSendRequest(messageData);
}

function sendYesNoQuestion(event) {
  sendReplyNotification(event);
  const messageData = {
    recipient: {
      id: event.sender.id
    },
    message: {
      attachment: {
        type: 'template',
        payload: {
          template_type: 'button',
          text: 'We have received your question/suggestion. Anything else?',
          buttons: [
            {
              type: 'postback',
              title: 'Yes',
              payload: 'more_questions'
            },
            {
              type: 'postback',
              title: 'No',
              payload: 'no_more_questions'
            }
          ]
        }
      }
    }
  };
  makeSendRequest(messageData);
}

function handlePostback(event) {
  console.log('POSTBACKKK');
  console.log(event.postback.payload);
  switch (event.postback.payload) {
    case 'send_messages':
      sendAskingMessage(event);
      break;
    case 'more_questions':
      sendAskingMessage(event);
      break;
    case 'no_more_questions':
      sendThankYouMessage(event);
      break;
    case 'search_recipes':
      sendAskingSortKey(event);
      break;
    case 'numOfLikes':
    case 'numOfIngredientsMissing':
      sendAskingIngredients(event);
      break;
    case 'search_again':
      sendAskingSortKey(event);
      break;
    case 'no_search_again':
      sendThankYouServiceMessage(event);
      break;
    case 'more_recipes':
      searchMoreRecipes(event);
      break;
  }
}

function searchMoreRecipes(event) {
  client.get(`${event.sender.id}-startQueryIndex`, (err, startQueryIndex) => {
    const newStartQueryIndex = Number(startQueryIndex) + 3;
    client.set(`${event.sender.id}-startQueryIndex`, newStartQueryIndex);
    client.get(`${event.sender.id}-sortKey`, (err, sortKey) => {
      client.get(`${event.sender.id}-queryIngredients`, (err, queryIngredients) => {
        findRecipesWithIngredients(event, queryIngredients.split(","), sortKey, newStartQueryIndex);
      });
    });
  });
}

function sendThankYouServiceMessage(event) {
  sendReplyNotification(event);

  client.del(event.sender.id);
  client.del(`${event.sender.id}-sortKey`);
  client.del(`${event.sender.id}-startQueryIndex`);
  client.del(`${event.sender.id}-queryIngredients`);

  const messageData = {
    recipient: { id: event.sender.id },
    message: {
      text: 'Thank you for using our service. Please feel free to search again whenever you have more ingredients'
    }
  };

  makeSendRequest(messageData);

}

function processIngredients(event) {
  const inputIngredients = event.message.text;
  if (inputIngredients.indexOf(',') == -1) {
    sendErrorInput(event);
    return;
  }
  const queryIngredients = inputIngredients.split(",").map(eachIngredient => eachIngredient.trim());
  client.set(`${event.sender.id}-queryIngredients`, queryIngredients.toString());

  client.get(`${event.sender.id}-sortKey`, (err, sortKey) => {
    client.get(`${event.sender.id}-startQueryIndex`, (err, startQueryIndex) => {
      client.get(`${event.sender.id}-queryIngredients`, (err, queryIngredients) => findRecipesWithIngredients(event, queryIngredients.split(","), sortKey, startQueryIndex))
    });
  });
}

function findRecipesWithIngredients(event, queryIngredients, sortKey, startQueryIndex) {
  Recipe.findByIngredients(queryIngredients, Number(startQueryIndex), 3)
    .then(recipes => {
      let promiseQueues = recipes.map((recipe) => {
        return new Promise((resolve, reject) => {
          const totalIngredients = recipe.ingredients.length;
          const numOfIngredientsHave = recipe.ingredients.filter(ingredient => queryIngredients.indexOf(ingredient.name) != -1).length;
          const numOfIngredientsMissing = totalIngredients - numOfIngredientsHave;
          resolve(Object.assign({}, recipe._doc, { totalIngredients, numOfIngredientsHave, numOfIngredientsMissing }));
        });
      });
      return Promise.all(promiseQueues);
    })
    .then((recipes) => {
      const responseRecipes = _.sortBy(sortKey)(recipes);
      sendListRecipes(event, sortKey === 'numOfLikes' ? responseRecipes.reverse() : responseRecipes, sortKey);
    })
    .catch(err => console.log(err));
}

function sendIntroduceRecipes(event) {
  const messageData = {
    recipient: { id: event.sender.id },
    message: {
      text: "Here's your recipes:"
    }
  };

  makeSendRequest(messageData);
}

function sendListRecipes(event, recipes, sortKey) {
  client.del(event.sender.id);
  sendReplyNotification(event);
  let messageData = {};
  if (!recipes.length) {
    messageData = {
      recipient: { id: event.sender.id },
      message: {
        attachment: {
          type: 'template',
          payload: {
            template_type: 'button',
            text: 'Well, seems that we cannot find anything else. Wanna search again?',
            buttons: [
              {
                type: 'postback',
                title: 'Yes',
                payload: 'search_again'
              },
              {
                type: 'postback',
                title: 'No',
                payload: 'no_search_again'
              }
            ]
          }
        }
      }
    };
    makeSendRequest(messageData);
  } else {
    sendIntroduceRecipes(event);
    sendReplyNotification(event);

    messageData = {
      recipient: { id: event.sender.id },
      message: {
        attachment: {
          type: 'template',
          payload: {
            template_type: 'list',
            elements: [],
            buttons: []
          }
        }
      }
    };

    messageData.message.attachment.payload.elements.push({
      title: 'varIngredient',
      image_url: 'https://res.cloudinary.com/dicyn7jds/image/upload/v1492947076/FB_Bot_Logo_ljwtnn.png',
      default_action: {
        type: 'web_url',
        url: 'https://var-ingredient.joehub.fi',
        webview_height_ratio: 'full'
      },
      buttons: [
        {
          title: 'Home Page',
          type: 'web_url',
          url: 'https://var-ingredient.joehub.fi',
          webview_height_ratio: 'full'
        }
      ]
    });

    recipes.forEach((recipe) => {
      console.log('Recipe: ', recipe);
      messageData.message.attachment.payload.elements.push({
        title: recipe.name,
        image_url: `https://res.cloudinary.com/dicyn7jds/image/upload/c_scale,h_50,w_50/${recipe.image.versionId}/${recipe.image._id}.${recipe.image.imageType}`,
        // subtitle: sortKey == 'numOfLikes' ? `Likes: ${recipe.numOfLikes}` : `You have: ${recipe.numOfIngredientsHave}/${recipe.totalIngredients} ingredients`,
        subtitle: `You have: ${recipe.numOfIngredientsHave}/${recipe.totalIngredients} ingredients`,
        buttons: [{
          title: 'Detail',
          type: 'web_url',
          url: `https://var-ingredient.joehub.fi/recipe/${recipe._id}`,
          webview_height_ratio: 'tall',
        }]
      });
    });

    messageData.message.attachment.payload.buttons.push({
      title: 'View More',
      type: 'postback',
      payload: 'more_recipes'
    });

    makeSendRequest(messageData);
  }
}

function sendErrorInput(event) {
  sendReplyNotification(event);

  const messageData = {
    recipient: { id: event.sender.id },
    message: {
      text: "There are errors in your request. Maybe you forgot to seperate each ingredient by a comma?"
    }
  }

  makeSendRequest(messageData);
}

function sendAskingSortKey(event) {
  sendReplyNotification(event);

  const messageData = {
    recipient: { id: event.sender.id },
    message: {
      attachment: {
        type: 'template',
        payload: {
          template_type: 'button',
          text: "Sure. What's your criteria for searching recipes?",
          buttons: [
            {
              type: 'postback',
              title: 'Popularity',
              payload: 'numOfLikes'
            },
            {
              type: 'postback',
              title: 'Ingredients Had',
              payload: 'numOfIngredientsMissing'
            }
          ]
        }
      }
    }
  };

  makeSendRequest(messageData);

}

function sendAskingIngredients(event) {
  console.log(event.postback.payload);
  client.set(event.sender.id, 'ask_ingredients');
  client.set(`${event.sender.id}-sortKey`, event.postback.payload);
  client.set(`${event.sender.id}-startQueryIndex`, 0);
  sendReplyNotification(event);

  const messageData = {
    recipient: { id: event.sender.id },
    message: {
      text: "OK. Please type in your ingredients that you're having right now, seperate each ingredient by A COMMA. NOTE: If you only have one ingredient, end the ingredient name with A COMMA too"
    }
  };

  makeSendRequest(messageData);

}

function sendThankYouMessage(event) {
  sendReplyNotification(event);
  const messageData = {
    recipient: {
      id: event.sender.id
    },
    message: {
      text: "Thanks for your questions/suggestions. We will get back to you as soon as possible"
    }
  }
  client.del(event.sender.id);
  makeSendRequest(messageData);
}

module.exports = {
  webhook_router: router
};