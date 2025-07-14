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
            color: #333;
            background-color: #f8fafc;
        }
        
        .container {
            max-width: 600px;
            margin: 0 auto;
            background: white;
            border-radius: 12px;
            overflow: hidden;
            box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
        }
        
        .header {
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: white;
            padding: 30px;
            text-align: center;
        }
        
        .header h1 {
            font-size: 28px;
            font-weight: 600;
            margin-bottom: 8px;
        }
        
        .header p {
            opacity: 0.9;
            font-size: 16px;
        }
        
        .content {
            padding: 30px;
        }
        
        .section {
            margin-bottom: 30px;
        }
        
        .section-title {
            font-size: 20px;
            font-weight: 600;
            color: #374151;
            margin-bottom: 15px;
            padding-bottom: 8px;
            border-bottom: 2px solid #e5e7eb;
        }
        
        .info-grid {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 20px;
            margin-bottom: 20px;
        }
        
        .info-item {
            background: #f8fafc;
            padding: 15px;
            border-radius: 8px;
            border-left: 4px solid #3b82f6;
            margin-bottom: 10px;
        }
        
        .info-item label {
            font-weight: 600;
            color: #374151;
            display: block;
            margin-bottom: 5px;
            font-size: 14px;
            text-transform: uppercase;
            letter-spacing: 0.5px;
        }
        
        .info-item span {
            color: #1f2937;
            font-size: 16px;
        }
        
        .course-highlight {
            background: linear-gradient(135deg, #3b82f6 0%, #1e40af 100%);
            color: white;
            padding: 25px;
            border-radius: 12px;
            margin: 20px 0;
        }
        
        .course-highlight h3 {
            font-size: 22px;
            margin-bottom: 15px;
            font-weight: 600;
        }
        
        .course-details {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(140px, 1fr));
            gap: 15px;
            margin-top: 15px;
        }
        
        .course-detail {
            background: rgba(255, 255, 255, 0.15);
            padding: 12px;
margin: 5px 0;
            text-align: center;
        }
        
        .course-detail-label {
            font-size: 12px;
            opacity: 0.8;
            text-transform: uppercase;
            letter-spacing: 0.5px;
            margin-bottom: 5px;
        }
        
        .course-detail-value {
            font-size: 16px;
            font-weight: 600;
            text-transform: capitalize;
        }
        
        .overview {
            background: #f0f9ff;
            padding: 20px;
            border-radius: 8px;
            border-left: 4px solid #0ea5e9;
            margin-top: 20px;
        }
        
        .overview h4 {
            color: #0c4a6e;
            margin-bottom: 10px;
            font-size: 16px;
            font-weight: 600;
        }
        
        .overview p {
            color: #374151;
            line-height: 1.7;
        }
        
        .message-section {
            background: #fef3c7;
            padding: 20px;
            border-radius: 8px;
            margin-top: 20px;
        }
        
        .message-section h4 {
            color: #92400e;
            margin-bottom: 10px;
            font-size: 16px;
            font-weight: 600;
        }
        
        .message-section p {
            color: #374151;
            font-style: italic;
        }
        
        .footer {
            background: #1f2937;
            color: #d1d5db;
            padding: 25px;
            text-align: center;
        }
        
        .footer p {
            margin-bottom: 10px;
        }
        
        .footer .timestamp {
            font-size: 14px;
            opacity: 0.7;
        }
        
        .priority-badge {
            display: inline-block;
            background: #ef4444;
            color: white;
            padding: 6px 12px;
            border-radius: 20px;
            font-size: 12px;
            font-weight: 600;
            text-transform: uppercase;
            letter-spacing: 0.5px;
            margin-left: 10px;
        }
        
        @media (max-width: 640px) {
            .info-grid {
                grid-template-columns: 1fr;
            }
            
            .course-details {
                grid-template-columns: 1fr;
            }
            
            .container {
                margin: 10px;
                border-radius: 8px;
            }
            
            .content {
                padding: 20px;
            }
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>🎓 Course Enrollment Inquiry</h1>
            <p>New student interested in joining our courses</p>
        </div>
        
        <div class="content">
            <div class="section">
                <h2 class="section-title">👤 Student Information</h2>
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
                <h2 class="section-title">📚 Course Details</h2>
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
                <h2 class="section-title">💬 Additional Message</h2>
                <div class="message-section">
                    <h4>Student's Message:</h4>
                    <p>"${data.message}"</p>
                </div>
            </div>
            `
                : ""
            }
        </div>
        
        <div class="footer">
            <p><strong>⚡ Action Required:</strong> Please respond within 24 hours</p>
            <p><strong>📧 Reply to:</strong> ${data.email}</p>
            <p><strong>📱 Contact:</strong> ${data.mobile}</p>
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
      to: process.env.EMAIL_USER,
      replyTo: enrollmentData.email, 
      subject: `🎓 New Course Enrollment: ${enrollmentData.courseName} - ${enrollmentData.name}`,
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
