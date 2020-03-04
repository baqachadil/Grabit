var express = require("express");
require("dotenv").config();
var router = express.Router();
const webpush = require("web-push");

webpush.setVapidDetails(
  process.env.WEB_PUSH_CONTACT,
  process.env.PUBLIC_VAPID_KEY,
  process.env.PRIVATE_VAPID_KEY
);

//Subscribing to the notification
router.post("/subscribe", (req, res) => {
  const subscription = req.body;

  console.log(subscription);

  const payload = JSON.stringify({
    title: "Hello!",
    body: "It works."
  });

  webpush
    .sendNotification(subscription, payload)
    .then(result => console.log(result))
    .catch(e => console.log(e.stack));

  res.status(200).json({ success: true });
});

module.exports = router;
