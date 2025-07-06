"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu, MessageCircle, Mail, GraduationCap } from "lucide-react";
import EnrollmentModal from "./enrollment-modal.jsx";

export default function Header() {
  const [isAdmin, setIsAdmin] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [showEnrollmentModal, setShowEnrollmentModal] = useState(false);

  useEffect(() => {
    // Check if admin is logged in
    const token = document.cookie
      .split(";")
      .find((c) => c.trim().startsWith("admin_token="));
    setIsAdmin(!!token);

    // Check screen size
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkScreenSize();
    window.addEventListener("resize", checkScreenSize);
    return () => window.removeEventListener("resize", checkScreenSize);
  }, []);

  const handleWhatsAppClick = () => {
    const message = encodeURIComponent(
      "Hi, I would like to enroll courses on Career Compass"
    );
    window.open(
      `https://wa.me/${process.env.NEXT_PUBLIC_WHATSAPP_NUMBER}?text=${message}`,
      "_blank"
    );
  };

  const handleEmailClick = () => {
    const subject = encodeURIComponent("Course Enrollment Inquiry");
    const body = encodeURIComponent(
      "Hi, I would like to enroll courses on Career Compass"
    );
    window.open(
      `mailto:${process.env.NEXT_PUBLIC_EMAIL}?subject=${subject}&body=${body}`,
      "_blank"
    );
  };

  const NavItems = () => (
    <>
      <Link
        href="/"
        className="text-sm font-medium hover:text-blue-600 transition-colors"
      >
        Home
      </Link>
      <Link
        href="/about"
        className="text-sm font-medium hover:text-blue-600 transition-colors"
      >
        About Us
      </Link>
      <Link
        href="/courses"
        className="text-sm font-medium hover:text-blue-600 transition-colors"
      >
        Courses
      </Link>
      <Link
        href="/contact"
        className="text-sm font-medium hover:text-blue-600 transition-colors"
      >
        Contact Us
      </Link>
      {isAdmin && (
        <Link
          href="/manage"
          className="text-sm font-medium hover:text-blue-600 transition-colors"
        >
          Manage
        </Link>
      )}
    </>
  );

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center space-x-2">
          <GraduationCap className="h-8 w-8 text-blue-600" />
          <span className="text-xl font-bold text-gray-900">CareerCompass</span>
        </Link>

        {/* Desktop Navigation */}
        {!isMobile && (
          <nav className="hidden md:flex items-center space-x-8">
            <NavItems />
          </nav>
        )}

        {/* Right Side Actions */}
        <div className="flex items-center space-x-4">
          {!isMobile && (
            <>
              <Button
                variant="ghost"
                size="sm"
                onClick={handleWhatsAppClick}
                className="text-green-600 hover:text-green-700"
              >
                <MessageCircle className="h-4 w-4" />
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={handleEmailClick}
                className="text-blue-600 hover:text-blue-700"
              >
                <Mail className="h-4 w-4" />
              </Button>
            </>
          )}

          <Button
            onClick={() => setShowEnrollmentModal(true)}
            className="bg-blue-600 hover:bg-blue-700"
          >
            Enroll Now
          </Button>

          {/* Mobile Menu */}
          {isMobile && (
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="sm">
                  <Menu className="h-5 w-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[300px] sm:w-[400px]">
                <nav className="flex flex-col space-y-4 mt-8">
                  <NavItems />
                  <div className="flex space-x-4 pt-4 border-t">
                    <Button
                      variant="outline"
                      onClick={handleWhatsAppClick}
                      className="flex-1 bg-transparent"
                    >
                      <MessageCircle className="h-4 w-4 mr-2" />
                      WhatsApp
                    </Button>
                    <Button
                      variant="outline"
                      onClick={handleEmailClick}
                      className="flex-1 bg-transparent"
                    >
                      <Mail className="h-4 w-4 mr-2" />
                      Email
                    </Button>
                  </div>
                </nav>
              </SheetContent>
            </Sheet>
          )}
        </div>
      </div>
      <EnrollmentModal
        isOpen={showEnrollmentModal}
        onClose={() => setShowEnrollmentModal(false)}
        preSelectedCourse={null}
      />
    </header>
  );
}
