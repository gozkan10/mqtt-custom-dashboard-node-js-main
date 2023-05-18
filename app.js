const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const fs = require('fs');
const port = 3000;

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
  console.log('Alınan test:', req.body.values[0].id);
  console.log('Alınan test:', req.body.values[0].v);
  console.log('Alınan test:', req.body.values[1].id);
  console.log('Alınan test:', req.body.values[1].v);
  //console.log('Alınan mesaj:', message);

  // İşlemleriniz burada gerçekleştirilebilir

  // txt yazdırma
  const jsonVerisi = req.body.message;
  const metin = JSON.stringify(jsonVerisi);
  fs.writeFileSync('/Users/kullanici/Desktop/opcVeri.txt', metin);


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
