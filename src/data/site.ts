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
    src: publicAsset("images/exterior/ext-01-waterfront-arrival.webp"),
    thumb: publicAsset("images/exterior/thumbnails/ext-01-waterfront-arrival.webp"),
    alt: "Exterior render of MAZAR Maritime Museum with the maritime sign and arrival plaza",
    caption: "Main approach and waterfront arrival"
  },
  {
    id: "exterior-02",
    src: publicAsset("images/exterior/ext-02-cloudy-roofline.webp"),
    thumb: publicAsset("images/exterior/thumbnails/ext-02-cloudy-roofline.webp"),
    alt: "Exterior render showing the museum shell roof and kinetic panels under a cloudy sky",
    caption: "Shell roof and kinetic panel system"
  },
  {
    id: "exterior-03",
    src: publicAsset("images/exterior/ext-03-morning-promenade.webp"),
    thumb: publicAsset("images/exterior/thumbnails/ext-03-morning-promenade.webp"),
    alt: "Exterior render of the museum promenade at morning light",
    caption: "Bazaar edge and public promenade"
  },
  {
    id: "exterior-04",
    src: publicAsset("images/exterior/ext-04-sunset-plaza.webp"),
    thumb: publicAsset("images/exterior/thumbnails/ext-04-sunset-plaza.webp"),
    alt: "Sunset exterior render of the museum plaza and waterfront paths",
    caption: "Amphitheater and public plaza"
  },
  {
    id: "exterior-05",
    src: publicAsset("images/exterior/ext-05-planetarium-massing.webp"),
    thumb: publicAsset("images/exterior/thumbnails/ext-05-planetarium-massing.webp"),
    alt: "Exterior render showing museum massing and planetarium volume",
    caption: "Planetarium and museum massing"
  },
  {
    id: "exterior-06",
    src: publicAsset("images/exterior/ext-06-water-channel.webp"),
    thumb: publicAsset("images/exterior/thumbnails/ext-06-water-channel.webp"),
    alt: "Exterior render of the water channel and shaded museum facade",
    caption: "Water spine and shaded facade"
  },
  {
    id: "exterior-07",
    src: publicAsset("images/exterior/ext-07-golden-canopy.webp"),
    thumb: publicAsset("images/exterior/thumbnails/ext-07-golden-canopy.webp"),
    alt: "Exterior render of the golden canopy wrapping the museum roof",
    caption: "Folded canopy over public thresholds"
  },
  {
    id: "exterior-08",
    src: publicAsset("images/exterior/ext-08-evening-arrival.webp"),
    thumb: publicAsset("images/exterior/thumbnails/ext-08-evening-arrival.webp"),
    alt: "Evening exterior render of MAZAR Maritime Museum",
    caption: "Evening exterior view"
  },
  {
    id: "exterior-09",
    src: publicAsset("images/exterior/ext-09-public-garden.webp"),
    thumb: publicAsset("images/exterior/thumbnails/ext-09-public-garden.webp"),
    alt: "Exterior render of garden paths beside the museum",
    caption: "Landscape terraces and garden paths"
  },
  {
    id: "exterior-10",
    src: publicAsset("images/exterior/ext-10-coastal-perspective.webp"),
    thumb: publicAsset("images/exterior/thumbnails/ext-10-coastal-perspective.webp"),
    alt: "Wide exterior render of MAZAR Maritime Museum against the coast",
    caption: "Coastal perspective and museum silhouette"
  }
];

export const interiorImages: GalleryImage[] = [
  {
    id: "interior-01",
    src: publicAsset("images/interior/int-01-main-hall.webp"),
    thumb: publicAsset("images/interior/thumbnails/int-01-main-hall.webp"),
    alt: "Interior 360 render of MAZAR Maritime Museum's main exhibition hall",
    caption: "Main Hall — Maritime Heritage Exhibition"
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
  behance: "",
};
