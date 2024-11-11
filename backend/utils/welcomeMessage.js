function generateWelcomeEmail(firstName, otp) {
  return `
 <!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Welcome to Me2Mentor</title>
  <style>
    body {
      font-family: Arial, sans-serif;
      background-color: #f4f4f4;
      margin: 0;
      padding: 0;
    }
    .email-container {
      background-color: #ffffff;
      margin: 20px auto;
      padding: 20px;
      max-width: 600px;
      border-radius: 10px;
      box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    }
    .email-logo {
      text-align: center;
      margin-bottom: 20px;
    }
   
    .email-header {
      background-color: blue;
      color: white;
      text-align: center;
      padding: 20px;
      border-top-left-radius: 10px;
      border-top-right-radius: 10px;
    }
    .email-header h1 {
      margin: 0;
      font-size: 28px;
      color: white;
    }
    .email-body {
      padding: 20px;
      color: #333;
    }
    .email-body h2 {
      color: black;
    }
    .email-footer {
      text-align: center;
      padding: 20px;
      font-size: 14px;
      color: #777;
    }
  </style>
</head>
<body>
  <div class="email-container">    
    <div class="email-header">
      <h1>Welcome to Me2Mentor!</h1>
    </div>
    <div class="email-body">
      <h2>Dear ${firstName},</h2>
      <p>We are thrilled to have you join our mentorship platform. At Me2Mentor, we believe in the power of mentorship to transform lives and careers. Whether you are here to find a mentor or to become one, we are committed to supporting you every step of the way.</p>
        <p>Your OTP code is: <strong>${otp}</strong>. It expires in 10 minutes.</p>
      <p>Here are a few things you can do to get started:</p>
      <ul>
        <li><strong>Complete Your Profile:</strong> Make sure to fill out your profile with all the necessary details. This helps us match you with the best mentors or mentees.</li>
        <li><strong>Explore Mentors/Mentees:</strong> Browse through our list of mentors and mentees to find the perfect match for your needs and goals.</li>
        <li><strong>Start Connecting:</strong> Reach out to potential mentors or mentees and start building meaningful relationships.</li>
      </ul>
      <p>If you have any questions or need assistance, feel free to reach out to our support team at <a href="mailto:support@me2mentor.com">support@me2mentor.com</a>.</p>
      <p>We are excited to see you grow and succeed with Me2Mentor!</p>
      <p>Best regards,</p>
      <p>The Me2Mentor Team</p>
    </div>
    <div class="email-footer">
      <p>&copy; 2024 Me2Mentor. All rights reserved.</p>
    </div>
  </div>
</body>
</html>
`;
}

module.exports = generateWelcomeEmail;
