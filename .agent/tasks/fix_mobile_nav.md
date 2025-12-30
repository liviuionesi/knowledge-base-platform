# Task: Repair Mobile Navigation Visibility

## Status
- [x] Move MobileNav component to end of DOM in WikiShell <!-- id: 0 -->
- [x] Revert custom z-index to standard z-50 in MobileNav <!-- id: 1 -->
- [x] Optimize Mobile Layout z-index handling <!-- id: 2 -->
- [x] Verify fix with user <!-- id: 3 -->

## Context
The user reports that the mobile sidebar "disappears" (or fails to show correctly) when clicking the hamburger menu. This is likely due to a z-index stacking context issue where the sticky header (z-50) is rendering on top of the mobile menu (z-[100] reduced to auto if JIT fails, or just stacking order conflict).

## Plan
1.  **Refactor component ordering**: Move `<MobileNav />` in `WikiShell.tsx` to be rendered *after* the Header and Content to ensure it naturally stacks on top in the DOM order.
2.  **Standardize Z-Index**: Revert `z-[100]` to `z-50` in `MobileNav.tsx`. Since it will be last in DOM, `z-50` (equal to Header) will place it on top. This avoids potential Tailwind JIT issues if the project config behaves strictly.
