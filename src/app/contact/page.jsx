import ContactHero from "@/components/contact-hero";
import ContactForm from "@/components/contact-form";
import ContactInfo from "@/components/contact-info";

export default function ContactPage() {
  return (
    <>
      <ContactHero />
      <div className="flex  my-[2rem] flex-col md:flex-row items-center  w-[100%] justify-evenly px-[1rem] md:px-[2rem] min-h-screen">
        <ContactForm />
        <hr className="w-[100px] md:w-[1px] h-[2px] md:h-[300px] bg-gray-200 mx-8 my-4" />
        <ContactInfo />
      </div>
    </>
  );
}
