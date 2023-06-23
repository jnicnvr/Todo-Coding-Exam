const db = require("../config/database.config");
const config = require("../config/config");
const utils = require("../utils/utils");

module.exports = {
  create: async (data, callback) => {
    const todoDB = db.client
      .db(config.database)
      .collection(config.collections[0]);
    try {
      await db.connectToDB();
      const res = await todoDB.find({
        _id: utils.uuid,
        todoNo: utils.todoNo,
        title: data.title,
        context: data.context,
        createdAt: utils.momentDateNow,
        updateAt: utils.momentDateNow,
      });
      console.log("success on inserting", res.data);
      callback(true, utils.uuid, utils.todoNo);
    } catch (err) {
      console.error(`Error in error ${err}`);
      callback(false, err);
    } finally {
      await db.client.close();
    }
  },
  update: async (data, callback) => {
    const todoDB = db.client
      .db(config.database)
      .collection(config.collections[0]);
    try {
      await db.connectToDB();
      const res = await todoDB.updateOne(
        {
          _id: data.id,
        },
        { $set: { title: data.title, context: data.context } }
      );
      console.log("success on update", res);
      callback(true, { id: data.id, ...res });
    } catch (err) {
      console.error(`Error in error ${err}`);
      callback(false, null);
    } finally {
      await db.client.close();
    }
  },
  deleteTodo: async (data, callback) => {
    const todoDB = db.client
      .db(config.database)
      .collection(config.collections[0]);
    try {
      await db.connectToDB();
      const res = await todoDB.deleteOne({ _id: data.id });
      console.log("success on deleting", res);
      if (res.deletedCount === 0) {
        callback(true, "No documents matching the criteria were found.");
      } else {
        callback(true, data.id);
      }
    } catch (err) {
      console.error(`Error in deleting ${err}`);
      callback(false, err);
    } finally {
      await db.client.close();
    }
  },
};
