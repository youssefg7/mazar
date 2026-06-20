import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { ContactSection } from "./ContactSection";

const baseContact = {
  name: "Lara Sameeh",
  role: "Architecture Graduate",
  email: "larasameeh249@gmail.com",
  phone: "",
  location: "Cairo, Egypt",
  linkedin: "https://www.linkedin.com/in/lara-sameeh-6b07a5312/",
  cvDownload: "",
  cvOnline: "",
  behance: "",
  photo: "",
  photoAlt: ""
};

describe("ContactSection", () => {
  it("uses Lara's name as the section heading without project-owner intro copy", () => {
    render(<ContactSection contact={baseContact} />);

    expect(screen.getByRole("region", { name: "Lara Sameeh" })).toBeTruthy();
    expect(screen.getByRole("heading", { name: "Lara Sameeh", level: 2 })).toBeTruthy();
    expect(screen.queryByText("Project owner")).toBeNull();
    expect(screen.queryByText("Portfolio contact details and professional links.")).toBeNull();
  });

  it("renders a configured portrait instead of initials", () => {
    render(
      <ContactSection
        contact={{
          ...baseContact,
          photo: "/images/contact/lara-sameeh.webp",
          photoAlt: "Portrait of Lara Sameeh"
        }}
      />
    );

    expect(screen.getByRole("img", { name: "Portrait of Lara Sameeh" }).getAttribute("src")).toBe(
      "/images/contact/lara-sameeh.webp"
    );
  });

  it("shows email and LinkedIn as direct contact links", () => {
    render(<ContactSection contact={baseContact} />);

    expect(screen.getByRole("link", { name: /larasameeh249@gmail.com/i }).getAttribute("href")).toBe(
      "mailto:larasameeh249@gmail.com"
    );
    expect(screen.getByRole("link", { name: /LinkedIn profile/i }).getAttribute("href")).toBe(
      "https://www.linkedin.com/in/lara-sameeh-6b07a5312/"
    );
  });
});
