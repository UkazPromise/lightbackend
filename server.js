const express = require("express");
const router = express.Router();
const nodemailer = require("nodemailer");
const cors = require("cors");
require("dotenv").config();

const app = express();
app.use(cors());
app.use(express.json());
app.use("/", router);
app.listen(5000, () => console.log("Server Running Mbok"));                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        

const contactEmail = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.GEEEEP,
    pass: process.env.WORD,
  },
});

contactEmail.verify((error) => {
  if (error) {
    console.log(error);
  } else {
    console.log("Ready to Send");
  }
});

router.post("/contact", (req, res) => {
  const name = req.body.name;
  const number = req.body.number;
  const email = req.body.email;
  const state = req.body.state;
  const address = req.body.address;
  const message = req.body.message;
  const mail = {
    from: name,
    to: "ukazpromise@gmail.com",
    subject: "Contact Form Submission",
    html: `<p>Name: ${name}</p>
           <p>Number: ${number}</p>
           <p>Email: ${email}</p>
           <p>State: ${state}</p>
           <p>Address: ${address}</p>
           <p>Message: ${message}</p>`,
  };
  contactEmail.sendMail(mail, (error, data) => {
    if (error) {
      res.json({ status: "ERROR" });
    } else {
      res.json({ status: "Message Sent" });
    }
  });
});