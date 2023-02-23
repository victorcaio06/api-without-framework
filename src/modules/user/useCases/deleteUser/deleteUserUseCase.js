const UserRepository = require("../../repositories/userRepository");

class DeleteUserUseCase {
  userRepository = new UserRepository();

  async execute(id) {
    const userExists = this.userRepository.findById(id);

    if (!userExists) throw new Error("User not exists!");

    return await this.userRepository.delete(id);
    
  }
}

module.exports = DeleteUserUseCase;
