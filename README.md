# Dushyant Baroliya Portfolio

A dark, motion-driven developer portfolio built with Next.js 15 (App Router), TypeScript, Tailwind CSS v4, Framer Motion, and Lenis smooth scrolling.

## Getting started

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # production build
```

## Where to edit your content

Everything personal lives in one file: [`constants/content.ts`](constants/content.ts)

- `SITE`: name, email, location, canonical URL, resume path
- `SOCIALS`: GitHub / LinkedIn / X profile URLs (currently placeholders; update these)
- `HERO`: hero titles, rotating roles, description
- `PROJECTS`: the project rows (descriptions, stacks, live/GitHub links)
- `SKILL_CATEGORIES`, `TECH_LOGOS`: skill grids
- `CONTACT`: footer statement and blurb

Other swappable assets:

- **Resume**: `public/files/Dushyant-Baroliya-Resume.pdf`, served from `SITE.resumeUrl`. Regenerate it with `python build_resume.py` in the sibling `resume/` project and copy the output here.
- **Project screenshots**: add an `image: "/projects/foo.png"` field to any project in `constants/content.ts`; it replaces the generated placeholder art via `next/image`.
- **Domain**: set `SITE.url` to your real domain for correct canonical/OG/sitemap URLs.

## Architecture

```
app/          # App Router: layout (fonts, SEO, JSON-LD), page, sitemap, robots, OG image
sections/     # Page sections: Hero, Interlude, StatementSection, Projects, TechGrid, Skills, Contact
components/   # Reusable pieces
  providers/  # MotionConfig + preloader context, Lenis smooth scroll
  motion/     # FlipText, MagneticButton, WordReveal primitives
  ui/         # shadcn-style Button (cva)
hooks/        # useClock (IST header clock), useActiveSection (nav highlighting)
constants/    # All site content
types/        # Shared TypeScript types
styles/       # Tailwind v4 theme (blue scale, Zen Dots / Heebo)
```

## Notes

- **Accessibility**: semantic landmarks, skip link, ARIA labels, keyboard-focus rings, and full `prefers-reduced-motion` support (Framer's `MotionConfig reducedMotion="user"`, Lenis and canvas animation disabled).
- **Performance**: server components for the shell, `next/dynamic` for the particle canvas and cursor, `next/font` with swap, canvas paused off-screen via IntersectionObserver.
- **GSAP** was intentionally left out: every animation here is covered by Framer Motion + Lenis, and adding GSAP would only duplicate capability.
