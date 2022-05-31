const User = require("./models/User");
//const Role = require('.public/models/Role');
const bcrypt = require("bcryptjs");
const jwt = require('jsonwebtoken')
const { validationResult } = require("express-validator"); // save errors
const {secret} = require("./config");

// JWT token -> "header.payload.signature"
        // header - algorithm and token type
        
        // payload -> body of the token
        // payload could be an object literal, buffer or string representing valid JSON
        
        // signature -> unique verification data
const generateAccessToken = (id) => {
    const payload = { 
        id
    }
    // jwt.sign(payload, secretOrPrivateKey, [options, callback])
    return jwt.sign(payload, secret)
}

class authController {
    async registration(req, res) {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res
                    .status(400)
                    .json({ message: "Error while registrating", errors });
            }
            //const { username, password } = req.body;

            const username = req.body.username;
            const password = req.body.password;

      const candidate = await User.findOne({ username });
      if (candidate) {
        return res.status(401).json({ message: "User already exists" });
      }
      const hashPassword = bcrypt.hashSync(password, 7); //  a salt will be generated with the specified number of rounds and used(hash level)
      // 2^rounds iterations of processing.
      // From @garthk, on a 2GHz core you can roughly expect:
      // rounds=8 : ~40 hashes/sec

      // asd + 7 -> asd7 -> 123189ab12 -> 28174917abced09123 -> (2^7-2 times of hashing)

      //const userRole = await Role.findOne({ value: "USER" })
      const user = new User({
        username,
        password: hashPassword /*, roles: [userRole.value]*/,
      });
      //await
       user.save(); // save in Mongodb
      
