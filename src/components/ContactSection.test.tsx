import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { contactConfig } from "../data/site";
import { ContactSection } from "./ContactSection";

const baseContact = {
  name: "Lara Sameeh Shoukry",
  role: "Housing Architecture and Urban Development Graduate",
  email: "larasameeh249@gmail.com",
  phone: "",
  university: "Faculty of Engineering, Ain Shams University",
  location: "Cairo, Egypt",
  linkedin: "https://www.linkedin.com/in/lara-sameeh-6b07a5312/",
  cvDownload: "",
  cvOnline: "",
  portfolio: "",
  behance: "",
  photo: "",
  photoAlt: ""
};

describe("ContactSection", () => {
  it("keeps the contact eyebrow and removes only the project-owner intro copy", () => {
    render(<ContactSection contact={baseContact} />);

    expect(screen.getByRole("region", { name: "Lara Sameeh Shoukry" })).toBeTruthy();
    expect(screen.getByRole("heading", { name: "Lara Sameeh Shoukry", level: 2 }).closest(".section__header")).toBeTruthy();
    expect(screen.getByText("Graduate Architect Contact / CV")).toBeTruthy();
    expect(screen.queryByText("Project owner")).toBeNull();
    expect(screen.queryByText("Portfolio contact details and professional links.")).toBeNull();
  });

  it("renders a configured portrait instead of initials", () => {
    render(
      <ContactSection
        contact={{
          ...baseContact,
          photo: "/images/contact/lara-sameeh.webp",
          photoAlt: "Portrait of Lara Sameeh Shoukry"
        }}
      />
    );

    expect(screen.getByRole("img", { name: "Portrait of Lara Sameeh Shoukry" }).getAttribute("src")).toBe(
      "/images/contact/lara-sameeh.webp"
    );
  });

  it("uses a portrait-specific photo frame for configured architect images", () => {
    render(
      <ContactSection
        contact={{
          ...baseContact,
          photo: "/images/contact/lara-sameeh.webp",
          photoAlt: "Portrait of Lara Sameeh Shoukry"
        }}
      />
    );

    expect(screen.getByRole("img", { name: "Portrait of Lara Sameeh Shoukry" }).parentElement?.classList.contains("contact-avatar--portrait")).toBe(
      true
    );
  });

  it("shows email and LinkedIn as direct contact links", () => {
    render(<ContactSection contact={baseContact} />);

    expect(screen.getByRole("link", { name: /larasameeh249@gmail.com/i }).getAttribute("href")).toBe(
      "mailto:larasameeh249@gmail.com"
    );
    expect(screen.getByRole("link", { name: /LinkedIn Profile/i }).getAttribute("href")).toBe(
      "https://www.linkedin.com/in/lara-sameeh-6b07a5312/"
    );
  });

  it("marks contact label words separately so mobile can show icon and content only", () => {
    render(<ContactSection contact={baseContact} />);

    expect(document.querySelectorAll(".contact-label")).toHaveLength(4);
    expect(screen.getByText("University").classList.contains("contact-label")).toBe(true);
    expect(screen.getByText("Location").classList.contains("contact-label")).toBe(true);
    expect(screen.getByText("Email").classList.contains("contact-label")).toBe(true);
    expect(screen.getByText("LinkedIn").classList.contains("contact-label")).toBe(true);
  });

  it("renders the configured CV as a single direct view action", () => {
    render(<ContactSection contact={contactConfig} />);

    const viewLink = screen.getByRole("link", { name: "View Lara's CV" });

    expect(screen.queryByRole("link", { name: /Download CV/i })).toBeNull();
    expect(viewLink.getAttribute("href")).toBe("/Lara_Sameeh_CV.pdf");
    expect(viewLink.getAttribute("target")).toBe("_blank");
    expect(viewLink.hasAttribute("download")).toBe(false);
  });

  it("renders the configured portfolio as a direct view action next to the CV", () => {
    render(<ContactSection contact={contactConfig} />);

    const cvLink = screen.getByRole("link", { name: "View Lara's CV" });
    const portfolioLink = screen.getByRole("link", { name: "View Lara's Portfolio" });
    const actions = Array.from(document.querySelectorAll(".contact-actions a"));

    expect(actions).toEqual([cvLink, portfolioLink]);
    expect(portfolioLink.getAttribute("href")).toBe("/final-portfolio-v1.pdf");
    expect(portfolioLink.getAttribute("target")).toBe("_blank");
    expect(portfolioLink.hasAttribute("download")).toBe(false);
  });

  it("renders the configured mobile number as a phone link", () => {
    render(<ContactSection contact={contactConfig} />);

    expect(screen.getByRole("link", { name: /\+20 101 121 3951/i }).getAttribute("href")).toBe(
      "tel:+201011213951"
    );
  });
});
