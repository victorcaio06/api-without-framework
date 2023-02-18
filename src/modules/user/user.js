const UserRepository = require("./repository/userRepository");

let users = [];

class User {
  constructor() {
    this.userRepository = new UserRepository();
  }

  async create(body) {
    return await this.userRepository.create(body);
  }

  findById(id) {
    const user = users.findIndex((user) => user.id === id);

    if (user < 0) {
      throw new Error("User not found!");
    }

    return user;
  }

  update(id, body) {
    const userIndex = this.findById(id);

    users[userIndex] = {
      name: body.name ? body.name : users[userIndex].name,
      username: body.username ? body.username : users[userIndex].username,
      email: body.email ? body.email : users[userIndex].email,
      id,
    };
  }

  async list() {
    return await this.userRepository.list();
  }
}

module.exports = new User();
