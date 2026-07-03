# 4-Week Action Plan — sudo-hades.dev

**Objective:** Transform site from portfolio to content platform with service booking capability

**Start Date:** Week 1  
**Focus:** Content publishing + Service booking + SEO enhancement + Newsletter foundation

---

## Engineering Optimization Pass

### Completed
- Removed unnecessary `force-dynamic` flags from static listing routes.
- Promoted finite content, services, shop, and project detail routes to static params generation.
- Added request-safe memoization to filesystem-backed content, product, and service lookups.
- Simplified homepage loading so below-the-fold sections render directly instead of waiting on skeleton-based lazy imports.

### In Progress
- None.

### Deferred
- MDX pipeline rewrite or renderer migration.
- Broader image pipeline changes beyond current `next/image` usage.
- Global layout hydration refactor beyond the current SSR-safe setup.

### Not Recommended
- Adding new dependencies for this pass.
- Changing the visual design or motion system for performance alone.

### New Engineering Tasks
- Revisit sitemap timestamping and other cache-sensitive metadata only if a measurable crawler or CDN issue appears.
- Re-evaluate any future layout-only client components before moving them behind client-only wrappers.

---

## Week 1 — Foundation & Assets

### Goals
- Complete missing assets
- Improve accessibility
- Add structured data
- Set up newsletter platform

### Tasks

**Day 1-2: Assets**
- [ ] Add profile image to `public/profile/profile.jpg`
- [ ] Maintain the internal About artwork at `public/images/og-default.png` for the easter egg only
- [ ] Add project thumbnails to `public/projects/` (if any)
- [ ] Test all images load correctly

**Day 3: Accessibility**
- [ ] Add skip-to-content link to layout
- [ ] Implement `prefers-reduced-motion` in animations
- [ ] Validate color contrast ratios
- [ ] Test keyboard navigation
- [ ] Add landmark roles (main, nav, etc.)

**Day 4: Structured Data**
- [ ] Create JSON-LD component for Organization schema
- [ ] Add Person schema to about page
- [ ] Implement Article schema for blog posts
- [ ] Add BreadcrumbList schema
- [ ] Test with Google Rich Results Test

**Day 5: Newsletter Setup**
- [ ] Choose newsletter platform (Beehiiv recommended)
- [ ] Create account and configure
- [ ] Design email templates matching site aesthetic
- [ ] Create welcome sequence

**Deliverables:**
- All assets in place
- Accessibility improvements deployed
- Structured data implemented
- Newsletter platform ready

---

## Week 2 — Content Publishing

### Goals
- Publish substantive blog content
- Create technical notes
- Document current build
- Populate resource library

### Tasks

**Day 1-2: Blog Posts (5 posts)**
- [ ] Write "Getting Started with ESP-NOW Mesh Networks" (expand placeholder)
- [ ] Write "Linux Server Hardening Checklist"
- [ ] Write "Nginx Reverse Proxy Patterns for Production"
- [ ] Write "Bash Automation Best Practices"
- [ ] Write "VPS Setup Guide for Developers"

**Day 3: Notes (10 notes)**
- [ ] "ESP-NOW mesh topology notes"
- [ ] "nginx reverse proxy patterns"
- [ ] "PayHero integration gotchas"
- [ ] "systemd service hardening"
- [ ] "Docker deployment patterns"
- [ ] "SSH security checklist"
- [ ] "TLS certificate management"
- [ ] "Log aggregation setup"
- [ ] "Backup automation scripts"
- [ ] "Monitoring stack basics"

**Day 4: Build Log**
- [ ] Expand ChamaInvest build log with detailed entries
- [ ] Add screenshots/diagrams
- [ ] Document challenges and solutions
- [ ] Link to relevant code

**Day 5: Resources (3 guides)**
- [ ] "Linux Administration Quick Reference"
- [ ] "VPS Security Checklist"
- [ ] "Deployment Checklist"

**Deliverables:**
- 5 blog posts published
- 10 notes published
- Build log expanded
- 3 resource guides published

---

## Week 3 — Service Booking System

### Goals
- Create service detail pages
- Build inquiry/intake forms
- Add availability indicator
- Implement booking workflow

### Tasks

**Day 1: Service Detail Pages**
- [ ] Create `app/services/[slug]/page.tsx`
- [ ] Design service detail template
- [ ] Add detailed scope for each service
- [ ] Include deliverables breakdown
- [ ] Add pricing tiers/options
- [ ] Link relevant case studies

**Day 2: Inquiry Form**
- [ ] Create `components/forms/ServiceInquiry.tsx`
- [ ] Add form fields: name, email, service, timeline, budget, description
- [ ] Implement form validation
- [ ] Add success/error states
- [ ] Integrate with email service

**Day 3: Availability System**
- [ ] Add availability indicator to service pages
- [ ] Create simple availability calendar
- [ ] Add booking slots
- [ ] Implement timezone handling

**Day 4: Booking Workflow**
- [ ] Create booking confirmation page
- [ ] Add email notifications
- [ ] Create admin view for inquiries
- [ ] Implement inquiry status tracking

**Day 5: Service Page Polish**
- [ ] Add FAQ section to each service
- [ ] Add testimonials (if available)
- [ ] Add process timeline
- [ ] Add what's included/excluded
- [ ] Test full booking flow

**Deliverables:**
- 4 service detail pages live
- Inquiry form functional
- Availability system working
- Booking workflow complete

---

## Week 4 — SEO Enhancement & Launch Prep

### Goals
- Implement RSS feed
- Enhance internal linking
- Improve sitemap
- Add loading states
- Prepare for launch

