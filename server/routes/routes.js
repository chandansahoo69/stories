const authController = require("../controller/authController");
const postController = require("../controller/postController");
const userController = require("../controller/userController");
const authMiddleware = require("../middlewares/authMiddleware");

const { check } = require("express-validator");
//init router
const router = require("express").Router();

//refresh token route
router.post("/refresh", authController.refresh);

//auth routes
router.post("/auth/logout", authMiddleware, authController.logout);
router.post("/auth/register", authController.register);
router.post(
  "/auth/login",
  [
    //validation for email and password
    check("email", "Please provide a valid email").isEmail(),
    check(
      "password",
      "Please provide a password greater than 6 character"
    ).isLength({ min: 6 }),
  ],
  authController.login
);
router.post("/logout", authMiddleware, authController.logout);

//user routes
router.put("/user/:id", authMiddleware, userController.updateProfile);
router.delete("/user/:id", authMiddleware, userController.deleteProfile);
router.get("/user/:id", userController.getOneUser);

//posts routes
router.post("/posts", authMiddleware, postController.createPost);
router.post("/user/posts", postController.getUserPosts);
router.put("/posts/:id", authMiddleware, postController.updatePost);
router.put("/post/:id/likePost", authMiddleware, postController.likePost);
router.delete("/posts/:id", authMiddleware, postController.deletePost);
router.get("/posts", postController.getAllPost);
router.get("/posts/:id", postController.getOnePost);

module.exports = router;
