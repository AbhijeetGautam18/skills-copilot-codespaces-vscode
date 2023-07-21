// Create web server
// 1. Create a web server
// 2. Load the comments.html
// 3. Load the comments.json
// 4. Parse the comments.json
// 5. Output the comments.json to comments.html
// 6. Send the comments.html to the client

// 1. Create a web server
const http = require("http");
const fs = require("fs");
const port = 3000;
const hostname = "localhost";

// 2. Load the comments.html
const server = http.createServer((req, res) => {
  res.statusCode = 200;
  res.setHeader("Content-Type", "text/html");

  // 3. Load the comments.json
  fs.readFile("comments.json", "utf-8", (err, data) => {
    if (err) {
      console.log(err);
    } else {
      // 4. Parse the comments.json
      const obj = JSON.parse(data);
      let html = "";

      // 5. Output the comments.json to comments.html
      for (let i = 0; i < obj.length; i++) {
        html += `
          <div>
            <p>Author: ${obj[i].author}</p>
            <p>Message: ${obj[i].message}</p>
          </div>
        `;
      }

      // 6. Send the comments.html to the client
      res.end(`
        <!DOCTYPE html>
        <html lang="en">
          <head>
            <meta charset="UTF-8" />
            <title>Comments</title>
          </head>
          <body>
            <h1>Comments</h1>
            ${html}
          </body>
        </html>
      `);
    }
  });
});

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});