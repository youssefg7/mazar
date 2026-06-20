import { ExternalLink, Mail, MapPin, Phone } from "lucide-react";
import type { ContactConfig } from "../types";
import { getContactActions } from "../utils/contact";

type ContactSectionProps = {
  contact: ContactConfig;
};

function getInitials(name: string) {
  const words = name.trim().split(/\s+/).filter(Boolean);

  if (words.length === 0) {
    return "";
  }

  return words
    .slice(0, 2)
    .map((word) => word[0]?.toUpperCase())
    .join("");
}

export function ContactSection({ contact }: ContactSectionProps) {
  const actions = getContactActions(contact);
  const photoAlt = contact.photoAlt || `Portrait of ${contact.name}`;

  return (
    <section className="section contact-section" id="contact" aria-labelledby="contact-title">
      <div className="contact-panel">
        <div className="contact-card">
          <div className={contact.photo ? "contact-avatar contact-avatar--photo" : "contact-avatar"}>
            {contact.photo ? <img src={contact.photo} alt={photoAlt} /> : <span aria-hidden="true">{getInitials(contact.name)}</span>}
          </div>
          <div>
            <h2 id="contact-title">{contact.name}</h2>
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
                <a className="contact-link" href={`mailto:${contact.email}`}>
                  {contact.email}
                  <ExternalLink size={14} aria-hidden="true" />
                </a>
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
                <a className="contact-link" href={`tel:${contact.phone.replace(/[^\d+]/g, "")}`}>
                  {contact.phone}
                  <ExternalLink size={14} aria-hidden="true" />
                </a>
              </dd>
            </div>
          ) : null}
          {contact.linkedin ? (
            <div>
              <dt>
                <span className="linkedin-mark" aria-hidden="true">
                  in
                </span>
                LinkedIn
              </dt>
              <dd>
                <a className="contact-link" href={contact.linkedin} target="_blank" rel="noreferrer">
                  LinkedIn profile
                  <ExternalLink size={14} aria-hidden="true" />
                </a>
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
