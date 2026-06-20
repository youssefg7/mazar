# MAZAR Maritime Museum Website

## Comprehensive Requirements Document for Codex Implementation

Version: 1.0
Project Type: Static responsive architecture project website
Primary Deployment Target: GitHub Pages
Alternative Deployment Targets: Cloudflare Pages, Netlify, Vercel static export
Backend: Not required
Project Owner: Youssef George
Project: Architecture graduation project website for MAZAR Maritime Museum / Suez cultural-maritime museum project

---

# 1. Project Overview

Create a modern, responsive, static website to showcase the MAZAR Maritime Museum graduation project from the faculty of engineering, architecture department, Ain Shams University.

The website should present the project as a high-end architectural portfolio / competition-style digital experience. It should not feel like a generic portfolio template. The design language should be cinematic, minimal, museum-like, and professional, with strong visual focus on the project renders, 360 panoramas, banner, and contact information.

The website must be deployable on GitHub Pages free static hosting platform. It must not require a backend, database, server-side rendering, login system, or paid service.

---

# 2. Main Business Goals

The website should achieve the following goals:

1. Present the graduation project professionally to jurors, professors, architects, employers, and portfolio reviewers.
2. Showcase exterior renders in a clear horizontal slideshow format.
3. Showcase interior renders in a clear horizontal slideshow format.
4. Provide an immersive 360-degree panorama experience using clickable fixed points on a museum image.
5. Provide access to a high-resolution 2×3 m project banner through preview and download links.
6. Provide clear contact information, CV download, LinkedIn link, and other professional links.
7. Work smoothly on desktop, tablet, and mobile.
8. Be easy to maintain by simply replacing images, PDFs, and content files.
9. Be optimized enough to load well even with high-quality architecture visuals.
10. Be fully static and free to host.

---

# 3. Target Users

## 3.1 Primary Users

* Architecture professors and jury members.
* Architecture employers and internship reviewers.
* Design studios and portfolio reviewers.
* Friends, colleagues, and public visitors interested in the project.

## 3.2 User Expectations

Users should be able to:

* Understand the project identity quickly.
* Browse exterior and interior images without confusion.
* Open fullscreen images when desired.
* Enter a 360-degree immersive view easily.
* Download or preview the final banner.
* Access CV and contact links immediately.
* Use the website comfortably on both phone and desktop.

---

# 4. Required Main Website Sections

The website must include these five primary content items:

1. Exterior Render Gallery
2. Interior Render Gallery
3. Fullscreen 360 Panorama Experience
4. High-Quality 2×3 m Banner Preview / Download
5. Contact Information including CV, LinkedIn, phone, email, etc.

In addition to these required five items, the website should include a hero / landing section at the top to introduce the project.

Recommended final section order:

1. Hero / Project Intro
2. Exterior Render Gallery
3. Interior Render Gallery
4. 360 Panorama Experience
5. Graduation Banner
6. Contact / CV

The navigation menu should still visually emphasize the five main project items.

---

# 5. Visual Direction

## 5.1 General Style

The website should feel like:

* High-end architectural competition presentation.
* Museum exhibition interface.
* Cinematic and refined.
* Minimal, premium, and image-focused.
* Smooth but not overly flashy.
* Professional enough for academic and portfolio use.

## 5.2 Mood

The primary mood should be:

* Warm cinematic museum atmosphere.
* Dark charcoal or deep warm neutral background as the main recommended theme.
* Optional light mode support if feasible.
* Elegant typography.
* Subtle accent color inspired by turquoise / cyan hotspot dots and warm bronze/gold render tones.
* Burgundy or warm copper accent may be used for buttons, labels, or section numbers.

## 5.3 Color Palette

Recommended dark mode palette:

* Background: near-black charcoal, e.g. `#0B0D0E`
* Secondary background: dark graphite, e.g. `#111518`
* Card background: translucent dark surface, e.g. `rgba(18, 22, 24, 0.82)`
* Primary text: warm white, e.g. `#F4EFE7`
* Secondary text: muted beige-gray, e.g. `#B8AEA1`
* Warm accent: bronze / gold, e.g. `#D7A45F`
* Interactive accent: turquoise / cyan, e.g. `#25E0D0`
* Optional burgundy accent: `#7A1F1F`

Recommended light mode palette:

