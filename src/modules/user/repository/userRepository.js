const { randomUUID } = require("crypto");

const client = require("../../../infra/postgres/database");

class UserRepository {
  constructor() {
    this.client = client;
  }

  async create({ name, username, email } = body) {
    const id = randomUUID();

    await this.client.query(
      "INSERT INTO USERS(ID, NAME, USERNAME, EMAIL) VALUES($1, $2, $3, $4)",
      [id, name, username, email]
    );

    const user = Object.assign({
      name,
      username,
      email,
      id,
    });

    return user;
  }

  async list() {
    const users = await client.query("SELECT * FROM USERS");

    return users.rows;
  }
}

module.exports = UserRepository;
