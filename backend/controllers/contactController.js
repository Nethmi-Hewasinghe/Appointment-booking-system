// backend/controllers/contactController.js
import { sendEmail } from "../utils/emailService.js";

export const sendContactMessage = async (req, res) => {
  const { name, email, message } = req.body;

  if (!name || !email || !message) {
    return res.status(400).json({ message: "All fields are required" });
  }

  // Decide which address should receive contact form notifications
  const adminRecipient =
    process.env.EMAIL_TO || process.env.ADMIN_EMAIL || process.env.EMAIL_USER;

  console.log("📩 Contact form submitted by:", email);
  console.log("📨 Admin recipient resolved as:", adminRecipient);

  let adminEmailSent = false;
  let userEmailSent = false;

  // 1) Email to salon / admin
  if (adminRecipient) {
    const adminHtml = `
      <h2>New Contact Message</h2>
      <p><strong>Name:</strong> ${name}</p>
      <p><strong>Email:</strong> ${email}</p>
      <p><strong>Message:</strong></p>
      <p>${message}</p>
    `;

    try {
      await sendEmail({
        to: adminRecipient,
        subject: `New Contact Form Message from ${name}`,
        message: `New contact message from ${name} <${email}>:\n\n${message}`,
        html: adminHtml,
      });
      adminEmailSent = true;
      console.log("✅ Contact email sent to admin:", adminRecipient);
    } catch (err) {
      console.error("❌ Failed to send contact email to admin:", err.message);
    }
  } else {
    console.warn(
      "⚠️ No adminRecipient found in env (EMAIL_TO / ADMIN_EMAIL / EMAIL_USER)"
    );
  }

  // 2) Auto-reply to the user (their own email)
  const userHtml = `
    <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #111;">
      <h2>We received your message</h2>
      <p>Hi ${name},</p>
      <p>Thanks for reaching out to Salon Monarch. We have received your message:</p>
      <blockquote style="border-left: 4px solid #eab308; padding-left: 8px; color: #555;">
        ${message}
      </blockquote>
      <p>We will get back to you as soon as possible.</p>
      <p>Best regards,<br/>Salon Monarch</p>
    </div>
  `;

  try {
    await sendEmail({
      to: email,
      subject: "We received your message",
      message: `Hi ${name},\n\nWe received your message and will get back to you soon.\n\nYour message:\n${message}\n\n– Salon Monarch`,
      html: userHtml,
    });
    userEmailSent = true;
    console.log("✅ Auto-reply sent to user:", email);
  } catch (err) {
    console.error("❌ Failed to send auto-reply to user:", err.message);
  }

  // ✅ Always respond 200 to the frontend (no more “Failed to send message” toast)
  return res.status(200).json({
    message: "Message processed",
    adminEmailSent,
    userEmailSent,
  });
};
