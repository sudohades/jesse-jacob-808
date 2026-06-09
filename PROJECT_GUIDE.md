# PROJECT_GUIDE.md — sudo-hades.dev

A practical sitemap and maintenance guide for developers and content creators.

---

## Site Structure

### Routes and Their Files

| Route | File | Description |
|-------|------|-------------|
| `/` | `app/page.tsx` | Homepage with hero, expertise, projects, current build, recent notes |
| `/about` | `app/about/page.tsx` | About page with bio and easter egg |
| `/projects` | `app/projects/page.tsx` | Projects listing (currently placeholder) |
| `/projects/[slug]` | *Not implemented* | Project detail pages (future) |
| `/blog` | `app/blog/page.tsx` | Blog post listing |
| `/blog/[slug]` | `app/blog/[slug]/page.tsx` | Individual blog post |
| `/notes` | `app/notes/page.tsx` | Notes listing |
| `/notes/[slug]` | `app/notes/[slug]/page.tsx` | Individual note |
| `/build-log` | `app/build-log/page.tsx` | Build log listing |
| `/build-log/[slug]` | `app/build-log/[slug]/page.tsx` | Individual build log entry |
| `/resources` | `app/resources/page.tsx` | Resources listing |
| `/resources/[slug]` | `app/resources/[slug]/page.tsx` | Individual resource |
| `/services` | `app/services/page.tsx` | Services catalog |
| `/services/[slug]` | *Not implemented* | Service detail pages (future) |
| `/contact` | `app/contact/page.tsx` | Contact page with social links |
| `/sitemap.xml` | `app/sitemap.ts` | Generated sitemap |
| `/robots.txt` | `app/robots.ts` | Generated robots.txt |

---

## Visual Customization Guide

### Hero Section

**File:** `components/sections/HeroSection.tsx`

**What to change:**
- Greeting text: Edit `hero.greeting` in `lib/site-config.ts`
- Headlines: Edit `hero.headline` array in `lib/site-config.ts`
- Subheadline: Edit `hero.subheadline` in `lib/site-config.ts`
- CTA buttons: Edit `hero.cta` array in `lib/site-config.ts`
- Profile image: Replace `/profile/profile.jpg` in `public/profile/`

---

### Navigation

**File:** `components/layout/Navbar.tsx`

**What to change:**
- Navigation links: Edit `nav` array in `lib/site-config.ts`
- Brand name: Edit `brand` in `lib/site-config.ts`
- Contact button: Hardcoded in Navbar.tsx (line 85-93)

---

### Footer

**File:** `components/layout/Footer.tsx`

**What to change:**
- Social links: Edit `socials` object in `lib/site-config.ts`
- Navigation links: Uses `nav` array from `lib/site-config.ts`
- Brand name: Uses `brand` from `lib/site-config.ts`

---

### Projects Section

**File:** `components/sections/ProjectsSection.tsx`

**What to change:**
- Featured projects: Edit `featuredProjects` array in `lib/site-config.ts`
- Project status badges: Edit `statusVariant` object in ProjectsSection.tsx

**Note:** Currently hardcoded. Future: Convert to MDX-driven system.

---

### Expertise Cards

**File:** `components/sections/ExpertiseSection.tsx`

**What to change:**
- Expertise items: Edit `expertise` array in `lib/site-config.ts`
- Icons: Edit `iconMap` object in ExpertiseSection.tsx

---

### Current Build Section

**File:** `components/sections/CurrentBuild.tsx`

**What to change:**
- Current build info: Edit `currentBuild` object in `lib/site-config.ts`

---

### Social Links

**File:** `lib/site-config.ts`

**What to change:**
- Edit `socials` object (lines 25-30):
  - `github`: GitHub profile URL
  - `twitter`: Twitter/X profile URL
  - `linkedin`: LinkedIn profile URL
  - `email`: Email address

---

### Branding

**File:** `lib/site-config.ts`

**What to change:**
- Name: Edit `name` (line 3)
- Brand: Edit `brand` (line 4)
- Handle: Edit `handle` (line 5)
- Tagline: Edit `tagline` (line 10)
- Description: Edit `description` (lines 11-12)

---

### Colors

**File:** `tailwind.config.ts` and `styles/globals.css`

**What to change:**
- Tailwind config: Edit `colors` object (lines 13-34)
- CSS variables: Edit `:root` section in `styles/globals.css` (lines 9-45)

**Key colors:**
- Backgrounds: `bg-base`, `bg-surface`, `bg-raised`, `bg-overlay`, `bg-border`, `bg-muted`
- Text: `text-primary`, `text-secondary`, `text-muted`
- Accents: `cyan`, `blue`, `violet`

---

### Animations

**Files:** 
- `tailwind.config.ts` (lines 54-87)
- `styles/globals.css` (lines 112-180)

