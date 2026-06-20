export type NavItem = {
  id: string;
  label: string;
};

export type GalleryImage = {
  id: string;
  src: string;
  thumb: string;
  alt: string;
  caption: string;
};

export type PanoramaHotspot = {
  id: string;
  label: string;
  x: number;
  y: number;
  panorama: string;
  description: string;
  yaw?: number;
  pitch?: number;
};

export type BannerConfig = {
  previewImage: string;
  pdf: string;
  jpg: string;
  externalLink: string;
};

export type ContactConfig = {
  name: string;
  role: string;
  email: string;
  phone: string;
  location: string;
  linkedin: string;
  cvDownload: string;
  cvOnline: string;
  behance: string;
  instagram: string;
};
