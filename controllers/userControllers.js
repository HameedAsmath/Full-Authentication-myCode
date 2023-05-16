// LOGIC, BL
const User = require("../model/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

exports.register = async (req, res) => {
  try {
    const { name, email, password} = req.body;
    if (!(name && email && password)) {
      return res.status(401).send("All fields are required");
    }

    //checking if the user already exist
    const exstUser = await User.findOne({ email });
    if (exstUser) {
      return res.status(401).send("User already exist");
    }

    //hash password
    const encryptedpassword = await bcrypt.hash(password, 10);

    //Create new entry
    const user = await User.create({
      name,
      email,
      password: encryptedpassword,
    });

    //generate a token and send it to user
    const tocken = jwt.sign(
      {
        id: user._id,
        email,
      },
      "mysecretkey",
      { expiresIn: "2h" }
    );

    user.token = tocken;

    //dont want to send this to the user
    user.password = undefined;
    res.status(201).json(user);
  } catch (error) {
    console.log(error);
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!(email && password)) {
      return res.status(401).send("All fields are required");
    }

    const user = await User.findOne({ email });
    if (!user) {
      res.status(401).send("No user exist");
    }
    if (user && (await bcrypt.compare(password, user.password))) {
      //create a token and send
      const token = jwt.sign(
        {
          id: user._id,
          email,
        },
        "mysecretkey",
        { expiresIn: "2h" }
      );

      user.token = token;
      user.password = undefined;

      const option = {
        expires: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
        httpOnly: true,
      };
      res.status(200).cookie("token", token, option).json({
        success: true,
        token,
        user,
      });
    } else {
      res.status(400).send("email or password is incorrect");
    }
  } catch (error) {
    console.log(error);
  }
};

exports.logout = (req, res) => {
  // Clear the token from the client-side cookie
  res.clearCookie("token");

  // Send a response to the client to redirect them to the login page or any other page that makes sense for your application
  res.status(200).send({ message: "Logged out successfully" });
};

exports.userdetails = (req,res) => {
  const {token} = req.body
  try {
      if(!token){
          res.status(403).send("token is missing")
      }
      const decode = jwt.verify(token,"mysecretkey",(err,res)=>{
        if(err){
          return "Token Expired"
        }
        return res
      })
      if(decode==="Token Expired"){
        return res.status(401).send("Token Expired")
      }
      res.status(200).json({decode})
      console.log(decode)
  } catch (error) {
      res.status(403).send("Invalid token")
  }
};