**What to change:**
- Animation durations: Edit keyframe durations
- Animation easing: Edit transition curves
- Mesh drift: Edit `meshDrift` keyframes
- Glow effects: Edit `glowPulse` keyframes

---

## Content Management Guide

### Adding Blog Posts

**Location:** `content/blog/`

**Steps:**
1. Create new file: `content/blog/your-post-slug.mdx`
2. Add frontmatter:
```yaml
---
title: "Your Post Title"
description: "Post description for SEO"
date: "2025-01-15"
tags: ["tag1", "tag2"]
status: "published"
readTime: "5 min"
---
```
3. Write content in MDX format
4. File automatically appears at `/blog/your-post-slug`

**Frontmatter fields:**
- `title` (required): Post title
- `description` (required): SEO description
- `date` (required): Publication date
- `tags` (optional): Array of tags
- `status` (optional): "draft" or "published" (default: published)
- `readTime` (optional): Reading time estimate

---

### Adding Notes

**Location:** `content/notes/`

**Steps:**
1. Create new file: `content/notes/your-note-slug.mdx`
2. Add frontmatter (same format as blog posts)
3. Write content in MDX format
4. File automatically appears at `/notes/your-note-slug`

---

### Adding Build Logs

**Location:** `content/build-log/`

**Steps:**
1. Create new file: `content/build-log/your-log-slug.mdx`
2. Add frontmatter (same format as blog posts)
3. Write content in MDX format
4. File automatically appears at `/build-log/your-log-slug`

---

### Adding Resources

**Location:** `content/resources/`

**Steps:**
1. Create new file: `content/resources/your-resource-slug.mdx`
2. Add frontmatter (same format as blog posts)
3. Write content in MDX format
4. File automatically appears at `/resources/your-resource-slug`

---

### MDX Components Available

In your MDX content, you can use standard Markdown plus:
- Headings: `#`, `##`, `###`
- Links: `[text](url)`
- Code: `` `code` `` and code blocks
- Images: `![alt](src)`
- Lists: Bullet and numbered
- Blockquotes: `> quote`
- Custom styling applied automatically via `MdxRenderer`

---

## Asset Management Guide

### Profile Photo

**Location:** `public/profile/profile.jpg`

**Steps:**
1. Replace existing file with your photo
2. Recommended size: 400x400px or larger
3. Used in: HeroSection component

---

### Project Thumbnails

**Location:** `public/projects/`

**Steps:**
1. Create folder: `public/projects/`
2. Add images: `public/projects/project-slug.jpg`
3. Reference in MDX: `![alt](/projects/project-slug.jpg)`

**Note:** Project system not yet MDX-driven. This is for future use.

---

### OpenGraph Images

**Location:** `public/images/og-default.png`

**Steps:**
1. Create or replace `public/images/og-default.png`
2. Recommended size: 1200x630px
3. Used for all pages unless overridden
4. Configure in `lib/site-config.ts` (line 163)

---

### Icons

**Library:** Lucide React

**Usage:**
```tsx
import { IconName } from "lucide-react";
<IconName size={16} />
```

**Custom icons:** Add to `public/icons/` if needed

---

## SEO Guide

### Page Metadata

**File:** `lib/seo/metadata.ts`

**Per-page metadata:** In each page file:
```tsx
export const metadata: Metadata = buildMetadata({
  title: "Page Title",
  description: "Page description",
  path: "/your-path",
});
```

---

### Global SEO Settings

**File:** `lib/site-config.ts`

**What to change:**
- Keywords: Edit `keywords` array (lines 13-22)
- Description: Edit `description` (lines 11-12)
- Domain: Edit `domain` and `baseUrl` (lines 6-7)

---

### Sitemap

**File:** `app/sitemap.ts`

**What to change:**
- Add new routes to the array
- Adjust `changeFrequency` and `priority`
- Currently static; can be made dynamic

---

### Robots.txt

**File:** `app/robots.ts`

**What to change:**
- Adjust rules if needed
- Currently allows all bots

---

### OpenGraph Settings

**File:** `lib/seo/metadata.ts` (lines 28-36)

**What to change:**
- Default OG image: Edit `ogImage` in `lib/site-config.ts`
- Per-page OG images: Pass `ogImage` to `buildMetadata()`

---

## Future Monetization Guide

### Services

**Current Location:** `lib/site-config.ts` (lines 42-100)

**Future Implementation:**
- Service detail pages: `app/services/[slug]/page.tsx`
- Intake forms: New component in `components/forms/`
- Booking system: New API routes in `app/api/`
- PayHero integration: New lib at `lib/payhero/`

---

### PayHero Integration

**Recommended Location:**
- API routes: `app/api/payhero/`
- Webhooks: `app/api/webhooks/payhero/`
- Types: `lib/types/payhero.ts`
- Client: `lib/payhero/client.ts`

