import { ExternalLink, Mail, MapPin, Phone, University } from "lucide-react";
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
      <div className="section__header contact-section__header">
        <p className="section__eyebrow">Graduate Architect Contact / CV</p>
        <h2 id="contact-title">{contact.name}</h2>
      </div>

      <div className="contact-panel">
        <div className="contact-card">
          <div className={contact.photo ? "contact-avatar contact-avatar--photo contact-avatar--portrait" : "contact-avatar"}>
            {contact.photo ? <img src={contact.photo} alt={photoAlt} /> : <span aria-hidden="true">{getInitials(contact.name)}</span>}
          </div>
          <div>
            <p className="contact-card__role">{contact.role}</p>
          </div>
        </div>

        <dl className="contact-list">
          {contact.university ? (
            <div>
              <dt aria-label="University">
                <University size={17} aria-hidden="true" />
                <span className="contact-label">University</span>
              </dt>
              <dd>{contact.university}</dd>
            </div>
          ) : null}
          {contact.location ? (
            <div>
              <dt aria-label="Location">
                <MapPin size={17} aria-hidden="true" />
                <span className="contact-label">Location</span>
              </dt>
              <dd>{contact.location}</dd>
            </div>
          ) : null}
          {contact.email ? (
            <div>
              <dt aria-label="Email">
                <Mail size={17} aria-hidden="true" />
                <span className="contact-label">Email</span>
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
              <dt aria-label="Phone">
                <Phone size={17} aria-hidden="true" />
                <span className="contact-label">Phone</span>
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
              <dt aria-label="LinkedIn">
                <span className="linkedin-mark" aria-hidden="true">
                  in
                </span>
                <span className="contact-label">LinkedIn</span>
              </dt>
              <dd>
                <a className="contact-link" href={contact.linkedin} target="_blank" rel="noreferrer">
                  LinkedIn Profile
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
                download={action.download ? true : undefined}
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
