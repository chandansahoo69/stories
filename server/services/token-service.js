const jwt = require("jsonwebtoken");
const accessTokenSecret =
  "89b9e6229688948a8b7b8b4060b99ef0027633f78218458163153b0d6f3dc65aae238d5d584b6a3a504a9488b73b9d361338ab37dcfa0871c1fda4627f34904c";
const refreshTokenSecret =
  "5fe2b083e740d0eb900989dbd9caa297266e3917df4009c478e387bf200487f7b8739a41cb389a0030d3039f80318ae7db2eec3fb1e7a173e95cb55227b4e3f3";
const refreshModel = require("../models/Refresh");

class TokenService {
  generateTokens(payload) {
    const accessToken = jwt.sign(payload, accessTokenSecret, {
      expiresIn: "30s",
    });
    const refreshToken = jwt.sign(payload, refreshTokenSecret, {
      expiresIn: "1y",
    });
    return { accessToken, refreshToken };
  }

  async storeRefreshToken(token, userId) {
    try {
      await refreshModel.create({
        token,
        userId,
      });
    } catch (error) {
      console.log(error.message);
    }
  }
  async verifyAccessToken(token) {
    return jwt.verify(token, accessTokenSecret);
  }

  async verifyRefreshToken(refreshToken) {
    return jwt.verify(refreshToken, refreshTokenSecret);
  }

  async findRefreshToken(refreshToken) {
    try {
      return await refreshModel.findOne({
        token: refreshToken,
      });
    } catch (error) {
      console.log("token db error", error);
    }
  }

  async updateRefreshToken(userId, refreshToken) {
    return await refreshModel.updateOne(
      { userId: userId },
      { token: refreshToken }
    );
  }

  async removeToken(refreshToken) {
    return await refreshModel.deleteOne({ token: refreshToken });
  }
}

module.exports = new TokenService();
