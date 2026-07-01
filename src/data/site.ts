import { publicAsset } from "../utils/assets";
import type { BannerConfig, ContactConfig, GalleryImage, NavItem, PanoramaHotspot } from "../types";

export const siteConfig = {
  projectName: "MAZAR",
  projectSubtitle: "Maritime Museum",
  projectType: "Architecture Graduation Project",
  year: "2026",
  owner: "Lara Sameeh Shoukry",
  university: "Ain Shams University",
  description:
    "An immersive maritime museum where Suez's cultural memory, craft, water, and heritage are transformed into a contemporary experience.",
  logoWordmark: publicAsset("images/brand/mazar-wordmark.webp"),
  logoEmblem: publicAsset("images/brand/mazar-emblem.webp"),
  heroDesktop: publicAsset("images/hero/hero-desktop.webp"),
  heroMobile: publicAsset("images/hero/hero-mobile.webp")
};

export const navItems: NavItem[] = [
  { id: "walkthrough", label: "Museum Walkthrough" },
  { id: "panorama", label: "360 Experience" },
  { id: "exterior", label: "Exterior" },
  { id: "interior", label: "Interior" },
  { id: "banner", label: "Banner" },
  { id: "contact", label: "Contact" }
];

export const exteriorImages: GalleryImage[] = [
  {
    id: "exterior-01",
    src: publicAsset("images/exterior/ext-01-gallery.webp"),
    thumb: publicAsset("images/exterior/thumbnails/ext-01-gallery.webp"),
    alt: "Exterior render of MAZAR Maritime Museum waterfront arrival",
    caption: "Exterior view 01"
  },
  {
    id: "exterior-02",
    src: publicAsset("images/exterior/ext-02-gallery.webp"),
    thumb: publicAsset("images/exterior/thumbnails/ext-02-gallery.webp"),
    alt: "Exterior render of MAZAR Maritime Museum facade and public plaza",
    caption: "Exterior view 02"
  },
  {
    id: "exterior-03",
    src: publicAsset("images/exterior/ext-03-gallery.webp"),
    thumb: publicAsset("images/exterior/thumbnails/ext-03-gallery.webp"),
    alt: "Exterior render of MAZAR Maritime Museum approach and landscape",
    caption: "Exterior view 03"
  },
  {
    id: "exterior-04",
    src: publicAsset("images/exterior/ext-04-gallery.webp"),
    thumb: publicAsset("images/exterior/thumbnails/ext-04-gallery.webp"),
    alt: "Exterior render of MAZAR Maritime Museum with shell roof massing",
    caption: "Exterior view 04"
  },
  {
    id: "exterior-05",
    src: publicAsset("images/exterior/ext-05-gallery.webp"),
    thumb: publicAsset("images/exterior/thumbnails/ext-05-gallery.webp"),
    alt: "Exterior render showing MAZAR Maritime Museum massing and canopy",
    caption: "Exterior view 05"
  },
  {
    id: "exterior-06",
    src: publicAsset("images/exterior/ext-06-gallery.webp"),
    thumb: publicAsset("images/exterior/thumbnails/ext-06-gallery.webp"),
    alt: "Exterior render of MAZAR Maritime Museum and shaded facade",
    caption: "Exterior view 06"
  },
  {
    id: "exterior-07",
    src: publicAsset("images/exterior/ext-07-gallery.webp"),
    thumb: publicAsset("images/exterior/thumbnails/ext-07-gallery.webp"),
    alt: "Exterior render of MAZAR Maritime Museum entrance sequence",
    caption: "Exterior view 07"
  },
  {
    id: "exterior-08",
    src: publicAsset("images/exterior/ext-08-gallery.webp"),
    thumb: publicAsset("images/exterior/thumbnails/ext-08-gallery.webp"),
    alt: "Evening exterior render of MAZAR Maritime Museum",
    caption: "Exterior view 08"
  }
];

