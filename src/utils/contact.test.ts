import { describe, expect, it } from "vitest";
import { getContactActions } from "./contact";

describe("getContactActions", () => {
  it("returns only actions with available values", () => {
    const actions = getContactActions({
      email: "hello@example.com",
      linkedin: "",
      phone: "",
      cvDownload: "/downloads/cv.pdf",
      cvOnline: ""
    });

    expect(actions.map((action) => action.label)).toEqual(["Email Me", "Download CV"]);
  });

  it("normalizes phone actions to tel links", () => {
    const actions = getContactActions({
      email: "",
      linkedin: "",
      phone: "+20 100 200 3000",
      cvDownload: "",
      cvOnline: ""
    });

    expect(actions[0]).toMatchObject({
      href: "tel:+201002003000",
      label: "Call"
    });
  });
});
