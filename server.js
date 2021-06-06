const express = require('express')
const app = express()
const pug = require('pug')
const nodemailer = require('nodemailer')
const bodyParser = require('body-parser')
const PORT = process.env.PORT || 3000;

app.use(express.static('views'))
app.set('view engine', 'pug')
app.use(express.json())
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/favicon.ico', express.static('views/assets/favicon.ico'));

app.get('/', (req,res) => {
  res.render('index');
})

app.get('/services', (req, res) =>{
  res.render('index');
})


app.get('/messageSuccess', (req,res) => {
  res.render('messageSent');
})

app.post('/quote', (req,res) =>{
  var transporter = nodemailer.createTransport({
        name: 'sspvas.com',
        host: 'mail.sspvas.com',
        port: 465,
        secure: true,
        auth: {
          user: 'form@sspvas.com',
          pass: 'formPassword'
        },
        sendMail: true
      });

      var mailOptions = {
          from: 'form@sspvas.com',
          to: 'support@sspvas.com, admin@sspvas.com, sean.m.s.pe@gmail.com',
          subject: 'Sending Email using Node.js',
          html: `<h4>From: </h4>${req.body.name} <a href="mailto:${req.body.email}" target="_blank">${req.body.email}</a>
          <h4>Company: </h4>${req.body.company}
          <h4>Number: </h4>${req.body.phone}
          <h4>Package: </h4>${req.body.package}<h4>Message: </h4> <p>${req.body.message}</p>`
        };
        console.log('mail attempt')

        transporter.sendMail(mailOptions, function(error, info){
            if (error) {
                console.log(error);
              } else {
                  console.log('Email sent: ' + info.response);
                  
              }
  });
  console.log(req.body);
  res.render(`messageSent`);
})

app.listen(PORT, () => console.log(`Example app listening on port ${PORT}!`))
