const nodemailer = require('nodemailer');
require('dotenv').config()

const transporter = nodemailer.createTransport({
  service: 'gmail',
  host: "smtp.gmail.com",
  port: 587,
  secure: false,
  auth: {
    user: process.env.SENDER_GMAIL_ADDRESS,
    pass: process.env.GMAIL_PASS,
  },
});

const mailOptions = {
  from: {
    name: 'TaskUnity',
    address: process.env.SENDER_GMAIL_ADDRESS
  },
  to: "humagainroman222@gmail.com",
  subject: "Sending email using nodemailer and gmail ✔",
  text: "Hello world?",
}

const sendMail = async (emails, subject, body) => {
  try {
    await transporter.sendMail({
      from: {
        name: 'TaskUnity',
        address: process.env.SENDER_GMAIL_ADDRESS
      },
      to: emails,
      subject: subject,
      html: body,
    })
    console.log("Mail has been send successfully !")
  } catch (error) {
    console.log(error)
  }
}


module.exports = {sendMail}

