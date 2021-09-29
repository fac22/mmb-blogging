const express = require("express");
const messageList = require("./list");

// console.log(message);

const server = express();

///this is the home page
let items = "";

server.get("/message", (request, response) => {
  // const search = request.query.search || "";

  for (const message of messageList) {
    // const match = dog.name.toLowerCase().includes(search.toLowerCase());
    // if we don't have a search submission we show all dogs
    items += `<li>${message}</li>`;
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

  response.send(html);
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

  response.send(html);
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

  response.send(html);
});

///posting function

const bodyParser = express.urlencoded({ extended: false });
server.post("/posting", bodyParser, (request, response) => {
  const newMessage = request.body.text;

  console.log(newMessage);

  //   const name = newDog.name.toLowerCase();
  //   dogs[name] = newDog;

  messageList.push(newMessage);
  console.log(messageList);

  // normally you'd use the body to save a new user here
  response.redirect("/message");
});

const PORT = 4444;

server.listen(PORT, () => console.log(`http://localhost:${PORT}`));
