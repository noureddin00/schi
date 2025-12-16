# Platform Customization & Structure Guide

## Quick Navigation
- [Platform Architecture](#platform-architecture)
- [Frontend Layout Map](#frontend-layout-map)
- [Component Locations](#component-locations)
- [Language & Internationalization](#language--internationalization)
- [Common Customizations](#common-customizations)

---

## Platform Architecture

### Tech Stack
- **Backend:** Laravel 11 with PHP
- **Frontend:** React + TypeScript with Inertia.js
- **Styling:** Tailwind CSS
- **Database:** MySQL
- **Module System:** Nwidart Laravel Modules

### File Structure Overview
```
c:\wamp64\www\Projects\Courses\SCHI\
├── app/                    # Laravel app files (Models, Controllers, Services)
├── resources/js/           # React/TypeScript components
├── resources/views/        # Blade templates
├── Modules/                # Feature modules (Blog, Exam, Certificate, etc.)
├── public/                 # Static assets & compiled build
├── routes/                 # Route definitions
├── config/                 # Configuration files
└── database/               # Migrations & seeders
```

---

## Frontend Layout Map

### 📱 Public Pages (Unauthenticated Users)

#### **1. Landing/Home Page**
- **Component File:** `resources/js/pages/home/index.tsx`
- **Layout:** `resources/js/layouts/landing-layout.tsx`
- **Header:** `resources/js/layouts/partials/intro-navbar.tsx`
- **Contains:** Hero, courses, instructors, testimonials, CTAs

#### **2. Authentication Pages**
- **Login:** `resources/js/pages/auth/login.tsx`
- **Register:** `resources/js/pages/auth/register.tsx`
- **Forgot Password:** `resources/js/pages/auth/forgot-password.tsx`
- **Layout:** `resources/js/layouts/auth-layout.tsx`

#### **3. Course Browse**
- **Courses List:** `resources/js/pages/courses/index.tsx`
- **Course Details:** `resources/js/pages/course-detail/show.tsx`
- **Layout:** `resources/js/layouts/main.tsx`

#### **4. Blog Pages**
- **Blog List:** `resources/js/pages/blog/index.tsx`
- **Blog Post:** `resources/js/pages/blog/show.tsx`
- **Layout:** `resources/js/layouts/main.tsx`

---

### 🔐 Dashboard (Authenticated Users)

#### **Student Dashboard**
- **Route:** `/student`
- **Files:** `resources/js/pages/student/`
- **Tabs:** Courses, Wishlist, Profile, Settings, Certificates, My Exams
- **Layout:** `resources/js/layouts/dashboard/layout.tsx`
- **Header:** `resources/js/layouts/dashboard/header.tsx`

#### **Instructor Dashboard**
- **Route:** `/instructor`
- **Files:** `resources/js/pages/instructor/`
- **Features:** Course Management, Analytics, Students, Payouts
- **Layout:** `resources/js/layouts/dashboard/layout.tsx`
- **Header:** `resources/js/layouts/dashboard/header.tsx`

#### **Admin Dashboard**
- **Route:** `/dashboard`
- **Files:** `resources/js/pages/admin/` or `resources/js/pages/dashboard/`
- **Features:** Users, Courses, Categories, Exams, System Settings
- **Layout:** `resources/js/layouts/dashboard/layout.tsx`
- **Header:** `resources/js/layouts/dashboard/header.tsx`

---

## Component Locations

### 🎨 UI Components Library

#### **Header/Navigation Components**
| Component | Location | Purpose |
|-----------|----------|---------|
| Intro Navbar | `resources/js/layouts/partials/intro-navbar.tsx` | Public header with Language/Appearance dropdowns |
| Dashboard Header | `resources/js/layouts/dashboard/header.tsx` | Admin/Dashboard header with Language/Appearance/Notification |
| Language Switcher | `resources/js/components/language.tsx` | Globe icon dropdown for language selection |
| Appearance Toggle | `resources/js/components/appearance.tsx` | Theme switcher (Light/Dark mode) |
| Notifications | `resources/js/components/notification.tsx` | Notification bell with dropdown |
| Sidebar Toggle | `resources/js/layouts/dashboard/sidebar/index.tsx` | Mobile sidebar toggle button |

#### **Navigation Items**
- **Source:** Database (`navbar` language property)
- **Configured in:** Admin > Settings > Navbar Configuration
- **Displayed in:** `intro-navbar.tsx` lines 25-28 (map through `navbar.properties.array`)
- **Customization:** Edit database directly or create admin interface for navbar items

#### **Section Components**
| Component | Location |
|-----------|----------|
| Hero Section | `resources/js/components/hero/` (multiple variations) |
| Course Cards | `resources/js/components/course-card-*` |
| Testimonials | `resources/js/components/testimonials/` |
| Call-to-Action | `resources/js/components/call-to-action-*` |
| Footer | `resources/js/components/footer/` |
| Newsletter | `resources/js/components/subscribe-input/` |

---

## Language & Internationalization

### 🌐 Language System Overview

#### **How Direction Works**
1. **Language Selection** → User clicks Language dropdown (Globe icon)
2. **Direction Auto-Set** → RTL/LTR automatically set based on language (Arabic → RTL)
3. **Middleware Processing** → `SetLocale.php` handles locale + direction cookies
4. **Frontend Rendering** → `HandleInertiaRequests.php` derives direction from app locale

#### **Key Files**
| File | Purpose |
|------|---------|
| `app/Http/Middleware/SetLocale.php` | Detects & sets language locale and direction |
| `app/Http/Middleware/HandleInertiaRequests.php` | Shares locale/direction/langs with Inertia |
| `resources/js/components/language.tsx` | Language dropdown component |
| `resources/views/app.blade.php` | Sets `dir` attribute on root `<html>` element |
| `lang/en/` | English translation files |

#### **Language Selector Component Usage**

**In any layout/page:**
```tsx
import Language from '@/components/language';

export default function MyComponent() {
  return (
    <div className="navbar">
      <Language />  {/* Renders Globe icon with dropdown */}
    </div>
  );
}
```

**Currently enabled in:**
- ✅ Dashboard Header (conditional: `system.fields.language_selector`)
- ✅ Public Navbar - Desktop section
- ✅ Public Navbar - Mobile menu

#### **Shared Data Available**
From `HandleInertiaRequests.php`, these are available in all pages:
```tsx
interface SharedProps {
  locale: string;           // 'en' or 'ar'
  direction: 'ltr' | 'rtl'; // Auto-derived from locale
  langs: Language[];        // Array of available languages
  system: {
    fields: {
      language_selector: boolean; // Show/hide language switcher
      direction: 'auto' | 'ltr' | 'rtl'; // Direction setting
    }
  }
}
```

---

## Common Customizations

### 1. 🎯 Add Language Switcher to a Page

**File:** Any React component

```tsx
import Language from '@/components/language';

export default function MyPage() {
  return (
    <div>
      <header className="flex items-center justify-between">
        <h1>My Page</h1>
        <Language />  {/* That's it! */}
      </header>
    </div>
  );
}
```

**No additional setup needed** - Language component handles everything internally.

---

### 2. 📝 Customize Navbar Items

#### **Current Method:** Database
- **Table:** `language_properties`
- **Group:** `navbar`
- **Key:** `properties` (contains JSON array)

#### **Structure of navbar items:**
```json
{
  "array": [
    {
      "title": "Courses",
      "url": "/courses"
    },
    {
      "title": "Instructors",
      "url": "/instructors"
    }
  ]
}
```

#### **To Add/Edit Navbar Items:**

**Option A: Admin Interface (Recommended)**
- Go to Dashboard > Settings > Navbar
- Add/edit/delete items through UI
- Changes reflect immediately

**Option B: Database Direct**
```sql
UPDATE language_properties 
SET properties = '[{"title":"New Item","url":"/new"}]'
WHERE group = 'navbar' AND language_id = 1;
```

**Rebuilding not required** - changes appear immediately.

---

### 3. 🎨 Customize Header/Navbar

#### **File:** `resources/js/layouts/partials/intro-navbar.tsx`

**Current Structure:**
```tsx
// Logo/Brand
<Link href="/">
  <AppLogo />
</Link>

// Desktop Navigation (hidden on mobile)
<div className="hidden items-center gap-3 md:flex">
  {navbar items}
  <Appearance />
  <Language />  {/* ← Language switcher */}
</div>

// Mobile Menu (visible on mobile)
<ScrollArea>
  {navbar items}
  <Language />  {/* ← Also in mobile menu */}
  <AppearanceToggleTab />
</ScrollArea>
```

#### **To Add New Elements to Header:**

**Add a Search Button:**
```tsx
<button className="md:flex hidden items-center gap-2">
  <Search size={20} />
  Search
</button>
```

**Add a Cart Icon:**
```tsx
<Link href="/cart">
  <ShoppingCart size={20} />
  <Badge>{cartCount}</Badge>
</Link>
```

**Placement:** Insert before or after `<Appearance />` or `<Language />`

---

### 4. 🗂️ Change Layouts

#### **Update which layout a page uses:**

**File:** `resources/js/pages/[your-page].tsx`

```tsx
// Current layout
import LandingLayout from '@/layouts/landing-layout';

export default function MyPage() {
  return (
    <LandingLayout>
      {/* Content */}
    </LandingLayout>
  );
}

// Change to main layout
import MainLayout from '@/layouts/main';

export default function MyPage() {
  return (
    <MainLayout>
      {/* Content */}
    </MainLayout>
  );
}
```

#### **Available Layouts:**
| Layout | Use For |
|--------|---------|
| `landing-layout.tsx` | Public home/landing pages |
| `main.tsx` | General public pages (courses, blog) |
| `auth-layout.tsx` | Login/register/password reset |
| `dashboard/layout.tsx` | Admin/student/instructor dashboards |

---

### 5. 🔧 Add Custom Hooks/Utilities

#### **Access Inertia Props in Components:**

```tsx
import { usePage } from '@inertiajs/react';

export default function MyComponent() {
  const page = usePage();
  
  const { 
    locale,      // Current language
    direction,   // 'ltr' or 'rtl'
    langs,       // Available languages
    system,      // System settings
    auth,        // User info
  } = page.props;

  return (
    <div dir={direction}>
      <p>Current Language: {locale}</p>
    </div>
  );
}
```

---

### 6. 🎯 Conditional Rendering Based on Language

```tsx
import { usePage } from '@inertiajs/react';

export default function MultiLanguageContent() {
  const { locale } = usePage().props;
  
  return (
    <div>
      {locale === 'ar' && (
        <p className="text-right">محتوى عربي</p>
      )}
      {locale === 'en' && (
        <p>English Content</p>
      )}
    </div>
  );
}
```

---

### 7. 🎨 Theme Customization

#### **Colors & Styling:**
- **Config:** `tailwind.config.js`
- **CSS:** `resources/css/app.css`
- **Components:** Use Tailwind utility classes

#### **To Change Primary Color:**

**File:** `tailwind.config.js`
```js
theme: {
  colors: {
    primary: '#your-color',  // Change here
  }
}
```

Then rebuild:
```bash
npm run build
```

---

### 8. 🔄 Enable/Disable Features

#### **System Settings in Database:**

Check `system_settings` table or `config.php` for toggles:
- Language selector visibility
- Direction setting (auto/ltr/rtl)
- Theme options
- Feature flags

#### **In Code:**
```tsx
const { system } = usePage().props;

if (system.fields.language_selector) {
  return <Language />;
}
```

---

## Testing Your Changes

### ✅ After Modifying Frontend Code

**Rebuild the frontend:**
```bash
npm run build --silent
```

**Clear browser cache:**
- Hard refresh: `Ctrl + Shift + R` (Chrome/Firefox)
- Clear browser cache manually

### ✅ After Modifying Backend Code

**Clear Laravel cache:**
```bash
php artisan config:cache
php artisan cache:clear
php artisan view:clear
```

### ✅ After Changing Database Values

**No rebuild needed** - changes appear immediately (usually within seconds)

---

## File Summary Table

| Component | File Path | Edit For |
|-----------|-----------|----------|
| **Public Navbar** | `resources/js/layouts/partials/intro-navbar.tsx` | Logo, menu items, header buttons |
| **Language Switcher** | `resources/js/components/language.tsx` | Language dropdown styling/behavior |
| **Dashboard Header** | `resources/js/layouts/dashboard/header.tsx` | Admin/dashboard header |
| **Appearance Toggle** | `resources/js/components/appearance.tsx` | Theme switcher |
| **Language Direction** | `app/Http/Middleware/SetLocale.php` | Language detection logic |
| **Shared Data** | `app/Http/Middleware/HandleInertiaRequests.php` | Global props to frontend |
| **Blade Template** | `resources/views/app.blade.php` | HTML structure, RTL/font loading |
| **Routes** | `routes/*.php` | URL paths and endpoints |
| **Configuration** | `config/*.php` | System-wide settings |

---

## Next Steps

1. **Test Language Switcher:** Visit homepage → Click globe icon → Switch to Arabic
2. **Check RTL:** Verify page switches to RTL when Arabic is selected
3. **Customize Navbar:** Add your own menu items in admin settings
4. **Brand It:** Update logo, colors, and fonts to match your brand

---

## Support & Troubleshooting

### 🔴 Language Switcher Not Appearing?
- Check if `system.fields.language_selector` is enabled
- Verify `Language` component is imported
- Clear browser cache and rebuild frontend

### 🔴 Direction Not Changing?
- Check middleware order in `bootstrap/app.php`
- Verify direction is set on `<html dir={}>` element
- Check browser console for JavaScript errors

### 🔴 Navbar Items Not Showing?
- Verify database has navbar language properties
- Check that `navbar` group exists in language_properties table
- Verify `navbar.properties.array` is populated

---

**Last Updated:** Session with user - Language Switcher public frontend implementation
**Framework:** Laravel 11 + React 18 + Inertia.js
