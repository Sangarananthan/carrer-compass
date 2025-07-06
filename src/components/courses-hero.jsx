import Image from "next/image";
import Breadcrumb from "./breadcrumb";

export default function CoursesHero() {
  return (
    <section className="relative h-[400px] lg:h-[500px] overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        <Image
          src="/images/campus-breadcrumb.jpg"
          alt="Campus students"
          fill
          className="object-cover"
          priority
        />
        {/* Overlay */}
        <div className="absolute inset-0 bg-black/50" />
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 h-full flex flex-col justify-center">
        <div className="mb-6">
          <Breadcrumb items={[{ label: "Courses" }]} />
        </div>

        <div className="max-w-2xl">
          <h1 className="text-4xl lg:text-6xl font-bold text-white mb-4">
            Courses We Offer
          </h1>
          <p className="text-xl text-white/90 leading-relaxed">
            Discover our comprehensive range of professional courses designed to
            advance your career
          </p>
        </div>
      </div>
    </section>
  );
}
