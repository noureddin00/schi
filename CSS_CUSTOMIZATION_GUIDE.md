# CSS Customization Guide

## 📁 File Structure

Your custom CSS files are now organized as follows:

```
resources/css/
├── app.css              # Main CSS file (imports everything)
├── custom-ltr.css       # LTR styles (English)
├── custom-rtl.css       # RTL styles (Arabic)
└── player.css           # Video player styles
```

---

## 🎨 How to Customize

### For English (LTR) Interface
**Edit:** `resources/css/custom-ltr.css`

This file contains all LTR-specific styles organized by sections:
- Layout & Spacing
- Navigation & Menu
- Forms & Inputs
- Buttons & Actions
- Cards & Content Blocks
- Tables
- Modals & Dialogs
- Notifications & Alerts
- Course Player
- Dashboard Elements
- And more...

### For Arabic (RTL) Interface
**Edit:** `resources/css/custom-rtl.css`

This file contains all RTL-specific styles with `[dir='rtl']` selectors:
- Automatic RTL direction
- Flipped margins and paddings
- Right-to-left text alignment
- Arabic typography optimization
- Arabic font family support

---

## 🔄 After Making Changes

Run this command to rebuild CSS:
```bash
npm run build
```

Or for development (auto-rebuild):
```bash
npm run dev
```

---

## 📝 CSS Structure Overview

### custom-ltr.css (English)
Organized in 17 sections:
1. Layout & Spacing
2. Navigation & Menu
3. Forms & Inputs
4. Buttons & Actions
5. Cards & Content Blocks
6. Tables
7. Modals & Dialogs
8. Notifications & Alerts
9. Course Player
10. Dashboard Elements
11. Custom Components
12. Pagination
13. File Upload
14. Search & Filters
15. Misc Utilities
16. Responsive Adjustments
17. Print Styles

### custom-rtl.css (Arabic)
Organized in 22 sections:
1. Layout & Spacing (RTL)
2. Navigation & Menu (RTL)
3. Forms & Inputs (RTL)
4. Buttons & Actions (RTL)
5. Cards & Content Blocks (RTL)
6. Tables (RTL)
7. Modals & Dialogs (RTL)
8. Notifications & Alerts (RTL)
9. Course Player (RTL)
10. Dashboard Elements (RTL)
11. Custom Components (RTL)
12. Pagination (RTL)
13. File Upload (RTL)
14. Search & Filters (RTL)
15. Arabic Typography
16. Misc Utilities (RTL)
17. Sidebar Specific (RTL)
18. Responsive Adjustments (RTL)
19. Print Styles (RTL)
20. Exam & Quiz Specific (RTL)
21. Certificate & Documents (RTL)
22. Rich Text Editor (RTL)

---

## 🎯 Common Customization Examples

### Change Primary Color
Edit `resources/css/app.css`:
```css
:root {
   --primary: oklch(0.265 0.0216 248.65); /* Change this */
}
```

### Change Sidebar Width
Edit `custom-ltr.css` or `custom-rtl.css`:
```css
.sidebar {
   width: 280px; /* Default is 260px */
}
```

### Change Card Shadow
Edit `resources/css/app.css`:
```css
:root {
   --card-shadow: 0 0 2px 0 rgba(145 158 171 / 0.2), 
                  0 12px 24px -4px rgba(145 158 171 / 0.12);
}
```

### Add Custom Spacing
Edit `custom-ltr.css`:
```css
/* Add at the end of file */
.my-custom-spacing {
   padding: 2rem;
   margin-bottom: 1rem;
}
```

For RTL version, add to `custom-rtl.css`:
```css
[dir='rtl'] .my-custom-spacing {
   padding: 2rem;
   margin-bottom: 1rem;
   /* RTL-specific adjustments if needed */
}
```

---

## 🌐 RTL Automatic Detection

The system automatically applies RTL styles when:
- User selects Arabic language
- `app()->getLocale() === 'ar'`
- HTML gets `dir="rtl"` attribute

You can see this in `resources/views/app.blade.php`:
```html
<html dir="{{ app()->getLocale() === 'ar' ? 'rtl' : 'ltr' }}">
```

---

## 💡 Pro Tips

