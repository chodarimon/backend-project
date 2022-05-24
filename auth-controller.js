const User = require("./models/User");
//const Role = require('.public/models/Role');
const bcrypt = require("bcryptjs");
const { validationResult } = require("express-validator");
const express = require ('express');

// 

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
        return res.status(400).json({ message: "User already exists" });
      }
      const hashPassword = bcrypt.hashSync(password, 7);
      //const userRole = await Role.findOne({ value: "USER" })
      const user = new User({
        username,
        password: hashPassword /*, roles: [userRole.value]*/,
      });
      await user.save();
      return res.send(` <!doctype html>
      <html lang="en">
      
      <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1">
          <meta name="description" content="">
      
          <title>Lo</title>
      
          <link rel="canonical" href="https://v5.getbootstrap.com/docs/5.0/examples/blog/">
      
      
      
          <!-- Bootstrap core CSS -->
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
      
      
          <!-- Custom styles for this template -->
          <link href="https://fonts.googleapis.com/css?family=Playfair&#43;Display:700,900&amp;display=swap" rel="stylesheet">
          <!-- Custom styles for this template -->
          <style>
              /* stylelint-disable selector-list-comma-newline-after */
      
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
      
              h1,
              h2,
              h3,
              h4,
              h5,
              h6 {
                  font-family: "Playfair Display", Georgia, "Times New Roman", serif;
              }
      
              .display-4 {
                  font-size: 2.5rem;
              }
      
              @media (min-width: 768px) {
                  .display-4 {
                      font-size: 3rem;
                  }
              }
      
              .nav-scroller {
                  position: relative;
                  z-index: 2;
                  height: 2.75rem;
                  overflow-y: hidden;
              }
      
              .nav-scroller .nav {
                  display: flex;
                  flex-wrap: nowrap;
                  padding-bottom: 1rem;
                  margin-top: -1px;
                  overflow-x: auto;
                  text-align: center;
                  white-space: nowrap;
                  -webkit-overflow-scrolling: touch;
              }
      
              .nav-scroller .nav-link {
                  padding-top: .75rem;
                  padding-bottom: .75rem;
                  font-size: .875rem;
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
      
              /* Pagination */
              .blog-pagination {
                  margin-bottom: 4rem;
              }
      
              .blog-pagination>.btn {
                  border-radius: 2rem;
              }
      
              /*
              * Blog posts
              */
              .blog-post {
                  margin-bottom: 4rem;
              }
      
              .blog-post-title {
                  margin-bottom: .25rem;
                  font-size: 2.5rem;
              }
      
              .blog-post-meta {
                  margin-bottom: 1.25rem;
                  color: #727272;
              }
      
              /*
              * Footer
              */
              .blog-footer {
                  padding: 2.5rem 0;
                  color: #727272;
                  text-align: center;
                  background-color: #f9f9f9;
                  border-top: .05rem solid #e5e5e5;
              }
      
              .blog-footer p:last-child {
                  margin-bottom: 0;
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
                      <p style="font-size:40px; text-decoration:underline; text-align:center">Sign ${username}</p>
                  
                      <nav class="blog-pagination" style="display:flex">
                          <a class="btn btn-outline-primary" style="margin:40px; width:33%" href="#">Reg</a>
                          <a class="btn btn-outline-primary" style="margin:40px; width:33%" href="#" >Home</a>
                          
                          <a class="btn btn-outline-primary" style="margin:40px; width:33%; background-color:whitesmoke" href="#" >Home</a>
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
      const validPassword = bcrypt.compareSync(password, user.password);
      if (!validPassword) {
        return res.status(400).json({ message: "Incorrect password" });
      }
      // if (password != user.password) {
      //   return res.status(400).json({ message: 'Incorrect password' });
      // }
      res.cookie("key", username, {httpOnly: true,
        secure: process.env.NODE_ENV === "production",})
      return res.send(`<div>Logged as${username + " " + user._id}
      <!doctype html>
      <html lang="en">
      
      <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1">
          <meta name="description" content="">
      
          <title>Lo</title>
      
          <link rel="canonical" href="https://v5.getbootstrap.com/docs/5.0/examples/blog/">
      
      
      
          <!-- Bootstrap core CSS -->
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
      
      
          <!-- Custom styles for this template -->
          <link href="https://fonts.googleapis.com/css?family=Playfair&#43;Display:700,900&amp;display=swap" rel="stylesheet">
          <!-- Custom styles for this template -->
          <style>
              /* stylelint-disable selector-list-comma-newline-after */
      
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
      
              h1,
              h2,
              h3,
              h4,
              h5,
              h6 {
                  font-family: "Playfair Display", Georgia, "Times New Roman", serif;
              }
      
              .display-4 {
                  font-size: 2.5rem;
              }
      
              @media (min-width: 768px) {
                  .display-4 {
                      font-size: 3rem;
                  }
              }
      
              .nav-scroller {
                  position: relative;
                  z-index: 2;
                  height: 2.75rem;
                  overflow-y: hidden;
              }
      
              .nav-scroller .nav {
                  display: flex;
                  flex-wrap: nowrap;
                  padding-bottom: 1rem;
                  margin-top: -1px;
                  overflow-x: auto;
                  text-align: center;
                  white-space: nowrap;
                  -webkit-overflow-scrolling: touch;
              }
      
              .nav-scroller .nav-link {
                  padding-top: .75rem;
                  padding-bottom: .75rem;
                  font-size: .875rem;
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
      
              /* Pagination */
              .blog-pagination {
                  margin-bottom: 4rem;
              }
      
              .blog-pagination>.btn {
                  border-radius: 2rem;
              }
      
              /*
              * Blog posts
              */
              .blog-post {
                  margin-bottom: 4rem;
              }
      
              .blog-post-title {
                  margin-bottom: .25rem;
                  font-size: 2.5rem;
              }
      
              .blog-post-meta {
                  margin-bottom: 1.25rem;
                  color: #727272;
              }
      
              /*
              * Footer
              */
              .blog-footer {
                  padding: 2.5rem 0;
                  color: #727272;
                  text-align: center;
                  background-color: #f9f9f9;
                  border-top: .05rem solid #e5e5e5;
              }
      
              .blog-footer p:last-child {
                  margin-bottom: 0;
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
              <h1 class="" style="color:whitesmoke; font-weight:bolder; text-align:center">You have successfully logged into your account!</h3> <br>
                  <div class="col-md-12 px-0">
                      <p style="font-size:40px; text-decoration:underline; text-align:center">Welcome back ${username}</p>
                  
                      <nav class="blog-pagination" style="display:flex">
                          <a class="btn btn-outline-primary" style="margin:40px; width:33%" href="#">Reg</a>
                          <a class="btn btn-outline-primary" style="margin:40px; width:33%" href="#" >Home</a>
                          
                          <a class="btn btn-outline-primary" style="margin:40px; width:33%; background-color:whitesmoke" href="#" >Home</a>
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
