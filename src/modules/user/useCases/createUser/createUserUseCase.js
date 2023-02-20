const UserRepository = require("../../repository/userRepository");

class CreateUserUseCase {
  userRepository = new UserRepository();

  async execute({ name, username, email } = body) {
    const userExists = await this.userRepository.findByUsername(username);

    if (userExists) throw new Error("Username already exists!");

    const user = await this.userRepository.create({ name, username, email });

    return user;
  }
}

module.exports = CreateUserUseCase;
