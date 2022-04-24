const express = require("express");
const axios = require("axios");
const ejs = require("ejs");

const app = express();
const port = 3000;
const viewDir = __dirname + "/views";

app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get("/", (req, res) => {
  res.render(viewDir + "/main.ejs");
});

app.get("/about", (req, res) => {
  res.render(viewDir + "/about.ejs");
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
    .then(function (response) {
      const name = formatName(response.data[0].name);
      const age = response.data[0].age;
      const birthdy = formatDate(response.data[0].birthdy);
      const gender = response.data[0].gender;
      const occupation = formatOccupation(response.data[0].occupation);

      res.render(viewDir + "/result.ejs", {
        name: name,
        age: age,
        birthdy: birthdy,
        gender: gender,
        occupation: occupation,
      });

      console.log(name);
      console.log(gender);
      console.log(occupation);
      for (let i = 0; i < occupation.length; i++) {
        if (occupation[i] == "actor") {
          console.log("It is an actor!");
        }
      }

      let roles = [];
      occupation.map((item) => {
        roles.push(item);
      });

      let Info = [
        `
        ${name} | 
        ${gender} | 
        ${occupation}
        `,
      ];

      // res.send({
      //   name: name,
      //   gender: gender,
      //   occupation: occupation,
      //   roles: JSON.stringify(roles),
      //   Info,
      // });

      // Array_After[key]
      // name,
      // gender,
      // occupation

      //  JSON.parse(Array.values)
      // name,
      // gender,
      // occupation,
      // JSON.stringify(roles)
      // (Array_Before);
      // console.log(Actor_Info);
      //console.log(response.data[0].height);
    })
    .catch(function (error) {
      console.error(error);
    });

  //console.log(req.body.dd);
  // res.sendFile(__dirname + "/info_page.html");
  // res.write("asv")
});

app.use(express.static(__dirname + "/public"));

app.listen(port, () => {
  console.log(`Example app listening on port http://localhost:${port}`);
});

const formatName = (name) => {
  let splitted = name.split(" ");

  splitted = splitted.map((el) => {
    return el[0].toUpperCase() + el.slice(1);
  });
  splitted = splitted.join(" ");

  return splitted;
};

const formatOccupation = (occ) => {
  let splitted = occ.map((el) => {
    return el.replace("_", " ");
  });
  splitted = splitted.join(", ");

  return splitted;
};

const formatDate = (date) => {
  let splitted = new Date(date.split("-"));
  splitted = splitted.toDateString();
  return splitted;
};
