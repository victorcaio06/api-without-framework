const encryptPassword = require("../../../../utils/encryptPassword");
const UserRepository = require("../../repositories/userRepository");

class UpdateUserUseCase {
  userRepository = new UserRepository();

  async execute(id, { name, username, email, password } = body) {
    let encryptPwd;
    
    const userExists = await this.userRepository.findById(id);

    if (!userExists) throw new Error("User not exists!");

    const usernameExists = await this.userRepository.findByUsername(username);

    if (usernameExists) throw new Error("Username already exists!");

    const emailExists = await this.userRepository.findByEmail(email);

    if (emailExists) throw new Error("Email already exists!");

    if (password) {
      encryptPwd = encryptPassword(password);
    }

    await this.userRepository.update(id, {
      name: name ? name : userExists.name,
      username: username ? username : userExists.username,
      email: email ? email : userExists.email,
      password: password ? encryptPwd.encryptedPassword : userExists.password,
      iv: password ? encryptPwd.iv : userExists.iv,
    });
  }
}

module.exports = UpdateUserUseCase;
