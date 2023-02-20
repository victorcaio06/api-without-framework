const { randomUUID } = require("crypto");

const client = require("../../../infra/postgres/database");

class UserRepository {
  constructor() {
    this.client = client;
  }

  async create({ name, username, email }) {
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
    const { rows } = await client.query("SELECT * FROM USERS");

    return rows;
  }

  async findById(id) {
    const query = "SELECT * FROM USERS WHERE ID = $1 LIMIT 1";

    const { rows } = await this.client.query(query, [id]);

    if (rows.length > 0) return rows[0];

    return null;
  }

  async findByUsername(username) {
    const query = "SELECT * FROM USERS WHERE USERNAME = $1 LIMIT 1";

    const { rows } = await this.client.query(query, [username]);

    if (rows.length > 0) return rows[0];

    return null;
  }

  async update(id, { name, username, email } = body) {
    const query =
      "UPDATE USERS SET NAME = $1, USERNAME = $2, EMAIL = $3 WHERE ID = $4 ";
    await this.client.query(query, [name, username, email, id]);
  }
}

module.exports = UserRepository;
