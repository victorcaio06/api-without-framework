const CreateUserController = require("../modules/user/useCases/createUser/createUserController");
const DeleteUserController = require("../modules/user/useCases/deleteUser/deleteUserController");
const ListUserController = require("../modules/user/useCases/listUser/listUserController");
const UpdateUserController = require("../modules/user/useCases/updateUser/updateUserController");

const createUserController = new CreateUserController();
const listUserController = new ListUserController();
const updateUserController = new UpdateUserController();
const deleteUserController = new DeleteUserController();

const router = [
  {
    url: "/users",
    method: "post",
    controller: createUserController.handle,
  },
  {
    url: "/users",
    method: "get",
    controller: listUserController.handle,
  },
  {
    url: "/users/:id",
    method: "put",
    controller: updateUserController.handle,
  },
  {
    url: "/users/:id",
    method: "delete",
    controller: deleteUserController.handle,
  },
];

module.exports = router;
