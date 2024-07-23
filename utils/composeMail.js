const nodemailer = require("nodemailer");

const sendMail = (to,body) => {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    auth: {
      user: process.env.EMAIL,
      pass: process.env.EMAIL_PASSWORD,
    },
  });

  const mailOptions = {
    from: '"Lakpawura" <isuruijs@gmail.com>',
    to: `${to}`,
    subject: "Reply to your message",
    html: `<p>
    <br>
    ${body}</p>
        `,
  };

  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);
    } else {
      console.log("Email sent: " + info.response);
    }
  });
};

module.exports = sendMail;