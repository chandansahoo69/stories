const Post = require("../models/Post");

class UserController {
  async createPost(req, res) {
    const newPost = new Post(req.body);
    try {
      //save the post
      const savedPost = await newPost.save();
      console.log(savedPost);
      res.status(200).json(savedPost);
    } catch (error) {
      //internal server error 500
      console.log("post error ", error);
      res.status(500).json(error);
    }
  }

  async updatePost(req, res) {
    try {
      console.log("post data----->", req.body);
      const post = await Post.findByIdAndUpdate(req.params.id);
      if (post.username === req.body.username) {
        try {
          const updatedPost = await Post.findByIdAndUpdate(
            req.params.id,
            {
              $set: req.body,
            },
            { new: true }
          );
          res.status(200).json(updatedPost);
        } catch (error) {
          console.log(error);
        }
      } else {
        res.status(401).json({ message: "You can't update anyones post!!!" });
      }
    } catch (error) {
      //internal server error 500
      console.log("post error ", error);
      res.status(500).json(error);
    }
  }
  async deletePost(req, res) {
    try {
      const post = await Post.findByIdAndUpdate(req.params.id);
      if (post.username === req.body.username) {
        try {
          //delete the post
          await post.delete();
          console.log("delete post successfully");
          res.status(200).json({ message: "delete post successfully." });
        } catch (error) {
          console.log(error);
        }
      } else {
        res.status(401).json({ message: "You can't delete anyones post!!!" });
      }
    } catch (error) {
      //internal server error 500
      console.log("post error ", error);
      res.status(500).json(error);
    }
  }

  async getAllPost(req, res) {
    const username = req.query.user;
    const catName = req.query.cat;
    try {
      let posts;
      //fetch post according to username
      if (username) {
        posts = await Post.find({ username });
        console.log("username posts---------->", posts);
      } else if (catName) {
        //fetch post according to category name
        posts = await Post.find({
          categories: {
            $in: [catName],
          },
        });
        console.log("cat posts---------->", posts);
      } else {
        //else find all the posts
        posts = await Post.find();
        console.log("all posts---------->", posts);
      }
      res.status(200).json(posts);
    } catch (err) {
      res.status(500).json(err);
    }
  }
  async getUserPosts(req, res) {
    const { username } = req.body;
    console.log("username", username);
    try {
      let posts;
      //fetch post according to username
      if (username) {
        posts = await Post.find({ username });
        console.log("username posts---------->", posts);
      }
      res.status(200).json(posts);
    } catch (err) {
      res.status(500).json(err);
    }
  }

  async getOnePost(req, res) {
    try {
      const post = await Post.findById(req.params.id);
      console.log(post);
      res.status(200).json(post);
    } catch (err) {
      res.status(500).json(err);
    }
  }

  async likePost(req, res) {
    const { id } = req.params;
    console.log("post id to be liked", id);
    if (!req.user._id) {
      return res.json({ message: "Unauthenticated" });
    }
    console.log("userid", req.user._id);

    try {
      const post = await Post.findById({ _id: id });
      console.log("post to be liked", post);
      const index = post.likes.findIndex((id) => id === String(req.user._id));
      console.log("check index", index);
      if (index === -1) {
        //like the post by that user
        post.likes.push(req.user._id);
      } else {
        //dislike the post
        post.likes = post.likes.filter((id) => id !== String(req.user._id));
      }
      console.log("like arr", post.likes);
      const updatedPost = await Post.findByIdAndUpdate({ _id: id }, post, {
        new: true,
      });
      console.log("updated", updatedPost);
      res.status(200).json(updatedPost);
    } catch (err) {
      console.log(err);
    }
  }
}

module.exports = new UserController();
