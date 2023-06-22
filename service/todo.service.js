const db = require("../config/database.config");
const config = require("../config/config");
const utils = require("../utils/utils");

module.exports = {
  fetchAll: async (data,callback) => {
    const todoDB = db.client
      .db(config.database)
      .collection(config.collections[0]);
    const options = {
      skip: (data.page - 1) * data.limit,
      limit: data.limit,    
      sort:{[data.sort]: data.order}
    };
    console.log(options)
    try {
      await db.connectToDB();
      const res = await todoDB.find({},options).toArray();
     if (res.length === 0) {
       console.log("success on pagination search", res);
       callback(true, "No Results Found!");
     } else {
       console.log("success on pagination search", res);
       callback(true, res);
     }
    } catch (err) {
      console.error(`Error in error ${err}`);
      callback(false, err);
    } finally {
      await db.client.close();
    }
  },
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
      console.log("success on inserting", res);
      callback(true, utils.uuid, utils.todoNo);
    } catch (err) {
      console.error(`Error in error ${err}`);
      callback(false, err);
    } finally {
      await db.client.close();
    }
  },
  show: async (data, callback) => {
    const todoDB = db.client
      .db(config.database)
      .collection(config.collections[0]);

    const query = {
      [data.searchBy]: data.searchValue,
    };
    const options = {
      skip: (data.page - 1) * data.limit,
      limit: data.limit,
    };
    try {
      await db.connectToDB();
      const res = await todoDB.find(query, options).toArray();
      if (res.length === 0) {
        console.log("success on single search", res);
        callback(true, "No Results Found!");
      } else {
        console.log("success on single search", res);
        callback(true, res);
      }
    } catch (err) {
      console.error(`Error in single search ${err}`);
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
