const UserRepository = require("../../repository/userRepository");

class UpdateUserUseCase {
  userRepository = new UserRepository();

  async execute(id, { name, username, email } = body) {
    const userExists = await this.userRepository.findById(id);

    if (!userExists) throw new Error("User not exists!");

    const usernameExists = await this.userRepository.findByUsername(username);

    if (usernameExists) throw new Error("Username exists!");

    await this.userRepository.update(id, {
      name: name ? name : userExists.name,
      username: username ? username : userExists.username,
      email: email ? email : userExists.email,
    });
  }
}

module.exports = UpdateUserUseCase;
