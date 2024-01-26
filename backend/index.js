const express = require("express");
const app = express();
const mongoose = require("mongoose");
const zod = require("zod");
const jwt = require("jsonwebtoken");
const JWTSEC = "someJWTkeyForAnonymous";
const nodemailer = require("nodemailer");
const User = require("../backend/models/User");
const Post = require("../backend/models/Post");
const VerificationToken = require("../backend/models/VerificationToken");

//Set your own port
const Port = 5000;

//Go to mailtrap.io and fill the following keys
const MAILTRAP_USER = "";
const MAILTRAP_PASS = "";

//Enter your mongoAtlas url
const MongoATLAS_URL = "";

//Connecting Database
mongoose
  .connect(MongoATLAS_URL)
  .then(function () {
    console.log("Database Connected Successfully!!");
  })
  .catch(function () {
    console.log("Some error connecting Database!!");
  });

app.use(express.json());

//OTP Generator
function generateOTP() {
  let OTP = "";
  for (let i = 0; i <= 3; i++) {
    let ranVal = Math.round(Math.random() * 9);
    OTP = OTP + ranVal;
  }
  return OTP;
}

//Schema verify
function verifySchema(req, res, next) {
  const mySchema = zod.object({
    email: zod.string().email(),
    username: zod.string().min(3),
  });

  let response = mySchema.safeParse(req.body);

  if (response["sucess"] == false) {
    console.log(false);
  }

  if (response["sucess"] == false) {
    return res.status(400).json({
      message: "There is some error with the input",
    });
  } else {
    next();
  }
}

const transport = nodemailer.createTransport({
  host: "smtp.mailtrap.io",
  port: 2525,
  auth: {
    user: MAILTRAP_USER,
    pass: MAILTRAP_PASS,
  },
});

//<----  User Router  ---->

//create user
app.post("/user/create", verifySchema, async function (req, res, next) {
  const username = req.body.username;
  const email = req.body.email;

  let user = await User.findOne({ email: email });

  if (user) {
    return res.status(400).json({
      message: "The email is already in use",
    });
  }

  user = await User.create({
    username: username,
    email: email,
  });

  const accessToken = jwt.sign(
    {
      id: user._id,
      username: username,
    },
    JWTSEC
  );

  const OTP = generateOTP();

  const verificationToken = await VerificationToken.create({
    user: user._id,
    token: OTP,
  });

  await verificationToken.save();
  await user.save();

  transport.sendMail({
    from: "anonymous@gmail.com",
    to: user.email,
    subject: "Verify your email using OTP",
    html: `<h1>Your OTP CODE ${OTP}</h1>`,
  });

  res.status(200).json({
    Status: "Pending",

    msg: "Please check your email",
    user: user._id,
  });
});

app.post("/user/verify", async function (req, res, next) {
  const user = req.body.user;
  const OTP = req.body.otp;

  const mainuser = await User.findById(user);

  if (!mainuser) {
    return res.status(404).json({
      message: "user does not exist",
    });
  }

  if (mainuser.verifed === true) {
    return res.status(400).json({
      message: "user is already verified",
    });
  }

  const token = await VerificationToken.findOne({ user: mainuser._id });

  if (!token) {
    return res.status(400).json({ message: "Sorry token not found" });
  }

  let isMatch = false;
  if ((token["OTP"] = OTP)) isMatch = true;

  if (!isMatch) {
    return res.status(400).json("Token is not valid");
  }

  mainuser.verifed = true;

  await VerificationToken.findByIdAndDelete(token._id);

  await mainuser.save();

  const accessToken = jwt.sign(
    {
      id: mainuser._id,
      username: mainuser.username,
    },
    JWTSEC
  );

  transport.sendMail({
    from: "anonymous@gmail.com",
    to: mainuser.email,
    subject: "Successfully verified your email",
    html: `Now you can login`,
  });

  return res.status(200).json({ accessToken });
});

//Login
app.post("/user/login", verifySchema, async (req, res, next) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
      return res.status(400).json("User doesn't found");
    }

    const accessToken = jwt.sign(
      {
        id: user._id,
        username: user.username,
      },
      JWTSEC
    );

    res.status(200).json({ accessToken });
  } catch (error) {
    res.status(500).json(`Internal error occured ${error}`);
  }
});

app.listen(Port, function () {
  console.log(`Server Running on port ${Port}`);
});

function verifyToken(req, res, next) {
  const authHeader = req.headers.token;
  if (authHeader) {
    const token = authHeader;
    jwt.verify(token, JWTSEC, (err, user) => {
      if (err) return res.status(400).json("Some error occured");
      req.user = user;
      next();
    });
  } else {
    return res.status(400).json("Access token is not valid");
  }
}

//<----  Post Router  ---->

app.post("/post/create", verifyToken, async (req, res) => {
  try {
    const title = req.body.title;
    const description = req.body.description;

    const newpost = new Post({
      title: title,
      description: description,
      user: req.user.id,
    });

    const post = await newpost.save();
    const mainuser = await User.findById(req.user.id);

    transport.sendMail({
      from: "anonymous@gmail.com",
      to: mainuser.email,
      subject: "Your Post is live",
      html: `Your Post ${title} is live`,
    });

    return res.status(200).json(post);
  } catch (error) {
    return res.status(500).json("Internal error occured");
  }
});

//Comment
app.put("/post/comment", verifyToken, async (req, res) => {
  const token = req.headers.token;
  const comment = req.body.comment;
  const postid = req.body.postid;
  const comments = {
    user: req.user.id,
    username: req.user.username,
    comment: comment,
  };

  const post = await Post.findById(postid);
  const mainuser = await User.findById(post.user);
  const decoded = jwt.verify(token, JWTSEC);
  const user = await User.findById(decoded["id"]);

  post.comment.push({
    comment: comment,
    user: user.id,
    username: user.username,
    email: user.email,
  });

  await post.save();

  transport.sendMail({
    from: "anonymous@gmail.com",
    to: mainuser.email,
    subject: "Someone commented on your post",
    html: `${user.username} commented on your post ${post.title}`,
  });

  res.status(200).json(post);
});

//Reply
app.put("/post/comment/reply", verifyToken, async (req, res) => {
  const token = req.headers.token;
  const reply = req.body.reply;
  const postid = req.body.postid;
  const commentid = req.body.commentid;

  const replies = {
    user: req.user.id,
    username: req.user.username,
    reply: reply,
  };

  const post = await Post.findById(postid);
  const mainuser = await User.findById(post.user);
  const comment = post.comment;

  let i = 0;
  for (let i = 0; i < comment.length; i++) {
    if (comment[i].id == commentid) {
      break;
    }
  }

  if (i == comment.length)
    return res.status(404).json({ message: "comment not found" });

  const decoded = jwt.verify(token, JWTSEC);
  const user = await User.findById(decoded["id"]);
  const commentUser = await User.findById(comment[i].user);

  comment[i].reply.push({
    reply: reply,
    user: user.id,
    username: user.username,
    email: user.email,
  });

  transport.sendMail({
    from: "anonymous@gmail.com",
    to: commentUser.email,
    subject: `Users are replying on your post`,
    html: `${user.username} replied to your comment ${comment[i].comment} `,
  });

  transport.sendMail({
    from: "anonymous@gmail.com",
    to: mainuser.email,
    subject: `Users are replying on your post`,
    html: `Users are replying on your post ${post.title}`,
  });

  await post.save();
  res.status(200).json(post);
});
