const ListUserUseCase = require("./listUserUseCase");

class ListUserController {
  listUserUseCase = new ListUserUseCase();

  async handle(request, response) {
    const users = await this.listUserUseCase.execute();

    return response.end(JSON.stringify(users));
  }
}

module.exports = ListUserController;
