const express = require("express");
const db = require("./config/db");
const cors = require("cors");
const path = require("path");
const multer = require("multer");
const mysql = require("mysql");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const fs = require("fs");

const app = express();

const PORT = process.env.PORT || 3002;

app.use(
  cors({
    origin: "http://localhost:3000",
    optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
  })
);
app.use(function (req, res, next) {
  res.header("Content-Type", "application/json;charset=UTF-8");
  res.header("Access-Control-Allow-Credentials", true);
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});
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
    "SELECT DISTINCT posts.*, photos.*, users.* FROM posts \
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

app.get("/api/getPostsByUser/:id", (req, res) => {
  const user_id = req.params.id;
  db.query(
    "SELECT DISTINCT posts.*, photos.* FROM posts \
    INNER JOIN photos ON posts.post_id = photos.post_id WHERE posts.id_user = ? GROUP BY posts.post_id ;",
    parseInt(user_id),
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

// ----------------------- USERS

// Route for creating the user
app.post("/api/createUser", upload.array("files"), (req, res) => {
  const user_login = req.body.user_login;
  const user_name = req.body.user_name;
  const user_surname = req.body.user_surname;
  const password = req.body.password;
  const access_lvl = req.body.access_lvl;
  const about = req.body.about;
  const profilePic = req.files[0].filename;
  const backgroundPic = req.files[1].filename;
  db.query(
    "INSERT INTO users (user_login,user_name, user_surname, password, access_lvl, about, profilePic, backgroundPic) VALUES (?,?,?,?,?,?,?,?)",
    [
      user_login,
      user_name,
      user_surname,
      password,
      access_lvl,
      about,
      profilePic,
      backgroundPic,
    ],
    (err, result) => {
      if (err) {
        console.log(err);
      }
      console.log(result);
    }
  );
});

app.get("/api/getUsers/:id_user", (req, res) => {
  const id_user = req.params.id_user;
  db.query("SELECT * FROM users WHERE id_user = ?", id_user, (err, result) => {
    if (err) {
      console.log(err);
    }
    res.send(result);
  });
});

app.get("/api/getUserNames/:user_Login", (req, res) => {
  const user_Login = req.params.user_Login;
  db.query(
    "SELECT * FROM users WHERE user_login = ?",
    user_Login,
    (err, result) => {
      if (err) {
        console.log(err);
      }
      res.send(result);
    }
  );
});

app.get("/api/getUsers/", (req, res) => {
  db.query(
    "SELECT id_user, user_Login, profilePic FROM users",
    (err, result) => {
      if (err) {
        console.log(err);
      }
      res.send(result);
    }
  );
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
    "SELECT comments.*, users.id_user, users.user_name, users.user_surname FROM comments INNER JOIN users ON comments.user_id = users.id_user WHERE post_id = ?",
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

app.post("/sendMessage/:sender=:reciver", (req, res) => {
  const sender = req.params.sender;
  const reciver = req.params.reciver;
  const messageText = req.body.message;
  const messageTime = req.body.time;

  const toWrite = `${sender} : ${messageText} : ${messageTime}`;

  let smaller = 0;
  let larger = 0;
  sender < reciver
    ? ((smaller = sender), (larger = reciver))
    : ((smaller = reciver), (larger = sender));

  db.query(
    "SELECT ID_Conversation FROM chatting WHERE user_id_first = ? AND user_id_secc = ?;",
    [smaller, larger],
    (err, result) => {
      if (result.length > 0) {
        fs.appendFile(
          `./conversation/${smaller}-${larger}`,
          toWrite + "\r\n",
          function (err) {
            if (err) console.log(err);
          }
        );
      } else {
        db.query(
          "INSERT INTO chatting ( user_id_first, user_id_secc) VALUES (?,?)",
          [smaller, larger],
          (err, res) => console.log(err)
        );
        fs.writeFile(
          `./conversation/${smaller}-${larger}`,
          toWrite + "\r\n",
          function (err) {
            if (err) console.log(err);
          }
        );
      }
    }
  );

  res.send(window.NavigationPreloadManager.false());
});

app.get("/getMessages/:sender=:reciver", (req, res) => {
  const sender = req.params.sender;
  const reciver = req.params.reciver;
  let smaller = 0;
  let larger = 0;
  sender < reciver
    ? ((smaller = sender), (larger = reciver))
    : ((smaller = reciver), (larger = sender));

  let chatMessages = null;
  db.query(
    "SELECT ID_Conversation FROM chatting WHERE user_id_first = ? AND user_id_secc = ?;",
    [smaller, larger],
    (err, result) => {
      if (result.length > 0) {
        fs.readFile(
          `./conversation/${smaller}-${larger}`,
          "utf8",
          (err, data) => {
            if (err) {
              console.error(err);
              return;
            }
            data = processString(data);
            res.send(data);
          }
        );
      }
    }
  );
  console.log(chatMessages);
});

function processString(string) {
  let newLinesSplit = string.split("\r\n");
  let data = [];
  newLinesSplit.map((line) => {
    let dataLine = line.split(" : ");
    dataLine[0] = Number(dataLine[0]);
    dataLine[2] = Number(dataLine[2]);
    data.push(dataLine);
  });
  return data;
}

app.listen(PORT, () => {
  console.log(`Server is running on ${PORT}`);
});