* Background: off-white, e.g. `#F7F4EF`
* Secondary background: soft warm white, e.g. `#FFFFFF`
* Card border: pale warm gray, e.g. `#DED8CF`
* Main text: near black, e.g. `#151515`
* Secondary text: warm gray, e.g. `#6F6860`
* Accent: muted red / burgundy, e.g. `#9B2D2D`
* Secondary accent: bronze, e.g. `#B88645`

## 5.4 Typography

Use a clean, modern typography system.

Recommended direction:

* Large project title: elegant wide uppercase sans-serif.
* Body text: clean readable sans-serif.
* Section labels: small uppercase with letter spacing.
* Captions: small muted text.

Possible font pairings:

* Headings: `Cinzel`, `Cormorant Garamond`, `Playfair Display`, or a clean wide sans-serif.
* Body: `Inter`, `Manrope`, `Satoshi`, `DM Sans`, or system sans-serif.

The website must remain readable and professional. Avoid overly decorative fonts.

---

# 6. UI / UX Requirements

## 6.1 Global Layout

The website should be a single-page experience or a single-page app with internal sections.

Preferred layout:

* Desktop: left sidebar or top navigation.
* Tablet: compact top navigation.
* Mobile: top bar with hamburger menu.

The design should allow quick movement between the five main items.

## 6.2 Navigation

Required nav items:

1. Exterior
2. Interior
3. 360 Experience
4. Banner
5. Contact

Navigation behavior:

* Smooth scroll to sections.
* Active section indicator if easy to implement.
* On mobile, nav should collapse into a hamburger menu.
* The website logo / project title should return to the hero section.
* Navigation must work without page reload.

## 6.3 Hero Section

The hero section should include:

* Large hero image or background render.
* Project name: `MAZAR`
* Subtitle: `Maritime Museum`
* Short project statement.
* Graduation project label.
* Year.
* Main CTA button: `Explore Project`
* Optional secondary CTA: `Open 360 Experience`

Recommended hero statement:

“An immersive maritime museum where Suez’s cultural memory, craft, water, and heritage are transformed into a contemporary architectural experience.”

Hero section desktop:

* Large cinematic render background.
* Text overlay on left side.
* Navigation visible.
* Five feature cards may appear below or over the lower part of the hero.

Hero section mobile:

* Crop image carefully.
* Text readable over gradient.
* CTA button visible above the fold.
* Avoid tiny text.

---

# 7. Exterior Gallery Requirements

## 7.1 Purpose

Show exterior rendered shots of the architecture project in a polished, easy-to-browse horizontal slideshow.

## 7.2 Gallery Type

Main gallery must be a horizontal slideshow / carousel.

Fullscreen should be optional, not the default.

Reasoning:

* Most architectural renders are landscape oriented.
* Horizontal slideshow preserves the visual composition better.
* It feels more like a professional architecture board or digital portfolio.
* Fullscreen should be available only through a button.

## 7.3 Required Features

Exterior Gallery must include:

* Large horizontal landscape slideshow.
* Previous / next navigation arrows.
* Swipe support on touch devices.
* Thumbnail strip below or beside the active image.
* Image captions.
* Current image index, e.g. `03 / 12`.
* Optional fullscreen / lightbox button.
* Lazy image loading.
* Smooth transitions.
* No aggressive cropping unless intentionally used for preview cards.

## 7.4 Image Behavior

Use:

* `object-fit: contain` for fullscreen view to preserve full render.
* `object-fit: cover` or `contain` for carousel depending on final design.
* Avoid stretching images.
* Use responsive image sizes.

## 7.5 Captions

Captions should be stored as data, not hardcoded repeatedly in JSX.

Example exterior captions:

* Main approach and waterfront arrival.
* Shell roof and kinetic panel system.
* Bazaar and public promenade.
* Amphitheater and public plaza.
* Planetarium and museum massing.
* Evening exterior view.

---

# 8. Interior Gallery Requirements

## 8.1 Purpose

Show interior rendered shots in a curated sequence that feels like moving through the museum.

## 8.2 Gallery Type

Main gallery must also be a horizontal slideshow / carousel.

Fullscreen should be optional.

## 8.3 Required Features

Interior Gallery must include:

* Large horizontal slideshow.
* Previous / next navigation arrows.
* Swipe support.
* Thumbnail strip.
* Caption per image.
* Current image index.
* Optional fullscreen / lightbox button.
* Lazy loading.

