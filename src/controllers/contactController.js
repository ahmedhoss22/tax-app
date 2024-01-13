const nodemailer = require("nodemailer");

exports.sendContactEmail = async (req, res) => {
  const { name, title, subject, email, message } = req.body;

  // Create a transporter using SMTP
  let transporter = nodemailer.createTransport({
    host: "sandbox.smtp.mailtrap.io",
    port: 2525,
    auth: {
      user: "46089da7a34070",
      pass: "c3816f7bb03446",
    },
  });

  // Construct email message
  let mailOptions = {
    from: email,
    to: "Info@taxhub.com",
    subject,
    // text: `Subject: ${subject}\nEmail: ${email}\nMessage: ${message}`,
    html: `
    <div style="font-family: Arial, sans-serif; heigh:100vh; margin: 0 auto;">
      <h1 style="background-color: #f4f4f4; padding: 1rem 0; color: #333; text-align: center;">${subject}</h1>
      <div style="background-color: #f4f4f4; padding: 20px; border-radius: 5px;">
        <p style="margin-bottom: 15px;"><strong>Name:</strong> ${name}</p>
        <p style="margin-bottom: 15px;"><strong>Email:</strong> ${email}</p>
        <p><strong>Message:</strong></p>
        <div style="padding: 10px; background-color: #fff; border-radius: 5px;">
          <h3 style="text-align: center">${title}</h3>
          <p>${message}</p>
        </div>
      </div>
    </div>
  `,
  };

  try {
    // Send email
    await transporter.sendMail(mailOptions);
    res.status(200).json({ message: "Message sent successfully" });
  } catch (error) {
    console.error("Error sending message:", error);
    res.status(500).json({ error: "Error sending message" });
  }
};
