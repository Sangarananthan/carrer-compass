"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu, MessageCircle, Mail, GraduationCap, X } from "lucide-react";
import EnrollmentModal from "./enrollment-modal.jsx";
import Image from "next/image.js";

export default function Header() {
  const [isMobile, setIsMobile] = useState(false);
  const [showEnrollmentModal, setShowEnrollmentModal] = useState(false);
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
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

  const handleNavItemClick = () => {
    setIsSheetOpen(false);
  };

  const NavItems = ({ mobile = false }) => (
    <>
      <Link
        href="/"
        className={`${
          mobile
            ? `text-lg font-medium transition-all duration-200 py-3 px-4 rounded-lg ${
                pathname === "/"
                  ? "bg-blue-50 text-blue-700 border-l-4 border-blue-600"
                  : "text-gray-800 hover:text-blue-600 hover:bg-gray-50"
              }`
            : `text-sm font-medium transition-colors ${
                pathname === "/"
                  ? "text-blue-600 font-semibold"
                  : "hover:text-blue-600"
              }`
        }`}
        onClick={mobile ? handleNavItemClick : undefined}
      >
        Home
      </Link>
      <Link
        href="/about"
        className={`${
          mobile
            ? `text-lg font-medium transition-all duration-200 py-3 px-4 rounded-lg ${
                pathname === "/about"
                  ? "bg-blue-50 text-blue-700 border-l-4 border-blue-600"
                  : "text-gray-800 hover:text-blue-600 hover:bg-gray-50"
              }`
            : `text-sm font-medium transition-colors ${
                pathname === "/about"
                  ? "text-blue-600 font-semibold"
                  : "hover:text-blue-600"
              }`
        }`}
        onClick={mobile ? handleNavItemClick : undefined}
      >
        About Us
      </Link>
      <Link
        href="/courses"
        className={`${
          mobile
            ? `text-lg font-medium transition-all duration-200 py-3 px-4 rounded-lg ${
                pathname === "/courses"
                  ? "bg-blue-50 text-blue-700 border-l-4 border-blue-600"
                  : "text-gray-800 hover:text-blue-600 hover:bg-gray-50"
              }`
            : `text-sm font-medium transition-colors ${
                pathname === "/courses"
                  ? "text-blue-600 font-semibold"
                  : "hover:text-blue-600"
              }`
        }`}
        onClick={mobile ? handleNavItemClick : undefined}
      >
        Courses
      </Link>
      <Link
        href="/contact"
        className={`${
          mobile
            ? `text-lg font-medium transition-all duration-200 py-3 px-4 rounded-lg ${
                pathname === "/contact"
                  ? "bg-blue-50 text-blue-700 border-l-4 border-blue-600"
                  : "text-gray-800 hover:text-blue-600 hover:bg-gray-50"
              }`
            : `text-sm font-medium transition-colors ${
                pathname === "/contact"
                  ? "text-blue-600 font-semibold"
                  : "hover:text-blue-600"
              }`
        }`}
        onClick={mobile ? handleNavItemClick : undefined}
      >
        Contact Us
      </Link>
    </>
  );

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-white">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center space-x-2">
          <Image
            src="/images/logo.png"
            alt="Career Compass Logo"
            width={40}
            height={40}
            className="rounded-full "
          />
          <span className="text-xl font-bold text-gray-900 tracking-tight">
            CareerCompass
          </span>
        </Link>

        {!isMobile && (
          <nav className="hidden md:flex items-center space-x-8">
            <NavItems />
          </nav>
        )}

        <div className="flex items-center space-x-3">
          {!isMobile && (
            <>
              <Button
                variant="ghost"
                size="sm"
                onClick={handleWhatsAppClick}
                className="text-green-600 hover:text-green-700 hover:bg-green-50 rounded-full p-2"
              >
                <MessageCircle className="h-4 w-4" />
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={handleEmailClick}
                className="text-blue-600 hover:text-blue-700 hover:bg-blue-50 rounded-full p-2"
              >
                <Mail className="h-4 w-4" />
              </Button>
            </>
          )}

          <Button
            onClick={() => setShowEnrollmentModal(true)}
            className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white px-6 py-2 rounded-full font-medium transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105"
          >
            <GraduationCap className="h-4 w-4 mr-2" />
            Enroll Now
          </Button>

          {/* Mobile Menu */}
          {isMobile && (
            <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
              <SheetTrigger asChild>
                <Button
                  variant="ghost"
                  size="sm"
                  className="p-2 hover:bg-gray-100 rounded-full transition-all duration-200"
                >
                  <Menu className="h-5 w-5" />
                </Button>
              </SheetTrigger>
              <SheetContent
                side="right"
                className="w-[320px] p-0 bg-white/98 backdrop-blur-lg border-l border-gray-200"
              >
                <nav className="flex flex-col p-6 space-y-1">
                  <NavItems mobile={true} />

                  {/* Contact buttons in mobile */}
                  <div className="pt-6 space-y-3">
                    <div className="text-sm font-medium text-gray-500 uppercase tracking-wide">
                      Get in Touch
                    </div>
                    <Button
                      variant="outline"
                      onClick={() => {
                        handleWhatsAppClick();
                        setIsSheetOpen(false);
                      }}
                      className="w-full justify-start bg-green-50 border-green-200 text-green-700 hover:bg-green-100 hover:border-green-300 transition-all duration-200"
                    >
                      <MessageCircle className="h-4 w-4 mr-3" />
                      WhatsApp
                    </Button>
                    <Button
                      variant="outline"
                      onClick={() => {
                        handleEmailClick();
                        setIsSheetOpen(false);
                      }}
                      className="w-full justify-start bg-blue-50 border-blue-200 text-blue-700 hover:bg-blue-100 hover:border-blue-300 transition-all duration-200"
                    >
                      <Mail className="h-4 w-4 mr-3" />
                      Email
                    </Button>
                  </div>

                  {/* Enroll button in mobile */}
                  <div className="pt-4">
                    <Button
                      onClick={() => {
                        setShowEnrollmentModal(true);
                        setIsSheetOpen(false);
                      }}
                      className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white py-3 rounded-full font-medium transition-all duration-200 shadow-lg"
                    >
                      <GraduationCap className="h-4 w-4 mr-2" />
                      Enroll Now
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