## 8.4 Recommended Interior Sequence

Suggested image order:

1. Main museum hall.
2. Chariot / boat exhibition.
3. Suez Canal history wall.
4. Interactive aquarium / virtual lake.
5. Planetarium approach.
6. Interior roof / kinetic ceiling experience.
7. Exhibition platforms.
8. Workshop / craft zone if available.

## 8.5 Captions

Example captions:

* Main Hall — Maritime Heritage Exhibition.
* Interactive Gallery — Suez Canal Memory Wall.
* Central Exhibition Platform — Historical Maritime Objects.
* Virtual Aquarium — Immersive Marine Experience.
* Kinetic Roof Interior — Filtered Light and Shadow.

---

# 9. 360 Panorama Experience Requirements

## 9.1 Purpose

Create an immersive 360-degree experience where the visitor first sees a normal static image of the museum with fixed clickable points. When the visitor clicks one of the points, a fullscreen 360-degree panorama viewer opens.

This experience should be one of the website’s main “wow” moments.

## 9.2 Required User Flow

1. User scrolls to the `360 Experience` section.
2. User sees a static image map of the museum interior or key view.
3. Several glowing hotspot dots are fixed on top of the image.
4. User clicks a hotspot.
5. A fullscreen 360 viewer opens.
6. The viewer displays the corresponding equirectangular JPG panorama.
7. User can drag, look around, zoom if supported, and navigate the panorama.
8. User can close the viewer and return to the hotspot map.
9. If multiple panorama files are provided, hotspots may allow movement between scenes.

## 9.3 Static Hotspot Map Requirements

The map should use a normal image, such as a rendered museum image, with clickable fixed points.

Each hotspot should have:

* ID
* Label
* X position in percentage
* Y position in percentage
* Panorama image path
* Optional tooltip
* Optional short description

Example data structure:

```ts
export const panoramaHotspots = [
  {
    id: "main-hall",
    label: "Main Hall",
    x: 52,
    y: 58,
    panorama: "/panos/main-hall.jpg",
    description: "Explore the central museum hall and exhibition platforms."
  },
  {
    id: "suez-wall",
    label: "Suez Canal Wall",
    x: 84,
    y: 47,
    panorama: "/panos/suez-wall.jpg",
    description: "View the Suez Canal historical display wall."
  }
];
```

## 9.4 Hotspot UI

Hotspots should look refined, not like rough green marks.

Design requirements:

* Circular glowing dot.
* Cyan / turquoise accent.
* Pulse animation.
* Tooltip on hover for desktop.
* Label or bottom sheet on tap for mobile if needed.
* Large enough touch target on mobile.
* Must remain correctly positioned over the image at different screen sizes.

Recommended CSS approach:

* Put the map image in a `position: relative` container.
* Put hotspots as `position: absolute`.
* Use percentage positions for `left` and `top`.
* Use `transform: translate(-50%, -50%)`.

## 9.5 Panorama Viewer Library

Preferred implementation options:

Option A: Photo Sphere Viewer
Recommended if the goal is polished UI, markers, and a refined museum-like experience.

Option B: Pannellum
Recommended if the goal is simpler implementation, lighter setup, and straightforward static hosting.

Option C: Marzipano
Recommended only if many panoramas and a full virtual tour are required later.

For this first version, use either Photo Sphere Viewer or Pannellum.

## 9.6 Panorama Image Requirements

Input files should be:

* Equirectangular JPG images.
* 2:1 ratio.
* Example: 4096×2048, 6000×3000, or 8192×4096 depending on performance.
* Optimized to avoid huge load times.
* Stored inside `/public/panos/`.

If panoramas are too large, create optimized versions for the website and keep full-resolution files separate.

## 9.7 Viewer Requirements

The fullscreen 360 viewer should include:

* Fullscreen overlay / modal.
* Close button.
* Hotspot title.
* Optional mini map or scene selector.
* Drag to look around.
* Touch support.
* Mouse wheel zoom if enabled.
* Loading state while panorama loads.
* Error fallback if panorama fails.
* Return to map button.

---

# 10. Graduation Banner Requirements

## 10.1 Purpose

Show the final high-quality 2×3 m graduation banner and provide download access without slowing down the main website.

## 10.2 Display Strategy

Do not load the full high-resolution banner automatically.

Instead:

