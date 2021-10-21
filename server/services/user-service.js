const UserModel = require("../models/User");

class UserService {
  async findUser(filter) {
    //find the user present or not
    const user = await UserModel.findOne(filter);
    return user;
  }
  async createUser(data) {
    const user = await UserModel.create(data);
    return user;
  }
}

module.exports = new UserService();
