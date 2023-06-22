const {
  create,
  show,
  update,
  deleteTodo,
  fetchAll,
} = require("../service/todo.service");
const { successModel, failModel } = require("../models/response.model");

module.exports = {
  //create
  fetchAll: (req, res) => {
    fetchAll(req.body, (isSuccess, data) => {
      if (isSuccess) {
        res
          .status(200)
          .send({ ...successModel, message: "Success on insert", data });
      } else {
        res.status(500).send({ ...failModel, error: data });
      }
    });
  },
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
  //show
  show: (req, res) => {
    show(req.body, (isSuccess, data) => {
      if (isSuccess) {
        res
          .status(200)
          .send({ ...successModel, message: "Success on search", data });
      } else {
        res.status(500).send({ ...failModel, error: data });
      }
    });
  },
  //update
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
  //delete
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
