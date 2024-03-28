const express = require("express");
const hbs = require("hbs");
const path = require("path");
const weatherData = require("./requestData.js")

const app = express();

const publicDirPath = path.join(__dirname, "../public");
const viewPath = path.join(__dirname, "../views/");
const partialPath = path.join(__dirname, "../partials");

app.set("view engine", "hbs");
app.set("views", viewPath);

hbs.registerPartials(partialPath);

app.use(express.static(publicDirPath));


app.get("/", (req, res) => {
  res.render("home", {
    title: "Home",
  });
});

app.get("/about", (req, res) => {
  res.render("about", {
    title: "About",
    location: "jaspur",
  });
});

app.get('/weathers', (req,res) => {
    var location = req.query.location;
    if(location){
        weatherData.data(location,(error, data) => {
            if(error) {
                return res.send({'Error': error})
            }
             return res.send({ 
                'forecast': data,
                'location': location
            })
        })        
    } 
    if(location===undefined){
      res.status(404).json({"error" : "Location in necessary as a input!!"})
    }

})

app.get("/about/*", (req, res) => {
  res.render("404", {
    title: "404",
    msj: "cannot found this 'about' article",
  });
});
app.get("*", (req, res) => {
  res.render("404", {
    title: "404",
    msj: "Nothing to show",
  });
});

app.listen(3000, () => {
  console.log("live at port 3000");
  console.log("http://localhost:3000");
});
