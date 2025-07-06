import { Globe } from "lucide-react";

export default function AboutContent() {
  return (
    <section className="py-16 lg:py-24">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-[0rem] md:mb-16">
            <div className="flex items-center justify-center mb-4">
              <Globe className="h-8 w-8 text-blue-800 mr-3" />
              <span className="text-blue-800 font-medium text-lg">
                Software Training Institute
              </span>
            </div>
            <h2 className="text-3xl lg:text-5xl font-bold text-gray-900 mb-8">
              A few words about{" "}
              <span className="text-blue-800">Career Compass</span>
            </h2>
          </div>

          <div className="prose prose-lg max-w-none text-justify">
            <p className="text-xl leading-relaxed text-gray-700 mb-8">
              Career Compass is a skill-building academy dedicated to shaping
              future professionals through practical, beginner-friendly
              training. With{" "}
              <span className="font-bold text-blue-800 bg-blue-50 px-2 py-1 rounded">
                30+ expertly crafted courses
              </span>{" "}
              offered both{" "}
              <span className="font-bold text-blue-800 bg-blue-50 px-2 py-1 rounded">
                online and offline
              </span>
              , we provide flexible learning paths tailored to individual goals.
            </p>

            <p className="text-xl leading-relaxed text-gray-700 mb-8">
              With over{" "}
              <span className="font-bold text-blue-800 bg-blue-50 px-2 py-1 rounded">
                3 years of industry experience
              </span>
              , our team not only focuses on delivering strong foundational
              knowledge but also supports learners with{" "}
              <span className="font-bold text-blue-800 bg-blue-50 px-2 py-1 rounded">
                Personalized Resume preparation, Placement assistance and job
                readiness
              </span>
              ,{" "}
              <span className="font-bold text-blue-800 bg-blue-50 px-2 py-1 rounded">
                One-on-one trainer support for beginners
              </span>
              .
            </p>

            <p className="text-xl leading-relaxed text-gray-700">
              Whether you're a student stepping into the professional world or a
              job seeker looking to upskill, Career Compass is here to{" "}
              <span className="font-bold text-blue-800 bg-blue-50 px-2 py-1 rounded">
                guide you forward
              </span>
              —with clarity, confidence, and commitment.
            </p>
          </div>

        
        </div>
      </div>
    </section>
  );
}