* Show a compressed preview image.
* Provide a `Preview Banner` button.
* Provide a `Download PDF` button.
* Optionally provide `Download JPG` button.
* If the full PDF is too large for the repo, support an external link field.

## 10.3 Required Files

Recommended files:

* `/public/downloads/MAZAR-banner-preview.webp`
* `/public/downloads/MAZAR-banner-2x3m.pdf`
* `/public/downloads/MAZAR-banner-compressed.jpg` if available

## 10.4 Banner UI

Desktop:

* Banner preview on left.
* Download information and buttons on right.

Mobile:

* Banner preview stacked above buttons.
* Large touch-friendly buttons.

## 10.5 Banner Text

Suggested section title:

`Graduation Banner`

Suggested description:

“High-resolution 2×3 m project banner prepared for presentation, review, and print.”

Buttons:

* `Preview Banner`
* `Download PDF`
* `Download JPG`

---

# 11. Contact / CV Requirements

## 11.1 Purpose

Provide a professional final section for contacting the project owner and downloading the CV.

## 11.2 Required Contact Fields

The contact section should support:

* Name
* Role / title
* Email
* Phone number
* Location
* LinkedIn link
* CV download link
* Optional Behance link
* Optional Instagram / portfolio link
* Optional profile image

Use placeholder values until final information is provided.

## 11.3 Required Buttons

* `Download CV`
* `View CV Online`
* `LinkedIn Profile`
* `Email Me`
* Optional `Call`

## 11.4 Contact Form

Do not implement a backend contact form.

Use:

* `mailto:` link for email.
* `tel:` link for phone.
* External link for LinkedIn.
* Static CV PDF download.

Optional future enhancement:

* Use a third-party form service only if explicitly requested later.

## 11.5 Privacy Note

Because the site will be public, the owner should decide whether to show phone number publicly.

If phone is not provided or should remain private, hide the phone row automatically.

---

# 12. Responsive Design Requirements

## 12.1 General Requirement

The website must be responsive and work well on:

* Desktop landscape.
* Laptop.
* Tablet portrait.
* Tablet landscape.
* Mobile portrait.
* Mobile landscape.

The website should use one codebase and automatically adapt using CSS media queries and responsive layout.

## 12.2 Breakpoints

Recommended breakpoints:

```css
/* Mobile */
@media (max-width: 640px) {}

/* Tablet */
@media (min-width: 641px) and (max-width: 1024px) {}

/* Desktop */
@media (min-width: 1025px) {}
```

Optional orientation-based rules:

```css
@media (orientation: portrait) {}

@media (orientation: landscape) {}
```

## 12.3 Desktop UX

Desktop should include:

* Wide cinematic layout.
* Large hero image.
* Horizontal galleries with generous spacing.
* Visible navigation.
* Optional left sidebar or top navigation.
* Large 360 hotspot map.
* Banner and contact in two-column layouts where appropriate.

## 12.4 Mobile Portrait UX

Mobile portrait should include:

* Top header with hamburger menu.
* Hero image cropped carefully.
* Stacked sections.
* Swipeable carousels.
* Larger touch targets.
* Thumbnail strips that horizontally scroll.
* 360 hotspot buttons large enough to tap.
* Banner and contact stacked vertically.

## 12.5 Mobile Landscape UX

Mobile landscape should include:

* Wider gallery aspect ratio.
* Less vertical padding.
* 360 viewer should use almost full screen.
* Navigation should remain compact.

## 12.6 Tablet UX

Tablet should feel closer to desktop but with simpler spacing:

* Horizontal galleries.
* Cards can be 2-column or scrollable.
* 360 section can remain wide.

---

# 13. Accessibility Requirements

## 13.1 General Accessibility

The website should be accessible enough for professional public use.

Requirements:

* All buttons must be keyboard focusable.
* All important images must have meaningful `alt` text.
* Decorative images can use empty alt text.
* Use semantic HTML sections.
* Use correct button elements for actions.
* Use anchor links for navigation.
* Ensure color contrast is readable.
* Avoid tiny captions on mobile.
* Do not rely only on color to communicate state.
* Add visible focus states.
* Add `aria-label` to icon-only buttons.
* Allow closing fullscreen modals with `Escape`.
* Do not trap users in modals incorrectly.

## 13.2 Motion Accessibility

* Keep animations subtle.
* Avoid heavy parallax.
* Respect reduced motion if possible.

Example:

