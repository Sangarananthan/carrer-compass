import { Clock, Download, BookOpen, Users } from "lucide-react";

const features = [
  {
    icon: Users,
    title: "Well-trained Course Guiders",
    description: "Expert instructors with industry experience",
  },
  {
    icon: Clock,
    title: "Flexible Time Slots",
    description: "Choose your preferred learning schedule",
  },
  {
    icon: Download,
    title: "Recorded Classes Provided",
    description: "Access recordings anytime for revision",
  },
  {
    icon: BookOpen,
    title: "Materials Will Be Provided",
    description: "Comprehensive study materials included",
  },
];

export default function AboutFeatures() {
  return (
    <section className="py-8 bg-blue-600">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div key={index} className="text-center text-white">
              <div className="flex justify-center mb-4">
                <div className="p-2 bg-white/20 rounded-full">
                  <feature.icon size={25} />
                </div>
              </div>
              <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
              <p className="text-blue-100 text-sm">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