export const interiorImages: GalleryImage[] = [
  {
    id: "interior-01",
    src: publicAsset("images/interior/int-01-gallery.webp"),
    thumb: publicAsset("images/interior/thumbnails/int-01-gallery.webp"),
    alt: "Interior render of MAZAR Maritime Museum exhibition space",
    caption: "Interior view 01"
  },
  {
    id: "interior-02",
    src: publicAsset("images/interior/int-02-gallery.webp"),
    thumb: publicAsset("images/interior/thumbnails/int-02-gallery.webp"),
    alt: "Interior render of MAZAR Maritime Museum immersive exhibition route",
    caption: "Interior view 02"
  },
  {
    id: "interior-03",
    src: publicAsset("images/interior/int-03-gallery.webp"),
    thumb: publicAsset("images/interior/thumbnails/int-03-gallery.webp"),
    alt: "Interior render of MAZAR Maritime Museum display area",
    caption: "Interior view 03"
  },
  {
    id: "interior-04",
    src: publicAsset("images/interior/int-04-gallery.webp"),
    thumb: publicAsset("images/interior/thumbnails/int-04-gallery.webp"),
    alt: "Interior render of MAZAR Maritime Museum gallery lighting and circulation",
    caption: "Interior view 04"
  },
  {
    id: "interior-05",
    src: publicAsset("images/interior/int-05-gallery.webp"),
    thumb: publicAsset("images/interior/thumbnails/int-05-gallery.webp"),
    alt: "Interior render showing MAZAR Maritime Museum exhibits and visitor path",
    caption: "Interior view 05"
  },
  {
    id: "interior-06",
    src: publicAsset("images/interior/int-06-gallery.webp"),
    thumb: publicAsset("images/interior/thumbnails/int-06-gallery.webp"),
    alt: "Interior render of MAZAR Maritime Museum atmospheric exhibition zone",
    caption: "Interior view 06"
  },
  {
    id: "interior-07",
    src: publicAsset("images/interior/int-07-gallery.webp"),
    thumb: publicAsset("images/interior/thumbnails/int-07-gallery.webp"),
    alt: "Interior render of MAZAR Maritime Museum maritime memory route",
    caption: "Interior view 07"
  }
];

export const panoramaMapImage = publicAsset("images/360/base.webp");

export const panoramaHotspots: PanoramaHotspot[] = [
  {
    id: "underwaters",
    label: "Underwater Passage",
    x: 8.5526,
    y: 55.4729,
    panorama: publicAsset("images/360/underwaters.png"),
    description: "Move through the underwater gallery and submerged maritime atmosphere."
  },
  {
    id: "circle",
    label: "Circular Gallery",
    x: 17.9426,
    y: 71.7322,
    panorama: publicAsset("images/360/circle.png"),
    description: "Explore the circular exhibition chamber and its wrapped display route."
  },
  {
    id: "hologram",
    label: "Hologram Exhibit",
    x: 31.6986,
    y: 56.3231,
    panorama: publicAsset("images/360/hologram.png"),
    description: "Stand inside the hologram exhibit and view the layered maritime displays."
  },
  {
    id: "statue",
    label: "Statue Gallery",
    x: 41.866,
    y: 49.9469,
    panorama: publicAsset("images/360/statue.png"),
    description: "Look around the statue gallery and central museum artifacts."
  },
  {
    id: "tree",
    label: "Tree Atrium",
    x: 48.445,
    y: 42.508,
    panorama: publicAsset("images/360/tree.png"),
    description: "Enter the planted atrium where the exhibition path opens around the tree."
  },
  {
    id: "movies",
    label: "Immersive Theater",
    x: 59.8086,
    y: 47.8215,
    panorama: publicAsset("images/360/movies.png"),
    description: "Step into the cinematic theater zone for the museum's immersive media experience."
  }
];

export const bannerConfig: BannerConfig = {
  previewImage: publicAsset("images/banner/banner-preview.webp"),
  fullImage: publicAsset("images/banner/banner-full.webp"),
  pdf: "",
  jpg: "",
  externalLink: "https://drive.google.com/drive/folders/1c6HV7OclWUdVZDagOXVpt7Dn0LCzKosI"
};

export const contactConfig: ContactConfig = {
  name: "Lara Sameeh",
  role: "Housing Architecture and Urban Development Graduate",
  university: "Faculty of Engineering, Ain Shams University",
  photo: publicAsset("images/contact/lara_sameeh.png"),
  photoAlt: "Portrait of Lara Sameeh",
  email: "larasameeh249@gmail.com",
  phone: "+20 101 121 3951",
  location: "Cairo, Egypt",
  linkedin: "https://www.linkedin.com/in/lara-sameeh-6b07a5312/",
  cvDownload: "",
  cvOnline: publicAsset("Lara_Sameeh_CV.pdf"),
  portfolio: publicAsset("final-portfolio-v1.pdf"),
  behance: "",
};
