import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
dotenv.config();

export interface EmailContactPayload {
  name: string;
  email: string;
  subject: string;
  message: string;
  receivedAt?: string;
}

export interface EmailSendResult {
  success: boolean;
  messageId?: string;
  error?: string;
  skipped?: boolean;
}

/**
 * Creates and configures the Nodemailer transporter using environment credentials
 */
export function getEmailTransporter() {
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
    secure: port === 465, // true for 465, false for 587
    auth: {
      user,
      pass,
    },
  });
}

/**
 * Sends an email notification to the site owner (Varun Kumar) when a new contact message is received
 */
export async function sendContactNotification(payload: EmailContactPayload): Promise<EmailSendResult> {
  const { name, email, subject, message, receivedAt = new Date().toISOString() } = payload;
  const transporter = getEmailTransporter();

  if (!transporter) {
    console.log(
      '[Email] SMTP credentials (SMTP_USER or SMTP_PASSWORD) are not configured. Email dispatch skipped. Message saved to portfolio store.'
    );
    return {
      success: true,
      skipped: true,
      error: 'SMTP credentials not provided in environment'
    };
  }

  const recipient = process.env.ADMIN_EMAIL || process.env.SMTP_USER || 'varunkumarjob2004@gmail.com';
  const senderEmail = process.env.SMTP_USER;

  const htmlContent = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <style>
    body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background-color: #0D1117; color: #F0F4F8; padding: 24px; margin: 0; }
    .container { max-width: 600px; margin: 0 auto; background-color: #161B22; border: 1px solid #2D3748; border-radius: 6px; overflow: hidden; }
    .header { background-color: #1A1F28; border-bottom: 1px solid #2D3748; padding: 20px 24px; }
    .header h2 { margin: 0; color: #D4AF37; font-size: 18px; letter-spacing: 0.5px; font-family: monospace; }
    .header p { margin: 4px 0 0 0; color: #A8B8C8; font-size: 13px; }
    .content { padding: 24px; }
    .field-group { margin-bottom: 16px; }
    .field-label { font-size: 11px; text-transform: uppercase; color: #6B7280; font-family: monospace; margin-bottom: 4px; }
    .field-value { font-size: 14px; color: #F0F4F8; background-color: #0D1117; border: 1px solid #2D3748; padding: 10px 14px; border-radius: 4px; }
    .message-box { font-size: 14px; color: #F0F4F8; background-color: #0D1117; border: 1px solid #2D3748; padding: 14px; border-radius: 4px; white-space: pre-wrap; line-height: 1.6; }
    .footer { background-color: #1A1F28; border-top: 1px solid #2D3748; padding: 16px 24px; font-size: 12px; color: #6B7280; font-family: monospace; display: flex; justify-content: space-between; }
    .badge { display: inline-block; padding: 2px 8px; border-radius: 4px; font-size: 11px; font-weight: bold; background: rgba(30,144,255,0.15); color: #1E90FF; border: 1px solid rgba(30,144,255,0.4); }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h2>// INCOMING CONTACT TRANSMISSION</h2>
      <p>Varun Kumar Portfolio • Embedded Systems & Firmware</p>
    </div>
    <div class="content">
      <div class="field-group">
        <div class="field-label">SENDER NAME</div>
        <div class="field-value">${name}</div>
      </div>
      <div class="field-group">
        <div class="field-label">SENDER EMAIL</div>
        <div class="field-value"><a href="mailto:${email}" style="color: #1E90FF; text-decoration: none;">${email}</a></div>
      </div>
      <div class="field-group">
        <div class="field-label">SUBJECT</div>
        <div class="field-value">${subject}</div>
      </div>
      <div class="field-group">
        <div class="field-label">MESSAGE CONTENT</div>
        <div class="message-box">${message.replace(/</g, '&lt;').replace(/>/g, '&gt;')}</div>
      </div>
    </div>
    <div class="footer">
      <span>TIMESTAMP: ${new Date(receivedAt).toLocaleString()}</span>
      <span class="badge">STATUS: NEW</span>
    </div>
  </div>
</body>
</html>
  `;

  const mailOptions = {
    from: `"Varun Kumar Portfolio" <${senderEmail}>`,
    to: recipient,
    replyTo: `"${name}" <${email}>`,
    subject: `[Portfolio Inquiry] ${subject} - from ${name}`,
    text: `New Portfolio Message\n\nFrom: ${name} (${email})\nSubject: ${subject}\nTime: ${receivedAt}\n\nMessage:\n${message}`,
    html: htmlContent,
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log(`[Email] Notification sent successfully! MessageId: ${info.messageId}`);
    return {
      success: true,
      messageId: info.messageId,
    };
  } catch (err: any) {
    console.error(`[Email] Failed to send email via SMTP:`, err.message);
    return {
      success: false,
      error: err.message,
    };
  }
}

/**
 * Test SMTP connection and configuration
 */
export async function verifySmtpConnection(): Promise<{ success: boolean; message: string }> {
  const transporter = getEmailTransporter();
  if (!transporter) {
    return {
      success: false,
      message: 'SMTP credentials missing in environment (SMTP_USER and SMTP_PASSWORD required)',
    };
  }

  try {
    await transporter.verify();
    return {
      success: true,
      message: 'SMTP connection established and verified successfully with host',
    };
  } catch (err: any) {
    return {
      success: false,
      message: `SMTP connection verification failed: ${err.message}`,
    };
  }
}
