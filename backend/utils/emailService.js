// backend/utils/emailService.js
import nodemailer from 'nodemailer';

let transporter = null;

// Create a reusable transporter using real SMTP credentials from .env
const createTransporter = () => {
  if (transporter) return transporter;

  // ✅ Support both SMTP_* and EMAIL_* variable names
  const host = process.env.SMTP_HOST || process.env.EMAIL_HOST;
  const portRaw = process.env.SMTP_PORT || process.env.EMAIL_PORT;
  const port = Number(portRaw || 587);
  const user = process.env.SMTP_USER || process.env.EMAIL_USER;
  const pass = process.env.SMTP_PASS || process.env.EMAIL_PASS;

  if (!host || !user || !pass) {
    console.error('❌ SMTP/EMAIL configuration is missing.', {
      host,
      userPresent: !!user,
      passPresent: !!pass,
    });
    throw new Error('Email service is not configured');
  }

  console.log('✅ Creating SMTP transporter with:', { host, port });

  transporter = nodemailer.createTransport({
    host,
    port,
    secure: port === 465, // true for 465, false for 587/25
    auth: {
      user,
      pass,
    },
  });

  transporter.verify((error, success) => {
    if (error) {
      console.error('❌ SMTP connection failed:', error.message);
    } else {
      console.log('✅ SMTP server is ready to take messages');
    }
  });

  return transporter;
};

// 🔹 Exported so controllers (like contactController / bookingController) can use it
export const sendEmail = async ({ email, to, subject, message, html }) => {
  const recipient = to || email; // support both keys

  if (!recipient) {
    throw new Error('No recipient email provided');
  }

  try {
    const t = createTransporter();

    console.log('📧 Sending email to:', recipient, 'subject:', subject);

    const info = await t.sendMail({
      from:
        process.env.EMAIL_FROM ||
        '"Appointment System" <noreply@yourapp.com>',
      to: recipient,
      subject,
      text: message,
      html,
    });

    console.log('✅ Email sent. Message ID:', info.messageId);
    return { success: true, messageId: info.messageId };
  } catch (error) {
    console.error('❌ Error sending email:', error.message);
    throw new Error('Failed to send email');
  }
};

// Sent immediately after the user submits a booking
export const sendBookingAcknowledgement = async (booking) => {
  if (!booking.email) {
    console.warn('⚠️ Booking has no email, skipping acknowledgement');
    return;
  }

  const subject = 'We Received Your Appointment Request';
  const message = `
Dear ${booking.name},

We have received your appointment request:

Service: ${booking.serviceType}
Date: ${booking.date}
Time: ${booking.time}

We will review your request and send you a confirmation once it is approved.

Best regards,
The Appointment Team
`;

  const html = `
  <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #111;">
    <h2>We Received Your Appointment Request</h2>
    <p>Dear ${booking.name},</p>
    <p>We have received your appointment request with the following details:</p>
    <ul>
      <li><strong>Service:</strong> ${booking.serviceType}</li>
      <li><strong>Date:</strong> ${booking.date}</li>
      <li><strong>Time:</strong> ${booking.time}</li>
    </ul>
    <p>We will review your request and send you another email once it is confirmed.</p>
    <p>Best regards,<br/>The Appointment Team</p>
  </div>
  `;

  return sendEmail({ email: booking.email, subject, message, html });
};

// Sent when admin approves the booking
export const sendBookingConfirmation = async (booking) => {
  if (!booking.email) {
    console.warn('⚠️ Booking has no email, skipping confirmation');
    return;
  }

  const subject = 'Your Appointment is Confirmed';
  const message = `
Dear ${booking.name},

Your appointment has been confirmed:

Service: ${booking.serviceType}
Date: ${booking.date}
Time: ${booking.time}

Thank you for choosing us!

Best regards,
The Appointment Team
`;

  const html = `
  <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #111;">
    <h2>Your Appointment is Confirmed</h2>
    <p>Dear ${booking.name},</p>
    <p>Your appointment has been confirmed with the following details:</p>
    <ul>
      <li><strong>Service:</strong> ${booking.serviceType}</li>
      <li><strong>Date:</strong> ${booking.date}</li>
      <li><strong>Time:</strong> ${booking.time}</li>
    </ul>
    <p>We look forward to seeing you.</p>
    <p>Best regards,<br/>The Appointment Team</p>
  </div>
  `;

  return sendEmail({ email: booking.email, subject, message, html });
};

