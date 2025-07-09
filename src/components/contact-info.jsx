"use client";

import { Card, CardContent } from "@/components/ui/card";
import { MapPin, Phone, Mail, Clock, MessageCircle } from "lucide-react";

export default function ContactInfo() {
  const handleWhatsAppClick = () => {
    const message = encodeURIComponent(
      "Hi, I have a question about CareerCompass courses"
    );
    window.open(
      `https://wa.me/${process.env.NEXT_PUBLIC_WHATSAPP_NUMBER}?text=${message}`,
      "_blank"
    );
  };

  const handleEmailClick = () => {
    const subject = encodeURIComponent("General Inquiry - CareerCompass");
    const body = encodeURIComponent(
      "Hi, I have a question about CareerCompass courses"
    );
    window.open(
      `mailto:${process.env.NEXT_PUBLIC_EMAIL}?subject=${subject}&body=${body}`,
      "_blank"
    );
  };

  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Get in Touch</h2>
        <p className="text-gray-600">
          We're here to help you with any questions about our courses
        </p>
      </div>

      <div className="grid gap-6">
        <Card
          className="hover:shadow-lg transition-shadow cursor-pointer"
          onClick={handleEmailClick}
        >
          <CardContent className="py-2 px-5">
            <div className="flex items-start space-x-4">
              <div className="p-3 bg-purple-100 rounded-full">
                <Mail className="h-6 w-6 text-purple-600" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 mb-1">
                  Email Address
                </h3>
                <p className="text-gray-600 text-sm">
                  {process.env.NEXT_PUBLIC_EMAIL}
                </p>
                <p className="text-xs text-gray-500 mt-1">
                  We'll respond within 24 hours
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card
          className="hover:shadow-lg transition-shadow cursor-pointer"
          onClick={handleWhatsAppClick}
        >
          <CardContent className="py-2 px-5">
            <div className="flex items-start space-x-4">
              <div className="p-3 bg-green-100 rounded-full">
                <MessageCircle className="h-6 w-6 text-green-600" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 mb-1">WhatsApp</h3>
                <p className="text-gray-600 text-sm">
                  +91 {process.env.NEXT_PUBLIC_WHATSAPP_NUMBER}
                </p>
                <p className="text-xs text-gray-500 mt-1">
                  Quick responses available
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-shadow">
          <CardContent className="py-2 px-5">
            <div className="flex items-start space-x-4">
              <div className="p-3 bg-orange-100 rounded-full">
                <Clock className="h-6 w-6 text-orange-600" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 mb-1">
                  Office Hours
                </h3>
                <div className="text-gray-600 text-sm space-y-1">
                  <p>Monday - Friday: 9:00 AM - 6:00 PM</p>
                  <p>Saturday: 9:00 AM - 4:00 PM</p>
                  <p>Sunday: Closed</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
