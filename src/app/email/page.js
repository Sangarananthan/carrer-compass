// pages/index.js
"use client";
import { useState } from "react";

export default function Home() {
  const [status, setStatus] = useState("");

  const handleSendMail = async () => {
    setStatus("Sending...");
    try {
      const res = await fetch("/api/send-email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          to: "sangarsmart16@gmail.com",
          subject: "Test Email from Next.js",
          text: "This is a test email sent using Nodemailer and Next.js API route.",
        }),
      });
      const data = await res.json();
      setStatus(data.message);
    } catch (error) {
      console.error(error);
      setStatus("Error sending email");
    }
  };

  return (
    <div style={{ padding: "2rem" }}>
      <button onClick={handleSendMail} style={{ padding: "0.5rem 1rem" }}>
        Send Test Email
      </button>
      <p>{status}</p>
    </div>
  );
}
