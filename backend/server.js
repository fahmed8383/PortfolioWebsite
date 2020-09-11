// get frameworks and dependancies
var request = require('request');
const nodemailer = require('nodemailer');
var fs = require("fs");
var express = require('express');
const { url } = require('inspector');
var app = express()

// read api request body in json
app.use(express.json())

// open and read secrets.json file (included in gitignore so not visible on github)
var secretsFile = fs.readFileSync("secrets.json");

// parse the json in the secrets file
var secrets = JSON.parse(secretsFile);

// set up transporter for nodemailer
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'mail.devplayground@gmail.com',
      pass: secrets.gmailPass
    }
});

// set up /api/send-email post request using express
// this request is responsible for sending me the email from the contact form using the mail.devplayground@gmail.com smtp account
app.post('/api/send-email', (req, res) => {

    // check to make sure none of the required fields are missing
	if (req.body.email == "" || req.body.subject == "" || req.body.body == "" || req.body.captcha == "") {
		console.log("missing fields")
		res.json({"msg":"failure"})
		return
    }
    
    // recaptcha verification --------------------------------------------------------------------

	// generate url for the request
	captchaUrl = "https://www.google.com/recaptcha/api/siteverify?secret=" + secrets.recaptcha + "&response=" + req.body.captcha
    
    // send the http request
    request( captchaUrl , function(error, response, body) {
        body = JSON.parse(body);

        // if unable to successfully complete captcha, return
        if(!body.success){
            console.log("unable to send http request to verify recaptcha")
            res.json({"msg":"failure"})
            return
        }
    });

	// ------------------------------------------------------------------------------------------

    // fill in the appropriate info for the email
    const mailOptions = {
        from: req.body.email,
        to: 'fahmed4030@gmail.com',
        replyTo: req.body.email, 
        subject: req.body.subject,
        text: req.body.body
    };
    
    // send the email
    transporter.sendMail(mailOptions, function(error, info){
        if (error) {
            console.log(error);
        } else {
            console.log('Email sent: ' + info.response);
        }
    });

    res.json({"msg":"success"})
})

// start server
app.listen(6060, 'backend');

console.log(`Server running on http://backend:6060`);