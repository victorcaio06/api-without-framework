const encryptPassword = require("../../../../utils/encryptPassword");
const UserRepository = require("../../repositories/userRepository");

class CreateUserUseCase {
  userRepository = new UserRepository();

  async execute({ name, username, email, password } = body) {
    const usernameExists = await this.userRepository.findByUsername(username);

    if (usernameExists) throw new Error("Username already exists!");

    const emailExists = await this.userRepository.findByEmail(email);

    if (emailExists) throw new Error("Email already exists!");

    const encryptedPwd = encryptPassword(password);

    const user = await this.userRepository.create({
      name,
      username,
      email,
      encryptedPwd,
    });

    return user;
  }
}

module.exports = CreateUserUseCase;
