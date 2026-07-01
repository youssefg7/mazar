export type ContactActionSource = {
  email: string;
  linkedin: string;
  phone: string;
  cvDownload: string;
  cvOnline: string;
  portfolio: string;
};

export type ContactAction = {
  href: string;
  label: string;
  external?: boolean;
};

export function getContactActions(contact: ContactActionSource): ContactAction[] {
  const actions: ContactAction[] = [];
  const cvHref = contact.cvOnline || contact.cvDownload;

  if (cvHref) {
    actions.push({
      href: cvHref,
      label: "View Lara's CV",
      external: true
    });
  }

  if (contact.portfolio) {
    actions.push({
      href: contact.portfolio,
      label: "View Lara's Portfolio",
      external: true
    });
  }

  return actions;
}