### 1. Use CSS Variables
Instead of hardcoding colors, use variables:
```css
/* ❌ Bad */
.my-element {
   background: #3b82f6;
}

/* ✅ Good */
.my-element {
   background: var(--color-primary);
}
```

### 2. Keep RTL in Mind
When adding new styles to `custom-ltr.css`, always add RTL version to `custom-rtl.css`:
```css
/* custom-ltr.css */
.notification {
   right: 1rem;
   left: auto;
}

/* custom-rtl.css */
[dir='rtl'] .notification {
   left: 1rem;
   right: auto;
}
```

### 3. Test Both Directions
Always test your changes in both English and Arabic:
1. Switch to English → Check layout
2. Switch to Arabic → Check if properly mirrored

### 4. Use Browser DevTools
- Inspect elements
- Live edit CSS
- Copy working styles to your files
- Test responsive design

---

## 🎨 Color Variables Reference

Available color variables in `app.css`:
```css
--color-background
--color-foreground
--color-primary
--color-primary-dark
--color-primary-light
--color-secondary
--color-secondary-dark
--color-secondary-light
--color-muted
--color-accent
--color-destructive
--color-border
--color-input
--color-ring
--color-sidebar
--color-sidebar-foreground
```

---

## 📱 Responsive Breakpoints

```css
/* Mobile */
@media (max-width: 768px) { }

/* Tablet */
@media (min-width: 769px) and (max-width: 1024px) { }

/* Desktop */
@media (min-width: 1025px) { }
```

---

## 🐛 Debugging Tips

### CSS Not Applying?
1. Clear build directory:
   ```bash
   Remove-Item -Recurse -Force public/build
   npm run build
   ```

2. Clear browser cache:
   - Press `Ctrl + Shift + R` (hard refresh)
   - Or open DevTools → Network → Disable cache

3. Check if styles are imported:
   - Open `resources/css/app.css`
   - Verify imports are present

### RTL Not Working?
1. Check HTML dir attribute:
   ```bash
   php artisan tinker
   >>> app()->getLocale()
   ```

2. Verify language switcher working

3. Check `custom-rtl.css` selectors have `[dir='rtl']`

---

## 📚 Quick Reference

### Margin/Padding Direction Classes
```css
/* LTR */
.ml-4  → margin-left
.mr-4  → margin-right
.pl-4  → padding-left
.pr-4  → padding-right

/* RTL (automatically flipped) */
[dir='rtl'] .ml-4  → margin-right (flipped)
[dir='rtl'] .mr-4  → margin-left (flipped)
```

### Float Direction
```css
/* LTR */
.float-start → float: left
.float-end   → float: right

/* RTL */
[dir='rtl'] .float-start → float: right (flipped)
[dir='rtl'] .float-end   → float: left (flipped)
```

### Text Alignment
```css
/* LTR */
.text-left  → text-align: left
.text-right → text-align: right

/* RTL */
[dir='rtl'] .text-left  → text-align: right (flipped)
[dir='rtl'] .text-right → text-align: left (flipped)
```

---

## ✅ Best Practices

1. **Always use semantic class names**
   - `.card-header` ✅
   - `.blue-box` ❌

2. **Group related styles together**
   - Keep navigation styles in one section
   - Keep form styles in another section

3. **Comment your custom code**
   ```css
   /* Custom: Increased sidebar width for better visibility */
   .sidebar {
      width: 300px;
   }
   ```

4. **Test in both modes**
   - Light mode
   - Dark mode
   - LTR (English)
   - RTL (Arabic)

5. **Keep backup before major changes**
   ```bash
   Copy-Item resources/css/custom-ltr.css resources/css/custom-ltr.css.backup
   Copy-Item resources/css/custom-rtl.css resources/css/custom-rtl.css.backup
   ```

---

## 🔗 Related Files

- Main app: `resources/views/app.blade.php`
- Tailwind config: `tailwind.config.js`
- Vite config: `vite.config.ts`
- Theme settings: Stored in database (settings table)

---

## 🆘 Need Help?

1. Check browser console for CSS errors
2. Use DevTools to inspect elements
3. Verify build completed successfully
4. Check if file changes were saved

---

**Happy Customizing! 🎨**
