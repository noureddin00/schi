# Styling Components with Only Tailwind Classes

## Problem
React components use only Tailwind utility classes, making it hard to apply custom CSS:
```tsx
<div className="fixed top-0 z-30 w-full">
```

## Solutions

---

## ✅ **Method 1: Target Tailwind Classes in CSS** (Quick & Easy)

You can target elements by their Tailwind class combinations in your custom CSS files.

### Example: Style the Header

**In `custom-ltr.css`:**
```css
/* Target header by Tailwind classes */
.fixed.top-0.z-30.w-full {
   backdrop-filter: blur(10px);
   box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
   border-bottom: 1px solid var(--color-border);
}

/* Sticky navbar container */
.container.flex.h-16 {
   background: rgba(255, 255, 255, 0.95);
}
```

**In `custom-rtl.css`:**
```css
[dir='rtl'] .fixed.top-0.z-30.w-full {
   /* RTL-specific header styles */
}
```

**Pros:** ✅ No code changes needed  
**Cons:** ⚠️ Less specific, may affect multiple elements

---

## ✅ **Method 2: Use Attribute Selectors** (More Specific)

Target elements by data attributes or specific combinations:

```css
/* Target by partial class match */
[class*="fixed top-0"] {
   /* Your styles */
}

/* Target by element + classes */
div.fixed.top-0.z-30 {
   /* Your styles */
}

/* Target by child relationship */
.container > .flex.items-center {
   /* Your styles */
}
```

---

## ✅ **Method 3: Add Custom Classes** (Best Practice)

Modify React components to include semantic class names.

### Step 1: Add class to component

**Edit:** `resources/js/layouts/navbar/index.tsx`

**Change this:**
```tsx
<div className={cn('fixed top-0 z-30 w-full', isMenuOpen && 'bg-background')}>
```

**To this:**
```tsx
<div className={cn('app-header fixed top-0 z-30 w-full', isMenuOpen && 'bg-background')}>
```

### Step 2: Style in CSS

**In `custom-ltr.css`:**
```css
.app-header {
   backdrop-filter: blur(10px);
   box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}
```

**In `custom-rtl.css`:**
```css
[dir='rtl'] .app-header {
   /* RTL styles */
}
```

**Pros:** ✅ Most maintainable, specific, semantic  
**Cons:** ⚠️ Requires code changes

---

## ✅ **Method 4: Use CSS Nesting** (Modern CSS)

```css
/* Target nested elements */
.fixed.top-0 {
   & .container {
      background: white;
   }
   
   & button {
      border-radius: 0.5rem;
   }
}
```

---

## 🎯 **Practical Examples**

### Example 1: Style All Buttons

**In `custom-ltr.css`:**
```css
/* Primary buttons */
button[class*="bg-primary"] {
   box-shadow: 0 4px 6px rgba(59, 130, 246, 0.3);
   transition: all 0.3s ease;
}

button[class*="bg-primary"]:hover {
   transform: translateY(-2px);
   box-shadow: 0 6px 12px rgba(59, 130, 246, 0.4);
}

/* Secondary buttons */
button[class*="bg-secondary"] {
   border: 2px solid var(--color-secondary);
}
```

### Example 2: Style All Cards

```css
/* Cards with shadow */
.shadow-card,
.bg-card {
   border: 1px solid var(--color-border);
   transition: transform 0.2s ease;
}

.shadow-card:hover,
.bg-card:hover {
   transform: translateY(-4px);
   box-shadow: 0 8px 16px rgba(0, 0, 0, 0.1);
}
```

### Example 3: Style Form Inputs

```css
/* All text inputs */
input[type="text"],
input[type="email"],
input[type="password"],
input[type="number"],
textarea {
   border: 2px solid var(--color-border);
   border-radius: 0.5rem;
   padding: 0.75rem;
   transition: border-color 0.2s ease;
}

input:focus,
textarea:focus {
   border-color: var(--color-primary);
   outline: none;
   box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
}
```

### Example 4: Style Sidebar

```css
/* Sidebar navigation */
[class*="sidebar"] nav a {
   transition: all 0.2s ease;
}

[class*="sidebar"] nav a:hover {
   background: var(--color-secondary);
   padding-left: 1.5rem;
}
```

### Example 5: Style Tables

```css
/* Table headers */
table thead th {
   background: var(--color-muted);
   font-weight: 600;
   padding: 1rem;
   text-align: left;
}

/* Table rows */
table tbody tr {
   border-bottom: 1px solid var(--color-border);
   transition: background 0.2s ease;
}

table tbody tr:hover {
   background: var(--color-secondary);
}
```

---

## 🔍 **How to Find Elements to Style**

### Using Browser DevTools:

1. **Open DevTools** (F12)
2. **Right-click element** → Inspect
3. **Copy classes** from Elements panel
4. **Use in CSS:**
   ```css
   .class1.class2.class3 {
      /* Your styles */
   }
   ```

### Finding Common Elements:

