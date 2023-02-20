const UserRepository = require("../../repository/userRepository");

class ListUserUseCase {
  userRepository = new UserRepository();

  async execute() {
    return await this.userRepository.list();
  }
}

module.exports = ListUserUseCase;
