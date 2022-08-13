const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const app = express();

module.exports = app;

/*potential client fix*/
/* app.use(express.static(__dirname + "/public"));
app.get("/", (req, res, next) => {
  res.sendFile("./index.html", { root: __dirname });
}); */

/* Do not change the following line! It is required for testing and allowing
 *  the frontend application to interact as planned with the api server
 */
const PORT = process.env.PORT || 4001;

// Add middleware for handling CORS requests from index.html
app.use(cors());

// Add middware for parsing request bodies here:
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Mount your existing apiRouter below at the '/api' path.
const apiRouter = require("./server/api");
app.use("/api", apiRouter);

// This conditional is here for testing purposes:
if (!module.parent) {
  // Add your code to start the server listening at PORT below:
  app.listen(PORT, () => {
    console.log("Listening on port:" + PORT);
  });
}
//error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send(err.message);
});
