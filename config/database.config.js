const { MongoClient, ServerApiVersion } = require("mongodb");
const dbconfig = require('./config')

const client = new MongoClient(dbconfig.uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverApi: ServerApiVersion.v1,
});

module.exports = {
  client,
  connectToDB: async () => {
    try {
      await client.connect();
      console.log("connected!");
    } catch (err) {
      console.log("Err", err);
      if (err.name === "MongoServerClosedError") {
        console.log("MongoDB server closed. Retrying connection...");
        // Retry the connection after a certain interval
        setTimeout(connectToDB(), 5000);
      } else {
        console.error("Error connecting to MongoDB:", error);
      }
    }
  },
};