```css
@media (prefers-reduced-motion: reduce) {
  * {
    animation-duration: 0.001ms !important;
    transition-duration: 0.001ms !important;
    scroll-behavior: auto !important;
  }
}
```

---

# 14. Performance Requirements

## 14.1 Image Optimization

Architecture renders can be heavy, so the website must optimize image usage.

Requirements:

* Use WebP or optimized JPG for gallery previews.
* Use lazy loading for images below the fold.
* Avoid loading all 4K images immediately.
* Use thumbnails for thumbnail strips.
* Use full-resolution images only in fullscreen viewer if needed.
* Keep panorama files optimized.
* Avoid embedding massive banner PDF directly.
* Use responsive image sizes where practical.

## 14.2 Recommended Image Sizes

For normal gallery display:

* Desktop preview: 1800–2500 px wide.
* Mobile preview: 900–1400 px wide.
* Thumbnails: 300–500 px wide.

For fullscreen gallery:

* Use 2500–3840 px wide images depending on file size.
* Do not force 8K images unless required.

For panorama:

* Minimum: 4096×2048.
* Preferred quality: 6000×3000 or 8192×4096 if performance allows.
* Use compressed JPG.
* Avoid extremely heavy uncompressed files.

## 14.3 Loading Behavior

* Hero image should load quickly.
* Below-the-fold images lazy load.
* Show skeleton or subtle loading placeholder for galleries.
* Show loading spinner in 360 viewer.
* Avoid blocking initial page load with all assets.

## 14.4 Performance Targets

Target values:

* Initial page should feel interactive within 2–3 seconds on a good connection.
* Avoid layout shifts.
* Keep JavaScript bundle reasonable.
* Do not include unnecessary heavy libraries.

---

# 15. Technical Requirements

## 15.1 Recommended Stack

Preferred stack:

* Vite
* React
* TypeScript
* CSS Modules, Tailwind CSS, or plain modern CSS
* Static deployment to GitHub Pages

Recommended libraries:

* Gallery carousel: Swiper, Embla Carousel, or custom carousel.
* Fullscreen image lightbox: PhotoSwipe or custom modal.
* 360 panorama viewer: Photo Sphere Viewer or Pannellum.
* Icons: Lucide React or similar lightweight icon set.

## 15.2 Backend

No backend.

Do not use:

* Database.
* Authentication.
* Server actions.
* API routes.
* CMS.
* Node server at runtime.
* Server-side rendering.

Everything must work as static files.

## 15.3 Routing

Preferred:

* Single-page scrolling website.
* Internal anchor links, e.g. `#exterior`, `#interior`, `#panorama`, `#banner`, `#contact`.

If React Router is used, configure correctly for static hosting. However, routing is not necessary for v1.

## 15.4 Deployment

Primary deployment:

* GitHub Pages using GitHub Actions.
* Build command: `npm run build`
* Output directory: `dist`
* Ensure correct Vite `base` value if deployed under a repository subpath.

Example:

```ts
// vite.config.ts
export default defineConfig({
  base: "/repository-name/",
  plugins: [react()]
});
```

If deployed to root user page, base may be `/`.

## 15.5 Browser Support

Support modern browsers:

* Chrome
* Edge
* Safari
* Firefox
* Mobile Safari
* Android Chrome

No need to support old Internet Explorer.

---

# 16. Recommended File Structure

```txt
mazar-website/
  public/
    images/
      hero/
        hero-desktop.webp
        hero-mobile.webp

      exterior/
        ext-01.webp
        ext-02.webp
        ext-03.webp
        ext-04.webp
        thumbnails/
          ext-01-thumb.webp
          ext-02-thumb.webp

      interior/
        int-01.webp
        int-02.webp
        int-03.webp
        int-04.webp
        thumbnails/
          int-01-thumb.webp
          int-02-thumb.webp

      panorama/
        panorama-map.webp

    panos/
      main-hall.jpg
      su ez-wall.jpg
      aquarium.jpg
      entrance.jpg

    downloads/
      MAZAR-banner-preview.webp
      MAZAR-banner-2x3m.pdf
      MAZAR-banner-compressed.jpg
      Youssef-George-CV.pdf

  src/
    components/
      Layout/
        Header.tsx
        Navigation.tsx
        Footer.tsx

      Hero/
        Hero.tsx

      Gallery/
        Gallery.tsx
        GallerySlide.tsx
        GalleryLightbox.tsx

      Panorama/
        PanoramaMap.tsx
        PanoramaViewer.tsx
        Hotspot.tsx

      Banner/
        BannerSection.tsx

      Contact/
        ContactSection.tsx

      UI/
        Button.tsx
        SectionTitle.tsx
        IconButton.tsx

    data/
      siteConfig.ts
      exteriorImages.ts
      interiorImages.ts
      panoramaHotspots.ts
      contact.ts

    styles/
      globals.css
      variables.css

    App.tsx
    main.tsx

  index.html
  vite.config.ts
  package.json
  README.md
```