```bash
# Search for specific patterns
grep -r "className.*fixed top-0" resources/js/

# Find all navbar components
grep -r "navbar" resources/js/layouts/

# Find all button components
grep -r "Button" resources/js/components/
```

---

## 📋 **Common Elements Reference**

### Headers/Navbar
```css
/* Main header */
.fixed.top-0.z-30.w-full { }

/* Navbar container */
.container.flex.items-center.justify-between { }

/* Mobile menu button */
button.md\\:hidden { }
```

### Sidebar
```css
/* Sidebar wrapper */
[class*="sidebar"] { }

/* Sidebar items */
[class*="sidebar"] [class*="nav-item"] { }

/* Sidebar icons */
[class*="sidebar"] svg { }
```

### Cards
```css
/* All cards */
.bg-card,
.shadow-card { }

/* Card headers */
.bg-card > div:first-child { }

/* Card content */
.bg-card > div:last-child { }
```

### Buttons
```css
/* Primary buttons */
button[class*="bg-primary"] { }

/* Secondary buttons */
button[class*="variant-secondary"] { }

/* Outline buttons */
button[class*="variant-outline"] { }

/* Icon buttons */
button[class*="size-icon"] { }
```

### Forms
```css
/* Form containers */
form { }

/* Form labels */
label { }

/* Text inputs */
input[type="text"],
input[type="email"],
input[type="password"] { }

/* Select dropdowns */
select { }

/* Textareas */
textarea { }

/* Checkboxes */
input[type="checkbox"] { }

/* Radio buttons */
input[type="radio"] { }
```

### Tables
```css
/* Table wrapper */
.table-container { }

/* Table */
table { }

/* Table headers */
table thead th { }

/* Table body */
table tbody td { }

/* Table rows */
table tbody tr { }

/* Table pagination */
[class*="pagination"] { }
```

### Modals/Dialogs
```css
/* Dialog overlay */
[class*="overlay"] { }

/* Dialog content */
[class*="dialog-content"] { }

/* Dialog header */
[class*="dialog-header"] { }

/* Dialog footer */
[class*="dialog-footer"] { }
```

---

## 🎨 **Advanced Techniques**

### 1. Target by Data Attributes

Add data attributes in components:
```tsx
<div className="..." data-component="header">
```

Style in CSS:
```css
[data-component="header"] {
   /* Your styles */
}
```

### 2. Use CSS Variables

Override Tailwind variables:
```css
:root {
   --tw-ring-color: var(--color-primary);
   --tw-shadow-color: rgba(0, 0, 0, 0.1);
}
```

### 3. Use @layer for Better Specificity

```css
@layer components {
   .fixed.top-0 {
      /* Higher specificity */
   }
}

@layer utilities {
   .custom-utility {
      /* Even higher */
   }
}
```

---

## 🚀 **Recommended Workflow**

1. **Inspect Element** in browser
2. **Copy Tailwind classes**
3. **Add to custom CSS:**
   ```css
   /* custom-ltr.css */
   .class1.class2.class3 {
      /* Your styles */
   }
   ```
4. **Add RTL version:**
   ```css
   /* custom-rtl.css */
   [dir='rtl'] .class1.class2.class3 {
      /* RTL styles */
   }
   ```
5. **Test in browser**
6. **Run build:**
   ```bash
   npm run build
   ```

---

## ⚠️ **Important Notes**

1. **Specificity Matters**
   - More specific selectors override less specific ones
   - Use `!important` only as last resort

2. **Tailwind Overrides**
   - Your custom CSS loads after Tailwind
   - You can override any Tailwind class

3. **Test Both Modes**
   - Light/Dark theme
   - LTR/RTL direction
   - Mobile/Desktop

4. **Build After Changes**
   ```bash
   npm run build
   # or
   npm run dev
   ```

---

## 📝 **Quick Start Example**

Let's style the header right now:

**1. Add to `custom-ltr.css`:**
```css
/* Custom Header Styles */
.fixed.top-0.z-30.w-full {
   backdrop-filter: blur(10px);
   background: rgba(255, 255, 255, 0.8);
   border-bottom: 1px solid var(--color-border);
   box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
}

/* Dark mode */
.dark .fixed.top-0.z-30.w-full {
   background: rgba(20, 20, 20, 0.8);
}

/* Navbar items hover */
.fixed.top-0 a:hover {
   color: var(--color-primary);
   transform: translateY(-1px);
}
```

**2. Add to `custom-rtl.css`:**
```css
[dir='rtl'] .fixed.top-0.z-30.w-full {
   /* RTL-specific adjustments if needed */
}
```

**3. Build:**
```bash
npm run build
```

**Done!** Your header now has custom styles.

---

## 🎯 **Conclusion**

**For quick styling:** Use Method 1 (target Tailwind classes)  
**For maintainable code:** Use Method 3 (add semantic classes)  
**For specific elements:** Use Method 2 (attribute selectors)

All three methods work well. Choose based on your needs!
