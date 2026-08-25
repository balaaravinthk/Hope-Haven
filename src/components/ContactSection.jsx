import { Mail, Phone, MapPin } from "lucide-react";

function ContactSection() {
  return (
    <section
      id="contact"
      className="py-24 bg-gradient-to-br from-[#FAFAFA] via-[#F3F4F6] to-[#E5E7EB]"
    >
      <div className="max-w-6xl mx-auto px-8">

        <p className="text-green-600 font-semibold uppercase tracking-[0.25em] text-center">
          CONTACT
        </p>

        <h2 className="mt-4 text-5xl font-bold text-center text-slate-800">
          Get In
          <span className="text-green-600"> Touch</span>
        </h2>

        <p className="mt-6 text-center text-lg text-slate-600 max-w-2xl mx-auto">
          Have questions or want to support Hope Haven?
          We'd love to hear from you.
        </p>

        <div className="grid md:grid-cols-3 gap-8 mt-16">

          <div className="bg-white rounded-3xl p-8 shadow-md border border-gray-200 text-center hover:shadow-xl transition-all duration-300">
            <Mail className="mx-auto text-green-600" size={36} />
            <h3 className="mt-5 text-xl font-semibold text-slate-800">
              Email
            </h3>
            <p className="mt-3 text-slate-600">
              support@hopehaven.org
            </p>
          </div>

          <div className="bg-white rounded-3xl p-8 shadow-md border border-gray-200 text-center hover:shadow-xl transition-all duration-300">
            <Phone className="mx-auto text-green-600" size={36} />
            <h3 className="mt-5 text-xl font-semibold text-slate-800">
              Phone
            </h3>
            <p className="mt-3 text-slate-600">
              +91 98765 43210
            </p>
          </div>

          <div className="bg-white rounded-3xl p-8 shadow-md border border-gray-200 text-center hover:shadow-xl transition-all duration-300">
            <MapPin className="mx-auto text-green-600" size={36} />
            <h3 className="mt-5 text-xl font-semibold text-slate-800">
              Address
            </h3>
            <p className="mt-3 text-slate-600">
              Coimbatore, Tamil Nadu
            </p>
          </div>

        </div>

      </div>
    </section>
  );
}

export default ContactSection;