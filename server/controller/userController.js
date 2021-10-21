const User = require("../models/User");
const Post = require("../models/Post");
const bcrypt = require("bcryptjs");

class UserController {
  async updateProfile(req, res) {
    //if different user try to delete or update your account
    if (req.body.userId === req.params.id) {
      //update the password
      if (req.body.password) {
        const salt = await bcrypt.genSalt(10);
        req.body.password = await bcrypt.hash(req.body.password, salt);
      }
      try {
        //update the user with new data
        const updateUser = await User.findByIdAndUpdate(
          req.params.id,
          {
            $set: req.body,
          },
          { new: true }
        );
        const { password, ...others } = updateUser._doc;
        console.log("updateUser : ", updateUser);
        res.status(200).json({ profile: others });
      } catch (error) {
        //internal server error 500
        console.log("updateUser error ", error);
        res.status(500).json(error);
      }
    } else {
      res.status(401).json({ message: "You can't update anyone's account!!!" });
    }
  }

  async deleteProfile(req, res) {
    //if different user try to delete or update your account
    if (req.body.userId === req.params.id) {
      try {
        //first find the user to delete all his posts
        const user = await User.findById(req.params.id);
        try {
          //delete all the post of the user by his name
          await Post.deleteMany({ username: user.username });
          //delete the user by its id
          await User.findByIdAndDelete(req.params.id);
          console.log("Delete user successfully");
          res
            .status(200)
            .json({ message: "User has been deleted successfully" });
        } catch (error) {
          //internal server error 500
          res.status(500).json(error);
        }
      } catch (error) {
        res.status(404).json({ message: "User not found" });
      }
    } else {
      res.status(401).json({ message: "You can't delete anyone's account!!!" });
    }
  }

  async getOneUser(req, res) {
    try {
      const user = await User.findById(req.params.id);
      //send data except password
      const { password, ...others } = user._doc;
      res.status(200).json(others);
    } catch (err) {
      res.status(500).json(err);
    }
  }
}

module.exports = new UserController();
