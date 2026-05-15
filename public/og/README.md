# Open Graph Social Cards

This directory should contain 1200×630px PNG images used as social-media share previews. Each file is referenced by `src/pages/*/index.jsx` via the `ogImage` field passed to `MetaComponent`.

Until designed cards are placed here, social-media crawlers will fall back to the static `og:image` in `index.html` (the EduNoble logo).

## Expected files

- `default.png` — fallback for policy/utility pages; logo + "Where Learning Meets Direction" tagline
- `home.png` — homepage; "Offline & Online Coaching" + "Where Learning Meets Direction"
- `resources.png` — resources/sample papers; "Free Sample Papers — Class 8–12"
- `about.png` — about; "About EduNoble — Indore-based Coaching"
- `vision.png` — vision; "Our Vision — Learning with Direction"
- `testimonials.png` — testimonials; "What Our Students Say"
- `contact.png` — contact; "Book a Free Demo Class" + phone + WhatsApp

## Designer hand-off

- 1200×630 PNG (or JPG, but PNG preferred for sharp text).
- Brand: dark background (`#1a1050` or similar), green accent `#22C55E`.
- Layout: logo top-left, headline center, optional tagline below.
- Keep text large enough to read at 600×315 (Twitter card preview size).
- Canva or Figma 1200×630 templates work well.