      return res.status(201).send(` <!doctype html>
      <html lang="en">
      
      <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1">
          <meta name="description" content="">
      
          <title>Welcome back!</title>
      
          <link rel="canonical" href="https://v5.getbootstrap.com/docs/5.0/examples/blog/">

          <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/5.0.0-alpha1/css/bootstrap.min.css"
              integrity="sha384-r4NyP46KrjDleawBgD5tp8Y7UzmLA05oM1iAEQ17CSuDqnUK2+k9luXQOfXJCJ4I" crossorigin="anonymous">
          <script src="https://stackpath.bootstrapcdn.com/bootstrap/5.0.0-alpha1/js/bootstrap.min.js"
              integrity="sha384-oesi62hOLfzrys4LxRF63OJCXdXDipiYWBnvTl9Y9/TRlw5xlKIEHpNyvvDShgf/"
              crossorigin="anonymous"></script>
          <script src="https://cdn.jsdelivr.net/npm/popper.js@1.16.0/dist/umd/popper.min.js"
              integrity="sha384-Q6E9RHvbIyZFJoft+2mJbHaEWldlvI9IOYy5n3zV9zzTtmI3UksdQRVvoxMfooAo"
              crossorigin="anonymous"></script>
      
          <style>
              .bd-placeholder-img {
                  font-size: 1.3rem;
                  text-anchor: middle;
                  -webkit-user-select: none;
                  -moz-user-select: none;
                  -ms-user-select: none;
                  user-select: none;
              }
      
              @media (min-width: 768px) {
                  .bd-placeholder-img-lg {
                      font-size: 3.5rem;
                  }
              }
          </style>
      
          <style>

              .blog-header {
                  line-height: 1;
                  border-bottom: 1px solid #e5e5e5;
              }
      
              .blog-header-logo {
                  font-family: "Playfair Display", Georgia, "Times New Roman", serif;
                  font-size: 2.25rem;
              }
      
              .blog-header-logo:hover {
                  text-decoration: none;
              }
      
              .display-4 {
                  font-size: 2.5rem;
              }
      
              @media (min-width: 768px) {
                  .display-4 {
                      font-size: 3rem;
                  }
              }

              .card-img-right {
                  height: 100%;
                  border-radius: 0 3px 3px 0;
              }
      
              .flex-auto {
                  flex: 0 0 auto;
              }
      
              .h-250 {
                  height: 250px;
              }
      
              @media (min-width: 768px) {
                  .h-md-250 {
                      height: 250px;
                  }
              }

              .btn:hover {
                background-color:#009ccc;
              }
          </style>
      </head>
      
      <body>
      
          <div class="container">
              <header class="blog-header py-3">
                  <div class="row flex-nowrap justify-content-between align-items-center">
                    
                  </div>
              </header>
              <div class="p-4 p-md-5 mb-4 text-white rounded bg-dark">
              <h1 class="" style="color:whitesmoke; font-weight:bolder; text-align:center">You have successfully registered  your account!</h3> <br>
                  <div class="col-md-12 px-0">
                      <p style="font-size:40px; text-align:center">Welcome to this site, ${username}!</p>
                  
                      <nav class="blog-pagination" style="display:flex">
                          <a class="btn" style="margin:40px; width:20%; background-color:#00b4cc" href="/auth/login">Login</a>
                          <a class="btn" style="margin:40px; width:60%; height:50px; background-color:#00b4cc; font-size: 1.5rem" href="/">Home</a>
                          <a class="btn" style="margin:40px; width:20%; background-color:#00b4cc" href="/about" >About</a>
                      </nav>
                      </div>
              </div>
              </div>
          </div>
      </body>
      </html>`);
        } catch (e) {
            console.log(e);
            res.status(400).json({ message: "Registration error" });
        }
    }
    async login(req, res) {
    try { 
      
      const { username, password } = req.body;
      const user = await User.findOne({ username });
      if (!user) {
        return res
          .status(400)
          .json({ message: `User ${username} does not exist` });
      }

    //compareSync(data, encrypted)
    //data - [REQUIRED] - data to compare.
    //encrypted - [REQUIRED] - data to be compared to.
      const validPassword = bcrypt.compareSync(password, user.password);
      if (!validPassword) {
        return res.status(401).json({ message: "Incorrect password" });
      }
      const token = generateAccessToken(user._id);
      // if (password != user.password) {
      //   return res.status(400).json({ message: 'Incorrect password' });
      // }
      console.log({token});
      return res.status(200).send(`
      <!doctype html>
      <html lang="en">
      
      <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1">
          <meta name="description" content="">
      
          <title>Welcome here!</title>
      
          <link rel="canonical" href="https://v5.getbootstrap.com/docs/5.0/examples/blog/">

          <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/5.0.0-alpha1/css/bootstrap.min.css"
              integrity="sha384-r4NyP46KrjDleawBgD5tp8Y7UzmLA05oM1iAEQ17CSuDqnUK2+k9luXQOfXJCJ4I" crossorigin="anonymous">
          <script src="https://stackpath.bootstrapcdn.com/bootstrap/5.0.0-alpha1/js/bootstrap.min.js"
              integrity="sha384-oesi62hOLfzrys4LxRF63OJCXdXDipiYWBnvTl9Y9/TRlw5xlKIEHpNyvvDShgf/"
              crossorigin="anonymous"></script>
          <script src="https://cdn.jsdelivr.net/npm/popper.js@1.16.0/dist/umd/popper.min.js"
              integrity="sha384-Q6E9RHvbIyZFJoft+2mJbHaEWldlvI9IOYy5n3zV9zzTtmI3UksdQRVvoxMfooAo"
              crossorigin="anonymous"></script>
      
          <style>
              .bd-placeholder-img {
                  font-size: 1.125rem;
                  text-anchor: middle;
                  -webkit-user-select: none;
                  -moz-user-select: none;
                  -ms-user-select: none;
                  user-select: none;
              }
      
              @media (min-width: 768px) {
                  .bd-placeholder-img-lg {
                      font-size: 3.5rem;
                  }
              }
          </style>
      
          <style>
              .display-4 {
                  font-size: 2.5rem;
              }
      
              @media (min-width: 768px) {
                  .display-4 {
                      font-size: 3rem;
                  }
              }
      
              .card-img-right {
                  height: 100%;
                  border-radius: 0 3px 3px 0;
              }
      
              .flex-auto {
                  flex: 0 0 auto;
              }
      
              .h-250 {
                  height: 250px;
              }
      
              @media (min-width: 768px) {
                  .h-md-250 {
                      height: 250px;
                  }
              }
              .btn:hover {
                background-color:#009ccc;
              }
          </style>
      </head>
      
      <body>
      
          <div class="container">
              <header class="blog-header py-3">
              </header>
              <div class="p-4 p-md-5 mb-4 text-white rounded bg-dark">
              <h1 class="" style="color:whitesmoke; font-weight:bolder; text-align:center">You have successfully logged into your account!</h3> <br>
                  <div class="col-md-12 px-0">
                      <p style="font-size:40px; text-align:center">Welcome back, ${username}</p>
                  
                      <nav class="blog-pagination" style="display:flex">
                      <a class="btn" style="margin:40px; width:20%; background-color:#00b4cc" href="/auth/registration">Register</a>
                      <a class="btn" style="margin:40px; width:60%; height:50px; background-color:#00b4cc; font-size: 1.5rem" href="/">Home</a>
                      <a class="btn" style="margin:40px; width:20%; background-color:#00b4cc" href="/about" >About</a>
                      </nav>
                      </div>
              </div>
              </div>
          </div>
      </body>
      </html>`);
        } catch (e) {
            console.log(e);
            res.status(400).json({ message: "Login error" });
        }
    }
    async getUsers(req, res) {
        try {
            const users = await User.find();
            res.json(users);
        } catch (e) {
            console.log(e);
        }
    }
}

module.exports = new authController();
