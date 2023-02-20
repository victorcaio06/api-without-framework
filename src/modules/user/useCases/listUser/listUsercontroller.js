const ListUserUseCase = require("./listUserUseCase");

class ListUserController {
  listUserUseCase = new ListUserUseCase();

  async handle() {
    return await this.listUserUseCase.execute(); 
  }
}

module.exports = ListUserController;
