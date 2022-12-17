const Post = require("../models/post");

exports.getPosts = (req, res, next) => {
  Post.find()
    .then((requests) => {
      console.log(requests);
      res.status(200).json(requests);
    })
    .catch((err) => res.status(500).json({ error: err.message }));
};

exports.getPostById = (req, res, next) => {
  const id = req.params.id;

  Post.findById(id)
    .then((requests) => {
      console.log(requests);
      res.status(200).json(requests);
    })
    .catch((err) => res.status(500).json({ error: err.message }));
};

exports.addPost = (req, res, next) => {
  const { title, content, category } = req.body;

  const isTitleValid = (title) => title.trim().length > 0;
  const isContentValid = (content) => content.trim().length > 0;
  const isCategoryValid = () => {
    switch (category) {
      case "Blog":
      case "Event":
      case "Medical Helps":
      case "Article":
      case "Donation":
      case "Educational Visit":
      case "Festival Celebration":
        return true;

      default:
        return false;
    }
  };

  if (!isTitleValid(title)) {
    return res.status(422).json({ error: "Title can't be empty" });
  } else if (!isContentValid(content)) {
    return res
      .status(422)
      .json({ error: "Enter at least some characters in content" });
  } else if (!isCategoryValid(category)) {
    return res.status(422).json({ error: "Select a valid category" });
  }

  const post = new Post({
    title: title.trim(),
    content: content.toString(),
    category: category,
    createdAt: new Date().toISOString(),
    lastUpdated: new Date().toISOString(),
  });

  Post.findOne({ title: title.trim() })
    .then((data) => {
      if (!data) {
        post
          .save()
          .then(() => {
            console.log("Added Data");
            return res
              .status(200)
              .json({ message: "Post Created Successfully" });
          })
          .catch((err) => res.status(500).json({ error: err.message }));
      } else if (data.title === title.trim()) {
        return res.status(500).json({ error: "Post with same title exist" });
      }
    })
    .catch((err) => res.status(500).json({ error: err.message }));
};

exports.editPost = (req, res, next) => {
  const id = req.params.id;

  const { title, content, category } = req.body;

  const isTitleValid = (title) => title.trim().length > 0;
  const isContentValid = (content) => content.trim().length > 0;
  const isCategoryValid = () => {
    switch (category) {
      case "Blog":
      case "Event":
      case "Medical Helps":
      case "Article":
      case "Donation":
      case "Educational Visit":
      case "Festival Celebration":
        return true;

      default:
        return false;
    }
  };

  if (!isTitleValid(title)) {
    return res.status(422).json({ error: "Title can't be empty" });
  } else if (!isContentValid(content)) {
    return res
      .status(422)
      .json({ error: "Enter at least some characters in content" });
  } else if (!isCategoryValid(category)) {
    return res.status(422).json({ error: "Select a valid category" });
  }

  Post.findById(id)
    .then((post) => {
      if (!post) {
        return res
          .status(422)
          .json({ error: "Couldn't find a post with this id" });
      }
      post.title = title.trim();
      post.content = content.toString();
      post.category = category.trim();
      post.lastUpdated = new Date().toISOString();
      return post.save();
    })
    .then((result) => {
      res
        .status(200)
        .json({ message: "Post Updated Successfully", post: result });
    })
    .catch((err) => res.status(500).json({ error: err.message }));
};

exports.deletePost = (req, res, next) => {
  const id = req.params.id;
  Post.findByIdAndRemove(id)
    .then((data) => {
      if (!data) {
        return res.status(422).json({ error: "Couldn't find Data" });
      } else {
        return res.status(200).json({ message: "Data Deleted" });
      }
    })
    .catch((err) => res.status(500).json({ error: err.message }));
};
