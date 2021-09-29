const express = require("express");
const messageList = require("./list");

// console.log(message);

const server = express();

///this is the home page

server.get("/message", (request, response) => {
  let items = "";
  for (const message of Object.values(messageList)) {
    // items += `<li>${message}</li>`;
    console.log(message.text);

    items += `
        <li></li>
          <span>${message.text}</span>
          <form action="/delete-message" method="POST" style="display: inline;">
            <button name="name" value="${message.text}" aria-label="Delete ${message.text}">
              &times;
            </button>
          </form>
        </li>`;
  }

  const html = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Best Blogging</title>
</head>
<body>
<h1> message of the day </h1><ul>${items}</ul> 
    
</body>
</html>`;

  response.end(html);
});

///// page for posting message
server.get("/posting", (request, response) => {
  const html = `<!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Posting</title>
    </head>
    <body>
    <form method="POST">
    <label for="text">Post message</label>
    <input
      type="text"
      id="text"
      name="text"
      placeholder=" please type your message"
    />
   
  </form>
   
        
    </body>
    </html>`;

  response.end(html);
});

//// see the message of the post
server.get("/", (request, response) => {
  const html = `<!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Message</title>
    </head>
    <body>

    <h1>Main page</h1>
   
        
    </body>
    </html>`;

  response.end(html);
});

///posting function

const bodyParser = express.urlencoded({ extended: false });
server.post("/posting", bodyParser, (request, response) => {
  const newDog = request.body;
  const name = newDog.text.toLowerCase();
  messageList[name] = newDog;
  //   const newMessage = request.body;

  //   // const label = /*username */;
  //   // const name = newDog.name.toLowerCase();
  //   messageList[newMessage] = newMessage;

  //   //   messageList[label] = newMessage;

  //   console.log(messageList);

  // normally you'd use the body to save a new user here
  response.redirect("/message");
});

server.post("/delete-message", bodyParser, (request, response) => {
  const deleteMessage = request.body.text;
  let x = "hey";

  console.log(deleteMessage + " delete post");
  //   if (messageList.includes(deleteMessage)) {
  messageList.splice(messageList.includes(deleteMessage));
  console.log(messageList);
  //   }
  console.log(messageList);

  response.redirect("/message");
});

const PORT = 4444;

server.listen(PORT, () => console.log(`http://localhost:${PORT}`));
