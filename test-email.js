import dotenv from 'dotenv';
import nodemailer from 'nodemailer';

dotenv.config();

async function testEmailService() {
  console.log('==============================================');
  console.log('VARUN KUMAR PORTFOLIO - EMAIL SERVICE TEST');
  console.log('==============================================');

  const host = process.env.SMTP_HOST || 'smtp.gmail.com';
  const port = parseInt(process.env.SMTP_PORT || '587', 10);
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASSWORD;
  const adminEmail = process.env.ADMIN_EMAIL || user || 'varunkumarjob2004@gmail.com';

  console.log(`SMTP Host: ${host}`);
  console.log(`SMTP Port: ${port}`);
  console.log(`SMTP User: ${user ? user : '(not set)'}`);
  console.log(`SMTP Pass: ${pass ? '••••••••••••••••' : '(not set)'}`);
  console.log(`Target Admin: ${adminEmail}`);
  console.log('----------------------------------------------');

  if (!user || !pass) {
    console.warn('⚠️  WARNING: SMTP_USER or SMTP_PASSWORD is not defined in your environment.');
    console.log('\nTo configure Gmail App Password:');
    console.log('1. Visit: https://myaccount.google.com/apppasswords');
    console.log('2. Log in with your Gmail account');
    console.log('3. Generate an App Password named "Portfolio Website"');
    console.log('4. Copy the 16-character code (e.g. "abcd efgh ijkl mnop")');
    console.log('5. Set SMTP_USER and SMTP_PASSWORD in your environment / settings');
    console.log('----------------------------------------------');
    return;
  }

  try {
    console.log('1. Verifying SMTP connection with Gmail...');
    const transporter = nodemailer.createTransport({
      host,
      port,
      secure: port === 465,
      auth: { user, pass },
    });

    await transporter.verify();
    console.log('✓ SMTP Connection verified successfully');

    console.log(`2. Sending test notification to ${adminEmail}...`);
    const info = await transporter.sendMail({
      from: `"Varun Kumar Portfolio" <${user}>`,
      to: adminEmail,
      subject: '[Test] Embedded Systems Portfolio Email Dispatch',
      text: 'This is a test notification confirming your Gmail SMTP service is operational.',
      html: `
        <div style="font-family: monospace; background-color: #0D1117; color: #F0F4F8; padding: 20px; border: 1px solid #2D3748; border-radius: 6px;">
          <h2 style="color: #D4AF37; margin: 0 0 10px 0;">// EMAIL SERVICE OPERATIONAL</h2>
          <p style="color: #A8B8C8;">Your contact form notification system is connected to Gmail SMTP.</p>
          <div style="background-color: #1A1F28; padding: 12px; border: 1px solid #2D3748; border-radius: 4px; margin-top: 15px;">
            <p style="margin: 0; color: #10B981;">✓ Email sent successfully</p>
            <p style="margin: 5px 0 0 0; font-size: 11px; color: #6B7280;">Timestamp: ${new Date().toISOString()}</p>
          </div>
        </div>
      `,
    });

    console.log('✓ Email sent successfully');
    console.log(`  Message ID: ${info.messageId}`);
    console.log('==============================================');
  } catch (error) {
    console.error('✗ Email test failed:', error.message);
    if (error.code === 'EAUTH') {
      console.log('\nHint for EAUTH error:');
      console.log('- Make sure 2-Step Verification is active on your Google Account');
      console.log('- Use an "App Password", not your normal Google account login password');
    }
  }
}

testEmailService();