### Tasks

**Day 1: RSS Feed**
- [ ] Create `app/rss.xml/route.ts`
- [ ] Generate RSS for blog posts
- [ ] Generate RSS for notes
- [ ] Add RSS autodiscovery to layout
- [ ] Test RSS feed validation

**Day 2: Internal Linking**
- [ ] Add related content section to blog posts
- [ ] Add "see also" links to notes
- [ ] Cross-link between content types
- [ ] Create topic hubs (Linux, DevOps, Automation)
- [ ] Add breadcrumb navigation

**Day 3: Sitemap Enhancement**
- [ ] Make sitemap dynamic with content
- [ ] Add all dynamic routes
- [ ] Implement proper lastModified dates
- [ ] Add image sitemap
- [ ] Test sitemap in Google Search Console

**Day 4: UX Improvements**
- [ ] Add skeleton loading states
- [ ] Improve empty states with illustrations
- [ ] Add error boundaries
- [ ] Add loading spinners
- [ ] Add progress indicators

**Day 5: Launch Prep**
- [ ] Full site testing (all pages, all links)
- [ ] Performance audit (Lighthouse)
- [ ] SEO audit (check all metadata)
- [ ] Accessibility audit (WCAG compliance)
- [ ] Deploy to production
- [ ] Submit sitemap to Google
- [ ] Set up analytics (Plausible/Umami)

**Deliverables:**
- RSS feeds functional
- Internal linking improved
- Dynamic sitemap live
- Loading states implemented
- Site launched and monitored

---

## Success Metrics

### Content Metrics
- 5 blog posts published
- 10 notes published
- Build log expanded
- 3 resource guides published

### Technical Metrics
- All assets in place
- Structured data implemented
- RSS feeds functional
- Service booking system live
- Accessibility score > 90

### Business Metrics
- Newsletter signup form active
- Service inquiry form functional
- Site submitted to search engines
- Analytics tracking installed

---

## Week 5+ — Next Phase Preparation

After completing Week 4, the platform will be ready for:

**Phase 5 — PayHero Integration**
- Integrate PayHero API
- Build checkout flow
- Implement webhooks
- Create payment confirmation

**Phase 6 — Newsletter Growth**
- Create newsletter archive page
- Implement automated content-to-newsletter
- Build subscriber management
- Add newsletter signup incentives

**Phase 7 — Digital Products**
- Define product catalog
- Create product pages
- Build download system
- Implement license management

---

## Daily Time Allocation

**Content Creation:** 3-4 hours/day  
**Development:** 2-3 hours/day  
**Testing/Review:** 1 hour/day

**Total daily commitment:** 6-8 hours

---

## Dependencies

**External Services Needed:**
- Newsletter platform (Beehiiv/ConvertKit)
- Email service for forms (Resend/SendGrid)
- Analytics (Plausible/Umami)
- PayHero account (for Week 5+)

**Content Needed:**
- Profile photo
- OG image design
- Blog post content
- Note content
- Service descriptions

---

## Risk Mitigation

**Content Creation Bottleneck:**
- Start with outline drafts
- Use existing knowledge/experience
- Repurpose from build logs
- Batch similar topics

**Development Delays:**
- Prioritize MVP features
- Use existing components
- Leverage Next.js built-ins
- Test incrementally

**Integration Issues:**
- Test integrations early
- Have fallback options
- Document API usage
- Monitor error rates

---

## Review Points

**End of Week 1:**
- Assets check
- Accessibility audit
- Structured data validation
- Newsletter platform configured

**End of Week 2:**
- Content quality review
- SEO check
- Internal linking audit
- Performance test

**End of Week 3:**
- Service booking flow test
- Form validation test
- Email delivery test
- UX review

**End of Week 4:**
- Full site audit
- Performance benchmark
- SEO validation
- Launch readiness check

---

## Adjustments

If falling behind:
- Reduce content volume (5 posts → 3 posts, 10 notes → 5 notes)
- Simplify service pages (use template)
- Defer nice-to-have features (availability calendar)
- Focus on core functionality first

If ahead of schedule:
- Add more content
- Enhance service pages with case studies
- Implement advanced features (search, filtering)
- Start PayHero integration early

---

## Support Resources

**Documentation:**
- Next.js docs: https://nextjs.org/docs
- MDX docs: https://mdxjs.com
- Tailwind docs: https://tailwindcss.com/docs
- Framer Motion: https://www.framer.com/motion/

**Tools:**
- Google Rich Results Test
- Lighthouse
- WAVE Accessibility Tool
- RSS Validator

**Templates:**
- Use existing components as templates
- Follow patterns in similar pages
- Leverage PROJECT_GUIDE.md for reference

---

## Completion Checklist

**Week 1:**
- [ ] Profile image added
- [ ] OG image created
- [ ] Accessibility improvements
- [ ] Structured data implemented
- [ ] Newsletter platform configured

**Week 2:**
- [ ] 5 blog posts published
- [ ] 10 notes published
- [ ] Build log expanded
- [ ] 3 resource guides published

**Week 3:**
- [ ] Service detail pages live
- [ ] Inquiry form functional
- [ ] Availability system working
- [ ] Booking workflow complete

**Week 4:**
- [ ] RSS feeds functional
- [ ] Internal linking improved
- [ ] Dynamic sitemap live
- [ ] Loading states implemented
- [ ] Site launched

**Overall:**
- [ ] Site transformed from portfolio to content platform
- [ ] Service booking capability operational
- [ ] SEO foundation solid
- [ ] Newsletter system ready
- [ ] Ready for monetization phase
