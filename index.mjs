import express, { raw } from 'express';
import fetch from "node-fetch";
const solarSystem = (await import('npm-solarsystem')).default;

const app = express();
app.set("view engine", "ejs");
app.use(express.static("public"));

app.get('/', async (req, res) => {
   let rawRes = await fetch("https://pixabay.com/api/?key=5589438-47a0bca778bf23fc2e8c5bf3e&per_page=50&orientation=horizontal&q=milky+way");
   let response = await rawRes.json();
   let randomHitIndex = Math.floor(Math.random() * response.hits.length);
   let imageUrl = response.hits[randomHitIndex].largeImageURL;
   res.render("home.ejs", {imageUrl});
});

app.get('/planet', (req, res) => {
   let planet_name = req.query.planetName;
   let planetInfo = solarSystem[`get${planet_name}`]();
   res.render("planetInfo.ejs", {planetInfo, planet_name});
});

app.get('/nasa-pod', (req, res) => {
   res.render("nasa-pod.ejs");
});

app.get('/asteroids', (req, res) => {
   let asteroids = solarSystem.getAsteroids();
   res.render("asteroids.ejs", {asteroids});
});

app.get('/comets', (req, res) => {
   let comets = solarSystem.getComets();
   res.render("comets.ejs", {comets});
});

app.listen(3000, () => {
   console.log('server started');
});