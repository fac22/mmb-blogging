const express = require("express");
const messageList = require("./list");

// console.log(message);

const server = express();

///this is the home page

server.get("/", (request, response) => {
  // const search = request.query.search || "";
  let items = "";
  for (const message of messageList) {
    // const match = dog.name.toLowerCase().includes(search.toLowerCase());
    // if we don't have a search submission we show all dogs
    items += `${message}`;
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
<h1> message of the day ${items} </h1>
    
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
server.get("/message", (request, response) => {
  const html = `<!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Message</title>
    </head>
    <body>
    <h1> message page </h1>
        
    </body>
    </html>`;

  response.send(html);
});

///posting function

const bodyParser = express.urlencoded({ extended: false });
server.post("/posting", bodyParser, (request, response) => {
  const message = request.body;

  // normally you'd use the body to save a new user here
  response.redirect("/message");
});

const PORT = 4444;

server.listen(PORT, () => console.log(`http://localhost:${PORT}`));
