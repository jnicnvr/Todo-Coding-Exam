const controller = require('../controller/todo.controller')
const validate = require('../middleware/validation')

module.exports = (app) => {
    app.post("/api/todo/create", validate.validateTodo, controller.create);
    app.post("/api/todo/show", controller.show);
    app.patch("/api/todo/update", validate.validateUpdateTodo,controller.update);
    app.delete("/api/todo/delete",validate.validateDeleteTodo, controller.deleteTodo);
    app.post("/api/todo/pagination-search", controller.fetchAll);
}