const { create, update, deleteTodo } = require("../service/todo.service");
const { successModel, failModel } = require("../models/response.model");

module.exports = {
  create: (req, res) => {
    create(req.body, (isSuccess, data) => {
      if (isSuccess) {
        res
          .status(200)
          .send({ ...successModel, message: "Success on insert", data });
      } else {
        res.status(500).send({ ...failModel, error: data });
      }
    });
  },
  update: (req, res) => {
    update(req.body, (isSuccess, data) => {
      if (isSuccess) {
        res
          .status(200)
          .send({ ...successModel, message: "Success on insert", data });
      } else {
        res.status(500).send({ ...failModel, error: data });
      }
    });
  },
  deleteTodo: (req, res) => {
    deleteTodo(req.body, (isSuccess, data) => {
      if (isSuccess) {
        res.status(200).send({ ...successModel, message: "Deleted", data });
      } else {
        res.status(500).send({ ...failModel, error: data });
      }
    });
  },
};
