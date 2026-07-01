import { describe, expect, it } from "vitest";
import { getContactActions } from "./contact";

describe("getContactActions", () => {
  it("returns a single view action for the configured CV", () => {
    const actions = getContactActions({
      email: "hello@example.com",
      linkedin: "https://linkedin.com/in/example",
      phone: "",
      cvDownload: "/downloads/cv.pdf",
      cvOnline: "",
      portfolio: ""
    });

    expect(actions).toEqual([
      {
        href: "/downloads/cv.pdf",
        label: "View Lara's CV",
        external: true
      }
    ]);
  });

  it("returns a portfolio view action when a portfolio PDF is configured", () => {
    const actions = getContactActions({
      email: "hello@example.com",
      linkedin: "https://linkedin.com/in/example",
      phone: "",
      cvDownload: "",
      cvOnline: "/Lara_Sameeh_CV.pdf",
      portfolio: "/final-portfolio-v1.pdf"
    });

    expect(actions).toEqual([
      {
        href: "/Lara_Sameeh_CV.pdf",
        label: "View Lara's CV",
        external: true
      },
      {
        href: "/final-portfolio-v1.pdf",
        label: "View Lara's Portfolio",
        external: true
      }
    ]);
  });
});
