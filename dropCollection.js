/**
 * @param method The HTTP method used
 * @param urlSuffix The suffix of url e.g investors, cases, etc...
 * @param params  The parameters of the request URL given in order.
 * @param body The body of the HTTP request.
 * @return Returns the complete URL for the request.
 */

async function httpRequest(method, urlSuffix, params = [], body = {}) {
  let url = "http://localhost:3000/api/" + urlSuffix + "/";
  for (let i = 0; i < params.length; i++) url += params[i] + "/";
  if (method === "GET") return await axios.get(url);
  else if (method === "POST") return await axios.post(url, body);
  else if (method === "PUT") return await axios.put(url, body);
  else if (method === "DELETE") return await axios.delete(url);
  return {};
}

const mongoose = require("mongoose");
const db = require("./config/keys").mongoURI;

function doIt(command, collection_name) {
  if(command === false) {
    mongoose.connection.on("open", function(ref) {
      console.log("Connected to mongo server.");
      //trying to get collection names
      mongoose.connection.db.listCollections().toArray(function(err, names) {
        console.log(names); // [{ name: 'dbname.myCollection' }]
      });
    });
  } else {
    mongoose.connection.on("open", async function(ref) {
      console.log("Connected to mongo server.");
      await mongoose.connection.dropCollection(String(collection_name), async (err, result) => {
        if (err) console.log("error Dropping the Collection");
        else console.log("Collection dropped");
      });
    });
  }
}

doIt(true, "lawyers");
doIt(true, "externalentities");
doIt(true, "reviewers");
doIt(true, "cases");
doIt(true, "investors");
doIt(true, "notifications");
doIt(true, "casestests");
doIt(true, "admins");
doIt(true, "companies");

doIt(false, "companies");

//Connecting to MongoDB
mongoose
  .connect(db)
  .then(() => console.log("Connected to MongoDB"))
  .catch(err => console.log(err));

