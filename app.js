const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const fs = require('fs');
const port = 3000;
const REDIS_PORT=6379;
const redis = require('redis');
const redisClient = redis.createClient();



// load dotenv to read environment variables
require("dotenv").config();

// template view engine
app.set("view engine", "ejs");

// Serve Static Files
app.use(express.static("public"));

//routes
const dashboardRouter = require("./routes/dashboard");

//Hasan
app.use(bodyParser.json());
app.use(cors()); // CORS'u kullanmak için middleware'ı uygulayın


app.post('/api/messages', (req, res) => {
  const message = req.body.message;
  // console.log('Alınan test:', req.body.values[1].id);
  // console.log('Alınan test:', req.body.values[1].v);
  // console.log('Alınan test:', req.body.values[2].id);
  // console.log('Alınan test:', req.body.values[2].v);
  // console.log('Alınan test:', req.body.values[3].id);
  // console.log('Alınan test:', req.body.values[3].v);
  // console.log('Alınan test:', req.body.values[4].id);
  // console.log('Alınan test:', req.body.values[4].v);
  //console.log('Alınan mesaj:', message);
  redisClient.connect();
  redisClient.on('connect', () => {
    console.log('Connected to Redis server');
    //var stringResponse = req.body.message.toString(); 
    const jsonVerisi = req.body;
    const metin = JSON.stringify(jsonVerisi);
    fs.appendFileSync('/Users/hasanaydogmus/Desktop/opcVeri.txt', metin);
    redisClient.set("Hasan",metin,redis.print);
    redisClient.get("Hasan",redis.print);
    //redisClient.disconnect();
  });
  
  // // Redis istemcisi ile bağlantı hatası olduğunda tetiklenecek olay
  // redisClient.on('error', (err) => {
  //   console.error('Redis connection error:', err);
  // });




  // txt yazdırma

//rep

  res.send('POST isteği başarıyla karşılandı');

});

app.get("/", dashboardRouter);


// app.get("/mqttConnDetails", (req, res) => {
//   //   res.send(
//   //     JSON.stringify({
//   //       mqttServer: process.env.MQTT_BROKER,
//   //       mqttTopic: process.env.MQTT_TOPIC,
//   //     })
//   //   );
//   // });




app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
