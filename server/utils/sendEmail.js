import { createTransport } from "nodemailer";
import dotenv from 'dotenv';
dotenv.config();

const transporter = createTransport({
  host: 'smtp.gmail.com' , 
  service: "gmail",
  port:465,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD,
  },
});

export const sendEmail = async (to, subject, htmlContent) => {
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to,
    subject,
    html: htmlContent,
  };

  try {

   // console.log(mailOptions)
    // console.log(transporter);
    await transporter.sendMail(mailOptions);
    console.log("Email sent successfully");
  } catch (error) {
    console.error("Error sending email:", error);
  }
};

// Example usage
// const userEmail = "TO_EMAIL@example.com";
// const emailSubject = "New Application Created";
// const emailText = "Your application has been created successfully.";

// sendEmail(userEmail, emailSubject, emailText);