Fix typo before implementation: `su ez-wall.jpg` should be `suez-wall.jpg`.

---

# 17. Data Configuration Requirements

Content should be easy to update using data files rather than editing component logic.

## 17.1 Site Config

```ts
export const siteConfig = {
  projectName: "MAZAR",
  projectSubtitle: "Maritime Museum",
  projectType: "Graduation Project",
  year: "2026",
  description:
    "An immersive maritime museum where Suez’s cultural memory, craft, water, and heritage are transformed into a contemporary architectural experience."
};
```

## 17.2 Gallery Data

```ts
export const exteriorImages = [
  {
    id: "exterior-01",
    src: "/images/exterior/ext-01.webp",
    thumb: "/images/exterior/thumbnails/ext-01-thumb.webp",
    alt: "Exterior render of MAZAR Maritime Museum waterfront approach",
    caption: "Main approach and waterfront arrival"
  }
];
```

```ts
export const interiorImages = [
  {
    id: "interior-01",
    src: "/images/interior/int-01.webp",
    thumb: "/images/interior/thumbnails/int-01-thumb.webp",
    alt: "Interior render of MAZAR Maritime Museum main hall",
    caption: "Main Hall — Maritime Heritage Exhibition"
  }
];
```

## 17.3 Panorama Hotspots

```ts
export const panoramaHotspots = [
  {
    id: "main-hall",
    label: "Main Hall",
    x: 52,
    y: 58,
    panorama: "/panos/main-hall.jpg",
    description: "Explore the central museum hall."
  }
];
```

## 17.4 Contact Data

```ts
export const contact = {
  name: "Youssef George",
  role: "Architecture Graduate",
  email: "example@email.com",
  phone: "+20 XXX XXX XXXX",
  location: "Cairo, Egypt",
  linkedin: "https://linkedin.com/in/...",
  cvDownload: "/downloads/Youssef-George-CV.pdf",
  cvOnline: "",
  behance: "",
  instagram: ""
};
```

---

# 18. Component Requirements

## 18.1 Header Component

Must include:

* Logo / project name.
* Navigation links.
* Mobile hamburger menu.
* Active section state if feasible.
* Smooth scroll behavior.

## 18.2 Hero Component

Must include:

* Hero background image.
* Title.
* Subtitle.
* Project description.
* CTA button.
* Responsive image handling.

## 18.3 Gallery Component

A reusable gallery component should handle both exterior and interior galleries.

Props:

```ts
type GalleryProps = {
  id: string;
  sectionNumber: string;
  title: string;
  description?: string;
  images: GalleryImage[];
};
```

Features:

* Carousel slide.
* Thumbnail selection.
* Previous / next.
* Fullscreen modal.
* Captions.
* Index count.
* Keyboard navigation in fullscreen.

## 18.4 PanoramaMap Component

Must include:

* Static image.
* Positioned hotspots.
* Tooltip labels.
* Opens panorama viewer when hotspot clicked.

## 18.5 PanoramaViewer Component

Must include:

* Fullscreen modal.
* 360 viewer instance.
* Close button.
* Loading state.
* Error fallback.
* Receives selected panorama path.

## 18.6 BannerSection Component

Must include:

* Banner preview.
* Description.
* Preview button.
* Download PDF button.
* Optional download JPG button.
* Optional external link.

## 18.7 ContactSection Component

Must include:

* Name.
* Role.
* Profile image placeholder or actual image.
* Email link.
* Phone link.
* LinkedIn link.
* CV download.
* Optional Behance / Instagram icons.

---

# 19. UI Details and Microinteractions

## 19.1 Buttons

Buttons should be:

* Minimal.
* Rectangular or rounded depending on design language.
* Large enough on mobile.
* Clear hover state.
* Clear focus state.
* Icons optional.

