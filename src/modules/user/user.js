const UserRepository = require("./repository/userRepository");

class User {
  constructor() {
    this.userRepository = new UserRepository();
  }

  async create(body) {
    return await this.userRepository.create(body);
  }

  // findById(id) {
  //   const user  = this.userRepository.findById(id);

  //   return user;
  // }

  async update(id, body) {
    const userExists = await this.userRepository.findById(id);

    if (!userExists) {
      throw new Error("User not found!");
    }

    await this.userRepository.update(userExists.id, body);
  }

  async list() {
    return await this.userRepository.list();
  }
}

module.exports = new User();
