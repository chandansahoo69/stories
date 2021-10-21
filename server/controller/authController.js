const User = require("../models/User");
const bcrypt = require("bcryptjs");
const { validationResult } = require("express-validator");
const tokenService = require("../services/token-service");
const userService = require("../services/user-service");

class AuthController {
  async refresh(req, res) {
    // get refresh token from cookie
    const { refreshToken: refreshTokenTesting } = req.cookies;
    console.log("loading refreshToken: ", refreshTokenTesting);

    if (refreshTokenTesting == null) {
      return res.status(403).json({ message: "Refresh Token is required!" });
    }

    // check if token is valid
    let userData;
    try {
      userData = await tokenService.verifyRefreshToken(refreshTokenTesting);
      console.log("checking user in refresh route : ", userData);
    } catch (err) {
      console.log(err);
      return res.status(401).json({ message: "Invalid Token........" });
    }

    // Check if token is in db
    try {
      const token = await tokenService.findRefreshToken(refreshTokenTesting);
      console.log("loading token: ", token);
      if (!token) {
        return res.status(401).json({ message: "Invalid token" });
      }
    } catch (err) {
      console.log(err);
      return res.status(500).json({ message: "Internal error" });
    }

    // check if valid user
    const user = await userService.findUser({ _id: userData._id });
    if (!user) {
      return res.status(404).json({ message: "No user" });
    }
    console.log("refresh token user found: ", user);

    // Generate new tokens
    const { refreshToken, accessToken } = tokenService.generateTokens({
      _id: userData._id,
    });

    // Update refresh token
    try {
      await tokenService.updateRefreshToken(userData._id, refreshToken);
    } catch (err) {
      return res.status(500).json({ message: "Internal error" });
    }

    // put in cookie
    res.cookie("refreshToken", refreshToken, {
      maxAge: 1000 * 60 * 60 * 24 * 30,
      httpOnly: true,
    });

    res.cookie("accessToken", accessToken, {
      maxAge: 1000 * 60 * 60 * 24 * 30,
      httpOnly: true,
    });

    const { password, ...profile } = user._doc;
    res.status(200).json({ profile, accessToken, refreshToken });
    // const userDto = new UserDto(user);
    // res.json({ user: userDto, auth: true });
  }

  async register(req, res) {
    try {
      //hash the password
      const salt = await bcrypt.genSalt(10);
      const hashPass = await bcrypt.hash(req.body.password, salt);

      //if invalid credential
      if (!req.body.username || !req.body.email || !req.body.password) {
        res.status(500).json({ message: "All fields are required!!!" });
      }
      //create the user
      const newUser = new User({
        username: req.body.username,
        email: req.body.email,
        password: hashPass,
      });

      //save the user
      const user = await newUser.save();

      //restrict sending password to user
      const { password, ...others } = user._doc;
      //sent the user
      return res.status(200).json(others);
    } catch (error) {
      //internal server error 500
      console.log("registation ", error);
      res.status(500).json(error);
    }
  }

  async login(req, res) {
    try {
      //   console.log(req.body);
      //validation error
      const errors = validationResult(req);

      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      let user;
      //find the user with email
      try {
        user = await User.findOne({ email: req.body.email });
        console.log("login testing user=====>", user);
      } catch (error) {
        console.log("login user not found.");
        console.log(error);
      }

      //validate the password
      try {
        const validate = await bcrypt.compare(req.body.password, user.password);
        console.log("validating user password-------->", validate);
      } catch (error) {
        console.log("password doesn't match...");
        console.log(error);
      }

      //jwt token
      const { accessToken, refreshToken } = tokenService.generateTokens({
        _id: user._id,
      });

      //store the refreshTOken in database
      await tokenService.storeRefreshToken(refreshToken, user._id);

      //set the cookie for refresh token
      res.cookie("refreshToken", refreshToken, {
        maxAge: 1000 * 60 * 60 * 24 * 30,
        httpOnly: true, //security purpose
      });

      //set the cookie for access token
      res.cookie("accessToken", accessToken, {
        maxAge: 1000 * 60 * 60 * 24 * 30,
        httpOnly: true, //security purpose
      });

      //restrict sending password to user
      const { password, ...profile } = user._doc;
      res.status(200).json({ profile, accessToken, refreshToken });
    } catch (error) {
      console.log("Login error", error);
      res.status(500).json(error);
    }
  }

  async logout(req, res) {
    const { refreshToken } = req.cookies;

    console.log("refresh token in logout route->", refreshToken);

    //delete refresh token from db
    await tokenService.removeToken(refreshToken);

    //delete cookies
    res.clearCookie("refreshToken");
    res.clearCookie("accessToken");

    console.log("logout successfully........");

    //send the response
    res.status(200).json({ message: "you logged out successfully." });
  }
}

module.exports = new AuthController();
