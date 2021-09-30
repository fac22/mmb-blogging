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
        <link rel="icon" href="./images/to_do_list_icon-icons.com_76974.ico" type="image/ico">

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
      <div  class="taskMessage">
        <div>
        <span>${message.title}</span>
        <span>${message.author}</span>
        <span>${message.text}</span>
        </div>
        <form action="/delete-message" method="POST" style="display: inline;">
        
          <button name="name" value="${message.title}" aria-label="Delete ${message.title}">
            <img src="https://img.icons8.com/office/16/000000/delete-sign.png">

            <!-- &times; -->
          </button>
        </form>
      </div>
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
     ${items}
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
        <link rel="icon" href="./Icon:image/to_do_list_icon-icons.com_76974.ico" type="image/ico">
        <link rel="stylesheet" type="text/css" href="./style.css">
        <link rel="stylesheet" type="text/css" href="./posting.css">
        <title>Posting</title>
      </head>
      <body>
        <form method="POST" class="stack-md center width-sm justify-space-between">
          <!-- // Author -->
          <label for="new-author">User name</label>
          <input type="text" id="new-author" name="newAuthor" placeholder="Your name" required>

          <!-- Title -->
          <label for="new-title">Title</label>
          <input type="text" id="new-title" name="newTitle" placeholder="Your post title" required>

          <!-- New Message -->
          <label for="new-txt">Message</label>
          <textarea
            id="new-xt"
            name="newTxt"
            placeholder="What's on your mind?"
          required>
          </textarea>

          <!--Old Message-->
          <!--<label for="text">Post message</label>
          <input
            type="text"
            id="text"
            name="text"
            placeholder=" please type your message">
          -->

          <!--Send Button-->
          <button id="new-send" name="new-send" aria-label="Send post">Send</button>

        </form>
      </body>
    </html>
  `;

  response.end(html);
});

///posting function

const bodyParser = express.urlencoded({ extended: false });
server.post("/posting", bodyParser, (request, response) => {
  // Access user-submission
  const newSubmission = request.body;

  // Build obj for this post
  const newAuthor = newSubmission.newAuthor;
  const newTitle = newSubmission.newTitle;
  const newMessage = newSubmission.newTxt;

  const newObj = {
    author: newAuthor,
    title: newTitle,
    text: newMessage,
  };
  console.log(newObj);

  // add post-obj to our message-list
  // const label = newTitle;
  // messageList[label] = newSubmission;

  messageList[newTitle] = newObj;

  // redirect
  response.redirect("/message");
});

server.post("/delete-message", bodyParser, (request, response) => {
  //we are taking button -> name/value -> get the ${message.title}
  const textToDelete = request.body.name;
  console.log(textToDelete);
  // console.log(typeof textToDelete);

  delete messageList[textToDelete];

  response.redirect("/message");
});

const PORT = 4444;

server.listen(PORT, () => console.log(`http://localhost:${PORT}`));