Button types:

* Primary: filled accent.
* Secondary: outlined.
* Ghost: text/icon only.

## 19.2 Hotspots

Hotspots should:

* Pulse gently.
* Glow on hover.
* Show label.
* Scale slightly on hover/tap.
* Never obscure important parts of the image too much.

## 19.3 Gallery Arrows

Gallery arrows should:

* Appear clearly over image.
* Be circular or minimal.
* Have hover effect.
* Be large enough on mobile.

## 19.4 Transitions

Use:

* Smooth fade transitions.
* Slide transitions for gallery.
* Gentle modal open/close.
* Avoid aggressive parallax or distracting effects.

---

# 20. SEO and Metadata Requirements

Add basic SEO:

* Page title.
* Meta description.
* Open Graph image.
* Social preview title.
* Favicon.
* Apple touch icon if available.

Example:

```html
<title>MAZAR Maritime Museum — Graduation Project</title>
<meta
  name="description"
  content="MAZAR Maritime Museum is an architecture graduation project exploring Suez maritime heritage, cultural memory, kinetic architecture, and immersive museum experience."
/>
```

Open Graph:

```html
<meta property="og:title" content="MAZAR Maritime Museum" />
<meta property="og:description" content="Architecture graduation project by Youssef George." />
<meta property="og:image" content="/images/hero/og-image.webp" />
<meta property="og:type" content="website" />
```

---

# 21. Content Requirements from Project Owner

The developer should request or prepare placeholders for:

## 21.1 Required Images

* Hero render desktop version.
* Hero render mobile-friendly crop.
* Exterior render images.
* Exterior thumbnails.
* Interior render images.
* Interior thumbnails.
* Static image map for 360 section.
* Equirectangular 360 panorama JPG files.
* Banner preview image.
* Optional profile image.

## 21.2 Required Documents

* Final 2×3 m banner PDF.
* Optional compressed JPG banner.
* CV PDF.

## 21.3 Required Text

* Project name.
* Subtitle.
* Short project description.
* Gallery captions.
* 360 hotspot labels.
* Contact details.
* LinkedIn URL.
* Optional Behance / portfolio URL.

---

# 22. Asset Naming Rules

Use clean lowercase names:

Good:

```txt
ext-01-main-approach.webp
int-01-main-hall.webp
pano-main-hall.jpg
banner-preview.webp
youssef-george-cv.pdf
```

Avoid:

```txt
final final render 4k new version.jpg
IMG_1234.JPG
WhatsApp Image 2026.jpeg
```

No spaces in filenames. Use hyphens.

---

# 23. GitHub Pages Deployment Notes

## 23.1 Requirements

* The app must build to static files.
* The final output should be the Vite `dist` folder.
* GitHub Pages should deploy from GitHub Actions or from a selected branch/folder.
* If the repository URL is `https://username.github.io/mazar-website/`, configure Vite base as `/mazar-website/`.
* If using a custom domain or root GitHub Pages site, adjust base accordingly.

## 23.2 Suggested Deployment Workflow

Create `.github/workflows/deploy.yml`.

General behavior:

1. Install dependencies.
2. Build the project.
3. Upload `dist`.
4. Deploy to GitHub Pages.

## 23.3 Important Static Hosting Restrictions

Do not rely on:

* Runtime Node server.
* Server routes.
* Server-side APIs.
* Environment variables required at runtime.
* Database.

All content must be available as static assets or client-side data.

---

# 24. Optional Light / Dark Mode

## 24.1 Requirement Level

Dark mode is preferred as the main visual direction.

Light mode is optional but recommended if implementation time allows.

## 24.2 Toggle Behavior

If implemented:

* Add theme toggle.
* Store preference in `localStorage`.
* Respect system preference if no manual choice has been made.
* Ensure both modes look polished.

## 24.3 Light Mode Design

Light mode should not look like plain white Bootstrap.

It should use:

* Warm off-white background.
* Soft shadows.
* Thin warm gray borders.
* Muted red or bronze accents.
* Clean architectural presentation style.

---

# 25. Error and Empty States

The website should handle missing files gracefully.

## 25.1 Gallery Empty State

If no images exist:

* Show placeholder card.
* Text: `Gallery images will be added soon.`

## 25.2 Panorama Error

If panorama fails to load:

* Show message: `Unable to load panorama. Please try again later.`
* Provide close button.

