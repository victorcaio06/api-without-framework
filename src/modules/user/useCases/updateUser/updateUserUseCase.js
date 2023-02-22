const encryptPassword = require("../../../../utils/encryptPassword");
const UserRepository = require("../../repositories/userRepository");

class UpdateUserUseCase {
  userRepository = new UserRepository();

  async execute(id, { name, username, email, password } = body) {
    const userExists = await this.userRepository.findById(id);

    if (!userExists) throw new Error("User not exists!");

    const usernameExists = await this.userRepository.findByUsername(username);

    if (usernameExists) throw new Error("Username exists!");

    const encryptPwd = encryptPassword(password);

    await this.userRepository.update(id, {
      name: name ? name : userExists.name,
      username: username ? username : userExists.username,
      email: email ? email : userExists.email,
      password: password ? encryptPwd.encryptedPassword : userExists.password,
      iv: encryptPwd.iv,
    });
  }
}

module.exports = UpdateUserUseCase;
