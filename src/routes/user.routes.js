const CreateUserController = require("../modules/user/useCases/createUser/createUserController");
const ListUserController = require("../modules/user/useCases/listUser/listUserController");
const UpdateUserController = require("../modules/user/useCases/updateUser/updateUserController");

const createUserController = new CreateUserController();
const listUserController = new ListUserController();
const updateUserController = new UpdateUserController();

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
];

module.exports = router;
