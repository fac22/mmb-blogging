const express = require("express");
const messageList = require("./list");

const staticHandler = express.static("public");

const server = express();

server.use(staticHandler);
///this is the home page
server.get("/", (request, response) => {
  const html = `
    <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
       
        <link rel="stylesheet" type="text/css" href="./style.css">
        <link rel="stylesheet" type="text/css" href="./main.css">

        <title>Home</title>
      </head>



      <body class = "center center-text" >
      <h1>Welcome to mmB Blogging</h1>

      <p>Submit your thoughts <b>here</b></p>

      <section class="section1" id="section1">
      
      
      </section>
      
      
      
      </body>
      </html>
      `;

  response.end(html);
});

// Try getting message board onto main page
//<iframe src="/message" name="iframe_message_board" title="Iframe Message Board"></iframe>;

// see the message of the post
server.get("/message", (request, response) => {
  let items = "";
  for (const message of Object.values(messageList)) {
    // items += `<li>${message}</li>`;
    // console.log(message.text);

    items += `
      <li>
        <span>${message.text}</span>
        <form action="/delete-message" method="POST" style="display: inline;">
        
          <button name="name" value="${message.text}" aria-label="Delete ${message.text}">
          <img src="https://img.icons8.com/cute-clipart/64/000000/x.png"/>

            <!-- &times; -->
          </button>
        </form>
      </li>
    `;
  }

  const html = `
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">

        <link rel="stylesheet" type="text/css" href="./style.css">
        <link rel="stylesheet" type="text/css" href="./message.css">
        <title>Best Blogging</title>
    </head>
    <body>
      <h1> message of the day </h1>
      
     <div class="message">
     <ul>${items}</ul> 
     </div>
      
    </body>
    </html>
  `;

  response.end(html);
});

///// page for posting message
server.get("/posting", (request, response) => {
  const html = `
    <!DOCTYPE html>
    <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <link rel="stylesheet" type="text/css" href="./style.css">
        <link rel="stylesheet" type="text/css" href="./posting.css">
        <title>Posting</title>
      </head>
      <body>
        <form method="POST">
          <!-- // Author -->
          <label for="new-author">User name</label>
          <input type="text" id="new-author" name="new-author" placeholder="Not ready ;-) Your name">

          <!-- Title -->
          <label for="new-title">Title</label>
          <input type="text" id="new-title" name="new-title" placeholder="Not ready ;-) Your post title">

          <!-- New Message -->
          <label for="new-txt">Message</label>
          <textarea
            type="text"
            id="new-txt"
            name="new-txt"
            placeholder="What's on your mind?"
          >Not ready ;-)
          </textarea>

          <!--Old Message-->
          <label for="text">Post message</label>
          <input
            type="text"
            id="text"
            name="text"
            placeholder=" please type your message"
          />

          <!--Send Button-->
          <button id="new-send" name="new-send">Send</button>

        </form>
      </body>
    </html>
  `;

  response.end(html);
});

///posting function

const bodyParser = express.urlencoded({ extended: false });
server.post("/posting", bodyParser, (request, response) => {
  const newMessage = request.body;
  const name = newMessage.text;
  messageList[name] = newMessage;

  response.redirect("/message");
});

server.post("/delete-message", bodyParser, (request, response) => {
  const textToDelete = request.body.name;
  // console.log(textToDelete);
  delete messageList[textToDelete];

  response.redirect("/message");
});

const PORT = 4444;

server.listen(PORT, () => console.log(`http://localhost:${PORT}`));
