import Image from "next/image";
import Breadcrumb from "./breadcrumb";

export default function ContactHero() {
  return (
    <section className="relative h-[300px] lg:h-[400px] overflow-hidden">
      <div className="absolute inset-0">
        <Image
          src="/images/contactus.png"
          alt="Contact us"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-black/50" />
      </div>

      <div className="relative z-10 container mx-auto px-4 h-full flex flex-col justify-center">
        <div className="mb-6">
          <Breadcrumb items={[{ label: "Contact Us" }]} />
        </div>

        <div className="max-w-2xl">
          <h1 className="text-4xl lg:text-6xl font-bold text-white mb-4">
            Contact Us
          </h1>
          <p className="text-xl text-white/90 leading-relaxed">
            Get in touch with us for any questions about our courses or
            enrollment process
          </p>
        </div>
      </div>
    </section>
  );
}
