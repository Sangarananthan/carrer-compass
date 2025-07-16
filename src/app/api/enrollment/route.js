import nodemailer from "nodemailer";

function createEnrollmentEmailTemplate(data) {
  return `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Course Enrollment Inquiry</title>
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
            background: #1a202c;
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
        
        .course-highlight {
            background: #edf2f7;
            padding: 24px;
            border-radius: 6px;
            border: 1px solid #e2e8f0;
            margin: 16px 0;
        }
        
        .course-highlight h3 {
            font-size: 20px;
            margin-bottom: 16px;
            font-weight: 600;
            color: #1a202c;
        }
        
        .course-details {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(140px, 1fr));
            gap: 12px;
            margin-top: 16px;
        }
        
        .course-detail {
            background: #ffffff;
            padding: 16px;
            border-radius: 6px;
            border: 1px solid #e2e8f0;
            text-align: center;
        }
        
        .course-detail-label {
            font-size: 12px;
            color: #718096;
            text-transform: uppercase;
            font-weight: 500;
            letter-spacing: 0.5px;
            margin-bottom: 6px;
        }
        
        .course-detail-value {
            font-size: 16px;
            font-weight: 500;
            color: #1a202c;
            text-transform: capitalize;
        }
        
        .overview {
            background: #f0fff4;
            padding: 20px;
            border-radius: 6px;
            border: 1px solid #9ae6b4;
            margin-top: 16px;
        }
        
        .overview h4 {
            color: #276749;
            margin-bottom: 8px;
            font-size: 16px;
            font-weight: 600;
        }
        
        .overview p {
            color: #2d3748;
            line-height: 1.6;
        }
        
        .message-section {
            background: #fffbeb;
            padding: 20px;
            border-radius: 6px;
            border: 1px solid #fbbf24;
            margin-top: 16px;
        }
        
        .message-section h4 {
            color: #92400e;
            margin-bottom: 8px;
            font-size: 16px;
            font-weight: 600;
        }
        
        .message-section p {
            color: #2d3748;
            font-style: italic;
            line-height: 1.6;
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
            background: #e53e3e;
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
            
            .course-details {
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
            <h1>Course Enrollment Inquiry</h1>
            <p>New student application received</p>
        </div>
        
        <div class="content">
            <div class="section">
                <h2 class="section-title">Student Information</h2>
                <div class="info-grid">
                    <div class="info-item">
                        <label>Full Name</label>
                        <span>${data.name}</span>
                    </div>
                    <div class="info-item">
                        <label>Email Address</label>
                        <span>${data.email}</span>
                    </div>
                    <div class="info-item">
                        <label>Mobile Number</label>
                        <span>${data.mobile}</span>
                    </div>
                    <div class="info-item">
                        <label>Course Category</label>
                        <span>${data.categoryName}</span>
                    </div>
                </div>
            </div>
            
            <div class="section">
                <h2 class="section-title">Course Details</h2>
                <div class="course-highlight">
                    <h3>${data.courseName}</h3>
                    <div class="course-details">
                        <div class="course-detail">
                            <div class="course-detail-label">Duration</div>
                            <div class="course-detail-value">${data.courseDetails.duration} months</div>
                        </div>
                        <div class="course-detail">
                            <div class="course-detail-label">Mode</div>
                            <div class="course-detail-value">${data.courseDetails.mode}</div>
                        </div>
                        <div class="course-detail">
                            <div class="course-detail-label">Language</div>
                            <div class="course-detail-value">${data.courseDetails.language}</div>
                        </div>
                    </div>
                </div>
            </div>
            
            ${
              data.message &&
              data.message.trim() !== "" &&
              data.message.toLowerCase() !== "none"
                ? `
            <div class="section">
                <h2 class="section-title">Additional Message</h2>
                <div class="message-section">
                    <h4>Student's Message</h4>
                    <p>"${data.message}"</p>
                </div>
            </div>
            `
                : ""
            }
        </div>
        
        <div class="footer">
            <div class="action-item">
                <strong>Action Required:</strong> Please respond within 24 hours
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
    const enrollmentData = await req.json();

    const emailHtml = createEnrollmentEmailTemplate(enrollmentData);

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
      replyTo: enrollmentData.email,
      subject: `New Course Enrollment: ${enrollmentData.courseName} - ${enrollmentData.name}`,
      html: emailHtml,
      text: `
New Course Enrollment Inquiry

Student Information:
- Name: ${enrollmentData.name}
- Email: ${enrollmentData.email}
- Mobile: ${enrollmentData.mobile}

Course Details:
- Course: ${enrollmentData.courseName}
- Category: ${enrollmentData.categoryName}
- Duration: ${enrollmentData.courseDetails.duration} months
- Mode: ${enrollmentData.courseDetails.mode}
- Language: ${enrollmentData.courseDetails.language}

${
  enrollmentData.message &&
  enrollmentData.message.trim() !== "" &&
  enrollmentData.message.toLowerCase() !== "none"
    ? `
Additional Message:
"${enrollmentData.message}"
`
    : ""
}

Submitted on: ${enrollmentData.submittedAt}
Reply to: ${enrollmentData.email}
Contact: ${enrollmentData.mobile}
      `,
    };

    await transporter.sendMail(mailOptions);

    return new Response(
      JSON.stringify({
        message: "Enrollment inquiry submitted successfully",
        success: true,
      }),
      {
        status: 200,
        headers: { "Content-Type": "application/json" },
      }
    );
  } catch (error) {
    console.error("Enrollment submission error:", error);
    return new Response(
      JSON.stringify({
        message: "Failed to submit enrollment inquiry",
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
