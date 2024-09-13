const nodemailer = require("nodemailer");

const sendMail = (to,body) => {
  const transporter = nodemailer.createTransport({
    // service: "gmail",
    host: "mail.lakpawura.lk",
    port: 465,
    secure: true,
    auth: {
      user: process.env.EMAIL,
      pass: process.env.EMAIL_PASSWORD,
    },
  });

  const mailOptions = {
    from: '"Lakpawura" <contact@lakpawura.lk>',
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