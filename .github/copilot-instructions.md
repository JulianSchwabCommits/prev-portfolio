# Julian Schwab's Portfolio - AI Coding Assistant Guide

## Project Overview

* Next.js portfolio site
* TypeScript, Tailwind CSS, shadcn/ui components
* Custom glassmorphism design system
* GSAP animations for section entry & stagger effects

---

## Architecture & Patterns

### Page Structure

* Single-page scroll layout:
  `HeroSection → OriginSection → LearningSection → ProjectsSection → WorkSection → NowSection`
* Each section has `id="section-name"`
* Global components mounted at page level: `CustomCursor`, `ThemeToggle`, `ScrollNav`, `MobileNav`, `AIAssistant`

### Custom Cursor System

* `cursor: none !important` globally
* Use `data-cursor` attributes to trigger cursor states:

  ```tsx
  <button data-cursor="link">Click me</button>
  <div data-cursor="project">Project card</div>
  <div data-cursor="assistant">AI assistant</div>
  ```
* Supported states: `default`, `hover`, `link`, `project`, `assistant`, `text`

### Glassmorphism Design

* Use `.glass` utility class for blurred backgrounds:

  ```tsx
  <div className="glass rounded-2xl">Content</div>
  ```
* CSS variables for theme-aware glass effects:

  * `--glass-bg` → background color + opacity
  * `--glass-border` → border color + opacity

### Typography Scale

* `.text-hero`: `clamp(3rem, 10vw, 8rem)`
* `.text-display`: `clamp(2rem, 5vw, 4rem)`
* `.section-padding`: `6rem` vertical spacing

### GSAP Animations

* Use `gsap.context()` with cleanup:

  ```ts
  const ctx = gsap.context(() => {
    // Timeline animations
  }, containerRef);
  return () => ctx.revert();
  ```
* Pattern: stagger opacity + translateY with negative offsets (`'-=0.5'`)

### Scroll Hooks

* `useSectionObserver`: Tracks active section with `IntersectionObserver`
* `useScrollProgress`: Tracks scroll velocity and progress
* Navigation dots: active = filled + pulse, past = semi-filled, future = outlined

---

##  Development Workflow

### Running
Always first check if its already running by e.g curl -I http://127.0.0.1:3000 and if nothing is on there then do
```bash
npm run dev          
``` 
and use the mcp tools to open the website and look at the website to review implementation.

when you are finished implementing a feature run 
```bash
npm run build 
```
to check if everything works.
and also run 
```bash
npm run lint
npm run test:watch          
```
to see if all tests suceed.

Here’s a cleaner, more precise, and directive way to write that section for Copilot instructions. I’ve kept the **“check first, verify after”** approach and made it readable while keeping it action-oriented:

---

## Development Workflow

### Running the Project

1. **Check if the server is already running:**

   ```bash
   curl -I http://127.0.0.1:3000
   ```

   * If there’s no response, start the dev server:

   ```bash
   npm run dev
   ```
2. **Review the implementation:**
   * Use MCP tools or browser to verify the website visually.
3. **After implementing a feature:**

   * Build the project to confirm nothing breaks:

   ```bash
   npm run build
   ```

   * Lint and run tests in watch mode to ensure correctness:

   ```bash
   npm run lint
   npm run test:watch
   ```

---

## Critical Integration Points

* **TanStack Query**: setup in `QueryProvider.tsx`
* **GSAP**: `gsap` package, no plugins registered
* **Radix UI**: all interactive primitives
* **Lucide Icons**: for all icons

---

## Conventions & Rules

### Theme & Fonts

* `next-themes` with system support
* JetBrains Mono via Next.js font optimization

### Client Components

* All interactive components: `'use client'`
* Use `useRef` for DOM access

### State & Context

* Local React state, no global store
* Contexts: theme, cursor, scroll

### Mobile Detection

* `window.innerWidth < 768` → mobile

---

## Avoid

* SSR features
* API routes / dynamic routes
* Image optimization
* Background cursor styles

---

## Copilot Behavior Instructions

1. **No fallback data ever**

   * If any fetch, prop, or computation fails → **throw an error**
   * Do not use defaults silently

2. **Default Values Section**

   * Maintain a central place for default values (to be replaced if project changes):

     ```ts
     // src/config/defaults.ts
     export const DEFAULTS = {
       sectionIds: [
         "hero",
         "origin",
         "learning",
         "projects",
         "work",
         "now"
       ],
       cursorStates: ["default","hover","link","project","assistant","text"]
     };
     ```
   * Always read from `DEFAULTS`, never hardcode strings elsewhere

3. **TypeScript & Safety**

   * Always use strict typing
   * No `any` unless explicitly unavoidable
   * Validate props and arguments

4. **UI Conventions**

   * `.glass` for all glassmorphic sections
   * `cn()` utility for Tailwind class merging
   * Section IDs must match `DEFAULTS.sectionIds`
   * GSAP timelines must always clean up

5. **Testing**

   * Vitest + React Testing Library
   * Mock external APIs, assert visibility & interactions
   * Do not write tests with fallback values

6. **File Organization**

   * Small, single-purpose files: sections, ui, utils, hooks, providers, contexts
   * Tests mirror component structure

7. **Error Handling**

   * All errors should throw
   * No silent fails
   * Always bubble up exceptions
