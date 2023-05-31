const nodemailer = require("nodemailer");

// async..await is not allowed in global scope, must use a wrapper
const sendmail = (email, body) => {
  // create reusable transporter object using the default SMTP transport
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "kedardeshmukh2003@gmail.com",
      pass: "bezuscpzorrjdoxc",
    },
  });

  // send mail with defined transport object
  const mailOptions = {
    from: "kedardeshmukh2003@gmail.com",
    to: email,
    subject: "About Ticket Booking",
    text: body,
  };

  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.error(error);
    } else {
      console.log("Email sent: " + info.response);
    }
  });
};
module.exports = sendmail;