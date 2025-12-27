import { Resend } from "resend";
import { SITE_CONFIG } from "@/lib/constants";

const resend = new Resend(process.env.RESEND_API_KEY);

type ContactEmailData = {
  name: string;
  email: string;
  phone?: string;
  company?: string;
  subject?: string;
  message: string;
};

export async function sendContactEmail(formData: ContactEmailData): Promise<{ success: boolean; error?: string }> {
  try {
    if (!process.env.RESEND_API_KEY) {
      return { success: false, error: "Email service not configured" };
    }

    const subjectLine = formData.subject 
      ? `${formData.subject} - Contact Form from ${formData.name}`
      : `Contact Form Message from ${formData.name}`;

    const html = `
      <!DOCTYPE html>
      <html>
        <head>
          <style>
            body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, sans-serif; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { border-bottom: 2px solid #e5e7eb; padding-bottom: 20px; margin-bottom: 20px; }
            .logo { color: #1f2937; font-size: 24px; font-weight: bold; }
            .field { margin-bottom: 15px; }
            .label { font-weight: 600; color: #374151; margin-bottom: 5px; display: block; }
            .value { color: #6b7280; line-height: 1.6; }
            .message-box { background: #f9fafb; padding: 15px; border-radius: 8px; margin-top: 20px; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <div class="logo">${SITE_CONFIG.name}</div>
              <p style="margin-top: 10px; color: #6b7280;">New Contact Form Submission</p>
            </div>
            
            <div class="field">
              <span class="label">Name:</span>
              <span class="value">${escapeHtml(formData.name)}</span>
            </div>
            
            <div class="field">
              <span class="label">Email:</span>
              <span class="value"><a href="mailto:${escapeHtml(formData.email)}">${escapeHtml(formData.email)}</a></span>
            </div>
            
            ${formData.phone ? `
            <div class="field">
              <span class="label">Phone:</span>
              <span class="value">${escapeHtml(formData.phone)}</span>
            </div>
            ` : ''}
            
            ${formData.company ? `
            <div class="field">
              <span class="label">Company:</span>
              <span class="value">${escapeHtml(formData.company)}</span>
            </div>
            ` : ''}
            
            ${formData.subject ? `
            <div class="field">
              <span class="label">Subject:</span>
              <span class="value">${escapeHtml(formData.subject)}</span>
            </div>
            ` : ''}
            
            <div class="message-box">
              <span class="label">Message:</span>
              <p class="value" style="white-space: pre-wrap;">${escapeHtml(formData.message)}</p>
            </div>
            
            <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #e5e7eb; color: #9ca3af; font-size: 12px;">
              <p>This message was sent from the ${SITE_CONFIG.name} website contact form.</p>
              <p>Timestamp: ${new Date().toISOString()}</p>
            </div>
          </div>
        </body>
      </html>
    `;

    const { error } = await resend.emails.send({
      from: `${SITE_CONFIG.name} <onboarding@resend.dev>`,
      to: SITE_CONFIG.email,
      subject: subjectLine,
      replyTo: formData.email,
      html: html,
    });

    if (error) {
      console.error("Resend error:", error);
      return { success: false, error: "Failed to send email" };
    }

    return { success: true };
  } catch (error) {
    console.error("Email send error:", error);
    return { success: false, error: "Failed to send email" };
  }
}

function escapeHtml(text: string): string {
  const map: Record<string, string> = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#039;',
  };
  return text.replace(/[&<>"']/g, (char) => map[char]);
}
