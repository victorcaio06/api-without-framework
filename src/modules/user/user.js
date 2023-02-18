const { randomUUID } = require("crypto");

let users = [];

class User {
  constructor() {}

  create(body) {
    const userSave = {
      ...body,
      id: randomUUID(),
    };

    users.push(userSave);

    return userSave;
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

  list() {
    return users;
  }


}

module.exports = new User();
