# TODO

## High Priority

1. **Missing `src/config/defaults.ts` file**
   - Mentioned in instructions but doesn't exist
   - Critical for avoiding hardcoded values across components
   - Should include section IDs, cursor states, animation timings, breakpoints

2. **No cursor context implementation**
   - Instructions reference "cursor context" but it's not in the workspace
   - Need `src/contexts/CursorContext.tsx` with provider and hook

3. **No scroll context implementation**
   - Referenced but missing
   - Should centralize scroll state management

4. **Error boundary strategy missing**
   - Instructions say "throw errors" but no error boundary to catch them
   - Need `ErrorBoundary.tsx` component

5. **Loading state patterns undefined**
   - TanStack Query mentioned but no loading/error UI patterns
   - Should define skeleton, spinner, error state components

## Medium Priority

6. **Animation performance guidelines**
   - GSAP usage described but no performance best practices
   - Should include `will-change`, transform optimization, RAF usage

7. **Mobile-specific patterns**
   - Only `window.innerWidth < 768` check mentioned
   - Need touch event handling, gesture patterns, mobile nav behavior

8. **Accessibility missing entirely**
   - No ARIA, keyboard nav, focus management, screen reader guidance
   - Critical for modern web apps

9. **Environment variable management**
   - No `.env.example` or env var documentation
   - No validation pattern

10. **Test helpers and mocks**
    - Testing mentioned but no shared test utilities
    - Should have mock factories, test data generators

## Low Priority

11. **Deployment process**
    - No build/deploy pipeline documentation
    - Cloudflare Pages config exists but no deployment guide

12. **PR/Code review checklist**
    - Git workflow defined but no review criteria

13. **Performance budgets**
    - No bundle size, LCP, CLS targets defined

14. **Storybook/component documentation**
    - No isolated component development workflow

15. **API integration patterns**
    - TanStack Query setup mentioned but no concrete API patterns
