const encryptPassword = require("../../../../utils/encryptPassword");
const UserRepository = require("../../repositories/userRepository");

class CreateUserUseCase {
  userRepository = new UserRepository();

  async execute({ name, username, email, password } = body) {
    const userExists = await this.userRepository.findByUsername(username);

    if (userExists) throw new Error("Username already exists!");

    const encryptedPwd = encryptPassword(password);

    const user = await this.userRepository.create({ name, username, email, encryptedPwd });

    return user;
  }
}

module.exports = CreateUserUseCase;
