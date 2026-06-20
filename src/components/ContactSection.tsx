import { ExternalLink, Mail, MapPin, Phone } from "lucide-react";
import type { ContactConfig } from "../types";
import { getContactActions } from "../utils/contact";

type ContactSectionProps = {
  contact: ContactConfig;
};

export function ContactSection({ contact }: ContactSectionProps) {
  const actions = getContactActions(contact);

  return (
    <section className="section contact-section" id="contact" aria-labelledby="contact-title">
      <div className="section__header">
        <p className="section__eyebrow">Contact / CV</p>
        <h2 id="contact-title">Project owner</h2>
        <p>Portfolio contact details and professional links.</p>
      </div>

      <div className="contact-panel">
        <div className="contact-card">
          <div className="contact-avatar" aria-hidden="true">
            YG
          </div>
          <div>
            <h3>{contact.name}</h3>
            <p>{contact.role}</p>
          </div>
        </div>

        <dl className="contact-list">
          {contact.location ? (
            <div>
              <dt>
                <MapPin size={17} aria-hidden="true" />
                Location
              </dt>
              <dd>{contact.location}</dd>
            </div>
          ) : null}
          {contact.email ? (
            <div>
              <dt>
                <Mail size={17} aria-hidden="true" />
                Email
              </dt>
              <dd>
                <a href={`mailto:${contact.email}`}>{contact.email}</a>
              </dd>
            </div>
          ) : null}
          {contact.phone ? (
            <div>
              <dt>
                <Phone size={17} aria-hidden="true" />
                Phone
              </dt>
              <dd>
                <a href={`tel:${contact.phone.replace(/[^\d+]/g, "")}`}>{contact.phone}</a>
              </dd>
            </div>
          ) : null}
        </dl>

        {actions.length > 0 ? (
          <div className="contact-actions">
            {actions.map((action) => (
              <a
                className="button button--secondary"
                href={action.href}
                key={action.label}
                target={action.external ? "_blank" : undefined}
                rel={action.external ? "noreferrer" : undefined}
              >
                {action.label}
                {action.external ? <ExternalLink size={17} aria-hidden="true" /> : null}
              </a>
            ))}
          </div>
        ) : null}
      </div>
    </section>
  );
}
