import nodemailer from "nodemailer";

function createContactEmailTemplate(data) {
  return `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Contact Form Inquiry</title>
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }
        
        body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;
            line-height: 1.6;
            color: #2d3748;
            background-color: #f7fafc;
        }
        
        .container {
            max-width: 600px;
            margin: 20px auto;
            background: #ffffff;
            border-radius: 8px;
            overflow: hidden;
            border: 1px solid #e2e8f0;
        }
        
        .header {
            background: #2563eb;
            color: #ffffff;
            padding: 32px;
            text-align: center;
        }
        
        .header h1 {
            font-size: 24px;
            font-weight: 600;
            margin-bottom: 8px;
        }
        
        .header p {
            opacity: 0.9;
            font-size: 16px;
            font-weight: 400;
        }
        
        .content {
            padding: 32px;
        }
        
        .section {
            margin-bottom: 32px;
        }
        
        .section:last-child {
            margin-bottom: 0;
        }
        
        .section-title {
            font-size: 18px;
            font-weight: 600;
            color: #1a202c;
            margin-bottom: 16px;
            padding-bottom: 8px;
            border-bottom: 1px solid #e2e8f0;
        }
        
        .info-grid {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 16px;
        }
        
        .info-item {
            background: #f8fafc;
            padding: 16px;
            border-radius: 6px;
            border: 1px solid #e2e8f0;
        }
        
        .info-item label {
            font-weight: 500;
            color: #4a5568;
            display: block;
            margin-bottom: 4px;
            font-size: 14px;
        }
        
        .info-item span {
            color: #1a202c;
            font-size: 16px;
            font-weight: 400;
        }
        
        .message-section {
            background: #f0f9ff;
            padding: 24px;
            border-radius: 6px;
            border: 1px solid #60a5fa;
            margin-top: 16px;
        }
        
        .message-section h4 {
            color: #1d4ed8;
            margin-bottom: 12px;
            font-size: 16px;
            font-weight: 600;
        }
        
        .message-section p {
            color: #2d3748;
            line-height: 1.6;
            white-space: pre-wrap;
            font-size: 15px;
        }
        
        .footer {
            background: #f8fafc;
            color: #4a5568;
            padding: 24px 32px;
            text-align: center;
            border-top: 1px solid #e2e8f0;
        }
        
        .footer p {
            margin-bottom: 8px;
            font-size: 14px;
        }
        
        .footer .timestamp {
            font-size: 13px;
            color: #718096;
            margin-top: 12px;
        }
        
        .priority-badge {
            display: inline-block;
            background: #10b981;
            color: #ffffff;
            padding: 4px 8px;
            border-radius: 4px;
            font-size: 12px;
            font-weight: 500;
            text-transform: uppercase;
            letter-spacing: 0.5px;
            margin-left: 8px;
        }
        
        .action-item {
            background: #ffffff;
            border: 1px solid #e2e8f0;
            padding: 16px;
            border-radius: 6px;
            margin-bottom: 12px;
        }
        
        .action-item strong {
            color: #1a202c;
            font-weight: 600;
        }
        
        .contact-highlight {
            background: #eff6ff;
            padding: 20px;
            border-radius: 6px;
            border: 1px solid #3b82f6;
            margin: 16px 0;
        }
        
        .contact-highlight h3 {
            font-size: 18px;
            margin-bottom: 12px;
            font-weight: 600;
            color: #1e40af;
        }
        
        .contact-details {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
            gap: 12px;
            margin-top: 12px;
        }
        
        .contact-detail {
            background: #ffffff;
            padding: 12px;
            border-radius: 6px;
            border: 1px solid #e2e8f0;
        }
        
        .contact-detail-label {
            font-size: 12px;
            color: #6b7280;
            text-transform: uppercase;
            font-weight: 500;
            letter-spacing: 0.5px;
            margin-bottom: 4px;
        }
        
        .contact-detail-value {
            font-size: 14px;
            font-weight: 500;
            color: #1a202c;
        }
        
        @media (max-width: 640px) {
            .container {
                margin: 10px;
                border-radius: 6px;
            }
            
            .content {
                padding: 20px;
            }
            
            .header {
                padding: 24px;
            }
            
            .info-grid {
                grid-template-columns: 1fr;
            }
            
            .contact-details {
                grid-template-columns: 1fr;
            }
            
            .footer {
                padding: 20px;
            }
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>Contact Form Inquiry</h1>
            <p>New message received from website</p>
        </div>
        
        <div class="content">
            <div class="section">
                <h2 class="section-title">Contact Information</h2>
                <div class="contact-highlight">
                    <h3>Message from: ${data.name}</h3>
                    <div class="contact-details">
                        <div class="contact-detail">
                            <div class="contact-detail-label">Email Address</div>
                            <div class="contact-detail-value">${data.email}</div>
                        </div>
                        <div class="contact-detail">
                            <div class="contact-detail-label">Mobile Number</div>
                            <div class="contact-detail-value">${data.mobile}</div>
                        </div>
                    </div>
                </div>
            </div>
            
            <div class="section">
                <h2 class="section-title">Message Details</h2>
                <div class="message-section">
                    <h4>Customer's Message:</h4>
                    <p>${data.message}</p>
                </div>
            </div>
        </div>
        
        <div class="footer">
            <div class="action-item">
                <strong>Action Required:</strong> Please respond within 24 hours
                <span class="priority-badge">Contact</span>
            </div>
            <div class="action-item">
                <strong>Reply to:</strong> ${data.email}
            </div>
            <div class="action-item">
                <strong>Contact:</strong> ${data.mobile}
            </div>
            <p class="timestamp">Submitted on: ${data.submittedAt}</p>
        </div>
    </div>
</body>
</html>
  `;
}

export async function POST(req) {
  try {
    const contactData = await req.json();

    // Add timestamp
    const submittedAt = new Date().toLocaleString("en-IN", {
      timeZone: "Asia/Kolkata",
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    });

    const emailData = {
      ...contactData,
      submittedAt,
    };

    const emailHtml = createContactEmailTemplate(emailData);

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: process.env.EMAIL_RECEIVER,
      replyTo: contactData.email,
      subject: `New Contact Form Inquiry - ${contactData.name}`,
      html: emailHtml,
      text: `
New Contact Form Inquiry

Contact Information:
- Name: ${contactData.name}
- Email: ${contactData.email}
- Mobile: ${contactData.mobile}

Message:
${contactData.message}

Submitted on: ${submittedAt}
Reply to: ${contactData.email}
Contact: ${contactData.mobile}
      `,
    };

    await transporter.sendMail(mailOptions);

    return new Response(
      JSON.stringify({
        message: "Contact form submitted successfully",
        success: true,
      }),
      {
        status: 200,
        headers: { "Content-Type": "application/json" },
      }
    );
  } catch (error) {
    console.error("Contact form submission error:", error);
    return new Response(
      JSON.stringify({
        message: "Failed to submit contact form",
        error: error.message,
        success: false,
      }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      }
    );
  }
}
