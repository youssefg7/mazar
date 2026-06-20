export type ContactActionSource = {
  email: string;
  linkedin: string;
  phone: string;
  cvDownload: string;
  cvOnline: string;
};

export type ContactAction = {
  href: string;
  label: string;
  external?: boolean;
};

export function getContactActions(contact: ContactActionSource): ContactAction[] {
  const actions: ContactAction[] = [];

  if (contact.email) {
    actions.push({
      href: `mailto:${contact.email}`,
      label: "Email Me"
    });
  }

  if (contact.phone) {
    actions.push({
      href: `tel:${contact.phone.replace(/[^\d+]/g, "")}`,
      label: "Call"
    });
  }

  if (contact.linkedin) {
    actions.push({
      href: contact.linkedin,
      label: "LinkedIn Profile",
      external: true
    });
  }

  if (contact.cvDownload) {
    actions.push({
      href: contact.cvDownload,
      label: "Download CV"
    });
  }

  if (contact.cvOnline) {
    actions.push({
      href: contact.cvOnline,
      label: "View CV Online",
      external: true
    });
  }

  return actions;
}
