// import dependencies
const express = require('express');
const router = express.Router();
const AssistentV2 = require('ibm-watson/assistant/v2');
const { IamAuthenticator } = require('ibm-watson/auth');
// create instance of assistent
// first authenticate
const authenticator = new IamAuthenticator({apikey:process.env.ASSISTANT_APIKEY});
// connect to assistant
console.log(process.env.ASSISTANT_URL);
const assistant = new AssistentV2({
  version: '2019-02-28',
  authenticator: authenticator,
  url: process.env.ASSISTANT_URL
})
// route to handle session tokens
router.get("/session", async (req, res) => {
  try {
    const session = await assistant.createSession({
      assistantId: process.env.ASSISTANT_ID
    })
    res.json(session['result'])
  } catch (err) {
    console.log(err);
    res.send('There was an error processing your request.')
  }
});
// handle messages
router.get("/message", async (req, res) => {
  payload = {
    assistantId: process.env.ASSISTANT_ID,
    sessionId: req.headers.session_id,
    input: {
      message_type: "text",
      text: req.body.input,
    }
  }
  try {
    const message = await assistant.message(payload)
    res.json(message['result'])
  } catch (err) {
    console.log(err);
    res.send('There was an error processing your request.')
  }
});
// handle messages

// export routes
module.exports = router;