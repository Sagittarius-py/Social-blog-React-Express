const express = require("express");
const db = require("./config/db");
const cors = require("cors");
const path = require("path");
const multer = require("multer");
const mysql = require("mysql");
const bodyParser = require("body-parser");
const app = express();

const PORT = process.env.PORT || 3002;

app.use(cors());
app.use(express.static("public"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

db.connect(function (err) {
  if (err) {
    return console.error("error: " + err.message);
  }
  console.log("Connected to the MySQL server.");
});

const storage = multer.diskStorage({
  destination: (req, file, callBack) => {
    callBack(null, "./public/images");
  },
  filename: (req, file, callBack) => {
    callBack(null, Date.now() + file.originalname);
  },
});

let upload = multer({ storage: storage });

// Get all posts and photos
app.get("/api/get", (req, res) => {
  db.query(
    "SELECT DISTINCT posts.*, photos.*, users.userName FROM posts \
    INNER JOIN photos ON posts.post_id = photos.post_id INNER JOIN users ON \
    posts.id_user = users.id_user GROUP BY posts.post_id;",
    (err, result) => {
      if (err) {
        console.log(err);
      }
      console.log(err, result);
      res.send(result);
    }
  );
});

// Route to get one post
app.get("/api/getFromId/:id", (req, res) => {
  const id = req.params.id;
  db.query(
    "SELECT * FROM posts INNER JOIN photos ON posts.post_id = photos.post_id WHERE posts.post_id = ?",
    id,
    (err, result) => {
      if (err) {
        console.log(err);
      }
      res.send(result);
    }
  );
});

app.post("/api/create", upload.array("files"), (req, res) => {
  const userId = req.body.userId;
  const title = req.body.title;
  const text = req.body.text;
  db.query(
    "INSERT INTO posts (title, post_text, id_user) VALUES (?,?,?)",
    [title, text, userId],
    (err, result) => {
      console.log(result);
      if (!req.files) {
        console.log("No file upload");
      } else if (req.files.length == 1) {
        // console.log(result);
        db.query(
          "INSERT INTO photos(photoName, post_id)VALUES(?,?)",
          [req.files[0].filename, result.insertId],
          (err, result) => {
            if (err) throw err;
            console.log("file uploaded");
          }
        );
      } else {
        req.files.map((file) => {
          console.log(file.filename);
          var img_src = "http://127.0.0.1:3002/images/" + file.filename;
          db.query(
            "INSERT INTO photos(photoName, post_id)VALUES(?,?)",
            [file.filename, result.insertId],
            (err, result) => {
              if (err) throw err;
              console.log("file uploaded");
            }
          );
        });
      }
    }
  );

  db.query(
    "UPDATE users SET postCount = postCount + 1 WHERE id_user = ?",
    userId,
    (err, res) => {
      console.log(err, res);
      if (err) {
        console.log(err);
      }
    }
  );
});

// Route for like
app.post("/api/like/:id", (req, res) => {
  const id = req.params.id;
  const userId = req.body.userId;
  console.log(id);
  db.query(
    "UPDATE posts SET likes = likes + 1 WHERE post_id = ?",
    id,
    (err, res) => {
      if (err) {
        console.log(err);
      }
      console.log(res);
    }
  );

  db.query(
    "UPDATE users SET likesCount = likesCount + 1 WHERE id_user = ?",
    userId,
    (err, res) => {
      console.log(err, res);
      if (err) {
        console.log(err);
      }
    }
  );
});

// Route to delete a post

app.delete("/api/delete/:id", (req, res) => {
  const id = req.params.id;
  console.log(req.params);
  db.query("DELETE FROM posts WHERE post_id= ?", id, (err, result) => {
    if (err) {
      console.log(err);
    }
  });
});

app.listen(PORT, () => {
  console.log(`Server is running on ${PORT}`);
});

// ----------------------- USERS

// Route for creating the user
app.post("/api/createUser", upload.single("profilePic"), (req, res) => {
  const username = req.body.username;
  const password = req.body.password;
  const access_lvl = req.body.access_lvl;
  const about = req.body.about;
  const profilePic = req.file.filename;
  // console.log(username, password, access_lvl, about, profilePic);
  db.query(
    "INSERT INTO users (userName, password, access_lvl, about, profilePic) VALUES (?,?,?,?,?)",
    [username, password, access_lvl, about, profilePic],
    (err, result) => {
      if (err) {
        console.log(err);
      }
      console.log(result);
    }
  );
});

app.get("/api/getUsers/:username", (req, res) => {
  const username = req.params.username;
  db.query(
    "SELECT * FROM users WHERE userName = ?",
    username,
    (err, result) => {
      if (err) {
        console.log(err);
      }
      res.send(result);
    }
  );
});

app.get("/api/getUsers/", (req, res) => {
  db.query("SELECT userName, profilePic FROM users", (err, result) => {
    if (err) {
      console.log(err);
    }
    res.send(result);
  });
});

app.post("/api/writeComment/:id", (req, res) => {
  const userId = req.body.userId;
  const text = req.body.text;
  const postId = req.params.id;

  db.query(
    "INSERT INTO comments ( commentText, post_id, user_id) VALUES (?,?,?)",
    [text, postId, userId],
    (err, result) => {
      if (err) {
        console.log(err);
      }
      console.log(result);
    }
  );
});

app.get("/api/getComments/:id", (req, res) => {
  const postId = req.params.id;
  db.query(
    "SELECT comments.*, users.userName FROM comments INNER JOIN users ON comments.user_id = users.id_user WHERE post_id = ?",
    postId,
    (err, result) => {
      if (err) {
        console.log(err);
        console.log(result);
      }
      res.send(result);
    }
  );
});

app.delete("/api/deleteComment/:id", (req, res) => {
  const id = req.params.id;

  db.query("DELETE FROM comments WHERE IDcomment= ?", id, (err, result) => {
    if (err) {
      console.log(err);
    }
  });
});
