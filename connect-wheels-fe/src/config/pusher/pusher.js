import Pusher from "pusher-js";

export const pusher = new Pusher("c14ce90cc0babbf830df", {
  cluster: "us2",
  forceTLS: true,
});

/* To do  will need to implement authorize end point for chats in future and pass that end point
in front end apusher obj*/

// sample code to subscribe channel
const channel = pusher.subscribe("my-channel");

channel.bind("my-event", (data) => {
  console.log("event recieved");
});