// ✅ NEW – Sent when admin edits a booking (PUT) and it is not just new approval
export const sendBookingUpdated = async (booking) => {
  if (!booking.email) {
    console.warn('⚠️ Booking has no email, skipping update email');
    return;
  }

  const subject = 'Your Appointment Details Were Updated';
  const message = `
Dear ${booking.name},

Your appointment details have been updated:

Service: ${booking.serviceType}
Date: ${booking.date}
Time: ${booking.time}
Status: ${booking.status}

If you did not request this change, please contact the salon.

Best regards,
The Appointment Team
`;

  const html = `
  <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #111;">
    <h2>Your Appointment Was Updated</h2>
    <p>Dear ${booking.name},</p>
    <p>Your appointment details have been updated. Here is the latest information:</p>
    <ul>
      <li><strong>Service:</strong> ${booking.serviceType}</li>
      <li><strong>Date:</strong> ${booking.date}</li>
      <li><strong>Time:</strong> ${booking.time}</li>
      <li><strong>Status:</strong> ${booking.status}</li>
    </ul>
    <p>If you did not request these changes, please contact the salon.</p>
    <p>Best regards,<br/>The Appointment Team</p>
  </div>
  `;

  return sendEmail({ email: booking.email, subject, message, html });
};

// ✅ NEW – Sent when booking is deleted (treated as cancellation)
export const sendBookingCancelled = async (booking) => {
  if (!booking.email) {
    console.warn('⚠️ Booking has no email, skipping cancellation email');
    return;
  }

  const subject = 'Your Appointment Has Been Cancelled';
  const message = `
Dear ${booking.name},

Your appointment has been cancelled:

Service: ${booking.serviceType}
Date: ${booking.date}
Time: ${booking.time}

If this was a mistake or you wish to reschedule, please make a new booking.

Best regards,
The Appointment Team
`;

  const html = `
  <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #111;">
    <h2>Your Appointment Has Been Cancelled</h2>
    <p>Dear ${booking.name},</p>
    <p>Your appointment has been cancelled. The previous details were:</p>
    <ul>
      <li><strong>Service:</strong> ${booking.serviceType}</li>
      <li><strong>Date:</strong> ${booking.date}</li>
      <li><strong>Time:</strong> ${booking.time}</li>
    </ul>
    <p>If this was not intentional or you would like to visit us, you can create a new booking at any time.</p>
    <p>Best regards,<br/>The Appointment Team</p>
  </div>
  `;

  return sendEmail({ email: booking.email, subject, message, html });
};

// Sent to admin when new booking is created
export const sendBookingNotification = async (booking) => {
  const adminEmail = process.env.ADMIN_EMAIL || process.env.EMAIL_TO;
  if (!adminEmail) {
    console.warn('⚠️ ADMIN_EMAIL/EMAIL_TO is not set, skipping admin notification');
    return;
  }

  const subject = 'New Booking Request';
  const message = `
New booking request:

Name: ${booking.name}
Email: ${booking.email}
Phone: ${booking.phone}
Service: ${booking.serviceType}
Date: ${booking.date}
Time: ${booking.time}

Login to the admin dashboard to review.
`;

  const html = `
  <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #111;">
    <h2>New Booking Request</h2>
    <ul>
      <li><strong>Name:</strong> ${booking.name}</li>
      <li><strong>Email:</strong> ${booking.email}</li>
      <li><strong>Phone:</strong> ${booking.phone}</li>
      <li><strong>Service:</strong> ${booking.serviceType}</li>
      <li><strong>Date:</strong> ${booking.date}</li>
      <li><strong>Time:</strong> ${booking.time}</li>
    </ul>
    <p>Login to the admin dashboard to review.</p>
  </div>
  `;

  return sendEmail({ to: adminEmail, subject, message, html });
};
