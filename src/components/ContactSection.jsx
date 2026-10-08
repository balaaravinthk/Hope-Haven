import { Mail, Phone, MapPin } from "lucide-react";

function ContactSection() {
  const contacts = [
    {
      icon: Mail,
      title: "Email",
      detail: "hopehaven.org@gmail.com",
      href: "mailto:hopehaven.org@gmail.com",
    },
    {
      icon: Phone,
      title: "Phone",
      detail: "+91 98765 43210",
      href: "tel:+919876543210",
    },
    {
      icon: MapPin,
      title: "Address",
      detail: "Coimbatore, Tamil Nadu",
      href: null,
    },
  ];

  return (
    <section id="contact" className="bg-haven-soft py-20 md:py-24">
      <div className="mx-auto max-w-6xl px-5 md:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <p className="font-display text-sm font-bold uppercase tracking-[0.28em] text-leaf">
            Contact
          </p>
          <h2 className="mt-3 font-display text-4xl font-extrabold text-navy md:text-5xl">
            Get in touch
          </h2>
          <p className="mt-5 text-lg leading-8 text-muted">
            Questions, ideas, or ways to help? We would love to hear from you.
          </p>
        </div>

        <div className="mt-14 grid gap-5 md:grid-cols-3">
          {contacts.map(({ icon: Icon, title, detail, href }) => {
            const content = (
              <>
                <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl bg-leaf-soft text-leaf">
                  <Icon size={22} />
                </div>
                <h3 className="mt-5 font-display text-xl font-bold text-navy">
                  {title}
                </h3>
                <p className="mt-2 text-muted">{detail}</p>
              </>
            );

            const className =
              "block rounded-2xl border border-line bg-white p-7 text-center transition-colors hover:border-leaf/40";

            return href ? (
              <a key={title} href={href} className={className}>
                {content}
              </a>
            ) : (
              <div key={title} className={className}>
                {content}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export default ContactSection;
