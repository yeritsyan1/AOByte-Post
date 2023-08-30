import nodemailer from "nodemailer";

export const verifyEmail = async (req, res) => {
  const user = req.body.user;
  const token = req.body.token;

  const transporter = await nodemailer.createTransport({
    service: "gmail",
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    auth: {
      user: "tigranye99@gmail.com",
      pass: "ihmz byyb tddu utup",
    },
  });

  const mailOptions = {
    from: "tigranye99@gmail.com",
    to: user.email,
    subject: "Click to verify email",

    html: ` 
  <div style="width: 300px; border: 1px black solid">
   <h1 style="text-align: center" > Verify Email </h1>
    <div style="width: 100%; heigth: 45px; font-size: 18px; background-color: green; text-align: center"> 
    <a href=http://localhost:3000/myposts?&token=${token} style="color: white" > Verify 
    </a> 
   </div>
   </div>
    `,
  };

  await transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      res.json({ message: "Error, try again" });
    } else {
      res.json({ message: "Send" });
    }
  });
};