**Implementation Steps:**
1. Install PayHero SDK or create API client
2. Create checkout page: `app/checkout/page.tsx`
3. Implement webhook handler: `app/api/webhooks/payhero/route.ts`
4. Add payment verification
5. Create confirmation page: `app/checkout/success/page.tsx`

---

### Checkout Flow

**Recommended Routes:**
- `/services/[slug]` — Service detail
- `/checkout` — Checkout page
- `/checkout/success` — Payment confirmation
- `/api/webhooks/payhero` — Webhook handler

---

### Newsletter

**Recommended Implementation:**
- Platform: Beehiiv or ConvertKit
- Component: `components/newsletter/Signup.tsx`
- API route: `app/api/newsletter/subscribe/route.ts`
- Types: `lib/types/newsletter.ts`

**Integration Points:**
- Homepage hero section
- Blog posts
- Footer
- Dedicated landing page

---

### Products

**Future Structure:**
- Product catalog: `lib/site-config.ts` (new `products` array)
- Product pages: `app/shop/[slug]/page.tsx`
- Download system: `app/api/download/[slug]/route.ts`
- License management: `lib/licenses/`
- Delivery automation: Webhook after payment

---

### Digital Product Delivery

**Recommended Flow:**
1. Purchase via PayHero
2. Webhook triggers delivery
3. Generate license key
4. Send download email
5. Track deliveries in database

---

## Configuration Files Reference

### Site Configuration

**File:** `lib/site-config.ts`

**Controls:**
- Brand identity
- Navigation
- Social links
- Services catalog
- Featured projects
- Current build
- SEO defaults

---

### Tailwind Configuration

**File:** `tailwind.config.ts`

**Controls:**
- Color palette
- Font families
- Font sizes
- Spacing scale
- Border radius
- Animations
- Custom shadows

---

### Next.js Configuration

**File:** `next.config.ts`

**Controls:**
- Page extensions (includes MDX)
- MDX RS (Rust compiler)
- Image optimization
- Remote image patterns

---

### TypeScript Configuration

**File:** `tsconfig.json`

**Controls:**
- Path aliases (`@/*` maps to root)
- Compiler options
- Type checking strictness

---

## Development Workflow

### Running Development Server

```bash
npm run dev
```

### Building for Production

```bash
npm run build
```

### Starting Production Server

```bash
npm run start
```

### Type Checking

```bash
npm run type-check
```

### Linting

```bash
npm run lint
```

---

## Common Tasks

### Adding a New Navigation Link

1. Edit `lib/site-config.ts`
2. Add to `nav` array:
```ts
{ label: "New Page", href: "/new-page" }
```
3. Create page file: `app/new-page/page.tsx`

---

### Changing the Color Scheme

1. Edit `tailwind.config.ts` colors section
2. Edit `styles/globals.css` CSS variables
3. Test across all components

---

### Adding a New Content Type

1. Add type to `lib/content/mdx.ts` `ContentType` union
2. Create folder: `content/new-type/`
3. Create listing page: `app/new-type/page.tsx`
4. Create detail page: `app/new-type/[slug]/page.tsx`
5. Add to sitemap: `app/sitemap.ts`

---

### Updating the Current Build

1. Edit `lib/site-config.ts` `currentBuild` object
2. Update title, description, status, stack, startedAt

---

### Adding a New Service

1. Edit `lib/site-config.ts` `services` array
2. Add service object with required fields
3. Service automatically appears on `/services`

---

## Troubleshooting

### MDX Content Not Appearing

- Check frontmatter has `status: "published"`
- Verify file extension is `.mdx`
- Check file is in correct content folder
- Restart dev server

### Images Not Loading

- Verify image is in `public/` folder
- Check path starts with `/`
- For remote images, add domain to `next.config.ts` `remotePatterns`

### Styles Not Applying

- Check Tailwind class names are correct
- Verify CSS custom properties are defined
- Check for specificity conflicts
- Restart dev server

### Build Errors

- Run `npm run type-check` to find TypeScript errors
- Run `npm run lint` to find ESLint errors
- Check console for specific error messages

---

## Deployment

### Vercel Deployment

1. Connect repository to Vercel
2. Vercel automatically detects Next.js
3. Configure environment variables if needed
4. Deploy on push to main branch

### VPS Deployment (Future)

1. Build project: `npm run build`
2. Start server: `npm run start`
3. Configure nginx reverse proxy
4. Set up SSL with Let's Encrypt
5. Configure process manager (PM2 or systemd)

---

## Support

For issues or questions:
- Check Next.js documentation: https://nextjs.org/docs
- Check Tailwind CSS documentation: https://tailwindcss.com/docs
- Check Framer Motion documentation: https://www.framer.com/motion/