## 25.3 Banner Missing

If banner PDF is missing:

* Hide download button or show disabled state.
* Keep preview if available.

## 25.4 Contact Missing Fields

If phone, Behance, Instagram, or CV online link are empty, hide those rows/buttons.

---

# 26. Acceptance Criteria

The website is considered complete when:

## 26.1 General

* The site builds successfully.
* The site deploys successfully on GitHub Pages or equivalent static hosting.
* All navigation links work.
* No backend is required.
* No console errors appear in normal use.

## 26.2 Desktop

* Hero section looks polished.
* Exterior gallery works as horizontal slideshow.
* Interior gallery works as horizontal slideshow.
* Fullscreen image viewing works.
* 360 hotspot map displays correctly.
* Clicking a hotspot opens panorama viewer.
* Banner preview and download buttons work.
* Contact links work.

## 26.3 Mobile

* Header collapses correctly.
* Galleries are swipeable.
* Thumbnails are usable.
* Hotspots are tappable.
* 360 viewer is usable on mobile.
* Buttons are not too small.
* Text remains readable.
* No horizontal page overflow.

## 26.4 Performance

* Images below the fold lazy load.
* Hero does not feel extremely slow.
* Panoramas are not loaded until requested.
* Banner PDF is not loaded automatically.

## 26.5 Accessibility

* Main interactions are keyboard reachable.
* Images have alt text.
* Buttons have labels.
* Modals can close.
* Focus states are visible.

---

# 27. Recommended Implementation Plan

## Phase 1 — Project Setup

* Create Vite + React + TypeScript project.
* Configure folder structure.
* Add global CSS variables.
* Configure GitHub Pages base path.
* Add deployment workflow.

## Phase 2 — Layout and Theme

* Build header/navigation.
* Build hero section.
* Add responsive layout.
* Add dark mode visual system.
* Optional: prepare light mode variables.

## Phase 3 — Galleries

* Build reusable Gallery component.
* Add exterior gallery data.
* Add interior gallery data.
* Add thumbnail strip.
* Add captions and index.
* Add fullscreen lightbox.

## Phase 4 — 360 Experience

* Build panorama hotspot map.
* Add hotspot data.
* Integrate Photo Sphere Viewer or Pannellum.
* Add fullscreen viewer modal.
* Add loading and error states.
* Test touch controls.

## Phase 5 — Banner and Contact

* Build banner preview/download section.
* Add CV/contact section.
* Add mailto/tel/LinkedIn links.
* Add responsive stacking.

## Phase 6 — Optimization and Deployment

* Compress images.
* Test desktop/mobile.
* Fix overflow.
* Add SEO metadata.
* Deploy to GitHub Pages.
* Test live URL.

---

# 28. Non-Goals for Version 1

Do not implement these unless explicitly requested:

* Backend contact form.
* User login.
* Admin dashboard.
* CMS.
* Blog.
* Comments.
* Payment.
* Analytics requiring cookies.
* Heavy 3D model viewer.
* WebGL building model viewer.
* Multi-language support.
* Complex routing system.
* Server-side rendering.

---

# 29. Future Enhancements

Possible future additions:

* Full project story sections: concept, site analysis, structure, environmental strategy.
* Plans, sections, diagrams, and drawings viewer.
* Light/dark theme toggle.
* Full virtual tour with multiple connected panorama scenes.
* Audio narration.
* Background ambient museum sound toggle.
* Downloadable project booklet.
* Password-protected jury version if hosted somewhere else later.
* Custom domain.
* Google Analytics or privacy-friendly analytics.
* Arabic/English language toggle.

---

# 30. Final Product Vision

The final website should feel like a premium digital exhibition for the MAZAR Maritime Museum project.

It should allow a visitor to:

1. Arrive at a cinematic hero screen.
2. Browse exterior renders horizontally.
3. Browse interior renders horizontally.
4. Enter an immersive 360-degree museum experience through hotspot navigation.
5. Preview or download the final graduation banner.
6. Contact the project owner or download the CV.

The site should be static, fast, elegant, responsive, and easy to deploy on GitHub Pages.

The strongest UX hierarchy should be:

Browse exterior → Browse interior → Enter 360 experience → Download banner → Contact

The 360 section should be the immersive highlight. The galleries should remain horizontal and presentation-like, with optional fullscreen viewing.
