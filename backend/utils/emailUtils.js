const nodemailer = require('nodemailer');
require('dotenv').config();

function getEmailTransporter() {
  const host = process.env.SMTP_HOST || 'smtp.gmail.com';
  const port = parseInt(process.env.SMTP_PORT || '587', 10);
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASSWORD;

  if (!user || !pass) {
    return null;
  }

  return nodemailer.createTransport({
    host,
    port,
    secure: port === 465,
    auth: {
      user,
      pass,
    },
  });
}

async function sendContactNotification({ name, email, subject, message, receivedAt = new Date().toISOString() }) {
  const transporter = getEmailTransporter();

  if (!transporter) {
    console.log('[Email] SMTP credentials (SMTP_USER or SMTP_PASSWORD) are not configured. Email skipped.');
    return {
      success: true,
      skipped: true,
      error: 'SMTP credentials not provided in environment',
    };
  }

  const recipient = process.env.ADMIN_EMAIL || process.env.SMTP_USER || 'varunkumarjob2004@gmail.com';
  const senderEmail = process.env.SMTP_USER;

  const mailOptions = {
    from: `"Varun Kumar Portfolio" <${senderEmail}>`,
    to: recipient,
    replyTo: `"${name}" <${email}>`,
    subject: `[Portfolio Inquiry] ${subject} - from ${name}`,
    text: `New Portfolio Message\n\nFrom: ${name} (${email})\nSubject: ${subject}\nTime: ${receivedAt}\n\nMessage:\n${message}`,
    html: `
      <div style="font-family: sans-serif; background: #0D1117; color: #F0F4F8; padding: 20px; border-radius: 6px;">
        <h2 style="color: #D4AF37; margin-top: 0;">Incoming Portfolio Message</h2>
        <p><strong>Sender:</strong> ${name} &lt;${email}&gt;</p>
        <p><strong>Subject:</strong> ${subject}</p>
        <p><strong>Date:</strong> ${new Date(receivedAt).toLocaleString()}</p>
        <hr style="border: 0; border-top: 1px solid #2D3748;" />
        <div style="background: #161B22; padding: 15px; border-radius: 4px; border: 1px solid #2D3748; white-space: pre-wrap;">
          ${message}
        </div>
      </div>
    `,
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log(`[Email] Notification sent successfully! MessageId: ${info.messageId}`);
    return { success: true, messageId: info.messageId };
  } catch (err) {
    console.error(`[Email] Failed to send email:`, err.message);
    return { success: false, error: err.message };
  }
}

async function verifySmtpConnection() {
  const transporter = getEmailTransporter();
  if (!transporter) {
    return { success: false, message: 'SMTP credentials missing in environment' };
  }
  try {
    await transporter.verify();
    return { success: true, message: 'SMTP connection verified successfully' };
  } catch (err) {
    return { success: false, message: err.message };
  }
}

module.exports = {
  getEmailTransporter,
  sendContactNotification,
  verifySmtpConnection,
};
