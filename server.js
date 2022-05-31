const express = require('express')
const axios = require('axios')
const format = require('./scripts/format')
const wiki = require('./scripts/wiki')
const swaggerUi = require('swagger-ui-express')
swaggerDocument = require('./swagger.json');

const app = express();
const viewDir = __dirname + "/views";
const cookieParser = require("cookie-parser");
app.use(cookieParser());

app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get("/", (req, res) => {
  res.render(viewDir + "/main.ejs",{
    key: req.cookies.key
  });
});

app.get("/about", (req, res) => {
  res.render(viewDir + "/about.ejs",{
    key: req.cookies.key
  });
});

app.get("/auth/registration", (req, res) => {
  res.render(viewDir + "/registration.ejs");
});

app.get("/auth/login", (req, res) => {
  res.render(viewDir + "/login.ejs");
});

app.get("/auth/logout", (req, res) => {
  res.clearCookie("key");
  res.redirect("/")
  res.end();
});

app.post("/result", (req, res) => {
  const options = {
    method: "GET",
    url: "https://celebrity-by-api-ninjas.p.rapidapi.com/v1/celebrity",
    params: { name: `${req.body.dd}` },
    headers: {
      "X-RapidAPI-Host": "celebrity-by-api-ninjas.p.rapidapi.com",
      "X-RapidAPI-Key": "ed04e19701msh5b1ef1bad158febp1ac3f0jsn08bb7653a75c",
    },
  };

  axios
    .request(options)
    .then(async function (response) {
      const name = response.data[0].name.replace(/^(.)|\s+(.)/g, (c) =>
        c.toUpperCase()
      );
      const age = response.data[0].age;
      const birthdy = format.Date(response.data[0].birthdy);
      const gender = response.data[0].gender;
      const occupation = format.Occupation(response.data[0].occupation);
      const imageUrl = await wiki.fetchWikiImage(name);

      res.status(200).render(viewDir + '/result.ejs', {
        name: name,
        age: age,
        birthdy: birthdy,
        gender: gender,
        occupation: occupation,
        imageUrl: imageUrl,
        key: req.cookies.key
      });
    })
    .catch(function (error) {
      res.render(viewDir + '/not-found.ejs', {
        key: req.cookies.key
      })
    });
});

app.use(express.static(__dirname + "/public/styles"));

let port = process.env.PORT;
if (port == null || port == "") {
  port = 8000;
}

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.listen(port, () => {
  console.log(`Example app listening on port http://localhost:${port}`);
});

const mongoose = require("mongoose");
mongoose.connect(
  "mongodb+srv://adilkhan-back:Aitu2003@cluster0.dfuz8.mongodb.net/backend-db?retryWrites=true&w=majority"
);

const authRouter = require("./auth-router");
app.use("/auth", authRouter);
const RegRoute = require("./auth-router");
app.use("/", RegRoute);
const notesSchema = {
  username: String,
  password: String,
};
