const Pusher = require("pusher");

export const pusher = new Pusher({
  appId: "2059647",
  key: "c14ce90cc0babbf830df",
  secret: "27a8bc0afaa428ca3441",
  cluster: "us2",
  useTLS: true,
});

/*To do  need to set pusher beam for notification and authorize param in channel*/

// sample to trigger puhser event
pusher.trigger("my-channel", "my-event", {
  message: "hello world",
});
