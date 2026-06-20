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
        <p>Professional links and downloadable files can be updated from one data file when final details are ready.</p>
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
          ) : (
            <div>
              <dt>
                <Mail size={17} aria-hidden="true" />
                Email
              </dt>
              <dd>Ready to add</dd>
            </div>
          )}
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

        <div className="contact-actions">
          {actions.length > 0 ? (
            actions.map((action) => (
              <a className="button button--secondary" href={action.href} key={action.label} target={action.external ? "_blank" : undefined} rel={action.external ? "noreferrer" : undefined}>
                {action.label}
                {action.external ? <ExternalLink size={17} aria-hidden="true" /> : null}
              </a>
            ))
          ) : (
            <p className="contact-note">Add email, LinkedIn, and CV paths in `src/data/site.ts` to activate contact buttons.</p>
          )}
        </div>
      </div>
    </section>
  );
}
